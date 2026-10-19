# XPandora/PhysGaussian 固定版本原始文件读取缓存

标准提取器不支持 tgz；按成员路径逐字解码 UTF-8，未摘要。代码核查范围在来源页说明。

## README.md

````text
# PhysGaussian: Physics-Integrated 3D Gaussians for Generative Dynamics

### [[Project Page](https://xpandora.github.io/PhysGaussian/)] [[arXiv](https://arxiv.org/abs/2311.12198)] [[Video](https://www.youtube.com/watch?v=V96GfcMUH2Q)]

Tianyi Xie<sup>1</sup>\*, Zeshun Zong<sup>1</sup>\*, Yuxing Qiu<sup>1</sup>\*, Xuan Li<sup>1</sup>\*, Yutao Feng<sup>2,3</sup>, Yin Yang<sup>3</sup>, Chenfanfu Jiang<sup>1</sup><br>
<sup>1</sup>University of California, Los Angeles, <sup>2</sup>Zhejiang University, <sup>3</sup>University of Utah <br>
*Equal contributions

![teaser-1.jpg](_resources/teaser-1.jpg)

Abstract: *We introduce PhysGaussian, a new method that seamlessly integrates physically grounded Newtonian dynamics within 3D Gaussians to achieve high-quality novel motion synthesis. Employing a customized Material Point Method (MPM), our approach enriches 3D Gaussian kernels with physically meaningful kinematic deformation and mechanical stress attributes, all evolved in line with continuum mechanics principles. A defining characteristic of our method is the seamless integration between physical simulation and visual rendering: both components utilize the same 3D Gaussian kernels as their discrete representations. This negates the necessity for triangle/tetrahedron meshing, marching cubes, ''cage meshes,'' or any other geometry embedding, highlighting the principle of ''what you see is what you simulate (WS2).'' Our method demonstrates exceptional versatility across a wide variety of materials--including elastic entities, plastic metals, non-Newtonian fluids, and granular materials--showcasing its strong capabilities in creating diverse visual content with novel viewpoints and movements.*

