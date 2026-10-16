# RoboSimStudio 固定版本原始文件读取缓存

标准提取器不支持 tgz；按成员路径逐字解码 UTF-8，未摘要。代码核查范围在来源页说明。

## README.md

````text
# <img alt="" src=".github/media/logo.png" height="44" align="top" /> RoboSimStudio

[Tech report](https://arxiv.org/abs/2610.18835) | [Project Page](https://robosimstudio.github.io/)

RoboSimStudio is an open, interactive GPU simulation toolkit for rebuilding real
robot manipulation tasks in simulation, by hand or with a coding agent.

<p align="center">
  <img alt="Forty-eight manipulation tasks built with RoboSimStudio, playing side by side" src=".github/media/splash.webp" width="100%" />
</p>

## Quick start

We provide comprehensive examples in [`examples/`](https://github.com/robosimstudio/robosimstudio/tree/main/examples) to help you get started quickly. Alternatively, you can use a coding agent such as Codex or Claude Code to create a simulation environment by simply providing the following prompt:

```
Set up environment for https://github.com/robosimstudio/robosimstudio
and create a simulation environment for [Your task instruction]
based on the video at [Your Video Path].
```

## Acknowledgements

RoboSimStudio is built on [Newton](https://github.com/newton-physics/newton),
[Warp](https://github.com/NVIDIA/warp) and
[MuJoCo Warp](https://github.com/google-deepmind/mujoco_warp), and its studio
on [viser](https://github.com/viser-project/viser). It draws on
[Isaac Lab](https://github.com/isaac-sim/IsaacLab),
[Isaac Lab Arena](https://github.com/isaac-sim/IsaacLab-Arena),
[PyRoKi](https://github.com/chungmin99/pyroki),
[Genesis](https://github.com/Genesis-Embodied-AI/Genesis),
[SuperDex](https://github.com/facebookresearch/project_superdex) and
[LeRobot](https://github.com/huggingface/lerobot). Robot models come from
[i2rt](https://github.com/i2rt-robotics/i2rt) and
[robosuite](https://github.com/ARISE-Initiative/robosuite); see `NOTICE`.
Thanks to their authors.

## Citation

```bibtex
@misc{robosimstudio2026,
  title         = {RoboSimStudio: An Interactive Toolkit for Rapid Real2Sim of Robot Manipulation Tasks},
  author        = {Chen, Kaiyuan and Xie, Shuangyu and Yoo, Uksang and Zhu, Xinyue and Magner, Cael and Zhu, Alvin and Kim, Daehwa and Heiden, Eric and Coumans, Erwin and Macklin, Miles and Huang, Spencer and Goldberg, Ken},
  year          = {2026},
  eprint        = {2610.18835},
  archivePrefix = {arXiv},
  url           = {https://arxiv.org/abs/2610.18835},
}
```

## License

RoboSimStudio is released under the [Apache License 2.0](LICENSE).
````

## AGENTS.md

````text
# For the agent working in this repository

RoboSimStudio is a Newton-native simulation toolkit. Packages:

- `robosimstudio/`: the core API; builds and steps scenes.
- `robosimstudio_studio/`: a browser page over any scene.
- `robosimstudio_bench/`: tasks and their scoring.
- `robosimstudio_policy_agent/`: policies as graphs of robot tools.
- `robosimstudio_real2sim_agent/`: the live page that rebuilds a `scene.py`
  on every save, and the `./ctl` command line onto it.

## Read first

1. [`README.md`](README.md): what is here and how to run it.
2. [`examples/00_getting_started/README.md`](examples/00_getting_started/README.md)
   (`Scene`, `Sim`, `Ref`, the constructors) and each example folder's README. Poses
   are in the cell's work-surface frame: `at=(0, 0, 0.2)` is 200 mm over the
   middle of the bench, whatever bench (frames and units:
   [`examples/live/REFERENCE.md`](examples/live/REFERENCE.md#frames-and-units)).
3. `examples/`: numbered scripts, shortest first. `examples/01_cloth/cloth.py`,
   `examples/02_soft/soft.py` and `examples/03_rope/rod/` are the shipped cloth,
   soft-body and rope implementations; read them to see how each works.

## Checks

- `uv run python scripts/testrun.py --tier fast`: no GPU, gates every commit.
- `uv run --extra gap python scripts/testrun.py --tier medium`: needs the GPU;
  builds and steps scenes.
- `uvx ruff@0.16.1 check . && uvx ruff@0.16.1 format . --check`.
- `examples/live/run/` is not committed. A commit message is a lowercase
  `area:` prefix and one declarative sentence
  (`studio: the room, and lights that match the render`).

## Real to sim: a real bench, scene or clip, rebuilt on the live page

When asked to rebuild a real scene from a photo or video, match a reference,
twin a real cell, or build a scene interactively, use the live page in
[`examples/live/`](examples/live/README.md) instead of writing a script and
running it blind: edit `scene.py`, and the page rebuilds it on every save.
From `examples/live/`:

```bash
./ctl status                          # a page is up (names, positions, last error), or it exits 2
./ctl up                              # if not: start one; prints the URL (--share for a public one)
./ctl ref frames <clip> --at 0:start,4.5:lid_open,end:end   # stills named by their second, a contact sheet, ref/timeline.json
./ctl snapshot --camera <cam> --beside ref/<still>          # the render beside the still, full size
./ctl compare --camera <cam> --key case=red --key socket=@1240,410 --note "<why>"   # size, offset, overlap per thing, and a look sheet
./ctl check --camera <cam> --key ...  # the gate: PASS/FAIL with the number
./ctl eval "t.play()" --record take1 --camera <cam>         # film a routine; it is compared to the clip when it ends
./ctl play tidy --record take1        # the page's Run button: scene.py binds routine or routines={name: fn}
./ctl log                             # every reading so far, with the scene code it measured
./ctl catalog robots cells            # the names rss.robot() and Scene(cell=) accept
./ctl eval "sim['<name>'].position"   # python against the live scene
```

A snapshot is path traced and draws the room, the mat and the textures; the
page draws the bench and what you added.

The method and what counts as a finished twin are in
[`.claude/skills/real-to-sim/SKILL.md`](.claude/skills/real-to-sim/SKILL.md)
(the `real-to-sim` skill for Claude Code). The `scene.py` contract, every
command and every reading are in
[`examples/live/REFERENCE.md`](examples/live/REFERENCE.md).
````

## pyproject.toml

````text
[build-system]
requires = ["hatchling>=1.27"]
build-backend = "hatchling.build"

[project]
name = "robosimstudio"
dynamic = ["version"]
description = "An open interactive toolkit that accelerates human and agentic physics-based Real2Sim of Robot Manipulation Tasks"
readme = "README.md"
# The project is Apache-2.0; the robot models under assets/ keep their own
# licences (MIT, BSD-2-Clause, BSD-3-Clause), each in a LICENSE beside its files
# and listed in NOTICE.
license = "Apache-2.0 AND MIT AND BSD-2-Clause AND BSD-3-Clause"
license-files = ["LICENSE", "NOTICE", "assets/embodiments/*/LICENSE*", "assets/embodiments/*/*/LICENSE*"]
requires-python = ">=3.12"
authors = [{ name = "Kaiyuan Chen" }]
keywords = ["robotics", "simulation", "manipulation", "deformable", "newton", "real-to-sim"]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Science/Research",
    "Operating System :: POSIX :: Linux",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.12",
    "Topic :: Scientific/Engineering",
]
dependencies = [
    # [sim] carries mujoco and mujoco-warp, which the default rigid solver needs
    # at runtime; newton imports them lazily, so a bare "newton" resolves and
    # then cannot step an arm.
    "newton[sim]>=1.6,<1.7",
    "numpy",
    # ModelBuilder.approximate_meshes(method="convex_hull") imports scipy.spatial
    # at call time, and every scene with a hand in it calls it.
    "scipy>=1.11.0",
    # The episode recorder and the studio's video export. The [ffmpeg] marker is
    # the point: bare imageio imports and then cannot open an mp4.
    "imageio[ffmpeg]",
    # The browser page. rss.view(sim) is how a scene is looked at and taken hold
    # of, so it is part of the base install.
    "viser>=1.0.30",
    # The YAM's fingertips are cut into convex pieces when the arm is built, so
    # every scene with a YAM in it needs this. Pinned: the pieces, and with them
    # the contact shapes, change between versions.
    "coacd==1.0.11",
    # A cloth or soft mesh with simplify_faces set is coarsened by trimesh's
    # simplify_quadric_decimation, which imports this at call time.
    "fast_simplification",
    # The IK solver. Every arm is solved by PyRoKi from its URDF (jax, jaxls,
    # yourdfpy come with it); an arm that ships no URDF falls back to Newton's
    # own solver without being asked. Pinned to a commit because PyPI has no
    # pyroki to name, which is also why this wheel cannot be published to an
    # index until it does (hatch's allow-direct-references below).
    "pyroki @ git+https://github.com/chungmin99/pyroki.git@95afccc22658c461ab1042a048ae4e9c24bc2a47",
]

[project.optional-dependencies]
# The FEM engine behind rss.sponge: a CPU, fully implicit solver co-simulated
# beside the Newton arm. It ships wheels for Python 3.12 only; on any other
# interpreter the extra resolves to nothing and a sponge scene says so.
superdex = ["superdex-physics==1.0.*; python_version == '3.12'"]
# Genesis's IPC coupler as a second foreign engine. Install it in a virtual
# environment of its own: it moves twenty packages, and trimesh is pinned below
# 5 here because genesis-world otherwise drags it across a major version.
genesis = [
    "genesis-world==1.3.*",
    "torch",
    "trimesh<5",
    "pyuipc>=0.0.26; sys_platform == 'linux' and platform_machine == 'x86_64'",
]
# The OVRTX path-traced renderer. Pinned: its render-var names and readback API
# are private surface. pyglet is here because Newton's viewer camera imports
# pyglet.math at call time. A checkout run through uv installs it without being
# asked -- the `rtx` group below -- and a GPU without RT cores renders with
# `tiled` either way (robosimstudio.solvers.render.choose_renderer).
rtx = ["ovrtx==0.4.0.*", "usd-core", "pyglet"]
# USD scene import.
usd = ["newton[importers]"]
# The Feetech motor bus behind leader-arm teleoperation.
lerobot-feetech = ["lerobot[feetech]"]
# The graph runtime robosimstudio_policy_agent runs a policy with, pinned by git below.
# Importing its connector reads h5py and pydantic; transformers serves the
# optional SAM 3 segmentation tool. The runtime itself requires torch and cuRobo,
# so this extra is large.
gap = [
    "graph-as-policy",
    "graph-as-policy-core",
    "h5py",
    "pydantic",
    "msgpack",
    "msgpack-numpy",
    "transformers>=5.0",
]
# The collision-aware planner behind `motion="plan"`. [cu12] adds cuda-core,
# which compiles its kernels at first use.
curobo = ["nvidia-curobo[cu12]"]
dev = ["ruff==0.16.1", "pyyaml"]

# What `uv sync` and `uv run` install from a checkout without being asked
# (default-groups below): the [rtx] extra, so a GPU that can path trace does.
# It is 1.8 GB from NVIDIA's index; on a GPU without RT cores it is never
# imported, and UV_NO_GROUP=rtx (or --no-group rtx) leaves it out. A group rather
# than a base dependency, because pip needs NVIDIA's index named to find ovrtx.
# ovrtx ships wheels for Linux (glibc 2.35+, x86_64 and aarch64) and Windows only,
# so the marker keeps a macOS checkout installable.
#
# media: the clips the example READMEs show; scripts/record_examples.py films the
# studio page in a headless Chromium. Never part of the package, and not a
# default group, so a plain `uv sync` leaves it out.
[dependency-groups]
rtx = ["robosimstudio[rtx]; sys_platform == 'linux' or sys_platform == 'win32'"]
media = ["playwright>=1.55", "pillow"]

[project.urls]
Homepage = "https://robosimstudio.github.io/"
Paper = "https://arxiv.org/abs/2610.18835"
Repository = "https://github.com/robosimstudio/robosimstudio"
Issues = "https://github.com/robosimstudio/robosimstudio/issues"

# The version is stated once, in the package, and read from there.
# pyroki is a git reference, which hatchling refuses to put in a wheel unless told
# the project means it. It does: this wheel is installed from a checkout, not an index.
[tool.hatch.metadata]
allow-direct-references = true

[tool.hatch.version]
path = "robosimstudio/_version.py"

# Five packages, one distribution: the library, the browser page over it, the
# real-to-sim page a coding agent drives, the benchmark (tasks, goals, the run
# harness) and the policy agent (a graph as the policy). Imports go one way: the
# library names neither the studio nor the agents.
[tool.hatch.build.targets.wheel]
packages = [
    "robosimstudio",
    "robosimstudio_bench",
    "robosimstudio_policy_agent",
    "robosimstudio_real2sim_agent",
    "robosimstudio_studio",
]

# Robot assets sit beside the packages in a checkout, and so do the cloth and
# soft implementations: one module each, in the example folder that runs it. A
# wheel has no repository root to climb to, so it carries a copy where
# robosimstudio/paths.py and robosimstudio/roots.py look last. The two modules
# are mapped file by file, so the numbered example scripts beside them stay out
# of the wheel.
[tool.hatch.build.targets.wheel.force-include]
"assets" = "robosimstudio/assets"
"examples/01_cloth/cloth.py" = "robosimstudio/_domain_packs/cloth.py"
"examples/02_soft/soft.py" = "robosimstudio/_domain_packs/soft.py"
"examples/03_rope/rod" = "robosimstudio/_domain_packs/rod"

[tool.hatch.build.targets.sdist]
include = [
    "/robosimstudio",
    "/robosimstudio_bench",
    "/robosimstudio_policy_agent",
    "/robosimstudio_real2sim_agent",
    "/robosimstudio_studio",
    "/assets",
    "/examples",
    "/tests",
    "/scripts",
    "/README.md",
    "/LICENSE",
    "/NOTICE",
    "/CITATION.cff",
]

# NVIDIA's index, for ovrtx only: PyPI does not carry it. Explicit, so nothing
# else may come from it.
[tool.uv.sources]
ovrtx = { index = "nvidia" }
# The graph runtime at the revision every graph here was measured against.
graph-as-policy = { git = "https://github.com/KeplerC/graph-as-policy.git", rev = "09e45f8de27bc1a29629382ed7c2b9b4b384b3d6" }
graph-as-policy-core = { git = "https://github.com/KeplerC/graph-as-policy.git", rev = "09e45f8de27bc1a29629382ed7c2b9b4b384b3d6", subdirectory = "gap-core" }
nvidia-curobo = { git = "https://github.com/NVlabs/curobo.git", tag = "v0.8.0" }

[[tool.uv.index]]
name = "nvidia"
url = "https://pypi.nvidia.com"
explicit = true

# The graph runtime also requires its own simulator stack (LIBERO, robosuite,
# gym, bddl) and pins mujoco 3.6. Nothing robosimstudio_policy_agent imports from it
# loads any of those, so they are dropped, and mujoco follows Newton.
[tool.uv]
default-groups = ["rtx"]
override-dependencies = [
    "PyOpenGL>=3.1.7",
    "libero; sys_platform == 'never'",
    "robosuite; sys_platform == 'never'",
    "gym; sys_platform == 'never'",
    "bddl; sys_platform == 'never'",
    "mujoco~=3.12.0",
]

# Skill registries a graph's subgraphs may name, in gap's own convention: a
# clone of open-robot-skills beside this checkout. Optional, and only a default:
# a subgraph whose skill is "generic" needs none, a missing directory matters
# only to a graph that names a bundle, and $GAP_SKILLS_PATH overrides it.
[tool.gap]
registries = ["../open-robot-skills"]

# Ruff config is copied from Newton's own, so a file that lints clean here lints
# clean there.
[tool.ruff]
cache-dir = ".cache/ruff"
line-length = 120
indent-width = 4

[tool.ruff.lint]
select = [
    "E",   # pycodestyle errors
    "I",   # isort
    "F",   # pyflakes
    "W",   # pycodestyle warnings
    "B",   # flake8-bugbear
    "C4",  # flake8-comprehensions
    "NPY", # NumPy-specific rules
    "PLC", # pylint convention
    "PLE", # pylint error
    "PLW", # pylint warning
    "UP",  # pyupgrade
    "RUF", # ruff-specific rules
    "TID253", # banned module-level imports
]
ignore = [
    "E501",   # long lines, as Newton does
    # Function-local imports are this tree's convention, not a smell: every
    # optional backend is imported inside the function that needs it so a base
    # install never pays for it. The banned-module-level-imports list below is
    # what keeps optional backends out of module scope.
    "PLC0415",
    "E741",   # Warp often uses l as a variable name
    "UP018",  # Warp kernels often use float(val) and int(val)
    "RUF046", # Warp kernels often use int(val)
    "F811",   # Warp kernel/function overloads
    "TC001",
    "TC002",
    "TC003",
    "F821",
]

[tool.ruff.lint.per-file-ignores]
# Examples set env vars and pick GL platforms before importing, as Newton's do.
"examples/**/*" = ["E402", "TID253"]

[tool.ruff.lint.flake8-tidy-imports]
# Everything optional is imported inside the function that needs it, so a base
# install never pays for a backend it does not use.
banned-module-level-imports = [
    "coacd",
    "collada",
    "genesis",
    "lerobot",
    "pyroki",
    "imgui_bundle",
    "matplotlib",
    "mujoco",
    "mujoco_warp",
    "ovrtx",
    "PIL",
    "pxr",
    "pyglet",
    "scipy",
    "superdex",
    "torch",
    "trimesh",
    "uipc",
    "viser",
]

[tool.ruff.lint.pydocstyle]
convention = "google"

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
# Markdown is prose here, not source.
exclude = ["*.md"]
````

## .claude/skills/real-to-sim/SKILL.md

````text
---
name: real-to-sim
description: Rebuild a real bench, scene or reference clip in simulation on the live page. Use when asked to real-to-sim a photo or video, twin a real cell, match a reference picture, or build a scene interactively and watch it appear. The page rebuilds examples/live/scene.py on every save; ./ctl measures the scene against the photograph, gates it, and films what the robot does.
---

# Real to sim on the live page

`examples/live/scene.py` runs on every save, and the `rss.Scene` it binds is
built and swapped into the open page without a reload. `./ctl` (run from
`examples/live/`) is the command line onto that process. Do not run the scene
yourself: edit the file and read what the page and its readings show.

Every command, flag, output file and reading is in
[`examples/live/REFERENCE.md`](../../../examples/live/REFERENCE.md), with the
frames and units. The API is in `examples/00_getting_started/README.md` and
each example folder's README; the names are in `./ctl catalog`. Read those
rather than guessing a constructor or a name.

## The tools

- `./ctl status` / `./ctl up`: a page is up, or start one and tell the user
  its URL. A failed rebuild leaves the previous scene up with the traceback
  in `last_error`.
- `./ctl ref frames <clip> --at 0:start,<t>:<event>,end:end`: stills named by
  their second, a contact sheet, and `ref/timeline.json` (the moments you
  chose, which `compare --take` uses). View them with your image tool;
  `./ctl ref show ref/<still>` puts one in the page's sidebar.
- `./ctl snapshot --camera <name> --beside ref/<still>`: the render beside
  the still, full size. Open it after every save, before looking at numbers.
- `./ctl compare --camera <name> --key <thing>=<how> ... --note "<why>"`: the
  pair (`cmp_NNN_beside.png`); per keyed thing the size ratio, pixel offset
  and overlap; and a look sheet (`cmp_NNN_look.png`): photo outlines in
  yellow, render outlines in cyan, each thing up close, and both pictures
  with the things painted out. Open the look sheet every time and list, per
  thing, what the photo has that the render lacks (a lid seam, latch tabs, a
  label, a chamfer, a colour, a texture) and what stands behind it (table
  top, floor, wall, furniture); that list is your next edit. Keys:
  `case=red`, `socket=@1240,410` or `case=red@980,640`.
- `./ctl check --camera <name> --key ...`: PASS/FAIL with its number for
  builds, finite, camera aspect, keyed things present, worst overlap, and
  drift when left alone. Advisory only; explain any FAIL you accept, with the
  number.
- `./ctl eval "<generator>" --record <take> --camera <name>` films a routine.
  When it ends it is compared to the clip's timeline with your last compare
  keys (or run `./ctl compare --take <take> --key ...`); the strip
  (`cmp_NNN_strip.png`, clip anchors above, take frames below) and a verdict
  (`2 of 3 did what the clip did; lid stayed (clip moved)`) go on the board.
  Answer for the clip and for the take: the first state, the last state,
  what happened between, what touched what. If the verdict names something
  the clip moved that stayed put, fix the scene before the routine.
- `./ctl log`: every reading so far, with the hash of the scene code it
  measured.
- `./ctl show <png> --label "<what>"` posts a picture to the page's `Live`
  sidebar folder for the person watching (the same label replaces it;
  `--clear` removes all). `compare` posts its pair and look sheet, and a take
  its strip, by themselves. Post what you are judging as you go: a still, a
  close-up, the snapshot.
- Bind `routine` (sim -> generator, one yield per control step) or
  `routines = {"tidy": ..., "open lid": ...}` in `scene.py` to get a **Run**
  button per routine and a **Reset**; `./ctl play [name] [--record <take>]`
  presses them, and `status` lists them under `routines`. A routine that
  declares a `session` parameter is handed the page's, so it can hold the
  arm panels off while it drives a gripper.
- `eval`, `run`, `pause`, `resume`, `reset`, `catalog`: see REFERENCE.md.
  `eval` shares `scene.py`'s namespace until the next save; `run N` is
  refused while a routine plays; `reset` stops a playing routine and
  finishes its take. While a routine plays, the page's own stepping is held
  whatever Pause says.

## What a finished twin is

- The first frame agrees: each thing the clip shows is in the scene at its
  size and place, through a camera where the clip's was, and to your own eye
  on the pair and the look sheet it looks like the clip: the things in their
  detail (a case with its latches, seam and label, not a red box) and what
  stands behind them (the table top, floor, wall and furniture the clip
  shows), with their colours and textures.
- The gate passes, or the report says which line fails and why that is
  right for this scene.
- The take moved what the clip moved, by about as much; the before and the
  after match the clip's first and last frames.
- Where the reference cannot settle a number, the report says which number
  and what was assumed.

There is no prescribed order: what to build first, when to compare, and how
many saves are up to you. Report readings, not impressions: the `./ctl log`
lines, the gate, and the take comparison.

Two cases are not done. A first frame that matches the numbers but not the
look (the look sheet's list still standing), and a routine retried take
after take while the verdict keeps naming something the clip moved and the
take did not. In both, the next save fixes the scene (the mechanism, the
texture or the room), before the next take.

## Rules of the page

- Poses are in the cell's work-surface frame, as everywhere in the core API;
  `snapshot --eye/--look-at` are world metres.
- `rss.view`, `rss.draw` and `rss.viewer` are no-ops while the file runs, so
  a script from `examples/` pastes in unchanged.
- A snapshot is path traced and draws the scenery (a room, a mat, a texture);
  the page draws the bench and what you added.
- A rebuild of the starter scene takes about 6 to 7 s, about 4.8 s of it
  CoACD on the YAM fingertips; the first build in a process takes about 10 s.
  `eval` blocks the page for as long as it runs unless it yields. A save also
  re-imports the helper modules beside `scene.py`.
- `run/` holds every snapshot, comparison, take and the log, and is not
  committed; `scene.py` is your result, so leave it in the state you are
  reporting.
- What the user drags on the page is what your next reading sees; if the
  scene looks moved, `./ctl reset` before judging it.
````

## examples/live/README.md

````text
# live: a page that rebuilds `scene.py` every time you save it

Point a coding agent at this folder: it edits `scene.py`, the open page
rebuilds on every save, and the agent checks the result with snapshots. The
page is the studio, so you can drag things on it between edits.

What is here:

- `scene.py`: the starter scene and the agent's working file. Bind `routine`
  (or `routines = {name: fn}`) to get a Run button.
- `ctl`: the command line onto the running page; it also runs from the
  repository root as `examples/live/ctl`. It uses the checkout's `.venv`, else
  `$PYTHON` or `python3`, so it also works after
  `pip install "robosimstudio @ git+https://github.com/robosimstudio/robosimstudio"`.
- `run/`: made on first use and not committed. It holds the socket, the
  server's log and every snapshot.

## Start

```bash
cd examples/live
./ctl up                                    # the page; prints its URL, http://localhost:8080 or the next free port (--share adds a public URL)
claude --permission-mode acceptEdits        # Claude Code; edits go through without a prompt
codex -a on-request -s workspace-write      # or Codex; the sandbox may write here and reach the socket
```

The page opens on the starter scene: two arms on a bare floor. On a remote GPU
box, pick an idle card with `CUDA_VISIBLE_DEVICES` and use `--share` or an SSH
tunnel (`ssh -L 8080:localhost:8080 <box>`). The page listens on all interfaces
(viser's default), so on a shared network firewall the port or use the tunnel.
`./ctl quit` stops the server.

Both agents read the procedure from [`AGENTS.md`](../../AGENTS.md), so the
prompt only has to say what to build. Start each prompt below with this
line:

```
A live page is running: it rebuilds scene.py on every save. Use ./ctl to inspect it (see ./ctl --help).
```

## The prompt, with a clip

Drop the clip beside the checkout (not in it) and say:

```
../../../<clip>.mov is a real clip of a person doing one thing at a table.
Rebuild it in scene.py with this library's core API: the table, two YAM
arms where the person sat, what is on the table, a camera where the phone
was, what stands behind the table, and then the arms doing what the person
did, bound as `routine` in scene.py so I get a Run button on the page. Look
at the pairs, the look sheets and the strip with your own eyes, not only the
numbers: the things in their detail, the background, what happened. I am
watching the page. When you are done, report the readings and what you saw:
the first frame against the clip, the gate, and the take against the clip's
timeline. Say in one line what you are about to do before each edit.
```

## The prompt, with your own photo

Make a `ref/` folder here, drop your photo into `ref/`, and say:

```
ref/<your photo> is a real photo of a robot bench. Rebuild that scene in
scene.py with this library's core API, one thing per save so I can watch each
one appear on the page: the bench, the robot, what is on the bench, and a
camera where the photo was taken from. Measure sizes and placements from the
photo. After each save, snapshot through your camera beside the photo
(./ctl snapshot --beside ref/<your photo>), look at the pair, and adjust until
they line up. When the scene matches, make the robot do something to an object
and step it on the page so I can watch. Say in one line what you are about to
do before each edit.
```

## The prompt, with no photo

```
Build this in scene.py with this library's core API, one thing per save so I
can watch each one appear on the page: two YAM arms, a towel and a box on a
bench. After each save, take a snapshot and look at it before the next
edit. When the scene is built, make an arm push the box and step it on the
page so I can watch. Say in one line what you are about to do before each
edit.
```

## Where things go

Everything the page writes lands in `run/` (snapshots, comparisons, takes,
`log.jsonl`, `serve.log`); clip stills and `timeline.json` go in `ref/`. The
full list, every `ctl` command, the contract for `scene.py` and the frames and
units are in [`REFERENCE.md`](REFERENCE.md#ctl).

The result is `scene.py` itself. Copy it aside to keep it;
`git checkout examples/live/scene.py` puts the starter back.
````

## examples/live/REFERENCE.md

````text
# live: reference

The `scene.py` contract, every `./ctl` command, and what each reading means.
Setup and the prompts are in [`README.md`](README.md).

## How it works

`./ctl up` serves `scene.py` in one process and one browser tab, and rebuilds
the scene every time the file is saved.

- The tab never reloads, and the camera stays where you left it.
- A file that does not build leaves the previous scene up. `./ctl status`
  prints the traceback.
- A save also re-imports the helper modules beside `scene.py` (a module or a
  package in its directory), so an edit to a helper lands with the next save.
- A rebuild of the starter scene, with or without a box added, takes about 6
  to 7 s; about 4.8 s of it is CoACD decomposing the YAM fingertip colliders.
  The first build in a process also compiles kernels and takes about 10 s.
- The page listens on all interfaces (`0.0.0.0`, viser's default), so on a
  shared network firewall its port or use an SSH tunnel.

## The contract for `scene.py`

The one requirement: when the file has run, `scene` is an `rss.Scene`.

```python
import robosimstudio as rss

scene = rss.Scene(cell="void", name="live")
scene.add(rss.robot("yam_i2rt"))  # a scene needs something that moves before it will build
```

- The server builds it with `scene.build(control_mode="joint_position")`. Bind
  `sim` yourself and the server takes that instead.
- A `BUILD = {...}` dict is passed to `build` as keyword arguments.
- `rss.view`, `rss.draw` and `rss.viewer` do nothing and return None while the
  file runs, so a script pasted from the examples works unchanged unless it
  drives the viewer `rss.viewer` returns.
- Poses are in the work-surface frame. See [Frames and units](#frames-and-units).
- Bind `routine` (a callable taking the built `sim` and returning a
  generator that yields once per control step), or `routines`, a dict of
  name to such callables, and the page grows a **Run** button per routine
  with a **Reset** beside them. A click plays the routine on the main thread
  as `./ctl play` does, and `status` lists them under `routines`. A routine
  that declares a `session` parameter is handed the page's.

## `./ctl`

| Command | Does |
| --- | --- |
| `up [--port N] [--scene F] [--share]` | Start a server on the file, wait for the page, and print its URL (the next free port if N is busy). With a page already up, names it; refuses if that page is on another scene file or lacks a requested `--share`. |
| `status` | What is loaded, the names in it and where they are, the last error, the page's address. |
| `reload` | Rebuild now. Saving the file does this too. |
| `snapshot [--camera N] [--beside REF] [--eye x,y,z --look-at x,y,z] [--size WxH] [--note TEXT]` | A path-traced PNG of the current state, with a reference picture beside it. A snapshot draws the room, the mat and the textures; the page draws only the bench and what you added. |
| `ref frames CLIP [--at 0:closed,4.5:lid_open,end] [--every S]` | Stills out of a clip at those seconds, a contact sheet with the seconds burnt in, and `ref/timeline.json` anchoring them. |
| `compare [--ref PHOTO] [--camera N] --key NAME=HOW ... [--note TEXT]` | The scene against the photograph: the pair at full size, per keyed thing its size, offset and overlap, and a look sheet. |
| `compare --take NAME --key ...` | A recorded take against the clip's timeline: each anchor, and what moved in each. |
| `check [--camera N] --key ... [--object NAME ...]` | The gate: builds, finite state, camera at the clip's aspect, every named thing present, penetration and drift at rest under their bars. |
| `log [--last N]` | Every snapshot, compare and check so far, with its score and the `scene.py` it measured. |
| `play [NAME] [--record TAKE --camera N]` | Play a routine the scene file binds, as its button on the page does. |
| `show PATH [--label TEXT]`, `show --clear` | A picture on the page's board for the person watching. |
| `run N` | Step N control steps, then hold. Refused while a routine plays; ends with an error if the scene is rebuilt or reset during the run. |
| `pause`, `resume` | Pause or resume stepping. |
| `reset` | Reset the scene. It also stops a playing routine and finishes its take; Pause is left as it was. |
| `eval "CODE" [--record NAME --every K --camera N]` | Run Python on the sim thread in `scene.py`'s namespace (`sim`, `scene`, `np`, `rss`, and every name the file bound). What it binds, routines and `play` see until the next save starts the namespace over. A generator plays on the page step by step; `--record` films it. |
| `catalog [robots\|grippers\|cells\|assets]` | The names the registries know. |
| `ref show PATH`, `ref hide` | A picture in the page's sidebar. |
| `quit` | Stop the server. |

`--json` after any command prints the reply raw.

Output files (numbering continues from the files already in `run/`, across
restarts):

- `run/snap_NNN.png`; with `--beside`, also `run/snap_NNN_vs_ref.png`
- `run/cmp_NNN_beside.png`, `run/cmp_NNN_look.png`, `run/cmp_NNN.json`; for a
  take, `run/cmp_NNN_strip.png`
- takes: `run/NAME.mp4`, `run/NAME.json` (every frame's step, time and
  positions), `run/NAME_seg.npz`
- `run/log.jsonl` (every reading), `run/serve.log` (the server's output)
- from `ref frames`: `ref/tSSS.SS.jpg`, `ref/contact.jpg`, `ref/timeline.json`

## Acting

`eval` blocks the page while it runs, unless it returns a generator. A generator
is played one `next()` per loop pass, so a routine that steps the sim between
`yield`s is drawn step by step:

```bash
./ctl eval "$(printf 'def go():\n    for _ in range(120):\n        sim.run(1)\n        yield\n')"
./ctl eval "go()"
```

Rebuilds land running (`up --hold` lands them paused). While a routine plays
(from `eval`, `play` or **Run**) it steps the scene itself: the page's own
stepping is held whatever **Pause** says, and returns to its previous state
when the routine ends.

## Readings

`compare` measures each keyed thing in the render against the photograph:
size ratio, centre offset in pixels, and overlap (IoU). Re-run it after each
edit to see whether the edit helped. The method and the finished-twin
criteria are in the
[`real-to-sim` skill](../../.claude/skills/real-to-sim/SKILL.md).

### Keys

The render's segmentation names each thing; the photograph needs a `--key`
saying how to find it:

| key | finds |
| --- | --- |
| `case=red` | the largest patch of that colour (`red orange yellow green cyan blue purple white black grey wood`) |
| `socket=@1240,410` | the patch of the colour at that pixel of the photograph |
| `case=red@980,640` | the patch of that colour containing that pixel |
| `case=#d01a10~0.1` | a hex colour, with a tolerance |

The name is the thing's scene name; pixels are in the photograph's own
resolution.

### What `compare` says

```
case: sim is 0.70x the photo's size (w 0.77x, h 0.60x), centre 5 px left, 78 px high (6.1% of the frame), IoU 0.31
socket: sim is 0.81x the photo's size (w 0.44x, h 0.87x), centre 122 px left, 20 px low (9.7% of the frame), IoU 0.00
```

`score` is the mean IoU.

`snapshot --beside ref/<still>` and `compare` (as `cmp_NNN_beside.png`) put
the render beside the still at full size; open it first after each save. The
**look sheet** (`cmp_NNN_look.png`) shows the pair; the photograph with each
thing outlined twice (the photo's outline yellow, the render's cyan); each
keyed thing cropped from both pictures at one scale; and both pictures with
the things painted out, which shows what stands behind them. Write down what
the photograph has that the render lacks, per thing and behind them (a lid
seam, latch tabs, a label, the table top, the couch); that list is the next
edit.

### The gate

`check` prints PASS/FAIL per test with the measured number:

```
PASS  builds       the last rebuild landed
PASS  finite       every number in the state is finite
PASS  camera       phone 1280x720, fov 37 deg; clip 1920x1080
PASS  objects      all of case, socket, extension are in the scene
FAIL  penetration  worst overlap 1.99 mm between socket and table
PASS  rest         nothing moved more than 0.4 mm in 60 steps
```

The rest check steps the scene, then resets it to its start: a pose set with
`eval` or reached with `run N` is not kept. `check` is refused while a routine
plays. `--steps`, `--settle-mm` and `--penetration-mm` set the bars. The bars
are defaults and `check` blocks nothing.

### The take

`--record NAME` films a routine as the page plays it (the video, every
frame's segmentation at quarter size, every thing's position).
`compare --take NAME --key ...` holds it against the clip's
`ref/timeline.json`: each anchor's still beside the take's frame at the same
point of the action, the keyed things' IoU there, and whether, and by how
much, each thing moved in the clip and in the take. The clip and the take
need not run the same length. An anchor is matched by proportion, or pinned
with `"sim_t"` or `"sim_step"` in the timeline. A seed is a pixel of one
still, so key the things that move by colour. The strip has the clip's
anchors above and the take's frames below.

When a take ends, the page runs this compare itself with the last
`compare`'s keys, logs it like any other reading, and puts the strip on the
board under a one-line verdict: `2 of 3 did what the clip did; lid stayed
(clip moved)`. Without a timeline or a prior `compare --key`, it prints one
line saying which is missing and does nothing else.

### The board

The `Live` folder at the top of the sidebar is a board for the person
watching: `./ctl show <png> --label "<what it is>"` adds a picture (the same
label replaces it), and `--clear` removes them all. `compare` posts its pair
and look sheet, and a take its strip under its verdict, by themselves. The
board survives a rebuild. Below it are the **Run** and **Reset** buttons.

### The log

`compare`, `check` and `snapshot --note` append to `run/log.jsonl` with the
hash of the `scene.py` they measured; `./ctl log` prints it. Use `--note` to
say what each edit changed.

## Frames and units

### Units and axes

- Metres, seconds, radians, kilograms and newtons.
- `+z` is up. Gravity points along `-z`.
- A position is `(x, y, z)`. A pose is `(x, y, z, qx, qy, qz, qw)`: the
  quaternion is scalar-last, as Newton stores it.

### The work-surface frame

Every `at` you give a constructor is in the cell's work-surface frame. Its
origin is the middle of the work surface, at its top, and its axes are the
world's.

```python
import robosimstudio as rss

scene = rss.Scene(cell="bench_075")
cube = scene.add(rss.box(name="cube", half=(0.025,) * 3, at=(0, 0, 0.2)))
sim = scene.build()
sim.run(150).sync()
print(cube.position)    # (0.600, 0.000, 0.775)

cell = rss.get_cell("bench_075")
print(cell.center, cell.surface_z)    # (0.6, 0.0, 0.0) 0.75
```

The cube was placed 200 mm above the middle of the bench. It reads in the world
frame: `bench_075` is a 750 mm bench centred at world `x = 0.6`, and the cube
rests with its centre 25 mm above the top. The same spec moves to another bench
unchanged.

| Cell | Work surface |
| --- | --- |
| `void` | The floor. `z` is a height above the ground. |
| `bench_075` | A bench 750 mm high, 595 mm by 1300 mm. |
| `bench_0728` | A bench 728 mm high, 600 mm by 800 mm. |

`rss.list_cells` lists every cell and
`rss.get_cell` returns one. `center` and
`surface_z` are the frame's origin in the world.

What `at` places:

- Rigid bodies, `slab` and `post`: the centre.
- `sheet`: the origin corner. Subtract half the size to centre a sheet.
- `sponge`: the centre of the bottom face.
- `robot`: the base. `rss.robot("panda", at=(-0.5, 0, 0))` puts it there, and a
  pose `(x, y, z, qx, qy, qz, qw)` also turns it. Left out, a registered robot
  stands at its own mount: at the edge of the work surface, facing `+x`, so the
  work is in front of it.

### Where the world frame shows

- Reads: `ref.position`, `ref.pose`, `ref.velocity` and `sim.read()`.
- Cameras: `rss.CameraSpec` `eye` and `look_at`, and
  `./ctl snapshot --eye --look-at`.

### Time

- `sim.run(n)` advances `n` control steps. Under `rss.GENERIC` a control step
  is 1/60 s, with 16 solver substeps.
- `sim.time` is the simulated time in seconds since the build.
- `sim.sync()` waits for the GPU. Call it before reading.

### Grippers

`sim.step(action, mode="joint_position")` takes, for each arm, its joint
targets and then one gripper value. The gripper value is `0` for open and `1`
for shut. It is not a width in metres.

### Names

Every thing has a unique `name`. `scene.add` refuses a duplicate, and
`sim["cube"]` looks one up.
````

## examples/08_demos/wipe_the_bar/README.md

````text
# Wipe the bar

![Wipe the bar](media/wipe_the_bar.webp)

The twin of a real cell: two YAMs, a sponge on a gridded foam mat, and a chrome
grab bar bolted into two black blocks with a blue marker stripe on its crown.
Press **Wipe the bar** under *Routine*: the left hand steadies the bar at its far
elbow, the right picks up the sponge, wipes the stripe off, puts the sponge
back, and both arms go home.

The jaws grip the sponge by contact; once the grip settles, the foam under the
pads is pinned to the hand until **Open**. Friction alone let the sponge slide
out in the wipe (see [Why a latch](#why-a-latch)).

```bash
uv run --extra superdex python examples/08_demos/wipe_the_bar/wipe_the_bar.py
```

Needs the `[superdex]` extra (Python 3.12) and a GPU. The first run builds the
YAM's fingertip collision and compiles the kernels, which takes about a minute.

## The files

| | |
| --- | --- |
| [`wipe_the_bar.py`](wipe_the_bar.py) | builds the scene, installs the latch and opens the page, with the press readout, a contact map and the Run button |
| [`bar.py`](bar.py) | the scene: the layout measured off the clip, the welded bar, the stripe that wears off, the physics, the latch |
| [`routine.py`](routine.py) | the job, as a generator the page plays one control step at a time |

The layout is the `surface_prep` task's, measured off the *Surface Preparing*
clip against the mat's 25 mm grid: a 25 mm tube with a 340 mm straight run on
two 32 mm elbows, its legs 50 mm into 76 x 80 x 70 mm blocks on a 10 mm mat; the
stripe is the middle 200 mm of the crown and 9 degrees wide (243 cells of
2.5 mm); the sponge is 50 x 75 x 30 mm, 70 mm past the near block's outer face.
The stripe wears by Preston's law, `ink' = -k_p * pressure * sliding speed`, fed
by SuperDex's own contact samples on the bar, with no wear under 300 Pa. Its
**cleaned fraction** -- the share of cells with a tenth of their ink or less --
is the job's measure.

## The grasp, the latch, the release

In that order, and the same whether the routine presses the buttons or you do:

1. **The friction grasp.** **Close** on the sponge, and the jaws close at no more
   than 80 mm/s and squeeze it at their 8 N cap: by contact, with nothing pinned.
   They stop 45.6 mm apart on the 50 mm foam, each pad pressing it with 8.6-8.9 N.
2. **The latch, once the grasp is made.** While the jaws are told to close,
   `bar.Latch` checks after every control step for all three of:
   - the opening still, moving no more than **0.3 mm over 12 steps (0.2 s)**;
   - each pad pressing the foam with at least **2 N** of normal force, read off
     SuperDex's contact records;
   - the opening at least **2 mm under the foam's own width** across the jaws.

   Then it pins the 106 foam nodes within 6 mm of the pads' contact samples
   where they stand, and the bridge carries them on the hand, re-aimed every
   engine substep. A hand closed on air or on one edge never meets the test and
   never latches, and the routine stops and says what it read. Measured: it
   engaged 1.0 s after Close; the pinned foam moved 0.006-0.008 mm in the hand in
   the next 0.1 s, 0.008-0.012 mm by the time the hand had risen 10 mm, and
   0.06 mm through the whole wipe.
3. **The release.** **Open** unpins the foam on that step.

## What the routine does

1. **Steady.** The left gizmo goes 50 mm over the far elbow, down until the jaws
   straddle the tube 4 mm over its axis, and the jaws close to 29 mm (the 25 mm tube
   plus 4), resting on the bar without clamping it; this hand never latches.
2. **Pick.** The right gizmo goes 100 mm over the sponge, top-down with the jaws
   across its 50 mm side, down until the pads are on its middle, and **Close**;
   the take waits up to 1.5 s for the latch.
3. **Carry.** Up 100 mm, over the near block at the crossing height leaning 35
   degrees along the bar, then over the near end of the stripe.
4. **Wipe.** Down a millimetre at a time until the stripe reads 4 N, then a
   stroke toward the far end at 60 mm/s, the hand following the press up and
   down; up, back, and again, four times or until the stripe is 96 % clean.
   Strokes go one way only, the low edge of the leaning sponge trailing.
5. **Put back.** Back over the near block, down onto the spot the sponge came
   from, **Open**, up; the left hand opens and lifts; both gizmos go home.

A take is 59.5 s of simulated time.

## Measured

Three takes of the test (`uv run python -m unittest tests.test_demo_wipe_the_bar`,
slow: the whole job through the Run button), 2026-10-13, one RTX PRO 6000 Blackwell, nine assertions each:

| take | cleaned | peak press | peak pressure | sponge put back | arms home | finite | result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.955 | 4.93 N | 84 kPa | 0.1 mm from its spot | yes | yes | 9/9 |
| 2 | 0.959 | 4.91 N | 84 kPa | 0.1 mm from its spot | yes | yes | 9/9 |
| 3 | 0.959 | 4.91 N | 84 kPa | 0.0 mm from its spot | yes | yes | 9/9 |

In every take nothing was pinned before the first Close or after the last
Open, the latch engaged once and released once, and the four strokes cleaned
0.91, 0.94, 0.95 and 0.95-0.96 of the stripe in turn.

## Why a latch

Without it -- the same grasp, the foam held by the jaws' squeeze and its
friction alone, at the sponge's lowest workable `friction_falloff` (0.1 mm/s) --
three takes cleaned 0.761, 0.724 and 0.687 of the stripe, the foam under the
pads slid 69, 226 and 218 mm in the hand, and in two of the three the sponge
left the jaws before the last stroke. The pick and the carry held (3-9 mm of
slide); every stroke slid it 10-20 mm, back along the bar and up toward the
palm, with the pads reporting 8-9 N of grip and the bar 0.4-0.6 N of drag.

Over 30 more takes, none kept the slide under 10 mm: falloff 1 and 0.1 mm/s; a
12 N grip; presses of 1.5-4 N; a 25 degree lean; strokes both ways and at
120 mm/s; bar friction 0.2, sponge friction 2.0; the clip's soft foam (the jaws
closed through it on the pick). One convex hull of each fingertip's last
30-60 mm instead of 48 and 52 pieces held a lifted sponge as well (0.11-0.14 mm
slip over 3 s), and three wipes still lost it (cleaned 0.65, 0.81, 0.71).
````

## examples/08_demos/wipe_the_bar/bar.py

````text
# SPDX-License-Identifier: Apache-2.0
"""The scene ``wipe_the_bar.py`` runs: a real cell's grab bar, sponge and marker stripe, measured off its clip.

Every number in :class:`Layout` was measured off the clip against the mat's
25 mm grid, following the ``surface_prep`` task.
"""

from __future__ import annotations

import itertools
import math
from collections import deque
from dataclasses import dataclass, replace

import newton
import numpy as np
import warp as wp
from robosimstudio.domains.soft import FIRM_FOAM

import robosimstudio as rss
from robosimstudio.core.math import quat_to_mat
from robosimstudio.core.render.finish import BRUSHED_METAL, MATTE, SATIN
from robosimstudio.core.render.room import LAB_GRID_MAT, LAB_MAT_GREY
from robosimstudio.domains.capabilities import host_bridge
from robosimstudio.domains.rigid import EntityRigid
from robosimstudio.scene.entity import label_index
from robosimstudio.specs import ActuationSpec

# =============================================================================
# 1. The layout
# =============================================================================


@dataclass(frozen=True)
class Layout:
    """Where everything stands [m], in the bench's work-surface frame: +x away from the arms, -y the right arm.

    Measured off the clip against the mat's 25 mm grid (300 mm tiles): the tube is
    one square across, the sponge three squares long, the end blocks three wide.
    The bar's origin is the one the ``surface_prep`` task moved it to so the rig's
    overhead camera frames the bar and the sponge together.
    """

    mat_thickness: float = 0.010  # an EVA puzzle mat over the whole bench top
    tube_radius: float = 0.0125  # a 25 mm tube: one grid square across
    straight_half: float = 0.170  # half the straight run: 13.5 squares between the elbows
    bend_radius: float = 0.032  # centreline radius of the elbows
    leg_drop: float = 0.050  # bar axis to the blocks' top face: two tube diameters
    block_half: tuple[float, float, float] = (0.038, 0.040, 0.035)  # 76 deep, 80 along the bar, 70 tall
    block_inset: tuple[float, float] = (0.018, 0.020)  # block centre from its leg: +x, and outward along the bar
    bar_x: float = -0.05
    bar_y: float = 0.05
    sponge_size: tuple[float, float, float] = (0.050, 0.075, 0.030)  # three squares by two, long axis along the bar
    sponge_cells: tuple[int, int, int] = (9, 13, 6)  # ~5.5 mm nodes, 980 of them
    sponge_gap: float = 0.070  # clear mat between the near block's outer face and the sponge
    sponge_forward: float = 0.035  # the sponge lies this far past the bar's line, away from the arms
    stripe_half: float = 0.100  # the marker line covers the middle 200 mm of the run
    stripe_half_angle_deg: float = 9.0  # and is ~4 mm wide round the tube
    support_u: float = 0.170  # the left hand steadies the far elbow's tangent point

    @property
    def mat_top(self) -> float:
        return self.mat_thickness

    @property
    def bar_z(self) -> float:
        """The bar's axis height: the blocks' top plus the leg drop."""
        return self.mat_top + 2.0 * self.block_half[2] + self.leg_drop

    @property
    def crown_z(self) -> float:
        return self.bar_z + self.tube_radius

    @property
    def leg_u(self) -> float:
        """Along the bar from its centre to a leg's axis."""
        return self.straight_half + self.bend_radius

    def block_centre(self, sign: float) -> tuple[float, float, float]:
        """A block's centre; ``sign`` is +1 for the far (+y) end, -1 for the near."""
        return (
            self.bar_x + self.block_inset[0],
            self.bar_y + sign * (self.leg_u + self.block_inset[1]),
            self.mat_top + self.block_half[2],
        )

    @property
    def sponge_at(self) -> tuple[float, float, float]:
        """The sponge's bottom-face centre on the mat, past the near block's outer face."""
        outer = self.block_centre(-1.0)[1] - self.block_half[1]
        return (self.bar_x + self.sponge_forward, outer - self.sponge_gap - 0.5 * self.sponge_size[1], self.mat_top)


LAYOUT = Layout()

FOAM = replace(FIRM_FOAM, friction_falloff=1.0e-4)
"""A firm foam, with as much static friction as SuperDex's regularised law gives.

Firm because the jaws are narrow: squeezed at 8 N a finger, the clip's soft
kitchen foam (20 kPa) flowed out between the pads until they met and the sponge
stayed on the mat; this one (80 kPa) is squeezed from 50 mm to 45.5 mm and comes
up. Below ``friction_falloff`` of slip SuperDex's friction grows with the slip,
so nothing is held still, and against a collider it drives by pose -- every pad,
the bar, the mat -- the value it uses is the sponge's, not the collider's. Even
at 0.1 mm/s the foam slid in the jaws under the wipe, which is why the hold is
latched once the grasp is made (section 5)."""

PHYSICS = rss.ArrangementSpec(
    control_hz=60.0,
    substeps=16,
    backends=(
        # The arms, the bar and the bench on MuJoCo; the sponge on SuperDex, two engine steps a frame.
        (
            "*",
            rss.backend(
                "mujoco",
                use_mujoco_contacts=True,
                nconmax=2048,
                njmax=4096,
                iterations=100,
                ls_iterations=50,
                cone="elliptic",
                impratio=10.0,
                enable_multiccd=True,
            ),
        ),
        # The foam pushes back on what presses it. Its push on a body is capped at
        # what moves that body ``feedback_dv_max`` in a control step, and a YAM
        # fingertip is 71 g: at the default 0.5 m/s that is 2.1 N against an 8 N
        # grip. On the Panda's 10 g pads the same cap let the jaws close a 50 mm
        # sponge to 6 mm (examples/02_soft/00_sponge.py); at 5 m/s it is 21 N.
        ("soft", rss.backend("superdex", substeps=2, feedback_dv_max=5.0)),
    ),
    collision=rss.CollisionSpec(contact_ke=6.0e4, contact_kd=500.0, rigid_contact_max=8192, rigid_gap=2.0e-4),
)
"""The arrangement the twin was measured under."""

ARM = ActuationSpec(target_ke=1600.0, target_kd=70.0)
"""Stiffened arm servos: at the robot file's own gain the hand lags ~10 mm under a press."""
GRIPPER = ActuationSpec(target_ke=20000.0, target_kd=20.0, effort_limit=8.0, joint_damping=100.0)
"""The jaws squeeze with 8 N a finger and no harder, and close at no more than 80 mm/s.

The damping is what makes **Close** a grip on foam. Undamped, the capped jaws
shut from 78 mm to 2 mm in a sixth of a second, through the sponge, on firm foam
and soft alike; damped at 100 N s/m they stop on it at 45.5 mm."""

CHROME = (0.80, 0.80, 0.80)
INK = (0.060, 0.090, 0.300)
STEEL = replace(BRUSHED_METAL, roughness=0.3, metallic=0.95)

# =============================================================================
# 2. The bar
# =============================================================================


@dataclass(frozen=True, kw_only=True)
class BarSpec(rss.ObjectSpec):
    """A tube on two elbows whose legs drop into the blocks. Its axis is local z, its crown local +x."""

    entity: str = "grab_bar_tube"
    name: str = "bar"
    static: bool = True
    radius: float = LAYOUT.tube_radius
    half_len: float = LAYOUT.straight_half
    bend_radius: float = LAYOUT.bend_radius
    leg_drop: float = LAYOUT.leg_drop
    buried: float = 0.015  # how far each leg runs into its block
    color: tuple[float, float, float] = CHROME
    friction: float = 0.6

    def __post_init__(self) -> None:
        if self.shape is None:  # the straight run is the spec's own cylinder
            object.__setattr__(
                self, "shape", rss.ShapeSpec(kind="cylinder", radius=self.radius, half_height=self.half_len)
            )


@rss.register_entity("grab_bar_tube")
class GrabBar(EntityRigid):
    """The straight run, built by ``EntityRigid``, plus an elbow and a leg at each end, welded to the world."""

    def build(self, builder: newton.ModelBuilder, episode) -> None:
        super().build(builder, episode)
        spec = self.spec
        # A static object is a jointless link, which MuJoCo's converter refuses: weld it to the world.
        builder.add_joint_fixed(-1, self.body, parent_xform=builder.body_q[self.body], label=f"{spec.name}_weld")
        cfg, r, bend = self._contact_cfg(builder), float(spec.radius), float(spec.bend_radius)
        for end, sign in (("far", 1.0), ("near", -1.0)):
            centre = np.array([-bend, 0.0, sign * spec.half_len])  # the bend's centre of curvature
            points = [
                centre + bend * np.array([math.sin(a), 0.0, sign * math.cos(a)]) for a in np.linspace(math.pi / 2, 0, 6)
            ]
            points.append(points[-1] + np.array([-(spec.leg_drop - bend + spec.buried), 0.0, 0.0]))  # the leg
            for k, (a, b) in enumerate(itertools.pairwise(points)):
                self._tube(builder, a, b, r, cfg, f"{spec.name}_{end}_{k}")
                builder.add_shape_sphere(
                    self.body, xform=wp.transform(wp.vec3(*b), wp.quat_identity()), radius=r, cfg=cfg, color=CHROME
                )

    def _tube(self, builder, a, b, radius, cfg, label) -> None:
        d = b - a
        length = float(np.linalg.norm(d))
        axis = np.cross([0.0, 0.0, 1.0], d / length)  # a cylinder's axis is its local z: turn z onto d
        s = float(np.linalg.norm(axis))
        q = (
            wp.quat_from_axis_angle(wp.vec3(*(axis / s)), math.atan2(s, d[2] / length))
            if s > 1e-9
            else wp.quat_identity()
        )
        builder.add_shape_cylinder(
            self.body,
            xform=wp.transform(wp.vec3(*(0.5 * (a + b))), q),
            radius=radius,
            half_height=0.5 * length,
            cfg=cfg,
            color=CHROME,
            label=label,
        )

    def apply_display(self, builder: newton.ModelBuilder) -> None:
        super().apply_display(builder)
        for s in range(*self.range.shapes):
            self.finishes[s] = STEEL


# =============================================================================
# 3. The stripe
# =============================================================================
# The marker line is cells on the tube's surface, each with ink in [0, 1], drawn as
# thin decals on the bar. Preston's law wears them: ink falls at k_p * pressure *
# sliding speed, so a still press removes nothing and nothing ever comes back.
# The pressure is the foam's own: SuperDex reports every contact sample's force
# and quadrature area, and a cell is worn at the rate of the nearest sample.


@dataclass(frozen=True, kw_only=True)
class StripeSpec:
    """A marker line along the bar's crown, as cells on the tube that wear off."""

    entity: str = "marker_stripe"
    name: str = "stripe"
    bar: str = "bar"
    sponge: str = "sponge"
    radius: float = LAYOUT.tube_radius
    half_length: float = LAYOUT.stripe_half
    half_angle: float = math.radians(LAYOUT.stripe_half_angle_deg)
    pitch: float = 0.0025  # cell size on the surface: about the contact samples' spacing
    reach: float = 0.004  # how far one contact sample wipes
    k_p: float = 1.2e-2  # Preston coefficient [1/(Pa m)]: a 4 N, 30 mm/s stroke clears a cell in ~2 s
    p_min: float = 300.0  # [Pa] the contact's 2 mm padding band reports samples at ~0 N; they wipe nothing
    cleared_below: float = 0.1  # a cell with this much ink or less counts as clean
    window: int = 5  # control steps the press is averaged over: the solver drops a settled pair for a step or two
    color: tuple[float, float, float] = INK
    bare: tuple[float, float, float] = CHROME


@rss.register_entity("marker_stripe")
class MarkerStripe(rss.Entity):
    """Decals on the bar, the ink under them, and the wear law, run once per control step."""

    recolors_live = True  # tells the studio to redraw the decals' colours as they change

    def build(self, builder: newton.ModelBuilder, episode) -> None:
        spec = self.spec
        self.bar_body = label_index(list(builder.body_label), spec.bar)
        nu = round(spec.half_length / spec.pitch)
        na = round(spec.half_angle * spec.radius / spec.pitch)
        u, a = np.meshgrid(np.arange(-nu, nu + 1) * spec.pitch, np.arange(-na, na + 1) * spec.pitch / spec.radius)
        self.cells = np.stack([u.ravel(), a.ravel()], axis=1)  # (axial [m], angle from the crown [rad])
        self.ink = np.ones(len(self.cells))
        cfg = newton.ModelBuilder.ShapeConfig(density=0.0, has_shape_collision=False, has_particle_collision=False)
        self.first_decal = builder.shape_count
        lift = spec.radius + 2.0e-4
        for i, (ui, ai) in enumerate(self.cells):
            turn = wp.quat_from_axis_angle(wp.vec3(-math.sin(ai), math.cos(ai), 0.0), math.pi / 2)  # +z outward
            builder.add_shape_box(
                self.bar_body,
                xform=wp.transform(wp.vec3(lift * math.cos(ai), lift * math.sin(ai), ui), turn),
                hx=spec.pitch / 2,
                hy=spec.pitch / 2,
                hz=1.0e-4,
                cfg=cfg,
                color=spec.color,
                label=f"{spec.name}_{i:03d}",
            )
        self.bridge, self.samples = None, np.zeros((0, 3))
        self.press, self.peak, self.recent = 0.0, 0.0, deque(maxlen=spec.window)

    @property
    def cleaned(self) -> float:
        """The share of the stripe's cells wiped clean: the job's measure of success."""
        return float(np.mean(self.ink <= self.spec.cleared_below))

    @property
    def held_press(self) -> float:
        """The press [N] averaged over the last few steps it was nonzero, which a force loop can steer by."""
        live = [f for f in self.recent if f > 0.0]
        return float(np.mean(live)) if live else 0.0

    def apply_display(self, builder: newton.ModelBuilder) -> None:
        super().apply_display(builder)
        for s in range(*self.range.shapes):
            self.finishes[s] = STEEL

    def contribute_hooks(self, hooks) -> None:
        # After the step, where SuperDex has just stepped and its contact query is fresh.
        hooks.add("after", self.wipe, name="marker-stripe", cadence=1)

    def on_scene_ready(self, pipeline) -> None:
        self.bridge = host_bridge(pipeline, self.spec.sponge)
        if self.bridge is None:
            raise RuntimeError(f"{self.spec.sponge!r} is not on SuperDex, so there is no contact patch to wipe with")
        pose = pipeline.state_0.body_q.numpy()[self.bar_body]  # welded: read once
        self.origin, self.rot = pose[:3].astype(np.float64), quat_to_mat(pose[3:7].astype(np.float64))

    def wipe(self, state, dt) -> None:
        """One control step of wear, from this step's contact samples against the bar."""
        if self.bridge is None:
            return
        spec = self.spec
        s = self.bridge.contact_points(spec.sponge, against=self.bar_body)
        local = (s["pos"] - self.origin) @ self.rot  # world -> the bar's own frame
        on_tube = np.abs(np.hypot(local[:, 0], local[:, 1]) - spec.radius) <= 0.004
        force = np.linalg.norm(s["force"], axis=1)
        pressure = force / np.maximum(s["area"], 1.0e-9)
        u, angle = local[:, 2], np.arctan2(local[:, 1], local[:, 0])
        self.press = float(force[on_tube].sum())
        self.recent.append(self.press)
        self.peak = float(pressure[on_tube].max()) if on_tube.any() else 0.0
        self.samples = np.stack([u, angle, pressure], axis=1)[on_tube]
        live = on_tube & (pressure >= spec.p_min)
        if not live.any():
            return
        # Only the tangential (sliding) part of the relative velocity wears.
        normal = s["force"] / np.maximum(force, 1.0e-12)[:, None]
        rel = s["v_soft"] - s["v_other"]
        slide = np.linalg.norm(rel - normal * np.sum(rel * normal, axis=1)[:, None], axis=1)
        du = self.cells[:, :1] - u[live][None]
        da = (self.cells[:, 1:] - angle[live][None] + math.pi) % (2 * math.pi) - math.pi
        d2 = du**2 + (da * spec.radius) ** 2
        nearest = np.argmin(d2, axis=1)
        reached = d2[np.arange(len(self.cells)), nearest] <= spec.reach**2
        rate = spec.k_p * pressure[live] * slide[live]
        self.ink[reached] = np.maximum(0.0, self.ink[reached] - rate[nearest[reached]] * float(dt))
        self.paint()

    def paint(self) -> None:
        """Fade each decal from the ink's colour to the bare chrome under it."""
        bare, ink = np.asarray(self.spec.bare), np.asarray(self.spec.color)
        colours = bare + (ink - bare) * self.ink[:, None]
        model = self.stepping_model if self.stepping_model is not None else self.model
        src = wp.array(colours.astype(np.float32), dtype=wp.vec3, device=model.device)
        wp.copy(model.shape_color, src, dest_offset=self.first_decal, count=len(colours))

    def reset(self, pipeline, episode, *, world: int = 0) -> None:
        self.ink[:] = 1.0
        self.press, self.peak, self.samples = 0.0, 0.0, np.zeros((0, 3))
        self.recent.clear()
        if self.model is not None:
            self.paint()


# =============================================================================
# 4. The scene
# =============================================================================


def scene(layout: Layout = LAYOUT) -> rss.Scene:
    """Two YAMs at home with their hands open, the gridded mat, the blocks, the bar, and the sponge on the mat."""
    sc = rss.Scene(cell="bench_075", name="wipe_the_bar", physics=PHYSICS)
    sc.add(rss.robot("yam_i2rt", arm=ARM, gripper=GRIPPER))
    fixture = rss.SimRequirements(domain="static", contacts=rss.contacts_with("objects", "robot", "deformables"))
    hx, hy = rss.get_cell("bench_075").half[:2]
    t = layout.mat_thickness / 2
    sc.add(
        rss.StaticSpec(
            name="mat",
            half_extents=(hx, hy, t),
            xform=(0.0, 0.0, t, 0.0, 0.0, 0.0, 1.0),
            friction=0.9,
            color=LAB_MAT_GREY,
            finish=LAB_GRID_MAT,
            sim=fixture,
        )
    )
    for which, sign in (("near", -1.0), ("far", 1.0)):
        sc.add(
            rss.StaticSpec(
                name=f"block_{which}",
                half_extents=layout.block_half,
                xform=(*layout.block_centre(sign), 0.0, 0.0, 0.0, 1.0),
                friction=0.9,
                color=(0.018, 0.018, 0.021),
                finish=SATIN,
                sim=fixture,
            )
        )
    sc.add(
        BarSpec(
            pose=(layout.bar_x, layout.bar_y, layout.bar_z),
            quat=(-0.5, -0.5, -0.5, 0.5),  # local z (the axis) onto world y, local x (the crown) onto world z
            sim=rss.SimRequirements(
                domain="rigid", contacts=rss.contacts_with("surface", "fixtures", "robot", "deformables")
            ),
        )
    )
    sc.add(
        rss.sponge(
            name="sponge",
            size=layout.sponge_size,
            cells=layout.sponge_cells,
            at=layout.sponge_at,
            material=FOAM,
            color=(0.93, 0.94, 0.94),
            finish=replace(MATTE, roughness=0.95),
            sim=rss.SimRequirements(
                domain="soft", contacts=rss.contacts_with("surface", "hands", "fixtures", "objects")
            ),
        )
    )
    sc.add(StripeSpec(radius=layout.tube_radius, half_length=layout.stripe_half))
    return sc


# =============================================================================
# 5. The latch
# =============================================================================
# Friction alone let the sponge slide out in the wipe (README, Why a latch). So the
# grasp stays physics and only the hold is pinned: nothing touches the foam until
# the jaws have gripped it by contact.

LATCH_SETTLE = 12
"""Control steps (0.2 s) over which the jaws' opening must hold still before the latch engages."""
LATCH_STILL = 3.0e-4
"""[m] How far the opening may move over those steps and still count as settled."""
LATCH_PRESS = 2.0
"""[N] The normal force each pad must have on the foam."""
LATCH_SQUEEZE = 0.002
"""[m] How far under the foam's own width across the jaws the opening must be."""
LATCH_REACH = 0.006
"""[m] Foam nodes this close to a pad's contact samples are the ones pinned."""
LATCH_STIFFNESS, LATCH_DAMPING = 4000.0, 20.0
"""The engine's compliant node constraints [N/m, N s/m]: the pinned patch still argues with contact."""


class Latch:
    """The foam under the right pads, pinned to the hand once the jaws have gripped it, until they open.

    Install it once with :func:`latch`; it runs after every control step. While
    the right gripper is told to close (a command over one half), it waits for a
    grasp: the jaws' opening still to :data:`LATCH_STILL` over :data:`LATCH_SETTLE`
    steps, each pad pressing the foam with :data:`LATCH_PRESS` or more, and the
    opening :data:`LATCH_SQUEEZE` under the foam's width across the jaws. Then it
    pins the foam nodes within :data:`LATCH_REACH` of the pads' contact samples
    where they are, so nothing moves when it engages, and the bridge carries
    them on the hand's body. A command under one half unpins them. A hand closed
    on air or on one edge never meets the test and never latches.

    Attributes:
        readings: What the last check read: ``opening``, ``still``, ``press``
            (per pad) and ``free`` (the foam's width across the jaws) [m, N].
        events: ``(step, "engaged" | "released", readings)``, in order.
    """

    def __init__(self, sim, *, arm: str = "right", sponge: str = "sponge") -> None:
        self.arm = arm
        self.sponge = sim[sponge]
        self.bridge = self.sponge.entity.bridge
        self.sides = tuple(tuple(int(b) for b in side) for side in sim.scene.embodiment.arms[arm].finger_bodies)
        self.size = np.asarray(self.sponge.entity.spec.size, dtype=np.float64)
        self.openings: deque = deque(maxlen=LATCH_SETTLE)
        self.pin: int | None = None
        self.nodes = np.zeros(0, dtype=np.int64)
        self.local = np.zeros((0, 3))
        self.readings: dict = {}
        self.events: list[tuple[int, str, dict]] = []

    @property
    def latched(self) -> bool:
        return self.pin is not None and self.bridge.has_pin(self.pin)

    def __call__(self, sim) -> None:
        gripper = sim.gripper(self.arm)
        if self.pin is not None and not self.bridge.has_pin(self.pin):
            self.pin = None  # a reset took it
        if gripper.command < 0.5:
            self.openings.clear()
            if self.pin is not None:
                self.bridge.unpin(self.pin)
                self.pin = None
                self.events.append((sim.step_count, "released", dict(self.readings)))
            return
        if self.pin is not None:
            return  # riding the hand: the bridge re-aims it every engine substep
        pos, quat = sim.arm(self.arm).ee_pose(sim.state)
        rot = quat_to_mat(np.asarray(quat, dtype=np.float64))
        self.openings.append(float(gripper.width(sim.state)))
        if len(self.openings) < LATCH_SETTLE:
            return
        samples = [self.bridge.contact_points("sponge", against=b) for side in self.sides for b in side]
        per_side, k = [], 0
        for side in self.sides:
            got = samples[k : k + len(side)]
            k += len(side)
            per_side.append(sum(float(np.sum(c["force"] * c["normal"])) for c in got))
        jaw = rot[:, 1]  # the jaws close along the tool's y
        self.readings = {
            "opening": self.openings[-1],
            "still": max(self.openings) - min(self.openings),
            "press": per_side,
            "free": float(np.abs(jaw) @ self.size),
        }
        r = self.readings
        gripped = (
            r["still"] <= LATCH_STILL and min(r["press"]) >= LATCH_PRESS and r["opening"] <= r["free"] - LATCH_SQUEEZE
        )
        if not gripped:
            return
        nodes = np.asarray(self.sponge.particle_q, dtype=np.float64)
        touched = np.concatenate([c["pos"] for c in samples if len(c["pos"])])
        near = np.min(np.linalg.norm(nodes[:, None, :] - touched[None, :, :], axis=2), axis=1) <= LATCH_REACH
        self.nodes = np.flatnonzero(near)
        here = nodes[self.nodes]
        self.local = (here - np.asarray(pos)) @ rot  # where the foam is now, in the hand: no snap
        self.pin = self.bridge.pin_nodes(
            "sponge",
            self.sponge.particles[self.nodes],
            here.copy(),
            stiffness=LATCH_STIFFNESS,
            damping=LATCH_DAMPING,
        )
        # Carried on the hand's body and re-aimed every engine substep. Re-aimed
        # once a control step from here, the pinned foam trailed a lifting hand by
        # that step's travel: 1.6 mm, 10 mm into the lift, measured.
        body = sim.arm(self.arm).ee_body
        frame = sim.state.body_q.numpy()[body]
        self.bridge.ride(self.pin, body, (here - frame[:3]) @ quat_to_mat(frame[3:7]))
        self.events.append((sim.step_count, "engaged", dict(self.readings, nodes=int(len(self.nodes)))))


def latch(sim) -> Latch:
    """The scene's :class:`Latch`, installed in ``sim.post_step_hooks`` if it is not there yet."""
    for hook in sim.post_step_hooks:
        if isinstance(hook, Latch):
            return hook
    hook = Latch(sim)
    sim.post_step_hooks.append(hook)
    return hook


# =============================================================================
# 6. The contact map
# =============================================================================

EYE, LOOK = (0.02, -0.04, 1.32), (0.55, -0.12, 0.84)
"""[m, world] Where the page opens looking from, and at: from behind the arms, over the bar and the sponge."""
MAP_SPAN = (0.135, 0.015)  # [m] the map's half-extent: along the bar, round it
MAP_SCALE = (1.5, 4.0)  # [px/mm] along, round: the stripe is fifty times longer than it is wide
MAP_FULL_SCALE = 40000.0  # [Pa] red: the per-sample peaks of a firm wipe, where the foam wraps the tube


def contact_map(stripe: MarkerStripe) -> np.ndarray:
    """The bar's surface unrolled round the stripe: the ink left on each cell, and the press on top.

    Along the bar runs across the picture, the right hand's end on the right as
    the page opens; round the tube runs up and down, the far side on top. Each
    contact sample is a dot, yellow to red with its pressure, and faint where it
    is under the floor that wears anything.
    """
    ku, ka = 1000.0 * MAP_SCALE[0], 1000.0 * MAP_SCALE[1]
    w, h = int(2 * MAP_SPAN[0] * ku), int(2 * MAP_SPAN[1] * ka)
    img = np.full((h, w, 3), 60.0)
    spec = stripe.spec

    def px(u, angle):
        return ((MAP_SPAN[0] - u) * ku).astype(int), ((MAP_SPAN[1] - angle * spec.radius) * ka).astype(int)

    bare, ink = np.asarray(spec.bare) * 255, np.asarray(spec.color) * 255
    hu, ha = int(spec.pitch * ku / 2) + 1, int(spec.pitch * ka / 2)
    for x, y, left in zip(*px(stripe.cells[:, 0], stripe.cells[:, 1]), stripe.ink, strict=True):
        img[max(0, y - ha) : y + ha, max(0, x - hu) : x + hu] = bare + (ink - bare) * left
    xs, ys = px(stripe.samples[:, 0], stripe.samples[:, 1])
    inside = (xs >= 0) & (xs < w) & (ys >= 0) & (ys < h)
    for x, y, p in zip(xs[inside], ys[inside], stripe.samples[inside, 2], strict=True):
        t = min(1.0, p / MAP_FULL_SCALE)
        alpha = 0.35 + 0.6 * t if p >= spec.p_min else 0.18
        dot = img[max(0, y - 3) : y + 4, max(0, x - 2) : x + 3]
        dot[:] = dot * (1 - alpha) + np.array([255.0, 230.0 * (1 - t), 40.0 * (1 - t)]) * alpha
    return img.clip(0, 255).astype(np.uint8)
````

## examples/09_teleop/README.md

````text
# Teleoperation

Driving a simulated YAM from a real leader arm, and feeling
what the simulated arm runs into on the leader's own servos.

<!-- examples:start: written by scripts/example_readmes.py from each script's docstring -->

## Leader arm

![Leader arm](media/00_leader_arm.webp)

Drive the simulated YAM from a real leader arm, read only.

Each control step reads every connected leader, converts servo ticks to joint
angles through a calibration file, and applies them as one `joint_position`
action. Nothing is written to a servo. The cube is on the arm's own engine,
`rss.MUJOCO_500HZ`, so closed jaws hold it by friction. `--simulate` runs a
scripted hand that sweeps both arms and works the jaws, with no hardware. Needs
the `[lerobot-feetech]` extra and a calibrated leader arm.

```bash
uv run --extra lerobot-feetech examples/09_teleop/00_leader_arm.py
```

Source: [`00_leader_arm.py`](00_leader_arm.py)

## Force feedback

![Force feedback](media/01_force_feedback.webp)

Feel what the simulated arm runs into, on the leader arm's own servos.

Where the simulated arm cannot reach your hand -- its side against the welded
panel, its hand pressed on the crate -- the gap is rendered as torque on the
leader. In free space no motor is energized. Run `--no-feedback` first: it
drives the simulation and never energizes a motor. `--simulate` runs a
scripted hand, with no hardware, whose sweep meets the panel; there is nothing
to feel. Needs the `[lerobot-feetech]` extra and a calibrated leader arm.
With feedback on, the leader's servos are powered: keep clear of the arm and
keep its power switch in reach.

```bash
uv run --extra lerobot-feetech examples/09_teleop/01_force_feedback.py
```

Source: [`01_force_feedback.py`](01_force_feedback.py)

<!-- examples:end -->

## What you need

| Item | What |
| --- | --- |
| Leader arm | A YAM leader on Feetech STS3215 bus servos: six joints and a trigger per arm. A bimanual leader is two arms on two buses. |
| Adapter | One USB-serial adapter per arm (WCH CH340/CH341, USB id `1a86:55d3`). |
| Extra | `lerobot-feetech`: `uv sync --extra lerobot-feetech` in a checkout, or `pip install "robosimstudio[lerobot-feetech] @ git+https://github.com/robosimstudio/robosimstudio"`. Every hardware command below runs with `uv run --extra lerobot-feetech`. The Feetech bus driver comes from `lerobot`. |
| udev rule | `scripts/udev/99-ch340-serial.rules`, so each adapter has a fixed device path. |
| Calibration | A JSON file keyed by adapter serial, written by `scripts/calibrate_leader_arms.py` to `scripts/calibration/local/yam_leader.json` (git-ignored), which is where the scripts here read it by default. `scripts/calibration/yam_leader.json` is a sample for two arms that are not yours. |
| Browser | Reaches the machine's ports 8080 (the scene) and 8081 (calibration), directly or through an SSH tunnel. |

The simulated arm is the shipped `yam_bimanual` with the teleoperation gains
`YAM_TELEOP_ARM` and `YAM_TELEOP_GRIP` from `robosimstudio.robots.teleop.follower`,
applied by the scene as an override. No task is needed: each script builds a
bare `rss.Scene(cell="bench_075")`.

Before you start, power the leader arm, keep its power switch within reach and
clear its sweep. Replace `<serial>` below with the serial on the adapter's label.
One arm is enough; a second arm is a second `<arm>:<port>` pair in `--leader`.

The **Pass:** lines in each section below are the rig checklist: run the
sections in order on a real leader arm. A failure points at
[Troubleshooting](#troubleshooting).

## The udev rule

`/dev/ttyACM0` is whichever adapter enumerated first and can swap across a
reboot or a re-plug. Address each adapter by its serial number instead:

```bash
sudo cp scripts/udev/99-ch340-serial.rules /etc/udev/rules.d/
sudo udevadm control --reload-rules && sudo udevadm trigger
ls -l /dev/ch340-*
```

Each adapter now appears as `/dev/ch340-<serial>`. The calibration file is keyed
by that serial, so arms that swap places keep their calibration. Label each
arm's controller with its serial.

**Pass:** `ls -l /dev/ch340-*` lists one symlink per connected arm, and each
serial matches its label.

## Calibrate

```bash
uv run --extra lerobot-feetech python scripts/calibrate_leader_arms.py \
    --leader left:/dev/ch340-<left-serial>,right:/dev/ch340-<right-serial> \
    --out scripts/calibration/local/yam_leader.json
```

The tool opens a page on port 8081 (`http://localhost:8081`) where the whole
workflow runs: a ghost stands at each target pose and the arm mesh follows the
leader.

| Step | In the page |
| --- | --- |
| **Start** | Opens the first arm's bus, torque off. |
| Each joint, five poses | Move that one leader joint into the ghost and press **Capture**. **Invert direction** flips the preview if it moves the wrong way. |
| Gripper | Open fully, **Capture**; close fully, **Capture**. |
| Next arm | Automatic. The file is written after every capture, so an interrupted run resumes where it stopped. |

The five poses fit `ticks = slope * radians + intercept` per joint, which gives
`ticks_per_radian`, `sign` and `offset_ticks` together. A residual over 40 ticks
is flagged in the results list; **Redo last joint** sweeps it again.

| Flag | Does |
| --- | --- |
| `--leader` | `<arm>:<port>` pairs. The arm names are the robot's own, `left` and `right`. |
| `--out` | The file to write, and to resume from. |
| `--embodiment`, `--cell` | Another registered robot or cell. The defaults are `yam_bimanual` and `bench_075`. |
| `--zero-only` | One capture per arm at the home pose. Rewrites every `offset_ticks` and keeps scale and sign: for a slipped horn. |
| `--gripper-only` | The two gripper captures alone. |

The file holds one entry per serial, `label` being for the person reading it:

```json
{"<serial>": {"label": "right",
  "joints": [{"name": "right_j0", "ticks_per_radian": 651.9, "sign": -1.0,
              "offset_ticks": 2002.0, "scale_source": "fitted"}, "..."],
  "gripper": {"name": "right_grip", "open_ticks": 2128.0, "closed_ticks": 2765.0}}}
```

`radians = sign * (ticks - offset_ticks) / ticks_per_radian`, with the
difference taken the short way round the encoder's 4096-count turn. Joints are in
servo-id order; ids `1..N` are assigned in that order when a bus opens.

**Pass:** after **Start** the status says the arm is connected with torque off
and the arm hangs loose; every joint fits under 40 ticks; the gripper's two
captures differ by several hundred ticks; the file holds an entry under your
serial with six joints and a gripper.

## Check the signs

```bash
uv run --extra lerobot-feetech python scripts/check_leader_signs.py --leader right:/dev/ch340-<serial>
```

Read-only. It prints one line per motor with `raw`, `angle` and a signed
`delta`; `<-- moving` marks the joint you are moving. Move one joint at a time.
A joint whose number climbs while the simulated arm moves the other way has the
wrong `sign`; flip that one entry in the file.

**Pass:** each joint's `delta` changes only when that joint moves, and the
gripper's `cmd` runs 0 at open to 1 at closed.

## Drive the simulation from the leader

```bash
uv run --extra lerobot-feetech examples/09_teleop/00_leader_arm.py --leader right:/dev/ch340-<serial>
```

Name one `--leader` pair per arm you have; an arm without one keeps its gizmo.

The studio offers the same thing as a panel. Open a bare scene with
`panels="all"` and the ports in the config, then in the **Leader arm** folder
press **Connect** and tick **Drive from leader arm**. Untick it and the arm
stays where the leader left it, for the gizmo to pick up.

```python
from robosimstudio_studio import StudioConfig

rss.view(sim, panels="all", config=StudioConfig(
    leader_arm_ports=(("right", "/dev/ch340-<serial>"),),
    leader_arm_calibration="scripts/calibration/local/yam_leader.json"))
```

**Pass:** the simulated right arm snaps to the leader's pose on the first step,
its gizmo hidden, and then follows: each of the six joints moves the same way as
the leader's with no visible lag at a normal hand speed, the jaw closes when you
squeeze the trigger and opens when you release it, and the leader stays loose in
your hand.

## Force feedback

> **Note.** Force feedback is experimental. The version in this release has been
> checked against a simulated servo bus and has not yet been run on a leader
> arm. Pass each step below before you rely on it.

```bash
uv run --extra lerobot-feetech examples/09_teleop/01_force_feedback.py --leader right:/dev/ch340-<serial> --no-feedback
uv run --extra lerobot-feetech examples/09_teleop/01_force_feedback.py --leader right:/dev/ch340-<serial>
```

Run `--no-feedback` first to check the calibration with no motor energized. The
scene has a panel welded beside the right hand and a 20 kg crate under the left.

**What you feel.** Where the simulated arm is blocked (its side on the panel,
its hand on the crate, its jaw on something solid), each blocked servo gets a
goal that leads your hand back toward the arm, under a torque limit. The further
behind the arm is, the harder the pull, up to `max_error`.

**Two clocks.** Each leader arm runs on a thread of its own at 100 Hz, reading
the bus and writing servo registers. The page steps the scene at its control
rate, 60 Hz by default, applies the leader pose and reads the arm back. Contact
is rendered at a steady rate whatever the scene costs to step.

**Deadband.** A motor is energized only when its joint's mismatch leaves a
deadband of 0.04 rad + 0.045 s × joint speed, capped at 0.16 rad, about the
follower's tracking lag, so a moving hand's lag is not felt as contact. The grip
uses 0.02 s and a cap of 0.08 of its stroke. Each follower sample is compared
with the target it was chasing when measured, so a late page step is not felt
either. An energized motor lets go at three quarters of the deadband, so a joint
on the threshold does not chatter; in between, the goal is your hand's own
position.

**Staleness.** If no simulation state arrives for 0.25 s (or three page steps,
if that is longer), for example because the page is paused, rebuilding or
closed, every motor is disarmed. A joint re-arms only after leader and follower
have agreed for 0.5 s, and then only on a later sample that leaves the deadband.

The page shows one status line per arm: `free`, `pushing back: right_j0 -0.21`,
`waiting for alignment`, `suspended`. `--trace PATH` writes per-tick timing on
the way out; `scripts/analyze_leader_trace.py PATH` reads it.

| Knob (`ComplianceConfig`) | Default | Meaning |
| --- | --- | --- |
| `deadband` | 0.04 | Mismatch below which nothing is rendered, in rad or stroke fraction. |
| `velocity_deadband`, `max_deadband` | 0.045 s, 0.16 | How the deadband rises with speed, and its ceiling. |
| `release_hysteresis` | 0.01 | How far back inside the deadband the mismatch must fall before an energized joint lets go. Kept in proportion as the deadband rises: a quarter of it at these defaults. |
| `ramp_gain` | 5.0 | How steeply the correction grows past the deadband. |
| `max_error` | 0.2 | Cap on how far the goal leads the hand. |
| `p_coefficient`, `d_coefficient` | 30, 5 | Feetech position-loop gains while a joint is energized. |
| `torque_limit` | 300 | Feetech torque duty cap, 0-1000: how hard the arm can push. |

Pass a `ComplianceConfig` (from `robosimstudio.robots.teleop.force_feedback`) to
`Teleoperation` to change them; the example uses the defaults.

### Rig checklist

1. **Feedback off** (`--no-feedback`). The console prints
   `Driving right without feedback: no motor will be energized.` and the
   **Force feedback** folder shows `reading only (no motor is energized)`.
   **Pass:** the arm drives the simulation as above, stays loose, and no servo
   warms or hums; swing the right hand into the panel and the simulated arm
   stops at it while your hand feels nothing.
2. **Feedback on, free space.** The console prints
   `Force feedback armed on right at 100 Hz. ...`; the status goes
   `waiting for alignment`, then, after half a second held still,
   `[right] alignment held; contact feedback is live again.` and `free`.
   **Pass:** moving slowly, then briskly, and working the trigger on air, the
   status stays `free`, no servo energizes, and the arm feels as loose as in
   step 1.
3. **Feedback on, contact** (same session). Swing the right hand sideways into
   the panel, press the left hand down on the crate (a second `--leader` pair),
   close the jaw on the panel's edge. **Pass:** the status names `right_j0`,
   the left shoulder pitch joint and `right_grip` in turn; the loaded joint
   pushes back toward where the simulated arm stopped, harder the further you
   push, and lets go to `free` as soon as you back away; the trigger pushes back
   on the panel's edge and not on air; unloaded joints stay loose.
4. **Staleness** (same session). Press **Pause** on the page while in contact.
   **Pass:** within about 0.3 s the console prints
   `[right] no simulation state for over 0.25 s; feedback suspended.`, the
   status says `suspended` and the arm goes slack; after **Pause** again, holding
   the leader still where the simulated arm is for half a second prints
   `alignment held; contact feedback is live again.`, and a joint still in
   contact stays off until you have let go and re-aligned.
5. **Shutdown.** Ctrl-C once in contact and once in free space; in a third run,
   close the browser tab. **Pass:** each prints `Stopped; leader torque is off.`,
   exits with code 0 and leaves the arm slack at once, and the next start does
   not say `refusing to arm against nonzero torque limits`.
6. **Trace.** Add `--trace outputs/ff.json`, repeat steps 2 and 3, exit, then run
   `uv run python scripts/analyze_leader_trace.py outputs/ff.json`. It reports,
   per arm, the loop period percentiles against the 10 ms target, where an
   armed tick's time went, the torque transitions per second and the slot with
   the worst mismatch, then the page's publish gap. **Pass:** few ticks over
   1.5 times the target period, transitions `calm` outside contact,
   `follower sample age` p95 within a few page steps, and no `glitch` in
   `events`.

### Open questions

- The `ComplianceConfig` defaults come from a reference rig on the same servos;
  they have not been tuned on this scene.
- By default each follower sample is compared with the leader pose the arm was
  chasing when it was measured. The other form, the hand's pose at the instant
  the leader thread looks, is the only one that has been felt on hardware;
  `Teleoperation(..., compare="live")` selects it. If step 2 fails and step 6
  shows no timing fault, try the other form and report which one felt right.

## Safety

- Torque is off at rest, off while the page is stale, and off on the way out.
  The page closing, Ctrl-C, SIGTERM and a fault take the same path, which also
  puts the servos' own gains back.
- With feedback on, the servos are powered and the arm can move by itself. Keep
  clear of it and keep its power switch in reach.
- A process killed outright (`kill -9`, a power cut to the computer) cannot run
  that path. The servos keep their last goal and torque limit until their own
  power is cut.
- Startup refuses to arm against a servo that comes up with a nonzero torque
  limit. Power-cycle the arm.
- Match poses before you connect. The leader's angles become the targets on the
  first step; a leader far from the simulated arm's pose makes it jump.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Nothing under `/dev/ch340-*` | The udev rule is not installed, or the adapter is not a CH340 | Install [the rule](#the-udev-rule). `lsusb` should show `1a86:55d3`. |
| Calibration exits with a bus error | A servo does not answer | Check the daisy chain and power. |
| A simulated joint moves the opposite way | The wrong `sign` for that joint | Flip that entry in the file. `check_leader_signs.py` shows which. |
| The gripper's `cmd` runs 1 to 0 | `open_ticks` and `closed_ticks` are swapped | Swap them in the file. |
| Two lines move in `check_leader_signs.py` for one joint | The servo ids do not match the joint order | Check the order on the daisy chain: ids `1..N` are assigned in joint order when a bus opens. |
| Every joint reads a constant angle off | A slipped horn or a re-seated servo moved the zero | `calibrate_leader_arms.py --zero-only`. |
| One joint jumps a whole turn at one point of its travel | Its `offset_ticks` is a turn out | Re-zero that arm. |
| Free motion pushes back, or a joint stiffens briefly | Lag read as contact. The deadband absorbs about 45 ms of it, which is what a recorded session measured | Use `YAM_TELEOP_ARM` (18 ms lag vs 92 ms at the asset's gains), keep the scene light with `render_every=1`, and check the loop period and the page gap with `--trace`. Note the joint and the speed. |
| A joint pushes back while still, touching nothing | The model's joint range clamps a target the leader's travel puts outside it | `YAM_TELEOP_ARM` removes the arm joints' limits. |
| A push on the panel is felt on a wrist joint, or not at all | The base joint's `sign` or `offset_ticks` is wrong | [Check the signs](#check-the-signs), then re-zero. |
| `no simulation state for over 0.25 s; feedback suspended` | The page paused, or steps slower than the stale limit | Resume. Hold still for 0.5 s and the arm re-arms. |
| `refusing to arm against nonzero torque limits` | A previous run did not reach its torque-off | Power-cycle the leader. |
| The pull points away from the simulated arm, the arm stays stiff after `feedback suspended`, or a traceback replaces a one-sentence error | A bug | Stop with Ctrl-C (cut the arm's power if it stays stiff) and report it. |
| `SHUTDOWN ERROR: ...` | A servo did not acknowledge its torque-off | Power-cycle the arm and report the lines. |
| `could not open the leader on /dev/...` | Nothing on the port, or another process holds it | Check power and cable. Close the studio's **Leader arm** panel or the other script; one bus has one reader. |
| Trace: `CHATTER` | A mismatch sitting at the deadband | Note the joint and report the trace. |
| Trace: `suspend` events with the page open | The scene steps too slowly for the stale limit | Lighten the scene. |
| Trace: loop period p99 many times the 10 ms target | The leader thread is starved | Close other work on the machine. |

## See also

- `robosimstudio.robots.teleop.lerobot_controller`: calibration, tick conversion and the read-only controller.
- `robosimstudio.robots.teleop.force_feedback`: the algorithm, the gates and the servo writes.
- `robosimstudio.robots.teleop.follower`: the follower's gains, and the measurements behind them.
- `robosimstudio.robots.teleop.simulated`: what `--simulate` is and is not.
- `scripts/analyze_leader_trace.py --help`: what each line of the trace report means.
````

## examples/02_soft/soft.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Soft bodies in one file: a tetrahedral body, from its spec to its registration.

This file is what ``rss.sponge`` builds, imported as ``robosimstudio.domains.soft``.
Run ``00_sponge.py`` beside it first. Copy this file to write a kind of your own.
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path
from typing import TYPE_CHECKING, Any, ClassVar

import newton
import numpy as np
import warp as wp

from robosimstudio.assetlib.materials import MaterialRecord, register_material, register_material_kind
from robosimstudio.core.math import lame_from_young_poisson, young_poisson_from_lame
from robosimstudio.core.probes.particle import ParticleProbe
from robosimstudio.core.render.finish import Finish
from robosimstudio.domains.capabilities import ParticleMixin
from robosimstudio.domains.capabilities import host_bridge as _locate_bridge
from robosimstudio.domains.selection import resolve_selector
from robosimstudio.scene.entity import Entity
from robosimstudio.scene.registry import register_entity
from robosimstudio.specs.asset import AssetSpec
from robosimstudio.specs.base import Quat, Vec3
from robosimstudio.specs.params import LIVE, REBUILD, ui
from robosimstudio.specs.physics import HostActor, SimRequirements, register_domain

if TYPE_CHECKING:
    from robosimstudio.core.pipeline import ScenePipeline

__all__ = [
    "FIRM_FOAM",
    "FIRM_FOAM_MATERIAL",
    "SOFT_FOAM",
    "SOFT_FOAM_MATERIAL",
    "EntitySoft",
    "EntitySoftSuperdex",
    "SoftMaterialSpec",
    "SoftSpec",
    "lame_from_young_poisson",
    "read_tets",
    "sponge",
    "young_poisson_from_lame",
]


# =============================================================================
# 1. What this file is, and how it is found
# =============================================================================
# Importing this file registers soft bodies. The library finds it on the search path of
# ``robosimstudio.domains``, as it does a folder of yours named in ``ROBOSIMSTUDIO_DOMAIN_ROOTS``.
# Import it by that name, never by file path, or it registers twice. It imports no engine, no cloth.


# =============================================================================
# 2. The spec: what a soft body is, as data
# =============================================================================


@dataclass(frozen=True, kw_only=True)
class SoftMaterialSpec:
    """Bulk constitutive and contact parameters for a tetrahedral body, in SI.

    Elasticity is stated as Young's modulus and Poisson ratio and converted to the Lamé pair at
    build. Every field but :attr:`particle_radius` is ``REBUILD``: SuperDex copies the material when
    it creates the actor, so a change lands on the next build, not the next substep.

    Attributes:
        young: Young's modulus [Pa]: 1e4-1e5 for open-cell foam, 1e5-1e6 for silicone, rigid above 1e7.
        poisson: Poisson ratio. Open-cell foam crushes into its own pores: 0.0-0.3, not rubber's 0.49.
        density: Bulk density [kg/m^3]. Kitchen sponge foam is 30-100.
        mass_damping: SuperDex ``mass_damping_coefficient`` [1/s], a drag ``alpha * M * v``. Stops
            rigid-mode ringing, and damps free fall too.
        stiffness_damping: SuperDex ``stiffness_damping_coefficient`` [s], a force ``beta * K * v``.
            Stops a released sponge wobbling. 1e-3 to 1e-2 reads as foam.
        friction: Coulomb friction against colliders. SuperDex takes the geometric mean of the two
            sides, so zero here or on the gripper lets the sponge slip out of any pinch.
        contact_penalty: SuperDex contact ``penalty_coefficient`` [Pa/m]. The engine's 1e9 suits
            bodies of density 1000, and a 60 kg/m^3 foam chatters under it.
        contact_padding: SuperDex ``penalty_threshold_extra_padding`` [m], an anti-tunnelling margin
            for fast colliders. It applies because a soft actor has no collider of its own.
        particle_radius: Newton-side particle radius [m], for display and probes only.
    """

    via_model: ClassVar[tuple[str, ...]] = ("young", "poisson", "particle_radius")
    """Fields that reach the engine through the model, not :meth:`actor_params`:
    the Lame pair in ``model.tet_materials``, and a display-only radius."""

    young: float = field(
        default=2.0e4,
        metadata=ui(tier=REBUILD, unit="Pa", log=True, range=(1.0e3, 1.0e7), group="elasticity"),
    )
    poisson: float = field(
        default=0.25,
        metadata=ui(tier=REBUILD, range=(0.0, 0.49), group="elasticity"),
    )
    density: float = field(
        default=60.0,
        metadata=ui(tier=REBUILD, unit="kg/m^3", log=True, range=(10.0, 2000.0), group="mass"),
    )
    mass_damping: float = field(
        default=0.0,
        metadata=ui(tier=REBUILD, unit="1/s", range=(0.0, 10.0), group="damping"),
    )
    stiffness_damping: float = field(
        default=5.0e-3,
        metadata=ui(tier=REBUILD, unit="s", log=True, range=(1.0e-4, 1.0e-1), group="damping"),
    )
    friction: float = field(
        default=0.9,
        metadata=ui(
            tier=REBUILD,
            range=(0.0, 2.0),
            group="contact",
            doc="Geometric mean with the collider's; zero on either side means no friction.",
        ),
    )
    contact_penalty: float = field(
        default=8.0e7,
        metadata=ui(
            tier=REBUILD,
            unit="Pa/m",
            log=True,
            range=(1.0e5, 1.0e9),
            group="contact",
            doc="At 8e7 a 3.7 N fingertip press sits within about a millimetre of the collider; softer values read as penetration on camera.",
        ),
    )
    contact_padding: float = field(
        default=2.0e-3,
        metadata=ui(tier=REBUILD, unit="m", range=(0.0, 0.01), group="contact"),
    )
    particle_radius: float = field(
        default=0.002,
        metadata=ui(tier=LIVE, unit="m", range=(0.0002, 0.01), group="contact"),
    )
    collider: str = field(
        default="auto",
        metadata=ui(
            tier=REBUILD,
            choices=("auto", "sdf", "none"),
            group="contact",
            doc="What OTHER deformables can touch: 'none' is the engine's own default and nothing can; 'auto' gives an SDF when the body shares its scene with another deformable, and none on a rigid core, which cannot have one.",
        ),
    )
    contact_threshold: float | None = field(
        default=None,
        metadata=ui(
            tier=REBUILD,
            unit="m",
            range=(0.0, 0.002),
            group="contact",
            doc="Penalty onset distance when this body is the collider; None is the engine's 1 mm.",
        ),
    )
    contact_smoothing: float | None = field(
        default=None,
        metadata=ui(tier=REBUILD, unit="m", range=(0.0, 0.005), group="contact"),
    )
    friction_falloff: float | None = field(
        default=None,
        metadata=ui(
            tier=REBUILD,
            unit="m/s",
            log=True,
            range=(1.0e-4, 1.0e-1),
            group="contact",
            doc="Below this slip speed friction is proportional to speed: no static friction. None is the engine's 10 mm/s.",
        ),
    )
    boundary_samples: str | None = field(
        default=None,
        metadata=ui(
            tier=REBUILD,
            choices=(None, "P1Q1", "P1Q3", "P1Q6"),
            group="contact",
            doc="Contact quadrature per surface triangle; a small feature (a latch tooth) needs more than the default three.",
        ),
    )
    sdf_resolution: float | None = field(
        default=None,
        metadata=ui(
            tier=REBUILD,
            unit="m",
            log=True,
            range=(5.0e-5, 5.0e-3),
            group="contact",
            doc="Voxel of the collider SDF; None lets the engine pick a quarter of the mean edge.",
        ),
    )

    def __post_init__(self) -> None:
        lame_from_young_poisson(self.young, self.poisson)  # validates both
        if self.collider not in ("auto", "sdf", "none"):
            raise ValueError(f"collider must be 'auto', 'sdf' or 'none', got {self.collider!r}")
        if not self.density > 0.0:
            raise ValueError(f"density must be > 0 kg/m^3, got {self.density}")

    @property
    def is_slab(self) -> bool:
        """Always true, so the render path adds no display thickness: the particles carry the volume."""
        return True

    @property
    def lame(self) -> tuple[float, float]:
        """``(k_mu, k_lambda)`` [Pa], what ``tet_materials`` stores."""
        return lame_from_young_poisson(self.young, self.poisson)

    def actor_params(self) -> dict[str, float]:
        """What the SuperDex bridge needs beyond the model's own arrays, as JSON-able scalars.

        Elasticity is absent on purpose: the bridge reads ``(mu, lambda)`` off ``model.tet_materials``.
        """
        params: dict[str, Any] = {
            "density": float(self.density),
            "mass_damping": float(self.mass_damping),
            "stiffness_damping": float(self.stiffness_damping),
            "friction": float(self.friction),
            "contact_penalty": float(self.contact_penalty),
            "contact_padding": float(self.contact_padding),
            "collider": str(self.collider),
        }
        # ``None`` means the engine's own value: an absent key tells the bridge to leave it alone.
        for key in ("contact_threshold", "contact_smoothing", "friction_falloff", "sdf_resolution"):
            value = getattr(self, key)
            if value is not None:
                params[key] = float(value)
        if self.boundary_samples:
            params["boundary_samples"] = str(self.boundary_samples)
        return params


@dataclass(frozen=True, kw_only=True)
class SoftSpec:
    """A volumetric soft body: a generated lattice, or a tetrahedral mesh read from a file.

    Attributes:
        name: Key in handles, probes and particle-set names.
        size: Extents ``(x, y, z)`` [m] of the lattice.
        cells: Lattice cells per axis, five tetrahedra each. ``(10, 7, 4)`` is 440 particles and
            1400 tets, which SuperDex steps in a few milliseconds. Doubling every axis costs 8x.
        pose: Where the **bottom-face centre** goes [m], in the cell's work-surface frame. A mesh
            from a file is placed by its own origin: see :attr:`asset`.
        quat: Orientation, xyzw.
        material: Bulk constitutive and contact parameters.
        particle_sets: ``(name, selector)`` pairs over the rest positions.
        settle_frames: Frames stepped before the settled state is recorded for reset. A few suffice.
        settle_substeps: Newton substeps per settle frame, or 0 for the run's own. The soft solver
            steps once per control step either way.
        color: Display RGB in [0, 1].
        opacity: Display alpha in (0, 1].
        finish: Finish under the path-traced backend, or ``None`` for matte foam at :attr:`opacity`.
    """

    sim: SimRequirements | None = None
    """What this body needs of physics, or ``None`` for the default of its kind."""

    stage: ClassVar[str] = "deformables"
    entity: str = "soft"
    name: str = "sponge"
    size: Vec3 = (0.10, 0.07, 0.035)
    cells: tuple[int, int, int] = (10, 7, 4)
    pose: Vec3 = (0.0, 0.0, 0.0)
    quat: Quat = (0.0, 0.0, 0.0, 1.0)
    asset: AssetSpec | None = None
    """A tetrahedral mesh file, or ``None`` for the lattice :attr:`size` and :attr:`cells` describe.

    ``.npz`` with ``vertices`` and ``tets``, or anything ``meshio`` reads that holds ``tetra``
    cells. Its ``scale`` applies to the vertices, ``size`` and ``cells`` are ignored, and
    :attr:`pose` places the mesh's **own origin**, not a bottom-face centre."""
    material: SoftMaterialSpec = field(default_factory=SoftMaterialSpec)
    particle_sets: tuple[tuple[str, Callable[[Any], Any]], ...] = ()
    anchored: Callable[[Any], Any] | None = None
    """A selector over the rest positions (work-surface frame) naming nodes held **permanently**
    where they were built, such as a clip's base on its rail. ``None`` leaves the body free. Unlike
    a pin, the hold survives a reset."""
    rigid: Callable[[Any], Any] | None = None
    """A selector over the rest positions (work-surface frame) naming nodes that move as **one
    rigid body** while the rest of the mesh flexes about it: a plug's body and its cantilever latch.
    ``None`` leaves the whole mesh deformable.

    A stiff part needs one to move at all. SuperDex solves in single precision, and a free 2.6 g
    plug at 1e9 Pa, its rigid modes ~1e8 below its elastic ones, hung in mid-air (0.00 mm of fall
    in 1.5 s) while a gripper carried only the patch it pressed. On SuperDex such a body probes
    contact but is no collider: it touches another deformable only where its own surface samples
    meet that one's SDF, and one without an SDF passes through it (measured on a 30 mm block). So
    ``collider="sdf"`` is refused at build and ``"auto"`` resolves to ``"none"``, with a warning
    naming each deformable that passes through."""
    settle_frames: int = 30
    settle_substeps: int = 0
    color: Vec3 = (0.95, 0.80, 0.25)
    opacity: float = 1.0
    finish: Finish | None = None

    def __post_init__(self) -> None:
        if any(not float(v) > 0.0 for v in self.size):
            raise ValueError(f"soft body {self.name!r}: size must be positive, got {self.size}")
        if any(int(v) < 1 for v in self.cells):
            raise ValueError(f"soft body {self.name!r}: cells must be >= 1 per axis, got {self.cells}")
        if not 0.0 < self.opacity <= 1.0:
            raise ValueError(f"soft body {self.name!r}: opacity must be in (0, 1], got {self.opacity}")

    @property
    def particle_count(self) -> int:
        """Particles the lattice will allocate: ``prod(cells + 1)``."""
        nx, ny, nz = (int(v) for v in self.cells)
        return (nx + 1) * (ny + 1) * (nz + 1)


# =============================================================================
# 3. Materials: the two foams
# =============================================================================


SOFT_FOAM = SoftMaterialSpec()
"""A yielding open-cell foam, like a kitchen sponge. Published ranges for open-cell polyurethane
(E ~ 2e4 Pa, nu ~ 0.25, 60 kg/m^3), not a measurement made here."""

FIRM_FOAM = SoftMaterialSpec(young=8.0e4, poisson=0.3, density=110.0, stiffness_damping=8.0e-3)
"""A denser upholstery-grade foam: holds its corners, still visibly squashes."""


# =============================================================================
# 4. The entity: build, settle, hold, read
# =============================================================================
# The particles and tetrahedra go into the ordinary Newton ``ModelBuilder``, so probes, renderers
# and measures read a sponge like any other particles. They are then flagged inactive to Newton's
# solvers, and the ``superdex`` backend writes ``particle_q`` and ``particle_qd`` each control step.


def read_tets(path: str | Path) -> tuple[np.ndarray, np.ndarray]:
    """``(vertices (n, 3) float64, tets (m, 4) int64)`` from ``path``.

    ``.npz`` with ``vertices`` and ``tets``, or anything ``meshio`` reads: gmsh ``.msh``, VTK,
    Abaqus, Tetgen. A file with no ``tetra`` cells is refused by name.
    """
    path = Path(path)
    if path.suffix.lower() == ".npz":
        with np.load(path) as z:
            missing = [k for k in ("vertices", "tets") if k not in z]
            if missing:
                raise ValueError(f"{path}: an .npz tet mesh needs 'vertices' and 'tets'; missing {missing}")
            vertices, tets = np.asarray(z["vertices"], dtype=np.float64), np.asarray(z["tets"], dtype=np.int64)
    else:
        try:
            import meshio
        except ImportError as exc:
            raise ImportError(f"{path}: reading a {path.suffix} tet mesh needs meshio (`uv add meshio`)") from exc
        mesh = meshio.read(path)
        blocks = [np.asarray(c.data, dtype=np.int64) for c in mesh.cells if c.type == "tetra"]
        if not blocks:
            kinds = sorted({c.type for c in mesh.cells})
            raise ValueError(f"{path}: no 'tetra' cells (it holds {kinds}); a volumetric body needs tetrahedra")
        vertices, tets = np.asarray(mesh.points, dtype=np.float64), np.concatenate(blocks, axis=0)
    vertices = vertices.reshape(-1, 3)
    tets = tets.reshape(-1, 4)
    if len(vertices) < 4 or len(tets) < 1:
        raise ValueError(f"{path}: {len(vertices)} vertices and {len(tets)} tets is not a volume")
    if tets.min() < 0 or tets.max() >= len(vertices):
        raise ValueError(f"{path}: tet indices run {tets.min()}..{tets.max()} over {len(vertices)} vertices")
    return vertices, tets


class EntitySoft(ParticleMixin, Entity):
    """One volumetric soft body, built from ``spec`` into world ``world``."""

    spec: SoftSpec
    domain = "soft"
    hosted: ClassVar[bool] = False
    """Whether a host engine integrates this body, so its particles are built inactive to Newton.

    Decided by which class the compiler picks for the arrangement, the only thing known at build:
    the solvers copy the flags when they are made, before scene-ready can find a bridge."""

    def __init__(self, spec: SoftSpec, *, world: int = 0) -> None:
        super().__init__(spec, world=world)
        self.particles: np.ndarray = np.zeros(0, dtype=np.int32)
        """Global indices of this body's particles."""
        self.sets: dict[str, np.ndarray] = {}
        """Named subsets, keyed ``"<body>/<set>"``."""
        self.probe: ParticleProbe | None = None
        self.rest: dict[str, np.ndarray] = {}
        """The settled state a reset restores."""
        self.bridge = None
        """The SuperDex bridge simulating this body, found at scene-ready. Stays ``None`` when the
        arrangement puts ``soft`` on another solver."""

    # -------------------------------------------------------------- phase 1
    def build(self, builder: newton.ModelBuilder, episode) -> None:
        del episode
        spec = self.spec
        material = spec.material
        placed = self.placed((*spec.pose, *spec.quat))
        rot = wp.quat(*[float(v) for v in placed[3:7]])
        # ``pose`` is the bottom-face centre and ``add_soft_grid`` grows from a corner, so shift by
        # the half-extents in the body's own frame.
        from robosimstudio.core.math import transform_matrix

        sx, sy, _ = (float(v) for v in spec.size)
        r = np.asarray(transform_matrix(np.asarray(placed, dtype=np.float64)))[:3, :3]
        corner = np.asarray(placed[:3], dtype=np.float64) + r @ np.array([-sx / 2.0, -sy / 2.0, 0.0])
        k_mu, k_lambda = material.lame
        start = int(builder.particle_count)
        if spec.asset is not None:
            # A file's tetrahedra, in the file's own frame, placed as a whole.
            from robosimstudio.paths import resolve_asset

            vertices, tets = read_tets(resolve_asset(spec.asset))
            vertices = vertices * float(spec.asset.scale)
            builder.add_soft_mesh(
                pos=wp.vec3(*[float(v) for v in placed[:3]]),
                rot=rot,
                scale=1.0,
                vel=wp.vec3(0.0, 0.0, 0.0),
                vertices=[wp.vec3(*[float(v) for v in row]) for row in vertices],
                indices=[int(i) for i in tets.ravel()],
                density=float(material.density),
                k_mu=float(k_mu),
                k_lambda=float(k_lambda),
                k_damp=float(material.stiffness_damping * k_mu),
                particle_radius=float(material.particle_radius),
                label=spec.name,
            )
        else:
            self._add_grid(builder, spec, material, corner, rot, k_mu, k_lambda)
        # Hosted: built inactive so Newton solvers and soft-contact generation skip it (file meshes
        # too, or a whole-model VBD integrates them alongside SuperDex). VBD's velocity write-back and
        # self-contact detector ignore the flag; the backend handles those where it ticks. On a Newton
        # solver it stays active, or VBD would never move it.
        if self.hosted:
            flags = builder.particle_flags
            for index in range(start, int(builder.particle_count)):
                flags[index] = int(flags[index]) & ~int(newton.ParticleFlags.ACTIVE)
        self._anchor_nodes = self._resolve_nodes(builder, start, "anchored")
        self._rigid_nodes = self._resolve_nodes(builder, start, "rigid")
        if len(self._anchor_nodes) and len(self._rigid_nodes):
            raise ValueError(f"soft body {self.spec.name!r}: `anchored` and `rigid` together are not supported")

    def _resolve_nodes(self, builder: newton.ModelBuilder, start: int, field: str) -> np.ndarray:
        """Local indices of the nodes a :class:`SoftSpec` selector (``anchored``, ``rigid``) names.

        A mask of the wrong length raises, as for ``particle_sets``. It never anchors a shifted set.
        """
        selector = getattr(self.spec, field)
        if selector is None:
            return np.zeros(0, dtype=np.int64)
        rest = np.asarray([tuple(p) for p in builder.particle_q[start:]], dtype=np.float64) - np.asarray(self.frame[:3])
        try:
            local = resolve_selector(selector, rest, np.arange(len(rest))).astype(np.int64)
        except (ValueError, IndexError) as error:
            raise ValueError(f"soft body {self.spec.name!r}: `{field}` -- {error}") from error
        if not len(local):
            raise ValueError(f"soft body {self.spec.name!r}: `{field}` selected no nodes")
        return local.astype(np.int64)

    def _add_grid(self, builder, spec, material, corner, rot, k_mu, k_lambda) -> None:
        """The generated lattice: :attr:`SoftSpec.size` cut into :attr:`SoftSpec.cells`."""
        cells_x, cells_y, cells_z = (int(v) for v in spec.cells)
        sx, sy, sz = (float(v) for v in spec.size)
        builder.add_soft_grid(
            pos=wp.vec3(*[float(v) for v in corner]),
            rot=rot,
            vel=wp.vec3(0.0, 0.0, 0.0),
            dim_x=cells_x,
            dim_y=cells_y,
            dim_z=cells_z,
            cell_x=sx / cells_x,
            cell_y=sy / cells_y,
            cell_z=sz / cells_z,
            density=float(material.density),
            k_mu=float(k_mu),
            k_lambda=float(k_lambda),
            # A Kelvin-Voigt viscosity [Pa*s], for the model's record. SuperDex damps this body
            # from ``stiffness_damping`` itself.
            k_damp=float(material.stiffness_damping * k_mu),
            particle_radius=float(material.particle_radius),
            label=spec.name,
        )

    def host_actor(self) -> HostActor:
        """The JSON-able remainder a host engine needs beyond the model arrays, elasticity excluded."""
        params = dict(self.spec.material.actor_params())
        anchors = getattr(self, "_anchor_nodes", None)
        if anchors is not None and len(anchors):
            params["anchors"] = [int(i) for i in anchors]
        rigid = getattr(self, "_rigid_nodes", None)
        if rigid is not None and len(rigid):
            params["rigid_core"] = [int(i) for i in rigid]
        return HostActor(kind="tet", params=params)

    # -------------------------------------------------------------- phase 4
    def on_scene_ready(self, pipeline: ScenePipeline) -> None:
        """Settle, then record the reset state.

        A settle steps the whole scene and a reset restores a whole-array snapshot, so particle
        bodies share one settle record: a settle runs once, and earlier snapshots are retaken after it.
        """
        self.bridge = _locate_bridge(pipeline, self.name)
        self.resolve_sets(pipeline.state_0)
        self.join_settle(pipeline, (int(self.spec.settle_frames), int(self.spec.settle_substeps)))

    def settle(self, pipeline: ScenePipeline) -> None:
        """Let the body come to rest. Where it lands is the start state.

        Plain ``pipeline.step()`` advances the body too: the soft backend ticks inside it.
        """
        spec = self.spec
        if spec.settle_frames <= 0:
            return
        if spec.settle_substeps > 0:
            with pipeline.substeps_at(int(spec.settle_substeps)):
                for _ in range(int(spec.settle_frames)):
                    pipeline.step()
        else:
            for _ in range(int(spec.settle_frames)):
                pipeline.step()
        # A settle is scene construction, not simulated time.
        pipeline.sim_time = 0.0
        pipeline.step_count = 0

    # ---------------------------------------------------------------- runtime
    def resolve_sets(self, state: newton.State) -> dict[str, np.ndarray]:
        """Resolve the spec's particle selectors against the rest layout, in the work-surface frame."""
        if not len(self.particles):
            return {}
        rest = np.asarray(state.particle_q.numpy(), dtype=np.float64)[self.particles] - np.asarray(self.frame[:3])
        for set_name, selector in self.spec.particle_sets:
            key = f"{self.spec.name}/{set_name}"
            indices = resolve_selector(selector, rest, self.particles)
            self.sets[key] = indices
            self.add_set_every_world(key, indices)
        return dict(self.sets)

    def set_indices(self, name: str) -> np.ndarray:
        """One named set's global particle indices, resolved inside this body."""
        key = name if "/" in name else f"{self.spec.name}/{name}"
        if key not in self.sets:
            raise KeyError(f"soft body {self.spec.name!r} has no particle set {name!r}; has {sorted(self.sets)}")
        return self.sets[key]

    def update_probe(self, state: newton.State, step: int | None = None, *, readback=None) -> ParticleProbe:
        """Read this step's particle positions, once per control step."""
        if self.probe is None:
            raise RuntimeError(f"soft body {self.spec.name!r} is not bound yet")
        if readback is not None and getattr(readback, "particle_q", None) is not None and len(readback.particle_q):
            self.probe.update_arrays(readback.particle_q, readback.particle_qd, step)
        else:
            self.probe.update(state, step)
        return self.probe


# =============================================================================
# 5. The constructor: ``sponge``
# =============================================================================


def sponge(
    *,
    name: str = "sponge",
    size: Vec3 = (0.10, 0.07, 0.035),
    cells: tuple[int, int, int] = (10, 7, 4),
    at: Vec3 = (0.0, 0.0, 0.0),
    material: Any = None,
    **kwargs,
) -> SoftSpec:
    """A rectangular sponge, generated as a lattice.

    Soft bodies run on a foreign engine: :data:`~robosimstudio.specs.physics.GENERIC` gives them to
    ``superdex``, and a build without the ``[superdex]`` extra raises and names it.

    Args:
        name: Key in handles, probes and particle-set names.
        size: Metres, ``(x, y, z)``.
        cells: Lattice cells per axis, five tetrahedra each. The default is 440 particles.
        at: Where the **bottom-face centre** goes, in the cell's work-surface frame: ``at=(0, 0, 0)``
            stands the sponge on the middle of the bench.
        material: A :class:`~robosimstudio.domains.soft.SoftMaterialSpec` such as ``SOFT_FOAM`` or
            ``FIRM_FOAM``. ``None`` is the spec's default, the soft one.
        **kwargs: Any other :class:`~robosimstudio.domains.soft.SoftSpec` field.
    """
    extra = {} if material is None else {"material": material}
    return SoftSpec(name=name, size=size, cells=cells, pose=at, **extra, **kwargs)


# =============================================================================
# 6. Readings
# =============================================================================
# None of its own. ``reads=("volume", "cloth")`` in section 7 says how a soft body is measured: as
# a volume where a measure implements that, and otherwise as a cloud of particles, as cloth is.


# =============================================================================
# 7. Registration
# =============================================================================
# The kind, the entity that builds it, then the materials.


DOMAIN = register_domain(
    "soft",
    state=("particles",),
    reads=("volume", "cloth"),
    role="deformables",
    contacts=("surface", "fixtures", "objects", "hands", "deformables"),
    summary="A tetrahedral soft body.",
)

register_entity("soft")(EntitySoft)


class EntitySoftSuperdex(EntitySoft):
    """:class:`EntitySoft` for SuperDex, which integrates the body itself: Newton must leave it alone."""

    hosted = True


register_entity("soft", engine="superdex")(EntitySoftSuperdex)


# -----------------------------------------------------------------------------
# The material records
# -----------------------------------------------------------------------------
# Neither record carries a ``CalibrationSpec``: the foams were not measured here.


register_material_kind("soft", SoftMaterialSpec)

SOFT_FOAM_MATERIAL = register_material(
    MaterialRecord(
        name="soft_foam",
        spec=SOFT_FOAM,
        notes="A yielding open-cell foam -- the kitchen-sponge feel. E ~ 2e4 Pa, nu ~ 0.25, 60 kg/m^3.",
    )
)

FIRM_FOAM_MATERIAL = register_material(
    MaterialRecord(
        name="firm_foam",
        spec=FIRM_FOAM,
        notes="A denser upholstery-grade foam: holds its corners, still visibly squashes.",
    )
)
````

## robosimstudio/__init__.py

````text
# SPDX-License-Identifier: Apache-2.0
"""robosimstudio: a Newton-native benchmark stack, as ten packages; the benchmark tier is a package beside them.

Read bottom-up; each names only what is below it.

**The mechanisms.**

* :mod:`robosimstudio.core` -- what makes *one hand-built Newton scene*
  steppable, controllable, observable and renderable. No registries, no
  benchmark semantics, no knowledge of tasks, and it names nothing above it --
  where it needs knowledge from higher up it takes explicit data or states a
  protocol, which is why ``EnvBase`` declares an ``ActionSpace`` protocol rather
  than importing one.
* :mod:`robosimstudio.specs` -- the frozen IR every layer speaks, split by what
  a spec describes: an asset, a robot, a scene, a task, a run.

**What a thing is.**

* :mod:`robosimstudio.robots` -- who acts: the robots and hands
  themselves, the action spaces, and the algorithmic parts each in their own
  folder (``ik/``, ``motion/``, ``grasp/``).
* :mod:`robosimstudio.scene` -- specs and an episode to a steppable, indexed
  scene: the compiler's fixed order, the entities, the handles.
* :mod:`robosimstudio.assetlib` -- what an asset *is*: its record, its
  substrates and feature kinds, the selector language, the atom registry, the
  handlers and the materials. It knows how an asset is described and nothing
  about any particular asset -- and nothing about any document.
* :mod:`robosimstudio.sim` -- the front door: ``Scene``, ``Sim``, ``Ref``.
  Nothing here knows what a task is.
* :mod:`robosimstudio.record` -- what a run recorded. The replay bundle, which
  replays a run outside this checkout, is not a layer of the library but a
  top-level package of its own, which ``Env`` reaches lazily and an install may
  lack.

**Beside the library.**

* The benchmark tier -- everything that needs a *document* to exist, a
  top-level package of its own rather than a layer of this one, and not in
  every release. ``taskdoc`` is the ``.task`` language (read, typecheck, write;
  it names nothing but the IR, so an authoring agent can lint a task with no
  scene, no robot and no asset registry). ``taskbuild`` is which tasks exist and
  how a document becomes one -- a sibling of the asset library, not a layer over
  it. ``goals`` is what a benchmark asks *of* an asset: binding, goal trees,
  evaluation, the gauntlet, the catalogue. ``envs`` is the spec-driven ``Env``
  and its fleet twin; ``policies`` everything that drives one; ``run`` running
  many. The core tier never imports it -- only ``studio`` does, and ``assetlib``
  reaches its discovery inside a function.
* :mod:`robosimstudio_studio` -- the browser page over all of it, a bare scene
  included.

**The content is not in the package at all.** A task is a *directory* -- its
documents, the assets they name, the cell they stand in, the arrangement they
stage and the solutions that answer them, all in one place -- and the registries
find them by scanning the **paths** :mod:`robosimstudio.roots` declares, which is
a lookup rather than a dependency. This used to name a content *package* of four
subpackages, which worked for exactly one body of content at a time and required
it to be installable; a root is a path, so somebody else's tasks run beside these
with no packaging step. A suite's
solutions -- its routine, its tools, its shipped graphs -- sit beside the
documents that reference them, because a routine that folds this shirt is no
more general than this shirt.

**This module imports nothing above ``_version``, and that is load-bearing.**
Importing :mod:`robosimstudio.core` executes this file first, so a module-scope
``from .sim import Scene`` here would make core un-importable without ``sim`` and
quietly invert the whole partition, which nothing would notice until somebody
imported a lower package without the layers above it.

The flat names below are resolved through :pep:`562` ``__getattr__`` instead,
which fires on *attribute access* and never during ``importlib.import_module``.
So ``import robosimstudio`` still costs nothing and still names nothing, and
``rss.Scene`` imports :mod:`robosimstudio.sim` at the moment you ask for it::

    import robosimstudio as rss

    scene = rss.Scene(cell="bench_075")
    cube = scene.add(rss.box(name="cube", half=(0.025,) * 3, at=(0, 0, 0.2)))
    sim = scene.build()
    sim.step(150)
    print(cube.position)

The flat surface is **core-tier only** -- assembling a scene, stepping it,
reading it, and registering a new kind of thing. There is no ``rss.Env`` and no
``rss.get_task``: a benchmark is a layer over this, and reaching it is an import
from the benchmark tier's own package, which says which layer you are in.
"""

from ._version import __version__

__all__ = ["__version__"]

_EXPORTS: dict[str, str] = {
    # Assembling and stepping.
    "Scene": "robosimstudio.sim",
    "Sim": "robosimstudio.sim",
    "Ref": "robosimstudio.sim",
    "Robot": "robosimstudio.sim",
    "robot": "robosimstudio.sim",
    "draw": "robosimstudio.sim",
    "view": "robosimstudio.sim",
    "viewer": "robosimstudio.sim",
    "Viewer": "robosimstudio.sim",
    "compile_scene": "robosimstudio.scene",
    "load_asset": "robosimstudio.scene",
    # Writing a new kind of thing.
    "Entity": "robosimstudio.scene.entity",
    "register_entity": "robosimstudio.scene",
    "register_cell": "robosimstudio.scene",
    "register_domain": "robosimstudio.specs.registries",
    "register_backend": "robosimstudio.specs.registries",
    "register_coupler": "robosimstudio.specs.registries",
    "get_cell": "robosimstudio.scene",
    "list_cells": "robosimstudio.scene",
    # Saying how it is simulated.
    "GENERIC": "robosimstudio.specs",
    "MUJOCO_500HZ": "robosimstudio.specs",
    "ArrangementSpec": "robosimstudio.specs",
    "CollisionSpec": "robosimstudio.specs",
    "SimRequirements": "robosimstudio.specs",
    "backend": "robosimstudio.specs",
    "coupler": "robosimstudio.specs",
    "contacts_with": "robosimstudio.specs",
    "replace": "robosimstudio.specs",
    # Saying what it is.
    "ActuationSpec": "robosimstudio.specs",
    "ArmSpec": "robosimstudio.specs",
    "AssetSpec": "robosimstudio.specs",
    "CameraSpec": "robosimstudio.specs",
    "CellSpec": "robosimstudio.specs",
    "ClothMaterialSpec": "robosimstudio.domains.cloth",
    "ClothSpec": "robosimstudio.domains.cloth",
    "EmbodimentSpec": "robosimstudio.specs",
    "ObjectSpec": "robosimstudio.specs",
    "RegionSpec": "robosimstudio.specs",
    "ShapeSpec": "robosimstudio.specs.asset",
    "SoftMaterialSpec": "robosimstudio.domains.soft",
    "SoftSpec": "robosimstudio.domains.soft",
    "StaticSpec": "robosimstudio.specs",
    # Constructors, each beside the domain it describes.
    "body": "robosimstudio.domains.rigid",
    "box": "robosimstudio.domains.rigid",
    "capsule": "robosimstudio.domains.rigid",
    "cylinder": "robosimstudio.domains.rigid",
    "sphere": "robosimstudio.domains.rigid",
    "post": "robosimstudio.domains.static",
    "slab": "robosimstudio.domains.static",
    "sheet": "robosimstudio.domains.cloth",
    "sponge": "robosimstudio.domains.soft",
    "materials": "robosimstudio.domains.cloth",
}
"""Flat name -> the module that defines it. A table rather than a wildcard.

Wildcards were the alternative and they are worse in the two ways that matter
here: the set of flat names becomes whatever four packages happen to export
today, and a typo resolves to something plausible from the wrong layer instead of
raising. This is also the list a reader scans to answer "what is the core tier",
which is a question the tier split exists to have an answer to.

There are no aliases: a physics arrangement is ``rss.ArrangementSpec(control_hz=60,
substeps=16)``, under the one name its module gives it (see :data:`_ALIASES`).

``replace`` is ``dataclasses.replace``, re-exported for one reason: amending a
frozen spec is the *normal* way to use this tier -- ``replace(GENERIC,
substeps=4)`` appears in three docstrings and every example that stages its own
physics -- and a reader who has to work out that the name comes from the standard
library before the snippet runs is a reader the snippet failed.
"""

_PACKS: dict[str, tuple[str, tuple[str, ...]]] = {
    "robosimstudio.domains.rod": (
        "the rope (the `rod` kind: cables, ropes, cords)",
        ("RodMaterialSpec", "RodSpec", "rod"),
    ),
}
"""Domain pack -> what it is, in words, and the flat names it provides.

A kind of thing whose pack is **a folder a tree may leave out**. Its pack is a
directory on a domain root (:mod:`robosimstudio.roots`), reached as
``robosimstudio.domains.<name>`` when it is there; a tree may leave the directory
out, and then the pack's names are not part of the flat namespace at all --
``hasattr(rss, "rod")`` is false, ``dir(rss)`` does not list it, and asking for
one raises an ``AttributeError`` that says the kind is not installed rather than
a ``ModuleNotFoundError`` from three layers down.

Kept apart from :data:`_EXPORTS` for that reason: that table is the names every
tree has, and every test that walks it expects each to resolve. The words are
here, in the library, because a tree without the pack is exactly the one that
has to be able to say what is missing.
"""

_PACK_EXPORTS: dict[str, str] = {name: pack for pack, (_, names) in _PACKS.items() for name in names}
"""Flat name -> the domain pack that provides it, when the pack is installed."""

_ALIASES: dict[str, str] = {}
"""Flat name -> the name it resolves to in its module, where the two differ.

Empty. It held ``Arrangement -> ArrangementSpec``: a second spelling of one
concept, written in no example, no task, no tool, no test and no document. Two
names for one thing is the cheapest kind of concept to remove and the most
expensive to leave, because a reader who meets both has to find out they are the
same.
"""


def __getattr__(name: str):
    """Resolve one flat name, importing its module on first access (:pep:`562`)."""
    import importlib

    module = _EXPORTS.get(name)
    if module is None:
        pack = _PACK_EXPORTS.get(name)
        if pack is None:
            # Built from the table alone, and that is load-bearing: the import system asks for
            # ``robosimstudio.<submodule>`` as an *attribute* before it imports one (``from
            # robosimstudio import roots``), so this branch runs on ordinary imports and must
            # not touch the import system itself -- asking which packs are installed here
            # would import ``robosimstudio.domains`` from inside every such probe.
            raise AttributeError(
                f"module 'robosimstudio' has no attribute {name!r}. The flat namespace is the core tier: "
                f"{sorted(_EXPORTS)}. A benchmark name (Env, get_task) is one layer up: "
                "import it from the benchmark tier's own package, where that tier is installed."
            )
        try:
            value = getattr(importlib.import_module(pack), name)
        except ModuleNotFoundError as error:
            if not _is_absent(pack, error):
                raise  # the pack is there and something *it* needs is not: that is a real error
            raise AttributeError(
                f"module 'robosimstudio' has no attribute {name!r}: {_PACKS[pack][0]} is not installed here. "
                f"Its pack ({pack}) is on no domain root, so neither is rss.{name}."
            ) from None
    else:
        value = getattr(importlib.import_module(module), _ALIASES.get(name, name))
    globals()[name] = value  # so the second access is a plain lookup
    return value


def _is_absent(pack: str, error: ModuleNotFoundError) -> bool:
    """Whether ``error`` says the pack itself is missing, rather than something it imports."""
    missing = error.name or ""
    return missing == pack or pack.startswith(f"{missing}.")


def _installed(pack: str) -> bool:
    """Whether a domain pack is on a root here. Asked of the import system, without importing the pack."""
    import importlib.util

    try:
        return importlib.util.find_spec(pack) is not None
    except (ImportError, ValueError):
        return False


def _flat_names() -> list[str]:
    """The flat namespace as it stands in this checkout: the core names, and each installed pack's."""
    packs = [name for name, pack in _PACK_EXPORTS.items() if _installed(pack)]
    return sorted([*_EXPORTS, *packs])


def __dir__() -> list[str]:
    return sorted([*_flat_names(), "__version__"])
````

## robosimstudio/specs/arrangement.py

````text
# SPDX-License-Identifier: Apache-2.0
"""What a physics *arrangement* is, as data: backends by domain, a coupler, a collision policy -- and the one the library ships.

A document stages physics by a versioned **name** and never by a number, and
what the name stands for is an :class:`ArrangementSpec`: rates, a
:class:`BackendSpec` per domain, a :class:`CouplerSpec`, a :class:`CollisionSpec`.
Built with :func:`backend` and :func:`coupler`; :data:`GENERIC` is what a scene
gets when nobody has staged one, and :data:`MUJOCO_500HZ` is the one a hand can
lift a rigid body in.

One of the four modules :mod:`~robosimstudio.specs.physics` was split into. It
reads the registries for one helper -- the parameter freezing a registered
backend's defaults and a stated backend's kwargs must agree on -- and names no
solver: a backend here is an alias or a dotted path, and resolving either is
the composer's job.
"""

from __future__ import annotations

from dataclasses import dataclass, field, replace
from typing import Any

from .params import REBUILD, RECAPTURE, ui
from .registries import _frozen_params

__all__ = [
    "GENERIC",
    "MUJOCO_500HZ",
    "ArrangementSpec",
    "BackendSpec",
    "CollisionSpec",
    "CouplerSpec",
    "backend",
    "coupler",
]


# ---------------------------------------------------------------------------
# The data: a backend, a coupler, a collision policy, an arrangement
# ---------------------------------------------------------------------------


@dataclass(frozen=True, kw_only=True)
class BackendSpec:
    """One solver, as an arrangement states it: a name and its constructor kwargs.

    Built with :func:`backend`. The parameters are passed to the solver's
    constructor verbatim (``cls(model=view, **params)``), which is what makes
    this open: nothing here knows what ``rigid_avbd_beta`` means, only that
    ``"vbd"`` takes it.

    Attributes:
        solver: A registered alias or a dotted path.
        params: Constructor keyword arguments, sorted by name.
        substeps: How many sub-steps this island takes per coupled step --
            :attr:`newton.solvers.SolverCoupled.Entry.substeps`. A stiff rod
            may run at twice the rate of the arm beside it.
    """

    solver: str
    params: tuple[tuple[str, Any], ...] = ()
    substeps: int = field(default=1, metadata=ui(tier=REBUILD, range=(1.0, 16.0), step=1.0, group="rates"))

    def __post_init__(self) -> None:
        if not self.solver:
            raise ValueError("a backend needs a solver alias or dotted path")
        if int(self.substeps) < 1:
            raise ValueError(f"backend {self.solver!r}: substeps must be >= 1, got {self.substeps}")
        object.__setattr__(self, "params", _frozen_params(self.params))
        names = [k for k, _ in self.params]
        if len(names) != len(set(names)):
            raise ValueError(f"backend {self.solver!r}: a parameter is stated twice: {names}")

    def kwargs(self) -> dict[str, Any]:
        """The constructor keyword arguments, as a fresh dict."""
        return dict(self.params)

    def get(self, name: str, default: Any = None) -> Any:
        return dict(self.params).get(name, default)

    def with_(self, **params: Any) -> BackendSpec:
        """A copy with some parameters changed or added."""
        merged = {**dict(self.params), **params}
        return replace(self, params=_frozen_params(merged))

    def with_substeps(self, substeps: int) -> BackendSpec:
        return replace(self, substeps=int(substeps))


def backend(kind: str, /, *, substeps: int = 1, **params: Any) -> BackendSpec:
    """A :class:`BackendSpec`: ``backend("vbd", iterations=40, rigid_avbd_beta=1e2)``.

    The alias is positional-only, so a solver's own ``solver=`` keyword --
    MuJoCo's constraint solver, ``backend("mujoco", solver="newton")`` --
    goes to the constructor like every other parameter.
    """
    return BackendSpec(solver=kind, params=_frozen_params(params), substeps=int(substeps))


@dataclass(frozen=True, kw_only=True)
class CouplerSpec:
    """How islands couple: a registered kind and its parameters.

    Attributes:
        method: ``"proxy"``, ``"admm"``, or a method a task registered.
        params: The coupler's own parameters, sorted by name. For ``"proxy"``:
            ``mode`` (``"staggered"`` | ``"lagged"``), ``iterations``,
            ``mass_scale``, ``collide_interval``, ``contact_matching``,
            ``proxy_relaxation``, ``one_way_mass_scale``; for ``"admm"``: the
            fields of :class:`newton.solvers.SolverCoupledADMM.Config`.
    """

    method: str = "proxy"
    params: tuple[tuple[str, Any], ...] = ()

    def __post_init__(self) -> None:
        if not self.method:
            raise ValueError("a coupler needs a kind")
        object.__setattr__(self, "params", _frozen_params(self.params))

    def kwargs(self) -> dict[str, Any]:
        return dict(self.params)

    def get(self, name: str, default: Any = None) -> Any:
        return dict(self.params).get(name, default)

    def with_(self, **params: Any) -> CouplerSpec:
        return replace(self, params=_frozen_params({**dict(self.params), **params}))


def coupler(method: str = "proxy", /, **params: Any) -> CouplerSpec:
    """A :class:`CouplerSpec`: ``coupler("proxy", mode="staggered", iterations=2, mass_scale=20.0)``."""
    return CouplerSpec(method=method, params=_frozen_params(params))


@dataclass(frozen=True, kw_only=True)
class CollisionSpec:
    """The collision policy the composer itself consumes.

    Typed, unlike backend parameters, because these are read by the composer
    when it builds pipelines and by the scene builder before anything imports,
    not passed through to a solver.

    Attributes:
        soft_contact_margin: Collision-pipeline soft-contact margin [m]: how far
            from a shape a particle is *considered* for contact.
        full_surface_contact: Generate soft contacts over the whole soft-mesh
            surface -- edges and triangle interiors -- against rigid SDFs,
            rather than at vertices only. **This is what lets a parallel jaw
            hold cloth**: a pad narrower than a mesh cell finds no vertex
            between the jaws otherwise. Consumed only by VBD, and every
            participating rigid shape needs an SDF -- see :attr:`force_sdf`.
        force_sdf: Bake a signed-distance field for every shape that takes the
            builder's default config, before anything imports. Necessary beside
            :attr:`full_surface_contact` on a robot whose colliders are meshes.
        rigid_gap: Default contact gap for shapes that state none [m], applied
            to the builder before anything imports. ``None`` keeps Newton's.
        contact_ke: Contact stiffness for shapes that state none [N/m]. It
            sets how far a grasped object may sink into the fingers; the bound
            on going stiffer is stability (MuJoCo wants the ``solref``
            timeconst above twice the substep). ``None`` keeps Newton's 2.5e3.
        contact_kd: Contact damping for shapes that state none. Scale it with
            :attr:`contact_ke`. ``None`` keeps Newton's 100.
        rigid_contact_max: Contact-buffer ceiling for the main pipeline. 0
            keeps Newton's sizing, which is derived from the settled scene.
        collide_every: Run the main pipeline's narrow phase every this many
            substeps. 1 is exact; a scene whose contacts change slowly may run
            it less often, which is measured per arrangement, never assumed.
        contact_matching: Frame-to-frame contact matching for the main
            pipeline -- ``"disabled"``, ``"latest"`` or ``"sticky"``.
            ``"latest"`` is load-bearing for a rod that rolls.
        broad_phase: Broad phase of the main pipeline when the composer routes
            it an explicit pair list; the list is the broad phase, so
            ``"explicit"`` is the honest default.
    """

    soft_contact_margin: float = field(
        default=0.008, metadata=ui(tier=RECAPTURE, unit="m", range=(1.0e-4, 5.0e-2), group="soft contact")
    )
    full_surface_contact: bool = field(default=False, metadata=ui(tier=REBUILD, group="soft contact"))
    force_sdf: bool = field(default=False, metadata=ui(tier=REBUILD, group="soft contact"))
    rigid_gap: float | None = field(default=None, metadata=ui(tier=REBUILD, unit="m", group="rigid contact"))
    contact_ke: float | None = field(
        default=None, metadata=ui(tier=REBUILD, unit="N/m", log=True, range=(1.0e2, 1.0e6), group="rigid contact")
    )
    contact_kd: float | None = field(
        default=None, metadata=ui(tier=REBUILD, unit="N*s/m", log=True, range=(1.0e-3, 1.0e3), group="rigid contact")
    )
    rigid_contact_max: int = field(default=0, metadata=ui(tier=REBUILD, group="buffers"))
    collide_every: int = field(default=1, metadata=ui(tier=REBUILD, range=(1.0, 8.0), step=1.0, group="cadence"))
    contact_matching: str = field(
        default="disabled", metadata=ui(tier=REBUILD, choices=("disabled", "latest", "sticky"), group="rigid contact")
    )
    broad_phase: str = field(
        default="explicit", metadata=ui(tier=REBUILD, choices=("explicit", "sap", "nxn"), group="buffers")
    )

    def __post_init__(self) -> None:
        if int(self.collide_every) < 1:
            raise ValueError(f"collide_every must be >= 1, got {self.collide_every}")
        if self.contact_matching not in ("disabled", "latest", "sticky"):
            raise ValueError(
                f"contact_matching must be 'disabled', 'latest' or 'sticky', got {self.contact_matching!r}"
            )
        if self.broad_phase not in ("explicit", "sap", "nxn"):
            raise ValueError(f"broad_phase must be 'explicit', 'sap' or 'nxn', got {self.broad_phase!r}")


# ---------------------------------------------------------------------------
# The arrangement
# ---------------------------------------------------------------------------


@dataclass(frozen=True, kw_only=True)
class ArrangementSpec:
    """What a staged physics name stands for: rates, a backend per domain, a coupler, a collision policy.

    Attributes:
        control_hz: Control rate [Hz]. One env step covers one period.
        substeps: Physics substeps per control step. Must be even -- the state
            swap is a Python rebind baked into the captured graph.
        gravity: Gravity [m/s^2], along -z.
        use_cuda_graph: Attempt to capture the substep block.
        backends: ``(domain, backend)`` pairs. ``"*"`` is the fallback for any
            domain not named. Two domains stating an *equal* backend share one
            solver island, which is how a cable and a towel end up in one VBD.
        coupling: How islands couple when there is more than one.
        collision: The collision policy.
        overrides: ``(entity name or role, rule or backend)`` pairs that amend
            what the assets declared -- a contact rule added or changed, a
            backend for one entity.
    """

    control_hz: float = field(default=50.0, metadata=ui(tier=REBUILD, unit="Hz", range=(10.0, 240.0), group="rates"))
    substeps: int = field(
        default=4,
        metadata=ui(tier=REBUILD, range=(2.0, 64.0), step=2.0, group="rates", doc="Even, so the swap comes out even."),
    )
    gravity: float = field(default=-9.81, metadata=ui(tier=REBUILD, unit="m/s^2", range=(-20.0, 0.0), group="runtime"))
    use_cuda_graph: bool = field(default=True, metadata=ui(tier=REBUILD, group="runtime"))
    backends: tuple[tuple[str, BackendSpec], ...] = (("*", BackendSpec(solver="mujoco")),)
    coupling: CouplerSpec = field(default_factory=CouplerSpec)
    collision: CollisionSpec = field(default_factory=CollisionSpec)
    overrides: tuple[tuple[str, Any], ...] = ()

    def __post_init__(self) -> None:
        if isinstance(self.substeps, bool) or int(self.substeps) != self.substeps or self.substeps <= 0:
            raise ValueError(f"substeps must be a positive whole number, got {self.substeps!r}")
        if self.substeps % 2:
            raise ValueError(f"substeps must be even so the state swap comes out even, got {self.substeps}")
        if not self.control_hz > 0.0:
            raise ValueError(f"control_hz must be positive, got {self.control_hz}")
        names = [domain for domain, _ in self.backends]
        if len(names) != len(set(names)):
            raise ValueError(f"a domain is given two backends: {names}")
        for domain, spec in self.backends:
            if not isinstance(spec, BackendSpec):
                raise TypeError(f"backends[{domain!r}] must be a BackendSpec, got {type(spec).__name__}")

    @property
    def sim_dt(self) -> float:
        """Substep timestep [s]."""
        return 1.0 / self.control_hz / self.substeps

    @property
    def control_dt(self) -> float:
        return 1.0 / self.control_hz

    def backend_for(self, domain: str) -> BackendSpec | None:
        """The backend serving ``domain``: an exact entry, else the ``"*"`` fallback, else ``None``."""
        table = dict(self.backends)
        return table.get(domain, table.get("*"))

    def domains(self) -> tuple[str, ...]:
        return tuple(domain for domain, _ in self.backends)

    def with_(self, **changes: Any) -> ArrangementSpec:
        """A copy with some fields changed -- ``dataclasses.replace`` under a shorter name."""
        return replace(self, **changes)

    def backends_replacing(self, domain: str, spec: BackendSpec) -> tuple[tuple[str, BackendSpec], ...]:
        """The backend table with ``domain`` served by ``spec`` (added when absent)."""
        out = [(d, spec if d == domain else b) for d, b in self.backends]
        if domain not in dict(self.backends):
            out.append((domain, spec))
        return tuple(out)

    def with_backend(self, domain: str, spec: BackendSpec) -> ArrangementSpec:
        return replace(self, backends=self.backends_replacing(domain, spec))

    def with_override(self, target: str, value: Any) -> ArrangementSpec:
        return replace(self, overrides=(*self.overrides, (target, value)))


# ---------------------------------------------------------------------------
# The arrangements the library ships
# ---------------------------------------------------------------------------

GENERIC = ArrangementSpec(
    control_hz=60.0,
    substeps=16,
    backends=(
        ("articulated", backend("mujoco")),
        # The soft domain is volumetric FEM, which no Newton solver here
        # serves; it goes to the SuperDex co-sim backend, a host island the
        # composer splits out before the coupler -- so its presence changes
        # nothing about how the entries below couple. Two engine steps per
        # control step: contact detection is at step endpoints, so a mirror
        # sweeping more than a few millimetres per engine step tunnels; 8 ms
        # steps double the safe approach speed and stay inside the engine's
        # own 10-25 ms comfort band.
        ("soft", backend("superdex", substeps=2)),
        ("*", backend("vbd", rigid_body_contact_buffer_size=256)),
    ),
    coupling=coupler("proxy"),
    collision=CollisionSpec(),
)
"""A scene steps without anyone having measured it. **Not a tuned configuration.**

Every arrangement in this tree but this one was measured against the content it
serves, and lives with that content. This is the other kind: what a scene gets
when nobody has said anything, chosen to be *legible and conservative* rather
than good. Read it, copy it, and change the numbers that matter for what you
are actually simulating -- it is a value for exactly that reason, so
``replace(GENERIC, substeps=4)`` is the whole edit.

**The robot on MuJoCo, everything else on VBD.** One island for whatever moves
freely -- a cube, a rope, a sheet, all three -- and a second only when there is
an arm to drive. That shape is the one the coupler is right for, and it was
found by measuring the alternatives rather than by preference. With free rigid
bodies on MuJoCo instead (the dataclass default), a cube beside a rope bounced
between 7 and 195 mm for as long as it was stepped, with ``body_qd`` reading
zero: a free body on the *source* side of a proxy channel has its pose
overwritten by the mirror. With free bodies on VBD but the coupler deciding the
soft side by the nodes' roles, a cube beside a robot sat frozen at its spawn: a
VBD island holding only ``objects`` read as a rigid island and got no channel
at all. :attr:`~robosimstudio.scene.physics.islands.Island.is_deformable` keys
on the solver's registered capability now, and under this table all four
scenes -- cube; cube and rope; cube and robot; all three -- land within half a
millimetre of each other.

    The dataclass default, ``mujoco`` for ``"*"``, is what a cloth and a rod
    fall into if you build an ``ArrangementSpec()`` by hand. Neither survives
    it: a cloth raises early and legibly, a rod passes the capability check and
    dies inside MuJoCo's own importer. Stage an arrangement, or start from this
    one.

**A 256-row per-body rigid contact buffer, not Newton's 64.** The default
overflows the moment a rod touches a mesh body -- ``Warning: Per-body rigid
contact buffer overflowed 97 > 64`` and then ``nan`` through the whole state,
which is a wrong answer arrived at through a printed warning nobody reads in
time. 256 is not a universal figure and is not presented as one: it is
the cable-routing suite's measurement, where a 42-capsule rod pinched by a
decomposed fingertip peaks at 232. A denser rod needs more, and the symptom is
the same overflow line.

**Sixteen substeps at 60 Hz: conservative, not tuned.** A cloth sheet at 240 Hz
tunnels through the table it is lying on -- a measured failure of the shipped
content, not a hypothetical -- so the default buys margin at the cost of speed.
A rigid-only scene does not need it and should say so::

    scene = rss.Scene(cell="bench_075", physics=replace(GENERIC, substeps=4))

**``proxy`` coupling pushes a deformable and does not pinch one.** A rod being
dragged needs two-way coupling and gets it here. **A cloth grasp does not work
under this default**, and no amount of tuning makes it: a hand closing on a
sheet needs edge and face contacts against the pads, and Newton's proxy harvest
refuses that force feedback. Both shipped cloth tasks stage ``one_way`` with
``full_surface_contact=True`` for precisely this reason. There is no coupling
that is right for a rod and for a cloth grasp both, and a default that inspected
your scene and picked one would be the hidden library knowledge this tier exists
to remove -- so it is written down here, in ``build(verbose=True)``, and in the
cloth example::

    physics=replace(GENERIC, coupling=coupler("one_way"),
                    collision=CollisionSpec(full_surface_contact=True))
"""


MUJOCO_500HZ = ArrangementSpec(
    control_hz=50.0,
    substeps=10,
    backends=(("*", backend("mujoco", nconmax=512, njmax=512, enable_multiccd=True)),),
    collision=CollisionSpec(contact_ke=6.0e4, contact_kd=500.0, rigid_gap=2.0e-3),
)
"""The arm and every free rigid body in one MuJoCo island, 50 Hz control over 500 Hz.

**The arrangement a hand can pick a rigid body up in.** :data:`GENERIC` puts free
bodies on VBD behind a proxy coupler, which pushes and cannot pinch: a Panda
closing on a 50 mm cube there lets it slide out or flings it. Here the fingers
stall on the faces and friction carries it, so a gripper closed from the
studio's Grip button holds what it closed on. The rates and the contact law are
the tool-sorting benchmark's own, measured there; tasks stage it by the name
``mujoco_500hz@v1``.

It is for rigid bodies. A sheet or a capsule-chain rope has no MuJoCo solver and
belongs on :data:`GENERIC`'s VBD island. A sponge joins it on its own engine::

    physics=MUJOCO_500HZ.with_backend("soft", backend("superdex", substeps=2))
"""
````

## robosimstudio/scene/compiler.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Spec plus episode to a steppable, indexed scene -- in one fixed order.

The order in :func:`compile_scene` is not stylistic. Every step is there
because doing it later (or earlier) fails, usually silently:

1. **Device, then ``newton.use_coord_layout_targets = True``.** With free-joint
   objects in the model, ``joint_target_q`` is otherwise sized by DOF count and
   indexes differently from ``joint_q`` -- so every target write lands on the
   wrong coordinate the moment a loose object exists.
2. **Every backend's ``register_custom_attributes`` before any import**, read
   off the staged arrangement. Registered after, the importer has already
   dropped ``gravcomp`` and the arm sags.
3. **Entities build**, each recording its index ranges from the builder's counts.
4. **Actuation and object indexing**, which need the joints to exist.
5. **Re-key custom attributes** after any fixed-joint collapse -- see
   :func:`~robosimstudio.core.builder.rekey_custom_attributes`.
6. **Colour, ground, finalize.**
7. **Bind** every entity to the finalized model, then let each write its
   model-wide materials -- the one window before the solvers take their copies.
8. **Compose the physics**: the islands, the channels, the routing and the
   solver, from what the entities declared and the arrangement stages -- see
   :mod:`robosimstudio.scene.physics`. Then the entities' stages, and the pipeline.
9. **``on_scene_ready``**, which is the first moment physics can run: cloth
   settles here, and a task that must act on the *flat* sheet (creating bonds,
   say) does so in its own override before calling up.
10. **Build the handles.**

Nothing in this file knows what a hammer or a tape strip is. It knows specs,
entities and phases; the entities know the rest.
"""

from __future__ import annotations

import inspect
from collections.abc import Callable, Sequence
from dataclasses import dataclass, field
from functools import cached_property
from typing import Any

import newton
import numpy as np
import warp as wp

from robosimstudio.core.lifecycle import TaskSchedule, steps_of
from robosimstudio.core.pipeline import ScenePipeline
from robosimstudio.core.render.finish import Finish
from robosimstudio.core.render.palette import FLOOR
from robosimstudio.core.worlds import WorldMap
from robosimstudio.scene.physics.world import REPLICATED_HOSTS
from robosimstudio.specs import IDENTITY, Binding, CellSpec, EmbodimentSpec, Episode, Xform, replace
from robosimstudio.specs.asset import build_stage
from robosimstudio.specs.physics import DOMAINS, get_domain

from .build.imports import clear_texture_tints
from .entity import Entity
from .frames import in_surface, surface_frame
from .handles import ArmHandle, RegionHandle, SceneHandles
from .physics import PhysicsProgram, register_custom_attributes
from .physics import compose as _compose
from .registry import get_cell
from .request import SceneRequest

Composer = Callable[..., PhysicsProgram]
"""Builds the physics for a finalized model. See :func:`compile_scene`."""

__all__ = ["CannotReplicate", "CompiledScene", "compile_scene", "resolve_regions"]


class CannotReplicate(NotImplementedError):
    """This scene may not be built at more than one world. See :func:`_replication_refusal`.

    A named type rather than a bare ``NotImplementedError`` because one caller
    needs to tell *this* refusal from every other way a compile can fail: an
    interactive page, where the world count is a knob and the task is the
    request, answers this one by dropping to a single world rather than by
    refusing the selection. Nothing else may be answered that way -- an
    inadmissible pairing or a missing asset is not fixed by narrowing the grid.

    Subclasses ``NotImplementedError`` so every existing handler, and every
    message already written about it, keeps working unchanged.
    """


@dataclass
class CompiledScene:
    """Everything one compiled scene consists of.

    Attributes:
        request: What it was compiled from -- a `SceneRequest`, which for a
            benchmark run is the `TaskSpec` and for a hand-assembled scene is a
            `BuildRequest`. The compiler reads ten things off it and does not
            care which.
        episode: The episode it was compiled for.
        model: The finalized model.
        builder: The builder, kept because grasp boxes and visual parts are
            read off pre-finalize geometry.
        pipeline: The substep loop.
        handles: Where everything landed.
        entities: Every entity, in build order.
        embodiment: The robot's entity, or ``None`` for a scene with no robot.
        objects: Rigid entities by name.
        num_worlds: Replicated worlds in :attr:`model`. 1 for a single-world
            scene, where :attr:`template_model` is :attr:`model` itself.
        template_model: The *unreplicated* model, finalized from the same builder.
            Every entity is bound to this one, so labels stay unambiguous and an
            index resolved once is right for every world -- see
            :class:`~robosimstudio.core.worlds.WorldMap`. It is the model handles,
            arm index sets and host-side planning are expressed in.
        worlds: The stride map from template indices to replicated ones, or
            ``None`` for a single-world scene.
    """

    request: SceneRequest
    episode: Episode
    model: newton.Model
    builder: newton.ModelBuilder
    pipeline: ScenePipeline
    handles: SceneHandles
    entities: list[Entity] = field(default_factory=list)
    embodiment: Entity | None = None
    num_worlds: int = 1
    template_model: newton.Model | None = None
    worlds: WorldMap | None = None
    program: PhysicsProgram | None = None
    """What the composer built: islands, channels, routing, the manifest."""

    @cached_property
    def views(self) -> dict[str, dict[str, Entity]]:
        """The four scene views, derived once.

        Cached rather than recomputed per access, because ``entities`` is fixed
        from the moment this exists and the derivation is not free: ``Ref.entity``
        scans all four, so a single lookup was four walks of the entity list with
        a registry lookup per entity -- 34 us, measured, for a thirteen-entity
        scene, on a path the studio takes per frame.
        """
        return derive_views(self.entities, self.embodiment)

    @cached_property
    def by_name(self) -> dict[str, Entity]:
        """Every built entity except the robot, by name.

        The view-independent lookup. Anything asking "which entity is called
        this" wants this and not a view -- keying such a question on a view means
        a kind that moves between them silently stops being found, which is
        exactly what happens the first time an entity starts offering a handle.
        """
        return {e.name: e for e in self.entities if e is not self.embodiment}

    @property
    def objects(self) -> dict[str, Entity]:
        """Free bodies whose parts are individually nameable. See :func:`view_of`."""
        return self.views["objects"]

    @property
    def statics(self) -> dict[str, Entity]:
        """Scenery: domains declaring ``world_fixed``."""
        return self.views["statics"]

    @property
    def model_key(self) -> str:
        return self.episode.model_key

    @property
    def index_model(self) -> newton.Model:
        """The model indices are resolved against: the template when replicated.

        Single-world, this is :attr:`model` and the distinction costs nothing.
        Replicated, reading it off :attr:`model` would be the bug that produces
        world 0's answer for every world -- or, for a name lookup, raises.
        """
        return self.template_model if self.template_model is not None else self.model


def _resolve_entity(path: str) -> type:
    """A class by dotted path, imported when it is needed.

    One caller left: the embodiment. ``robots`` imports the entity contract from
    this package, so naming its class at module scope would close the cycle that
    moving the entities out was meant to open.
    """
    import importlib

    module_name, _, name = path.rpartition(".")
    return getattr(importlib.import_module(module_name), name)


_EMBODIMENT_ENTITY = "robosimstudio.robots.entity.EntityEmbodiment"
"""What builds the robot, by path for the same reason the others are.

``robots`` imports the entity contract from this package, so naming its class
here would close the cycle that moving the entities out was meant to open."""


def _make_entity(spec, arrangement=None, *, gripper_span: float = 0.08) -> Entity:
    """The entity a spec names, for the engine that will integrate it.

    One rule, where there were two. A table here held one class per build
    stage for a spec that named none, plus a fourth reached by sniffing the
    *shape* of the spec -- scenery that stripped its free bodies and collapsed
    its fixed joints got ``EntityArena``. That branch selected nothing across
    all ten shipped tasks, so the compiler carried a heuristic for a class
    nobody could reach, and ``EntityArena`` was unreachable code. It is
    registered under ``"arena"`` now and a spec asks for it by name.

    **A kind may have an implementation per engine**, and which one this is
    depends on the arrangement -- which is why it is resolved here rather than
    at ``Scene.add``. The rules are
    :func:`~robosimstudio.scene.registry.resolve_entity_class`'s; what matters
    at this call site is that the arrangement is already in hand (it has to be,
    for ``register_custom_attributes``) and that a kind with no engine-specific
    implementation resolves exactly as it did before the axis existed.

    ``gripper_span`` is offered rather than passed: it gates every object's
    ``ObbGrasp.fits_gripper`` and means nothing to a cloth, so it goes only to a
    class that declares it. Asked of the signature, so a suite's own entity
    states its own needs -- the same rule the control modes follow for
    ``control_hz``.
    """
    from .registry import resolve_entity_class

    cls = resolve_entity_class(spec, arrangement)
    takes_span = "gripper_span" in inspect.signature(cls).parameters
    return cls(spec, **({"gripper_span": gripper_span} if takes_span else {}))


def compile_scene(
    request: SceneRequest,
    episode: Episode | None = None,
    *,
    num_worlds: int = 1,
    device: str | None = None,
    use_cuda_graph: bool | None = None,
    verbose: bool = False,
    compose: Composer | None = None,
    pipeline_cls: type[ScenePipeline] = ScenePipeline,
    episodes: Sequence[Episode] | None = None,
) -> CompiledScene:
    """Build one scene for one episode.

    Args:
        request: What to build -- anything satisfying
            :class:`~robosimstudio.scene.request.SceneRequest`. A `TaskSpec`
            does; so does a `BuildRequest` assembled by hand.
        episode: Which episode's layout to build it at. ``None`` is the single
            episode a scene that nobody varies has, which is what a scene with
            no benchmark over it wants.
        num_worlds: Replicated worlds. 1 builds the single-world model this
            function has always built, on the same code path. Above 1, the scene
            is built once and replicated -- see :func:`_compile_multi` for what
            that costs and what it refuses.
        episodes: One episode per world, when the worlds are to hold *different*
            drawn layouts. ``None`` gives every world ``episode``'s, which is
            what a replicated scene has always been. See :func:`_compile_multi`:
            what an episode draws is written into the model **before** the
            solvers and any host engine are built, so a world's foreign-engine
            actors are *created* where that world's episode put them rather than
            created at one layout and moved to another.
        device: Warp device. ``None`` uses the current one.
        use_cuda_graph: Overrides the physics spec's own setting.
        verbose: Print what was built.
        compose: What builds the physics from the built entities and the
            arrangement, returning a
            :class:`~robosimstudio.scene.physics.PhysicsProgram`. ``None`` is
            :func:`robosimstudio.scene.physics.compose`, and the realistic use
            of the parameter is to *wrap* that rather than replace it -- call
            it, amend the schedule it returns, hand it back.
        pipeline_cls: The substep executor class. ``ScenePipeline`` runs the nine
            phases in their fixed order; a subclass may run its own. Both this
            and ``compose`` exist because the two of them were the last places
            the compiler decided something a caller might legitimately want to
            decide, and neither was reachable without editing this file.

    Returns:
        The compiled scene, ready to :meth:`~robosimstudio.core.pipeline.ScenePipeline.step`.
    """
    if num_worlds < 1:
        raise ValueError(f"num_worlds must be >= 1, got {num_worlds}")
    if episode is None:
        # A scene nobody varies has exactly one episode, and this is it. The
        # compiler threads an episode through every ``build_into`` because a
        # benchmark varies layouts per episode; a scene assembled by hand
        # varies nothing and should not have to say so.
        episode = Episode(episode_id=0, seed=0)

    with wp.ScopedDevice(device) if device else _null_scope():
        if num_worlds == 1:
            return _compile(
                request,
                episode,
                use_cuda_graph=use_cuda_graph,
                verbose=verbose,
                compose=compose,
                pipeline_cls=pipeline_cls,
            )
        return _compile_multi(
            request,
            episode,
            num_worlds=num_worlds,
            use_cuda_graph=use_cuda_graph,
            verbose=verbose,
            compose=compose,
            pipeline_cls=pipeline_cls,
            episodes=episodes,
        )


class _null_scope:
    def __enter__(self):
        return None

    def __exit__(self, *exc):
        return False


def _mount(request: SceneRequest, binding: Binding, scene: CellSpec | None, spec: EmbodimentSpec) -> Xform:
    """Where this pairing puts the robot's base, in world coordinates.

    Three sources, most specific first: the binding names a pose, or it names
    one of the scene's own mount points, or the pose is *derived* from the
    scene's work-surface frame and the embodiment's ``base_offset``.

    Derivation is the point. The absolute base height across the shipped cells
    spans 0.003 to 0.912 m while the height above the work surface is only ever
    0, +0.022 or +0.11 -- so a new pairing is a statement about a robot and a
    place, not a measurement somebody has to take. An explicit ``mount`` stays
    available for the pairing where the derivation is wrong, which a contact
    sheet shows and nothing else does.

    ``request.embodiment_pose`` is honoured when the binding derives and the
    embodiment states no offset, which is what keeps a task that set it before
    any of this existed compiling to the same model.
    """
    if binding.mount is not None:
        return binding.mount
    if binding.mount_point:
        if scene is None:
            raise ValueError(
                f"scene {request.full_name!r}: binding names mount point {binding.mount_point!r} but no scene"
            )
        return in_surface(scene, scene.mount(binding.mount_point))
    if spec.base_offset != IDENTITY:
        return in_surface(scene, spec.base_offset)
    # Neither axis has stated an offset: the asset places itself, and the task's
    # own pose (identity everywhere today) is the only thing left to honour.
    return request.embodiment_pose


def _roles(binding: Binding, spec: EmbodimentSpec | None, request: SceneRequest) -> tuple[str, str]:
    """Which arm works and which supports, resolved to real arm names.

    Unstated, the work arm is the embodiment's first -- which is only a default,
    not a convention, because the two YAM cells order their arms oppositely.
    Anything that cares states the role and reads it back from the handles.

    A support arm the embodiment does not have is a hard error: it is exactly
    the signal that a bimanual task has been pointed at a single-armed robot,
    and the alternative is a scene that compiles and then silently never
    anchors anything.
    """
    if spec is None or not spec.arms:
        return "", ""
    names = [a.name for a in spec.arms]
    work = binding.work_arm or names[0]
    if work not in names:
        raise ValueError(f"scene {request.full_name!r}: work arm {work!r} is not one of {names}")
    support = binding.support_arm
    if support and support not in names:
        raise ValueError(
            f"scene {request.full_name!r}: needs a support arm {support!r}, but embodiment {spec.name!r} has {names}"
        )
    return work, support


@dataclass
class _BaseBuild:
    """One world's worth of built-but-unfinalized scene.

    The output of steps 0 through 6 of this module's docstring, stopping just
    before ``finalize``. Split out because that is exactly the point where the
    single-world and replicated paths diverge: one finalizes this builder, the
    other replicates it first and finalizes both.
    """

    builder: newton.ModelBuilder
    entities: list[Entity]
    embodiment: Entity | None
    binding: Binding
    scene_spec: CellSpec | None
    work_arm: str
    support_arm: str


def _embodiment_spec(request: SceneRequest, binding: Binding) -> EmbodimentSpec:
    """The robot to build: the request's own spec, or a registry lookup by name.

    A request may carry an :class:`~robosimstudio.specs.EmbodimentSpec` inline
    instead of a name -- a robot loaded from a file that nothing registered,
    which is the one place a hand-assembled scene and a benchmark request differ
    in *kind* rather than in content. The inline spec is used as it stands
    unless the binding asks for a different robot by name, which is a pairing
    override and resolves through the registry exactly as a name would.

    The import is lazy for the same reason the entity classes are reached by
    path: ``robots`` imports the entity contract from this package, so naming it
    at module scope would close a cycle. Once per compile; the cost is nothing.
    """
    inline = request.embodiment if isinstance(request.embodiment, EmbodimentSpec) else None
    wanted = binding.embodiment or (inline.name if inline is not None else request.embodiment)
    if inline is not None and wanted == inline.name:
        return inline
    from robosimstudio.robots.registry import get_embodiment

    return get_embodiment(wanted)


def _takes_per_world_body(entity: Entity) -> bool:
    """Whether this static, told it is replicated, will build itself a kinematic body.

    The static domain's own rule (:func:`~robosimstudio.domains.static.entity.placeable_static`,
    less the subclasses that weld themselves), asked here so the build loop can
    order it after the robot. Anything that is not a static answers no.
    """
    from robosimstudio.domains.static.entity import EntityStatic

    return isinstance(entity, EntityStatic) and type(entity).places_per_world(entity.spec)


def _build_base(
    request: SceneRequest, episode: Episode, *, dynamics: bool = True, replicated: bool = False
) -> _BaseBuild:
    """Build one world into a fresh builder, in the order this module documents.

    ``replicated`` says the builder is about to be replicated into a fleet, so
    every static the task declares is told before it builds
    (:attr:`~robosimstudio.domains.static.entity.EntityStatic.replicated`) and
    a placeable one takes the per-world channel. The cell's own furniture is
    not told: a bench is the surface, not a fixture an episode draws.

    Everything up to but not including ``finalize``. Both compile paths run this
    and nothing else builds a scene, so "the replicated model is the single-world
    model, N times" is true by construction rather than by two code paths
    agreeing.

    ``dynamics=False`` stops after the robot, leaving out the task's objects,
    deformables and extras. That is not a scene anybody can step -- it exists so
    an IK solver can be built on the arm's kinematics without the things that
    make a *scene* hostile to it: a cable, a D6-jointed connector, or simply a bin
    of loose tools whose free joints push the coordinate count past the solver's
    ceiling. Because those all build *after* the robot, dropping them leaves every
    earlier index untouched, and this stays the same import of the same asset by
    the same code rather than a second opinion about the arm's kinematics. The
    caller still pairs the two index spaces explicitly and checks the pairing --
    see :func:`~robosimstudio.scene.ik_model.build_ik_rig`.
    """
    # joint_q-aligned targets, so joint_target_q indexes the way joint_q does
    # even with free-joint objects in the same model.
    newton.use_coord_layout_targets = True

    arrangement = request.physics
    collision = arrangement.collision
    builder = newton.ModelBuilder()
    if arrangement.gravity != -9.81:
        builder.gravity = float(arrangement.gravity)
    if collision.rigid_gap is not None:
        # Before anything imports: this is the default gap for every shape that
        # states none, and a tight-clearance task needs it at the scale of its
        # fits rather than Newton's centimetre-scale default.
        builder.rigid_gap = float(collision.rigid_gap)
    # Also before anything imports, and for the same reason: USD carries no
    # contact stiffness, so every imported shape takes ShapeConfig's default and
    # this is the one place a task can state otherwise.
    if collision.contact_ke is not None:
        builder.default_shape_cfg.ke = float(collision.contact_ke)
    if collision.contact_kd is not None:
        builder.default_shape_cfg.kd = float(collision.contact_kd)
    if collision.force_sdf:
        # Before anything imports, because an SDF is baked at finalize from the
        # config a shape was *added* with. This is what makes
        # ``full_surface_contact`` usable on a robot whose colliders are meshes:
        # analytic boxes and capsules carry closed-form SDFs and need nothing,
        # but a mesh without a baked one is silently skipped by the edge and face
        # passes -- and Newton raises rather than let a soft body sail through it.
        builder.default_shape_cfg.configure_sdf(force_sdf=True)
    # Every backend the arrangement names gets to register its custom attributes
    # before any entity builds -- MuJoCo's gravcomp, VBD's per-joint flags. Done
    # here, from the arrangement, so no entity has to import a solver to know
    # which attributes its builder calls will be allowed to keep.
    register_custom_attributes(builder, arrangement)

    entities: list[Entity] = []
    embodiment: Entity | None = None

    # The pairing being compiled, and the frame the other two axes agree in.
    binding = request.binding_for()
    scene_spec = get_cell(binding.scene) if binding.scene else None
    # Task-owned entities state their poses in the scene's work-surface frame;
    # the scene's own furniture states them in world. Identity without a scene,
    # so a suite that has not moved onto the frame keeps world coordinates.
    frame = surface_frame(scene_spec)

    # --- 0. the place -----------------------------------------------------
    # Before the task's own scenery, so a scene's floor cannot land on top of a
    # fixture standing on it, and so the surface frame exists before anything
    # is placed in it.
    if scene_spec is not None:
        for spec in scene_spec.statics:
            entity = _make_entity(spec, arrangement)
            # The cell's own furniture is the *surface*, not a fixture. Both are
            # `static` and the domain cannot tell them apart; the build loop can,
            # because this is the loop that builds the place rather than the task.
            entity.role = "surface"
            entity.build_into(builder, episode)
            entities.append(entity)

    # Everything the task declares, in the order the stages run. Two loops
    # rather than four, and the split is the robot: scenery builds before it,
    # everything else after -- which is also what ``dynamics=False`` drops.
    ordered = request.build_order()

    # --- 1. scenery -------------------------------------------------------
    overrides = dict(binding.static_overrides)
    # In a replicated build the placeable statics -- the ones that take a
    # kinematic body of their own -- build AFTER the robot (step 2b), and this
    # is not a style choice. An embodiment imported with ``add_mjcf_collapsed``
    # collapses the fixed joints of the WHOLE builder, and a fixture welded to
    # the world by a fixed joint is exactly what that folds away: its body is
    # merged into the world, every body after it is renumbered, and the entity
    # goes on holding the index it was given -- which is now the robot's first
    # link. Measured on a tool-hanging scene at two worlds: the
    # pegboard's per-world placement moved ``left_link_1`` onto the pegboard.
    # Nothing that imports after the robot collapses the builder, so a static
    # built there keeps its body. The single-world build keeps the order it
    # always had; a world-hung static owns no body for a collapse to take.
    deferred: list = []
    for declared in (s for s in ordered if build_stage(s) == "scenery"):
        # This pairing may import a different file for a static -- the stripped
        # arena, for a monolithic export hosting a foreign robot.
        spec = (
            replace(declared, asset=replace(declared.asset, path=overrides[declared.name]))
            if declared.name in overrides
            else declared
        )
        entity = _make_entity(spec, arrangement)
        entity.frame = frame
        if replicated and hasattr(entity, "replicated"):
            entity.replicated = True
            if _takes_per_world_body(entity):
                deferred.append(entity)
                continue
        entity.build_into(builder, episode)
        entities.append(entity)

    # --- 2. the robot -----------------------------------------------------
    if request.embodiment:
        embodiment_spec = _embodiment_spec(request, binding)
        if binding.gripper:
            # A hand named by the pairing replaces every arm's. It has to clear
            # the per-arm names as well as set the robot's, because an arm's own
            # entry wins over the robot's default -- leaving them would put the
            # requested hand on nothing and read as the flag being ignored.
            from dataclasses import replace as _replace

            embodiment_spec = _replace(
                embodiment_spec,
                gripper=binding.gripper,
                arms=tuple(_replace(a, gripper="") for a in embodiment_spec.arms),
            )
        arm_gains = binding.arm_actuation or request.arm_actuation
        gripper_gains = binding.gripper_actuation or request.gripper_actuation
        if arm_gains is not None or gripper_gains is not None:
            # Gains fall through binding, then request, then the embodiment's own.
            # A binding's are the most specific statement there is: how stiff an
            # arm has to be to seat a connector is a fact about *that arm doing
            # that task*, which neither half knows alone.
            from dataclasses import replace as _replace

            embodiment_spec = _replace(
                embodiment_spec,
                arm_actuation=arm_gains or embodiment_spec.arm_actuation,
                gripper_actuation=gripper_gains or embodiment_spec.gripper_actuation,
            )
        if binding.cross_arm_collisions is not None:
            # Whether the arms may pass through each other is a fact about the
            # pairing: it only matters on a task that puts both hands in the
            # same place, and the pairs are not free. Tri-state, so a binding can
            # also switch it *off* for a robot that ships with it on.
            from dataclasses import replace as _replace

            embodiment_spec = _replace(embodiment_spec, cross_arm_collisions=bool(binding.cross_arm_collisions))
        embodiment = _resolve_entity(_EMBODIMENT_ENTITY)(
            embodiment_spec,
            pose=_mount(request, binding, scene_spec, embodiment_spec),
            scene_resident=binding.scene_resident,
        )
        embodiment.build_into(builder, episode)
        embodiment.apply_actuation(builder)
        entities.append(embodiment)

    work_arm, support_arm = _roles(binding, embodiment_spec if embodiment is not None else None, request)

    gripper_span = 0.08
    if embodiment is not None and embodiment_spec.arms:
        # The *work* arm's span, not arms[0]'s: the two YAM cells list their
        # arms in opposite orders, so an index here would silently mean the left
        # hand on one robot and the right on the other -- and this number gates
        # every object's ObbGrasp.fits_gripper.
        #
        # The hand's own span wins over twice the open coordinate: for a geared
        # hand the joint coordinate is an angle, so twice it is not a distance
        # and an OBB fit test made against it would pass everything. That rule is
        # GripperSpec.effective_span, in one place, rather than restated here.
        arm = next((a for a in embodiment_spec.arms if a.name == work_arm), embodiment_spec.arms[0])
        hand = embodiment.hands.get(arm.name)
        if hand is not None:
            gripper_span = hand.effective_span

    # --- 2b. the placeable statics of a replicated build ------------------
    # After the robot, for the reason step 1 gives. Still before the objects,
    # so an object's reset pose is measured against fixtures that already
    # stand -- and still dropped by ``dynamics=False``, which stops at the
    # robot: an IK rig has no use for a peg.
    for entity in deferred if dynamics else ():
        entity.build_into(builder, episode)
        entities.append(entity)

    # --- 3. everything the robot can touch --------------------------------
    # One loop over three stages. What used to differ between them was a rigid
    # body's shape collection, collider approximation and grasp box, which now
    # belong to ``EntityRigid.after_build`` -- so the compiler no longer knows
    # that an object has a grasp box and a cloth does not.
    #
    # Every entity is offered the embodiment, where only ``extras`` used to be.
    # The ones that couple to the robot need it -- a cable latched to a gripper,
    # a rig measuring blade geometry -- and re-deriving it from body-name
    # patterns is the failure that selects nothing and reports nothing. The rest
    # ignore it.
    for spec in (s for s in ordered if build_stage(s) != "scenery") if dynamics else ():
        entity = _make_entity(spec, arrangement, gripper_span=gripper_span)
        entity.frame = frame
        entity.embodiment = embodiment
        # Told here as well as at step 1, because a *fixture* that is not a
        # ``StaticSpec`` builds in this loop: a gear-meshing board is an ``extras``
        # entity whose plate, pegs, pinion and button are the model's own
        # geometry, and which takes a kinematic root of its own when it is about
        # to be replicated so that each world's copy can stand where its own
        # document drew it. Nothing else in the corpus declares the attribute, so
        # for every other entity this is the no-op it was before.
        if replicated and hasattr(entity, "replicated"):
            entity.replicated = True
        entity.build_into(builder, episode)
        entities.append(entity)

    # --- 5. finalize ------------------------------------------------------
    # Scene-wide, and after every entity has built: a texture bound by one
    # import must not be tinted by a colour another import happened to leave on
    # the same shape. See clear_texture_tints for why the two disagree at all.
    clear_texture_tints(builder)
    builder.color()
    # The scene's own floor height, which every shipped scene states as 0 and one
    # family does not: SimplerEnv's rooms stand on a 17 mm slab, and that slab is
    # where its robots' mount heights are measured from.
    # Coloured, which it never was: `add_ground_plane` defaults to Newton's
    # (0.125, 0.125, 0.15) -- pixel 27 under the tiled tracer -- so every scene
    # shipped a near-black floor regardless of what its table was painted. A
    # step below GROUND rather than equal to it, or the table edge stops reading.
    builder.add_ground_plane(
        height=float(scene_spec.ground_z) if scene_spec is not None else 0.0,
        color=FLOOR,
    )
    return _BaseBuild(
        builder=builder,
        entities=entities,
        embodiment=embodiment,
        binding=binding,
        scene_spec=scene_spec,
        work_arm=work_arm,
        support_arm=support_arm,
    )


def _lifecycle(parts) -> TaskSchedule:
    """The task-level schedule for everything in this scene.

    One schedule built from every part rather than a loop per phase, so the
    order lives in :data:`~robosimstudio.core.lifecycle.TASK_PHASES` instead of
    in the sequence of ``for`` statements below it -- and so a part that owns no
    geometry can still take part. Contribution order inside a phase is the order
    the parts arrive in, which is the build order the compiler already fixed.
    """
    schedule = TaskSchedule()
    for part in parts:
        schedule.extend(steps_of(part))
    return schedule


def _assemble(
    request: SceneRequest,
    base: _BaseBuild,
    model: newton.Model,
    *,
    use_cuda_graph: bool | None,
    worlds: WorldMap | None = None,
    verbose: bool = False,
    compose: Composer | None = None,
    pipeline_cls: type[ScenePipeline] = ScenePipeline,
) -> ScenePipeline:
    """Compose the physics for a finalized model, then the substep loop over it.

    Shared by both compile paths because the physics of N worlds is the physics
    of one: the composer expands every island's ownership by the world map, the
    solvers are world-aware, and the substep block never mentions a world at
    all. What differs between the paths is the model handed in.

    The composer gets every built entity by name and the embodiment, and reads
    what each declared it needs; the arrangement says which backend serves each
    domain. Nothing here knows whether the result is one bare MuJoCo or a
    proxy-coupled pair -- see :mod:`robosimstudio.scene.physics`.
    """
    entities, embodiment = base.entities, base.embodiment
    arrangement = request.physics
    parts: dict[str, Any] = {e.name: e for e in entities if e is not embodiment}
    scene_statics = {spec.name for spec in base.scene_spec.statics} if base.scene_spec is not None else set()
    program = (compose or _compose)(
        model,
        parts,
        embodiment,
        arrangement,
        scene_statics=scene_statics,
        worlds=worlds,
        verbose=verbose,
    )

    for step in _lifecycle(entities).steps("kernels"):
        step.fn(program.hooks)

    return pipeline_cls(
        model,
        program=program,
        control_hz=arrangement.control_hz,
        substeps=arrangement.substeps,
        use_cuda_graph=arrangement.use_cuda_graph if use_cuda_graph is None else use_cuda_graph,
        worlds=worlds,
    )


def _start_pose(
    model: newton.Model, pipeline: ScenePipeline, embodiment: Entity | None, *, num_worlds: int = 1
) -> None:
    """Put the scene at its start pose before anything steps it.

    A freshly built State has no evaluated body transforms, and integrating from
    that yields NaN within one step -- which then gets baked into a captured
    graph and silently poisons every later step.

    A deformable-only scene -- a material rig -- has no bodies at all, so there
    is no rigid start pose to evaluate and nothing to copy.

    ``num_worlds`` only reaches the target vector: ``model.joint_q`` is already
    the replicated model's own, tiled by ``replicate``, but the home targets come
    from the embodiment and describe one robot.
    """
    if model.body_count:
        newton.eval_fk(model, model.joint_q, model.joint_qd, pipeline.state_0)
        wp.copy(pipeline.state_1.body_q, pipeline.state_0.body_q)
    if embodiment is not None:
        home = np.asarray(embodiment.home_target_q(), dtype=np.float32).reshape(-1)
        pipeline.control.joint_target_q.assign(np.tile(home, num_worlds) if num_worlds > 1 else home)


def view_of(entity: Entity) -> str:
    """Which of the four scene views this entity belongs to.

    ``build_stage`` is a build-order statement -- which pass adds this to the
    builder -- and the compiler used it as the taxonomy deciding which handle you
    get, which probe you get, and which studio panel can see you. A spec that
    declares no stage at all falls to ``extras``, so a chain of capsules whose
    spec said nothing was invisible to every bin reader while owning bodies and
    shapes exactly as a box does.

    Each test below is a contract the entity already answers:

    * ``world_fixed`` on its domain -- scenery, declared where the domain is.
    * owning particles -- what a deformable *is*, and the same question
      :meth:`Sim.deformables` asks.
    * offering a :meth:`Entity.handle` -- whether its parts are individually
      nameable. A box publishes one; a rod's segments are bodies the scene never
      publishes, which is exactly what made it an extra.

    **The order is the content.** A cloth both owns particles and offers a
    handle; a static offers one and is scenery. And no capability test alone
    reproduces the partition -- a capsule rod and a box own the same state and
    land in different views -- which is why the handle question is the one that
    separates them.
    """
    domain = getattr(entity, "domain", "")
    if domain in DOMAINS and get_domain(domain).world_fixed:
        return "statics"
    if len(entity.owned_particles()):
        return "deformables"
    return "objects" if type(entity).handle is not Entity.handle else "extras"


def derive_views(entities: list[Entity], embodiment: Entity | None) -> dict[str, dict[str, Entity]]:
    """The four scene views, from :func:`view_of`.

    A *partition* rather than four capability queries, because ``describe``
    iterates ``objects`` and ``deformables`` separately and a rod appearing in
    both would be counted twice.
    """
    views: dict[str, dict[str, Entity]] = {"objects": {}, "deformables": {}, "statics": {}, "extras": {}}
    for entity in entities:
        if entity is embodiment:
            continue  # its own axis; never in a view
        views[view_of(entity)][entity.name] = entity
    return views


def _finish(
    request: SceneRequest,
    episode: Episode,
    base: _BaseBuild,
    model: newton.Model,
    pipeline: ScenePipeline,
    *,
    template_model: newton.Model | None = None,
    worlds: WorldMap | None = None,
    num_worlds: int = 1,
    verbose: bool,
) -> CompiledScene:
    """Handles, the scene record, and the one line that says what was built.

    Handles come off ``template_model`` when the scene is replicated: they are
    label lookups, and every world carries the same labels. See
    :class:`~robosimstudio.core.worlds.WorldMap` for why an index resolved
    against one world is right for all of them.
    """
    index_model = template_model if template_model is not None else model
    handles = _build_handles(request, index_model, base.builder, base.embodiment, base.entities, scene=base.scene_spec)
    # Which place, and which hand does what: the two facts task code must read
    # off the compiled scene rather than assume, since both change with the
    # pairing while the task's own source does not.
    handles.scene_name = base.binding.scene
    handles.surface_z = float(base.scene_spec.surface_z) if base.scene_spec is not None else 0.0
    handles.work_arm, handles.support_arm = base.work_arm, base.support_arm
    scene = CompiledScene(
        request=request,
        episode=episode,
        model=model,
        builder=base.builder,
        pipeline=pipeline,
        handles=handles,
        entities=base.entities,
        embodiment=base.embodiment,
        num_worlds=int(num_worlds),
        template_model=template_model,
        worlds=worlds,
        program=pipeline.program,
    )
    if verbose:
        fleet = f" x {num_worlds} worlds" if num_worlds > 1 else ""
        print(
            f"[compile] {request.full_name} episode {episode.episode_id}{fleet}: "
            f"{model.body_count} bodies, {model.shape_count} shapes, "
            f"{model.particle_count} particles, {model.tri_count} tris"
        )
        print(handles.summary())
        print(pipeline.program.summary())
    return scene


def _compile(
    request: SceneRequest,
    episode: Episode,
    *,
    use_cuda_graph: bool | None,
    verbose: bool,
    compose: Composer | None = None,
    pipeline_cls: type[ScenePipeline] = ScenePipeline,
) -> CompiledScene:
    """One world: build it, finalize it, bind to it, step it."""
    base = _build_base(request, episode)
    model = base.builder.finalize()

    lifecycle = _lifecycle(base.entities)
    for step in lifecycle.steps("bind"):
        step.fn(model)
    # The one window before the solvers take their copies of the model's arrays.
    for step in lifecycle.steps("materials"):
        step.fn(model)

    pipeline = _assemble(
        request,
        base,
        model,
        use_cuda_graph=use_cuda_graph,
        verbose=verbose,
        compose=compose,
        pipeline_cls=pipeline_cls,
    )
    _start_pose(model, pipeline, base.embodiment)

    # --- 7. the first moment physics can run ------------------------------
    _run_ready(pipeline, lifecycle)

    return _finish(request, episode, base, model, pipeline, verbose=verbose)


def _run_ready(pipeline, lifecycle) -> None:
    """The first moment physics can run, for one world or for many.

    A host engine is attached *before* anything settles -- an entity's settle
    steps the pipeline, and the engine's tick has to know both states to write
    by then -- and records its rest *after* everything has, because the drape a
    deformable lands in is what a reset returns to.

    Shared rather than written twice. The replicated path used to run the
    ``ready`` steps and neither of the host phases, so a fleet whose deformable
    was routed to a foreign engine built, stepped, and reset to a rest nothing
    had captured. Nothing caught it: ``_replication_refusal`` looks for substep
    kernels, and no ``host_actor`` implementation contributes one.
    """
    hosts = list(getattr(pipeline.program, "hosts", {}).values())
    for host in hosts:
        attach = getattr(host, "attach_pipeline", None)
        if callable(attach):
            attach(pipeline)
    for step in lifecycle.steps("ready"):
        step.fn(pipeline)
    for host in hosts:
        capture = getattr(host, "capture_rest", None)
        if callable(capture):
            capture()


def _replication_refusal(base: _BaseBuild, request: SceneRequest) -> str:
    """Why this scene must not be replicated yet, or empty when it may be.

    Refusing by *capability* rather than by a list of task names, and the
    capability is narrow: an entity that contributes **substep kernels** with
    world-0 particle and body indices baked into them. Replicated, every world's
    physics would run against world 0's arrays -- plausible motion in the wrong
    place, which is the failure worth refusing where it can still be named. An
    entity whose kernels are written per world says so with
    ``world_aware = True`` and is let through.

    Deformables and coupled solvers are *not* refused any more: the composer
    expands every island's ownership by the world map, the coupled solver
    carries a world mask, and a settle is already world-wide. What a replicated
    deformable still lacks is per-world *scoring* -- the fleet's context has no
    per-world particle probe -- which is the fleet's to refuse for a task whose
    goal asks, not the compiler's to refuse for every task that has cloth.
    """
    contributors = sorted(
        entity.name
        for entity in base.entities
        if type(entity).contribute_hooks is not Entity.contribute_hooks and not getattr(entity, "world_aware", False)
    )
    if contributors:
        return f"these entities contribute substep physics written for one world: {', '.join(contributors)}"

    # A foreign engine builds *one* scene from the whole model, so a replicated
    # world's actors would land in it as extra bodies of the first rather than as
    # worlds of their own.
    #
    # **And the worlds are superimposed, which is what makes this harder than the
    # index bookkeeping it looks like.** Replication places every world at the
    # origin -- right for Newton, whose broadphase pairs within a world -- but a
    # host scene has no world axis to pair within. Sixteen sponges and sixteen
    # grippers at the same coordinates are one pile that collides with itself, so
    # emitting an actor record per world would not produce sixteen cells; it
    # would produce one cell with sixteen of everything in it, pressing on each
    # other, and reporting a contact force for it.
    #
    # Lifting this therefore needs the worlds *separated inside the host scene* --
    # a per-world translation added to each actor's rest coordinates and to every
    # mirrored collider's pose, and subtracted on read-back, which is the same
    # shape of answer the path tracer needs for the same reason. The recipe half
    # (an actor record per world, and the graph-node shape sets spread the way
    # ``routing.route`` spreads them) is the easy half and is not the blocker.
    #
    # Nothing in the corpus has ever built this pairing, so
    # it is refused by name rather than composed and quietly wrong -- which is
    # what it was: the replicated path ran no host attach and no rest capture at
    # all, and the substep-kernel test above cannot see a host engine because no
    # ``host_actor`` implementation contributes a kernel.
    arrangement = getattr(request, "physics", None)
    if arrangement is not None:
        from robosimstudio.specs.physics import get_backend

        hosted = []
        for entity in base.entities:
            domain = getattr(entity, "domain", "")
            if not domain:
                continue
            spec = getattr(entity.sim_requirements(), "backend", None) or arrangement.backend_for(domain)
            if spec is None:
                continue
            try:
                backend = get_backend(spec.solver)
                if backend.host_engine and spec.solver not in REPLICATED_HOSTS:
                    hosted.append(f"{entity.name} ({spec.solver})")
            except KeyError:
                continue
        if hosted:
            return (
                "these entities are served by a foreign engine, which builds one scene from the whole "
                f"model and has never been validated across worlds: {', '.join(sorted(hosted))}"
            )
    return ""


def _place_worlds(entities: list[Entity], model: newton.Model, episodes: Sequence[Episode], num_worlds: int) -> None:
    """Write each world's drawn layout into ``model``, before anything reads it.

    Only the entities that claim :attr:`~robosimstudio.scene.entity.Entity.world_aware`
    and offer a ``place`` -- the same claim a per-world ``reset`` needs, for the
    same reason: a placement written for one world and run ``W`` times puts
    world 0's bench in every world, which is the failure the whole per-world
    story exists to prevent.

    ``place`` takes a **model**, not a pipeline, because there is no pipeline
    yet -- that is the entire point of doing it here. An entity with per-world
    state that only a running scene can hold (a field to clear, a window to
    empty) leaves it to ``reset``; what belongs here is what something built
    *after* this will read and never re-read.
    """
    placers = [e for e in entities if getattr(type(e), "world_aware", False) and hasattr(e, "place")]
    if not placers:
        return
    for world, episode in enumerate(episodes[:num_worlds]):
        if episode is None:
            continue
        for entity in placers:
            entity.place(model, episode, world=world)


def _compile_multi(
    request: SceneRequest,
    episode: Episode,
    *,
    num_worlds: int,
    use_cuda_graph: bool | None,
    verbose: bool,
    compose: Composer | None = None,
    pipeline_cls: type[ScenePipeline] = ScenePipeline,
    episodes: Sequence[Episode] | None = None,
) -> CompiledScene:
    """``num_worlds`` copies of one scene in one model, stepped together.

    The scene is built exactly once, by the same :func:`_build_base` the
    single-world path uses, and then replicated. Two models come out of it and
    both are needed:

    * ``model`` -- the replicated one. This is what steps, what the solvers are
      built on, and what holds every world's state.
    * ``template_model`` -- the unreplicated one. Entities bind to it, so
      ``label_index`` still sees each name once, and every index they resolve is
      the offset :class:`~robosimstudio.core.worlds.WorldMap` applies per world.

    Replication happens *before* either finalize because finalize is what bakes a
    builder into device arrays, and ``replicate`` reads the builder.

    Spacing is deliberately zero -- every world sits on top of every other. Worlds
    do not collide with each other (the broadphase pairs shapes within a world, or
    with the global world the ground plane lives in), so separation would buy only
    a visual, and Newton's own guidance is that keeping worlds at the origin is
    better numerically. A viewer spreads them out at draw time instead.
    """
    base = _build_base(request, episode, replicated=True)
    refusal = _replication_refusal(base, request)
    if refusal:
        raise CannotReplicate(f"{request.full_name} cannot run replicated ({num_worlds} worlds) yet: {refusal}")

    fleet = newton.ModelBuilder()
    fleet.gravity = base.builder.gravity
    fleet.replicate(base.builder, num_worlds, spacing=(0.0, 0.0, 0.0))

    template_model = base.builder.finalize()
    model = fleet.finalize()
    worlds = WorldMap.of(template_model, model, num_worlds)

    # Before ``bind``, because ``bind`` is where an entity allocates its device
    # arrays and a world-aware one has to size them by the fleet. After the map
    # exists, because there is nothing to tell until both models are finalized.
    for entity in base.entities:
        entity.worlds = worlds
        entity.stepping_model = model

    lifecycle = _lifecycle(base.entities)
    for step in lifecycle.steps("bind"):
        step.fn(template_model)

    # Each world's own drawn layout, written into the model **before** anything
    # is built on top of it.
    #
    # A replicated scene is one episode's, W times, and a task that draws its
    # layout has had to move the other worlds afterwards -- at reset, once the
    # solvers and any host engine already exist. For Newton that is enough: an
    # array is an array whenever it is written. For a **foreign engine** it is
    # not. A host bridge builds its actors out of ``model.particle_q`` when it
    # is constructed, so a deformable moved afterwards is an actor created at
    # one layout and teleported to another -- and a surface-preparation foam measured
    # every static quantity identical either way while the two cases pressed
    # the bar differently, which is the shape of a difference that lives in an
    # engine's own state rather than in anything a test can read back.
    #
    # So the placement happens here: after ``bind``, because an entity resolves
    # its indices there, and before :func:`_assemble`, which is what builds the
    # solvers and the host island. Every world is then *built* at its own
    # layout rather than moved to it, which is the configuration a rebuild
    # produces and the only one this task has ever scored on.
    if episodes is not None:
        _place_worlds(base.entities, model, episodes, num_worlds)
    # Materials are written to the *replicated* model -- it is the one the
    # solvers read -- and every entity writes its own rows per world, which for
    # a model-wide scalar or a whole-array fill is the same write. Note the two
    # phases take *different* models here and the schedule does not hide that:
    # it orders the steps, the call site passes the arguments.
    for step in lifecycle.steps("materials"):
        step.fn(model)

    pipeline = _assemble(
        request,
        base,
        model,
        use_cuda_graph=use_cuda_graph,
        worlds=worlds,
        verbose=verbose,
        compose=compose,
        pipeline_cls=pipeline_cls,
    )
    _start_pose(model, pipeline, base.embodiment, num_worlds=num_worlds)

    # --- 7. the first moment physics can run ------------------------------
    # A settle steps every world at once, and a rest snapshot copies the whole
    # particle array, so the deformable entities' readiness is already per
    # world. Measured on the towel fold: four replicated worlds settle to
    # within 2e-10 of each other.
    _run_ready(pipeline, lifecycle)

    return _finish(
        request,
        episode,
        base,
        model,
        pipeline,
        template_model=template_model,
        worlds=worlds,
        num_worlds=num_worlds,
        verbose=verbose,
    )


def _build_handles(
    request: SceneRequest,
    model: newton.Model,
    builder: newton.ModelBuilder,
    embodiment: Entity | None,
    entities: list[Entity],
    scene: CellSpec | None = None,
) -> SceneHandles:
    handles = SceneHandles()

    # Each entity says where it landed.
    for entity in entities:
        if entity is embodiment:
            continue
        where = view_of(entity)
        if where == "statics":
            # Scenery contributes its sidecar whether or not it offers a handle
            # -- reached defensively, because ``meta`` is ``EntityStatic``'s JSON
            # sidecar and not part of the ``Entity`` contract. This view is
            # membership by *domain* now (``world_fixed``) rather than by the
            # ``scenery`` build stage, and those sets differ for exactly the case
            # this refactor is for: a novel welded kind with its own entity used
            # to land in ``extras`` and be merely invisible, and would now be
            # classified correctly and crash on an attribute nothing declares.
            handles.meta.update(getattr(entity, "sidecar", None) or {})
        made = entity.handle(model)
        if made is None:
            continue
        made.name = entity.name
        table = {"statics": handles.statics, "deformables": handles.deformables}.get(where, handles.objects)
        table[entity.name] = made

    if embodiment is not None:
        shape_body = model.shape_body.numpy()
        robot_bodies = {int(b) for b in embodiment.bodies}
        robot_shapes = np.asarray(
            [s for s in range(model.shape_count) if int(shape_body[s]) in robot_bodies], dtype=np.int32
        )
        handles.robot_shapes = robot_shapes
        for arm_spec in embodiment.spec.arms:
            index = embodiment.arms[arm_spec.name]
            hand = embodiment.hands.get(arm_spec.name)
            finger_groups = tuple(
                tuple((int(body), np.flatnonzero(shape_body == body).astype(np.int32)) for body in side)
                for side in index.finger_bodies
            )
            handles.arms[arm_spec.name] = ArmHandle(
                name=arm_spec.name,
                arm_coords=tuple(index.arm_coords),
                arm_dofs=tuple(index.arm_dofs),
                gripper_coords=tuple(index.gripper_coords),
                gripper_dofs=tuple(index.gripper_dofs),
                ee_body=index.ee_body,
                base_body=index.base_body,
                # The TCP and the grasp frame come off the *hand*: swap the hand
                # and both move while the arm does not.
                ee_offset=tuple(float(v) for v in (hand.tcp_offset if hand else (0.0, 0.0, 0.0))),
                # The grasp frame, and the two measured axes it is built from.
                # Off the *index* where the bind resolved them, off the spec
                # where it did not -- and carried at all so nothing downstream
                # has to re-find the ArmSpec by name to compose a pose. See
                # ArmHandle.ee_offset_rot for what leaving it off cost.
                ee_offset_rot=tuple(float(v) for v in (hand.tcp_offset_rot if hand else (0.0, 0.0, 0.0, 1.0))),
                approach_axis=tuple(float(v) for v in index.approach_axis),
                close_axis=tuple(float(v) for v in index.close_axis),
                gripper_open=index.gripper_open,
                gripper_span=index.gripper_span,
                gripper_open_q=tuple(float(v) for v in index.gripper_open_q),
                gripper_closed_q=tuple(float(v) for v in index.gripper_closed_q),
                gripper_geared=bool(hand.geared) if hand else False,
                finger_groups=finger_groups,
                open_axis_signs=tuple(hand.open_axis_signs if hand else (1.0, -1.0)),
                # THIS arm's shapes, from the index's own limb walk -- not the
                # whole embodiment's. `robot_shapes` here made both handles of
                # a bimanual cell identical, so `sim.clearance("arm:work",
                # "arm:support")` measured the union against itself and
                # answered every corridor question with the deepest self-
                # overlap of one arm's own links (measured -228 mm, constant,
                # on a USB-C insertion scene) -- a silent lie in the one tool
                # built to pre-flight a bimanual move. The whole-robot set
                # lives on `handles.robot_shapes`.
                shapes=index.shapes if len(index.shapes) else robot_shapes,
                home_q=tuple(float(v) for v in arm_spec.home_q),
            )

    handles.regions.update(resolve_regions(handles, request, model))

    del builder
    _collect_finishes(handles, model, entities)
    return handles


def resolve_regions(handles: SceneHandles, request: Any, model: newton.Model) -> dict[str, RegionHandle]:
    """Every region a request declares, resolved against an already-built scene.

    Split out of :func:`_build_handles` because a **superset** wave resolves
    these more than once: the model holds the base's fixtures, and each world
    runs a document whose regions are its own. One tool-sorting document puts
    ``bin2_multimeter_region`` in one quadrant of bin2 and another puts it
    in another, so a wave of both needs two tables over one model -- and a
    region is pure geometry on a named frame
    (:class:`~robosimstudio.specs.RegionSpec`), so the only thing resolving it
    needs is the frame's origin, which is what this looks up.

    ``model`` is the **template** model when the scene is replicated, as
    everywhere else a name becomes an index: a region's ``frame_body`` is a
    template index and :meth:`RegionHandle.origin_now` re-reads that world's
    row from it.

    Returns a fresh table rather than mutating ``handles.regions``, so a caller
    holding the base's handles can build a document's table without disturbing
    it.
    """
    out: dict[str, RegionHandle] = {}
    body_q = None
    for region in request.regions:
        frame_body = -1
        origin = np.zeros(3)
        if region.frame in handles.objects or region.frame in handles.statics:
            handle = handles.entity(region.frame)
            frame_body = handle.body
            if frame_body >= 0:
                if body_q is None:
                    state = model.state()
                    newton.eval_fk(model, model.joint_q, model.joint_qd, state)
                    body_q = state.body_q.numpy()
                origin = np.asarray(body_q[frame_body][:3], dtype=np.float64)
        # A frame the scene does not carry as a body: a *declared* static's
        # handle already carries its compile-resolved pose (stored at
        # construction for exactly this class of lookup -- a welded fixture has
        # no `body_q` row), and anything else is looked up in whatever metadata
        # the arena shipped, where a merged export records its bin origins.
        # Before the first branch existed, a region targeting a welded fixture
        # silently anchored at the world origin and its containment could never
        # fire -- the weave seats' failure mode.
        if not region.frame:
            # No target: the work surface, the frame every ``at=`` is stated in,
            # so a square drawn on the bench is drawn where the bench is.
            binding = request.binding_for()
            origin = np.asarray(surface_frame(get_cell(binding.scene) if binding.scene else None)[:3], dtype=np.float64)
        elif frame_body < 0:
            static = handles.statics.get(region.frame)
            if static is not None and any(s.name == region.frame for s in request.statics):
                # The handle's xform, which is this episode's -- so a seat
                # declared against a station follows the station when an episode
                # arranges the board. See `EntityStatic.handle`.
                origin = np.asarray(static.xform[:3], dtype=np.float64)
            else:
                origin = _origin_from_meta(handles.meta, region.frame, origin)
        out[region.name] = RegionHandle(
            name=region.name,
            frame=region.frame,
            frame_body=frame_body,
            origin=origin,
            xy_ranges=region.xy_ranges,
            z_range=region.z_range,
        )
    return out


def _collect_finishes(handles: SceneHandles, model: newton.Model, entities: list[Entity]) -> None:
    """Every shape's finish, every deformable's, and the live-recoloured set.

    The entities painted their own shapes in :meth:`~robosimstudio.scene.entity.Entity.apply_display`
    and recorded a finish beside each colour. What they could not record is
    anything added after their range closed -- the YAM's white shells come from
    an appearance hook that runs afterwards, the ground plane from the compiler
    -- so the gaps are filled here from the colour those shapes carry, and the
    table is complete for every shape in the model. A backend then never has to
    decide what an unlisted shape looks like.
    """
    from robosimstudio.core.render.finish import finish_for

    finishes: dict[int, Finish] = {}
    for entity in entities:
        finishes.update(getattr(entity, "finishes", {}) or {})
    colors = getattr(model, "shape_color", None)
    colors = (
        colors.numpy()
        if hasattr(colors, "numpy")
        else (np.asarray(colors, dtype=np.float32) if colors is not None else None)
    )
    robot = {int(s) for s in handles.robot_shapes}
    for s in range(int(model.shape_count)):
        if s in finishes:
            continue
        color = tuple(float(v) for v in colors[s][:3]) if colors is not None and s < len(colors) else None
        finishes[s] = finish_for(color, "robot" if s in robot else "objects")
    handles.finishes = finishes

    for entity in entities:
        if entity.name not in handles.deformables:
            continue
        stated = getattr(entity.spec, "finish", None)
        color = getattr(entity.spec, "color", None)
        handles.deformable_finishes[entity.name] = stated if stated is not None else finish_for(color, "deformables")

    live = sorted(
        {s for entity in entities if getattr(entity, "recolors_live", False) for s in range(*entity.range.shapes)}
    )
    handles.live_shapes = np.asarray(live, dtype=np.int32)


def _origin_from_meta(meta: dict[str, Any], frame: str, default: np.ndarray) -> np.ndarray:
    """A region frame's origin from the scene's JSON sidecar."""
    for key in (f"{frame}_pos", frame):
        value = meta.get(key)
        if isinstance(value, (list, tuple)) and len(value) >= 3:
            return np.asarray(value[:3], dtype=np.float64)
    frames = meta.get("container_frames") or {}
    if frame in frames:
        return np.asarray(frames[frame][:3], dtype=np.float64)
    return default
````

## robosimstudio/scene/physics/backends.py

````text
# SPDX-License-Identifier: Apache-2.0
"""From a backend's name to a solver: resolve, register attributes, construct.

The mechanism half of :mod:`robosimstudio.specs.physics`'s backend registry.
The registry holds dotted paths so that registering imports nothing; this
module is where a path becomes a class, and it is the *only* place a solver
class is constructed in this package. A solver Newton ships tomorrow needs no
entry here: ``backend("newton.solvers.SolverNew", ...)`` resolves through
:func:`resolve_backend_class` like everything else.
"""

from __future__ import annotations

import importlib
from collections.abc import Iterable
from typing import Any

from robosimstudio.specs.physics import ArrangementSpec, BackendSpec, get_backend

from .errors import CompositionError

__all__ = [
    "build_solver",
    "effective_backend",
    "register_custom_attributes",
    "resolve_backend_class",
    "solver_class_path",
]


def solver_class_path(spec: BackendSpec) -> str:
    """The dotted path of the solver class a backend names."""
    return get_backend(spec.solver).cls


def resolve_backend_class(spec: BackendSpec) -> type:
    """Import and return the solver class a backend names.

    Raises:
        CompositionError: When the alias is unknown or the path does not import,
            naming what was tried.
    """
    try:
        path = solver_class_path(spec)
    except KeyError as exc:
        raise CompositionError(str(exc)) from exc
    module_name, _, attr = path.rpartition(".")
    if not module_name:
        raise CompositionError(f"backend {spec.solver!r}: {path!r} is not a dotted path to a class")
    try:
        module = importlib.import_module(module_name)
        cls = getattr(module, attr)
    except (ImportError, AttributeError) as exc:
        raise CompositionError(
            f"backend {spec.solver!r}: cannot import {path!r} ({type(exc).__name__}: {exc})"
        ) from exc
    return cls


def register_custom_attributes(
    builder: Any, arrangement: ArrangementSpec, extra: Iterable[BackendSpec] = ()
) -> list[str]:
    """Call ``register_custom_attributes(builder)`` on every backend class the arrangement names.

    **Before any entity builds.** MuJoCo's ``gravcomp`` and VBD's per-joint
    flags are custom attributes an importer writes *if they are registered*;
    registered after, the importer has already dropped them and the arm sags.
    Done here, from the arrangement, so no entity has to import a solver to
    know which attributes its builder calls will be allowed to keep.

    Returns:
        The dotted paths registered, in order, for a reader.
    """
    seen: list[str] = []
    specs = [spec for _, spec in arrangement.backends] + list(extra)
    for spec in specs:
        try:
            path = solver_class_path(spec)
        except KeyError as exc:
            raise CompositionError(str(exc)) from exc
        if path in seen:
            continue
        seen.append(path)
        cls = resolve_backend_class(spec)
        register = getattr(cls, "register_custom_attributes", None)
        if register is not None:
            register(builder)
    return seen


def effective_backend(spec: BackendSpec, *, has_particles: bool = True) -> BackendSpec:
    """``spec`` with its alias's registered defaults filled in underneath.

    The parameters the solver is actually constructed with, and what the
    manifest records: a dotted-path backend has no defaults and comes back as
    stated.
    """
    return get_backend(spec.solver).effective(spec, has_particles=has_particles)


def build_solver(spec: BackendSpec, view: Any, *, has_particles: bool = True) -> Any:
    """Construct the solver over ``view`` with the spec's effective parameters.

    Raises:
        CompositionError: Wrapping a constructor ``TypeError`` -- a misspelt
            parameter -- with the backend's name and the parameters it was
            given, which is the line somebody debugging a staging file wants.
    """
    cls = resolve_backend_class(spec)
    kwargs = effective_backend(spec, has_particles=has_particles).kwargs()
    try:
        return cls(model=view, **kwargs)
    except TypeError as exc:
        raise CompositionError(
            f"backend {spec.solver!r} ({cls.__module__}.{cls.__qualname__}) refused its parameters "
            f"{sorted(kwargs)}: {exc}"
        ) from exc
````

## robosimstudio/scene/physics/islands.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Partition the interaction graph into solver islands.

An island is one Newton solver over a compacted view of the shared model. Every
non-static node resolves a backend -- its own declared override, else the
arrangement's entry for its domain, else the ``"*"`` fallback -- and nodes
whose backends are *equal* share an island. That equality is the whole
mechanism by which a towel and a rope end up in one VBD: the arrangement names
``backend("vbd", ...)`` for ``"cloth"`` and ``"rod"`` with the same parameters,
and nothing else has to be said.

Statics own no dynamics. Their **shapes** are given to the deformable island
when there is one, so a rod can rest on the table it was laid on (an entry that
lists shapes sees only those; one that lists none sees its bodies' shapes plus
every world-fixed shape -- Newton's rule, and what lets the robot keep seeing
the table through the coupled solver's filter). A welded static's bodies and
joints go to the first island that can carry bodies, so no joint is left
unowned -- an unowned joint is disabled in every view.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import newton
import numpy as np

from robosimstudio.specs.physics import BACKENDS, ArrangementSpec, BackendSpec, get_backend, get_domain

from .backends import solver_class_path
from .errors import CompositionError
from .interactions import InteractionGraph, Node
from .world import expand_indices, expand_shapes

__all__ = ["Island", "partition"]


@dataclass
class Island:
    """One solver over the state of some entities.

    Attributes:
        name: The coupler's entry name.
        backend: What solves it.
        solver_class: The resolved dotted path.
        nodes: The entities it owns.
        bodies, joints, particles, shapes: Global model indices, world-expanded.
            ``shapes`` empty means "derived" (the rigid island's rule).
        extra_shapes: Static and world-fixed shapes this island was also given.
    """

    name: str
    backend: BackendSpec
    solver_class: str
    nodes: list[Node] = field(default_factory=list)
    bodies: np.ndarray = field(default_factory=lambda: np.zeros(0, dtype=np.int32))
    joints: np.ndarray = field(default_factory=lambda: np.zeros(0, dtype=np.int32))
    particles: np.ndarray = field(default_factory=lambda: np.zeros(0, dtype=np.int32))
    shapes: np.ndarray = field(default_factory=lambda: np.zeros(0, dtype=np.int32))
    extra_shapes: np.ndarray = field(default_factory=lambda: np.zeros(0, dtype=np.int32))

    @property
    def domains(self) -> tuple[str, ...]:
        out: list[str] = []
        for node in self.nodes:
            if node.domain not in out:
                out.append(node.domain)
        return tuple(out)

    @property
    def entities(self) -> tuple[str, ...]:
        return tuple(node.name for node in self.nodes)

    @property
    def is_robot(self) -> bool:
        return any(get_domain(node.domain).role == "robot" for node in self.nodes)

    @property
    def is_deformable(self) -> bool:
        """Whether this island is the *soft side* of a coupling.

        Two ways to be: a node here plays the ``deformables`` role, or the
        island's backend can integrate particles at all. The second is what was
        missing. ``compose._channels`` decides proxy direction by this predicate,
        and with roles alone a VBD island holding only a free rigid body -- role
        ``objects`` -- read as a *rigid* island: no channel was built, the body
        was orphaned, and a cube in such an island sat frozen at its spawn pose
        with ``body_qd`` exactly zero. Keying on the solver's registered
        capability is what lets ``GENERIC`` put everything but the robot on VBD
        and have a cube fall beside a rope beside an arm.

        Registered knowledge, not a literal list of aliases: a dotted-path
        solver nobody registered has an empty ``supports`` and falls back to the
        roles, which is the behaviour this had before.
        """
        if any(get_domain(node.domain).role == "deformables" for node in self.nodes):
            return True
        return "particles" in get_backend(self.backend.solver).supports

    @property
    def is_host_engine(self) -> bool:
        """Whether this island's backend is a foreign engine stepped on the host.

        Registered knowledge, exactly as :attr:`is_deformable` reads
        ``supports``: the composer splits these islands out before the Newton
        couplers, gives their solver a no-op ``step`` inside the graph, and
        schedules the real work as an eager per-control-step stage. A dotted
        path nobody registered is not one -- a host engine has to say so.
        """
        return get_backend(self.backend.solver).host_engine

    @property
    def maximal_coordinates(self) -> bool:
        """Whether ``joint_q`` has to be mirrored from ``body_q`` after each step."""
        if self.joints.size == 0:
            return False
        info = get_backend(self.backend.solver)
        if info.alias in BACKENDS:
            return info.maximal_coordinates  # a registered fact
        return "." in info.alias  # an anonymous dotted solver is assumed maximal

    def owns(self, name: str) -> bool:
        return any(node.name == name for node in self.nodes)

    def uses_native_contacts(self) -> bool:
        """Whether this island's solver generates its own contacts (MuJoCo's default)."""
        return get_backend(self.backend.solver).native_contacts and bool(self.backend.get("use_mujoco_contacts", True))


def _alias_name(spec: BackendSpec) -> str:
    alias = spec.solver
    if "." in alias:
        tail = alias.rsplit(".", 1)[-1]
        alias = tail.removeprefix("Solver").lower() or tail.lower()
    return alias


def partition(
    graph: InteractionGraph,
    arrangement: ArrangementSpec,
    model: newton.Model,
    *,
    worlds=None,
) -> list[Island]:
    """Islands for the graph under the arrangement, the robot's first.

    Args:
        graph: The interaction graph over the template model.
        arrangement: Which backend serves which domain.
        model: The model the solvers will step (the replicated one for a fleet),
            for the shape count.
        worlds: The :class:`~robosimstudio.core.worlds.WorldMap` when replicated.

    Raises:
        CompositionError: When a non-static entity has no backend, or its
            backend is known not to support the state its domain carries.
    """
    groups: dict[BackendSpec, Island] = {}
    statics: list[Node] = []

    for node in graph.nodes.values():
        if get_domain(node.domain).world_fixed:
            statics.append(node)
            continue
        spec = node.sim.backend or arrangement.backend_for(node.domain)
        if spec is None:
            raise CompositionError(
                f"entity {node.name!r} is a {node.domain!r} and the arrangement names no backend for that "
                f"domain (it serves {list(arrangement.domains())}). Add a backend for {node.domain!r}, or a "
                "'*' fallback."
            )
        info = get_backend(spec.solver)
        if info.supports:
            needed = [k for k in get_domain(node.domain).state if k != "shapes" and node.has(k)]
            missing = [k for k in needed if k not in info.supports]
            if missing:
                raise CompositionError(
                    f"entity {node.name!r} ({node.domain}) owns {needed}, but backend {spec.solver!r} "
                    f"integrates only {list(info.supports)} -- it cannot own {missing}."
                )
        island = groups.get(spec)
        if island is None:
            island = Island(name=_alias_name(spec), backend=spec, solver_class=solver_class_path(spec))
            groups[spec] = island
        island.nodes.append(node)

    islands = list(groups.values())
    if not islands:
        # A model built by hand, with no entity layer over it -- a bench rig, a
        # material strip. One island from the fallback backend, owning nothing
        # explicitly, which for a single solver means the whole model.
        spec = arrangement.backend_for("*")
        if spec is None:
            raise CompositionError(
                "the scene declares no entity with dynamics and the arrangement names no '*' backend, "
                "so there is nothing to solve and nothing to solve it with"
            )
        if not (model.body_count or model.joint_count or model.particle_count):
            # Distinct from the case above, and worth its own sentence: there the
            # arrangement was short an entry, here the *scene* has nothing in it
            # that moves. Handing that model to a solver fails inside the solver
            # -- MuJoCo says "the model must have at least one joint to be able
            # to convert it", which is true and is about a conversion, not about
            # a scene of nothing but furniture. Assembling the scenery first and
            # looking at it is an ordinary thing to try.
            names = sorted(n.name for n in graph.nodes.values())
            raise CompositionError(
                f"this scene has nothing that moves: {names or 'no entities at all'} -- every one of them is "
                "welded to the world, so there are no bodies, no joints and no particles to integrate. Add "
                "something dynamic: rss.box, rss.sheet, rss.sponge, or a robot. A scene of only scenery cannot "
                "be built at all today, not even to look at -- the solver is constructed during the compile, "
                "so there is no argument to build() that skips it."
            )
        return [Island(name=_alias_name(spec), backend=spec, solver_class=solver_class_path(spec))]

    # The robot's island steps first: it is the proxy *source* in every channel.
    islands.sort(key=lambda island: (not island.is_robot, island.name))
    seen: dict[str, int] = {}
    for island in islands:
        count = seen.get(island.name, 0)
        seen[island.name] = count + 1
        if count:
            island.name = f"{island.name}_{count + 1}"

    # Ownership: template indices first, expanded per world at the end.
    for island in islands:
        island.bodies = np.unique(np.concatenate([n.bodies for n in island.nodes] or [np.zeros(0, np.int32)])).astype(
            np.int32
        )
        island.joints = np.unique(np.concatenate([n.joints for n in island.nodes] or [np.zeros(0, np.int32)])).astype(
            np.int32
        )
        island.particles = np.unique(
            np.concatenate([n.particles for n in island.nodes] or [np.zeros(0, np.int32)])
        ).astype(np.int32)

    # Statics: shapes to the first deformable island; bodies/joints to the first
    # body-carrying island. A host-engine island is skipped for the shapes even
    # though it is deformable -- its statics are mirrored into the foreign scene
    # from its own recipe, and a VBD island beside it still needs the table.
    deformable = next((i for i in islands if i.is_deformable and not i.is_host_engine), None)
    body_carrier = next((i for i in islands if i.is_robot), None) or next(
        (i for i in islands if "bodies" in (get_backend(i.backend.solver).supports or ("bodies",))), islands[0]
    )
    static_shapes = [n.shapes for n in statics] or [np.zeros(0, np.int32)]
    static_bodies = [n.bodies for n in statics] or [np.zeros(0, np.int32)]
    static_joints = [n.joints for n in statics] or [np.zeros(0, np.int32)]
    if statics:
        body_carrier.bodies = np.unique(np.concatenate([body_carrier.bodies, *static_bodies])).astype(np.int32)
        body_carrier.joints = np.unique(np.concatenate([body_carrier.joints, *static_joints])).astype(np.int32)
    if deformable is not None and len(islands) > 1:
        own = [n.shapes for n in deformable.nodes] or [np.zeros(0, np.int32)]
        deformable.extra_shapes = np.unique(np.concatenate(static_shapes)).astype(np.int32)
        deformable.shapes = np.unique(np.concatenate([*own, deformable.extra_shapes])).astype(np.int32)

    if worlds is not None and worlds.num_worlds > 1:
        for island in islands:
            island.bodies = expand_indices(island.bodies, worlds.bodies_per_world, worlds.num_worlds)
            island.joints = expand_indices(island.joints, worlds.joints_per_world, worlds.num_worlds)
            island.particles = expand_indices(island.particles, worlds.particles_per_world, worlds.num_worlds)
            if island.shapes.size:
                island.shapes = expand_shapes(
                    island.shapes, worlds.shapes_per_world, worlds.num_worlds, model.shape_count
                )
            if island.extra_shapes.size:
                island.extra_shapes = expand_shapes(
                    island.extra_shapes, worlds.shapes_per_world, worlds.num_worlds, model.shape_count
                )
    elif deformable is not None and len(islands) > 1:
        # World-fixed shapes the compiler adds after every entity -- the ground
        # plane -- sit past every entity's range and must be visible to the rod.
        on_world = (
            np.flatnonzero(model.shape_body.numpy() < 0).astype(np.int32)
            if model.shape_count
            else np.zeros(0, np.int32)
        )
        deformable.shapes = np.unique(np.concatenate([deformable.shapes, on_world])).astype(np.int32)
        deformable.extra_shapes = np.unique(np.concatenate([deformable.extra_shapes, on_world])).astype(np.int32)
    return islands
````

## robosimstudio/scene/physics/routing.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Which shape pairs each collision pipeline detects.

A pair is detected in exactly one place. The rule is Newton's: when an island
is the *destination* of a proxy channel, its solver is stepped with the
channel's own pipeline and never sees the outer contacts, so that pipeline must
carry everything the island touches -- its own pairs, the statics it rests on,
and the proxied bodies. The main pipeline then serves what is left: a rigid
island that asked for Newton contacts (``use_mujoco_contacts=False``), or a
lone deformable island with no channel at all.

Every list is cut from ``model.shape_contact_pairs`` rather than enumerated by
hand, because that table already honours every
``add_shape_collision_filter_pair`` the entities made -- and an explicit broad
phase handed a hand-made list silently re-admits every filtered pair. The
cable-routing cell has 392 of them, the working arm's blades against the table, and
re-admitted they were the floor the hand stopped on.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import newton
import numpy as np

from robosimstudio.specs.physics import get_domain

from .interactions import InteractionGraph, Node
from .islands import Island
from .world import expand_shapes

__all__ = ["Routing", "filtered_pairs", "route"]


def filtered_pairs(model: newton.Model, rows) -> np.ndarray:
    """``rows`` less anything the *builder* filtered, as an ``[n, 2]`` int32 array.

    An explicit broad phase is a list of pairs to **check**, and Newton reaches
    for ``model.shape_contact_pairs`` -- which honours every
    ``add_shape_collision_filter_pair`` -- only when no list is handed to it.
    """
    rows = np.asarray(list(rows), dtype=np.int32).reshape(-1, 2)
    keep = [row for row in rows.tolist() if not model.shape_collision_filter_contains(int(row[0]), int(row[1]))]
    return np.asarray(keep, dtype=np.int32).reshape(-1, 2)


@dataclass
class Routing:
    """The pair lists, by pipeline.

    Attributes:
        main_pairs: Rows for the main pipeline, or ``None`` for no main pipeline.
        channel_pairs: Rows per ``(source, destination)`` channel, or ``None``
            when the channel's pipeline should use its view's own pair set.
        unrouted: Edges no pipeline serves, in words.
    """

    main_pairs: np.ndarray | None = None
    channel_pairs: dict[tuple[str, str], np.ndarray | None] = field(default_factory=dict)
    unrouted: list[str] = field(default_factory=list)


def _island_of(islands: list[Island], name: str) -> Island | None:
    return next((i for i in islands if i.owns(name)), None)


def _rows_between(pairs: np.ndarray, a: np.ndarray, b: np.ndarray) -> np.ndarray:
    """Rows of ``pairs`` with one shape in ``a`` and the other in ``b``."""
    if pairs.size == 0 or a.size == 0 or b.size == 0:
        return np.zeros((0, 2), dtype=np.int32)
    in_a0 = np.isin(pairs[:, 0], a)
    in_b1 = np.isin(pairs[:, 1], b)
    in_a1 = np.isin(pairs[:, 1], a)
    in_b0 = np.isin(pairs[:, 0], b)
    return pairs[(in_a0 & in_b1) | (in_a1 & in_b0)]


def _rows_within(pairs: np.ndarray, shapes: np.ndarray) -> np.ndarray:
    if pairs.size == 0 or shapes.size == 0:
        return np.zeros((0, 2), dtype=np.int32)
    return pairs[np.isin(pairs[:, 0], shapes) & np.isin(pairs[:, 1], shapes)]


def _shapes_for(node: Node, hands_only: bool) -> np.ndarray:
    return node.hand_shapes if hands_only else node.shapes


def route(
    graph: InteractionGraph,
    islands: list[Island],
    channels: list,
    model: newton.Model,
    *,
    world_shapes: np.ndarray,
    worlds=None,
) -> Routing:
    """Cut the model's pair table into per-pipeline lists.

    Args:
        graph: The interaction graph.
        islands: The islands.
        channels: The channels (``.source``, ``.destination``, ``.bodies``, ``.shapes``).
        model: The model being stepped, for its pair table.
        world_shapes: Shapes on the world body (the ground plane and any static
            added outside an entity's range), visible to every pipeline.
        worlds: The stride map when the model is replicated, or ``None``.

            **Load bearing, and its absence was silent.** The pair table cut from
            here is the *replicated* model's and holds every world's pairs; the
            sets doing the cutting come from the interaction graph, whose nodes
            hold the **template's** shape indices because that is the model every
            entity bound to. Cut one against the other and every list comes back
            holding world 0's pairs and nothing else -- so world 0 has contacts
            and no other world does.

            Measured on a cable-routing scene at three worlds, before this
            argument existed: worlds 1 and 2 were identical to world 0 at reset,
            diverged from the first step, and their cables were 19 m below the
            bench by step 120 -- free fall, because nothing was holding them up.
            Nothing reported anything: the states stayed finite, the episodes
            ran their budget, and the rows said what rows say.
    """
    pairs = (
        model.shape_contact_pairs.numpy().astype(np.int32).reshape(-1, 2)
        if model.shape_count
        else np.zeros((0, 2), np.int32)
    )
    routing = Routing()
    destinations = {c.destination for c in channels}
    replicated = worlds is not None and worlds.num_worlds > 1

    def spread(shapes: np.ndarray) -> np.ndarray:
        """Template shape indices, as every world's copy of them.

        Only for sets that come from the graph. A channel's shapes are derived
        from the replicated model's ``shape_body`` and are already world
        complete -- putting them through here would drop every world past the
        first, since ``expand_shapes`` reads anything at or above one world's
        stride as global.
        """
        if not replicated:
            return shapes
        return expand_shapes(shapes, worlds.shapes_per_world, worlds.num_worlds, model.shape_count)

    static_shapes = spread(
        np.unique(
            np.concatenate(
                [n.shapes for n in graph.nodes.values() if get_domain(n.domain).world_fixed] + [world_shapes]
            )
        ).astype(np.int32)
    )

    main_rows: list[np.ndarray] = []
    channel_rows: dict[tuple[str, str], list[np.ndarray]] = {(c.source, c.destination): [] for c in channels}
    needs_main = False

    def island_for(node: Node) -> Island | None:
        return _island_of(islands, node.name)

    for edge in graph.edges:
        a, b = graph.nodes[edge.a], graph.nodes[edge.b]
        ia, ib = island_for(a), island_for(b)
        sa, sb = spread(_shapes_for(a, False)), spread(_shapes_for(b, edge.hands_only))
        rows = _rows_between(pairs, sa, sb)
        # Which side is the deformable destination, if any.
        dest = None
        other = None
        for node, island in ((a, ia), (b, ib)):
            if island is not None and island.name in destinations:
                dest, other = island, (b if node is a else a)
        if dest is not None:
            channel = next((c for c in channels if c.destination == dest.name), None)
            key = (channel.source, channel.destination)
            io = island_for(other)
            if io is dest or io is None or get_domain(other.domain).world_fixed:
                channel_rows[key].append(rows)
            elif io is not None and io.name == channel.source:
                # Only the proxied bodies' shapes are visible in the destination.
                proxied = _rows_between(pairs, spread(_shapes_for(dest_node(graph, dest), False)), channel.shapes)
                hand_rows = _rows_between(pairs, sa if a is other else sb, channel.shapes) if False else proxied
                channel_rows[key].append(hand_rows)
            else:
                routing.unrouted.append(
                    f"{a.name} x {b.name}: {other.name} is in island {io.name!r}, which is not proxied into "
                    f"{dest.name!r}; add a channel or declare the contact off"
                )
            continue
        # Neither end is a channel destination: the main pipeline, if the
        # islands involved take Newton contacts.
        natives = [i for i in (ia, ib) if i is not None and i.uses_native_contacts()]
        if ia is not None and ib is not None and ia is ib and ia.uses_native_contacts():
            continue  # MuJoCo detects its own
        if natives and (ia is None or ib is None or ia is ib):
            continue  # a rigid island's static contacts, detected natively
        if natives and ia is not None and ib is not None and ia is not ib:
            routing.unrouted.append(
                f"{a.name} x {b.name}: {ia.name!r} and {ib.name!r} are different islands with no channel between them"
            )
            continue
        needs_main = True
        main_rows.append(rows)

    # Self-contact of rigid deformables (rods) and statics inside a destination.
    for dest_name in destinations:
        dest = next(i for i in islands if i.name == dest_name)
        channel = next(c for c in channels if c.destination == dest_name)
        key = (channel.source, channel.destination)
        own = spread(
            np.unique(np.concatenate([n.shapes for n in dest.nodes] or [np.zeros(0, np.int32)])).astype(np.int32)
        )
        channel_rows[key].append(_rows_within(pairs, own))
        channel_rows[key].append(_rows_between(pairs, own, static_shapes))
        channel_rows[key].append(_rows_between(pairs, own, channel.shapes))

    if needs_main or (len(islands) == 1 and not islands[0].uses_native_contacts()):
        # A lone island that does not detect its own contacts gets Newton's own
        # broad phase over the whole model rather than an enumerated list: the
        # list would be the same set, and building it costs a pass over every
        # pair for nothing.
        rows = (
            np.unique(np.concatenate(main_rows or [np.zeros((0, 2), np.int32)]), axis=0)
            if main_rows
            else np.zeros((0, 2), np.int32)
        )
        routing.main_pairs = rows.astype(np.int32)
    for key, chunks in channel_rows.items():
        rows = np.concatenate(chunks or [np.zeros((0, 2), np.int32)]).reshape(-1, 2)
        routing.channel_pairs[key] = np.unique(rows, axis=0).astype(np.int32) if rows.size else rows.astype(np.int32)
    return routing


def dest_node(graph: InteractionGraph, dest: Island) -> Node:
    """A synthetic node holding every shape of a destination island, for routing."""
    shapes = np.unique(np.concatenate([n.shapes for n in dest.nodes] or [np.zeros(0, np.int32)])).astype(np.int32)
    first = dest.nodes[0]
    return Node(
        name=dest.name,
        entity=None,
        domain=first.domain,
        sim=first.sim,
        roles=frozenset(),
        bodies=dest.bodies,
        joints=dest.joints,
        particles=dest.particles,
        shapes=shapes,
    )
````

## robosimstudio/scene/physics/couplers.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Build the coupled solver for a set of islands and channels.

The builders are registered by kind under the same names the
:mod:`robosimstudio.specs.physics` coupler registry declares, so a task may
register a new algorithm beside its arrangement:
``register_coupler_builder("mine", build)`` with
``build(ctx: CouplerBuild) -> SolverBase``. Two ship here: Newton's proxy
coupler (``"proxy"``), which mirrors one island's bodies into another as
mass-scaled virtual proxies, and its ADMM coupler (``"admm"``), which solves
cross-island contacts as constraints. One island needs no coupler at all and
gets the bare solver.
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

import newton
import numpy as np
import warp as wp

from robosimstudio.registry import Registry, same_source
from robosimstudio.specs.physics import ArrangementSpec, CollisionSpec, CouplerSpec

from .backends import build_solver
from .errors import CompositionError
from .islands import Island

__all__ = [
    "COUPLER_BUILDERS",
    "Channel",
    "CouplerBuild",
    "SolverCosim",
    "SolverOneWay",
    "build_coupled",
    "register_coupler_builder",
]


@dataclass
class Channel:
    """One coupling channel: some bodies of ``source`` proxied into ``destination``.

    Attributes:
        source: Island that owns the bodies.
        destination: Island that sees them as proxies.
        bodies: Global body indices (world-expanded).
        shapes: The shapes on those bodies.
        joints: Joints among those bodies, kept as proxy joints when asked.
        coupling: ``"two_way"`` or ``"one_way"``.
        entities: Which entities the bodies came from.
        pairs: Explicit shape pairs for the channel's pipeline, or ``None``.
    """

    source: str
    destination: str
    bodies: np.ndarray
    shapes: np.ndarray
    joints: np.ndarray = field(default_factory=lambda: np.zeros(0, dtype=np.int32))
    coupling: str = "two_way"
    entities: tuple[str, ...] = ()
    pairs: np.ndarray | None = None


@dataclass
class CouplerBuild:
    """Everything a coupler builder is handed."""

    model: newton.Model
    arrangement: ArrangementSpec
    islands: list[Island]
    channels: list[Channel]
    spec: CouplerSpec
    collision: CollisionSpec

    def entries(self, entry_cls) -> list:
        """One ``SolverCoupled.Entry`` per island."""
        out = []
        for island in self.islands:
            out.append(
                entry_cls(
                    name=island.name,
                    solver=(
                        lambda view, spec=island.backend, particles=bool(island.particles.size): build_solver(
                            spec, view, has_particles=particles
                        )
                    ),
                    bodies=[int(b) for b in island.bodies],
                    joints=[int(j) for j in island.joints],
                    particles=[int(p) for p in island.particles],
                    shapes=[int(s) for s in island.shapes],
                    substeps=int(island.backend.substeps),
                )
            )
        return out


COUPLER_BUILDERS: Registry[Callable[[CouplerBuild], Any]] = Registry("coupler builder", same=same_source)
"""Coupler kind -> builder. Populated below and by tasks."""


def register_coupler_builder(kind: str, build: Callable[[CouplerBuild], Any]) -> None:
    """Register the builder for a coupler kind. Identical re-registration is accepted.

    Two tasks each shipping their own copy of one coupler is the case that has
    to keep working, so an identical copy is accepted and a genuine clash is an
    error naming both origins.

    Raises:
        ValueError: If ``kind`` is taken by a different builder.
    """
    COUPLER_BUILDERS.register(kind, build, origin=build.__module__)


def _pipeline_factory(ctx: CouplerBuild, pairs: np.ndarray | None, *, particles: bool = False):
    """The collision pipeline one channel's destination solve is stepped with.

    Args:
        ctx: What the coupler is being built from.
        pairs: Explicit shape pairs, or ``None`` for Newton's own broad phase.
        particles: Whether the destination owns particles. **An explicit pair
            list is refused for one that does**, and the reason is measured: a
            pair list is a list of *shape* pairs, and handing one to the
            pipeline restricts the soft pass with it -- a towel dropped onto a
            cord in the same island fell straight through, cord unmoved, with
            every ``COLLIDE_PARTICLES`` flag set and 1825 rigid pairs routed.
            The view has already hidden everything the entry does not own, so
            the broad phase over it sees the same set the list was cut from and
            the only thing given up is the builder's own filters -- which apply
            to rigid pairs, which is what the list was for.
    """
    collision = ctx.collision
    matching = ctx.spec.get("contact_matching", collision.contact_matching)
    explicit = pairs is not None and len(pairs) and not particles

    def make(view):
        kwargs: dict[str, Any] = {
            "soft_contact_margin": float(collision.soft_contact_margin),
            "enable_rigid_soft_full_surface_contact": bool(collision.full_surface_contact),
            "contact_matching": matching,
        }
        if explicit:
            kwargs["broad_phase"] = "explicit"
            kwargs["shape_pairs_filtered"] = wp.array(
                np.asarray(pairs, dtype=np.int32), dtype=wp.vec2i, device=view.device
            )
        if collision.rigid_contact_max > 0:
            kwargs["rigid_contact_max"] = int(collision.rigid_contact_max)
        return newton.CollisionPipeline(view, **kwargs)

    return make


def build_proxy(ctx: CouplerBuild) -> Any:
    from newton.solvers.experimental.coupled import SolverCoupled, SolverCoupledProxy

    if len(ctx.islands) > 2:
        raise CompositionError(
            f"the proxy coupler couples at most two islands and this scene has {len(ctx.islands)} "
            f"({[i.name for i in ctx.islands]}); stage coupler('admm') or merge backends so two domains share one."
        )
    params = ctx.spec.kwargs()
    mode = str(params.get("mode", "staggered"))
    mass_scale = float(params.get("mass_scale", 1.0))
    one_way_scale = float(params.get("one_way_mass_scale", 1.0e6))
    interval = int(params.get("collide_interval", 1))
    relaxation = float(params.get("proxy_relaxation", 1.0))
    relaxation_mode = str(params.get("proxy_relaxation_mode", "fixed"))
    proxy_joints = bool(params.get("proxy_joints", False))

    by_name = {island.name: island for island in ctx.islands}
    proxies = []
    for channel in ctx.channels:
        scale = mass_scale if channel.coupling == "two_way" else one_way_scale
        destination = by_name.get(channel.destination)
        particles = bool(destination is not None and destination.particles.size)
        proxies.append(
            SolverCoupledProxy.Proxy(
                source=channel.source,
                destination=channel.destination,
                bodies=[int(b) for b in channel.bodies],
                joints=[int(j) for j in channel.joints] if proxy_joints else (),
                mass_scale=scale,
                mode=mode,
                proxy_relaxation=relaxation,
                proxy_relaxation_mode=relaxation_mode,
                collision_pipeline=_pipeline_factory(ctx, channel.pairs, particles=particles),
                collide_interval=interval,
            )
        )
    return SolverCoupledProxy(
        model=ctx.model,
        entries=ctx.entries(SolverCoupled.Entry),
        coupling=SolverCoupledProxy.Config(proxies=proxies, iterations=int(params.get("iterations", 1))),
    )


def build_admm(ctx: CouplerBuild) -> Any:
    from newton.solvers.experimental.coupled import SolverCoupled, SolverCoupledADMM

    params = ctx.spec.kwargs()
    pairs = [SolverCoupledADMM.ContactPair(source=c.source, destination=c.destination) for c in ctx.channels]
    if not pairs:
        pairs = SolverCoupledADMM.auto_detect_contact_pairs(ctx.entries(SolverCoupled.Entry))
    known = {
        "iterations",
        "rho",
        "gamma",
        "baumgarte",
        "joint_stiffness",
        "joint_damping",
        "joint_angular_stiffness",
        "joint_angular_damping",
        "joint_proximal_bodies",
        "joint_proximal_mass_scale",
        "rigid_contact_matching",
        "contact_matching_pos_threshold",
        "contact_matching_normal_dot_threshold",
        "contact_matching_force_scale",
    }
    config = SolverCoupledADMM.Config(**{k: v for k, v in params.items() if k in known}, contact_pairs=pairs)
    return SolverCoupledADMM(model=ctx.model, entries=ctx.entries(SolverCoupled.Entry), coupling=config)


class SolverOneWay:
    """Two solvers over one model, the rigid one leading: a kinematic mirror, no feedback.

    One solver with the standard ``step`` signature: the rigid solver steps with
    its own contacts, the collision pipeline runs over its new body poses, and
    the deformable solver steps with ``integrate_with_external_rigid_solver=True``
    -- the robot is a moving boundary it never pushes back on.

    VBD reads the new poses off ``state_out`` and the previous ones off
    ``state_in``, and its friction is the particle's slip against the difference:
    how far the pad under a particle moved this substep. So ``state_in`` keeps
    the previous poses for the solve, and gets the new ones only while the
    collision pipeline runs, which must find this substep's arm. Handing VBD the
    new pose twice made every finger stand still to friction: a closed jaw
    lifting a towel's edge dragged it back down, and kept 0 of the 15 particles
    it pinched; with the motion it keeps all 15 through a 100 mm lift.

    Why it exists beside the proxy coupler rather than instead of it: Newton's
    proxy harvest consumes per-particle contact records only, and refuses
    full-surface (edge/face) soft contacts outright -- which are what let a pad
    narrower than a mesh cell hold a sheet. A cloth a jaw must pinch therefore
    couples one way with full-surface contact, or two ways without it; the
    arrangement says which, and both are data.

    Args:
        model: The shared model.
        rigid: The rigid solver, built over the whole model.
        soft: The deformable solver, built over the whole model in external-rigid mode.
        collision: The pipeline the deformable solver's contacts come from.
        names: ``(rigid island name, deformable island name)``.
    """

    def __init__(self, model, rigid, soft, collision, names: tuple[str, str]) -> None:
        self.model = model
        self.rigid = rigid
        self.soft = soft
        self.collision = collision
        self.contacts = collision.contacts()
        self.names = names
        self.device = model.device
        # Allocated here, not on the first step: a step may be captured into a graph.
        self._body_q_prev = wp.clone(model.body_q) if model.body_count else None

    def solver(self, name: str):
        return {self.names[0]: self.rigid, self.names[1]: self.soft}[name]

    def view(self, name: str):
        del name
        return self.model

    def entry_names(self) -> tuple[str, ...]:
        return tuple(self.names)

    def step(self, state_in, state_out, control, contacts, dt: float) -> None:
        del contacts
        if self._body_q_prev is None:
            self.rigid.step(state_in, state_out, control, None, dt)
            self.collision.collide(state_in, self.contacts)
            self.soft.step(state_in, state_out, control, self.contacts, dt)
            return
        wp.copy(self._body_q_prev, state_in.body_q)
        self.rigid.step(state_in, state_out, control, None, dt)
        # The pipeline collides ``state_in``: this substep's arm against the particles where they start.
        wp.copy(state_in.body_q, state_out.body_q)
        self.collision.collide(state_in, self.contacts)
        # And VBD's friction is the pad's motion from ``state_in`` to ``state_out``, so put it back.
        wp.copy(state_in.body_q, self._body_q_prev)
        self.soft.step(state_in, state_out, control, self.contacts, dt)

    def notify_model_changed(self, flags) -> None:
        for inner in (self.rigid, self.soft):
            inner.notify_model_changed(int(flags))

    def reset(self, state, world_mask=None, flags=None) -> None:
        for inner in (self.rigid, self.soft):
            reset = getattr(inner, "reset", None)
            if reset is None:
                continue
            try:
                reset(state, world_mask=world_mask, flags=flags) if flags is not None else reset(
                    state, world_mask=world_mask
                )
            except TypeError:
                reset(state)


def build_one_way(ctx: CouplerBuild) -> Any:
    """A rigid island leading a deformable one, with the deformable island's contacts from a full pipeline."""
    if len(ctx.islands) != 2:
        raise CompositionError(
            f"the one_way coupler joins exactly one rigid island to one deformable island, got "
            f"{[i.name for i in ctx.islands]}"
        )
    deformable = next((i for i in ctx.islands if i.is_deformable), None)
    rigid = next((i for i in ctx.islands if i is not deformable), None)
    if deformable is None or rigid is None or rigid.is_deformable:
        raise CompositionError("the one_way coupler needs one rigid island and one deformable island")
    rigid_solver = build_solver(rigid.backend, ctx.model, has_particles=False)
    soft_spec = deformable.backend.with_(integrate_with_external_rigid_solver=True)
    soft_solver = build_solver(soft_spec, ctx.model, has_particles=bool(deformable.particles.size))
    collision = ctx.collision
    kwargs: dict[str, Any] = {
        "soft_contact_margin": float(collision.soft_contact_margin),
        "enable_rigid_soft_full_surface_contact": bool(collision.full_surface_contact),
    }
    if collision.contact_matching != "disabled":
        kwargs["contact_matching"] = collision.contact_matching
    pipeline = newton.CollisionPipeline(ctx.model, **kwargs)
    return SolverOneWay(ctx.model, rigid_solver, soft_solver, pipeline, (rigid.name, deformable.name))


class SolverCosim:
    """The Newton side of a scene, plus its host-engine islands, as one solver.

    Not a coupler in the arrangement's vocabulary and never staged as one: the
    composer wraps automatically whenever a host-engine island exists, so a
    scene gains a sponge without its staged ``proxy``/``one_way`` coupling
    changing meaning. Inside the captured graph this is exactly the Newton
    solver it wraps -- a host solver's ``step`` is a no-op by contract -- and
    the host engines advance in the eager ``after`` stages the composer
    schedules beside it.

    Args:
        model: The shared model.
        newton_solver: The composed Newton-side solver (bare or coupled), or
            ``None`` when every island is a host island.
        hosts: Host solvers by island name.
    """

    def __init__(self, model, newton_solver, hosts: dict[str, Any]) -> None:
        self.model = model
        self.newton_solver = newton_solver
        self.hosts = dict(hosts)
        self.device = getattr(model, "device", None)

    def step(self, state_in, state_out, control, contacts, dt: float) -> None:
        if self.newton_solver is not None:
            self.newton_solver.step(state_in, state_out, control, contacts, dt)

    def notify_model_changed(self, flags) -> None:
        for inner in (self.newton_solver, *self.hosts.values()):
            if inner is not None:
                inner.notify_model_changed(int(flags))

    def reset(self, state, world_mask=None, flags=None) -> None:
        for inner in (self.newton_solver, *self.hosts.values()):
            reset = getattr(inner, "reset", None)
            if reset is None:
                continue
            try:
                reset(state, world_mask=world_mask, flags=flags) if flags is not None else reset(
                    state, world_mask=world_mask
                )
            except TypeError:
                reset(state)

    def solver(self, name: str):
        if name in self.hosts:
            return self.hosts[name]
        inner = self.newton_solver
        if inner is None:
            raise KeyError(f"no island {name!r}; host islands: {sorted(self.hosts)}")
        lookup = getattr(inner, "solver", None)
        return lookup(name) if callable(lookup) else inner

    def view(self, name: str):
        if name in self.hosts:
            return self.model
        inner = self.newton_solver
        lookup = getattr(inner, "view", None)
        return lookup(name) if callable(lookup) else self.model

    def entry_names(self) -> tuple[str, ...]:
        inner = self.newton_solver
        names = getattr(inner, "entry_names", None)
        newton_names = tuple(names()) if callable(names) else ()
        return (*newton_names, *self.hosts)

    def __getattr__(self, name: str):
        # The incidental solver surface -- ``entry_state``, ``prepare_contacts``,
        # ``contacts``, the proxy tuning hooks -- belongs to the Newton side;
        # forwarding it wholesale is what lets the wrapper stand wherever the
        # inner solver stood. Only reached for names not set in __init__.
        inner = self.__dict__.get("newton_solver")
        if inner is None:
            raise AttributeError(name)
        return getattr(inner, name)


def build_bare(ctx: CouplerBuild) -> Any:
    """One island: the solver over the whole model, no coupler."""
    if len(ctx.islands) != 1:
        raise CompositionError(f"a bare solver needs exactly one island, got {[i.name for i in ctx.islands]}")
    island = ctx.islands[0]
    # A bare island owns the whole model, so its particles are the model's --
    # its own index list is empty when it came from the entity-free path.
    particles = bool(island.particles.size) or (not island.nodes and int(ctx.model.particle_count) > 0)
    return build_solver(island.backend, ctx.model, has_particles=particles)


def build_coupled(ctx: CouplerBuild) -> Any:
    """The solver for the islands: bare for one, the arrangement's coupler for more."""
    if len(ctx.islands) == 1:
        return build_bare(ctx)
    method = ctx.spec.method
    if method not in COUPLER_BUILDERS:
        raise CompositionError(f"no builder for coupler {method!r}; registered: {COUPLER_BUILDERS.names()}")
    return COUPLER_BUILDERS[method](ctx)


register_coupler_builder("proxy", build_proxy)
register_coupler_builder("admm", build_admm)
register_coupler_builder("one_way", build_one_way)
````

## robosimstudio/scene/physics/compose.py

````text
# SPDX-License-Identifier: Apache-2.0
"""The composer: from bound entities and an arrangement to a steppable program.

:func:`compose` runs once per compile, after every entity is bound and before
the substep loop exists:

1. the **interaction graph** -- what is there, what it owns, what it touches;
2. the **islands** -- one solver per distinct backend, the robot's first;
3. the **channels** -- for every two-way or one-way contact between a rigid
   island and a deformable one, the rigid bodies that must be proxied: the
   hands for a ``hands`` rule, the whole object for an ``objects`` one;
4. the **routing** -- which shape pairs each pipeline detects, once;
5. the **solver** -- bare, proxy-coupled or ADMM-coupled, with its pipelines;
6. the **schedule** -- the mirror stage for maximal-coordinate islands, and the
   slots entities contribute their kernels to;
7. the **manifest** -- all of the above as data.

What comes back is a :class:`PhysicsProgram`, which the compiler hands to the
pipeline and to every entity that needs to ask which solver owns it.
"""

from __future__ import annotations

import dataclasses
import warnings
from dataclasses import dataclass, field
from typing import Any

import newton
import numpy as np
import warp as wp

from robosimstudio.core.schedule import Schedule, Stage, SubstepHooks
from robosimstudio.specs.params import REBUILD, RECAPTURE
from robosimstudio.specs.physics import (
    ArrangementSpec,
    ChannelRecord,
    HostActor,
    IslandRecord,
    PhysicsManifest,
    actor_consumes,
    get_backend,
    get_coupler,
    get_domain,
)

from .backends import effective_backend, resolve_backend_class
from .couplers import Channel, CouplerBuild, SolverCosim, build_coupled
from .errors import CompositionError, MaterialLossWarning
from .interactions import InteractionGraph, build_graph
from .islands import Island, partition
from .routing import Routing, route
from .world import REPLICATED_HOSTS, expand_indices, expand_shapes

__all__ = ["Channel", "CompositionError", "Island", "PhysicsProgram", "compose"]


@dataclass
class PhysicsProgram:
    """Everything the composer built, and how to drive it.

    Attributes:
        model: The model being stepped.
        arrangement: What it was built from.
        graph: The interaction graph.
        islands: The solver islands, in stepping order.
        channels: The coupling channels.
        routing: The pair lists.
        solver: The one solver the pipeline steps -- bare or coupled.
        collision: The main collision pipeline, or ``None``.
        contacts: Its contact buffer, or ``None``.
        schedule: The substep program entities append to.
        hooks: The phase lists over :attr:`schedule`, for entities.
        manifest: All of it as data.
        worlds: The world map when replicated.
    """

    model: newton.Model
    arrangement: ArrangementSpec
    graph: InteractionGraph
    islands: list[Island]
    channels: list[Channel]
    routing: Routing
    solver: Any
    collision: Any
    contacts: Any
    schedule: Schedule
    hooks: SubstepHooks
    manifest: PhysicsManifest
    worlds: Any = None
    warnings: list[str] = field(default_factory=list)

    # ---------------------------------------------------------------- lookup
    @property
    def coupled(self) -> bool:
        return len(self.islands) > 1

    @property
    def collide_every(self) -> int:
        return int(self.arrangement.collision.collide_every)

    def island_of(self, name: str) -> Island:
        for island in self.islands:
            if island.owns(name):
                return island
        raise KeyError(f"no island owns entity {name!r}; islands: {[(i.name, i.entities) for i in self.islands]}")

    def island(self, name: str) -> Island:
        for island in self.islands:
            if island.name == name:
                return island
        raise KeyError(f"no island {name!r}; has {[i.name for i in self.islands]}")

    def solver_for(self, name: str) -> Any:
        """The solver stepping entity ``name``: the entry's when coupled, the bare one otherwise."""
        island = self.island_of(name)
        if not self.coupled:
            return self.solver
        return self.solver.solver(island.name)

    def solver_of_island(self, name: str) -> Any:
        return self.solver.solver(name) if self.coupled else self.solver

    def view_for(self, name: str) -> Any:
        """The model view entity ``name`` is solved in (the model itself when bare)."""
        if not self.coupled:
            return self.model
        return self.solver.view(self.island_of(name).name)

    def solvers(self) -> dict[str, Any]:
        if not self.coupled:
            return {self.islands[0].name: self.solver}
        return {island.name: self.solver.solver(island.name) for island in self.islands}

    @property
    def mujoco_solver(self) -> Any | None:
        """The MuJoCo solver, bare or inside the coupler, for a contact probe. ``None`` when there is none."""
        for island in self.islands:
            if island.backend.solver == "mujoco":
                return self.solver_of_island(island.name)
        return None

    # --------------------------------------------------------------- control
    @property
    def hosts(self) -> dict[str, Any]:
        """The host-engine solvers by island name; empty when there are none.

        The seam through which a foreign engine's *own* state is driven —
        attached to the pipeline before anything settles, told to record its
        rest once everything has, and restored on reset. None of that can be an
        entity's job: an entity owns the particle arrays, and a foreign engine's
        rest is its own state, which no entity can snapshot for it. The soft
        domain did it anyway while it was the only host engine, and a cloth
        routed to that same engine silently got none of it.
        """
        return dict(getattr(self.solver, "hosts", {}) or {})

    def notify(self, flags: int) -> None:
        """Tell every solver that part of the model changed."""
        if not flags:
            return
        self.solver.notify_model_changed(int(flags))

    def reset(self, state: newton.State, *, flags: Any = None, world_mask: Any = None) -> None:
        """Reset every solver's internal buffers (warm starts, contact anchors)."""
        reset = getattr(self.solver, "reset", None)
        if reset is None:
            return
        try:
            if flags is None:
                reset(state, world_mask=world_mask)
            else:
                reset(state, world_mask=world_mask, flags=flags)
        except TypeError:
            reset(state)

    def apply(self, path: str, value: Any) -> str:
        """Apply one parameter change to the running program, returning its tier.

        Args:
            path: ``"backend:<island or domain>:<param>"`` or ``"coupling:<param>"``.
            value: The new value.

        Returns:
            The tier the change cost: ``"live"``, ``"recapture"`` or
            ``"rebuild"`` (meaning nothing was applied; the scene must be
            recompiled with the new spec).
        """
        kind, _, rest = path.partition(":")
        if kind == "coupling":
            info = get_coupler(self.arrangement.coupling.method)
            param = rest
            schema = info.schema or {}
            rule = schema.get(param)
            if rule is None or rule.apply == "rebuild":
                return REBUILD
            if rule.apply == "custom:proxy_mass_scale":
                return self._apply_proxy_mass_scale(float(value))
            return REBUILD
        if kind == "backend":
            target, _, param = rest.partition(":")
            island = next((i for i in self.islands if i.name == target or target in i.domains), None)
            if island is None:
                raise KeyError(f"no island or domain {target!r}")
            info = get_backend(island.backend.solver)
            rule = (info.schema or {}).get(param)
            if rule is None or rule.apply == "rebuild":
                return REBUILD
            solver = self.solver_of_island(island.name)
            if rule.apply.startswith("attr:"):
                setattr(solver, rule.apply.split(":", 1)[1], value)
                return rule.ui.tier
            if rule.apply == "custom:mujoco_opt":
                opt = getattr(getattr(solver, "mjw_model", None), "opt", None)
                if opt is None or not hasattr(opt, param):
                    return REBUILD
                setattr(opt, param, type(getattr(opt, param))(value))
                return RECAPTURE
            return REBUILD
        raise KeyError(f"unknown parameter path {path!r}")

    def _apply_proxy_mass_scale(self, value: float) -> str:
        mappings = getattr(self.solver, "_proxy_mappings", None)
        refresh = getattr(self.solver, "_apply_proxy_effective_masses", None)
        if not mappings or refresh is None:
            return REBUILD
        for mapping in mappings:
            if mapping.mass_scale > 1.0e5:
                continue  # a one-way proxy keeps its own scale
            mapping.mass_scale = float(value)
        refresh()
        return RECAPTURE

    # -------------------------------------------------------------- problems
    def problems(self) -> list[str]:
        """What the composition could not honour -- unrouted contacts, unresolved roles."""
        return [*self.graph.unresolved, *self.routing.unrouted, *self.warnings]

    def summary(self) -> str:
        lines = [f"physics: {self.manifest.coupler} over {len(self.islands)} island(s)"]
        for island in self.islands:
            lines.append(
                f"  island {island.name}: {island.backend.solver} x{island.backend.substeps} -> "
                f"{list(island.entities)} ({island.bodies.size} bodies, {island.joints.size} joints, "
                f"{island.particles.size} particles, {island.shapes.size or 'derived'} shapes)"
            )
        for channel in self.channels:
            pairs = "view pairs" if channel.pairs is None else f"{len(channel.pairs)} pairs"
            lines.append(
                f"  channel {channel.source} -> {channel.destination}: {channel.bodies.size} bodies "
                f"({channel.coupling}, {pairs}) from {list(channel.entities)}"
            )
        if self.routing.main_pairs is not None:
            lines.append(f"  main pipeline: {len(self.routing.main_pairs)} pairs")
        for problem in self.problems():
            lines.append(f"  ! {problem}")
        return "\n".join(lines)


def _channels(graph: InteractionGraph, islands: list[Island], worlds, model: newton.Model) -> list[Channel]:
    """Proxy channels: for every cross-island edge, the rigid side's bodies into the deformable side."""
    by_entity = {node.name: next((i for i in islands if i.owns(node.name)), None) for node in graph.nodes.values()}
    gathered: dict[tuple[str, str, str], dict[str, Any]] = {}
    for edge in graph.edges:
        a, b = graph.nodes[edge.a], graph.nodes[edge.b]
        ia, ib = by_entity[a.name], by_entity[b.name]
        if ia is None or ib is None or ia is ib:
            continue
        # The deformable island is the destination; the other island's bodies are proxied.
        if ia.is_deformable and not ib.is_deformable:
            dest, src, src_node, hands_only = ia, ib, b, edge.hands_only
        elif ib.is_deformable and not ia.is_deformable:
            dest, src, src_node, hands_only = ib, ia, a, edge.hands_only and False
            hands_only = edge.hands_only
        else:
            continue  # two rigid islands or two deformable ones: ADMM's business, or unrouted
        bodies = src_node.hand_bodies if hands_only else src_node.bodies
        if bodies.size == 0:
            continue
        key = (src.name, dest.name, edge.coupling)
        slot = gathered.setdefault(key, {"bodies": [], "entities": set()})
        slot["bodies"].append(bodies)
        slot["entities"].add(src_node.name)

    shape_body = model.shape_body.numpy() if model.shape_count else np.zeros(0, np.int32)
    joint_child = model.joint_child.numpy() if model.joint_count else np.zeros(0, np.int32)
    out: list[Channel] = []
    for (src, dest, coupling), slot in gathered.items():
        bodies = np.unique(np.concatenate(slot["bodies"])).astype(np.int32)
        if worlds is not None and worlds.num_worlds > 1:
            bodies = expand_indices(bodies, worlds.bodies_per_world, worlds.num_worlds)
        shapes = np.flatnonzero(np.isin(shape_body, bodies)).astype(np.int32)
        joints = (
            np.flatnonzero(np.isin(joint_child, bodies)).astype(np.int32) if joint_child.size else np.zeros(0, np.int32)
        )
        out.append(
            Channel(
                source=src,
                destination=dest,
                bodies=bodies,
                shapes=shapes,
                joints=joints,
                coupling=coupling,
                entities=tuple(sorted(slot["entities"])),
            )
        )
    # A one-way and a two-way channel to the same destination are both allowed:
    # Newton takes one Proxy per mapping and the mass scales differ.
    out.sort(key=lambda c: (c.source, c.destination, c.coupling != "two_way"))
    return out


def _host_recipe(
    island: Island,
    host_channels: list[Channel],
    graph: InteractionGraph,
    model: newton.Model,
    arrangement: ArrangementSpec,
    worlds=None,
) -> dict:
    """The build recipe for one host-engine island, as plain JSON-able data.

    Everything a foreign engine needs beyond the model's own arrays: gravity,
    one actor record per owned entity (its contiguous particle range plus
    whatever the entity declares through ``host_actor``), and
    one mirror record per Newton shape the island's contact rules reach --
    channel shapes with the channel's coupling, static and world-fixed shapes
    as fixed boundary. Recorded verbatim into the manifest, which is how a
    repro bundle rebuilds the same foreign scene with the model and the
    manifest alone.

    **Replicated, every record carries the world it belongs to.** A foreign
    engine builds one scene from the whole model and has no world axis to pair
    contacts within, so the records alone are not enough: sixteen sponges and
    sixteen grippers at the same coordinates would be one pile colliding with
    itself. ``world`` is what lets the engine put each world somewhere of its
    own -- see :class:`~robosimstudio.engines.superdex.bridge.SuperdexBridge`,
    which adds a per-world translation on the way in and takes it off on the way
    out.

    Args:
        worlds: The stride map when the model is replicated, or ``None``. With
            it, one actor record per entity *per world*, and one mirror record
            per shape per world -- including a world-fixed shape, which is one
            shape in Newton and has to become one collider per world here
            because each world's copy sits at a different place in the host
            scene.
    """
    replicated = worlds is not None and worlds.num_worlds > 1
    world_count = int(worlds.num_worlds) if replicated else 1

    def spread(shapes) -> np.ndarray:
        """Template shape indices as every world's copy of them."""
        if not replicated:
            return np.asarray(shapes, dtype=np.int32)
        return expand_shapes(shapes, worlds.shapes_per_world, worlds.num_worlds, model.shape_count)

    def world_of(shape: int) -> int | None:
        """Which world a replicated shape index belongs to, or ``None`` if global.

        ``None`` is a shape that sits past every world's block -- added to the
        model after replication -- and is therefore one piece of geometry every
        world shares. Shared in Newton, where the worlds are superimposed; not
        shareable here, where they are not.
        """
        if not replicated:
            return 0
        limit = worlds.shapes_per_world * worlds.num_worlds
        return int(shape) // worlds.shapes_per_world if int(shape) < limit else None

    actors: list[dict] = []
    tet_rows = model.tet_indices.numpy().reshape(-1, 4) if model.tet_count else np.zeros((0, 4), np.int64)
    for node in island.nodes:
        particles = np.asarray(node.particles, dtype=np.int64)
        if particles.size == 0:
            continue
        start, count = int(particles.min()), int(particles.size)
        if not np.array_equal(particles, np.arange(start, start + count)):
            raise CompositionError(
                f"host island {island.name!r}: entity {node.name!r} owns a non-contiguous particle range, "
                "which a host actor cannot address as one block"
            )
        declare = getattr(node.entity, "host_actor", None)
        declared = declare() if callable(declare) else None
        if declared is None:
            # The entity said nothing, so the model says it instead: tetrahedra
            # are a volumetric body, triangles alone are a shell. Stated in
            # state-shape terms, never domain names, which the composer must not
            # know -- and kept as the default so an entity that declares nothing
            # is composed exactly as it was before a declaration existed. It can
            # only ever answer "tet or shell"; anything else has to be declared.
            owns_tets = bool(tet_rows.size) and bool(
                ((tet_rows.min(axis=1) >= start) & (tet_rows.max(axis=1) < start + count)).any()
            )
            declared = HostActor(kind="tet" if owns_tets else "shell")
        _warn_lost_material(node, declared, island)
        # The template's range, offset into each world's block. A replicated
        # model holds ``W`` copies of this entity's particles at that stride, and
        # an engine that built one actor from the first block would step one
        # world's sponge and leave the rest of the wave holding a rest pose.
        per_world = int(worlds.particles_per_world) if replicated else 0
        for world in range(world_count):
            record = declared.record(
                name=node.name if world_count == 1 else f"{node.name}#w{world}",
                particle_start=start + world * per_world,
                particle_count=count,
            )
            record["world"] = world
            record["entity"] = node.name
            actors.append(record)

    shape_body = model.shape_body.numpy() if model.shape_count else np.zeros(0, np.int32)
    shape_flags = model.shape_flags.numpy() if model.shape_count else np.zeros(0, np.int32)
    mirrors: list[dict] = []
    seen: set[tuple[int, int]] = set()

    def add_mirror(shape: int, *, two_way: bool, world: int | None = None) -> None:
        if world is None:
            world = world_of(shape)
        if world is None:
            # A shape past every world's block: one piece of geometry in Newton,
            # shared because the worlds are superimposed. Here they are not, so
            # every world needs its own collider cut from the same shape.
            for each in range(world_count):
                add_mirror(shape, two_way=two_way, world=each)
            return
        if (shape, world) in seen:
            return
        seen.add((shape, world))
        # Only geometry the Newton world itself would collide. A body's shape
        # list also carries sites and visual meshes -- a Panda hand brings a
        # grip-site marker sphere and three axis cylinders, one of them twenty
        # metres long -- and Newton's own pipelines skip them by this flag.
        # Mirrored, they are phantom colliders: the foam gets pressed by
        # markers no render draws, which measures as force and looks like
        # penetration.
        if not int(shape_flags[shape]) & int(newton.ShapeFlags.COLLIDE_SHAPES):
            return
        mirrors.append(
            {
                "shape": int(shape),
                "body": int(shape_body[shape]),
                "two_way": bool(two_way),
                "world": int(world),
            }
        )

    for channel in host_channels:
        if channel.destination != island.name:
            continue
        for shape in channel.shapes:
            add_mirror(int(shape), two_way=channel.coupling == "two_way")

    # Statics the contact rules reach, and the world-fixed shapes the compiler
    # adds after every entity (the ground plane) -- the same set a Newton
    # deformable island is given, mirrored as fixed boundary instead.
    hosted = set(island.entities)
    for edge in graph.edges:
        if (edge.a in hosted) == (edge.b in hosted):
            continue
        other = graph.nodes[edge.b if edge.a in hosted else edge.a]
        if get_domain(other.domain).world_fixed:
            for shape in spread(other.shapes):
                add_mirror(int(shape), two_way=False)
    if model.shape_count:
        for shape in np.flatnonzero(shape_body < 0):
            add_mirror(int(shape), two_way=False)

    # Lists, not tuples, so the record IS its own JSON round trip.
    return {
        "island": island.name,
        "gravity": [0.0, 0.0, float(arrangement.gravity)],
        "control_hz": float(arrangement.control_hz),
        "num_worlds": world_count,
        "actors": actors,
        "mirrors": mirrors,
    }


def _warn_lost_material(node: Any, declared: HostActor, island: Any) -> None:
    """Say, once per actor, what this engine will never read.

    Two sides of one seam. **Engine side**: the backend declared ``consumes``
    and the actor states a parameter outside it -- Genesis reads five keys and a
    cloth's ``friction``, ``particle_radius`` and ``self_contact`` are not among
    them. **Entity side**: the spec's material states a field away from its
    default that never appears in the actor at all -- every shipped fabric
    states ``tri_ke`` and ``edge_ke``, none states ``shell_young``, and so
    packing tape and bath towelling reached both foreign engines at the same
    ``E = 1e5``. Measured; nothing said so; this says so.
    """
    engine = island.backend.solver
    info = get_backend(engine)
    # The kind's own builder first -- a shell builder never reads ``friction``,
    # and only it can say so -- the engine-wide declaration as the fallback.
    consumes = actor_consumes(engine, declared.kind) or info.consumes
    if consumes:
        unread = sorted(set(declared.params) - set(consumes))
        if unread:
            warnings.warn(
                f"{node.name!r}: {engine}'s {declared.kind} builder does not read {unread} of the parameters "
                f"its actor states (it reads {sorted(consumes)}), so those have no effect on this engine.",
                MaterialLossWarning,
                stacklevel=3,
            )
    material = getattr(getattr(node.entity, "spec", None), "material", None)
    if material is None or not dataclasses.is_dataclass(material):
        return
    default = type(material)()
    stated = [f.name for f in dataclasses.fields(material) if getattr(material, f.name) != getattr(default, f.name)]
    # Fields that travel some other way than the actor's params -- a tet body's
    # Young and Poisson go into ``model.tet_materials`` and the bridge inverts
    # them back out -- are not lost, and saying so sends a reader hunting for a
    # bug in a modulus that is in fact applied.
    carried = set(getattr(type(material), "via_model", ()))
    lost = [name for name in stated if name not in declared.params and name not in carried]
    if not lost:
        return
    unset = [f.name for f in dataclasses.fields(material) if getattr(material, f.name) is None]
    hint = f" Knobs this material offers and leaves unset: {unset}." if unset else ""
    warnings.warn(
        f"{node.name!r}: {len(lost)} stated material field(s) never reach {engine}: {lost}. "
        f"What the engine is handed: {sorted(declared.params)}.{hint}",
        MaterialLossWarning,
        stacklevel=3,
    )


def compose(
    model: newton.Model,
    parts: dict[str, Any],
    embodiment: Any | None,
    arrangement: ArrangementSpec,
    *,
    scene_statics=(),
    worlds=None,
    verbose: bool = False,
) -> PhysicsProgram:
    """Compose the solvers for a bound scene.

    Args:
        model: The model the solvers step -- the replicated one for a fleet.
        parts: Every built entity by name (statics, objects, deformables, extras).
        embodiment: The robot's entity, or ``None``.
        arrangement: The staged arrangement.
        scene_statics: Names of the cell's own statics (they play ``surface``).
        worlds: The world map when replicated; entities are bound to the template.
        verbose: Print the summary.

    Raises:
        CompositionError: When the arrangement cannot honour the declarations.
    """
    index_model = model
    graph = build_graph(index_model, parts, embodiment, arrangement, scene_statics=scene_statics)
    islands = partition(graph, arrangement, model, worlds=worlds)
    channels = _channels(graph, islands, worlds, model)

    # Host-engine islands leave the Newton story here. Their channels become
    # the foreign scene's kinematic mirror lists, their edges are hidden from
    # the routing (a pair a foreign engine detects is not a pair any Newton
    # pipeline may also detect -- and a deformable x host edge is a declared
    # limitation, not an unrouted one), and every predicate below -- the
    # coupler check, one_way, the explicit broad phase, the manifest's coupler
    # -- is computed over the Newton islands that remain.
    host_islands = [i for i in islands if i.is_host_engine]
    newton_islands = [i for i in islands if not i.is_host_engine]
    host_names = {i.name for i in host_islands}
    hosted_entities = {n.name for i in host_islands for n in i.nodes}
    host_channels = [c for c in channels if c.destination in host_names]
    channels = [c for c in channels if c.destination not in host_names and c.source not in host_names]
    if host_islands and worlds is not None and worlds.num_worlds > 1:
        # Refused by *engine*, not by the fact of being hosted. A foreign engine
        # builds one scene from the whole model and has no world axis to pair
        # contacts within, so the worlds have to be laid out somewhere of their
        # own inside it -- which is a property of the bridge and is what
        # ``REPLICATED_HOSTS`` asserts about the ones that do it.
        unready = sorted({i.backend.solver for i in host_islands if i.backend.solver not in REPLICATED_HOSTS})
        if unready:
            raise CompositionError(
                f"host-engine islands do not replicate: {unready} cannot be built at "
                f"{worlds.num_worlds} worlds. Their bridge would put every world's actors at the same "
                "coordinates in one scene, where they would collide with each other. Run single-world, "
                "or stage a Newton backend for those domains."
            )

    if len(newton_islands) > 1:
        try:
            get_coupler(arrangement.coupling.method)
        except KeyError as exc:
            raise CompositionError(str(exc)) from exc

    world_shapes = (
        np.flatnonzero(model.shape_body.numpy() < 0).astype(np.int32) if model.shape_count else np.zeros(0, np.int32)
    )
    route_graph = graph
    if host_islands:
        route_graph = InteractionGraph(
            nodes=graph.nodes,
            edges=[e for e in graph.edges if e.a not in hosted_entities and e.b not in hosted_entities],
            self_contact=graph.self_contact,
            unresolved=graph.unresolved,
        )
    routing = route(route_graph, newton_islands, channels, model, world_shapes=world_shapes, worlds=worlds)
    for channel in channels:
        channel.pairs = routing.channel_pairs.get((channel.source, channel.destination))

    collision = None
    contacts = None
    spec = arrangement.collision
    one_way = len(newton_islands) > 1 and arrangement.coupling.method == "one_way"
    if one_way:
        # The one-way coupler collides between its two solves, on the poses the
        # rigid solver has just produced, so it owns the pipeline: an executor
        # colliding before the solve would hand the deformable last substep's arm.
        routing.main_pairs = None
    if routing.main_pairs is not None:
        kwargs: dict[str, Any] = {
            "soft_contact_margin": float(spec.soft_contact_margin),
            "enable_rigid_soft_full_surface_contact": bool(spec.full_surface_contact),
            "contact_matching": spec.contact_matching,
        }
        if spec.rigid_contact_max > 0:
            model.rigid_contact_max = int(spec.rigid_contact_max)
            kwargs["rigid_contact_max"] = int(spec.rigid_contact_max)
        if spec.broad_phase == "explicit" and len(newton_islands) > 1:
            # An explicit list is exact and honours the builder's filters (it was
            # cut from the model's own table). A lone island keeps Newton's own
            # broad phase over the full table, which is the same set.
            kwargs["broad_phase"] = "explicit"
            if len(routing.main_pairs):
                kwargs["shape_pairs_filtered"] = wp.array(routing.main_pairs, dtype=wp.vec2i, device=model.device)
        elif spec.broad_phase != "explicit":
            kwargs["broad_phase"] = spec.broad_phase
        collision = newton.CollisionPipeline(model, **kwargs)
        contacts = collision.contacts()

    newton_solver = None
    if newton_islands:
        ctx = CouplerBuild(
            model=model,
            arrangement=arrangement,
            islands=newton_islands,
            channels=channels,
            spec=arrangement.coupling,
            collision=spec,
        )
        newton_solver = build_coupled(ctx)
        if one_way:
            contacts = newton_solver.contacts
    host_solvers: dict[str, Any] = {}
    host_recipes: dict[str, dict] = {}
    for island in host_islands:
        recipe = _host_recipe(island, host_channels, graph, model, arrangement, worlds=worlds)
        host_recipes[island.name] = recipe
        cls = resolve_backend_class(island.backend)
        params = effective_backend(island.backend, has_particles=True).kwargs()
        host_solvers[island.name] = cls(model, recipe=recipe, substeps=int(island.backend.substeps), **params)
    solver = SolverCosim(model, newton_solver, host_solvers) if host_solvers else newton_solver
    prepare = getattr(solver, "prepare_contacts", None)
    if prepare is not None and contacts is not None:
        prepare(contacts)

    schedule = Schedule()
    hooks = SubstepHooks(schedule)
    coupled = len(islands) > 1 or bool(host_solvers)
    entry_states = hasattr(solver, "entry_state")
    # ``solver(name)`` is the coupled solvers' accessor; a coupler kind a task
    # registered need not offer one, and a bare solver has nothing to look up.
    lookup = getattr(solver, "solver", None) if coupled else None
    for island in islands:
        inner = lookup(island.name) if callable(lookup) else (None if coupled else solver)
        if inner is None:
            continue
        if getattr(inner, "particle_enable_self_contact", False) and hasattr(inner, "rebuild_bvh"):
            # Once per control step, outside the graph: rebuilding a BVH
            # reallocates, which a replay cannot do. On the entry's own state
            # when the coupler keeps one -- the detector was built over the
            # view's particles -- and on the shared state otherwise.
            def rebuild(state, dt, _inner=inner, _name=island.name, _views=entry_states) -> None:
                del dt
                _inner.rebuild_bvh(solver.entry_state(_name) if _views else state)

            schedule.add(Stage(name=f"rebuild_bvh:{island.name}", fn=rebuild, phase="before"))
    for name, host in host_solvers.items():
        # The co-simulation tick: eager, once per control step, after the
        # substeps and before the batched read-back -- ``after`` rather than
        # ``before`` because VBD's velocity write-back is not gated on the
        # particle flags and would zero a foreign island's ``particle_qd``
        # between an earlier write and the snapshot.
        schedule.add(
            Stage(
                name=f"cosim:{name}",
                fn=host.host_tick,
                phase="after",
                reads=frozenset({"body_q"}),
                writes=frozenset({"particle_q", "particle_qd"}),
            )
        )
        force_stage = getattr(host, "rigid_force_stage", None)
        if callable(force_stage):
            # Wrench feedback: a device kernel every substep, inside the graph,
            # reading the persistent array the tick rewrote outside it.
            schedule.add(
                Stage(name=f"cosim_force:{name}", fn=force_stage, phase="rigid_force", writes=frozenset({"body_f"}))
            )
    mirror = any(island.maximal_coordinates for island in islands)
    if mirror:

        def recover(state, dt, _model=model) -> None:
            del dt
            newton.eval_ik(_model, state, state.joint_q, state.joint_qd)

        schedule.add(
            Stage(
                name="mirror_joint_ik",
                fn=recover,
                phase="mirror",
                reads=frozenset({"body_q"}),
                writes=frozenset({"joint_q", "joint_qd"}),
            )
        )

    if one_way:
        # The one-way coupler mirrors nothing: the deformable simply collides
        # against the poses the rigid solver produced. Dropping the channels
        # keeps the program honest about what was built.
        channels = []
    manifest = PhysicsManifest(
        arrangement=arrangement,
        islands=tuple(
            IslandRecord(
                name=i.name,
                backend=effective_backend(i.backend, has_particles=bool(i.particles.size)),
                # A host island records its backend *alias*, never a class
                # path: a repro bundle may not name the exporting project, and
                # the bundle runner keeps a self-contained twin per alias.
                solver_class=i.backend.solver if i.is_host_engine else i.solver_class,
                domains=i.domains,
                entities=i.entities,
                bodies=tuple(int(v) for v in i.bodies),
                joints=tuple(int(v) for v in i.joints),
                particles=tuple(int(v) for v in i.particles),
                shapes=tuple(int(v) for v in i.shapes),
                host_engine=i.is_host_engine,
                host_recipe=host_recipes.get(i.name),
            )
            for i in islands
        ),
        channels=tuple(
            ChannelRecord(
                source=c.source,
                destination=c.destination,
                bodies=tuple(int(v) for v in c.bodies),
                coupling=c.coupling,
                mass_scale=float(
                    arrangement.coupling.get("mass_scale", 1.0)
                    if c.coupling == "two_way"
                    else arrangement.coupling.get("one_way_mass_scale", 1.0e6)
                ),
                mode=str(arrangement.coupling.get("mode", "staggered")),
                collide_interval=int(arrangement.coupling.get("collide_interval", 1)),
                pairs=None if c.pairs is None else tuple((int(a), int(b)) for a, b in c.pairs),
                entities=c.entities,
            )
            for c in channels
        ),
        coupler="none" if len(newton_islands) <= 1 else arrangement.coupling.method,
        main_pairs=None if routing.main_pairs is None else tuple((int(a), int(b)) for a, b in routing.main_pairs),
        world_count=int(worlds.num_worlds) if worlds is not None else 1,
        mirror_joint_ik=mirror,
        stages=schedule.names(),
    )
    program = PhysicsProgram(
        model=model,
        arrangement=arrangement,
        graph=graph,
        islands=islands,
        channels=channels,
        routing=routing,
        solver=solver,
        collision=collision,
        contacts=contacts,
        schedule=schedule,
        hooks=hooks,
        manifest=manifest,
        worlds=worlds,
    )
    hooks.program = program
    if verbose:
        print(program.summary())
    return program
````

## robosimstudio/core/schedule.py

````text
# SPDX-License-Identifier: Apache-2.0
"""The substep program as data, and the executor that captures it.

A :class:`Schedule` is an ordered list of :class:`Stage` objects grouped by
*phase*, each a device-side callable ``(state, dt) -> None``. One control period
runs the per-control-step ``before`` phase eagerly, then the captured body --
``substeps`` repetitions of the substep phases in order -- then ``after``. The
:class:`ScheduleExecutor` owns the two states, the control, the CUDA graph and
the counters, and knows nothing about which solver is in the ``solve`` stage:
whoever composed the schedule put one there.

The phases, in order, and what belongs in each:

``before``
    Once per control step, **outside** the graph. Work that reallocates or runs
    on the host: a BVH rebuild, an IK solve whose result a kernel then reads.
``clear``
    ``state.clear_forces()``. Built in.
``rigid_force``
    Adds to ``state.body_f`` before the solve: drag wrenches, a grasp latch.
``pre_solve``
    Adds to ``state.particle_f`` before the solve: adhesion bonds, drag springs.
``collide``
    The main collision pipeline. Built in, with a cadence.
``solve``
    The coupled solver (or the bare one). Built in. The executor swaps the two
    states after it.
``post_solve``
    Kinematic writes onto the state the solve just produced: particle pins,
    handle holds. A position written before the solve is undone by it.
``mirror``
    Derived state: ``eval_ik`` mirroring maximal-coordinate islands back into
    ``joint_q``.
``after``
    Once per control step, after the body: the read-back.

**Capturability is the one rule.** Everything a stage does inside the body must
be a device kernel gated by a *device-side* flag and launched unconditionally.
A host-side ``if`` around a launch works eagerly and then silently does nothing
once captured -- the launch is simply not in the graph. The *set* of stages may
still change after capture -- a teleop panel attaching a dragger, a routine
latching onto a cloth -- and a graph that predates the change would ignore the
new launch. :meth:`ScheduleExecutor.invalidate_graph` therefore drops the graph
and schedules a re-capture on the step after next: one eager step for the new
kernel to compile in (a kernel that compiles *inside* a capture fails it), then
a capture of the current stage set.
"""

from __future__ import annotations

import logging
from collections.abc import Callable, Iterator
from contextlib import contextmanager
from dataclasses import dataclass
from typing import Any

import newton
import warp as wp

from .builder import assert_even_substeps
from .streams import capturing

__all__ = ["HOOK_PHASES", "PHASES", "SUBSTEP_PHASES", "Schedule", "ScheduleExecutor", "Stage", "SubstepHooks"]

_log = logging.getLogger(__name__)
"""Where a failed capture's traceback goes: the one-line reason is printed, the
stack is there for whoever turns ``logging`` up."""

Hook = Callable[[newton.State, float], None]
"""A stage body: ``(state, dt) -> None``, launching device kernels only."""

_PHASE_TABLE: tuple[tuple[str, bool, bool], ...] = (
    # phase, runs inside a substep, an entity may hook it
    ("before", False, True),
    ("clear", True, False),
    ("rigid_force", True, True),
    ("pre_solve", True, True),
    ("collide", True, False),
    ("solve", True, False),
    ("post_solve", True, True),
    ("mirror", True, True),
    ("after", False, True),
)
"""Every phase, in execution order, with the two facts that separate the three views of it.

One table, because there were three tuples -- nine phases, the seven inside a
substep, the six an entity may append to -- each written out by hand, and an
entity author writing ``contribute_hooks`` had to work out which was which and
why ``clear`` was in one and not another. The columns say why: ``before`` and
``after`` bracket the control step rather than running per substep, and
``clear``, ``collide`` and ``solve`` are the executor's own -- the module
docstring says "Built in" beside each -- so a stage may not be appended there.
"""

PHASES = tuple(name for name, _, _ in _PHASE_TABLE)
"""Every phase, in execution order."""

SUBSTEP_PHASES = tuple(name for name, in_substep, _ in _PHASE_TABLE if in_substep)
"""The phases inside one substep, in order. ``solve`` is followed by the state swap."""

HOOK_PHASES = tuple(name for name, _, hookable in _PHASE_TABLE if hookable)
"""The phases an entity may append a hook to: :data:`PHASES` less the built-in ones.

What :class:`SubstepHooks` exposes as a list per phase. ``clear``, ``collide``
and ``solve`` are absent because the executor runs them itself.
"""


@dataclass
class Stage:
    """One unit of device work in the substep program.

    Attributes:
        name: For the manifest and for a reader of a profile.
        fn: The work, ``(state, dt) -> None``.
        phase: One of :data:`PHASES`.
        cadence: Run every this many substeps (or control steps, for ``before``
            and ``after``). 1 is every time.
        reads: What model or state arrays it reads, by name. Read by the
            executor to decide whether the eager ``after`` phase has to wait on
            the device before it runs.
        writes: What it writes.
    """

    name: str
    fn: Hook
    phase: str = "post_solve"
    cadence: int = 1
    reads: frozenset[str] = frozenset()
    writes: frozenset[str] = frozenset()

    def __post_init__(self) -> None:
        if self.phase not in PHASES:
            raise ValueError(f"stage {self.name!r}: phase must be one of {PHASES}, got {self.phase!r}")
        if int(self.cadence) < 1:
            raise ValueError(f"stage {self.name!r}: cadence must be >= 1, got {self.cadence}")


class Schedule:
    """Stages by phase. Mutable up to capture; appending afterwards needs an invalidation."""

    def __init__(self) -> None:
        self.phases: dict[str, list[Stage]] = {phase: [] for phase in PHASES}

    def add(self, stage: Stage) -> Stage:
        self.phases[stage.phase].append(stage)
        return stage

    def stages(self, phase: str) -> list[Stage]:
        return self.phases[phase]

    def extend(self, other: Schedule) -> None:
        for phase in PHASES:
            self.phases[phase].extend(other.phases[phase])

    def names(self) -> tuple[tuple[str, str], ...]:
        """``(phase, name)`` for every stage, in order -- what the manifest records."""
        return tuple((phase, stage.name) for phase in PHASES for stage in self.phases[phase])

    def __bool__(self) -> bool:
        return any(self.phases[phase] for phase in PHASES)

    def __len__(self) -> int:
        return sum(len(self.phases[phase]) for phase in PHASES)


class SubstepHooks:
    """The phase lists an entity appends its kernels to.

    A view over a :class:`Schedule` that keeps the three names the entities have
    always used -- ``rigid_force``, ``pre_solve``, ``post_solve`` -- as plain
    lists of ``(state, dt)`` callables, and adds ``mirror``, ``before`` and
    ``after``. Appending a callable wraps it in a :class:`Stage` named after it.
    Every list supports ``append``, ``extend``, ``del hooks.post_solve[n:]`` and
    iteration, which is what the env's hook-lifetime bookkeeping relies on.

    Args:
        schedule: The schedule to write into. A fresh one when omitted.
        program: Whatever composed the physics, for an entity that needs to ask
            which solver owns it. ``None`` until composition binds it.
    """

    PHASES = HOOK_PHASES
    """The phases with a list on this object: :data:`HOOK_PHASES`, kept under the name readers use."""

    def __init__(self, schedule: Schedule | None = None, program: Any = None) -> None:
        self.schedule = schedule if schedule is not None else Schedule()
        self.program = program
        for phase in self.PHASES:
            setattr(self, phase, _PhaseList(self.schedule, phase))

    def extend(self, other: SubstepHooks) -> None:
        """Append every hook of ``other``, preserving contribution order."""
        for phase in self.PHASES:
            getattr(self, phase).extend(list(getattr(other, phase)))

    def add(self, phase: str, fn: Hook, *, name: str = "", cadence: int = 1) -> Stage:
        """Add a stage to any phase, with a cadence."""
        return self.schedule.add(Stage(name=name or _hook_name(fn), fn=fn, phase=phase, cadence=cadence))

    def __bool__(self) -> bool:
        return any(len(getattr(self, phase)) for phase in self.PHASES)


def _hook_name(fn: Any) -> str:
    owner = getattr(fn, "__self__", None)
    if owner is not None:
        return f"{type(owner).__name__}.{getattr(fn, '__name__', 'hook')}"
    return getattr(fn, "__qualname__", getattr(fn, "__name__", repr(fn)))


class _PhaseList:
    """A list-shaped view of one phase of a schedule, holding the callables."""

    def __init__(self, schedule: Schedule, phase: str) -> None:
        self._schedule = schedule
        self._phase = phase

    @property
    def _stages(self) -> list[Stage]:
        return self._schedule.phases[self._phase]

    def append(self, fn: Hook) -> None:
        self._stages.append(Stage(name=_hook_name(fn), fn=fn, phase=self._phase))

    def extend(self, fns) -> None:
        for fn in fns:
            self.append(fn)

    def __iter__(self) -> Iterator[Hook]:
        return iter([stage.fn for stage in self._stages])

    def __len__(self) -> int:
        return len(self._stages)

    def __getitem__(self, index):
        stages = self._stages[index]
        if isinstance(index, slice):
            return [stage.fn for stage in stages]
        return stages.fn

    def __delitem__(self, index) -> None:
        del self._stages[index]

    def remove(self, fn: Hook) -> None:
        """Drop the first stage running ``fn``, by identity then by equality.

        The studio's direct-manipulation path is what needs this: a click puts a
        dragger's ``apply`` into a phase and letting go takes it out again, and
        it has only the callable to name it by.

        **Equality is what does the work, and identity is the fast path.** A
        bound method is a new object on every attribute access -- ``d.apply is
        d.apply`` is False -- so an identity-only search would never find the
        hook a dragger appended. Equality does find it and finds the right one,
        since bound methods compare by ``__self__`` and ``__func__``: with two
        draggers live, ``d.apply == e.apply`` is False. Identity runs first
        because a plain function or a shared closure is matched by it without
        calling ``__eq__`` at all.

        Raises:
            ValueError: If no stage runs ``fn``, the way ``list.remove`` does. A
                silent miss would leave the hook running and the caller
                believing it had let go.
        """
        for index, stage in enumerate(self._stages):
            if stage.fn is fn:
                del self._stages[index]
                return
        for index, stage in enumerate(self._stages):
            if stage.fn == fn:
                del self._stages[index]
                return
        raise ValueError(f"no {self._phase} stage runs {_hook_name(fn)}")

    def __contains__(self, fn: Hook) -> bool:
        return any(stage.fn is fn or stage.fn == fn for stage in self._stages)

    def __bool__(self) -> bool:
        return bool(self._stages)

    def __repr__(self) -> str:
        return f"{self._phase}={[stage.name for stage in self._stages]}"


class ScheduleExecutor:
    """Runs a :class:`Schedule` over two states, eagerly or as a captured graph.

    Args:
        model: The finalized model.
        schedule: The program. The ``solve`` and ``collide`` stages are what
            the composer put there; this class adds ``clear`` and the swap.
        control_hz: Control rate [Hz]. One :meth:`step` advances 1/control_hz s.
        substeps: Physics substeps per control step. Must be even.
        use_cuda_graph: Whether to attempt capture at all.
        contacts: The main pipeline's contact buffer, or ``None``.
        solver: The solver the built-in ``solve`` step drives, or ``None`` for
            a schedule that supplies its own ``solve`` stages.
        collision: The main collision pipeline, run at the ``collide`` point
            every ``collide_every`` substeps, or ``None``.
        collide_every: The main pipeline's cadence in substeps.
    """

    def __init__(
        self,
        model: newton.Model,
        schedule: Schedule,
        *,
        control_hz: float = 50.0,
        substeps: int = 4,
        use_cuda_graph: bool = True,
        contacts: Any = None,
        solver: Any = None,
        collision: Any = None,
        collide_every: int = 1,
    ) -> None:
        self.model = model
        self.schedule = schedule
        self.device = getattr(model, "device", None)
        self.solver = solver
        """What the built-in ``solve`` step drives: ``solver.step(state_in, state_out, control, contacts, dt)``."""
        self.collision = collision
        """The main collision pipeline the built-in ``collide`` step runs, or ``None``."""
        self.collide_every = max(1, int(collide_every))
        self.control_hz = float(control_hz)
        self.substeps = assert_even_substeps(substeps)
        self.control_dt = 1.0 / self.control_hz
        self.sim_dt = self.control_dt / self.substeps
        self.sim_time = 0.0
        self.step_count = 0

        self.state_0 = model.state()
        self.state_1 = model.state()
        self.control = model.control()
        self.contacts = contacts

        self.use_cuda_graph = bool(use_cuda_graph)
        self._graph: Any | None = None
        self._recapture = False
        self._substep_index = 0
        self.settling = False
        """Inside :meth:`substeps_at` -- a settle, which is scene construction.

        Nothing reads the state per step of a settle, so anything that costs
        something per step and is only there to be read (the batched read-back)
        skips while this is set. Sixty settle steps of a garment is 180 copies
        of twelve thousand particles for an answer nobody asks for."""

        self.capture_error: str = ""
        """The last capture attempt's exception, or empty."""
        self.steps_replayed = 0
        """Control steps that replayed a captured graph."""
        self.steps_eager = 0
        """Control steps that ran the substep block eagerly."""
        self.recapture_failures = 0
        """How many re-capture attempts failed."""

    # ------------------------------------------------------------------ shape
    @property
    def state(self) -> newton.State:
        """The state holding the current frame. Even substeps keep this stable."""
        return self.state_0

    @property
    def captured(self) -> bool:
        return self._graph is not None

    # ---------------------------------------------------------------- running
    def _run_phase(self, phase: str, state: newton.State, index: int, dt: float) -> None:
        stages = self.schedule.phases[phase]
        if not stages:
            return
        for stage in stages:
            if index % stage.cadence == 0:
                stage.fn(state, dt)

    def substep_block(self) -> None:
        """One control period of physics, eagerly. The body of the captured graph."""
        for index in range(self.substeps):
            self._substep_index = index
            self.state_0.clear_forces()
            self.state_1.clear_forces()
            self._run_phase("clear", self.state_0, index, self.sim_dt)
            self._run_phase("rigid_force", self.state_0, index, self.sim_dt)
            self._run_phase("pre_solve", self.state_0, index, self.sim_dt)
            self._run_phase("collide", self.state_0, index, self.sim_dt)
            if self.collision is not None and self.contacts is not None and index % self.collide_every == 0:
                self.collision.collide(self.state_0, self.contacts)
            if self.solver is not None:
                self.solver.step(self.state_0, self.state_1, self.control, self.contacts, self.sim_dt)
            self._run_phase("solve", self.state_0, index, self.sim_dt)
            self.state_0, self.state_1 = self.state_1, self.state_0
            self._run_phase("post_solve", self.state_0, index, self.sim_dt)
            self._run_phase("mirror", self.state_0, index, self.sim_dt)

    def run_before(self) -> None:
        self._run_phase("before", self.state_0, self.step_count, self.control_dt)

    def run_after(self) -> None:
        self._run_phase("after", self.state_0, self.step_count, self.control_dt)

    def _after_reads_the_device(self) -> bool:
        """Whether any ``after`` stage reads state the body has just queued work on.

        ``step`` *enqueues* the substep block and returns; the device has not
        necessarily finished when ``after`` begins. A host-engine tick reads
        ``body_q`` there to drive its mirrors, so it must not begin before the
        substeps that wrote ``body_q`` have landed.

        Today that read happens to be safe by accident: the one shipped host
        bridge reads through ``state.body_q.numpy()``, and a device-to-host copy
        stalls the queue as a side effect. That is not a property to rely on --
        an engine reading device-side, or through torch on its own stream, would
        inherit a silent race whose symptom is a mirror one control step stale
        *sometimes*. So the stall is made explicit here, and paid only where it
        is owed: a stage declares what it ``reads``, and the only shipped
        ``after`` stage that declares anything is the cosim tick. A Newton-only
        scene has an empty ``after`` phase and synchronises nothing. Asked on
        every step rather than once, so a stage added after construction counts.
        """
        return any(stage.reads for stage in self.schedule.phases["after"])

    # ---------------------------------------------------------------- capture
    def warmup_and_capture(self, *, iterations: int = 2, verbose: bool = False) -> bool:
        """Compile the kernels, then capture the substep block if we can.

        Runs real physics, so the caller must restore the scene afterwards.
        Returns whether a graph was captured; ``False`` is the eager path,
        which is a supported way to run and not an error.
        """
        for _ in range(max(0, iterations)):
            self.run_before()
            self.substep_block()
        if not self.model.device.is_cuda or not self.use_cuda_graph:
            wp.synchronize()
            return False
        try:
            with capturing(self.model.device) as capture:
                self.substep_block()
            self._graph = capture.graph
            self.capture_error = ""
        except Exception as exc:
            print(f"[pipeline] CUDA graph capture failed ({type(exc).__name__}: {exc}); running eager")
            _log.debug("CUDA graph capture failed", exc_info=True)
            self.capture_error = f"{type(exc).__name__}: {exc}"
            self._graph = None
        wp.synchronize()
        if verbose:
            print(f"[pipeline] {'captured' if self._graph is not None else 'eager'}, {self.substeps} substeps")
        return self._graph is not None

    @contextmanager
    def substeps_at(self, substeps: int) -> Iterator[None]:
        """Temporarily run at another substep count, eagerly.

        For a settle, which wants a finer timestep than the run does. Any
        captured graph is set aside rather than dropped, and a pending
        re-capture waits until the run's own substep count is back -- a graph
        captured at the settle's count would be the wrong body. If the stages
        change inside the block, the graph set aside is stale and is dropped
        for a re-capture instead. The clock is *not* restored -- a settle is
        scene construction, not simulated time.
        """
        saved_substeps, saved_dt = self.substeps, self.sim_dt
        saved_graph, saved_recapture = self._graph, self._recapture
        self.substeps = assert_even_substeps(substeps)
        self.sim_dt = self.control_dt / self.substeps
        self._graph = None
        self._recapture = False
        self.settling = True
        try:
            yield
        finally:
            self.substeps, self.sim_dt = saved_substeps, saved_dt
            if self._recapture:  # invalidated inside the block
                self._graph = None
            else:
                self._graph, self._recapture = saved_graph, saved_recapture
            self.settling = False

    def invalidate_graph(self, *, recapture: bool = True) -> None:
        """Drop the captured graph after the set of stages changed.

        Args:
            recapture: Re-capture on the next :meth:`step`, once the caller has
                finished adding stages. The alternative is running eager for
                the rest of the session.
        """
        self._graph = None
        self._recapture = bool(recapture)

    def _try_recapture(self) -> None:
        self._recapture = False
        if not self.model.device.is_cuda or not self.use_cuda_graph:
            return
        try:
            with capturing(self.model.device) as capture:
                self.substep_block()
            self._graph = capture.graph
            self.capture_error = ""
        except Exception as exc:
            print(f"[pipeline] re-capture failed ({type(exc).__name__}: {exc}); running eager")
            _log.debug("CUDA graph re-capture failed", exc_info=True)
            self.capture_error = f"{type(exc).__name__}: {exc}"
            self.recapture_failures += 1
            self._graph = None

    # -------------------------------------------------------------------- run
    def step(self) -> None:
        """Advance one control period: ``before`` eagerly, the body, then ``after``."""
        self.run_before()
        if self._graph is not None:
            self.steps_replayed += 1
            wp.capture_launch(self._graph)
        else:
            self.steps_eager += 1
            self.substep_block()
            if self._recapture and not self.settling:
                self._try_recapture()
        if self._after_reads_the_device():
            # The body above only *enqueued* its work; an ``after`` stage that
            # reads what it wrote has to wait for it. See _after_reads_the_device.
            wp.synchronize_device(self.device)
        self.run_after()
        self.sim_time += self.control_dt
        self.step_count += 1

    def sync(self) -> None:
        """Block until the device has finished the work :meth:`step` queued."""
        wp.synchronize()
````

## robosimstudio/core/tuning.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Changing a built model while it runs, for anything that is in one.

Newton keeps a cloth's constitutive parameters as Warp arrays the VBD solver
re-reads on every colour group of every iteration of every substep, so assigning
into one takes effect on the next substep and does so even inside a captured CUDA
graph, because a capture bakes the array's *pointer* and not the numbers behind
it. A rigid body's mass and its shapes' friction are Warp arrays on the same
model, reached the same way.

The difference is who is reading them. VBD reads the cloth arrays directly, so a
write is the whole of the change. A solver that keeps its own model -- MuJoCo
converts Newton's into an ``mjm`` at construction -- reads a *copy*, and a write
that nothing tells it about lands in an array it has stopped consulting. That is
the failure this module exists to not have: a slider that moves, a number that
changes, and a simulation that goes on behaving exactly as before.

Newton's answer is :meth:`~newton.solvers.SolverBase.notify_model_changed`, and
every shipped solver implements it. The flags name the arrays exactly:

* ``SHAPE_PROPERTIES`` -- ``shape_material_mu``, ``shape_material_ke``,
  ``shape_material_kd``, transforms and collision radii;
* ``BODY_INERTIAL_PROPERTIES`` -- ``body_mass``, ``body_inv_mass``,
  ``body_inertia``, ``body_inv_inertia``, ``body_com``;
* ``JOINT_DOF_PROPERTIES`` -- ``joint_target_ke``/``kd``, armature, friction and
  both limits.

So a writer here does two things: assign into the model, and say which category
changed. What the solver does about it is the solver's business, which is the
point -- this file does not know that MuJoCo has an ``mjm``.

**Why these are ``RECAPTURE`` and not ``LIVE``.** The assignment is live by the argument above. The *notification* is
host work: MuJoCo's re-sync launches kernels and, for some flags, flips a Python
flag that changes what the next contact conversion does. A captured graph replays
neither. Under capture the honest thing is to drop the graph and take it again --
which is what :meth:`~robosimstudio.core.pipeline.ScenePipeline.invalidate_graph`
is for, and which is free while the studio runs eager, exactly as it already is
for the cloth contact trio.

**What is not here.** Cloth. ``studio.tuning.apply.LiveMaterial`` already writes
it, is calibrated and is tested, and its per-field mapping onto ``tri_materials``,
``edge_bending_properties`` and ``tet_materials`` is genuinely cloth-specific
rather than a special case of anything. It needs no notification, for the reason
its own docstring gives at length.
"""

from __future__ import annotations

from collections.abc import Iterable, Sequence
from dataclasses import dataclass
from typing import Any, ClassVar

import numpy as np

__all__ = [
    "ArrayWriter",
    "BodyWriter",
    "JointWriter",
    "ShapeWriter",
    "Tunable",
    "notify",
]


@dataclass(frozen=True)
class Tunable:
    """One group of parameters an entity offers, and how a change to it lands.

    What an entity's ``tunables()`` returns, and the reason it is a protocol
    rather than a table: an asset's
    parameters are the asset's, the same way its published states are, and a
    consumer that carries its own list of what may be tuned on what is carrying a
    copy that can disagree.

    Attributes:
        name: Which group this is -- ``"contact"``, ``"mass"``, ``"drive"``,
            ``"material"``. Shown as the section heading.
        spec: A frozen dataclass whose fields carry ``ui()`` descriptions.
            **Read from the built model**, not from the spec the scene was compiled out of: those
            are different numbers whenever an import directive did not survive
            into the model, which is most of the time for a scene-declared body.
        write: ``(field, value) -> did it land``. ``False`` means the field has
            nothing in this entity to write to -- a bending stiffness on a mesh
            with no edges, a joint gain on a body with no joints -- which is
            information a panel can show rather than an error.
        summary: One line, for the section.
    """

    name: str
    spec: Any
    write: Any
    summary: str = ""


def notify(pipeline: Any, flags: int) -> None:
    """Tell the scene's solvers that part of the model changed.

    Every one of them: a coupled arrangement runs several solvers over one
    model, and a shape whose friction moved is a shape any of them may be
    resolving contacts for. The program fans the notification out.

    Drops a captured graph, because the notification is host work a replay does
    not perform -- see the module docstring. Free while eager, which is the
    studio's default and the reason this is affordable at slider rate.

    Args:
        pipeline: The scene's :class:`~robosimstudio.core.pipeline.ScenePipeline`,
            or anything carrying a ``program`` or a ``solver``. ``None`` is a
            no-op, so a writer can be exercised against a bare model in a test.
        flags: A bit-mask of :class:`newton.ModelFlags`.
    """
    if pipeline is None or not flags:
        return
    program = getattr(pipeline, "program", None)
    if program is not None:
        program.notify(int(flags))
    else:
        for solver in (
            getattr(pipeline, "solver", None),
            getattr(pipeline, "solver_rigid", None),
            getattr(pipeline, "solver_cloth", None),
        ):
            if solver is not None:
                solver.notify_model_changed(int(flags))
    if getattr(pipeline, "captured", False):
        pipeline.invalidate_graph()


class ArrayWriter:
    """Assigns into a built model's arrays, through a host copy read fresh per write.

    A write downloads the array, edits this entity's rows and uploads it. The copy
    is not kept between writes: these arrays are model-wide -- every entity's
    shapes share one ``shape_material_mu`` -- so a copy kept by one writer goes
    stale the moment another writer, a script or ``ctl eval`` touches the array,
    and uploading it would put the other rows back the way they were.

    Args:
        model: The finalized model.
        pipeline: The scene's pipeline, for the notification. May be ``None``.
    """

    flags: int = 0
    """Which :class:`newton.ModelFlags` this writer's arrays fall under."""

    def __init__(self, model: Any, pipeline: Any = None) -> None:
        self.model = model
        self.pipeline = pipeline

    # ------------------------------------------------------------------ arrays
    def _fetched(self, attr: str) -> np.ndarray | None:
        """The array as the model holds it now, as a host copy to edit."""
        array = getattr(self.model, attr, None)
        return None if array is None else np.array(array.numpy(), copy=True)

    def _flush(self, attr: str, values: np.ndarray) -> None:
        getattr(self.model, attr).assign(values)

    def _write(self, attr: str, rows: Sequence[int], value: Any, *, column: int | None = None) -> bool:
        """Write one value into ``rows`` of one array. ``False`` if there is nowhere to."""
        index = np.asarray(rows, dtype=np.int64)
        if not len(index):
            return False
        values = self._fetched(attr)
        if values is None or not len(values):
            return False
        if column is None:
            values[index] = value
        else:
            values[index, column] = value
        self._flush(attr, values)
        return True

    def _read(self, attr: str, rows: Sequence[int], *, column: int | None = None, default: float = 0.0) -> Any:
        """One value as the model currently holds it, or ``default``.

        The *first* row's, not a mean: these specs are a view of a set of shapes
        or bodies that a person is about to set to one value, and a mean would
        show a number none of them has. When they disagree the first one is at
        least a number something in the entity actually has.
        """
        index = np.asarray(rows, dtype=np.int64)
        array = getattr(self.model, attr, None)
        if array is None or not len(index):
            return default
        values = self._fetched(attr)
        if values is None or not len(values):
            return default
        row = values[index[0]]
        return float(row if column is None else row[column])

    # ------------------------------------------------------------------ notify
    def landed(self, wrote: bool) -> bool:
        """Notify the solvers if anything was written, and report what happened."""
        if wrote:
            notify(self.pipeline, self.flags)
        return wrote


class ShapeWriter(ArrayWriter):
    """One entity's contact material, over the shapes it built.

    Args:
        model: The finalized model.
        shapes: Shape indices belonging to this entity -- ``EntityRange.shape_indices``.
        pipeline: The scene's pipeline.
    """

    flags = 1 << 4
    """``ModelFlags.SHAPE_PROPERTIES``. Spelled as the bit rather than imported so
    this module costs no newton import at definition time; the value is pinned by
    a test against the enum."""

    FIELDS: ClassVar[dict[str, str]] = {
        "mu": "shape_material_mu",
        "mu_rolling": "shape_material_mu_rolling",
        "mu_torsional": "shape_material_mu_torsional",
        "restitution": "shape_material_restitution",
        "ke": "shape_material_ke",
        "kd": "shape_material_kd",
        "kf": "shape_material_kf",
        "ka": "shape_material_ka",
        "thickness": "shape_thickness",
    }
    """Spec field to model array. The same set ``_MATERIAL_FIELDS`` (``scene/build/colliders.py``)
    copies between shapes, which is the list that already had to be right."""

    def __init__(self, model: Any, shapes: Iterable[int], pipeline: Any = None) -> None:
        super().__init__(model, pipeline)
        self.shapes = np.asarray(list(shapes), dtype=np.int64)

    def read(self) -> dict[str, float]:
        """Every field as the model currently holds it."""
        return {name: self._read(attr, self.shapes) for name, attr in self.FIELDS.items()}

    def __call__(self, field: str, value: Any) -> bool:
        attr = self.FIELDS.get(field)
        if attr is None:
            return False
        return self.landed(self._write(attr, self.shapes, float(value)))


class BodyWriter(ArrayWriter):
    """One entity's mass properties, over the bodies it built.

    **Mass scales inertia with it.** Writing ``body_mass`` alone leaves a body
    that weighs a tenth of what it did and resists rotation exactly as much,
    which is not a lighter object -- it is an object made of a different
    substance in one axis and not the others, and it tumbles wrong. Scaling the
    tensor by the same factor is what "the same shape, less dense" means, and it
    is the assumption stated rather than hidden: a caller wanting a hollow shell
    wants a different tensor, not a smaller number here.

    A massless body -- a static's shell -- stays massless. Its inverse mass is
    what marks it fixed, and quietly giving it one would unweld it from the
    world, which is the failure ``preserve_body_inertia`` (``scene/build/bodies.py``) exists to
    avoid on the other side of the build.
    """

    flags = 1 << 3
    """``ModelFlags.BODY_INERTIAL_PROPERTIES``."""

    def __init__(self, model: Any, bodies: Iterable[int], pipeline: Any = None) -> None:
        super().__init__(model, pipeline)
        self.bodies = np.asarray(list(bodies), dtype=np.int64)

    def read(self) -> dict[str, float]:
        return {"mass": self._read("body_mass", self.bodies)}

    def __call__(self, field: str, value: Any) -> bool:
        if field != "mass":
            return False
        return self.landed(self._scale_mass(float(value)))

    def _scale_mass(self, mass: float) -> bool:
        if not np.isfinite(mass) or mass <= 0.0:
            # Zero would weld a dynamic body to the world -- and then the guard
            # below would refuse it its mass back -- and a negative one would
            # turn its inertia inside out. Neither is a mass.
            return False
        current = self._fetched("body_mass")
        if current is None or not len(self.bodies):
            return False
        wrote = False
        for body in self.bodies:
            was = float(current[body])
            if was <= 0.0:
                # Welded to the world. Leaving it alone is the whole point.
                continue
            factor = mass / was
            current[body] = mass
            self._write("body_inv_mass", [body], 1.0 / mass)
            self._scale_tensor("body_inertia", body, factor)
            self._scale_tensor("body_inv_inertia", body, 1.0 / factor)
            wrote = True
        if wrote:
            self._flush("body_mass", current)
        return wrote

    def _scale_tensor(self, attr: str, body: int, factor: float) -> None:
        values = self._fetched(attr)
        if values is None or body >= len(values):
            return
        values[body] = values[body] * factor
        self._flush(attr, values)


class JointWriter(ArrayWriter):
    """One entity's joint drive gains and limits, over the DOFs it built.

    An articulated asset -- a drawer, a cabinet -- is the case: how hard its
    joint is driven and how far it may travel are the two things somebody opening
    one by hand wants to change, and neither survives into anything a rigid
    body's contact material describes.
    """

    flags = 1 << 1
    """``ModelFlags.JOINT_DOF_PROPERTIES``."""

    FIELDS: ClassVar[dict[str, str]] = {
        "target_ke": "joint_target_ke",
        "target_kd": "joint_target_kd",
        "armature": "joint_armature",
        "friction": "joint_friction",
        "limit_lower": "joint_limit_lower",
        "limit_upper": "joint_limit_upper",
    }

    def __init__(self, model: Any, dofs: Iterable[int], pipeline: Any = None) -> None:
        super().__init__(model, pipeline)
        self.dofs = np.asarray(list(dofs), dtype=np.int64)

    def read(self) -> dict[str, float]:
        return {name: self._read(attr, self.dofs) for name, attr in self.FIELDS.items()}

    def __call__(self, field: str, value: Any) -> bool:
        attr = self.FIELDS.get(field)
        if attr is None:
            return False
        return self.landed(self._write(attr, self.dofs, float(value)))
````

## robosimstudio/sim/sim.py

````text
# SPDX-License-Identifier: Apache-2.0
"""A built scene you can drive: the thing :meth:`Scene.build` hands back.

``Sim`` owns a compiled scene, the control modes over it, the camera rig, the
observation providers and the loop. It has no task, no episode, no evaluator, no
goal and no notion of success -- those belong to the benchmark tier's
``Env``, which is a ``Sim`` with a job to do.

**The cut is where it is because of what is on each side of it.** Everything
here works on a scene somebody assembled by hand: an arm's IK does not know what
it is reaching for, a camera does not know what it is photographing, and
``ee_delta`` is a way of interpreting six numbers rather than a benchmark's
opinion. Everything ``Env`` adds needs a document to have declared it -- which
episode, what the evaluator says, whether the initial state holds. The check that
the cut is in the right place is that ``Env`` does not override :meth:`read` or
any observation provider: there is nothing task-shaped left to add to them.

The read surface is deliberately small. :meth:`run` and :meth:`step` advance it,
:meth:`read` gathers a :class:`~robosimstudio.scene.state.WorldState`, and a
:class:`~robosimstudio.scene.ref.Ref` per thing you added answers the question a
caller actually has -- is the cube on the shelf, has the rope stopped moving --
without the caller learning the index layout of a replicated model.
"""

from __future__ import annotations

from collections.abc import Sequence
from typing import Any

import numpy as np

from robosimstudio.core.env import EnvBase
from robosimstudio.core.render.base import RendererBase
from robosimstudio.core.render.look import look_for
from robosimstudio.core.render.spec import RenderSpec
from robosimstudio.scene.parking import GravcompParking, parked_objects, restrict_contacts, scene_park_poses
from robosimstudio.scene.ref import Ref
from robosimstudio.scene.state import WorldState
from robosimstudio.solvers import make_action_spaces
from robosimstudio.solvers.render import backend_class as _backend_class
from robosimstudio.solvers.render import create_renderer
from robosimstudio.specs import ActionSpec, CameraSpec, replace

__all__ = ["Sim"]


class Sim(EnvBase):
    """A compiled scene, its controllers, its cameras and the loop over them.

    Args:
        scene: What :func:`~robosimstudio.scene.compiler.compile_scene` returned.
        refs: The refs handed out by :meth:`Scene.add`, to be bound to this
            build. Rebinding rather than recreating is what lets the object a
            caller is holding go on working across a rebuild.
        control_mode: Which control mode starts active. Empty takes the first.
        max_steps: Control steps before an episode truncates. 0 never truncates,
            which is right for a scene with nothing to succeed at.
        renderer: Backend name for the observation rig, ``"auto"`` for the
            machine's (see :func:`~robosimstudio.solvers.render.choose_renderer`),
            or ``""`` for none.
        render_every: Render on one step in this many.
        renderer_kwargs: Forwarded to the backend.
        verbose: Print what could not be built rather than silently doing without.
    """

    def __init__(
        self,
        scene: Any,
        refs: dict[str, Ref] | None = None,
        *,
        control_mode: str = "",
        max_steps: int = 0,
        renderer: str = "",
        obs_renderer: str = "",
        render_every: int = 1,
        renderer_kwargs: dict[str, Any] | None = None,
        verbose: bool = False,
    ) -> None:
        self.scene = scene
        self.verbose = bool(verbose)
        self.refs: dict[str, Ref] = dict(refs or {})
        for ref in self.refs.values():
            ref._scene = scene

        super().__init__(
            scene.pipeline,
            action_space=self._make_controllers(),
            control_mode=control_mode,
            max_steps=max_steps,
        )

        self.contacts = self._make_contact_probe()
        self._clearance = None
        if not hasattr(self, "episode"):
            # Only when a subclass has not already said. ``Env`` makes its
            # episode *before* compiling -- it has to, the compiler takes one --
            # so it is already set by the time this constructor runs, and today
            # it is the same object the scene carries. Assigning unconditionally
            # would be correct only for as long as that stays true, which is a
            # thing to notice rather than a thing to rely on.
            self.episode = getattr(scene, "episode", None)
            """The episode this scene was compiled for. A ``Sim`` never changes
            it -- it has no episodes to index -- and ``Env`` reassigns it per
            reset. Read by :meth:`reset_scene`, which hands it to each entity's
            own ``reset``."""
        self._start_joint_q: np.ndarray | None = None
        """The articulation this run started from. Captured rather than compiled,
        because the warm-up steps real physics between the compiled pose and the
        first observation."""
        self._warned_nonfinite = False
        """Whether :meth:`run` has already said the state diverged. Once per
        episode: a loop calling ``run`` a hundred times should say it once, and
        :meth:`reset` clears it with the finite flags it reports."""
        self.settled_body_q = np.zeros((self.model.body_count, 7))
        self._parking: GravcompParking | None = None
        """The per-body gravity-compensation table, built on the first park."""
        self._parked: tuple[str, ...] = ()
        """Objects the current episode parks, in build order. See :attr:`parked`."""
        self._restricted: tuple[frozenset[str] | None, Any] | None = None
        """The last :attr:`handles` answer, keyed on the active set it was cut for."""

        self.render_every = max(1, int(render_every))
        self.renderer_name = renderer
        self.obs_renderer_name = obs_renderer
        self._narrowed_reported = False
        """Whether :meth:`_observable_rig` has already said what the backend
        cannot photograph. Once per ``Sim``, not once per rebuild."""
        self.renderer_kwargs = dict(renderer_kwargs or {})
        self._cameras = self._resolve_cameras()
        self.renderer: RendererBase | None = None
        self.obs_renderer: RendererBase | None = None
        """Separate renderer for obs["cameras"] (perception). When set, ``renderer``
        is used only for the debug video and ``obs_renderer`` feeds the policy."""
        self.obs_render_enabled = True
        """Whether the observation keeps ``obs["cameras"]`` fresh. See :attr:`frames`."""
        self.frames: dict[str, dict[str, np.ndarray]] = {}
        self.video_frames: dict[str, dict[str, np.ndarray]] = {}
        """Frames from the observer renderer when it differs from obs_renderer.
        Registered as obs["video_cameras"] so the recorder can use them."""
        self._fallback_said = False
        if obs_renderer and self._cameras:
            self.obs_renderer = self._make_renderer(obs_renderer)
        if renderer and self._cameras:
            self.renderer = self._make_renderer(renderer)
        self._still_renderer: RendererBase | None = None
        self._still_key: tuple | None = None

        self._register_obs_providers()

    # ------------------------------------------------------------------ what it is
    @property
    def request(self):
        """What this scene was compiled from: a ``BuildRequest``, or a ``TaskSpec``."""
        return self.scene.request

    @property
    def action_spec(self) -> ActionSpec:
        """How an action is interpreted.

        ``getattr`` rather than a protocol member, because
        :class:`~robosimstudio.scene.request.SceneRequest` is exactly what the
        *compiler* reads and this is read by a *driver* of the result. A request
        that names none gets ``ActionSpec``'s own defaults, which its docstring
        says are this package's rather than any benchmark's.
        """
        return getattr(self.request, "action", None) or ActionSpec()

    @property
    def num_worlds(self) -> int:
        return int(self.scene.num_worlds)

    # ------------------------------------------------------------------ build
    def _resolve_cameras(self) -> tuple[CameraSpec, ...]:
        """The rig with every mounted camera bound to a real body.

        A :class:`~robosimstudio.core.cameras.CameraSpec` states a *role*
        (``parent_frame``) because a scene is written before a model exists; a
        renderer needs a body *index*. This is where the two meet, once per
        environment, so the renderer and the observation both see one resolved
        rig rather than resolving it twice and possibly differently.

        An arm role wins, then a body **label**. The order is the point: a role
        is what an eye-in-hand camera means and survives a change of robot,
        while a label is what a camera screwed to one particular link means and
        does not. Both exist on real rigs, and a benchmark whose overhead camera
        is bolted to a pan-tilt head has no role to name it by.

        Raises:
            ValueError: If a camera names neither an arm this scene has nor a
                body this model carries. A mounted camera silently degrading to
                a world-fixed one at the origin renders the inside of the floor,
                which is a long way from its cause.
        """
        resolved: list[CameraSpec] = []
        for spec in getattr(self.request, "cameras", ()):
            if not spec.parent_frame:
                resolved.append(spec)
                continue
            body = -1
            try:
                body = int(self.scene.handles.arm(spec.parent_frame).ee_body)
            except Exception as arm_exc:
                from robosimstudio.scene.entity import label_index

                try:
                    body = label_index(list(self.model.body_label), spec.parent_frame)
                except Exception as body_exc:
                    raise ValueError(
                        f"camera {spec.name!r} rides {spec.parent_frame!r}, which is neither an arm of "
                        f"{self.request.full_name!r} on embodiment {self.request.embodiment!r} ({arm_exc}) "
                        f"nor a body in its model ({body_exc})"
                    ) from body_exc
            resolved.append(replace(spec, parent_body=body, parent_frame=""))
        return tuple(resolved)

    def _make_controllers(self):
        """Every control mode this scene supports, for switching between.

        All of them, not the one the request names: they are thin wrappers over
        the same IK and gripper objects, so the set costs one construction each,
        and a script that wants a planned joint transit followed by an OSC pick
        needs both live at once. ``control_mode`` picks which starts active.

        The :class:`~robosimstudio.specs.ActionSpec` is folded in **per mode**,
        never as shared keyword arguments: handing ``convention=`` to the
        joint-space class is a ``TypeError``. A bad option raises here; only a
        mode the embodiment cannot do is left out.
        """
        embodiment = self.scene.embodiment
        if embodiment is None or not embodiment.iks:
            return {}
        names = list(embodiment.iks)
        arms = [(embodiment.iks[name], embodiment.grippers.get(name)) for name in names]
        action = self.action_spec
        request = self.request
        frame_bodies = (
            [int(embodiment.arms[name].base_body) for name in names] if action.ee_delta_frame == "base" else []
        )
        if action.ee_delta_frame == "base" and any(b < 0 for b in frame_bodies):
            raise ValueError(
                f"scene {request.full_name!r} states base-frame ee_delta actions, but embodiment "
                f"{request.embodiment!r} has no base body for "
                f"{[n for n, b in zip(names, frame_bodies, strict=True) if b < 0]} (the spec names no "
                "ArmSpec.base_body_name and the first joint hangs on the world). Deltas would silently be "
                "read in world axes, which on a yawed mount drives the arm the wrong way on every step."
            )
        options = {
            "ee_delta": {
                "pos_scale": action.ee_delta_pos_scale,
                "rot_scale": action.ee_delta_rot_scale,
                "convention": action.ee_delta_convention,
                "gripper_range": action.gripper_range,
                "use_target": action.ee_delta_use_target,
                "gripper_delta": action.gripper_delta,
                **({"frame_bodies": frame_bodies} if frame_bodies else {}),
            },
            "osc_pose": {"gripper_range": action.gripper_range},
        }
        spaces = make_action_spaces(arms, control_hz=request.physics.control_hz, options=options)
        return spaces

    def _make_contact_probe(self):
        """A contact probe, unless the scene cannot support one.

        A scene whose MuJoCo solver does not own its collision pipeline has no
        geom table to map through, and a caller may legitimately not need
        contacts -- so this returns ``None`` rather than raising, and the
        predicates that need it fail closed.
        """
        try:
            from robosimstudio.core.probes import ContactProbe

            solver = self.scene.program.mujoco_solver if self.scene.program is not None else None
            if solver is None:
                raise RuntimeError("no MuJoCo island in this scene's physics")
            return ContactProbe(solver, self.model, self.scene.pipeline.sim_dt, world=self.scene.handles.world)
        except Exception as exc:
            if self.verbose:
                print(f"[sim] no contact probe ({type(exc).__name__}: {exc}); contact predicates will read False")
            return None

    def make_renderer(
        self,
        backend: str,
        *,
        cameras: Sequence[CameraSpec] | None = None,
        render: RenderSpec | None = None,
        **kwargs: Any,
    ) -> RendererBase:
        """A renderer over this scene, for a caller that owns its lifecycle.

        The scene-derived arguments a backend needs are supplied here rather
        than by everyone who builds one: the tiled backend's ``shape -> label``
        table and the visual backends' part list both come off the compiled
        scene, and a caller that forgets them gets segmentation in Newton's own
        shape numbering, or a photograph of an empty world. Explicit ``kwargs``
        still win, so a caller may override either.

        The returned renderer is **not** attached to this object and is not
        closed by :meth:`close` -- that is the point of it being public. A live
        view in a browser, an export through another backend and the
        observation rig are three renderers over one model with three different
        lifetimes.

        Args:
            backend: One of :func:`~robosimstudio.solvers.render.list_renderers`,
                or any dotted path to a renderer class.
            cameras: Which cameras, defaulting to the scene's own rig. A live
                preview passes ``[c.scaled(w, h) for c in ...]``.
            render: How to light the scene, in terms every backend understands.
                ``None`` -- the default -- takes :attr:`look`, which is the
                scene's own stated lighting if it has one and the house look
                otherwise. It no longer means "leave each backend on its own":
                that spread was 52/66/102/56 in mean frame brightness across four
                backends drawing one scene, and a caller who genuinely wants it
                asks for it by passing a bare ``RenderSpec()``.
            **kwargs: Forwarded to the backend, including ``channels``.
        """
        render = self.look if render is None else render
        specs = list(self.cameras if cameras is None else cameras)
        for key, provide in self._scene_facts(specs).items():
            if key in _backend_class(backend).wants and key not in kwargs:
                value = provide()
                if value is not None:
                    kwargs[key] = value
        return create_renderer(backend, self.model, specs, render=render, **kwargs)

    def render(
        self,
        camera: CameraSpec | str | None = None,
        *,
        channels: Sequence[str] = ("rgb",),
    ) -> dict[str, np.ndarray]:
        """One frame of the scene as it stands, through the renderer.

        The renderer is :func:`~robosimstudio.solvers.render.choose_renderer`'s:
        ``ROBOSIMSTUDIO_RENDERER`` where it names one, else path traced
        (``rtx``) -- the room, the materials and the lights -- where ovrtx is
        installed and this scene's GPU has RT cores, and drawn from the colliders
        alone (``tiled``) where not, with one printed line saying why. The
        renderer is built on the first call and kept for the next one with the
        same camera, so a loop that photographs every few steps pays for the
        stage once.

        Args:
            camera: A :class:`~robosimstudio.specs.CameraSpec`, the name of one
                the scene declares, or ``None`` for the scene's first camera --
                or, on a scene that declares none, a three-quarter view of the
                work surface.
            channels: Which of ``"rgb"``, ``"depth"`` to produce.

        Returns:
            ``{"rgb": uint8 [H, W, 3], "depth": float32 [H, W], ...}``.

        Example::

            frame = sim.render()
            imageio.imwrite("still.png", frame["rgb"])
        """
        from robosimstudio.solvers.render import FALLBACK, choose_renderer

        spec = self._camera_for(camera)
        backend, why = choose_renderer(device=self.model.device)
        key = (backend, spec, tuple(channels))
        if self._still_renderer is None or self._still_key != key:
            if self._still_renderer is not None:
                self._still_renderer.close()
            self._say_fallback(backend, why)
            self._still_renderer = self.make_renderer(backend, cameras=[spec], channels=list(channels))
            self._still_key = key
            if backend != FALLBACK:
                self._still_renderer.render(self.state)  # the first frame only builds the stage
        self.sync()
        frame = self._still_renderer.render(self.state)[spec.name]
        return {c: np.asarray(frame[c]) for c in channels if c in frame}

    def record(
        self,
        path: str,
        steps: int,
        *,
        camera: CameraSpec | str | None = None,
        fps: int = 30,
        every: int = 1,
    ) -> str:
        """Step the scene and write an mp4 of it, through the renderer.

        Every ``every``-th control step is photographed as :meth:`render`
        photographs one, and the frames go to ``<path>/<camera>.mp4`` at
        ``fps``. The simulation is stepped here, so what the video shows is
        what :meth:`run` would have done.

        Args:
            path: A directory for the video; made if it does not exist.
            steps: How many control steps to run.
            camera: As :meth:`render` takes it.
            fps: Frame rate of the file.
            every: Photograph one control step in this many.

        Returns:
            The directory written to.
        """
        from robosimstudio.core.render.video import VideoSet

        spec = self._camera_for(camera)
        with VideoSet(path, fps=int(fps)) as videos:
            for i in range(int(steps)):
                self.run(1)
                if i % max(1, int(every)) == 0:
                    videos.append_frames({spec.name: self.render(spec)})
        return str(path)

    def _camera_for(self, camera: CameraSpec | str | None) -> CameraSpec:
        """The camera :meth:`render` photographs through."""
        if isinstance(camera, CameraSpec):
            return camera
        if isinstance(camera, str) and camera:
            for spec in self.cameras:
                if spec.name == camera:
                    return spec
            raise KeyError(f"no camera named {camera!r}; the scene declares {[c.name for c in self.cameras]}")
        if self.cameras:
            return self.cameras[0]
        # A three-quarter view of the work surface, in world coordinates.
        z = float(getattr(self.scene.handles, "surface_z", 0.0) or 0.0)
        return CameraSpec(
            name="view",
            width=960,
            height=540,
            fov_y=45.0,
            eye=(-0.4, -0.9, z + 0.75),
            look_at=(0.6, 0.0, z + 0.05),
            up=(0.0, 0.0, 1.0),
            near=0.01,
            far=8.0,
        )

    def _scene_facts(self, specs: list[CameraSpec]) -> dict[str, Any]:
        """Everything a renderer may ask this scene for, by the name it asks under.

        A renderer is handed a model and a camera list, so anything it needs
        *about* the compiled scene has to arrive as a keyword. Which facts a
        backend takes is the backend's own statement -- ``RendererBase.wants``
        -- and this is the other half: one provider per name, each a closure so
        nothing is computed for a backend that did not ask.
        """

        def cell() -> Any:
            name = self.scene.handles.scene_name
            if not name:
                return None
            from robosimstudio.scene.registry import get_cell

            try:
                return get_cell(name)
            except KeyError:
                return None

        handles = self.scene.handles
        return {
            "shape_labels": handles.segmentation_labels,
            "finishes": lambda: handles.finishes,
            "deformables": lambda: handles.deformables,
            "deformable_finishes": lambda: handles.deformable_finishes,
            "deformable_colors": self._deformable_colors,
            "live_shapes": lambda: handles.live_shapes,
            "surface_z": lambda: handles.surface_z,
            "cell": cell,
        }

    def _deformable_colors(self) -> dict[str, tuple[float, float, float]]:
        """``deformable name -> display RGB``, off each spec's own ``color``."""
        out: dict[str, tuple[float, float, float]] = {}
        for name in self.scene.handles.deformables:
            entity = self.scene.by_name.get(name)
            color = getattr(getattr(entity, "spec", None), "color", None)
            if color is not None:
                out[name] = tuple(float(v) for v in color)
        return out

    @property
    def render_skip(self) -> tuple[str, ...]:
        """Entity names a visual-matching composite supplies from a photograph.

        An entity whose camera has a :attr:`~robosimstudio.core.cameras.CameraSpec.background`
        may legitimately be *drawn by the photograph* rather than by simulation
        -- SimplerEnv's sink is physics-only and comes from the picture.

        Read off a typed field when the request has one. A typed field means
        the next visual-matching suite declares it rather than smuggling it.
        """
        return tuple(str(name) for name in getattr(self.request, "render_skip", ()))

    @property
    def look(self) -> RenderSpec:
        """How this scene is lit, for whichever backend is asked.

        The scene's own statement if it made one, else the house look. Read here
        rather than at each call site because the three display paths -- the
        studio's live camera panel, its video export, and the offline re-render
        -- each built a renderer without passing one, so a task that *did* state
        its lighting was honoured in the observation rig and ignored in every
        picture a person actually looked at. Resolving it on the scene means
        those three need no argument rather than needing the right one.
        """
        return look_for(getattr(self.request, "render", None))

    def _observable_rig(self, backend: str) -> tuple[CameraSpec, ...]:
        """The rig, narrowed to the channels this backend can actually produce.

        A camera declares what it wants photographed and a backend declares what
        it can photograph, and the two do not have to agree: the path tracer has
        no segmentation, so a tool-sorting agentview -- which asks for rgb,
        depth and seg -- makes :class:`RendererBase` raise, and one camera
        wanting one channel one backend lacks costs the whole rig.

        Refusing is right for a renderer somebody built by hand, and wrong here.
        This one is built from a *name*, on the way to constructing an
        environment, and there is no second chance to negotiate -- so it narrows,
        which is what lets a run collected with segmentation be re-rendered by a
        path tracer at all.

        And it says what it dropped, out loud rather than under ``verbose``,
        because this changes what a policy sees: a channel that quietly stopped
        appearing in ``obs["cameras"]`` is indistinguishable from a backend
        rendering it badly. Whether the loss matters is the caller's to judge,
        and it is not always a loss: ``seg`` is the channel this actually drops
        today, and a non-privileged graph policy may not read segmentation
        anyway -- it is on that contract's list of ground truth.
        """
        from robosimstudio.solvers.render import supported_channels

        supported = set(supported_channels(backend))
        rig, dropped, empty = [], {}, []
        for cam in self.cameras:
            kept = tuple(c for c in cam.channels if c in supported)
            if kept == tuple(cam.channels):
                rig.append(cam)
                continue
            dropped[cam.name] = sorted(set(cam.channels) - supported)
            if kept:
                rig.append(replace(cam, channels=kept))
            else:
                # Nothing left to photograph, so it leaves the rig rather than
                # staying on as an entry that renders no channels -- a camera a
                # backend cannot produce anything for is not a camera, and the
                # path tracer refuses to author a render product for one.
                empty.append(cam.name)
        if dropped and not self._narrowed_reported:
            # Once per environment, not once per rebuild: an episode that needs a
            # different model rebuilds the rig, and a benchmark run over fifty of
            # them would otherwise say this fifty times.
            self._narrowed_reported = True
            asked = sorted({c for names in dropped.values() for c in names})
            gone = f"; {sorted(empty)} produce nothing at all and are not rendered" if empty else ""
            print(
                f"[sim] the {backend!r} rig produces {sorted(supported)}, so {asked} is missing from "
                f"obs['cameras'] for {sorted(dropped)}{gone}"
            )
        return tuple(rig)

    def _say_fallback(self, backend: str, why: str) -> None:
        """Say once per ``Sim`` that pictures are colliders only, and why."""
        from robosimstudio.solvers.render import ENV, FALLBACK

        if backend == FALLBACK and not self._fallback_said:
            self._fallback_said = True
            hint = "" if why.startswith(ENV) or why == "asked for" else f" ({ENV}=rtx to override)"
            print(f"[sim] rendering with {FALLBACK}, the colliders alone: {why}{hint}")

    def _make_renderer(self, backend: str) -> RendererBase:
        """The observation rig, which this object owns and closes.

        The scene's own lighting is passed unless the caller stated one: on a
        visual-matching task the rig is part of the observation rather than a
        display setting, so a policy evaluated here sees the reference's own
        exposure and not the backend's default.
        """
        from robosimstudio.solvers.render import choose_renderer

        # ``auto`` is resolved here, against this scene's GPU; a name is taken
        # as given, so ``rtx`` without ovrtx raises rather than quietly
        # becoming a different picture.
        backend, why = choose_renderer(backend, device=self.model.device)
        self._say_fallback(backend, why)
        kwargs = dict(self.renderer_kwargs)
        render = kwargs.pop("render", None)
        kwargs.setdefault("cameras", self._observable_rig(backend))
        return self.make_renderer(backend, render=render, **kwargs)

    def _register_obs_providers(self) -> None:
        """What every scene can be asked. ``Env`` adds the instruction on top."""
        self.add_obs_provider("proprio", lambda sim: sim._observe_proprio())
        self.add_obs_provider("objects", lambda sim: sim._observe_objects())
        if any(e.carries_particles for e in self.scene.by_name.values()):
            self.add_obs_provider("deformables", lambda sim: sim._observe_deformables())
        self.add_obs_provider("step", lambda sim: sim.step_count)
        self.add_obs_provider("sim_time", lambda sim: sim.sim_time)
        if self.obs_renderer is not None or self.renderer is not None:
            self.add_obs_provider("cameras", lambda sim: sim.frames)
        if self.obs_renderer is not None and self.renderer is not None:
            self.add_obs_provider("video_cameras", lambda sim: sim.video_frames)

    def reset_scene(self) -> None:
        """Put every entity, and the solver under them, back where the scene says.

        **Here rather than on ``Env``, and the warm-up is why.** Nothing below is
        about a task: an entity re-places the coordinates it owns, the
        articulation goes back to what this run started from, and the rigid
        solver's warm-start buffers are cleared. ``EnvBase.reset`` calls this
        twice on purpose -- before the warm-up and after -- because
        ``warmup_and_capture`` steps real physics; while it lived on ``Env`` a
        bare ``Sim`` inherited the no-op stub and got neither call, so a cube
        released 200 mm over a bench came back from ``build()`` already 5.6 mm
        down with ``sim_time`` reading 0.0.

        The entities alone are not the whole of it, and the gap is what made
        consecutive episodes in one process drift. Measured on
        a tool-sorting scene, six scripted rollouts of episode 0 through one
        reused ``Env``: lengths 785, 786, 787, 787, 788, 789 where three
        separate processes each gave 785. Two things were carrying over.

        **The articulation.** An entity restores the coordinates it owns -- an
        object its free joint -- but a robot whose spec leaves
        :attr:`~robosimstudio.specs.EmbodimentSpec.reset_joint_q` off
        writes only its servo *targets*, deliberately, and no shipped embodiment
        turns it on. So the arm and the fingers began each episode wherever the
        last one abandoned them: 3.4e-2 rad away, the fingers left open by a
        release where episode 0 started them nearly shut. Restoring
        :attr:`_start_joint_q` -- the whole vector, before the entities run, so
        each of them re-places its own coordinates for *this* episode on top --
        gives that back without teleporting anything on a single-episode run,
        since the vector is the pose that run itself started from.

        **The rigid solver's own buffers.** MuJoCo warm-starts every solve from
        the last one's accelerations and holds its applied forces, none of which
        lives in a Newton :class:`~newton.State`: ``qacc_warmstart`` came into
        each episode still holding the previous one's value (max 2.3 after a
        rollout, against 0 in a fresh process). Newton's own
        :meth:`~newton.solvers.SolverBase.reset` clears exactly those buffers,
        and ``flags=0`` asks for that and nothing else -- the joint coordinates
        are this method's to restore, not the solver's to overwrite with the
        model defaults.

        Zeroing ``joint_qd`` moved ahead of the kinematics for the same reason:
        ``eval_fk`` derives ``body_qd`` *from* ``joint_qd``, so zeroing after it
        left every body carrying the previous episode's momentum inside a state
        whose joint rates read zero.
        """
        import newton

        if self._start_joint_q is not None:
            self.pipeline.state_0.joint_q.assign(self._start_joint_q)
            self.pipeline.state_1.joint_q.assign(self._start_joint_q)
        # Before the entities, not after, and the difference is not cosmetic. A
        # host engine's reset returns its island to the rest it captured, and an
        # entity's reset is where this episode's state is placed on top -- so a
        # deformable an episode MOVES (a surface-preparation foam, drawn somewhere new
        # every episode) was placed and then restored straight back to the
        # nominal. Invisible from Newton, which kept the placed particles until
        # the bridge's next tick wrote the engine's own nodes over them:
        # measured at 56 mm of disagreement between the two while every
        # particle-side assertion passed.
        #
        # Nothing here depends on the other order. The reset clears solver
        # buffers -- warm starts, contact anchors -- and the state is not final
        # at this point either way: the kinematics below still have to run.
        self.pipeline.reset_solvers(flags=0)
        for entity in self.scene.entities:
            entity.reset(self.pipeline, self.episode)
        state = self.pipeline.state_0
        # A deformable-only scene has no rigid state to restore; the entities'
        # own reset above is the whole of it.
        if not self.model.body_count:
            self.pipeline.mark_dirty()
            return
        # After the entities, which have just re-placed every object for this
        # episode: what the episode does not run is now moved out of the way
        # and held there. Before the kinematics, so ``body_q`` agrees.
        self._park_inactive()
        self.pipeline.state_0.joint_qd.zero_()
        self.pipeline.state_1.joint_qd.zero_()
        newton.eval_fk(self.model, state.joint_q, state.joint_qd, state)
        import warp as wp

        wp.copy(self.pipeline.state_1.body_q, state.body_q)
        # Velocities as well as poses: ``state_1`` was the only half of the
        # double buffer still holding the previous episode's ``body_qd`` after
        # everything else matched, and a buffer that is half restored is the
        # thing this method exists to not leave behind.
        wp.copy(self.pipeline.state_1.body_qd, state.body_qd)
        wp.copy(self.pipeline.state_1.joint_q, state.joint_q)
        self.pipeline.mark_dirty()

    def reset(self) -> tuple[dict[str, Any], dict[str, Any]]:
        """Restore the start state, then record what "start" turned out to be.

        Both captures are facts about a *scene*: the articulation a run began at,
        and the poses things settled into. ``Env.reset`` picks an episode and
        then calls this.
        """
        obs, info = super().reset()
        self._warned_nonfinite = False  # the finite flags were just cleared too
        if self._start_joint_q is None and self.model.body_count:
            # After the base class has warmed up *and* re-posed, so this is the
            # articulation the first episode is actually about to be stepped
            # from -- which is what every later episode has to be given back.
            # A deformable-only scene has no ``joint_q`` at all, hence the guard.
            self._start_joint_q = np.asarray(self.pipeline.snapshot.joint_q, dtype=np.float32).copy()
        self.settled_body_q = self._body_q().copy()
        return obs, info

    # ------------------------------------------------------------------- the loop
    def run(self, count: int = 1) -> Sim:
        """Advance ``count`` control steps with no action. Returns ``self``, so it chains.

        Separate from :meth:`step`, which takes an *action*: a scene with no arm
        has nothing to command, and ``sim.step(180)`` reading 180 as an action
        vector is the kind of mistake a shared name invites. The per-step
        bookkeeping is the same as :meth:`step`'s -- the step count and
        :attr:`post_step_hooks` -- so a hook a scene installs runs here too.

        **Says so once if the state stops being finite.** A diverged run looks
        exactly like a fast one -- it steps, it returns, and every number after it
        is ``nan`` -- and the caller most likely to hit it is the one this method
        is for: somebody stepping a scene they assembled themselves, with no
        evaluator watching. The check is the sticky flag the step's own read-back
        already set, so it costs no extra copy, and it prints rather than raises
        because probing an unstable configuration on purpose is a real thing to
        do. ``sim.state_is_finite()`` is the same answer as a boolean.
        """
        for _ in range(int(count)):
            self._step_once()
        if not self._warned_nonfinite and not self.state_is_finite():
            self._warned_nonfinite = True
            print(
                f"[sim] the state stopped being finite by step {self.step_count}; every reading from here "
                "is nan. Usually a solver that cannot hold this arrangement -- check "
                "sim.pipeline.program.problems(), and GENERIC's docstring for what it cannot hold."
            )
        return self

    def sync(self) -> Sim:
        """Wait for the device. Returns ``self``.

        Needed before *reading*, not before stepping: the substep block is
        queued, and a host read of ``body_q`` that skips this gets whatever the
        device had finished writing, which is usually right and occasionally a
        step behind.
        """
        self.pipeline.sync()
        return self

    @property
    def time(self) -> float:
        """Simulated seconds since the build. ``sim_time`` under a shorter name."""
        return float(self.sim_time)

    def deformables(self) -> dict[str, Any]:
        """Every entity carrying a particle probe, by name.

        The deformables bin **and** the extras one, because which of the two a
        thing lands in is decided by its spec's ``stage`` -- a build-order
        statement -- and not by whether it has particles. A rope is the case
        that separates them: as a capsule chain it is an ``extras`` entity with
        no particles at all, and as a centerline it is an ``extras`` entity with
        nothing but.
        """
        return {n: e for n, e in self.scene.by_name.items() if getattr(e, "probe", None) is not None}

    def particle_probes(self) -> dict[str, Any]:
        """Those entities' probes, which is what a measure is handed."""
        return {name: e.probe for name, e in self.deformables().items()}

    def make_context(self) -> WorldState:
        """Gather this step's read-back, once.

        The same :class:`~robosimstudio.scene.state.WorldState` a benchmark
        measure is handed, which is the point: a measurement written against a
        bare scene is a measurement a task can reuse.
        """
        return WorldState(
            # Restricted to the episode's active set, so a goal, a tool or a
            # describer enumerating objects never finds a parked one. The
            # whole table when the episode names none, which is the same
            # object ``scene.handles`` is.
            handles=self.handles,
            state=self.state,
            step=self.step_count,
            sim_time=self.sim_time,
            body_q=self._body_q(),
            body_qd=self._body_qd(),
            settled_body_q=self.settled_body_q,
            joint_target_q=self._joint_target_q(),
            contacts=restrict_contacts(self.contacts, self._parked_shapes()),
            active=self.active,
            # Every entity that carries a probe, not every entity in one *bin*.
            # The bin a spec's ``stage`` puts it in is a build-order fact;
            # whether it has particles to measure is a fact about the thing.
            particles=self.particle_probes(),
            # Cloths first, extras after: both are "what the scene's own
            # entities published", keyed by entity name.
            entities=dict(self.scene.by_name),
        )

    def read(self) -> WorldState:
        """:meth:`make_context`, synced first. What a caller outside a step loop wants."""
        self.sync()
        return self.make_context()

    # -------------------------------------------------------------- observation
    def _observe_proprio(self) -> dict[str, np.ndarray]:
        return {} if self.scene.embodiment is None else self.scene.embodiment.observe(self.state)

    def _body_q(self) -> np.ndarray:
        """Rigid poses, or an empty ``[0, 7]`` for a scene with no bodies.

        A deformable-only scene -- a material rig -- leaves ``state.body_q`` as
        ``None`` rather than an empty array, and every consumer here wants an
        array it can index into and get nothing from.
        """
        if not self.model.body_count:
            return np.zeros((0, 7), dtype=np.float64)
        return self.pipeline.snapshot.body_q

    def _body_qd(self) -> np.ndarray:
        """Rigid velocities, or an empty ``[0, 6]``."""
        if not self.model.body_count:
            return np.zeros((0, 6), dtype=np.float64)
        return self.pipeline.snapshot.body_qd

    def _joint_target_q(self) -> np.ndarray:
        """Servo targets, or an empty array for a scene with no articulation."""
        targets = self.pipeline.control.joint_target_q
        if targets is None:
            return np.zeros(0, dtype=np.float64)
        return self.pipeline.snapshot.joint_target_q

    def _observe_objects(self) -> dict[str, np.ndarray]:
        body_q = self._body_q()
        return {
            name: np.asarray(handle.pose(body_q), dtype=np.float32)
            for name, handle in self.scene.handles.objects.items()
        }

    def _observe_deformables(self) -> dict[str, dict[str, float]]:
        """What each particle-carrying entity reports about itself.

        Keyed on :meth:`deformables` -- the entities that actually carry a probe
        -- and not on the ``deformables`` **bin**, which is where a spec's
        ``stage`` put it.

        ``observe`` is reached duck-typed because carrying particles and
        reporting about yourself are different claims, and an entity may make
        the first without the second.
        """
        readback = self.pipeline.snapshot
        seen = {}
        for name, entity in self.deformables().items():
            observe = getattr(entity, "observe", None)
            if callable(observe):
                seen[name] = observe(self.state, self.step_count, readback=readback)
        return seen

    # ------------------------------------------------------------------ access
    @property
    def handles(self):
        """Where everything in the scene is -- for the objects this episode runs.

        :meth:`~robosimstudio.scene.handles.SceneHandles.restricted` to the
        episode's :attr:`~robosimstudio.specs.Episode.active` set, which for
        every episode that names none is ``scene.handles`` itself. The full
        table stays on ``scene.handles`` for what is about the *model* -- the
        renderer's finishes and labels, a camera's parent body -- and this is
        what a reader asking "which objects are there" gets. Cached per active
        set, since the observation asks every step.
        """
        active = self.active
        if self._restricted is None or self._restricted[0] != active:
            self._restricted = (active, self.scene.handles.restricted(active))
        return self._restricted[1]

    @property
    def active(self) -> frozenset[str] | None:
        """Which entities the current episode runs, or ``None`` for every one."""
        return getattr(self.episode, "active", None)

    @property
    def parked(self) -> tuple[str, ...]:
        """The objects the current episode parks -- floated out of the way, held, touching nothing."""
        return self._parked

    def _parked_shapes(self) -> list[int]:
        """Every shape of every parked object, for the contact view to drop."""
        if not self._parked:
            return []
        objects = self.scene.handles.objects
        return [int(s) for name in self._parked if name in objects for s in objects[name].shapes]

    def _park_inactive(self) -> None:
        """Move what this episode does not run to its park pose and hold it there.

        The serial half of the fleet's ``park``,
        on this scene's one world, through the same
        :class:`~robosimstudio.scene.parking.GravcompParking` -- so a superset
        base run serially behaves as it does in a wave, and the reference the
        fleet is measured against is the same mechanism and not a different
        one. Called from :meth:`reset_scene` after every entity has re-placed
        itself and before the kinematics, so ``body_q`` agrees with the joint
        coordinates written here.

        Nothing to do for an episode that names no active set, which is every
        episode of every document written before superset instances existed:
        no pose is written, no table is built, and the gravcomp array is never
        touched.
        """
        names = parked_objects(self.scene, self.active)
        was = self._parked
        self._parked = tuple(names)
        if not names and not was:
            return
        parking = self._make_parking()
        if names:
            poses = scene_park_poses(self.scene)
            q = np.asarray(self.pipeline.state_0.joint_q.numpy(), dtype=np.float32).copy()
            for name in names:
                entity = self.scene.objects[name]
                start = int(entity.coord_start)
                q[start : start + 7] = poses[name].astype(np.float32)
            self.pipeline.state_0.joint_q.assign(q)
            self.pipeline.state_1.joint_q.assign(q)
        parking.set(0, [int(self.scene.objects[name].body) for name in names])
        parking.apply()

    def _make_parking(self) -> GravcompParking:
        if self._parking is None:
            solver = self.scene.program.mujoco_solver if self.scene.program is not None else None
            if solver is None:
                raise RuntimeError(
                    f"scene {self.request.full_name!r} runs an episode with an active set, but its physics has no "
                    "MuJoCo island to hold a parked body against gravity with; parking needs one"
                )
            self._parking = GravcompParking(solver, self.model, self.scene.worlds)
        return self._parking

    def gravcomp(self, name: str) -> float:
        """The solver's gravity-compensation row for one object, read back. 1.0 while parked."""
        return self._make_parking().row(0, int(self.scene.objects[name].body))

    @property
    def clearance(self):
        """How close things are, at any configuration, without stepping.

        Built on first ask and kept, because building one walks the model's
        collision filtering and that is not work to repeat per question.

        **The distinction from ``contacts`` is the useful one.** A contact probe
        reports what the solver found *this* step: it answers "what am I
        touching". This answers "what would I touch", at a joint configuration
        the arm is not in and has no intention of entering -- which is the
        question an agent has before it commits to a motion, and the one that
        was previously unanswerable without moving and looking.
        """
        if self._clearance is None:
            from robosimstudio.core.probes.clearance import ClearanceProbe

            self._clearance = ClearanceProbe(self.scene.index_model)
        return self._clearance

    @property
    def cameras(self) -> tuple[CameraSpec, ...]:
        """The rig, with every eye-in-hand camera bound to the body it rides."""
        return self._cameras

    def arm(self, name: str = ""):
        """One arm's IK, defaulting to the first."""
        iks = self.scene.embodiment.iks if self.scene.embodiment else {}
        if not iks:
            raise RuntimeError(f"scene {self.request.full_name!r} has no arms")
        return iks[name] if name else next(iter(iks.values()))

    def gripper(self, name: str = ""):
        grippers = self.scene.embodiment.grippers if self.scene.embodiment else {}
        if not grippers:
            raise RuntimeError(f"scene {self.request.full_name!r} has no grippers")
        return grippers[name] if name else next(iter(grippers.values()))

    def __getitem__(self, name: str) -> Ref:
        """The ref for one thing, by name.

        Available for things the *scene's own import* declared as well as things
        you added -- a merged MJCF export brings its own bodies, and a caller who
        wants one of them has a name and nothing else.
        """
        ref = self.refs.get(name)
        if ref is not None:
            return ref
        made = _ref_for(self.scene, name)
        if made is None:
            raise KeyError(f"nothing called {name!r} in this scene; there is {sorted(self.names())}")
        self.refs[name] = made
        return made

    def names(self) -> list[str]:
        """Every name in the scene, sorted: every name ``sim[name]`` answers.

        The handle tables as well as the entities, because :meth:`__getitem__`
        resolves through both -- a region, or a body a merged import brought, has
        a handle and no entity.
        """
        scene = self.scene
        handles = scene.handles
        found = set().union(handles.objects, handles.deformables, handles.statics, handles.regions)
        return sorted(set(self.refs) | set(scene.by_name) | found)

    def __contains__(self, name: str) -> bool:
        return name in self.names()

    def close(self) -> None:
        """Release the observation rig, if this object built one."""
        if self.obs_renderer is not None:
            self.obs_renderer.close()
            self.obs_renderer = None
        if self.renderer is not None:
            self.renderer.close()
            self.renderer = None
        if self._still_renderer is not None:
            self._still_renderer.close()
            self._still_renderer = None

    def __repr__(self) -> str:
        return f"{type(self).__name__}({getattr(self.request, 'full_name', '?')!r}, {len(self.names())} things, t={self.time:.3f}s)"


def _ref_for(scene: Any, name: str) -> Ref | None:
    """The ref class the entity under ``name`` declares, instantiated -- or ``None``.

    ``Entity.ref`` rather than a table here, for the reason that ClassVar exists:
    which accessors a thing offers is a fact about the thing.
    """
    entity = scene.by_name.get(name)
    if entity is not None:
        return type(entity).ref(scene, name)
    if scene.handles.find(name) is not None:
        return Ref(scene, name)
    return None
````

## robosimstudio/engines/contract.py

````text
# SPDX-License-Identifier: Apache-2.0
"""What a host engine's bridge must be, written down.

:class:`~robosimstudio.engines.host.SolverHost` satisfies the composer's solver
contract for every engine; what differs is the object its ``open`` returns. This
is that shape as a :class:`typing.Protocol`.

**Structural, and deliberately so.** Nothing inherits from this and nothing is
type-checked against it at runtime by the composer -- the seam stays duck-typed,
exactly as ``scene/physics`` finds a host solver by ``getattr``. What the
Protocol buys is that the contract is now *checkable*: ``tests/test_cosim_contract.py``
asserts each shipped bridge satisfies it without an engine installed, so a method
renamed on one engine and not the other fails in the fast tier rather than on a
GPU box with a wheel.

**There is deliberately no capability record here**, and the omission is
argued rather than overlooked. The branches it would replace do not exist:
nothing outside an engine's own bundle asks what that engine can do,
``pin_nodes`` and ``contact_points`` are each reached on the SuperDex bridge by
the one suite that uses it, and no call site anywhere tests an alias.
``scene/entity.py`` makes this argument about ``observe`` and it holds here: a
contract no call site matches is worse than no contract, because it invites an
implementation that will silently never be read. Add it with the first branch
that needs it.
"""

from __future__ import annotations

from typing import Any, Protocol, runtime_checkable

__all__ = ["CosimBridge"]


@runtime_checkable
class CosimBridge(Protocol):
    """One host island's engine, as the rest of this package needs it.

    Everything engine-neutral is elsewhere --- :class:`~robosimstudio.engines.cosim.CosimRig`
    owns the tick's state machine, :class:`~robosimstudio.engines.feedback.WrenchAccumulator`
    the shaping, ``geometry`` the reading. A bridge is what is left: the engine's
    own API, plus the five entry points below.
    """

    feedback_enabled: bool
    """Whether this island harvests contact wrenches back onto Newton bodies.

    False when the arrangement turned feedback off, when no mirror is both
    two-way and body-carried, or when the model has no bodies at all. The owning
    :class:`~robosimstudio.engines.host.SolverHost` reads it once, at
    construction, to decide whether to register a ``rigid_force`` stage --- so a
    bridge that sets it later sets it too late.
    """

    apply_wrenches: Any
    """``(wrench[n_bodies, 6] float32) -> None``, filled in by the solver.

    ``None`` until then. A bridge writes through it and never creates it: the
    device-side array belongs to the solver, which is the half that knows about
    warp.
    """

    def tick(self, state: Any, dt: float) -> None:
        """Advance one control period and write the results back.

        Scheduled into the eager ``after`` phase, outside the captured graph.
        Reads this step's rigid poses, drives the mirrors across the engine's
        substeps, harvests, and writes particle positions and velocities into
        **both** states of the double buffer.
        """

    def attach_pipeline(self, pipeline: Any) -> None:
        """Learn which states to write. Called before anything settles."""

    def capture_rest(self) -> None:
        """Record the settled state as what a reset returns to.

        Called after every entity's ready phase, because the drape a deformable
        lands in is the start state --- not the pose it was built at.
        """

    def restore_rest(self) -> None:
        """Return the engine to the captured rest.

        Called from the solver's ``reset``, which ``Sim.reset_scene`` runs
        *before* the entities' own resets: the engine is returned to its rest
        first, so an entity that places this episode's state (a deformable drawn
        somewhere new) is not restored straight back to the nominal. Must also
        arrange for the next tick to teleport its mirrors rather than sweep to
        them, and zero any harvested wrench.
        """
````

## robosimstudio/engines/cosim.py

````text
# SPDX-License-Identifier: Apache-2.0
"""The per-control-step tick, minus the engine.

A co-simulation tick is the same five moves whatever engine is under it: read
this step's rigid poses, drive the mirrors across the engine's substeps,
advance, harvest, write the deformable state back into Newton's particle
arrays. Only the middle of that is the engine's -- setting a transform, calling
its step -- and :class:`CosimRig` is the rest, held once so a second engine does
not arrive with a second copy.

The rig owns no engine handle and calls no engine method. An adapter drives it:

    targets = rig.body_poses(state)
    for _sub, poses in rig.substeps_of(mirrors, targets):
        for mirror, pose in poses:
            ...engine: put ``mirror`` at ``pose``, and zero its velocity if
               ``rig.teleport``...
        ...engine: advance by ``rig.substep_dt(dt)``...
    rig.commit(targets)
    ...engine: harvest...
    for actor in actors:
        actor.prev = rig.write_particles(state, actor.start, actor.count, positions, dt, actor.prev)

**Why the mirror drive is interpolated rather than jumped.** A control step is
16.7 ms at 60 Hz and a hand can cross several millimetres in one; a mirror
teleported that far between engine steps arrives already overlapping whatever it
was approaching, and contact detection at step endpoints tunnels straight
through a sheet. Sweeping it in ``substeps`` small aims is what makes the
approach-speed envelope usable, and it is also what gives a displacement-based
friction model the right surface velocity for free.
"""

from __future__ import annotations

from collections.abc import Iterator
from dataclasses import dataclass
from typing import Any

import numpy as np

from .pose import compose_many, lerp_poses

__all__ = [
    "CosimRig",
    "engine_dt",
]


def engine_dt(control_dt: float, substeps: int) -> float:
    """The one contract for a foreign engine's step: the control period over its substeps.

    Both now compute this; an engine that fixes its step at construction passes
    the arrangement's control period, one that steps to a ``dt`` it is handed
    passes that.
    """
    return float(control_dt) / max(1, int(substeps))


@dataclass(frozen=True)
class _Drive:
    """Which mirrors this rig poses, and how to lay their inputs out as arrays.

    Rebuilt only when the mirror set or the mirrored body set changes, which on
    a running island is never: an island's colliders are built once and its
    bodies come from the rig's own fixed list. Holding it is what turns the
    per-tick work from "walk every mirror" into two small array reads, and at
    2748 mirrors that is 4.1 ms a control step against 0.5 ms.

    The layout is by *body*, not by mirror, because a mirror set is much larger
    than the set of bodies under it -- a decomposed hull is dozens of shapes on
    one link, so twelve worlds of this bench are 2748 mirrors on 264 bodies.
    The sweep is a property of a body, so it is computed once per body and
    ``rows`` fans it out to the mirrors riding on it.

    Attributes:
        mirrors: The list that was passed in, held for an identity check. A
            caller that builds a fresh list every tick gets a fresh plan every
            tick -- correct, and exactly what the per-tick gather cost before.
        keys: The bodies ``targets`` carried, so a rig whose mirrored set
            changed underneath it rebuilds rather than indexing the old layout.
        kept: The mirrors that are posed here, in yield order. A mirror with no
            body, or one whose body is not in ``targets``, is world-fixed and
            was posed once at build.
        bodies: The distinct bodies ``kept`` rides on, in ``rows`` order.
        rows: For each kept mirror, its body's row in ``bodies`` ``[n]``.
        local: Each kept mirror's body-local transform ``[n, 7]``.
    """

    mirrors: Any
    keys: frozenset
    kept: list
    bodies: list
    rows: np.ndarray
    local: np.ndarray

    @classmethod
    def build(cls, mirrors, targets) -> _Drive:
        kept, rows = [], []
        slot: dict[int, int] = {}
        for mirror in mirrors:
            body = getattr(mirror, "body", -1)
            if body < 0 or body not in targets:
                continue
            kept.append(mirror)
            rows.append(slot.setdefault(body, len(slot)))
        return cls(
            mirrors=mirrors,
            keys=frozenset(targets),
            kept=kept,
            bodies=sorted(slot, key=slot.get),
            rows=np.asarray(rows, dtype=np.intp),
            local=np.asarray([m.local for m in kept], dtype=np.float64).reshape(-1, 7),
        )


class CosimRig:
    """The engine-neutral half of one host island's tick.

    Args:
        bodies: The Newton body indices the mirrors ride on. Only these are
            read back from the device, which is what keeps ``pose_source=
            "fresh"`` to one small copy rather than the whole body array.
        substeps: Engine steps per control step.
        pose_source: ``"fresh"`` reads this step's poses off the state, costing
            one device read and coupling with zero lag; ``"snapshot"`` reads the
            batched host copy, which is free and one control period stale.
    """

    def __init__(self, bodies, *, substeps: int = 1, pose_source: str = "fresh") -> None:
        self.bodies = tuple(sorted({int(b) for b in bodies if int(b) >= 0}))
        self.substeps = max(1, int(substeps))
        self.pose_source = str(pose_source)
        self.pipeline: Any = None
        self.extra_states: tuple[Any, ...] = ()
        self._prev: dict[int, np.ndarray] = {}
        self._teleport = True
        self._plan: _Drive | None = None

    # ------------------------------------------------------------- wiring
    def attach_pipeline(self, pipeline: Any) -> None:
        """Hand the rig the pipeline whose states it writes. Idempotent."""
        self.pipeline = pipeline

    def attach_states(self, states) -> None:
        """Pipeline-less wiring -- the repro runner's states, both of them."""
        self.extra_states = tuple(states)

    def states(self, state: Any) -> tuple[Any, ...]:
        """Every state the write-back must reach.

        Both halves of the double buffer when there is one: the tick runs in
        the eager ``after`` phase, outside the captured graph, so writing only
        one leaves the swap free to resurrect a stale copy next step.
        """
        if self.pipeline is not None:
            return (self.pipeline.state_0, self.pipeline.state_1)
        if self.extra_states:
            return self.extra_states
        return (state,)

    # -------------------------------------------------------------- teleport
    @property
    def teleport(self) -> bool:
        """Whether this tick is a jump rather than a sweep.

        True for the first tick and the one after a reset, where the previous
        pose is meaningless: interpolating from it would sweep a mirror across
        the scene and through anything in the way.
        """
        return self._teleport

    def mark_teleport(self) -> None:
        """The next tick jumps. What a reset calls."""
        self._teleport = True

    # ------------------------------------------------------------ pose feed
    def body_poses(self, state: Any, bodies=None) -> dict[int, np.ndarray]:
        """World pose per mirrored body -- or per one of ``bodies`` -- by the configured source."""
        bodies = self.bodies if bodies is None else tuple(int(b) for b in bodies)
        if not bodies:
            return {}
        pipeline = self.pipeline
        if self.pose_source == "snapshot" and pipeline is not None and not getattr(pipeline, "settling", False):
            snapshot = getattr(pipeline, "snapshot", None)
            body_q = getattr(snapshot, "body_q", None) if snapshot is not None else None
            if body_q is not None and len(body_q):
                return {b: np.asarray(body_q[b], dtype=np.float64) for b in bodies}
        body_q = state.body_q.numpy()
        return {b: np.asarray(body_q[b], dtype=np.float64) for b in bodies}

    def substep_dt(self, dt: float) -> float:
        """One engine step's worth of the control period: :func:`engine_dt` of this rig's substeps."""
        return engine_dt(dt, self.substeps)

    def substeps_of(self, mirrors, targets: dict[int, np.ndarray]) -> Iterator[tuple[int, list]]:
        """Yield ``(index, [(mirror, world_pose), ...])`` per engine substep.

        A mirror with no body, or one whose body is not in ``targets``, is
        skipped: it is world-fixed and was posed once at build.

        The arithmetic is done for the whole mirror set at once, one array
        operation per substep rather than two per mirror per substep. That is
        the same numbers -- the batched forms in :mod:`.pose` are the scalar
        ones with a leading axis, checked against each other in
        ``tests/test_pose_batched.py`` -- and it matters because the count is
        large: a three-world surface-preparation scene mirrors 2808 shapes, so the
        per-mirror form makes 11232 microsecond-scale numpy calls a control
        step, and the loop's own overhead comes to dominate the work in it.

        What is deliberately still per mirror is the yielded list. A caller
        wants a mirror and its pose together, and the poses are rows of one
        array: zipping is a C-level walk, and a row is a view, so nothing is
        copied on the way out.

        The *layout* -- which mirrors are posed, and which body each rides --
        is held across ticks in a :class:`_Drive` and rebuilt only when the
        question changes. The poses are not held: they are read from ``targets``
        every tick, which is what makes a body that moved move its mirrors.
        """
        if self._teleport:
            self._prev = {b: np.asarray(p, dtype=np.float64).copy() for b, p in targets.items()}

        plan = self._plan
        if plan is None or plan.mirrors is not mirrors or plan.keys != targets.keys():
            plan = self._plan = _Drive.build(mirrors, targets)
        if not plan.kept:
            for sub in range(self.substeps):
                yield sub, []
            return

        prev = np.asarray([self._prev.get(b, targets[b]) for b in plan.bodies], dtype=np.float64)
        goal = np.asarray([targets[b] for b in plan.bodies], dtype=np.float64)
        for sub in range(self.substeps):
            t = (sub + 1.0) / self.substeps
            here = lerp_poses(prev, goal, t)
            yield sub, list(zip(plan.kept, compose_many(here[plan.rows], plan.local), strict=True))

    def commit(self, targets: dict[int, np.ndarray]) -> None:
        """Close the tick: this step's poses become the next one's previous."""
        self._teleport = False
        self._prev = {b: np.asarray(p, dtype=np.float64).copy() for b, p in targets.items()}

    # --------------------------------------------------------- particle sink
    def write_particles(
        self,
        state: Any,
        start: int,
        count: int,
        positions: np.ndarray,
        dt: float,
        prev: np.ndarray,
    ) -> np.ndarray:
        """One actor's positions into ``particle_q``/``particle_qd``.

        Velocity is finite-differenced against ``prev`` rather than read from
        the engine: the engines this serves either expose no per-node velocity
        or expose one that is not the deformable's under their own coupler.
        Returns the positions, to be held as the next tick's ``prev``.
        """
        q_new = np.ascontiguousarray(np.asarray(positions).reshape(-1, 3), dtype=prev.dtype)
        inv_dt = 1.0 / float(dt) if dt > 0.0 else 0.0
        qd = np.ascontiguousarray((q_new - prev) * inv_dt, dtype=np.float32)
        q32 = np.ascontiguousarray(q_new, dtype=np.float32)
        for target in self.states(state):
            target.particle_q[start : start + count].assign(q32)
            target.particle_qd[start : start + count].assign(qd)
        return q_new
````

## robosimstudio/engines/feedback.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Contact wrenches out of a foreign engine, shaped, and fed into ``body_f``.

Two halves of one seam, and both are engine-neutral on purpose.

:class:`WrenchAccumulator` is the host half: reactions arrive one at a time, in
whatever form the engine reports them, and leave as a single ``[n_bodies, 6]``
array in Newton's convention -- linear force at the body's centre of mass,
torque beside it, both world frame. Two engines report two different things and
this is where the difference stops: SuperDex exposes a per-actor-pair *contact
force* and nothing else, so it contributes a force at a point and the moment arm
is computed here; Genesis's IPC coupler exposes a constraint reaction that is
already a force **and a pure couple**, so it contributes both and only the arm
of the force is added. One ``add`` covers each, and neither engine keeps its own
copy of the centre-of-mass bookkeeping.

:class:`WrenchFeed` is the device half: one persistent ``wp.array`` the host
rewrites each tick and one kernel that adds it into ``body_f``, launched
unconditionally so it may live inside the captured graph. That is the standard
flag-array pattern for feeding a capture -- a host-side ``if`` around a launch
works eagerly and then silently does nothing once captured.

**The shaping is load bearing, not taste**, and the argument is worth keeping
where the code is. A foreign engine's reaction at first contact is stiff, and
the composer applies it as a zero-order hold across a whole control step's
substeps -- explicit Euler on a stiff spring, which launched a 63 g cube at
8 m/s the first time this ran without it. The EMA turns the spike into a ramp
without moving the resting equilibrium (a resting cube still feels exactly its
weight), and the cap bounds the impulse any single step can hand a light body.
"""

from __future__ import annotations

from typing import Any

import numpy as np
import warp as wp

from .pose import compose, quat_rotate

__all__ = ["WrenchAccumulator", "WrenchFeed"]


@wp.kernel
def _add_wrench(wrench: wp.array(dtype=wp.spatial_vector), body_f: wp.array(dtype=wp.spatial_vector)):
    i = wp.tid()
    body_f[i] = body_f[i] + wrench[i]


class WrenchAccumulator:
    """One control step's reactions, gathered and shaped for ``body_f``.

    Args:
        model: The finalized ``newton.Model``; read once for ``body_com`` and
            ``body_mass``, which the shaping needs and which do not change.
        alpha: EMA coefficient for a *rising* force. 1.0 disables the ramp.
        dv_max: The most velocity [m/s] one control step's wrench may add to a
            body. Scales the whole wrench, torque with it.
    """

    def __init__(self, model: Any, *, alpha: float = 0.35, dv_max: float = 0.5) -> None:
        count = int(getattr(model, "body_count", 0))
        self.alpha = float(alpha)
        self.dv_max = float(dv_max)
        self._com = model.body_com.numpy().copy() if count else np.zeros((0, 3))
        self._mass = model.body_mass.numpy().copy() if count else np.zeros(0)
        self._raw = np.zeros((count, 6), dtype=np.float64)
        self._ema = np.zeros((count, 6), dtype=np.float64)
        self._out = np.zeros((count, 6), dtype=np.float32)

    @property
    def ema(self) -> np.ndarray:
        """The filter's state. Read by tests; not for writing."""
        return self._ema

    def begin(self) -> None:
        """Start a control step: forget the reactions of the last one."""
        self._raw.fill(0.0)

    def add(
        self,
        body: int,
        force: np.ndarray,
        point: np.ndarray,
        body_pose: np.ndarray,
        torque: np.ndarray | None = None,
    ) -> None:
        """One reaction on one body, in world coordinates.

        Args:
            body: Index into the model's bodies.
            force: The force **on the body**. An engine that reports the force
                on the *deformable* negates before it gets here.
            point: Where the force acts, world frame.
            body_pose: The body's world pose ``[x, y, z, qx, qy, qz, qw]``,
                needed to place its centre of mass this step.
            torque: A pure couple, if the engine reports one. A couple has no
                reference point, so it is added as it stands.
        """
        force = np.asarray(force, dtype=np.float64)
        com = body_pose[:3] + quat_rotate(body_pose[3:7], self._com[body])
        self._raw[body, :3] += force
        self._raw[body, 3:] += np.cross(np.asarray(point, dtype=np.float64)[:3] - com, force)
        if torque is not None:
            self._raw[body, 3:] += np.asarray(torque, dtype=np.float64)

    def add_at_shape(self, body: int, force: np.ndarray, body_pose: np.ndarray, local: np.ndarray, **kw) -> None:
        """:meth:`add`, for a reaction reported at a *body-local* frame."""
        self.add(body, force, compose(body_pose, local)[:3], body_pose, **kw)

    def shape(self, dt: float) -> np.ndarray:
        """This step's accumulated reactions, filtered and capped.

        Returns the internal ``[n_bodies, 6]`` float32 buffer -- stable across
        calls, so a :class:`WrenchFeed` bound to it once keeps working.
        """
        raw, ema = self._raw, self._ema
        # Asymmetric on purpose: a rising force ramps in (the anti-launch half),
        # and a force that has dropped -- above all, to zero on separation --
        # lands immediately. A symmetric filter kept pushing a body for three
        # steps after the surfaces had parted, which is how a resting cube
        # turned into a bouncing one.
        rising = np.linalg.norm(raw[:, :3], axis=1) >= np.linalg.norm(ema[:, :3], axis=1)
        ema[rising] += self.alpha * (raw[rising] - ema[rising])
        ema[~rising] = raw[~rising]
        shaped = ema.copy()
        if dt > 0.0:
            magnitude = np.linalg.norm(shaped[:, :3], axis=1)
            limit = self._mass * (self.dv_max / float(dt))
            over = magnitude > np.maximum(limit, 1.0e-12)
            if np.any(over):
                scale = np.ones_like(magnitude)
                scale[over] = limit[over] / magnitude[over]
                shaped *= scale[:, None]
        self._out[:] = shaped.astype(np.float32)
        return self._out

    def zero(self) -> np.ndarray:
        """Forget everything, filter state included. What a reset wants."""
        self._raw.fill(0.0)
        self._ema.fill(0.0)
        self._out.fill(0.0)
        return self._out


class WrenchFeed:
    """The device side: a persistent wrench array, added into ``body_f``."""

    def __init__(self, model: Any) -> None:
        self.device = model.device
        self.array = wp.zeros(int(model.body_count), dtype=wp.spatial_vector, device=model.device)

    def assign(self, wrench: np.ndarray) -> None:
        """Copy a host ``[n_bodies, 6]`` float32 array onto the device."""
        self.array.assign(wrench)

    def stage(self, state: Any, dt: float) -> None:
        """Add the harvested wrenches into ``body_f``. The ``rigid_force`` stage.

        Launched unconditionally: the composer schedules this inside the
        captured graph, and a launch guarded on the host would run once
        eagerly and then never again.
        """
        del dt
        if state.body_f is None:
            return
        wp.launch(_add_wrench, dim=self.array.shape[0], inputs=[self.array, state.body_f], device=self.device)
````

## robosimstudio/engines/superdex/solver.py

````text
# SPDX-License-Identifier: Apache-2.0
"""The ``superdex`` backend class: a host-side engine in a solver's clothes."""

from __future__ import annotations

from typing import Any

from robosimstudio.engines.host import SolverHost

__all__ = ["SolverSuperdex"]


class SolverSuperdex(SolverHost):
    """The host island's solver for SuperDex: opens the bridge, inherits the rest.

    Args:
        model: The finalized Newton model.
        recipe: The manifest's host-island record -- see
            :class:`~robosimstudio.engines.superdex.bridge.SuperdexBridge`.
        substeps: SuperDex steps per control step.
        threads: Worker threads for the engine's one-per-process initialize.
        feedback: ``"auto"`` or ``"off"`` -- contact-wrench harvest for
            two-way mirrors.
        feedback_alpha: EMA coefficient for a *rising* harvested force; 1.0
            disables the ramp. See
            :class:`~robosimstudio.engines.feedback.WrenchAccumulator`.
        feedback_dv_max: The most velocity [m/s] one control step's harvested
            wrench may add to a body; scales the whole wrench, torque with it.
        pose_source: ``"fresh"`` reads this step's poses off the state (zero
            coupling lag, one extra small device read); ``"snapshot"`` reads
            the free batched host copy, one control period stale.
        shell_young: Shell (cloth) elastic modulus [Pa], island-wide, for
            entities the bridge builds as shell actors.
        shell_poisson: Shell Poisson ratio, island-wide.
        mirror_smoothing: ``penalty_smoothing_half_distance`` [m] on the
            mirrored colliders -- the knob that decides whether a gripper
            presses a deformable or sinks into it. See
            :func:`~robosimstudio.engines.superdex.mirror.build_mirror_actors`.
        mirror_friction_falloff: ``friction_falloff_vel`` [m/s] on the
            mirrors. It reaches no contact: against a static collider, which
            every mirror is, SuperDex uses the deformable's own falloff, so a
            hold is set by ``friction_falloff`` on the deformable. See
            :func:`~robosimstudio.engines.superdex.mirror.build_mirror_actors`.
        mirror_threshold: ``penalty_threshold_default`` [m] on the mirrors, or
            ``None`` for the engine's 1 mm -- the stand-off at which a pad starts
            pushing, which the collider's side of a pair decides.
        mirror_padding: ``penalty_threshold_extra_padding`` [m] on the
            mirrors: a stand-off the engine adds against a point-cloud actor
            only. A rod built without its skin rests with its axis on a mirror;
            padding by about its radius lifts it onto its surface.
        mirror_exact_boxes: Mirror boxes as the engine's exact ``BOX`` collider.
        linear_solver: The engine's linear solver by name (``"cg"``,
            ``"minres"``, ``"ldlt"``...), or ``None`` for its own choice.
        preconditioner: Its preconditioner by name (``"block_jacobi"``...).
        newton_iterations: Non-linear iterations per engine step, or ``None``
            for the engine's 4.
        linear_iterations: A cap on the linear solver's iterations per Newton
            step, or ``None`` for the engine's own (it ran 1000 per contact).
    """

    def open(
        self,
        model: Any,
        recipe: dict,
        *,
        substeps: int = 1,
        threads: int = -1,
        feedback: str = "auto",
        feedback_alpha: float = 0.35,
        feedback_dv_max: float = 0.5,
        pose_source: str = "fresh",
        shell_young: float = 1.0e5,
        shell_poisson: float = 0.3,
        mirror_smoothing: float = 5.0e-4,
        mirror_friction_falloff: float = 1.0e-2,
        mirror_threshold: float | None = None,
        mirror_padding: float = 0.0,
        mirror_exact_boxes: bool = True,
        linear_solver: str | None = None,
        preconditioner: str | None = None,
        newton_iterations: int | None = None,
        linear_iterations: int | None = None,
    ) -> Any:
        """The SuperDex bridge, with the island-wide scalars folded into the recipe.

        They ride the recipe rather than an argument because that is what a
        repro bundle carries: the manifest records the recipe, and a twin
        rebuilds the same actors from it and the model alone.
        """
        from .bridge import SuperdexBridge

        return SuperdexBridge(
            model,
            {
                **recipe,
                "feedback_alpha": float(feedback_alpha),
                "feedback_dv_max": float(feedback_dv_max),
                "shell_young": float(shell_young),
                "shell_poisson": float(shell_poisson),
            },
            substeps=int(substeps),
            threads=int(threads),
            feedback=str(feedback),
            pose_source=str(pose_source),
            mirror_smoothing=float(mirror_smoothing),
            mirror_friction_falloff=float(mirror_friction_falloff),
            mirror_threshold=None if mirror_threshold is None else float(mirror_threshold),
            mirror_padding=float(mirror_padding),
            mirror_exact_boxes=bool(mirror_exact_boxes),
            linear_solver=linear_solver,
            preconditioner=preconditioner,
            newton_iterations=newton_iterations,
            linear_iterations=linear_iterations,
        )
````

## robosimstudio/engines/superdex/bridge.py

````text
# SPDX-License-Identifier: Apache-2.0
"""The co-simulation bridge: one SuperDex scene per world of one host island.

What happens per control step, in order, all outside the CUDA graph:

1. This control step's Newton body poses are read for every mirrored shape --
   directly off the state by default, since the tick runs after the substeps
   and zero-lag coupling is worth one small device read; ``pose_source=
   "snapshot"`` trades a control period of staleness for the free batched
   host copy instead.
2. The mirrors are driven through those poses across ``substeps`` internal
   SuperDex steps, linearly interpolated -- the engine derives surface
   velocity from consecutive transforms, so interpolation is what friction
   sees as a sweep rather than a teleport. A pin that rides a body
   (:meth:`SuperdexBridge.ride`) is swept with them.
3. The deformed vertex positions are read back zero-copy, velocities are
   finite-differenced (SuperDex exposes no per-node velocity getter), and both
   Newton states' ``particle_q``/``particle_qd`` ranges are assigned -- both,
   so the substep double-buffer swap can never resurrect a stale copy.

The bridge is built from the finalized ``newton.Model`` plus a JSON-able
recipe (the manifest's host-island record), never from specs or entities --
the same construction the repro runner performs, so live and replayed scenes
share one build path.

A replicated model (``recipe["num_worlds"] > 1``) gets **one scene per world**,
each solved on its own: world ``w``'s actors, mirrors, pins and rest state all
live in ``scenes[w]``, and the tick steps every scene in turn. This is what
keeps a wave's physics the serial physics -- see :class:`SuperdexBridge`.
"""

from __future__ import annotations

import logging
import warnings
from concurrent.futures import ThreadPoolExecutor
from itertools import repeat
from pathlib import Path
from typing import Any, ClassVar

import numpy as np

from robosimstudio.core.math import quat_to_mat
from robosimstudio.engines.cosim import CosimRig
from robosimstudio.engines.feedback import WrenchAccumulator
from robosimstudio.engines.geometry import actor_builder, actor_geometry, builders_for, register_actor_builder
from robosimstudio.engines.pose import lerp_pose

from .mirror import build_mirror_actors

__all__ = ["SuperdexBridge", "ensure_initialized"]

log = logging.getLogger(__name__)

_ENGINE = {"threads": None}
"""Process-global engine state: the worker-thread count ``initialize`` ran with."""

_FOREIGN = -2
"""``contact_points``' body index for a side this island cannot name."""

_CONTACT_VECTORS = ("pos", "normal", "force", "v_soft", "v_other")


def _no_contacts(n: int = 0) -> dict[str, np.ndarray]:
    """The columns :meth:`SuperdexBridge.contact_points` returns, uninitialised."""
    out: dict[str, np.ndarray] = {name: np.empty((n, 3), dtype=np.float64) for name in _CONTACT_VECTORS}
    out["area"] = np.empty(n, dtype=np.float64)
    out["gap"] = np.empty(n, dtype=np.float64)
    out["body"] = np.empty(n, dtype=np.int64)
    return out


def _handle_value(actor) -> int:
    """An actor's engine handle as a plain int, the way ``pin_nodes`` takes it."""
    get_handle = getattr(actor, "get_handle", None)
    handle = get_handle() if callable(get_handle) else actor
    return int(handle.value)


def ensure_initialized(threads: int = -1):
    """Import and initialize SuperDex once per process; return the module.

    ``initialize``/``shutdown`` are process-global and thread-affine, and a
    shutdown from the wrong thread aborts -- so nothing here ever calls
    ``shutdown``; the process exit releases the engine. The first caller's
    thread count wins and later differing requests are logged rather than
    honoured, which is the honest reading of a process-global knob.

    Raises:
        ImportError: Naming the ``[superdex]`` extra when the wheel is absent.
    """
    try:
        import superdex.physics as physics
    except ImportError as error:
        raise ImportError(
            "the 'superdex' backend needs the superdex-physics wheel: install the [superdex] extra "
            "(uv sync --extra superdex). It ships for Python 3.12 only."
        ) from error
    if not physics.is_initialized():
        physics.initialize(num_worker_threads=int(threads))
        _ENGINE["threads"] = int(threads)

        def _forward(channel, tag, message, code):
            del code
            level = logging.WARNING if "WARN" in str(channel).upper() else logging.ERROR
            if "INFO" in str(channel).upper() or "VERBOSE" in str(channel).upper():
                level = logging.DEBUG
            log.log(level, "superdex[%s]: %s", tag, message)

        physics.set_log_callback(_forward)
    elif _ENGINE["threads"] is not None and int(threads) != _ENGINE["threads"]:
        log.debug("superdex already initialized with %d worker threads; ignoring %d", _ENGINE["threads"], threads)
    return physics


def _root_matrix(actor) -> tuple[np.ndarray, np.ndarray]:
    """``(R, t)`` of an actor's root transform: local -> its scene's world."""
    root = actor.get_root_transform()
    x, y, z, w = (float(v) for v in root.rotation.tolist())
    rot = np.array(
        [
            [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
            [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
            [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
        ]
    )
    return rot, np.asarray(list(root.translation), float)


def _root_reader(actor):
    """Node positions in the scene's world frame for an actor whose root moves (a skinned soft body)."""

    def read() -> np.ndarray:
        rot, t = _root_matrix(actor)
        local = np.asarray(actor.get_node_positions_local(), dtype=np.float64).reshape(-1, 3)
        return local @ rot.T + t

    return read


def _contact_params(physics, params: dict, *, penalty: float, friction: float, padding: float) -> Any:
    """One actor's SuperDex ``ContactParams`` from its host params.

    The three figures every builder always stated, plus the three the engine's
    defaults were silently deciding. Each of those is ``None`` unless the
    entity states it, and ``None`` keeps the engine's own value, so a spec that
    says nothing builds exactly what it built before.

    * ``contact_threshold`` -- ``penalty_threshold_default`` [m], the distance
      at which the penalty *starts*. **The collider's value governs the pair**
      (measured: a free block on a static box rests 0.98 mm up with the
      threshold set on the block, 0.000 mm with it set on the box). The
      engine's 1 mm is a stand-off, and a connector with 0.15 mm of clearance
      in its jack is pressed by every wall at once -- 250 N of phantom grip.
    * ``contact_smoothing`` -- ``penalty_smoothing_half_distance`` [m].
    * ``friction_falloff`` -- ``friction_falloff_vel`` [m/s]: below it friction
      is proportional to slip speed, so there is no static friction at all.
    """
    contact = physics.ContactParams(
        penalty_coefficient=float(params.get("contact_penalty", penalty)),
        coulomb_friction_coefficient=float(params.get("friction", friction)),
        penalty_threshold_extra_padding=float(params.get("contact_padding", padding)),
    )
    for key, attr in (
        ("contact_threshold", "penalty_threshold_default"),
        ("contact_smoothing", "penalty_smoothing_half_distance"),
        ("friction_falloff", "friction_falloff_vel"),
    ):
        value = params.get(key)
        if value is not None:
            setattr(contact, attr, float(value))
    return contact


WELD_COINCIDENCE = 1.0e-3
"""How close a node-to-node weld's two nodes must be at rest, as a fraction of the local node spacing.

The engine's deformable-to-deformable constraint has no rest offset: a gap at
rest is closed by the first step. Measured on a cable joined into a 15 x 15 x
10 mm lattice: the joined nodes leave at about 1.1 m/s per millimetre of gap
and the body is dragged about a third of it, so the 8.7-16.6 mm gaps a
nearest-node join used to accept launched the body's nodes at 21 m/s and moved
it 34 mm. Nodes built at one point sit 0.06 um apart (float32 rounding near
1 m), and a thousandth of the spacing -- 10 um on that lattice, 1 um on a 1 mm
mesh -- admits that rounding while capping the launch near 0.01 m/s. Under a
0.06 mm spacing it no longer would, so :data:`WELD_FLOAT32_ULPS` floors it.
"""

WELD_FLOAT32_ULPS = 4
"""The floor under :data:`WELD_COINCIDENCE`: float32 units in the last place of a pair's largest coordinate.

The rest layouts are float32 (Newton's ``particle_q``), so two nodes built at
one point can differ by the rounding of each coordinate -- at most one ULP per
axis, sqrt(3) ULPs across three. Measured on that joined cable and lattice at
eight placements (z up to 2.25 m, x and y off the bench centre): every joined
pair either equal or one ULP apart on one axis (0.0596 um at x = 0.6 m). Four
ULPs is 0.24 um at 0.95 m and 0.48 um past 1 m -- a launch of about 0.5 mm/s
at the 1.1 m/s per millimetre above -- where a purely relative tolerance
would refuse those coincident nodes on any mesh finer than 0.06 mm.
"""


class SuperdexBridge:
    """One SuperDex scene, its actors, and the per-control-step tick.

    Args:
        model: The finalized Newton model -- rest positions, tets, materials,
            shape geometry all come from here.
        recipe: The manifest's host-island record: ``island`` (name),
            ``gravity`` [3], ``actors`` (per deformable entity:
            ``{"name", "kind", "particle_start", "particle_count", "params"}``)
            and ``mirrors`` (per Newton shape:
            ``{"shape", "body", "two_way"}``; ``body: -1`` is world-fixed).
        substeps: SuperDex steps per control step.
        threads: Worker threads for ``initialize`` -- first caller wins.
        feedback: ``"auto"`` harvests contact wrenches for two-way mirrors;
            ``"off"`` never does.
        pose_source: ``"fresh"`` (default) or ``"snapshot"`` -- see the module
            docstring's step 1.
        mirror_friction_falloff: ``friction_falloff_vel`` [m/s] for every
            mirror -- the speed at which regularised friction reaches its
            Coulomb cap, below which a held object creeps. It reaches no
            contact while the mirrors are static: SuperDex then uses the
            deformable's falloff. See
            :func:`~robosimstudio.engines.superdex.mirror.build_mirror_actors`.
        mirror_smoothing: ``penalty_smoothing_half_distance`` [m] for every
            mirrored collider -- see :func:`build_mirror_actors`. The engine's
            own 5 mm lets a fingertip sit 2 mm inside a foam block; this
            defaults to the 0.5 mm at which it rests on the surface instead.
        mirror_threshold: ``penalty_threshold_default`` [m] for every mirror,
            or ``None`` for the engine's 1 mm stand-off. See
            :func:`build_mirror_actors`.
        mirror_padding: ``penalty_threshold_extra_padding`` [m] for every
            mirror, which the engine adds only against a point-cloud actor (a
            rod). 0 keeps the engine's own. See :func:`build_mirror_actors`.
        mirror_exact_boxes: Mirror boxes as exact ``BOX`` colliders, not SDFs.

    **Actor builders.** Each recipe actor is built by whatever
    :func:`~robosimstudio.engines.geometry.register_actor_builder` holds for
    ``("superdex", kind)``, called as ``build(bridge, record, particle_q,
    tet_indices, tet_materials)``. This bundle registers ``tet`` and ``shell``
    (:attr:`BUILDERS`); a domain pack that ships another kind registers its own
    from the pack, and the lookup imports the packs before it refuses a kind. A
    builder returns the actor's entry -- ``name``, ``actor``, ``read`` (a
    callable giving the nodes' world positions ``[count, 3]``), ``start``,
    ``count`` and ``prev`` (the rest positions, in the engine's precision) --
    and may use what the bridge offers every builder: :attr:`physics`,
    :attr:`model`, :attr:`recipe`, :meth:`scene_of`, :meth:`actor_root`,
    :meth:`contact_params`, and :attr:`actors`, the entries built before it
    (each stamped with its ``entity`` and ``world``).

    **One scene per world.** A replicated model superimposes its worlds at the
    origin, which is right for Newton -- its broadphase pairs within a world --
    and impossible in one host scene, which has no world axis to pair within:
    sixteen sponges and sixteen grippers at the same coordinates are one pile.
    The first cut laid the worlds out ten metres apart in a single scene, and
    that had a subtler cost than the offsets it needed on every read and write:
    **one scene is one Newton solve**, with one iteration cap
    (``non_linear_solver.max_iter``, 4 by default and ``STOPPED`` at it on
    every contact step) and one line search shared by every world's contacts.
    Per-world accuracy therefore fell with the world count -- the same recorded
    grasp of a 9 g sponge, mirrors at 1 mm/s friction falloff, held 4/4 at four
    worlds, 8/8 at eight and 3/12 at twelve; raising the cap to 48 held 12/12 at
    36 ms per world-step, slower than the serial 28 ms. Each world now has its
    own scene and therefore serial's own four iterations, so what a wave
    measures about a grasp is what the serial env measures, and a world's
    divergence is that world's alone. The cost is ``W`` solves per control step
    instead of one larger one, and they run side by side (see ``_lanes``):
    twelve worlds of a surface-preparation scene step in 110 ms against the shared scene's
    113 ms, and 320 ms with the lanes stepped one after another. The engine
    keeps every scene's state resident and hands out handles that are unique
    across scenes.
    """

    def __init__(
        self,
        model: Any,
        recipe: dict,
        *,
        substeps: int = 1,
        threads: int = -1,
        feedback: str = "auto",
        pose_source: str = "fresh",
        mirror_smoothing: float = 5.0e-4,
        mirror_friction_falloff: float = 1.0e-2,
        mirror_threshold: float | None = None,
        mirror_padding: float = 0.0,
        mirror_exact_boxes: bool = True,
        linear_solver: str | None = None,
        preconditioner: str | None = None,
        newton_iterations: int | None = None,
        linear_iterations: int | None = None,
    ) -> None:
        physics = ensure_initialized(threads)
        self.physics = physics
        self.model = model
        self.recipe = recipe
        self.substeps = max(1, int(substeps))
        self.feedback = str(feedback)
        self.pose_source = str(pose_source)
        self.mirror_smoothing = float(mirror_smoothing)
        self.mirror_friction_falloff = float(mirror_friction_falloff)
        self.mirror_threshold = None if mirror_threshold is None else float(mirror_threshold)
        self.mirror_padding = float(mirror_padding)
        self.mirror_exact_boxes = bool(mirror_exact_boxes)
        self.num_worlds = max(1, int(recipe.get("num_worlds", 1)))
        self.rig: CosimRig | None = None  # built once the mirrors are known
        self._diverged_logged: set[int] = set()
        self._diverged_worlds: list[bool] = [False] * self.num_worlds
        self._mirror_bodies: dict[int, int] | None = None  # actor handle -> newton body
        island = recipe.get("island", "soft")
        gravity = [float(v) for v in recipe.get("gravity", (0.0, 0.0, -9.81))]
        self.scenes: list[Any] = []
        """One engine scene per world, indexed by world. See the class docstring."""
        for world in range(self.num_worlds):
            scene = physics.create_scene(f"rss:{island}" if self.num_worlds == 1 else f"rss:{island}#w{world}")
            scene.set_gravity(gravity)
            self._tune_solver(scene, linear_solver, preconditioner, newton_iterations, linear_iterations)
            self.scenes.append(scene)
        # One lane per world at tick time: a world's mirrors are posed and its
        # scene stepped on a thread of its own. Both calls release the GIL, and
        # the engine's solves overlap -- twelve surface-preparation scenes step in
        # 22 ms side by side against 106 ms one after another (each scene's
        # solve is small and leaves the engine's own worker pool mostly idle).
        self._lanes = (
            ThreadPoolExecutor(max_workers=self.num_worlds, thread_name_prefix="superdex")
            if self.num_worlds > 1
            else None
        )
        self.actors: list[dict] = []
        self._actors_per_world: dict[int, int] = {}
        for record in recipe.get("actors", ()):
            world = int(record.get("world", 0))
            self._actors_per_world[world] = self._actors_per_world.get(world, 0) + 1
        particle_q = model.particle_q.numpy()
        tet_indices = model.tet_indices.numpy().reshape(-1, 4) if model.tet_count else np.zeros((0, 4), np.int64)
        tet_materials = model.tet_materials.numpy() if model.tet_count else np.zeros((0, 3))
        for record in recipe.get("actors", ()):
            kind = str(record.get("kind", "tet"))
            build = actor_builder("superdex", kind)
            if build is None:
                raise NotImplementedError(
                    f"superdex actor kind {kind!r} for {record.get('name')!r} is not built here; "
                    f"this engine builds {builders_for('superdex')}. "
                    "Reading a kind off the model is engines.geometry.register_actor_kind; building it on "
                    "this engine is engines.geometry.register_actor_builder('superdex', kind, build)."
                )
            entry = build(self, record, particle_q, tet_indices, tet_materials)
            # Stamped here rather than in each builder: which entity an actor is
            # and which world it belongs to are properties of the *record*, and
            # every builder agreeing to copy two fields is that many chances to
            # disagree. ``name`` stays whatever the builder made it -- it is what
            # the engine shows in a log -- and the lookup below uses these.
            entry.setdefault("entity", str(record.get("entity", record.get("name", ""))))
            entry["world"] = int(record.get("world", 0))
            self.actors.append(entry)

        self.welds: list[Any] = []
        """The engine constraints that join one actor's nodes to another's -- see :meth:`_build_welds`."""
        self._build_welds()

        # Which deformables a mirror can possibly touch. A replicated model's
        # worlds are separate scenes, so a collider in world 3 against the
        # sponge in world 7 is not even a pair the engine knows, and the wrench
        # harvest below would otherwise ask it ``mirrors x actors`` times a step
        # -- at twelve worlds, 33 thousand engine calls a step of which eleven
        # twelfths are known zero.
        self.actors_by_world: dict[int, list[dict]] = {}
        for entry in self.actors:
            self.actors_by_world.setdefault(int(entry["world"]), []).append(entry)

        # Per-sample contact records, for a caller that needs to know WHERE a
        # deformable is being pressed and not only how hard. Registered here
        # rather than on demand because a query must be live BEFORE the step
        # that fills it: a lazy first call would read a step that computed
        # none, which is a zero that looks like an answer. Measured free --
        # 1.0-1.5 ms/step with it and 1.6 ms without, inside one scene's own
        # run-to-run spread.
        for entry in self.actors:
            actor = entry["actor"]
            if actor.is_query_supported(physics.QueryType.CONTACT_POINTS):
                actor.register_query(physics.QueryType.CONTACT_POINTS)
                entry["contacts"] = actor.get_contact_points_world

        self.mirrors = build_mirror_actors(
            physics,
            self.scenes,
            model,
            shapes=list(recipe.get("mirrors", ())),
            contact_smoothing=self.mirror_smoothing,
            friction_falloff=self.mirror_friction_falloff,
            contact_threshold=self.mirror_threshold,
            contact_padding=self.mirror_padding,
            exact_boxes=self.mirror_exact_boxes,
        )
        self._moving_bodies = sorted({m.body for m in self.mirrors if m.moving})
        self.rig = CosimRig(self._moving_bodies, substeps=self.substeps, pose_source=self.pose_source)
        self._rest_state: list | None = None  # one captured state per scene
        self._pins: dict[int, list] = {}
        self._pin_world: dict[int, int] = {}
        """Which world each pin was made for, so re-aiming one needs no argument."""
        self._riders: dict[int, tuple[int, np.ndarray]] = {}
        """Pin -> ``(Newton body, its nodes' targets [n, 3] in that body's frame)``: the pins the tick aims."""
        self._rider_prev: dict[int, np.ndarray] = {}
        """Each ridden body's pose at the end of the last tick: where this tick's sweep starts."""
        self._pin_seq = 0

        # Contact-wrench feedback: for every two-way *moving* mirror, the force
        # the deformables exert on it is harvested per pair and handed back as
        # a Newton ``body_f`` wrench -- (force, torque) about the body's COM,
        # world frame, applied by the solver's rigid_force stage across the
        # NEXT control step's substeps. A zero-order hold with one step of lag,
        # which is what an eager-phase coupling can honestly offer.
        self.feedback_enabled = (
            self.feedback != "off"
            and any(m.two_way and m.moving for m in self.mirrors)
            and int(getattr(model, "body_count", 0)) > 0
        )
        self.apply_wrenches = None
        """Set by the owning solver: ``(wrench[n_bodies, 6] float32) -> None``."""
        if self.feedback_enabled:
            for entry in self.actors:
                entry["actor"].register_query(physics.QueryType.TOTAL_CONTACT_FORCE)
            self._acc = WrenchAccumulator(
                model,
                alpha=float(recipe.get("feedback_alpha", 0.35)),
                dv_max=float(recipe.get("feedback_dv_max", 0.5)),
            )
            # Transient shaping, and it is load bearing, not taste: the penalty
            # force at first contact is stiff (a millimetre of overlap across a
            # palm-sized face is tens of newtons) and a zero-order hold applies
            # it for a whole control step after the surfaces may already have
            # separated -- explicit Euler on a stiff spring, which launched a
            # 63 g cube at 8 m/s in the first integration test.
            self.feedback_alpha = self._acc.alpha
            self.feedback_dv_max = self._acc.dv_max

    # ------------------------------------------------------------------ build
    def _tune_solver(
        self,
        scene: Any,
        linear: str | None,
        preconditioner: str | None,
        iterations: int | None,
        linear_iterations: int | None = None,
    ) -> None:
        """The engine's linear solve, by name, or its own choice where ``None``.

        The engine picks ``AUTO`` with a per-actor preconditioner, which is
        right for foam. Against stiff polymer (E ~ 1e8-1e9) under 1e10 penalties
        that choice runs its 1000-iteration cap on every Newton step: measured
        on a scene of three clips, a plug and a cable, 419 ms per control step
        at the default, 145 ms at ``CG`` + ``BLOCK_JACOBI``, 179 ms at
        ``MINRES``, and 8.1 s at the sparse direct ``LDLT``.
        """
        if linear is None and preconditioner is None and iterations is None and linear_iterations is None:
            return
        params = scene.get_solver_params()
        if linear is not None:
            params.linear_solver.solver_type = getattr(self.physics.LinearSolverType, str(linear).upper())
        if preconditioner is not None:
            params.linear_solver.preconditioner_type = getattr(
                self.physics.PreconditionerType, str(preconditioner).upper()
            )
        if iterations is not None:
            params.non_linear_solver.max_iter = int(iterations)
        if linear_iterations is not None:
            # A cap, not a tolerance: an inexact Newton step is still a Newton
            # step, and an uncapped CG spent 1000 iterations on every contact.
            params.linear_solver.max_iter = int(linear_iterations)
            # Hitting a cap that was set on purpose is not news: the engine
            # otherwise logs it on every Newton step, thousands of lines a second.
            params.linear_solver.verbosity = self.physics.VerbosityLevel.ERROR
            params.non_linear_solver.verbosity = self.physics.VerbosityLevel.ERROR
        scene.set_solver_params(params)

    def _shares_world(self, record: dict) -> bool:
        """Whether another deformable actor lives in this record's world.

        What ``collider="auto"`` asks: a soft body alone with the mirrors needs
        no collider of its own (its samples find theirs), and an SDF mapped
        through the deformation is not free; a soft body sharing its scene with
        a cable or another body is one those can only touch if it has one.
        """
        return self._actors_per_world.get(int(record.get("world", 0)), 0) > 1

    def _kept_out(self, record: dict) -> list[str]:
        """The other deformables in this record's world that pass through it, a body on a rigid core.

        Such a body has no collider, so it touches another deformable only
        where its own surface samples meet that one's collider, and only a soft
        body's SDF is one they meet: measured, a 60 x 60 x 30 mm block on a
        rigid core held a soft brick with an SDF (29.63 mm up, 29.82 mm on the
        plain block) and let a cable, a sheet and a brick with no collider
        through to 3.65, 0.94 and 0.83 mm (32.15, 29.08 and 29.71 mm on the
        plain block). So every actor of that world but a soft body that will
        have an SDF -- stated, or ``"auto"`` off a rigid core, which resolves to
        one here -- and but one welded to it with contact switched off, which
        the weld keeps apart anyway (a cable moulded into a plug). A kind
        another package builds is named: its collider is not known here.
        """

        def name(r: dict) -> str:
            return str(r.get("entity", r.get("name", "")))

        def welded(a: dict, b: dict) -> bool:
            welds = a.get("params", {}).get("welds", ())
            return any(str(w.get("to")) == name(b) and not bool(w.get("contact", False)) for w in welds)

        def has_sdf(r: dict) -> bool:
            params = r.get("params", {})
            collider = str(params.get("collider", "auto"))
            core = np.asarray(params.get("rigid_core", ())).size > 0
            return str(r.get("kind", "tet")) == "tet" and not core and collider in ("sdf", "auto")

        world = int(record.get("world", 0))
        return [
            name(other)
            for other in self.recipe.get("actors", ())
            if int(other.get("world", 0)) == world
            and name(other) != name(record)
            and not has_sdf(other)
            and not welded(other, record)
            and not welded(record, other)
        ]

    def _entry(self, entity: str, world: int = 0) -> dict:
        for entry in self.actors:
            if entry.get("entity", entry["name"]) == entity and int(entry.get("world", 0)) == int(world):
                return entry
        raise KeyError(
            f"no superdex actor for entity {entity!r} in world {world}; has {[e.get('entity') for e in self.actors]}"
        )

    def _build_welds(self) -> None:
        """Join actors that an entity said are one piece: a cable moulded into its plug.

        Stated per actor as ``params["welds"]``, each ``{"to": entity, "nodes":
        [local], "stiffness", "damping", "contact"}``: every listed node of this
        actor is tied by a node-to-node constraint to the **nearest node of the
        other actor at rest**, and contact between the two is switched off --
        the welded run lies *inside* the other body, which would otherwise push
        it out with every sample. Built here, after every actor exists and
        before the rest state is captured, so a reset restores a composition
        that still has them.

        Nearest-at-rest is chosen here rather than by the engine's
        ``find_closest`` because that flag is refused unless the first actor is
        a soft body, and a cable is not.

        **Only coincident nodes are joined node to node.** That constraint has
        no rest offset, so each pair must already meet, within
        :data:`WELD_COINCIDENCE` of the local node spacing (and never less than
        :data:`WELD_FLOAT32_ULPS` of float32 rounding), and no two listed nodes
        may share a partner -- otherwise :meth:`_check_coincident` raises.
        A body on a rigid core takes the other branch, which keeps every node's
        rest offset to the core.
        """
        for entry in list(self.actors):
            record = next(
                (
                    r
                    for r in self.recipe.get("actors", ())
                    if str(r.get("entity", r.get("name"))) == entry.get("entity", entry["name"])
                    and int(r.get("world", 0)) == int(entry["world"])
                ),
                None,
            )
            if record is None:
                continue
            for weld in record.get("params", {}).get("welds", ()):
                other = self._entry(str(weld["to"]), int(entry["world"]))
                scene = self.scene_of(entry["world"])
                # The rest layouts, which every entry carries as ``prev``: a soft
                # actor's position query has nothing to answer before a step.
                mine = np.asarray(entry["prev"], dtype=np.float64).reshape(-1, 3)
                theirs = np.asarray(other["prev"], dtype=np.float64).reshape(-1, 3)
                nodes = np.asarray(weld.get("nodes", ()), dtype=np.int64)
                nearest = np.asarray(
                    [int(np.argmin(np.linalg.norm(theirs - mine[node], axis=1))) for node in nodes], dtype=np.int64
                )
                if "link" not in other:
                    self._check_coincident(entry, other, nodes, nearest, mine, theirs)
                for node, partner in zip(nodes, nearest, strict=True):
                    if "link" in other:
                        # A node-to-node constraint onto a skinned soft body --
                        # onto its core or off it -- silently switched off every
                        # contact the welded cable had: the fingers passed
                        # through it and it never left its rest pose (measured
                        # both ways). The weld goes to the rigid core's link.
                        self.welds.append(
                            scene.create_deformable_node_to_rigid_constraint(
                                stiffness=float(weld.get("stiffness", 1.0e5)),
                                damping=float(weld.get("damping", 1.0)),
                                saturation=-1.0,
                                deformable_node_index=int(node),
                                deformable_actor=entry["actor"].get_handle(),
                                rigid_actor=other["link"].get_handle(),
                                fix_to_deformable_pos=True,
                            )
                        )
                        continue
                    self.welds.append(
                        scene.create_deformable_node_to_deformable_node_constraint(
                            stiffness=float(weld.get("stiffness", 1.0e5)),
                            damping=float(weld.get("damping", 1.0)),
                            saturation=-1.0,
                            node_index_a=int(node),
                            node_index_b=int(partner),
                            actor_a=entry["actor"].get_handle(),
                            actor_b=other["actor"].get_handle(),
                        )
                    )
                if not bool(weld.get("contact", False)):
                    scene.enable_actor_contact_symmetric(
                        entry["actor"].get_handle(),
                        other["actor"].get_handle(),
                        False,
                        self.physics.IncludeNestedActors.NO,
                    )

    @staticmethod
    def _check_coincident(
        entry: dict, other: dict, nodes: np.ndarray, nearest: np.ndarray, mine: np.ndarray, theirs: np.ndarray
    ) -> None:
        """Refuse a node-to-node weld whose pairs do not already meet at rest.

        Raises:
            ValueError: Naming each pair's gap against its tolerance, and any
                partner node two listed nodes would share.
        """
        if not len(nodes):
            return
        from scipy.spatial import cKDTree  # a heavy import a registry scan must not pay for

        def spacing(points: np.ndarray, index: np.ndarray) -> np.ndarray:
            """Distance from each indexed node to the nearest other node of the same actor.

            A KD-tree, O(N) in memory: the dense (len(index), N, 3) difference
            this replaced peaked at 133 MB for 20 joined nodes on a 104k-node
            lattice (0.8 MB now). The second neighbour: the first is the node.
            """
            distance, _ = cKDTree(points).query(points[index], k=2)
            return distance[:, 1]

        gaps = np.linalg.norm(theirs[nearest] - mine[nodes], axis=1)
        relative = WELD_COINCIDENCE * np.minimum(spacing(mine, nodes), spacing(theirs, nearest))
        extent = np.maximum(np.abs(mine[nodes]).max(axis=1), np.abs(theirs[nearest]).max(axis=1))
        rounding = WELD_FLOAT32_ULPS * np.spacing(extent.astype(np.float32)).astype(np.float64)
        tolerance = np.maximum(relative, rounding)
        far = gaps > tolerance
        partners, counts = np.unique(nearest, return_counts=True)
        shared = partners[counts > 1]
        if not far.any() and not shared.size:
            return
        name, to = entry.get("entity", entry["name"]), other.get("entity", other["name"])
        problems = []
        if far.any():
            problems.append(
                f"its nodes {nodes[far].tolist()} lie "
                f"{', '.join(f'{g * 1e3:.3g}' for g in gaps[far])} mm from their nearest {to!r} nodes "
                f"{nearest[far].tolist()} (tolerance {', '.join(f'{t * 1e3:.2g}' for t in tolerance[far])} mm)"
            )
        for partner in shared:
            problems.append(f"nodes {nodes[nearest == partner].tolist()} would all weld to {to!r} node {int(partner)}")
        raise ValueError(
            f"{name!r} joins {to!r} node to node, and the engine's node-to-node weld has no rest offset: "
            f"{'; '.join(problems)}. The first step would yank each pair together. Put {to!r} on a rigid core "
            f"(SoftSpec.rigid=...), whose weld keeps every node's offset -- on this engine it then has no collider, "
            f"so a cable, a sheet or a soft body without an SDF passes through it -- or mesh it so a node sits on "
            f"each joined one."
        )

    @property
    def scene(self) -> Any:
        """The single-world scene, or a replicated model's world 0. Prefer
        :meth:`scene_of` wherever a world is known."""
        return self.scenes[0]

    def scene_of(self, world: int) -> Any:
        """The engine scene that solves ``world``."""
        return self.scenes[int(world) % self.num_worlds]

    def actor_root(self, record: dict) -> Any:
        """Where this record's actor sits in its scene: identity, always.

        Every world has its own scene, so an actor keeps its own rest
        coordinates and node positions read back *local* mean the Newton world
        frame -- there is nothing to translate on the way in or out.
        """
        del record
        return self.physics.TransformRT()

    def contact_params(self, params: dict, *, penalty: float, friction: float, padding: float) -> Any:
        """One actor's engine ``ContactParams`` from its host params; see :func:`_contact_params`.

        The method form of the module's own helper, so an actor builder that
        lives outside this bundle states contact exactly as the shell and soft
        builders do without importing the bundle to reach it.
        """
        return _contact_params(self.physics, params, penalty=penalty, friction=friction, padding=padding)

    def _build_shell_actor(self, record: dict, particle_q: np.ndarray, tet_indices=None, tet_materials=None) -> dict:
        """A membrane sheet as a SuperDex shell actor.

        Triangles come off the model exactly as the render path reads them;
        elastic moduli are the island's (``shell_young``/``shell_poisson`` on
        the backend -- cloth specs speak VBD stiffnesses, not Young/Poisson),
        converted by the engine's own helper into thickness-integrated shell
        stiffness plus an areal density.
        """
        physics = self.physics
        del particle_q  # the shared reader takes it off the model
        geom = actor_geometry(self.model, {**record, "kind": "shell"})
        start, count, params, rest, tris = geom.start, geom.count, geom.params, geom.rest, geom.tris

        thickness = float(params.get("thickness", 0.002))
        areal_density = float(params.get("areal_density", 0.3))
        # The sheet's own modulus when its fabric states one, the island's
        # otherwise. The island value is a backend parameter and therefore one
        # number for every actor on it, which is fine for a scene with one sheet
        # and wrong the moment there are two of different cloth.
        material = physics.experimental.shell_material_params_from3d_isotropic(
            float(params.get("young", self.recipe.get("shell_young", 1.0e5))),
            float(params.get("poisson", self.recipe.get("shell_poisson", 0.3))),
            areal_density / max(thickness, 1.0e-5),
            thickness,
        )
        shape = physics.create_tri_mesh_shape(
            coordinates=rest.ravel(),
            connectivity=tris.astype(np.int32).ravel(),
        )
        shell_params = physics.experimental.ShellActorParams(
            name=str(record.get("name", f"shell:{start}")),
            shape=shape,
            material=material,
            world_from_local=self.actor_root(record),
        )
        shell_params.point_cloud_collider.radius = float(params.get("particle_radius", 0.002))
        shell_params.point_cloud_collider.self_contact = bool(params.get("self_contact", False))
        actor = physics.experimental.create_shell_actor(self.scene_of(record.get("world", 0)), shell_params)
        try:
            actor.set_recentering_params(physics.RecenteringParams(use_recentering=False))
        except (physics.Error, RuntimeError):
            pass  # a shell that recenters differently still reads back through its root transform
        actor.register_query(physics.QueryType.NODE_POSITIONS)
        np_real = np.float64 if physics.uses_double_precision() else np.float32
        return {
            "name": str(record.get("name", "")),
            "actor": actor,
            "read": actor.get_node_positions_local,
            "start": start,
            "count": count,
            "prev": rest.astype(np_real).copy(),
        }

    def _build_soft_actor(
        self, record: dict, particle_q: np.ndarray, tet_indices: np.ndarray = None, tet_materials: np.ndarray = None
    ) -> dict:
        physics = self.physics
        del particle_q, tet_indices, tet_materials  # the shared reader takes them off the model
        geom = actor_geometry(self.model, {**record, "kind": "tet"})
        start, count, params, rest, tets = geom.start, geom.count, geom.params, geom.rest, geom.tets
        young, poisson = geom.young, geom.poisson

        shape = physics.create_tet_mesh_shape(
            coordinates=rest.ravel(),
            connectivity=tets.astype(np.int32).ravel(),
        )
        soft = physics.SoftActorParams()
        soft.name = str(record.get("name", f"soft:{start}"))
        soft.layer = "soft"
        # Rest coordinates are already world -- the entity baked its pose into
        # the builder -- so at one world the actor lives at identity and local IS
        # world for every read-back below. Replicated, the root carries this
        # world's placement instead, which leaves local meaning exactly what it
        # meant before: still the Newton world frame, and still what every
        # reader below expects.
        soft.world_from_local = self.actor_root(record)
        soft.shape = shape
        soft.material = physics.SoftMaterialParams(
            type=physics.SoftMaterialType.NEO_HOOKEAN,
            neo_hookean=physics.NeoHookeanMaterialParams(youngs_modulus=young, poisson_ratio=poisson),
            density=float(params.get("density", 60.0)),
            mass_damping_coefficient=float(params.get("mass_damping", 0.0)),
            stiffness_damping_coefficient=float(params.get("stiffness_damping", 5.0e-3)),
        )
        soft.contact = _contact_params(physics, params, penalty=8.0e7, friction=0.9, padding=2.0e-3)
        soft.has_gravity = True
        soft.has_inertia = True
        soft.has_stress = True
        samples = params.get("boundary_samples")
        if samples:
            soft.boundary_element_type = getattr(physics.ActorBoundaryElementType, str(samples))
        # **A soft body is created with no collider at all** unless one is asked
        # for: ``ColliderType.NONE``, which the engine documents as "other actors
        # cannot detect contact with this actor". Its own boundary samples still
        # find the mirrors, which is all a sponge between two pads needs -- and
        # why nobody saw it -- but a cable pressed into a soft clip went straight
        # through it (measured: 0.000 mm of clip deflection, contact force 0.00 N,
        # with the cable's skin 2 mm inside the clip's lips). An SDF mapped
        # through the deformation is the collider a deformable *can* have.
        collider = str(params.get("collider", "auto"))
        core = np.asarray(params.get("rigid_core", ()), dtype=np.int64)
        if core.size:
            # The skinned actor's soft params carry no collider, and its core
            # link is built with none: an SDF asked for here was silently dropped
            # and a cable fell through the body (measured: 4.59 mm off the bench
            # through a 30 mm block that holds it at 33.02 mm without the core).
            # 'none' is the only collider such a body has, so an explicit 'sdf'
            # is refused and 'auto' -- the default, which asks for the collider
            # the body *can* have -- resolves to it, and says who loses by it:
            # every deformable in its world with no SDF for its samples to meet.
            if collider == "sdf":
                raise ValueError(
                    f"soft body {soft.name!r} rides a rigid core and its material states collider='sdf', which "
                    f"this engine cannot give it: a rigid-core body is built as a soft-skinned actor, which no other "
                    f"deformable can detect; it touches another only where its own surface samples meet that one's "
                    f"collider, so a soft body with an SDF holds it and a cable, a sheet or a soft body without one "
                    f"passes through. Leave the collider at 'auto' or 'none' and accept that, or drop SoftSpec.rigid "
                    f"if one of those must touch it (a plain soft body takes the SDF)."
                )
            if collider == "auto" and (blind := self._kept_out(record)):
                warnings.warn(
                    f"soft body {soft.name!r} rides a rigid core, so it has no collider on this engine: no other "
                    f"deformable can detect it, and it touches one only where its own surface samples meet that "
                    f"one's collider (a soft body's SDF). {blind} in its world {'has' if len(blind) == 1 else 'have'} "
                    f"no SDF for those samples to meet and will pass through it; collider 'auto' resolved to 'none'. Drop "
                    f"SoftSpec.rigid if they must touch it.",
                    stacklevel=2,
                )
            return self._build_skinned_actor(record, soft, rest, tets, core, start, count)
        if collider == "auto":
            collider = "sdf" if self._shares_world(record) else "none"
        experimental = physics.experimental.ExperimentalSoftActorParams()
        experimental.use_recentering = False
        experimental.collider_type = {"sdf": physics.ColliderType.SDF, "none": physics.ColliderType.NONE}[collider]
        if collider == "sdf":
            sdf = experimental.sdf
            resolution = params.get("sdf_resolution")
            if resolution is not None:
                sdf.resolution_mode = physics.GridSdfResolutionMode.EXPLICIT
                sdf.resolution_delta = [float(resolution)] * 3
            sdf.boundary_padding_dist = float(params.get("sdf_padding", 3.0e-3))
        actor = physics.experimental.create_soft_actor(self.scene_of(record.get("world", 0)), soft, experimental)
        # A moving local frame would put every read-back on a moving target;
        # with recentering off (above) and an identity root, node positions are
        # world. Kept for an engine build that ignores the experimental flag.
        try:
            actor.set_recentering_params(physics.RecenteringParams(use_recentering=False))
        except (physics.Error, RuntimeError):
            pass  # the experimental params already turned it off; the component is not there to set
        anchors = np.asarray(params.get("anchors", ()), dtype=np.int64)
        if anchors.size:
            # Permanent: a clip's base is part of the rail, not a pin a reset
            # might clear, and it must survive ``restore_rest``.
            actor.add_boundary_condition_nodes_world_permanent(
                node_indices=anchors.astype(np.int32), node_positions_world=rest[anchors].astype(np.float64).ravel()
            )
        actor.register_query(physics.QueryType.NODE_POSITIONS)
        np_real = np.float64 if physics.uses_double_precision() else np.float32
        return {
            "name": str(record.get("name", "")),
            "actor": actor,
            "read": actor.get_node_positions_local,
            "start": start,
            "count": count,
            "prev": rest.astype(np_real).copy(),
        }

    def _build_skinned_actor(
        self, record: dict, soft: Any, rest: np.ndarray, tets: np.ndarray, core: np.ndarray, start: int, count: int
    ) -> dict:
        """A soft body on a rigid core: SuperDex's soft-skinned actor, with one free link.

        The core's nodes are the mesh's ``constrainedNodes``, bound to a single
        rigid link on a ``FREE`` joint; the link owns the rigid motion (gravity
        and inertia evaluated on the posed nodes) and the soft solve owns only
        the deformation about it. That split is the point: free, a 1e9 Pa plug
        could not move rigidly in single precision at all.

        The engine takes constrained nodes only from a shape file, so the mesh
        goes through a ``.mochi.json`` in a scratch directory. The skeleton's
        frame sits at the core's centroid -- a rigid body's six DoFs about a
        point a metre away are not the ones to hand a single-precision solve.
        """
        import json
        import tempfile

        physics = self.physics
        params = record.get("params", {})
        centre = rest[core].mean(axis=0)
        local = rest - centre
        doc = {
            "mesh": {
                "nodesPerElement": 4,
                "coordinates": local.astype(float).ravel().tolist(),
                "connectivity": tets.astype(int).ravel().tolist(),
            },
            "constrainedNodes": core.astype(int).tolist(),
        }
        with tempfile.NamedTemporaryFile("w", suffix=".mochi.json", delete=False) as fh:
            json.dump(doc, fh)
            shape_path = fh.name
        try:
            soft.shape = physics.load_shape_from_file(file_path=shape_path, bake_scale=[1.0, 1.0, 1.0])
        finally:
            Path(shape_path).unlink(missing_ok=True)
        soft.world_from_local = physics.TransformRT()
        # The skeleton evaluates gravity and inertia on the posed nodes; the soft
        # part, only its elasticity -- the engine refuses anything else.
        soft.has_gravity = False
        soft.has_inertia = False
        soft.has_stress = True
        lo, hi = local[core].min(axis=0), np.maximum(local[core].max(axis=0), local[core].min(axis=0) + 1.0e-4)
        corners = np.array([[(lo, hi)[i >> 2 & 1][0], (lo, hi)[i >> 1 & 1][1], (lo, hi)[i & 1][2]] for i in range(8)])
        # Outward-wound triangles: the link's mass properties come from them.
        faces = np.array(
            [0, 1, 3, 0, 3, 2, 4, 6, 7, 4, 7, 5, 0, 4, 5, 0, 5, 1, 2, 3, 7, 2, 7, 6, 0, 2, 6, 0, 6, 4, 1, 5, 7, 1, 7, 3]
        )
        name = soft.name
        link = physics.ArticulatedLinkParams(
            name=f"{name}:core",
            parent_link=-1,
            shape=physics.create_tri_mesh_shape(
                coordinates=corners.astype(float).ravel(), connectivity=faces.astype(np.int32)
            ),
            layer=f"{name}:core",
            collider_type=physics.ColliderType.NONE,
            # The body's mass is its nodes'; the link is a frame, not a second body.
            density=float(params.get("core_density", 1.0)),
        )
        skeleton = physics.ArticulatedActorParams(name=f"{name}:skeleton")
        skeleton.joints = [physics.ArticulatedJointParams(name=f"{name}:free", type=physics.ArticulatedJointType.FREE)]
        skeleton.links = [link]
        skeleton.world_from_root = physics.TransformRT(translation=[float(v) for v in centre])
        skinned = self.scene_of(record.get("world", 0)).create_soft_skinned_actor(
            physics.SoftSkinnedActorParams(
                skeleton_params=skeleton,
                soft_params=[soft],
                soft_attach_links=[f"{name}:core"],
                has_gravity=True,
                has_inertia=True,
                has_stress=False,
                enable_colliding_links=False,
            )
        )
        scene = self.scene_of(record.get("world", 0))
        actor = scene.get_actor(skinned.get_nested_soft_actors()[0])
        link_actor = scene.get_actor(skinned.get_nested_link_actors()[0])
        actor.register_query(physics.QueryType.NODE_POSITIONS)
        np_real = np.float64 if physics.uses_double_precision() else np.float32
        return {
            "name": str(record.get("name", "")),
            "actor": actor,
            "skinned": skinned,
            "link": link_actor,
            "core": frozenset(int(i) for i in core),
            "read": _root_reader(actor),
            "start": start,
            "count": count,
            "prev": rest.astype(np_real).copy(),
        }

    BUILDERS: ClassVar[dict] = {
        "tet": _build_soft_actor,
        "shell": _build_shell_actor,
    }
    """The actor kinds *this bundle* builds, and how. Not the whole of what the engine can.

    The neutral half -- reading a kind off the Newton model -- is open through
    :func:`~robosimstudio.engines.geometry.register_actor_kind`. Building one is
    open the same way, through
    :func:`~robosimstudio.engines.geometry.register_actor_builder`, and these
    two are simply what the bundle registers for itself at the foot of this
    module. A kind a domain pack ships registers its own builder from the pack,
    as a function taking the bridge (see "Actor builders" on the class), and a
    kind nobody registered is refused by name rather than approximated by the
    nearest one there is.
    """

    # ------------------------------------------------------------------ wiring
    @property
    def _wrench_ema(self) -> np.ndarray:
        """The feedback filter's state, exposed for inspection in tests."""
        return self._acc.ema

    def attach_pipeline(self, pipeline: Any) -> None:
        """Hand the bridge the pipeline whose states it writes. Idempotent."""
        self.rig.attach_pipeline(pipeline)

    def attach_states(self, states: tuple[Any, ...]) -> None:
        """Pipeline-less wiring -- the repro runner's states, both of them."""
        self.rig.attach_states(states)

    @property
    def pipeline(self) -> Any:
        """The pipeline the rig writes into. Read by the soft entity."""
        return self.rig.pipeline

    # ------------------------------------------------------------------ tick
    def tick(self, state: Any, dt: float) -> None:
        """Advance SuperDex by one control period and write the results back."""
        rig = self.rig
        ridden = sorted({body for body, _ in self._riders.values()})
        if ridden:  # one read for both: the mirrors' bodies and the ones a pin rides
            poses = rig.body_poses(state, sorted({*rig.bodies, *ridden}))
            targets = {b: poses[b] for b in rig.bodies}
        else:
            targets = rig.body_poses(state)
        teleport = rig.teleport
        step_dt = rig.substep_dt(dt)
        for sub, posed in rig.substeps_of(self.mirrors, targets):
            if ridden:
                self._aim_riders(poses, teleport, (sub + 1.0) / self.substeps)
            lanes: list[list] = [[] for _ in range(self.num_worlds)]
            for mirror, pose in posed:
                lanes[mirror.world % self.num_worlds].append((mirror, pose))
            if self._lanes is None:
                self._drive_world(0, lanes[0], step_dt, teleport)
            else:
                # ``list`` so a lane's exception surfaces here rather than being
                # dropped with the future.
                list(
                    self._lanes.map(self._drive_world, range(self.num_worlds), lanes, repeat(step_dt), repeat(teleport))
                )
        rig.commit(targets)
        self._rider_prev = {b: poses[b] for b in ridden} if ridden else {}

        for world, scene in enumerate(self.scenes):
            stats = scene.get_solver_stats()
            diverged = "DIVERGED" in str(stats.convergence_status)
            self._diverged_worlds[world] = diverged
            if diverged and world not in self._diverged_logged:
                self._diverged_logged.add(world)
                log.warning(
                    "superdex island %r world %d diverged (residual %.3g); its state may be unusable",
                    self.recipe.get("island"),
                    world,
                    float(getattr(stats, "residual_norm", float("nan"))),
                )

        if self.feedback_enabled and self.apply_wrenches is not None:
            self._acc.begin()
            for mirror in self.mirrors:
                if not (mirror.two_way and mirror.moving):
                    continue
                # A diverged step's contact records are stale by contract --
                # for that world; its neighbours' are as good as ever.
                if self._diverged_worlds[mirror.world % self.num_worlds]:
                    continue
                on_soft = np.zeros(3)
                # This world's deformables only -- see ``actors_by_world``.
                for entry in self.actors_by_world.get(mirror.world, ()):
                    on_soft += np.asarray(
                        entry["actor"].get_contact_force_from_actor_world(mirror.actor), dtype=np.float64
                    )
                if not np.any(on_soft):
                    continue
                # SuperDex reports the force on the *soft* body, and offers
                # no torque: the couple is entirely the moment arm, which
                # the accumulator takes from the shape's world frame.
                self._acc.add_at_shape(mirror.body, -on_soft, targets[mirror.body], mirror.local)
            self.apply_wrenches(self._acc.shape(dt))

        for entry in self.actors:
            # Through the entry's own reader rather than one call for every
            # kind: a soft or shell actor answers ``get_node_positions_local``,
            # and not every actor type does -- the engine refuses NodePositions
            # for some and states them as a rest mesh plus a per-node
            # displacement instead. The tick has no business knowing which; the
            # builder that made the actor does.
            entry["prev"] = self.rig.write_particles(
                state, entry["start"], entry["count"], np.asarray(entry["read"]()), dt, entry["prev"]
            )

    def _drive_world(self, world: int, posed: list, step_dt: float, teleport: bool) -> None:
        """Pose one world's moving mirrors and step its scene."""
        physics = self.physics
        for mirror, pose in posed:
            # A shape that has not moved since the last substep is not
            # written, and on a real cell most of them have not: an arm
            # parks, a support hand holds, and a decomposed hull set is
            # dozens of shapes on one link. This is the tick's dominant
            # cost -- measured at 83 per cent of it on a surface-preparation scene at
            # two worlds, against 4 per cent for the engine's own solve --
            # because every write is three FFI constructions, and there are
            # ``mirrors x substeps`` of them per control step.
            #
            # Skipping is exact rather than approximate: the engine holds
            # the last transform it was given, so not writing an identical
            # one changes nothing. ``teleport`` never skips, because it also
            # zeroes the velocity.
            if not teleport and np.array_equal(pose, mirror.prev):
                continue
            mirror.prev = pose.copy()
            # The pose is Newton's and goes in unchanged: this mirror's
            # scene holds only its own world, so nothing else's gripper is
            # at the same coordinates.
            mirror.actor.set_root_transform(
                physics.TransformRT(
                    rotation=physics.Quaternion(*[float(v) for v in pose[3:7]]),
                    translation=[float(v) for v in pose[:3]],
                )
            )
            if teleport:
                mirror.actor.set_velocity([0.0, 0.0, 0.0], [0.0, 0.0, 0.0])
        # This world's solve, with the whole iteration budget.
        self.scenes[world].step(step_dt)

    # --------------------------------------------------------------- contacts
    def contact_points(self, entity_name: str, *, against: int | None = None, world: int = 0) -> dict[str, np.ndarray]:
        """Where a deformable is being pressed, how hard, how fast, how wide.

        The per-sample half of what :attr:`_wrench_ema` reports in aggregate.
        Wrench feedback answers *how hard the sponge is pushed* with one vector
        per pair, which is all a rigid body's equation of motion needs; a
        surface law -- an abrasion field, a wipe, anything Preston-shaped --
        needs the same quantities *per contact patch*, and no amount of
        summing recovers them.

        Columns, all world frame, all normalised so the **deformable is side
        A** whatever order the engine reported the pair in (it may report the
        queried actor as either):

        =========  ========  =========================================
        ``pos``    (n, 3)    Contact point on the deformable [m]
        ``normal`` (n, 3)    Unit contact normal, pointing INTO the deformable
        ``force``  (n, 3)    Force ON the deformable, from the other side [N]
        ``v_soft`` (n, 3)    Velocity of the contact point on the deformable [m/s]
        ``v_other``(n, 3)    Velocity of the contact point on the other side [m/s]
        ``area``   (n,)      The sample's quadrature weight [m^2]
        ``gap``    (n,)      Signed separation [m]: positive is a gap,
                             **negative is interpenetration**
        ``body``   (n,)      Newton body of the other side
        =========  ========  =========================================

        ``gap`` is the one to reach for when a grasp looks like it is sinking
        into a deformable rather than pressing it. Nothing else here can tell
        a pad that is 3 mm inside the foam from a pad that has pushed the foam
        3 mm out of its way: both report contact, both report a force, and the
        block's bounding box is nearly the same either way.

        ``body`` is ``-1`` for a world-fixed mirror (the bench, the ground) and
        ``-2`` for anything this island cannot name -- a second deformable, or
        an actor no mirror was built for. ``against`` filters to one Newton
        body, and filters on that cheap field *before* reading any vector,
        which is most of what this costs.

        **What it costs.** SuperDex hands back a span of Python objects with no
        buffer protocol -- ``memoryview`` on one raises -- so every field is an
        attribute hop. Measured at 420 samples: ~1.3 us per vector column and
        ~7.6 us per sample for all of them, against a 0.8 ms control step on a
        bare sponge scene. Read what you need, filter early, and put the call
        behind a cadence or a proximity gate if the patch is large.

        ``area`` is the quadrature weight of the manifold the engine called
        side A, so in the rare pairing where the deformable is reported second
        it is the *collider's* sample area rather than the foam's. The two
        describe one physical patch and are the same order; nothing here
        pretends they are identical.

        Returns:
            Empty columns when this world's last step diverged -- SuperDex states
            that a diverged step's contact records may be stale, and the wrench
            path above already declines to read them.
        """
        entry = next(
            (
                e
                for e in self.actors
                if e.get("entity", e["name"]) == entity_name and int(e.get("world", 0)) == int(world)
            ),
            None,
        )
        if entry is None:
            raise KeyError(
                f"no actor named {entity_name!r} on island {self.recipe.get('island')!r}; "
                f"this island carries {[e['name'] for e in self.actors]}"
            )
        read = entry.get("contacts")
        if read is None:
            raise RuntimeError(
                f"actor {entity_name!r} does not support superdex's CONTACT_POINTS query, so "
                "per-sample contact cannot be read here; the aggregate pair force is what the "
                "feedback path harvests, through get_contact_force_from_actor_world."
            )
        if self._diverged_worlds[int(world) % self.num_worlds]:
            return _no_contacts()

        span = read()
        if not len(span):
            return _no_contacts()

        mine = _handle_value(entry["actor"])
        bodies = self._bodies_by_handle()
        keep: list[int] = []
        first_side: list[bool] = []
        hit_body: list[int] = []
        for index, point in enumerate(span):
            side_a = point.actor_a.value
            soft_is_a = side_a == mine
            other = point.actor_b.value if soft_is_a else side_a
            body = bodies.get(other, _FOREIGN)
            if against is not None and body != int(against):
                continue
            keep.append(index)
            first_side.append(soft_is_a)
            hit_body.append(body)

        n = len(keep)
        out = _no_contacts(n)
        if not n:
            return out
        pos, normal, force = out["pos"], out["normal"], out["force"]
        v_soft, v_other = out["v_soft"], out["v_other"]
        area, gap = out["area"], out["gap"]
        out["body"][:] = hit_body
        for row, (index, soft_is_a) in enumerate(zip(keep, first_side, strict=True)):
            point = span[index]
            if soft_is_a:
                pos[row] = np.asarray(point.pos_a)
                normal[row] = np.asarray(point.normal)
                force[row] = np.asarray(point.force)
                v_soft[row] = np.asarray(point.point_velocity_a)
                v_other[row] = np.asarray(point.point_velocity_b)
            else:
                # Reported the other way round: the position is B's, and the
                # force is stated ON A, so the deformable feels its negation.
                # The normal turns with it, for the same reason.
                pos[row] = np.asarray(point.pos_b)
                normal[row] = -np.asarray(point.normal)
                force[row] = -np.asarray(point.force)
                v_soft[row] = np.asarray(point.point_velocity_b)
                v_other[row] = np.asarray(point.point_velocity_a)
            area[row] = point.int_weight
            # Unsigned by the reversal: a separation is a separation whichever
            # manifold the engine called A.
            gap[row] = point.distance
        return out

    def _bodies_by_handle(self) -> dict[int, int]:
        """``{superdex actor handle: newton body}`` for every mirror. Cached.

        The body is Newton's, so a replicated model's worlds answer with their
        own -- which is what makes ``against=`` a per-world question without
        anything here having to ask which world it is being asked about. One
        table for every scene: the engine's handles carry the scene in their
        high bits and never collide across scenes.
        """
        if self._mirror_bodies is None:
            self._mirror_bodies = {_handle_value(m.actor): int(m.body) for m in self.mirrors}
        return self._mirror_bodies

    # ----------------------------------------------------------------- solver
    def solver_stats(self, world: int = 0) -> Any:
        """The engine's statistics for ``world``'s last solve."""
        return self.scene_of(world).get_solver_stats()

    def get_solver_params(self) -> Any:
        """The solver parameters every scene runs with (read off world 0)."""
        return self.scenes[0].get_solver_params()

    def set_solver_params(self, params: Any) -> None:
        """Give every world's scene the same solver parameters."""
        for scene in self.scenes:
            scene.set_solver_params(params)

    @property
    def diverged_worlds(self) -> tuple[int, ...]:
        """Which worlds' last step diverged."""
        return tuple(w for w, bad in enumerate(self._diverged_worlds) if bad)

    # ------------------------------------------------------------------- pins
    def pin_nodes(
        self,
        entity_name: str,
        nodes: np.ndarray,
        targets: np.ndarray,
        *,
        stiffness: float = 2000.0,
        damping: float = 10.0,
        world: int = 0,
    ) -> int:
        """Pin an actor's nodes to drivable world targets; returns a pin id.

        The host-engine half of a cloth attachment: where a Newton island's pin
        rewrites ``particle_q`` in ``post_solve``, a host island pins through
        the engine's own compliant node constraints, so the pinned patch still
        argues with contact and inertia instead of teleporting.

        Args:
            entity_name: Which actor's nodes (the entity's name).
            nodes: Global model particle indices, as the callers already hold.
            targets: World positions ``[n, 3]``, in Newton's frame, which is
                also every scene's frame.
            world: Which world's actor. 0 when nothing replicated it.
        """
        entry = next(
            e for e in self.actors if e.get("entity", e["name"]) == entity_name and int(e.get("world", 0)) == int(world)
        )
        scene = self.scene_of(world)
        actor = entry["actor"]
        handle_fn = getattr(actor, "get_handle", None)
        handle = handle_fn() if callable(handle_fn) else actor
        constraints = []
        for node, target in zip(np.asarray(nodes, dtype=np.int64), np.asarray(targets, dtype=np.float64), strict=True):
            constraints.append(
                scene.create_deformable_node_position_constraint(
                    stiffness=float(stiffness),
                    damping=float(damping),
                    saturation=-1.0,
                    node_index=int(node - entry["start"]),
                    position=[float(v) for v in target],
                    actor=handle,
                )
            )
        self._pin_seq += 1
        self._pins[self._pin_seq] = constraints
        self._pin_world[self._pin_seq] = int(world)
        return self._pin_seq

    def set_pin_targets(self, pin: int, targets: np.ndarray) -> None:
        """Re-aim one pin's constraints, in the order they were created.

        The targets are Newton's, like the ones :meth:`pin_nodes` took. A pin
        that rides a body (:meth:`ride`) is re-aimed by the tick, which
        overwrites these at its next substep.
        """
        for constraint, target in zip(self._pins[pin], np.asarray(targets, dtype=np.float64), strict=True):
            constraint.set_target_position([float(v) for v in target])

    def ride(self, pin: int, body: int, local: np.ndarray) -> None:
        """Carry one pin on a Newton body: its targets are ``local`` ``[n, 3]`` in the body's frame.

        Aimed by :meth:`tick` before **every engine substep**, from the body's
        pose swept through the control step the way the mirrors' are -- so the
        nodes keep up with a moving hand. Re-aimed once a control step from the
        outside instead, from the hand as it stood before the step, they
        trailed it by that step's travel: 5.2 mm at 0.3 m/s on the cable demo.
        Calling it again moves the offsets. :meth:`unpin` ends the ride.
        """
        if pin not in self._pins:
            raise KeyError(f"no pin {pin}")
        local = np.asarray(local, dtype=np.float64).reshape(-1, 3)
        if len(local) != len(self._pins[pin]):
            raise ValueError(f"pin {pin} holds {len(self._pins[pin])} nodes; {len(local)} offsets given")
        self._riders[int(pin)] = (int(body), local)

    def _aim_riders(self, poses: dict[int, np.ndarray], teleport: bool, t: float) -> None:
        """Every riding pin onto its body, ``t`` of the way through this control step."""
        for pin, (body, local) in self._riders.items():
            now = poses[body]
            pose = now if teleport or body not in self._rider_prev else lerp_pose(self._rider_prev[body], now, t)
            self.set_pin_targets(pin, pose[:3] + local @ quat_to_mat(pose[3:7]).T)

    def has_pin(self, pin: int) -> bool:
        """Whether ``pin`` still stands: :meth:`unpin`, :meth:`unpin_all` and :meth:`restore_rest` each end one."""
        return int(pin) in self._pins

    def unpin(self, pin: int) -> None:
        scene = self.scene_of(self._pin_world.pop(int(pin), 0))
        self._riders.pop(int(pin), None)
        for constraint in self._pins.pop(pin, ()):
            scene.destroy_constraint(constraint)

    def unpin_all(self) -> None:
        for pin in list(self._pins):
            self.unpin(pin)

    # ------------------------------------------------------------------ reset
    def place_actor(self, entity: str, world: int, positions: np.ndarray) -> bool:
        """Teleport one world's actor onto ``positions``; ``False`` if it has none.

        The channel a *drawn* deformable needs. An actor's rest coordinates are
        read off ``model.particle_q`` when this bridge is built, which is once,
        before any episode is known -- so a task whose foam is somewhere new
        every episode used to have to rebuild the model to say so. It can say it
        here instead: the lattice is the same lattice, rigidly moved, which is
        what a placement *is*, and a soft body's rest shape is invariant under
        one.

        ``positions`` is this actor's nodes in the Newton world frame, in the
        order the model holds them. Local **is** world for every actor this
        bridge builds -- recentering is off and the root is identity -- which is
        the same assumption every read-back above already makes.

        Velocities go to zero and ``prev`` is refreshed from what the engine
        reports back, because a teleport is not motion: the first speed reading
        after one must not be the jump. The mirrors are marked for teleport for
        the same reason ``restore_rest`` marks them.
        """
        rows = np.asarray(positions, dtype=np.float64).reshape(-1, 3)
        touched: list[dict] = []
        moved = False
        for entry in self.actors_by_world.get(int(world), ()):
            if entry.get("entity") != str(entity):
                continue
            if len(rows) != int(entry["count"]):
                raise ValueError(f"{entity!r} in world {world} has {entry['count']} nodes, given {len(rows)}")
            actor = entry["actor"]
            if "skinned" in entry:
                # Its nodes are the skeleton's pose plus a deformation; a placement is a skeleton pose.
                raise NotImplementedError(f"{entity!r} has a rigid core: place it by its skeleton, not its nodes")
            actor.set_node_positions_local(rows.ravel())
            actor.set_node_velocities_local(np.zeros(rows.size, dtype=np.float64))
            touched.append(entry)
            moved = True
        if moved:
            # The registered queries still hold what the actor looked like before
            # the write, so a read here would hand back the OLD nodes -- silently,
            # and ``prev`` would then be a whole placement behind, which reads as
            # a metre-per-second slide on the first control step. ``restore_rest``
            # refreshes for the same reason and says so; this is that line.
            self.scene_of(world).step(0.0)
            for entry in touched:
                entry["prev"] = np.ascontiguousarray(
                    np.asarray(entry["read"]()).reshape(-1, 3), dtype=entry["prev"].dtype
                )
            self.rig.mark_teleport()
        return moved

    def capture_rest(self) -> None:
        """Record every scene's current state as what a reset returns to."""
        if self._rest_state is not None:
            for scene, rest in zip(self.scenes, self._rest_state, strict=True):
                scene.release_state(rest)
        self._rest_state = [scene.capture_state() for scene in self.scenes]

    def restore_rest(self) -> None:
        """Return every scene to its captured rest; the next tick teleports mirrors."""
        if self._rest_state is None:
            return
        # Restore demands the composition the capture saw: pins created since
        # are extra constraints and must go first, not survive the episode.
        self.unpin_all()
        for scene, rest in zip(self.scenes, self._rest_state, strict=True):
            scene.restore_state(rest, release_immediately=False)
            scene.step(0.0)  # refresh queries without advancing state
        for entry in self.actors:
            positions = np.asarray(entry["read"]()).reshape(-1, 3)
            entry["prev"] = np.ascontiguousarray(positions, dtype=entry["prev"].dtype)
        self.rig.mark_teleport()
        self._diverged_logged.clear()
        self._diverged_worlds = [False] * self.num_worlds
        if self.feedback_enabled and self.apply_wrenches is not None:
            self.apply_wrenches(self._acc.zero())


_CONSUMES = {
    # What each builder above actually reads off ``HostActor.params``; the
    # composer warns on anything an actor states outside its kind's set.
    "shell": ("areal_density", "particle_radius", "poisson", "self_contact", "thickness", "young"),
    "tet": (
        "anchors",
        "boundary_samples",
        "collider",
        "contact_padding",
        "contact_penalty",
        "contact_smoothing",
        "contact_threshold",
        "density",
        "friction",
        "friction_falloff",
        "mass_damping",
        "rigid_core",
        "sdf_padding",
        "sdf_resolution",
        "stiffness_damping",
        "welds",
    ),
}
for _kind, _build in SuperdexBridge.BUILDERS.items():
    register_actor_builder(
        "superdex", _kind, _build, consumes=_CONSUMES[_kind], summary=f"SuperDex builds a {_kind} actor."
    )
del _kind, _build
````

## robosimstudio/engines/genesis/solver.py

````text
# SPDX-License-Identifier: Apache-2.0
"""The ``genesis`` backend class. One method, because the contract is shared."""

from __future__ import annotations

from typing import Any

from robosimstudio.engines.host import SolverHost

__all__ = ["SolverGenesis"]


class SolverGenesis(SolverHost):
    """The host island's solver for Genesis: opens the bridge, inherits the rest.

    Everything a host engine owes the composer --- the no-op step contract, the
    wrench feed, the pipeline attach, the rest capture, the reset, the tick ---
    is :class:`~robosimstudio.engines.host.SolverHost`'s. This class is the one
    thing that is Genesis's: how to build its bridge.

    Args:
        model: The finalized Newton model.
        recipe: The manifest's host-island record.
        substeps: Genesis steps per control step.
        precision: ``"64"``, and changing it is a correctness decision rather
            than a performance one --- see
            :mod:`robosimstudio.engines.genesis.runtime`.
        feedback: ``"auto"`` or ``"off"`` --- the IPC constraint-reaction harvest
            for two-way mirrors.
        feedback_alpha: EMA coefficient for a *rising* harvested force; 1.0
            disables the ramp. See
            :class:`~robosimstudio.engines.feedback.WrenchAccumulator`.
        feedback_dv_max: The most velocity [m/s] one control step's harvested
            wrench may add to a body; scales the whole wrench, torque with it.
        pose_source: ``"fresh"`` or ``"snapshot"``.
        shell_young: Cloth elastic modulus [Pa], island-wide. A cloth spec speaks
            its Newton solver's stiffnesses, not Young and Poisson, so these ride
            the backend rather than the entity.
        shell_poisson: Cloth Poisson ratio, island-wide.
        bending_stiffness: Genesis's own cloth bending term. It has no Newton
            equivalent at all, which is exactly why it belongs on the arrangement.
        contact_d_hat: IPC barrier distance [m].
        constraint_strength_translation: Stiffness of the soft transform
            constraint holding a mirror to its aim. Note the reaction is
            ``(k/dt^2) * m * dx`` --- raising this shrinks the displacement that
            encodes the force, which is harmless at float64 and destroys the
            measurement at float32.
        constraint_strength_rotation: The rotational twin.
    """

    def open(
        self,
        model: Any,
        recipe: dict,
        *,
        substeps: int = 1,
        precision: str = "64",
        feedback: str = "auto",
        feedback_alpha: float = 0.35,
        feedback_dv_max: float = 0.5,
        pose_source: str = "fresh",
        shell_young: float = 1.0e5,
        shell_poisson: float = 0.3,
        bending_stiffness: float = 10.0,
        contact_d_hat: float = 1.0e-3,
        constraint_strength_translation: float = 100.0,
        constraint_strength_rotation: float = 100.0,
    ) -> Any:
        """The Genesis bridge, with the island-wide scalars folded into the recipe.

        They ride the recipe rather than arguments for the same reason SuperDex's
        do: the manifest records the recipe, so a twin rebuilds the same scene
        from it and the model alone.
        """
        from .bridge import GenesisBridge

        return GenesisBridge(
            model,
            {
                **recipe,
                "feedback_alpha": float(feedback_alpha),
                "feedback_dv_max": float(feedback_dv_max),
                "shell_young": float(shell_young),
                "shell_poisson": float(shell_poisson),
                "bending_stiffness": float(bending_stiffness),
                "contact_d_hat": float(contact_d_hat),
                "constraint_strength_translation": float(constraint_strength_translation),
                "constraint_strength_rotation": float(constraint_strength_rotation),
            },
            substeps=int(substeps),
            precision=str(precision),
            feedback=str(feedback),
            pose_source=str(pose_source),
        )
````

## robosimstudio/robots/teleop/force_feedback.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Force feedback on a leader arm, against a scene this library simulates.

The leader is the *action* and the simulated arm it drags is the *state*. When
the simulated arm cannot reach where your hand is -- a jaw closed on something
solid, a link against a post, a hand pressed on the bench -- the gap between
the two is the force you should feel, and this renders it back onto the
leader's own servos. Free space stays free: below the deadband no motor is
energized at all, so the arm is as loose in your hand as it is unpowered.

Everything here is the feedback algorithm and the servo writes that render it.
The scene, the physics and the page are whatever the caller built;
:class:`Teleoperation` is handed a page and a set of leaders and owns the
hardware from the first torque-off to the last::

    from robosimstudio.robots.teleop import force_feedback as ffb
    from robosimstudio.robots.teleop.lerobot_controller import parse_leader_ports, resolve_leaders

    leaders = resolve_leaders(parse_leader_ports("right:/dev/ch340-<serial>"), "my_leader.json")
    studio = StudioSession(sim, config=StudioConfig(panels="drive"))
    with ffb.Teleoperation(studio, leaders, feedback=True) as teleop:
        studio.run()
    raise SystemExit(teleop.exit_code)

Two clocks, and that is the point
---------------------------------
A leader loop that ran at the page's step rate would render contact at whatever
rate the scene happened to be stepping -- which moves with the scene, the
render budget and the browser. So each leader arm gets **its own thread on its
own clock** (100 Hz by default), and the page keeps its own (the scene's
``control_hz``, 60 Hz for the library's default arrangement).

The split is forced anyway by a threading rule: Warp may only be touched on the
thread that steps the scene. So the halves divide exactly along that line, and
neither reaches into the other:

* **Leader thread** (:class:`LeaderArmLoop`) -- serial only, no Warp. Reads
  ``Present_Position``, converts to radians and a grip command, publishes it;
  takes the latest follower sample, computes the correction, writes
  ``Goal_Position``, ``Torque_Limit`` and ``Torque_Enable``. One thread per
  arm, because a bimanual leader is two independent buses and one arm's glitch
  must not stall the other's.
* **Main thread** (:class:`StudioBridge`) -- Warp only, no serial. Hung off the
  page's ``each_step``, which runs after its panels and *before* the step: it
  applies the leader poses as one ``joint_position`` action, then reads back
  the measured joints and the measured jaw (:func:`jaw_fraction`) and
  publishes them.

Two slots under one lock per arm, and each bus is touched by exactly one thread.

The gap is taken against the pose the arm was chasing
------------------------------------------------------
Each follower sample travels with the leader pose it was *chasing*: the action
the page applied one step before it read the arm back. The mismatch is the
difference between those two -- how far the arm got against what it was told --
rather than between the sample and wherever the hand has moved to by the time
the leader thread looks. In contact the two are the same number. In free
motion they are not: the second one contains every delay in the exchange, and
a page that steps late then reads as something in the way. See
:class:`LeaderArmLoop`'s ``compare`` for the measurement, and for the switch
back to the other form.

Why the measured jaw and not the gripper command
------------------------------------------------
A hand commanded shut on a 70 mm part stalls part way; the same command on air
reaches full travel. Reporting the *command* as the follower's state makes
those indistinguishable -- the gripper would feel weightless on exactly the
grasp you most want to feel. So the grip slot is a measurement: how far the
hand's **driven** finger joints have travelled from open
(:func:`jaw_fraction`), which is the same comparison every arm slot makes --
a driven joint against the target it was given.

The driven joints rather than the gap between the pads
(:meth:`~robosimstudio.solvers.Gripper.closed_fraction`), and that is a
measured choice. The YAM's hand drives one finger and carries the other on an
equality constraint, and at the teleoperation gains a moving wrist shakes the
carried one: with the jaw command held still and the fifth arm joint swung
0.4 rad in free space, the two fingers came 7.9 mm out of step (0.4 mm at the
asset's own gains), which the gap reads as 9% of the stroke -- over the grip
slot's deadband, so a wrist motion through empty space energized the jaw
motor. The driven finger moved 2.7% in the same pass. A jaw closed on
something stalls the driven finger too, so the grasp is still reported; what
is no longer reported is something pushing on the carried finger alone.

Staleness is a safety gate, not a corner case
----------------------------------------------
``each_step`` does not run while the page is paused or rebuilding a scene --
"paused is paused". The follower sample then stops advancing, and rendering
force against a stale mismatch would push the operator's hand toward where the
simulated arm *used to be*. So a sample older than the stale limit disarms
every motor and drops the arm back through the re-arm gate below. Hitting
pause, a stalled scene and a closed page are all the same event here.

Which is also the re-arm rule: a joint that was suspended may not energize
again until its physical and simulated positions have held *continuously*
inside the release deadband for the neutral dwell (0.5 s), and even then only
a later above-deadband sample arms it. One frame that happens to look aligned
while a scene is still settling is not alignment.

Safety
------
Torque is off at rest and off on the way out. Startup refuses to arm against
servos that came up with a nonzero torque limit; a motor is energized only by
acknowledged per-servo writes (a lost broadcast must not enable torque against
a stale goal); every disarm at a transition is verified by reading
``Torque_Enable`` back, and the state that says "this joint is live" is
committed only once every write for it has succeeded -- so a failed torque-off
is retried next tick instead of being forgotten. A fault on either thread tears
the whole session down through the same path. None of that makes an arm safe to
stand in: keep clear of it and keep a power switch in reach.

``lerobot`` and its serial driver are imported where a bus is first opened, so
this module -- the signal, the gates, the layout -- imports and tests on a
machine with neither a GPU nor an arm plugged into it.
"""

from __future__ import annotations

import json
import math
import signal
import statistics
import sys
import threading
import time
import traceback
from collections import deque
from collections.abc import Callable, Mapping
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from robosimstudio.arms import arm_slots

from .lerobot_controller import (
    ENCODER_RESOLUTION,
    ArmCalibration,
    LeaderError,
    LeaderMismatch,
    LeaderPort,
    apply_arm_actions,
    check_leaders,
    open_leader,
)

__all__ = [
    "ArmLayout",
    "ComplianceConfig",
    "JointDecision",
    "JointGate",
    "LeaderArmLoop",
    "LeaderMismatch",
    "LeaderServos",
    "Proposal",
    "Sample",
    "ServoFault",
    "StudioBridge",
    "Teleoperation",
    "Trace",
    "correction",
    "jaw_fraction",
    "preflight",
    "propose",
]

TORQUE_OFF_SETTLE_S = 0.25
"""Time given to a torque-off before its register is read back."""

COMMAND_GAP_S = 0.03
"""Pacing between per-servo commands on one bus, so a chain of them is not a burst."""

EEPROM_WRITE_SETTLE_S = 0.02
"""Time given to a servo after one of its EEPROM registers is rewritten."""

MAX_BUS_GLITCHES = 3
"""Consecutive transient bus errors ridden through before the loop faults."""

COMPARISONS = ("applied", "live")
"""What a follower sample is compared against. See :class:`LeaderArmLoop`'s ``compare``."""


def _say(message: str) -> None:
    """The operator's console. Flushed: these lines are read while the arm is live."""
    print(message, flush=True)


def _warn(message: str) -> None:
    """The same console's error stream, for a fault and what was done about it."""
    print(message, file=sys.stderr, flush=True)


# ---------------------------------------------------------------------- trace
class Trace:
    """Per-tick timing and signal, buffered in RAM and written on the way out.

    **Nothing here may cost the control loop anything.** Force feedback that
    feels choppy is a timing complaint, so an instrument that wrote to disk on
    the leader thread would be measuring its own stalls: a 100 Hz loop has 10 ms
    a tick and one page-cache miss can eat it. So a sample is a tuple appended
    to a plain list -- no formatting, no locks, no I/O -- and the whole buffer
    is serialised once in :meth:`write`, after the arm is already slack.

    One list per thread and neither reads the other's, so there is nothing to
    synchronise: each leader thread appends only to its own ``ticks``, and the
    page thread appends only to ``publishes``.

    ``scripts/analyze_leader_trace.py`` reads the file this writes.

    Args:
        limit: Samples kept per stream, oldest dropped. An hour at 100 Hz is
            360k rows, which is fine in memory and slow to analyse; the default
            keeps the most recent ~10 minutes of a session, which is what a
            complaint is ever about.
    """

    TICK_FIELDS = (
        "t",
        "period",
        "late",
        "phase",
        "read_s",
        "propose_s",
        "render_s",
        "age",
        "stale_limit",
        "n_active",
        "n_arm",
        "n_release",
        "worst_mismatch",
        "worst_effective",
        "glitch",
        "worst_slot",
        "worst_speed",
        "worst_deadband",
        "max_speed",
    )
    """What one leader tick records. ``phase`` is 0 armed, 1 suspended, 2 no-feedback.

    ``render_s`` on a suspended tick is the verified torque-off, not a
    correction being rendered -- the same wall time, a different thing, and
    ``phase`` is what separates them.
    """

    PUBLISH_FIELDS = ("t", "gap", "step", "pump_s")
    """What one page publish records."""

    def __init__(self, limit: int = 60_000) -> None:
        self.limit = int(limit)
        self.ticks: dict[str, list[tuple]] = {}
        self.publishes: list[tuple] = []
        self.events: list[tuple[float, str, str]] = []
        self.joints: dict[str, list[str]] = {}
        self.started = time.monotonic()

    def arm(self, name: str, motors: list[str]) -> list[tuple]:
        """Register one arm and hand back the list its thread appends to."""
        self.joints[name] = list(motors)
        return self.ticks.setdefault(name, [])

    @staticmethod
    def add(rows: list[tuple], row: tuple, limit: int) -> None:
        """Append one sample, dropping the oldest once the cap is reached."""
        rows.append(row)
        if len(rows) > limit:
            del rows[: len(rows) // 4]  # amortised, so this is not a per-tick memmove

    def event(self, at: float, name: str, what: str) -> None:
        """A transition worth seeing beside the timing: suspend, re-arm, glitch.

        ``at`` is a raw ``time.monotonic()``; it is stored relative to the
        trace's own start so an event lines up with the tick rows rather than
        needing the reader to subtract a boot time.
        """
        self.events.append((at - self.started, name, what))

    # ------------------------------------------------------------------ out
    def write(self, path: Path) -> str:
        """One JSON document: metadata, per-arm tick tables, publishes, events.

        Columnar rather than a row per line -- the analysis this exists for is
        "what did the period do over ten minutes", which wants arrays, and a
        column of floats is a quarter the bytes of the same numbers as repeated
        JSON keys.
        """
        doc = {
            "version": 1,
            "started_monotonic": self.started,
            "tick_fields": list(self.TICK_FIELDS),
            "publish_fields": list(self.PUBLISH_FIELDS),
            "joints": self.joints,
            "arms": {
                name: {f: [row[i] for row in rows] for i, f in enumerate(self.TICK_FIELDS)}
                for name, rows in self.ticks.items()
            },
            "publishes": {f: [row[i] for row in self.publishes] for i, f in enumerate(self.PUBLISH_FIELDS)},
            "events": [{"t": t, "arm": a, "what": w} for t, a, w in self.events],
        }
        path = Path(path)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(doc))
        return self.summary()

    def summary(self) -> str:
        """The three numbers a choppiness complaint is usually about, per arm.

        Printed at exit because the answer is often already here: a loop whose
        period p99 is four times its target is not rendering a smooth force
        however good the signal is, and that is visible without opening the file.
        """

        def q(xs: list[float], p: float) -> float:
            return xs[min(len(xs) - 1, int(p * len(xs)))] * 1e3 if xs else 0.0

        out: list[str] = []
        idx = {f: i for i, f in enumerate(self.TICK_FIELDS)}
        for name, rows in self.ticks.items():
            if not rows:
                continue
            period = sorted(r[idx["period"]] for r in rows)
            render = sorted(r[idx["render_s"]] for r in rows if r[idx["phase"]] == 0)
            downs = sorted(r[idx["render_s"]] for r in rows if r[idx["phase"]] == 1)
            age = sorted(r[idx["age"]] for r in rows if r[idx["age"]] >= 0.0)
            arms_ = sum(r[idx["n_arm"]] for r in rows)
            rel = sum(r[idx["n_release"]] for r in rows)
            susp = sum(1 for _, a, w in self.events if a == name and w == "suspend")
            out.append(
                f"  [{name}] {len(rows)} ticks\n"
                f"      loop period   p50 {q(period, 0.5):6.2f}  p95 {q(period, 0.95):6.2f}  "
                f"p99 {q(period, 0.99):6.2f}  max {q(period, 1.0):7.2f} ms\n"
                f"      render        p50 {q(render, 0.5):6.2f}  p95 {q(render, 0.95):6.2f}  "
                f"max {q(render, 1.0):7.2f} ms\n"
                f"      sample age    p50 {q(age, 0.5):6.2f}  p95 {q(age, 0.95):6.2f}  "
                f"max {q(age, 1.0):7.2f} ms\n"
                f"      torque writes {arms_} arm / {rel} release   suspends {susp}"
                + (f"  (worst torque-off {q(downs, 1.0):.0f} ms)" if downs else "")
            )
        if self.publishes:
            gaps = sorted(r[1] for r in self.publishes if r[1] >= 0.0)
            out.append(
                f"  [page] {len(self.publishes)} publishes   gap p50 {q(gaps, 0.5):6.2f}  "
                f"p95 {q(gaps, 0.95):6.2f}  max {q(gaps, 1.0):7.2f} ms"
            )
        return "\n".join(out) or "  (nothing recorded)"


# --------------------------------------------------------------------- signal
@dataclass(frozen=True)
class ComplianceConfig:
    """How a state-action mismatch becomes a correction, and how it is rendered.

    The first eight are the *signal*, and every one is in the joint's own units
    (radians for an arm joint, a fraction of the stroke for the gripper) so the
    same numbers describe both. The last three are how **this** leader's
    Feetech servos render the result: position-loop P and D registers (0-254)
    and the torque duty cap (0-1000).

    The floor, ramp, cap and servo gains are the ones a reference teleoperation
    rig for the same leader runs. The velocity terms were fitted here, from
    recorded sessions of a bimanual YAM leader driving a simulated YAM.

    Args:
        deadband: Mismatch below which nothing is rendered at all, so free
            motion feels free. With :attr:`velocity_deadband` this is the
            *floor* -- what a hand holding still must exceed.
        velocity_deadband: Seconds of the operator's own speed added to the
            deadband, so the threshold rises with how fast the hand is moving.

            **This is a latency, not a gain.** A position-controlled simulated
            arm lags its target, and it lags almost purely: fitting
            ``follower(t) = leader(t - tau)`` to a recorded session left a
            residual of 0.009 rad against a 0.053 rad signal, so the arm is a
            delay line rather than a spring. A delay line's free-space mismatch
            is exactly ``speed * tau`` -- which means a fixed deadband asks one
            question at rest and a completely different one in motion. At
            ``tau`` of 25 ms and a 0.04 deadband, any hand faster than 1.6 rad/s
            reads as contact with nothing in the scene.

            0.045 is that ``tau``, fitted from a recorded session rather than
            from the sim: a first pass used 0.025, measured with a synthetic
            leader driving the page in a tight loop, and that left out the
            serial thread, the page's 17 ms publish gap and 9-24 ms of slot
            age. Against real motion the same fit came back 35-45 ms, and the
            recording says what each value would have cost::

                k        over deadband    while moving >0.5 units/s
                25 ms        23.9%                 34.5%
                45 ms       ~19%                  ~22%
                60 ms        17.2%                 17.4%
                75 ms        16.2%                 15.0%

            Past ~45 ms the curve flattens, because what is left is not lag:
            it is per-slot static offset, which no velocity term can remove.

            Setting this to the measured ``tau`` subtracts that term instead of
            fighting it: what is left over the threshold is the part of the
            mismatch a delay does not explain, which is what contact is. Slow,
            precise work keeps the full sensitivity of :attr:`deadband`; a fast
            reach stops manufacturing force out of its own lag.

            Linear because the lag is: ``speed * tau`` has no curvature to
            match, and anything steeper masks real contact during fast motion,
            which is the one place this must not.

            0 restores a fixed deadband.
        max_deadband: Ceiling on the scaled deadband, so a fast swing into
            something solid is still felt. Without it the threshold outruns
            every mismatch a real contact can produce.

            Sized against the floor and the slope together: at 0.045 s per
            unit/s, a 0.12 ceiling binds from 1.78 units/s up, and the recorded
            session spent 27% of its armed ticks between 1 and 2 units/s. A
            ceiling that binds through the middle of normal motion is a fixed
            deadband wearing a scaled one's name, so 0.16 moves the knee out to
            2.7 units/s -- past that speed contact is the only thing that can
            still be told apart from lag anyway.
        velocity_deadband_grip: The same slope for the **grip** slot, which
            needs its own because the number it multiplies is not comparable.

            Every other slot is radians; the grip is a fraction of a stroke, and
            a hand closes its whole travel in about a third of a second -- 3 or
            more fraction/s, where an arm joint rarely passes 2 rad/s. The arm's
            0.045 applied to that reaches the ceiling on an ordinary squeeze, so
            the grip slot goes quiet exactly while closing on something, which
            is the grasp this whole loop exists to render: a hand shut on a
            solid part stalls part way and a hand shut on air does not, and the
            difference between those is the only thing the gripper has to say.

            0.020 is the grip channel's own measured lag -- fitted at 20 ms
            against a trigger worked at 0.8 Hz -- so it subtracts that slot's
            delay and no more.
        max_deadband_grip: Ceiling for the grip slot, and tighter than the
            arm's for the same reason: a grasp is a *slow* signal against a
            fast command, so a ceiling that rises with the squeeze would hide
            the stall it is meant to report.
        ramp_gain: How steeply the correction grows past the deadband.
        release_hysteresis: How far back inside the deadband a mismatch must
            fall before an energized joint lets go, so a joint sitting on the
            threshold does not chatter on and off.
        max_error: Cap on the correction, so the goal written to a servo is
            never further than this from where the operator's hand actually is.
        p_coefficient: Feetech ``P_Coefficient`` while a joint is energized.
        d_coefficient: Feetech ``D_Coefficient`` while a joint is energized.
        torque_limit: Feetech ``Torque_Limit`` while a joint is energized. The
            ceiling on how hard the arm can push back.
    """

    deadband: float = 0.04
    velocity_deadband: float = 0.045
    max_deadband: float = 0.16
    velocity_deadband_grip: float = 0.020
    max_deadband_grip: float = 0.08
    ramp_gain: float = 5.0
    release_hysteresis: float = 0.01
    max_error: float = 0.2
    p_coefficient: int = 30
    d_coefficient: int = 5
    torque_limit: int = 300

    def __post_init__(self) -> None:
        if not math.isfinite(self.deadband) or not 0.0 <= self.deadband <= 1.0:
            raise ValueError("deadband must be in [0, 1]")
        if not math.isfinite(self.ramp_gain) or not 0.0 < self.ramp_gain <= 20.0:
            raise ValueError("ramp gain must be in (0, 20]")
        if not math.isfinite(self.release_hysteresis) or not 0.0 <= self.release_hysteresis <= self.deadband:
            raise ValueError("release hysteresis must be between 0 and the deadband")
        if not math.isfinite(self.velocity_deadband) or not 0.0 <= self.velocity_deadband <= 1.0:
            raise ValueError("velocity deadband must be in [0, 1] seconds")
        if not math.isfinite(self.velocity_deadband_grip) or not 0.0 <= self.velocity_deadband_grip <= 1.0:
            raise ValueError("grip velocity deadband must be in [0, 1] seconds")
        if not math.isfinite(self.max_deadband_grip) or not self.deadband <= self.max_deadband_grip <= 1.0:
            raise ValueError("grip max deadband must be between the deadband floor and 1")
        if not math.isfinite(self.max_deadband) or not self.deadband <= self.max_deadband <= 1.0:
            raise ValueError("max deadband must be between the deadband floor and 1")
        if not math.isfinite(self.max_error) or not 0.0 < self.max_error <= 1.0:
            raise ValueError("max error must be in (0, 1]")
        if not 0 <= self.p_coefficient <= 254:
            raise ValueError("P coefficient must be in [0, 254]")
        if not 0 <= self.d_coefficient <= 254:
            raise ValueError("D coefficient must be in [0, 254]")
        if not 1 <= self.torque_limit <= 1000:
            raise ValueError("torque limit must be in [1, 1000]")

    @property
    def release_threshold(self) -> float:
        """Mismatch at which an already-energized joint lets go, at rest."""
        return self.deadband - self.release_hysteresis

    def deadband_at(self, speed: float, *, grip: bool = False) -> float:
        """The live threshold for a slot whose own coordinate is moving at ``speed``.

        ``speed`` is in the slot's units per second -- rad/s for an arm joint,
        stroke-fractions per second for the grip -- which is what lets one
        number serve both: the lag it compensates is measured in the same units
        it is expressed in.
        """
        slope = self.velocity_deadband_grip if grip else self.velocity_deadband
        ceiling = self.max_deadband_grip if grip else self.max_deadband
        if slope <= 0.0:
            return self.deadband
        return min(ceiling, self.deadband + slope * abs(speed))

    def release_at(self, speed: float, *, grip: bool = False) -> float:
        """Where an energized joint lets go, at this speed.

        Scaled with the deadband rather than held at a fixed offset below it:
        the hysteresis exists to stop a joint chattering across its own
        threshold, so it has to stay a proportion of that threshold. A 0.01
        band under a deadband that has risen to 0.12 is not hysteresis, it is a
        rounding error -- and the recorded trace that prompted this showed the
        mismatch moving 0.0255 rad in a single 10 ms tick, twice the width of
        the fixed band.
        """
        if self.deadband <= 0.0:
            return self.deadband_at(speed, grip=grip)
        return self.deadband_at(speed, grip=grip) * (self.release_threshold / self.deadband)


def correction(
    leader: float,
    follower: float,
    config: ComplianceConfig,
    *,
    limits: tuple[float, float] | None = None,
    speed: float = 0.0,
    grip: bool = False,
    reference: float | None = None,
) -> tuple[float, float, float]:
    """Deadband, ramp and cap on one joint's mismatch.

    Returns ``(target, mismatch, effective)``: where to command the servo, the
    raw gap it came from, and the correction actually applied after the ramp
    and the cap. ``target`` leads the operator's hand *toward* the simulated
    arm, which is the direction that reads as the scene pushing back.

    Args:
        leader: Where the operator's hand is.
        follower: Where the simulated arm actually is.
        config: The signal parameters.
        limits: Clamp for a joint with a bounded range -- the gripper's
            ``(0, 1)``. Arm joints pass ``None``; the cap already keeps their
            target within ``max_error`` of a real measured position.
        speed: How fast this slot is being moved [units/s], for
            :meth:`ComplianceConfig.deadband_at`. 0 is a hand at rest and gives
            the fixed-deadband behaviour.
        grip: Whether this is the grip slot, which has its own slope and ceiling.
        reference: Where the operator's hand *was* when ``follower`` was
            measured, when that is known and differs from ``leader``. The
            mismatch is taken against this and the target is still built on
            ``leader``, the hand's position now. ``None`` compares against
            ``leader``.
    """
    if not math.isfinite(leader) or not math.isfinite(follower):
        raise ValueError("feedback positions must be finite")
    if reference is None or not math.isfinite(reference):
        reference = leader
    lower = upper = 0.0
    if limits is not None:
        lower, upper = limits
        if not math.isfinite(lower) or not math.isfinite(upper) or not lower < upper:
            raise ValueError("feedback limits must be finite and increasing")
        leader = max(lower, min(upper, leader))
        follower = max(lower, min(upper, follower))
        reference = max(lower, min(upper, reference))
    mismatch = follower - reference
    excess = max(abs(mismatch) - config.deadband_at(speed, grip=grip), 0.0)
    ramped = config.ramp_gain * excess
    effective = math.copysign(ramped, mismatch) if ramped > 0.0 else 0.0
    effective = max(-config.max_error, min(config.max_error, effective))
    target = leader + effective
    if limits is not None:
        target = max(lower, min(upper, target))
    return target, mismatch, effective


@dataclass
class JointGate:
    """One joint's live feedback state, owned by its arm's leader thread.

    Args:
        active: Whether this motor is currently energized.
        neutralized: Whether this joint has passed the re-arm dwell since it
            was last suspended. A suspended joint may not energize on the
            strength of the very sample that ends its suspension.
        neutral_since: When continuous alignment began, or ``None`` if the last
            sample broke it.
    """

    active: bool = False
    neutralized: bool = True
    neutral_since: float | None = None


@dataclass
class JointDecision:
    """What one joint's mismatch came to this tick, for rendering and readout."""

    index: int
    motor: str
    leader: float
    follower: float
    mismatch: float
    effective: float
    active: bool
    target: float
    target_ticks: int
    speed: float = 0.0
    """How fast this slot was moving, which set its threshold."""
    deadband: float = 0.0
    """The threshold that speed produced, recorded so a trace can show it."""


@dataclass
class Proposal:
    """One tick's decisions, plus the gates to commit once they are rendered.

    Two phase on purpose. The caller renders the decisions on its hardware --
    disarm ``newly_inactive`` first, re-target ``continuing``, then arm
    ``newly_active`` -- and only assigns ``gates`` after every write succeeded.
    A failed torque-off must abort the commit so the joint is still considered
    active next tick and the disarm is retried; committing early would leave
    software believing torque is off while the servo stayed live.
    """

    decisions: list[JointDecision]
    gates: list[JointGate]
    newly_active: list[int]
    newly_inactive: list[int]
    continuing: dict[str, int]
    rearmed: bool
    """True on the tick every joint finished its dwell -- worth saying out loud."""


def propose(
    config: ComplianceConfig,
    layout: ArmLayout,
    *,
    leader: list[float],
    follower: list[float],
    gates: list[JointGate],
    now: float,
    neutral_dwell_s: float,
    speeds: list[float] | None = None,
    reference: list[float] | None = None,
) -> Proposal:
    """Decide every joint's coupling from the mismatch. Pure; touches no bus.

    A joint that is not ``neutralized`` must first hold continuous alignment
    for ``neutral_dwell_s`` before it is even *eligible* to energize, and the
    dwell completing only arms it -- a later above-deadband sample is what
    actually switches torque on. Requiring the second sample is what stops a
    joint energizing in the same tick its dwell finished, off a mismatch
    measured while the scene was still settling.
    """
    was_waiting = not all(gate.neutralized for gate in gates)
    decisions: list[JointDecision] = []
    nxt: list[JointGate] = []
    for i in range(layout.width):
        speed = speeds[i] if speeds is not None else 0.0
        # The grip slot is the last one, and the only one whose units are a
        # fraction rather than radians -- which is exactly why it needs its own
        # slope. layout.limits_of marks it for the same reason.
        is_grip = i == layout.width - 1
        target, mismatch, effective = correction(
            leader[i],
            follower[i],
            config,
            limits=layout.limits_of(i),
            speed=speed,
            grip=is_grip,
            reference=reference[i] if reference is not None else None,
        )
        # Both thresholds move with the slot's own speed, so a joint that armed
        # while the hand was fast is judged on the same scale when it is asked
        # to let go -- reading ``release_threshold`` here instead would release
        # against a bar the arming never had to clear.
        release_threshold = config.release_at(speed, grip=is_grip)
        gate = gates[i]
        neutralized, neutral_since, active = gate.neutralized, gate.neutral_since, False
        if not neutralized:
            if abs(mismatch) <= release_threshold:
                if neutral_since is None:
                    neutral_since = now
                elif now - neutral_since >= neutral_dwell_s:
                    neutralized, neutral_since = True, None
            else:
                # Alignment must be *continuous*: a scene mid-settle can look
                # aligned for one frame between two that are not.
                neutral_since = None
        else:
            neutral_since = None
            active = abs(mismatch) > release_threshold if gate.active else effective != 0.0
        nxt.append(JointGate(active=active, neutralized=neutralized, neutral_since=neutral_since))
        decisions.append(
            JointDecision(
                index=i,
                motor=layout.motor_of(i),
                leader=leader[i],
                follower=follower[i],
                mismatch=mismatch,
                effective=effective,
                active=active,
                target=target,
                target_ticks=layout.ticks_of(i, target),
                speed=speed,
                deadband=config.deadband_at(speed, grip=is_grip),
            )
        )
    return Proposal(
        decisions=decisions,
        gates=nxt,
        newly_active=[i for i in range(layout.width) if nxt[i].active and not gates[i].active],
        newly_inactive=[i for i in range(layout.width) if gates[i].active and not nxt[i].active],
        continuing={
            decisions[i].motor: decisions[i].target_ticks
            for i in range(layout.width)
            if nxt[i].active and gates[i].active
        },
        rearmed=was_waiting and all(gate.neutralized for gate in nxt),
    )


# --------------------------------------------------------------------- layout
class ArmLayout:
    """One arm's ``[q_0 .. q_{n-1}, grip]`` slots, and what each one converts to.

    The same layout :func:`~robosimstudio.robots.teleop.lerobot_controller.build_action`
    emits and ``ActionJointPosition`` applies, so a leader reading, a follower
    measurement and a feedback gate all index alike and no conversion needs a
    name lookup in the loop.
    """

    def __init__(self, calibration: ArmCalibration) -> None:
        self.calibration = calibration
        self.joints = calibration.joints
        self.gripper = calibration.gripper
        self.width = len(self.joints) + 1
        """Joints plus the grip slot, which is present even with no gripper."""

    @property
    def motors(self) -> list[str]:
        """Every motor name on this arm's bus, in slot order."""
        names = [joint.name for joint in self.joints]
        if self.gripper is not None:
            names.append(self.gripper.name)
        return names

    def motor_of(self, index: int) -> str:
        """The motor behind one slot; ``""`` for the grip slot of an arm with no gripper."""
        if index < len(self.joints):
            return self.joints[index].name
        return self.gripper.name if self.gripper is not None else ""

    def limits_of(self, index: int) -> tuple[float, float] | None:
        """``(0, 1)`` for the grip slot, which is a fraction of a stroke."""
        return None if index < len(self.joints) else (0.0, 1.0)

    def ticks_of(self, index: int, value: float) -> int:
        """A target in the slot's own units, as a raw goal position.

        Wrapped to the encoder's turn the way every Feetech goal is: these
        servos count 0..4095 and a target is only ever within ``max_error`` of
        a position that was just read back, so the wrap is normalization rather
        than a range decision.
        """
        if index < len(self.joints):
            return int(round(self.joints[index].to_ticks(value))) % ENCODER_RESOLUTION
        if self.gripper is None:
            return 0
        return int(round(self.gripper.to_ticks(value))) % ENCODER_RESOLUTION

    def gates(self) -> list[JointGate]:
        """A fresh gate per slot, suspended until it proves alignment."""
        return [JointGate(active=False, neutralized=False, neutral_since=None) for _ in range(self.width)]

    def read(self, ticks: Mapping[str, float]) -> list[float]:
        """One bus reading as ``[q_0 .. q_{n-1}, grip]`` in the sim's units."""
        values = [joint.to_radians(ticks[joint.name]) for joint in self.joints]
        values.append(self.gripper.to_command(ticks[self.gripper.name]) if self.gripper is not None else 0.0)
        return values


# ------------------------------------------------------------------- hardware
class ServoFault(LeaderError, RuntimeError):
    """A safety fault on a leader bus: stop commanding and tear the session down."""


class LeaderServos:
    """One leader arm's bus: reads its encoders, renders corrections as torque.

    Owns the connection outright. Nothing else may touch this bus -- which is
    why :class:`StudioBridge` stands the studio's own ``Leader arm`` panel
    down: its ``drain()`` would read the same port from the page's thread.

    Args:
        port: The arm's serial device.
        layout: Its slots.
        config: How a correction is rendered.
        connect: ``connect(port, [calibration])`` returning something with a
            ``bus`` and a ``close()``. Defaults to
            :meth:`~robosimstudio.robots.teleop.lerobot_controller.LerobotFeetechController.connect`,
            which is where ``lerobot`` is imported; a test or a simulated
            leader passes its own.
    """

    CONFIG_REGISTERS = ("Operating_Mode", "P_Coefficient", "D_Coefficient", "I_Coefficient")
    """Written to arm feedback, restored on the way out. These live in EEPROM."""

    def __init__(
        self,
        port: str,
        layout: ArmLayout,
        config: ComplianceConfig,
        *,
        connect: Callable[..., Any] | None = None,
    ) -> None:
        self.port = port
        self.layout = layout
        self.config = config
        self.controller: Any = None
        self.saved: dict[str, dict[str, int]] = {}
        self.armed = False
        self._connect = connect

    @property
    def bus(self):
        if self.controller is None:
            raise ServoFault(f"{self.port} is not connected")
        return self.controller.bus

    def connect(self, *, configure: bool = True) -> None:
        """Open the bus, prove torque is off, and optionally arm the feedback loop.

        Args:
            configure: Whether to install the feedback gains. ``False`` is the
                no-feedback path, and it stops short deliberately: those gains
                live in servo **EEPROM**, so writing them for a run that will
                never energize a motor is wear paid for nothing, and it would
                leave a "dry run" having reconfigured the arm. Torque is still
                taken off and verified either way -- that part is not optional,
                whatever the run intends to do afterwards.

        Raises:
            LeaderUnavailable: If the bus could not be opened at all.
            ServoFault: If torque could not be proven off, or a servo came up
                with a nonzero torque limit.
        """
        leader = LeaderPort(name="", port=self.port, serial="", calibration=self.layout.calibration)
        self.controller = open_leader(leader, self._connect)
        motors = self.layout.motors
        self._torque_off(motors, passes=2)
        self._refuse_nonzero_limits(motors)
        if configure:
            self._configure(motors)

    def read_ticks(self) -> dict[str, float]:
        """Raw ``Present_Position`` per motor. ``normalize=False``: the
        calibration is measured against the counts underneath the bus's own
        normalization, not the -100..100 the servo is configured for."""
        return self.bus.sync_read("Present_Position", self.layout.motors, normalize=False, num_retry=2)

    def _configure(self, motors: list[str]) -> None:
        """Install the feedback gains, park every goal, and leave torque off.

        Configuring is not an armed state, and the ordering says so: the
        registers go in while torque is off, the goals are parked at wherever
        the arm currently *is* so a later enable cannot yank it, the torque
        limits go to zero, and only then -- after both gates are read back and
        verified shut -- does this call itself armed.
        """
        present = self.read_ticks()
        # Keep an existing snapshot: after a suspend/resume the live values are
        # the feedback gains, not the originals this has to put back.
        if not self.saved:
            self.saved = {
                motor: {
                    register: int(self.bus.read(register, motor, normalize=False, num_retry=3))
                    for register in self.CONFIG_REGISTERS
                }
                for motor in motors
            }
        desired = {
            "Operating_Mode": 0,
            "P_Coefficient": self.config.p_coefficient,
            "D_Coefficient": self.config.d_coefficient,
            "I_Coefficient": 0,
        }
        for motor in motors:
            for register, value in desired.items():
                current = int(self.bus.read(register, motor, normalize=False, num_retry=3))
                if current != value:
                    self.bus.write(register, motor, value, normalize=False, num_retry=3)
                    time.sleep(EEPROM_WRITE_SETTLE_S)
        self.bus.sync_write(
            "Goal_Position",
            {motor: int(present[motor]) for motor in motors},
            normalize=False,
            num_retry=2,
        )
        self._zero_limits(motors)
        self._torque_off(motors, passes=1)
        self._refuse_nonzero_limits(motors)
        self.armed = True

    def render(self, proposal: Proposal) -> None:
        """Disarm, re-target, then arm -- in that order, on this arm's servos.

        Letting go first is what keeps a tick from ever *adding* torque on the
        way to removing it. Continuing goals ride a single unacknowledged
        ``sync_write``, which is the fast path and safe because those motors
        are already energized against a goal a few ticks old. Arming does not:
        a lost broadcast that enabled torque against a stale goal is exactly
        the failure worth paying acknowledged writes to avoid.
        """
        decisions = proposal.decisions
        if proposal.newly_inactive:
            self._release([decisions[i].motor for i in proposal.newly_inactive])
        if proposal.continuing:
            self.bus.sync_write("Goal_Position", proposal.continuing, normalize=False, num_retry=2)
        if proposal.newly_active:
            motors = [decisions[i].motor for i in proposal.newly_active]
            for i in proposal.newly_active:
                self.bus.write(
                    "Goal_Position", decisions[i].motor, decisions[i].target_ticks, normalize=False, num_retry=3
                )
                self.bus.write(
                    "Torque_Limit", decisions[i].motor, self.config.torque_limit, normalize=False, num_retry=3
                )
            self.bus.enable_torque(motors, num_retry=3)

    def disarm(self) -> None:
        """Take torque off every motor and verify it. Safe to call repeatedly."""
        if self.controller is None:
            return
        self._torque_off(self.layout.motors, passes=1)

    def close(self) -> None:
        """Disarm, put the EEPROM registers back, and prove torque is still off."""
        if self.controller is None:
            return
        motors = self.layout.motors
        errors: list[str] = []
        try:
            self._torque_off(motors, passes=2)
        except Exception as exc:
            errors.append(f"{self.port}: torque-off failed: {exc}")
        for motor, registers in self.saved.items():
            for register, value in registers.items():
                try:
                    self.bus.write(register, motor, value, normalize=False, num_retry=3)
                except Exception as exc:
                    errors.append(f"{self.port}: could not restore {register} on {motor}: {exc}")
        try:
            # Restoring gains rewrites EEPROM, so read the torque gate back one
            # more time after it: this is the last chance to notice a servo
            # that came back up energized.
            self._torque_off(motors, passes=1)
        except Exception as exc:
            errors.append(f"{self.port}: torque-off after gain restore failed: {exc}")
        try:
            self.controller.close()
        except Exception as exc:
            errors.append(f"{self.port}: disconnect failed: {exc}")
        self.controller, self.armed = None, False
        if errors:
            raise ServoFault("; ".join(errors))

    # ------------------------------------------------------------ torque gates
    def _release(self, motors: list[str]) -> None:
        """Let go of these motors, inside the control loop, without stalling it.

        The difference from :meth:`_torque_off` is the settle-and-verify, and
        it is deliberate rather than a shortcut. ``disable_torque`` is an
        *acknowledged* write: a servo that answers has taken the command, and
        there is nothing a readback 250 ms later would add. Paying for one
        anyway would stall this arm's loop for twenty-five ticks at the exact
        moment contact is released -- which the operator feels as a hitch on
        letting go of something, the one place the arm should feel free.

        So the settle is spent only where it buys something: on a servo that
        did **not** acknowledge, where the command may genuinely be lost.
        """
        unacknowledged: list[str] = []
        for motor in motors:
            try:
                self.bus.disable_torque(motor, num_retry=3)
            except Exception:  # answered-for by the verification below
                unacknowledged.append(motor)
        # Unacknowledged is fine for the limits: torque is already gated off
        # above, and arming always rewrites the limit with an acknowledged
        # write before it enables anything.
        self.bus.sync_write("Torque_Limit", dict.fromkeys(motors, 0), normalize=False, num_retry=2)
        if unacknowledged:
            time.sleep(TORQUE_OFF_SETTLE_S)
            stuck = self._still_energized(motors)
            if stuck:
                raise ServoFault(f"{self.port}: torque is still enabled on {', '.join(stuck)}")

    def _torque_off(self, motors: list[str], *, passes: int) -> None:
        """Disable torque, zero the limits, and read both back.

        Every motor is attempted even when an earlier one does not acknowledge:
        one servo swallowing its packet must not skip the rest of the arm.
        """
        for _ in range(max(1, passes)):
            for index, motor in enumerate(motors):
                try:
                    self.bus.disable_torque(motor, num_retry=4)
                except Exception:  # verified by readback below
                    pass
                if index + 1 < len(motors):
                    time.sleep(COMMAND_GAP_S)
        self._zero_limits(motors)
        time.sleep(TORQUE_OFF_SETTLE_S)
        stuck = self._still_energized(motors)
        if stuck:
            for motor in stuck:
                try:
                    self.bus.disable_torque(motor, num_retry=4)
                except Exception:
                    pass
                time.sleep(COMMAND_GAP_S)
            time.sleep(TORQUE_OFF_SETTLE_S)
            stuck = self._still_energized(motors)
        if stuck:
            raise ServoFault(f"{self.port}: torque is still enabled on {', '.join(stuck)}")

    def _still_energized(self, motors: list[str]) -> list[str]:
        """Which motors read back as energized. An unreadable one counts as live.

        Independent per-servo reads rather than one grouped read: a grouped
        parse that dropped a motor would report it as off, which is the one
        wrong answer this check must never give.
        """
        stuck: list[str] = []
        for motor in motors:
            try:
                if int(self.bus.read("Torque_Enable", motor, normalize=False, num_retry=4)) != 0:
                    stuck.append(motor)
            except Exception:  # unreadable is not proof of off
                stuck.append(motor)
        return stuck

    def _zero_limits(self, motors: list[str]) -> None:
        """Acknowledged per-servo ``Torque_Limit`` zeroing, never a broadcast.

        A missed broadcast would leave one servo holding its feedback limit
        while this code believed the whole arm was slack.
        """
        for index, motor in enumerate(motors):
            self.bus.write("Torque_Limit", motor, 0, normalize=False, num_retry=3)
            if index + 1 < len(motors):
                time.sleep(COMMAND_GAP_S)

    def _refuse_nonzero_limits(self, motors: list[str]) -> None:
        limits = {motor: int(self.bus.read("Torque_Limit", motor, normalize=False, num_retry=4)) for motor in motors}
        nonzero = {motor: value for motor, value in limits.items() if value != 0}
        if nonzero:
            raise ServoFault(f"{self.port}: refusing to arm against nonzero torque limits: {nonzero}")


# ----------------------------------------------------------------------- loop
@dataclass
class Sample:
    """One side's latest reading, and when it was taken.

    Args:
        values: ``[q_0 .. q_{n-1}, grip]``.
        at: When it was read.
        reference: For a follower sample, the pose the simulated arm was
            *chasing* when it was measured -- the leader pose applied one page
            step earlier -- or ``None`` when there was none yet.
    """

    values: list[float]
    at: float
    reference: list[float] | None = None


class LeaderArmLoop:
    """One arm's leader thread: its own clock, its own bus, no Warp.

    Publishes what it reads and consumes what the page publishes, through two
    slots under one lock. Everything else it does -- the correction, the gates,
    the servo writes -- happens entirely on this thread.

    Args:
        name: The arm's name, for messages and the trace.
        servos: Its bus.
        config: The signal and how it is rendered.
        rate_hz: The thread's own rate.
        stale_after_s: Floor for how old a follower sample may get before the
            arm is dropped. See :meth:`stale_limit`.
        stale_factor: How many of the page's own step intervals may pass first.
        neutral_dwell_s: Continuous alignment a suspended joint must hold
            before it may energize again.
        feedback: ``False`` reads and publishes only: no proposal is formed and
            no torque register is written from the loop.
        trace: Where per-tick timing goes, when somebody asked.
        notify: Where the two operator messages go -- suspended, and live again.
        compare: What the mismatch is taken against.

            ``"applied"`` compares each follower sample with the leader pose it
            was *chasing*: the action the page applied one step before it read
            the sample back. What is left is the servo's own tracking error --
            the arm not getting where it was told -- and nothing about how long
            the sample took to arrive.

            ``"live"`` compares it with the hand's pose at the instant this
            thread looks, which is what the unmerged script this module came
            from did. Every delay between the two then reads as mismatch: the
            sample's age, and above all the page's own step interval, since a
            target that is refreshed late leaves the arm genuinely behind a hand
            that kept moving. The velocity-scaled deadband was fitted to absorb
            the *typical* delay (35-45 ms), so a late step goes straight through
            it. Stepped in virtual time through one free-space pass of 650
            leader ticks (every joint and the jaw moving, nothing in reach),
            with the page's step made irregular -- ticks on which some motor
            was energized, and the worst mismatch as a fraction of its live
            deadband, arm joints / jaw::

                page step                     "live"               "applied"
                steady 16.7 ms                  0  (0.47 / 0.93)      0  (0.17 / 0.61)
                jittered 13-23 ms              13  (0.49 / 1.22)      0  (0.14 / 0.82)
                one step in 12 late (60 ms)    54  (0.87 / 1.86)      3  (0.29 / 1.45)
                one in 6 late (70-100 ms)     178  (1.27 / 3.34)     36  (0.43 / 1.82)

            What is left under ``"applied"`` is all on the jaw and is the
            simulated finger itself: after a late step its target jumps by
            everything the hand did meanwhile, and one step later it is still
            part way there. The contact cases -- a welded wall, a jaw on a
            welded bar -- read the same either way, because a blocked arm is
            behind its target whichever pose that target is compared through.

            **Only the ``"live"`` form has been felt on hardware.** It is kept
            as a switch for exactly that reason: the default is what the
            software evidence supports, and the rig is what decides.
    """

    SPEED_SMOOTHING = 0.25
    """EMA weight on the newest speed sample: ~40 ms of memory at 100 Hz.

    A differentiated encoder is noisy, and the deadband this drives has to be
    *quieter* than the mismatch it is thresholding or it manufactures the
    chatter it exists to remove. Slow enough to ride out a single bad read,
    fast enough that stopping the hand restores full sensitivity within about
    two frames of the page.
    """

    def __init__(
        self,
        name: str,
        servos: LeaderServos,
        config: ComplianceConfig,
        *,
        rate_hz: float = 100.0,
        stale_after_s: float = 0.25,
        stale_factor: float = 3.0,
        neutral_dwell_s: float = 0.5,
        feedback: bool = True,
        trace: Trace | None = None,
        notify: Callable[[str], None] | None = None,
        compare: str = "applied",
    ) -> None:
        if not 0.0 < rate_hz <= 500.0:
            raise ValueError("the leader rate must be within (0, 500] Hz")
        if not stale_after_s > 0.0:
            raise ValueError("the stale floor must be positive")
        if compare not in COMPARISONS:
            raise ValueError(f"compare must be one of {COMPARISONS}, got {compare!r}")
        self.compare = compare
        self.name = name
        self.trace = trace
        self._rows: list[tuple] = trace.arm(name, servos.layout.motors) if trace is not None else []
        self.servos = servos
        self.config = config
        self.period = 1.0 / rate_hz
        self.stale_after_s = stale_after_s
        self.stale_factor = stale_factor
        self.neutral_dwell_s = neutral_dwell_s
        self.feedback = feedback
        self.notify = notify if notify is not None else _say
        self.layout = servos.layout
        self.gates = self.layout.gates()
        self.fault: BaseException | None = None
        self.decisions: list[JointDecision] = []
        """The last tick's readout. Assigned whole, so a reader never tears."""
        self.suspended = True
        self._lock = threading.Lock()
        self._leader: Sample | None = None
        self._follower: Sample | None = None
        self._gaps: deque[float] = deque(maxlen=8)
        """Recent intervals between the page's publishes: its measured cadence."""
        self._period_measured = 0.0
        self._late = 0.0
        self._glitch = 0
        self._speeds = [0.0] * self.layout.width
        """Per-slot |d(position)/dt|, low-pass filtered. Feeds the live deadband."""
        self._prev_leader: list[float] | None = None
        self._prev_at = 0.0
        self._stop = threading.Event()
        self._thread = threading.Thread(target=self._run, name=f"leader-{name}", daemon=True)

    # ------------------------------------------------------------- the slots
    def publish_follower(self, values: list[float], at: float, reference: list[float] | None = None) -> None:
        """Called from the page's thread with the measured simulated arm.

        Also measures how often the page is managing to publish, which is what
        :meth:`stale_limit` reads. A gap over five seconds is not cadence -- it
        is the page having been away -- so it is not allowed to teach this that
        slow is normal.

        Args:
            values: The measured ``[q_0 .. q_{n-1}, grip]``.
            at: When it was read.
            reference: The pose this measurement was chasing; see :class:`Sample`.
        """
        with self._lock:
            if self._follower is not None:
                gap = at - self._follower.at
                if 0.0 < gap < 5.0:
                    self._gaps.append(gap)
            self._follower = Sample(values, at, reference)

    def stale_limit(self) -> float:
        """How old a follower sample may be before the arm is dropped.

        A fixed threshold cannot serve both a scene that steps in 5 ms and one
        that steps in 400 -- and heavy scenes are real: one contact-rich scene
        this was developed against spent 275 ms per step in physics alone (p95
        452 ms), so a flat 250 ms would call a perfectly healthy page stalled
        on nearly every step and thrash the arm between suspended and
        re-arming.

        So the gate asks the question it actually means -- "has the page
        stopped stepping *as it had been*" -- by scaling the measured cadence,
        with ``stale_after_s`` as a floor for a fast scene. The median rather
        than the mean, so one slow step does not raise the bar for the next
        eight.
        """
        with self._lock:
            gaps = list(self._gaps)
        if len(gaps) < 2:
            return self.stale_after_s
        return max(self.stale_after_s, self.stale_factor * statistics.median(gaps))

    def latest_leader(self) -> list[float] | None:
        """The freshest leader reading, for the page's thread to apply."""
        with self._lock:
            return None if self._leader is None else list(self._leader.values)

    def _take_follower(self) -> Sample | None:
        with self._lock:
            return self._follower

    def _put_leader(self, values: list[float], at: float) -> None:
        with self._lock:
            self._leader = Sample(values, at)

    # ------------------------------------------------------------- lifecycle
    def start(self) -> None:
        self._thread.start()

    def stop(self) -> None:
        """Ask the thread to finish, then wait for it to put torque down itself.

        Joining rather than disarming from here keeps the bus single-threaded
        to the very end -- the loop's own ``finally`` is what disarms.
        """
        self._stop.set()
        if not self._thread.is_alive():
            return
        self._thread.join(timeout=5.0)
        if self._thread.is_alive():
            # It did not come back, so this is the last chance to remove torque
            # and a concurrent write is the lesser risk.
            self.servos.disarm()

    def _run(self) -> None:
        glitches = 0
        deadline = time.monotonic()
        last = None
        try:
            while not self._stop.is_set():
                woke = time.monotonic()
                # The period as *measured*, not as asked for: the gap between
                # consecutive tick starts is what the operator's hand feels, and
                # it is the one number a "choppy" complaint is always about.
                self._period_measured = 0.0 if last is None else woke - last
                self._late = woke - deadline
                last = woke
                self._glitch = 0
                try:
                    self.tick(woke)
                    glitches = 0
                except ConnectionError as exc:
                    # A dropped status packet should not end a session; the arm
                    # barely moves in one period. A run of them is a real fault.
                    glitches += 1
                    self._glitch = glitches
                    if self.trace is not None:
                        self.trace.event(woke, self.name, f"glitch:{type(exc).__name__}")
                    if glitches > MAX_BUS_GLITCHES:
                        raise ServoFault(f"{self.name}: {MAX_BUS_GLITCHES} consecutive bus glitches: {exc}") from exc
                deadline += self.period
                delay = deadline - time.monotonic()
                if delay > 0:
                    time.sleep(delay)
                elif delay < -self.period:
                    deadline = time.monotonic()
        except BaseException as exc:  # recorded, then reported by the session
            self.fault = exc
        finally:
            try:
                self.servos.disarm()
            except BaseException as exc:
                if self.fault is None:
                    self.fault = exc

    def _update_speeds(self, leader: list[float], now: float) -> None:
        """One filtered speed per slot, in that slot's own units per second."""
        prev, prev_at = self._prev_leader, self._prev_at
        self._prev_leader, self._prev_at = list(leader), now
        if prev is None:
            return
        dt = now - prev_at
        if not 1.0e-4 < dt < 1.0:  # a stalled or resumed thread is not a velocity
            return
        a = self.SPEED_SMOOTHING
        for i in range(min(len(prev), len(leader), len(self._speeds))):
            self._speeds[i] = (1.0 - a) * self._speeds[i] + a * abs(leader[i] - prev[i]) / dt

    def tick(self, now: float) -> None:
        """Read the arm, publish it, and render whatever the mismatch asks for.

        One iteration of the thread's loop, callable directly by whoever owns
        the clock instead -- a test stepping the two halves in a fixed order
        does exactly that, and never starts the thread. ``now`` is the time
        the sample is stamped with and staleness is judged against.

        The ``t0..t3`` stamps are the trace's, and they bracket exactly the
        three things that can make a tick overrun: the bus read, the pure
        decision, and the writes that render it. Taken unconditionally --
        ``time.monotonic()`` is tens of nanoseconds and branching on whether a
        trace exists would put a different code path under the instrument than
        the one that runs without it.
        """
        t0 = time.monotonic()
        leader = self.layout.read(self.servos.read_ticks())
        self._put_leader(leader, now)
        self._update_speeds(leader, now)
        t1 = time.monotonic()
        if not self.feedback:
            self._record(now, t1 - t0, 0.0, 0.0, phase=2, age=-1.0, proposal=None)
            return
        follower = self._take_follower()
        limit = self.stale_limit()
        age = now - follower.at if follower is not None else -1.0
        if follower is None or age > limit:
            # The page is paused, loading, or gone. Rendering force against a
            # mismatch this old would push toward where the arm used to be.
            was = self.suspended
            self._suspend()
            if not was and self.trace is not None:
                self.trace.event(now, self.name, "suspend")
            self._record(now, t1 - t0, 0.0, time.monotonic() - t1, phase=1, age=age, proposal=None, limit=limit)
            return
        proposal = propose(
            self.config,
            self.layout,
            leader=leader,
            follower=follower.values,
            gates=self.gates,
            now=now,
            neutral_dwell_s=self.neutral_dwell_s,
            speeds=self._speeds,
            reference=follower.reference if self.compare == "applied" else None,
        )
        t2 = time.monotonic()
        self.servos.render(proposal)
        t3 = time.monotonic()
        # Only now: every write above succeeded. A raised torque-off leaves the
        # old gates in place so the joint is still considered active and the
        # disarm is retried next tick.
        self.gates = proposal.gates
        self.decisions = proposal.decisions
        self.suspended = False
        self._record(now, t1 - t0, t2 - t1, t3 - t2, phase=0, age=age, proposal=proposal, limit=limit)
        if proposal.rearmed:
            if self.trace is not None:
                self.trace.event(now, self.name, "rearm")
            self.notify(f"[{self.name}] alignment held; contact feedback is live again.")

    def _record(
        self,
        now: float,
        read_s: float,
        propose_s: float,
        render_s: float,
        *,
        phase: int,
        age: float,
        proposal: Proposal | None,
        limit: float = 0.0,
    ) -> None:
        """One row into this thread's own list. Never raises into the loop."""
        if self.trace is None:
            return
        n_active = 0
        worst_m = worst_e = 0.0
        worst_slot, worst_speed, worst_db = -1, 0.0, 0.0
        if proposal is not None:
            n_active = sum(1 for g in proposal.gates if g.active)
            worst_e = max((abs(d.effective) for d in proposal.decisions), default=0.0)
            if proposal.decisions:
                # *Which* slot, not just how much: the grip slot is a stroke
                # fraction judged beside six radian joints, so an aggregate
                # worst-of-seven cannot say whether the hand or the arm is
                # driving the chatter.
                worst = max(proposal.decisions, key=lambda d: abs(d.mismatch))
                worst_m, worst_slot = abs(worst.mismatch), worst.index
                worst_speed, worst_db = worst.speed, worst.deadband
        Trace.add(
            self._rows,
            (
                now - self.trace.started,
                self._period_measured,
                self._late,
                phase,
                read_s,
                propose_s,
                render_s,
                age,
                limit,
                n_active,
                len(proposal.newly_active) if proposal is not None else 0,
                len(proposal.newly_inactive) if proposal is not None else 0,
                worst_m,
                worst_e,
                self._glitch,
                worst_slot,
                worst_speed,
                worst_db,
                max(self._speeds) if self._speeds else 0.0,
            ),
            self.trace.limit,
        )

    def _suspend(self) -> None:
        """Drop every motor and put each one back behind the re-arm dwell.

        A transition, not a per-tick action. Once the arm is down there is
        nothing left to write and nothing to read: a verified torque-off sleeps
        and reads back every motor, so repeating it while a page sat paused
        would drop this loop from 100 Hz to about four and flood the bus to
        confirm, over and over, something it already knows.

        ``suspended`` is set only after the disarm succeeds, so a torque-off
        that raised is retried on the next tick rather than being remembered as
        done.
        """
        if self.suspended:
            return
        self.servos.disarm()
        self.gates = self.layout.gates()
        self.decisions = []
        self.suspended = True
        self.notify(f"[{self.name}] no simulation state for over {self.stale_limit():.2f} s; feedback suspended.")

    def status(self) -> str:
        """One line for a readout: what this arm's feedback is doing right now."""
        if self.fault is not None:
            return f"fault: {type(self.fault).__name__}"
        if not self.feedback:
            return "reading only (no motor is energized)"
        if self.suspended:
            return "suspended (waiting for the page)"
        if not all(gate.neutralized for gate in self.gates):
            return "waiting for alignment"
        active = [d for d in self.decisions if d.active]
        if not active:
            return "free"
        return "pushing back: " + ", ".join(f"{d.motor} {d.mismatch:+.2f}" for d in active)


# --------------------------------------------------------------- studio bridge
def jaw_fraction(gripper, joint_q) -> float:
    """How far a hand's *driven* finger joints are from open, 0 open .. 1 closed.

    The inverse of the map a grip command is written through
    (:meth:`~robosimstudio.solvers.Gripper.apply`): each driven joint's
    position along its own open-to-closed travel, averaged over the driven
    joints and clipped. On a mirrored pair with both fingers driven this is
    :meth:`~robosimstudio.solvers.Gripper.closed_fraction`; on a hand that
    drives one finger and carries the other it leaves the carried one out. See
    the module docstring for why that is what the grip slot compares.

    Args:
        gripper: A :class:`~robosimstudio.solvers.Gripper`.
        joint_q: The scene's joint coordinates, already on the host.
    """
    travelled = []
    for coord, open_q, closed_q in zip(gripper.coords, gripper.open_q, gripper.closed_q, strict=True):
        travel = float(closed_q) - float(open_q)
        if abs(travel) > 1.0e-9:
            travelled.append((float(joint_q[coord]) - float(open_q)) / travel)
    if not travelled:
        return 0.0
    return min(1.0, max(0.0, sum(travelled) / len(travelled)))


def preflight(env, layouts: Mapping[str, ArmLayout]) -> None:
    """:func:`~robosimstudio.robots.teleop.lerobot_controller.check_leaders`, for layouts.

    Raises:
        LeaderMismatch: Naming the arm and what the robot has instead.
    """
    check_leaders(env, {name: layout.calibration for name, layout in layouts.items()})


class StudioBridge:
    """The page's half: leader poses in as an action, measured joints back out.

    Everything here runs on the thread that steps the scene, hung off the
    page's ``each_step`` -- the only thread allowed to touch Warp.

    The page is an argument, not an import: anything with ``env`` (the live
    :class:`~robosimstudio.sim.Sim`), ``arms`` (per arm name, something with
    ``suspend()``), ``each_step(fn)`` and a ``quit_requested`` flag. The
    studio's ``StudioSession`` is one; a test passes four attributes.

    Args:
        session: The page.
        loops: One leader loop per driven arm, by the robot's own arm name.
        trace: Where publish timing goes, when somebody asked.
        clock: ``time.monotonic`` unless a test wants its own.
    """

    def __init__(
        self,
        session: Any,
        loops: Mapping[str, LeaderArmLoop],
        trace: Trace | None = None,
        *,
        clock: Callable[[], float] = time.monotonic,
    ) -> None:
        self.session = session
        self.loops = dict(loops)
        self.trace = trace
        self.clock = clock
        self.driven: list[str] = []
        self._env: Any = None
        self.fault: BaseException | None = None
        self.released = False
        self._applied: dict[str, list[float]] = {}
        """Per arm, the leader pose applied at the previous step: what the arm is chasing."""
        self._last_publish: float | None = None

    def pump(self) -> None:
        """One control step's exchange, in the order the page needs it."""
        if self.fault is not None or self.released:
            return
        for loop in self.loops.values():
            if loop.fault is not None:
                self.fault = loop.fault
                self.session.quit_requested = True
                return
        try:
            t0 = self.clock()
            self._pump()
            if self.trace is not None:
                gap = -1.0 if self._last_publish is None else t0 - self._last_publish
                self._last_publish = t0
                env = self.session.env
                Trace.add(
                    self.trace.publishes,
                    (t0 - self.trace.started, gap, int(getattr(env, "step_count", -1)), self.clock() - t0),
                    self.trace.limit,
                )
        except BaseException as exc:  # reported through the same teardown
            self.fault = exc
            self.session.quit_requested = True

    def _pump(self) -> None:
        env = self.session.env
        if env is None:
            return
        if env is not self._env:
            self._adopt(env)
        poses = {}
        for name, loop in self.loops.items():
            pose = loop.latest_leader()
            if pose is not None:
                poses[name] = pose
        apply_arm_actions(env, poses)
        # Read back *after* applying but *before* the step: joint_q still holds
        # the last completed step, so this is where the arm actually got to
        # against the target it was chasing. That lag is the whole signal.
        space = env.use_control("joint_position")
        joint_q = env.state.joint_q.numpy()
        at = self.clock()
        for index, name in enumerate(arm_slots(env)):
            loop = self.loops.get(name)
            if loop is None:
                continue
            ik, gripper = space.arms[index]
            measured = [float(joint_q[coord]) for coord in ik.arm_coords]
            measured.append(jaw_fraction(gripper, joint_q) if gripper is not None else 0.0)
            # joint_q is the state the *previous* step left, so what it was
            # chasing is the pose applied then -- not the one applied just now.
            loop.publish_follower(measured, at, self._applied.get(name))
        self._applied = {name: list(pose) for name, pose in poses.items()}

    def _adopt(self, env) -> None:
        """Take the driven arms off their gizmos, on this scene and each new one.

        Panels are rebuilt per scene load, so a page that swapped scenes would
        otherwise hand its arm back to a gizmo mid-session.

        The studio's own ``Leader arm`` panel is stood down here rather than
        left to race this: it opens a Feetech bus from the *page's* thread, and
        these ports already belong to the leader threads. It is taken out of
        the drain rather than out of the page, and its readout is made to say
        why -- a folder that silently stopped working would be a worse answer
        than one that explains itself.
        """
        self._env = env
        session = self.session
        panel = getattr(session, "leader_arm", None)
        if panel is not None:
            try:
                stand_down = getattr(panel, "stand_down", None)
                if stand_down is not None:
                    stand_down("driven by force feedback")
                else:
                    panel.close()
            except Exception:  # a dead readout must not take the session with it
                pass
            panels = getattr(session, "panels", None)
            if panels is not None and panel in panels:
                panels.remove(panel)
            session.leader_arm = None
        arms = getattr(session, "arms", None) or {}
        self.driven = [name for name in arm_slots(env) if name in self.loops and name in arms]
        for name in self.driven:
            arms[name].suspend()

    def release(self) -> None:
        """Stop driving: later calls to :meth:`pump` do nothing, and the gizmos get their arms back.

        A page keeps every ``each_step`` hook it was given, so a bridge whose
        leaders are gone has to stand down by itself -- otherwise it would go
        on applying the last pose a dead thread published. Main thread.
        """
        if self.released:
            return
        self.released = True
        arms = getattr(self.session, "arms", None) or {}
        for name in self.driven:
            resume = getattr(arms.get(name), "resume", None)
            if resume is not None:
                try:
                    resume()
                except Exception:  # the page may already be half torn down
                    pass
        self.driven = []

    def preflight(self) -> None:
        """:func:`preflight` for this bridge's own loops, against the page's scene."""
        env = self.session.env
        if env is not None:
            preflight(env, {name: loop.layout for name, loop in self.loops.items()})

    def status(self) -> dict[str, str]:
        """:meth:`LeaderArmLoop.status` per arm, for a readout on the page."""
        return {name: loop.status() for name, loop in self.loops.items()}


# -------------------------------------------------------------------- session
class Teleoperation:
    """Leaders driving a page, from the first torque-off to the last.

    A context manager, because the part that matters is the way out: every
    path from here -- the page closing, Ctrl-C, SIGTERM, a fault on a leader
    thread, an exception in the caller's own code -- goes through one teardown
    that stops each thread, takes torque off and verifies it, and puts the
    servos' EEPROM registers back::

        with Teleoperation(studio, leaders, feedback=True) as teleop:
            studio.run()
        raise SystemExit(teleop.exit_code)

    Entering checks the leaders against the robot **before** any bus is
    opened, connects each arm (torque off, verified, and with ``feedback`` the
    feedback gains installed), hooks :meth:`StudioBridge.pump` onto the page's
    ``each_step`` and starts one thread per arm. If any of that fails, whatever
    did open is closed again -- the page included -- before the error leaves:
    a :class:`LeaderMismatch`, a
    :class:`~robosimstudio.robots.teleop.lerobot_controller.LeaderUnavailable`
    or a :class:`ServoFault`, each a sentence a script can print.

    What this cannot cover is the process being killed outright (``kill -9``,
    a power cut to the computer): the servos then keep their last goal and
    torque limit until their own power is cut. Keep that switch in reach.

    Args:
        session: The page. See :class:`StudioBridge` for what it needs; it is
            also closed on the way out if it has a ``close()``.
        leaders: ``{arm name: LeaderPort}``, as
            :func:`~robosimstudio.robots.teleop.lerobot_controller.resolve_leaders`
            returns.
        feedback: ``False`` drives the simulation from the leaders and never
            energizes a motor or touches a servo's EEPROM. The run to take
            first with a new calibration.
        config: The signal and how it is rendered.
        rate_hz, stale_after_s, stale_factor, neutral_dwell_s: As on
            :class:`LeaderArmLoop`.
        trace: A path to write per-tick timing to on the way out, or ``""``.
        trace_limit: Samples kept per stream.
        connect: As on :class:`LeaderServos`.
        notify: Where operator messages go, faults included. Unstated, they
            are printed: status to stdout and faults to stderr.
        compare: As on :class:`LeaderArmLoop`: ``"applied"`` or ``"live"``.
    """

    def __init__(
        self,
        session: Any,
        leaders: Mapping[str, LeaderPort],
        *,
        feedback: bool = True,
        config: ComplianceConfig | None = None,
        rate_hz: float = 100.0,
        stale_after_s: float = 0.25,
        stale_factor: float = 3.0,
        neutral_dwell_s: float = 0.5,
        trace: str | Path = "",
        trace_limit: int = 60_000,
        connect: Callable[..., Any] | None = None,
        notify: Callable[[str], None] | None = None,
        compare: str = "applied",
    ) -> None:
        if not 0.0 < rate_hz <= 500.0:
            raise ValueError("the leader rate must be within (0, 500] Hz")
        if not stale_after_s > 0.0:
            raise ValueError("the stale floor must be positive")
        if compare not in COMPARISONS:
            raise ValueError(f"compare must be one of {COMPARISONS}, got {compare!r}")
        self.compare = compare
        self.session = session
        self.leaders = dict(leaders)
        self.feedback = bool(feedback)
        self.config = config if config is not None else ComplianceConfig()
        self.rate_hz = float(rate_hz)
        self.stale_after_s = float(stale_after_s)
        self.stale_factor = float(stale_factor)
        self.neutral_dwell_s = float(neutral_dwell_s)
        self.trace_path = Path(trace) if trace else None
        self.trace = Trace(limit=trace_limit) if trace else None
        self.notify = notify if notify is not None else _say
        self._warn = notify if notify is not None else _warn
        self._connect = connect
        self.servos: list[LeaderServos] = []
        self.loops: dict[str, LeaderArmLoop] = {}
        self.bridge: StudioBridge | None = None
        self.fatal: BaseException | None = None
        self.errors: list[str] = []
        self.exit_code = 0
        self._handlers: dict[int, Any] = {}

    # ------------------------------------------------------------------- in
    def __enter__(self) -> Teleoperation:
        layouts = {name: ArmLayout(leader.calibration) for name, leader in self.leaders.items()}
        self._catch_signals()
        try:
            env = getattr(self.session, "env", None)
            if env is not None:
                preflight(env, layouts)  # before any bus is opened
            for name, leader in self.leaders.items():
                servos = LeaderServos(leader.port, layouts[name], self.config, connect=self._connect)
                # Listed before it is connected: a connect that fails half way
                # has a bus open, and close() is what puts it back.
                self.servos.append(servos)
                servos.connect(configure=self.feedback)
                self.loops[name] = LeaderArmLoop(
                    name,
                    servos,
                    self.config,
                    rate_hz=self.rate_hz,
                    stale_after_s=self.stale_after_s,
                    stale_factor=self.stale_factor,
                    neutral_dwell_s=self.neutral_dwell_s,
                    feedback=self.feedback,
                    trace=self.trace,
                    notify=self.notify,
                    compare=self.compare,
                )
                state = "feedback gains installed" if self.feedback else "gains untouched (no feedback)"
                self.notify(
                    f"{name}: leader on {leader.port} (serial {leader.serial}), "
                    f"{len(servos.layout.motors)} motors, torque off, {state}"
                )
            self.bridge = StudioBridge(self.session, self.loops, self.trace)
            self.session.each_step(self.bridge.pump)
            for loop in self.loops.values():
                loop.start()
        except BaseException:
            self._teardown()
            self._restore_signals()
            raise
        if self.feedback:
            config = self.config
            scaled = (
                f"+{config.velocity_deadband:g}*speed capped {config.max_deadband:g}"
                if config.velocity_deadband > 0
                else ""
            )
            self.notify(
                f"Force feedback armed on {', '.join(self.loops)} at {self.rate_hz:g} Hz. "
                f"Torque stays off in free space (deadband={config.deadband}{scaled}, ramp={config.ramp_gain}, "
                f"cap={config.max_error}, P={config.p_coefficient}, D={config.d_coefficient}, "
                f"torque_limit={config.torque_limit})."
            )
        else:
            self.notify(f"Driving {', '.join(self.loops)} without feedback: no motor will be energized.")
        return self

    # ------------------------------------------------------------------ out
    def __exit__(self, exc_type, exc, tb) -> bool:
        interrupted = exc_type is not None and issubclass(exc_type, KeyboardInterrupt)
        if exc is not None and not interrupted:
            self.fatal = exc
        self._teardown()
        self._restore_signals()
        self._report(raised=exc is not None and not interrupted)
        # Ctrl-C is how a session is ended, not a failure; anything else the
        # caller's code raised is theirs to see, after the arm is slack.
        return interrupted

    def status(self) -> dict[str, str]:
        """One line per arm for a readout: free, pushing back on which motor, suspended."""
        return {name: loop.status() for name, loop in self.loops.items()}

    def _teardown(self) -> None:
        """Every arm, even if one throws: an arm left holding its feedback
        gains is exactly what this must not walk away from."""
        for loop in self.loops.values():
            try:
                loop.stop()
            except Exception as exc:
                self.errors.append(str(exc))
        if self.bridge is not None:
            self.bridge.release()
        for servos in self.servos:
            try:
                servos.close()
            except Exception as exc:
                self.errors.append(str(exc))
        close = getattr(self.session, "close", None)
        if close is not None:
            try:
                close()
            except Exception:  # a page's own run() closes it already on the normal path
                pass
        if self.trace is not None and self.trace_path is not None:
            # After every arm is slack: a trace is worth having even from a run
            # that faulted -- especially then -- but never at the cost of
            # delaying a torque-off, and its own failure is reported, not raised.
            try:
                self.notify(f"\n[trace]\n{self.trace.write(self.trace_path)}")
                self.notify(f"[trace] written to {self.trace_path}")
            except Exception as exc:
                self.errors.append(f"could not write trace to {self.trace_path}: {exc}")

    def _report(self, *, raised: bool) -> None:
        fatal = (
            self.fatal
            or (self.bridge.fault if self.bridge is not None else None)
            or next((loop.fault for loop in self.loops.values() if loop.fault), None)
        )
        self.fatal = fatal
        if fatal is None and not self.errors:
            self.notify("\nStopped; leader torque is off.")
            self.exit_code = 0
            return
        self.exit_code = 1
        if fatal is not None and not raised:
            if not isinstance(fatal, LeaderError):
                self._warn("".join(traceback.format_exception(type(fatal), fatal, fatal.__traceback__)).rstrip())
            self._warn(f"\nSAFETY STOP: {type(fatal).__name__}: {fatal}")
        for error in self.errors:
            self._warn(f"SHUTDOWN ERROR: {error}")
        self._warn("Closed after requesting torque-off on every configured motor.")

    # -------------------------------------------------------------- signals
    def _catch_signals(self) -> None:
        """Route SIGTERM and SIGHUP through the same teardown Ctrl-C takes.

        A terminated process otherwise dies between two ticks with whatever
        torque it had enabled still enabled. Only possible from the main
        thread, which is where a page's loop runs; elsewhere this is a no-op
        and the caller's own shutdown has to reach ``__exit__``.
        """
        if threading.current_thread() is not threading.main_thread():
            return

        def _interrupt(signum, frame):
            raise KeyboardInterrupt

        for name in ("SIGTERM", "SIGHUP"):
            signum = getattr(signal, name, None)
            if signum is None:
                continue
            try:
                self._handlers[signum] = signal.signal(signum, _interrupt)
            except (ValueError, OSError):
                pass

    def _restore_signals(self) -> None:
        for signum, handler in self._handlers.items():
            try:
                signal.signal(signum, handler)
            except (ValueError, OSError, TypeError):
                pass
        self._handlers = {}
````

## robosimstudio_studio/session.py

````text
# SPDX-License-Identifier: Apache-2.0
"""One browser page for a task: load it, drive it, run its policies, keep it, film it.

The loop a person is in while developing a task is *look at it, poke it, run the
graph, watch where it went wrong, film that bit, change something, again* -- and
every lap of it used to cost a process start, which on a tape scene is 40 s. So
this is that loop on one page over one compiled scene:

* **Load** any registered task by picking it from a menu -- selecting loads,
  there is no second button -- and without restarting, because the viewer
  outlives the environment and the browser stays connected across the swap.
* **Drive** it: drag each arm's gizmo, squeeze its fingers on a slider, and
  drag the scene itself around by clicking things and pulling on them.
* **Run** any policy the task ships -- its graphs or its scripted routine --
  in process, from one control.
* **Record** what you drove, as takes, into an ordinary run directory.
* **Export** an mp4 through the offline renderer, from state captured while it
  ran.

The headless half of the stack is ``scripts/bench_run.py``: the same rollout, the same
rows, the same run directory, without a browser. This page is where a person
works; that is where a machine does.

**The interaction is a drag and a slider.** Each arm carries a 6-DOF transform
gizmo on its tool centre and tracks it every step; the fingers are a Close
slider. Nothing is proposed, flown or welded -- what a hand ends up holding is
whatever its friction and the contact settings let it hold, which is the thing a
stack coupling rigid fingers to a VBD cloth in one substep exists to show.

A click resolves the ray against the model's own geometry
(:mod:`~robosimstudio_studio.pick`) and then *takes hold* of what it
found -- a wrench on a body, a pin on the patch of cloth under the cursor -- on
a handle that is draggable the moment it is drawn
(:mod:`~robosimstudio_studio.handles`). :data:`StudioConfig.handles` of
them per kind, so a sheet can be held by two corners and carried as a pair.

**Two modes, one loop.** Teleop steps with
:meth:`~robosimstudio.core.env.EnvBase.step_teleop`, which advances from whatever
the panels wrote into ``joint_target_q`` -- an IK solve of a grasp's current leg,
or of the cursor being carried. A *policy* run -- a graph or the task's scripted routine, from the one
Policy control -- steps with
``env.step(policy.get_action(obs), mode=policy.control_mode)``, the exact shape
a headless rollout uses, because a policy that behaved
differently here than under ``scripts/bench_run.py`` would make this page a liar about
the numbers it shows. The panels that write joint targets (the arms) are not
drained while a policy holds the arm, and neither is the episode panel, whose
``drain`` ticks the stateful evaluator that ``env.step`` is already ticking.

**Export is deferred; the live view is opt-in.** Capturing is copying ``body_q``
and ``particle_q`` into a ring buffer -- microseconds -- and the render happens
when you press Export, as an offline replay of that buffer
(:class:`~robosimstudio.core.render.offline.OfflineRenderer`). No solver runs, so the video is the trajectory you watched, photographed
differently. That is the right default because a *deliverable* is better looked
at afterwards, larger, and through a better backend.

Watching through the cameras is a different question -- whether the rig a policy
is scored through is pointed at anything, whether the depth channel has the
object in it -- and the ``Cameras`` folder answers it, off until asked. It
renders on the loop's own thread, so the frames it draws are time the simulation
does not get; :class:`~robosimstudio.core.render.live.RenderBudget` bounds that
share against a *measured* frame cost and the readout says what it is actually
taking. The environment's own rig (``obs_renderer``) runs only while something
reads it -- a policy with perception nodes, a take being recorded, or that view
on its observation source. An idle scene rendering it for nobody cost 19% of its
step rate, which is why :meth:`StudioSession.wants_pixels` is a question.

**Refreshing the browser is paced on wall clock, not counted in steps.**
``render_every`` is a frame rate to hold, and a state the viewer already has is
not re-sent; see :meth:`StudioSession.refresh_view` for why a step count was the
wrong meter and why the render budget is not the right replacement.

The viser threading contract from
:mod:`~robosimstudio_studio.panels` holds throughout: callbacks assign
plain attributes and nothing else, and every Warp and file touch happens on the
main thread inside ``drain``.
"""

from __future__ import annotations

import time
import traceback
from contextlib import contextmanager
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import numpy as np

from robosimstudio.core.profile import parse_modes
from robosimstudio.core.render.palette import GROUND
from robosimstudio.scene.registry import get_cell
from robosimstudio.specs import RecordSpec, TaskSpec

from . import seams
from .cameras import PanelCamera
from .controls import PanelRecord, PanelVideo
from .garments import GARMENT_STYLES, garment_visuals, scene_repaints_live, viewer_studio
from .inspector import PanelInspector
from .leader_arm import PanelLeaderArm
from .lighting import LightingRig, PanelLighting
from .overlay import PanelOverlay
from .panels import Panel, PanelArm, PanelCloth, PanelObject
from .pick import ScenePicker
from .regions import PanelRegions
from .render_view import PanelRenderView
from .scene_panel import PanelScene
from .scenery import draw_scenery
from .selection import SceneIndex, Subject
from .tuning.panels import PanelReadings, PanelTune

__all__ = ["CONTROL_PANELS", "SPEEDS", "Refused", "StudioConfig", "StudioSession"]

CONTROL_PANELS = (PanelArm, PanelLeaderArm)
"""Panels the studio does not drain while a policy is driving.

The arm panels write ``joint_target_q``, which is the policy's to write. The
leader-arm panel writes the same ``joint_target_q`` the arm panels do -- another
live input, not a second policy -- so it sits out for the same reason they do.

The goal panel sits out with them, and is not in this tuple only because its
class belongs to the page's benchmark half and cannot be named here: it calls
``env.evaluate()``, which ``env.step`` already calls once per step, and an
evaluator counting consecutive grasps is not indifferent to being asked twice.
:meth:`StudioSession.tick` skips it by identity -- the session's own
``goal_panel`` -- which is the same set of panels this tuple held when it could
name all three.
"""

STAGE_THICKNESS = 0.012
"""The stand-in work surface's slab thickness [m]. Thin on purpose: the real
table was hidden because its bulk swallowed the arm gizmos, and a stage that
brought the bulk back would only re-earn the hiding."""

STAGE_CLEARANCE = 0.0015
"""How far the stage top sits below the real work surface [m]. The hidden
furniture's top is exactly ``surface_z`` and so is everything resting on it, so
a stage drawn flush would be coplanar with every settled cloth and shimmer."""

STAGE_MARGIN = 1.15
"""Stage size as a fraction of the furniture it stands in for. A little larger,
so an object near the table edge still has ground under it in the picture."""

STAGE_COLOR = tuple(round(255.0 * c) for c in GROUND)
"""The stand-in's colour, 0-255. :data:`~robosimstudio.core.render.palette.GROUND`,
which is the dark slate every real table top is already painted.

Derived rather than chosen. It was a warm off-white, picked on its own merits --
seamless paper, light enough for contact shadow to be what gives the scene
depth. The merits were real and the value still disagreed with the thing it
stands in for: the slab is drawn *because* the bench is hidden, so toggling
``Show scenery`` swapped a near-white ground for a dark one and the picture
changed more than the visibility of one box. Taking the palette's own answer for
"table top, and anything else a task merely happens on top of" makes the toggle
show the furniture and nothing else, and inherits the crush measurement behind
that entry -- high enough that nothing painted against it is lost, low enough
that everything a task is about still reads.

Two things do change with the value, and both are the palette's trade already:
contact shadow has less room to darken into, so *thickness* leans more on the
environment map's shading across a curve and less on the shadow under it; and
the pale things -- a cream towel, a white film, a steel tool -- now separate
from the ground immediately instead of being found against it.
"""

SPEEDS: dict[str, float] = {"1x": 1.0, "0.5x": 0.5, "0.25x": 0.25, "0.1x": 0.1, "max": 0.0}
"""Playback rates, as a fraction of the task's control rate. ``max`` is unpaced.

Slow motion earns its place on a page about deformables: a peel front travelling
along a strip, or cloth sliding out from between two fingers, happens over a
handful of control steps at 1x and is the whole result.
"""


PANEL_SETS: dict[str, tuple[str, ...]] = {
    "all": (),
    "drive": ("inspector", "overlay", "arm", "object", "cloth"),
}
"""Named panel selections for :attr:`StudioConfig.panels`. Empty means no filter.

``drive`` is the page as a *demonstration*: the things you take hold of, and the
sliders behind whichever one you clicked. What it leaves out is the half of the
studio that is about producing something -- cameras, video, takes, material
presets, regions, the event log, a leader arm -- which is exactly the half an
example has no use for and the reason ``examples/`` was reported as showing too
much. The scene list goes with them: clicking a thing is the way in, and a
dropdown over every subject in the scene is a second one nobody asked for. The
overlay stays with the inspector: it has no folder of its own, and it is what
the inspector's ``Draw`` checkboxes draw with.

Two things are not panels and are handled either side of this. Transport --
Pause, Speed, Reset -- is built inline by :meth:`StudioSession.build_gui` and
every selection keeps it, because a page you cannot stop is not a page. The
``Appearance`` fold is built inline too but *is* gated, through
:meth:`StudioSession._wants`, because how the bench is shaded is a decision made
once a session and a page showing one rope never makes it.

A task's page keeps :data:`DOCUMENT_PANELS` as well, under any named selection.
"""

DOCUMENT_PANELS: tuple[str, ...] = ("goal", "solution", "regions")
"""What a named selection keeps on a *task's* page, on top of its own keys.

A selection is named for what a page is showing, and on a task the document is
that: what is asked (``goal``), the regions it is asked about (``regions``),
and the policies that answer it (``solution``, the Policy folder and its Run).
``drive`` was written for hand-assembled scenes and dropped all three, so
:func:`robosimstudio.view` on a task -- whose default is ``drive`` -- opened a
page with a cube, a hand and no square to put it in, no clause to turn true and
no Run to press. A bare scene has no document, and there a selection is
exactly its keys.

``task``, the menu, is not one of them: it swaps the page onto another
document, and a page opened on one task is about that task. Keys given
explicitly are taken as they are, because a caller who listed them has said
exactly what the page is for.
"""


def panel_key(panel: Any) -> str:
    """What :attr:`StudioConfig.panels` calls one panel.

    Derived from the class name rather than declared on a base class, because
    there are two panel bases and only one of them is a class: the tuning
    panels duck-type the protocol on purpose (see
    :class:`robosimstudio_studio.tuning.panels.Panel`) so the studio's module
    is not imported back into them. A ``key`` attribute wins where the derived
    spelling is wrong.
    """
    return str(getattr(panel, "key", "") or type(panel).__name__.removeprefix("Panel").lower())


@dataclass(frozen=True, kw_only=True)
class StudioConfig:
    """How a studio session is set up. Every field has a working default.

    Grouped by what it configures rather than alphabetically, because the groups
    are what a caller changes together: the environment under the page, the page
    itself, how a graph is run, and what an export produces.

    Attributes:
        scene: Which registered place to stage the task in, or ``""`` for its
            own. Must be a pairing the task declares -- the page offers only
            those, so this is for starting somewhere other than the default.
        embodiment: Which registered robot, or ``""`` for the task's own.
        gripper: Which registered hand to put on every arm, or ``""`` for the
            robot's own. Same rule.
        device: Warp device, or ``None`` for the default.
        control_mode: Override every task's declared action space. A task's
            shipped graph and routine may not speak the same one.
        max_steps: Control steps before a policy run truncates; 0 uses the
            task's own, which is sized per variant. Teleop ignores it.
        obs_renderer: Backend for the cameras a policy observes through; ``""``
            gives it no pixels. This is the environment's own rig, not a view --
            a graph with perception nodes needs it. The rig is built either way
            and only *runs* while something reads it, so leaving this on costs
            build time rather than step rate.
        obs_render_every: Control steps between observation renders.
        port: viser port; the next one up is taken when it is busy. The page
            listens on every interface (``0.0.0.0``), not only ``localhost`` --
            Newton's viewer has no host option -- so anyone who can reach the
            port can drive the scene: firewall it on a shared network, or reach
            it over an SSH tunnel (``ssh -L 8080:localhost:8080 <box>``).
        share: Request a public viser share URL as well. Off by default.
        out: Where run directories, videos and traces go.
        render_every: How often to refresh the browser, as one frame per this
            many control steps *at the task's control rate*. It is a frame rate,
            not a step count, so an unpaced session holds this picture rate
            rather than drawing as fast as it happens to step -- see
            :meth:`StudioSession.refresh_view`.
        speed: Initial playback rate, a key of :data:`SPEEDS`.
        record: What a recorded take keeps.
        settle_steps: Steps to keep stepping after a graph finishes, so the
            evaluator scores a settled scene.
        privileged: Start with the ``sim.*`` tools available to a graph.
        roll: The roll contract -- ``auto``, ``free`` or ``held``.
        motion: How ``robot.go_to_pose`` moves -- ``osc`` or ``plan``.
        video_fps: Frame rate of an exported mp4.
        capture_every: Capture one control step in this many.
        buffer: Frames of state kept for export.
        leader_arm_ports: Starting serial device per arm name, e.g.
            ``(("left", "/dev/yam_leader_left"), ("right", "/dev/yam_leader_right"))``
            -- a bimanual leader is two independent Feetech buses, one per arm,
            not one bus daisy-chaining both. Only a starting value for the
            panel's own per-arm fields; an arm named here that the loaded
            pairing does not have is simply unused.
        leader_arm_calibration: A JSON calibration file, one entry per arm
            name; see :func:`~robosimstudio.robots.teleop.lerobot_controller.load_calibration`.
            Also only a starting value.
    """

    # the environment under the page
    scene: str = ""
    embodiment: str = ""
    gripper: str = ""
    device: str | None = None
    control_mode: str = ""
    max_steps: int = 0
    num_worlds: int = 1
    """Worlds in the page. 1 is the interactive scene; above one the page
    becomes a grid of worlds each running its own episode, and the tools that
    drive *a* scene -- the arm gizmo, picking, handle dragging -- go away,
    because there is no sensible version of them across three hundred worlds."""
    fleet_solution: str = ""
    """What drives the worlds when there is more than one. Empty holds them."""
    fleet_solution_kwargs: tuple[tuple[str, Any], ...] = ()
    fleet_loop: bool = False
    """Start the next wave when one finishes, so a page left open keeps working."""
    show_worlds: int = 64
    """Draw at most this many of them, whatever the world count."""
    obs_renderer: str = "tiled"
    obs_render_every: int = 4
    # the page
    panels: str | tuple[str, ...] = "all"
    """Which panels the page builds: a key of :data:`PANEL_SETS`, or the keys.

    ``all`` is every panel the scene warrants, which is what a launcher and the
    benchmark want. :func:`robosimstudio.view` passes ``drive`` instead --
    see its docstring for why the two doors default differently. A name keeps
    :data:`DOCUMENT_PANELS` too on a task's page.
    """
    port: int = 8080
    share: bool = False
    dark_mode: bool = False
    """Dark browser chrome, and with it a near-black canvas.

    viser has no separate canvas colour: the 3D view's background follows the
    UI theme, ``#fff`` in light mode and Mantine's darkest grey in dark. The
    studio shipped hard-coded to dark, which is why every scene sat in a black
    void; light is the default now because the page is a product-viz stage --
    shadows on a white ground read, and a cream towel is not a silhouette.
    """
    out: str = "outputs/studio"
    material_dir: str = "assets/materials"
    cameras: bool = True
    """Offer the ``Cameras`` folder at all, on a task that declares any."""
    live: bool = True
    """Start with the live camera view on.

    On, because the rig is part of the task: a page that opens on a scene
    without showing what the scene is *photographed as* hides the thing half
    these tasks are scored through, and "why is the policy failing" is a
    question about the pixels more often than it is a question about the
    geometry. The budget below is what makes this affordable to leave on --
    it costs a bounded share of the loop rather than an unbounded one.
    """
    live_frustums: bool = True
    """Draw each task camera in the 3D scene as a frustum showing its own view.

    Click one to fly the browser there and look through it. This is also where a
    camera is *aimed*: with a frustum selected, ``Set from view`` adopts wherever
    you have flown to as that camera's pose.
    """
    live_fps: float = 15.0
    live_load: float = 0.3
    """Largest share of wall clock the live view may spend rendering.

    Measured, not assumed -- see :class:`~robosimstudio.core.render.live.RenderBudget`.
    A backend that costs more than the loop can spare self-limits against this
    instead of eating it -- and a path tracer's *first* frame, which is a USD
    export and a scene load rather than a render, costs seconds.
    """
    live_width: int = 0
    live_height: int = 0
    """Resolution for the ``own renderer`` source; 0 uses each camera's own."""
    live_channels: tuple[str, ...] = ("rgb",)
    backdrop: bool = True
    """Draw the scene's registered backdrop -- the floor, the walls, the lab set.

    Not to be confused with :attr:`show_scenery`, which is about the *model's*
    own statics (the bench, the table) and stays off because their bulk swallows
    the gizmos. This is the room around them, which the path tracer has always
    drawn and the page never did: ``room.py`` records the measurement that says
    why it matters more than the lights do -- two dome HDRIs of quite different
    radiance rendered to 86.77 and 86.95, because the tracer ignores the dome's
    texture entirely. **What reaches the picture is geometry.**
    """
    world_model: bool = False
    """Start with the **World model** switch on: the page's 3D view is then a
    path-traced frame of the browser's own camera, with the gizmos and handles
    drawn over it -- see :mod:`robosimstudio_studio.render_view`. Off is
    viser's own WebGL scene.

    **Off by default.** A page should open at the speed it can always sustain
    and let somebody ask for the expensive view; it also costs a browser about
    a minute to get its first path-traced frame, and a page that spends its
    first minute looking like it has not loaded reads as broken. Ignored
    where ``ovrtx`` is not installed.
    """
    render_view_scale: float = 0.5
    """Fraction of the viewport the path-traced frame is rendered at.

    Half scale renders in about a quarter the time of full and the browser
    upscales it; below a half the curve flattens, because what the tracer costs
    per frame is mostly passes rather than pixels. 1.0 is pixel-for-pixel.
    """
    render_view_passes: tuple[int, int] = (1, 6)
    """Tracer passes while moving, and once still.

    One pass is noisy and live (~40 fps at half scale); six is what an export
    converges over. The pair is the whole quality dial, because ``accumulate``
    is read per render.
    """
    show_scenery: bool = False
    """Draw the scene's own furniture -- the bench, the table, the arena.

    Off by default, and the reason is the gizmo rather than taste: an arm's
    transform control sits on the tool centre, which on a tabletop task is a few
    centimetres above a table the size of the view. The gizmo ends up *inside*
    that geometry, where the browser hit-tests the table first and the handles
    cannot be grabbed at all. Hiding the furniture leaves the robot, the objects
    and the cloth, which is what there is to look at anyway.

    **Furniture means the scene's statics, not the task's.** The panel a film
    is stuck to and the box a tape is wound onto are the task, and a peel off
    an invisible substrate is not a picture of a peel -- so only the statics
    the *scene* declares (the bench, the table) are hidden, and in their place
    a plain light stage slab is drawn at the work surface so the cloth still
    rests on something and the key light still has somewhere to cast.

    Display only. Collision is untouched -- only the ``VISIBLE`` flag is cleared,
    never ``COLLIDE_SHAPES`` -- so the bench a towel is resting on goes on
    holding it up while invisible.
    """
    render_every: int = 4
    speed: str = "1x"
    handles: int = 2
    """How many things may be held by hand at once, per kind.

    Two, because one grip can only translate a sheet and two can fold it --
    which is the same reason PhysTwin's playground offers ``--n_ctrl_parts 2``.
    Each slot costs a dragger, and a dragger is a substep hook that has to be in
    the captured graph, so this is fixed when a task loads rather than grown on
    demand; the cost of an unused slot is a kernel launch over nothing.
    """
    cloth_look: str = "fluffy"
    """How the deformables are drawn -- ``fluffy``, ``shell`` or ``flat``.

    See :mod:`~robosimstudio_studio.garments`. A starting value only:
    like the lighting it is judged by looking, so the live control in the View
    folder is the one that matters.
    """
    lighting: LightingRig = field(default_factory=LightingRig)
    record: RecordSpec = field(default_factory=RecordSpec)
    # running a graph
    settle_steps: int = 60
    privileged: bool = True
    roll: str = "auto"
    motion: str = "osc"
    # exporting video
    video_fps: int = 30
    capture_every: int = 2
    buffer: int = 900
    # teleop from a leader arm, alongside the gizmo drag
    leader_arm_ports: tuple[tuple[str, str], ...] = ()
    leader_arm_calibration: str = ""
    # measuring the loop
    profile: str = ""
    """Which profiling instruments to arm: ``wall``, ``device``, ``syncs``.

    Empty is a normal session, and costs about a hundred nanoseconds per phase
    for the disabled spans the loop carries unconditionally. See
    :class:`~robosimstudio.core.profile.Profiler` for what each mode measures
    and what it costs to measure it.
    """
    profile_steps: int = 0
    """Stop and report after this many stepped iterations. 0 serves normally."""
    profile_warmup: int = 0
    """Steps to run before the measurement starts.

    Not optional in practice on this page. A browser viewer's first frames cost
    ~300 ms and fall to ~11 ms after a hundred-odd of them, a scene's first
    steps run eager until the graph is captured, and a tiled sensor compiles its
    megakernel on first use -- so a window that includes the warm-up measures the
    warm-up. :func:`~robosimstudio.core.profile.Profiler.reset` at the boundary
    keeps the phase names and discards their samples.
    """
    profile_out: str = ""
    """Where the JSON sidecar lands; empty puts it under ``out/profile``.

    All three are read by :meth:`StudioSession.run`, as the defaults for its
    own ``steps`` and ``warmup``; the sidecar is written only when
    :attr:`profile` armed something."""


class Refused(ValueError):
    """This pairing will not be compiled, and the message *is* the reason.

    A named type only because of how it is reported. A refusal is a sentence
    somebody wrote about the pairing -- ``admits``' words, or an embodiment's
    own :attr:`~robosimstudio.specs.EmbodimentSpec.unbuildable` -- and printing
    a stack over it buries the one line that answers the click. A compile that
    broke is the other case, and there the stack is what a reader needs.

    Both leave the page untouched and put the menu back, which is the part that
    must not differ: this is a load that did not happen, not a new failure mode.
    """


class StudioSession:
    """The page: one viser server, one environment at a time, one loop.

    The viewer outlives the environment, which is what lets the task menu load
    another scene under a browser that stays connected: ``set_model`` swaps the
    model and the panels are recomposed from the new scene's handles.

    **One class over two kinds of scene.** A built
    :class:`~robosimstudio.sim.Sim` is adopted as it stands and needs nothing
    beyond the library. A *task* -- an id, a ``TaskSpec`` -- has to be resolved
    and compiled, and brings a menu, a goal and policies with it; that half
    lives in the page's benchmark add-on and is reached through :meth:`_bench`,
    so the class is the same wherever the benchmark tier is installed and says
    one sentence about it where it is not.

    Args:
        task: What to open: a built scene, or a task as ``"<suite>/<variant>"``.
        episode: Which episode to start on.
        config: Everything else.
    """

    _narrowed = ""
    """Why the page built one world when more were asked for; cleared once said."""

    def __init__(self, task, *, episode: int = 0, config: StudioConfig | None = None) -> None:
        """Open a page.

        Args:
            task: A registered task id, a built
                :class:`~robosimstudio.specs.TaskSpec`, or a
                :class:`~robosimstudio.sim.Sim` that is already built. The last
                is the whole point of the tier split: a scene you assembled by
                hand gets the same page a benchmark does, minus the panels that
                need a document.
            episode: Which episode to start at. Ignored for a ``Sim``.
            config: Ports, renderers, lighting, output directory.
        """
        self.config = config or StudioConfig()
        if not hasattr(task, "pipeline"):
            # A task, which is the benchmark half's to load. Asked for before
            # the viewer exists, so an install without that half answers with
            # its one sentence rather than with a server left on the port.
            self._bench(f"opening the studio on the task {getattr(task, 'full_name', task)!r}")
        self.viewer = viewer_studio(port=self.config.port, share=self.config.share)
        if self.config.cloth_look in GARMENT_STYLES:
            self.viewer.set_garment_style(self.config.cloth_look)
        self.server = self.viewer._server
        # Immediately after the viewer, which lights the scene with a single
        # ambient light and no environment map -- directionless, so nothing is
        # shaded by its own geometry and a folded sheet is indistinguishable
        # from a flat one. Applied to the server rather than to the environment,
        # so it survives a task being swapped underneath the page.
        self.lighting = PanelLighting(self.server, self.config.lighting, viewer=self.viewer)
        self.render_every = max(1, int(self.config.render_every))
        self.speed = SPEEDS.get(self.config.speed, 1.0)
        self.release_last_requested = False
        self.release_all_requested = False
        """A release a viser thread asked for, serviced on the main thread."""
        self.linked_request: bool | None = None
        """``Move together``, which is one setting over every kind's handles."""
        self._holding_readout: Any = None
        self._linked_toggle: Any = None
        self._release_last: Any = None
        self._release_all: Any = None
        self._each_step: list[Any] = []
        """What :meth:`each_step` was given, drained beside the panels."""
        self.root = Path(self.config.out)
        # Filled in per load: the interval is render_every at the *task's*
        # control rate, and the task changes under this page.
        self.draw_interval = 0.0
        self.view_fps = 0.0
        """Measured browser refresh rate, for the page's own readout."""
        self._drawn_step: int | None = None
        """Step the viewer was last given. ``None`` forces the next draw.

        Not a sentinel step number, because a reset puts the count back to 0 and
        "0 is fewer than ``render_every`` steps on from -1" would hold the
        viewer on the previous episode's picture until the new one had run four
        steps -- which on a scene reset while paused is forever.
        """
        self._refreshed_at = 0.0
        self._fps_window = (0.0, 0)

        self.profile = parse_modes(self.config.profile)
        """Where the loop's time went, when someone asked. Disabled by default.

        Held rather than consulted: the disabled profiler's spans are no-ops, so
        the loop carries its ``with`` blocks unconditionally and pays about a
        hundred nanoseconds each for them when nothing is being measured. A
        benchmark can also assign one directly before :meth:`run`.
        """
        # Pacing and rate-readout state, set up by begin_run. Attributes rather
        # than locals so tick() can be driven from outside run().
        self._dt = 0.0
        self._next_frame = 0.0
        self._rate_frames = 0
        self._rate_window = 0.0
        self.measured_steps = 0
        self.measured_wall = 0.0
        """The post-warm-up window :meth:`run` timed, profiler or no profiler."""

        # --- state the loop reads, written only by callbacks -------------------
        self.paused = False
        self.pause_box: Any = None
        """The page's Pause checkbox, once :meth:`build_gui` has made it; :meth:`set_paused` keeps it truthful."""
        self.reset_requested = False
        self.quit_requested = False
        self._captured_step: int | None = None
        """Step the video and the take last captured; a step taken by a script while
        the page holds is captured on the next pass. See :meth:`_capture_outside_steps`."""
        self.load_request: tuple[str | TaskSpec, int, str, str, str, int] | None = None
        self.num_worlds = max(1, int(self.config.num_worlds))
        """Worlds the page is showing. Changing it and reloading swaps the page
        between the interactive scene and a grid."""
        self.fleet: Any = None
        """The grid, when there is more than one world. It borrows this
        session's viewer, so changing the count reloads in the open tab."""
        self.show_scenery = bool(self.config.show_scenery)
        self.scenery_request = False
        """Set by the View checkbox, serviced by the loop -- it re-batches the
        viewer, which is not something to do from a viser callback thread."""
        self.cloth_look_request: str | None = None
        """Set by the View dropdown, serviced by the loop for the same reason:
        switching styles retires and rebuilds scene nodes the draw is
        iterating over."""
        self.click_ray: tuple[np.ndarray, np.ndarray] | None = None
        self.status = ""

        self.env: Any = None
        """A ``Sim``, or the benchmark's ``Env`` when the page is showing a task."""
        self.obs: dict[str, Any] = {}
        self._stage: Any = None
        self._backdrop: Any = None
        """The stand-in work-surface node, when the furniture is hidden."""
        self.episode_id = int(episode)
        self.panels: list[Panel] = []
        self.arms: dict[str, PanelArm] = {}
        self.active_arm = ""
        self.picker: ScenePicker | None = None
        self.driver: Any = None
        """The policy runner. ``None`` unless the page is showing a task."""
        self.record: PanelRecord | None = None
        self.video: PanelVideo | None = None
        self.objects: PanelObject | None = None
        self.deformables: PanelCloth | None = None
        self.tune: PanelTune | None = None
        self.readings: PanelReadings | None = None
        self.live: PanelCamera | None = None
        self.task_panel: Any = None
        """The task menu. ``None`` unless the page is showing a task."""
        self.goal_panel: Any = None
        self.inspector: Any = None
        self.leader_arm: PanelLeaderArm | None = None

        self.index: SceneIndex | None = None
        """Every subject in the compiled scene, and the click lookups. Rebuilt
        per task load, because it is a map from one model's numbering to names."""
        self.selected: Subject | None = None
        """What the page is about. One place, rather than a private string in
        each of two panels with nothing else able to ask."""
        self.select_request: str | None = None
        """A subject key a callback asked for, serviced on the main thread."""
        self.overlay_request: list[tuple[str, str, bool]] = []
        """``(subject key, feature name, show)`` from the inspector's checkboxes,
        drained by the overlay for the same reason -- a callback may only
        assign."""

        # Registered once, on the server rather than on any environment: a task
        # load rebuilds the panels but not the page, and a pointer callback that
        # had to be re-registered per load would be one more thing to forget.
        @self.server.scene.on_click()
        def _(event) -> None:
            self.click_ray = (
                np.asarray(event.ray_origin, dtype=np.float64),
                np.asarray(event.ray_direction, dtype=np.float64),
            )

        if hasattr(task, "pipeline"):
            # Already built. Nothing to compile, nothing to look up, and no
            # failure mode to fall back from.
            self.adopt(task, episode=self.episode_id)
        elif not self.load_task(task, self.episode_id, self.config.scene, self.config.embodiment, self.config.gripper):
            # Nothing to fall back to on the first load, and a page with no
            # scene in it is not worth serving.
            raise RuntimeError(f"{task} did not compile; see the traceback above")

    # ---------------------------------------------------------------- task load
    @property
    def current_task(self):
        """The task the page is showing, however many worlds it is showing it in.

        The task menu is the one panel that belongs to *both* pages -- it is how
        the world count is set in the first place -- so what it reads has to be
        the session's answer rather than an environment's.
        """
        if self.fleet is not None:
            return self.fleet.task
        return getattr(self.env, "task", None) if self.env is not None else None

    def adopt(self, sim, *, label: str = "", episode: int = 0) -> None:
        """Put an already-built scene into this page, replacing whatever was in it.

        The half of a load that is not about *tasks*: swap the model
        into the viewer, rebuild the panels around it, reset, and draw. Split out
        because a :class:`~robosimstudio.sim.Sim` somebody assembled by hand has
        nothing to compile and no registry entry to look up, and the page has no
        reason to care which it is showing -- what it needs is a model, handles
        and a step function, and both kinds have all three.

        Args:
            sim: A ``Sim``, or the benchmark's ``Env`` -- which is one.
            label: What to call it in the run directory and the status line.
                Defaults to the request's own name.
            episode: Which episode to reset to. Ignored by a bare ``Sim``, whose
                ``reset`` takes no argument because it has no episodes.
        """
        label = label or getattr(sim.request, "full_name", "") or "scene"
        self.teardown()
        self.env = sim
        self.episode_id = int(episode)
        # render_every is read at the new scene's control rate, so a 60 Hz scene
        # and a 50 Hz one are both refreshed at every-fourth-step's worth.
        self.draw_interval = self.render_every / float(sim.request.physics.control_hz)
        self.run_dir = self.root / label.replace("/", "_") / time.strftime("%Y%m%d-%H%M%S")
        self._bind(sim)
        obs, info = self.reset_env()
        self.obs = obs
        self.on_reset(obs, info)

    def _bind(self, sim) -> None:
        """Hand the page a model: the viewer, the look, and the panels built around it.

        The half of :meth:`adopt` that is about the *model*, apart so that a
        reset which recompiled one (an episode whose model key differs) can
        redo it without closing the environment that just rebuilt itself.
        """
        self.picker = ScenePicker(sim.model)
        # Before set_model: the viewer batches shapes by their flags when the
        # model is handed over, and reads visibility off that batch each frame
        # rather than off the model.
        self._set_scenery_visible(self.show_scenery)
        self.viewer.set_model(sim.model)
        # After set_model, whose clear retires the previous scene's garments:
        # which deformables exist, their colours and their fabric thicknesses are
        # all properties of the scene just compiled.
        self.viewer.set_garments(garment_visuals(sim.scene, getattr(sim, "doc", None)))
        # And whether anything in it repaints itself as it runs -- a mark being
        # polished off, a tape seam parting. Asked here because a scene is the
        # last thing that still knows; the viewer holds only a model.
        self.viewer.set_live_colors(scene_repaints_live(sim.scene))
        self._push_finishes(sim)
        # Newton's viser viewer installs its own flat ambient and clears the
        # HDRI whenever it sets up a scene, so a model swap wipes the rig and
        # the cloth comes back unlit. Re-applying is idempotent -- every node is
        # addressed by name -- and this is the only place a swap happens.
        self._adopt_look_lighting()
        self.lighting.apply()
        self._apply_backdrop()
        self._apply_stage()
        self.build_panels()
        self.build_gui()

    def _bench(self, what: str = "this"):
        """The page's benchmark half, imported on first use.

        Everything a session does that needs a *task* -- resolving an id,
        compiling an ``Env``, the task menu, the goal readout, the policy
        runner, the grid of worlds -- lives in
        ``robosimstudio_studio.bench_session`` and its neighbours, which a
        release without the benchmark tier does not carry. This is the session's
        one way to them.

        Args:
            what: What is being asked for, as the subject of the sentence a
                refusal is written in.

        Raises:
            robosimstudio_studio.seams.NotInThisRelease: If the tier is absent.
        """
        return seams.benchmark(what)

    def load_task(
        self,
        task: str | TaskSpec,
        episode: int,
        scene: str = "",
        embodiment: str = "",
        gripper: str = "",
        num_worlds: int | None = None,
    ) -> bool:
        """Compile a task into this page, replacing whatever was in it.

        ``task`` is normally a registry name. It may also be a built
        :class:`~robosimstudio.specs.TaskSpec`, which is how a rebuild carries
        edits the registry does not know about -- a tuned material, most
        obviously.

        The work is the benchmark half's, and so is the account of it: which
        pairings are synthesized, which are refused and in whose words, why the
        new scene is compiled before the old one is given up, and what a world
        count above one does. See ``robosimstudio_studio.bench_session.load_task``.

        Returns:
            Whether the task was loaded. On ``False`` the page is untouched.

        Raises:
            robosimstudio_studio.seams.NotInThisRelease: If the benchmark tier
                is absent, since there is then no such thing as a task.
        """
        label = task if isinstance(task, str) else task.full_name
        return self._bench(f"loading the task {label!r}").load_task(
            self, task, episode, scene, embodiment, gripper, num_worlds
        )

    def teardown(self) -> None:
        """Give back everything the previous task owned. Main thread.

        The page is cleared first and the backend released after, and the order
        of the *guards* matters as much as the order of the work: this used to
        return early when there was no environment, which is exactly the case a
        grid is in -- so a reload left the old widgets standing, built a second
        Task folder beside them, and left every click landing on a panel that
        was no longer being drained. Two menus, neither of which worked.
        """
        if self.env is None and self.fleet is None:
            return
        self._drop_panels()
        if self.fleet is not None:
            self.fleet.close()
            self.fleet = None
        if self.env is not None:
            self.env.close()
            self.env = None

    def _drop_panels(self) -> None:
        """Close every panel and clear the page's widgets, leaving the environment be."""
        for panel in self.panels:
            panel.close()
        self.panels, self.arms = [], {}
        self.active_arm = ""
        self.picker = None
        self.driver = self.record = self.video = self.task_panel = None
        self.objects = self.deformables = self.tune = self.readings = self.live = None
        self.leader_arm = None
        # Cheaper and more certain than removing widgets one at a time, and the
        # only GUI on this page is the panels' own.
        self.server.gui.reset()
        self.pause_box = None

    def _push_finishes(self, sim) -> None:
        """Hand the scene's materials to the page, so it shades what RTX shades.

        The same table the path tracer is given -- ``handles.finishes``, which
        the compiler fills for *every* shape rather than only the stated ones --
        and the same ``live_shapes``, which stay on the flat per-instance path
        because a GLB bakes its colour in.

        Read off the handles rather than through ``Sim._scene_facts``, which
        looks like the shared door and is not: it takes the camera specs it is
        being asked on behalf of, and its values are closures a backend's
        ``wants`` list pulls on. This is the same table one layer down.

        A scene with no handles leaves the page drawing flat, which is what it
        did before any of this existed. That is the *only* thing tolerated here:
        this used to catch everything, and what it caught was
        ``handles.live_shapes or ()`` truth-testing a numpy array -- so the page
        silently drew flat while the table it needed sat right there, fully
        populated. A guard that wide hides the bug it is standing next to.
        """
        handles = getattr(sim, "handles", None)
        if handles is None:
            self.viewer.set_finishes({}, ())
            return
        self.viewer.set_finishes(getattr(handles, "finishes", None), getattr(handles, "live_shapes", None))

    def build_panels(self) -> None:
        """Compose the page from this scene's handles, plus the studio's own.

        Three regions, in the order somebody reads them:

        **Goal** -- what is being asked, clause by clause, each with its verdict
        and its current reading, and whether the episode started where the
        document said it would.
        **Inspector** -- everything about the one thing the page is about.
        **Scene** -- everything in it, as the way to make the page about
        something else.

        Then the controls that drive the page rather than describe the scene:
        the policy runner, the cameras, recording, export, and the transport,
        which stays last and always visible because it is how you stop.
        """
        env, config = self.env, self.config
        # A page built from a *selection* is a page showing one thing, so the
        # per-kind folds go with the rest of the studio's furniture; the whole
        # page keeps them, because reaching a body a click cannot and grabbing a
        # garment's declared strip by name are things only a fold can offer.
        self.chrome = not self._wanted_panels()
        self.index = SceneIndex(env.handles, env.scene, getattr(env, "doc", None))
        self.selected = self._opening_subject()
        self.arms = (
            {name: PanelArm(self, name) for name in (env.scene.embodiment.iks if env.scene.embodiment else {})}
            if self._wants("arm")
            else {}
        )
        # The arm the task is about, which the binding declares and the handles
        # carry. Falling back to the first arm in dict order is what this used to
        # do outright, and `SceneHandles.work_arm`'s own docstring says why that
        # is wrong: the two YAM cells order their arms oppositely, so insertion
        # order picks a different physical hand on different robots. Clicking an
        # object aims whichever arm is active, so on `yam_i2rt` the page was
        # reaching for the task's object with the hand not doing the task.
        self.active_arm = env.handles.work_arm or next(iter(self.arms), "")
        # The panels that need a *document* -- the task menu, the goal readout,
        # the policy runner -- are skipped rather than degraded when the page is
        # showing a scene somebody assembled by hand. Skipped, because there is
        # nothing for them to say: a bare scene has no variants to switch
        # between, no clauses to score and no shipped policy to run. The rest of
        # the page is identical, which is the claim the tier split makes.
        #
        # They are also the three that name the benchmark, so they are built by
        # the page's benchmark half and only asked for where there is a task --
        # which is what keeps this method importing nothing a bare scene lacks.
        self.task_panel = self.goal_panel = self.driver = None
        if hasattr(env, "task"):
            self.task_panel, self.goal_panel, self.driver = self._bench("a task page's panels").document_panels(self)
        # A take is a take on whatever the page is showing. A bare scene has
        # the synthetic episode the compiler gave it, which is all the recorder
        # needs; its take is a valid run directory that cannot be rebuilt from
        # a registry id (it has none), and ``run_meta.json`` says so.
        self.record = PanelRecord(self, spec=config.record)
        self.video = PanelVideo(
            self,
            fps=config.video_fps,
            every=config.capture_every,
            max_frames=config.buffer,
        )
        self.scene_picker = PanelScene(self)
        self.inspector = PanelInspector(self)
        # Menu, then what the task asks, then the one thing you are looking at.
        # The menu is first because changing the task changes everything under
        # it; the inspector follows the goal because between them they are the
        # whole of what the page is *saying*, and putting a dropdown over every
        # subject in the scene between the two split it.
        panels: list[Panel] = [p for p in (self.task_panel, self.goal_panel, self.inspector) if p is not None]
        # Then the cameras, because what they see is a property of the task
        # rather than of the run: the rig moves when the task does, and the first
        # thing worth knowing about a task you have just selected is whether its
        # cameras are pointed at it.
        # Resolved before the camera panel is built, because it decides whether
        # that panel's inset starts on: with the viewport itself path-traced, a
        # live inset is a second render of the same scene, and a measured
        # expensive one -- frustum image updates were 32 % of a tool-sorting scene's loop
        # period and running the observation rig for nobody 19 % of step rate.
        # The frustums stay: they say where the cameras are and are how you fly
        # to one, and a camera's image is one click away when you want it.
        viewport = PanelRenderView(
            self,
            world_model=config.world_model,
            scale=config.render_view_scale,
            passes=config.render_view_passes,
        )
        if self._wants("camera") and config.cameras and env.cameras:
            self.live = PanelCamera(
                self,
                live=config.live and viewport.mode != "rtx",
                fps=config.live_fps,
                max_load=config.live_load,
                width=config.live_width,
                height=config.live_height,
                channels=config.live_channels or ("rgb",),
                frustums=config.live_frustums,
            )
            panels.append(self.live)
        # The viewport goes *first*, above even the task menu. It was under the
        # cameras on the argument that a panel about how the page draws belongs
        # beneath the ones that say what it is pointed at, and that was wrong in
        # practice: the World model switch decides which of two quite different
        # pages you are looking at, and down there it sat below the inspector's
        # prose, off the bottom of a sidebar you had to scroll. A control nobody
        # can find is a control nobody has. It is still inert until a browser
        # connects: no client, no renderer, which is what keeps a headless
        # session as cheap as it was before this existed.
        self.render_view = viewport
        panels.insert(0, self.render_view)
        # And the scene list under those. It is how you reach a subject a click
        # cannot -- one behind the bench, a region with no surface to hit -- which
        # makes it a way *in* to the inspector rather than something to read, so
        # it sits below the readouts rather than in front of them.
        panels.append(self.scene_picker)
        panels += [p for p in (self.driver, *self.arms.values()) if p is not None]
        if self.arms:
            # Only on a scene with an arm to hand over -- a scene with no
            # embodiment has nothing for a leader arm to drive.
            self.leader_arm = PanelLeaderArm(
                self, ports=dict(config.leader_arm_ports), calibration_path=config.leader_arm_calibration
            )
            panels.append(self.leader_arm)
        # Chains count: a rope scene has no plain objects at all, and gating on
        # the handles table alone is what left its one movable thing unclickable.
        # Arms count too, now that a robot's own links are grabbable: a scene
        # with a robot and nothing loose on it still has something to take hold
        # of, and gating this on objects alone left the one thing on the page
        # unclickable -- which is the bug this panel was extended to fix.
        if self._wants("object") and (env.handles.objects or self.arms):
            self.objects = PanelObject(self, handles=config.handles, chrome=self.chrome)
            panels.append(self.objects)
        if self._wants("cloth") and any(e.carries_particles for e in env.scene.by_name.values()):
            self.deformables = PanelCloth(self, handles=config.handles, chrome=self.chrome)
            panels.append(self.deformables)
            # Tuning lives beside the task rather than on a page of its own: a
            # bare strip gives a bending length, but only the task says whether
            # the fold holds or the jaws keep hold of it.
            #
            # The *material* folder stays for what the inspector's generated one
            # cannot do -- presets, save, revert, and `Apply & rebuild` for the
            # fields no live write can reach. Per-field tuning of the selected
            # cloth is the inspector's now, from the same binder.
            self.tune = PanelTune(self, material_dir=config.material_dir)
            self.readings = PanelReadings(self)
            panels += [self.tune, self.readings]
        # The overlay draws what the inspector's checkboxes ask for, and joins
        # the region boxes rather than replacing them: `PanelRegions` already
        # draws every entry in `handles.regions`, which includes the ones an
        # asset declares, and tints them by their goal clause.
        self.overlay = PanelOverlay(self)
        panels += [PanelRegions(self), self.overlay]
        if self.record is not None:
            panels.append(self.record)
        panels.append(self.video)
        self.panels = self._selected(panels)

    # ---------------------------------------------------------------- handles
    def held(self) -> list[str]:
        """What is on a handle right now, across every kind. Main thread."""
        labels: list[str] = []
        for panel in (self.objects, self.deformables):
            if panel is None or panel.handles is None:
                continue
            labels += [str(handle.label or "?") for handle in panel.handles.live]
        return labels

    def missed(self) -> str:
        """How far the last cloth grab was off, or ``""``.

        A click three centimetres wide of a sheet takes hold of nothing, and
        without a word about it the page looks broken rather than missed.
        """
        miss = getattr(self.deformables, "miss", 0.0) if self.deformables is not None else 0.0
        return f"missed by {miss * 1000:.0f} mm -- click on the cloth" if miss else ""

    def release_last(self) -> None:
        """Let go of the newest handle, whichever kind it is on. Main thread."""
        newest = None
        for panel in (self.objects, self.deformables):
            if panel is None or panel.handles is None:
                continue
            slot = panel.handles.newest()
            if slot is not None and (newest is None or slot.seq > newest[1].seq):
                newest = (panel, slot)
        if newest is not None:
            newest[0]._release(newest[1])

    def release_all(self) -> None:
        """Let go of everything the page is holding. Main thread."""
        for panel in (self.objects, self.deformables):
            if panel is None or panel.handles is None:
                continue
            for handle in list(panel.handles.live):
                panel._release(handle)

    def set_linked(self, linked: bool) -> None:
        """``Move together`` across every kind's handles. Main thread."""
        for panel in (self.objects, self.deformables):
            if panel is not None and panel.handles is not None:
                panel.handles.linked = bool(linked)

    def refresh_holding(self) -> None:
        """Say what is held, and show the controls only once there is something to let go of."""
        if self._holding_readout is None:
            return
        labels, missed = self.held(), self.missed()
        self._holding_readout.value = ", ".join(labels) if labels else (missed or "nothing")
        # The readout stays up on a miss -- that is when it has something to say
        # -- while the controls that act on a handle wait for one to exist.
        self._holding_readout.visible = bool(labels or missed)
        for widget in (self._linked_toggle, self._release_last, self._release_all):
            if widget is not None:
                widget.visible = bool(labels)

    def reset_env(self):
        """Reset whatever the page is showing, and return ``(obs, info)``.

        One method because there are two kinds of environment under this page
        and they disagree about this one call: ``Env.reset`` takes an episode
        index, ``EnvBase.reset`` does not, because a scene somebody assembled by
        hand has nothing to index. Every example is a task-less scene.
        """
        env = self.env
        return env.reset(self.episode_id) if hasattr(env, "task") else env.reset()

    def _wants(self, key: str) -> bool:
        """Whether the selection keeps this panel, asked *before* it is built.

        :meth:`_selected` filters the finished list, which is enough for a panel
        that is only a folder. It is not enough for the ones whose constructor
        acts on the scene: :class:`~robosimstudio_studio.panels.PanelObject` and
        ``PanelCloth`` each contribute a dragger per handle to the substep hooks
        and then invalidate the captured graph, so building one only to drop it
        would leave the hooks behind and pay for a recapture nothing uses.
        """
        wanted = self._wanted_panels()
        return not wanted or key in wanted

    def _wanted_panels(self) -> tuple[str, ...]:
        """The selection as keys. Empty means everything.

        Asked of the environment being built, not once per session: a page can
        load a task over a bare scene and back, and :data:`DOCUMENT_PANELS` go
        with the document.
        """
        asked = self.config.panels
        if not isinstance(asked, str):
            return tuple(asked)
        wanted = PANEL_SETS.get(asked)
        if wanted is None:
            raise ValueError(
                f"unknown panel set {asked!r}; the names are {sorted(PANEL_SETS)}, or pass the panel keys themselves"
            )
        if wanted and hasattr(getattr(self, "env", None), "task"):
            return (*wanted, *DOCUMENT_PANELS)
        return wanted

    def _selected(self, panels: list[Panel]) -> list[Panel]:
        """Keep the panels :attr:`StudioConfig.panels` asked for. Everything above
        this line is unchanged by the selection: *which panels a scene warrants*
        is a question about the scene -- a rope page has no cloth folder however
        it is configured -- and this only answers *which of those to show*.

        A panel that is dropped is also forgotten. The session holds each one by
        name as well as in the list (``self.objects``, ``self.deformables``, ...) and
        those references are what ``drain_click`` and the reset path reach for;
        left set, they would point at a panel whose ``build`` never ran, so its
        handles are ``None`` and a click on an object would raise rather than do
        nothing. The existing ``is not None`` guards then do the right thing.
        """
        wanted = self._wanted_panels()
        if not wanted:
            return panels
        keep = [p for p in panels if panel_key(p) in wanted]
        dropped = {id(p) for p in panels if panel_key(p) not in wanted}
        for name, value in list(self.__dict__.items()):
            if id(value) in dropped:
                setattr(self, name, None)
        self.arms = {name: panel for name, panel in self.arms.items() if id(panel) not in dropped}
        return keep

    def _build_appearance(self, gui) -> None:
        """The ``Appearance`` folder. See :meth:`build_gui` for why it is optional."""
        with gui.add_folder("Appearance", expand_by_default=False):
            scenery = gui.add_checkbox("Show scenery", initial_value=self.show_scenery)

            def _scenery(_event=None) -> None:
                self.show_scenery = bool(scenery.value)
                self.scenery_request = True

            scenery.on_update(_scenery)
            if any(e.carries_particles for e in self.env.scene.by_name.values()):
                look = gui.add_dropdown("Cloth look", options=GARMENT_STYLES, initial_value=self.viewer.garment_style)
                look.on_update(lambda _: setattr(self, "cloth_look_request", str(look.value)))
            # Built here rather than in ``panels``: it writes only to the viser
            # scene graph, so it neither needs a ``drain`` nor cares that the
            # environment underneath it may be swapped for another task.
            self.lighting.build(gui)

    def build_gui(self) -> None:
        gui = self.server.gui
        gui.configure_theme(control_layout="collapsible", dark_mode=self.config.dark_mode)
        # First in the sidebar, outside any fold, and **hidden until something is
        # held**. Taking hold of a thing is one click on the thing itself, so
        # letting go should not be a button two folds deep in a panel named
        # after a *kind* -- and a handle you cannot see how to remove is a
        # handle that reads as stuck. Clicking the thing again also drops it;
        # this is the version you can find without being told.
        #
        # Built once, here, rather than added when a handle appears: viser sorts
        # a sidebar by a counter that increments per widget, so anything added
        # later sorts after everything already on the page -- the same trap the
        # inspector's anchor exists for. Visibility is what changes.
        #
        # One set for every kind, which is why they are the session's.
        self._holding_readout = gui.add_text("Holding", initial_value="nothing", disabled=True)
        self._linked_toggle = gui.add_checkbox("Move together", initial_value=False)
        self._linked_toggle.on_update(lambda _: setattr(self, "linked_request", bool(self._linked_toggle.value)))
        self._release_last = gui.add_button("Release last")
        self._release_last.on_click(lambda _: setattr(self, "release_last_requested", True))
        self._release_all = gui.add_button("Release all")
        self._release_all.on_click(lambda _: setattr(self, "release_all_requested", True))
        self.refresh_holding()
        # No separate Interact folder: what you clicked belongs beside the arm
        # that is going to act on it, and the arm panels already sit under the
        # task and policy controls. The only thing left that is genuinely
        # session-wide is *which* arm, and on a one-armed scene there is no
        # choice to offer -- so it is built immediately above the arm folders
        # rather than in a section of its own.
        first_arm = next(iter(self.arms.values()), None)
        for panel in self.panels:
            if panel is first_arm and len(self.arms) > 1:
                arm = gui.add_dropdown("Arm", options=tuple(self.arms), initial_value=self.active_arm)
                # Bound as a default rather than closed over: the handle is
                # assigned inside the loop, so a late-firing callback would read
                # whatever the *last* iteration left in `arm`. Only one panel can
                # be `first_arm`, so today it is the same object either way --
                # which is exactly the kind of accident that stops being true
                # when a second dropdown is added and fails in the browser, not
                # in a test.
                arm.on_update(lambda _, arm=arm: setattr(self, "active_arm", str(arm.value)))
            panel.build(gui)
        # One folder, collapsed, and nothing folded inside it. What the scene
        # *looks* like is a handful of decisions made once a session -- is the
        # bench drawn, how is the cloth shaded, where is the key light -- and a
        # `Light` fold within this one made the sliders a second click deep for
        # no gain: opening `Appearance` at all is already saying you want them.
        #
        # Selectable like a panel even though it is built inline, because "made
        # once a session" is exactly what a page showing one rope has no use
        # for. ``drive`` leaves it out.
        if self._wants("appearance"):
            self._build_appearance(gui)
        with gui.add_folder("Simulation"):
            pause = self.pause_box = gui.add_checkbox("Pause", initial_value=self.paused)
            pause.on_update(lambda _: setattr(self, "paused", pause.value))
            # Not config.speed directly: an unrecognised key is an initial_value
            # outside the options, which viser refuses, and a page that will not
            # build is a poor answer to a typo in a config field.
            initial = self.config.speed if self.config.speed in SPEEDS else "1x"
            speed = gui.add_dropdown("Speed", options=tuple(SPEEDS), initial_value=initial)
            speed.on_update(lambda _: setattr(self, "speed", SPEEDS[str(speed.value)]))
            reset = gui.add_button("Reset")
            # The one reset path: the loop services it through reset_now().
            reset.on_click(lambda _: setattr(self, "reset_requested", True))
            quit_ = gui.add_button("Stop server")
            quit_.on_click(lambda _: setattr(self, "quit_requested", True))
            self._rate_readout = gui.add_text("Rate", initial_value="", disabled=True)
            self._status_readout = gui.add_text("Status", initial_value="", disabled=True)
        # The instruction is not repeated here. It is one sentence of English
        # saying what the goal tree says in the terms the run is scored on, so it
        # lives in that section's Detail fold -- and printing it again at the
        # foot of the sidebar, under a second copy of the task's name, was the
        # page saying one thing three times over. The eight paragraphs explaining
        # the interaction stay, folded:
        # you read them once and look past them every session after, which is
        # what a fold is for.
        with gui.add_folder("How to drive this", expand_by_default=False):
            gui.add_markdown(
                "- **Click** anything -- an object, a patch of cloth -- and it comes up on a handle "
                "you can **drag straight away**. The bead at the handle's origin says which slot it "
                f"is; there are {self.config.handles} of them per kind.\n"
                "- **Click again elsewhere** for a second handle. **Move together** then carries the "
                "pair as one rigid group from a drag on either, which is how a sheet is held by two "
                "corners with one mouse. **Click the thing again to put it down**; **Release "
                "last** and **Release all** appear at the top of this sidebar as soon as you are "
                "holding anything, beside a line saying what.\n"
                "- A handle is a wrench on a body or a pin on a patch -- **not a grasp**. The thing "
                "stays dynamic underneath, so dragging it into the jaws is a fair way to set a grasp "
                "up, and tugging on one the robot holds is how you find out whether the grip is real.\n"
                "- **Drag an arm's gizmo** to drive that arm; **Grip** opens and closes its "
                "fingers in one click, and **Grip amount** is the same travel by hand. Whether that "
                "holds is the physics' answer, not the button's.\n"
                "- **Camera gizmo** draws each camera where it stands, showing its own view. Click "
                "one to fly there; **Set from view** then points it wherever you have flown.\n"
                "- **Run** hands the arm to one of the task's policies until it finishes.\n"
                "- **Start take** keeps what you drive as an episode: one numbered folder per take "
                "(`steps.npz`, `meta.json`, `cameras/*.mp4`) beside `episode_results.jsonl` and "
                f"`run_meta.json`, under `{self.config.out}/<scene>/<time>/demos/`.\n"
                "- **Export video** renders the captured state offline, and never re-simulates.\n"
            )

    def reset_now(self) -> bool:
        """Put the scene back to its start. Main thread; True when it reset.

        Where every Reset lands -- the Simulation folder's button, the episode
        panel, and anything a subclass adds -- by way of :attr:`reset_requested`,
        which is all a viser callback may do. A subclass with its own idea of
        what a reset ends (a script playing, a take being filmed) overrides this
        rather than adding a second button that does something different.
        """
        model = getattr(self.env, "model", None)
        try:
            # An episode whose model key differs recompiles the scene in here,
            # so this is the second place a menu can ask for something that
            # will not build.
            obs, info = self.reset_env()
        except Exception as exc:
            # Unlike a task load, this cannot be made atomic: a rebuild that
            # fails half way leaves the environment in a state this page did
            # not build and cannot repair. So say so and stop stepping it,
            # rather than run a scene nobody can vouch for -- through
            # set_paused, so the checkbox says what the loop does.
            self.set_paused(True)
            self.status = f"episode {self.episode_id} did not load ({type(exc).__name__}: {exc}) -- paused"
            self._show_status()
            print(f"[studio] episode {self.episode_id} did not load; paused:")
            traceback.print_exc()
            return False
        if getattr(self.env, "model", None) is not model:
            # The recompile swapped the model, scene and pipeline under the
            # page: the viewer, the picker, the index and every dragger hooked
            # onto the old pipeline are about a scene that is gone. Rebuilt
            # here, the same way a load builds them, minus closing the env.
            self._drop_panels()
            self._bind(self.env)
        self.obs = obs
        self.on_reset(obs, info)
        self.status = "reset"
        return True

    def steps_held(self) -> bool:
        """Whether something other than this loop is stepping the scene right now.

        While it is, the loop treats the page as paused whatever the checkbox
        says -- stepping beside it would take two steps per pass -- but still
        films what it steps (:meth:`_capture_outside_steps`). Nothing does on a
        plain page; ``robosimstudio_real2sim_agent`` says so while a routine plays.
        """
        return False

    def _show_status(self) -> None:
        """Put :attr:`status` on the page now, rather than at the next rate readout."""
        readout = getattr(self, "_status_readout", None)
        if readout is not None and readout.value != self.status:
            readout.value = self.status

    def _capture_outside_steps(self) -> None:
        """Film the steps something else took while the page held. Main thread.

        A script playing on a held page steps the scene itself, so the loop's
        own capture -- which follows the loop's own step -- would leave a take
        or a video with nothing in it. One capture per pass in which the step
        count moved, of the state as it now stands.
        """
        step = int(self.env.step_count)
        if step == self._captured_step:
            return
        self._captured_step = step
        if self.video is not None:
            self.video.capture()
        if self.record is not None:
            self.record.capture(None, "")

    def on_reset(self, obs: dict[str, Any], info: dict[str, Any]) -> None:
        # A reset moves the scene without advancing the step count -- it puts it
        # back to 0 -- so the "has it stepped far enough" test would hold the
        # viewer on the previous episode's picture.
        self._drawn_step = None
        self._captured_step = int(self.env.step_count)
        for panel in self.panels:
            panel.on_reset(obs, info)

    # ------------------------------------------------------------------- clicks
    def _opening_subject(self) -> Subject | None:
        """What the page is about before anybody has clicked anything.

        **The first thing the goal is about**, not the first thing in the scene.
        Those differ and the difference is the whole answer: a tool-sorting scene's
        subjects sort with ``bin1`` at the front, so a page opening on its own
        first entry opens on a fixture -- and a fixture is precisely the thing in
        that scene nobody came to look at. Its goal's first operand is
        ``hammer_0``, which is what the task is about and what a scripted policy
        reaches for first.

        **Nothing at all when there is no goal.** A scene somebody assembled by
        hand has no "first thing the goal is about", and the fallback -- the
        first subject in scene order -- was arbitrary: it opened the page on a
        thing nobody had pointed at and gave the inspector a heading to fill
        before anyone had asked it anything. On such a page the inspector
        appears when you click something, which is when there is an answer.
        """
        index = self.index
        if index is None:
            return None
        goal = getattr(self.env, "goal", None)
        if goal is None:
            return None
        # Walking a goal tree is the benchmark half's, and only an environment
        # that half built has one.
        return self._bench("reading a goal").opening_subject(index, goal)

    def select(self, subject: Subject | None) -> None:
        """Point the page at something. Main thread.

        One place, and every panel is told.
        """
        if subject is not None and self.selected is not None and subject.key == self.selected.key:
            return
        self.selected = subject
        for panel in self.panels:
            panel.on_select(subject)

    def drain_click(self) -> None:
        """Turn the last click into a selection, and into a handle on it. Main thread.

        Whichever of the two candidates the ray met *first* wins, so clicking a
        cloth draped over a box takes the cloth and clicking the box beside it
        takes the box, with no mode to switch between them.

        **The shape index is used.**
        :class:`~robosimstudio_studio.selection.SceneIndex` maps a shape to
        whatever owns it, so everything in the scene is selectable and grabbing
        is what happens *as well*, for the things that can be grabbed.

        The panels each keep a ``Grab on click`` checkbox for a session that
        wants naming without holding, and each services the grab in its own
        ``drain`` -- on this same control step, but through the one code path
        that is allowed to call Warp.
        """
        if self.select_request is not None:
            key, self.select_request = self.select_request, None
            if self.index is not None:
                self.select(self.index.by_key(key))

        ray, self.click_ray = self.click_ray, None
        if ray is None or self.picker is None:
            return
        origin, direction = ray
        state = self.env.state
        shape = self.picker.shape_at(state, origin, direction)
        particle = self.picker.particle_at(state, origin, direction) if self.deformables is not None else None

        if particle is not None and (shape is None or particle.distance < shape.distance):
            name = self.deformables.owner_of(particle.index)
            if name:
                self._select_hit(self.index.at_particle(particle.index) if self.index else None)
                self.report_click(self.deformables.click_at(name, particle.point))
                return
        if shape is not None:
            hit = self.index.at_shape(shape.shape) or self.index.at_body(shape.body) if self.index else None
            self._select_hit(hit)
            report = self.objects.click_body(int(shape.body)) if self.objects is not None else ""
            self.report_click(report or (hit.label if hit else self._body_name(int(shape.body))))
            return
        self.report_click("nothing there")

    def _select_hit(self, subject: Subject | None) -> None:
        """Adopt what a click found, and keep the picker dropdown in step."""
        if subject is None:
            return
        self.select(subject)
        picker = getattr(self, "scene_picker", None)
        if picker is not None:
            picker.follow(subject)

    def _body_name(self, body: int) -> str:
        """A readable name for a body the handles do not have one for."""
        labels = list(getattr(self.env.model, "body_label", None) or ())
        if 0 <= body < len(labels) and labels[body]:
            return str(labels[body]).rsplit("/", 1)[-1]
        return f"body {body}"

    # -------------------------------------------------------------------- view
    def _scene_spec(self):
        """The registered place this task is staged in, or ``None``."""
        request = getattr(self.env, "request", None) if self.env is not None else None
        # ``scene`` on a TaskSpec, ``cell`` on a BuildRequest: the same fact
        # under the two names the rename left, and a page shows either.
        name = getattr(request, "scene", "") or getattr(request, "cell", "")
        return get_cell(name) if name else None

    def _scenery_shapes(self) -> np.ndarray:
        """Every shape belonging to the scene's own furniture.

        The *scene's* statics and nothing else. A task's own statics -- the
        panel a film is stuck to, the box a tape is wound onto -- are the task,
        not the room, and hiding them turns a peel into a sheet levitating over
        nothing; they stay drawn whatever the scenery toggle says. The ground
        plane is a floor rather than scenery too -- it occludes nothing and
        taking it away leaves things hanging in a void.
        """
        spec = self._scene_spec()
        furniture = {s.name for s in spec.statics} if spec is not None else set()
        ranges = [entity.range.shape_indices for name, entity in self.env.scene.statics.items() if name in furniture]
        ranges = [r for r in ranges if len(r)]
        return np.concatenate(ranges) if ranges else np.zeros(0, dtype=np.int32)

    def _set_scenery_visible(self, visible: bool) -> None:
        """Show or hide the furniture. Display only -- collision is untouched."""
        import newton

        shapes = self._scenery_shapes()
        if not len(shapes):
            return
        flags = np.asarray(self.env.model.shape_flags.numpy()).copy()
        bit = int(newton.ShapeFlags.VISIBLE)
        if visible:
            flags[shapes] |= bit
        else:
            flags[shapes] &= ~bit
        self.env.model.shape_flags.assign(flags)

    def _adopt_look_lighting(self) -> None:
        """Point the rig at the scene's own look, unless somebody set one.

        A scene states its lighting in a backend-neutral ``RenderSpec``, and
        until now the page ignored it and used its own tuned defaults. It still
        does when the caller stated a rig -- a ``--key``-style override is an
        instruction, not a suggestion -- which is what the comparison against a
        default ``LightingRig`` is asking: *did anybody touch this*.

        Only the fields the look states move; see
        :meth:`LightingRig.from_look` for why the rest stay where the page was
        tuned, and why the environment map is not one of them.
        """
        if self.config.lighting != LightingRig():
            return
        look = getattr(self.env, "look", None)
        if look is None:
            return
        self.lighting.rig = LightingRig.from_look(look)

    def _apply_backdrop(self) -> None:
        """Draw the room the scene's look names, through the page's own kit.

        The same registered builder the path tracer runs -- ``house_room_closed``,
        ``lab``, ``rgbs_lab``, ``tool_sort_shop`` -- so the page and the render
        are dressed by one description rather than two. Re-run whenever the
        scene changes, because which room a scene stands in is the scene's to
        say.
        """
        if self._backdrop is not None:
            self._backdrop.remove()
            self._backdrop = None
        if not self.config.backdrop:
            return
        look = getattr(self.env, "look", None)
        name = getattr(look, "scenery", "") or ""
        if not name:
            return
        spec = self._scene_spec()
        self._backdrop = draw_scenery(
            self.server.scene,
            name,
            cell=spec,
            surface_z=float(getattr(spec, "surface_z", 0.0) or 0.0),
        )

    def _apply_stage(self) -> None:
        """Put a plain slab where the hidden furniture's work surface was.

        The scenery default hides the bench so it cannot swallow the gizmos --
        but a towel folded on a hidden bench floats 0.7 m over the floor grid,
        which is a stranger picture than the one the hiding fixed. The stage is
        the seamless-paper answer: a thin light slab at the work surface, in
        the viser scene only, so the cloth rests on *something*, the key
        light's shadows land where contact happens, and nothing about the
        model, the physics or an export changes.

        Drawn only when there is furniture being stood in for: a scene with no
        statics (the robosuite arena, a task with no scene) keeps whatever it
        already shows, and showing the real scenery removes the stand-in.
        """
        if self._stage is not None:
            try:
                self._stage.remove()
            except Exception:
                pass
            self._stage = None
        spec = self._scene_spec()
        if self.show_scenery or spec is None or not spec.statics or not spec.surface_z > spec.ground_z:
            return
        half = spec.half if spec.half is not None else (0.65, 0.65, 0.0)
        self._stage = self.server.scene.add_box(
            "/studio/stage",
            color=STAGE_COLOR,
            dimensions=(
                2.0 * float(half[0]) * STAGE_MARGIN,
                2.0 * float(half[1]) * STAGE_MARGIN,
                STAGE_THICKNESS,
            ),
            position=(
                float(spec.center[0]),
                float(spec.center[1]),
                float(spec.surface_z) - STAGE_CLEARANCE - STAGE_THICKNESS / 2.0,
            ),
            cast_shadow=False,
            receive_shadow=True,
        )

    def apply_scenery(self) -> None:
        """Re-batch the viewer at the current setting. Main thread.

        A re-``set_model`` rather than a flag write, because the viewer decides
        visibility from the flags it captured when the model was handed over.
        """
        self._set_scenery_visible(self.show_scenery)
        # The picker caches the visible shapes on its first query; the flags
        # just changed, so what it would hit must follow what is drawn.
        if self.picker is not None:
            self.picker.invalidate()
        self.viewer.set_model(self.env.model)
        self.viewer.set_garments(garment_visuals(self.env.scene, getattr(self.env, "doc", None)))
        self.viewer.set_live_colors(scene_repaints_live(self.env.scene))
        self._push_finishes(self.env)
        self._adopt_look_lighting()
        self.lighting.apply()
        self._apply_backdrop()
        self._apply_stage()
        self._drawn_step = None

    def report_click(self, text: str) -> None:
        """Show what the last click found, on the arm that would act on it."""
        arm = self.arms.get(self.active_arm)
        if arm is not None:
            arm.report_click(text)
        else:
            self.status = text

    def set_paused(self, paused: bool) -> None:
        """Pause or resume from code, keeping the page's checkbox truthful. Main thread.

        The checkbox writes :attr:`paused` on a click; this is the other
        direction, for a driver outside the page -- ``robosimstudio_real2sim_agent``'s
        ``run N`` and ``pause`` -- so what the page shows is what the loop does.
        """
        self.paused = bool(paused)
        if self.pause_box is not None and self.pause_box.value != self.paused:
            self.pause_box.value = self.paused

    # --------------------------------------------------------------------- loop
    def begin_run(self) -> None:
        """Initialise the pacing and rate-readout state one loop iteration reads.

        Split out of :meth:`run` so that state lives on the session rather than
        in a closure over the ``while``: :meth:`tick` is the same iteration
        driven from outside, and it cannot be if the clock it paces against is a
        local variable. Public because a page driven from outside :meth:`run`
        (``robosimstudio_real2sim_agent``) must reset the clock after every :meth:`adopt`.
        """
        control_hz = (
            self.fleet.fleet.pipeline.control_hz if self.fleet is not None else self.env.request.physics.control_hz
        )
        self._dt = 1.0 / control_hz
        self._next_frame = time.perf_counter()
        self._rate_frames = 0
        self._rate_window = time.perf_counter()

    @property
    def scene(self) -> Any:
        """``server.scene`` -- add gizmos, meshes and frames here.

        Named to match :class:`robosimstudio.Viewer`, so a helper written
        against one page works on the other. It is what lets a viser component
        from anywhere -- pyroki's ``WeightTuner(server, ...)`` shape -- be
        dropped into a studio page through :meth:`each_step` and ``page=``
        without this module knowing anything about it.
        """
        return self.server.scene

    @property
    def gui(self) -> Any:
        """``server.gui`` -- add sliders, numbers and buttons here."""
        return self.server.gui

    def each_step(self, fn) -> None:
        """Call ``fn()`` once per control step, on the main thread.

        The seam a script needs to add a readout of its own: a viser callback
        may only assign, because it runs on the server's threadpool and touching
        Warp from there is undefined -- the contract every panel obeys (see
        :mod:`robosimstudio_studio.panels`). This runs where ``drain`` runs, so
        it may read state and write widgets.

        Drained in :meth:`tick` beside the panels, which means it does not run
        on a step the page did not take: paused is paused.
        """
        self._each_step.append(fn)

    def add_routines(self, routines) -> None:
        """A **Run** button per routine, a Stop, and what is playing: see :mod:`robosimstudio_studio.routine`.

        ``routines`` is one callable or a dict of name to callable. Each takes the
        scene (and, to drive the arm panels as a person does, the page as
        ``session``) and returns a generator that yields once per control step.
        """
        from .routine import PanelRoutine

        if callable(routines):
            routines = {"Run": routines}
        panel = PanelRoutine(self, routines)
        panel.build(self.server.gui)
        self.panels.append(panel)

    def run(self, *, steps: int = 0, warmup: int = 0) -> None:
        """Serve until the browser goes away or the page says stop.

        Args:
            steps: Stop after this many *stepped* iterations, instead of serving
                until asked to stop. Zero is a normal session. A non-zero value
                is what makes the page measurable without a person in front of
                it -- a benchmark drives it, counts, and gets its numbers back --
                and it counts steps rather than iterations so a paused or
                request-servicing pass does not spend the budget.
            warmup: Steps to run before the profiler's samples start counting.
                Discarded with :meth:`Profiler.reset`, which keeps the phase
                names and drops what they measured.

        Zero for either reads :attr:`StudioConfig.profile_steps` and
        :attr:`StudioConfig.profile_warmup`; a profiled run ends by printing
        the phase table and writing it to :attr:`StudioConfig.profile_out`.
        """
        steps = int(steps or self.config.profile_steps)
        warmup = int(warmup or self.config.profile_warmup)
        self.begin_run()
        stepped = 0
        self.profile.start()
        self._note_scene()
        # Timed here as well as in the profiler, so the same window can be
        # measured with the profiler off -- which is the only way to know what
        # the profiler itself costs.
        measured_from = time.perf_counter()
        try:
            while self.viewer.is_running() and not self.quit_requested:
                if not self.tick():
                    # A finished wave never steps again, so a budgeted run has
                    # to end on that rather than on a step count it can no
                    # longer reach. A page left open idles on the result, which
                    # is what somebody watching wants.
                    if steps and self.fleet is not None and self.fleet.done:
                        return
                    continue
                stepped += 1
                if warmup and stepped == warmup:
                    self.profile.reset()
                    measured_from = time.perf_counter()
                if steps and stepped >= warmup + steps:
                    return
        finally:
            self.measured_steps = stepped - min(stepped, warmup)
            self.measured_wall = time.perf_counter() - measured_from
            self._note_capture()
            if self.profile.device is not None:
                self.profile.device.drain()
            self.profile.stop()
            self._write_profile()
            self.close()

    def _write_profile(self) -> None:
        """Print the phase table and write its JSON sidecar, when anything was measured."""
        prof = self.profile
        if not prof.enabled:
            return
        path = Path(self.config.profile_out) if self.config.profile_out else None
        if path is None:
            path = self.root / "profile" / f"{time.strftime('%Y%m%d-%H%M%S')}.json"
        path.parent.mkdir(parents=True, exist_ok=True)
        prof.write(str(path))
        print(prof.report())
        print(f"[studio] profile written to {path}")

    def tick(self) -> bool:
        """One iteration of the loop. True when the scene actually stepped.

        Everything :meth:`run` used to do inside its ``while``. The return value
        is what lets a caller drive the page a fixed number of *steps* rather
        than a fixed number of passes, since servicing a load request or sitting
        paused returns without advancing anything.
        """
        prof = self.profile
        with prof.phase("iter"):
            with prof.phase("iter.requests"):
                if self.load_request is not None:
                    task, episode, scene, embodiment, gripper, worlds = self.load_request
                    self.load_request = None
                    self.load_task(task, episode, scene, embodiment, gripper, num_worlds=worlds)
                    control_hz = (
                        self.fleet.fleet.pipeline.control_hz
                        if self.fleet is not None
                        else self.env.request.physics.control_hz
                    )
                    self._dt = 1.0 / control_hz
                    self._next_frame = time.perf_counter()
                    return False
            if self.fleet is not None:
                # The task menu is drained first and every time: it is what sets
                # the world count, so a page that skipped it could be put into a
                # grid and never taken out of one.
                with prof.phase("iter.panels"):
                    for panel in self.panels:
                        panel.drain()
                if self.load_request is not None:
                    return False
                # A grid has its own loop -- worlds stepped together, scored on
                # a cadence, drawn on the clock. Everything below this line is
                # about driving *a* scene and has nothing to say about one.
                return self.fleet.tick()

            if self.reset_requested:
                self.reset_requested = False
                if not self.reset_now():
                    return False

            if self.scenery_request:
                self.scenery_request = False
                self.apply_scenery()

            if self.cloth_look_request is not None:
                look, self.cloth_look_request = self.cloth_look_request, None
                self.viewer.set_garment_style(look)
                self._drawn_step = None

            # ``None`` on a page showing a scene with no task: there is no
            # shipped policy to run, so nothing is driving and the loop is
            # the teleop one.
            driven = self.driver is not None and self.driver.running
            if self.linked_request is not None:
                self.set_linked(self.linked_request)
                self.linked_request = None
            if self.release_last_requested:
                self.release_last_requested = False
                self.release_last()
            if self.release_all_requested:
                self.release_all_requested = False
                self.release_all()

            if self.paused or self.steps_held():
                # The interaction panels are drained while paused: lining a
                # grasp up on a held scene is exactly when you want to, and
                # aiming costs an IK solve rather than a step. The others
                # wait -- the episode panel's drain ticks a stateful
                # evaluator, and starting a policy on a scene that is not
                # advancing would leave it hanging on its first waypoint.
                if not driven:
                    self.drain_click()
                    for panel in self.panels:
                        # PanelRegions joins them: it draws and re-poses, and
                        # touches no evaluator -- a held scene is exactly when
                        # somebody is looking at where a region actually is.
                        # PanelScene and PanelInspector for the stronger version
                        # of the same argument: pausing to look at a thing is the
                        # main reason to pause, and an inspector that stopped
                        # following the selection while held would make the pause
                        # useless. Neither scores anything. PanelRenderView and
                        # PanelCamera neither: the path-traced view has to keep
                        # following the orbit, and Look through / Set from view
                        # are camera gestures; the camera panel skips its render
                        # when the step has not changed, so held costs little.
                        if isinstance(
                            panel,
                            (
                                PanelArm,
                                PanelObject,
                                PanelCloth,
                                PanelRegions,
                                PanelScene,
                                PanelInspector,
                                PanelOverlay,
                                PanelRenderView,
                                PanelCamera,
                            ),
                        ):
                            panel.drain()
                # Set here too: a script stepping a held page renders the rig
                # for a take the same as the loop's own step would.
                self.env.obs_render_enabled = self.wants_pixels
                self._capture_outside_steps()
                self._show_status()
                self.refresh_view()
                time.sleep(0.02)
                self._next_frame = time.perf_counter()
                return False

            with prof.phase("iter.drain"):
                if not driven:
                    with prof.phase("iter.drain.click"):
                        self.drain_click()
                panels = self.panels
                for panel in panels:
                    if driven and (isinstance(panel, CONTROL_PANELS) or panel is self.goal_panel):
                        continue
                    with prof.phase(f"iter.drain.{panel.profile_name}"):
                        panel.drain()
                    if self.panels is not panels:
                        # A drain rebuilt the page (a Run whose reset
                        # recompiled the scene): the rest of this list is
                        # closed panels over a model that is gone.
                        break
                # A script's own per-step work, last: it reads what the panels
                # have just done rather than racing them, and it is drained even
                # while a policy drives, because a readout of a run is exactly
                # what somebody would add one for.
                if self._each_step:
                    with prof.phase("iter.drain.each_step"):
                        for fn in self._each_step:
                            fn()
            if self.load_request is not None:
                return False  # a load was asked for mid-drain; do not step a dying scene

            # Set after the drain, so a take opened this iteration has its
            # cameras rendered on the very first step it records rather than
            # on the one after.
            self.env.obs_render_enabled = self.wants_pixels

            self._step_and_capture(prof)
            self._rate_frames += 1
            prof.mark_step()

            self.refresh_view()

            now = time.perf_counter()
            if now - self._rate_window >= 0.5:
                # Both rates, because they are now independent: the page
                # holding 12 fps over a scene stepping at 30 is the view
                # doing its job, not the loop stalling, and a session that
                # cannot tell those apart will go looking for the wrong bug.
                rate = self._rate_frames / (now - self._rate_window)
                self._rate_readout.value = f"{rate:.0f} steps/s  |  {self.view_fps:.0f} fps view"
                self._status_readout.value = self.status
                self._rate_frames, self._rate_window = 0, now

            with prof.phase("iter.pace"):
                if self.speed > 0.0:
                    self._next_frame += self._dt / self.speed
                    # Drop the debt rather than catching up: a scene already too
                    # slow gets slower, and a stutter becomes a stall.
                    sleep = self._next_frame - time.perf_counter()
                    if sleep > 0:
                        time.sleep(sleep)
                    else:
                        self._next_frame = time.perf_counter()
        return True

    def _step_and_capture(self, prof) -> None:
        """Take the loop's one step, then film and record it -- if it was taken.

        A policy that raises hands the arm back without stepping anything, and a
        capture after it would put a step that never happened into the take: the
        state unchanged, the action read back off the arm as if teleop drove it,
        in a take whose mode is already the policy's. So the step count, not the
        call, says whether there is anything to capture.
        """
        before = int(self.env.step_count)
        with prof.phase("iter.step"):
            if self.driver is not None and self.driver.running:
                action, mode = self.driver.step()
            else:
                with self._device_span():
                    self.env.step_teleop()
                action, mode = None, ""
        if int(self.env.step_count) != before:
            with prof.phase("iter.video"):
                # ``None`` when the selection left the video panel out, the same
                # way the recorder below is ``None`` without a document.
                if self.video is not None:
                    self.video.capture()
            # After the step, and with whatever drove it: a take is evidence
            # about a trajectory, so it records the action that produced the
            # state it is looking at.
            with prof.phase("iter.record"):
                if self.record is not None:
                    self.record.capture(action, mode)
        self._captured_step = int(self.env.step_count)

    def _note_scene(self) -> None:
        """Record what is being measured, beside the measurement.

        A phase table without this is unreadable a week later: ``draw`` costing
        10 ms means one thing over eight shape batches and quite another over
        eighty, and a per-batch cost cannot be inferred from a total whose
        divisor was not written down. The capture counters are here for a
        sharper reason -- a scene that quietly fell back to eager runs several
        times slower with no other symptom, so a profile that did not check
        would blame whatever phase happened to be on screen.
        """
        prof = self.profile
        if not prof.enabled:
            return
        model, pipeline = self.env.model, self.env.pipeline
        batches = getattr(self.viewer, "_shape_instances", {})
        prof.note(
            task=getattr(self.env.request, "name", ""),
            shape_batches=len(batches),
            shapes=int(getattr(model, "shape_count", 0)),
            bodies=int(getattr(model, "body_count", 0)),
            particles=int(getattr(model, "particle_count", 0)),
            triangles=int(getattr(model, "tri_count", 0)),
            substeps=pipeline.substeps,
            control_hz=pipeline.control_hz,
            speed=self.config.speed,
            cameras=len(self.live.specs()) if self.live is not None else 0,
            cloth_look=self.config.cloth_look,
        )

    def _note_capture(self) -> None:
        """The graph-capture counters, read at the end of the measured window."""
        prof = self.profile
        if not prof.enabled:
            return
        pipeline = self.env.pipeline
        prof.note(
            steps_replayed=pipeline.steps_replayed,
            steps_eager=pipeline.steps_eager,
            recapture_failures=pipeline.recapture_failures,
            capture_error=pipeline.capture_error or "none",
        )

    @contextmanager
    def _device_span(self):
        """Wrap the solver step in the profiler's event clock, when it has one.

        Only the teleop step is bracketed. A policy step is a whole rollout's
        worth of host work around the same solver call, and recording events
        around *that* would report the device as busy for the time its own
        planner spent thinking.
        """
        clock = self.profile.device
        if clock is None:
            yield
            return
        with clock.measure():
            yield

    @property
    def wants_pixels(self) -> bool:
        """Whether anything is looking through the environment's camera rig.

        A policy that has perception nodes reads ``obs["cameras"]``, a take
        records whatever the environment rendered, and the live view reads it
        when its source is the observation rig. Nothing else does -- the 3D
        scene draws through viser, not through the rig. Left running for an idle
        scene the rig is a tiled render of two cameras every fourth step for no
        reader, measured at 19% of the step rate on a tool-sorting scene,
        which is why this is a question and not simply ``True``.

        The live view has to be asked rather than assumed, and getting that
        wrong fails quietly in the worse direction: with the rig off, its
        observation source keeps showing whatever frames the last policy run
        left in ``env.frames`` -- a stale image rather than an absent one.
        """
        return (
            (self.driver is not None and self.driver.running)
            or (self.record is not None and self.record.recording)
            or (self.live is not None and self.live.wants_obs)
        )

    def refresh_view(self) -> None:
        """Redraw the browser and the read-only text. Whichever limit is slower.

        ``render_every`` alone is a step count, and a step count asks for a
        frame rate that moves with the step rate: the same ``render_every`` of 4
        is 12.5 fps on a paced 50 Hz task and 27 fps on the same scene at
        ``max``, so the faster the loop ran the larger the share of itself it
        spent drawing. On a tool-sorting scene at ``max`` that was 23% of the
        step rate.

        A wall-clock rate alone fails the other way, and worse. On a scene that
        steps slower than the rate asked for -- which is most coupled scenes --
        holding 12.5 fps means drawing *more* often than every fourth step:
        measured on the same task, 116 frames per 200 steps against the step
        rule's 50, and the step rate fell 61%. That is the failure
        :class:`~robosimstudio.core.render.RenderBudget` was written to
        prevent, and its load cap is the principled answer -- but not here. The
        cap divides by a *measured* frame cost, and viser's frame cost is not
        measurable early: the first draws of a scene take ~300 ms and fall to
        ~11 ms only after a hundred-odd of them, so a cap set from the cold
        measurement throttles the view, and throttling the view is what stops
        the warm-up ever finishing. Measured at a 0.25 cap: 1.5 fps still 40 s
        into a session, beside a solver running at 51 steps/s.

        So both limits, and the slower one wins. Wall clock stops a fast loop
        drawing frames nobody asked for; the step count stops a slow one
        drawing the same picture twice. It can never ask for more frames than
        the step rule did, so it cannot cost throughput, and no measurement is
        involved to be wrong about.

        The readouts refresh on the wall-clock limit alone, without waiting for
        a frame: they are cheap, and they are what changes on a scene that is
        *not* advancing, since clicking something while paused re-aims a grasp
        and rewrites the verdict.
        """
        now = time.perf_counter()
        if now - self._refreshed_at < self.draw_interval:
            return
        self._refreshed_at = now
        with self.profile.phase("iter.refresh"):
            for panel in self.panels:
                with self.profile.phase(f"iter.refresh.{panel.profile_name}"):
                    panel.refresh()
            self.refresh_holding()
        step = self.env.step_count
        if self._drawn_step is not None and step - self._drawn_step < self.render_every:
            return
        self._drawn_step = step
        self.draw()

        started, frames = self._fps_window
        if now - started >= 1.0:
            self.view_fps = (frames + 1) / (now - started)
            self._fps_window = (now, 0)
        else:
            self._fps_window = (started or now, frames + 1)

    def draw(self) -> None:
        with self.profile.phase("iter.draw"):
            self.viewer.profile = self.profile
            self.viewer.begin_frame(self.env.sim_time)
            self.viewer.log_state(self.env.state)
            self.viewer.end_frame()

    def close(self) -> None:
        self.teardown()
        try:
            self.viewer.close()
        except Exception:
            pass
````

## robosimstudio_real2sim_agent/server.py

````text
# SPDX-License-Identifier: Apache-2.0
"""A studio page that rebuilds a scene file under itself, and a socket to drive it.

The seam a coding agent needs and the library did not have: a viser page
that stays open while the scene under it is replaced. Everything used here is
the studio's own public surface -- ``StudioSession.adopt`` swaps a built
``Sim`` into the page, ``tick`` is one loop iteration driven from outside,
``begin_run`` resets the clock it paces against, ``set_paused`` keeps the
page's checkbox truthful -- and ``SimBus`` marshals a request from any thread
onto the one that owns the simulator.

One process, one page, one file. The file is executed on every save
(:mod:`.scenefile` is the contract), the scene it binds is built, and the
result is swapped into the open page: the browser never reloads and the
camera stays where it was left. A file that does not build leaves the previous
scene up, with the traceback in the page's ``Live`` folder and in ``status``;
one that builds and then fails to go into the page (the old scene is already
given back by then) leaves a bare scene up instead, with the same report. The
modules the file imports from its own directory are imported afresh on every
rebuild, so an edit to a helper beside it lands with the next save.
Saves are noticed by polling the file's stamp once per loop pass and waiting
for it to hold still for :data:`STABLE_SECONDS`, because editors write in two
steps and the compile step catches whatever slips through.

The loop is the studio's own ``tick``, driven here rather than by
``StudioSession.run`` because ``run`` closes the page when it returns and
because a command has to land *between* iterations: ``adopt`` rebuilds the
panels, and a panel rebuilt inside its own drain would return into a loop over
handles that no longer exist. So every command arrives on the socket's
thread, is put on the bus, and runs on the main thread between two passes.
An exception out of a pass -- a panel's drain, a rebuild -- is reported in the
``Live`` folder and in ``status`` and the loop goes on; only ``quit`` stops it.

While a routine plays it steps the scene itself, so the studio's own stepping
is held for as long as it plays (``LiveSession.steps_held``), whatever the
Pause checkbox says; ``run N`` is refused while it plays, and a rebuild or a
reset under a ``run N`` ends that run with a reply saying so.

The page is served on every interface (viser binds ``0.0.0.0``), not only on
``localhost``: anyone who can reach the port can drive it. On a shared network
firewall the port, or reach it over an SSH tunnel (``ssh -L 8080:localhost:8080
<box>``). :attr:`LiveServer.url` names the port viser actually took, which is
the next one up when the one asked for is busy.
"""

from __future__ import annotations

import gc
import importlib
import inspect
import io
import json
import math
import os
import queue
import signal
import sys
import sysconfig
import time
import traceback
from contextlib import redirect_stdout
from pathlib import Path
from typing import Any

import numpy as np

from robosimstudio.core.bus import BusClosed, BusTimeout, SimBus
from robosimstudio_studio.session import StudioConfig

from . import checks, frames, stills
from .page import LiveSession
from .scenefile import Loaded, fallback_scene, run_scene_file, stamp
from .wire import ControlSocket, ready_line

__all__ = ["REFRESH_SECONDS", "STABLE_SECONDS", "LiveServer"]

STABLE_SECONDS = 0.3
"""How long a saved file has to stop changing before it is executed."""
REFRESH_SECONDS = 0.5
"""How often the ``Live`` folder's readouts are rewritten."""
BOARD_LIMIT = 8
"""Pictures kept on the board; the oldest goes when another comes. The run directory keeps every one."""


class LiveServer:
    """One page, one scene file, one socket. Everything but the accept loop runs on the main thread."""

    def __init__(
        self,
        *,
        scene_path: Path | str,
        sock_path: Path | str,
        run_dir: Path | str,
        config: StudioConfig,
        watch: bool = True,
        hold: bool = False,
    ) -> None:
        self.hold = bool(hold)
        """Land every rebuild paused rather than running."""
        self.path = Path(scene_path).resolve()
        self.sock_path = Path(sock_path)
        self.run_dir = Path(run_dir).resolve()
        self.run_dir.mkdir(parents=True, exist_ok=True)
        self.config = config
        self.watch_enabled = watch
        self.url = f"http://localhost:{config.port}"
        """The page, on the port viser actually bound -- rewritten once the server is up."""
        self.share_url: str | None = None
        # As long as the client's longest wait (ctl.TIMEOUTS).
        self.bus = SimBus(timeout=600.0)
        self.socket = ControlSocket(self.sock_path, self._on_request)
        self.session: LiveSession | None = None
        self.ns: dict = {}
        """The scene file's names. ``eval`` runs in this same namespace, so what it binds the routines see."""
        self.generation = 0
        """Rebuilds that have gone into the page; ``run N`` ends when it changes under it."""
        self.scene: Any = None
        self.sim: Any = None
        self.last_error = ""
        self.build_error = ""
        """The last build's failure alone; ``last_error`` also holds a routine's, a click's or a take's."""
        self.loaded_at = 0.0
        self.load_seconds = 0.0
        self.run_budget = 0
        self.resets = 0
        """Resets taken since the page came up: ``ctl run N`` reads a change in it as its run ended."""
        """Steps left before the page pauses again; -1 is no limit."""
        self.script: list = []
        """Generators an ``eval`` returned, advanced one ``next()`` per loop pass."""
        self.recorder: checks.Recorder | None = None
        """Records the script playing, when ``eval --record`` asked for it; finished when the queue empties."""
        self._baseline_modules: set[str] = set()
        """What was imported before the scene file first ran; never evicted on a rebuild."""
        self._tick_error = ""
        self.ref_image: np.ndarray | None = None
        self.ref_label = ""
        self.board: dict[str, np.ndarray] = {}
        """Pictures the agent put on the page, by label: what it is looking at, shown to the person watching."""
        self.clicks: queue.Queue = queue.Queue()
        """Button presses from viser's thread, taken on the main thread between two loop passes."""
        self.snap_n = 0
        self.cmp_n = 0
        self.last_take: dict = {}
        self.last_keys: list[str] = []
        """The keys of the last still comparison; a take that ends is held against the clip with them."""
        self._loaded_stamp = None
        self._pending = None
        self._pending_at = 0.0
        self._refreshed = 0.0
        self._shown: dict[str, str] = {}

    # ------------------------------------------------------------ the file
    def load(self) -> Loaded:
        """Execute the scene file and build what it declares. Raises on any failure."""
        self.evict_helpers()
        return run_scene_file(self.path)

    def evict_helpers(self) -> list[str]:
        """Forget the modules the scene file imported from its own directory, so they are read again.

        Only modules imported since the server started (anything already
        loaded then -- the library, even when the file sits at the repository
        root -- is never touched), and only those whose file is under the scene
        file's directory: a helper beside ``scene.py``, or a package of them.
        """
        root = self.path.parent
        # installed packages are never helpers, even when the virtualenv sits under the scene file's directory
        installed = {Path(p).resolve() for key in ("purelib", "platlib") if (p := sysconfig.get_paths().get(key))}
        gone = []
        for name, module in list(sys.modules.items()):
            if name in self._baseline_modules or name.partition(".")[0] in self._baseline_modules:
                continue
            file = getattr(module, "__file__", None)
            if not file:
                continue
            resolved = Path(file).resolve()
            try:
                resolved.relative_to(root)
            except ValueError:
                continue
            if any(part in ("site-packages", "dist-packages") for part in resolved.parts) or any(
                resolved.is_relative_to(lib) for lib in installed
            ):
                continue
            del sys.modules[name]
            gone.append(name)
        if gone:
            importlib.invalidate_caches()
        return gone

    def swap(self, loaded: Loaded) -> bool:
        """Put a built scene into the page. False when it would not go in; a bare scene stands in then."""
        old = self.sim
        # before adopt() closes the old sim: a take's last frame is read off it
        self._finish_recorder("the scene was rebuilt")
        self.script.clear()
        self.run_budget = 0
        try:
            self._adopt(loaded)
            ok = True
        except Exception as exc:
            # adopt() gave the old scene back before it failed, so there is no
            # previous scene to keep: serve a bare one, and say why.
            error = traceback.format_exc()[-3000:]
            print(
                f"[live] {self.path.name} built but would not go into the page:\n{error}", file=sys.stderr, flush=True
            )
            try:
                scene = fallback_scene()
                self._adopt(Loaded(ns={}, scene=scene, sim=scene.build(control_mode="joint_position"), seconds=0.0))
            except Exception:
                error += (
                    "\n\nand the bare scene that should have replaced it failed too:\n" + traceback.format_exc()[-2000:]
                )
                print(f"[live] the bare scene failed too:\n{error}", file=sys.stderr, flush=True)
            self.last_error = self.build_error = error
            self.session.status = f"rebuild failed going into the page: {type(exc).__name__}: {exc}"
            ok = False
        del old
        gc.collect()
        self.refresh_live(force=True)
        return ok

    def _adopt(self, loaded: Loaded) -> None:
        # the file's names first: adopt() rebuilds the page, and its buttons are the routines the file binds
        self.ns, self.scene, self.sim = loaded.ns, loaded.scene, loaded.sim
        self.generation += 1
        self.session.adopt(loaded.sim, label="live")
        self.session.begin_run()
        self.last_error = self.build_error = ""
        self.loaded_at = time.time()
        self.load_seconds = loaded.seconds

    def reload(self, why: str = "requested") -> dict:
        """Rebuild from the file; the page is touched only when the build succeeded."""
        self._loaded_stamp, self._pending = stamp(self.path), None
        try:
            loaded = self.load()
        except (Exception, SystemExit) as exc:
            self.last_error = self.build_error = traceback.format_exc()[-3000:]
            self.session.status = f"reload failed: {type(exc).__name__}: {exc}"
            print(
                f"[live] reload ({why}) failed:\n{self.last_error}",
                file=sys.stderr,
                flush=True,
            )
            self.refresh_live(force=True)
            return {"ok": False, "error": self.last_error}
        if not self.swap(loaded):
            return {"ok": False, "error": self.last_error}
        self.session.status = f"loaded {self.path.name} in {loaded.seconds:.1f} s"
        names = loaded.sim.names()
        print(
            f"[live] loaded {self.path.name} in {loaded.seconds:.1f} s ({why}): {', '.join(names)}",
            flush=True,
        )
        return {"ok": True, "seconds": round(loaded.seconds, 2), "names": names}

    def watch(self) -> None:
        cur = stamp(self.path)
        if cur is None or cur == self._loaded_stamp:
            return
        now = time.perf_counter()
        if cur != self._pending:
            self._pending, self._pending_at = cur, now
            return
        if now - self._pending_at < STABLE_SECONDS:
            return
        self.reload("saved")

    # ------------------------------------------------------------ the loop
    def tick_once(self) -> None:
        try:
            self.bus.pump(budget=8)
            self._take_clicks()
            if self.watch_enabled:
                self.watch()
            if self.script:
                self._play()
            if self.session.tick() and self.run_budget > 0:
                self.run_budget -= 1
                if self.run_budget == 0:
                    self.session.set_paused(True)
            self._tick_error = ""
        except Exception as exc:
            # A panel's drain or a rebuild that raised: the page stays up and
            # says so. Printed once per distinct failure, since the same one
            # may come round every pass; and the pass that failed is not paced,
            # so give the loop a breath rather than spin on it.
            error = traceback.format_exc()[-3000:]
            if error != self._tick_error:
                self._tick_error = error
                self.last_error = error
                self.session.status = f"the loop failed: {type(exc).__name__}: {exc}"
                print(f"[live] the loop failed; still serving:\n{error}", file=sys.stderr, flush=True)
                self.refresh_live(force=True)
            time.sleep(0.05)
        if time.perf_counter() - self._refreshed >= REFRESH_SECONDS:
            self.refresh_live()

    def _take_clicks(self) -> None:
        while True:
            try:
                what, name = self.clicks.get_nowait()
            except queue.Empty:
                return
            if what == "play":
                reply = self.cmd_play(name)
                if not reply.get("ok"):
                    self.last_error = str(reply.get("error", ""))
                    self.refresh_live(force=True)

    def routines(self) -> dict[str, Any]:
        """The routines the scene file offers, by the name their button carries: ``routine`` (one) and
        ``routines`` (a dict of name -> callable, its keys named as ``str`` names them)."""
        found: dict[str, Any] = {}
        if callable(self.ns.get("routine")):
            found["routine"] = self.ns["routine"]
        many = self.ns.get("routines")
        if isinstance(many, dict):
            for k, v in many.items():
                if callable(v):
                    found.setdefault(str(k), v)
        return found

    def routine_names(self) -> list[str]:
        return list(self.routines())

    def start_script(self, gen, *, record: str = "", every: int = 4, camera: str = "") -> None:
        """Queue a generator to play one step per loop pass, filming it when asked.

        The page's own stepping is held while anything is queued
        (``LiveSession.steps_held``) and the Pause checkbox is left as it was,
        so when the queue empties the page carries on as it was before.
        """
        if record:
            # the new take films the new routine alone: what was queued ahead of it is dropped, not filmed into it
            self.script.clear()
            self._finish_recorder("another recording started")
            recorder = checks.Recorder(self, record, camera=camera, every=every)
            try:
                recorder.capture()  # frame 0: the state before anything happened
            except Exception:
                recorder.close()
                raise
            self.recorder = recorder
        self.script.append(gen)
        self.run_budget = 0

    def stop_scripts(self, why: str) -> None:
        """Drop every queued script and finish the take filming them. Main thread."""
        self.script.clear()
        if self.run_budget > 0:
            # a `run N` under way ends held, as it would have at its last step, not running on unbounded
            self.session.set_paused(True)
        self.run_budget = 0
        self._finish_recorder(why)

    def _play(self) -> None:
        """One step of the script at the head of the queue. It steps the sim itself;
        the studio's own stepping is held meanwhile, so nothing doubles it."""
        gen = self.script[0]
        try:
            next(gen)
        except StopIteration:
            self.script.pop(0)
            print("[live] script finished", flush=True)
        except Exception:
            self.script.pop(0)
            gen.close()
            self.last_error = traceback.format_exc()[-3000:]
            print(f"[live] script failed:\n{self.last_error}", file=sys.stderr, flush=True)
        else:
            if self.recorder is not None:
                try:
                    self.recorder.maybe()
                except Exception:
                    # the recording failed, not the routine: drop the take and let the routine play on
                    recorder, self.recorder = self.recorder, None
                    recorder.close()
                    print(
                        f"[live] the recording failed:\n{traceback.format_exc()[-3000:]}", file=sys.stderr, flush=True
                    )
            return
        if not self.script:
            self._finish_recorder("the script ended")

    def _hold_take_against_clip(self, take: str) -> None:
        """Every take is judged: held against the clip's timeline with the last comparison's keys.

        The strip and its verdict go on the board and into the log, so the
        before and the after are in front of the agent and the person watching
        without anyone asking. No timeline or no keys yet: one line says so.
        """
        if not self._timeline().get("anchors"):
            print(f"[live] take {take!r} not held against a clip: no ref/timeline.json yet", flush=True)
            return
        if not self.last_keys:
            print(
                f"[live] take {take!r} not held against the clip: no `compare --key` yet to say which things to follow",
                flush=True,
            )
            return
        reply = self.cmd_compare(keys=self.last_keys, take=take, note="held against the clip as the take ended")
        if reply.get("ok"):
            print(f"[live] take {take!r} against the clip: {reply['verdict']}\n{reply['report']}", flush=True)
        else:
            print(f"[live] take {take!r} could not be held against the clip: {reply.get('error')}", flush=True)

    def _finish_recorder(self, why: str) -> None:
        if self.recorder is None:
            return
        recorder, self.recorder = self.recorder, None
        try:
            summary = recorder.finish()
            self.last_take = summary
            checks.log_append(
                self.run_dir,
                {"cmd": "record", "scene": checks.scene_hash(self.path), **summary},
            )
            print(
                f"[live] take {summary['take']!r} written ({why}): {summary['frames']} frames, {summary['seconds']:.1f} s",
                flush=True,
            )
            self._hold_take_against_clip(summary["take"])
        except Exception:
            self.last_error = traceback.format_exc()[-3000:]
            print(
                f"[live] the take could not be written:\n{self.last_error}",
                file=sys.stderr,
                flush=True,
            )

    def refresh_live(self, force: bool = False) -> None:
        self._refreshed = time.perf_counter()
        session = self.session
        if session is None or self.sim is None or not session.host_widgets:
            return
        try:
            names = self.sim.names()
            age = time.time() - self.loaded_at
            state = "**playing a script**" if self.script else ("**paused**" if session.paused else "**running**")
            things = f"{len(names)} thing" + ("" if len(names) == 1 else "s")
            tail = "\n".join(self.last_error.rstrip().splitlines()[-8:])
            text = {
                "scene": f"**{self.path.name}** · {things} · built in {self.load_seconds:.1f} s, {age:.0f} s ago",
                "sim": f"step {self.sim.step_count} · t = {self.sim.time:.2f} s · {state}",
                "error": f"**last error** (`ctl status` has all of it)\n```\n{tail}\n```" if self.last_error else "",
            }
            for key, value in text.items():
                if force or self._shown.get(key) != value:
                    session.host_widgets[key].content = value
                    self._shown[key] = value
        except Exception:  # a widget mid-teardown; the next refresh will do
            pass

    def serve(self) -> None:
        """Open the page, take the socket, print the ready line and run the loop until ``quit``."""
        self.open_page()
        for sig in (signal.SIGINT, signal.SIGTERM):
            signal.signal(sig, lambda *_: setattr(self.session, "quit_requested", True))
        try:
            # Inside the try, so a socket that cannot be had -- another live
            # server on it -- closes the page and exits before the ready line.
            self.socket.start()
            if self.config.share:
                # Newton's viewer asked for the tunnel at construction; asking again
                # returns the same URL once it is up, without blocking.
                self.share_url = self.session.server.request_share_url(verbose=False) or None
            share = self.share_url or ("unavailable" if self.config.share else None)
            print(ready_line(self.url, self.sock_path, self.path, share), flush=True)
            while self.session.viewer.is_running() and not self.session.quit_requested:
                self.tick_once()
        finally:
            try:
                # a take still filming is written out, as a reset would write it, before the page goes
                self.stop_scripts("the server stopped")
            except Exception:
                print(f"[live] the take could not be finished:\n{traceback.format_exc()[-3000:]}", file=sys.stderr)
            self.socket.close()
            self.bus.close()
            self.session.close()
            print("[live] stopped", flush=True)

    def open_page(self) -> None:
        """Build the file (a bare scene if it does not build) and open the page over it. No socket, no loop."""
        # The scene file's own directory, so what it imports by name beside
        # itself resolves -- and so `eval` can import it back the same way.
        sys.path.insert(0, str(self.path.parent))
        self._baseline_modules = set(sys.modules)
        # Stamped before the build, not after: a save made while the first
        # build runs is a change the watcher must still see.
        self._loaded_stamp = stamp(self.path)
        try:
            loaded = self.load()
            error = ""
        except (Exception, SystemExit):
            error = traceback.format_exc()[-3000:]
            print(
                f"[live] {self.path.name} did not build; serving a bare scene instead:\n{error}",
                file=sys.stderr,
            )
            scene = fallback_scene()
            loaded = Loaded(
                ns={},
                scene=scene,
                sim=scene.build(control_mode="joint_position"),
                seconds=0.0,
            )
        self.ns, self.scene, self.sim = loaded.ns, loaded.scene, loaded.sim
        self.session = LiveSession(loaded.sim, config=self.config, host=self)
        # viser takes the next port up when the one asked for is busy
        self.url = f"http://localhost:{self.session.server.get_port()}"
        self.generation += 1
        self.last_error = self.build_error = error
        self.loaded_at = time.time()
        self.load_seconds = loaded.seconds
        self.session.begin_run()
        self.refresh_live(force=True)

    # ------------------------------------------------------------ the socket
    def _on_request(self, request: dict) -> dict:
        """The socket thread's half: put the command on the bus and wait for the main thread's answer."""
        try:
            return self.bus.call(self.dispatch, request)
        except BusTimeout as exc:
            return {"ok": False, "error": f"server busy: {exc}"}
        except BusClosed:
            return {"ok": False, "error": "server shutting down"}

    def dispatch(self, request: dict) -> dict:
        """Run one command on the main thread, between two loop iterations."""
        name = str(request.get("cmd", ""))
        handler = getattr(self, f"cmd_{name}", None)
        if handler is None:
            return {"ok": False, "error": f"unknown command {name!r}"}
        try:
            return handler(**{k: v for k, v in request.items() if k != "cmd"})
        except Exception:
            return {"ok": False, "error": traceback.format_exc()[-3000:]}

    # ------------------------------------------------------------ commands
    def cmd_status(self) -> dict:
        sim, scene = self.sim, self.scene
        names = sim.names()
        positions = {}
        for name in names:
            try:
                positions[name] = [round(float(v), 4) for v in sim[name].position]
            except Exception:
                positions[name] = "no body"
        current = stamp(self.path)
        return {
            "ok": True,
            "url": self.url,
            "share_url": self.share_url,
            "pid": os.getpid(),
            "run_dir": str(self.run_dir),
            "file": str(self.path),
            "modified": time.strftime("%H:%M:%S", time.localtime(current[0] / 1e9)) if current else "missing",
            "loaded": time.strftime("%H:%M:%S", time.localtime(self.loaded_at)),
            "load_seconds": round(self.load_seconds, 2),
            "last_error": self.last_error,
            "cell": scene.cell,
            "names": names,
            "cameras": [c.name for c in sim.cameras],
            "step": int(sim.step_count),
            "time": round(float(sim.time), 3),
            "paused": bool(self.session.paused),
            "playing": len(self.script),
            "generation": self.generation,
            "resets": self.resets,
            "finite": bool(sim.state_is_finite()),
            "routines": self.routine_names(),
            "board": list(self.board),
            "recording": self.recorder.name if self.recorder is not None else "",
            "last_take": self.last_take.get("take", ""),
            "positions": positions,
        }

    def cmd_reload(self) -> dict:
        return self.reload("requested")

    def cmd_run(self, steps: int = 1) -> dict:
        if self.script:
            return {
                "ok": False,
                "error": "a routine is playing and steps the scene itself; wait for it to end, or `reset` to stop it",
            }
        self.run_budget = max(1, int(steps))
        self.session.set_paused(False)
        return {
            "ok": True,
            "step": int(self.sim.step_count),
            "budget": self.run_budget,
            "generation": self.generation,
            "resets": self.resets,
        }

    def cmd_pause(self) -> dict:
        self.run_budget = 0
        self.session.set_paused(True)
        return {"ok": True, "paused": True}

    def cmd_resume(self) -> dict:
        self.run_budget = -1
        self.session.set_paused(False)
        reply: dict = {"ok": True, "paused": False}
        if self.script:
            reply["note"] = "a routine is playing; the page runs on its own once it ends"
        return reply

    def cmd_reset(self) -> dict:
        # The page's two Reset buttons land in the same place: the loop's
        # reset_now(), which LiveSession extends to stop the scripts and the take.
        self.session.reset_requested = True
        return {"ok": True}

    def cmd_quit(self) -> dict:
        self.session.quit_requested = True
        return {"ok": True}

    def cmd_eval(self, code: str = "", record: str = "", every: int = 4, camera: str = "") -> dict:
        import robosimstudio as rss

        # The scene file's own namespace, not a copy: a name eval binds is one
        # the file's routines read, so a later `play` sees it. The next save
        # starts the namespace over. The page's names never shadow the file's.
        ns = self.ns
        ns.update(sim=self.sim, scene=self.scene)
        for name, value in (
            ("session", self.session),
            ("server", self.session.server),
            ("np", np),
            ("rss", rss),
            ("live", self),
        ):
            ns.setdefault(name, value)
        out = io.StringIO()
        value = None
        with redirect_stdout(out):
            try:
                expression = compile(code, "<eval>", "eval")
            except SyntaxError:
                exec(compile(code, "<eval>", "exec"), ns)
            else:
                value = eval(expression, ns)
        playing = False
        if inspect.isgenerator(value):
            # A script: played one step per loop pass so the page draws it,
            # instead of freezing for as long as it takes. The page is held
            # while it plays (the script does the stepping) and let go after
            # if it was running before.
            self.start_script(value, record=record, every=every, camera=camera)
            playing, value = True, None
        elif record:
            return {
                "ok": False,
                "error": "--record needs the code to return a generator (a routine the page plays); nothing was recorded",
            }
        reply = {
            "ok": True,
            "value": None if value is None else repr(value),
            "stdout": out.getvalue(),
            "playing": playing,
        }
        if record:
            reply["recording"] = str(self.run_dir / f"{record}.mp4")
        return reply

    def cmd_snapshot(
        self,
        camera: str = "",
        out: str = "",
        beside: str = "",
        size: str = "",
        eye: str = "",
        look_at: str = "",
        browser: bool = False,
        note: str = "",
    ) -> dict:
        self.snap_n = checks.next_number(self.run_dir, "snap", self.snap_n)
        path = Path(out) if out else self.run_dir / f"snap_{self.snap_n:03d}.png"
        if browser:
            rgb = stills.browser_still(self.session.server, size)
            if rgb is None:
                return {
                    "ok": False,
                    "error": "no browser is connected to the page; open it or drop --browser",
                }
            name = "browser"
        else:
            cam = stills.camera_for(self.sim, self.scene, name=camera, size=size, eye=eye, look_at=look_at)
            rgb = stills.render_still(self.sim, cam)
            name = cam.name
        stills.save_png(rgb, path)
        reply = {
            "ok": True,
            "png": str(path),
            "camera": name,
            "width": int(rgb.shape[1]),
            "height": int(rgb.shape[0]),
            "mean": round(float(rgb.mean()), 1),
        }
        if beside:
            pair = stills.save_png(
                stills.side_by_side(rgb, beside),
                path.with_name(path.stem + "_vs_ref.png"),
            )
            reply["beside"] = str(pair)
        if note:
            reply["logged"] = checks.log_append(
                self.run_dir,
                {
                    "cmd": "snapshot",
                    "scene": checks.scene_hash(self.path),
                    "note": note,
                    "png": str(path),
                },
            )
        return reply

    def cmd_ref(
        self,
        op: str = "show",
        path: str = "",
        at: str = "0,end",
        every: float = 0.0,
        out: str = "",
        width: int = 0,
    ) -> dict:
        if op == "frames":
            return self.cut_frames(path, at=at, every=every, out=out, width=width)
        if op == "hide":
            self.session.hide_reference()
            self.ref_image, self.ref_label = None, ""
            return {"ok": True, "shown": False}
        self.ref_image, self.ref_label = stills.load_reference(path)
        self.session.show_reference(self.ref_image, self.ref_label)
        return {
            "ok": True,
            "shown": True,
            "size": [int(self.ref_image.shape[1]), int(self.ref_image.shape[0])],
        }

    # ------------------------------------------------------------ the clip, the numbers, the gate
    def ref_dir(self) -> Path:
        return self.path.parent / "ref"

    def cut_frames(
        self,
        clip: str,
        *,
        at: str = "0,end",
        every: float = 0.0,
        out: str = "",
        width: int = 0,
    ) -> dict:
        """Stills out of the clip at the times asked, a contact sheet, and the timeline they anchor."""
        clip_path = Path(clip)
        if not clip_path.is_file():
            return {"ok": False, "error": f"no clip at {clip}"}
        out_dir = Path(out) if out else self.ref_dir()
        meta = frames.probe(clip_path)
        if meta["duration"] <= 0:
            # ffmpeg read "Duration: N/A" (a raw .h264 stream, some webm): "end" would be 0 and no time can be sought
            return {
                "ok": False,
                "error": f"{clip} has no duration ffmpeg can read; re-mux it (ffmpeg -i {clip} -c copy out.mp4)",
            }
        times = frames.parse_times(at, meta["duration"] - 1.0 / (meta["fps"] or 30.0))  # "end" is the last frame
        # a still is named to the hundredth, so the anchor is that hundredth: two times inside one name are one moment
        floored: dict[float, tuple[str, str]] = {}  # t -> (label, the time as asked)
        for t, label in times:
            moment = math.floor(t * 100 + 1e-6) / 100
            if moment not in floored:
                floored[moment] = (label, f"{t:g}")
                continue
            kept, asked = floored[moment]
            if label and kept and label != kept:
                return {
                    "ok": False,
                    "error": f"{asked}:{kept} and {t:g}:{label} fall in one still ({frames._stem(moment)}.jpg); "
                    "mark them at least 0.01 s apart",
                }
            floored[moment] = (kept or label, asked)
        times = [(t, label) for t, (label, _) in floored.items()]
        stills_cut = frames.extract(clip_path, [t for t, _ in times], out_dir, width=width)
        anchors = [{"t": t, "file": p.name, "label": label} for (t, label), p in zip(times, stills_cut, strict=True)]
        spacing = float(every) if every else max(0.5, round(meta["duration"] / 24.0, 1))
        sheet, tiles = frames.contact_sheet(clip_path, spacing, out_dir / "contact.jpg")
        timeline = frames.write_timeline(out_dir, meta, anchors)
        return {
            "ok": True,
            "clip": meta["clip"],
            "fps": meta["fps"],
            "size": f"{meta['width']}x{meta['height']}",
            "duration": meta["duration"],
            "frames": [str(p) for p in stills_cut],
            "contact": f"{sheet} ({tiles} tiles, every {spacing} s)",
            "timeline": str(timeline),
            "report": "\n".join(f"{a['t']:6.2f} s  {a['file']}  {a['label']}" for a in anchors),
        }

    def _keys(self, keys: list | tuple) -> list:
        from .compare import parse_key

        return [parse_key(str(k)) for k in keys]

    def _timeline(self, path: str = "") -> dict:
        if path:
            return json.loads(Path(path).read_text())
        return frames.read_timeline(self.ref_dir())

    def _timeline_dir(self, path: str = "") -> Path:
        """Where a timeline's stills are: beside the timeline file it was read from."""
        return Path(path).parent if path else self.ref_dir()

    def _default_ref(self, ref: str, timeline: dict, timeline_path: str = "") -> str:
        if ref:
            return ref
        anchors = timeline.get("anchors") or []
        if anchors:
            first = Path(anchors[0]["file"])
            return str(first if first.is_absolute() else self._timeline_dir(timeline_path) / first)
        return ""

    def cmd_compare(
        self,
        ref: str = "",
        camera: str = "",
        keys: list | tuple = (),
        size: str = "",
        out: str = "",
        note: str = "",
        take: str = "",
        timeline: str = "",
    ) -> dict:
        parsed = self._keys(keys)
        self.cmp_n = checks.next_number(self.run_dir, "cmp", self.cmp_n)
        base = Path(out) if out else self.run_dir / f"cmp_{self.cmp_n:03d}.png"
        line = self._timeline(timeline)
        if take:
            if not line:
                return {
                    "ok": False,
                    "error": "no timeline: `ref frames <clip> --at 0,end` writes ref/timeline.json, or give --timeline",
                }
            if not parsed:
                return {
                    "ok": False,
                    "error": "a take is compared thing by thing: give at least one --key",
                }
            try:
                result = checks.compare_take(self.run_dir, take, line, parsed, self._timeline_dir(timeline))
            except Exception as exc:
                return {"ok": False, "error": f"{type(exc).__name__}: {exc}"}
            strip = checks.write_strip(base, result.pop("tiles"))
            verdict = checks.motion_summary(result["motion"])
            self.cmd_show(strip, label=f"take {take} against the clip: {verdict}")
            entry = {
                "cmd": "compare",
                "scene": checks.scene_hash(self.path),
                "score": result["score"],
                "note": note,
                "take": take,
                "strip": strip,
            }
            n = checks.log_append(self.run_dir, entry)
            (base.with_suffix(".json")).write_text(
                json.dumps(
                    {k: v for k, v in result.items() if k != "lines"},
                    default=checks._plain,
                    indent=1,
                )
            )
            return {
                "ok": True,
                "take": take,
                "score": result["score"],
                "strip": strip,
                "verdict": verdict,
                "report": "\n".join(result["lines"]),
                "logged": n,
                "anchors": result["anchors"],
                "motion": result["motion"],
            }
        ref = self._default_ref(ref, line, timeline)
        if not ref:
            return {
                "ok": False,
                "error": "no photograph: give --ref, or `ref frames <clip>` so the timeline's first anchor stands in",
            }
        if not Path(ref).is_file():
            return {"ok": False, "error": f"no photograph at {ref}"}
        rgb, seg, names, cam = checks.render_with_seg(self.sim, self.scene, camera=camera, size=size)
        try:
            result = checks.compare_still(rgb, seg, names, ref, parsed)
        except Exception as exc:
            return {"ok": False, "error": f"{type(exc).__name__}: {exc}"}
        pictures = checks.write_compare_pictures(base, rgb, result)
        self.cmd_show(pictures["beside"], label=f"compare {self.cmp_n}: render | {Path(ref).name}")
        self.cmd_show(pictures["look"], label=f"look {self.cmp_n}: what the photo has that the render lacks")
        if parsed:
            self.last_keys = [str(k) for k in keys]
        readings = {k: v for k, v in result.items() if k not in ("pairs", "fitted", "lines")}
        base.with_suffix(".json").write_text(
            json.dumps(
                {"ref": ref, "camera": cam.name, **readings},
                default=checks._plain,
                indent=1,
            )
        )
        n = checks.log_append(
            self.run_dir,
            {
                "cmd": "compare",
                "scene": checks.scene_hash(self.path),
                "score": result["score"],
                "note": note,
                "ref": Path(ref).name,
                "look": pictures["look"],
            },
        )
        return {
            "ok": True,
            "camera": cam.name,
            "ref": ref,
            "score": result["score"],
            "report": "\n".join(result["lines"]),
            **pictures,
            "logged": n,
            "objects": readings["objects"],
            "readings": {k: v for k, v in readings.items() if k != "objects"},
        }

    def cmd_check(
        self,
        camera: str = "",
        keys: list | tuple = (),
        objects: list | tuple = (),
        steps: int = 60,
        settle_mm: float = 2.0,
        penetration_mm: float = 1.0,
        timeline: str = "",
        note: str = "",
    ) -> dict:
        if self.script:
            return {
                "ok": False,
                "error": "a routine is playing and steps the scene itself; wait for it to end, or `reset` to stop it",
            }
        parsed = self._keys(keys)
        line = self._timeline(timeline)
        was_paused = self.session.paused
        self.session.set_paused(True)
        try:
            result = checks.gate(
                self,
                camera=camera,
                keys=parsed,
                objects=list(objects),
                steps=int(steps),
                settle_mm=float(settle_mm),
                penetration_mm=float(penetration_mm),
                timeline=line,
            )
        except Exception as exc:
            # the rest check may already have stepped the scene: reset it, as a passing check does
            self.session.reset_requested = True
            self.session.set_paused(was_paused)
            return {"ok": False, "error": f"{type(exc).__name__}: {exc}"}
        # the rest check stepped the scene: reset it to its start (what `eval` or `run N` moved is not kept),
        # and resume if it was running
        self.session.reset_requested = True
        self.session.set_paused(was_paused)
        (self.run_dir / "check.json").write_text(json.dumps(result, default=checks._plain, indent=1))
        n = checks.log_append(
            self.run_dir,
            {
                "cmd": "check",
                "scene": checks.scene_hash(self.path),
                "passed": result["passed"],
                "note": note,
            },
        )
        return {
            "ok": True,
            "passed": result["passed"],
            "report": result["report"],
            "json": str(self.run_dir / "check.json"),
            "logged": n,
            "checks": result["checks"],
            "drift_mm": result["drift_mm"],
        }

    def cmd_play(self, name: str = "", record: str = "", every: int = 4, camera: str = "") -> dict:
        """Play a routine the scene file binds, the way its button does."""
        found = self.routines()
        names = list(found)
        if not names:
            return {
                "ok": False,
                "error": "the scene file binds no `routine` (a callable taking sim, returning a generator) and no `routines` dict",
            }
        name = name or names[0]
        if name not in names:
            return {"ok": False, "error": f"no routine called {name!r}; the scene file binds {', '.join(names)}"}
        fn = found[name]
        try:
            # a routine that asks for the page's session gets it: the arm panels write the gripper
            # every tick, and a routine closing a grip has to hold them off while it plays
            wants_session = "session" in inspect.signature(fn).parameters
            gen = fn(self.sim, session=self.session) if wants_session else fn(self.sim)
        except Exception:
            return {"ok": False, "error": traceback.format_exc()[-3000:]}
        if not inspect.isgenerator(gen):
            return {
                "ok": False,
                "error": f"routine {name!r} returned {type(gen).__name__}, not a generator: it must yield once per control step",
            }
        self.start_script(gen, record=record, every=every, camera=camera)
        reply = {"ok": True, "playing": name}
        if record:
            reply["recording"] = str(self.run_dir / f"{record}.mp4")
        return reply

    def cmd_show(self, path: str = "", label: str = "", clear: bool = False) -> dict:
        """Put a picture on the page for the person watching: what the agent is looking at, as it looks at it."""
        if clear:
            self.board.clear()
            self.session.clear()
            return {"ok": True, "board": []}
        if not path:
            return {"ok": False, "error": "show needs a picture, or --clear"}
        image, name = stills.load_reference(path)
        label = label or name
        self.board.pop(label, None)  # a picture shown again is the newest, not kept in its old place
        self.board[label] = image
        self.session.show(label, image)
        while len(self.board) > BOARD_LIMIT:
            oldest = next(iter(self.board))
            del self.board[oldest]
            self.session.clear(oldest)
        return {"ok": True, "board": list(self.board)}

    def cmd_log(self, last: int = 0) -> dict:
        rows = checks.log_read(self.run_dir)
        if last:
            rows = rows[-int(last) :]
        return {
            "ok": True,
            "count": len(rows),
            "report": checks.log_report(rows),
            "entries": rows,
        }

    def cmd_catalog(self, kinds: list | tuple = ()) -> dict:
        """The names the registries know, as this process registered them.

        Server-side rather than in ``ctl`` because the content roots register
        cells and robots into the process that imported them, and because the
        client is standard-library only. ``assets`` runs the registries'
        discovery, which executes the task roots and takes seconds; naming the
        kinds wanted skips it.
        """
        from robosimstudio.assetlib.registry import list_assets
        from robosimstudio.robots.registry import list_embodiments, list_grippers
        from robosimstudio.scene.registry import list_cells

        listers = {
            "robots": list_embodiments,
            "grippers": list_grippers,
            "cells": list_cells,
            "assets": list_assets,
        }
        wanted = [str(k) for k in kinds] or list(listers)
        unknown = [k for k in wanted if k not in listers]
        if unknown:
            return {
                "ok": False,
                "error": f"no catalog named {', '.join(unknown)}; one of {', '.join(listers)}",
            }
        reply: dict = {"ok": True}
        for kind in wanted:
            reply[kind] = sorted(str(name) for name in listers[kind]())
        return reply
````

## robosimstudio_real2sim_agent/checks.py

````text
# SPDX-License-Identifier: Apache-2.0
"""What a twin is held to before anyone says it matches: a still against the photograph, a take against the clip, a gate.

The page used to answer one question, "what does it look like beside the
photo", and the agent answered the rest by eye. Three more are answered here
with numbers, and every answer is written to ``run/log.jsonl`` with the hash
of the ``scene.py`` that produced it, so before and after an edit are two
lines apart rather than two impressions apart.

``compare_still``
    The scene as it stands, through a camera, against one photograph: per keyed
    thing, where it is in each and how big (:mod:`.compare`); overall, how much
    of the render's structure the photograph has.
``record`` and ``compare_take``
    A routine played on the page is recorded through a camera -- the video, a
    quarter-size segmentation of every frame, every thing's position -- and
    then held against the clip's ``timeline.json``: the first frame before
    anything happened, the last after everything did, and each moment the
    agent marked in between. What moved in the clip must have moved in the
    take, by about as much.
``gate``
    The checks that do not need a photograph: the file builds, the state is
    finite, the camera the clip was shot through is declared at the clip's
    aspect, every named thing exists, nothing is sinking into anything, and
    nothing drifts when the scene is left alone. A twin that fails these is
    not a twin yet, however it looks.
"""

from __future__ import annotations

import hashlib
import json
import time
from pathlib import Path
from typing import Any

import numpy as np

from . import compare as C
from . import stills

__all__ = [
    "LOG",
    "Recorder",
    "compare_still",
    "compare_take",
    "gate",
    "log_append",
    "log_read",
    "log_report",
    "scene_hash",
]

LOG = "log.jsonl"
SEG_SCALE = 2
"""A recorded take keeps its segmentation at half size: 700 frames of 640x360 ids compress to a few megabytes, and a 20 px part survives."""
MOVED_FRACTION = 0.02
"""A centre that shifts by more than this fraction of the frame width between two anchors has moved."""


# ------------------------------------------------------------------ the log
def scene_hash(path: str | Path) -> str:
    """A hash of the scene file and every ``.py`` beside it: a twin's camera often lives in a helper module."""
    path = Path(path)
    try:
        digest = hashlib.sha1(path.read_bytes())
    except OSError:
        return "missing"
    for sibling in sorted(path.parent.glob("*.py")):
        if sibling != path:
            try:
                digest.update(sibling.name.encode())
                digest.update(sibling.read_bytes())
            except OSError:
                continue
    return digest.hexdigest()[:10]


def next_number(run_dir: str | Path, prefix: str, seen: int = 0) -> int:
    """The number after the highest ``<prefix>_NNN*`` in ``run_dir`` and after ``seen``.

    The page restarts, and a counter that started again at 1 overwrote the
    agent's earlier pairs: nine compares in one session left four files. The
    files on disk are the count.
    """
    highest = int(seen)
    for path in Path(run_dir).glob(f"{prefix}_[0-9][0-9][0-9]*"):
        digits = path.name[len(prefix) + 1 : len(prefix) + 4]
        if digits.isdigit():
            highest = max(highest, int(digits))
    return highest + 1


def motion_summary(motion: dict[str, dict]) -> str:
    """One line on a take: which things did what the clip did, and which did not."""
    agreed, differed, missing = [], [], []
    for name, entry in motion.items():
        p, s = entry.get("photo"), entry.get("sim")
        if p is None or s is None:
            missing.append(name)
        elif p["moved"] == s["moved"]:
            agreed.append(name)
        else:
            differed.append(
                f"{name} {'stayed' if not s['moved'] else 'moved'} (clip {'moved' if p['moved'] else 'stayed'})"
            )
    parts = [f"{len(agreed)} of {len(motion)} did what the clip did"]
    if differed:
        parts.append("; ".join(differed))
    if missing:
        parts.append("not found at both ends: " + ", ".join(missing))
    return "; ".join(parts)


def log_append(run_dir: str | Path, entry: dict[str, Any]) -> int:
    path = Path(run_dir) / LOG
    n = 1
    if path.exists():
        with path.open() as f:
            n = sum(1 for _ in f) + 1
    row = {"n": n, "at": time.strftime("%H:%M:%S"), **entry}
    with path.open("a") as f:
        f.write(json.dumps(row, default=_plain) + "\n")
    return n


def log_read(run_dir: str | Path) -> list[dict[str, Any]]:
    path = Path(run_dir) / LOG
    if not path.exists():
        return []
    rows = []
    for line in path.read_text().splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def log_report(rows: list[dict[str, Any]]) -> str:
    """One line per entry: when, what, which scene.py, the score, the note."""
    if not rows:
        return "nothing logged yet: compare, check and snapshot --note write here"
    out = ["  n  at        cmd       scene       score   note"]
    for r in rows:
        score = r.get("score")
        score = f"{score:.3f}" if isinstance(score, (int, float)) else "-"
        passed = r.get("passed")
        if passed is not None:
            score = "PASS" if passed else "FAIL"
        out.append(
            f"{r['n']:3d}  {r['at']}  {r.get('cmd', ''):<8}  {r.get('scene', '')[:10]:<10}  {score:>6}  {r.get('note', '')}"
        )
    return "\n".join(out)


def _plain(value: Any) -> Any:
    if isinstance(value, np.ndarray):
        return value.tolist()
    if isinstance(value, (np.integer, np.floating)):
        return value.item()
    if isinstance(value, Path):
        return str(value)
    return str(value)


# ------------------------------------------------------------------ the photograph's side
def photo_masks(photo: np.ndarray, keys: list[C.Key]) -> dict[str, np.ndarray | None]:
    """Every key found in the photograph, at the photograph's size, by colour."""
    return {key.name: C.photo_mask(photo, key) for key in keys}


# ------------------------------------------------------------------ rendering with ids
def render_with_seg(sim: Any, scene: Any, *, camera: str = "", size: str = ""):
    """The scene through a camera: RGB, its segmentation, the id -> name table, and the camera used.

    ``rgb`` is the picture :meth:`~robosimstudio.Sim.render` draws, the one a
    snapshot shows. ``seg`` comes off the collider ray tracer through the same
    camera, the renderer that has it; it is internal, never a choice.
    """
    cam = stills.camera_for(sim, scene, name=camera, size=size)
    sim.sync()
    names = sim.scene.handles.segmentation_names()
    renderer = sim.make_renderer("tiled", cameras=[cam], channels=["seg"])
    try:
        seg = np.asarray(renderer.render(sim.state)[cam.name]["seg"]).astype(np.int32)
    finally:
        renderer.close()
    rgb = stills.render_still(sim, cam)
    return rgb, seg, names, cam


# ------------------------------------------------------------------ one still
def compare_still(
    rgb: np.ndarray,
    seg: np.ndarray,
    names: dict[int, str],
    photo_path: str | Path,
    keys: list[C.Key],
) -> dict:
    """Every keyed thing in the render against the photograph: its size, where it sits, how much it overlaps."""
    photo = C.load_photo(photo_path)
    h, w = rgb.shape[:2]
    fitted, stretch = C.fit_photo(photo, w, h)
    masks = C.sim_masks(seg, names, [k.name for k in keys])
    found = photo_masks(photo, keys)
    pairs: dict[str, tuple] = {}
    objects: dict[str, dict] = {}
    lines: list[str] = []
    for key in keys:
        pm = found[key.name]
        pm = C.fit_mask(pm, w, h) if pm is not None else None
        sm = masks[key.name]
        pairs[key.name] = (pm, sm)
        reading = C.compare_masks(pm, sm)
        objects[key.name] = reading
        lines.append(C.advice(key.name, reading, w, key))
    # a thing the photo shows and the render does not counts as no overlap, not as left out
    ious = [o["iou"] or 0.0 for o in objects.values() if o["photo"] is not None]
    score = round(float(np.mean(ious)), 4) if ious else 0.0
    if not keys:
        lines.append("no --key given: nothing was measured; the look sheet still shows the pair")
    if abs(stretch - 1.0) > 0.02:
        lines.append(
            f"the photo's aspect was stretched {stretch:.2f}x to fit the camera: give the camera the photo's width and height"
        )
    return {
        "objects": objects,
        "score": score,
        "stretch": round(stretch, 3),
        "lines": lines,
        "pairs": pairs,
        "fitted": fitted,
    }


def write_compare_pictures(base: Path, rgb: np.ndarray, result: dict) -> dict[str, str]:
    """The two pictures a comparison leaves, both for the agent's own eye.

    ``beside``: the render and the photograph side by side at full size, the
    first version's whole instrument and still the first thing to look at.
    ``look``: the sheet -- the pair; the photograph with every keyed thing
    outlined twice (the photo's outline yellow, the render's cyan); each thing
    cut from both pictures at the same scale; and both pictures with the
    things painted out, which is what stands behind them.
    """
    fitted = result["fitted"]
    beside = stills.save_png(np.concatenate([rgb, fitted], axis=1), base.with_name(base.stem + "_beside.png"))
    return {"beside": str(beside), "look": write_look_sheet(base, rgb, result)}


def write_look_sheet(base: Path, rgb: np.ndarray, result: dict) -> str:
    """The sheet, as :func:`write_compare_pictures` describes it."""
    fitted, pairs = result["fitted"], result["pairs"]
    rows: list[tuple[str, np.ndarray]] = [
        (
            "where each thing sits: photo outline yellow, render outline cyan",
            C.overlay(fitted, pairs),
        )
    ]
    for name, (pm, sm) in pairs.items():
        tile = C.crop_pair(fitted, rgb, pm, sm)
        if tile is not None:
            rows.append((f"{name} up close: photo | render", tile))
    things = None
    for pm, sm in pairs.values():
        for m in (pm, sm):
            if m is not None:
                things = m.copy() if things is None else (things | m)
    if things is not None:
        from PIL import Image

        h = 240
        tiles = [
            np.asarray(Image.fromarray(t).resize((int(round(t.shape[1] * h / t.shape[0])), h), Image.BILINEAR))
            for t in (C.without_things(fitted, things), C.without_things(rgb, things))
        ]
        gap = np.full((h, 6, 3), 40, np.uint8)
        rows.append(
            (
                "behind the things: photo | render",
                np.concatenate([tiles[0], gap, tiles[1]], axis=1),
            )
        )
    return str(stills.save_png(C.look_sheet(fitted, rgb, rows), base.with_name(base.stem + "_look.png")))


# ------------------------------------------------------------------ a take
class Recorder:
    """Frames, ids and positions off a script as the page plays it, written down when it ends."""

    def __init__(self, server: Any, name: str, *, camera: str = "", every: int = 4) -> None:
        from robosimstudio.core.render.video import VideoWriter

        self.server = server
        self.sim, self.scene = server.sim, server.scene
        self.name = name
        self.every = max(1, int(every))
        self.cam = stills.camera_for(self.sim, self.scene, name=camera)
        self.names = self.sim.scene.handles.segmentation_names()
        self.control_hz = float(getattr(getattr(self.sim.request, "physics", None), "control_hz", 60.0) or 60.0)
        self.fps = max(1, int(round(self.control_hz / self.every)))
        self.run_dir = Path(server.run_dir)
        self.video = self.run_dir / f"{name}.mp4"
        self.writer = VideoWriter(self.video, fps=self.fps)
        # The ids come off the collider ray tracer; the picture is what Sim.render draws.
        self.renderer = self.sim.make_renderer("tiled", cameras=[self.cam], channels=["seg"])
        self.frames: list[dict] = []
        self.segs: list[np.ndarray] = []
        self.last_step = -1
        self.started = time.perf_counter()
        self.step0 = int(self.sim.step_count)
        self.time0 = float(self.sim.time)

    def close(self) -> None:
        """Close the video writer and the id renderer; safe to call twice."""
        for thing in (self.writer, self.renderer):
            try:
                thing.close()
            except Exception:
                pass

    def maybe(self) -> None:
        step = int(self.sim.step_count)
        if self.last_step < 0 or step - self.last_step >= self.every:
            self.capture()

    def capture(self) -> None:
        sim = self.sim
        sim.sync()
        frame = self.renderer.render(sim.state)[self.cam.name]
        rgb = stills.render_still(sim, self.cam)
        seg = np.asarray(frame["seg"]).astype(np.int32)
        self.writer.append(rgb)
        self.segs.append(seg[::SEG_SCALE, ::SEG_SCALE].astype(np.uint8 if len(self.names) < 255 else np.int32))
        objects = {}
        for label, name in self.names.items():
            stats = C.mask_stats(seg == label)
            if stats is not None:
                objects[name] = {
                    "bbox": stats["bbox"],
                    "centre": stats["centre"],
                    "pixels": stats["pixels"],
                }
        positions = {}
        for name in sim.names():
            try:
                positions[name] = [round(float(v), 4) for v in sim[name].position]
            except Exception:
                pass
        self.last_step = int(sim.step_count)
        self.frames.append(
            {
                "i": len(self.frames),
                "step": self.last_step - self.step0,
                "t": round(float(sim.time) - self.time0, 4),
                "objects": objects,
                "positions": positions,
            }
        )

    def finish(self) -> dict:
        try:
            if self.frames and self.last_step != int(self.sim.step_count):
                self.capture()  # the state the script left, which is the "after"
        finally:
            # closed whatever happened above: the writer is an ffmpeg process
            self.close()
        meta = {
            "name": self.name,
            "camera": self.cam.name,
            "width": int(self.cam.width),
            "height": int(self.cam.height),
            "every": self.every,
            "fps": self.fps,
            "control_hz": self.control_hz,
            "video": str(self.video),
            "names": {str(k): v for k, v in self.names.items()},
            "seg_scale": SEG_SCALE,
            "wall_seconds": round(time.perf_counter() - self.started, 1),
            "frames": self.frames,
        }
        (self.run_dir / f"{self.name}.json").write_text(json.dumps(meta, default=_plain))
        if self.segs:
            np.savez_compressed(self.run_dir / f"{self.name}_seg.npz", seg=np.stack(self.segs))
        return {
            "take": self.name,
            "video": str(self.video),
            "frames": len(self.frames),
            "seconds": self.frames[-1]["t"] if self.frames else 0.0,
            "wall_seconds": meta["wall_seconds"],
        }


def load_take(run_dir: str | Path, name: str) -> tuple[dict, np.ndarray | None]:
    run_dir = Path(run_dir)
    meta = json.loads((run_dir / f"{name}.json").read_text())
    seg_path = run_dir / f"{name}_seg.npz"
    segs = None
    if seg_path.exists():
        with np.load(seg_path) as archive:
            segs = archive["seg"]
    return meta, segs


def _nearest_frame(frames: list[dict], t: float) -> dict:
    return min(frames, key=lambda f: abs(float(f["t"]) - t))


def compare_take(
    run_dir: str | Path,
    name: str,
    timeline: dict,
    keys: list[C.Key],
    ref_dir: str | Path,
) -> dict:
    """A recorded take against the clip's anchors: the first frame, the last, and each one marked between.

    An anchor is matched to the take by its own ``sim_t`` (seconds into the
    take) or ``sim_step`` when the agent pinned one, else by proportion: the
    clip's moment at 40 % of its length is held against the take at 40 % of
    its length. The clip and the take need not be the same length -- a robot
    is slower than a person -- but what moved in one must have moved in the
    other.
    """
    import imageio.v2 as imageio

    run_dir, ref_dir = Path(run_dir), Path(ref_dir)
    meta, segs = load_take(run_dir, name)
    frames = meta["frames"]
    if not frames:
        raise ValueError(f"take {name!r} has no frames")
    names = {int(k): v for k, v in meta["names"].items()}
    w, h = int(meta["width"]), int(meta["height"])
    anchors = list(timeline.get("anchors", []))
    if not anchors:
        raise ValueError("the timeline has no anchors; `ref frames <clip> --at 0,end` makes two")
    clip_len = float(timeline.get("duration") or anchors[-1]["t"] or 1.0)
    take_len = float(frames[-1]["t"]) or 1.0
    reader = imageio.get_reader(str(meta["video"]), "ffmpeg")
    rows: list[dict] = []
    tiles: list[tuple[np.ndarray, np.ndarray, str]] = []
    try:
        last = reader.count_frames() - 1
        for anchor in anchors:
            t_ref = float(anchor["t"])
            if anchor.get("sim_step") is not None:
                frame = min(frames, key=lambda f: abs(int(f["step"]) - int(anchor["sim_step"])))
            elif anchor.get("sim_t") is not None:
                frame = _nearest_frame(frames, float(anchor["sim_t"]))
            else:
                frame = _nearest_frame(frames, t_ref / clip_len * take_len)
            i = int(frame["i"])
            rgb = np.asarray(reader.get_data(min(i, last)))[..., :3].astype(np.uint8)
            seg = None
            if segs is not None and i < len(segs):
                seg = np.asarray(segs[i]).astype(np.int32)
            photo_path = ref_dir / anchor["file"] if not Path(anchor["file"]).is_absolute() else Path(anchor["file"])
            photo = C.load_photo(photo_path)
            fitted, _ = C.fit_photo(photo, w, h)
            objects: dict[str, dict] = {}
            pairs: dict[str, tuple] = {}
            found = photo_masks(photo, keys)
            masks = C.sim_masks(seg, names, [k.name for k in keys]) if seg is not None else {}
            for key in keys:
                pm = found[key.name]
                pm = C.fit_mask(pm, w, h) if pm is not None else None
                sm = masks.get(key.name)
                sm = C.fit_mask(sm, w, h) if sm is not None else None
                reading = C.compare_masks(pm, sm)
                objects[key.name] = reading
                pairs[key.name] = (pm, sm)
            rows.append(
                {
                    "t": t_ref,
                    "label": anchor.get("label", ""),
                    "file": str(photo_path),
                    "frame": i,
                    "sim_t": frame["t"],
                    "sim_step": frame["step"],
                    "objects": objects,
                }
            )
            label = f"{anchor.get('label') or ''} {t_ref:.1f}s / sim {float(frame['t']):.1f}s".strip()
            tiles.append(
                (
                    C.overlay(fitted, {k: (p, None) for k, (p, s) in pairs.items()}),
                    C.overlay(rgb, {k: (None, s) for k, (p, s) in pairs.items()}),
                    label,
                )
            )
    finally:
        reader.close()
    # what moved, in each
    motion: dict[str, dict] = {}
    lines: list[str] = []
    for key in keys:
        p_first, p_last = (
            rows[0]["objects"][key.name]["photo"],
            rows[-1]["objects"][key.name]["photo"],
        )
        s_first, s_last = (
            rows[0]["objects"][key.name]["sim"],
            rows[-1]["objects"][key.name]["sim"],
        )
        entry: dict[str, Any] = {}
        for side, a, b in (("photo", p_first, p_last), ("sim", s_first, s_last)):
            if a is None or b is None:
                entry[side] = None
                continue
            dx, dy = b["centre"][0] - a["centre"][0], b["centre"][1] - a["centre"][1]
            entry[side] = {
                "dx": round(dx, 1),
                "dy": round(dy, 1),
                "moved": bool(np.hypot(dx, dy) > MOVED_FRACTION * w),
            }
        motion[key.name] = entry
        p, s = entry["photo"], entry["sim"]
        if p is None or s is None:
            lines.append(f"{key.name}: not found at both ends in {'the photo' if p is None else 'the take'}")
        elif p["moved"] != s["moved"]:
            lines.append(
                f"{key.name}: {'moved' if p['moved'] else 'stayed'} in the clip but {'moved' if s['moved'] else 'stayed'} in the take"
            )
        else:
            lines.append(
                f"{key.name}: {'moved' if p['moved'] else 'stayed'} in both; clip ({p['dx']:+.0f}, {p['dy']:+.0f}) px, take ({s['dx']:+.0f}, {s['dy']:+.0f}) px"
            )
    ious = [o["iou"] or 0.0 for r in rows for o in r["objects"].values() if o["photo"] is not None]
    score = round(float(np.mean(ious)), 4) if ious else 0.0
    for r in rows:
        per = ", ".join(
            f"{n} IoU {o['iou']:.2f}" if o["iou"] is not None else f"{n} missing" for n, o in r["objects"].items()
        )
        lines.append(
            f"{r['label'] or 'anchor':<12} clip {r['t']:5.1f}s = take {r['sim_t']:5.1f}s (step {r['sim_step']}): {per}"
        )
    return {
        "take": name,
        "anchors": rows,
        "motion": motion,
        "score": score,
        "lines": lines,
        "tiles": tiles,
    }


def write_strip(base: Path, tiles: list[tuple[np.ndarray, np.ndarray, str]], tile_width: int = 426) -> str:
    """Two rows: the clip's anchors above, the take's matching frames below, each pair labelled."""
    from PIL import Image, ImageDraw

    if not tiles:
        return ""
    th = int(round(tiles[0][0].shape[0] * tile_width / tiles[0][0].shape[1]))
    sheet = Image.new("RGB", (tile_width * len(tiles), 2 * th + 18), (20, 20, 20))
    draw = ImageDraw.Draw(sheet)
    for i, (top, bottom, label) in enumerate(tiles):
        x = i * tile_width
        sheet.paste(Image.fromarray(top).resize((tile_width, th)), (x, 18))
        sheet.paste(Image.fromarray(bottom).resize((tile_width, th)), (x, 18 + th))
        draw.text((x + 4, 3), label, fill=(255, 255, 255))
    path = base.with_name(base.stem + "_strip.png")
    path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(path)
    return str(path)


# ------------------------------------------------------------------ the gate
def gate(
    server: Any,
    *,
    camera: str = "",
    keys: list[C.Key] | None = None,
    objects: list[str] | None = None,
    steps: int = 60,
    settle_mm: float = 2.0,
    penetration_mm: float = 1.0,
    timeline: dict | None = None,
) -> dict:
    """What a photograph cannot tell: the scene builds, stays finite, has its camera and its things, and holds still."""
    sim = server.sim
    keys = list(keys or [])
    wanted = list(objects or []) or [k.name for k in keys]
    checks: list[dict] = []

    def add(name: str, ok: bool, detail: str) -> None:
        checks.append({"name": name, "ok": bool(ok), "detail": detail})

    # only a build's own failure: a routine, a click or a take that failed leaves last_error but not this
    build_error = server.build_error
    add(
        "builds",
        not build_error,
        "the last rebuild landed" if not build_error else build_error.strip().splitlines()[-1],
    )
    finite = bool(sim.state_is_finite())
    add("finite", finite, "every number in the state is finite" if finite else "the state has gone nan")

    cameras = {c.name: c for c in sim.cameras}
    cam = cameras.get(camera) if camera else (next(iter(cameras.values())) if cameras else None)
    if cam is None:
        add(
            "camera",
            False,
            f"no camera {camera!r} declared; the scene has {sorted(cameras) or 'none'}",
        )
    else:
        detail = f"{cam.name} {cam.width}x{cam.height}, fov {cam.fov_y:.0f} deg"
        ok = True
        if timeline and timeline.get("width") and timeline.get("height"):
            clip_aspect = float(timeline["width"]) / float(timeline["height"])
            cam_aspect = float(cam.width) / float(cam.height)
            ok = abs(clip_aspect / cam_aspect - 1.0) <= 0.02
            detail += f"; clip {timeline['width']}x{timeline['height']}" + (
                "" if ok else f" -- aspect off by {100 * abs(clip_aspect / cam_aspect - 1):.0f}%"
            )
        add("camera", ok, detail)

    have = set(sim.names())
    missing = [n for n in wanted if n not in have]
    add(
        "objects",
        not missing,
        f"all of {', '.join(wanted)} are in the scene"
        if wanted and not missing
        else (f"missing: {', '.join(missing)}" if missing else "no names given to look for"),
    )

    # penetration, as the scene stands
    try:
        worst_mm, pairs = _penetration(sim)
    except Exception as e:  # a probe that cannot answer is a failed line, not a gate with no report
        add("penetration", False, f"the contact probe raised {type(e).__name__}: {e}")
    else:
        add(
            "penetration",
            worst_mm <= penetration_mm,
            f"worst overlap {worst_mm:.2f} mm" + (f" between {pairs[0]}" if pairs else ""),
        )

    # rest: leave the scene alone and see what drifts
    before = _positions(sim, wanted or list(have))
    sim.run(int(steps))
    sim.sync()
    after = _positions(sim, list(before))
    drift = {
        n: 1000.0 * float(np.linalg.norm(np.asarray(after[n]) - np.asarray(before[n]))) for n in before if n in after
    }
    worst = max(drift.items(), key=lambda kv: kv[1]) if drift else ("", 0.0)
    add(
        "rest",
        worst[1] <= settle_mm,
        f"nothing moved more than {worst[1]:.1f} mm in {steps} steps"
        if worst[1] <= settle_mm
        else f"{worst[0]} drifted {worst[1]:.1f} mm in {steps} steps left alone",
    )
    finite = bool(sim.state_is_finite())
    add("finite_after", finite, f"still finite after {steps} steps" if finite else f"went nan within {steps} steps")

    passed = all(c["ok"] for c in checks)
    report = "\n".join(f"{'PASS' if c['ok'] else 'FAIL'}  {c['name']:<12} {c['detail']}" for c in checks)
    return {
        "passed": passed,
        "checks": checks,
        "report": report,
        "drift_mm": {k: round(v, 2) for k, v in drift.items()},
    }


def _positions(sim: Any, names: list[str]) -> dict[str, list[float]]:
    out = {}
    for name in names:
        try:
            out[name] = [float(v) for v in sim[name].position]
        except Exception:
            continue
    return out


def _penetration(sim: Any) -> tuple[float, list[str]]:
    from robosimstudio.scene.snapshot import penetration_rows

    rows = penetration_rows(sim)
    if not rows:
        return 0.0, []
    worst = rows[0]
    return float(worst["depth_mm"]), [" and ".join(worst["between"])]
````

## robosimstudio_real2sim_agent/compare.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Numbers beside the picture: a still of the scene measured against the photograph it should match.

A side-by-side tells an agent the case looks "a bit small and off to the
left". This tells it the case is 0.74x the photograph's size and 48 px left
of where it should be, which is a number it can move by, and a number that
either went up or did not after the next save. The loop closes on a reading
rather than an impression -- the lesson of 4DCodeBench, where the agents that
score are the ones that render, compare and edit in rounds.

Two sides, one frame. The render comes with its own segmentation (the tiled
backend's ``seg`` channel, ids named by the scene's handles), so every thing in
the scene has an exact mask for free. The photograph has none, so each thing is
*keyed*: a colour name (``case=red``), a hex colour (``socket=#c0c0c0``), a seed
pixel in the photograph (``socket=@1210,410``: the patch of that colour around
that pixel), or a name restricted to a seed (``case=red@980,640``). Keying is
what the agent does instead of segmenting -- it has looked at the photograph
and knows the case is the red thing.

Per keyed thing: where it is in each picture, how big, the overlap. Without
keys, one global reading: how many of the render's edges land on an edge of
the photograph. Everything is plain numpy, scipy and PIL, because the page's
process is the one that renders and nothing heavier is installed with it.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np

__all__ = [
    "NAMED_COLOURS",
    "Key",
    "advice",
    "compare_masks",
    "fit_mask",
    "fit_photo",
    "load_photo",
    "mask_stats",
    "outline",
    "overlay",
    "parse_key",
    "photo_mask",
    "sim_masks",
]

NAMED_COLOURS: dict[str, dict[str, Any]] = {
    # hue windows on [0, 1); saturation and value windows on [0, 1]
    "red": {"hue": ((0.94, 1.0), (0.0, 0.045)), "sat": (0.30, 1.0), "val": (0.20, 1.0)},
    "orange": {"hue": ((0.045, 0.11),), "sat": (0.40, 1.0), "val": (0.30, 1.0)},
    "yellow": {"hue": ((0.11, 0.19),), "sat": (0.35, 1.0), "val": (0.40, 1.0)},
    "green": {"hue": ((0.19, 0.45),), "sat": (0.25, 1.0), "val": (0.15, 1.0)},
    "cyan": {"hue": ((0.45, 0.55),), "sat": (0.30, 1.0), "val": (0.20, 1.0)},
    "blue": {"hue": ((0.55, 0.72),), "sat": (0.30, 1.0), "val": (0.15, 1.0)},
    "purple": {"hue": ((0.72, 0.94),), "sat": (0.30, 1.0), "val": (0.15, 1.0)},
    "white": {"hue": (), "sat": (0.0, 0.18), "val": (0.80, 1.0)},
    "black": {"hue": (), "sat": (0.0, 1.0), "val": (0.0, 0.20)},
    "grey": {"hue": (), "sat": (0.0, 0.22), "val": (0.30, 0.85)},
    "wood": {"hue": ((0.04, 0.13),), "sat": (0.15, 0.55), "val": (0.45, 1.0)},
}
"""What a colour word means in HSV; ``grey`` is also ``chrome``, ``silver``, ``metal``, ``steel``."""
_ALIASES = {
    "chrome": "grey",
    "silver": "grey",
    "metal": "grey",
    "steel": "grey",
    "gray": "grey",
    "tan": "wood",
    "beige": "wood",
    "magenta": "purple",
    "violet": "purple",
}

_KEY = re.compile(r"^\s*([A-Za-z_][\w\-]*)\s*=\s*([^@~]*?)\s*(?:@\s*(\d+)\s*,\s*(\d+))?\s*(?:~\s*([0-9.]+))?\s*$")


@dataclass(frozen=True)
class Key:
    """One keyed thing: its name in the scene, and how to find it in the photograph."""

    name: str
    colour: str = ""
    """A colour word from :data:`NAMED_COLOURS`, or ``#rrggbb``, or empty when words or a seed stand in for it."""
    seed: tuple[int, int] | None = None
    """A pixel of the photograph the thing is at, ``(x, y)``."""
    tolerance: float = 0.0
    """For a hex colour or a seed: how far a pixel's colour may stray, 0..1 (0 takes the default)."""

    def describe(self) -> str:
        parts = [self.colour or "the colour at the seed"]
        if self.seed is not None:
            parts.append(f"around ({self.seed[0]}, {self.seed[1]})")
        return " ".join(parts)


def parse_key(text: str) -> Key:
    """``name=red``, ``name=#rrggbb~0.2``, ``name=@x,y``, ``name=red@x,y``.

    A colour word or a hex colour keys by colour; a seed pixel keys by the
    colour at that pixel of the photograph, the one you looked at.
    """
    m = _KEY.match(text)
    if m is None:
        raise ValueError(f"not a key: {text!r}; write name=red, name=#rrggbb, name=@x,y or name=red@x,y")
    name, how, sx, sy, tol = m.groups()
    how = how.strip().strip("'\"").strip()
    seed = (int(sx), int(sy)) if sx is not None else None
    lowered = _ALIASES.get(how.lower(), how.lower())
    if not how and seed is None:
        raise ValueError(f"{text!r}: a key needs a colour, a seed @x,y, or both")
    if how and not (lowered in NAMED_COLOURS or re.fullmatch(r"#[0-9a-f]{6}", lowered)):
        raise ValueError(
            f"{text!r}: no colour called {how!r}; one of {', '.join(NAMED_COLOURS)}, #rrggbb, or a pixel @x,y of the photo"
        )
    return Key(name=name, colour=lowered, seed=seed, tolerance=float(tol) if tol else 0.0)


# ------------------------------------------------------------------ masks
def _hsv(rgb: np.ndarray) -> np.ndarray:
    """RGB uint8 ``(H, W, 3)`` to HSV floats on [0, 1]."""
    x = rgb.astype(np.float32) / 255.0
    r, g, b = x[..., 0], x[..., 1], x[..., 2]
    hi, lo = x.max(axis=-1), x.min(axis=-1)
    delta = hi - lo
    sat = np.where(hi > 0, delta / np.maximum(hi, 1e-6), 0.0)
    hue = np.zeros_like(hi)
    nz = delta > 1e-6
    rr = np.where(nz & (hi == r), ((g - b) / np.maximum(delta, 1e-6)) % 6.0, 0.0)
    gg = np.where(nz & (hi == g) & (hi != r), (b - r) / np.maximum(delta, 1e-6) + 2.0, 0.0)
    bb = np.where(
        nz & (hi == b) & (hi != r) & (hi != g),
        (r - g) / np.maximum(delta, 1e-6) + 4.0,
        0.0,
    )
    hue = (rr + gg + bb) / 6.0
    return np.stack([hue % 1.0, sat, hi], axis=-1)


def _rule_mask(hsv: np.ndarray, rule: dict[str, Any]) -> np.ndarray:
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    ok = (s >= rule["sat"][0]) & (s <= rule["sat"][1]) & (v >= rule["val"][0]) & (v <= rule["val"][1])
    windows = rule.get("hue", ())
    if windows:
        in_hue = np.zeros_like(ok)
        for lo, hi in windows:
            in_hue |= (h >= lo) & (h < hi)
        ok &= in_hue
    return ok


def _rule_for_pixel(hsv_pixel: np.ndarray, tolerance: float) -> dict[str, Any]:
    """A rule like a named colour's, centred on one pixel: a hue window for a colourful pixel, a value window for a grey one."""
    h, s, v = (float(c) for c in hsv_pixel)
    tol = tolerance or 0.06
    if s >= 0.30:
        lo, hi = (h - tol) % 1.0, (h + tol) % 1.0
        hue = ((lo, hi),) if lo < hi else ((lo, 1.0), (0.0, hi))
        return {"hue": hue, "sat": (max(0.2, 0.5 * s), 1.0), "val": (0.12, 1.0)}
    band = tolerance or 0.18
    hue: tuple = ()
    if s >= 0.06:  # pale, but tinted: chrome reads bluish-white, a pale wood table warm
        lo, hi = (h - 0.12) % 1.0, (h + 0.12) % 1.0
        hue = ((lo, hi),) if lo < hi else ((lo, 1.0), (0.0, hi))
    return {
        "hue": hue,
        "sat": (0.0, min(0.3, s + 0.08)),
        "val": (max(0.0, v - band), min(1.0, v + band)),
    }


def _hex_rule(colour: str, tolerance: float) -> dict[str, Any]:
    rgb = np.array([int(colour[i : i + 2], 16) for i in (1, 3, 5)], dtype=np.uint8).reshape(1, 1, 3)
    return _rule_for_pixel(_hsv(rgb)[0, 0], tolerance)


def photo_mask(photo: np.ndarray, key: Key) -> np.ndarray:
    """The pixels of ``photo`` (RGB uint8) that are the keyed thing: one connected patch, specks removed."""
    from scipy import ndimage

    hsv = _hsv(photo)
    if key.colour in NAMED_COLOURS:
        rule = NAMED_COLOURS[key.colour]
    elif key.colour:
        rule = _hex_rule(key.colour, key.tolerance)
    else:
        x, y = key.seed  # type: ignore[misc]
        rule = _rule_for_pixel(hsv[min(y, hsv.shape[0] - 1), min(x, hsv.shape[1] - 1)], key.tolerance)
    raw = _rule_mask(hsv, rule)
    if not raw.any():
        return raw
    cleaned = ndimage.binary_opening(raw, iterations=1)
    if not cleaned.any():
        cleaned = raw
    labels, count = ndimage.label(cleaned)
    if count == 0:
        return cleaned
    if key.seed is not None:
        x, y = key.seed
        y, x = min(y, labels.shape[0] - 1), min(x, labels.shape[1] - 1)
        at = int(labels[y, x])
        if at == 0:
            # the seed missed the patch by a pixel or two: take the nearest labelled pixel within reach
            ys, xs = np.nonzero(labels)
            if len(ys) == 0:
                return cleaned
            d2 = (ys - y) ** 2 + (xs - x) ** 2
            i = int(np.argmin(d2))
            if d2[i] > 30**2:
                return np.zeros_like(cleaned)
            at = int(labels[ys[i], xs[i]])
        return labels == at
    sizes = ndimage.sum(cleaned, labels, index=np.arange(1, count + 1))
    return labels == (int(np.argmax(sizes)) + 1)


def sim_masks(seg: np.ndarray, names_by_id: dict[int, str], wanted: list[str]) -> dict[str, np.ndarray | None]:
    """``name -> mask`` off a segmentation render; ``None`` for a name the scene has no label for."""
    ids = {name: label for label, name in names_by_id.items()}
    return {name: (seg == ids[name]) if name in ids else None for name in wanted}


def mask_stats(mask: np.ndarray | None) -> dict[str, Any] | None:
    """Where a mask is and how big: bbox, centre, area as a fraction of the frame. ``None`` for nothing."""
    if mask is None or not mask.any():
        return None
    ys, xs = np.nonzero(mask)
    h, w = mask.shape
    return {
        "bbox": [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1],
        "centre": [round(float(xs.mean()), 1), round(float(ys.mean()), 1)],
        "width": int(xs.max() - xs.min() + 1),
        "height": int(ys.max() - ys.min() + 1),
        "area": round(float(mask.sum()) / float(h * w), 5),
        "pixels": int(mask.sum()),
    }


def compare_masks(photo: np.ndarray | None, sim: np.ndarray | None) -> dict[str, Any]:
    """The readings for one thing: both sides' stats, their overlap, and the sim's offset and size against the photo."""
    p, s = mask_stats(photo), mask_stats(sim)
    out: dict[str, Any] = {
        "photo": p,
        "sim": s,
        "iou": None,
        "offset_px": None,
        "size_ratio": None,
    }
    if p is None or s is None:
        return out
    inter = float(np.logical_and(photo, sim).sum())
    union = float(np.logical_or(photo, sim).sum())
    out["iou"] = round(inter / union, 4) if union else 0.0
    out["offset_px"] = [
        round(s["centre"][0] - p["centre"][0], 1),
        round(s["centre"][1] - p["centre"][1], 1),
    ]
    out["size_ratio"] = round(float(np.sqrt(s["pixels"] / max(p["pixels"], 1))), 3)
    out["width_ratio"] = round(s["width"] / max(p["width"], 1), 3)
    out["height_ratio"] = round(s["height"] / max(p["height"], 1), 3)
    return out


# ------------------------------------------------------------------ edges
def load_photo(photo_path: str | Path) -> np.ndarray:
    from PIL import Image

    return np.asarray(Image.open(photo_path).convert("RGB"), dtype=np.uint8)


def fit_photo(photo: np.ndarray, width: int, height: int) -> tuple[np.ndarray, float]:
    """The photograph at the render's size, and how far its aspect was stretched to get there (1.0 is none)."""
    from PIL import Image

    im = Image.fromarray(photo)
    stretch = (im.width / im.height) / (width / height)
    return np.asarray(im.resize((width, height), Image.BILINEAR), dtype=np.uint8), float(stretch)


def fit_mask(mask: np.ndarray, width: int, height: int) -> np.ndarray:
    """A mask keyed on the photograph at its own size, brought to the render's."""
    from PIL import Image

    if mask.shape == (height, width):
        return mask
    return np.asarray(Image.fromarray(mask.astype(np.uint8) * 255).resize((width, height), Image.NEAREST)) > 127


def outline(mask: np.ndarray, thickness: int = 2) -> np.ndarray:
    from scipy import ndimage

    return mask & ~ndimage.binary_erosion(mask, iterations=thickness)


PHOTO_COLOUR = (255, 220, 0)
SIM_COLOUR = (0, 230, 255)


def overlay(photo: np.ndarray, pairs: dict[str, tuple[np.ndarray | None, np.ndarray | None]]) -> np.ndarray:
    """The photograph with each keyed thing outlined: what the key found in it (yellow) and where the render has it (cyan)."""
    from PIL import Image, ImageDraw

    out = photo.copy()
    for p, s in pairs.values():
        if p is not None and p.any():
            out[outline(p)] = PHOTO_COLOUR
        if s is not None and s.any():
            out[outline(s)] = SIM_COLOUR
    im = Image.fromarray(out)
    draw = ImageDraw.Draw(im)
    for name, (p, s) in pairs.items():
        for mask, colour in ((p, PHOTO_COLOUR), (s, SIM_COLOUR)):
            stats = mask_stats(mask)
            if stats is None:
                continue
            x0, y0 = stats["bbox"][0], max(0, stats["bbox"][1] - 14)
            draw.text((x0 + 2, y0), name, fill=colour)
    return np.asarray(im, dtype=np.uint8)


def advice(name: str, reading: dict[str, Any], frame_width: int, key: Key | None = None) -> str:
    """One line an agent can act on."""
    p, s = reading.get("photo"), reading.get("sim")
    how = f" (keyed {key.describe()})" if key is not None else ""
    if p is None and s is None:
        return f"{name}: found in neither picture{how}"
    if p is None:
        return f"{name}: the key found nothing in the photograph{how}; try another colour, or a seed @x,y on it"
    if s is None:
        return f"{name}: not in the render; off frame, hidden, or no thing of that name in the scene"
    spilled = key is not None and key.seed is not None and p["area"] > 0.25
    dx, dy = reading["offset_px"]
    horiz = f"{abs(dx):.0f} px {'right' if dx > 0 else 'left'}" if abs(dx) >= 1 else "level"
    vert = f"{abs(dy):.0f} px {'low' if dy > 0 else 'high'}" if abs(dy) >= 1 else "level"
    pct = 100.0 * float(np.hypot(dx, dy)) / float(frame_width)
    return (
        f"{name}: sim is {reading['size_ratio']:.2f}x the photo's size "
        f"(w {reading['width_ratio']:.2f}x, h {reading['height_ratio']:.2f}x), "
        f"centre {horiz}, {vert} ({pct:.1f}% of the frame), IoU {reading['iou']:.2f}"
        + (f"; the key spilled over {100 * p['area']:.0f}% of the photograph, tighten it with ~0.1" if spilled else "")
    )


# ------------------------------------------------------------------ what an eye sees
def region_box(
    masks: list[np.ndarray | None],
    shape: tuple[int, int],
    pad: float = 0.3,
    floor: int = 48,
) -> tuple[int, int, int, int] | None:
    """The box round every given mask, padded by ``pad`` of its size and at least ``floor`` px: where to look closely."""
    present = [m for m in masks if m is not None and m.any()]
    if not present:
        return None
    ys, xs = np.nonzero(np.logical_or.reduce(present))
    x0, x1, y0, y1 = int(xs.min()), int(xs.max()) + 1, int(ys.min()), int(ys.max()) + 1
    px, py = max(floor, int(pad * (x1 - x0))), max(floor, int(pad * (y1 - y0)))
    h, w = shape
    return max(0, x0 - px), max(0, y0 - py), min(w, x1 + px), min(h, y1 + py)


def crop_pair(
    photo: np.ndarray,
    render: np.ndarray,
    pm: np.ndarray | None,
    sm: np.ndarray | None,
    *,
    height: int = 240,
) -> np.ndarray | None:
    """The thing in the photograph beside the thing in the render, cut from the same box so the scale is the same."""
    from PIL import Image

    box = region_box([pm, sm], photo.shape[:2])
    if box is None:
        return None
    x0, y0, x1, y1 = box
    left = photo[y0:y1, x0:x1].copy()
    right = render[y0:y1, x0:x1].copy()
    if pm is not None and pm.any():
        left[outline(pm)[y0:y1, x0:x1]] = PHOTO_COLOUR
    if sm is not None and sm.any():
        right[outline(sm)[y0:y1, x0:x1]] = SIM_COLOUR
    w = max(1, int(round((x1 - x0) * height / max(1, y1 - y0))))
    tiles = [np.asarray(Image.fromarray(t).resize((w, height), Image.BILINEAR)) for t in (left, right)]
    gap = np.full((height, 6, 3), 40, np.uint8)
    return np.concatenate([tiles[0], gap, tiles[1]], axis=1)


def without_things(image: np.ndarray, things: np.ndarray | None, grow: int = 10) -> np.ndarray:
    """The picture with the keyed things painted out, grown a little so their edges go too: what stands behind them."""
    from scipy import ndimage

    out = image.copy()
    if things is not None and things.any():
        out[ndimage.binary_dilation(things, iterations=grow)] = 40
    return out


def look_sheet(
    photo: np.ndarray,
    render: np.ndarray,
    rows: list[tuple[str, np.ndarray]],
    *,
    width: int = 1280,
) -> np.ndarray:
    """One picture to reason about: the pair on top, then every captioned row (each thing up close, the background)."""
    from PIL import Image

    h = int(round(photo.shape[0] * (width // 2) / photo.shape[1]))
    top = np.concatenate(
        [np.asarray(Image.fromarray(t).resize((width // 2, h), Image.BILINEAR)) for t in (photo, render)],
        axis=1,
    )
    blocks: list[np.ndarray] = [_caption("photo  |  render", width), top]
    for caption, given in rows:
        if given is None:
            continue
        tile = given
        if tile.shape[1] > width:
            tile = np.asarray(
                Image.fromarray(tile).resize(
                    (width, int(round(tile.shape[0] * width / tile.shape[1]))),
                    Image.BILINEAR,
                )
            )
        padded = np.full((tile.shape[0], width, 3), 24, np.uint8)
        padded[:, : tile.shape[1]] = tile
        blocks += [_caption(caption, width), padded]
    sheet = np.concatenate(blocks, axis=0)
    return sheet


def _caption(text: str, width: int, height: int = 22) -> np.ndarray:
    from PIL import Image, ImageDraw

    im = Image.new("RGB", (width, height), (24, 24, 24))
    ImageDraw.Draw(im).text((6, 4), text, fill=(235, 235, 235))
    return np.asarray(im, dtype=np.uint8)
````

## robosimstudio_policy_agent/connector.py

````text
# SPDX-License-Identifier: Apache-2.0
"""``ConnectorNewton``: the pinned GaP runtime, over a toolkit-layer environment.

The runtime is **reused as a library**, not reimplemented. Its ``Connector``
base already ships the full ``robot.*`` tool registry -- move to joints, go to
pose, open and close the gripper, execute a trajectory, with the convergence
stepping and settle counts that make those behave like real motions -- and an IK
seam to hang a backend off. Reimplementing that would mean a second
implementation of the semantics real evaluations run on, which is the one thing
worth *not* having two of.

So this composes rather than rewrites::

    ConnectorNewton = Connector(GapEnvFacade(env, bus), config, ik=IKBackend)
                      + register_robot_tools(...)      # always
                      + register_geometry_tools(...)   # always
                      + register_sim_tools(...)        # privileged only
                      + whatever task tools the suite contributes, filtered the
                        same way (see NonPrivilegedRegistry)

If the runtime is not installed, importing this module raises with the extra to
install. A ~400-line minimal executor is the documented contingency, not a
silent fallback: a graph that runs against a stand-in and not against the real
runtime has been tested against the stand-in.
"""

from __future__ import annotations

import logging
import math
from dataclasses import dataclass
from typing import Any

import numpy as np

from robosimstudio.arms import arm_name as _arm_name
from robosimstudio.core.bus import Bus, SimBus
from robosimstudio.solvers.ik.solver import POS_TOLERANCE as _SERVO_POS_TOLERANCE
from robosimstudio.solvers.ik.solver import ROT_TOLERANCE_DEG as _SERVO_ROT_TOLERANCE_DEG
from robosimstudio_bench.envs.env import Env

from .facade import EnvFacade, GapEnvFacade
from .geometry_tools import register_geometry_tools
from .grasp_tools import register_grasp_tools
from .ik import IKBackend
from .motion_tools import register_motion_tools
from .perception_tools import register_perception_tools
from .robot_tools import register_robot_tools
from .sim_tools import register_sim_tools

_SERVO_ROT_TOLERANCE = math.radians(_SERVO_ROT_TOLERANCE_DEG)

_log = logging.getLogger(__name__)

__all__ = ["ConnectorNewton", "NewtonEnvConfig", "NonPrivilegedRegistry", "make_connector"]


def _routed_servo_move(move) -> dict:
    """Run one blocking servo motion and hand back an outcome dict, never a raise for an unreachable pose.

    A pose the solver cannot reach comes back as ``{"outcome": "unreachable"}``,
    a refusal the graph can route on. Raised, it went to the workflow's
    ``abort`` recovery, whose first act on every shipped graph is to open the
    gripper -- which dropped the tool at the pick site in three study cells and
    read, downstream, as "the grasp failed". Every servo-backed pose verb goes
    through here so they all answer the same way: ``reached`` plus the servo's
    own ``outcome`` (``reached``, ``timeout``, ``contact``, ``unreachable``).
    """
    try:
        result = move()
    except RuntimeError as exc:
        if "unreachable" not in str(exc):
            raise
        return {"reached": False, "outcome": "unreachable", "reason": str(exc)}
    result = dict(result or {})
    result["reached"] = result.get("outcome") == "reached"
    return result


MOTION_PLANNERS: dict[str, str] = {
    "curobo": "robosimstudio_policy_agent.planners.curobo.MotionBackendCuRobo",
}
"""Motion-planner alias -> dotted path.

A *peer* of the IK backend rather than a replacement: ``solve_ik`` stays on the
cheap solver because the servo calls it up to 400 times a move, and only plans go
to the planner. ``""``/``"plan"``/``"osc"`` name no planner at all -- they choose
whether a servo is built -- which is why they are not entries here.
"""

SERVO_MODES: tuple[str, ...] = ("", "osc")
"""Motion modes that build a :class:`CartesianServo` on their own.

``"plan"`` deliberately does not. A *planner* mode does, though it is not listed
here: a planner answers ``plan_to_pose`` and the servo still answers the linear
moves the graph asks for between plans, so naming one is a request for both."""


def _resolve(path: str) -> Any:
    """Import a dotted path and return what it names: ``module:Name`` or ``module.Name``."""
    from robosimstudio_bench.taskbuild.artifacts import resolve_dotted

    return resolve_dotted(path)


def _accepted(cls: Any, candidates: dict[str, Any]) -> dict[str, Any]:
    """Whichever of ``candidates`` this constructor actually declares.

    A planner registered from outside cannot be expected to take cuRobo's
    ``config_path``/``urdf_path``/``lock_joints``/``time_scale``, nor PyRoKi's
    ``ik``, and handing them over would make an unrelated ``TypeError`` look like
    an unavailable planner. Asked of the signature, so a backend states its own
    needs -- which is also how one planner can want the cheap IK member and
    another want nothing but a URDF.
    """
    import inspect

    params = inspect.signature(cls).parameters
    return {k: v for k, v in candidates.items() if k in params}


def _finger_lock(env: Env) -> dict[str, float]:
    """Where the *scene* holds the work arm's fingers, for cuRobo to lock them.

    Not a nominal open. cuRobo plans with the gripper frozen, and freezing it
    somewhere the scene does not hold it moves the fingertip spheres: the Panda
    reads tens of millimetres of phantom disagreement when its finger is locked
    at 40 mm while the scene holds it at 5.6. The URDF's mimic joint means one
    number drives both fingers, so only the first is named -- by the robot
    (:attr:`~robosimstudio.specs.EmbodimentSpec.curobo_lock_joint`): a planner
    model that ends at the wrist, as the YAM's does, names none, and a joint
    injected there failed every first planner call whether or not a motion
    tool was ever asked for.
    """
    joint = str(getattr(getattr(env.scene.embodiment, "spec", None), "curobo_lock_joint", "") or "")
    if not joint:
        return {}
    name = env.handles.work_arm or next(iter(env.handles.arms), "")
    arm = env.handles.arms.get(name) if name else None
    coords = getattr(arm, "gripper_coords", ()) if arm is not None else ()
    if not coords:
        return {}
    import numpy as np

    return {joint: float(np.asarray(env.state.joint_q.numpy())[coords[0]])}


class NonPrivilegedRegistry:
    """A registry that drops privileged registrations instead of making them.

    ``register_sim_tools`` is called under ``if privileged``, but a suite's own
    registrar is not -- and a suite's tools are *more* privileged than the
    generic set, not less: ground-truth stage plans, particle counts, the
    evaluator's own metrics. So ``--no-privileged`` withheld
    ``sim.get_object_pose`` while handing the same graph ``sim.plan_fold``,
    which is the whole boundary defeated by the one tool that mattered.

    Fixing it here rather than in six ``tools.py`` files is deliberate. A suite
    registrar is content, written once per task and rarely reread; a rule that
    every one of them has to remember is a rule the seventh one breaks. This is
    the same argument :mod:`~robosimstudio_policy_agent.contract` makes for an
    allowlist over a convention, and it wants the same answer.

    **What counts as privileged**, either is enough:

    * a ``sim.`` name -- the prefix *is* the boundary, stated in
      :mod:`~robosimstudio_policy_agent.sim_tools`, and every one of the 26
      suite tools shipped today is one;
    * a ``privileged`` tag -- so a suite that reaches for ground truth under
      some other name is still caught.

    Dropped rather than refused, because the point of ``--no-privileged`` is to
    *run* the graph without those tools and see what it does. A node that calls
    one then fails on an unknown name, which is exactly what it does for the
    generic set today.
    """

    def __init__(self, registry: Any) -> None:
        self._registry = registry
        self.dropped: list[str] = []
        """Names withheld, in registration order. Read by the contract test."""

    def _withheld(self, name: str, tags: Any) -> bool:
        if str(name).startswith("sim.") or "privileged" in tuple(tags or ()):
            self.dropped.append(str(name))
            return True
        return False

    def register_callable(self, name: str, fn: Any, **kwargs: Any) -> Any:
        if self._withheld(name, kwargs.get("tags")):
            return None
        return self._registry.register_callable(name, fn, **kwargs)

    def register_rpc(self, name: str, client: Any, **kwargs: Any) -> Any:
        if self._withheld(name, kwargs.get("tags")):
            return None
        return self._registry.register_rpc(name, client, **kwargs)

    def __contains__(self, name: object) -> bool:
        # Dunder lookups skip __getattr__, so ``in`` has to be spelled out.
        return name in self._registry

    def __len__(self) -> int:
        return len(self._registry)

    _READERS = frozenset({"get", "invoke", "runtime_tools", "codegen_tools", "by_transport"})
    """The read-only part of the registry a suite registrar may reach through.

    An allowlist, not a denylist of registrar names: the registry has more
    doors than ``register*`` -- ``_discover_python``, the adapters' own
    ``register``, the ``_tools`` dict itself -- and a door this class does
    not know is a door it cannot check, so it is not forwarded at all."""

    def __getattr__(self, attr: str) -> Any:
        if attr not in NonPrivilegedRegistry._READERS:
            raise AttributeError(f"{attr!r} is not available to a registrar under --no-privileged")
        return getattr(self._registry, attr)


@dataclass
class NewtonEnvConfig:
    """The duck-typed config the runtime's ``Connector`` reads.

    Its fields are the runtime's, not this package's; they are filled from the
    task and the embodiment so a suite never states them twice.
    """

    arm_dof: int = 7
    num_arms: int = 1
    action_mode: str = "absolute_joints"
    control_freq: float = 50.0
    home_joints: list[float] | None = None
    tcp_offset: tuple[float, float, float] = (0.0, 0.0, 0.0)
    tcp_rotation_z: float | None = None
    arm_bases: tuple = ()
    robot_urdf_path: str | None = None
    default_cameras: tuple[str, ...] = ()
    is_real: bool = False

    @classmethod
    def from_env(cls, env: Env) -> NewtonEnvConfig:
        embodiment = env.scene.embodiment
        handles = env.handles
        arms = list(handles.arms.values())
        # The *work* arm, not the first one. The two YAM cells list their arms
        # in opposite orders, so an index here hands the runtime the idle hand's
        # TCP offset and home posture -- which is a plausible-looking config that
        # aims every commanded grasp at the wrong end of the robot.
        name = handles.work_arm if handles.work_arm in handles.arms else next(iter(handles.arms), "")
        first = handles.arms.get(name) or (arms[0] if arms else None)
        home: list[float] = []
        if embodiment is not None and embodiment.spec.arms:
            spec = next((a for a in embodiment.spec.arms if a.name == name), embodiment.spec.arms[0])
            home = [float(v) for v in spec.home_q]
        return cls(
            arm_dof=len(first.arm_coords) if first else 7,
            num_arms=max(1, len(arms)),
            control_freq=env.task.physics.control_hz,
            home_joints=home or None,
            tcp_offset=first.ee_offset if first else (0.0, 0.0, 0.0),
            default_cameras=tuple(c.name for c in env.cameras),
        )


def _connector_base():
    """The pinned runtime's ``Connector``, or a message saying how to get it.

    The message distinguishes the two ways this fails, because they need
    different fixes and the generic one sent a reader looking in the wrong
    place. ``gap.runtime`` imports on gap_core + numpy + stdlib, so the runtime
    being *present* proves nothing about the connector: importing
    ``gap.connector.core`` runs ``gap/connector/__init__.py``, which pulls
    ``collector.py -> h5py`` and the runtime's pydantic models. Reporting that
    as "the runtime is not installed" is how you end up re-cloning a checkout
    that was never missing.
    """
    try:
        from gap.connector.core import Connector
    except ImportError as exc:  # pragma: no cover -- depends on the [gap] extra
        missing = getattr(exc, "name", "") or ""
        if missing.split(".")[0] not in ("gap", "gap_core", ""):
            raise ImportError(
                f"the graph-as-policy runtime is installed but {missing!r} is not, and "
                f"gap.connector.core needs it. The [gap] extra declares the runtime's own "
                f"dependencies (h5py, pydantic) for exactly this reason: install it with "
                f"'uv sync --extra gap', or put {missing!r} on PYTHONPATH."
            ) from exc
        raise ImportError(
            "the graph-as-policy runtime is not installed. Install the [gap] extra "
            "(uv sync --extra gap, or uv run --extra gap <script>), which pins gap and gap-core."
        ) from exc
    return Connector


class _ProprioceptiveFeedback:
    """Motion feedback reads encoders and FK; only an explicit observation renders.

    ``Connector.get_ee_pose`` / ``get_gripper_fraction`` / ``_current_joints``
    upstream each call ``get_observation``, and a trajectory asks for one per
    waypoint. On an RTX rig that path traces every camera in the scene to read a
    joint angle. These three read
    :meth:`~robosimstudio_policy_agent.facade.GapEnvFacade.get_proprioception` instead --
    the same encoders and FK, no render -- and a facade that does not offer one
    keeps the upstream behaviour.

    Prepended to ``ConnectorNewton``'s bases so it wins the lookup; it defines no
    ``_tool_get_gripper``, so the override below still reaches the base's through
    ``super()``.
    """

    def _robot_feedback(self):
        # Through ``self.facade``, which is what this attribute actually holds:
        # ``make_connector`` constructs ``ConnectorNewton(facade, ...)`` and gap's
        # Connector stores that as ``self.env``. Naming it ``facade`` here keeps
        # the fleet's world-view contract honest -- a WorldView answers neither
        # of these, and it never has to, because the object in hand is a facade.
        facade = getattr(self, "facade", None) or self.env
        reader = getattr(facade, "get_proprioception", None)
        # A facade without the narrower reader -- the fleet's WorldFacade -- keeps
        # the upstream behaviour rather than losing the feedback entirely.
        return reader() if reader is not None else facade.get_observation()

    def get_ee_pose(self, arm_id: int = 0):
        import numpy as np
        from gap_core.types import make_pose

        obs = self._robot_feedback()
        cart = np.asarray(obs.get(f"robot_cartesian_pos_{arm_id}", np.zeros(8)))
        position = self._base_frame_to_world(cart[:3].copy(), arm_id)
        rotation = cart[3:7] if len(cart) >= 7 else np.array([1.0, 0.0, 0.0, 0.0])
        return make_pose(position, rotation)

    def get_gripper_fraction(self, arm_id: int = 0) -> float:
        import numpy as np

        obs = self._robot_feedback()
        joints = np.asarray(obs.get(f"robot_joint_pos_{arm_id}", np.zeros(self._arm_dof + 1)))
        return float(joints[self._arm_dof]) if len(joints) > self._arm_dof else self._gripper_fraction

    def _current_joints(self, arm_id: int):
        import numpy as np

        if self.env is None:
            return None
        joints = self._robot_feedback().get(f"robot_joint_pos_{arm_id}")
        return None if joints is None else list(np.asarray(joints[: self._arm_dof], dtype=np.float64))


def make_connector(
    env: Env,
    *,
    bus: Bus | None = None,
    config: NewtonEnvConfig | None = None,
    privileged: bool = True,
    task_tools: Any = None,
    suite_tools: bool = True,
    roll: str = "auto",
    motion: str = "",
    facade: EnvFacade | None = None,
    ik: Any = None,
    servo: Any = None,
    capture_spans: Any = None,
    skills: Any = None,
) -> Any:
    """Build a connector for one environment.

    Args:
        env: The environment a graph will drive.
        skills: The registry roots the run executes with, as
            :func:`~robosimstudio_policy_agent.skills.pinned_registries` resolves them.
            Read by the in-process stand-ins for ``geometry.*`` and ``sam3.*``,
            which stand down when a registry in *this* list ships the real
            bundle -- the same list ``gap.execute`` is handed, so the decision
            and the run cannot disagree. ``None`` lets each stand-in resolve
            gap's registries for itself.
        bus: The bus mediating worker access. One is created if omitted.
        config: Overrides the config derived from the task.
        privileged: Register the ground-truth ``sim.*`` tools. The in-process
            mode's whole purpose; the remote bridge never sets it. False also
            filters the suite's own registrar -- see
            :class:`NonPrivilegedRegistry` for why that is not a separate switch.
        task_tools: ``(registry, env, bus) -> None``, for a suite's own tools.
            Handed a :class:`NonPrivilegedRegistry` when *privileged* is False,
            so a suite cannot hand a graph ground truth the generic set is
            withholding.
        suite_tools: Register the suite's own tools at all. False withholds
            them *while keeping the generic privileged set* -- the tier the
            generic oracle is an experimental treatment and a suite's scripted
            plan is not. The generic ``sim.*`` set is the same catalogue on
            every task (a pose, a bound, an OBB, a relation); a suite's own
            are written for one task and routinely hand over the answer:
            ``sim.plan_pick``/``sim.plan_place`` are the tool_hanging routine's
            own stations, ``sim.plan_insert`` the usbc schedule,
            ``sim.get_tab`` the peel's free end. A policy measured with those
            in reach is measuring the routine, not the policy.
        facade: The env surface the runtime drives, if one is already built. A
            batched run supplies one bound to a single world; omitted, the
            single-world facade over ``env`` is constructed here.
        ik: The IK backend, if one is already built.
        servo: The Cartesian move executor, if one is already built. Supplying it
            bypasses the ``motion`` argument entirely.

            These three exist so a batched run reuses *this* connector subclass
            rather than a second copy of it. Everything below -- the ``arm_id``
            forwarding the runtime drops, the servo overrides on both pose verbs,
            the selective ``go_home`` -- is behaviour a graph depends on, and two
            implementations of it would be two benchmarks.
        capture_spans: A :class:`~robosimstudio.record.capture.ToolSpanRecorder`,
            or ``None`` for no tape. Given one, every ``sim_step``-tagged call is
            wrapped so its span carries the request, the result and the exact
            step boundaries; ``begin`` returns ``None`` for anything else, so a
            read costs nothing.
        motion: ``"osc"`` (default) replaces both pose verbs with the reference
            benchmark's behaviour: a feedback servo that re-measures the end
            effector every control step and advances a setpoint toward the goal
            under ``OSC_POSE``'s own law, so the arm moves at a bounded Cartesian
            speed and tapers into the target instead of lunging at it. See
            :mod:`~robosimstudio_policy_agent.servo`. It is the default because a
            graph and a scripted routine that move differently are not two
            baselines on one benchmark, they are two benchmarks -- and the
            reference's motion is the one the tasks were authored against.

            ``"plan"`` keeps the runtime's own: one IK solve, then a joint-space
            move, which on a stiff position servo is a step input and moves fast
            and loose. Faster in wall clock and worth having for a graph being
            debugged for its *logic*, where how the arm gets there is noise.

            Either mode works with either IK backend. The servo tests arrival on
            whatever its backend actually solves -- an approach axis for the
            default DLS solver, the full rotation for pyroki -- so pairing is a
            question of whether a goal needs wrist-roll authority, not of which
            motion is selected.

    Returns:
        A ``ConnectorNewton``, which is the runtime's ``Connector`` over this
        environment.
    """
    base = _connector_base()
    bus = bus or SimBus()
    config = config or NewtonEnvConfig.from_env(env)
    facade = facade if facade is not None else GapEnvFacade(env, bus)
    # Published on the bus so a SUITE tool can reach it. The task-tool hook is
    # ``(registry, env, bus)``, which is enough for anything that reads state or
    # commands one arm -- and not enough for a tool that must drive two arms on
    # the same control period, because only the facade owns that write. The
    # cable weave needs exactly that (see ``cable.carry_with_feed``), and
    # widening the hook's signature would touch every suite registrar to serve
    # one of them.
    bus.facade = facade
    if ik is None:
        # The roll contract is the run's knob; the solver is the arm's, and the
        # backend falls back, saying so, where PyRoKi cannot serve it.
        ik = IKBackend(env, bus, roll=roll)
    planner_path = MOTION_PLANNERS.get(motion) or (motion if "." in motion else "")
    if not planner_path and motion not in (*SERVO_MODES, "plan"):
        raise ValueError(
            f"unknown motion {motion!r}: neither a servo mode ({[*SERVO_MODES, 'plan']}) nor a "
            f"registered planner ({list(MOTION_PLANNERS)}) nor a dotted path"
        )
    if planner_path:
        # A *peer* of the IK backend, not a replacement for it. `solve_ik` stays
        # on the cheap solver because CartesianServo calls it up to 400 times a
        # move; only the plans go to the planner. `ik.honours_roll` keeps
        # following the IK solver; describe_planner reports the planner's.
        from robosimstudio.paths import resolve_path

        spec = getattr(env.scene.embodiment, "spec", None)
        urdf = str(getattr(spec, "curobo_urdf", "") or "")
        # A config naming a directory is this checkout's, and only an absolute
        # path finds it; a bare filename is the planner's own -- cuRobo ships
        # `franka.yml` and resolves it against its content directory, which a
        # `resolve_path` here would turn into a file that does not exist.
        planner_config = str(getattr(spec, "curobo_config", "") or "")
        if planner_config and "/" in planner_config:
            planner_config = str(resolve_path(planner_config))
        planner_cls = _resolve(planner_path)
        try:
            planner = planner_cls(
                env,
                bus,
                **_accepted(
                    planner_cls,
                    {
                        "config_path": planner_config,
                        "urdf_path": str(resolve_path(urdf)) if urdf else "",
                        "lock_joints": _finger_lock(env),
                        "time_scale": float(getattr(spec, "curobo_time_scale", 1.0) or 1.0),
                        "ik": ik,
                    },
                ),
            )
            ik.planner = planner
        except NotImplementedError as exc:
            # Most embodiments have no planner model yet, and that is a routine
            # state rather than a broken install -- so it names the robot and
            # falls back, the same way the IK branch above does. Caught as
            # ``NotImplementedError`` rather than ``MotionUnavailable`` because a
            # planner named by dotted path cannot be expected to raise cuRobo's
            # private exception, and this layer must not import it to find out.
            print(f"[gap] {exc}; planning with {type(ik).__name__} instead")
    if servo is None and (motion in SERVO_MODES or planner_path):
        from .servo import CartesianServo

        servo = CartesianServo(env, facade, ik)

    class ConnectorNewton(_ProprioceptiveFeedback, base):  # type: ignore[valid-type, misc]
        """The runtime's connector, with Newton IK and optional ground truth."""

        @property
        def tool_registry(self):
            """The normal registry with an RSS-owned lifecycle observer."""
            if self._tool_registry is None:
                from gap_core.tools import ToolRegistry

                observer = capture_spans

                class ObservedToolRegistry(ToolRegistry):
                    def invoke(self, name, ctx=None, **kwargs):
                        descriptor = self.get(name)
                        token = observer.begin(name, descriptor.tags, ctx, kwargs)
                        try:
                            result = super().invoke(name, ctx, **kwargs)
                        except BaseException as exc:
                            observer.end(token, error=exc)
                            raise
                        observer.end(token, result=result)
                        return result

                # Wrapped only when there is a tape to write: an unrecorded run
                # gets the registry itself, not a subclass testing ``is None``
                # on every call.
                registry = ObservedToolRegistry() if observer is not None else ToolRegistry()
                self._register_robot_tools(registry)
                self._register_extra_tools(registry)
                self._tool_registry = registry
            return self._tool_registry

        def _register_extra_tools(self, registry) -> None:
            # Before the privileged branch, and unconditionally. A hand's own
            # geometry is proprioception -- a real driver knows its stroke and
            # its tool-centre point -- so a graph rewritten against these still
            # runs under --no-privileged and could still cross the bridge.
            # Registering them inside the branch would make every portable graph
            # privileged-only, which is the opposite of the point.
            register_robot_tools(registry, env, bus, ik=ik, facade=facade)
            # Unconditional for the same reason, and a stronger one: a geometry
            # tool is a pure function of the box it is handed, so there is
            # nothing in it to privilege. The grocery `gap` graph fits its box
            # from SAM3 masks and then calls straight into these.
            register_geometry_tools(registry, registries=skills)
            register_perception_tools(registry, registries=skills, bus=bus)
            # Unconditional. Registered here rather than under `privileged` for
            # the reason above: a plan is a question about the robot and a world
            # the caller supplies, so nothing in it is ground truth, and forcing
            # a planning graph to be privileged-only would make it unportable
            # for a reason having nothing to do with what it knows. Which of
            # motion.* actually appears depends on the backend -- free-space
            # planning needs a planner model, a straight line and a joint ease
            # need only IK.
            register_motion_tools(registry, ik)
            if servo is not None:
                registry.register_callable(
                    "robot.move_cartesian_until_contact",
                    self.move_cartesian_until_contact,
                    summary=(
                        "Move straight toward a pose and stop when the pose is reached or "
                        "proprioceptive progress indicates contact."
                    ),
                    tags=("sim_step",),
                )
            if privileged:
                register_sim_tools(registry, env, bus)
                # Privileged because it reads a live pose by name, not because
                # it reads the mesh: knowing a part's shape is a CAD model, and
                # a real cell has those for what it was built to handle.
                register_grasp_tools(registry, env, bus)
            if task_tools is not None and suite_tools:
                # Filtered under --no-privileged, for the reason
                # NonPrivilegedRegistry gives: a suite's own sim.* tools are
                # more privileged than the generic set, so withholding one and
                # not the other withheld nothing. Not registered at all under
                # --no-suite-tools, for the sharper half of the same reason:
                # the generic set is uniform across tasks, a suite's own is
                # this task's solution whatever its name or tags, and a study
                # of what a policy can learn has to withhold the second while
                # keeping the first.
                target = registry if privileged else NonPrivilegedRegistry(registry)
                task_tools(target, env, bus)
            # A skills checkout's geometry bundle exports names this connector
            # already serves in-process -- geometry_tools.py is that bundle's
            # stated stand-in -- and the pinned gap raises on the collision at
            # bundle boot, where newer gap builds let the first registration
            # stand. First wins here too: an RPC name an in-process tool
            # already claims is skipped, not fatal.
            first_registration = registry.register_rpc

            def _register_rpc_first_wins(name, *a, **k):
                try:
                    return first_registration(name, *a, **k)
                except ValueError as exc:
                    if "already registered" not in str(exc):
                        raise
                    return None

            registry.register_rpc = _register_rpc_first_wins

        def go_to_pose(
            self, pose, tolerance=0.0, max_steps=0, tcp_offset=None, arm_id=0, z_approach=0.0, nonblocking=False
        ):
            # The servo path replaces solve-once-then-lunge with the reference's
            # feedback loop. Nonblocking keeps the runtime's own semantics --
            # a servo is a loop, and "publish once and return" is not one.
            if servo is None or nonblocking:
                return super().go_to_pose(
                    pose,
                    tolerance=tolerance,
                    max_steps=max_steps,
                    tcp_offset=tcp_offset,
                    arm_id=arm_id,
                    z_approach=z_approach,
                    nonblocking=nonblocking,
                )

            # Unreachable comes back routed, not raised: see _routed_servo_move.
            def _move():
                if z_approach and z_approach > 0.0:
                    above = {"position": dict(pose["position"]), "rotation": dict(pose["rotation"])}
                    above["position"] = dict(above["position"])
                    above["position"]["z"] = float(above["position"]["z"]) + float(z_approach)
                    approach = servo.move(above, arm_id=arm_id)
                    # A pre-approach that timed out or touched something has not
                    # earned the descent: report it rather than go on down.
                    if (approach or {}).get("outcome", "reached") != "reached":
                        return {**approach, "phase": "approach"}
                # The runtime's own ``tolerance`` reaches the servo: 0 keeps its default ball.
                return servo.move(
                    pose,
                    arm_id=arm_id,
                    max_steps=max_steps or 0,
                    pos_tolerance=float(tolerance) if tolerance else None,
                )

            return _routed_servo_move(_move)

        def _tool_solve_ik(self, pose, tcp_offset=None, arm_id=0):
            """The runtime's solve, plus the numbers the verdict hides.

            The backend accepts a solve within its own 30 mm gate; the servo
            arrives within 4 mm. A graph that gated reachability on the
            ``success`` this used to return alone learned nothing about the
            26 mm between the two -- measured on one study cell, every
            reachability gate the improver wrote was blind to poses that
            ``plan_linear`` then called 160 mm out of reach. ``success`` keeps
            its meaning (a solution came back); ``position_error_m``,
            ``rotation_error_rad`` and ``within_servo_tolerance`` say how good.
            """
            out = super()._tool_solve_ik(pose, tcp_offset=tcp_offset, arm_id=arm_id)
            measured = getattr(ik, "last_solve_error", None)
            if measured is not None:
                pos_err, rot_err = measured
                out["position_error_m"] = float(pos_err)
                out["rotation_error_rad"] = None if rot_err is None else float(rot_err)
                out["within_servo_tolerance"] = bool(
                    pos_err <= _SERVO_POS_TOLERANCE and (rot_err is None or rot_err <= _SERVO_ROT_TOLERANCE)
                )
            return out

        def go_to_pose_cartesian(self, pose, arm_id=0, speed_scale=1.0):
            # The reference has no separate straight-line executor either: its
            # per-step clipped feedback *is* the line, near enough that the
            # held object never dips. Same here.
            #
            # ``speed_scale`` is checked HERE and refused as a routed result,
            # not left to the ValueError the servo raises for a direct caller.
            # A raise from inside a blocking motion primitive reaches the
            # workflow's ``abort`` recovery, whose first act on every shipped
            # graph is to open the gripper -- so a typo in a graph literal would
            # drop the held tool at the pick site and read, downstream, as "the
            # grasp failed". Same reasoning as the unreachable-pose refusal
            # above.
            try:
                scale = float(speed_scale)
            except (TypeError, ValueError):
                scale = float("nan")
            if not 0.0 < scale <= 1.0:
                return {
                    "reached": False,
                    "outcome": "bad_speed_scale",
                    "reason": f"speed_scale must be in (0, 1], got {speed_scale!r}",
                }
            if servo is None:
                return super().go_to_pose_cartesian(pose, arm_id=arm_id)
            return _routed_servo_move(lambda: servo.move(pose, arm_id=arm_id, speed_scale=scale))

        def move_cartesian_until_contact(
            self,
            pose,
            arm_id=0,
            max_steps=300,
            stall_steps=30,
            stall_epsilon=0.0002,
        ):
            """Straight contact transition using only commanded/observed motion.

            ``max_steps`` and ``stall_steps`` are CONTROL steps (1/60 s on every
            shipped scene): a 5 s budget and a 0.5 s no-progress window. They
            were 120 and 12 when a servo "step" was one loop turn, and a turn
            spanned however many simulator steps the free-running simulator took
            during the turn's solve and bus round-trip -- 2.3 on an idle GPU,
            3.0 at three processes per GPU -- so the graphs were written and
            measured against windows two to three times longer than the numbers
            said. The servo now counts every simulator step; the numbers state
            the durations the graphs always relied on.

            No fixture identity, object identity, force oracle, or simulator
            contact state is used, so the primitive transfers to real robot
            connectors that provide Cartesian feedback.
            """
            if servo is None:
                raise RuntimeError("contact-aware Cartesian motion requires feedback servo support")
            return _routed_servo_move(
                lambda: servo.move(
                    pose,
                    arm_id=int(arm_id),
                    max_steps=int(max_steps),
                    stop_on_stall=True,
                    stall_steps=int(stall_steps),
                    stall_epsilon=float(stall_epsilon),
                )
            )

        # ------------------------------------------------- the arm_id that was lost
        #
        # Three of the runtime's motion tools take no ``arm_id``, and the reason
        # this is worth overriding rather than living with is *how* it fails. The
        # tool adapter filters unknown keyword arguments against the signature
        # rather than raising, so ``arm_id=1`` passed by a node is silently
        # dropped and the call drives arm 0. Four shipped node scripts pass it
        # today. Nothing errors; the wrong hand simply moves, and on a bimanual
        # robot that is the *anchor* hand letting go of what it was holding.
        #
        # The underlying methods already take it -- only the tool-facing wrappers
        # do not -- so each of these forwards and nothing else.

        def _tool_execute_trajectory(self, trajectory, subsample=0, tolerance=0.0, max_steps_per_waypoint=0, arm_id=0):
            if not trajectory or not trajectory.get("waypoints"):
                from gap_core.errors import ToolError

                raise ToolError("robot.execute_trajectory", "trajectory required")
            self._execute_trajectory(
                trajectory,
                subsample if subsample > 0 else 1,
                tolerance if tolerance > 0 else 0.01,
                max_steps_per_waypoint if max_steps_per_waypoint > 0 else 120,
                arm_id=int(arm_id),
            )
            # The streamed path spends its per-waypoint budget and moves on, so
            # a physically blocked arm finishes the feed with no error raised
            # and nobody told: hang_v7b under-tracked a place by ~18 cm of hand
            # height this way, silently, for eight straight batches. Report the
            # final gap so the caller (and the feedback that reads returns) can
            # see a motion that completed its stream without arriving.
            #
            # The arm is resolved in role order, as every other arm_id is (see
            # robosimstudio.arms), and the joints are read on the owner thread
            # through the bus, not off live state from this graph thread.
            final = trajectory["waypoints"][-1]
            commanded = final.get("positions") if isinstance(final, dict) else final
            if commanded is None:
                return {"status": "ok"}
            toolkit = self.toolkit_env
            try:
                coords = list(toolkit.handles.arms[_arm_name(toolkit, int(arm_id))].arm_coords)
                live = bus.call(lambda: np.asarray(toolkit.state.joint_q.numpy(), dtype=np.float64)[coords])
                cmd = np.asarray(list(commanded), dtype=np.float64).reshape(-1)[: len(coords)]
            except Exception as exc:  # the motion ran; only the report of how well is missing
                _log.warning("execute_trajectory: final tracking error not measured: %s", exc)
                return {"status": "ok", "final_tracking_error_unavailable": f"{type(exc).__name__}: {exc}"}
            gap = float(np.max(np.abs(cmd - live[: len(cmd)]))) if len(cmd) else 0.0
            return {
                "status": "ok",
                "final_tracking_error_rad": round(gap, 4),
                "waypoints": len(trajectory["waypoints"]),
            }

        def _tool_move_to_joints(self, joint_config, tolerance=0.0, max_steps=0, arm_id=0):
            from gap.connector.core import _as_positions
            from gap_core.errors import ToolError

            positions = _as_positions(joint_config) if joint_config is not None else []
            if not positions:
                raise ToolError("robot.move_to_joints", "joint_config required")
            self.move_to_joints(
                positions,
                tolerance=tolerance if tolerance > 0 else 0.01,
                max_steps=max_steps if max_steps > 0 else 120,
                arm_id=int(arm_id),
            )

        def _tool_get_gripper(self, arm_id: int = 0):
            """The travel fraction, plus where the fingertips are right now.

            ``tip_reach_m`` is how far the pads sit past the tool-centre point
            along the approach axis at the current opening -- constant on a
            prismatic hand, ten millimetres of travel over the stroke on a
            2F-85 (:func:`~robosimstudio_policy_agent.robot_tools.fingertip_reach`). Off
            the published snapshot when there is one, so a graph polling it in
            a descent costs no bus round trip.
            """
            out = dict(super()._tool_get_gripper(arm_id=arm_id) or {})
            try:
                from .robot_tools import fingertip_reach

                toolkit = self.toolkit_env
                body_q = bus.snapshot.body_q
                if body_q is None:
                    body_q = bus.call(lambda: np.asarray(toolkit.state.body_q.numpy(), dtype=np.float64))
                reach = fingertip_reach(toolkit, _arm_name(toolkit, int(arm_id)), body_q=np.asarray(body_q))
                if reach is not None:
                    out["tip_reach_m"] = float(reach)
            except Exception:  # proprioception that cannot be read is left out, not invented
                pass
            return out

        def go_home(self, arm_id: int = -1):
            """Home one arm, or every arm when ``arm_id`` is negative.

            The runtime's own homes them all, which is right for a single-armed
            robot and wrong for the case this stack has: a support arm holding a
            cable against a peg is *parked on purpose*, and a node retracting the
            working hand has no business unparking it. Negative keeps the old
            behaviour, so nothing that did mean "all of them" changes.
            """
            if arm_id < 0:
                return super().go_home()
            # This arm's own home, not the work arm's: ``_home_joints`` is the
            # config's, which is the work arm's posture, and driving the support
            # arm to it sends it wherever the work arm's joints happen to point.
            toolkit = self.toolkit_env
            handle = toolkit.handles.arms[_arm_name(toolkit, int(arm_id))]
            home = [float(v) for v in getattr(handle, "home_q", ())]
            if not home:
                # No home of its own to go to: refuse to move it rather than
                # home every arm, which would unpark the one held on purpose.
                return {"homed": False, "reason": f"arm {int(arm_id)} declares no home posture"}
            self.move_to_joints(home, tolerance=0.01, max_steps=200, arm_id=int(arm_id))
            return None

    connector = ConnectorNewton(facade, config, camera_names=list(config.default_cameras), ik=ik)
    connector.bus = bus
    connector.facade = facade
    # NOT ``connector.env``: the runtime's Connector stores the facade there and
    # drives it (``env._step_once()``, ``env.compute_reward()``). Overwriting it
    # with the toolkit-layer Env swaps out the whole env surface, and the first
    # ``robot.*`` tool call fails on a missing private method.
    connector.toolkit_env = env
    return connector


# Exported under the prefix-first name the rest of this package refers to. The
# class itself is built inside make_connector because it must subclass a base
# that is only importable with the [gap] extra present.
ConnectorNewton = make_connector
````

## robosimstudio_policy_agent/sim_tools.py

````text
# SPDX-License-Identifier: Apache-2.0
"""Privileged ``sim.*`` tools: ground truth, for the in-process mode only.

These read the simulator directly -- object poses, grasp boxes, particle state,
whether the evaluator says the task is done. A graph that calls them is being
*co-developed* or generating data, not evaluated: it is being handed answers a
real perception stack would have to earn.

That is a legitimate and useful mode, and it is why the privilege boundary is
structural rather than a convention. These tools exist only in the in-process
executor. A policy served over a socket is to receive only camera frames,
proprioception and intrinsics, and
:func:`~robosimstudio_policy_agent.contract.assert_non_privileged` is the check a
bridge sender runs to refuse anything else (none ships in this package) -- so a graph developed against ``sim.get_object_pose`` simply
cannot run over the bridge until it has been rewritten to look.

Every tool reads the simulator on the owner thread: off the
:class:`~robosimstudio.core.bus.SimSnapshot` it published where that carries
the answer (poses, frames), which costs nothing, and otherwise through
``bus.call``, so the read runs between steps rather than racing one from the
graph thread. A tool that marshals waits for the owner's next pump; none of
them reads live simulator state from the graph worker.

No tool takes a parameter called ``name``: the registry dispatches through
``ToolRegistry.invoke(name, ctx, **kwargs)``, so a tool with its own ``name``
argument raises "multiple values for argument 'name'" the first time a graph
calls it. Hence ``object_name`` / ``region_name``, which is also gap's own
house style (``robot.get_camera_pose(camera_name)``).
"""

from __future__ import annotations

from typing import Any

import numpy as np

from robosimstudio.core.bus import Bus
from robosimstudio.core.math import quat_to_mat, transform_matrix
from robosimstudio.core.render.visual import shape_meshes
from robosimstudio.robots.embodiments import top_down_grasp_site_quat
from robosimstudio.solvers import grasp_from_obb, top_down_grasp_quat
from robosimstudio_bench.goals.goal import about_key, leaves, placements

from .refusal import ToolRefusal
from .types import quat_wxyz, se3_of_xform, vec3

__all__ = ["GoalCursor", "register_goal_cursor", "register_sim_tools"]


def _grasp_heading_deg(long_axis_yaw: float) -> float:
    """The heading a top-down grasp closes along, given the long axis's yaw.

    Square to it, always. Separate from ``grasp_yaw`` because the two are one
    step apart and the step is silent: ``robot.grasp_frame`` takes a
    ``close_heading_deg``, ``grasp_yaw`` becomes degrees with one conversion,
    and handing one to the other closes the jaws down the length of the object
    without erroring anywhere. Measured on the hammer grid -- holding the roll
    at ``grasp_yaw`` scores 0/12, holding it here scores 8/12.
    """
    return float(np.degrees(long_axis_yaw) + 90.0)


def register_sim_tools(registry, env, bus: Bus) -> None:
    """Register the generic privileged tools on a GaP tool registry.

    A suite contributes its own task tools separately -- the tape suite
    registers ``sim.get_tab`` beside its adhesion module -- so nothing here needs
    to know what task is running.

    Args:
        registry: A ``gap_core.tools.ToolRegistry``.
        env: The toolkit-layer environment.
        bus: The bus whose snapshot the tools read.
    """
    tools = SimTools(env, bus)
    for name, fn, summary in tools.entries():
        # register_callable is the only path allowed to claim the reserved
        # ``sim.``/``robot.`` prefixes, and it raises on a duplicate name rather
        # than letting a second registration win silently.
        registry.register_callable(name, fn, summary=summary, tags=("privileged",))
    register_attachment(registry, env, bus)


def register_attachment(registry, env, bus: Bus) -> ClothAttachment | None:
    """Register ``sim.attach``/``sim.detach``, if the scene has anything to hold.

    Conditional on the scene rather than opt-in per task, which is the opposite
    of :func:`register_goal_cursor` and for the opposite reason. A goal cursor
    over a peel would invent a pair that does not exist, so a task has to ask
    for it; but "does this cell contain a deformable" is a fact about the cell,
    and on a cell that has one there is nothing ambiguous about attaching to it.
    A rigid-only scene gets no tool, which is the honest state -- rather than a
    tool that raises the first time a graph believes the registry.

    Returns the attachment so a suite registering further tools can share it,
    or ``None`` when the scene has no deformables.
    """
    if not any(getattr(e, "carries_particles", False) for e in getattr(env.scene, "by_name", {}).values()):
        return None
    attachment = ClothAttachment(env, bus)
    registry.register_callable(
        "sim.attach",
        attachment.attach,
        summary="Seize a deformable's declared feature at one hand and carry it.",
        tags=("privileged",),
    )
    registry.register_callable(
        "sim.detach",
        attachment.detach,
        summary="Let a held deformable go, at one hand or at every hand.",
        tags=("privileged",),
    )
    return attachment


def register_goal_cursor(registry, env, bus: Bus) -> GoalCursor:
    """Register ``sim.next_goal`` and ``sim.skip_goal`` on a GaP tool registry.

    **Not part of :func:`register_sim_tools`, and that is the whole design.** The
    generic set answers questions about *objects* and *regions*, which every
    scene has; "which of this problem's goals should I do next" is a question
    about a goal tree, so a task that wants it contributes it through
    :attr:`~robosimstudio.specs.TaskSpec.tools` -- the same opt-in the
    tape suite's bond tools take. A task whose goal is a peel or a wrap has no
    placements at all, and a cursor registered over them would hand a graph an
    invented pair.

    It is *here* rather than in a suite because it reads nothing but the
    compiled goal and the evaluator's metrics, which is exactly what the rest of
    this module reads.

    Args:
        registry: A ``gap_core.tools.ToolRegistry``.
        env: The toolkit-layer environment.
        bus: The bus whose snapshot carries the evaluator's metrics.

    Returns:
        The cursor, so a suite registering further tools of its own can share
        its notion of which goal is current.
    """
    cursor = GoalCursor(env, bus)
    registry.register_callable(
        "sim.next_goal",
        cursor.next_goal,
        summary="The next unsatisfied (object, region) goal of this variant, or done.",
        tags=("privileged",),
    )
    registry.register_callable(
        "sim.skip_goal",
        cursor.skip_goal,
        summary="Give up on one goal for the rest of the episode and move to the next.",
        tags=("privileged",),
    )
    return cursor


class SimTools:
    """The generic privileged tool implementations."""

    def __init__(self, env, bus: Bus) -> None:
        self.env = env
        self.bus = bus
        # The home end-effector orientation, from the embodiment's *declared*
        # home rather than the live arm: constructed on the main thread before
        # the graph starts, and constant thereafter -- the live arm is only at
        # home before the first goal of a loop.
        self._home_ee_quat = self._compute_home_ee_quat()

    def _compute_home_ee_quat(self):
        embodiment = self.env.scene.embodiment
        handles = self.env.handles
        if embodiment is None or not embodiment.spec.arms or not handles.arms:
            return None
        # The work arm: this quaternion is the frame every commanded grasp is
        # composed about, so reading it off whichever arm happens to be first
        # yaws every grasp by the idle hand's wrist.
        name = handles.work_arm if handles.work_arm in handles.arms else next(iter(handles.arms))
        arm_spec = next((a for a in embodiment.spec.arms if a.name == name), embodiment.spec.arms[0])
        ik = self.env.arm(name)
        home = np.asarray(self.env.state.joint_q.numpy(), dtype=np.float32).copy()
        if arm_spec.home_q:
            # strict: a home posture that does not match the arm's coordinate
            # count is a spec error, and zip's default would silently seed only
            # the joints the shorter one covers.
            for coord, value in zip(ik.arm_coords, arm_spec.home_q, strict=True):
                home[coord] = value
        _, quat_xyzw = ik.fk_ee(home)
        return np.asarray(quat_xyzw, dtype=np.float64)

    def _grasp_quat(self, yaw: float):
        """A top-down grasp at ``yaw``, in the grasp-site frame, as a wxyz dict.

        Built from the hand's **measured** approach and closing axes rather than
        by yawing its home wrist about world +z. The heuristic this replaces
        reads neither axis, which is fine for as long as every robot's hand
        happens to sit square to its wrist and silently wrong otherwise -- the
        Panda's measured closing axis is local *x*, and a grasp frame composed on
        the default local *y* closes the jaws along the object rather than
        across it.

        The ``[-90, 90)`` wrap is kept. Without it the last wrist joint runs into
        its limit on grasps near a right angle, which is measured elsewhere in
        this package as 40.9 degrees of residual roll against a hard stop.
        """
        hand = self._work_hand()
        if hand is None:
            if self._home_ee_quat is None:
                return None
            q = top_down_grasp_quat(self._home_ee_quat, yaw)
            return {"w": float(q[3]), "x": float(q[0]), "y": float(q[1]), "z": float(q[2])}
        wrapped = (float(yaw) + np.pi / 2.0) % np.pi - np.pi / 2.0
        q = top_down_grasp_site_quat(hand, float(np.degrees(wrapped)))
        return {"w": float(q[3]), "x": float(q[0]), "y": float(q[1]), "z": float(q[2])}

    def _work_hand(self):
        """The :class:`GripperSpec` on the work arm, or ``None`` for a bare cell."""
        embodiment = self.env.scene.embodiment
        if embodiment is None:
            return None
        handles = self.env.handles
        name = handles.work_arm if handles.work_arm in handles.arms else next(iter(handles.arms), "")
        return embodiment.hands.get(name)

    def entries(self) -> list[tuple[str, Any, str]]:
        return [
            ("sim.list_objects", self.list_objects, "Every manipulable object in the scene, with its category."),
            (
                "sim.get_object_pose",
                self.get_object_pose,
                "One object's ground-truth world pose (position + wxyz quaternion).",
            ),
            ("sim.get_object_obb", self.get_object_obb, "One object's oriented bounding box and the grasp it implies."),
            ("sim.list_regions", self.list_regions, "Every goal region, with its world centre."),
            (
                "sim.get_region_obb",
                self.get_region_obb,
                "One goal region as an oriented bounding box, for aiming a place.",
            ),
            (
                "sim.get_particle_state",
                self.get_particle_state,
                "A deformable's summary: centroid, height band, footprint.",
            ),
            ("sim.get_rgbd", self.get_rgbd, "The most recent camera frame: rgb, depth and intrinsics."),
            (
                "sim.get_collision_world",
                self.get_collision_world,
                "Exact simulator collider triangles, excluding the robot and selected object categories.",
            ),
            (
                "sim.get_object_bounds",
                self.get_object_bounds,
                "One object's world axis-aligned bounds, as it lies now.",
            ),
            ("sim.check_grasp", self.check_grasp, "Whether an arm is actually holding one object right now."),
            (
                "sim.get_states",
                self.get_states,
                "Every state an entity publishes, with how observable each one is.",
            ),
            ("sim.check_success", self.check_success, "What the task's evaluator says right now."),
            (
                "sim.query",
                self.query_tool,
                "Ask one relation, or a whole family of them, about named things right now.",
            ),
            (
                "sim.list_relations",
                self.list_relations_tool,
                "What can be asked about these things: the applicable relations, by family.",
            ),
            (
                "sim.clearance",
                self.clearance,
                "How close two things are [m] -- now, or at a joint configuration the arm is not in.",
            ),
        ]

    # ------------------------------------------------------------------ tools
    def list_objects(self) -> dict[str, Any]:
        handles = self.env.handles
        return {
            "objects": [
                {"name": name, "category": handle.category, "static": bool(handle.static)}
                for name, handle in sorted(handles.objects.items())
            ]
        }

    def get_object_pose(self, object_name: str) -> dict[str, Any]:
        body_q = self._body_q()
        handle = self.env.handles.entity(object_name)
        if getattr(handle, "body", -1) < 0:
            # A bodiless static indexes body_q at -1, which is the LAST body's
            # pose -- a silent lie discovered by the tool_hanging cell, where a
            # policy asked a pegboard fixture where it was and got the second
            # wrench's live pose back with an ok status. Refusing is the
            # honest answer; the fixture's geometry is reachable through the
            # region and container tools that know about welded scenery, and
            # through ``sim.query("geometry", ...)`` for a declared feature.
            raise ToolRefusal(f"{object_name!r} is a bodiless static; it has no body pose to read")
        return {"name": object_name, "pose": se3_of_xform(handle.pose(body_q))}

    def get_object_obb(self, object_name: str, handle_frac: float = 0.0) -> dict[str, Any]:
        """The grasp box, in the shape the shared geometry tools consume.

        The returned ``obb`` is a ``gap_core.types.OrientedBoundingBox``, so it
        drops straight into ``geometry.top_down_grasp_candidates`` where a
        perception-driven graph would put the output of a point-cloud fit. That
        substitutability is the point: a ground-truth graph and a perception
        graph differ in one node, not in their structure.

        ``extent`` is a **half**-extent, which is gap's convention and also what
        :class:`~robosimstudio.solvers.ObbGrasp` stores. The box is the
        body-frame AABB, so its world orientation is the body's own.

        Two boxes come back, and which one to plan against is a real choice:

        ``obb``
            The whole object. Correct for anything a gripper can close on at its
            centroid, and what a point-cloud fit would produce.
        ``grasp_obb``
            The **graspable part**, slid ``handle_frac`` along the long axis
            towards the light end and shortened to a segment the fingers span.
            An object wider than the gripper at its centroid -- a claw hammer is
            13.2 cm across against an 8 cm span -- cannot be grasped there at
            all, and planning against the whole box makes the fingers straddle
            the claw and catch it by friction: it holds sometimes, and drops
            mid-transport the rest of the time. This is what a grasp-proposal
            network would emit, so a graph that plans against it is not doing
            anything a perception graph could not.

        Two headings come back and they are perpendicular. ``grasp_yaw`` is the
        **long axis's** own heading; ``grasp_heading_deg`` is what a top-down
        grasp should close **along**, and is the one to hand to
        ``robot.grasp_frame(close_heading_deg=...)``. Passing ``grasp_yaw``
        there instead closes the jaws down the length of the object -- it
        validates and executes, so the only symptom is a grasp that lands on
        target and holds nothing.

        ``fits_gripper`` says which is needed; ``handle_frac`` defaults to 0 so
        the whole box is unchanged unless a caller asks.

        **A declared ``grasp_box`` is not consulted here, and that is a gap
        rather than a decision.** This uses the derived box unconditionally.
        Latent today -- the VAB tools deliberately declare none, since a rigid
        asset's grasp geometry is derived and re-declaring it would be
        transcribing a computation, and ``usb_c_plug`` declares one that no
        shipped graph asks for -- but an asset that declared a box precisely
        because the derived one is wrong would be ignored right where it
        mattered.

        Closing it is not a substitution. Everything below the box is
        ``ObbGrasp``'s: ``long_axis``, ``gripper_span``, ``grasp_width``,
        ``fits_gripper``, and the handle slide. A declared payload carries a half
        extent and a centre and no ``handle_sign`` -- which end is the light one
        is a fact about mass, not about the box -- so honouring a declaration
        means deciding what the handle slide even means for an asset that has
        already said where to close. That is a design question and wants asking
        rather than guessing.
        """
        handle = self.env.handles.entity(object_name)
        if handle.obb is None:
            raise ToolRefusal(f"object {object_name!r} has no grasp box")
        pose = handle.pose(self._body_q())
        rotation = quat_to_mat(pose[3:7])
        centre = pose[:3] + rotation @ handle.obb.center_local
        point, yaw = grasp_from_obb(handle.obb, pose, handle_frac)
        orientation = quat_wxyz(pose[3:7])

        # The full commanded grasp orientation, not just the yaw angle: the
        # reference's own composition (yaw the *home* gripper so the fingers
        # cross the handle), computed here because only the environment knows
        # the home end-effector orientation -- and computed from the
        # embodiment's declared home rather than the live arm, because on the
        # second goal of a loop the arm is wherever the first goal left it,
        # and a "home" read there yaws the grasp by the leftover wrist angle.
        grasp_quat = self._grasp_quat(yaw)

        # The graspable segment: the long axis clipped to what the fingers can
        # straddle, the rest of the box unchanged so the planner still derives a
        # correct top surface to descend to.
        span = float(handle.obb.gripper_span)
        grasp_half = np.asarray(handle.obb.half, dtype=np.float64).copy()
        grasp_half[handle.obb.long_axis] = min(grasp_half[handle.obb.long_axis], span * 0.5)

        bounds = self.get_object_bounds(object_name)
        return {
            "name": object_name,
            "obb": {"center": vec3(centre), "extent": vec3(handle.obb.half), "orientation": orientation},
            "grasp_obb": {"center": vec3(point), "extent": vec3(grasp_half), "orientation": orientation},
            "grasp_position": vec3(point),
            "grasp_yaw": float(yaw),
            # The heading a top-down grasp should close ALONG, which is square
            # to the long axis -- and therefore square to `grasp_yaw`, which is
            # the long axis's own heading.
            #
            # Both are here because the two are a step apart and the step is
            # easy to miss: `robot.grasp_frame` takes a `close_heading_deg`,
            # `grasp_yaw` is in degrees once converted, and handing one to the
            # other type-checks, validates, plans, executes, and closes the
            # jaws down the length of the object. Measured on `tool_sort`'s
            # hammer: handle at 175 deg, `grasp_yaw` -5 deg -- the same line.
            #
            # The cost of the missing step is not subtle. Holding the roll at
            # `grasp_yaw` scores 0/12 on the hammer grid; holding it here
            # scores 8/12, and is the only configuration ever to pick the
            # hammer up at the second staged yaw at all. The shipped `gt`
            # graph's 5/12 comes entirely from the one yaw where a free wrist
            # happens to land square by accident.
            "grasp_heading_deg": _grasp_heading_deg(yaw),
            # The full commanded orientation the yaw implies -- see _grasp_quat.
            # NOTE: composed from `grasp_yaw`, so it inherits the same step:
            # it is identical to `robot.grasp_frame(close_heading_deg=
            # degrees(grasp_yaw))`, measured 0.0 deg apart. Kept as it is
            # because graphs depend on it; prefer `grasp_heading_deg`.
            "grasp_quat": grasp_quat,
            "grasp_width": float(handle.obb.grasp_width),
            "fits_gripper": bool(handle.obb.fits_gripper),
            "long_axis": int(handle.obb.long_axis),
            # Where the object actually is in z, as it lies: what a caller
            # needs to decide how deep the fingers may go before they bottom
            # out on whatever the object is resting on.
            "top_z": float(bounds["highest_z"]),
            "bottom_z": float(bounds["lowest_z"]),
        }

    def get_region_obb(self, region_name: str, height: float = 0.05) -> dict[str, Any]:
        """A goal region as an OBB, so a transport node can aim at it.

        Regions are axis-aligned rectangles in a frame, which is a box with an
        identity rotation -- expressing them this way lets the same drop-pose
        script serve a region and a physical container.

        The box sits on the region's own floor, ``z_range[0]`` above the frame
        origin, not on the frame origin itself. For a bin compartment the two
        coincide -- the window opens at the bin floor -- which is why this went
        unnoticed; for a region on a container they do not, because the
        container's cavity floor is offset from ``bin2``'s origin. Aiming a
        drop at the frame origin instead of the cavity floor put the release
        16 mm out on the syringe box.
        """
        handle = self.env.handles.regions[region_name]
        body_q = self._body_q()
        origin = handle.origin_now(body_q)
        x0, y0, x1, y1 = handle.xy_ranges
        centre = origin + np.array([(x0 + x1) * 0.5, (y0 + y1) * 0.5, handle.z_range[0] + height * 0.5])
        return {
            "name": region_name,
            "obb": {
                "center": vec3(centre),
                "extent": vec3([abs(x1 - x0) * 0.5, abs(y1 - y0) * 0.5, height * 0.5]),
                "orientation": {"w": 1.0, "x": 0.0, "y": 0.0, "z": 0.0},
            },
        }

    def list_regions(self) -> dict[str, Any]:
        body_q = self._body_q()
        return {
            "regions": [
                {"name": name, "frame": handle.frame, "center": vec3(handle.center(body_q))}
                for name, handle in sorted(self.env.handles.regions.items())
            ]
        }

    def get_particle_state(self, cloth: str = "", particle_set: str = "") -> dict[str, Any]:
        deformables = {n: e for n, e in self.env.scene.by_name.items() if e.carries_particles}
        if not deformables:
            raise ToolRefusal("this scene has no deformables")
        name = cloth or next(iter(deformables))
        probe = deformables[name].probe
        key = f"{name}/{particle_set}" if particle_set else name
        return {"cloth": name, "set": key, **self.bus.call(probe.summary, key)}

    def get_rgbd(self, camera: str = "") -> dict[str, Any]:
        frames = self.bus.snapshot.frames
        if not frames:
            raise ToolRefusal("no camera frames have been rendered; build the env with a renderer")
        name = camera or next(iter(frames))
        if name not in frames:
            raise ToolRefusal(f"no camera {name!r}; have {sorted(frames)}")
        spec = next((c for c in self.env.cameras if c.name == name), None)
        frame = frames[name]
        return {
            "camera": name,
            "rgb": frame.get("rgb"),
            "depth": frame.get("depth"),
            "intrinsics": None if spec is None else spec.intrinsics.tolist(),
        }

    def get_collision_world(self, exclude_categories: list[str] | None = None) -> dict[str, Any]:
        """Export the simulator's authored collision shapes as a CuRobo world.

        This is deliberately privileged and diagnostic-only.  Unlike the RGB-D
        path it performs no alpha-shape reconstruction: every returned triangle
        comes from the exact Newton collider used by physics.  Robot shapes and
        the requested manipulated-object categories are omitted so they are not
        duplicated as static world obstacles.
        """
        import newton  # local: simulator-only dependency

        excluded_categories = {str(value).lower() for value in (exclude_categories or [])}
        embodiment = self.env.scene.embodiment
        excluded_bodies = {int(body) for body in getattr(embodiment, "bodies", ())}
        excluded_shapes = set()
        if embodiment is not None:
            excluded_shapes.update(range(*embodiment.range.shapes))
        for object_name, handle in self.env.handles.objects.items():
            # `.category`, not `.kind`: the field was renamed and this call
            # site was not, so every call to sim.get_collision_world raised
            # AttributeError -- on a tool the `full` tier admits, which means
            # an agent reaching for the collision world lost its episode to a
            # crash rather than a refusal. Found by the surface smoke.
            identity = {str(object_name).lower(), str(handle.category).lower()}
            # A bodiless handle (body -1) has nothing to exclude, and -1 in the
            # set would drop every world-static shape below.
            if int(handle.body) >= 0 and any(
                token in value or value in token for token in excluded_categories for value in identity
            ):
                excluded_bodies.add(int(handle.body))

        model = self.env.scene.index_model
        body_q = self._body_q()
        collide = int(newton.ShapeFlags.COLLIDE_SHAPES)
        labels = list(getattr(model, "shape_label", None) or ())
        meshes = []
        for shape in shape_meshes(model, skip_planes=True, flag=collide):
            if shape.index in excluded_shapes or shape.body in excluded_bodies:
                continue
            world = shape.local if shape.body < 0 else transform_matrix(body_q[shape.body]) @ shape.local
            vertices = shape.vertices @ world[:3, :3].T + world[:3, 3]
            meshes.append(
                {
                    "name": (f"shape_{shape.index}_{labels[shape.index] if shape.index < len(labels) else 'collider'}"),
                    "vertices": vertices.astype(np.float32),
                    "faces": shape.faces.astype(np.int32),
                    "pose": {
                        "position": {"x": 0.0, "y": 0.0, "z": 0.0},
                        "rotation": {"w": 1.0, "x": 0.0, "y": 0.0, "z": 0.0},
                    },
                }
            )
        if not meshes:
            raise ValueError("simulator collision export produced no static collider meshes")
        return {"config": {"meshes": meshes}, "mesh_names": [mesh["name"] for mesh in meshes]}

    def get_object_bounds(self, object_name: str) -> dict[str, Any]:
        """One object's world axis-aligned bounds, in its *current* orientation.

        The port of the reference's ``tool_lowest_z``, and it exists for one
        job: posting a held tool through a hole. How far the tool hangs below
        the gripper once it has been stood on end cannot be predicted from the
        grasp -- it settles differently in the fingers depending on where along
        it they closed -- and the reference is explicit that a centimetre of
        that error is the difference between dropping cleanly through an
        aperture and catching its rim. So it is measured live.

        Derived by transforming the body-frame box's eight corners and taking
        the extremes, which is the world AABB of the oriented box rather than of
        the mesh. For a tool held on end that is what the caller wants: the
        lowest point of the thing hanging out of the hand.
        """
        handle = self.env.handles.entity(object_name)
        if handle.obb is None:
            raise ToolRefusal(f"object {object_name!r} has no bounding box")
        pose = handle.pose(self._body_q())
        rotation = quat_to_mat(pose[3:7])
        half = np.asarray(handle.obb.half, dtype=np.float64)
        centre = np.asarray(pose[:3], dtype=np.float64) + rotation @ np.asarray(
            handle.obb.center_local, dtype=np.float64
        )
        signs = np.array([[sx, sy, sz] for sx in (-1, 1) for sy in (-1, 1) for sz in (-1, 1)], dtype=np.float64)
        corners = centre + (signs * half) @ rotation.T
        lo, hi = corners.min(axis=0), corners.max(axis=0)
        return {
            "name": object_name,
            "min": vec3(lo),
            "max": vec3(hi),
            "lowest_z": float(lo[2]),
            "highest_z": float(hi[2]),
            # Which world axis the object is longest along, so a caller can tell
            # whether it is currently lying flat or standing on end.
            "long_axis": int(np.argmax(hi - lo)),
        }

    def check_grasp(self, object_name: str, arm: str = "", max_angle: float = 80.0) -> dict[str, Any]:
        """Whether the hand is actually holding ``object_name``.

        A ``robot.close_gripper`` that returns tells you the fingers finished
        travelling, not that anything is between them -- so without this a graph
        closes on air, routes to its transport branch, and carries nothing to
        the goal. The whole episode then reads as a clean end-to-end run scoring
        zero, which is the least diagnosable failure a benchmark can produce.

        The test is :meth:`~robosimstudio.core.probes.ContactProbe.check_grasp`,
        the same one the placement predicates and the SimplerEnv evaluators
        use: a contact impulse on *each* side of the hand whose direction is
        within ``max_angle`` of the direction that side opens in. The angle
        test is what stops an object resting on top of a closed gripper from
        reading as held.

        Returns ``held`` false rather than raising when the scene has no contact
        probe or the arm declared no finger bodies, since a task may legitimately
        run without either. An ``arm`` string that names no arm is different:
        that is a caller error, and it refuses rather than answers.
        """
        arm_names = self.env.handles.arms
        if arm and arm not in arm_names:
            # ``.get(arm)`` used to swallow this and answer a confident
            # held=False -- the tool_hanging cells burned their final
            # iterations guessing role words ("work", "support") against it,
            # and a silent False can never teach the right vocabulary.
            raise ToolRefusal(
                f"no arm named {arm!r}; this cell's arms are {sorted(arm_names)} "
                f"(robot.describe_arm's 'arm' field is the string this parameter takes)"
            )

        def read() -> bool:
            contacts = getattr(self.env, "contacts", None)
            if contacts is None:
                return False
            arms = self.env.handles.arms
            # The *work* arm when none is named, not the first one declared. The
            # two YAM cells list their arms in opposite orders, so declaration
            # order picks the idle hand on one of them -- and an unqualified
            # check_grasp then reports the working hand holding nothing while it
            # is holding the object.
            handle = arms.get(arm) if arm else arms.get(self.env.handles.work_arm)
            if handle is None or not handle.finger_groups:
                return False
            body_q = np.asarray(self.env.state.body_q.numpy(), dtype=np.float64)
            return bool(
                contacts.check_grasp(
                    handle.finger_groups,
                    self.env.handles.entity(object_name).collision_shapes,
                    body_q,
                    open_axis_signs=handle.open_axis_signs,
                    max_angle=max_angle,
                )
            )

        return {"object_name": object_name, "held": bool(self.bus.call(read))}

    def check_success(self) -> dict[str, Any]:
        info = self.bus.snapshot.info
        return {
            "success": bool(info.get("success", False)),
            "reward": float(info.get("reward", 0.0)),
            "metrics": info.get("metrics", {}),
        }

    # ------------------------------------------------------------- describing
    def get_states(self, entity: str = "") -> dict[str, Any]:
        """Every state an entity publishes, tagged with how observable each is.

        The generic form of a tool four suites wrote by hand. An asset declares
        what it publishes -- ``tape`` and ``film`` declare ten each, with a
        summary, a unit and an observability tier per entry -- and the entity
        computes them. Between those two facts there is nothing left for a
        per-suite tool to decide, so asking the declaration serves every asset
        that has one, including the ones whose suite never wrote a tool.

        ``film_peel`` is why this is worth having: it registers ``tape_peel``'s
        tools unchanged, so a graph peeling *film* could read the tape's four
        hand-derived numbers and none of the film's own ten.

        Args:
            entity: One entity, or ``""`` for every entity that publishes
                anything.

        Returns:
            ``{entity: {state: {"value", "observability"} | value}}``. The tier
            rides along rather than being stripped: a bond fraction is
            ``internal``, no camera reads one, and a policy that learned from it
            has learned something no real robot can. Untiered values -- an
            entity publishing something its record does not declare -- come
            through bare rather than being dropped, because a number nobody
            declared is still a number somebody is about to depend on.
        """
        from robosimstudio.assetlib.registry import ASSETS
        from robosimstudio.assetlib.semantics.snapshot import Snapshot
        from robosimstudio_bench.goals.bind import _published

        doc = self._document()
        types = {o.name: o.type for o in doc.objects} if doc is not None else {}

        def read() -> dict[str, Any]:
            snapshot = Snapshot(ctx=self.env.make_context()).freeze()
            wanted = [entity] if entity else sorted(snapshot.entities)
            out: dict[str, Any] = {}
            for one in wanted:
                published = _published(snapshot, one)
                if not published:
                    continue
                # The tier table is read off the asset record directly. It
                # used to come from the narration layer's tier helpers, which
                # this checkout deleted -- the tiering is a fact the catalog
                # already declares, and reading it here keeps the value
                # structured rather than routing it through prose.
                try:
                    record = ASSETS.get(types[one]) if types.get(one) else None
                except KeyError:
                    record = None
                tiers = {p.name.replace("-", "_"): p.tier for p in (record.published if record else ())}
                values: dict[str, Any] = {}
                for key, value in sorted(published.items()):
                    item = float(value) if isinstance(value, (int, float, np.floating)) else value
                    tier = tiers.get(str(key).replace("-", "_"))
                    values[key] = {"value": item, "observability": tier} if tier else item
                out[one] = values
            return out

        return self.bus.call(read)

    @staticmethod
    def _refs(refs: Any) -> tuple[str, ...]:
        """A graph's ``refs`` argument as the tuple the query layer wants.

        ``query(atom, *refs)`` is the right Python signature and the wrong tool
        signature. A graph reaches a tool through ``ctx.tool(name, **kwargs)``,
        which passes keywords only, and a keyword cannot bind to ``*args`` --
        so ``sim.query`` was *uncallable from a workflow*, in either spelling:
        ``refs=[...]`` raised "unexpected keyword argument 'refs'" and the
        positional workaround raised "tool() takes 2 positional arguments".
        Both were observed, twelve episodes at a time.

        Nobody hit it because nobody needed it: the suites whose fixtures have
        no body -- a pegboard hook, a rack hole -- shipped their own
        ``sim.plan_*`` tools that handed the location over, and this is the
        generic path those tools were standing in front of. Withhold them and
        the only documented route to a welded fixture is a dead one.

        So the registered tool takes ``refs`` as a real parameter and accepts
        what an author will plausibly write: one ref, a list of them, or the
        several-in-a-string spelling ("wrench_1.ring, wrench_hook_1.shank")
        that a model reaches for when a list looks unwelcome.
        """
        if refs is None:
            return ()
        if isinstance(refs, str):
            parts = [part.strip() for part in refs.replace(",", " ").split()]
            return tuple(part for part in parts if part)
        if isinstance(refs, (list, tuple)):
            out: list[str] = []
            for item in refs:
                out.extend(SimTools._refs(item))
            return tuple(out)
        return (str(refs),)

    def query_tool(self, atom: str, refs: Any = ()) -> dict[str, Any]:
        """:meth:`query`, with ``refs`` as one keyword argument. See :meth:`_refs`."""
        return self.query(atom, *self._refs(refs))

    def list_relations_tool(self, refs: Any = ()) -> dict[str, Any]:
        """:meth:`list_relations`, with ``refs`` as one keyword argument."""
        return self.list_relations(*self._refs(refs))

    def query(self, atom: str, *refs: str) -> dict[str, Any]:
        """Ask the scene one question, in the vocabulary the goal is written in.

        Returns the handler's structured measurement without rendering it into
        language.

        Args:
            atom: A relation or property name (``"on"``, ``"covers"``,
                ``"winding_turns"``), or a family (``"SpatialRelation"``) to ask
                every relation that admits these operands.
            *refs: What to ask about, in the document's own reference grammar:
                ``"hammer_0"``, ``"port.bore"``, ``"cable.point(0.63)"``.

        Returns:
            The structured reading. For a family, one entry per applicable
            relation.

        **The same measurement the goal uses**, resolved the same way and
        dispatched to the same handler -- so an agent is never reasoning about a
        world slightly different from the one being scored. No threshold comes
        back: what counts as enough is the task's, and an agent told only
        somebody else's boolean has been told less than it asked.
        """
        from robosimstudio.assetlib.semantics.snapshot import Snapshot
        from robosimstudio_bench.goals.bind import BindError
        from robosimstudio_bench.goals.query import QueryRefused
        from robosimstudio_bench.goals.query import query as _query

        def ask() -> dict[str, Any]:
            snapshot = Snapshot(ctx=self.env.make_context())
            return _query(snapshot, atom, *refs, doc=self.env.doc)

        try:
            # On the owner thread: the handlers read live state and probes.
            return self.bus.call(ask)
        except (QueryRefused, BindError, LookupError, ValueError) as exc:
            # **A refusal is an answer, and it is returned rather than raised.**
            # "This thing does not afford that question" is a legitimate and
            # common reply during authoring -- it is the catalog-gap signal the
            # whole asset layer is built to give -- and a tool that raised it
            # would end the episode over an agent asking a reasonable question.
            # The message already names what *is* available, which is the half
            # worth having.
            return {"refused": str(exc)}

    def list_relations(self, *refs: str) -> dict[str, Any]:
        """What may be asked about these things, by family.

        The discovery half. An agent holding two names rarely knows which
        relation it wants; it wants to know which are answerable, and asking
        each and catching the refusals is a worse way to find out.
        """
        from robosimstudio.assetlib.semantics.atom import leaves_of
        from robosimstudio.assetlib.semantics.snapshot import Snapshot
        from robosimstudio_bench.goals.bind import BindError
        from robosimstudio_bench.goals.query import QueryRefused
        from robosimstudio_bench.goals.query import query as _query

        # ``env.doc``, where the document lives -- the same one :meth:`query`
        # resolves against; ``env.task`` carries none.
        doc = self.env.doc

        def ask() -> dict[str, list[dict[str, Any]]]:
            snapshot = Snapshot(ctx=self.env.make_context())
            out: dict[str, list[dict[str, Any]]] = {}
            for family in ("SpatialRelation", "Relation", "Property"):
                readings = None
                for leaf in leaves_of(family):
                    if len(leaf.args) != len(refs):
                        continue
                    if readings is None:
                        readings = _query(snapshot, family, *refs, doc=doc)["readings"]
                    if leaf.name in readings:
                        out.setdefault(family, []).append(
                            {"atom": leaf.name, "summary": leaf.summary, "returns": list(leaf.returns)}
                        )
            return out

        try:
            return {"families": self.bus.call(ask)}
        except (QueryRefused, BindError, LookupError, ValueError) as exc:
            # Returned, not raised, for the reason :meth:`query` gives.
            return {"refused": str(exc)}

    def clearance(self, group_a: str, group_b: str = "", joint_q: list[float] | None = None) -> dict[str, Any]:
        """How close two things are, now or at a configuration the arm is not in.

        **The motion-feedback question**, and the reason it takes ``joint_q``: an
        agent about to move an arm from here to there wants to know what the
        move would touch *before* making it, and forward kinematics into the
        probe's own state answers that without stepping the scene or disturbing
        anything.

        Args:
            group_a: ``"arm:work"``, ``"arm:left"``, or an object name.
            group_b: The same, or empty for everything else in the scene.
            joint_q: A joint configuration to ask about. Omitted asks about the
                arm where it is.

        Returns:
            ``gap`` [m] -- negative where the two overlap -- and which shapes
            made it. ``inf`` means the model has filtered the pair against each
            other, which is the honest answer for two parts that cannot collide.
        """
        probe = self.env.clearance
        first = self._shape_group(group_a)
        second = self._shape_group(group_b) if group_b else self._complement(first)
        # On the owner thread: the probe holds simulator state of its own, and
        # the live body poses are read where they are written.
        if joint_q is not None:
            gap = self.bus.call(probe.at, list(joint_q), first, second)
            return {"gap": float(gap), "at_configuration": True}
        gap, shape_a, shape_b = self.bus.call(lambda: probe.closest(first, second, self.env.state.body_q.numpy()))
        return {"gap": float(gap), "shape_a": int(shape_a), "shape_b": int(shape_b), "at_configuration": False}

    def _shape_group(self, name: str) -> list[int]:
        """Collision shapes for an arm role or an object name.

        ``"arm:work"`` and ``"arm:support"`` are *roles* rather than arm names,
        because a graph is written against the role its binding assigns and the
        arm behind it differs per robot. Resolved through the same role order the
        runtime's ``arm_id`` counts in, so a tool and a graph mean one thing.
        """
        if name.startswith("arm:"):
            from robosimstudio.arms import arm_name, arm_order

            role = name.partition(":")[2] or "work"
            order = arm_order(self.env)
            resolved = role if role in order else arm_name(self.env, 0 if role == "work" else 1)
            return [int(s) for s in self.env.handles.arms[resolved].shapes]
        return [int(s) for s in self.env.handles.entity(name).collision_shapes]

    def _complement(self, shapes: list[int]) -> list[int]:
        """Everything else in the scene.

        The default second group, and it is what "will this move hit anything"
        means when the asker does not yet know what it might hit.
        """
        every: list[int] = []
        for handle in self.env.handles.objects.values():
            every.extend(int(s) for s in handle.collision_shapes)
        for handle in self.env.handles.statics.values():
            every.extend(int(s) for s in handle.collision_shapes)
        held = set(shapes)
        return [s for s in every if s not in held]

    def _document(self):
        """The task's document, when it was defined by one.

        ``None`` for a task assembled some other way: its description degrades to
        positions and containments rather than failing, which is the honest
        reading -- there is no document to type its objects against.
        """
        return self.env.doc

    # ---------------------------------------------------------------- helpers
    def _body_q(self) -> np.ndarray:
        snapshot = self.bus.snapshot
        if snapshot.body_q is not None:
            return snapshot.body_q
        return self.bus.call(lambda: np.asarray(self.env.state.body_q.numpy(), dtype=np.float64))


class ClothAttachment:
    """Holding a deformable at a hand, and letting it go.

    Three suites wrote this: ``sim.latch_cloth``/``release_cloth``,
    ``sim.latch_tape``/``release_tape`` and ``sim.hold_cable``/``release_cable``,
    whose return shapes already agreed. What differed between them was only
    *which particles* -- and a declared set name says that, so there is nothing
    left for a per-suite copy to decide. The tape pair is gone and calls this.

    **This stays privileged and always will.** No real hand seizes particles;
    a graph that attaches is a graph that will not transfer, and no amount of
    perception makes it transfer. It is here rather than hidden in a suite so
    that fact is stated once, loudly, in the module whose docstring is about
    ground truth -- rather than three times, quietly, in files a portability
    scan does not read.

    Four behaviours are load-bearing, and each of the three copies paid for at
    least one of them:

    * **The graph must be invalidated after the hook is appended.** The substep
      block is captured into a CUDA graph and a hook added afterwards is simply
      not in it. Skipping this is *silent*: the grab bookkeeping is host-side,
      so the tool reports the particles it seized while nothing holds them. On
      the tape suite what little peeling then happened was the fingers dragging
      the film by friction -- 2-15% of bonds against the routine's 100%.
    * **The pin must be re-aimed every control step.** It holds particles at
      fixed offsets from a *frame*, and a graph only acts between tool calls, so
      without a per-step follow the edge stays pinned in mid-air where it was
      seized.
    * **Through the arm's grasp frame, never the wrist body.** The i2rt YAM's
      grasp site is offset from that body by a translation *and* a quarter turn;
      hand the pin the untwisted quaternion and the seized edge rides along
      rotated out of alignment with the hand carrying it.
    * **No nearest-particle fallback.** A latch that missed its declared set and
      took whatever was closest would seize the middle of a sheet, drag it into
      a heap, and report a fold.

    Args:
        env: The toolkit-layer environment.
        bus: The bus whose owner thread every grab runs on.
    """

    def __init__(self, env, bus: Bus) -> None:
        self.env = env
        self.bus = bus
        self.draggers: dict[str, Any] = {}
        self._sets: dict[str, str] = {}
        self._following = False

    def attach(
        self,
        entity: str = "",
        arm: str = "",
        feature: str = "",
        radius: float = 0.03,
        max_particles: int = 128,
        pin_max_step: float = 0.0005,
    ) -> dict[str, Any]:
        """Seize a deformable's declared feature at one hand and carry it.

        Args:
            entity: Which deformable. Empty takes the task's first, which is the
                only one in every scene that ships today.
            arm: Which hand. Empty takes the work arm -- *not* the first arm
                declared, since the two YAM cells list theirs in opposite orders
                and declaration order names the idle hand on one of them.
            feature: The declared particle set to seize: a towel's edge row, a
                shirt side's strip, a film's handle column. Empty takes the
                whole body, which is right for a cable and wrong for a sheet.
            radius: Miss radius [m]. A candidate further than this from the
                grasp frame is not seized, and ``attached`` comes back false.
            max_particles: Ceiling on the seized count. Size it to the declared
                strip: the default cuts a rim grasp down to a centre patch on a
                garment whose edge row is longer.
            pin_max_step: How far a pinned particle may be moved per substep [m].

        Returns:
            ``attached``, ``n_grabbed``, ``nearest_m``, ``arm``, ``feature``.
            A miss is ``attached`` false with the distance that missed --
            the honest answer to "did the grasp happen", and the one a graph
            routes on rather than lifting against nothing.
        """

        def grab() -> dict[str, Any]:
            from robosimstudio.core.draggers import ParticleDragger

            env = self.env
            name = entity or env.task.deformables[0].name
            body = env.scene.by_name[name]
            arm_name = arm or env.handles.work_arm or next(iter(env.handles.arms))
            if arm_name not in env.handles.arms:
                raise ToolRefusal(f"no arm {arm_name!r}; have {sorted(env.handles.arms)}")

            dragger = self.draggers.get(arm_name)
            if dragger is None:
                dragger = ParticleDragger(
                    env.model,
                    radius=float(radius),
                    max_particles=int(max_particles),
                    mode="pin",
                    pin_max_step=float(pin_max_step),
                )
                self.draggers[arm_name] = dragger
                env.pipeline.hooks.post_solve.append(dragger.apply)
                if not self._following:
                    env.post_step_hooks.append(self._follow)
                    self._following = True
                env.pipeline.invalidate_graph()
            dragger.radius = float(radius)

            self._sets[arm_name] = str(feature)
            candidates = body.set_indices(feature) if feature else body.particles
            position, quat = env.arm(arm_name).ee_pose(env.state)
            seized = int(dragger.grab(env.state, position, quat, candidates=candidates, fallback_nearest=False))
            return {
                "attached": bool(seized),
                "n_grabbed": seized,
                "nearest_m": float(dragger.last_distance),
                "arm": arm_name,
                "entity": name,
                "feature": str(feature),
            }

        return self.bus.call(grab)

    def detach(self, arm: str = "") -> dict[str, Any]:
        """Let go. Harmless if nothing was held; empty ``arm`` releases every hand.

        Ordering is the caller's business and it is measured: release before the
        withdrawal, because a latch still on while the hand lifts takes the
        sheet with it.
        """

        def let_go() -> dict[str, Any]:
            names = [arm] if arm else list(self.draggers)
            for name in names:
                dragger = self.draggers.get(name)
                if dragger is not None:
                    dragger.release()
            return {"released": True, "arms": names}

        return self.bus.call(let_go)

    def _follow(self, env) -> None:
        """Re-aim each pin at its own hand. Every control step, owner thread."""
        for arm_name, dragger in self.draggers.items():
            if not dragger.active:
                continue
            position, quat = env.arm(arm_name).ee_pose(env.state)
            dragger.set_target(position, quat)


class GoalCursor:
    """Which of a placing task's goals is outstanding, and giving up on one.

    A sorting or packing problem is a *conjunction*, so a workflow that runs
    pick-transport-place once solves a single-goal variant and leaves an
    eight-goal one at 0.125. What turns one workflow into a loop over a whole
    suite is this: the goal tree, read against the evaluator's current verdict,
    answered as "work on this object, put it there".

    **Satisfaction is read from the evaluator, never recomputed.** The evaluator
    is authoritative about whether a goal is met -- a cursor that re-derived
    containment could disagree with the verdict the episode is actually scored
    on, and then a graph would place an object, be told it had not, and place it
    again. The metric key comes from :func:`~robosimstudio_bench.goals.goal.about_key`,
    which is also what the binder writes it with. Hard-coding that shape is how
    a shipped registry once spent a whole rollout concluding no goal was ever
    satisfied: it looked for a key the evaluator had stopped emitting, found
    nothing, re-attempted the same tool until the episode truncated, and raised
    nothing at all.

    **The pair is the containment clause's, and doneness is too.** Both are
    choices, and each has an alternative that a different document shape would
    want:

    * *The pair.* A goal here names a labelled **region** -- a compartment of a
      bin, a basket's cavity -- so the destination is the region the containment
      clause measures, and a graph aims at it with ``sim.get_region_obb``. A
      document whose goals instead name a destination **body** (an item must
      come to rest against *that tote*, and one shared cavity is where every
      item's containment is checked) states the pair on its ``contact-force``
      clause, and would need ``placements(..., atom="contact_force")`` and an
      object name in the payload rather than a region. That is a real
      difference and not a parameter: the two answers go to different tools.
    * *Doneness.* Containment, even where an object's goal is three clauses.
      Containment is monotone as an object descends into a container, where the
      contact force only appears once it lands -- so a cursor waiting for the
      force would keep re-picking something it had already dropped in.

    Attributes:
        given_up: Objects abandoned this episode. Episode-scoped because the
            connector -- and with it this object -- is rebuilt per episode by
            :meth:`~robosimstudio_policy_agent.graph_solution.SolutionGraph.reset`.
            Held here rather than threaded through the graph because a subgraph
            re-entered by a loop edge starts with a fresh scope: there is
            nowhere in a workflow for "the ones I have already failed on" to
            live.
        attempts: Passes charged against each goal, for :data:`MAX_ATTEMPTS`.
    """

    MAX_ATTEMPTS = 2
    """Passes at one goal before it is abandoned.

    The livelock this prevents is specific and does not look like a failure: an
    object is transported, released over its destination, bounces off a divider
    or a rim and lands outside. Nothing raised, so the graph loops, picks the
    same goal, and does it again -- forever, until the episode truncates with
    every *other* goal untouched. One retry is worth having because a bounce is
    often not repeatable; a third never paid.
    """

    def __init__(self, env, bus: Bus) -> None:
        self.env = env
        self.bus = bus
        self.given_up: set[str] = set()
        self.attempts: dict[str, int] = {}
        self.current: str = ""
        """The goal the loop gate last handed out -- the pass now in flight.

        What :meth:`skip_goal` abandons when its caller names nothing, which a
        failure branch never does: it ran because the pass failed, and the
        object that pass was working on is the one to give up on.
        """

    @property
    def goals(self) -> tuple[tuple[str, str], ...]:
        """``(object, region)`` for every goal, in the document's own order.

        Read off the compiled goal tree, not off a copy beside it. The suite
        this came from read the pairs out of ``TaskSpec.metadata`` first -- a
        copy, hand-written beside the goal that already stated them -- and a
        copy that disagrees with its original produces a policy diligently
        solving a task nobody is scoring.

        Through ``env.goal`` rather than ``env.evaluator.goal``, which is the
        same tree on a single world and the difference between running and not
        on a fleet: a world's connector is built against a ``WorldView``, and a
        view over one world of a wave has no evaluator of its own to reach
        through. Empty for a hand-written evaluator with no tree, which is the
        same answer :func:`placements` gives for a goal that places nothing.
        """
        goal = self.env.goal
        if goal is None:
            return ()
        # Only the objects this episode runs. The goal is already masked to the
        # episode's active set where it is built; a hand-written evaluator's
        # tree is not, and the handles are the authority on what is here.
        objects = self.env.handles.objects
        return tuple((obj, region) for obj, region in placements(goal) if obj in objects)

    def next_goal(self, exclude: Any = None, count_attempt: bool = False) -> dict[str, Any]:
        """The first goal not yet satisfied, in the document's own order.

        Args:
            exclude: Object names to pass over -- what a graph that has already
                failed on one object uses to get on with the rest instead of
                retrying it until the episode truncates. Anything iterable of
                strings, or ``None``.
            count_attempt: Charge this call as an attempt at whatever it
                returns, abandoning the goal once it has had
                :data:`MAX_ATTEMPTS`. Only the loop gate passes this: the other
                nodes in a pass ask the same question again to learn *which*
                object they are working on, and counting those would abandon
                every goal on its first pass.

        Returns:
            ``object_name`` and ``region_name`` for the goal to work on and
            ``done`` false; or empty names and ``done`` true when every goal is
            satisfied or abandoned. ``remaining`` counts the outstanding ones,
            so a graph can report progress without asking twice, and ``attempt``
            says which pass at this goal the episode is on (1-based) -- what a
            node varies its strategy over, the way ``tool_sort``'s grasp yaw
            alternates on it.
        """
        skip = set(exclude or ()) | self.given_up
        satisfied = self._satisfied()
        outstanding = [(obj, region) for obj, region in self.goals if not satisfied.get((obj, region), False)]
        if count_attempt:
            self.current = ""
        for obj, region in outstanding:
            if obj in skip:
                continue
            if count_attempt:
                self.attempts[obj] = self.attempts.get(obj, 0) + 1
                if self.attempts[obj] > self.MAX_ATTEMPTS:
                    self.given_up.add(obj)
                    continue
                self.current = obj
            return {
                "object_name": obj,
                "region_name": region,
                "remaining": len(outstanding),
                "done": False,
                "attempt": int(self.attempts.get(obj, 0) or 1),
            }
        return {"object_name": "", "region_name": "", "remaining": len(outstanding), "done": True, "attempt": 0}

    def skip_goal(self, object_name: str = "") -> dict[str, Any]:
        """Abandon one goal for the rest of the episode.

        What a graph calls when a grasp or a transport failed: the alternative is
        retrying the same one until the episode truncates, which on an
        eight-goal variant means one ungraspable object costs the other seven.
        Several ``tool_sort`` variants ship a deliberately impossible tool -- the
        utility knife is 10.8 mm thick against fingers that reach the bin floor
        first -- so giving up on one and getting on with the rest is the
        behaviour that scores them honestly.

        Args:
            object_name: Which to abandon. Empty abandons the goal the loop
                gate last handed out (:attr:`current`) -- the pass that just
                failed, which is the caller a failure branch is -- and falls
                back to whichever :meth:`next_goal` would return only when no
                gate call preceded it.

        The fallback used to be the whole rule, and it abandoned the wrong
        object whenever the failed pass had left its own goal satisfied: the
        shipped ``tool_sort/gt`` failure branch opens the hand *before* it
        gives up, a carry that failed short of the compartment drops the object
        into it, and the first outstanding goal at give-up time is then a
        never-attempted one. Measured on the level-1 sorting tier: 14 of 27
        attributed losses across 16 scenes were objects abandoned without a
        single attempt, each on the pass of a different object.
        """
        if not object_name:
            object_name = self.current or str(self.next_goal()["object_name"])
        if object_name:
            self.given_up.add(object_name)
        return {"object_name": object_name, "given_up": sorted(self.given_up)}

    def _satisfied(self) -> dict[tuple[str, str], bool]:
        """``(object, region) -> bool``, from the goal's containment clauses.

        Keyed by the pair rather than by the object, because a document is
        entitled to name one object twice -- and the containment clause alone,
        because a goal that groups three clauses per object (landed, at rest,
        in the right place) states the pair on exactly one of them. Reading
        every clause with two operands instead would also pick up
        ``contact-force object bin2``, which is a *different* pair and would
        never match a goal, so it is filtered here rather than relied on to
        miss.

        Through ``env.goal`` for the reason :attr:`goals` gives.
        """
        goal = self.env.goal
        if goal is None:
            return {}
        metrics = self.bus.snapshot.info.get("metrics") or {}
        return {
            (operands[0], operands[1]): bool(metrics.get(about_key(name, operands), False))
            for leaf in leaves(goal)
            for name, operands in (leaf.about,)
            if name == "containment" and len(operands) >= 2
        }


# ---------------------------------------------------------------- wire types
# gap's types are TypedDicts of plain floats, not arrays: a tool that hands back
# a numpy array serialises fine in process and fails the moment the same graph
# is pointed at an RPC tool bundle. Coercing here keeps that difference from
# ever being the thing under test.
````
