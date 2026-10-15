# GaP 固定版本原始文件读取缓存

标准提取器不支持 tgz；按成员路径逐字解码 UTF-8，未摘要。代码核查范围在来源页说明。

## README.md

````text
<div align="center">

# Graph-as-Policy
<h3 align="center">
  <strong>🧪 BETA CODE RELEASE</strong> | <em>Beta</em> | July 1, 2026
</h3>



**The graph is the policy.**
GaP targets *Variational Automation* — tasks a robot must perform persistently
and reliably across many varying instances (objects vary in geometry and pose),
not just solve once. It compiles a natural-language task into a typed, verified
computation graph of modular skills, self-improves it in simulation, and runs
the graph — not a black-box policy — on simulators and real robots.

[![License: Apache 2.0](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-blue.svg)](pyproject.toml)
[![Skills: open-robot-skills](https://img.shields.io/badge/skills-open--robot--skills-orange.svg)](https://github.com/graph-robots/open-robot-skills)
[![Docs](https://img.shields.io/badge/docs-quickstart-0f766e.svg)](https://graph-robots.github.io/graph-as-policy/getting-started/quickstart.html)

![GaP on real robots — grocery packing, popcorn, tool packing, USB-C insertion](docs/assets/real_robots_strip.gif)

<sub>GaP running on real robots — graphs generated from natural-language
tasks, refined in sim, executed on hardware. Left→right: grocery packing
(Franka, 10×), popcorn (long-horizon stove manipulation, 16×), tool & charger
packing into tagged bins, and USB-C insertion (UR5 with force feedback).</sub>

</div>

```python
import gap

conn   = gap.connector.sim("libero", task="libero_object/0")
result = gap.execute("examples/libero_quickstart/graph", conn)
graph  = gap.agent.generate_sync("pick the soup can and put it in the basket")
print(graph)                  # the policy, as a graph
gap.viz.serve("outputs")      # browse the recorded trial
```

Skills live in the sibling
[**open-robot-skills**](https://github.com/graph-robots/open-robot-skills)
repo (Anthropic Agent Skills format, contributable) and are discovered
by path — clone the two repos side by side and every command finds them.

## Quickstart

**Requirements:** **1× NVIDIA RTX 4090 (≥24 GB VRAM, Linux + EGL)**, an
LLM API key (OpenRouter / Vertex), and
[uv](https://docs.astral.sh/uv/). First run downloads ~3.5 GB of model
weights; the gated SAM3 weights are part of the default perception path,
so in practice you also need `HF_TOKEN` (a free
[HuggingFace token](https://huggingface.co/settings/tokens) with SAM3
access) before the first run.

```bash
git clone --recurse-submodules https://github.com/graph-robots/graph-as-policy.git
#   ^ submodules are required (vendored sim stack) — if you already cloned
#     plain, run: git submodule update --init --recursive
git clone https://github.com/graph-robots/open-robot-skills.git    # sibling, auto-discovered
cd graph-as-policy
uv sync                                  # engine + LIBERO sim (now baseline)
# `uv sync --extra vertex` instead if you'll use --provider vertex for codegen
uv run gap skills install --all          # per-bundle venvs (sam3, cuRobo, vlm, …)
#   --all includes the heavyweight learned-policy bundles; for one example,
#   `gap skills install --workflow <graph-dir>` installs just what it uses

export HF_TOKEN=...                      # for the gated SAM3 weights
uv run gap skills check --download       # weight prefetch (SAM3 + GDINO) + capability gate

# Pick one LLM provider for codegen + the in-graph VLM. openrouter is the
# default; for vertex, see `docs/source/authoring/llm-providers.md`.
export OPENROUTER_API_KEY=...
MUJOCO_GL=egl uv run gap run examples/libero_quickstart/graph \
  --sim libero_object_all_variance/0
uv run gap viz                           # browse the trial at localhost:9432
```

See the **[15-minute tour](https://graph-robots.github.io/graph-as-policy/getting-started/quickstart.html)**
for the full walkthrough (clone → run → generate → trace).

## Examples

| Example | What it shows |
|---|---|
| [libero_quickstart](examples/libero_quickstart/) | Hero: vision → OBB grasp → transport, ground-truth verified |
| [grocery_packing](examples/grocery_packing/) | Pack every item with a loop: a graph with a real backward edge |
| [generate_a_graph](examples/generate_a_graph/) | Instruction → validated workflow dir; all LLM providers |
| [build_a_graph](examples/build_a_graph/) | Full Python authoring with `gap.builder`: checkpoints, recovery |
| [agent_quickstart](examples/agent_quickstart/) | Claude Code + one skill: sentence → graph → sim success |
| [grocery_fulfillment](examples/grocery_fulfillment/) | Flagship acceptance family; graphs LLM-generated per task |
| [benchmark](examples/benchmark/) | Grid harness: smoke → posvar → release gate |
| [steered_policy](examples/steered_policy/) | Perceive + hover, then hand to a learned VLA policy |
| [collect_and_train](examples/collect_and_train/) | Graph as scripted expert → dataset → train → policy node |
| [cable_ur](examples/cable_ur/) | Real UR + ZED perception (motion-disabled) |
| [real_franka_pick_place](examples/real_franka_pick_place/) | Real Franka pick-place via robots_realtime |

Full gallery with install needs and time estimates in
**[examples/README.md](examples/README.md)**. Real-robot examples
— read [docs/safety.md](docs/safety.md) first.

## Documentation

Full docs site: **<https://graph-robots.github.io/graph-as-policy/>**

- [Quickstart (15-min tour)](https://graph-robots.github.io/graph-as-policy/getting-started/quickstart.html) — clone → run → generate → trace
- [Runtime & schema](https://graph-robots.github.io/graph-as-policy/reference/workflow-schema.html) — workflow JSON, executor semantics, checkpoints
- [Skill authoring](https://graph-robots.github.io/graph-as-policy/skills/authoring-bundles.html) — Agent Skills format, `gap.requires:` frontmatter
- [LLM providers](https://graph-robots.github.io/graph-as-policy/authoring/llm-providers.html) — openrouter / vertex
- [Skill registries](https://graph-robots.github.io/graph-as-policy/skills/registries.html) — `--skills`, `$GAP_SKILLS_PATH`, `gap registry …`
- [CLI reference](https://graph-robots.github.io/graph-as-policy/reference/cli.html) — every `gap` verb
- [Safety](https://graph-robots.github.io/graph-as-policy/real-robots/safety.html) — required reading before any real-robot example

## Use with Claude Code & AI agents

GaP ships an agent skill ([`agent/`](agent/)) that teaches AI coding
agents the workflows above:

```bash
claude plugin marketplace add graph-robots/graph-as-policy
claude plugin install gap@gap
```

Then ask: *"what can this robot do right now?"*, *"run the quickstart graph
in sim"*, *"generate a graph that packs the groceries"*, *"why did this
trial fail?"*. Real-robot commands are gated on explicit human
confirmation. Other agents (Cursor, Codex, …) and the no-install path:
[agent/INSTALL.md](agent/INSTALL.md).

## License & attribution

graph-as-policy and open-robot-skills are Apache-2.0-licensed; they stand on third-party
work — LIBERO/LIBERO-PRO, Variational-Automation-Benchmark, robosuite,
robots_realtime, pyroki, SAM3, Grounding DINO, and (optionally) NVIDIA
cuRobo. Full attribution table: **[NOTICE.md](NOTICE.md)**.

````

## docs/source/developers/architecture.md

````text
# Architecture

How GaP is put together and why: the principles behind the engine, a map of
its modules, the design decisions contributors most often ask about, the
acceptance gates that defined the v1 release, and how the project is
packaged. This page adapts the release design doc
([docs/design.md](gh-engine:docs/design.md)) for a public audience; for the
user-facing vocabulary (graph, node, tool, skill, connector, checkpoint,
trace) start with [Concepts](../getting-started/concepts.md).

## Principles

GaP is a port of a working research codebase, restructured around five
explicit principles:

- **As easy to use as a Python library.** `pip install`, four lines of
  Python, and an LLM API key. The quickstart needs zero self-hosted servers
  and zero extra terminals.
- **In-process by default.** The simulator, the vision models, and IK all
  run in one Python process. Ray is an opt-in extra for scale-out
  benchmarking — never a prerequisite.
- **Plain Python, no protos.** gRPC and protobuf were deleted everywhere.
  Typed dicts + numpy arrays are the data contract. The only wire protocol
  left in the system is the msgpack bridge to real robots.
- **Two repos.** The engine ([graph-as-policy](gh-engine:.)) and the
  contributable skill library ([open-robot-skills](gh-skills:.), in the
  Anthropic Agent Skills format) are separate repos. Skills are discovered
  by filesystem path, not by pip entry points — see
  [Skill registries](../skills/registries.md).
- **Minimum viable abstraction.** Working code was ported with seam changes,
  not rewritten around speculative interfaces. There is no plugin system
  where a function call suffices, and no pluggable backend where one
  implementation is enough (the connector's IK is a deliberate example).

## The two repos

```text
┌────────────────────────── gap (engine) ──────────────────────────┐
│ agent/      instruction ─► coordinator ─► subgraph agents        │
│             ─► checkpoint agent ─► validate / fix ─► graph       │
│ runtime/    executor (super-steps, streaming, Send), validator,  │
│             tracing, policy loop, verify/ (World, checkpoints)   │
│ tools/      ToolRegistry: typed schemas, tags→guards, dispatch   │
│ connector/  sim()/real(), in-process pyroki IK, rr_launcher,     │
│             data collector                                       │
│ envs/       libero (+perturbed), franka_real, ur_zed, msgpack    │
│ benchmark/  grid harness (modes × families × seeds), --gate      │
│ viz/        FastAPI+React trial browser, replay3d, PDF render    │
└──────────────┬───────────────────────────────▲───────────────────┘
               │ discovers (by path)           │ registers tools
        ┌──────▼───────────────────────────────┴──────┐
        │ open-robot-skills (Agent Skills format)     │
        │ tools/   sam3, grounding-dino, gemini-er,   │
        │          molmo, vlm, curobo, geometry       │
        │ skills/  perceiving-objects(+variants),     │
        │          grasping-*, transporting-objects,  │
        │          tracking-objects, pi05-libero,     │
        │          molmoact-libero                    │
        └─────────────────────────────────────────────┘
```

Three flows cross this boundary:

- **execute** — graph + connector + skills → `ExecutionResult` + trace
  ([Executing graphs](../running/execution.md))
- **generate** — instruction + skill catalog → validated workflow directory
  ([Generating graphs](../authoring/generation.md))
- **benchmark** — config → grid of generate/execute cells → summary + videos
  ([Benchmarking](../benchmarks/benchmarking.md))

The dependency is one-way: open-robot-skills bundles import GaP's stable
authoring surface (`gap.NodeContext`, `gap.types`, `gap.errors`,
`gap.skills`, `gap.testing`); the engine never imports the skills repo — it
discovers bundle directories on disk and loads them.

## Module map

- **[gap/agent/](gh-engine:gap/agent)** — the LLM generation pipeline: a
  coordinator agent decides the subgraph topology, per-subgraph agents write
  the state machines and inline scripts, a checkpoint agent authors
  postcondition predicates, and a script-fix loop (≤2 attempts) repairs
  validation errors. `llm.py` is the provider layer (`openrouter` default,
  `vertex`) for generation — the runtime `vlm` tool bundle
  carries its own equivalent provider config (`GAP_VLM_*`); `launcher.py` and
  `parallel.py` run generate/execute trials (including the benchmark's
  multiprocess worker pool). See [Generating graphs](../authoring/generation.md)
  and [LLM providers](../authoring/llm-providers.md).
- **[gap/runtime/](gh-engine:gap/runtime)** — the execution engine:
  `workflow.py` (strict v3 schema parsing), `validate.py` (structural and
  type rules), `executor.py` (the super-step scheduler), `context.py`
  (`NodeContext`, the whole skill-facing surface), `tracing.py`,
  `observation_stream.py`, the policy loop (`policy.py`,
  `policy_manager.py`, `policy_presets.py`), and `verify/` (the
  `World`/`Body`/`Robot` predicate vocabulary behind checkpoints). See the
  [executor reference](../reference/executor.md).
- **[gap/tools/](gh-engine:gap/tools)** — the `ToolRegistry`: the `@tool`
  decorator, schema extraction from type hints, name-collision rejection,
  dispatch, and `guards.py` (tag-based call-count limits).
  `ray_executor.py` holds the opt-in `@ray.remote` wrappers.
- **[gap/connector/](gh-engine:gap/connector)** — the embodiment layer:
  `sim()` / `real()` factories, the `Connector` base class, in-process
  pyroki IK (`ik.py`), the robots_realtime session launcher
  (`rr_launcher.py`), the HDF5 data collector (`collector.py`), and the
  world-snapshot adapter checkpoints evaluate against.
- **[gap/envs/](gh-engine:gap/envs)** — concrete environments behind a lazy
  registry: LIBERO (plus the perturbed variant), the real Franka env, the
  UR+ZED env, and the msgpack bridge real robots speak. Factories are
  dotted paths, so importing the registry never pulls in mujoco or pyzed.
- **[gap/benchmark/](gh-engine:gap/benchmark)** — the grid harness:
  config/family expansion (`modes × families × variations × task_ids ×
  seeds`), per-cell launch, report math, and the `--gate` / `--resume`
  machinery. See [Benchmarking](../benchmarks/benchmarking.md).
- **[gap/viz/](gh-engine:gap/viz)** — the FastAPI + React trial browser
  (`gap viz`), the swimlane graph builder, the 3D replay (viser), and
  `render.py` (graph → PDF/PNG). The pre-built frontend ships in the wheel
  (see [Packaging](#packaging)).
- **[gap/cli/](gh-engine:gap/cli)** — one module per subcommand with
  lazy-import dispatch, so `gap --help` and `gap skills list` work on a
  bare install without importing heavy dependencies. See the
  [CLI reference](../reference/cli.md).
- **[gap/builder/](gh-engine:gap/builder)** — the Python authoring API
  (`Workflow`/`Subgraph`); it emits the identical on-disk artifact the LLM
  pipeline produces, through the same validation. See
  [The builder API](../authoring/builder.md).
- **[gap/skills/](gh-engine:gap/skills)** — registry resolution and
  precedence, SKILL.md frontmatter parsing, the `Skill` base class for
  stateful bundles, prompt loading, and the capability probes behind
  `gap check`.
- **[gap/testing/](gh-engine:gap/testing)** — the public test fixtures,
  exported for bundle authors and engine contributors alike: `FakeContext`,
  `ToolCallRecord`, `make_test_observation`, `assert_graph_valid`. See
  [Testing bundles](../skills/testing-bundles.md).

Three top-level modules round out the package: `types.py` (the data
vocabulary), `schema.py` (the type-name registry), and `errors.py` (the
`PipelineError` hierarchy).

## Key design decisions

### A data vocabulary instead of protos

[gap/types.py](gh-engine:gap/types.py) replaces the old protobuf message
definitions with numpy-first TypedDicts: `Se3Pose`, `OrientedBoundingBox`,
`CameraFrame` (rgb `u8[H,W,3]`, depth `f32[H,W]` in meters, intrinsics
`f64[3,3]`), `Mask`, `PointCloud`, `JointState`, `Trajectory`, `ArmState`,
`Observation`, `WorldConfig`, `GraspCandidates`. Nothing is byte-packed
in-process; conversions from simulator buffers happen once, inside the env
classes. Two conventions are load-bearing:

- **Quaternions are wxyz, scalar-first.** LIBERO's xyzw is converted at the
  env boundary, nowhere else.
- **`ArmState.proprio_state` is policy-training-exact** — its layout matches
  what learned policies were trained on and is never transformed.

[gap/schema.py](gh-engine:gap/schema.py) maps the type-name strings used by
subgraph `inputs:`/`outputs:` declarations to these definitions; the
validator and the viz frontend consult it instead of proto descriptors.

### One dispatch surface for tools

Every callable a graph can reach is registered in the `ToolRegistry` and
dispatched by name — `ctx.tool(name, **kwargs)` from scripts, or `type:
tool` nodes in the graph. The `@tool` decorator extracts typed schemas from
type hints; the same schemas drive validation and the LLM's tool catalogs,
so the model sees exactly what the validator enforces. Names are
namespaced: `robot.*`/`sim.*` are reserved for connectors, `<model>.<func>`
(e.g. `curobo.plan_to_pose`, `sam3.segment_text`) for tool bundles; the
loader rejects collisions.

Safety guards hook this single dispatch point: tools carry tags
(`perception`, `planning`, `sim_step`), and per-tag call-count limits —
from `safety_limits` in a task config or `GAP_MAX_*` environment variables
— decrement on every call. `GuardLimitExceeded` subclasses `BaseException`
on purpose, so a skill's `except Exception` cannot swallow it. Ordinary
failures are `PipelineError` subclasses (`PerceptionFailed`,
`PlanningFailed`, `GraspFailed`, …), which the executor wraps and routes
through subgraph `on_error` edges.

### The connector is the embodiment

A graph never talks to MuJoCo or a robot driver directly. The
[connector](../real-robots/connectors.md) owns the environment (sim) or the
robot link (real), and registers the `robot.*`/`sim.*` tools that form the
embodiment surface — the same tool names whether the body is LIBERO or a
physical Franka (see the
[connector tools reference](../reference/connector-tools.md)). Inverse
kinematics is built into the connector (pyroki, JAX on CPU, always
in-process) — deliberately not pluggable. Motion *planning* is a separate
concern: the `curobo` tool bundle produces collision-aware trajectories
that skills execute via `robot.execute_trajectory`. All motion tools take
`arm_id=0`, leaving the door open for multi-arm support post-v1.

### Super-step execution

The executor is a frontier scheduler: each super-step runs every ready node
concurrently, collects results, routes conditional edges on exit values,
and advances the frontier. Subgraphs execute recursively with their own
input bindings and `on_error` routing; streaming nodes publish snapshots
that downstream nodes consume via `$ref`; `Send` fan-out launches dynamic
parallel branches from router nodes; a node-visit cap guards against
runaway cycles; and `end` nodes can carry best-effort recovery tool calls
(open the gripper, go home). The semantics are specified in the
[executor reference](../reference/executor.md) and the
[workflow schema](../reference/workflow-schema.md).

### The trace is a stability guarantee

Tracing is on by default — the trace is the product, not a debug flag.
Every run writes `workflow.json`, `dag_trace.json`, and `node_data/<id>/`
with per-node inputs/outputs and extracted PNG/NPZ assets
([Traces](../running/traces.md)). This on-disk layout is one of the
project's two declared stability guarantees (the other is the
skill-authoring import surface): `gap viz`, `gap trace-diff`, and users'
own tooling depend on it, the deterministic tracing tests pin it, and
changes to it require a migration note — see
[Contributing](contributing.md).

## Release gates

v1 was defined by four acceptance gates, and the first remains the
regression bar for every release:

- **G1 — Grocery fulfillment gate.** `gap benchmark` in `llm_generation`
  mode on the grocery-fulfillment suites must clear the config's
  `gate_threshold`, with CuRobo motion planning and the
  grasping/transport skills in the prompt.
  The pinned config is
  [examples/benchmark/grocery_acceptance.yaml](gh-engine:examples/benchmark/grocery_acceptance.yaml);
  `gap benchmark --gate` exits non-zero below threshold.
- **G2 — Correct generation.** `gap.agent.generate` on grocery-fulfillment
  instructions produces graphs that pass the equivalence suite and execute
  to success — the *generated* code clears G1, not just hand-written
  graphs.
- **G3 — Steered policy works.** The hover-then-handover example (perceive
  → approach above the target → hand control to a learned policy) runs end
  to end — see [Steered policy](../examples/steered-policy.md).
- **G4 — Quickstart is one command** on the stated hardware floor: **1×
  NVIDIA RTX 4090 (≥24 GB VRAM) + Linux + EGL**, an LLM API key, the two
  repos cloned side by side, and a one-time multi-GB model-weight download
  on first use (`HF_TOKEN` for the gated SAM3 weights). The floor is stated
  up front — no pretending it runs on a laptop CPU.

## Packaging

- **Distribution `graph-as-policy`, import `gap`**, console script `gap`,
  Python ≥ 3.10, MIT license.
- **Core dependencies are lean** — numpy/scipy, FastAPI/uvicorn, httpx (the
  OpenRouter / OpenAI-compatible LLM client), pyroki + JAX (CPU) for
  in-process IK, msgpack, imaging libraries. No grpcio, no protobuf, no torch
  in core.
- **Extras** gate the heavy stacks: `[libero]` (MuJoCo/robosuite/the posvar
  LIBERO fork — `mujoco==3.6.0` is pinned exactly because the acceptance
  numbers were measured on it), `[ray]`, `[real]`, `[vertex]`, `[policy]`,
  plus meta-extras `[quickstart]`, `[grocery]`, and `[all]` that span both
  repos. open-robot-skills mirrors this with one extra per bundle. See
  [Installation](../getting-started/installation.md).
- **uv-first.** The committed `uv.lock` pins the exact environment the
  measured results were produced on; `[tool.uv.sources]` resolves the
  vendored submodules and the side-by-side open-robot-skills checkout. pip
  is supported with the submodules named explicitly.
- **The viz frontend ships pre-built.** `gap/viz/frontend/dist/` is checked
  into the repo and included in the wheel as package data, so pip users get
  `gap viz` without Node. CI asserts the wheel contains `dist/` and leaks
  no `frontend/src/` or `node_modules` — see
  [Contributing](contributing.md#what-ci-enforces).
- **Pinned submodules** under `third_party/`: robots_realtime, the
  Variational-Automation-Benchmark fork, robosuite, and LIBERO-PRO.

## Where next

- [Contributing](contributing.md) — dev setup, test markers, what CI
  enforces
- [Roadmap](roadmap.md) — the v1 line and the named post-v1 cuts
- [Workflow schema](../reference/workflow-schema.md) and
  [executor semantics](../reference/executor.md) — the normative specs
- [Authoring bundles](../skills/authoring-bundles.md) — extending the
  skills repo instead of the engine

````

## docs/source/reference/workflow-schema.md

````text
# Workflow JSON Schema

This page is the reference for the v3 `workflow.json` format — the on-disk
representation of a GaP graph. The loader lives in
[gap/runtime/workflow.py](gh-engine:gap/runtime/workflow.py) and the
structural validator in
[gap/runtime/validate.py](gh-engine:gap/runtime/validate.py). For how a
loaded graph actually runs, see [Executor Semantics](executor.md).

A GaP workflow is a **dual control/data graph of subgraphs**. The top level
is a DAG-with-loops of `subgraph` and `end` nodes wired by edges and
conditional edges; each subgraph is a self-contained inner graph of
`tool` / `script` / `router` / `noop` nodes with the same edge vocabulary,
declared typed inputs/outputs, and a small set of typed exit conditions.
Control flow — loops, retries, fallbacks — is expressed entirely as edges
between subgraphs routed on exit conditions. There are no retry counters,
no `branch_on` constructs, and no magic strings.

Data flows two ways:

- **Inside a subgraph** — tagged-object references
  (`{"$ref": "node.field.subfield"}`) pull values from upstream node outputs.
- **Across subgraphs** — by **output name**: a subgraph declares typed
  `inputs`, and at entry each input binds to the most recent upstream
  subgraph that declared an output of the same name.

Values on the wire are plain Python: TypedDicts from `gap.types` and numpy
arrays. There is no in-process serialization layer; the schema's type-name
strings (`"OrientedBoundingBox"`, `"PointCloud"`, …) resolve through the
`gap.schema` registry, and node I/O schemas come from Python type-hint
introspection.

## Top-level workflow.json

```json
{
  "version": 3,
  "meta": {"name": "pick_and_place", "description": "..."},
  "nodes": {
    "target":    {"type": "subgraph", "ref": "target_sg"},
    "grasp":     {"type": "subgraph", "ref": "grasp_sg"},
    "transport": {"type": "subgraph", "ref": "transport_sg"},
    "done":      {"type": "end", "status": "success"},
    "abort":     {"type": "end", "status": "failure",
                  "recovery": [{"tool": "robot.open_gripper"},
                               {"tool": "robot.go_home"}]}
  },
  "edges": [["START", "target"]],
  "conditional_edges": {
    "target":    {"router_field": "exit",
                  "mapping": {"found": "grasp", "not_found": "abort"}},
    "grasp":     {"router_field": "exit",
                  "mapping": {"grasped": "transport", "failed": "abort"}},
    "transport": {"router_field": "exit",
                  "mapping": {"placed": "done", "blocked": "abort"}}
  },
  "subgraphs": {
    "target_sg":    { "...": "SubgraphDef" },
    "grasp_sg":     { "...": "SubgraphDef" },
    "transport_sg": { "...": "SubgraphDef" }
  }
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `version` | int | yes | Must be `3`. |
| `meta` | object | no | Free-form strings. `name`/`description` recommended; `observation_stream_hz` is consumed by the executor (see [Observation stream](executor.md#observation-stream)). |
| `nodes` | object | yes, non-empty | Node name → NodeDef. Names `START`/`END` are reserved. |
| `edges` | list of `[src, dst]` | no | Static edges. Multiple outgoing edges from one node = parallel fan-out in the same super-step. |
| `conditional_edges` | object | no | Source node → `{router_field, mapping}` ([Conditional edges](#conditional-edges)). |
| `subgraphs` | object | no | Name → SubgraphDef. Top level only — subgraphs do not nest. |

Unknown keys anywhere are a hard load-time error (strict-key parsing).

:::{note}
Legacy v2 constructs are rejected with targeted migration messages:

- node types `service`/`skill`/`policy` — rewrite as `type: "tool"` with a
  flat dispatch name;
- recovery entries with `service`/`method` keys — rewrite as
  `{"tool": ..., "inputs": ...}`;
- the retired `exit.values` key — split into `success_values` + `on_error`.
:::

## Subgraph definition (SubgraphDef)

```json
{
  "skill": "perceiving-objects",
  "inputs":  {"target_obb": "OrientedBoundingBox"},
  "outputs": {"target_obb": {"$ref": "filter_obb.obb"}},
  "nodes": {
    "observe":    {"type": "tool", "tool": "robot.get_observation"},
    "perceive":   {"type": "script", "script": "scripts/target_sg/perceive.py",
                   "inputs": {"observation": {"$ref": "observe"},
                              "object_name": "alphabet soup"}},
    "filter_obb": {"type": "tool", "tool": "geometry.filter_and_compute_obb",
                   "inputs": {"points": {"$ref": "perceive.points"}}},
    "found":      {"type": "noop"}
  },
  "edges": [["START", "observe"], ["observe", "perceive"],
            ["perceive", "filter_obb"], ["filter_obb", "found"],
            ["found", "END"]],
  "conditional_edges": {},
  "exit": {"router_field": null, "success_values": ["found"]},
  "on_error": "not_found"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `skill` | string | yes | Owning skill bundle (legacy key `agent` is accepted as an alias). Scripts in this subgraph import under the bundle's synthetic package, which enables `load_prompt`. |
| `inputs` | object | no | `{name: type-name string}`. Type names resolve through the `gap.schema` registry. Referenced inside as `{"$ref": "in.<name>"}`. |
| `outputs` | object | no | `{name: {"$ref": ...}}` bindings from internal node fields to declared output names. |
| `nodes` / `edges` / `conditional_edges` | — | yes / no / no | Same shape as the top level. Valid inner node types: `tool`, `script`, `router`, `noop`. A node named `in` is rejected (reserved). |
| `exit` | object | yes | `{router_field, success_values}` — see [Exit declaration](#subgraph-exit-declaration). |
| `on_error` | string | no | The single failure exit value — see [the on_error failure exit](#the-on_error-failure-exit). |
| `stage` | string | no | Canonical pick-and-place stage tag; ignored by the runtime. |

## Node definition by type (NodeDef)

| Field | `tool` | `script` | `router` | `subgraph` | `noop` | `end` |
|---|---|---|---|---|---|---|
| `tool` (flat dispatch name) | **required** | — | — | — | — | — |
| `script` (path relative to workflow dir) | — | **required** | **required** (routing function) | — | — | — |
| `ref` (subgraph name) | — | — | — | **required** | — | — |
| `inputs` | yes | yes | yes | yes | yes | yes |
| `streaming` | yes | yes | — | — | — | — |
| `status` (`"success"`/`"failure"`) | — | — | — | — | — | **required** |
| `recovery` (list of ToolCalls) | — | — | — | — | — | optional |

- **`tool`** — dispatches the flat name through the `ToolRegistry`:
  connector tools (`robot.get_observation`, `sim.check_success`), tool-bundle
  functions (`sam3.segment_box`, `geometry.iou`), or a callable skill bundle
  registered under its own name (`pi05-libero.run`). Returns whatever
  the tool returns. See [Connector Tools](connector-tools.md) for the
  `robot.*`/`sim.*` surface.
- **`script`** — imports the Python file and calls its typed
  `run(ctx: NodeContext, ...) -> Output` function, where `Output` is a
  TypedDict (or `None`). Resolved workflow inputs not in the `run()`
  signature are dropped with a warning; declared output keys missing from
  the returned dict are an execution error.
- **`router`** — runs its script like a script node, but the returned dict
  must carry a `route` key: a **string** (static dispatch — looked up in the
  node's `conditional_edges` mapping) or a **list** of `{"to", "inputs"}`
  dicts ([Send fan-out](executor.md#send-dynamic-fan-out)).
- **`subgraph`** — top level only; recurses into the referenced SubgraphDef
  ([Subgraph node execution](executor.md#subgraph-node-execution)).
- **`noop`** — a passthrough marker with empty output; used as a named
  subgraph terminal (success exit) when `exit.router_field` is null.
- **`end`** — top level only; terminates the workflow with `status`, after
  running its `recovery` tool calls best-effort
  ([End nodes and recovery](executor.md#end-nodes-and-recovery)).

The `streaming: true` flag is valid only on `tool` and `script` nodes; it
marks the node as a detached producer that publishes snapshots via
`ctx.publish` and is consumed via `$ref`
([Streaming nodes](executor.md#streaming-nodes)).

### Recovery ToolCall

```json
{"tool": "robot.open_gripper", "inputs": {}}
```

Recovery actions live outside the node-dispatch system: a short list of
best-effort tool calls run when the workflow lands on an end node. `tool` is
the same flat dispatch namespace as `type: tool` nodes; `inputs` are literal
values (no `$ref` resolution). Failures are logged and never raise.

## Conditional edges

```json
"conditional_edges": {
  "grasp": {"router_field": "exit",
            "mapping": {"grasped": "transport", "failed": "abort"}}
}
```

| Source node type | `router_field` | Dispatch value |
|---|---|---|
| `router` | must be `null` | the routing function's returned `route` string |
| `subgraph` | `"exit"` (aliased to the reserved `_exit` output key) | the subgraph's exit value |
| any other | required string | that field of the source node's output |

The resolved value must be a key in `mapping` — anything else is a runtime
`PipelineError`. Mapping targets are node names (or `END` inside subgraphs).

## Subgraph exit declaration

```json
"exit": {"router_field": null, "success_values": ["found", "table_clean"]}
```

The subgraph's terminal node is the one whose edge points to `END`. Two
modes:

- **`router_field: null`** (the common case): the terminal node's *name*
  becomes the exit value. Every entry of `success_values` must be a declared
  `noop` node — the success exits are literally named markers in the graph.
- **`router_field: "<field>"`** (data-dependent exit): the exit value is read
  from that field on the terminal node's output. Success values are returned
  strings and must **not** collide with node names.

At runtime the resolved exit value must be a member of
`success_values ∪ {on_error}`; anything else raises.

## The on_error failure exit

`on_error` names the exit value emitted when **any node in the subgraph
raises**. Without it, exceptions propagate and abort the workflow (the
exception surfaces in `ExecutionResult.error`). With it, the exception is
caught, the declared value becomes the subgraph's exit condition (bypassing
the terminal-node path), and the top-level conditional edge routes
accordingly — the idiom for "any failure → abort" wiring.

`on_error` is a pure symbol: it must not be a declared node (S9) and must
not appear as a conditional-edges mapping target inside the subgraph (S10).
[Checkpoints](../running/checkpoints.md) are not evaluated on the `on_error`
path (the postcondition is moot).

## Reference syntax (`$ref`)

```json
{"$ref": "observe"}                  // full output of node `observe`
{"$ref": "perceive.points"}          // field access
{"$ref": "filter_obb.obb.center.0"}  // nested walk + integer index
{"$ref": "in.target_obb"}            // bound subgraph input
{"$ref": "in.observation_stream"}    // the executor-injected stream
{"$ref": "tracker"}                  // streaming node → latest() snapshot
```

Resolution rules (`gap.runtime.workflow.resolve_ref`):

1. The head must be a node name in the current scope or the reserved
   pseudostate `in` (bound subgraph inputs). References **cannot escape the
   current subgraph** — cross-subgraph data crosses only through declared
   `inputs`/`outputs`.
2. If the head's value exposes a callable `.latest()` (a streaming
   `StreamSlot` or the observation stream), it is invoked transparently to
   snapshot the latest published value before walking sub-fields.
3. Each subsequent path part is, in order: an integer index into a
   list/tuple (negative indices allowed), a **dict key** (checked before
   attributes, so TypedDict keys like `"items"` are never shadowed by dict
   methods), then an attribute.
4. Inside literal lists, refs resolve element-wise:
   `["a", {"$ref": "x.y"}]` is a legal input value.

A tagged object is used instead of a string DSL so the validator can
distinguish refs from literals by structure, and literal lists are never
ambiguous with references.

## Dataflow typing

- **Type-name strings** in subgraph `inputs` declarations (`"Se3Pose"`,
  `"PointCloud"`, `"Mask"`, …) resolve through the `gap.schema` registry of
  `gap.types` TypedDicts. An unknown name fails validation, not
  mid-execution. `"Any"`/`"dict"` are open escape hatches;
  `"ObservationStream"` marks the injected stream.
- **Tool nodes** get their I/O schemas from the registry's `UnitSchema`
  (extracted from the tool function's type hints at registration).
- **Script nodes** get theirs from `run()`'s signature: every non-`ctx`
  parameter must carry a type annotation; the return annotation must be a
  TypedDict (or `None`). Supported hint shapes: scalars, TypedDicts,
  `list[...]`, `dict`, `T | None`, `Any`, `ObservationStream`,
  bare classes (`np.ndarray`).
- Cross-binding compatibility: same-name structured types match by name;
  `int`/`float` interchange; `Any`/`dict` match anything; fields whose
  hints cannot be introspected degrade to lenient. Note that the structural
  validator currently enforces cross-subgraph wiring by *name* only (W8);
  this field-level compatibility relation is defined but not enforced at
  validation time.

## Validation rules

Validation has two layers:

1. The **loader** (`load_workflow`) enforces syntax: strict keys at every
   level, version check, per-type required fields, reserved-name rejection
   (`START`/`END`/`in`), `streaming` only on tool/script, and the v2-leakage
   migration errors above. Loader violations raise
   `WorkflowValidationError` immediately.
2. The **structural validator** (`validate_workflow`) returns a list of
   `ValidationIssue` objects; the executor hard-fails on any
   `error`-severity issue before running and logs warnings.

### Workflow level

| # | Severity | Rule |
|---|---|---|
| W1 | error | `version == 3`. |
| W2 | error | At least one edge from `START`. |
| W3 | error | Every edge endpoint is `START`, `END`, or a declared node. |
| W4 | error | Every non-end node is reachable from `START` (through edges and conditional mappings). |
| W5 | error | Every node has an outgoing edge or a conditional-edges entry, unless it is `type: end`. |
| W6 | error | Conditional-edges sources are declared nodes; every mapping target is a declared node or `END`. |
| W7 | error | Every `subgraph` node's `ref` resolves to a declared subgraph. |
| W8 | error | Every reachable subgraph's declared input is supplied — by the executor-injected `observation_stream` or by a reachable upstream subgraph declaring an output of the same name. |
| — | error | At least one `end` node exists. |

### Subgraph level

| # | Severity | Rule |
|---|---|---|
| S1 | error | At least one edge from `START`. |
| S2 | error | Every node reachable from `START` (streaming nodes that are direct `START` targets count). |
| S3 | error | Streaming nodes are pure sources: no outgoing edges, no conditional-edges entry. |
| S4 | error | Streaming-flag/skill-contract consistency: a `streaming: true` node must invoke a skill whose bundle contract declares `streaming: true`, and vice versa (enforced when a skill registry is provided). |
| S5 | error | `$ref` heads reference declared nodes, or `in.<name>` for declared inputs / `in.observation_stream`. Edge and conditional targets are declared. |
| S6 | error | Subgraph `outputs` bind to declared, non-end nodes. |
| S7 | error | `exit.success_values` is non-empty. |
| S8 | error | Conditional edges from a non-router source declare `router_field`; from a router source `router_field` is null. |
| S9 | error | `on_error` is not a declared node name. |
| S10 | error | `on_error` is not a conditional-edges mapping target. |
| S11 | error | `router_field: null` ⇒ every success value is a declared `noop` node; `router_field` set ⇒ success values must not collide with node names. |
| — | error | Non-streaming, non-end nodes need an outgoing edge or conditional entry. |
| — | error | Declared input type names resolve in the `gap.schema` registry. |

:::{note}
Schema **introspection** failures degrade to warning-level issues rather
than blocking. In particular, a `tool` node whose tool is not yet registered
at validate time (e.g. `robot.*` connector tools that only register when a
connector attaches) produces a warning listing the available tools — typos
in connector tool names surface at runtime, not validation.
:::

At graph-generation time the validator additionally reconciles each
subgraph's `success_values ∪ {on_error}` against the owning skill's declared
`exit_conditions` (from `SKILL.md` frontmatter); the executor skips this
check. See [Generating Graphs](../authoring/generation.md).

## Reserved names

| Name | Where | Meaning |
|---|---|---|
| `START` | edge endpoint | Virtual entry: `START → x` edges seed the frontier. Never declared as a node. |
| `END` | edge / mapping target | Virtual exit: an edge `x → END` marks `x` as the scope's terminal node. Never declared as a node. |
| `in` | `$ref` head | Pseudostate holding bound subgraph inputs (`in.<name>`). A subgraph node named `in` is rejected at load time. |
| `in.observation_stream` | `$ref` / input name | The executor-injected observation stream (when the connector polls). |
| `_exit` | output key | Reserved key on a subgraph node's result carrying its exit value; `router_field: "exit"` is an alias for it. |

## Authoring surfaces

Three equivalent ways to produce a v3 graph — the executor treats them
identically:

1. **`gap generate`** — the LLM pipeline emits a workflow dir
   ([Generating Graphs](../authoring/generation.md)).
2. **`gap.builder`** — `Workflow` / `Subgraph` with `add_node` /
   `add_edge` / `add_conditional_edges` / `add_exit` / `set_outputs` /
   `add_checkpoint`; `save()` runs the same loader + validator
   ([Builder API](../authoring/builder.md)).
3. **Hand-written JSON** — anything that passes the rules on this page.

````

## docs/source/running/checkpoints.md

````text
# Checkpoints and Verification

A graph that *runs to its success end node* has only proven that control flow
worked. Checkpoints prove the **physics** worked: they are per-subgraph
postcondition predicates evaluated against privileged simulator ground truth
at each subgraph exit, independent of anything the graph's own perception
reported. The graph says "I closed the gripper"; the checkpoint asks the
simulator "is the can actually touching a finger link?"

Checkpoints are authored three ways — by hand, via
[`gap.builder`](../authoring/builder.md)'s `Subgraph.add_checkpoint(...)`, or
by the [generation pipeline](../authoring/generation.md)'s checkpoint agent —
and all three produce the same artifact: a sidecar Python module next to the
workflow.

## Sidecar modules

Checkpoints live outside `workflow.json`, in
`<workflow_dir>/checkpoints/<subgraph_name>.py`. Each sidecar must export a
module-level `CHECKPOINTS: list[Checkpoint]`. The executor loads the file
fresh on every evaluation (so you can edit predicates between runs without
restarting anything), and a *missing* sidecar is silently skipped — subgraphs
without checkpoints cost nothing.

A real example, the quickstart's grasp postcondition
([examples/libero_quickstart/graph/checkpoints/grasp_sg.py](gh-engine:examples/libero_quickstart/graph/checkpoints/grasp_sg.py)):

```python
from gap.runtime.verify import Checkpoint


def _target_held(world) -> bool:
    """The soup can is in contact with a robot link after `close`."""
    return world.body("alphabet soup").is_grasped()


def _target_held_diagnostics(world) -> dict:
    body = world.body("alphabet soup")
    held = world.held_body()
    return {
        "resolved_body": body.name,
        "contacts": sorted(body.contacts),
        "held_body": held.name if held is not None else None,
        "gripper_open_fraction": (
            world.robot().gripper_open_fraction
            if world.robot_view is not None else None
        ),
        "body_z": body.z,
    }


CHECKPOINTS = [
    Checkpoint(
        name="target_held",
        subgraph="grasp_sg",
        predicate=_target_held,
        rationale=(
            "After close, the grasp target must be held: ground-truth "
            "contacts between the can and a robot finger link prove the "
            "gripper actually closed ON the object (not an empty grip)."
        ),
        validate=True,
        diagnostics_fn=_target_held_diagnostics,
    ),
]
```

`Checkpoint` is a frozen dataclass with these fields:

| Field | Default | Meaning |
|---|---|---|
| `name` | — | Identifier reported in results and failure messages |
| `subgraph` | — | Owning subgraph name |
| `predicate` | — | `(world) -> bool` or `(world, outputs) -> bool` |
| `rationale` | `""` | Why this postcondition matters (surfaced in feedback) |
| `validate` | `True` | `True` = hard postcondition, `False` = probe |
| `weight` | `1.0` | Relative importance for scoring/triage |
| `diagnostics_fn` | `None` | Optional `dict`-returning context collector, same arity rules |

### Predicate signatures

The evaluator inspects each callable's arity per call:

- **`predicate(world)`** — the classic privileged-only check.
- **`predicate(world, outputs)`** — `outputs` is the subgraph's bound
  outputs (the values declared via `Subgraph.set_outputs(...)`, resolved at
  exit). This lets a predicate compare what the *graph* computed (e.g. a
  perception OBB) against what the *simulator* knows is true.

Callables declared with bare `*args` are treated as one-argument.

A predicate that raises never crashes the run — it is recorded as
`passed=False` with the exception captured in `eval_error`. A
`diagnostics_fn` that raises is treated as a missing diagnostic
(`diagnostics=None`); the predicate's verdict stays authoritative.

### Hard checkpoints vs probes

`validate=True` checkpoints are **hard postconditions**: they are the ones
enforcement acts on. `validate=False` checkpoints are **probes** — they are
useful as extra signal during graph generation and triage, but the executor
never enforces them.

## Enforcement modes

Enforcement runs at each subgraph's **normal** exit — including declared
failure exits, but *not* the `on_error` path (if the subgraph's body raised,
you already know something went wrong). Every result is appended to
`ExecutionResult.checkpoint_results` (a list of `CheckpointResult` with
`name`, `subgraph`, `passed`, `eval_error`, `diagnostics`, `eval_time_s`).

| Mode | Behavior on a failed `validate=True` checkpoint |
|---|---|
| `off` | Sidecars are never loaded; nothing is evaluated |
| `warn` | Log a warning and continue |
| `raise` | Raise `gap.errors.VerificationFailed` naming the failed checkpoints |

You select the mode from the CLI or the Python facade (the raw
`WorkflowExecutor` takes the same `checkpoints=` argument):

```bash
gap run path/to/graph --sim libero_object_all_variance/0 --checkpoints raise
```

```python
result = gap.execute(graph, connector=conn, checkpoints="raise")
for cp in result.checkpoint_results:
    print(cp.subgraph, cp.name, cp.passed, cp.diagnostics)
```

:::{warning}
The default differs between API layers. `gap run` and the `gap.execute()`
facade default to `checkpoints="warn"`; the raw `WorkflowExecutor`
constructor defaults to `checkpoints="off"`. If you drive the executor
directly and expect checkpoint evaluation, pass `checkpoints=` explicitly.
An invalid value raises `ValueError` at construction.
:::

In `warn` mode the run continues past failures, so a "successful" run can
still carry failed checkpoints — always inspect
`ExecutionResult.checkpoint_results` (or the run log) rather than assuming
`success=True` implies every postcondition held.

## Ground truth is sim-only

Evaluation needs a privileged `World` snapshot, which the executor obtains
from the connector's `world_snapshot` method (wired as `world_snapshot_fn`).
Simulator connectors provide it; real-robot
[connectors](../real-robots/connectors.md) generally cannot — there is no
oracle for "is the can really in the basket" on hardware.

When `checkpoints != "off"` but no `world_snapshot_fn` is available,
enforcement **silently degrades**: the executor logs *one* warning for the
whole run and skips all checkpoint evaluation. The run proceeds unchanged,
and `checkpoint_results` stays empty. This is deliberate — the same graph
runs in sim (verified) and on a real robot (unverified) without edits — but
it means checkpoints are a rehearsal tool, not a hardware safety mechanism.
See [Safety](../real-robots/safety.md) for what gates real-robot runs.

## The predicate vocabulary

Predicates are written against three snapshot types from
`gap.runtime.verify`: `World`, `Body`, and `Robot`
([gap/runtime/verify/world.py](gh-engine:gap/runtime/verify/world.py)). The
harness constructs them; your code only reads them.

### Looking up bodies

`world.body(name)` resolves names through four stages: exact match →
snake-case slug (`"alphabet soup"` → `"alphabet_soup"`) → token-subset match
(a verbose phrase like `"small blue and white cream cheese"` resolves to
`"cream_cheese"`) → unique substring-token match (`"frying pan"` →
`"chefmate_8_frypan"`). The last stage only resolves when exactly one body
wins; ambiguity falls through. An unresolvable name raises
`BodyNotFoundError` listing the scene's canonical spec ids and body names —
useful feedback when an LLM-authored predicate guesses wrong.

Related helpers: `world.has_body(name)`, `world.body_names()`,
`world.region(name)` / `world.region_names()` for physics-free drop-target
regions.

### Body predicates

All geometry is world-frame; tolerances are meters and radians.

| Predicate | Defaults | Notes |
|---|---|---|
| `is_grasped()` | link prefixes `("robot", "panda_", "Robotiq", "finger_")` | True if any robot link is in the body's contact set |
| `is_grasped_by(prefix)` | — | Explicit robot prefix |
| `is_on(other)` | `tol_m=0.05` | **Lenient**: AABB overlap, see warning below |
| `is_on_strict(other)` | `tol_m=0.03, tol_xy_m=0.0, max_penetration_m=0.005` | Asymmetric z check + centroid containment |
| `is_in(container)` | `require_contact=True, tol_xy_m=0.02, tol_z_m=0.02` | Cavity AABB containment; contact check auto-skipped for regions |
| `contains(other)` | same tolerances | Inverse of `is_in`, no contact requirement |
| `is_above(other)` | `min_clearance_m=0.0, require_xy_overlap=True` | Clearance over the other body's top face |
| `is_settled()` | `speed_thresh=0.08` | Linear velocity norm below threshold |
| `is_axis_aligned()` | `local_axis="z", world_axis="z", tol_rad=0.20` | Orientation check |
| `distance_to(other)` / `xy_distance_to(other)` | — | Center-to-center meters |
| `bottom_footprint_xy()` / `xy_coverage_over(other)` | `z_slack_m=0.005` | Mesh-projected true footprint (needs trimesh/scipy/shapely; returns `None`/`0.0` without them) |

Plus scalar sugar: `body.x/.y/.z`, `body.top_z/.bottom_z`,
`body.left_x/.right_x`, `body.near_y/.far_y`.

:::{warning}
`is_on` uses AABB *overlap*, which is documented-lenient: an elongated
object like a frypan passes with only its handle hanging over the burner
while the body rests on the table 2–3 cm below. Use `is_on_strict` whenever
the predicate you mean is "the object body is actually resting on the
support" — it requires the bottom face within `-5 mm … +3 cm` of the
support's top *and* the centroid inside the support's XY extent.
:::

### World-level helpers

These avoid hard-coding body names, which keeps predicates robust when
perception's naming differs from ground truth:

- `world.held_body()` — the body currently grasped (closest to the
  end-effector when several qualify), or `None`.
- `world.bodies_displaced(min_xy_m=0.05)` — non-static bodies that moved
  since the rollout's initial snapshot, sorted by displacement.
- `world.body_over(region)` / `world.body_inside(region)` — which body sits
  over / inside a region's cavity.
- `world.moved_body_inside(region, min_xy_m=0.05)` — composition of the two
  above: "something that moved during the rollout ended up in the basket".

### Robot state

`world.robot()` returns a `Robot` view with `joint_pos`, `ee_position`,
`ee_quaternion_wxyz`, and `gripper_open_fraction` (0.0 closed → 1.0 open),
plus `gripper_is_closed(threshold=0.1)` and `gripper_is_open(threshold=0.9)`.

### Temporal operators

A `World` may carry a history of earlier snapshots (`world.history()`,
chronological). Three operators quantify over `history() + [self]`:

```python
# "the can was held at some point, and at exit it sits in the basket"
def placed(world) -> bool:
    return (
        world.eventually(lambda w: w.body("alphabet soup").is_grasped())
        and world.at_end(lambda w: w.body("alphabet soup").is_in(w.body("basket")))
    )
```

`eventually(fn)` (any snapshot), `always(fn)` (every snapshot), and
`at_end(fn)` (current snapshot only — provided for symmetry).

### Dry-running predicates with StubWorld

`StubWorld(body_names=[...], container_names=[...], region_names=[...])`
builds a minimal `World` with no simulator: every body is a 10 cm cube at
the origin, containers and regions get an 8 cm interior cavity, and a stub
7-joint robot is attached. Validators use it to catch predicates that
reference bodies that won't exist — a `BodyNotFoundError` at authoring time
instead of at rollout time. It is also handy in your own unit tests; see
[Testing bundles](../skills/testing-bundles.md) for the wider testing
toolkit.

## Authoring with the builder

`gap.builder` keeps checkpoints attached to the subgraph they verify:

```python
sg.add_checkpoint(
    "target_held",
    predicate=lambda w: w.held_body() is not None,
    rationale="grasp must physically hold something at exit",
    validate=True,
)
```

`Subgraph.add_checkpoint(name, predicate, *, diagnostics=None, rationale="",
validate=True, weight=1.0)` records the declaration;
`dump_checkpoints_module(path)` writes the sidecar. Note the builder kwarg is
`diagnostics`, while the dataclass field is `diagnostics_fn`. See
[the builder guide](../authoring/builder.md) for the full surface.

Generated graphs get their sidecars from a dedicated checkpoint agent that
runs after the per-subgraph agents — see
[Generating graphs](../authoring/generation.md).

## Diagnostics

`diagnostics_fn` runs after the predicate (pass or fail) and its dict lands
in `CheckpointResult.diagnostics` and the run log. Use it to capture the
*why* while the privileged snapshot is still in hand: contact sets, body
heights, `world.held_body()`, gripper fraction. Two `World` fields exist
specifically for this kind of post-mortem: `world.raw_contact_diagnostics`
(per-sensor contact force norms) and `world.sim_state` (a kitchen-sink dump
of joint states, body poses, action targets, and grasp metrics).

## Reading checkpoint failures

Not every `passed=False` is a task failure. Generated graphs often include
*perception-audit* checkpoints (e.g. `target_obb_matches_truth`) that compare
a perception OBB from the graph's outputs against the privileged body pose —
and the OBB may be expressed in the robot's base frame while the `World`
snapshot is world-frame. A constant-offset mismatch there is a bug in the
generated predicate, not in the rollout.

When triaging, trust the **physical** checkpoints first — `target_held`
(ground-truth contacts) and placement checks like `is_in` /
`moved_body_inside` are frame-free and directly measure task progress. In
the default `warn` mode the run continues either way, so a passed
`target_held` alongside a failed perception audit usually means the task
succeeded. See the [agent quickstart](../examples/agent-quickstart.md) for a
worked example of this pattern.

## Next steps

- [Executing graphs](execution.md) — where checkpoints sit in the execution lifecycle.
- [Traces](traces.md) — checkpoint results land in the run log alongside the recorded trial.
- [LIBERO quickstart](../examples/libero-quickstart.md) — a measured run with the `target_held` checkpoint in the loop.

````

## gap/runtime/executor.py

````text
"""v3 super-step scheduler for workflow.json.

Drives a v3 LangGraph-style workflow. The runtime is a frontier-based
super-step scheduler: each tick, run all ready nodes concurrently, fold
their outputs back into the per-subgraph local-outputs dict, then
advance the frontier by following ``edges`` and resolving
``conditional_edges``. Subgraph nodes recurse into the same scheduler.

Streaming nodes (``streaming: true``) are spawned into a detached
future. They never block downstream readiness; consumers reach them
through ``$ref`` to a ``StreamSlot``. On subgraph teardown the runtime
fires each streaming node's ``CancelToken``, grace-waits, then
force-cancels.

Send (dynamic fan-out) is expressed by a ``router`` node whose function
returns a list of ``{"to", "inputs"}`` dicts; outputs collect into a
list under the router's name.
"""

from __future__ import annotations

import logging
import os
import threading
import time
from collections.abc import Callable
from concurrent.futures import Future, ThreadPoolExecutor, wait
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from gap_core.errors import (
    GraphValidationError,
    NodeExecutionError,
    PipelineError,
    TaskCancelled,
    VerificationFailed,
    is_terminal,
)
from gap_core.tools import guards

from .context import CancelToken, NodeContext
from .nodes import (
    execute_script_node,
    execute_tool_node,
)
from .observation_stream import ObservationStream, start_observation_stream
from .tracing import DagTrace
from .validate import validate_workflow
from .workflow import (
    END,
    OBSERVATION_STREAM_INPUT_NAME,
    RESERVED_INPUT_PSEUDOSTATE,
    START,
    NodeDef,
    SubgraphDef,
    Workflow,
    load_workflow,
    resolve_inputs,
    resolve_ref,
)

logger = logging.getLogger(__name__)


def _typed_error_text(exc: BaseException) -> str:
    """``TypeName: message``, because the message alone is often not enough.

    A bare ``KeyError`` stringifies to ``'z'`` and a ``PipelineError`` raised
    by a policy's own check stringifies to the sentence its author wrote. Only
    the type separates "my code indexed a field that is not there" from "my
    check fired" -- and that is the first thing a reader has to decide.
    """
    message = str(exc)
    return f"{type(exc).__name__}: {message}" if message else type(exc).__name__


def _node_error_text(exc: BaseException) -> str:
    """The sentence a reader needs: which node, what kind, and what it said.

    ``NodeExecutionError`` carries the node id but renders its cause with
    ``str()``, which drops the cause's type. Rebuild it so the type survives.
    """
    if isinstance(exc, NodeExecutionError):
        return f"Node {exc.node_id!r} failed: {_typed_error_text(exc.cause)}"
    return _typed_error_text(exc)


# ---------------------------------------------------------------------------
# Streaming-node slot
# ---------------------------------------------------------------------------


class StreamSlot:
    """Thread-safe slot holding the latest published value of a streaming node.

    ``$ref`` resolution invokes ``latest()`` to retrieve a snapshot.
    Calls block on ``_first_published`` until the underlying skill
    publishes its first value (or the cancel token fires).
    """

    def __init__(self, name: str, cancel_token: CancelToken) -> None:
        self.name = name
        self._cancel_token = cancel_token
        self._lock = threading.Lock()
        self._value: Any = None
        self._first_published = threading.Event()
        self._closed = False

    def publish(self, value: Any) -> None:
        with self._lock:
            self._value = value
        self._first_published.set()

    def latest(self, timeout_s: float | None = 60.0) -> Any:
        if not self._first_published.is_set():
            ok = self._first_published.wait(timeout=timeout_s)
            if not ok:
                raise PipelineError(
                    f"streaming node {self.name!r} did not publish a "
                    f"value within {timeout_s}s"
                )
        with self._lock:
            return self._value

    def cancel(self) -> None:
        self._cancel_token.cancel()
        # Unblock any consumers waiting on first publish.
        self._first_published.set()
        self._closed = True

    @property
    def cancel_token(self) -> CancelToken:
        return self._cancel_token


# ---------------------------------------------------------------------------
# Per-subgraph execution state
# ---------------------------------------------------------------------------


@dataclass
class _ScopeState:
    """Mutable state for one super-step scheduler invocation.

    A scope is created per subgraph (or top-level workflow). Streaming
    nodes are tracked separately for teardown.
    """

    local_outputs: dict[str, Any] = field(default_factory=dict)
    streaming_slots: dict[str, StreamSlot] = field(default_factory=dict)
    streaming_futures: dict[str, Future] = field(default_factory=dict)
    completed_nodes: set[str] = field(default_factory=set)


# ---------------------------------------------------------------------------
# Subgraph-exit observability hook
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class SubgraphExitEvent:
    """Snapshot-time event fired by the executor at every subgraph exit.

    Consumed by harnesses (rehearsal, comparison tools) to take a
    privileged-state World snapshot and evaluate the subgraph's
    checkpoints. Production runs leave ``subgraph_exit_hook=None``; the
    hook then never fires and there is zero overhead.

    ``visit_index`` is 0-based and increments per visit to a given
    subgraph (a loop that visits ``run_sg`` three times produces
    indices ``0, 1, 2``).

    ``error_path=True`` means the inner scope raised and the subgraph
    is exiting through ``on_error``. The snapshot can still be taken
    (we are between the raise and the exit-value bind), but consumers
    should distinguish it from a normal exit.
    """

    sg_name: str
    visit_index: int
    bound_outputs: dict[str, Any]
    exit_value: str
    error_path: bool
    elapsed_s: float


# ---------------------------------------------------------------------------
# Workflow executor
# ---------------------------------------------------------------------------


class WorkflowExecutor:
    """Execute a v3 workflow."""

    def __init__(
        self,
        workflow_dir_or_workflow: str | Path | Workflow,
        *,
        tool_registry: Any,
        skill_registry: Any | None = None,
        policy_executor: Any | None = None,
        observation_poll_fn: Callable[[], Any] | None = None,
        observation_hz: float = 10.0,
        trace_dir: str | Path | None = None,
        checkpoints: str = "off",
        world_snapshot_fn: Callable[[], Any] | None = None,
        subgraph_exit_hook: Callable[[SubgraphExitEvent], None] | None = None,
        max_node_workers: int = 8,
        node_visit_cap: int | None = None,
    ):
        if isinstance(workflow_dir_or_workflow, Workflow):
            self.workflow: Workflow = workflow_dir_or_workflow
            self.workflow_dir = Path(self.workflow.workflow_dir)
        else:
            path = Path(workflow_dir_or_workflow)
            wf_path = path / "workflow.json" if path.is_dir() else path
            self.workflow = load_workflow(wf_path)
            self.workflow_dir = wf_path.parent

        self.tool_registry = tool_registry
        self.skill_registry = skill_registry
        self.policy_executor = policy_executor
        self.observation_poll_fn = observation_poll_fn
        self.observation_hz = float(observation_hz)
        self.max_node_workers = int(max_node_workers)

        # Subgraph-exit hook: harnesses set this to snapshot the World
        # after each subgraph and evaluate its checkpoints. Default
        # ``None`` short-circuits to zero overhead in production. Visit
        # indices are 0-based per sg_name.
        self.subgraph_exit_hook = subgraph_exit_hook
        self._visit_counts: dict[str, int] = {}

        # Cross-subgraph outputs: {subgraph_name: {output_name: value}}.
        # Most-recent run wins.
        self.cross_subgraph_outputs: dict[str, dict[str, Any]] = {}

        # Facade-supplied initial inputs (``gap.execute(..., inputs=...)``).
        # Addressable at the top level as ``{"$ref": "in.<name>"}`` and used
        # as the base producer for subgraph input binding (upstream subgraph
        # outputs of the same name win).
        self.initial_inputs: dict[str, Any] = {}

        # Execution-time enforcement of ``validate=True`` postcondition
        # checkpoints. ``"off"`` skips entirely; ``"warn"`` logs failures
        # and continues; ``"raise"`` raises VerificationFailed. Requires a
        # ``world_snapshot_fn`` (a connector exposing ground truth) — when
        # absent, enforcement degrades to a one-shot warning.
        if checkpoints not in ("off", "warn", "raise"):
            raise ValueError(
                f"checkpoints must be 'off', 'warn', or 'raise', "
                f"got {checkpoints!r}"
            )
        self.checkpoints = checkpoints
        self.world_snapshot_fn = world_snapshot_fn
        self.checkpoint_results: list[Any] = []
        self._checkpoints_warned = False

        if node_visit_cap is not None:
            self.node_visit_cap = int(node_visit_cap)
        else:
            self.node_visit_cap = int(os.environ.get("GAP_ITERATION_CAP", "10000"))

        if trace_dir is None:
            trace_dir = os.environ.get("GAP_TRACE_DIR", "") or self.workflow_dir
        self.trace = DagTrace(trace_dir)

        self.observation_stream: ObservationStream | None = None
        self.skill_instances: dict[str, Any] = {}

        # Status of the end node the last execute() terminated at
        # ("success" | "failure"), or None if it never reached one.
        self.exit_status: str | None = None

        # First node error of the current execute(), kept so the terminal
        # failure can name a cause instead of only an end-node label.
        self._first_node_error: str | None = None

        self._stream_grace_s = float(
            os.environ.get("GAP_PARALLEL_CANCEL_GRACE_S", "2.0"),
        )

    # ------------------------------------------------------------------
    # Public entry
    # ------------------------------------------------------------------

    def execute(self) -> None:
        """Drive the top-level workflow from START to an end node."""
        guards.reset_counters()
        self.checkpoint_results = []
        self.exit_status = None
        self._first_node_error = None

        issues = validate_workflow(
            self.workflow,
            agent_registry=None,
            skill_registry=self.skill_registry,
            tool_registry=self.tool_registry,
        )
        errors = [i for i in issues if i.severity == "error"]
        warnings = [i for i in issues if i.severity == "warning"]
        for w in warnings:
            logger.warning("Validation warning: %s", w)
        if errors:
            raise GraphValidationError(errors)

        self._initialize_trace_graph()
        self.trace.copy_workflow(self.workflow_dir)

        # The observation stream starts only when the constructor was
        # given a poll fn (the connector's ``get_observation``). Workflow
        # meta override beats env var; fall back to the constructor's hz.
        # Visual-servo loops bump this to match the servo update_hz.
        if self.observation_poll_fn is not None:
            hz_str = (
                self.workflow.meta.get("observation_stream_hz")
                or os.environ.get("GAP_OBSERVATION_STREAM_HZ", "")
            )
            try:
                hz = float(hz_str)
            except (TypeError, ValueError):
                hz = self.observation_hz
            self.observation_stream = start_observation_stream(
                self.observation_poll_fn, hz=hz,
            )

        try:
            self._run_top_level()
        except Exception:
            # A failure before the first node completes would otherwise leave
            # no dag_trace.json at all -- and a reader with no trace cannot
            # tell "the graph aborted at load" from "the graph ran and did
            # nothing", which is exactly the confusion that cost a
            # self-learning run five iterations. The trace already holds the
            # error event; write it out before the exception leaves.
            try:
                self.trace.flush()
            except Exception:  # noqa: BLE001 - never mask the original failure
                logger.debug("could not flush the trace after a failure", exc_info=True)
            raise
        finally:
            if self.observation_stream is not None:
                self.observation_stream.stop()
                self.observation_stream = None
            self.skill_instances.clear()

    def close(self) -> None:
        """Release executor resources. Kept for API parity; the gRPC
        ServiceRegistry this used to close is gone — ``execute()``'s
        ``finally`` already stops the observation stream."""
        if self.observation_stream is not None:
            self.observation_stream.stop()
            self.observation_stream = None

    # ------------------------------------------------------------------
    # Top-level scheduler
    # ------------------------------------------------------------------

    def _run_top_level(self) -> None:
        """Walk the top-level workflow."""
        scope = _ScopeState()
        scope.local_outputs[RESERVED_INPUT_PSEUDOSTATE] = {
            OBSERVATION_STREAM_INPUT_NAME: self.observation_stream,
            **self.initial_inputs,
        }

        terminal = self._run_scope(
            scope=scope,
            nodes=self.workflow.nodes,
            edges=self.workflow.edges,
            cond_edges=self.workflow.conditional_edges,
            scope_name="<workflow>",
        )

        # The terminal node should be type=end.
        if terminal is None:
            raise PipelineError(
                "workflow exited without reaching an end node"
            )
        node = self.workflow.nodes[terminal]
        if node.type != "end":
            raise PipelineError(
                f"workflow terminal node {terminal!r} is not type=end "
                f"(type={node.type})"
            )
        self.exit_status = node.status
        self._run_recovery(terminal, node)
        self.trace.flush()
        logger.info(
            "DAG trace written to %s",
            getattr(self.trace, "_output_dir", "<trace dir>"),
        )
        if node.status == "success":
            logger.info("Workflow terminated at end node %r (success)", terminal)
            return
        detail = (
            f"; first node error -- {self._first_node_error}"
            if self._first_node_error else ""
        )
        raise PipelineError(
            f"workflow terminated at end node {terminal!r} (failure){detail}"
        )

    # ------------------------------------------------------------------
    # Scope scheduler
    # ------------------------------------------------------------------

    @staticmethod
    def _forward_reachable(
        start: str,
        outgoing: dict[str, list[str]],
        cond_edges: dict[str, Any],
    ) -> set[str]:
        """Return the set of nodes forward-reachable from ``start`` (inclusive).

        Follows both static edges (``outgoing``) and conditional-edge mapping
        targets; ``START``/``END`` are excluded. Used to compute a loop body
        when a backward (conditional) edge re-enters a completed node.
        """
        seen: set[str] = set()
        stack = [start]
        while stack:
            cur = stack.pop()
            if cur in seen or cur in (START, END):
                continue
            seen.add(cur)
            for dst in outgoing.get(cur, []):
                if dst not in seen:
                    stack.append(dst)
            ce = cond_edges.get(cur)
            if ce is not None:
                for dst in ce.mapping.values():
                    if dst not in seen:
                        stack.append(dst)
        seen.discard(START)
        seen.discard(END)
        return seen

    def _run_scope(
        self,
        scope: _ScopeState,
        nodes: dict[str, NodeDef],
        edges: tuple[tuple[str, str], ...],
        cond_edges: dict[str, Any],
        scope_name: str,
    ) -> str | None:
        """Run a single scope (workflow or subgraph) to completion.

        Returns the name of the terminal node reached (one whose outgoing
        edge is to ``END``), or ``None`` if the scope ended via an
        ``END`` target on a streaming-only path. Streaming nodes are
        spawned eagerly and torn down on scope exit.
        """
        # Outgoing-edge index for fast frontier advancement.
        outgoing: dict[str, list[str]] = {}
        for src, dst in edges:
            outgoing.setdefault(src, []).append(dst)

        # Initial frontier: targets of START edges (deduplicated).
        frontier: list[str] = []
        seen_in_frontier: set[str] = set()
        for src, dst in edges:
            if src == START and dst not in seen_in_frontier:
                frontier.append(dst)
                seen_in_frontier.add(dst)

        terminal_node: str | None = None
        super_step = 0

        try:
            while frontier:
                super_step += 1
                if super_step > self.node_visit_cap:
                    raise PipelineError(
                        f"scope {scope_name!r} exceeded super-step cap "
                        f"{self.node_visit_cap}; possible runaway loop"
                    )

                # Split frontier into streaming / regular nodes. Streaming
                # nodes are spawned and immediately removed from frontier.
                ready_regular: list[str] = []
                next_frontier: list[str] = []
                end_reached = False
                for node_name in frontier:
                    if node_name == END:
                        # Reaching END from a regular edge ends the scope.
                        # The terminal_node was set by whichever predecessor
                        # had an outgoing edge to END (see fold loop below).
                        end_reached = True
                        continue
                    if node_name not in nodes:
                        raise PipelineError(
                            f"scope {scope_name!r}: edge target {node_name!r} "
                            f"not declared"
                        )
                    node = nodes[node_name]
                    if node.streaming:
                        self._spawn_streaming(node_name, node, scope)
                        continue
                    if node_name in scope.completed_nodes:
                        # Already ran; do not re-execute. Frontier dedup
                        # plus completed_nodes guard means re-entry is a
                        # cycle attempt — silently skip.
                        continue
                    ready_regular.append(node_name)

                if end_reached and not ready_regular:
                    return terminal_node

                # Run all ready_regular nodes concurrently.
                results = self._run_super_step(
                    ready_regular, nodes, scope, scope_name,
                )

                # Fold results back; advance frontier.
                for node_name, result in results.items():
                    scope.local_outputs[node_name] = result
                    scope.completed_nodes.add(node_name)
                    node = nodes[node_name]

                    # End nodes terminate the scope (top-level workflow).
                    if node.type == "end":
                        terminal_node = node_name
                        return terminal_node

                    # Static outgoing edges.
                    for dst in outgoing.get(node_name, []):
                        if dst == END:
                            # This node is the subgraph's terminal — its
                            # name (or output field) becomes the exit value.
                            terminal_node = node_name
                            continue
                        if dst not in next_frontier and dst not in seen_in_frontier:
                            next_frontier.append(dst)
                            seen_in_frontier.add(dst)
                        elif dst not in next_frontier:
                            next_frontier.append(dst)

                    # Conditional edges.
                    if node_name in cond_edges:
                        tgt = self._resolve_cond_target(
                            node_name, node, scope, cond_edges[node_name],
                        )
                        if tgt is None:
                            continue
                        if tgt == END:
                            terminal_node = node_name
                            continue
                        if tgt in scope.completed_nodes:
                            # Backward (loop) edge: a conditional edge resolved
                            # to a node that already ran in this scope. Reset
                            # the loop body — every node forward-reachable from
                            # the target — so it re-executes, then re-enqueue
                            # the target. (Static edges to completed nodes keep
                            # the silent-skip dedup; only conditional edges form
                            # loops.) local_outputs are left intact: re-runs
                            # overwrite them, matching the documented
                            # "most recent run wins" semantics. The super-step
                            # cap still bounds runaway loops.
                            body = self._forward_reachable(
                                tgt, outgoing, cond_edges,
                            )
                            for n in body:
                                scope.completed_nodes.discard(n)
                                seen_in_frontier.discard(n)
                            if tgt not in next_frontier:
                                next_frontier.append(tgt)
                            seen_in_frontier.add(tgt)
                            continue
                        if tgt not in next_frontier:
                            next_frontier.append(tgt)

                # If END was the only thing in the prior frontier and we
                # ran no regular nodes this step, exit now.
                if end_reached and not next_frontier:
                    return terminal_node

                frontier = next_frontier

            return terminal_node
        finally:
            self._teardown_streaming(scope)

    # ------------------------------------------------------------------
    # Super-step batch
    # ------------------------------------------------------------------

    def _run_super_step(
        self,
        ready: list[str],
        nodes: dict[str, NodeDef],
        scope: _ScopeState,
        scope_name: str,
    ) -> dict[str, Any]:
        """Run one super-step batch of regular (non-streaming) nodes.

        All nodes in ``ready`` execute concurrently. The first to raise
        cancels the others (they have no inter-node dependencies within
        a super-step).
        """
        if not ready:
            return {}

        if len(ready) == 1:
            # Hot path: avoid threading overhead for sequential graphs.
            name = ready[0]
            return {name: self._dispatch_node(name, nodes[name], scope, scope_name)}

        results: dict[str, Any] = {}
        first_error: Exception | None = None
        with ThreadPoolExecutor(max_workers=self.max_node_workers) as pool:
            futures: dict[Future, str] = {}
            for name in ready:
                fut = pool.submit(
                    self._dispatch_node, name, nodes[name], scope, scope_name,
                )
                futures[fut] = name
            for fut in list(futures.keys()):
                node_name = futures[fut]
                try:
                    results[node_name] = fut.result()
                except Exception as exc:
                    if first_error is None:
                        first_error = exc
                    for other in futures:
                        if other is not fut and not other.done():
                            other.cancel()
        if first_error is not None:
            raise first_error
        return results

    # ------------------------------------------------------------------
    # Per-node dispatch
    # ------------------------------------------------------------------

    def _dispatch_node(
        self,
        node_name: str,
        node: NodeDef,
        scope: _ScopeState,
        scope_name: str,
    ) -> Any:
        """Resolve inputs and run a single (non-streaming) node body."""
        full_id = f"{scope_name}.{node_name}" if scope_name != "<workflow>" else node_name

        # Subgraph nodes recurse.
        if node.type == "subgraph":
            return self._run_subgraph(node_name, node, scope)

        # Router nodes handle Send dispatch.
        if node.type == "router":
            return self._run_router(full_id, node_name, node, scope)

        # End nodes are terminal markers; their "result" is the recovery list.
        if node.type == "end":
            return {"_end": True, "status": node.status}

        # Noop: passthrough marker, used as a named subgraph terminal.
        if node.type == "noop":
            return {}

        self.trace.start_node(full_id)
        success = False
        error_text: str | None = None
        try:
            resolved = resolve_inputs(node.inputs, scope.local_outputs)
            self.trace.record_resolved_inputs(full_id, resolved)

            result: Any
            if node.type == "tool":
                result = execute_tool_node(
                    full_id, node, resolved, self.tool_registry,
                    policy_executor=self.policy_executor,
                )
                self.trace.record_output(full_id, result)
            elif node.type == "script":
                bundle_name = self._lookup_bundle_for_scope(scope_name)
                result = execute_script_node(
                    full_id, node, resolved, self.tool_registry, self.workflow_dir,
                    trace=self.trace,
                    policy_executor=self.policy_executor,
                    bundle_name=bundle_name,
                    skill_registry=self.skill_registry,
                )
                self.trace.record_output(full_id, result)
            else:
                raise PipelineError(
                    f"node {full_id!r} has unknown type {node.type!r}"
                )
            success = True
            return result
        except Exception as exc:
            # The message is the only record of *why* a node failed, and a
            # failure is routed, not propagated: `_run_subgraph` catches this
            # and takes the `on_error` exit. Without recording it here the
            # reason survives only in the log stream, so every consumer of
            # dag_trace.json -- the visualizer, and any feedback loop reading
            # the trace -- sees `status: error, error_message: null` and has
            # to guess. Record, then let it propagate unchanged.
            error_text = _node_error_text(exc)
            raise
        finally:
            self.trace.end_node(full_id, success)
            if error_text is not None:
                self.trace.record_error(full_id, error_text)
                if self._first_node_error is None:
                    self._first_node_error = f"{full_id}: {error_text}"
            # Incremental flush: a crash mid-run (segfault, OOM kill, disk
            # full during video render) previously lost the WHOLE trace —
            # node_data/ was on disk but dag_trace.json never existed, so
            # the run was invisible to the visualizer. Never let the flush
            # itself break execution.
            try:
                self.trace.flush()
            except Exception:
                logger.debug("incremental trace flush failed", exc_info=True)

    def _lookup_bundle_for_scope(self, scope_name: str) -> str:
        """Map a scope name back to the owning subgraph's `skill` field."""
        if scope_name == "<workflow>":
            return ""
        sg = self.workflow.subgraphs.get(scope_name)
        if sg is None:
            return ""
        return sg.skill or ""

    # ------------------------------------------------------------------
    # Subgraph recursion
    # ------------------------------------------------------------------

    def _run_subgraph(
        self, node_name: str, node: NodeDef, parent_scope: _ScopeState,
    ) -> dict[str, Any]:
        """Recurse into a subgraph; bind inputs, run inner scope, bind outputs."""
        sg_name = node.ref or ""
        sg = self.workflow.subgraphs.get(sg_name)
        if sg is None:
            raise PipelineError(
                f"subgraph node {node_name!r} references unknown subgraph "
                f"{sg_name!r}"
            )

        logger.info("--- Subgraph '%s' ---", sg_name)
        try:
            bound_inputs = self._bind_subgraph_inputs(
                sg_name, sg, node, parent_scope,
            )
        except PipelineError as exc:
            # Blame the node, not the workflow: a binding failure is the one
            # error that happens before any node runs, so without this the
            # trace names nothing and the failure reads as "the graph ran and
            # did nothing".
            self.trace.record_error(node_name, str(exc))
            raise

        scope = _ScopeState()
        scope.local_outputs[RESERVED_INPUT_PSEUDOSTATE] = bound_inputs

        visit_start = time.perf_counter()
        terminal: str | None
        error_path = False
        try:
            terminal = self._run_scope(
                scope=scope,
                nodes=sg.nodes,
                edges=sg.edges,
                cond_edges=sg.conditional_edges,
                scope_name=sg_name,
            )
        except Exception as exc:
            if sg.on_error is None or is_terminal(exc):
                # Terminal means the world this graph acts on is gone -- the
                # episode ended under it. Routing would send the graph around
                # its recovery edge to call another tool that raises the same
                # thing, forever. See `gap_core.errors.is_terminal`.
                raise
            logger.warning(
                "subgraph %r raised %s; routing to on_error=%r",
                sg_name, exc, sg.on_error,
            )
            terminal = None
            error_path = True

        # Compute the subgraph's exit condition.
        exit_value: str
        if error_path:
            exit_value = sg.on_error or ""
        elif sg.exit.router_field is None:
            exit_value = terminal or ""
        else:
            if terminal is None or terminal not in scope.local_outputs:
                raise PipelineError(
                    f"subgraph {sg_name!r}: cannot resolve exit "
                    f"(no terminal node output)"
                )
            term_out = scope.local_outputs[terminal]
            exit_value = self._read_field(term_out, sg.exit.router_field)
            if not isinstance(exit_value, str):
                exit_value = str(exit_value)

        legal_exits = set(sg.exit.success_values)
        if sg.on_error is not None:
            legal_exits.add(sg.on_error)
        if legal_exits and exit_value not in legal_exits:
            raise PipelineError(
                f"subgraph {sg_name!r}: exit value {exit_value!r} not in "
                f"declared success_values {list(sg.exit.success_values)!r} "
                f"and is not on_error={sg.on_error!r}"
            )

        # Bind subgraph outputs.
        bound_outputs: dict[str, Any] = {}
        for out_name, ref in sg.outputs.items():
            try:
                bound_outputs[out_name] = resolve_ref(ref, scope.local_outputs)
            except Exception as exc:
                logger.debug(
                    "Subgraph %r output %r unbound on this exit (%s); "
                    "downstream consumers will see no value",
                    sg_name, out_name, exc,
                )
        self.cross_subgraph_outputs[sg_name] = bound_outputs

        # Execution-time enforcement of this subgraph's ``validate=True``
        # postcondition checkpoints. Run only on a normal exit; on the
        # ``on_error`` path the postcondition is moot.
        if self.checkpoints != "off" and not error_path:
            self._run_validate_checkpoints(sg_name, sg, scope, bound_outputs)

        # Fire the exit hook before returning. `_run_scope`'s finally
        # already drained streaming futures via `_teardown_streaming`, so
        # the world is quiescent when the harness snapshots it. Hook
        # errors propagate — the rehearsal harness owns its own
        # exception boundary.
        if self.subgraph_exit_hook is not None:
            visit_index = self._visit_counts.get(sg_name, 0)
            self._visit_counts[sg_name] = visit_index + 1
            try:
                self.subgraph_exit_hook(SubgraphExitEvent(
                    sg_name=sg_name,
                    visit_index=visit_index,
                    bound_outputs=dict(bound_outputs),
                    exit_value=exit_value,
                    error_path=error_path,
                    elapsed_s=time.perf_counter() - visit_start,
                ))
            except Exception:
                logger.exception(
                    "subgraph_exit_hook raised for sg=%r visit=%d; "
                    "execution continues",
                    sg_name, visit_index,
                )

        # The subgraph node's "result" is the bound outputs plus the exit
        # condition under a reserved key. Top-level conditional_edges on
        # the subgraph node read `_exit` to dispatch.
        return {**bound_outputs, "_exit": exit_value}

    def _run_validate_checkpoints(
        self,
        sg_name: str,
        sg: SubgraphDef,
        scope: _ScopeState,
        bound_outputs: dict[str, Any],
    ) -> None:
        """Enforce ``validate=True`` postcondition checkpoints at execution time.

        Loads the subgraph's checkpoint sidecar
        ``<workflow_dir>/checkpoints/<sg_name>.py`` (when present) via
        :func:`gap.runtime.verify.load_checkpoints`, takes a ground-truth
        :class:`gap.runtime.verify.World` snapshot via
        ``world_snapshot_fn`` (the connector's ``world_snapshot``), and
        evaluates every ``validate=True`` predicate against
        ``(world, bound_outputs)``. ``validate=False`` probes are never
        enforced here.

        Results accumulate on ``self.checkpoint_results``. Failures are
        logged when ``checkpoints == "warn"`` and raise
        :class:`gap.errors.VerificationFailed` (naming the failing
        checkpoints) when ``checkpoints == "raise"``.

        When no ``world_snapshot_fn`` is available (connector exposes no
        ground truth — e.g. a real robot), enforcement degrades to a
        one-shot warning and the run proceeds unchanged.
        """
        if self.world_snapshot_fn is None:
            if not self._checkpoints_warned:
                self._checkpoints_warned = True
                logger.warning(
                    "checkpoints=%r but no world_snapshot_fn is available "
                    "(connector exposes no ground truth); checkpoint "
                    "enforcement is skipped",
                    self.checkpoints,
                )
            return

        cp_path = self.workflow_dir / "checkpoints" / f"{sg_name}.py"
        if not cp_path.exists():
            return

        from gap.runtime.verify import evaluate_checkpoint, load_checkpoints

        checkpoints = load_checkpoints(cp_path)
        world = self.world_snapshot_fn()
        failed: list[str] = []
        for cp in checkpoints:
            if not cp.validate:
                continue
            result = evaluate_checkpoint(cp, world, bound_outputs)
            self.checkpoint_results.append(result)
            if not result.passed:
                failed.append(cp.name)

        if not failed:
            return
        if self.checkpoints == "raise":
            raise VerificationFailed(
                f"subgraph {sg_name!r}: {len(failed)} validate=True "
                f"checkpoint(s) failed: {failed}"
            )
        logger.warning(
            "subgraph %r: %d validate=True checkpoint(s) failed: %s "
            "(checkpoints='warn'; continuing)",
            sg_name, len(failed), failed,
        )

    def _bind_subgraph_inputs(
        self,
        sg_name: str,
        sg: SubgraphDef,
        node: NodeDef | None = None,
        scope: _ScopeState | None = None,
    ) -> dict[str, Any]:
        """Bind a subgraph's declared inputs at one call site.

        Three sources, in precedence order, because a subgraph is a callee
        and its caller is entitled to say what it is called with:

        1. **The calling node's own ``inputs``** -- a literal, or a ``$ref``
           into the caller's scope. WORKFLOW_FORMAT tells authors "literals
           are passed as plain JSON", and script nodes have always honoured
           them; a subgraph node ignoring them was the difference between a
           graph the validator accepts and a graph that raises before its
           first node. Measured: a workflow whose entry subgraph declared
           ``arm_id`` and was called with ``{"inputs": {"arm_id": 0}}``
           aborted in 60 of 60 episodes across five self-learning
           iterations, and every episode was reported to the improver as a
           near miss.
        2. The latest cross-subgraph output of the same name.
        3. The facade's ``initial_inputs``.

        A name none of the three answers is still an error: a subgraph
        cannot run without a declared input, and failing here names the
        input, where failing later names whatever the script did with
        ``None``.

        Each call-site input is resolved **on its own**, and one that cannot
        be resolved falls through to the next source rather than failing the
        call. Before these inputs were honoured at all they were ignored
        wholesale, so a graph carrying a stale ``$ref`` beside inputs its
        upstream subgraphs already produce ran perfectly well; resolving the
        dict as a unit turned every such graph into a load-time abort. The
        shipped expert tool-hanging graph is one: its realign node passes
        ``$ref realign.held_object_in_tcp``, no node produces that field, and
        the six of eight episodes it used to hang became zero.
        """
        site: dict[str, Any] = {}
        unresolved: dict[str, str] = {}
        if node is not None and node.inputs:
            local = scope.local_outputs if scope is not None else {}
            for in_name, spec in node.inputs.items():
                if in_name not in sg.inputs:
                    continue
                try:
                    site[in_name] = resolve_inputs({in_name: spec}, local)[in_name]
                except Exception as exc:  # noqa: BLE001 - recorded, then the next source is tried
                    unresolved[in_name] = str(exc)
        bound: dict[str, Any] = {}
        for in_name in sg.inputs:
            value = site.get(in_name)
            if value is None:
                value = self._lookup_cross_subgraph_output(in_name)
            if value is None:
                detail = (
                    f"; the calling node passes one but it does not resolve ({unresolved[in_name]})"
                    if in_name in unresolved
                    else " and the calling node passes no value for it"
                )
                raise PipelineError(
                    f"subgraph {sg_name!r} input {in_name!r} has no upstream producer{detail}"
                )
            bound[in_name] = value
        return bound

    def _lookup_cross_subgraph_output(self, name: str) -> Any | None:
        if name == OBSERVATION_STREAM_INPUT_NAME and self.observation_stream is not None:
            return self.observation_stream
        latest: Any | None = self.initial_inputs.get(name)
        for sg_outputs in self.cross_subgraph_outputs.values():
            if name in sg_outputs:
                latest = sg_outputs[name]
        return latest

    # ------------------------------------------------------------------
    # Conditional edges
    # ------------------------------------------------------------------

    def _resolve_cond_target(
        self,
        node_name: str,
        node: NodeDef,
        scope: _ScopeState,
        ce: Any,
    ) -> str | None:
        """Resolve a conditional edge to a target name."""
        if node.type == "router":
            # Router nodes return their dispatch result through their output.
            # The router_field is None; the router's output IS the target name
            # (or, for Send, a list — handled by _run_router which folds the
            # list into local_outputs and never reaches conditional_edges).
            tgt = scope.local_outputs.get(node_name)
            if isinstance(tgt, str) and tgt in ce.mapping:
                return ce.mapping[tgt]
            raise PipelineError(
                f"router {node_name!r} produced {tgt!r}, not a valid mapping key"
            )

        # Non-router source: read router_field on the node's output.
        out = scope.local_outputs.get(node_name)
        if out is None:
            raise PipelineError(
                f"conditional_edges source {node_name!r} has no output"
            )
        # For subgraph nodes, _exit is the canonical router field.
        rf = ce.router_field
        if node.type == "subgraph" and rf == "exit":
            rf = "_exit"
        value = self._read_field(out, rf or "")
        if not isinstance(value, str):
            value = str(value)
        if value not in ce.mapping:
            raise PipelineError(
                f"conditional_edges from {node_name!r}: value {value!r} "
                f"not in mapping {list(ce.mapping.keys())!r}"
            )
        return ce.mapping[value]

    @staticmethod
    def _read_field(out: Any, field_name: str) -> Any:
        if isinstance(out, dict):
            if field_name in out:
                return out[field_name]
        if hasattr(out, field_name):
            return getattr(out, field_name)
        raise PipelineError(
            f"cannot read field {field_name!r} from output of type "
            f"{type(out).__name__}"
        )

    # ------------------------------------------------------------------
    # Streaming nodes
    # ------------------------------------------------------------------

    def _spawn_streaming(
        self, node_name: str, node: NodeDef, scope: _ScopeState,
    ) -> None:
        """Spawn a streaming node into a detached future."""
        if node_name in scope.streaming_slots:
            return  # idempotent
        cancel_token = CancelToken()
        slot = StreamSlot(node_name, cancel_token)

        # Resolve inputs eagerly. The skill itself is responsible for
        # iterating and publishing to the slot via ctx (see below).
        resolved = resolve_inputs(node.inputs, scope.local_outputs)

        # Place the slot in local_outputs BEFORE spawning so that
        # downstream nodes resolving $ref to this name during the same
        # super-step see the slot (latest() will block until first
        # publish).
        scope.local_outputs[node_name] = slot
        scope.streaming_slots[node_name] = slot

        full_id = node_name
        pool = ThreadPoolExecutor(max_workers=1)

        def _run() -> Any:
            # The convention for streaming skills: the skill loop calls
            # ctx.publish(...) on each iteration. The node executors bind
            # the active StreamSlot onto the NodeContext they construct so
            # the skill code stays ignorant of the slot itself.
            try:
                if node.type == "tool":
                    return execute_tool_node(
                        full_id, node, resolved, self.tool_registry,
                        policy_executor=self.policy_executor,
                        cancel_token=cancel_token,
                        stream_slot=slot,
                    )
                if node.type == "script":
                    return execute_script_node(
                        full_id, node, resolved, self.tool_registry, self.workflow_dir,
                        trace=self.trace,
                        policy_executor=self.policy_executor,
                        cancel_token=cancel_token,
                        bundle_name=self._lookup_bundle_for_scope("<workflow>"),
                        skill_registry=self.skill_registry,
                        stream_slot=slot,
                    )
                raise PipelineError(
                    f"streaming nodes must be type=tool or type=script, "
                    f"got {node.type!r}"
                )
            except TaskCancelled:
                logger.debug("streaming node %r cancelled", node_name)
                return None

        fut = pool.submit(_run)
        scope.streaming_futures[node_name] = fut
        # Detach the pool — the future keeps it alive until completion;
        # we'll cancel via the token on teardown.
        pool.shutdown(wait=False)

    def _teardown_streaming(self, scope: _ScopeState) -> None:
        """Cancel and drain all streaming nodes in a scope."""
        if not scope.streaming_slots:
            return
        for slot in scope.streaming_slots.values():
            slot.cancel()
        # Wait briefly for cooperative shutdown.
        wait(
            list(scope.streaming_futures.values()),
            timeout=self._stream_grace_s,
        )
        for name, fut in scope.streaming_futures.items():
            if not fut.done():
                fut.cancel()
                logger.warning("streaming node %r force-cancelled", name)

    # ------------------------------------------------------------------
    # Router / Send dispatch
    # ------------------------------------------------------------------

    def _run_router(
        self, full_id: str, node_name: str, node: NodeDef, scope: _ScopeState,
    ) -> Any:
        """Run a router node. Returns either a string target or a list of Send results."""
        resolved = resolve_inputs(node.inputs, scope.local_outputs)

        # Run the routing script. Return value: str OR list[dict{to,inputs}].
        result = execute_script_node(
            full_id, node, resolved, self.tool_registry, self.workflow_dir,
            trace=self.trace, policy_executor=self.policy_executor,
            bundle_name="", skill_registry=self.skill_registry,
        )
        # execute_script_node returns a dict; routers should put their
        # decision under a `route` key.
        if not isinstance(result, dict) or "route" not in result:
            raise PipelineError(
                f"router {full_id!r} script must return a dict with 'route' "
                f"key; got {type(result).__name__}"
            )
        route = result["route"]

        # Static dispatch: route is a string target name.
        if isinstance(route, str):
            return route

        # Send dispatch: route is a list of {to, inputs} dicts.
        if isinstance(route, list):
            collected: list[Any] = []
            with ThreadPoolExecutor(max_workers=self.max_node_workers) as pool:
                futures: list[Future] = []
                for i, send in enumerate(route):
                    if not isinstance(send, dict) or "to" not in send:
                        raise PipelineError(
                            f"router {full_id!r}: route[{i}] must be "
                            f"{{'to', 'inputs'}}"
                        )
                    target_name = send["to"]
                    target_inputs = send.get("inputs", {}) or {}
                    # The target node is found in the same scope; spawn one
                    # copy with scoped inputs.
                    futures.append(pool.submit(
                        self._dispatch_send_copy,
                        full_id, i, target_name, target_inputs, scope,
                    ))
                for fut in futures:
                    collected.append(fut.result())
            return collected

        raise PipelineError(
            f"router {full_id!r}: 'route' must be string or list, got "
            f"{type(route).__name__}"
        )

    def _dispatch_send_copy(
        self,
        router_full_id: str,
        idx: int,
        target_name: str,
        target_inputs: dict[str, Any],
        scope: _ScopeState,
    ) -> Any:
        """Dispatch one Send copy of a target node with scoped inputs."""
        # The target must be a declared node in the scope's nodes dict; we
        # find it by walking the workflow. (Routers operate at the scope
        # level, so we need a handle on the scope's nodes — pass via scope
        # in a future refactor; for now, scan workflow + subgraphs.)
        node = self.workflow.nodes.get(target_name)
        if node is None:
            for sg in self.workflow.subgraphs.values():
                node = sg.nodes.get(target_name)
                if node is not None:
                    break
        if node is None:
            raise PipelineError(
                f"Send from {router_full_id!r}[{idx}]: unknown target "
                f"{target_name!r}"
            )

        # Build a one-off scope view: parent local_outputs + target-specific
        # inputs under a synthetic key. The simplest path: synthesize a
        # NodeDef whose inputs override the target's declared inputs.
        sub_node = NodeDef(
            type=node.type,
            inputs={**node.inputs, **target_inputs},
            streaming=node.streaming,
            script=node.script, tool=node.tool,
            ref=node.ref,
        )
        return self._dispatch_node(
            f"{target_name}#{idx}", sub_node, scope, "<send>",
        )

    # ------------------------------------------------------------------
    # End nodes
    # ------------------------------------------------------------------

    def _run_recovery(self, node_name: str, node: NodeDef) -> None:
        """Run an end node's best-effort recovery tool calls. Never raises."""
        if not node.recovery:
            return
        logger.info(
            "End node %r (%s): running %d recovery action(s)",
            node_name, node.status, len(node.recovery),
        )
        ctx = NodeContext(
            self.tool_registry, trace=self.trace,
            node_id=f"{node_name}.recovery",
            policy_executor=self.policy_executor,
        )
        for i, action in enumerate(node.recovery):
            try:
                ctx.tool(action.tool, **dict(action.inputs))
                logger.info("  recovery[%d] %s OK", i, action.tool)
            except Exception as exc:
                logger.warning(
                    "  recovery[%d] %s failed: %s", i, action.tool, exc,
                )

    # ------------------------------------------------------------------
    # Trace graph initialization
    # ------------------------------------------------------------------

    def _initialize_trace_graph(self) -> None:
        """Register workflow nodes and edges in the trace."""
        for node_name, node in self.workflow.nodes.items():
            self.trace.add_node(node_name, {
                "type": node.type,
                "ref": node.ref,
                "status": node.status,
            })
        for src, dst in self.workflow.edges:
            if src != START and dst != END:
                self.trace.add_edge(src, dst)
        for src, ce in self.workflow.conditional_edges.items():
            for tgt in ce.mapping.values():
                if tgt != END:
                    self.trace.add_edge(src, tgt)

        for sg_name, sg in self.workflow.subgraphs.items():
            for node_name, node in sg.nodes.items():
                full_id = f"{sg_name}.{node_name}"
                self.trace.add_node(full_id, {
                    "type": node.type,
                    "tool": node.tool,
                    "script": node.script,
                    "streaming": node.streaming,
                })
            for src, dst in sg.edges:
                if src != START and dst != END:
                    self.trace.add_edge(
                        f"{sg_name}.{src}", f"{sg_name}.{dst}",
                    )
            for src, ce in sg.conditional_edges.items():
                for tgt in ce.mapping.values():
                    if tgt != END:
                        self.trace.add_edge(
                            f"{sg_name}.{src}", f"{sg_name}.{tgt}",
                        )

````

## gap/runtime/validate.py

````text
"""v3 structural validator for workflow graphs.

Runs structural rules against a parsed v3 ``Workflow`` dataclass.
Returns a list of ``ValidationIssue`` objects; the caller decides
whether to hard-fail.

Rules (v3):

  Workflow level:
    W1.  ``version == 3``.
    W2.  At least one edge from ``START``.
    W3.  Every edge endpoint is either ``START``, ``END``, a declared
         node, or a target reachable through ``conditional_edges``.
    W4.  Every non-``END`` node is reachable from ``START``.
    W5.  Every node has at least one outgoing edge or is the source of
         a ``conditional_edges`` entry, or is type=end, or is streaming.
    W6.  ``conditional_edges`` source must be a declared node; every
         mapping target must be a declared node or ``END``.
    W7.  Every ``subgraph`` node's ``ref`` must resolve to a declared
         subgraph.
    W8.  Every reachable subgraph's declared inputs must be available
         either via the executor-injected ``observation_stream`` or
         from an upstream subgraph that declares an output of the same
         name (rule equivalent to v2 §6 R24).

  Subgraph level:
    S1.  ``edges`` from ``START`` to at least one declared node.
    S2.  Every non-``END`` node reachable from ``START``.
    S3.  Streaming nodes must have **no outgoing edges** and no
         conditional-edge entry.
    S4.  Streaming-flag/skill-contract consistency: a node with
         ``streaming: true`` must invoke a skill whose contract has
         ``streaming: true``, and vice versa (when skill_registry is
         provided).
    S5.  ``$ref`` heads must reference declared nodes (or ``in.<name>``
         for declared subgraph inputs / observation_stream).
    S6.  Subgraph ``outputs`` bind to declared nodes (not ``END``).
    S7.  ``exit.success_values`` must be a non-empty list.
    S8.  Conditional-edges from a non-router source must declare a
         ``router_field`` (the field on the source's output to switch
         on); from a router source ``router_field`` is null.
    S9.  ``on_error``, when set, must not be the name of a declared
         node — failure exits surface only via the on_error symbol.
    S10. ``on_error`` must not appear as any ``conditional_edges``
         mapping target.
    S11. Success-value/router_field consistency: when
         ``exit.router_field`` is null, every entry in
         ``exit.success_values`` must be a declared ``noop`` node;
         when ``router_field`` is set, success values are returned
         field-strings and must not collide with node names.

  Skill contract (when ``skill_registry`` is provided and a subgraph's
  ``skill`` names a bundle in it -- see :func:`_check_skill_contract`):
    SK1. With ``exit.router_field`` set, every ``exit.success_values``
         entry is an exit the bundle's ``exit_conditions`` declares
         (error); with ``router_field`` null the success values are the
         subgraph's own terminal nodes, and one outside that vocabulary
         is a warning, as is ``on_error`` outside it.
    SK2. When the bundle declares ``canonical_scripts``, some
         ``type: script`` node names one of them.
    SK3. A node naming a canonical script binds every ``run()``
         parameter without a default, and nothing ``run()`` rejects.
    SK4. A subgraph output bound to such a node names a field its
         ``run()`` returns.

Declared subgraph input types ("PointCloud", "Se3Pose", ...) resolve
through the :mod:`gap.schema` type registry; an unknown type name
surfaces as an error-level issue. The TypedDict introspection helpers
describe what each node consumes and produces, which is unchanged in v3.
"""

from __future__ import annotations

import importlib.util
import inspect
import logging
import sys
import types
import typing
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from gap_core.errors import ValidationIssue
from gap_core.schema import FieldInfo, type_fields

from .workflow import (
    END,
    OBSERVATION_STREAM_INPUT_NAME,
    RESERVED_INPUT_PSEUDOSTATE,
    START,
    NodeDef,
    Ref,
    SubgraphDef,
    Workflow,
)

logger = logging.getLogger(__name__)

# Type names that accept (or produce) anything — the open-dict escape
# hatch the proto era spelled "google.protobuf.Struct".
_ANY_TYPE_NAMES = frozenset({"Any", "dict"})
_NUMERIC_TYPE_NAMES = frozenset({"int", "float"})
_OBSERVATION_STREAM_TYPE_NAME = "ObservationStream"


# ---------------------------------------------------------------------------
# Schema dataclasses (reused for viz / replay)
# ---------------------------------------------------------------------------


@dataclass
class FieldSchema:
    """One input/output field of a node, normalized for cross-binding checks.

    ``type_str`` is the bare type name used across the graph surface: a
    scalar name ("str", "int", ...), a registered :mod:`gap.types` name
    ("PointCloud"), "dict"/"Any" for open dictionaries, or
    "ObservationStream". An empty ``type_str`` marks an unresolvable
    field (treated leniently). ``is_message`` marks structured
    (TypedDict) values; ``is_repeated`` marks ``list[...]`` fields.
    """

    name: str
    type_str: str
    is_message: bool = False
    is_repeated: bool = False
    required: bool = False


@dataclass
class NodeSchema:
    node_id: str
    inputs: dict[str, FieldSchema] = field(default_factory=dict)
    outputs: dict[str, FieldSchema] = field(default_factory=dict)


# ---------------------------------------------------------------------------
# Schema introspection helpers (typing logic; declared names via gap.schema)
# ---------------------------------------------------------------------------


def _field_info_to_schema(fi: FieldInfo) -> FieldSchema:
    """Map a :class:`gap.schema.FieldInfo` row to the validator's FieldSchema."""
    return FieldSchema(
        name=fi.name,
        type_str=fi.type_str,
        is_message=fi.is_message,
        is_repeated=fi.is_repeated,
        required=fi.required,
    )


def type_name_to_field_schemas(type_name: str) -> dict[str, FieldSchema]:
    """FieldSchema rows for a declared type name (subgraph inputs, viz ports).

    Resolves through the :mod:`gap.schema` registry; raises ``KeyError``
    (with the known names listed) when the name is unknown. Non-TypedDict
    registrations (Mask, scalars) introspect to an empty dict.
    """
    return {fi.name: _field_info_to_schema(fi) for fi in type_fields(type_name)}


def _is_typeddict(tp: Any) -> bool:
    return isinstance(tp, type) and hasattr(tp, "__annotations__") and hasattr(
        tp, "__total__"
    )


def _hint_to_field_schema(name: str, hint: Any) -> FieldSchema:
    origin = typing.get_origin(hint)

    if hint is Any:
        return FieldSchema(name=name, type_str="Any", is_message=True)

    if origin is dict:
        return FieldSchema(name=name, type_str="dict", is_message=True)

    if origin is list:
        args = typing.get_args(hint)
        if not args:
            raise ValueError(
                f"list type hint for '{name}' must be parameterized"
            )
        inner = _hint_to_field_schema(name, args[0])
        return FieldSchema(
            name=name, type_str=inner.type_str,
            is_message=inner.is_message, is_repeated=True,
        )

    if origin is types.UnionType or origin is typing.Union:
        args = [a for a in typing.get_args(hint) if a is not type(None)]
        if len(args) == 1:
            return _hint_to_field_schema(name, args[0])
        raise ValueError(
            f"union type hint for '{name}' must be T | None, got {hint}"
        )

    try:
        from .observation_stream import ObservationStream as _ObservationStream
    except Exception:
        _ObservationStream = None  # type: ignore[assignment]
    if _ObservationStream is not None and isinstance(hint, type) and issubclass(
        hint, _ObservationStream,
    ):
        return FieldSchema(
            name=name, type_str=_OBSERVATION_STREAM_TYPE_NAME, is_message=True,
        )

    if _is_typeddict(hint):
        return FieldSchema(name=name, type_str=hint.__name__, is_message=True)

    if isinstance(hint, type):
        # Scalars (str/int/float/bool/bytes) and bare classes (np.ndarray)
        # carry their class name, matching gap.schema.FieldInfo.type_str.
        return FieldSchema(name=name, type_str=hint.__name__)

    raise ValueError(
        f"cannot map type hint '{hint}' for '{name}' to a field schema"
    )


def build_tool_node_schema(
    node_id: str, node: NodeDef, tool_registry: Any,
) -> NodeSchema:
    """Build a NodeSchema for a `type: tool` node from the tool registry.

    ``tool_registry.get(name)`` returns a descriptor whose ``schema``
    attribute is a ``UnitSchema`` (see :mod:`gap.tools.schema`):
    ``inputs`` / ``outputs`` dicts of ``FieldInfo`` rows carrying the
    original ``python_type`` hint. Fields whose hints cannot be mapped
    degrade to an unresolvable (empty ``type_str``) FieldSchema.
    """
    tool_name = node.tool or ""
    if not tool_name:
        raise ValueError(f"tool node {node_id!r} has no `tool` field")
    descriptor = tool_registry.get(tool_name)

    inputs: dict[str, FieldSchema] = {}
    schema = descriptor.schema
    for fname, finfo in schema.inputs.items():
        try:
            inputs[fname] = _hint_to_field_schema(fname, finfo.python_type)
        except Exception:
            inputs[fname] = FieldSchema(name=fname, type_str="")
    outputs: dict[str, FieldSchema] = {}
    for fname, finfo in schema.outputs.items():
        try:
            outputs[fname] = _hint_to_field_schema(fname, finfo.python_type)
        except Exception:
            outputs[fname] = FieldSchema(name=fname, type_str="")
    return NodeSchema(node_id=node_id, inputs=inputs, outputs=outputs)


def build_script_node_schema(
    node_id: str, node: NodeDef, workflow_dir: Path,
) -> NodeSchema:
    script_rel = node.script or ""
    script_path = workflow_dir / script_rel
    module = _import_script_for_validation(script_path, node_id)

    run_fn = getattr(module, "run", None)
    if run_fn is None or not callable(run_fn):
        raise ValueError(f"script '{script_rel}' missing run() function")

    try:
        hints = typing.get_type_hints(run_fn, globalns=vars(module))
    except Exception as e:
        raise ValueError(f"cannot resolve type hints on run(): {e}") from e

    sig = inspect.signature(run_fn)
    inputs: dict[str, FieldSchema] = {}
    for param_name in sig.parameters:
        if param_name == "ctx":
            continue
        hint = hints.get(param_name)
        if hint is None:
            raise ValueError(
                f"parameter '{param_name}' on run() missing type annotation"
            )
        inputs[param_name] = _hint_to_field_schema(param_name, hint)

    outputs: dict[str, FieldSchema] = {}
    return_hint = hints.get("return")
    if return_hint is not None and return_hint is not type(None):
        if not hasattr(return_hint, "__annotations__"):
            raise ValueError(
                f"run() return type must be a TypedDict or None, got {return_hint}"
            )
        try:
            output_hints = typing.get_type_hints(return_hint)
        except Exception as e:
            raise ValueError(f"cannot resolve return TypedDict hints: {e}") from e
        for field_name, field_hint in output_hints.items():
            outputs[field_name] = _hint_to_field_schema(field_name, field_hint)

    return NodeSchema(node_id=node_id, inputs=inputs, outputs=outputs)


def _import_script_for_validation(path: Path, node_id: str):
    # Flatten dots in node_id so the synthetic module_name doesn't get
    # interpreted as a dotted package path (same fix as the runtime
    # script loader in gap/runtime/nodes.py).
    _safe_node_id = str(node_id).replace(".", "_")
    module_name = f"_gap_validate_{_safe_node_id}_{path.stem}"
    spec = importlib.util.spec_from_file_location(module_name, path)
    if spec is None or spec.loader is None:
        raise ValueError(f"cannot load script: {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module


def _types_compatible(upstream: FieldSchema, downstream: FieldSchema) -> bool:
    if (upstream.type_str in _ANY_TYPE_NAMES
            or downstream.type_str in _ANY_TYPE_NAMES):
        return True
    if upstream.is_message and downstream.is_message:
        if upstream.type_str and downstream.type_str:
            return upstream.type_str == downstream.type_str
        return True
    if not upstream.is_message and not downstream.is_message:
        if upstream.type_str == downstream.type_str:
            return True
        if (upstream.type_str in _NUMERIC_TYPE_NAMES
                and downstream.type_str in _NUMERIC_TYPE_NAMES):
            return True
        return False
    return False


# ---------------------------------------------------------------------------
# v3 structural validator
# ---------------------------------------------------------------------------


def validate_workflow(
    wf: Workflow,
    *,
    agent_registry: dict[str, dict[str, str]] | None = None,
    skill_registry: Any | None = None,
    tool_registry: Any | None = None,
) -> list[ValidationIssue]:
    """Run structural rules against a parsed v3 Workflow.

    Args:
        wf: Loaded ``Workflow`` dataclass.
        agent_registry: Optional ``{agent_name: exit_conditions_dict}``.
            When provided, used to validate that subgraph success/on_error
            match the agent's declared exit conditions. Codegen pipeline
            supplies this; the executor omits it.
        skill_registry: Optional skill registry. Duck-typed: must support
            ``name in registry`` and ``registry.get(name)`` returning an
            object whose ``meta`` carries the streaming contract field.
            When provided, enables streaming-contract enforcement on
            `type: tool` nodes whose tool name matches a registered
            atomic skill, and the skill-contract rules (SK1-SK4) on every
            subgraph whose ``skill`` names a bundle in the registry --
            read off ``meta.exit_conditions`` and ``canonical_scripts``
            when the entry carries them (a ``gap.skills.SkillInfo`` does;
            a bare streaming stub is left alone).
        tool_registry: Optional tool registry. Duck-typed: must support
            ``name in registry`` and ``registry.get(name)`` returning a
            descriptor whose ``schema`` attribute is a
            ``gap.tools.schema.UnitSchema``. When provided, enables
            schema introspection on `type: tool` nodes for cross-binding
            type checks. Unknown tools (e.g. `robot.*` connector tools
            not yet registered at validate time) degrade to a
            warning-level issue.
    """
    issues: list[ValidationIssue] = []

    # Workflow-level rules
    issues.extend(_check_workflow_level(wf))

    # Per-subgraph rules + node-schema introspection
    schemas: dict[tuple[str, str], NodeSchema] = {}
    for sg_name, sg in wf.subgraphs.items():
        issues.extend(_check_subgraph_level(
            sg_name, sg, skill_registry, agent_registry,
        ))
        for node_name, node in sg.nodes.items():
            sch = _try_build_node_schema(
                sg_name, node_name, node, wf.workflow_dir,
                skill_registry, tool_registry, issues,
            )
            if sch is not None:
                schemas[(sg_name, node_name)] = sch

    # Skill contract (SK1-SK4). After the schemas: SK4 reads a local
    # script's introspected outputs from them.
    if skill_registry is not None:
        for sg_name, sg in wf.subgraphs.items():
            if not sg.skill or sg.skill not in skill_registry:
                continue
            try:
                info = skill_registry.get(sg.skill)
            except Exception:
                continue
            if info is not None:
                issues.extend(_check_skill_contract(
                    sg_name, sg, info, wf.workflow_dir, schemas,
                ))

    # Cross-subgraph I/O
    issues.extend(_check_cross_subgraph_io(wf, schemas))

    return issues


# ---------------------------------------------------------------------------
# Workflow-level rules
# ---------------------------------------------------------------------------


def _check_workflow_level(wf: Workflow) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []

    if wf.version != 3:
        issues.append(_issue(
            "error", "workflow.version",
            f"unsupported version {wf.version}, expected 3 (W1)",
        ))

    begin_targets = wf.begin_targets()
    if not begin_targets:
        issues.append(_issue(
            "error", "workflow.edges",
            "workflow has no edge from START (W2)",
        ))

    valid_endpoints = {START, END} | set(wf.nodes.keys())
    for src, dst in wf.edges:
        if src not in valid_endpoints:
            issues.append(_issue(
                "error", "workflow.edges",
                f"edge source {src!r} is not a declared node (W3)",
            ))
        if dst not in valid_endpoints:
            issues.append(_issue(
                "error", "workflow.edges",
                f"edge target {dst!r} is not a declared node (W3)",
            ))

    # Subgraph-ref resolution
    for node_name, node in wf.nodes.items():
        if node.type == "subgraph":
            if node.ref not in wf.subgraphs:
                issues.append(_issue(
                    "error", f"workflow.nodes.{node_name}",
                    f"subgraph node references unknown subgraph "
                    f"{node.ref!r} (W7)",
                ))

    # Conditional-edges sources and mapping targets
    for src, ce in wf.conditional_edges.items():
        if src not in wf.nodes:
            issues.append(_issue(
                "error", f"workflow.conditional_edges.{src}",
                f"source {src!r} is not a declared node (W6)",
            ))
        for cond, tgt in ce.mapping.items():
            if tgt not in valid_endpoints:
                issues.append(_issue(
                    "error", f"workflow.conditional_edges.{src}.mapping.{cond}",
                    f"target {tgt!r} is not a declared node (W6)",
                ))

    # Reachability
    reachable = _reachable_from_start(wf.edges, wf.conditional_edges, wf.nodes.keys())
    for node_name, node in wf.nodes.items():
        if node_name not in reachable and node.type != "end":
            issues.append(_issue(
                "error", f"workflow.nodes.{node_name}",
                f"node {node_name!r} is unreachable from START (W4)",
            ))

    # Outgoing-edge requirement
    has_outgoing: set[str] = {src for src, _ in wf.edges} | set(wf.conditional_edges.keys())
    for node_name, node in wf.nodes.items():
        if node.type == "end":
            continue
        if node_name not in has_outgoing:
            issues.append(_issue(
                "error", f"workflow.nodes.{node_name}",
                f"node {node_name!r} has no outgoing edge or conditional "
                f"dispatch (W5)",
            ))

    # At least one end node exists
    if not any(n.type == "end" for n in wf.nodes.values()):
        issues.append(_issue(
            "error", "workflow.nodes",
            "workflow has no end node",
        ))

    return issues


def _reachable_from_start(
    edges: tuple[tuple[str, str], ...],
    cond_edges: dict[str, Any],
    declared: Any,
) -> set[str]:
    out: dict[str, list[str]] = {}
    for src, dst in edges:
        out.setdefault(src, []).append(dst)
    for src, ce in cond_edges.items():
        for tgt in ce.mapping.values():
            out.setdefault(src, []).append(tgt)

    reachable = {START}
    stack = [START]
    while stack:
        cur = stack.pop()
        for nxt in out.get(cur, []):
            if nxt not in reachable:
                reachable.add(nxt)
                stack.append(nxt)
    reachable.discard(START)
    reachable.discard(END)
    return reachable


# ---------------------------------------------------------------------------
# Subgraph-level rules
# ---------------------------------------------------------------------------


def _check_subgraph_level(
    sg_name: str,
    sg: SubgraphDef,
    skill_registry: Any | None,
    agent_registry: dict[str, dict[str, str]] | None,
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    loc = f"subgraphs.{sg_name}"
    valid = {START, END} | set(sg.nodes.keys())

    # S1: edge from START
    starts = [dst for src, dst in sg.edges if src == START]
    if not starts:
        issues.append(_issue(
            "error", f"{loc}.edges",
            "subgraph has no edge from START (S1)",
        ))

    # S3: streaming nodes must have no outgoing edges or conditional entry
    streaming_nodes = {
        n for n, nd in sg.nodes.items() if nd.streaming
    }
    for src, dst in sg.edges:
        if src in streaming_nodes:
            issues.append(_issue(
                "error", f"{loc}.edges",
                f"streaming node {src!r} has outgoing edge to {dst!r}; "
                f"streaming nodes must be pure sources (S3)",
            ))
    for src in sg.conditional_edges:
        if src in streaming_nodes:
            issues.append(_issue(
                "error", f"{loc}.conditional_edges",
                f"streaming node {src!r} has a conditional-edges entry; "
                f"streaming nodes must be pure sources (S3)",
            ))

    # S4: streaming-flag/skill-contract consistency. Atomic skills are
    # invoked via `type: tool` (the runtime auto-registers them as flat-name
    # tools); composite skills are expanded into subgraphs and never appear
    # as nodes. So we look up the skill metadata via the tool name, which
    # for an atomic-skill tool equals the skill name.
    if skill_registry is not None:
        for node_name, node in sg.nodes.items():
            if node.type != "tool":
                continue
            skill_name = node.tool or ""
            if skill_name not in skill_registry:
                # Not an atomic skill (e.g. it's a `robot.*` connector
                # tool); streaming-contract check doesn't apply.
                continue
            try:
                info = skill_registry.get(skill_name)
                meta = getattr(info, "meta", None) or info
                contract = getattr(meta, "contract", None) or {}
                if hasattr(contract, "get"):
                    contract_streaming = bool(contract.get("streaming", False))
                else:
                    contract_streaming = bool(getattr(contract, "streaming", False))
            except Exception:
                contract_streaming = False
            if node.streaming and not contract_streaming:
                issues.append(_issue(
                    "error", f"{loc}.nodes.{node_name}",
                    f"node has streaming=true but skill {skill_name!r}'s "
                    f"contract has streaming=false (S4)",
                ))
            if (not node.streaming) and contract_streaming:
                issues.append(_issue(
                    "error", f"{loc}.nodes.{node_name}",
                    f"skill {skill_name!r}'s contract has streaming=true "
                    f"but the node does not declare streaming=true (S4)",
                ))

    # Edge endpoints declared
    for src, dst in sg.edges:
        if src not in valid:
            issues.append(_issue(
                "error", f"{loc}.edges",
                f"edge source {src!r} not declared (S5)",
            ))
        if dst not in valid:
            issues.append(_issue(
                "error", f"{loc}.edges",
                f"edge target {dst!r} not declared (S5)",
            ))

    # Conditional-edges
    for src, ce in sg.conditional_edges.items():
        if src not in sg.nodes:
            issues.append(_issue(
                "error", f"{loc}.conditional_edges.{src}",
                f"source {src!r} not declared",
            ))
        else:
            src_node = sg.nodes[src]
            if src_node.type == "router":
                if ce.router_field is not None:
                    issues.append(_issue(
                        "error", f"{loc}.conditional_edges.{src}",
                        f"router source {src!r} must have router_field=null "
                        f"(routing function returns target directly) (S8)",
                    ))
            else:
                if ce.router_field is None:
                    issues.append(_issue(
                        "error", f"{loc}.conditional_edges.{src}",
                        f"non-router source {src!r} must declare router_field "
                        f"naming the output field to switch on (S8)",
                    ))
        for cond, tgt in ce.mapping.items():
            if tgt not in valid:
                issues.append(_issue(
                    "error", f"{loc}.conditional_edges.{src}.mapping.{cond}",
                    f"target {tgt!r} not declared (S5)",
                ))

    # S2: reachability
    reachable = _reachable_from_start(
        sg.edges, sg.conditional_edges, sg.nodes.keys(),
    )
    # Streaming nodes reached via START fan-out are considered reachable.
    # A streaming-only graph (just [START, tracker]) would otherwise miss
    # reachability since they have no outgoing edges.
    for node_name in sg.nodes:
        if node_name in reachable:
            continue
        # Streaming nodes that are direct START targets are reachable.
        is_start_target = any(
            src == START and dst == node_name for src, dst in sg.edges
        )
        if is_start_target:
            continue
        issues.append(_issue(
            "error", f"{loc}.nodes.{node_name}",
            f"node {node_name!r} unreachable from START (S2)",
        ))

    # Outgoing-edge requirement (non-streaming, non-end)
    has_outgoing: set[str] = {src for src, _ in sg.edges} | set(sg.conditional_edges.keys())
    for node_name, node in sg.nodes.items():
        if node.type == "end" or node.streaming:
            continue
        if node_name not in has_outgoing:
            issues.append(_issue(
                "error", f"{loc}.nodes.{node_name}",
                f"non-streaming node {node_name!r} has no outgoing edge "
                f"or conditional dispatch",
            ))

    # S6: subgraph outputs
    for out_name, ref in sg.outputs.items():
        head = ref.parts()[0] if ref.parts() else ""
        if head not in sg.nodes:
            issues.append(_issue(
                "error", f"{loc}.outputs.{out_name}",
                f"output binding {ref.path!r} references unknown node "
                f"{head!r} (S6)",
            ))
            continue
        if sg.nodes[head].type == "end":
            issues.append(_issue(
                "error", f"{loc}.outputs.{out_name}",
                f"output binding {ref.path!r} cannot reference an end "
                f"node (S6)",
            ))

    # S7: exit.success_values non-empty
    if not sg.exit.success_values:
        issues.append(_issue(
            "error", f"{loc}.exit",
            "subgraph.exit.success_values must be a non-empty list (S7)",
        ))

    # Declared input types must resolve in the gap.schema type registry
    # (replaces the proto-era message-FQN resolution; a typo'd type name
    # must fail at validate time, not mid-execution).
    for in_name, in_type in sg.inputs.items():
        if in_type.endswith(_OBSERVATION_STREAM_TYPE_NAME):
            continue
        try:
            type_name_to_field_schemas(in_type)
        except KeyError as e:
            issues.append(_issue(
                "error", f"{loc}.inputs.{in_name}",
                str(e.args[0]) if e.args else str(e),
            ))

    # S9: on_error must NOT be a node name (failure exits live only as the
    #     on_error symbol — never as a declared node).
    if sg.on_error is not None and sg.on_error in sg.nodes:
        issues.append(_issue(
            "error", f"{loc}.on_error",
            f"on_error={sg.on_error!r} must not be a declared node — "
            f"failure exits surface only via on_error, not as nodes (S9)",
        ))

    # S10: on_error must NOT appear as any conditional_edges mapping target.
    if sg.on_error is not None:
        for src, ce in sg.conditional_edges.items():
            for cond, tgt in ce.mapping.items():
                if tgt == sg.on_error:
                    issues.append(_issue(
                        "error",
                        f"{loc}.conditional_edges.{src}.mapping.{cond}",
                        f"target {tgt!r} is the subgraph's on_error symbol "
                        f"and cannot be a conditional_edges target — failure "
                        f"exits surface only via on_error (S10)",
                    ))

    # S11: success_values vs router_field consistency.
    if sg.exit.router_field is None:
        # Each success value must be a declared noop node.
        for sv in sg.exit.success_values:
            node = sg.nodes.get(sv)
            if node is None:
                issues.append(_issue(
                    "error", f"{loc}.exit.success_values",
                    f"success value {sv!r} must be a declared noop node "
                    f"when router_field=null (S11)",
                ))
            elif node.type != "noop":
                issues.append(_issue(
                    "error", f"{loc}.exit.success_values",
                    f"success value {sv!r} is declared as type={node.type!r}; "
                    f"must be type=noop when router_field=null (S11)",
                ))
    else:
        # When router_field is set, success values are string field-values
        # the terminal node returns — they must NOT collide with node names.
        for sv in sg.exit.success_values:
            if sv in sg.nodes:
                issues.append(_issue(
                    "error", f"{loc}.exit.success_values",
                    f"success value {sv!r} collides with a declared node; "
                    f"when router_field is set, success values are returned "
                    f"field-strings and must not be node names (S11)",
                ))

    # S12: unordered $ref race. The executor is a frontier scheduler with
    # NO join barrier: a node is enqueued as soon as ANY in-edge source
    # completes. So a node that consumes ``Ref("P.*")`` is only safe when
    # P is guaranteed to have completed first — i.e. P must be an ancestor
    # of EVERY other source that can enqueue the node. A "diamond" join
    # (decide with in-edges from a slow container branch AND a parallel
    # item branch) races: the fast branch enqueues the node before the
    # other branch's producer ran, and ref resolution fails at runtime
    # with "unknown node in current scope".
    issues.extend(_check_ref_ordering(sg_name, sg))

    # Agent-registry exit-condition match (codegen-time only).
    # The catalog declares exit_conditions covering both success and failure;
    # we must reconcile against (success_values ∪ {on_error}).
    if agent_registry is not None and sg.skill in agent_registry:
        declared = set(agent_registry[sg.skill].keys())
        actual: set[str] = set(sg.exit.success_values)
        if sg.on_error is not None:
            actual.add(sg.on_error)
        for missing in sorted(declared - actual):
            issues.append(_issue(
                "error", f"{loc}.exit",
                f"missing exit condition {missing!r} declared in "
                f"{sg.skill}.exit_conditions",
            ))
        for extra in sorted(actual - declared):
            issues.append(_issue(
                "error", f"{loc}.exit",
                f"unexpected exit condition {extra!r} not in "
                f"{sg.skill}.exit_conditions",
            ))

    # S5: $ref heads referencing declared nodes / declared inputs
    for node_name, node in sg.nodes.items():
        for in_name, value in node.inputs.items():
            if not isinstance(value, Ref):
                continue
            parts = value.parts()
            if not parts:
                continue
            head = parts[0]
            if head == RESERVED_INPUT_PSEUDOSTATE:
                if len(parts) < 2:
                    issues.append(_issue(
                        "error",
                        f"{loc}.nodes.{node_name}.inputs.{in_name}",
                        f"$ref {value.path!r}: 'in' must be followed by an "
                        f"input name (S5)",
                    ))
                    continue
                bound = parts[1]
                if bound == OBSERVATION_STREAM_INPUT_NAME:
                    continue
                if bound not in sg.inputs:
                    issues.append(_issue(
                        "error",
                        f"{loc}.nodes.{node_name}.inputs.{in_name}",
                        f"$ref {value.path!r}: bound input {bound!r} not "
                        f"declared in subgraph inputs (S5)",
                    ))
                continue
            if head not in sg.nodes:
                issues.append(_issue(
                    "error",
                    f"{loc}.nodes.{node_name}.inputs.{in_name}",
                    f"$ref {value.path!r}: unknown node {head!r} (S5)",
                ))

    return issues


def _check_ref_ordering(sg_name: str, sg: SubgraphDef) -> list[ValidationIssue]:
    """S12: every intra-subgraph ``$ref`` producer must be sequenced before
    the consumer under the frontier scheduler's semantics.

    The executor enqueues a node as soon as ANY in-edge source completes
    (there is no join barrier). A consumer of ``Ref("P.*")`` is therefore
    only safe when P is an ancestor of every *other* node whose completion
    can enqueue the consumer — otherwise the consumer can run before P and
    ref resolution fails at runtime ("unknown node in current scope").
    Canonical skill subgraphs sequence producers in a single chain, which
    trivially satisfies this; the racy shape is a parallel "diamond"
    feeding a join node.
    """
    issues: list[ValidationIssue] = []
    loc = f"subgraphs.{sg_name}"

    # Union sequencing graph: static edges + conditional-mapping edges (a
    # taken conditional edge orders src before tgt exactly like a static
    # edge). START/END are structural, not producers.
    succ: dict[str, set[str]] = {}
    def _add(src: str, dst: str) -> None:
        if src != START and dst != END:
            succ.setdefault(src, set()).add(dst)
    for src, dst in sg.edges:
        _add(src, dst)
    for src, ce in sg.conditional_edges.items():
        for tgt in ce.mapping.values():
            _add(src, tgt)

    rev: dict[str, set[str]] = {}
    for s, ds in succ.items():
        for d in ds:
            rev.setdefault(d, set()).add(s)

    def _ancestors(target: str) -> set[str]:
        seen = {target}
        stack = [target]
        while stack:
            for p in rev.get(stack.pop(), ()):
                if p not in seen:
                    seen.add(p)
                    stack.append(p)
        seen.discard(target)
        return seen

    ancestors_cache: dict[str, set[str]] = {}
    def _anc(n: str) -> set[str]:
        if n not in ancestors_cache:
            ancestors_cache[n] = _ancestors(n)
        return ancestors_cache[n]

    for node_name, node in sg.nodes.items():
        producers = set()
        for value in node.inputs.values():
            if isinstance(value, Ref):
                parts = value.parts()
                head = parts[0] if parts else ""
                # Streaming producers are exempt: they are spawned eagerly
                # at scope entry and consumers read the latest published
                # snapshot (blocking until the first publish), so no
                # ordering edge is required.
                if (
                    head in sg.nodes
                    and head != node_name
                    and not sg.nodes[head].streaming
                ):
                    producers.add(head)
        if not producers:
            continue
        sources = rev.get(node_name, set())
        if not sources:
            # Only enqueued from START — no producer can have run yet.
            for p in sorted(producers):
                issues.append(_issue(
                    "error", f"{loc}.nodes.{node_name}",
                    f"node consumes $ref from {p!r} but is a START-entry "
                    f"node — {p!r} cannot have run before it (S12)",
                ))
            continue
        for p in sorted(producers):
            unordered = sorted(
                q for q in sources if q != p and p not in _anc(q) and p != q
            )
            if unordered:
                issues.append(_issue(
                    "error", f"{loc}.nodes.{node_name}",
                    f"node consumes $ref from {p!r} but can be scheduled by "
                    f"the completion of {unordered!r} before {p!r} has run — "
                    f"the executor has no join barrier, so parallel branches "
                    f"joining at a $ref consumer race. Sequence {p!r} on the "
                    f"same path as the other predecessor(s) (chain them, as "
                    f"the skill's canonical subgraph does) (S12)",
                ))


    return issues


# ---------------------------------------------------------------------------
# Skill contract (SK1-SK4)
# ---------------------------------------------------------------------------


def _check_skill_contract(
    sg_name: str,
    sg: SubgraphDef,
    info: Any,
    workflow_dir: Path,
    schemas: dict[tuple[str, str], NodeSchema],
) -> list[ValidationIssue]:
    """SK1-SK4: a subgraph whose ``skill`` names a registered bundle keeps
    the bundle's contract.

    The codegen pipeline reconciles exits through ``agent_registry`` and
    the executor omits it, so a hand-written or agent-composed graph that
    labelled a subgraph with a bundle and wired it wrong validated clean
    and failed on the node's first execution -- which a benchmark scores
    as a policy that tried the task and lost. These rules run whenever a
    skill registry is supplied and the label is a bundle in it; a
    ``generic`` label is in no registry and gets nothing here.

    SK1  With ``exit.router_field`` set, every ``exit.success_values``
         entry is an exit the bundle's ``exit_conditions`` declares: the
         values are what the terminal node returns under that field, so
         an undeclared one is an outcome the bundle never produces
         (error). With ``router_field`` null the success values are the
         subgraph's own noop terminal nodes (S11) -- the graph's symbols,
         like ``on_error`` -- and one outside the vocabulary is a warning:
         a shipped graph routes ``read_scene``'s ``bad_start`` to its own
         ``bad_start`` node while the bundle's SKILL.md declares three
         exits, and a subgraph running only ``discover_regions`` has no
         declared exit that names what it did. ``on_error`` outside the
         declared set is a warning -- it is the graph's own symbol for a
         raise, which the parent's mapping makes legal, but the declared
         failure exits are the vocabulary the SKILL.md documents. Covering only
         *some* declared exits is not an issue: a bundle with several
         canonical scripts is split one script per subgraph, as its
         SKILL.md recommends, and each subgraph covers that script's exits.
         (The codegen rule is stricter both ways because there the
         coordinator declared the exits it expects, per subgraph.)
    SK2  When the bundle declares ``canonical_scripts``, at least one
         ``type: script`` node names one, by file name; otherwise the
         label claims a skill the subgraph does not run (error).
    SK3  A node naming a canonical script binds every ``run()`` parameter
         without a default and nothing ``run()`` does not accept (error):
         the runtime calls ``run(ctx, **inputs)`` and either mismatch is a
         TypeError on the node's first execution. The signature is read
         from the file beside the graph when there is one -- a graph may
         ship its own script under a canonical name, and that is what
         runs -- and from the registry's import of the bundle's script
         otherwise, so a graph that resolves the bundle's script at run
         time is checked from its source directory. SKILL.md's
         ``required_inputs`` is bundle-wide while a bundle's scripts have
         different needs, so the named script's own signature is the
         contract that binds.
    SK4  A subgraph output bound to ``<node>.<field>`` on such a node
         names a field the script's return TypedDict declares (error). A
         return that is not a TypedDict declares nothing and is not
         checked.
    """
    issues: list[ValidationIssue] = []
    loc = f"subgraphs.{sg_name}"
    skill = sg.skill
    meta = getattr(info, "meta", None)
    exit_conditions = getattr(meta, "exit_conditions", None) or {}
    canonical = getattr(info, "canonical_scripts", None) or {}

    # SK1
    if exit_conditions:
        declared = sorted(exit_conditions)
        # Returned field-strings are the bundle's outcomes; terminal node
        # names are the graph's own (S11), and drift there is a warning.
        by_field = sg.exit.router_field is not None
        for sv in sg.exit.success_values:
            if sv not in exit_conditions:
                issues.append(_issue(
                    "error" if by_field else "warning",
                    f"{loc}.exit.success_values",
                    f"success value {sv!r} is not an exit skill {skill!r} "
                    f"declares (exit_conditions: {declared})"
                    + ("" if by_field else "; a terminal node named outside "
                       "the bundle's vocabulary, which the parent's mapping "
                       "must route")
                    + " (SK1)",
                ))
        if sg.on_error is not None and sg.on_error not in exit_conditions:
            issues.append(_issue(
                "warning", f"{loc}.on_error",
                f"on_error={sg.on_error!r} is not an exit skill {skill!r} "
                f"declares (exit_conditions: {declared}); the parent's "
                f"mapping must route it (SK1)",
            ))

    if not canonical:
        return issues

    # SK2: which script nodes run one of the bundle's canonical scripts.
    by_file: dict[str, Any] = {}
    for sinfo in canonical.values():
        rel = getattr(sinfo, "bundle_relative", "") or str(getattr(sinfo, "path", ""))
        if rel:
            by_file[Path(rel).name] = sinfo
    named: dict[str, Any] = {}
    for node_name, node in sg.nodes.items():
        if node.type == "script" and node.script:
            sinfo = by_file.get(Path(node.script).name)
            if sinfo is not None:
                named[node_name] = sinfo
    if not named:
        issues.append(_issue(
            "error", loc,
            f"subgraph names skill {skill!r} but no script node runs one of "
            f"its canonical scripts ({sorted(by_file)}) (SK2)",
        ))
        return issues

    # SK3
    for node_name, sinfo in named.items():
        node = sg.nodes[node_name]
        local = workflow_dir / (node.script or "")
        module = None
        if local.is_file():
            try:
                module = _import_script_for_validation(local, f"{sg_name}.{node_name}")
            except Exception:
                module = None  # already a warning from schema introspection
        else:
            module = getattr(sinfo, "module", None)
        signature = _run_signature(module) if module is not None else None
        if signature is None:
            continue
        required, accepted, var_kw = signature
        bound = set(node.inputs)
        missing = sorted(required - bound)
        if missing:
            issues.append(_issue(
                "error", f"{loc}.nodes.{node_name}.inputs",
                f"node runs {skill!r}'s canonical script "
                f"{Path(node.script or '').name!r} but does not bind its "
                f"required input(s) {missing} (run() requires "
                f"{sorted(required)}) (SK3)",
            ))
        unknown = sorted(bound - accepted) if not var_kw else []
        if unknown:
            issues.append(_issue(
                "error", f"{loc}.nodes.{node_name}.inputs",
                f"node binds {unknown}, which {skill!r}'s canonical script "
                f"{Path(node.script or '').name!r} does not accept (run() "
                f"accepts {sorted(accepted)}) (SK3)",
            ))

    # SK4
    for out_name, ref in sg.outputs.items():
        parts = ref.parts()
        if len(parts) < 2 or parts[0] not in named:
            continue
        head, field_name = parts[0], parts[1]
        local = workflow_dir / (sg.nodes[head].script or "")
        if local.is_file():
            schema = schemas.get((sg_name, head))
            returned = set(schema.outputs) if schema is not None else set()
        else:
            unit = getattr(named[head], "schema", None)
            returned = set(getattr(unit, "outputs", None) or {})
        if returned and field_name not in returned:
            issues.append(_issue(
                "error", f"{loc}.outputs.{out_name}",
                f"output binding {ref.path!r} names {field_name!r}, which "
                f"{skill!r}'s canonical script {local.name!r} does not "
                f"return (returns {sorted(returned)}) (SK4)",
            ))

    return issues


def _run_signature(module: Any) -> tuple[set[str], set[str], bool] | None:
    """``(required, accepted, takes_var_kw)`` parameter names of a script
    module's ``run()``, ``ctx`` excluded; ``None`` when there is no
    inspectable ``run``."""
    run_fn = getattr(module, "run", None)
    if not callable(run_fn):
        return None
    try:
        sig = inspect.signature(run_fn)
    except (TypeError, ValueError):
        return None
    required: set[str] = set()
    accepted: set[str] = set()
    var_kw = False
    for name, param in sig.parameters.items():
        if name == "ctx":
            continue
        if param.kind is param.VAR_KEYWORD:
            var_kw = True
            continue
        if param.kind is param.VAR_POSITIONAL:
            continue
        accepted.add(name)
        if param.default is param.empty:
            required.add(name)
    return required, accepted, var_kw


# ---------------------------------------------------------------------------
# Cross-subgraph I/O (W8)
# ---------------------------------------------------------------------------


def _check_cross_subgraph_io(
    wf: Workflow,
    schemas: dict[tuple[str, str], NodeSchema],
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []

    # Build the set of subgraphs reachable from START via subgraph nodes.
    reachable_sgs: set[str] = set()
    out: dict[str, list[str]] = {}
    for src, dst in wf.edges:
        out.setdefault(src, []).append(dst)
    for src, ce in wf.conditional_edges.items():
        for tgt in ce.mapping.values():
            out.setdefault(src, []).append(tgt)
    stack = [START]
    seen = set()
    while stack:
        cur = stack.pop()
        if cur in seen:
            continue
        seen.add(cur)
        for nxt in out.get(cur, []):
            if nxt in (START, END) or nxt in seen:
                continue
            node = wf.nodes.get(nxt)
            if node is None:
                continue
            if node.type == "subgraph" and node.ref:
                reachable_sgs.add(node.ref)
            stack.append(nxt)

    # Producers, per top-level SITE. The executor binds a subgraph's inputs
    # from the outputs of subgraphs that have already RUN (plus whatever the
    # calling node passes), so "some reachable subgraph declares this name"
    # is not the question -- "a subgraph that always runs before this call
    # site declares it" is. Checking the weaker question passed two shapes
    # that abort at runtime before any node: a subgraph that produces its own
    # input, and a producer that sits later on the path or on a sibling
    # branch. Both cost whole self-learning runs, because the abort happens
    # before the first node and reads downstream as "the graph did nothing".
    node_of: dict[str, list[str]] = {}
    for node_name in seen:
        node = wf.nodes.get(node_name)
        if node is not None and node.type == "subgraph" and node.ref:
            node_of.setdefault(node.ref, []).append(node_name)

    # Reverse edges over the top level, for the ancestor walk.
    rev: dict[str, set[str]] = {}
    for src, dsts in out.items():
        for dst in dsts:
            rev.setdefault(dst, set()).add(src)

    def _ancestors(target: str) -> set[str]:
        """Every node that can precede *target* on some path from START."""
        seen_anc: set[str] = set()
        stack = [target]
        while stack:
            for parent in rev.get(stack.pop(), ()):
                if parent not in seen_anc:
                    seen_anc.add(parent)
                    stack.append(parent)
        seen_anc.discard(target)
        return seen_anc

    ancestors_cache: dict[str, set[str]] = {}

    def _anc(node_name: str) -> set[str]:
        if node_name not in ancestors_cache:
            ancestors_cache[node_name] = _ancestors(node_name)
        return ancestors_cache[node_name]

    for sg_name in sorted(reachable_sgs):
        sg = wf.subgraphs.get(sg_name)
        if sg is None:
            continue
        for site in sorted(node_of.get(sg_name, [])):
            site_node = wf.nodes.get(site)
            passed = set(site_node.inputs) if site_node is not None else set()
            before = _anc(site)
            upstream: set[str] = set()
            for other in before:
                other_node = wf.nodes.get(other)
                if other_node is None or other_node.type != "subgraph":
                    continue
                producer = wf.subgraphs.get(other_node.ref or "")
                if producer is not None and other_node.ref != sg_name:
                    upstream.update(producer.outputs)
            for in_name, in_type in sg.inputs.items():
                if (
                    in_name == OBSERVATION_STREAM_INPUT_NAME
                    and in_type.endswith(_OBSERVATION_STREAM_TYPE_NAME)
                ):
                    continue
                if in_name in passed or in_name in upstream:
                    continue
                issues.append(_issue(
                    "error",
                    f"subgraphs.{sg_name}.inputs.{in_name}",
                    f"input {in_name!r} (type {in_type!r}) is unbound at call "
                    f"site {site!r}: no subgraph that runs before it declares "
                    f"an output named {in_name!r}, and the node passes no "
                    f"value for it. Either produce it upstream (a subgraph's "
                    f"own outputs do not bind its own inputs) or pass it at "
                    f"the call site: "
                    f'"{site}": {{"type": "subgraph", "ref": "{sg_name}", '
                    f'"inputs": {{"{in_name}": ...}}}} (W8)',
                ))

    return issues


# ---------------------------------------------------------------------------
# Per-node schema build
# ---------------------------------------------------------------------------


def _try_build_node_schema(
    sg_name: str,
    node_name: str,
    node: NodeDef,
    workflow_dir: Path,
    skill_registry: Any | None,
    tool_registry: Any | None,
    issues: list[ValidationIssue],
) -> NodeSchema | None:
    """Introspect the schema for a node so cross-binding type checks can run.

    The validator only sees `type: tool` / `type: script` / `type: noop` /
    `type: router` / `type: subgraph` / `type: end` after the dispatch
    surface was unified (legacy `type: service`/`skill`/`policy` are
    rejected upstream by the workflow loader). Schema introspection routes
    `tool` through `build_tool_node_schema`, which reads the registered
    tool's ``UnitSchema``; tools missing from the registry at validate
    time (e.g. `robot.*` connector tools registered only at execution)
    degrade to a warning-level issue.
    """
    full_id = f"{sg_name}.{node_name}"
    try:
        if node.type == "script":
            return build_script_node_schema(full_id, node, workflow_dir)
        if node.type == "tool":
            if tool_registry is None:
                return None
            tool_name = node.tool or ""
            if not tool_name or tool_name not in tool_registry:
                try:
                    available = ", ".join(sorted(tool_registry._tools.keys()))
                except Exception:
                    available = ""
                issues.append(_issue(
                    "warning",
                    f"subgraphs.{sg_name}.nodes.{node_name}",
                    f"tool {tool_name!r} is not registered; skipping schema "
                    f"introspection."
                    + (f" Available tools: {available[:300]}..." if available else ""),
                ))
                return None
            return build_tool_node_schema(full_id, node, tool_registry)
    except ValueError as e:
        issues.append(_issue(
            "warning",
            f"subgraphs.{sg_name}.nodes.{node_name}",
            f"could not introspect schema: {e}",
        ))
    except Exception as e:
        issues.append(_issue(
            "warning",
            f"subgraphs.{sg_name}.nodes.{node_name}",
            f"could not introspect schema: {e}",
        ))
    return None


def _issue(severity: str, location: str, message: str) -> ValidationIssue:
    return ValidationIssue(
        severity=severity,
        node_id=location,
        field=None,
        message=message,
    )


# ---------------------------------------------------------------------------
# Legacy v1 compatibility shim — preserved for in-flight callers that
# haven't migrated yet. Returns ``(issues, {})`` to match the old shape.
# ---------------------------------------------------------------------------


def validate_graph(
    workflow: Any,
    workflow_dir: Path,
    skill_registry: Any | None = None,
) -> tuple[list[ValidationIssue], dict[str, NodeSchema]]:
    logger.warning(
        "validate_graph() is a legacy shim; use validate_workflow() directly"
    )
    if isinstance(workflow, Workflow):
        issues = validate_workflow(
            workflow, agent_registry=None, skill_registry=skill_registry,
        )
        return issues, {}
    return [], {}

````

## gap/runtime/verify/checkpoints.py

````text
"""Checkpoint primitives (per-subgraph postcondition predicates).

A :class:`Checkpoint` wraps one predicate over a :class:`World` snapshot;
:func:`evaluate_checkpoint` runs it with eval-error capture and optional
diagnostics; :func:`load_checkpoints` loads a sidecar ``checkpoints/<sg>.py``
module exposing ``CHECKPOINTS: list[Checkpoint]``.
"""

from __future__ import annotations

import logging
import time
from collections.abc import Callable
from dataclasses import dataclass
from typing import Any

from gap.runtime.verify.world import World

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class Checkpoint:
    """One postcondition predicate over a :class:`World` snapshot.

    Authored by the subgraph builder via ``Subgraph.add_checkpoint(...)``
    and materialized to a sidecar ``checkpoints/<sg>.py`` module the
    harness imports. ``predicate`` is called once per visit to the owning
    subgraph against the post-exit ``World`` snapshot.

    ``validate=True`` checkpoints are hard postconditions: they contribute
    to coverage metrics and drive triage, and are the ones a real run
    enforces. ``validate=False`` checkpoints are probes — they surface in
    the feedback prompt but never gate downstream subgraphs and are never
    enforced.
    """

    name: str
    subgraph: str
    predicate: Callable[..., bool]
    """``predicate(world)`` (1-arg) for the classic privileged-only check
    or ``predicate(world, outputs)`` (2-arg) for predicates that compare
    a subgraph's bound outputs (the ``set_outputs(...)`` dict) against
    the privileged ``World``. The evaluator introspects the callable's
    arity and dispatches accordingly so old single-arg predicates keep
    working unchanged."""
    rationale: str = ""
    validate: bool = True
    weight: float = 1.0
    diagnostics_fn: Callable[..., dict] | None = None
    """Same arity rules as ``predicate``."""


@dataclass
class CheckpointResult:
    """Outcome of one checkpoint evaluation."""

    name: str
    subgraph: str
    passed: bool
    eval_error: str | None = None
    diagnostics: dict | None = None
    eval_time_s: float = 0.0

    def to_dict(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "subgraph": self.subgraph,
            "passed": self.passed,
            "eval_error": self.eval_error,
            "diagnostics": self.diagnostics,
            "eval_time_s": self.eval_time_s,
        }


def evaluate_checkpoint(
    checkpoint: Checkpoint,
    world: World,
    outputs: dict | None = None,
) -> CheckpointResult:
    """Evaluate one :class:`Checkpoint` against a :class:`World` snapshot.

    ``outputs`` is the subgraph's ``bound_outputs`` dict (the values
    declared via ``Subgraph.set_outputs(...)``, resolved at the moment
    the subgraph exits). It is forwarded to predicates whose signature
    is ``(world, outputs)`` — i.e. predicates that compare authored
    workflow outputs (e.g. a perception OBB) against the privileged
    ``World``. Classic 1-arg predicates (``(world,) -> bool``) keep
    working unchanged; arity is detected per-call via
    :func:`inspect.signature`.

    A predicate that raises is reported as ``passed=False, eval_error=...``
    so the failure surfaces in the next iter's feedback prompt instead of
    crashing the harness. A diagnostics function that raises is treated
    as a missing diagnostic (``diagnostics=None``) — the predicate result
    is still authoritative.
    """
    t0 = time.perf_counter()
    outputs = outputs or {}
    passed = False
    eval_error: str | None = None
    try:
        passed = bool(_call_with_optional_outputs(
            checkpoint.predicate, world, outputs,
        ))
    except Exception as exc:
        eval_error = f"{type(exc).__name__}: {exc}"

    diagnostics: dict | None = None
    if checkpoint.diagnostics_fn is not None:
        try:
            diag = _call_with_optional_outputs(
                checkpoint.diagnostics_fn, world, outputs,
            )
            if isinstance(diag, dict):
                diagnostics = diag
        except Exception as exc:
            logger.debug(
                "checkpoint %s.%s diagnostics raised: %s",
                checkpoint.subgraph, checkpoint.name, exc,
            )
    return CheckpointResult(
        name=checkpoint.name,
        subgraph=checkpoint.subgraph,
        passed=passed,
        eval_error=eval_error,
        diagnostics=diagnostics,
        eval_time_s=time.perf_counter() - t0,
    )


def _call_with_optional_outputs(fn: Callable, world: World, outputs: dict) -> Any:
    """Dispatch a checkpoint callable on its declared arity.

    1-arg: ``fn(world)`` — the historical signature, kept working.
    2-arg: ``fn(world, outputs)`` — the new shape, lets predicates
    compare workflow-edge outputs (the subgraph's ``set_outputs(...)``
    dict) against the privileged ``World``. ``*args`` callables are
    treated as 1-arg by default — pass ``outputs`` as the second
    positional only when the signature explicitly declares a second
    positional parameter.
    """
    two_arg = False
    try:
        import inspect
        sig = inspect.signature(fn)
        # Count positional-capable parameters (POSITIONAL_OR_KEYWORD or
        # POSITIONAL_ONLY); ignore *args/**kwargs/keyword-only.
        positional_kinds = {
            inspect.Parameter.POSITIONAL_OR_KEYWORD,
            inspect.Parameter.POSITIONAL_ONLY,
        }
        positional = [
            p for p in sig.parameters.values() if p.kind in positional_kinds
        ]
        two_arg = len(positional) >= 2
    except (TypeError, ValueError):
        # Builtins or C-level callables sometimes refuse introspection.
        # Fall back to the historical 1-arg signature. The call itself
        # stays OUTSIDE this try: a TypeError raised inside the predicate
        # body must surface as that predicate's eval_error, not silently
        # re-dispatch to the 1-arg shape (which then fails with a
        # misleading "missing positional argument" message).
        two_arg = False
    if two_arg:
        return fn(world, outputs)
    return fn(world)


def load_checkpoints(path: str | Any) -> list[Checkpoint]:
    """Load a checkpoint module written by ``Subgraph.dump_checkpoints_module``.

    The module is expected to expose ``CHECKPOINTS: list[Checkpoint]``.
    Re-executed each call so lambdas re-close over a fresh scope (the
    harness can reload after every workflow rewrite without stale
    references to torn-down Subgraph objects).
    """
    from pathlib import Path as _Path

    p = _Path(path)
    if not p.exists():
        raise FileNotFoundError(f"checkpoint module {p} not found")
    source = p.read_text()
    sandbox: dict[str, Any] = {"__name__": f"_checkpoints_{p.stem}"}
    exec(compile(source, str(p), "exec"), sandbox)
    cps = sandbox.get("CHECKPOINTS")
    if not isinstance(cps, list):
        raise ValueError(
            f"checkpoint module {p} did not export CHECKPOINTS as a list"
        )
    out: list[Checkpoint] = []
    for c in cps:
        if not isinstance(c, Checkpoint):
            raise ValueError(
                f"checkpoint module {p}: CHECKPOINTS[{len(out)}] is not a "
                f"Checkpoint (got {type(c).__name__})"
            )
        out.append(c)
    return out


__all__ = [
    "Checkpoint",
    "CheckpointResult",
    "evaluate_checkpoint",
    "load_checkpoints",
]

````

## examples/libero_quickstart/graph/workflow.json

````text
{
 "version": 3,
 "meta": {
  "name": "pick_and_place",
  "description": "Pick the blue and yellow alphabet soup can and place it in the basket (direct-IK align-then-descend grasp; no trajectory planner required)."
 },
 "nodes": {
  "target": {
   "type": "subgraph",
   "ref": "target_sg"
  },
  "container": {
   "type": "subgraph",
   "ref": "container_sg"
  },
  "grasp": {
   "type": "subgraph",
   "ref": "grasp_sg"
  },
  "transport": {
   "type": "subgraph",
   "ref": "transport_sg"
  },
  "done": {
   "type": "end",
   "status": "success"
  },
  "abort": {
   "type": "end",
   "status": "failure",
   "recovery": [
    {
     "tool": "robot.open_gripper",
     "inputs": {}
    },
    {
     "tool": "robot.go_home",
     "inputs": {}
    }
   ]
  }
 },
 "edges": [
  [
   "START",
   "target"
  ]
 ],
 "conditional_edges": {
  "target": {
   "router_field": "exit",
   "mapping": {
    "found": "container",
    "not_found": "abort"
   }
  },
  "container": {
   "router_field": "exit",
   "mapping": {
    "found": "grasp",
    "not_found": "abort"
   }
  },
  "grasp": {
   "router_field": "exit",
   "mapping": {
    "grasped": "transport",
    "failed": "abort"
   }
  },
  "transport": {
   "router_field": "exit",
   "mapping": {
    "placed": "done",
    "blocked": "abort"
   }
  }
 },
 "subgraphs": {
  "target_sg": {
   "skill": "perceiving-objects",
   "inputs": {},
   "outputs": {
    "target_obb": {
     "$ref": "filter_obb.obb"
    },
    "target_mask": {
     "$ref": "perceive.mask"
    }
   },
   "nodes": {
    "observe": {
     "type": "tool",
     "tool": "robot.get_observation"
    },
    "perceive": {
     "type": "script",
     "script": "scripts/target/perceive_dino_vlm.py",
     "inputs": {
      "cameras": {
       "$ref": "observe.cameras"
      },
      "object_name": "blue and yellow alphabet soup can"
     }
    },
    "filter_obb": {
     "type": "tool",
     "tool": "geometry.filter_and_compute_obb",
     "inputs": {
      "points": {
       "$ref": "perceive.cloud"
      }
     }
    },
    "found": {
     "type": "noop"
    }
   },
   "edges": [
    [
     "START",
     "observe"
    ],
    [
     "observe",
     "perceive"
    ],
    [
     "perceive",
     "filter_obb"
    ],
    [
     "filter_obb",
     "found"
    ],
    [
     "found",
     "END"
    ]
   ],
   "conditional_edges": {},
   "exit": {
    "router_field": null,
    "success_values": [
     "found"
    ]
   },
   "on_error": "not_found"
  },
  "container_sg": {
   "skill": "perceiving-objects",
   "inputs": {},
   "outputs": {
    "container_obb": {
     "$ref": "filter_obb.obb"
    }
   },
   "nodes": {
    "observe": {
     "type": "tool",
     "tool": "robot.get_observation"
    },
    "perceive": {
     "type": "script",
     "script": "scripts/container/perceive_dino_vlm.py",
     "inputs": {
      "cameras": {
       "$ref": "observe.cameras"
      },
      "object_name": "basket"
     }
    },
    "filter_obb": {
     "type": "tool",
     "tool": "geometry.filter_and_compute_obb",
     "inputs": {
      "points": {
       "$ref": "perceive.cloud"
      }
     }
    },
    "found": {
     "type": "noop"
    }
   },
   "edges": [
    [
     "START",
     "observe"
    ],
    [
     "observe",
     "perceive"
    ],
    [
     "perceive",
     "filter_obb"
    ],
    [
     "filter_obb",
     "found"
    ],
    [
     "found",
     "END"
    ]
   ],
   "conditional_edges": {},
   "exit": {
    "router_field": null,
    "success_values": [
     "found"
    ]
   },
   "on_error": "not_found"
  },
  "grasp_sg": {
   "skill": "grasping-direct-ik",
   "inputs": {
    "target_obb": "OrientedBoundingBox"
   },
   "outputs": {},
   "nodes": {
    "open": {
     "type": "tool",
     "tool": "robot.open_gripper",
     "inputs": {
      "settle_steps": 40
     }
    },
    "compute_grasp": {
     "type": "tool",
     "tool": "geometry.top_down_grasp_candidates",
     "inputs": {
      "obb": {
       "$ref": "in.target_obb"
      }
     }
    },
    "compute_align": {
     "type": "script",
     "script": "scripts/grasp/compute_align_pose.py",
     "inputs": {
      "grasp_pose": {
       "$ref": "compute_grasp.candidates.poses.0"
      },
      "target_obb": {
       "$ref": "in.target_obb"
      }
     }
    },
    "rotate_align": {
     "type": "script",
     "script": "scripts/grasp/move_linear.py",
     "inputs": {
      "pose": {
       "$ref": "compute_align.align_pose"
      }
     }
    },
    "descend": {
     "type": "script",
     "script": "scripts/grasp/move_linear.py",
     "inputs": {
      "pose": {
       "$ref": "compute_grasp.candidates.poses.0"
      }
     }
    },
    "close": {
     "type": "tool",
     "tool": "robot.close_gripper",
     "inputs": {
      "settle_steps": 60
     }
    },
    "grasped": {
     "type": "noop"
    }
   },
   "edges": [
    [
     "START",
     "open"
    ],
    [
     "open",
     "compute_grasp"
    ],
    [
     "compute_grasp",
     "compute_align"
    ],
    [
     "compute_align",
     "rotate_align"
    ],
    [
     "rotate_align",
     "descend"
    ],
    [
     "descend",
     "close"
    ],
    [
     "close",
     "grasped"
    ],
    [
     "grasped",
     "END"
    ]
   ],
   "conditional_edges": {},
   "exit": {
    "router_field": null,
    "success_values": [
     "grasped"
    ]
   },
   "on_error": "failed"
  },
  "transport_sg": {
   "skill": "transporting-objects",
   "inputs": {
    "container_obb": "OrientedBoundingBox"
   },
   "outputs": {
    "placed": {
     "$ref": "release.drop_position"
    }
   },
   "nodes": {
    "compute_drop": {
     "type": "script",
     "script": "scripts/transport/compute_drop_pose.py",
     "inputs": {
      "container_obb": {
       "$ref": "in.container_obb"
      }
     }
    },
    "move_above": {
     "type": "script",
     "script": "scripts/transport/waypoint_move.py",
     "inputs": {
      "drop_x": {
       "$ref": "compute_drop.drop_position.x"
      },
      "drop_y": {
       "$ref": "compute_drop.drop_position.y"
      }
     }
    },
    "release": {
     "type": "script",
     "script": "scripts/transport/descend_release.py",
     "inputs": {
      "drop_position": {
       "$ref": "compute_drop.drop_position"
      }
     }
    },
    "placed": {
     "type": "noop"
    }
   },
   "edges": [
    [
     "START",
     "compute_drop"
    ],
    [
     "compute_drop",
     "move_above"
    ],
    [
     "move_above",
     "release"
    ],
    [
     "release",
     "placed"
    ],
    [
     "placed",
     "END"
    ]
   ],
   "conditional_edges": {},
   "exit": {
    "router_field": null,
    "success_values": [
     "placed"
    ]
   },
   "on_error": "blocked"
  }
 }
}
````

## examples/libero_quickstart/graph/checkpoints/grasp_sg.py

````text
"""Postcondition checkpoints for the quickstart's grasp subgraph.

Loaded by the executor's checkpoint hook (``--checkpoints warn|raise``)
when the connector exposes ground-truth ``world_snapshot`` (sim only).
Evaluated once, against the post-exit World snapshot, every time
``grasp_sg`` completes on its success path.
"""

from gap.runtime.verify import Checkpoint


def _target_held(world) -> bool:
    """The soup can is in contact with a robot link after `close`."""
    return world.body("alphabet soup").is_grasped()


def _target_held_diagnostics(world) -> dict:
    body = world.body("alphabet soup")
    held = world.held_body()
    return {
        "resolved_body": body.name,
        "contacts": sorted(body.contacts),
        "held_body": held.name if held is not None else None,
        "gripper_open_fraction": (
            world.robot().gripper_open_fraction
            if world.robot_view is not None else None
        ),
        "body_z": body.z,
    }


CHECKPOINTS = [
    Checkpoint(
        name="target_held",
        subgraph="grasp_sg",
        predicate=_target_held,
        rationale=(
            "After close, the grasp target must be held: ground-truth "
            "contacts between the can and a robot finger link prove the "
            "gripper actually closed ON the object (not an empty grip)."
        ),
        validate=True,
        diagnostics_fn=_target_held_diagnostics,
    ),
]

````