## News
- [2024-03-27] Release a Colab notebook for quick start.[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/165WAoLw2HK4WifsA4Ngqgeke6gJVQXDm?usp=sharing)
- [2024-03-03] Code Release.
- [2024-02-27] Our paper has been accpetd by CVPR 2024!
- [2023-12-20] Our [MPM solver code](https://github.com/zeshunzong/warp-mpm) is open sourced!

## Cloning the Repository
This repository uses original gaussian-splatting as a submodule. Use the following command to clone:

```shell
git clone --recurse-submodules git@github.com:XPandora/PhysGaussian.git
```

## Setup

### Python Environment
To prepare the Python environment needed to run PhysGaussian, execute the following commands:
```shell
conda create -n PhysGaussian python=3.9
conda activate PhysGaussian

pip install -r requirements.txt
pip install -e gaussian-splatting/submodules/diff-gaussian-rasterization/
pip install -e gaussian-splatting/submodules/simple-knn/
```
By default, We use pytorch=2.0.0+cu118.
### Quick Start
We provide several pretrained [Gaussian Splatting models](https://drive.google.com/drive/folders/1EMUOJbyJ2QdeUz8GpPrLEyN4LBvCO3Nx?usp=drive_link) and their corresponding `.json` config files in the `config` directory.

To simulate a reconstructed 3D Gaussian Splatting scene, run the following command:
```shell
python gs_simulation.py --model_path <path to gs model> --output_path <path to output folder> --config <path to json config file> --render_img --compile_video
```
The images and video results will be saved to the specified output_path.

If you want a quick try, run:
```shell
pip install gdown
bash download_sample_model.sh
python gs_simulation.py --model_path ./model/ficus_whitebg-trained/ --output_path output --config ./config/ficus_config.json --render_img --compile_video --white_bg
```
Hopefully, you will see a video result like this:

<img src="./demo/ficus.gif" width="300"/>

## Custom Dynamics
To generate custom dynamics, follow these guidelines:

### Gaussian Splatting Reconstruction
Begin by reconstructing a 3D GS scene as per [Gaussian Splatting](https://github.com/graphdeco-inria/gaussian-splatting).

### Data Preprocessing
Before simulating Gaussian kernels as continuum particles, perform the following preprocessing steps:
1. Remove Gaussian kernels with low opacity.
2. Rotate the 3D scene to make it align with the coordinate plane (e.g., bottom surface parallel to the xy plane).
3. Define a cuboid simulation area.
4. Center and scale the simulation area within a unit cube.
5. Optionally, fill internal voids with particles.

Related parameters, such as rotation axis and degree, should be provided in the config file. For [Nerf Synthetic Dataset](https://drive.google.com/file/d/18JxhpWD-4ZmuFKLzKlAw-w5PpzZxXOcG/view?usp=drive_link), the reconstructed results typically already align with the axis.  For custom datasets, we use 3D software, e.g. [Houdini](https://www.sidefx.com/), to view the distribution of the Gaussian kernels and determine how to rotate and select the scene for simulation readiness.

### Config Json File
A single `.json` file should detail all data preprocessing and simulation parameters for each scene. Key parameters include:

- Data Preprocessing Parameters:
    - `opacity_threshold`: Filters out Gaussian kernels with opacity below this threshold.
    - `rotation_degree (list)` and `rotation_axis (list)`: Rotate the scene to align with the grid.
    - `sim_area (list)`: Choose the particles within a bounding box for simulation. The expected format is `[xmin, xmax, ymin, ymax, zmin, zmax]`.
    - `particle_filling (dict)`: Specify a cubic area to fill internal particles. Tuning ```density_threshold``` and ```search_threshold``` is usually needed for optimal filling results. See more details below.
- Simulation Parameters:
    - `material`: Available material types include `jelly`, `metal`, `sand`, `foam`, `snow` and `plasticine`.
    - `E`: Young's modulus 
    - `nu`: Poisson's Ratio
    - `density`: Material density  
    - `g`: Gravity
    - `substep_dt`: Simulation time step size 
    - `n_grid`: MPM grid size
    - `boundary_conditions (list)`: Boundary conditions can be enforced on either particles or grids, allowing manipulation of Gaussian kernels via external forces.
- Export Parameters:
    - `frame_dt`: Duration of each frame
    - `frame_num`: Total number of frames to export
    - `default_camera_index`: Camera view index from the training set

Please see sample config files under the `config` folder for reference. 

#### Particle Filling
Optionally, we employ a ray-collision-based method to detect inner grids for particle filling. To use this, specify the following parameters:

- `n_grid`: Particle filling grid size.
- `density_threshold`: Grid cells with density above this threshold will be treated as part of the surface shell.
- `search_exclude_direction`: A parameter (list of ints) for internal filling condition 1 in PhysGaussian. We won't cast rays in these excluded directions. The mapping between ints and directions is: 0, 1, 2, 3, 4, 5 (+x, -x, +y, -y, +z, -z).
- `ray_cast_direction`: tA parameter for internal filling condition 2 in PhysGaussian. Along this direction, we will detect the number of collision times. The mapping between ints and directions is the same as `search_exclude_direction`.
- `max_particles_per cell`: The number of particles to fill for each grid cell.
- `boundary`: Specify a well-reconstructed cubic area to perform particle filling.

Note: This particle filling algorithm is sensitive to Gaussian kernel distribution and may produce unsatisfying filling results if Gaussians are too noisy.

#### Boundary Condition
To fix or move the reconstructed object, specify the boundary condition either on grids or particles. Some commonly used boundary condition types include:

- `bounding_box`: Prevents particles from moving outside the MPM simulation area.
- `cuboid`: Enforces a boundary condition on the grid. Also specify other necessary parameters:
    - `point`: Center of the cubic area, e.g. `[1, 1, 1]`
    - `size`: Size of the cubic area (half of the width, height and depth), e.g. `[0.2, 0.2, 0.2]`
    - `vecloticy`: Velocity assigned to the grids, e.g. `[0, 0, 0]`
    - `start_time` and `end_time`: Time duration of this boundary condition
- `enforce_particle_translation`: Enforces a boundary condition on particles with parameters similar to those for grids.

## Citation

```
@article{xie2023physgaussian,
      title={PhysGaussian: Physics-Integrated 3D Gaussians for Generative Dynamics}, 
      author={Xie, Tianyi and Zong, Zeshun and Qiu, Yuxing and Li, Xuan and Feng, Yutao and Yang, Yin and Jiang, Chenfanfu},
      journal={arXiv preprint arXiv:2311.12198},
      year={2023},
}
```
````

## requirements.txt

````text
h5py==3.10.0
numpy==1.24.1
opencv_python==4.8.1.78
opencv_python_headless==4.9.0.80
Pillow==10.2.0
plyfile==1.0.3
PyMCubes==0.1.4
pymeshlab==2023.12.post1
scipy==1.12.0
setuptools==68.0.0
taichi==1.5.0
torch==2.0.0
torchvision==0.15.1
tqdm==4.66.1
warp_lang==0.10.1
````

## download_sample_model.sh

````text
if [ ! -d "model" ]
then
    mkdir model
fi

gdown 1zic8PNxUsYESyrVZ8Ywy-FxpmQ01PGpe -O ./model/ficus_whitebg-trained.zip
unzip ./model/ficus_whitebg-trained.zip -d ./model
````

## gs_simulation.py

````text
import sys

sys.path.append("gaussian-splatting")

import argparse
import math
import cv2
import torch
import os
import numpy as np
import json
from tqdm import tqdm

# Gaussian splatting dependencies
from utils.sh_utils import eval_sh
from scene.gaussian_model import GaussianModel
from diff_gaussian_rasterization import (
    GaussianRasterizationSettings,
    GaussianRasterizer,
)
from scene.cameras import Camera as GSCamera
from gaussian_renderer import render, GaussianModel
from utils.system_utils import searchForMaxIteration
from utils.graphics_utils import focal2fov

# MPM dependencies
from mpm_solver_warp.engine_utils import *
from mpm_solver_warp.mpm_solver_warp import MPM_Simulator_WARP
import warp as wp

# Particle filling dependencies
from particle_filling.filling import *

# Utils
from utils.decode_param import *
from utils.transformation_utils import *
from utils.camera_view_utils import *
from utils.render_utils import *

wp.init()
wp.config.verify_cuda = True

ti.init(arch=ti.cuda, device_memory_GB=8.0)


class PipelineParamsNoparse:
    """Same as PipelineParams but without argument parser."""

    def __init__(self):
        self.convert_SHs_python = False
        self.compute_cov3D_python = False
        self.debug = False


def load_checkpoint(model_path, sh_degree=3, iteration=-1):
    # Find checkpoint
    checkpt_dir = os.path.join(model_path, "point_cloud")
    if iteration == -1:
        iteration = searchForMaxIteration(checkpt_dir)
    checkpt_path = os.path.join(
        checkpt_dir, f"iteration_{iteration}", "point_cloud.ply"
    )

    # Load guassians
    gaussians = GaussianModel(sh_degree)
    gaussians.load_ply(checkpt_path)
    return gaussians


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--model_path", type=str, required=True)
    parser.add_argument("--output_path", type=str, default=None)
    parser.add_argument("--config", type=str, required=True)
    parser.add_argument("--output_ply", action="store_true")
    parser.add_argument("--output_h5", action="store_true")
    parser.add_argument("--render_img", action="store_true")
    parser.add_argument("--compile_video", action="store_true")
    parser.add_argument("--white_bg", action="store_true")
    parser.add_argument("--debug", action="store_true")
    args = parser.parse_args()

    if not os.path.exists(args.model_path):
        AssertionError("Model path does not exist!")
    if not os.path.exists(args.config):
        AssertionError("Scene config does not exist!")
    if args.output_path is not None and not os.path.exists(args.output_path):
        os.makedirs(args.output_path)

    # load scene config
    print("Loading scene config...")
    (
        material_params,
        bc_params,
        time_params,
        preprocessing_params,
        camera_params,
    ) = decode_param_json(args.config)

    # load gaussians
    print("Loading gaussians...")
    model_path = args.model_path
    gaussians = load_checkpoint(model_path)
    pipeline = PipelineParamsNoparse()
    pipeline.compute_cov3D_python = True
    background = (
        torch.tensor([1, 1, 1], dtype=torch.float32, device="cuda")
        if args.white_bg
        else torch.tensor([0, 0, 0], dtype=torch.float32, device="cuda")
    )

    # init the scene
    print("Initializing scene and pre-processing...")
    params = load_params_from_gs(gaussians, pipeline)

    init_pos = params["pos"]
    init_cov = params["cov3D_precomp"]
    init_screen_points = params["screen_points"]
    init_opacity = params["opacity"]
    init_shs = params["shs"]

    # throw away low opacity kernels
    mask = init_opacity[:, 0] > preprocessing_params["opacity_threshold"]
    init_pos = init_pos[mask, :]
    init_cov = init_cov[mask, :]
    init_opacity = init_opacity[mask, :]
    init_screen_points = init_screen_points[mask, :]
    init_shs = init_shs[mask, :]

    # rorate and translate object
    if args.debug:
        if not os.path.exists("./log"):
            os.makedirs("./log")
        particle_position_tensor_to_ply(
            init_pos,
            "./log/init_particles.ply",
        )
    rotation_matrices = generate_rotation_matrices(
        torch.tensor(preprocessing_params["rotation_degree"]),
        preprocessing_params["rotation_axis"],
    )
    rotated_pos = apply_rotations(init_pos, rotation_matrices)

    if args.debug:
        particle_position_tensor_to_ply(rotated_pos, "./log/rotated_particles.ply")

    # select a sim area and save params of unslected particles
    unselected_pos, unselected_cov, unselected_opacity, unselected_shs = (
        None,
        None,
        None,
        None,
    )
    if preprocessing_params["sim_area"] is not None:
        boundary = preprocessing_params["sim_area"]
        assert len(boundary) == 6
        mask = torch.ones(rotated_pos.shape[0], dtype=torch.bool).to(device="cuda")
        for i in range(3):
            mask = torch.logical_and(mask, rotated_pos[:, i] > boundary[2 * i])
            mask = torch.logical_and(mask, rotated_pos[:, i] < boundary[2 * i + 1])

        unselected_pos = init_pos[~mask, :]
        unselected_cov = init_cov[~mask, :]
        unselected_opacity = init_opacity[~mask, :]
        unselected_shs = init_shs[~mask, :]

        rotated_pos = rotated_pos[mask, :]
        init_cov = init_cov[mask, :]
        init_opacity = init_opacity[mask, :]
        init_shs = init_shs[mask, :]

    transformed_pos, scale_origin, original_mean_pos = transform2origin(rotated_pos, preprocessing_params["scale"])
    transformed_pos = shift2center111(transformed_pos)

    # modify covariance matrix accordingly
    init_cov = apply_cov_rotations(init_cov, rotation_matrices)
    init_cov = scale_origin * scale_origin * init_cov

    if args.debug:
        particle_position_tensor_to_ply(
            transformed_pos,
            "./log/transformed_particles.ply",
        )

    # fill particles if needed
    gs_num = transformed_pos.shape[0]
    device = "cuda:0"
    filling_params = preprocessing_params["particle_filling"]

    if filling_params is not None:
        print("Filling internal particles...")
        mpm_init_pos = fill_particles(
            pos=transformed_pos,
            opacity=init_opacity,
            cov=init_cov,
            grid_n=filling_params["n_grid"],
            max_samples=filling_params["max_particles_num"],
            grid_dx=material_params["grid_lim"] / filling_params["n_grid"],
            density_thres=filling_params["density_threshold"],
            search_thres=filling_params["search_threshold"],
            max_particles_per_cell=filling_params["max_partciels_per_cell"],
            search_exclude_dir=filling_params["search_exclude_direction"],
            ray_cast_dir=filling_params["ray_cast_direction"],
            boundary=filling_params["boundary"],
            smooth=filling_params["smooth"],
        ).to(device=device)

        if args.debug:
            particle_position_tensor_to_ply(mpm_init_pos, "./log/filled_particles.ply")
    else:
        mpm_init_pos = transformed_pos.to(device=device)

    # init the mpm solver
    print("Initializing MPM solver and setting up boundary conditions...")
    mpm_init_vol = get_particle_volume(
        mpm_init_pos,
        material_params["n_grid"],
        material_params["grid_lim"] / material_params["n_grid"],
        unifrom=material_params["material"] == "sand",
    ).to(device=device)

    if filling_params is not None and filling_params["visualize"] == True:
        shs, opacity, mpm_init_cov = init_filled_particles(
            mpm_init_pos[:gs_num],
            init_shs,
            init_cov,
            init_opacity,
            mpm_init_pos[gs_num:],
        )
        gs_num = mpm_init_pos.shape[0]
    else:
        mpm_init_cov = torch.zeros((mpm_init_pos.shape[0], 6), device=device)
        mpm_init_cov[:gs_num] = init_cov
        shs = init_shs
        opacity = init_opacity

    if args.debug:
        print("check *.ply files to see if it's ready for simulation")

    # set up the mpm solver
    mpm_solver = MPM_Simulator_WARP(10)
    mpm_solver.load_initial_data_from_torch(
        mpm_init_pos,
        mpm_init_vol,
        mpm_init_cov,
        n_grid=material_params["n_grid"],
        grid_lim=material_params["grid_lim"],
    )
    mpm_solver.set_parameters_dict(material_params)

    # Note: boundary conditions may depend on mass, so the order cannot be changed!
    set_boundary_conditions(mpm_solver, bc_params, time_params)

    mpm_solver.finalize_mu_lam()

    # camera setting
    mpm_space_viewpoint_center = (
        torch.tensor(camera_params["mpm_space_viewpoint_center"]).reshape((1, 3)).cuda()
    )
    mpm_space_vertical_upward_axis = (
        torch.tensor(camera_params["mpm_space_vertical_upward_axis"])
        .reshape((1, 3))
        .cuda()
    )
    (
        viewpoint_center_worldspace,
        observant_coordinates,
    ) = get_center_view_worldspace_and_observant_coordinate(
        mpm_space_viewpoint_center,
        mpm_space_vertical_upward_axis,
        rotation_matrices,
        scale_origin,
        original_mean_pos,
    )

    # run the simulation
    if args.output_ply or args.output_h5:
        directory_to_save = os.path.join(args.output_path, "simulation_ply")
        if not os.path.exists(directory_to_save):
            os.makedirs(directory_to_save)

        save_data_at_frame(
            mpm_solver,
            directory_to_save,
            0,
            save_to_ply=args.output_ply,
            save_to_h5=args.output_h5,
        )

    substep_dt = time_params["substep_dt"]
    frame_dt = time_params["frame_dt"]
    frame_num = time_params["frame_num"]
    step_per_frame = int(frame_dt / substep_dt)
    opacity_render = opacity
    shs_render = shs
    height = None
    width = None
    for frame in tqdm(range(frame_num)):
        current_camera = get_camera_view(
            model_path,
            default_camera_index=camera_params["default_camera_index"],
            center_view_world_space=viewpoint_center_worldspace,
            observant_coordinates=observant_coordinates,
            show_hint=camera_params["show_hint"],
            init_azimuthm=camera_params["init_azimuthm"],
            init_elevation=camera_params["init_elevation"],
            init_radius=camera_params["init_radius"],
            move_camera=camera_params["move_camera"],
            current_frame=frame,
            delta_a=camera_params["delta_a"],
            delta_e=camera_params["delta_e"],
            delta_r=camera_params["delta_r"],
        )
        rasterize = initialize_resterize(
            current_camera, gaussians, pipeline, background
        )

        for step in range(step_per_frame):
            mpm_solver.p2g2p(frame, substep_dt, device=device)

        if args.output_ply or args.output_h5:
            save_data_at_frame(
                mpm_solver,
                directory_to_save,
                frame + 1,
                save_to_ply=args.output_ply,
                save_to_h5=args.output_h5,
            )

        if args.render_img:
            pos = mpm_solver.export_particle_x_to_torch()[:gs_num].to(device)
            cov3D = mpm_solver.export_particle_cov_to_torch()
            rot = mpm_solver.export_particle_R_to_torch()
            cov3D = cov3D.view(-1, 6)[:gs_num].to(device)
            rot = rot.view(-1, 3, 3)[:gs_num].to(device)

            pos = apply_inverse_rotations(
                undotransform2origin(
                    undoshift2center111(pos), scale_origin, original_mean_pos
                ),
                rotation_matrices,
            )
            cov3D = cov3D / (scale_origin * scale_origin)
            cov3D = apply_inverse_cov_rotations(cov3D, rotation_matrices)
            opacity = opacity_render
            shs = shs_render
            if preprocessing_params["sim_area"] is not None:
                pos = torch.cat([pos, unselected_pos], dim=0)
                cov3D = torch.cat([cov3D, unselected_cov], dim=0)
                opacity = torch.cat([opacity_render, unselected_opacity], dim=0)
                shs = torch.cat([shs_render, unselected_shs], dim=0)

            colors_precomp = convert_SH(shs, current_camera, gaussians, pos, rot)
            rendering, raddi = rasterize(
                means3D=pos,
                means2D=init_screen_points,
                shs=None,
                colors_precomp=colors_precomp,
                opacities=opacity,
                scales=None,
                rotations=None,
                cov3D_precomp=cov3D,
            )
            cv2_img = rendering.permute(1, 2, 0).detach().cpu().numpy()
            cv2_img = cv2.cvtColor(cv2_img, cv2.COLOR_BGR2RGB)
            if height is None or width is None:
                height = cv2_img.shape[0] // 2 * 2
                width = cv2_img.shape[1] // 2 * 2
            assert args.output_path is not None
            cv2.imwrite(
                os.path.join(args.output_path, f"{frame}.png".rjust(8, "0")),
                255 * cv2_img,
            )

    if args.render_img and args.compile_video:
        fps = int(1.0 / time_params["frame_dt"])
        os.system(
            f"ffmpeg -framerate {fps} -i {args.output_path}/%04d.png -c:v libx264 -s {width}x{height} -y -pix_fmt yuv420p {args.output_path}/output.mp4"
        )
````

## particle_filling/filling.py

````text
import torch
import os
import numpy as np
import taichi as ti
import mcubes

# 1. densify grids
# 2. identify grids whose density is larger than some threshold
# 3. filling grids with particles
# 4. identify and fill internal grids


@ti.func
def compute_density(index, pos, opacity, cov, grid_dx):
    gaussian_weight = 0.0
    for i in range(0, 2):
        for j in range(0, 2):
            for k in range(0, 2):
                node_pos = (index + ti.Vector([i, j, k])) * grid_dx
                dist = pos - node_pos
                gaussian_weight += ti.exp(-0.5 * dist.dot(cov @ dist))

    return opacity * gaussian_weight / 8.0


@ti.kernel
def densify_grids(
    init_particles: ti.template(),
    opacity: ti.template(),
    cov_upper: ti.template(),
    grid: ti.template(),
    grid_density: ti.template(),
    grid_dx: float,
):
    for pi in range(init_particles.shape[0]):
        pos = init_particles[pi]
        x = pos[0]
        y = pos[1]
        z = pos[2]
        i = ti.floor(x / grid_dx, dtype=int)
        j = ti.floor(y / grid_dx, dtype=int)
        k = ti.floor(z / grid_dx, dtype=int)
        ti.atomic_add(grid[i, j, k], 1)
        cov = ti.Matrix(
            [
                [cov_upper[pi][0], cov_upper[pi][1], cov_upper[pi][2]],
                [cov_upper[pi][1], cov_upper[pi][3], cov_upper[pi][4]],
                [cov_upper[pi][2], cov_upper[pi][4], cov_upper[pi][5]],
            ]
        )
        sig, Q = ti.sym_eig(cov)
        sig[0] = ti.max(sig[0], 1e-8)
        sig[1] = ti.max(sig[1], 1e-8)
        sig[2] = ti.max(sig[2], 1e-8)
        sig_mat = ti.Matrix(
            [[1.0 / sig[0], 0, 0], [0, 1.0 / sig[1], 0], [0, 0, 1.0 / sig[2]]]
        )
        cov = Q @ sig_mat @ Q.transpose()
        r = 0.0
        for idx in ti.static(range(3)):
            if sig[idx] < 0:
                sig[idx] = ti.sqrt(-sig[idx])
            else:
                sig[idx] = ti.sqrt(sig[idx])

            r = ti.max(r, sig[idx])

        r = ti.ceil(r / grid_dx, dtype=int)
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                for dz in range(-r, r + 1):
                    if (
                        i + dx >= 0
                        and i + dx < grid_density.shape[0]
                        and j + dy >= 0
                        and j + dy < grid_density.shape[1]
                        and k + dz >= 0
                        and k + dz < grid_density.shape[2]
                    ):
                        density = compute_density(
                            ti.Vector([i + dx, j + dy, k + dz]),
                            pos,
                            opacity[pi],
                            cov,
                            grid_dx,
                        )
                        ti.atomic_add(grid_density[i + dx, j + dy, k + dz], density)


@ti.kernel
def fill_dense_grids(
    grid: ti.template(),
    grid_density: ti.template(),
    grid_dx: float,
    density_thres: float,
    new_particles: ti.template(),
    start_idx: int,
    max_particles_per_cell: int,
) -> int:
    new_start_idx = start_idx
    for i, j, k in grid_density:
        if grid_density[i, j, k] > density_thres:
            if grid[i, j, k] < max_particles_per_cell:
                diff = max_particles_per_cell - grid[i, j, k]
                grid[i, j, k] = max_particles_per_cell
                tmp_start_idx = ti.atomic_add(new_start_idx, diff)

                for index in range(tmp_start_idx, tmp_start_idx + diff):
                    di = ti.random()
                    dj = ti.random()
                    dk = ti.random()
                    new_particles[index] = ti.Vector([i + di, j + dj, k + dk]) * grid_dx

    return new_start_idx


@ti.func
def collision_search(
    grid: ti.template(), grid_density: ti.template(), index, dir_type, size, threshold
) -> bool:
    dir = ti.Vector([0, 0, 0])
    if dir_type == 0:
        dir[0] = 1
    elif dir_type == 1:
        dir[0] = -1
    elif dir_type == 2:
        dir[1] = 1
    elif dir_type == 3:
        dir[1] = -1
    elif dir_type == 4:
        dir[2] = 1
    elif dir_type == 5:
        dir[2] = -1

    flag = False
    index += dir
    i, j, k = index
    while ti.max(i, j, k) < size and ti.min(i, j, k) >= 0:
        if grid_density[index] > threshold:
            flag = True
            break
        index += dir
        i, j, k = index

    return flag


@ti.func
def collision_times(
    grid: ti.template(), grid_density: ti.template(), index, dir_type, size, threshold
) -> int:
    dir = ti.Vector([0, 0, 0])
    times = 0
    if dir_type > 5 or dir_type < 0:
        times = 1
    else:
        if dir_type == 0:
            dir[0] = 1
        elif dir_type == 1:
            dir[0] = -1
        elif dir_type == 2:
            dir[1] = 1
        elif dir_type == 3:
            dir[1] = -1
        elif dir_type == 4:
            dir[2] = 1
        elif dir_type == 5:
            dir[2] = -1

        state = grid[index] > 0
        index += dir
        i, j, k = index
        while ti.max(i, j, k) < size and ti.min(i, j, k) >= 0:
            new_state = grid_density[index] > threshold
            if new_state != state and state == False:
                times += 1
            state = new_state
            index += dir
            i, j, k = index

    return times


@ti.kernel
def internal_filling(
    grid: ti.template(),
    grid_density: ti.template(),
    grid_dx: float,
    new_particles: ti.template(),
    start_idx: int,
    max_particles_per_cell: int,
    exclude_dir: int,
    ray_cast_dir: int,
    threshold: float,
) -> int:
    new_start_idx = start_idx
    for i, j, k in grid:
        if grid[i, j, k] == 0:
            collision_hit = True
            for dir_type in ti.static(range(6)):
                if dir_type != exclude_dir:
                    hit_test = collision_search(
                        grid=grid,
                        grid_density=grid_density,
                        index=ti.Vector([i, j, k]),
                        dir_type=dir_type,
                        size=grid.shape[0],
                        threshold=threshold,
                    )
                    collision_hit = collision_hit and hit_test

            if collision_hit:
                hit_times = collision_times(
                    grid=grid,
                    grid_density=grid_density,
                    index=ti.Vector([i, j, k]),
                    dir_type=ray_cast_dir,
                    size=grid.shape[0],
                    threshold=threshold,
                )

                if ti.math.mod(hit_times, 2) == 1:
                    diff = max_particles_per_cell - grid[i, j, k]
                    grid[i, j, k] = max_particles_per_cell
                    tmp_start_idx = ti.atomic_add(new_start_idx, diff)
                    for index in range(tmp_start_idx, tmp_start_idx + diff):
                        di = ti.random()
                        dj = ti.random()
                        dk = ti.random()
                        new_particles[index] = (
                            ti.Vector([i + di, j + dj, k + dk]) * grid_dx
                        )

    return new_start_idx


@ti.kernel
def assign_particle_to_grid(pos: ti.template(), grid: ti.template(), grid_dx: float):
    for pi in range(pos.shape[0]):
        p = pos[pi]
        i = ti.floor(p[0] / grid_dx, dtype=int)
        j = ti.floor(p[1] / grid_dx, dtype=int)
        k = ti.floor(p[2] / grid_dx, dtype=int)
        ti.atomic_add(grid[i, j, k], 1)


@ti.kernel
def compute_particle_volume(
    pos: ti.template(), grid: ti.template(), particle_vol: ti.template(), grid_dx: float
):
    for pi in range(pos.shape[0]):
        p = pos[pi]
        i = ti.floor(p[0] / grid_dx, dtype=int)
        j = ti.floor(p[1] / grid_dx, dtype=int)
        k = ti.floor(p[2] / grid_dx, dtype=int)
        particle_vol[pi] = (grid_dx * grid_dx * grid_dx) / grid[i, j, k]


@ti.kernel
def assign_particle_to_grid(
    pos: ti.template(),
    grid: ti.template(),
    grid_dx: float,
):
    for pi in range(pos.shape[0]):
        p = pos[pi]
        i = ti.floor(p[0] / grid_dx, dtype=int)
        j = ti.floor(p[1] / grid_dx, dtype=int)
        k = ti.floor(p[2] / grid_dx, dtype=int)
        ti.atomic_add(grid[i, j, k], 1)


def get_particle_volume(pos, grid_n: int, grid_dx: float, unifrom: bool = False):
    ti_pos = ti.Vector.field(n=3, dtype=float, shape=pos.shape[0])
    ti_pos.from_torch(pos.reshape(-1, 3))

    grid = ti.field(dtype=int, shape=(grid_n, grid_n, grid_n))
    particle_vol = ti.field(dtype=float, shape=pos.shape[0])

    assign_particle_to_grid(ti_pos, grid, grid_dx)
    compute_particle_volume(ti_pos, grid, particle_vol, grid_dx)

    if unifrom:
        vol = particle_vol.to_torch()
        vol = torch.mean(vol).repeat(pos.shape[0])
        return vol
    else:
        return particle_vol.to_torch()


def fill_particles(
    pos,
    opacity,
    cov,
    grid_n: int,
    max_samples: int,
    grid_dx: float,
    density_thres=2.0,
    search_thres=1.0,
    max_particles_per_cell=1,
    search_exclude_dir=5,
    ray_cast_dir=4,
    boundary: list = None,
    smooth: bool = False,
):
    pos_clone = pos.clone()
    if boundary is not None:
        assert len(boundary) == 6
        mask = torch.ones(pos_clone.shape[0], dtype=torch.bool).cuda()
        max_diff = 0.0
        for i in range(3):
            mask = torch.logical_and(mask, pos_clone[:, i] > boundary[2 * i])
            mask = torch.logical_and(mask, pos_clone[:, i] < boundary[2 * i + 1])
            max_diff = max(max_diff, boundary[2 * i + 1] - boundary[2 * i])

        pos = pos[mask]
        opacity = opacity[mask]
        cov = cov[mask]

        grid_dx = max_diff / grid_n
        new_origin = torch.tensor([boundary[0], boundary[2], boundary[4]]).cuda()
        pos = pos - new_origin

    ti_pos = ti.Vector.field(n=3, dtype=float, shape=pos.shape[0])
    ti_opacity = ti.field(dtype=float, shape=opacity.shape[0])
    ti_cov = ti.Vector.field(n=6, dtype=float, shape=cov.shape[0])
    ti_pos.from_torch(pos.reshape(-1, 3))
    ti_opacity.from_torch(opacity.reshape(-1))
    ti_cov.from_torch(cov.reshape(-1, 6))

    grid = ti.field(dtype=int, shape=(grid_n, grid_n, grid_n))
    grid_density = ti.field(dtype=float, shape=(grid_n, grid_n, grid_n))
    particles = ti.Vector.field(n=3, dtype=float, shape=max_samples)
    fill_num = 0

    # compute density_field
    densify_grids(ti_pos, ti_opacity, ti_cov, grid, grid_density, grid_dx)

    # fill dense grids
    fill_num = fill_dense_grids(
        grid,
        grid_density,
        grid_dx,
        density_thres,
        particles,
        0,
        max_particles_per_cell,
    )
    print("after dense grids: ", fill_num)

    # smooth density_field
    if smooth:
        df = grid_density.to_numpy()
        smoothed_df = mcubes.smooth(df, method="constrained", max_iters=500).astype(
            np.float32
        )
        grid_density.from_numpy(smoothed_df)
        print("smooth finished")

    # fill internal grids
    fill_num = internal_filling(
        grid,
        grid_density,
        grid_dx,
        particles,
        fill_num,
        max_particles_per_cell,
        exclude_dir=search_exclude_dir,  # 0: x, 1: -x, 2: y, 3: -y, 4: z, 5: -z direction
        ray_cast_dir=ray_cast_dir,  # 0: x, 1: -x, 2: y, 3: -y, 4: z, 5: -z direction
        threshold=search_thres,
    )
    print("after internal grids: ", fill_num)

    # put new particles together with original particles
    particles_tensor = particles.to_torch()[:fill_num].cuda()
    if boundary is not None:
        particles_tensor = particles_tensor + new_origin
    particles_tensor = torch.cat([pos_clone, particles_tensor], dim=0)

    return particles_tensor


@ti.kernel
def get_attr_from_closest(
    ti_pos: ti.template(),
    ti_shs: ti.template(),
    ti_opacity: ti.template(),
    ti_cov: ti.template(),
    ti_new_pos: ti.template(),
    ti_new_shs: ti.template(),
    ti_new_opacity: ti.template(),
    ti_new_cov: ti.template(),
):
    for pi in range(ti_new_pos.shape[0]):
        p = ti_new_pos[pi]
        min_dist = 1e10
        min_idx = -1
        for pj in range(ti_pos.shape[0]):
            dist = (p - ti_pos[pj]).norm()
            if dist < min_dist:
                min_dist = dist
                min_idx = pj
        ti_new_shs[pi] = ti_shs[min_idx]
        ti_new_opacity[pi] = ti_opacity[min_idx]
        ti_new_cov[pi] = ti_cov[min_idx]


def init_filled_particles(pos, shs, cov, opacity, new_pos):
    shs = shs.reshape(pos.shape[0], -1)
    ti_pos = ti.Vector.field(n=3, dtype=float, shape=pos.shape[0])
    ti_cov = ti.Vector.field(n=6, dtype=float, shape=cov.shape[0])
    ti_shs = ti.Vector.field(n=shs.shape[1], dtype=float, shape=shs.shape[0])
    ti_opacity = ti.field(dtype=float, shape=opacity.shape[0])
    ti_pos.from_torch(pos.reshape(-1, 3))
    ti_cov.from_torch(cov.reshape(-1, 6))
    ti_shs.from_torch(shs)
    ti_opacity.from_torch(opacity.reshape(-1))

    new_shs = torch.mean(shs, dim=0).repeat(new_pos.shape[0], 1).cuda()
    ti_new_pos = ti.Vector.field(n=3, dtype=float, shape=new_pos.shape[0])
    ti_new_shs = ti.Vector.field(n=shs.shape[1], dtype=float, shape=new_pos.shape[0])
    ti_new_opacity = ti.field(dtype=float, shape=new_pos.shape[0])
    ti_new_cov = ti.Vector.field(n=6, dtype=float, shape=new_pos.shape[0])
    ti_new_pos.from_torch(new_pos.reshape(-1, 3))
    ti_new_shs.from_torch(new_shs)

    get_attr_from_closest(
        ti_pos,
        ti_shs,
        ti_opacity,
        ti_cov,
        ti_new_pos,
        ti_new_shs,
        ti_new_opacity,
        ti_new_cov,
    )

    shs_tensor = ti_new_shs.to_torch().cuda()
    opacity_tensor = ti_new_opacity.to_torch().cuda()
    cov_tensor = ti_new_cov.to_torch().cuda()

    shs_tensor = torch.cat([shs, shs_tensor], dim=0)
    shs_tensor = shs_tensor.view(shs_tensor.shape[0], -1, 3)
    opacity_tensor = torch.cat([opacity, opacity_tensor.reshape(-1, 1)], dim=0)
    cov_tensor = torch.cat([cov, cov_tensor], dim=0)
    return shs_tensor, opacity_tensor, cov_tensor
````

## mpm_solver_warp/README.md

````text
# WARP MPM
<p align="center">
  <img src="assets/sand.gif">
</p>

This MPM solver is implemented using Nvidia's WARP: https://nvidia.github.io/warp/

For details about MPM, please refer to the course on the Material Point Method: https://www.math.ucla.edu/~cffjiang/research/mpmcourse/mpmcourse.pdf


## Prerequisites

This codebase is tested using the environment with the following key packages:

- Ubuntu 20.04
- CUDA 11.6
- Python 3.9.13
- Warp 0.10.1

## Installation
```
pip install -r requirements.txt
```

## Examples
Sand: column collapse 
```
python run_sand.py
```

More coming.
````

## mpm_solver_warp/mpm_solver_warp.py

````text
import sys
import os

sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from engine_utils import *
from warp_utils import *
from mpm_utils import *


class MPM_Simulator_WARP:
    def __init__(self, n_particles, n_grid=100, grid_lim=1.0, device="cuda:0"):
        self.initialize(n_particles, n_grid, grid_lim, device=device)
        self.time_profile = {}

    def initialize(self, n_particles, n_grid=100, grid_lim=1.0, device="cuda:0"):
        self.n_particles = n_particles

        self.mpm_model = MPMModelStruct()
        # domain will be [0,grid_lim]*[0,grid_lim]*[0,grid_lim] !!!
        # domain will be [0,grid_lim]*[0,grid_lim]*[0,grid_lim] !!!
        # domain will be [0,grid_lim]*[0,grid_lim]*[0,grid_lim] !!!
        self.mpm_model.grid_lim = grid_lim
        self.mpm_model.n_grid = n_grid
        self.mpm_model.grid_dim_x = self.mpm_model.n_grid
        self.mpm_model.grid_dim_y = self.mpm_model.n_grid
        self.mpm_model.grid_dim_z = self.mpm_model.n_grid
        (
            self.mpm_model.dx,
            self.mpm_model.inv_dx,
        ) = self.mpm_model.grid_lim / self.mpm_model.n_grid, float(
            self.mpm_model.n_grid / self.mpm_model.grid_lim
        )

        self.mpm_model.E = wp.zeros(shape=n_particles, dtype=float, device=device)
        self.mpm_model.nu = wp.zeros(shape=n_particles, dtype=float, device=device)
        self.mpm_model.mu = wp.zeros(shape=n_particles, dtype=float, device=device)
        self.mpm_model.lam = wp.zeros(shape=n_particles, dtype=float, device=device)

        self.mpm_model.update_cov_with_F = False

        # material is used to switch between different elastoplastic models. 0 is jelly
        self.mpm_model.material = 0

        self.mpm_model.plastic_viscosity = 0.0
        self.mpm_model.softening = 0.1
        self.mpm_model.yield_stress = wp.zeros(
            shape=n_particles, dtype=float, device=device
        )
        self.mpm_model.friction_angle = 25.0
        sin_phi = wp.sin(self.mpm_model.friction_angle / 180.0 * 3.14159265)
        self.mpm_model.alpha = wp.sqrt(2.0 / 3.0) * 2.0 * sin_phi / (3.0 - sin_phi)

        self.mpm_model.gravitational_accelaration = wp.vec3(0.0, 0.0, 0.0)

        self.mpm_model.rpic_damping = 0.0  # 0.0 if no damping (apic). -1 if pic

        self.mpm_model.grid_v_damping_scale = 1.1  # globally applied

        self.mpm_state = MPMStateStruct()

        self.mpm_state.particle_x = wp.empty(
            shape=n_particles, dtype=wp.vec3, device=device
        )  # current position

        self.mpm_state.particle_v = wp.zeros(
            shape=n_particles, dtype=wp.vec3, device=device
        )  # particle velocity

        self.mpm_state.particle_F = wp.zeros(
            shape=n_particles, dtype=wp.mat33, device=device
        )  # particle F elastic

        self.mpm_state.particle_R = wp.zeros(
            shape=n_particles, dtype=wp.mat33, device=device
        )  # particle R rotation

        self.mpm_state.particle_init_cov = wp.zeros(
            shape=n_particles * 6, dtype=float, device=device
        )  # initial covariance matrix

        self.mpm_state.particle_cov = wp.zeros(
            shape=n_particles * 6, dtype=float, device=device
        )  # current covariance matrix

        self.mpm_state.particle_F_trial = wp.zeros(
            shape=n_particles, dtype=wp.mat33, device=device
        )  # apply return mapping will yield

        self.mpm_state.particle_stress = wp.zeros(
            shape=n_particles, dtype=wp.mat33, device=device
        )

        self.mpm_state.particle_vol = wp.zeros(
            shape=n_particles, dtype=float, device=device
        )  # particle volume
        self.mpm_state.particle_mass = wp.zeros(
            shape=n_particles, dtype=float, device=device
        )  # particle mass
        self.mpm_state.particle_density = wp.zeros(
            shape=n_particles, dtype=float, device=device
        )
        self.mpm_state.particle_C = wp.zeros(
            shape=n_particles, dtype=wp.mat33, device=device
        )
        self.mpm_state.particle_Jp = wp.zeros(
            shape=n_particles, dtype=float, device=device
        )

        self.mpm_state.particle_selection = wp.zeros(
            shape=n_particles, dtype=int, device=device
        )

        self.mpm_state.grid_m = wp.zeros(
            shape=(self.mpm_model.n_grid, self.mpm_model.n_grid, self.mpm_model.n_grid),
            dtype=float,
            device=device,
        )
        self.mpm_state.grid_v_in = wp.zeros(
            shape=(self.mpm_model.n_grid, self.mpm_model.n_grid, self.mpm_model.n_grid),
            dtype=wp.vec3,
            device=device,
        )
        self.mpm_state.grid_v_out = wp.zeros(
            shape=(self.mpm_model.n_grid, self.mpm_model.n_grid, self.mpm_model.n_grid),
            dtype=wp.vec3,
            device=device,
        )

        self.time = 0.0

        self.grid_postprocess = []
        self.collider_params = []
        self.modify_bc = []

        self.tailored_struct_for_bc = MPMtailoredStruct()
        self.pre_p2g_operations = []
        self.impulse_params = []

        self.particle_velocity_modifiers = []
        self.particle_velocity_modifier_params = []

    # the h5 file should store particle initial position and volume.
    def load_from_sampling(
        self, sampling_h5, n_grid=100, grid_lim=1.0, device="cuda:0"
    ):
        if not os.path.exists(sampling_h5):
            print("h5 file cannot be found at ", os.getcwd() + sampling_h5)
            exit()

        h5file = h5py.File(sampling_h5, "r")
        x, particle_volume = h5file["x"], h5file["particle_volume"]

        x = x[()].transpose()  # np vector of x # shape now is (n_particles, dim)

        self.dim, self.n_particles = x.shape[1], x.shape[0]

        self.initialize(self.n_particles, n_grid, grid_lim, device=device)

        print(
            "Sampling particles are loaded from h5 file. Simulator is re-initialized for the correct n_particles"
        )
        particle_volume = np.squeeze(particle_volume, 0)

        self.mpm_state.particle_x = wp.from_numpy(
            x, dtype=wp.vec3, device=device
        )  # initialize warp array from np

        # initial velocity is default to zero
        wp.launch(
            kernel=set_vec3_to_zero,
            dim=self.n_particles,
            inputs=[self.mpm_state.particle_v],
            device=device,
        )
        # initial velocity is default to zero

        # initial deformation gradient is set to identity
        wp.launch(
            kernel=set_mat33_to_identity,
            dim=self.n_particles,
            inputs=[self.mpm_state.particle_F_trial],
            device=device,
        )
        # initial deformation gradient is set to identity

        self.mpm_state.particle_vol = wp.from_numpy(
            particle_volume, dtype=float, device=device
        )

        print("Particles initialized from sampling file.")
        print("Total particles: ", self.n_particles)

    # shape of tensor_x is (n, 3); shape of tensor_volume is (n,)
    def load_initial_data_from_torch(
        self,
        tensor_x,
        tensor_volume,
        tensor_cov=None,
        n_grid=100,
        grid_lim=1.0,
        device="cuda:0",
    ):
        self.dim, self.n_particles = tensor_x.shape[1], tensor_x.shape[0]
        assert tensor_x.shape[0] == tensor_volume.shape[0]
        # assert tensor_x.shape[0] == tensor_cov.reshape(-1, 6).shape[0]
        self.initialize(self.n_particles, n_grid, grid_lim, device=device)

        self.import_particle_x_from_torch(tensor_x, device)
        self.mpm_state.particle_vol = wp.from_numpy(
            tensor_volume.detach().clone().cpu().numpy(), dtype=float, device=device
        )
        if tensor_cov is not None:
            self.mpm_state.particle_init_cov = wp.from_numpy(
                tensor_cov.reshape(-1).detach().clone().cpu().numpy(),
                dtype=float,
                device=device,
            )

            if self.mpm_model.update_cov_with_F:
                self.mpm_state.particle_cov = self.mpm_state.particle_init_cov

        # initial velocity is default to zero
        wp.launch(
            kernel=set_vec3_to_zero,
            dim=self.n_particles,
            inputs=[self.mpm_state.particle_v],
            device=device,
        )
        # initial velocity is default to zero

        # initial deformation gradient is set to identity
        wp.launch(
            kernel=set_mat33_to_identity,
            dim=self.n_particles,
            inputs=[self.mpm_state.particle_F_trial],
            device=device,
        )
        # initial trial deformation gradient is set to identity

        print("Particles initialized from torch data.")
        print("Total particles: ", self.n_particles)

    # must give density. mass will be updated as density * volume
    def set_parameters(self, device="cuda:0", **kwargs):
        self.set_parameters_dict(device, kwargs)

    def set_parameters_dict(self, kwargs={}, device="cuda:0"):
        if "material" in kwargs:
            if kwargs["material"] == "jelly":
                self.mpm_model.material = 0
            elif kwargs["material"] == "metal":
                self.mpm_model.material = 1
            elif kwargs["material"] == "sand":
                self.mpm_model.material = 2
            elif kwargs["material"] == "foam":
                self.mpm_model.material = 3
            elif kwargs["material"] == "snow":
                self.mpm_model.material = 4
            elif kwargs["material"] == "plasticine":
                self.mpm_model.material = 5
            else:
                raise TypeError("Undefined material type")

        if "grid_lim" in kwargs:
            self.mpm_model.grid_lim = kwargs["grid_lim"]
        if "n_grid" in kwargs:
            self.mpm_model.n_grid = kwargs["n_grid"]
        self.mpm_model.grid_dim_x = self.mpm_model.n_grid
        self.mpm_model.grid_dim_y = self.mpm_model.n_grid
        self.mpm_model.grid_dim_z = self.mpm_model.n_grid
        (
            self.mpm_model.dx,
            self.mpm_model.inv_dx,
        ) = self.mpm_model.grid_lim / self.mpm_model.n_grid, float(
            self.mpm_model.n_grid / self.mpm_model.grid_lim
        )
        self.mpm_state.grid_m = wp.zeros(
            shape=(self.mpm_model.n_grid, self.mpm_model.n_grid, self.mpm_model.n_grid),
            dtype=float,
            device=device,
        )
        self.mpm_state.grid_v_in = wp.zeros(
            shape=(self.mpm_model.n_grid, self.mpm_model.n_grid, self.mpm_model.n_grid),
            dtype=wp.vec3,
            device=device,
        )
        self.mpm_state.grid_v_out = wp.zeros(
            shape=(self.mpm_model.n_grid, self.mpm_model.n_grid, self.mpm_model.n_grid),
            dtype=wp.vec3,
            device=device,
        )

        if "E" in kwargs:
            wp.launch(
                kernel=set_value_to_float_array,
                dim=self.n_particles,
                inputs=[self.mpm_model.E, kwargs["E"]],
                device=device,
            )
        if "nu" in kwargs:
            wp.launch(
                kernel=set_value_to_float_array,
                dim=self.n_particles,
                inputs=[self.mpm_model.nu, kwargs["nu"]],
                device=device,
            )
        if "yield_stress" in kwargs:
            val = kwargs["yield_stress"]
            wp.launch(
                kernel=set_value_to_float_array,
                dim=self.n_particles,
                inputs=[self.mpm_model.yield_stress, val],
                device=device,
            )
        if "hardening" in kwargs:
            self.mpm_model.hardening = kwargs["hardening"]
        if "xi" in kwargs:
            self.mpm_model.xi = kwargs["xi"]
        if "friction_angle" in kwargs:
            self.mpm_model.friction_angle = kwargs["friction_angle"]
            sin_phi = wp.sin(self.mpm_model.friction_angle / 180.0 * 3.14159265)
            self.mpm_model.alpha = wp.sqrt(2.0 / 3.0) * 2.0 * sin_phi / (3.0 - sin_phi)

        if "g" in kwargs:
            self.mpm_model.gravitational_accelaration = wp.vec3(
                kwargs["g"][0], kwargs["g"][1], kwargs["g"][2]
            )

        if "density" in kwargs:
            density_value = kwargs["density"]
            wp.launch(
                kernel=set_value_to_float_array,
                dim=self.n_particles,
                inputs=[self.mpm_state.particle_density, density_value],
                device=device,
            )
            wp.launch(
                kernel=get_float_array_product,
                dim=self.n_particles,
                inputs=[
                    self.mpm_state.particle_density,
                    self.mpm_state.particle_vol,
                    self.mpm_state.particle_mass,
                ],
                device=device,
            )
        if "rpic_damping" in kwargs:
            self.mpm_model.rpic_damping = kwargs["rpic_damping"]
        if "plastic_viscosity" in kwargs:
            self.mpm_model.plastic_viscosity = kwargs["plastic_viscosity"]
        if "softening" in kwargs:
            self.mpm_model.softening = kwargs["softening"]
        if "grid_v_damping_scale" in kwargs:
            self.mpm_model.grid_v_damping_scale = kwargs["grid_v_damping_scale"]

        if "additional_material_params" in kwargs:
            for params in kwargs["additional_material_params"]:
                param_modifier = MaterialParamsModifier()
                param_modifier.point = wp.vec3(params["point"])
                param_modifier.size = wp.vec3(params["size"])
                param_modifier.density = params["density"]
                param_modifier.E = params["E"]
                param_modifier.nu = params["nu"]
                wp.launch(
                    kernel=apply_additional_params,
                    dim=self.n_particles,
                    inputs=[self.mpm_state, self.mpm_model, param_modifier],
                    device=device,
                )

            wp.launch(
                kernel=get_float_array_product,
                dim=self.n_particles,
                inputs=[
                    self.mpm_state.particle_density,
                    self.mpm_state.particle_vol,
                    self.mpm_state.particle_mass,
                ],
                device=device,
            )

    def finalize_mu_lam(self, device="cuda:0"):
        wp.launch(
            kernel=compute_mu_lam_from_E_nu,
            dim=self.n_particles,
            inputs=[self.mpm_state, self.mpm_model],
            device=device,
        )

    def p2g2p(self, step, dt, device="cuda:0"):
        grid_size = (
            self.mpm_model.grid_dim_x,
            self.mpm_model.grid_dim_y,
            self.mpm_model.grid_dim_z,
        )
        wp.launch(
            kernel=zero_grid,
            dim=(grid_size),
            inputs=[self.mpm_state, self.mpm_model],
            device=device,
        )

        # apply pre-p2g operations on particles
        for k in range(len(self.pre_p2g_operations)):
            wp.launch(
                kernel=self.pre_p2g_operations[k],
                dim=self.n_particles,
                inputs=[self.time, dt, self.mpm_state, self.impulse_params[k]],
                device=device,
            )
        # apply dirichlet particle v modifier
        for k in range(len(self.particle_velocity_modifiers)):
            wp.launch(
                kernel=self.particle_velocity_modifiers[k],
                dim=self.n_particles,
                inputs=[
                    self.time,
                    self.mpm_state,
                    self.particle_velocity_modifier_params[k],
                ],
                device=device,
            )

        # compute stress = stress(returnMap(F_trial))
        with wp.ScopedTimer(
            "compute_stress_from_F_trial",
            synchronize=True,
            print=False,
            dict=self.time_profile,
        ):
            wp.launch(
                kernel=compute_stress_from_F_trial,
                dim=self.n_particles,
                inputs=[self.mpm_state, self.mpm_model, dt],
                device=device,
            )  # F and stress are updated

        # p2g
        with wp.ScopedTimer(
            "p2g",
            synchronize=True,
            print=False,
            dict=self.time_profile,
        ):
            wp.launch(
                kernel=p2g_apic_with_stress,
                dim=self.n_particles,
                inputs=[self.mpm_state, self.mpm_model, dt],
                device=device,
            )  # apply p2g'

        # grid update
        with wp.ScopedTimer(
            "grid_update", synchronize=True, print=False, dict=self.time_profile
        ):
            wp.launch(
                kernel=grid_normalization_and_gravity,
                dim=(grid_size),
                inputs=[self.mpm_state, self.mpm_model, dt],
                device=device,
            )

        if self.mpm_model.grid_v_damping_scale < 1.0:
            wp.launch(
                kernel=add_damping_via_grid,
                dim=(grid_size),
                inputs=[self.mpm_state, self.mpm_model.grid_v_damping_scale],
                device=device,
            )

        # apply BC on grid
        with wp.ScopedTimer(
            "apply_BC_on_grid", synchronize=True, print=False, dict=self.time_profile
        ):
            for k in range(len(self.grid_postprocess)):
                wp.launch(
                    kernel=self.grid_postprocess[k],
                    dim=grid_size,
                    inputs=[
                        self.time,
                        dt,
                        self.mpm_state,
                        self.mpm_model,
                        self.collider_params[k],
                    ],
                    device=device,
                )
                if self.modify_bc[k] is not None:
                    self.modify_bc[k](self.time, dt, self.collider_params[k])

        # g2p
        with wp.ScopedTimer(
            "g2p", synchronize=True, print=False, dict=self.time_profile
        ):
            wp.launch(
                kernel=g2p,
                dim=self.n_particles,
                inputs=[self.mpm_state, self.mpm_model, dt],
                device=device,
            )  # x, v, C, F_trial are updated

        #### CFL check ####
        # particle_v = self.mpm_state.particle_v.numpy()
        # if np.max(np.abs(particle_v)) > self.mpm_model.dx / dt:
        #     print("max particle v: ", np.max(np.abs(particle_v)))
        #     print("max allowed  v: ", self.mpm_model.dx / dt)
        #     print("does not allow v*dt>dx")
        #     input()
        #### CFL check ####
        self.time = self.time + dt

    # set particle densities to all_particle_densities,
    def reset_densities_and_update_masses(
        self, all_particle_densities, device="cuda:0"
    ):
        all_particle_densities = all_particle_densities.clone().detach()
        self.mpm_state.particle_density = torch2warp_float(
            all_particle_densities, dvc=device
        )
        wp.launch(
            kernel=get_float_array_product,
            dim=self.n_particles,
            inputs=[
                self.mpm_state.particle_density,
                self.mpm_state.particle_vol,
                self.mpm_state.particle_mass,
            ],
            device=device,
        )

    # clone = True makes a copy, not necessarily needed
    def import_particle_x_from_torch(self, tensor_x, clone=True, device="cuda:0"):
        if tensor_x is not None:
            if clone:
                tensor_x = tensor_x.clone().detach()
            self.mpm_state.particle_x = torch2warp_vec3(tensor_x, dvc=device)

    # clone = True makes a copy, not necessarily needed
    def import_particle_v_from_torch(self, tensor_v, clone=True, device="cuda:0"):
        if tensor_v is not None:
            if clone:
                tensor_v = tensor_v.clone().detach()
            self.mpm_state.particle_v = torch2warp_vec3(tensor_v, dvc=device)

    # clone = True makes a copy, not necessarily needed
    def import_particle_F_from_torch(self, tensor_F, clone=True, device="cuda:0"):
        if tensor_F is not None:
            if clone:
                tensor_F = tensor_F.clone().detach()
            tensor_F = torch.reshape(tensor_F, (-1, 3, 3))  # arranged by rowmajor
            self.mpm_state.particle_F = torch2warp_mat33(tensor_F, dvc=device)

    # clone = True makes a copy, not necessarily needed
    def import_particle_C_from_torch(self, tensor_C, clone=True, device="cuda:0"):
        if tensor_C is not None:
            if clone:
                tensor_C = tensor_C.clone().detach()
            tensor_C = torch.reshape(tensor_C, (-1, 3, 3))  # arranged by rowmajor
            self.mpm_state.particle_C = torch2warp_mat33(tensor_C, dvc=device)

    def export_particle_x_to_torch(self):
        return wp.to_torch(self.mpm_state.particle_x)

    def export_particle_v_to_torch(self):
        return wp.to_torch(self.mpm_state.particle_v)

    def export_particle_F_to_torch(self):
        F_tensor = wp.to_torch(self.mpm_state.particle_F)
        F_tensor = F_tensor.reshape(-1, 9)
        return F_tensor

    def export_particle_R_to_torch(self, device="cuda:0"):
        with wp.ScopedTimer(
            "compute_R_from_F",
            synchronize=True,
            print=False,
            dict=self.time_profile,
        ):
            wp.launch(
                kernel=compute_R_from_F,
                dim=self.n_particles,
                inputs=[self.mpm_state, self.mpm_model],
                device=device,
            )

        R_tensor = wp.to_torch(self.mpm_state.particle_R)
        R_tensor = R_tensor.reshape(-1, 9)
        return R_tensor

    def export_particle_C_to_torch(self):
        C_tensor = wp.to_torch(self.mpm_state.particle_C)
        C_tensor = C_tensor.reshape(-1, 9)
        return C_tensor

    def export_particle_cov_to_torch(self, device="cuda:0"):
        if not self.mpm_model.update_cov_with_F:
            with wp.ScopedTimer(
                "compute_cov_from_F",
                synchronize=True,
                print=False,
                dict=self.time_profile,
            ):
                wp.launch(
                    kernel=compute_cov_from_F,
                    dim=self.n_particles,
                    inputs=[self.mpm_state, self.mpm_model],
                    device=device,
                )

        cov = wp.to_torch(self.mpm_state.particle_cov)
        return cov

    def print_time_profile(self):
        print("MPM Time profile:")
        for key, value in self.time_profile.items():
            print(key, sum(value))

    # a surface specified by a point and the normal vector
    def add_surface_collider(
        self,
        point,
        normal,
        surface="sticky",
        friction=0.0,
        start_time=0.0,
        end_time=999.0,
    ):
        point = list(point)
        # Normalize normal
        normal_scale = 1.0 / wp.sqrt(float(sum(x**2 for x in normal)))
        normal = list(normal_scale * x for x in normal)

        collider_param = Dirichlet_collider()
        collider_param.start_time = start_time
        collider_param.end_time = end_time

        collider_param.point = wp.vec3(point[0], point[1], point[2])
        collider_param.normal = wp.vec3(normal[0], normal[1], normal[2])

        if surface == "sticky" and friction != 0:
            raise ValueError("friction must be 0 on sticky surfaces.")
        if surface == "sticky":
            collider_param.surface_type = 0
        elif surface == "slip":
            collider_param.surface_type = 1
        elif surface == "cut":
            collider_param.surface_type = 11
        else:
            collider_param.surface_type = 2
        # frictional
        collider_param.friction = friction

        self.collider_params.append(collider_param)

        @wp.kernel
        def collide(
            time: float,
            dt: float,
            state: MPMStateStruct,
            model: MPMModelStruct,
            param: Dirichlet_collider,
        ):
            grid_x, grid_y, grid_z = wp.tid()
            if time >= param.start_time and time < param.end_time:
                offset = wp.vec3(
                    float(grid_x) * model.dx - param.point[0],
                    float(grid_y) * model.dx - param.point[1],
                    float(grid_z) * model.dx - param.point[2],
                )
                n = wp.vec3(param.normal[0], param.normal[1], param.normal[2])
                dotproduct = wp.dot(offset, n)

                if dotproduct < 0.0:
                    if param.surface_type == 0:
                        state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                            0.0, 0.0, 0.0
                        )
                    elif param.surface_type == 11:
                        if (
                            float(grid_z) * model.dx < 0.4
                            or float(grid_z) * model.dx > 0.53
                        ):
                            state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                                0.0, 0.0, 0.0
                            )
                        else:
                            v_in = state.grid_v_out[grid_x, grid_y, grid_z]
                            state.grid_v_out[grid_x, grid_y, grid_z] = (
                                wp.vec3(v_in[0], 0.0, v_in[2]) * 0.3
                            )
                    else:
                        v = state.grid_v_out[grid_x, grid_y, grid_z]
                        normal_component = wp.dot(v, n)
                        if param.surface_type == 1:
                            v = (
                                v - normal_component * n
                            )  # Project out all normal component
                        else:
                            v = (
                                v - wp.min(normal_component, 0.0) * n
                            )  # Project out only inward normal component
                        if normal_component < 0.0 and wp.length(v) > 1e-20:
                            v = wp.max(
                                0.0, wp.length(v) + normal_component * param.friction
                            ) * wp.normalize(
                                v
                            )  # apply friction here
                        state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                            0.0, 0.0, 0.0
                        )

        self.grid_postprocess.append(collide)
        self.modify_bc.append(None)

    # a cubiod is a rectangular cube'
    # centered at `point`
    # dimension is x: point[0]±size[0]
    #              y: point[1]±size[1]
    #              z: point[2]±size[2]
    # all grid nodes lie within the cubiod will have their speed set to velocity
    # the cuboid itself is also moving with const speed = velocity
    # set the speed to zero to fix BC
    def set_velocity_on_cuboid(
        self,
        point,
        size,
        velocity,
        start_time=0.0,
        end_time=999.0,
        reset=0,
    ):
        point = list(point)

        collider_param = Dirichlet_collider()
        collider_param.start_time = start_time
        collider_param.end_time = end_time
        collider_param.point = wp.vec3(point[0], point[1], point[2])
        collider_param.size = size
        collider_param.velocity = wp.vec3(velocity[0], velocity[1], velocity[2])
        # collider_param.threshold = threshold
        collider_param.reset = reset
        self.collider_params.append(collider_param)

        @wp.kernel
        def collide(
            time: float,
            dt: float,
            state: MPMStateStruct,
            model: MPMModelStruct,
            param: Dirichlet_collider,
        ):
            grid_x, grid_y, grid_z = wp.tid()
            if time >= param.start_time and time < param.end_time:
                offset = wp.vec3(
                    float(grid_x) * model.dx - param.point[0],
                    float(grid_y) * model.dx - param.point[1],
                    float(grid_z) * model.dx - param.point[2],
                )
                if (
                    wp.abs(offset[0]) < param.size[0]
                    and wp.abs(offset[1]) < param.size[1]
                    and wp.abs(offset[2]) < param.size[2]
                ):
                    state.grid_v_out[grid_x, grid_y, grid_z] = param.velocity
            elif param.reset == 1:
                if time < param.end_time + 15.0 * dt:
                    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(0.0, 0.0, 0.0)

        def modify(time, dt, param: Dirichlet_collider):
            if time >= param.start_time and time < param.end_time:
                param.point = wp.vec3(
                    param.point[0] + dt * param.velocity[0],
                    param.point[1] + dt * param.velocity[1],
                    param.point[2] + dt * param.velocity[2],
                )  # param.point + dt * param.velocity

        self.grid_postprocess.append(collide)
        self.modify_bc.append(modify)

    def add_bounding_box(self, start_time=0.0, end_time=999.0):
        collider_param = Dirichlet_collider()
        collider_param.start_time = start_time
        collider_param.end_time = end_time

        self.collider_params.append(collider_param)

        @wp.kernel
        def collide(
            time: float,
            dt: float,
            state: MPMStateStruct,
            model: MPMModelStruct,
            param: Dirichlet_collider,
        ):
            grid_x, grid_y, grid_z = wp.tid()
            padding = 3
            if time >= param.start_time and time < param.end_time:
                if grid_x < padding and state.grid_v_out[grid_x, grid_y, grid_z][0] < 0:
                    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                        0.0,
                        state.grid_v_out[grid_x, grid_y, grid_z][1],
                        state.grid_v_out[grid_x, grid_y, grid_z][2],
                    )
                if (
                    grid_x >= model.grid_dim_x - padding
                    and state.grid_v_out[grid_x, grid_y, grid_z][0] > 0
                ):
                    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                        0.0,
                        state.grid_v_out[grid_x, grid_y, grid_z][1],
                        state.grid_v_out[grid_x, grid_y, grid_z][2],
                    )

                if grid_y < padding and state.grid_v_out[grid_x, grid_y, grid_z][1] < 0:
                    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                        state.grid_v_out[grid_x, grid_y, grid_z][0],
                        0.0,
                        state.grid_v_out[grid_x, grid_y, grid_z][2],
                    )
                if (
                    grid_y >= model.grid_dim_y - padding
                    and state.grid_v_out[grid_x, grid_y, grid_z][1] > 0
                ):
                    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                        state.grid_v_out[grid_x, grid_y, grid_z][0],
                        0.0,
                        state.grid_v_out[grid_x, grid_y, grid_z][2],
                    )

                if grid_z < padding and state.grid_v_out[grid_x, grid_y, grid_z][2] < 0:
                    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                        state.grid_v_out[grid_x, grid_y, grid_z][0],
                        state.grid_v_out[grid_x, grid_y, grid_z][1],
                        0.0,
                    )
                if (
                    grid_z >= model.grid_dim_z - padding
                    and state.grid_v_out[grid_x, grid_y, grid_z][2] > 0
                ):
                    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(
                        state.grid_v_out[grid_x, grid_y, grid_z][0],
                        state.grid_v_out[grid_x, grid_y, grid_z][1],
                        0.0,
                    )

        self.grid_postprocess.append(collide)
        self.modify_bc.append(None)

    # particle_v += force/particle_mass * dt
    # this is applied from start_dt, ends after num_dt p2g2p's
    # particle velocity is changed before p2g at each timestep
    def add_impulse_on_particles(
        self,
        force,
        dt,
        point=[1, 1, 1],
        size=[1, 1, 1],
        num_dt=1,
        start_time=0.0,
        device="cuda:0",
    ):
        impulse_param = Impulse_modifier()
        impulse_param.start_time = start_time
        impulse_param.end_time = start_time + dt * num_dt

        impulse_param.point = wp.vec3(point[0], point[1], point[2])
        impulse_param.size = wp.vec3(size[0], size[1], size[2])
        impulse_param.mask = wp.zeros(shape=self.n_particles, dtype=int, device=device)

        impulse_param.force = wp.vec3(
            force[0],
            force[1],
            force[2],
        )

        wp.launch(
            kernel=selection_add_impulse_on_particles,
            dim=self.n_particles,
            inputs=[self.mpm_state, impulse_param],
            device=device,
        )

        self.impulse_params.append(impulse_param)

        @wp.kernel
        def apply_force(
            time: float, dt: float, state: MPMStateStruct, param: Impulse_modifier
        ):
            p = wp.tid()
            if time >= param.start_time and time < param.end_time:
                if param.mask[p] == 1:
                    impulse = wp.vec3(
                        param.force[0] / state.particle_mass[p],
                        param.force[1] / state.particle_mass[p],
                        param.force[2] / state.particle_mass[p],
                    )
                    state.particle_v[p] = state.particle_v[p] + impulse * dt

        self.pre_p2g_operations.append(apply_force)

    def enforce_particle_velocity_translation(
        self, point, size, velocity, start_time, end_time, device="cuda:0"
    ):

        # first select certain particles based on position

        velocity_modifier_params = ParticleVelocityModifier()

        velocity_modifier_params.point = wp.vec3(point[0], point[1], point[2])
        velocity_modifier_params.size = wp.vec3(size[0], size[1], size[2])

        velocity_modifier_params.velocity = wp.vec3(
            velocity[0], velocity[1], velocity[2]
        )

        velocity_modifier_params.start_time = start_time
        velocity_modifier_params.end_time = end_time

        velocity_modifier_params.mask = wp.zeros(
            shape=self.n_particles, dtype=int, device=device
        )

        wp.launch(
            kernel=selection_enforce_particle_velocity_translation,
            dim=self.n_particles,
            inputs=[self.mpm_state, velocity_modifier_params],
            device=device,
        )
        self.particle_velocity_modifier_params.append(velocity_modifier_params)

        @wp.kernel
        def modify_particle_v_before_p2g(
            time: float,
            state: MPMStateStruct,
            velocity_modifier_params: ParticleVelocityModifier,
        ):
            p = wp.tid()
            if (
                time >= velocity_modifier_params.start_time
                and time < velocity_modifier_params.end_time
            ):
                if velocity_modifier_params.mask[p] == 1:
                    state.particle_v[p] = velocity_modifier_params.velocity

        self.particle_velocity_modifiers.append(modify_particle_v_before_p2g)

    # define a cylinder with center point, half_height, radius, normal
    # particles within the cylinder are rotating along the normal direction
    # may also have a translational velocity along the normal direction
    def enforce_particle_velocity_rotation(
        self,
        point,
        normal,
        half_height_and_radius,
        rotation_scale,
        translation_scale,
        start_time,
        end_time,
        device="cuda:0",
    ):

        normal_scale = 1.0 / wp.sqrt(
            float(normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2)
        )
        normal = list(normal_scale * x for x in normal)

        velocity_modifier_params = ParticleVelocityModifier()

        velocity_modifier_params.point = wp.vec3(point[0], point[1], point[2])
        velocity_modifier_params.half_height_and_radius = wp.vec2(
            half_height_and_radius[0], half_height_and_radius[1]
        )
        velocity_modifier_params.normal = wp.vec3(normal[0], normal[1], normal[2])

        horizontal_1 = wp.vec3(1.0, 1.0, 1.0)
        if wp.abs(wp.dot(velocity_modifier_params.normal, horizontal_1)) < 0.01:
            horizontal_1 = wp.vec3(0.72, 0.37, -0.67)
        horizontal_1 = (
            horizontal_1
            - wp.dot(horizontal_1, velocity_modifier_params.normal)
            * velocity_modifier_params.normal
        )
        horizontal_1 = horizontal_1 * (1.0 / wp.length(horizontal_1))
        horizontal_2 = wp.cross(horizontal_1, velocity_modifier_params.normal)

        velocity_modifier_params.horizontal_axis_1 = horizontal_1
        velocity_modifier_params.horizontal_axis_2 = horizontal_2

        velocity_modifier_params.rotation_scale = rotation_scale
        velocity_modifier_params.translation_scale = translation_scale

        velocity_modifier_params.start_time = start_time
        velocity_modifier_params.end_time = end_time

        velocity_modifier_params.mask = wp.zeros(
            shape=self.n_particles, dtype=int, device=device
        )

        wp.launch(
            kernel=selection_enforce_particle_velocity_cylinder,
            dim=self.n_particles,
            inputs=[self.mpm_state, velocity_modifier_params],
            device=device,
        )
        self.particle_velocity_modifier_params.append(velocity_modifier_params)

        @wp.kernel
        def modify_particle_v_before_p2g(
            time: float,
            state: MPMStateStruct,
            velocity_modifier_params: ParticleVelocityModifier,
        ):
            p = wp.tid()
            if (
                time >= velocity_modifier_params.start_time
                and time < velocity_modifier_params.end_time
            ):
                if velocity_modifier_params.mask[p] == 1:
                    offset = state.particle_x[p] - velocity_modifier_params.point
                    horizontal_distance = wp.length(
                        offset
                        - wp.dot(offset, velocity_modifier_params.normal)
                        * velocity_modifier_params.normal
                    )
                    cosine = (
                        wp.dot(offset, velocity_modifier_params.horizontal_axis_1)
                        / horizontal_distance
                    )
                    theta = wp.acos(cosine)
                    if wp.dot(offset, velocity_modifier_params.horizontal_axis_2) > 0:
                        theta = theta
                    else:
                        theta = -theta
                    axis1_scale = (
                        -horizontal_distance
                        * wp.sin(theta)
                        * velocity_modifier_params.rotation_scale
                    )
                    axis2_scale = (
                        horizontal_distance
                        * wp.cos(theta)
                        * velocity_modifier_params.rotation_scale
                    )
                    axis_vertical_scale = translation_scale
                    state.particle_v[p] = (
                        axis1_scale * velocity_modifier_params.horizontal_axis_1
                        + axis2_scale * velocity_modifier_params.horizontal_axis_2
                        + axis_vertical_scale * velocity_modifier_params.normal
                    )

        self.particle_velocity_modifiers.append(modify_particle_v_before_p2g)

    # given normal direction, say [0,0,1]
    # gradually release grid velocities from start position to end position
    def release_particles_sequentially(
        self, normal, start_position, end_position, num_layers, start_time, end_time
    ):
        num_layers = 50
        point = [0, 0, 0]
        size = [0, 0, 0]
        axis = -1
        for i in range(3):
            if normal[i] == 0:
                point[i] = 1
                size[i] = 1
            else:
                axis = i
                point[i] = end_position

        half_length_portion = wp.abs(start_position - end_position) / num_layers
        end_time_portion = end_time / num_layers
        for i in range(num_layers):
            size[axis] = half_length_portion * (num_layers - i)
            self.enforce_particle_velocity_translation(
                point=point,
                size=size,
                velocity=[0, 0, 0],
                start_time=start_time,
                end_time=end_time_portion * (i + 1),
            )
