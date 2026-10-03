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

* 🏗️ Model (SceneModel)
* [💾 Data (SceneData)](scene_data.html)
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
* 🏗️ Model (SceneModel)

# 🏗️ Model (SceneModel)[#](#model-scenemodel "Link to this heading")

In MotrixSim, the model `SceneModel` and the data `SceneData` are essential components for building a simulation environment and are used throughout the entire physics simulation process. This chapter mainly introduces the creation and usage of `SceneModel`, while [`SceneData`](scene_data.html) will be described in detail in the next chapter.

## Basic Concepts[#](#basic-concepts "Link to this heading")

`SceneModel` describes the model, i.e., all **time-invariant quantities**. This includes geometric shapes, mass properties, joint connections, actuator configurations, and other static information. During the entire simulation, `SceneModel` remains unchanged, while all time-varying dynamic states (positions, velocities, forces, etc.) are stored in `SceneData`.

`SceneModel` mainly contains the following:

| Category | Description |
| --- | --- |
| Components | Joints [`Joint`](../kinematics/joint.html), Bodies [`Body`](../kinematics/body.html), Links [`Link`](../kinematics/link.html), Sensors [`Sensor`](../kinematics/sensor.html), Actuators [`Actuator`](../kinematics/actuator.html), Sites [`Site`](../kinematics/site.html), etc. |
| Simulation Parameters | [`Options`](options.html) (including `timestep`, `gravity`, etc.) |

## Creating a Model[#](#creating-a-model "Link to this heading")

### Loading from File[#](#loading-from-file "Link to this heading")

The most common way is to create a model from an MJCF or URDF file:

```
# The scene description file
path = "examples/assets/empty.xml"
# Load the scene model
model = load_model(path)
```

For the complete example, see [`examples/empty.py`](../../_downloads/1d59c74f99a5b4fbbe9400fd0359a0c9/empty.py).

### Loading from String[#](#loading-from-string "Link to this heading")

You can also create a model directly from an MJCF string:

```
mjcf = """<mujoco>
    <option timestep="0.001"/>
    <worldbody>
        <light name="light" pos="0 0 3"/>
        <geom name="floor" size="0 0 0.05" type="plane"/>
        <body pos="0 0 0.1">
            <freejoint/>
            <geom type="sphere" size=".1" />
        </body>
        <body pos="0.01 0 0.3">
            <freejoint/>
            <geom type="sphere" size=".1" />
        </body>
    </worldbody>
</mujoco>"""

def main():
    # Create render window for visualization
    with RenderApp() as render:
        # Load the scene model
        model = load_mjcf_str(mjcf)
```

For the complete example, see [`examples/load_from_str.py`](../../_downloads/0add114614efad5ae4bc29cf01154513/load_from_str.py).

## Component Access (Named Access)[#](#component-access-named-access "Link to this heading")

After creating a model, you often need to access its components to set parameters, retrieve information, or perform control. MotrixSim provides convenient named access interfaces for model components, supporting direct access to various components by **name** or **index**.

Below is an example of accessing a `joint` by name and index. For the complete example, see [`examples/joint.py`](../../_downloads/34502972d0f8c76e3c333ee1a352866f/joint.py).

### Basic Access Methods[#](#basic-access-methods "Link to this heading")

* Access by **name**

```
 hinge = model.get_joint("hinge")
```

* Access by **index** (an interface for name-to-index conversion is also provided)

```
# Try to visit "joint_A"
joint_A_index = model.get_joint_index("joint_A")
joint_A = model.get_joint(joint_A_index)
assert joint_A is not None, "Expect joint_A in the model"
print(f"joint_addr is {joint_A_index}, joint_A is : {joint_A}, name is : {joint_A.name}")
```

### Batch Access[#](#batch-access "Link to this heading")

In addition to accessing individual components, you can also retrieve lists of component objects or names in batch:

```
# ----------Try to access joint data----------
# How many joints in the model?
num_joints = model.num_joints
# Get the all joints in the model
joints = model.joints
# The name list of joints in the model
joint_names = model.joint_names
print(f"num_joints :{num_joints}, joint_names : {joint_names}, joints : {joints}")
```

The access methods support the model components mentioned in [`Basic Concepts`](#basic-concepts). For detailed access methods, see: [**API Quick Reference - Named Access**](../../api_reference/api_quick_reference.html#named-access-model-component-access).

## API Reference[#](#api-reference "Link to this heading")

For more APIs related to SceneModel, see [`SceneModel API`](../../api_reference/core/motrixsim.html#motrixsim.SceneModel "motrixsim.SceneModel")

[previous

🦿 Legged Gym](../overview/legged_gym.html "previous page")
[next

💾 Data (SceneData)](scene_data.html "next page")

On this page

* [Basic Concepts](#basic-concepts)
* [Creating a Model](#creating-a-model)
  + [Loading from File](#loading-from-file)
  + [Loading from String](#loading-from-string)
* [Component Access (Named Access)](#component-access-named-access)
  + [Basic Access Methods](#basic-access-methods)
  + [Batch Access](#batch-access)
* [API Reference](#api-reference)

© Copyright 2025, Motphys.

Built with the [PyData Sphinx Theme](https://pydata-sphinx-theme.readthedocs.io/en/stable/index.html) 0.16.1.
