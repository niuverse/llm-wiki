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

* [🏗️ Model (SceneModel)](../main_function/scene_model.html)
* [💾 Data (SceneData)](../main_function/scene_data.html)
* [⚙️ Global Settings (Options)](../main_function/options.html)
* [🎨 Renderer (RenderApp)](../main_function/render.html)

Kinematics

* [🤖 Rigid Body (Body)](body.html)
* [🛸 Floating Base](floating_base.html)
* [🔩 Joint](joint.html)
* [📏 Link](link.html)
* 🔋 Actuators
* [🌡️ Sensor](sensor.html)
* [📍 Site](site.html)

Render

* [📷 Camera](../render/camera.html)

Indices

* [General Index](../../genindex.html)
* [Python Module Index](../../py-modindex.html)

* [User Guide](../index.html)
* 🔋 Actuators

# 🔋 Actuators[#](#actuators "Link to this heading")

Actuators are the core components responsible for controlling the motion of robot joints. MotrixSim supports multiple types of actuators.

Each actuator can be configured with different types and parameters to suit various application scenarios. Actuators can be motors, position controllers, velocity controllers, or general controllers. They enable precise control of the robot by setting target positions, velocities, or other parameters.

The currently supported actuator types are:

| Type | Description |
| --- | --- |
| Motor | Drives the robot’s joints, providing basic actuation capability. |
| Position | Precisely controls the joint angle or position. |
| Velocity | Controls the joint’s movement speed. |
| General | Provides more flexible control, allowing custom control policies. |

Parameter settings are compatible with [MuJoCo actuator](https://mujoco.readthedocs.io/en/stable/XMLreference.html#actuator) attributes.

> Some attributes of the General actuator are not yet supported. Refer to the [support list](../getting_started/mjcf.html#actuator).

## Actuator Example[#](#actuator-example "Link to this heading")

First, load the [`model`](../../api_reference/core/motrixsim.html#motrixsim.SceneModel "motrixsim.SceneModel") and use the [`model.get_actuator`](../../api_reference/core/motrixsim.html#motrixsim.SceneModel.get_actuator "motrixsim.SceneModel.get_actuator") method to obtain a specific [`Actuator`](../../api_reference/core/motrixsim.html#motrixsim.Actuator "motrixsim.Actuator"). The argument can be the actuator’s name or index. Then, set the control target value using the [`actuator.set_ctrl`](../../api_reference/core/motrixsim.html#motrixsim.Actuator.set_ctrl "motrixsim.Actuator.set_ctrl") method.

The index corresponds to the order defined in the file. You can retrieve all actuator names using the [`model.actuator_names`](../../api_reference/core/motrixsim.html#motrixsim.SceneModel.actuator_names "motrixsim.SceneModel.actuator_names") method.

Below is a complete code script covering all the above content:

```
# Copyright (C) 2020-2025 Motphys Technology Co., Ltd. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================

import time

from motrixsim import SceneData, load_model, step
from motrixsim.render import RenderApp

# Mouse controls:
# - Press and hold left button then drag to rotate the camera/view
# - Press and hold right button then drag to pan/translate the view

def main():
    # Create render window for visualization
    with RenderApp() as render:
        # The scene description file
        path = "examples/assets/actuator.xml"
        # Load the scene model
        model = load_model(path)
        # Create the render instance of the model
        render.launch(model)
        # Create the physics data of the model
        data = SceneData(model)

        # ----------Try to access actuators----------
        # How many actuators are in the model?
        num_actuators = model.num_actuators
        print(f"num_actuators is : {num_actuators}")
        # The name list of actuators
        actuator_names = model.actuator_names
        print(f"actuator_names is : {actuator_names}")
        # The control range of actuators
        actuator_ctrl_limits = model.actuator_ctrl_limits
        print(f"actuator_ctrl_limits is : {actuator_ctrl_limits}")

        # Get actuator_A index in model
        actuator_A_index = model.get_actuator_index("actuator_A")
        # Get actuator_A by the way with index
        actuator_A = model.get_actuator(actuator_A_index)
        print(f"actuator_A by index name is : {actuator_A.name}")
        # Get actuator_A by the way with name
        actuator_A = model.get_actuator("actuator_A")
        # Get other actuators
        actuator_B = model.get_actuator("actuator_B")
        actuator_C = model.get_actuator("actuator_C")

        # Look at the actuators' index
        print(
            f"actuator_A index is :{actuator_A.index}, actuator_B index is :{actuator_B.index}, "
            f"actuator_C index is : {actuator_C.index}"
        )

        # Look at the actuators' control range
        actuator_A_ctrl_range = actuator_A.ctrl_range
        actuator_B_ctrl_range = actuator_B.ctrl_range
        actuator_C_ctrl_range = actuator_C.ctrl_range
        print(f"actuator_A_ctrl_range is : {actuator_A_ctrl_range}")
        print(f"actuator_B_ctrl_range is : {actuator_B_ctrl_range}")
        print(f"actuator_C_ctrl_range is : {actuator_C_ctrl_range}")

        start = time.time()
        flip = False
        print_count = 0

        while True:
            # Control the step interval to prevent too fast simulation
            time.sleep(0.02)

            if time.time() - start > 1.5:
                actuator_A.set_ctrl(data, 1.0 if flip else -1.0)
                actuator_C.set_ctrl(data, 0.5 if flip else -0.5)
                flip = not flip
                start = time.time()

            if print_count < 200:
                ctrls = model.get_actuator_ctrls(data)
                print(f"actuator_ctrls is :{ctrls}")
                print_count += 1

            # Physics world step
            step(model, data)
            # Sync render objects from physic world
            render.sync(data)

if __name__ == "__main__":
    main()
```

[previous

📏 Link](link.html "previous page")
[next

🌡️ Sensor](sensor.html "next page")

On this page

* [Actuator Example](#actuator-example)

© Copyright 2025, Motphys.

Built with the [PyData Sphinx Theme](https://pydata-sphinx-theme.readthedocs.io/en/stable/index.html) 0.16.1.