````

## mpm_solver_warp/mpm_utils.py

````text
import warp as wp
from warp_utils import *
import numpy as np
import math


# compute stress from F
@wp.func
def kirchoff_stress_FCR(
    F: wp.mat33, U: wp.mat33, V: wp.mat33, J: float, mu: float, lam: float
):
    # compute kirchoff stress for FCR model (remember tau = P F^T)
    R = U * wp.transpose(V)
    id = wp.mat33(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)
    return 2.0 * mu * (F - R) * wp.transpose(F) + id * lam * J * (J - 1.0)


@wp.func
def kirchoff_stress_neoHookean(
    F: wp.mat33, U: wp.mat33, V: wp.mat33, J: float, sig: wp.vec3, mu: float, lam: float
):
    # compute kirchoff stress for FCR model (remember tau = P F^T)
    b = wp.vec3(sig[0] * sig[0], sig[1] * sig[1], sig[2] * sig[2])
    b_hat = b - wp.vec3(
        (b[0] + b[1] + b[2]) / 3.0,
        (b[0] + b[1] + b[2]) / 3.0,
        (b[0] + b[1] + b[2]) / 3.0,
    )
    tau = mu * J ** (-2.0 / 3.0) * b_hat + lam / 2.0 * (J * J - 1.0) * wp.vec3(
        1.0, 1.0, 1.0
    )
    return (
        U
        * wp.mat33(tau[0], 0.0, 0.0, 0.0, tau[1], 0.0, 0.0, 0.0, tau[2])
        * wp.transpose(V)
        * wp.transpose(F)
    )


