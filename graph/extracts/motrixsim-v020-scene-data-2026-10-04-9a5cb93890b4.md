[Skip to main content](#main-content)

Back to top

`Ctrl`+`K`

[![MotrixSim Documentation - Home](../../_static/Motphys_logo_Black.svg)
![MotrixSim Documentation - Home](../../_static/Motphys_logo_White.svg)](../../index.html)

* [User Guide](../index.html)
* [API Reference](../../api_reference/index.html)
* More
  + [Issues](https://github.com/Motphys/motrixsim-docs/issues)
  + [Discussions](https://github.com/Motphys/motrixsim-docs/discussions)

`Ctrl`+`K`

* [GitHub](https://github.com/Motphys/motrixsim-docs "GitHub")
* [About Motphys](https://www.motphys.com "About Motphys")

`Ctrl`+`K`

* [User Guide](../index.html)
* [API Reference](../../api_reference/index.html)
* [Issues](https://github.com/Motphys/motrixsim-docs/issues)
* [Discussions](https://github.com/Motphys/motrixsim-docs/discussions)

* [GitHub](https://github.com/Motphys/motrixsim-docs "GitHub")
* [About Motphys](https://www.motphys.com "About Motphys")

Section Navigation

Getting Started

* [🛠️ Install Python SDK](../getting_started/installation.html)
* [🚀 Quick Start: Hello MotrixSim](../getting_started/hello_motrixsim.html)
* [📋 MJCF Files](../getting_started/mjcf.html)

Comparison & Examples

* [🛠️ Environment Setup](../overview/environment_setup.html)
* [⚖️ Case Comparison](../overview/case_comparison.html)
* [📚 Example Programs](../overview/examples.html)
* [🦿 Legged Gym](../overview/legged_gym.html)

Main Features

* [🏗️ Model (SceneModel)](scene_model.html)
* 💾 Data (SceneData)
* [⚙️ Global Settings (Options)](options.html)
* [🎨 Renderer (RenderApp)](render.html)

Kinematics

* [🤖 Rigid Body (Body)](../kinematics/body.html)
* [🛸 Floating Base](../kinematics/floating_base.html)
* [🔩 Joint](../kinematics/joint.html)
* [📏 Link](../kinematics/link.html)
* [🔋 Actuators](../kinematics/actuator.html)
* [🌡️ Sensor](../kinematics/sensor.html)
* [📍 Site](../kinematics/site.html)

Render

* [📷 Camera](../render/camera.html)

Indices

* [General Index](../../genindex.html)
* [Python Module Index](../../py-modindex.html)

* [User Guide](../index.html)
* 💾 Data (SceneData)

# 💾 Data (SceneData)[#](#data-scenedata "Link to this heading")

In the previous chapter, we learned that [`SceneModel`](scene_model.html) is used to describe the static physical model. This chapter focuses on the creation and usage of `SceneData`.

## Basic Concepts[#](#basic-concepts "Link to this heading")

`SceneData` is the **dynamic data container** in the MotrixSim simulation system, storing all variables that change during runtime. These data include not only joint positions and velocities, but also the spatial positions and orientations of objects, sensor values, and more.

State updates in `SceneData` require calling kinematic functions to update the system state.

## Creating Data[#](#creating-data "Link to this heading")

### Basic Creation[#](#basic-creation "Link to this heading")

```
# tag::load_model_from_file[]
# The scene description file
path = "examples/assets/empty.xml"
# Load the scene model
model = load_model(path)
# end::load_model_from_file[]
# Create the render instance of the model
render.launch(model)
# Create the physics data of the model
data = SceneData(model)
```

For the complete example, see [`examples/empty.py`](../../_downloads/1d59c74f99a5b4fbbe9400fd0359a0c9/empty.py).

### Multiple Data Instances[#](#multiple-data-instances "Link to this heading")

MotrixSim supports creating multiple independent `SceneData` instances from the same `SceneModel`, which is useful for parallel experiments, state backups, parameter comparisons, and more.

```
# The scene description file
path = "examples/assets/model.xml"
# Load the scene model
model = load_model(path)
# Create the render instance of the model
# Try to create 3 model data
repeat = 3
render_offset_1 = [0, 0, 0]
render_offset_2 = [0, 1, 0]
render_offset_3 = [0, -1, 0]
render.launch(model, repeat, [render_offset_1, render_offset_2, render_offset_3])
# Create the physics data of the model
data_1 = SceneData(model)
data_2 = SceneData(model)
data_3 = SceneData(model)
```

Each data instance is independent and can be updated separately.

For the complete example, see [`examples/model.py`](../../_downloads/7216f990c9d4c7a0438965fcf55445a2/model.py).

## State Access[#](#state-access "Link to this heading")

### Direct Array Access[#](#direct-array-access "Link to this heading")

`SceneData` provides direct access to system state arrays:

```
pos = data.dof_pos_array
vel = data.dof_vel_array
```

For detailed `SceneData` attributes, see: [**API Quick Reference - SceneData**](../../api_reference/api_quick_reference.html#scenedata-state-data)

### Access via Components[#](#access-via-components "Link to this heading")

Combined with the Named Access of `SceneModel`, you can access or set specific states through component objects:

```
# Get position from body directly
dof_pos = cube_fb.get_dof_pos(data)
# Get velocity from body directly
dof_vel = cube_fb.get_dof_vel(data)
# Get position and rotation directly
# Note: This data will be delayed by one frame
pose = cube.get_pose(data)

print(f"dof_pos is : {dof_pos}")
print(f"dof_vel is : {dof_vel}")
print(f"pose is {pose}")
```

For the complete example, see [`examples/body.py`](../../_downloads/dd72e78fa41efd44cddd7bbc8c60a025/body.py).

## API Reference[#](#api-reference "Link to this heading")

For more APIs related to SceneData, see [`SceneData API`](../../api_reference/core/motrixsim.html#motrixsim.SceneData "motrixsim.SceneData")

[previous

🏗️ Model (SceneModel)](scene_model.html "previous page")
[next

⚙️ Global Settings (Options)](options.html "next page")

On this page

* [Basic Concepts](#basic-concepts)
* [Creating Data](#creating-data)
  + [Basic Creation](#basic-creation)
  + [Multiple Data Instances](#multiple-data-instances)
* [State Access](#state-access)
  + [Direct Array Access](#direct-array-access)
  + [Access via Components](#access-via-components)
* [API Reference](#api-reference)

© Copyright 2025, Motphys.

Built with the [PyData Sphinx Theme](https://pydata-sphinx-theme.readthedocs.io/en/stable/index.html) 0.16.1.
