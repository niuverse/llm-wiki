Contents

Menu

Expand

Light mode

Dark mode

Auto light/dark, in light mode

Auto light/dark, in dark mode

[ ]
[ ]

Hide navigation sidebar

Hide table of contents sidebar

[Skip to content](#furo-main-content)

Toggle site navigation sidebar

[MuJoCo Documentation](../index.html)

Toggle Light / Dark / Auto color theme

Toggle table of contents sidebar

[![Logo](../_static/banner.svg)

MuJoCo Documentation](../index.html)

* [Overview](../overview.html)
* [Computation](../computation/index.html)[ ]
* [Modeling](../modeling.html)
* [XML Reference](../XMLreference.html)
* [Programming](../programming/index.html)[ ]
* [API Reference](../APIreference/index.html)[ ]
* [Python](../python.html)
* [MuJoCo XLA](../mjx.html)[ ]
* MuJoCo Warp[x]
* [Unity Plug-in](../unity.html)
* [OpenUSD](../OpenUSD/index.html)[ ]

  Toggle navigation of OpenUSD

  + [Building](../OpenUSD/building.html)
  + [mjcPhysics](../OpenUSD/mjcPhysics.html)
  + [File Format Plugin](../OpenUSD/mjcf_file_format_plugin.html)
  + [Importing](../OpenUSD/importing.html)
  + [Exporting](../OpenUSD/exporting.html)
* [Model Gallery](../models.html)
* [Changelog](../changelog.html)

Links

* [GitHub](https://github.com/google-deepmind/mujoco)

Back to top

[View this page](../_sources/mjwarp/index.rst.txt "View this page")

Toggle Light / Dark / Auto color theme

Toggle table of contents sidebar

# MuJoCo Warp (MJWarp)[#](#mujoco-warp-mjwarp "Link to this heading")

MuJoCo Warp (MJWarp) is an implementation of MuJoCo written in [Warp](https://nvidia.github.io/warp/) and optimized
for [NVIDIA](https://nvidia.com) hardware and parallel simulation. MJWarp lives in the
[google-deepmind/mujoco\_warp](https://github.com/google-deepmind/mujoco_warp) GitHub repository.

MJWarp is developed and maintained as a joint effort by [NVIDIA](https://nvidia.com) and
[Google DeepMind](https://deepmind.google/).

## Tutorial notebook[#](#tutorial-notebook "Link to this heading")

The MJWarp basics are covered in a tutorial [[notebook]](https://github.com/google-deepmind/mujoco_warp/blob/main/notebooks/tutorial.ipynb) [[open in colab]](https://colab.research.google.com/github/google-deepmind/mujoco_warp/blob/main/notebooks/tutorial.ipynb).

## When To Use MJWarp?[#](#when-to-use-mjwarp "Link to this heading")

### High throughput[#](#high-throughput "Link to this heading")

The MuJoCo ecosystem offers multiple options for batched simulation.

* [mujoco.rollout](../python.html#pyrollout): Python API for multi-threaded calls to [mj\_step](../APIreference/APIfunctions.html#mj-step) on CPU. High throughput
  can be achieved with hardware that has fast cores and large thread counts, but overall performance of applications
  requiring frequent host<>device transfers (e.g., reinforcement learning with simulation on CPU and learning on GPU)
  may be bottlenecked by transfer overhead.
* **mjx.step**: `jax.vmap` and `jax.pmap` enable multi-threaded and multi-device simulation with JAX on CPUs, GPUs, or
  TPUs.
* [`mujoco_warp.step`](api.html#mujoco_warp.step "mujoco_warp.step"): Python API for multi-threaded and multi-device simulation with CUDA via
  Warp on NVIDIA GPUs. Improved scaling for contact-rich scenes compared to the MJX JAX implementation.

### Low latency[#](#low-latency "Link to this heading")

MJWarp is optimized for throughput: the total number of simulation steps per unit time whereas MuJoCo is optimized for
latency: time for one simulation step. It is expected that a simulation step with MJWarp will be less performant
than a step with MuJoCo for the same simulation.

As a result, MJWarp is well suited for applications where large numbers of
samples are required, like reinforcement learning, while MuJoCo is likely more useful for real-time applications like
online control (e.g., model predictive control) or interactive graphical interfaces (e.g., simulation-based
teleoperation).

### Complex scenes[#](#complex-scenes "Link to this heading")

MJWarp scales better than MJX for scenes with many geoms or degrees of freedom, but not as well as MuJoCo. There may be
significant performance degradation in MJWarp for scenes beyond 60 DoFs. Supporting these larger scenes is a high
priority and progress is tracked in GitHub issues for: sparse Jacobians
[#88](https://github.com/google-deepmind/mujoco_warp/issues/88), block Cholesky factorization and solve
[#320](https://github.com/google-deepmind/mujoco_warp/issues/320), constraint islands
[#886](https://github.com/google-deepmind/mujoco_warp/issues/886), and sleeping islands
[#887](https://github.com/google-deepmind/mujoco_warp/issues/887).

### Differentiability[#](#differentiability "Link to this heading")

The dynamics API in MJX is automatically differentiable via JAX. We are considering whether to support this in MJWarp
via Warp - if this feature is important to you, please chime in on this issue
[here](https://github.com/google-deepmind/mujoco_warp/issues/500).

## Installation[#](#installation "Link to this heading")

**From PyPI:**

```
pip install mujoco-warp
```

**From source:**

```
git clone https://github.com/google-deepmind/mujoco_warp.git
cd mujoco_warp
uv sync --all-extras
```

To make sure everything is working:

```
uv run pytest -n 8
```

## Basic Usage[#](#basic-usage "Link to this heading")

Once installed, the package can be imported via `import mujoco_warp as mjw`. Structs, functions, and enums are
available directly from the top-level [`mjw`](api.html#module-mujoco_warp "mujoco_warp") module.

### Structs[#](#structs "Link to this heading")

Before running MJWarp functions on an NVIDIA GPU, structs must be copied onto the device via
[`mjw.put_model`](api.html#mujoco_warp.put_model "mujoco_warp.put_model") and [`mjw.make_data`](api.html#mujoco_warp.make_data "mujoco_warp.make_data") or
[`mjw.put_data`](api.html#mujoco_warp.put_data "mujoco_warp.put_data") functions. Placing an [mjModel](../APIreference/APItypes.html#mjmodel) on device yields an
[`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model"). Placing an [mjData](../APIreference/APItypes.html#mjdata) on device yields an
[`mjw.Data`](api.html#mujoco_warp.Data "mujoco_warp.Data").

```
mjm = mujoco.MjModel.from_xml_string("...")
mjd = mujoco.MjData(mjm)
m = mjw.put_model(mjm)
d = mjw.put_data(mjm, mjd)
```

These MJWarp variants mirror their MuJoCo counterparts but have a few key differences:

1. [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") and [`mjw.Data`](api.html#mujoco_warp.Data "mujoco_warp.Data") contain Warp arrays that are copied
   onto device.
2. Some fields are missing from [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") and [`mjw.Data`](api.html#mujoco_warp.Data "mujoco_warp.Data") for
   features that are unsupported.

### Batch sizes[#](#batch-sizes "Link to this heading")

MJWarp is optimized for parallel simulation. A batch of simulations can be specified with three parameters:

* [`nworld`](api.html#mujoco_warp.Data.nworld "mujoco_warp.Data.nworld"): Number of worlds to simulate.
* nconmax: Expected number of contacts per world. The maximum number of contacts for all worlds is
  `nconmax * nworld`.
* naconmax: Alternative to [nconmax](#nconmax), maximum number of contacts over all worlds. If [nconmax](#nconmax) and [naconmax](#naconmax) are
  both set then [nconmax](#nconmax) is ignored.
* njmax: Maximum number of constraints per world.

Semantic difference for [nconmax](#nconmax) and [njmax](#njmax).

It is possible for the number of contacts per world to exceed [nconmax](#nconmax) if the total number of contacts for all
worlds does not exceed `nworld x nconmax`. However, the number of constraints per world is strictly limited by
[njmax](#njmax).

XML parsing

Values for [nconmax](#nconmax) and [njmax](#njmax) are not parsed from [size/nconmax](../XMLreference.html#size-nconmax) and
[size/njmax](../XMLreference.html#size-njmax) (these parameters are deprecated). Values for these parameters must be provided to
[`mjw.make_data`](api.html#mujoco_warp.make_data "mujoco_warp.make_data") or [`mjw.put_data`](api.html#mujoco_warp.put_data "mujoco_warp.put_data").

### Functions[#](#functions "Link to this heading")

MuJoCo functions are exposed as MJWarp functions of the same name, but following
[PEP 8](https://peps.python.org/pep-0008/)-compliant names. Most of the [main simulation](../APIreference/APIfunctions.html#mainsimulation) and
some of the [sub-components](../APIreference/APIfunctions.html#subcomponents) for forward simulation are available from the top-level
[`mjw`](api.html#module-mujoco_warp "mujoco_warp") module.

### Minimal example[#](#minimal-example "Link to this heading")

```
# Throw a ball at 100 different velocities.

import mujoco
import mujoco_warp as mjw
import warp as wp

_MJCF=r"""
<mujoco>
  <worldbody>
    <body>
      <freejoint/>
      <geom size=".15" mass="1" type="sphere"/>
    </body>
  </worldbody>
</mujoco>
"""

mjm = mujoco.MjModel.from_xml_string(_MJCF)
m = mjw.put_model(mjm)
d = mjw.make_data(mjm, nworld=100)

# initialize velocities
wp.copy(d.qvel, wp.array([[float(i) / 100, 0, 0, 0, 0, 0] for i in range(100)], dtype=float))

# simulate physics
mjw.step(m, d)

print(f'qpos:\n{d.qpos.numpy()}')
```

### Command line scripts[#](#command-line-scripts "Link to this heading")

Benchmark an environment with testspeed

```
mjwarp-testspeed benchmark/humanoid/humanoid.xml
```

Interactive environment simulation with MJWarp

```
mjwarp-viewer benchmark/humanoid/humanoid.xml
```

## Feature Parity[#](#feature-parity "Link to this heading")

MJWarp supports most of the main simulation features of MuJoCo, with a few exceptions. MJWarp will raise an exception if
asked to copy to device an [mjModel](../APIreference/APItypes.html#mjmodel) with field values referencing unsupported features. For the most up-to-date
feature availability, please see
[MuJoCo API Compatibility](https://github.com/google-deepmind/mujoco_warp#mujoco-api-compatibility).

## Performance Tuning[#](#performance-tuning "Link to this heading")

The following are considerations for optimizing the performance of MJWarp.

### Graph capture[#](#graph-capture "Link to this heading")

MJWarp functions, for example [`mjw.step`](api.html#mujoco_warp.step "mujoco_warp.step"), often comprise a collection of kernel launches. Warp
will launch these kernels individually if the function is called directly. To improve performance, especially if the
function will be called multiple times, it is recommended to capture the operations that comprise the function as a CUDA
graph

```
with wp.ScopedCapture() as capture:
  mjw.step(m, d)
```

The graph can then be launched or re-launched

```
wp.capture_launch(capture.graph)
```

and will typically be significantly faster compared to calling the function directly. Please see the
[Warp Graph API reference](https://nvidia.github.io/warp/modules/runtime.html#graph-api-reference) for details.

### Batch sizes[#](#id1 "Link to this heading")

The maximum numbers of contacts and constraints, [nconmax](#nconmax) / [naconmax](#naconmax) and [njmax](#njmax) respectively, are specified when
creating [`mjw.Data`](api.html#mujoco_warp.Data "mujoco_warp.Data") with [`mjw.make_data`](api.html#mujoco_warp.make_data "mujoco_warp.make_data") or
[`mjw.put_data`](api.html#mujoco_warp.put_data "mujoco_warp.put_data"). Memory and computation scales with the values of these parameters. For best
performance, the values of these parameters should be set as small as possible while ensuring the simulation does not
exceed these limits.

It is expected that good values for these limits will be environment specific. In practice, selecting good values
typically involves trial-and-error. `mjwarp-testspeed` with the flag `--measure_alloc` for
printing the number of contacts and constraints at each simulation step and interacting with the simulation via
`mjwarp-viewer` and checking for overflow errors can both be useful techniques for
iteratively testing values for these parameters.

### Solver iterations[#](#solver-iterations "Link to this heading")

MuJoCo’s default solver settings for the maximum numbers of [solver iterations](../XMLreference.html#option-iterations) and
[linesearch iterations](../XMLreference.html#option-ls-iterations) are expected to provide reasonable performance. Reducing MJWarp’s
settings [`Option.iterations`](api.html#mujoco_warp.Option.iterations "mujoco_warp.Option.iterations") and/or
[`Option.ls_iterations`](api.html#mujoco_warp.Option.ls_iterations "mujoco_warp.Option.ls_iterations") limits may improve performance and should be secondary
considerations after tuning [nconmax](#nconmax) / [naconmax](#naconmax) and [njmax](#njmax).

Reducing these limits too much may prevent the constraint solver from converging and can lead to inaccurate or unstable
simulation.

Impact on Performance: MJX (JAX) and MJWarp

In [MJX](../mjx.html#mjx) these solver parameters are key for controlling simulation performance. With MJWarp, in contrast,
once all worlds have converged the solver can early exit and avoid unnecessary computation. As a result, the values
of these settings have comparatively less impact on performance.

### Contact sensor matching[#](#contact-sensor-matching "Link to this heading")

Scenes that include [contact sensors](../XMLreference.html#sensor-contact) have a parameter that specifies the maximum number of matched
contacts per sensor `Option.contact_sensor_max_match`. For best
performance, the value of this parameter should be as small as possible while ensuring the simulation does not exceed
the limit. Matched contacts that exceed this limit will be ignored.

The value of this parameter can be set directly, for example `model.opt.contact_sensor_maxmatch = 16`, or via an XML
custom numeric field

```
<custom>
  <numeric name="contact_sensor_maxmatch" data="16"/>
</custom>
```

Similar to the maximum numbers of contacts and constraints, a good value for this setting is expected to be environment
specific. `mjwarp-testspeed` and `mjwarp-viewer` may be useful
for tuning the value of this parameter.

### Parallel linesearch[#](#parallel-linesearch "Link to this heading")

In addition to the constraint solver’s iterative linesearch, MJWarp provides a parallel linesearch routine that
evaluates a set of step sizes in parallel and selects the best one. The step sizes are spaced logarithmically from
[`Model.opt.ls_parallel_min_step`](api.html#mujoco_warp.Option.ls_parallel_min_step "mujoco_warp.Option.ls_parallel_min_step") to 1 and the number of step sizes to
evaluate is set via [`Model.opt.ls_iterations`](api.html#mujoco_warp.Option.ls_iterations "mujoco_warp.Option.ls_iterations").

In some cases the parallel routine may provide improved performance compared to the constraint solver’s default
iterative linesearch.

To enable this routine set `Model.opt.ls_parallel=True` or add a custom numeric field to the XML

```
<custom>
  <numeric name="ls_parallel" data="1"/>
</custom>
```

Experimental feature

The parallel linesearch is currently an experimental feature.

### Memory[#](#memory "Link to this heading")

Simulation throughput is often limited by memory requirements for large numbers of worlds. Considerations for optimizing
memory utilization include:

* CCD colliders require more memory than primitive colliders, see MuJoCo’s [pair-wise colliders table](../computation/index.html#copairwise)
  for information about colliders.
* [multiccd](../XMLreference.html#option-flag-multiccd) requires more memory than CCD.
* CCD memory requirements scale linearly with [Option.ccd\_iterations](../XMLreference.html#option-ccd-iterations).
* A scene with at least one mesh geom and using [multiccd](../XMLreference.html#option-flag-multiccd) will have memory requirements
  that scale linearly with the maximum number of vertices per face and with the maximum number of edges per vertex,
  computed over all meshes.

[testspeed](#testspeed) provides the flag `--memory` for reporting a simulation’s total memory utilization and information about
[`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") and [`mjw.Data`](api.html#mujoco_warp.Data "mujoco_warp.Data") fields that require significant memory.
Memory allocated inline, including for CCD and the constraint solver, can also be significant and is reported as
`Other memory`.

Maximum number of contacts per collider

Some MJWarp colliders have a different maximum number of contacts compared to MuJoCo:

* `PLANE<>MESH`: 4 versus 3
* `HFieldCCD`: 4 versus `mjMAXCONPAIR`

Sparsity

Sparse Jacobians can enable significant memory savings. Updates for this feature are tracked in GitHub issue
[#88](https://github.com/google-deepmind/mujoco_warp/issues/88).

The [`mjw.make_data`](api.html#mujoco_warp.make_data "mujoco_warp.make_data") or [`mjw.put_data`](api.html#mujoco_warp.put_data "mujoco_warp.put_data") argument
`nccdmax` / `naccdmax` can be set to a value less than [nconmax](#nconmax) / [naconmax](#naconmax) in order to reduce the memory
requirements for CCD. The value for this parameter should be the maximum number of contacts generated by a CCD
collider, per world or for all worlds, respectively. For example, a batched simulation with 10 worlds that generates 80
total contacts with per-collider contacts: mesh-mesh: 30 (CCD), ellipsoid-ellipsoid: 10 (CCD), and sphere-sphere: 40
(primitive) should set [nconmax](#nconmax) / [naconmax](#naconmax) to at least 8 / 80 (may require more for broadphase) and `nccdmax` /
`naccdmax` to 3 / 30.

## Batched [`Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") Fields[#](#batched-model-fields "Link to this heading")

To enable batched simulation with different model parameter values, many [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") fields
have a leading batch dimension. By default, the leading dimension is 1 (i.e., `field.shape[0] == 1`) and the same
value(s) will be applied to all worlds. It is possible to override one of these fields with a `wp.array` that has a
leading dimension greater than one. This field will be indexed with a modulo operation of the world id and batch
dimension: `field[worldid % field.shape[0]]`.

Graph capture

The field array should be overridden prior to
[graph capture](#mjwgc) (i.e., `wp.ScopedCapture`)
since the update will not be applied to an existing graph.

```
# override shape and values
m.dof_damping = wp.array([[0.1], [0.2]], dtype=float)

with wp.ScopedCapture() as capture:
  mjw.step(m, d)
```

It is possible to override the field shape and set the field values after graph capture

```
# override shape
m.dof_damping = wp.empty((2, 1), dtype=float)

with wp.ScopedCapture() as capture:
  mjw.step(m, d)

# set batched values
dof_damping = wp.array([[0.1], [0.2]], dtype=float)
wp.copy(m.dof_damping, dof_damping)  # m.dof = dof_damping will not update the captured graph
```

### Modifying fields[#](#modifying-fields "Link to this heading")

The recommended workflow for modifying an [mjModel](../APIreference/APItypes.html#mjmodel) field is to first modify the corresponding [mjSpec](../APIreference/APItypes.html#mjspec) and
then compile to create a new [mjModel](../APIreference/APItypes.html#mjmodel) with the updated field. However, compilation currently requires a host call:
1 call per new field instance, i.e., `nworld` host calls for `nworld` instances.

Certain fields are safe to modify directly without compilation, enabling on-device updates. Please see
[mjModel changes](../programming/simulation.html#sichange) for details about specific fields. Additionally,
[GitHub issue 893](https://github.com/google-deepmind/mujoco_warp/issues/893) tracks adding on-device updates for a
subset of fields.

### Per-world meshes[#](#per-world-meshes "Link to this heading")

Per-world meshes enable heterogeneous worlds where different worlds simulate different meshes. The workflow
is:

1. Create an [mjSpec](../APIreference/APItypes.html#mjspec) with **all** mesh assets and the **maximum** number of geom slots needed across variants.
2. Compile each variant by mutating the spec and calling `spec.compile()`.
3. Compile a **base** model and create [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") from it.
4. Override the relevant [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") fields with per-world arrays built from the compiled
   variants.

**Example 1 — Geom-level** randomization (1 body, 1 geom, 2 mesh assets):

The base scene includes all mesh assets. The geom references one mesh (`mesh_a`); a second mesh
(`mesh_b`) is available for per-world substitution.

```
<mujoco>
  <asset>
    <mesh name="mesh_a" vertex="0 0 0 1 0 0 0 1 0 0 0 1"/>
    <mesh name="mesh_b" vertex="0 0 0 2 0 0 0 2 0 0 0 2"/>
  </asset>
  <worldbody>
    <body pos="0 0 1">
      <freejoint/>
      <geom name="obj" type="mesh" mesh="mesh_a"/>
    </body>
  </worldbody>
</mujoco>
```

```
nworld = 4

# base spec: 1 body with 1 mesh geom, all mesh assets
spec = mujoco.MjSpec()
mesh_a = spec.add_mesh()
mesh_a.name = "mesh_a"
mesh_a.uservert = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]

mesh_b = spec.add_mesh()
mesh_b.name = "mesh_b"
mesh_b.uservert = [0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2]

body = spec.worldbody.add_body()
body.pos = [0, 0, 1]
body.add_freejoint()
geom = body.add_geom()
geom.name = "obj"
geom.type = mujoco.mjtGeom.mjGEOM_MESH
geom.meshname = "mesh_a"

# compile each variant
geom.meshname = "mesh_a"
mjm_a = spec.compile()
geom.meshname = "mesh_b"
mjm_b = spec.compile()

# restore and compile base
geom.meshname = "mesh_a"
mjm = spec.compile()

m = mjw.put_model(mjm)
d = mjw.make_data(mjm, nworld=nworld)

# build per-world arrays: worlds 0-1 use mesh_a, worlds 2-3 use mesh_b
geom_id = mujoco.mj_name2id(mjm, mujoco.mjtObj.mjOBJ_GEOM, "obj")
variants = [mjm_a, mjm_b]
assignment = [0, 0, 1, 1]  # variant index per world

# build per-world arrays
dataid = np.tile(mjm.geom_dataid, (nworld, 1))
geom_size = np.zeros((nworld, mjm.ngeom, 3))
geom_aabb = np.zeros((nworld, mjm.ngeom, 2, 3))
geom_rbound = np.zeros((nworld, mjm.ngeom))
geom_pos = np.zeros((nworld, mjm.ngeom, 3))
body_mass = np.zeros((nworld, mjm.nbody))
body_subtreemass = np.zeros((nworld, mjm.nbody))
body_inertia = np.zeros((nworld, mjm.nbody, 3))
body_invweight0 = np.zeros((nworld, mjm.nbody, 2))
body_ipos = np.zeros((nworld, mjm.nbody, 3))
body_iquat = np.zeros((nworld, mjm.nbody, 4))

for w in range(nworld):
  ref = variants[assignment[w]]
  dataid[w, geom_id] = ref.geom_dataid[geom_id]
  geom_size[w] = ref.geom_size
  geom_aabb[w] = ref.geom_aabb.reshape(mjm.ngeom, 2, 3)
  geom_rbound[w] = ref.geom_rbound
  geom_pos[w] = ref.geom_pos
  body_mass[w] = ref.body_mass
  body_subtreemass[w] = ref.body_subtreemass
  body_inertia[w] = ref.body_inertia
  body_invweight0[w] = ref.body_invweight0
  body_ipos[w] = ref.body_ipos
  body_iquat[w] = ref.body_iquat

m.geom_dataid = wp.array(dataid, dtype=int)
m.geom_size = wp.array(geom_size, dtype=wp.vec3)
m.geom_aabb = wp.array(geom_aabb, dtype=wp.vec3)
m.geom_rbound = wp.array(geom_rbound, dtype=float)
m.geom_pos = wp.array(geom_pos, dtype=wp.vec3)
m.body_mass = wp.array(body_mass, dtype=float)
m.body_subtreemass = wp.array(body_subtreemass, dtype=float)
m.body_inertia = wp.array(body_inertia, dtype=wp.vec3)
m.body_invweight0 = wp.array(body_invweight0, dtype=wp.vec2)
m.body_ipos = wp.array(body_ipos, dtype=wp.vec3)
m.body_iquat = wp.array(body_iquat, dtype=wp.quat)
```

**Example 2 — Body-level** randomization (1 body, 1 or 2 geoms, 3 mesh assets):

Maximum geom count

For body-level randomization, the base `mjModel` provided to `mjw.put_model` should specify the **maximum number
of geoms** required across all variants. Geom slots that are unused in a particular variant can be disabled
(e.g., `contype=0`, `conaffinity=0`, `dataid=-1`), but they should still be present as part of the body in the
base model.

```
<mujoco>
  <asset>
    <mesh name="mA" vertex="0 0 0 1 0 0 0 1 0 0 0 1"/>
    <mesh name="mB" vertex="0 0 0 2 0 0 0 2 0 0 0 2"/>
    <mesh name="mC" vertex="0 0 0 3 0 0 0 3 0 0 0 3"/>
  </asset>
  <worldbody>
    <body name="obj" pos="0 0 1">
      <freejoint/>
      <geom name="obj_0" type="mesh" mesh="mA"/>
      <geom name="obj_1" size=".001" contype="0" conaffinity="0" mass="0"/>
    </body>
  </worldbody>
</mujoco>
```

```
nworld = 6

# base spec: body with 2 geom slots (max across variants), all mesh assets
spec = mujoco.MjSpec()
for name, scale in [("mA", 1), ("mB", 2), ("mC", 3)]:
  mesh = spec.add_mesh()
  mesh.name = name
  mesh.uservert = [0, 0, 0, scale, 0, 0, 0, scale, 0, 0, 0, scale]

body = spec.worldbody.add_body()
body.name = "obj"
body.pos = [0, 0, 1]
body.add_freejoint()

g0 = body.add_geom()
g0.name = "obj_0"
g0.type = mujoco.mjtGeom.mjGEOM_MESH
g0.meshname = "mA"

# null geom slot: disabled collision, no mesh
g1 = body.add_geom()
g1.name = "obj_1"
g1.size = [0.001, 0, 0]
g1.contype = 0
g1.conaffinity = 0
g1.mass = 0

# variant A: 1 geom (mesh mA), g1 stays null
mjm_a = spec.compile()

# variant B: 2 geoms (mesh mB + mC)
g0.meshname = "mB"
g1.type = mujoco.mjtGeom.mjGEOM_MESH
g1.meshname = "mC"
g1.contype = 1
g1.conaffinity = 1
mjm_b = spec.compile()

# restore base and compile
g0.meshname = "mA"
g1.type = mujoco.mjtGeom.mjGEOM_SPHERE
g1.contype = 0
g1.conaffinity = 0
mjm = spec.compile()

m = mjw.put_model(mjm)
d = mjw.make_data(mjm, nworld=nworld)

# worlds 0-2: variant A (1 active geom), worlds 3-5: variant B (2 active geoms)
variants = [mjm_a, mjm_b]
assignment = [0, 0, 0, 1, 1, 1]

geom0_id = mujoco.mj_name2id(mjm, mujoco.mjtObj.mjOBJ_GEOM, "obj_0")
geom1_id = mujoco.mj_name2id(mjm, mujoco.mjtObj.mjOBJ_GEOM, "obj_1")
body_id = mjm.geom_bodyid[geom0_id]

# build per-world arrays
dataid = np.tile(mjm.geom_dataid, (nworld, 1))
geom_size = np.zeros((nworld, mjm.ngeom, 3))
geom_rbound = np.zeros((nworld, mjm.ngeom))
geom_aabb = np.zeros((nworld, mjm.ngeom, 2, 3))
geom_pos = np.zeros((nworld, mjm.ngeom, 3))
body_mass = np.zeros((nworld, mjm.nbody))
body_subtreemass = np.zeros((nworld, mjm.nbody))
body_inertia = np.zeros((nworld, mjm.nbody, 3))
body_invweight0 = np.zeros((nworld, mjm.nbody, 2))
body_ipos = np.zeros((nworld, mjm.nbody, 3))
body_iquat = np.zeros((nworld, mjm.nbody, 4))

for w in range(nworld):
  ref = variants[assignment[w]]
  dataid[w] = ref.geom_dataid
  # disable unused geom slot for variant A
  if assignment[w] == 0:
    dataid[w, geom1_id] = -1
  geom_size[w] = ref.geom_size
  geom_rbound[w] = ref.geom_rbound
  geom_aabb[w] = ref.geom_aabb.reshape(mjm.ngeom, 2, 3)
  geom_pos[w] = ref.geom_pos
  body_mass[w] = ref.body_mass
  body_subtreemass[w] = ref.body_subtreemass
  body_inertia[w] = ref.body_inertia
  body_invweight0[w] = ref.body_invweight0
  body_ipos[w] = ref.body_ipos
  body_iquat[w] = ref.body_iquat

m.geom_dataid = wp.array(dataid, dtype=int)
m.geom_size = wp.array(geom_size, dtype=wp.vec3)
m.geom_rbound = wp.array(geom_rbound, dtype=float)
m.geom_aabb = wp.array(geom_aabb, dtype=wp.vec3)
m.geom_pos = wp.array(geom_pos, dtype=wp.vec3)
m.body_mass = wp.array(body_mass, dtype=float)
m.body_subtreemass = wp.array(body_subtreemass, dtype=float)
m.body_inertia = wp.array(body_inertia, dtype=wp.vec3)
m.body_invweight0 = wp.array(body_invweight0, dtype=wp.vec2)
m.body_ipos = wp.array(body_ipos, dtype=wp.vec3)
m.body_iquat = wp.array(body_iquat, dtype=wp.quat)
```

**Batched fields** — fields that must be overridden for per-world meshes:

| Field | dtype | Shape |
| --- | --- | --- |
| `geom_dataid` | `int` | `(nworld, ngeom)` |
| `geom_size` | `wp.vec3` | `(nworld, ngeom)` |
| `geom_aabb` | `wp.vec3` | `(nworld, ngeom, 2)` |
| `geom_rbound` | `float` | `(nworld, ngeom)` |
| `geom_pos` | `wp.vec3` | `(nworld, ngeom)` |
| `body_mass` | `float` | `(nworld, nbody)` |
| `body_subtreemass` | `float` | `(nworld, nbody)` |
| `body_inertia` | `wp.vec3` | `(nworld, nbody)` |
| `body_invweight0` | `wp.vec2` | `(nworld, nbody)` |
| `body_ipos` | `wp.vec3` | `(nworld, nbody)` |
| `body_iquat` | `wp.quat` | `(nworld, nbody)` |

## Batch Rendering[#](#batch-rendering "Link to this heading")

MJWarp provides a batch renderer for high-throughput ray tracing built on
[Warp’s accelerated BVHs](https://nvidia.github.io/warp/api_reference/_generated/warp.Bvh.html#warp.Bvh) for
rendering worlds with multiple cameras in parallel.

Key features:

* **Mesh rendering with textures**: BVH-accelerated mesh rendering with full texture support.
* **Heightfield rendering**: Optimized rendering for heightfields.
* **Flex rendering**: Render [flex](../XMLreference.html#deformable-flex) objects.
* **Lighting and shadows**: Dynamic lighting with configurable shadows; domain randomizable: `light_active`,
  `light_type`, `light_castshadow`, `light_xpos`, `light_xdir`.
* **Heterogeneous multi-camera**: Multiple cameras per world and each camera can have a different resolution
  (`cam_resolution`), field of view (`cam_fovy`, `cam_sensorsize`, `cam_intrinsic`), and output mode (`cam_output`).
* **Domain Randomization**: Per-world [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") fields (see
  [Batched Model Fields](#mjwbatch) above): `geom_matid`, `geom_size`, `geom_rgba`, `mat_texid`, `mat_texrepeat`,
  `mat_rgba`.
* **BVH-accelerated ray/rays API**: Ray casting: Accelerated [`mjw.ray`](api.html#mujoco_warp.ray "mujoco_warp.ray"),
  [`mjw.rays`](api.html#mujoco_warp.rays "mujoco_warp.rays"), and [rangefinder sensors](../XMLreference.html#sensor-rangefinder) via
  [Warp’s BVHs](https://nvidia.github.io/warp/api_reference/_generated/warp.Bvh.html#warp.Bvh).

### Basic Usage[#](#id2 "Link to this heading")

Rendering or raycasting requires a [`mjw.RenderContext`](api.html#mujoco_warp.RenderContext "mujoco_warp.RenderContext") which contains BVH structures,
rendering specific fields, and output buffers.

```
rc = mjw.create_render_context(
    mjm,
    nworld=1,
    cam_res=(256, 256),           # Override camera resolution (or per-camera list)
    render_rgb=True,              # Enable RGB output (or per-camera list)
    render_depth=True,            # Enable depth output (or per-camera list)
    use_textures=True,            # Apply material textures
    use_shadows=False,            # Enable shadow casting (slower)
    enabled_geom_groups=[0, 1],   # Only render geoms in groups 0 and 1
    cam_active=[True, False],     # Selectively enable/disable cameras
    flex_render_smooth=True,      # Smooth shading for soft bodies
)
```

Each [`mjw.RenderContext`](api.html#mujoco_warp.RenderContext "mujoco_warp.RenderContext") parameter can be applied globally or per camera.
Additionally, values for [`mjw.RenderContext`](api.html#mujoco_warp.RenderContext "mujoco_warp.RenderContext") parameters can be parsed from XML:

```
<camera name="front_camera" pos="3 0 2" xyaxes="0 1 0 -0.6 0 0.8" resolution="64 64" output="rgb depth"/>
```

or set via [mjSpec](../APIreference/APItypes.html#mjspec) for camera customization.

To render, first call [`mjw.refit_bvh`](api.html#mujoco_warp.refit_bvh "mujoco_warp.refit_bvh") to update the BVH trees,
followed by [`mjw.render`](api.html#mujoco_warp.render "mujoco_warp.render") to write to output buffers.

```
mjw.refit_bvh(m, d, rc)
mjw.render(m, d, rc)
```

The output buffers contain stacked pixels for all cameras with shape `(nworld, npixel)` and RGB data is
packed into one `uint32` variable. `RenderContext.rgb_adr` and `RenderContext.depth_adr` provide per-camera indexing.
For convenience, [`mjw.get_rgb`](api.html#mujoco_warp.get_rgb "mujoco_warp.get_rgb") and [`mjw.get_depth`](api.html#mujoco_warp.get_depth "mujoco_warp.get_depth")
return processed and reshaped RGB and depth data for a given camera batched for all worlds.

```
nworld = 1
cam_index = 0
resolution = rc.cam_res.numpy()[cam_index]
rgb_data = wp.zeros((nworld, resolution[1], resolution[0]), dtype=wp.vec3)
mjw.get_rgb(rc, rgb_data=rgb_data, cam_id=cam_index)
```

A complete example can be found in the MJWarp tutorial [[notebook]](https://github.com/google-deepmind/mujoco_warp/blob/main/notebooks/tutorial.ipynb) [[open in colab]](https://colab.research.google.com/github/google-deepmind/mujoco_warp/blob/main/notebooks/tutorial.ipynb).

### Benchmarks[#](#benchmarks "Link to this heading")

Rendering can be benchmarked using [testspeed](#testspeed):

```
mjwarp-testspeed benchmarks/primitives.xml --function=render
```

For benchmark results across a variety of scenes, see the
[released benchmarks](https://github.com/google-deepmind/mujoco_warp/pull/1113).

### Notes[#](#notes "Link to this heading")

* **Meshes**: Rendering computation scales with mesh complexity, specifically the number of vertices and faces. A
  primitive is expected to have better performance (i.e., higher throughput) compared to a similar-sized
  [mesh](../XMLreference.html#body-geom-mesh) or [heightfield](../XMLreference.html#body-geom-hfield).
* **Scaling**: Rendering scales linearly with resolution (total pixel count) and camera count.

## Frequently Asked Questions[#](#frequently-asked-questions "Link to this heading")

### Learning frameworks[#](#learning-frameworks "Link to this heading")

**Does MJWarp work with JAX?**

Yes. MJWarp is interoperable with [JAX](https://jax.readthedocs.io/). Please see the
[Warp Interoperability](https://nvidia.github.io/warp/modules/interoperability.html#jax) documentation for details.

Additionally, [MJX](../mjx.html#mjx) provides a JAX API for a subset of MJWarp’s [API](api.html). The implementation is
specified with `impl='warp'`.

**Does MJWarp work with PyTorch?**

Yes. MJWarp is interoperable with [PyTorch](https://pytorch.org). Please see the
[Warp Interoperability](https://nvidia.github.io/warp/modules/interoperability.html#pytorch) documentation for
details.

**How to train policies with MJWarp physics?**

For examples that train policies with MJWarp physics, please see:

* [Isaac Lab](https://github.com/isaac-sim/IsaacLab/tree/feature/newton): Train via
  [Newton API](https://github.com/newton-physics/newton).
* [mjlab](https://github.com/mujocolab/mjlab): Train directly with MJWarp using PyTorch.
* [MuJoCo Playground](https://github.com/google-deepmind/mujoco_playground): Train via [MJX API](../mjx.html#mjx).

### Features[#](#features "Link to this heading")

**Is MJWarp differentiable?**

No. MJWarp is not currently differentiable via
Warp’s [automatic differentiation](https://nvidia.github.io/warp/modules/differentiability.html#differentiability)
functionality. Updates from the team related to enabling automatic differentiation for MJWarp are tracked in this
[GitHub issue](https://github.com/google-deepmind/mujoco_warp/issues/500).

**Does MJWarp work with multiple GPUs?**

Yes. Warp’s `wp.ScopedDevice` enables multi-GPU computation

```
# create a graph for each device
graph = {}
for device in wp.get_cuda_devices():
  with wp.ScopedDevice(device):
    m = mjw.put_model(mjm)
    d = mjw.make_data(mjm)
    with wp.ScopedCapture(device) as capture:
      mjw.step(m, d)
    graph[device] = capture.graph

# launch a graph on each device
for device in wp.get_cuda_devices():
  wp.capture_launch(graph[device])
```

Please see the
[Warp documentation](https://nvidia.github.io/modules/devices.html#example-using-wp-scopeddevice-with-multiple-gpus)
for details and
[mjlab distributed training](https://mujocolab.github.io/mjlab/main/source/training/distributed_training.html) for a
reinforcement learning example.

**Is MJWarp on GPU deterministic?**

No. There may be ordering or *small* numerical differences between results computed by different executions of the same
code. This is characteristic of non-deterministic atomic operations on GPU. Set device to CPU with
`wp.set_device("cpu")` for deterministic results.

Developments for deterministic results on GPU are tracked in this
[GitHub issue](https://github.com/google-deepmind/mujoco_warp/issues/562).

**How are orientations represented?**

Orientations are represented as unit quaternions and follow [MuJoCo’s conventions](../programming/simulation.html#silayout):
`w, x, y, z` or `scalar, vector`.

`wp.quaternion`

MJWarp utilizes Warp’s [built-in type](https://nvidia.github.io/warp/modules/functions.html#warp.quaternion)
`wp.quaternion`. Importantly however, MJWarp does not utilize Warp’s `x, y, z, w` quaternion convention or
operations and instead implements quaternion routines that follow MuJoCo’s conventions. Please see
[math.py](https://github.com/google-deepmind/mujoco_warp/blob/main/mujoco_warp/_src/math.py) for the
implementations.

**Does MJWarp have a named access API / bind?**

No. Updates for this feature are tracked in this
[GitHub issue](https://github.com/google-deepmind/mujoco_warp/issues/884).

**Why are contacts reported when there are no collisions?**

1 contact will be reported for each unique geom pair that contributes to any collision sensor, even if this geom pair is
not in collision. Unlike MuJoCo or MJX where [collision sensors](../XMLreference.html#collision-sensors) make separate calls to
collision routines while computing sensor data, MJWarp computes and stores the data for these sensors in contacts while
running its main collision pipeline.

[Contact sensors](../XMLreference.html#sensor-contact) will report the correct information for contacts affecting the physics.

**Why are Jacobians always dense?**

Sparse Jacobians are not currently implemented and `Data` fields: `ten_J`, `actuator_moment`, `flexedge_J`, and
`efc.J` are always represented as dense matrices. Support for sparse Jacobians is tracked in GitHub issue
[#88](https://github.com/google-deepmind/mujoco_warp/issues/88).

**Why do some arrays have different shapes compared to mjModel or mjData?**

By default for batched simulation, many [`mjw.Data`](api.html#mujoco_warp.Data "mujoco_warp.Data") fields having a leading batch dimension of
size `Data.nworld`. Some [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") fields having a leading batch dimension with size
`1`, indicating that this
[field can be overridden with an array of batched parameters for domain randomization](#mjwbatch).

Additionally, certain fields including `Model.qM`, `Data.efc.J`, and `Data.efc.D` are padded to enable fast
loading on GPU.

**Why are numerical results from MJWarp and MuJoCo different?**

MJWarp utilizes `` float <https://nvidia.github.io/warp/modules/functions.html#warp.float32>`__s in contrast to MuJoCo's
default double representation for :ref:`mjtNum ``. Solver settings, including iterations, collision detection, and small
friction values may be sensitive to differences in floating point representation.

If you encounter unexpected results, including NaNs, please open a GitHub issue.

**Why is inertia matrix qM sparsity not consistent with MuJoCo / MJX?**

`mjtJacobian` semantics

* MuJoCo’s inertia matrix is always sparse and [mjtJacobian](../APIreference/APItypes.html#mjtjacobian) affects constraint Jacobians and related quantities
* MJWarp’s (and MJX’s) constraint Jacobian is always dense and [mjtJacobian](../APIreference/APItypes.html#mjtjacobian) is repurposed to affect the inertia
  matrix that can be represented as dense or sparse

The automatic sparsity threshold utilized by MJWarp for `AUTO` is optimized for GPU and set to `nv > 32`,
unlike MuJoCo and MJX which use `nv >= 60`. Dense `DENSE` and sparse `SPARSE` settings are consistent with MuJoCo
and MJX.

This feature is likely to change in the future.

**How to fix simulation runtime warnings?**

Warnings are provided when memory requirements exceed existing allocations during simulation:

* [nconmax](#nconmax) / [njmax](#njmax): The maximum number of contacts / constraints has been exceeded. Increase the value of the
  setting by updating the relevant argument to [`mjw.make_data`](api.html#mujoco_warp.make_data "mujoco_warp.make_data") or
  [`mjw.put_data`](api.html#mujoco_warp.put_data "mujoco_warp.put_data").
* `mjw.Option.ccd_iterations`: The convex collision detection algorithm has exceeded the maximum number of iterations.
  Increase the value of this setting in the XML / [mjSpec](../APIreference/APItypes.html#mjspec) / [mjModel](../APIreference/APItypes.html#mjmodel). Importantly, this change must be made
  to the [mjModel](../APIreference/APItypes.html#mjmodel) instance that is provided to [`mjw.put_model`](api.html#mujoco_warp.put_model "mujoco_warp.put_model") and
  [`mjw.make_data`](api.html#mujoco_warp.make_data "mujoco_warp.make_data") / [`mjw.put_data`](api.html#mujoco_warp.put_data "mujoco_warp.put_data").
* `mjw.Option.contact_sensor_maxmatch`: The maximum number of contact matches for a
  [contact sensor](../XMLreference.html#sensor-contact)’s matching criteria has been exceeded. Increase the value of this MJWarp-only
  setting `m.opt.contact_sensor_maxmatch`. Alternatively, refactor the contact sensor matching criteria, for example if
  the 2 geoms of interest are known, specify `geom1` and `geom2`.
* `height field collision overflow`: The number of potential contacts generated by a height field exceeds
  [mjMAXCONPAIR](../APIreference/APIglobals.html#glnumericengine) and some contacts are ignored. To resolve this warning, reduce the height field
  resolution or reduce the size of the geom interacting with the height field.

### Compilation[#](#compilation "Link to this heading")

**How can compilation time be improved?**

Limit the number of unique colliders that require the general convex collision pipeline. These colliders are listed as
`_CONVEX_COLLISION_PAIRS` in
[collision\_convex.py](https://github.com/google-deepmind/mujoco_warp/blob/main/mujoco_warp/_src/collision_convex.py).
Improvements to the compilation time for the pipeline are tracked in this
[GitHub issue](https://github.com/google-deepmind/mujoco_warp/issues/813).

**Why are the physics not working as expected after upgrading MJWarp?**

The Warp cache may be incompatible with the current code and should be cleared as part of the debugging process. This
can be accomplished by deleting the directory `~/.cache/warp` or via Python

```
import warp as wp
wp.clear_kernel_cache()
```

**Is it possible to compile MJWarp ahead of time instead of at runtime?**

Yes. Please see Warp’s
[Ahead-of-Time Compilation Workflows](https://nvidia.github.io/warp/codegen.html#ahead-of-time-compilation-workflows)
documentation for details.

## Differences from MuJoCo[#](#differences-from-mujoco "Link to this heading")

This section notes differences between MJWarp and MuJoCo.

### Warmstart[#](#warmstart "Link to this heading")

If warmstarts are not [disabled](../XMLreference.html#option-flag-warmstart), the MJWarp solver warmstart always initializes the
acceleration with `qacc_warmstart`. In contrast, MuJoCo performs a comparison between `qacc_smooth` and
`qacc_warmstart` to determine which one is utilized for the initialization.

### Inertia matrix factorization[#](#inertia-matrix-factorization "Link to this heading")

When using dense computation, MJWarp’s factorization of the inertia matrix `qLD` is computed with Warp’s `L'L`
Cholesky factorization
[wp.tile\_cholesky](https://nvidia.github.io/warp/language_reference/_generated/warp._src.lang.tile_cholesky.html)
and the result is not expected to match MuJoCo’s corresponding field because a different reverse-mode `L'DL` routine
[mj\_factorM](../APIreference/APIfunctions.html#mj-factorm) is utilized.

### Options[#](#options "Link to this heading")

[`mjw.Option`](api.html#mujoco_warp.Option "mujoco_warp.Option") fields correspond to their [mjOption](../APIreference/APItypes.html#mjoption) counterparts with the following
exceptions:

* [impratio](../XMLreference.html#option-impratio) is stored as its inverse square root `impratio_invsqrt`.
* The constraint solver setting [tolerance](../XMLreference.html#option-tolerance) is clamped to a minimum value of `1e-6`.
* Contact [override](../XMLreference.html#option-flag-override) parameters [o\_margin](../XMLreference.html#option-o-margin),
  [o\_solref](../XMLreference.html#option-o-solref), [o\_solimp](../XMLreference.html#option-o-solimp), and [o\_friction](../XMLreference.html#option-o-friction) are
  not available.

[disableflags](../XMLreference.html#option-flag) has the following differences:

* [mjDSBL\_MIDPHASE](../APIreference/APItypes.html#mjtdisablebit) is not available.
* [mjDSBL\_AUTORESET](../APIreference/APItypes.html#mjtdisablebit) is not available.
* [mjDSBL\_NATIVECCD](../APIreference/APItypes.html#mjtdisablebit) changes the default box-box collider from CCD to a primitive collider.
* [mjDSBL\_ISLAND](../APIreference/APItypes.html#mjtdisablebit) is not currently available. Constraint island discovery is tracked in GitHub issue
  [#886](https://github.com/google-deepmind/mujoco_warp/issues/886).

[enableflags](../XMLreference.html#option-flag) has the following differences:

* [mjENBL\_OVERRIDE](../APIreference/APItypes.html#mjtenablebit) is not available.
* [mjENBL\_FWDINV](../APIreference/APItypes.html#mjtenablebit) is not available.
* Constraint island sleeping enabled via [mjENBL\_ISLAND](../APIreference/APItypes.html#mjtenablebit) is not currently available. This feature is
  tracked in GitHub issues [#886](https://github.com/google-deepmind/mujoco_warp/issues/886) and
  [#887](https://github.com/google-deepmind/mujoco_warp/issues/887).

Additional MJWarp-only options are available:

* `ls_parallel`: use parallel linesearch with the constraint solver
* `ls_parallel_min_step`: minimum step size for the parallel linesearch
* `broadphase`: type of broadphase algorithm ([`mjw.BroadphaseType`](api.html#mujoco_warp.BroadphaseType "mujoco_warp.BroadphaseType"))
* `broadphase_filter`: type of filtering utilized by broadphase
  ([`mjw.BroadphaseFilter`](api.html#mujoco_warp.BroadphaseFilter "mujoco_warp.BroadphaseFilter"))
* `graph_conditional`: use CUDA graph conditional
* `run_collision_detection`: use collision detection routine
* `contact_sensor_maxmatch`: maximum number of contacts for contact sensor matching criteria

Fluid model

Modifying fluid model parameters: `density`, `viscosity`, or `wind` may require updating
`Model.has_fluid`.

Graph capture

A new [graph capture](#mjwgc) may be necessary after modifying an [`mjw.Option`](api.html#mujoco_warp.Option "mujoco_warp.Option") field
in order for the updated setting to take effect.

### SDF plugins[#](#sdf-plugins "Link to this heading")

SDF collisions support plugins. The following example for
[plugin/sdf/bowl.xml](https://github.com/google-deepmind/mujoco/blob/main/model/plugin/sdf/bowl.xml) illustrates how to implement the
SDF plugin implementation in [bowl.cc](https://github.com/google-deepmind/mujoco/blob/main/plugin/sdf/bowl.cc):

```
import mujoco_warp as mjw
import warp as wp

# distance function
@wp.func
def bowl(p: wp.vec3, attr: wp.vec3) -> float:
  """Signed distance function for a bowl shape.

  attr[0] = height
  attr[1] = radius
  attr[2] = thickness
  """
  height = attr[0]
  radius = attr[1]
  thick = attr[2]
  width = wp.sqrt(radius * radius - height * height)

  # q = (norm_xy(p), p.z)
  q0 = wp.sqrt(p[0] * p[0] + p[1] * p[1])
  q1 = p[2]

  # qdiff = q - (width, height)
  qdiff0 = q0 - width
  qdiff1 = q1 - height

  if height * q0 < width * q1:
    dist = wp.sqrt(qdiff0 * qdiff0 + qdiff1 * qdiff1)
  else:
    q_norm = wp.sqrt(q0 * q0 + q1 * q1)
    dist = wp.abs(q_norm - radius)

  return dist - thick

# gradient of distance function
@wp.func
def bowl_sdf_grad(p: wp.vec3, attr: wp.vec3) -> wp.vec3:
  """Gradient of bowl SDF via finite differences."""
  eps = float(1e-6)
  f0 = bowl(p, attr)

  px = wp.vec3(p[0] + eps, p[1], p[2])
  py = wp.vec3(p[0], p[1] + eps, p[2])
  pz = wp.vec3(p[0], p[1], p[2] + eps)

  grad = wp.vec3(
    (bowl(px, attr) - f0) / eps,
    (bowl(py, attr) - f0) / eps,
    (bowl(pz, attr) - f0) / eps,
  )
  return grad

# register the bowl SDF plugin
@wp.func
def user_sdf(p: wp.vec3, attr: wp.vec3, sdf_type: int) -> float:
  return bowl(p, attr)

@wp.func
def user_sdf_grad(p: wp.vec3, attr: wp.vec3, sdf_type: int) -> wp.vec3:
  return bowl_sdf_grad(p, attr)

# override the module-level hooks
mjw._src.collision_sdf.user_sdf = user_sdf
mjw._src.collision_sdf.user_sdf_grad = user_sdf_grad
```

### Physics callbacks[#](#physics-callbacks "Link to this heading")

MuJoCo provides global [physics callbacks](https://mujoco.readthedocs.io/en/latest/APIreference/APIglobals.html#physics-callbacks)
that allow users to inject custom logic into the simulation pipeline. MJWarp supports a similar mechanism, but callbacks
are Python functions set per-model on the [`mjw.Model`](api.html#mujoco_warp.Model "mujoco_warp.Model") instance via `Model.callback` rather than as global
function pointers.

The following callbacks are available:

| Callback | Description |
| --- | --- |
| `control` | Custom control laws, writes to `Data.ctrl` |
| `passive` | Custom passive forces, writes to `Data.qfrc_passive` |
| `act_dyn` | Custom actuator dynamics, writes to `Data.act_dot` |
| `act_gain` | Custom actuator gains, writes to `Data.actuator_force` |
| `act_bias` | Custom actuator biases, writes to `Data.actuator_force` |
| `sensor` | Custom sensors, writes to `Data.sensordata`; receives an additional `stage` argument |
| `contactfilter` | Custom contact filtering, writes to `Data.contact` |

```
import mujoco
import mujoco_warp as mjw
import warp as wp

_MJCF = r"""
<mujoco>
  <worldbody>
    <body>
      <geom size=".1"/>
      <joint name="hinge"/>
    </body>
  </worldbody>
  <actuator>
    <motor joint="hinge"/>
  </actuator>
</mujoco>
"""

@wp.kernel
def _ctrl_callback(ctrl_out: wp.array2d(dtype=float)):
  worldid = wp.tid()
  ctrl_out[worldid, 0] = 2.0

def ctrl_callback(m, d):
  wp.launch(_ctrl_callback, dim=(d.nworld,), outputs=[d.ctrl])

mjm = mujoco.MjModel.from_xml_string(_MJCF)
m = mjw.put_model(mjm)
d = mjw.make_data(mjm)

m.callback.control = ctrl_callback
mjw.step(m, d)
assert d.ctrl.numpy()[0, 0] == 2.0
```

### Box-box collisions[#](#box-box-collisions "Link to this heading")

By default, box-box collisions use the general-purpose convex collision pipeline (GJK/EPA). A specialized primitive
collider based on
[engine\_collision\_box.c](https://github.com/google-deepmind/mujoco/blob/main/src/engine/engine_collision_box.c)
is available by setting the `NATIVECCD` disable flag:

```
m.opt.disableflags |= mjw.DisableBit.NATIVECCD
```

The specialized collider generates up to 8 contact points, compared to up to 4 for the convex pipeline, and may improve
contact stability for tasks involving box stacking or manipulation.

### CCD margin[#](#ccd-margin "Link to this heading")

Non-zero [geom margin](../XMLreference.html#body-geom-margin) or [pair margin](../XMLreference.html#contact-pair-margin) is not supported with certain
CCD colliders and will raise a `NotImplementedError` when calling [`mjw.put_model`](api.html#mujoco_warp.put_model "mujoco_warp.put_model"):

| Geom pair | Scenario | Workaround |
| --- | --- | --- |
| box-box, box-mesh, mesh-mesh | [MULTICCD](../XMLreference.html#option-flag-multiccd) enabled (on by default) | Set margin to `0` or disable `MULTICCD` |
| box-box | [NATIVECCD](../XMLreference.html#option-flag-nativeccd) enabled (on by default) | Set margin to `0` or disable `NATIVECCD` |

### Rendering[#](#rendering "Link to this heading")

The batch renderer included in MJWarp serves a different purpose than MuJoCo’s renderer. The MJWarp batch
renderer is a single hit raycaster optimized for high throughput and low fidelity.

It supports:
:   * Simple lambertian diffuse shading
    * Basic point lights and directional lights
    * Textures
    * Shadows

It does not support:
:   * Advanced lighting effects such as global illumination
    * Physically based material properties

[Next

MuJoCo Warp API](api.html)
[Previous

MJX API](../mjx_api.html)

Copyright © DeepMind Technologies Limited

Made with [Sphinx](https://www.sphinx-doc.org/) and [@pradyunsg](https://pradyunsg.me)'s
[Furo](https://github.com/pradyunsg/furo)

On this page

* MuJoCo Warp (MJWarp)
  + [Tutorial notebook](#tutorial-notebook)
  + [When To Use MJWarp?](#when-to-use-mjwarp)
    - [High throughput](#high-throughput)
    - [Low latency](#low-latency)
    - [Complex scenes](#complex-scenes)
    - [Differentiability](#differentiability)
  + [Installation](#installation)
  + [Basic Usage](#basic-usage)
    - [Structs](#structs)
    - [Batch sizes](#batch-sizes)
    - [Functions](#functions)
    - [Minimal example](#minimal-example)
    - [Command line scripts](#command-line-scripts)
  + [Feature Parity](#feature-parity)
  + [Performance Tuning](#performance-tuning)
    - [Graph capture](#graph-capture)
    - [Batch sizes](#id1)
    - [Solver iterations](#solver-iterations)
    - [Contact sensor matching](#contact-sensor-matching)
    - [Parallel linesearch](#parallel-linesearch)
    - [Memory](#memory)
  + [Batched `Model` Fields](#batched-model-fields)
    - [Modifying fields](#modifying-fields)
    - [Per-world meshes](#per-world-meshes)
  + [Batch Rendering](#batch-rendering)
    - [Basic Usage](#id2)
    - [Benchmarks](#benchmarks)
    - [Notes](#notes)
  + [Frequently Asked Questions](#frequently-asked-questions)
    - [Learning frameworks](#learning-frameworks)
    - [Features](#features)
    - [Compilation](#compilation)
  + [Differences from MuJoCo](#differences-from-mujoco)
    - [Warmstart](#warmstart)
    - [Inertia matrix factorization](#inertia-matrix-factorization)
    - [Options](#options)
    - [SDF plugins](#sdf-plugins)
    - [Physics callbacks](#physics-callbacks)
    - [Box-box collisions](#box-box-collisions)
    - [CCD margin](#ccd-margin)
    - [Rendering](#rendering)