@wp.func
def kirchoff_stress_StVK(
    F: wp.mat33, U: wp.mat33, V: wp.mat33, sig: wp.vec3, mu: float, lam: float
):
    sig = wp.vec3(
        wp.max(sig[0], 0.01), wp.max(sig[1], 0.01), wp.max(sig[2], 0.01)
    )  # add this to prevent NaN in extrem cases
    epsilon = wp.vec3(wp.log(sig[0]), wp.log(sig[1]), wp.log(sig[2]))
    log_sig_sum = wp.log(sig[0]) + wp.log(sig[1]) + wp.log(sig[2])
    ONE = wp.vec3(1.0, 1.0, 1.0)
    tau = 2.0 * mu * epsilon + lam * log_sig_sum * ONE
    return (
        U
        * wp.mat33(tau[0], 0.0, 0.0, 0.0, tau[1], 0.0, 0.0, 0.0, tau[2])
        * wp.transpose(V)
        * wp.transpose(F)
    )


@wp.func
def kirchoff_stress_drucker_prager(
    F: wp.mat33, U: wp.mat33, V: wp.mat33, sig: wp.vec3, mu: float, lam: float
):
    log_sig_sum = wp.log(sig[0]) + wp.log(sig[1]) + wp.log(sig[2])
    center00 = 2.0 * mu * wp.log(sig[0]) * (1.0 / sig[0]) + lam * log_sig_sum * (
        1.0 / sig[0]
    )
    center11 = 2.0 * mu * wp.log(sig[1]) * (1.0 / sig[1]) + lam * log_sig_sum * (
        1.0 / sig[1]
    )
    center22 = 2.0 * mu * wp.log(sig[2]) * (1.0 / sig[2]) + lam * log_sig_sum * (
        1.0 / sig[2]
    )
    center = wp.mat33(center00, 0.0, 0.0, 0.0, center11, 0.0, 0.0, 0.0, center22)
    return U * center * wp.transpose(V) * wp.transpose(F)


