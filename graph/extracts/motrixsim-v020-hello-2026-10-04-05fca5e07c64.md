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

* [🛠️ Install Python SDK](installation.html)
* 🚀 Quick Start: Hello MotrixSim
* [📋 MJCF Files](mjcf.html)

Comparison & Examples

* [🛠️ Environment Setup](../overview/environment_setup.html)
* [⚖️ Case Comparison](../overview/case_comparison.html)
* [📚 Example Programs](../overview/examples.html)
* [🦿 Legged Gym](../overview/legged_gym.html)

Main Features

* [🏗️ Model (SceneModel)](../main_function/scene_model.html)
* [💾 Data (SceneData)](../main_function/scene_data.html)
* [⚙️ Global Settings (Options)](../main_function/options.html)
* [🎨 Renderer (RenderApp)](../main_function/render.html)

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
* 🚀 Quick Start: Hello MotrixSim

# 🚀 Quick Start: Hello MotrixSim[#](#quick-start-hello-motrixsim "Link to this heading")

![hello_motrixsim](../../_images/hello_motrixsim.png)

This tutorial demonstrates a simple example—loading the Spot quadruped robot and running a physics simulation—to introduce the core steps and basic concepts for creating simulation experiments in MotrixSim:

```
import time

import motrixsim as mx

model = mx.load_model("examples/assets/boston_dynamics_spot/scene.xml")
with mx.render.RenderApp("warn") as render:
    render.launch(model)
    data = mx.SceneData(model)

    while True:
        time.sleep(model.options.timestep)
        mx.step(model, data)
        render.sync(data)
```

That’s the complete code! With just 10 lines, you accomplish all the essential steps for a MotrixSim simulation experiment.

You can now start exploring MotrixSim, or continue reading below for a detailed explanation of each step:

## Load the Model[#](#load-the-model "Link to this heading")

```
model = mx.load_model("examples/assets/boston_dynamics_spot/scene.xml")
```

First, we call [`load_model`](../../api_reference/core/motrixsim.html#motrixsim.load_model "motrixsim.load_model") to load a model file, which includes both physical and rendering data (see [`SceneModel`](../main_function/scene_model.html) for details).
MotrixSim supports multiple model formats, including MJCF and URDF (OpenUSD is under development). Here, we use the MJCF format for the Go1 quadruped robot model, which you can find at [examples/assets/boston\_dynamics\_spot/scene.xml](../../_downloads/41af386f65a00283394bf8ea693d4271/scene.xml).
You can also use [`load_mjcf_str`](../../api_reference/core/motrixsim.html#motrixsim.load_mjcf_str "motrixsim.load_mjcf_str") to load a model directly from an MJCF string; see [examples/load\_from\_str.py](../../_downloads/0add114614efad5ae4bc29cf01154513/load_from_str.py) for an example.

## Launch the Renderer[#](#launch-the-renderer "Link to this heading")

```
render = mx.render.RenderApp()
```

Next, we create a renderer instance [`RenderApp`](../main_function/render.html), which is responsible for visualizing the model.

## Load the Model into the Renderer[#](#load-the-model-into-the-renderer "Link to this heading")

```
render.launch(model)
```

The renderer needs to load the model data before rendering. We call [`render.launch(model)`](../../api_reference/rendering/render.html#motrixsim.render.RenderApp.launch "motrixsim.render.RenderApp.launch") to start the renderer and load the model.

## Create Physics Data (SceneData)[#](#create-physics-data-scenedata "Link to this heading")

```
data = mx.SceneData(model)
```

Physical simulation requires a data structure to store the model’s state. We use [`SceneData`](../main_function/scene_model.html) to create a physics data object associated with the model. This can be considered an instance of the model, and you can create multiple instances from the same model.

## Physics Simulation[#](#physics-simulation "Link to this heading")

```
mx.step(model, data)
```

The core of the simulation is the [`step`](../../api_reference/core/motrixsim.html#motrixsim.step "motrixsim.step") function, which updates the model’s state. Each call performs a single simulation time step.
In this example, we call [`step`](../../api_reference/core/motrixsim.html#motrixsim.step "motrixsim.step") 1000 times in a loop, pausing for 2 milliseconds between each call (the default time step for the go1 model) to simulate the passage of time.

## Synchronize the Renderer[#](#synchronize-the-renderer "Link to this heading")

```
render.sync(data)
```

After each simulation step, we need to synchronize the model state with the renderer to update the visualization. We call [`sync`](../../api_reference/rendering/render.html#motrixsim.render.RenderApp.sync "motrixsim.render.RenderApp.sync") to perform this operation.

Note

The call frequency between [`step`](../../api_reference/core/motrixsim.html#motrixsim.step "motrixsim.step") and [`sync`](../../api_reference/rendering/render.html#motrixsim.render.RenderApp.sync "motrixsim.render.RenderApp.sync") does not have to be 1:1. You can adjust the frequency as needed for your application.

With this, the entire example is complete. You can now try modifying parameters to observe the physical effects under different settings.

## Next Steps[#](#next-steps "Link to this heading")

* See [mjcf](mjcf.html) for supported features
* Learn how to use the [main features](../main_function/scene_model.html)
* Explore more [example programs](../overview/examples.html)

[previous

🛠️ Install Python SDK](installation.html "previous page")
[next

📋 MJCF Files](mjcf.html "next page")

On this page

* [Load the Model](#load-the-model)
* [Launch the Renderer](#launch-the-renderer)
* [Load the Model into the Renderer](#load-the-model-into-the-renderer)
* [Create Physics Data (SceneData)](#create-physics-data-scenedata)
* [Physics Simulation](#physics-simulation)
* [Synchronize the Renderer](#synchronize-the-renderer)
* [Next Steps](#next-steps)

© Copyright 2025, Motphys.

Built with the [PyData Sphinx Theme](https://pydata-sphinx-theme.readthedocs.io/en/stable/index.html) 0.16.1.