@wp.func
def von_mises_return_mapping(F_trial: wp.mat33, model: MPMModelStruct, p: int):
    U = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    V = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    sig_old = wp.vec3(0.0)
    wp.svd3(F_trial, U, sig_old, V)

    sig = wp.vec3(
        wp.max(sig_old[0], 0.01), wp.max(sig_old[1], 0.01), wp.max(sig_old[2], 0.01)
    )  # add this to prevent NaN in extrem cases
    epsilon = wp.vec3(wp.log(sig[0]), wp.log(sig[1]), wp.log(sig[2]))
    temp = (epsilon[0] + epsilon[1] + epsilon[2]) / 3.0

    tau = 2.0 * model.mu[p] * epsilon + model.lam[p] * (
        epsilon[0] + epsilon[1] + epsilon[2]
    ) * wp.vec3(1.0, 1.0, 1.0)
    sum_tau = tau[0] + tau[1] + tau[2]
    cond = wp.vec3(
        tau[0] - sum_tau / 3.0, tau[1] - sum_tau / 3.0, tau[2] - sum_tau / 3.0
    )
    if wp.length(cond) > model.yield_stress[p]:
        epsilon_hat = epsilon - wp.vec3(temp, temp, temp)
        epsilon_hat_norm = wp.length(epsilon_hat) + 1e-6
        delta_gamma = epsilon_hat_norm - model.yield_stress[p] / (2.0 * model.mu[p])
        epsilon = epsilon - (delta_gamma / epsilon_hat_norm) * epsilon_hat
        sig_elastic = wp.mat33(
            wp.exp(epsilon[0]),
            0.0,
            0.0,
            0.0,
            wp.exp(epsilon[1]),
            0.0,
            0.0,
            0.0,
            wp.exp(epsilon[2]),
        )
        F_elastic = U * sig_elastic * wp.transpose(V)
        if model.hardening == 1:
            model.yield_stress[p] = (
                model.yield_stress[p] + 2.0 * model.mu[p] * model.xi * delta_gamma
            )
        return F_elastic
    else:
        return F_trial


@wp.func
def von_mises_return_mapping_with_damage(
    F_trial: wp.mat33, model: MPMModelStruct, p: int
):
    U = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    V = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    sig_old = wp.vec3(0.0)
    wp.svd3(F_trial, U, sig_old, V)

    sig = wp.vec3(
        wp.max(sig_old[0], 0.01), wp.max(sig_old[1], 0.01), wp.max(sig_old[2], 0.01)
    )  # add this to prevent NaN in extrem cases
    epsilon = wp.vec3(wp.log(sig[0]), wp.log(sig[1]), wp.log(sig[2]))
    temp = (epsilon[0] + epsilon[1] + epsilon[2]) / 3.0

    tau = 2.0 * model.mu[p] * epsilon + model.lam[p] * (
        epsilon[0] + epsilon[1] + epsilon[2]
    ) * wp.vec3(1.0, 1.0, 1.0)
    sum_tau = tau[0] + tau[1] + tau[2]
    cond = wp.vec3(
        tau[0] - sum_tau / 3.0, tau[1] - sum_tau / 3.0, tau[2] - sum_tau / 3.0
    )
    if wp.length(cond) > model.yield_stress[p]:
        if model.yield_stress[p] <= 0:
            return F_trial
        epsilon_hat = epsilon - wp.vec3(temp, temp, temp)
        epsilon_hat_norm = wp.length(epsilon_hat) + 1e-6
        delta_gamma = epsilon_hat_norm - model.yield_stress[p] / (2.0 * model.mu[p])
        epsilon = epsilon - (delta_gamma / epsilon_hat_norm) * epsilon_hat
        model.yield_stress[p] = model.yield_stress[p] - model.softening * wp.length(
            (delta_gamma / epsilon_hat_norm) * epsilon_hat
        )
        if model.yield_stress[p] <= 0:
            model.mu[p] = 0.0
            model.lam[p] = 0.0
        sig_elastic = wp.mat33(
            wp.exp(epsilon[0]),
            0.0,
            0.0,
            0.0,
            wp.exp(epsilon[1]),
            0.0,
            0.0,
            0.0,
            wp.exp(epsilon[2]),
        )
        F_elastic = U * sig_elastic * wp.transpose(V)
        if model.hardening == 1:
            model.yield_stress[p] = (
                model.yield_stress[p] + 2.0 * model.mu[p] * model.xi * delta_gamma
            )
        return F_elastic
    else:
        return F_trial


# for toothpaste
@wp.func
def viscoplasticity_return_mapping_with_StVK(
    F_trial: wp.mat33, model: MPMModelStruct, p: int, dt: float
):
    U = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    V = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    sig_old = wp.vec3(0.0)
    wp.svd3(F_trial, U, sig_old, V)

    sig = wp.vec3(
        wp.max(sig_old[0], 0.01), wp.max(sig_old[1], 0.01), wp.max(sig_old[2], 0.01)
    )  # add this to prevent NaN in extrem cases
    b_trial = wp.vec3(sig[0] * sig[0], sig[1] * sig[1], sig[2] * sig[2])
    epsilon = wp.vec3(wp.log(sig[0]), wp.log(sig[1]), wp.log(sig[2]))
    trace_epsilon = epsilon[0] + epsilon[1] + epsilon[2]
    epsilon_hat = epsilon - wp.vec3(
        trace_epsilon / 3.0, trace_epsilon / 3.0, trace_epsilon / 3.0
    )
    s_trial = 2.0 * model.mu[p] * epsilon_hat
    s_trial_norm = wp.length(s_trial)
    y = s_trial_norm - wp.sqrt(2.0 / 3.0) * model.yield_stress[p]
    if y > 0:
        mu_hat = model.mu[p] * (b_trial[0] + b_trial[1] + b_trial[2]) / 3.0
        s_new_norm = s_trial_norm - y / (
            1.0 + model.plastic_viscosity / (2.0 * mu_hat * dt)
        )
        s_new = (s_new_norm / s_trial_norm) * s_trial
        epsilon_new = 1.0 / (2.0 * model.mu[p]) * s_new + wp.vec3(
            trace_epsilon / 3.0, trace_epsilon / 3.0, trace_epsilon / 3.0
        )
        sig_elastic = wp.mat33(
            wp.exp(epsilon_new[0]),
            0.0,
            0.0,
            0.0,
            wp.exp(epsilon_new[1]),
            0.0,
            0.0,
            0.0,
            wp.exp(epsilon_new[2]),
        )
        F_elastic = U * sig_elastic * wp.transpose(V)
        return F_elastic
    else:
        return F_trial


@wp.func
def sand_return_mapping(
    F_trial: wp.mat33, state: MPMStateStruct, model: MPMModelStruct, p: int
):
    U = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    V = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    sig = wp.vec3(0.0)
    wp.svd3(F_trial, U, sig, V)

    epsilon = wp.vec3(
        wp.log(wp.max(wp.abs(sig[0]), 1e-14)),
        wp.log(wp.max(wp.abs(sig[1]), 1e-14)),
        wp.log(wp.max(wp.abs(sig[2]), 1e-14)),
    )
    sigma_out = wp.mat33(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)
    tr = epsilon[0] + epsilon[1] + epsilon[2]  # + state.particle_Jp[p]
    epsilon_hat = epsilon - wp.vec3(tr / 3.0, tr / 3.0, tr / 3.0)
    epsilon_hat_norm = wp.length(epsilon_hat)
    delta_gamma = (
        epsilon_hat_norm
        + (3.0 * model.lam[p] + 2.0 * model.mu[p])
        / (2.0 * model.mu[p])
        * tr
        * model.alpha
    )

    if delta_gamma <= 0:
        F_elastic = F_trial

    if delta_gamma > 0 and tr > 0:
        F_elastic = U * wp.transpose(V)

    if delta_gamma > 0 and tr <= 0:
        H = epsilon - epsilon_hat * (delta_gamma / epsilon_hat_norm)
        s_new = wp.vec3(wp.exp(H[0]), wp.exp(H[1]), wp.exp(H[2]))

        F_elastic = U * wp.diag(s_new) * wp.transpose(V)
    return F_elastic


@wp.kernel
def compute_mu_lam_from_E_nu(state: MPMStateStruct, model: MPMModelStruct):
    p = wp.tid()
    model.mu[p] = model.E[p] / (2.0 * (1.0 + model.nu[p]))
    model.lam[p] = (
        model.E[p] * model.nu[p] / ((1.0 + model.nu[p]) * (1.0 - 2.0 * model.nu[p]))
    )


@wp.kernel
def zero_grid(state: MPMStateStruct, model: MPMModelStruct):
    grid_x, grid_y, grid_z = wp.tid()
    state.grid_m[grid_x, grid_y, grid_z] = 0.0
    state.grid_v_in[grid_x, grid_y, grid_z] = wp.vec3(0.0, 0.0, 0.0)
    state.grid_v_out[grid_x, grid_y, grid_z] = wp.vec3(0.0, 0.0, 0.0)


@wp.func
def compute_dweight(
    model: MPMModelStruct, w: wp.mat33, dw: wp.mat33, i: int, j: int, k: int
):
    dweight = wp.vec3(
        dw[0, i] * w[1, j] * w[2, k],
        w[0, i] * dw[1, j] * w[2, k],
        w[0, i] * w[1, j] * dw[2, k],
    )
    return dweight * model.inv_dx


@wp.func
def update_cov(state: MPMStateStruct, p: int, grad_v: wp.mat33, dt: float):
    cov_n = wp.mat33(0.0)
    cov_n[0, 0] = state.particle_cov[p * 6]
    cov_n[0, 1] = state.particle_cov[p * 6 + 1]
    cov_n[0, 2] = state.particle_cov[p * 6 + 2]
    cov_n[1, 0] = state.particle_cov[p * 6 + 1]
    cov_n[1, 1] = state.particle_cov[p * 6 + 3]
    cov_n[1, 2] = state.particle_cov[p * 6 + 4]
    cov_n[2, 0] = state.particle_cov[p * 6 + 2]
    cov_n[2, 1] = state.particle_cov[p * 6 + 4]
    cov_n[2, 2] = state.particle_cov[p * 6 + 5]

    cov_np1 = cov_n + dt * (grad_v * cov_n + cov_n * wp.transpose(grad_v))

    state.particle_cov[p * 6] = cov_np1[0, 0]
    state.particle_cov[p * 6 + 1] = cov_np1[0, 1]
    state.particle_cov[p * 6 + 2] = cov_np1[0, 2]
    state.particle_cov[p * 6 + 3] = cov_np1[1, 1]
    state.particle_cov[p * 6 + 4] = cov_np1[1, 2]
    state.particle_cov[p * 6 + 5] = cov_np1[2, 2]


@wp.kernel
def p2g_apic_with_stress(state: MPMStateStruct, model: MPMModelStruct, dt: float):
    # input given to p2g:   particle_stress
    #                       particle_x
    #                       particle_v
    #                       particle_C
    p = wp.tid()
    if state.particle_selection[p] == 0:
        stress = state.particle_stress[p]
        grid_pos = state.particle_x[p] * model.inv_dx
        base_pos_x = wp.int(grid_pos[0] - 0.5)
        base_pos_y = wp.int(grid_pos[1] - 0.5)
        base_pos_z = wp.int(grid_pos[2] - 0.5)
        fx = grid_pos - wp.vec3(
            wp.float(base_pos_x), wp.float(base_pos_y), wp.float(base_pos_z)
        )
        wa = wp.vec3(1.5) - fx
        wb = fx - wp.vec3(1.0)
        wc = fx - wp.vec3(0.5)
        w = wp.mat33(
            wp.cw_mul(wa, wa) * 0.5,
            wp.vec3(0.0, 0.0, 0.0) - wp.cw_mul(wb, wb) + wp.vec3(0.75),
            wp.cw_mul(wc, wc) * 0.5,
        )
        dw = wp.mat33(fx - wp.vec3(1.5), -2.0 * (fx - wp.vec3(1.0)), fx - wp.vec3(0.5))

        for i in range(0, 3):
            for j in range(0, 3):
                for k in range(0, 3):
                    dpos = (
                        wp.vec3(wp.float(i), wp.float(j), wp.float(k)) - fx
                    ) * model.dx
                    ix = base_pos_x + i
                    iy = base_pos_y + j
                    iz = base_pos_z + k
                    weight = w[0, i] * w[1, j] * w[2, k]  # tricubic interpolation
                    dweight = compute_dweight(model, w, dw, i, j, k)
                    C = state.particle_C[p]
                    # if model.rpic = 0, standard apic
                    C = (1.0 - model.rpic_damping) * C + model.rpic_damping / 2.0 * (
                        C - wp.transpose(C)
                    )
                    if model.rpic_damping < -0.001:
                        # standard pic
                        C = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)

                    elastic_force = -state.particle_vol[p] * stress * dweight
                    v_in_add = (
                        weight
                        * state.particle_mass[p]
                        * (state.particle_v[p] + C * dpos)
                        + dt * elastic_force
                    )
                    wp.atomic_add(state.grid_v_in, ix, iy, iz, v_in_add)
                    wp.atomic_add(
                        state.grid_m, ix, iy, iz, weight * state.particle_mass[p]
                    )


# add gravity
@wp.kernel
def grid_normalization_and_gravity(
    state: MPMStateStruct, model: MPMModelStruct, dt: float
):
    grid_x, grid_y, grid_z = wp.tid()
    if state.grid_m[grid_x, grid_y, grid_z] > 1e-15:
        v_out = state.grid_v_in[grid_x, grid_y, grid_z] * (
            1.0 / state.grid_m[grid_x, grid_y, grid_z]
        )
        # add gravity
        v_out = v_out + dt * model.gravitational_accelaration
        state.grid_v_out[grid_x, grid_y, grid_z] = v_out


@wp.kernel
def g2p(state: MPMStateStruct, model: MPMModelStruct, dt: float):
    p = wp.tid()
    if state.particle_selection[p] == 0:
        grid_pos = state.particle_x[p] * model.inv_dx
        base_pos_x = wp.int(grid_pos[0] - 0.5)
        base_pos_y = wp.int(grid_pos[1] - 0.5)
        base_pos_z = wp.int(grid_pos[2] - 0.5)
        fx = grid_pos - wp.vec3(
            wp.float(base_pos_x), wp.float(base_pos_y), wp.float(base_pos_z)
        )
        wa = wp.vec3(1.5) - fx
        wb = fx - wp.vec3(1.0)
        wc = fx - wp.vec3(0.5)
        w = wp.mat33(
            wp.cw_mul(wa, wa) * 0.5,
            wp.vec3(0.0, 0.0, 0.0) - wp.cw_mul(wb, wb) + wp.vec3(0.75),
            wp.cw_mul(wc, wc) * 0.5,
        )
        dw = wp.mat33(fx - wp.vec3(1.5), -2.0 * (fx - wp.vec3(1.0)), fx - wp.vec3(0.5))
        new_v = wp.vec3(0.0, 0.0, 0.0)
        new_C = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
        new_F = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
        for i in range(0, 3):
            for j in range(0, 3):
                for k in range(0, 3):
                    ix = base_pos_x + i
                    iy = base_pos_y + j
                    iz = base_pos_z + k
                    dpos = wp.vec3(wp.float(i), wp.float(j), wp.float(k)) - fx
                    weight = w[0, i] * w[1, j] * w[2, k]  # tricubic interpolation
                    grid_v = state.grid_v_out[ix, iy, iz]
                    new_v = new_v + grid_v * weight
                    new_C = new_C + wp.outer(grid_v, dpos) * (
                        weight * model.inv_dx * 4.0
                    )
                    dweight = compute_dweight(model, w, dw, i, j, k)
                    new_F = new_F + wp.outer(grid_v, dweight)

        state.particle_v[p] = new_v
        state.particle_x[p] = state.particle_x[p] + dt * new_v
        state.particle_C[p] = new_C
        I33 = wp.mat33(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)
        F_tmp = (I33 + new_F * dt) * state.particle_F[p]
        state.particle_F_trial[p] = F_tmp

        if model.update_cov_with_F:
            update_cov(state, p, new_F, dt)


# compute (Kirchhoff) stress = stress(returnMap(F_trial))
@wp.kernel
def compute_stress_from_F_trial(
    state: MPMStateStruct, model: MPMModelStruct, dt: float
):
    p = wp.tid()
    if state.particle_selection[p] == 0:
        # apply return mapping
        if model.material == 1:  # metal
            state.particle_F[p] = von_mises_return_mapping(
                state.particle_F_trial[p], model, p
            )
        elif model.material == 2:  # sand
            state.particle_F[p] = sand_return_mapping(
                state.particle_F_trial[p], state, model, p
            )
        elif model.material == 3:  # visplas, with StVk+VM, no thickening
            state.particle_F[p] = viscoplasticity_return_mapping_with_StVK(
                state.particle_F_trial[p], model, p, dt
            )
        elif model.material == 5:
            state.particle_F[p] = von_mises_return_mapping_with_damage(
                state.particle_F_trial[p], model, p
            )
        else:  # elastic
            state.particle_F[p] = state.particle_F_trial[p]

        # also compute stress here
        J = wp.determinant(state.particle_F[p])
        U = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
        V = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
        sig = wp.vec3(0.0)
        stress = wp.mat33(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
        wp.svd3(state.particle_F[p], U, sig, V)
        if model.material == 0 or model.material == 5:
            stress = kirchoff_stress_FCR(
                state.particle_F[p], U, V, J, model.mu[p], model.lam[p]
            )
        if model.material == 1:
            stress = kirchoff_stress_StVK(
                state.particle_F[p], U, V, sig, model.mu[p], model.lam[p]
            )
        if model.material == 2:
            stress = kirchoff_stress_drucker_prager(
                state.particle_F[p], U, V, sig, model.mu[p], model.lam[p]
            )
        if model.material == 3:
            # temporarily use stvk, subject to change
            stress = kirchoff_stress_StVK(
                state.particle_F[p], U, V, sig, model.mu[p], model.lam[p]
            )

        stress = (stress + wp.transpose(stress)) / 2.0  # enfore symmetry
        state.particle_stress[p] = stress


@wp.kernel
def compute_cov_from_F(state: MPMStateStruct, model: MPMModelStruct):
    p = wp.tid()

    F = state.particle_F_trial[p]

    init_cov = wp.mat33(0.0)
    init_cov[0, 0] = state.particle_init_cov[p * 6]
    init_cov[0, 1] = state.particle_init_cov[p * 6 + 1]
    init_cov[0, 2] = state.particle_init_cov[p * 6 + 2]
    init_cov[1, 0] = state.particle_init_cov[p * 6 + 1]
    init_cov[1, 1] = state.particle_init_cov[p * 6 + 3]
    init_cov[1, 2] = state.particle_init_cov[p * 6 + 4]
    init_cov[2, 0] = state.particle_init_cov[p * 6 + 2]
    init_cov[2, 1] = state.particle_init_cov[p * 6 + 4]
    init_cov[2, 2] = state.particle_init_cov[p * 6 + 5]

    cov = F * init_cov * wp.transpose(F)

    state.particle_cov[p * 6] = cov[0, 0]
    state.particle_cov[p * 6 + 1] = cov[0, 1]
    state.particle_cov[p * 6 + 2] = cov[0, 2]
    state.particle_cov[p * 6 + 3] = cov[1, 1]
    state.particle_cov[p * 6 + 4] = cov[1, 2]
    state.particle_cov[p * 6 + 5] = cov[2, 2]


@wp.kernel
def compute_R_from_F(state: MPMStateStruct, model: MPMModelStruct):
    p = wp.tid()

    F = state.particle_F_trial[p]

    # polar svd decomposition
    U = wp.mat33(0.0)
    V = wp.mat33(0.0)
    sig = wp.vec3(0.0)
    wp.svd3(F, U, sig, V)

    if wp.determinant(U) < 0.0:
        U[0, 2] = -U[0, 2]
        U[1, 2] = -U[1, 2]
        U[2, 2] = -U[2, 2]

    if wp.determinant(V) < 0.0:
        V[0, 2] = -V[0, 2]
        V[1, 2] = -V[1, 2]
        V[2, 2] = -V[2, 2]

    # compute rotation matrix
    R = U * wp.transpose(V)
    state.particle_R[p] = wp.transpose(R)


@wp.kernel
def add_damping_via_grid(state: MPMStateStruct, scale: float):
    grid_x, grid_y, grid_z = wp.tid()
    state.grid_v_out[grid_x, grid_y, grid_z] = (
        state.grid_v_out[grid_x, grid_y, grid_z] * scale
    )


@wp.kernel
def apply_additional_params(
    state: MPMStateStruct,
    model: MPMModelStruct,
    params_modifier: MaterialParamsModifier,
):
    p = wp.tid()
    pos = state.particle_x[p]
    if (
        pos[0] > params_modifier.point[0] - params_modifier.size[0]
        and pos[0] < params_modifier.point[0] + params_modifier.size[0]
        and pos[1] > params_modifier.point[1] - params_modifier.size[1]
        and pos[1] < params_modifier.point[1] + params_modifier.size[1]
        and pos[2] > params_modifier.point[2] - params_modifier.size[2]
        and pos[2] < params_modifier.point[2] + params_modifier.size[2]
    ):
        model.E[p] = params_modifier.E
        model.nu[p] = params_modifier.nu
        state.particle_density[p] = params_modifier.density


@wp.kernel
def selection_add_impulse_on_particles(
    state: MPMStateStruct, impulse_modifier: Impulse_modifier
):
    p = wp.tid()
    offset = state.particle_x[p] - impulse_modifier.point
    if (
        wp.abs(offset[0]) < impulse_modifier.size[0]
        and wp.abs(offset[1]) < impulse_modifier.size[1]
        and wp.abs(offset[2]) < impulse_modifier.size[2]
    ):
        impulse_modifier.mask[p] = 1
    else:
        impulse_modifier.mask[p] = 0


@wp.kernel
def selection_enforce_particle_velocity_translation(
    state: MPMStateStruct, velocity_modifier: ParticleVelocityModifier
):
    p = wp.tid()
    offset = state.particle_x[p] - velocity_modifier.point
    if (
        wp.abs(offset[0]) < velocity_modifier.size[0]
        and wp.abs(offset[1]) < velocity_modifier.size[1]
        and wp.abs(offset[2]) < velocity_modifier.size[2]
    ):
        velocity_modifier.mask[p] = 1
    else:
        velocity_modifier.mask[p] = 0


@wp.kernel
def selection_enforce_particle_velocity_cylinder(
    state: MPMStateStruct, velocity_modifier: ParticleVelocityModifier
):
    p = wp.tid()
    offset = state.particle_x[p] - velocity_modifier.point

    vertical_distance = wp.abs(wp.dot(offset, velocity_modifier.normal))

    horizontal_distance = wp.length(
        offset - wp.dot(offset, velocity_modifier.normal) * velocity_modifier.normal
    )
    if (
        vertical_distance < velocity_modifier.half_height_and_radius[0]
        and horizontal_distance < velocity_modifier.half_height_and_radius[1]
    ):
        velocity_modifier.mask[p] = 1
    else:
        velocity_modifier.mask[p] = 0
````

## mpm_solver_warp/engine_utils.py

````text
import numpy as np
import h5py
import os
import sys
import warp as wp
import torch


def save_data_at_frame(mpm_solver, dir_name, frame, save_to_ply=True, save_to_h5=False):
    os.umask(0)
    os.makedirs(dir_name, 0o777, exist_ok=True)

    fullfilename = dir_name + "/sim_" + str(frame).zfill(10) + ".h5"

    if save_to_ply:
        particle_position_to_ply(mpm_solver, fullfilename[:-2] + "ply")

    if save_to_h5:

        if os.path.exists(fullfilename):
            os.remove(fullfilename)
        newFile = h5py.File(fullfilename, "w")

        x_np = (
            mpm_solver.mpm_state.particle_x.numpy().transpose()
        )  # x_np has shape (3, n_particles)
        newFile.create_dataset("x", data=x_np)  # position

        currentTime = np.array([mpm_solver.time]).reshape(1, 1)
        newFile.create_dataset("time", data=currentTime)  # current time

        f_tensor_np = (
            mpm_solver.mpm_state.particle_F.numpy().reshape(-1, 9).transpose()
        )  # shape = (9, n_particles)
        newFile.create_dataset("f_tensor", data=f_tensor_np)  # deformation grad

        v_np = (
            mpm_solver.mpm_state.particle_v.numpy().transpose()
        )  # v_np has shape (3, n_particles)
        newFile.create_dataset("v", data=v_np)  # particle velocity

        C_np = (
            mpm_solver.mpm_state.particle_C.numpy().reshape(-1, 9).transpose()
        )  # shape = (9, n_particles)
        newFile.create_dataset("C", data=C_np)  # particle C
        print("save siumlation data at frame ", frame, " to ", fullfilename)


def particle_position_to_ply(mpm_solver, filename):
    # position is (n,3)
    if os.path.exists(filename):
        os.remove(filename)
    position = mpm_solver.mpm_state.particle_x.numpy()
    num_particles = (position).shape[0]
    position = position.astype(np.float32)
    with open(filename, "wb") as f:  # write binary
        header = f"""ply
format binary_little_endian 1.0
element vertex {num_particles}
property float x
property float y
property float z
end_header
"""
        f.write(str.encode(header))
        f.write(position.tobytes())
        print("write", filename)


def particle_position_tensor_to_ply(position_tensor, filename):
    # position is (n,3)
    if os.path.exists(filename):
        os.remove(filename)
    position = position_tensor.clone().detach().cpu().numpy()
    num_particles = (position).shape[0]
    position = position.astype(np.float32)
    with open(filename, "wb") as f:  # write binary
        header = f"""ply
format binary_little_endian 1.0
element vertex {num_particles}
property float x
property float y
property float z
end_header
"""
        f.write(str.encode(header))
        f.write(position.tobytes())
        print("write", filename)
````

## mpm_solver_warp/warp_utils.py

````text
import warp as wp
import warp.torch
import torch


@wp.struct
class MPMModelStruct:
    ####### essential #######
    grid_lim: float
    n_particles: int
    n_grid: int
    dx: float
    inv_dx: float
    grid_dim_x: int
    grid_dim_y: int
    grid_dim_z: int
    mu: wp.array(dtype=float)
    lam: wp.array(dtype=float)
    E: wp.array(dtype=float)
    nu: wp.array(dtype=float)
    material: int

    ######## for plasticity ####
    yield_stress: wp.array(dtype=float)
    friction_angle: float
    alpha: float
    gravitational_accelaration: wp.vec3
    hardening: float
    xi: float
    plastic_viscosity: float
    softening: float

    ####### for damping
    rpic_damping: float
    grid_v_damping_scale: float

    ####### for PhysGaussian: covariance
    update_cov_with_F: int


@wp.struct
class MPMStateStruct:
    ###### essential #####
    # particle
    particle_x: wp.array(dtype=wp.vec3)  # current position
    particle_v: wp.array(dtype=wp.vec3)  # particle velocity
    particle_F: wp.array(dtype=wp.mat33)  # particle elastic deformation gradient
    particle_init_cov: wp.array(dtype=float)  # initial covariance matrix
    particle_cov: wp.array(dtype=float)  # current covariance matrix
    particle_F_trial: wp.array(
        dtype=wp.mat33
    )  # apply return mapping on this to obtain elastic def grad
    particle_R: wp.array(dtype=wp.mat33)  # rotation matrix
    particle_stress: wp.array(dtype=wp.mat33)  # Kirchoff stress, elastic stress
    particle_C: wp.array(dtype=wp.mat33)
    particle_vol: wp.array(dtype=float)  # current volume
    particle_mass: wp.array(dtype=float)  # mass
    particle_density: wp.array(dtype=float)  # density
    particle_Jp: wp.array(dtype=float)

    particle_selection: wp.array(
        dtype=int
    )  # only particle_selection[p] = 0 will be simulated

    # grid
    grid_m: wp.array(dtype=float, ndim=3)
    grid_v_in: wp.array(dtype=wp.vec3, ndim=3)  # grid node momentum/velocity
    grid_v_out: wp.array(
        dtype=wp.vec3, ndim=3
    )  # grid node momentum/velocity, after grid update


# for various boundary conditions
@wp.struct
class Dirichlet_collider:
    point: wp.vec3
    normal: wp.vec3
    direction: wp.vec3

    start_time: float
    end_time: float

    friction: float
    surface_type: int

    velocity: wp.vec3

    threshold: float
    reset: int
    index: int

    x_unit: wp.vec3
    y_unit: wp.vec3
    radius: float
    v_scale: float
    width: float
    height: float
    length: float
    R: float

    size: wp.vec3

    horizontal_axis_1: wp.vec3
    horizontal_axis_2: wp.vec3
    half_height_and_radius: wp.vec2


@wp.struct
class Impulse_modifier:
    # this needs to be changed for each different BC!
    point: wp.vec3
    normal: wp.vec3
    start_time: float
    end_time: float
    force: wp.vec3
    forceTimesDt: wp.vec3
    numsteps: int

    point: wp.vec3
    size: wp.vec3
    mask: wp.array(dtype=int)


@wp.struct
class MPMtailoredStruct:
    # this needs to be changed for each different BC!
    point: wp.vec3
    normal: wp.vec3
    start_time: float
    end_time: float
    friction: float
    surface_type: int
    velocity: wp.vec3
    threshold: float
    reset: int

    point_rotate: wp.vec3
    normal_rotate: wp.vec3
    x_unit: wp.vec3
    y_unit: wp.vec3
    radius: float
    v_scale: float
    width: float
    point_plane: wp.vec3
    normal_plane: wp.vec3
    velocity_plane: wp.vec3
    threshold_plane: float


@wp.struct
class MaterialParamsModifier:
    point: wp.vec3
    size: wp.vec3
    E: float
    nu: float
    density: float


@wp.struct
class ParticleVelocityModifier:
    point: wp.vec3
    normal: wp.vec3
    half_height_and_radius: wp.vec2
    rotation_scale: float
    translation_scale: float

    size: wp.vec3

    horizontal_axis_1: wp.vec3
    horizontal_axis_2: wp.vec3

    start_time: float

    end_time: float

    velocity: wp.vec3

    mask: wp.array(dtype=int)


@wp.kernel
def set_vec3_to_zero(target_array: wp.array(dtype=wp.vec3)):
    tid = wp.tid()
    target_array[tid] = wp.vec3(0.0, 0.0, 0.0)


@wp.kernel
def set_mat33_to_identity(target_array: wp.array(dtype=wp.mat33)):
    tid = wp.tid()
    target_array[tid] = wp.mat33(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)


@wp.kernel
def add_identity_to_mat33(target_array: wp.array(dtype=wp.mat33)):
    tid = wp.tid()
    target_array[tid] = wp.add(
        target_array[tid], wp.mat33(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)
    )


@wp.kernel
def subtract_identity_to_mat33(target_array: wp.array(dtype=wp.mat33)):
    tid = wp.tid()
    target_array[tid] = wp.sub(
        target_array[tid], wp.mat33(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)
    )


@wp.kernel
def add_vec3_to_vec3(
    first_array: wp.array(dtype=wp.vec3), second_array: wp.array(dtype=wp.vec3)
):
    tid = wp.tid()
    first_array[tid] = wp.add(first_array[tid], second_array[tid])


@wp.kernel
def set_value_to_float_array(target_array: wp.array(dtype=float), value: float):
    tid = wp.tid()
    target_array[tid] = value


@wp.kernel
def get_float_array_product(
    arrayA: wp.array(dtype=float),
    arrayB: wp.array(dtype=float),
    arrayC: wp.array(dtype=float),
):
    tid = wp.tid()
    arrayC[tid] = arrayA[tid] * arrayB[tid]


def torch2warp_quat(t, copy=False, dtype=warp.types.float32, dvc="cuda:0"):
    assert t.is_contiguous()
    if t.dtype != torch.float32 and t.dtype != torch.int32:
        raise RuntimeError(
            "Error aliasing Torch tensor to Warp array. Torch tensor must be float32 or int32 type"
        )
    assert t.shape[1] == 4
    a = warp.types.array(
        ptr=t.data_ptr(),
        dtype=wp.quat,
        shape=t.shape[0],
        copy=False,
        owner=False,
        requires_grad=t.requires_grad,
        # device=t.device.type)
        device=dvc,
    )
    a.tensor = t
    return a


def torch2warp_float(t, copy=False, dtype=warp.types.float32, dvc="cuda:0"):
    assert t.is_contiguous()
    if t.dtype != torch.float32 and t.dtype != torch.int32:
        raise RuntimeError(
            "Error aliasing Torch tensor to Warp array. Torch tensor must be float32 or int32 type"
        )
    a = warp.types.array(
        ptr=t.data_ptr(),
        dtype=warp.types.float32,
        shape=t.shape[0],
        copy=False,
        owner=False,
        requires_grad=t.requires_grad,
        # device=t.device.type)
        device=dvc,
    )
    a.tensor = t
    return a


def torch2warp_vec3(t, copy=False, dtype=warp.types.float32, dvc="cuda:0"):
    assert t.is_contiguous()
    if t.dtype != torch.float32 and t.dtype != torch.int32:
        raise RuntimeError(
            "Error aliasing Torch tensor to Warp array. Torch tensor must be float32 or int32 type"
        )
    assert t.shape[1] == 3
    a = warp.types.array(
        ptr=t.data_ptr(),
        dtype=wp.vec3,
        shape=t.shape[0],
        copy=False,
        owner=False,
        requires_grad=t.requires_grad,
        # device=t.device.type)
        device=dvc,
    )
    a.tensor = t
    return a


def torch2warp_mat33(t, copy=False, dtype=warp.types.float32, dvc="cuda:0"):
    assert t.is_contiguous()
    if t.dtype != torch.float32 and t.dtype != torch.int32:
        raise RuntimeError(
            "Error aliasing Torch tensor to Warp array. Torch tensor must be float32 or int32 type"
        )
    assert t.shape[1] == 3
    a = warp.types.array(
        ptr=t.data_ptr(),
        dtype=wp.mat33,
        shape=t.shape[0],
        copy=False,
        owner=False,
        requires_grad=t.requires_grad,
        # device=t.device.type)
        device=dvc,
    )
    a.tensor = t
    return a
````

## mpm_solver_warp/run_sand.py

````text
import warp as wp
from mpm_solver_warp import MPM_Simulator_WARP
from engine_utils import *
import torch

wp.init()
wp.config.verify_cuda = True


dvc = "cuda:0"

mpm_solver = MPM_Simulator_WARP(
    10
)  # initialize with whatever number is fine. it will be reintialized


# You can either load sampling data from an external h5 file, containing initial position (n,3) and particle_volume (n,)
mpm_solver.load_from_sampling("sand_column.h5", n_grid=150, device=dvc)

# Or load from torch tensor (also position and volume)
# Here we borrow the data from h5, but you can use your own
volume_tensor = torch.ones(mpm_solver.n_particles) * 2.5e-8
position_tensor = mpm_solver.export_particle_x_to_torch()

mpm_solver.load_initial_data_from_torch(position_tensor, volume_tensor)

# Note: You must provide 'density=..' in the function set_parameters() to set particle_mass = density * particle_volume
material_params = {
    "E": 2000,
    "nu": 0.2,
    "material": "sand",
    "friction_angle": 35,
    "g": [0.0, 0.0, -6.0],
    "density": 200.0,
}

material_params2 = {
    "E": 2000,
    "nu": 0.2,
    "material": "sand",
    "friction_angle": 35,
    "g": [0.0, 0.0, -4.0],
    "density": 200.0,
}
mpm_solver.set_parameters_dict(material_params2)

mpm_solver.finalize_mu_lam()  # set mu and lambda from the E and nu input
print(wp.to_torch(mpm_solver.mpm_model.mu)[0])
input()


mpm_solver.add_surface_collider((0.0, 0.0, 0.13), (0.0, 0.0, 1.0), "sticky", 0.0)


directory_to_save = "./sim_results"

save_data_at_frame(mpm_solver, directory_to_save, 0, save_to_ply=True, save_to_h5=False)

for k in range(1, 50):
    # print(wp.to_torch(mpm_solver.mpm_state.particle_stress)[0,:])
    # print(mpm_solver.export_particle_v_to_torch()[0,:])
    # input()
    mpm_solver.p2g2p(k, 0.002, device=dvc)
    save_data_at_frame(
        mpm_solver, directory_to_save, k, save_to_ply=True, save_to_h5=False
    )


# extract the position, make some changes, load it back
position = mpm_solver.export_particle_x_to_torch()
# print(position.shape) # shape is tensor torch.Size([n_particles, 3])
position[:, 0] = position[:, 0] + 0.1
mpm_solver.import_particle_x_from_torch(position)

for k in range(50, 100):

    mpm_solver.p2g2p(k, 0.002, device=dvc)
    save_data_at_frame(
        mpm_solver, directory_to_save, k, save_to_ply=True, save_to_h5=False
    )
````

## utils/camera_view_utils.py

````text
import os
import json
import numpy as np
import torch
from scene.cameras import Camera as GSCamera
from utils.graphics_utils import focal2fov


def generate_camera_rotation_matrix(camera_to_object, object_vertical_downward):
    camera_to_object = camera_to_object / np.linalg.norm(
        camera_to_object
    )  # last column
    # the second column of rotation matrix is pointing toward the downward vertical direction
    camera_y = (
        object_vertical_downward
        - np.dot(object_vertical_downward, camera_to_object) * camera_to_object
    )
    camera_y = camera_y / np.linalg.norm(camera_y)  # second column
    first_column = np.cross(camera_y, camera_to_object)
    R = np.column_stack((first_column, camera_y, camera_to_object))
    return R


# supply vertical vector in world space
def generate_local_coord(vertical_vector):
    vertical_vector = vertical_vector / np.linalg.norm(vertical_vector)
    horizontal_1 = np.array([1, 1, 1])
    if np.abs(np.dot(horizontal_1, vertical_vector)) < 0.01:
        horizontal_1 = np.array([0.72, 0.37, -0.67])
    # gram schimit
    horizontal_1 = (
        horizontal_1 - np.dot(horizontal_1, vertical_vector) * vertical_vector
    )
    horizontal_1 = horizontal_1 / np.linalg.norm(horizontal_1)
    horizontal_2 = np.cross(horizontal_1, vertical_vector)

    return vertical_vector, horizontal_1, horizontal_2


# scalar (in degrees), scalar (in degrees), scalar, vec3, mat33 = [horizontal_1; horizontal_2; vertical];  -> vec3
def get_point_on_sphere(azimuth, elevation, radius, center, observant_coordinates):
    canonical_coordinates = (
        np.array(
            [
                np.cos(azimuth / 180.0 * np.pi) * np.cos(elevation / 180.0 * np.pi),
                np.sin(azimuth / 180.0 * np.pi) * np.cos(elevation / 180.0 * np.pi),
                np.sin(elevation / 180.0 * np.pi),
            ]
        )
        * radius
    )

    return center + observant_coordinates @ canonical_coordinates


def get_camera_position_and_rotation(
    azimuth, elevation, radius, view_center, observant_coordinates
):
    # get camera position
    position = get_point_on_sphere(
        azimuth, elevation, radius, view_center, observant_coordinates
    )
    # get rotation matrix
    R = generate_camera_rotation_matrix(
        view_center - position, -observant_coordinates[:, 2]
    )
    return position, R


def get_current_radius_azimuth_and_elevation(
    camera_position, view_center, observesant_coordinates
):
    center2camera = -view_center + camera_position
    radius = np.linalg.norm(center2camera)
    dot_product = np.dot(center2camera, observesant_coordinates[:, 2])
    cosine = dot_product / (
        np.linalg.norm(center2camera) * np.linalg.norm(observesant_coordinates[:, 2])
    )
    elevation = np.rad2deg(np.pi / 2.0 - np.arccos(cosine))
    proj_onto_hori = center2camera - dot_product * observesant_coordinates[:, 2]
    dot_product2 = np.dot(proj_onto_hori, observesant_coordinates[:, 0])
    cosine2 = dot_product2 / (
        np.linalg.norm(proj_onto_hori) * np.linalg.norm(observesant_coordinates[:, 0])
    )

    if np.dot(proj_onto_hori, observesant_coordinates[:, 1]) > 0:
        azimuth = np.rad2deg(np.arccos(cosine2))
    else:
        azimuth = -np.rad2deg(np.arccos(cosine2))
    return radius, azimuth, elevation


def get_camera_view(
    model_path,
    default_camera_index=0,
    center_view_world_space=None,
    observant_coordinates=None,
    show_hint=False,
    init_azimuthm=None,
    init_elevation=None,
    init_radius=None,
    move_camera=False,
    current_frame=0,
    delta_a=0,
    delta_e=0,
    delta_r=0,
):
    """Load one of the default cameras for the scene."""
    cam_path = os.path.join(model_path, "cameras.json")
    with open(cam_path) as f:
        data = json.load(f)

        if show_hint:
            if default_camera_index < 0:
                default_camera_index = 0
            r, a, e = get_current_radius_azimuth_and_elevation(
                data[default_camera_index]["position"],
                center_view_world_space,
                observant_coordinates,
            )
            print("Default camera ", default_camera_index, " has")
            print("azimuth:    ", a)
            print("elevation:  ", e)
            print("radius:     ", r)
            print("Now exit program and set your own input!")
            exit()

        if default_camera_index > -1:
            raw_camera = data[default_camera_index]

        else:
            raw_camera = data[0]  # get data to be modified

            assert init_azimuthm is not None
            assert init_elevation is not None
            assert init_radius is not None

            if move_camera:
                assert delta_a is not None
                assert delta_e is not None
                assert delta_r is not None
                position, R = get_camera_position_and_rotation(
                    init_azimuthm + current_frame * delta_a,
                    init_elevation + current_frame * delta_e,
                    init_radius + current_frame * delta_r,
                    center_view_world_space,
                    observant_coordinates,
                )
            else:
                position, R = get_camera_position_and_rotation(
                    init_azimuthm,
                    init_elevation,
                    init_radius,
                    center_view_world_space,
                    observant_coordinates,
                )
            raw_camera["rotation"] = R.tolist()
            raw_camera["position"] = position.tolist()

        tmp = np.zeros((4, 4))
        tmp[:3, :3] = raw_camera["rotation"]
        tmp[:3, 3] = raw_camera["position"]
        tmp[3, 3] = 1
        C2W = np.linalg.inv(tmp)
        R = C2W[:3, :3].transpose()
        T = C2W[:3, 3]

        width = raw_camera["width"]
        height = raw_camera["height"]
        fovx = focal2fov(raw_camera["fx"], width)
        fovy = focal2fov(raw_camera["fy"], height)

        return GSCamera(
            colmap_id=0,
            R=R,
            T=T,
            FoVx=fovx,
            FoVy=fovy,
            image=torch.zeros((3, height, width)),  # fake
            gt_alpha_mask=None,
            image_name="fake",
            uid=0,
        )
````

## utils/decode_param.py

````text
import json
import warp as wp
from mpm_solver_warp.mpm_solver_warp import MPM_Simulator_WARP
from mpm_solver_warp.engine_utils import *


def decode_param_json(json_file):
    f = open(json_file)
    sim_params = json.load(f)
    material_params = {}
    # material parameters
    if "material" in sim_params.keys():
        material_params["material"] = sim_params["material"]
    else:
        material_params["material"] = "jelly"

    if "grid_lim" in sim_params.keys():
        material_params["grid_lim"] = sim_params["grid_lim"]
    else:
        material_params["grid_lim"] = 2.0

    if "n_grid" in sim_params.keys():
        material_params["n_grid"] = sim_params["n_grid"]
    else:
        material_params["n_grid"] = 50

    if "nu" in sim_params.keys():
        material_params["nu"] = sim_params["nu"]
        if material_params["nu"] > 0.5 or material_params["nu"] < 0.0:
            raise ValueError("Poisson's ratio should be less than 0.5")
    else:
        material_params["nu"] = 0.4

    if "E" in sim_params.keys():
        material_params["E"] = sim_params["E"]
    else:
        material_params["E"] = 1e5

    if "yield_stress" in sim_params.keys():
        material_params["yield_stress"] = sim_params["yield_stress"]

    if "hardening" in sim_params.keys():
        material_params["hardening"] = sim_params["hardening"]

    if "xi" in sim_params.keys():
        material_params["xi"] = sim_params["xi"]

    if "friction_angle" in sim_params.keys():
        material_params["friction_angle"] = sim_params["friction_angle"]

    if "plastic_viscosity" in sim_params.keys():
        material_params["plastic_viscosity"] = sim_params["plastic_viscosity"]

    if "g" in sim_params.keys():
        material_params["g"] = sim_params["g"]
    else:
        material_params["g"] = 9.8

    if "density" in sim_params.keys():
        material_params["density"] = sim_params["density"]
    else:
        material_params["density"] = 200.0

    if "rpic_damping" in sim_params.keys():
        material_params["rpic_damping"] = sim_params["rpic_damping"]

    if "pic_damping" in sim_params.keys():
        material_params["pic_damping"] = sim_params["pic_damping"]

    if "softening" in sim_params.keys():
        material_params["softening"] = sim_params["softening"]

    if "opacity_threshold" in sim_params.keys():
        material_params["opacity_threshold"] = sim_params["opacity_threshold"]

    if "grid_v_damping_scale" in sim_params.keys():
        material_params["grid_v_damping_scale"] = sim_params["grid_v_damping_scale"]

    if "additional_material_params" in sim_params.keys():
        additional_params = sim_params["additional_material_params"]
        for i in range(len(additional_params)):
            if not "point" in additional_params[i].keys():
                raise TypeError("point is not defined")

            if not "size" in additional_params[i].keys():
                raise TypeError("size is not defined")

            if not "E" in additional_params[i].keys():
                raise TypeError("E is not defined")

            if not "nu" in additional_params[i].keys():
                raise TypeError("nu is not defined")

            if not "density" in additional_params[i].keys():
                additional_params[i]["density"] = material_params["density"]

        material_params["additional_material_params"] = additional_params

    # boundary conditions
    bc_params = {}
    if "boundary_conditions" in sim_params.keys():
        bc_params = sim_params["boundary_conditions"]

    # time step
    time_params = {}
    if "substep_dt" in sim_params.keys():
        time_params["substep_dt"] = sim_params["substep_dt"]
    else:
        time_params["substep_dt"] = 1e-4

    if "frame_dt" in sim_params.keys():
        time_params["frame_dt"] = sim_params["frame_dt"]
    else:
        time_params["frame_dt"] = 1e-2

    if "frame_num" in sim_params.keys():
        time_params["frame_num"] = sim_params["frame_num"]
    else:
        time_params["frame_num"] = 100

    # preprocessing_params
    preprocessing_params = {}
    if "opacity_threshold" in sim_params.keys():
        preprocessing_params["opacity_threshold"] = sim_params["opacity_threshold"]
    else:
        preprocessing_params["opacity_threshold"] = 0.02

    if "rotation_degree" in sim_params.keys():
        preprocessing_params["rotation_degree"] = sim_params["rotation_degree"]
    else:
        preprocessing_params["rotation_degree"] = []

    if "rotation_axis" in sim_params.keys():
        preprocessing_params["rotation_axis"] = sim_params["rotation_axis"]
    else:
        preprocessing_params["rotation_axis"] = []

    if "sim_area" in sim_params.keys():
        preprocessing_params["sim_area"] = sim_params["sim_area"]
    else:
        preprocessing_params["sim_area"] = None

    if "scale" in sim_params.keys():
        preprocessing_params["scale"] = sim_params["scale"]
    else:
        preprocessing_params["scale"] = 1.0

    if "particle_filling" in sim_params.keys():
        preprocessing_params["particle_filling"] = sim_params["particle_filling"]
        filling_params = preprocessing_params["particle_filling"]
        if not "n_grid" in filling_params.keys():
            filling_params["n_grid"] = material_params["n_grid"] * 4

        if not "density_threshold" in filling_params.keys():
            filling_params["density_threshold"] = 5.0

        if not "search_threshold" in filling_params.keys():
            filling_params["search_threshold"] = 3.0

        if not "max_particles_num" in filling_params.keys():
            filling_params["max_particles_num"] = 2000000

        if not "max_partciels_per_cell" in filling_params.keys():
            filling_params["max_partciels_per_cell"] = 1

        if not "search_exclude_direction" in filling_params.keys():
            filling_params["search_exclude_direction"] = 5

        if not "ray_cast_direction" in filling_params.keys():
            filling_params["ray_cast_direction"] = 4

        if not "boundary" in filling_params.keys():
            filling_params["boundary"] = None

        if not "smooth" in filling_params.keys():
            filling_params["smooth"] = False
        
        if not "visualize" in filling_params.keys():
            filling_params["visualize"] = False
    else:
        preprocessing_params["particle_filling"] = None

    # camera params
    camera_params = {}
    if "mpm_space_viewpoint_center" in sim_params.keys():
        camera_params["mpm_space_viewpoint_center"] = sim_params[
            "mpm_space_viewpoint_center"
        ]
    else:
        camera_params["mpm_space_viewpoint_center"] = [1.0, 1.0, 1.0]
    if "mpm_space_vertical_upward_axis" in sim_params.keys():
        camera_params["mpm_space_vertical_upward_axis"] = sim_params[
            "mpm_space_vertical_upward_axis"
        ]
    else:
        camera_params["mpm_space_vertical_upward_axis"] = [0, 0, 1]
    if "default_camera_index" in sim_params.keys():
        camera_params["default_camera_index"] = sim_params["default_camera_index"]
    else:
        camera_params["default_camera_index"] = 0
    if "show_hint" in sim_params.keys():
        camera_params["show_hint"] = sim_params["show_hint"]
    else:
        camera_params["show_hint"] = False
    if "init_azimuthm" in sim_params.keys():
        camera_params["init_azimuthm"] = sim_params["init_azimuthm"]
    else:
        camera_params["init_azimuthm"] = None
    if "init_elevation" in sim_params.keys():
        camera_params["init_elevation"] = sim_params["init_elevation"]
    else:
        camera_params["init_elevation"] = None
    if "init_radius" in sim_params.keys():
        camera_params["init_radius"] = sim_params["init_radius"]
    else:
        camera_params["init_radius"] = None
    if "delta_a" in sim_params.keys():
        camera_params["delta_a"] = sim_params["delta_a"]
    else:
        camera_params["delta_a"] = None
    if "delta_e" in sim_params.keys():
        camera_params["delta_e"] = sim_params["delta_e"]
    else:
        camera_params["delta_e"] = None
    if "delta_r" in sim_params.keys():
        camera_params["delta_r"] = sim_params["delta_r"]
    else:
        camera_params["delta_r"] = None
    if "move_camera" in sim_params.keys():
        camera_params["move_camera"] = sim_params["move_camera"]
    else:
        camera_params["move_camera"] = False

    return material_params, bc_params, time_params, preprocessing_params, camera_params


def set_boundary_conditions(
    mpm_solver: MPM_Simulator_WARP, bc_params: dict, time_params: dict
):
    for bc in bc_params:
        if bc["type"] == "cuboid":
            assert (
                "point" in bc.keys() and "size" in bc.keys() and "velocity" in bc.keys()
            )
            start_time = 0.0
            end_time = 1e3
            reset = 0
            if "start_time" in bc.keys():
                start_time = bc["start_time"]
            if "end_time" in bc.keys():
                end_time = bc["end_time"]
            if "reset" in bc.keys():
                reset = bc["reset"]
            mpm_solver.set_velocity_on_cuboid(
                point=bc["point"],
                size=bc["size"],
                velocity=bc["velocity"],
                start_time=start_time,
                end_time=end_time,
                reset=reset,
            )

        elif bc["type"] == "particle_impulse":
            assert "force" in bc.keys()

            start_time = 0.0
            if "start_time" in bc.keys():
                start_time = bc["start_time"]
            num_dt = 1
            if "num_dt" in bc.keys():
                num_dt = bc["num_dt"]
            point = [1, 1, 1]
            if "point" in bc.keys():
                point = bc["point"]
            size = [1, 1, 1]
            if "size" in bc.keys():
                size = bc["size"]

            mpm_solver.add_impulse_on_particles(
                force=bc["force"],
                dt=time_params["substep_dt"],
                point=point,
                size=size,
                num_dt=num_dt,
                start_time=start_time,
            )
        elif bc["type"] == "bounding_box":
            mpm_solver.add_bounding_box()

        elif bc["type"] == "enforce_particle_translation":
            assert "point" in bc.keys()
            assert "size" in bc.keys()
            assert "velocity" in bc.keys()
            assert "start_time" in bc.keys()
            assert "end_time" in bc.keys()

            mpm_solver.enforce_particle_velocity_translation(
                point=bc["point"],
                size=bc["size"],
                velocity=bc["velocity"],
                start_time=bc["start_time"],
                end_time=bc["end_time"],
            )
        elif bc["type"] == "surface_collider":
            assert "point" in bc.keys()
            assert "normal" in bc.keys()
            assert "surface" in bc.keys()
            assert "friction" in bc.keys()
            assert "start_time" in bc.keys()
            assert "end_time" in bc.keys()

            mpm_solver.add_surface_collider(
                point=bc["point"],
                normal=bc["normal"],
                surface=bc["surface"],
                friction=bc["friction"],
                start_time=bc["start_time"],
                end_time=bc["end_time"],
            )
        elif bc["type"] == "release_particles_sequentially":
            assert "normal" in bc.keys()
            assert "start_position" in bc.keys()
            assert "end_position" in bc.keys()
            assert "num_layers" in bc.keys()
            assert "start_time" in bc.keys()
            assert "end_time" in bc.keys()

            mpm_solver.release_particles_sequentially(
                normal=bc["normal"],
                start_position=bc["start_position"],
                end_position=bc["end_position"],
                num_layers=bc["num_layers"],
                start_time=bc["start_time"],
                end_time=bc["end_time"],
            )
        elif bc["type"] == "enforce_particle_velocity_rotation":
            assert "normal" in bc.keys()
            assert "point" in bc.keys()
            assert "start_time" in bc.keys()
            assert "end_time" in bc.keys()
            assert "half_height_and_radius" in bc.keys()
            assert "rotation_scale" in bc.keys()
            assert "translation_scale" in bc.keys()

            mpm_solver.enforce_particle_velocity_rotation(
                point=bc["point"],
                normal=bc["normal"],
                half_height_and_radius=bc["half_height_and_radius"],
                rotation_scale=bc["rotation_scale"],
                translation_scale=bc["translation_scale"],
                start_time=bc["start_time"],
                end_time=bc["end_time"],
            )

        else:
            raise TypeError("Undefined BC type")
````

## utils/render_utils.py

````text
import sys

sys.path.append("gaussian-splatting")

import argparse
import math
import cv2
import torchvision
import torch
import os
import numpy as np
import json
import copy
from tqdm import tqdm

# Gaussian splatting dependencies
from utils.sh_utils import eval_sh
from scene.gaussian_model import GaussianModel
from diff_gaussian_rasterization import (
    GaussianRasterizationSettings,
    GaussianRasterizer,
)
from scene.cameras import Camera as GSCamera
from gaussian_renderer import render, GaussianModel
from utils.system_utils import searchForMaxIteration
from utils.graphics_utils import focal2fov


def initialize_resterize(
    viewpoint_camera,
    pc: GaussianModel,
    pipe,
    bg_color: torch.Tensor,
    scaling_modifier=1.0,
):
    # Set up rasterization configuration
    tanfovx = math.tan(viewpoint_camera.FoVx * 0.5)
    tanfovy = math.tan(viewpoint_camera.FoVy * 0.5)

    raster_settings = GaussianRasterizationSettings(
        image_height=int(viewpoint_camera.image_height),
        image_width=int(viewpoint_camera.image_width),
        tanfovx=tanfovx,
        tanfovy=tanfovy,
        bg=bg_color,
        scale_modifier=scaling_modifier,
        viewmatrix=viewpoint_camera.world_view_transform,
        projmatrix=viewpoint_camera.full_proj_transform,
        sh_degree=pc.active_sh_degree,
        campos=viewpoint_camera.camera_center,
        prefiltered=False,
        debug=pipe.debug,
    )

    rasterize = GaussianRasterizer(raster_settings=raster_settings)
    return rasterize


def load_params_from_gs(
    pc: GaussianModel, pipe, scaling_modifier=1.0, override_color=None
):
    # Create zero tensor. We will use it to make pytorch return gradients of the 2D (screen-space) means
    screenspace_points = (
        torch.zeros_like(
            pc.get_xyz, dtype=pc.get_xyz.dtype, requires_grad=True, device="cuda"
        )
        + 0
    )
    try:
        screenspace_points.retain_grad()
    except:
        pass

    means3D = pc.get_xyz
    means2D = screenspace_points
    opacity = pc.get_opacity

    # If precomputed 3d covariance is provided, use it. If not, then it will be computed from
    # scaling / rotation by the rasterizer.
    scales = None
    rotations = None
    cov3D_precomp = None
    if pipe.compute_cov3D_python:
        cov3D_precomp = pc.get_covariance(scaling_modifier)
    else:
        scales = pc.get_scaling
        rotations = pc.get_rotation

    # If precomputed colors are provided, use them. Otherwise, if it is desired to precompute colors
    # from SHs in Python, do it. If not, then SH -> RGB conversion will be done by rasterizer.
    shs = None
    colors_precomp = None
    if override_color is None:
        shs = pc.get_features
    else:
        colors_precomp = override_color

    # # Those Gaussians that were frustum culled or had a radius of 0 were not visible.
    # # They will be excluded from value updates used in the splitting criteria.

    return {
        "pos": means3D,
        "screen_points": means2D,
        "shs": shs,
        "colors_precomp": colors_precomp,
        "opacity": opacity,
        "scales": scales,
        "rotations": rotations,
        "cov3D_precomp": cov3D_precomp,
    }


def convert_SH(
    shs_view,
    viewpoint_camera,
    pc: GaussianModel,
    position: torch.tensor,
    rotation: torch.tensor = None,
):
    shs_view = shs_view.transpose(1, 2).view(-1, 3, (pc.max_sh_degree + 1) ** 2)
    dir_pp = position - viewpoint_camera.camera_center.repeat(shs_view.shape[0], 1)
    if rotation is not None:
        n = rotation.shape[0]
        dir_pp[:n] = torch.matmul(rotation, dir_pp[:n].unsqueeze(2)).squeeze(2)

    dir_pp_normalized = dir_pp / dir_pp.norm(dim=1, keepdim=True)
    sh2rgb = eval_sh(pc.active_sh_degree, shs_view, dir_pp_normalized)
    colors_precomp = torch.clamp_min(sh2rgb + 0.5, 0.0)

    return colors_precomp
````

## utils/transformation_utils.py

````text
import torch
import numpy as np
from utils.camera_view_utils import *


def transform2origin(position_tensor, scale = 1.0):
    min_pos = torch.min(position_tensor, 0)[0]
    max_pos = torch.max(position_tensor, 0)[0]
    max_diff = torch.max(max_pos - min_pos)
    original_mean_pos = (min_pos + max_pos) / 2.0
    scale = scale / max_diff
    original_mean_pos = original_mean_pos.to(device="cuda")
    scale = scale.to(device="cuda")
    new_position_tensor = (position_tensor - original_mean_pos) * scale

    return new_position_tensor, scale, original_mean_pos


def undotransform2origin(position_tensor, scale, original_mean_pos):
    return original_mean_pos + position_tensor / scale


def generate_rotation_matrix(degree, axis):
    cos_theta = torch.cos(degree / 180.0 * 3.1415926)
    sin_theta = torch.sin(degree / 180.0 * 3.1415926)
    if axis == 0:
        rotation_matrix = torch.tensor(
            [[1, 0, 0], [0, cos_theta, -sin_theta], [0, sin_theta, cos_theta]]
        )
    elif axis == 1:
        rotation_matrix = torch.tensor(
            [[cos_theta, 0, sin_theta], [0, 1, 0], [-sin_theta, 0, cos_theta]]
        )
    elif axis == 2:
        rotation_matrix = torch.tensor(
            [[cos_theta, -sin_theta, 0], [sin_theta, cos_theta, 0], [0, 0, 1]]
        )
    else:
        raise ValueError("Invalid axis selection")
    return rotation_matrix.cuda()


def generate_rotation_matrices(degrees, axises):
    assert len(degrees) == len(axises)

    matrices = []

    for i in range(len(degrees)):
        matrices.append(generate_rotation_matrix(degrees[i], axises[i]))

    return matrices


def apply_rotation(position_tensor, rotation_matrix):
    rotated = torch.mm(position_tensor, rotation_matrix.T)
    return rotated


def apply_cov_rotation(cov_tensor, rotation_matrix):
    rotated = torch.matmul(cov_tensor, rotation_matrix.T)
    rotated = torch.matmul(rotation_matrix, rotated)
    return rotated


def get_mat_from_upper(upper_mat):
    upper_mat = upper_mat.reshape(-1, 6)
    mat = torch.zeros((upper_mat.shape[0], 9), device="cuda")
    mat[:, :3] = upper_mat[:, :3]
    mat[:, 3] = upper_mat[:, 1]
    mat[:, 4] = upper_mat[:, 3]
    mat[:, 5] = upper_mat[:, 4]
    mat[:, 6] = upper_mat[:, 2]
    mat[:, 7] = upper_mat[:, 4]
    mat[:, 8] = upper_mat[:, 5]

    return mat.view(-1, 3, 3)


def get_uppder_from_mat(mat):
    mat = mat.view(-1, 9)
    upper_mat = torch.zeros((mat.shape[0], 6), device="cuda")
    upper_mat[:, :3] = mat[:, :3]
    upper_mat[:, 3] = mat[:, 4]
    upper_mat[:, 4] = mat[:, 5]
    upper_mat[:, 5] = mat[:, 8]

    return upper_mat


def apply_rotations(position_tensor, rotation_matrices):
    for i in range(len(rotation_matrices)):
        position_tensor = apply_rotation(position_tensor, rotation_matrices[i])
    return position_tensor


def apply_cov_rotations(upper_cov_tensor, rotation_matrices):
    cov_tensor = get_mat_from_upper(upper_cov_tensor)
    for i in range(len(rotation_matrices)):
        cov_tensor = apply_cov_rotation(cov_tensor, rotation_matrices[i])
    return get_uppder_from_mat(cov_tensor)


def shift2center111(position_tensor):
    tensor111 = torch.tensor([1.0, 1.0, 1.0], device="cuda")
    return position_tensor + tensor111


def undoshift2center111(position_tensor):
    tensor111 = torch.tensor([1.0, 1.0, 1.0], device="cuda")
    return position_tensor - tensor111


def apply_inverse_rotation(position_tensor, rotation_matrix):
    rotated = torch.mm(position_tensor, rotation_matrix)
    return rotated


def apply_inverse_rotations(position_tensor, rotation_matrices):
    for i in range(len(rotation_matrices)):
        R = rotation_matrices[len(rotation_matrices) - 1 - i]
        position_tensor = apply_inverse_rotation(position_tensor, R)
    return position_tensor


def apply_inverse_cov_rotations(upper_cov_tensor, rotation_matrices):
    cov_tensor = get_mat_from_upper(upper_cov_tensor)
    for i in range(len(rotation_matrices)):
        R = rotation_matrices[len(rotation_matrices) - 1 - i]
        cov_tensor = apply_cov_rotation(cov_tensor, R.T)
    return get_uppder_from_mat(cov_tensor)


# input must be (n,3) tensor on cuda
def undo_all_transforms(input, rotation_matrices, scale_origin, original_mean_pos):
    return apply_inverse_rotations(
        undotransform2origin(
            undoshift2center111(input), scale_origin, original_mean_pos
        ),
        rotation_matrices,
    )


def get_center_view_worldspace_and_observant_coordinate(
    mpm_space_viewpoint_center,
    mpm_space_vertical_upward_axis,
    rotation_matrices,
    scale_origin,
    original_mean_pos,
):
    viewpoint_center_worldspace = undo_all_transforms(
        mpm_space_viewpoint_center, rotation_matrices, scale_origin, original_mean_pos
    )
    mpm_space_up = mpm_space_vertical_upward_axis + mpm_space_viewpoint_center
    worldspace_up = undo_all_transforms(
        mpm_space_up, rotation_matrices, scale_origin, original_mean_pos
    )
    world_space_vertical_axis = worldspace_up - viewpoint_center_worldspace
    viewpoint_center_worldspace = np.squeeze(
        viewpoint_center_worldspace.clone().detach().cpu().numpy(), 0
    )
    vertical, h1, h2 = generate_local_coord(
        np.squeeze(world_space_vertical_axis.clone().detach().cpu().numpy(), 0)
    )
    observant_coordinates = np.column_stack((h1, h2, vertical))

    return viewpoint_center_worldspace, observant_coordinates
````

## config/ficus_config.json

````text
{
    "opacity_threshold": 0.02,
    "rotation_degree": [0.0],
    "rotation_axis": [0],
    "substep_dt": 1e-4,
    "frame_dt": 4e-2,
    "frame_num": 125,
    "nu": 0.4,
    "E": 2e6,
    "material": "jelly",
    "density": 200,
    "g": [0,0,0],
    "grid_v_damping_scale": 0.9999,
    "rpic_damping": 0.0,
    "boundary_conditions": [
        {
            "type": "cuboid",
            "point": [
                1,
                1,
                0.5
            ],
            "size": [
                0.5,
                0.5,
                0.28
            ],
            "velocity": [
                0,
                0,
                0
            ],
            "start_time": 0,
            "end_time": 1e3,
            "reset": 1
        },
        {
            "type": "particle_impulse",
            "force": [
                -1.8e-1,
                0.0,
                0.0
            ],
            "num_dt": 1,
            "start_time": 0
        }
    ],
    "additional_material_params": [
        {
            "point": [
                1.0,
                1.0,
                1.5
            ],
            "size": [
                1.0,
                1.0,
                0.5
            ],
            "nu": 0.4,
            "E": 2e6,
            "density": 70
        }
    ],
    "mpm_space_vertical_upward_axis": [0,0,1],
    "mpm_space_viewpoint_center": [0.95,1.07,1],
    "default_camera_index": -1,
    "show_hint": false,
    "init_azimuthm": -36.7,
    "init_elevation": 8.96,
    "init_radius": 4.11,
    "move_camera": true,
    "delta_a": 0.4,
    "delta_e": 0.0,
    "delta_r": 0.0
}
````

## config/pillow2sofa_config.json

````text
{
    "opacity_threshold": 0.02,
    "rotation_degree": [],
    "rotation_axis": [],
    "substep_dt": 1e-4,
    "frame_dt": 2e-2,
    "frame_num": 300,
    "E": 1e4,
    "nu": 0.3,
    "n_grid": 100,
    "material": "jelly",
    "density": 2000,
    "g": [
        0.0,
        0,
        -5.0
    ],
    "sim_area": [
        -0.65,
        0.65,
        -0.6,
        0.6,
        -1,
        1
    ],
    "particle_filling": {
        "n_grid": 128,
        "density_threshold": 40.0,
        "search_threshold": 0.5,
        "search_exclude_direction": 5,
        "ray_cast_direction": 0,
        "max_particles_num": 2000000,
        "max_partciels_per_cell": 4,
        "boundary": [
            0.6,
            1.4,
            0.6,
            1.4,
            0.92,
            1.72
        ]
    },
    "boundary_conditions": [
        {
            "type": "bounding_box"
        },
        {
            "type": "cuboid",
            "point": [
                1,
                1,
                0.5
            ],
            "size": [
                1.0,
                1.0,
                0.05
            ],
            "velocity": [
                0,
                0,
                0
            ],
            "start_time": 0,
            "end_time": 1e3,
            "reset": 1
        },
        {
            "type": "enforce_particle_translation",
            "point": [
                1,
                1,
                0.5
            ],
            "size": [
                1,
                1,
                0.4
            ],
            "velocity": [
                0,
                0,
                0
            ],
            "start_time": 0,
            "end_time": 1e3
        },
        {
            "type": "cuboid",
            "point": [
                1,
                1,
                1.2
            ],
            "size": [
                1.0,
                1.0,
                0.12
            ],
            "velocity": [
                0,
                0,
                0
            ],
            "start_time": 0,
            "end_time": 0.5
        },
        {
            "type": "cuboid",
            "point": [
                1,
                1,
                1.45
            ],
            "size": [
                1.0,
                1.0,
                0.1
            ],
            "velocity": [
                0,
                0,
                0
            ],
            "start_time": 0.0,
            "end_time": 1.0
        }
    ],
    "mpm_space_vertical_upward_axis": [
        0,
        0,
        1
    ],
    "mpm_space_viewpoint_center": [
        1,
        1,
        1
    ],
    "default_camera_index": -1,
    "show_hint": false,
    "init_azimuthm": -90.0,
    "init_elevation": 30.0,
    "init_radius": 2.5,
    "move_camera": true,
    "delta_a": 0.5,
    "delta_e": 0.0,
    "delta_r": 0.0
}
````

## config/plane_config.json

````text
{
    "opacity_threshold": 0.02,
    "rotation_degree": [
        45.0,6.5
    ],
    "rotation_axis": [
        1,2
    ],
    "substep_dt": 1e-4,
    "frame_dt": 1e-2,
    "frame_num": 400,
    "E": 1e5,
    "yield_stress": 1e2,
    "nu": 0.3,
    "material": "metal",
    "grid_v_damping_scale": 0.9999,
    "density": 1000,
    "g": [
        0.0,
        0.0,
        0.0
    ],
    "n_grid": 120,
    "sim_area": [
        -2.1,
        -0.1,
        -0.7,
        0.9,
        -1.0,
        1.0
    ],
    "particle_filling":{
        "n_grid": 50,
        "density_threshold": 40.0,
        "search_threshold": 0.5,
        "search_exclude_direction": 0,
        "ray_cast_direction": 1,
        "max_particles_num": 2000000,
        "max_partciels_per_cell": 1,
        "boundary": [
            0.86,
            1.46,
            0.7,
            1.3,
            0.7,
            1.3
        ]
    },
    "boundary_conditions": [
        {
            "type": "bounding_box"
        },
        {
            "type": "enforce_particle_translation",
            "point": [
                1.18,
                1.0,
                0.5
            ],
            "size": [
                0.25,
                0.25,
                0.5
            ],
            "velocity": [
                0.0,
                0.0,
                0.0
            ],
            "start_time": 0.0,
            "end_time": 1e3
        },
        {
            "type": "enforce_particle_translation",
            "point": [
                1.45,
                1.0,
                1.0
            ],
            "size": [
                0.09,
                0.5,
                0.5
            ],
            "velocity": [
                0.0,
                0.0,
                0.0
            ],
            "start_time": 0.0,
            "end_time": 1e3
        },
        {
            "type": "enforce_particle_velocity_rotation",
            "point": [0.7,1.03,0.98],
            "normal": [1,0,0],
            "half_height_and_radius": [0.12, 0.6],
            "rotation_scale": 1.0,
            "translation_scale": 0.0,
            "start_time": 0.0,
            "end_time": 0.5
        },
        {
            "type": "enforce_particle_velocity_rotation",
            "point": [0.7,1.03,0.98],
            "normal": [1,0,0],
            "half_height_and_radius": [0.12, 0.6],
            "rotation_scale": -1.0,
            "translation_scale": 0.0,
            "start_time": 1.0,
            "end_time": 2.0
        }
    ],
    "mpm_space_vertical_upward_axis": [0,-1,0],
    "mpm_space_viewpoint_center": [1,1,1],
    "default_camera_index": -1,
    "show_hint": false,
    "init_azimuthm": 150,
    "init_elevation": 10,
    "init_radius": 2.7,
    "move_camera": true,
    "delta_a": 0.04,
    "delta_e": 0.0,
    "delta_r": 0.00
}
````

## config/tear_bread_config.json

````text
{
    "opacity_threshold": 0.02,
    "rotation_degree": [
        25.0
    ],
    "rotation_axis": [
        1
    ],
    "substep_dt": 1e-4,
    "frame_dt": 1e-2,
    "frame_num": 300,
    "E": 2e3,
    "nu": 0.3,
    "material": "jelly",
    "rpic_damping": 0.5,
    "grid_v_damping_scale": 0.9995,
    "density": 200,
    "scale": 0.6,
    "g": [
        0.0,
        0.0,
        0.0
    ],
    "n_grid": 150,
    "particle_filling": {
        "n_grid": 100,
        "density_threshold": 100.0,
        "search_threshold": 0.2,
        "search_exclude_direction": -1,
        "ray_cast_direction": 4,
        "max_particles_num": 2000000,
        "max_partciels_per_cell": 1,
        "smooth": true,
        "boundary":
        [
            0.64,
            1.36,
            0.64,
            1.36,
            0.64,
            1.36
        ],
        "visualize": true
    },
    "boundary_conditions": [
        {
            "type": "bounding_box"
        },
        {
            "type": "enforce_particle_translation",
            "point": [
                1.0,
                1.25,
                1.0
            ],
            "size": [
                1.0,
                0.05,
                1.0
            ],
            "velocity": [
                0.0,
                0.2,
                0.0
            ],
            "start_time": 0.0,
            "end_time": 1e3
        },
        {
            "type": "enforce_particle_translation",
            "point": [
                1.0,
                0.75,
                1.0
            ],
            "size": [
                1.0,
                0.05,
                1.0
            ],
            "velocity": [
                0.0,
                -0.2,
                0.0
            ],
            "start_time": 0.0,
            "end_time": 2.2
        }
    ],
    "mpm_space_vertical_upward_axis": [0,0,1],
    "mpm_space_viewpoint_center": [1,1,1],
    "default_camera_index": -1,
    "show_hint": false,
    "init_azimuthm": 55,
    "init_elevation": 13,
    "init_radius": 2.0,
    "move_camera": false,
    "delta_a": 0.05,
    "delta_e": 0.1,
    "delta_r": 0.00
}
````

## config/vasedeck_config.json

````text
{
    "opacity_threshold": 0.02,
    "rotation_degree": [
        135.0
    ],
    "rotation_axis": [
        0
    ],
    "substep_dt": 1e-4,
    "frame_dt": 4e-2,
    "frame_num": 75,
    "E": 1e4,
    "nu": 0.3,
    "material": "jelly",
    "density": 40,
    "g": [
        0.0,
        0.0,
        0.0
    ],
    "n_grid": 120,
    "grid_v_damping_scale": 1.1,
    "rpic_damping": 0.0,
    "sim_area": [
        -2.25,
        2.25,
        -5.01,
        -0.81,
        -1.95,
        2.55
    ],
    "mpm_space_vertical_upward_axis": [
        0,
        1,
        0
    ],
    "mpm_space_viewpoint_center": [
        1,
        1,
        1
    ],
    "default_camera_index": 0,
    "show_hint": false,
    "init_azimuthm": 0.0,
    "init_elevation": 0.0,
    "init_radius": 5,
    "move_camera": true,
    "delta_a": 0.05,
    "delta_e": 0.1,
    "delta_r": 0.00,
    "boundary_conditions": [
        {
            "type": "enforce_particle_velocity_rotation",
            "point": [
                1.025,
                0.7,
                0.975
            ],
            "normal": [
                0,
                1,
                0
            ],
            "half_height_and_radius": [
                0.2,
                0.1
            ],
            "rotation_scale": 1.9,
            "translation_scale": 0.0,
            "start_time": 0.0,
            "end_time": 0.3
        },
        {
            "type": "enforce_particle_velocity_rotation",
            "point": [
                1.025,
                0.7,
                0.975
            ],
            "normal": [
                0,
                1,
                0
            ],
            "half_height_and_radius": [
                0.2,
                0.1
            ],
            "rotation_scale": 0.0,
            "translation_scale": 0.0,
            "start_time": 0.3,
            "end_time": 0.6
        },
        {
            "type": "enforce_particle_velocity_rotation",
            "point": [
                1.025,
                0.7,
                0.975
            ],
            "normal": [
                0,
                1,
                0
            ],
            "half_height_and_radius": [
                0.2,
                0.1
            ],
            "rotation_scale": -1.9,
            "translation_scale": 0.0,
            "start_time": 0.6,
            "end_time": 0.9
        },
        {
            "type": "enforce_particle_velocity_rotation",
            "point": [
                1.025,
                0.7,
                0.975
            ],
            "normal": [
                0,
                1,
                0
            ],
            "half_height_and_radius": [
                0.2,
                0.1
            ],
            "rotation_scale": 0.0,
            "translation_scale": 0.0,
            "start_time": 0.9,
            "end_time": 100.0
        },
        {
            "type": "enforce_particle_translation",
            "point": [
                1.0,
                1.44,
                1.0
            ],
            "size": [
                1.0,
                0.1,
                1.0
            ],
            "velocity": [
                0.0,
                0.0,
                0.0
            ],
            "start_time": 0.0,
            "end_time": 100.0
        }
    ]
}
````

## config/wolf_config.json

````text
{
    "opacity_threshold": 0.02,
    "rotation_degree": [
        0.0
    ],
    "rotation_axis": [
        0
    ],
    "substep_dt": 2e-5,
    "frame_dt": 4e-2,
    "frame_num": 50,
    "E": 5e7,
    "nu": 0.3,
    "material": "sand",
    "density": 2000,
    "g": [
        0.0,
        0.0,
        -9.8
    ],
    "friction_angle": 30,
    "n_grid": 200,
    "particle_filling": {
        "n_grid": 100,
        "density_threshold": 100.0,
        "search_threshold": 1.0,
        "search_exclude_direction": 2,
        "ray_cast_direction": 4,
        "max_particles_num": 2000000,
        "max_partciels_per_cell": 1,
        "boundary": [
            0.4,
            1.6,
            0.4,
            1.6,
            0.4,
            1.6
        ],
        "smooth": true,
        "visualize": true
    },
    "boundary_conditions": [
        {
            "type": "bounding_box"
        },
        {
            "type": "surface_collider",
            "point": [
                1,
                1,
                0.48
            ],
            "normal": [
                0.0,
                0.0,
                1.0
            ],
            "surface": "sticky",
            "friction": 0.0,
            "start_time": 0,
            "end_time": 1e3
        },
        {
            "type": "release_particles_sequentially",
            "normal": [
                1,
                0,
                0
            ],
            "start_position": 1.5,
            "end_position": 0.5,
            "num_layers": 50,
            "start_time": 0.0,
            "end_time": 1.5
        }
    ],
    "mpm_space_vertical_upward_axis": [
        0,
        0,
        1
    ],
    "mpm_space_viewpoint_center": [
        1,
        1,
        0.8
    ],
    "default_camera_index": -1,
    "show_hint": false,
    "init_azimuthm": 170,
    "init_elevation": 0,
    "init_radius": 1.6,
    "move_camera": true,
    "delta_a": -2.4,
    "delta_e": 0.8,
    "delta_r": 0.0
}
````
