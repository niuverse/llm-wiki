[project-page]: https://microsoft.github.io/rhobotics/

<h1 align="center">
  <a href="https://microsoft.github.io/rhobotics/"><b>Rho</b>: A Foundation for Efficiently Adaptable VLA Models<br></a>
</h1>
<h2 align="center"><a href="https://microsoft.github.io/rhobotics/">Webpage</a> | <a href="https://microsoft.github.io/rhobotics/assets/rho.pdf">Technical Report</a> | <a href="https://huggingface.co/collections/microsoft/rho">Models</a> | <a href="https://huggingface.co/collections/microsoft/rho">Data</a></h2>

<table align="center">
  <tr>
    <td align="center" width="33%"><img src="website/public/assets/fr3-duo-sizzle.webp" alt="Rho highlight reel on the FR3 Duo" width="100%"></td>
    <td align="center" width="33%"><img src="website/public/assets/ur5e-sizzle.webp" alt="Rho highlight reel on the UR AI Trainer" width="100%"></td>
    <td align="center" width="33%"><img src="website/public/assets/yambox-sizzle.webp" alt="Rho highlight reel on the YAM Box" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><b>FR3 Duo</b></td>
    <td align="center"><b>UR AI Trainer</b></td>
    <td align="center"><b>YAM Box</b></td>
  </tr>
</table>

## 📚 Overview

Rho is a family of open-weight, 5B-parameter vision-language-action models for
robot learning, combining a physically grounded Phi-family vision-language
backbone with a continuous flow-matching action expert. This repository
provides the code needed to finetune Rho on LeRobot datasets, evaluate it in
simulation, and serve it over a websocket for deployment.

## Features

- Rho flow-matching policy with a Phi vision-language backbone.
- Single- and multi-GPU finetuning with PyTorch and Accelerate.
- Portable sharded-safetensors checkpoints.
- LeRobot dataset loading, transforms, and normalization.
- LIBERO and RoboEval training and evaluation examples.
- Websocket policy server and lightweight Python client.

## Requirements

- Linux
- Python 3.12
- A CUDA-capable GPU for practical training and inference
- Git

Docker is recommended for a reproducible GPU environment. Weights & Biases is
optional; disable it with `--wandb.enabled=false`.

## Installation

Choose either a native installation below or [Docker](#docker). Docker users
do not need to create a host Python environment or install FlashAttention on
the host.

For a native installation, create a Python environment and install the
repository:

```bash
conda create -y -n rho python=3.12
conda activate rho
pip install -e rho_client
pip install -e ".[dev,test,server]"
```

The websocket client is also independently installable:

```bash
pip install -e rho_client
```

Rho's default GPU configuration uses FlashAttention 2, which is installed
separately. Its native build requires a CUDA development toolkit (CUDA 12.0
or newer, compatible with your PyTorch build), including `nvcc` and CUDA
headers, plus a C++ compiler. An NVIDIA driver or the CUDA runtime bundled
with PyTorch is not sufficient.

If the toolkit is installed at `/usr/local/cuda`, configure and check it as
follows; replace that path with your actual toolkit installation:

```bash
export CUDA_HOME=/usr/local/cuda
export PATH="$CUDA_HOME/bin:$PATH"
nvcc --version
python -c "import torch; print('PyTorch CUDA:', torch.version.cuda)"
```

If `nvcc` is missing, install the
[CUDA toolkit](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/)
first, or use Docker. Setting `CUDA_HOME` alone does not install the toolkit.
If PyTorch reports `None`, install a CUDA-enabled PyTorch build before
continuing. Once these prerequisites are available:

```bash
python -m pip install packaging ninja
python -m pip install flash-attn==2.8.3 --no-build-isolation --no-cache-dir
```

## Docker

The Dockerfile supplies the CUDA development toolkit and installs
FlashAttention inside the image; a host `nvcc` installation is not required.
Running the container with GPUs still requires an NVIDIA driver and the
[NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
on the host.

Build the base training image:

```bash
./docker/training/build.sh
```

Docker builds may require substantial temporary space for image layers and
build cache. Plan for approximately 100 GB of free space. Inspect usage with
`docker system df`; use `docker builder prune` only when its listed build cache
is safe to remove.

Start an interactive container from the repository root:

```bash
./docker/training/interactive.sh
```

The launcher mounts the repository at `/workspace`. Set `RHO_DATA_DIR` to mount
a host dataset directory at `/data`:

```bash
RHO_DATA_DIR=/path/to/datasets ./docker/training/interactive.sh
```

## PushT smoke test

The public PushT configuration uses unnormalized image inputs compatible with
Rho's image processor. From the base training environment, run:

```bash
python -m rho.train \
  --config_path=config/train_pusht.yaml \
  --steps=10 \
  --batch_size=1 \
  --num_workers=0 \
  --policy.num_flow_samples=1 \
  --wandb.enabled=false
```

A successful smoke test prints steps, losses, and learning rates through step
10 and exits with status zero. The default checkpoint interval is 5,000 steps,
so this command verifies training without writing a checkpoint.

## Checkpoints

Alongside the base pretrained model
[`microsoft/rho-base`](https://huggingface.co/microsoft/rho-base), we provide
robot-specific midtrained checkpoints as starting points for task-specific
finetuning:

| Robot platform | Midtrained checkpoint |
| --- | --- |
| [UR AI Trainer](https://www.universal-robots.com/products/ur-ai-trainer/) | [`microsoft/rho-ur-ai-trainer`](https://huggingface.co/microsoft/rho-ur-ai-trainer) |
| [Franka FR3 Duo](https://franka.de/fr3-duo) | [`microsoft/rho-fr3-duo`](https://huggingface.co/microsoft/rho-fr3-duo) |
| [YAM Box](https://i2rt.com/products/yam-box) | [`microsoft/rho-yam-box`](https://huggingface.co/microsoft/rho-yam-box) |

Select a midtrained checkpoint with the top-level `pretrained_checkpoint`
setting, for example `--pretrained_checkpoint=microsoft/rho-ur-ai-trainer`.
See [Choosing a starting checkpoint](docs/tutorials/finetuning_custom_datasets.md#choosing-a-starting-checkpoint)
for finetuning guidance.

Rho supports local checkpoint paths and Hugging Face repository IDs. Public
pretrained model checkpoints contain:

- Model configuration.
- Feature schema.
- Sharded safetensors weights.

Pretrained checkpoints may omit dataset configuration because finetuning
supplies it from the selected training YAML. Finetuned checkpoints contain the
dataset configuration and normalization statistics needed for evaluation.
Evaluation YAML files should not override `dataset` unless deliberately
evaluating with different preprocessing. Public model checkpoints do not
contain optimizer, scheduler, or other training state.

A full training checkpoint may additionally contain `training_state.pt` for
trusted local resume:

```text
checkpoint_step_0010000/
├── manifest.json
├── policy.json
├── features.json
├── model-00001-of-00003.safetensors
├── model-00002-of-00003.safetensors
├── model-00003-of-00003.safetensors
├── model.safetensors.index.json
└── training_state.pt
```

Rho downloads the default pretrained weights from the Hugging Face repository
configured by the policy. Set `pretrained_checkpoint` only to select a
different Hugging Face repository or a locally available checkpoint. Set
`resume=true` only when loading trusted training state.

## Configuration

Training and evaluation use YAML configuration files. Configurations can
compose shared files with `!include`, and any field can be overridden from the
command line with dotted names. The shared `rho.train` entry point
automatically selects single-process training or the Accelerate
implementation based on the launch environment.

For example, override the public PushT configuration:

```bash
python -m rho.train \
  --config_path=config/train_pusht.yaml \
  --batch_size=4 \
  --steps=100 \
  --wandb.enabled=false
```

Distributed launches require at least as many visible physical GPUs as
processes. For two GPUs:

```bash
accelerate launch --multi-gpu \
  --num_processes=2 \
  -m rho.train \
  --config_path=config/train_pusht.yaml \
  --wandb.enabled=false
```

Environment-specific training scripts register their adapters and delegate to
the same training implementation. Run LIBERO commands only after building and
entering the LIBERO container below.

## LIBERO

Build and launch the LIBERO image after building `rho-training:latest`:

```bash
export RHO_DATA_DIR=/path/to/large/storage
./environments/libero/docker/build.sh
./environments/libero/docker/run_interactive.sh
```

The launcher mounts `RHO_DATA_DIR` at `/data`. Store generated runs there to
avoid filling the repository filesystem. The current container runs as root,
so files written to the host data directory may be root-owned.

Run a short single-GPU smoke test:

```bash
mkdir -p /data/rho_runs/libero_smoke

python environments/libero/train.py \
  --config_path=environments/libero/configs/train_libero_rho.yaml \
  --steps=10 \
  --batch_size=1 \
  --num_workers=0 \
  --policy.num_flow_samples=1 \
  --wandb.enabled=false \
  --output_dir=/data/rho_runs/libero_smoke
```

A successful run authenticates to the hosted checkpoint, loads the LIBERO
dataset, prints loss and learning-rate values through step 10, and exits with
status zero. Initialization alone is not a successful smoke test. The default
checkpoint interval is 5,000 steps, so no checkpoint is expected from this
10-step command.

### Run full LIBERO training

The canonical configuration trains for 40,000 optimizer steps with a global
effective batch size of 128. The published-result topology uses four H100
GPUs, per-device batch size 32, and no gradient accumulation:

```bash
accelerate launch --multi-gpu \
  --num_processes=4 \
  environments/libero/train.py \
  --config_path=environments/libero/configs/train_libero_rho.yaml \
  --output_dir=/data/rho_runs/libero_full
```

The effective batch size is:

```text
batch_size × number of processes × gradient_accumulation_steps
```

Users do not need a multi-GPU machine. On one GPU, `--batch_size=128` with no
accumulation is mathematically equivalent if the GPU has enough memory. In
practice, use a smaller per-device batch with gradient accumulation. For one
GPU with batch size 32 and accumulation 4:

```bash
accelerate launch \
  --num_processes=1 \
  environments/libero/train.py \
  --config_path=environments/libero/configs/train_libero_rho.yaml \
  --batch_size=32 \
  --gradient_accumulation_steps=4 \
  --output_dir=/data/rho_runs/libero_full
```

If batch size 32 does not fit, use batch size 16 with accumulation 8, or batch
size 8 with accumulation 16. In general:

```text
gradient_accumulation_steps = 128 ÷ (batch_size × number of processes)
```

The canonical configuration also uses BF16, a learning rate of `1e-4`, 2,500
warmup steps, cosine decay to `5e-6` over 40,000 steps, and checkpoints every
5,000 steps. It trains with the vision and language backbone unfrozen, predicts
16-step action chunks, and draws 8 flow samples per training example
(`policy.num_flow_samples=8`). LIBERO evaluation executes all 16 predicted
actions before requesting another chunk. The flow-sample setting matches the
published recipe but is not required for ordinary finetuning, which can use
one sample for lower memory and compute cost. On an H100, the published global
batch of 128 with 8 flow samples takes approximately 7.2 seconds per optimizer
step; exact throughput depends on hardware and launch topology.
A checkpoint for this model is roughly 10.5 GB for model weights alone or
20.6 GB when it also retains the optimizer and scheduler state required to
resume training. Plan output storage accordingly.

On Python 3.12, worker startup may print a warning about forking a
multithreaded process. The validated container completed normally; if worker
startup stalls on another host, use `--num_workers=0`.

### Evaluate the published LIBERO checkpoint

The LIBERO evaluation configurations use the hosted
[`microsoft/rho-libero`](https://huggingface.co/microsoft/rho-libero)
checkpoint and execute 16 actions per inference:

```bash
python environments/libero/eval.py \
  --config_path=environments/libero/configs/eval_libero_rho.yaml
```

For a short four-suite validation, run one episode for each of the 10 tasks in
each suite, for 40 episodes total:

```bash
python environments/libero/eval.py \
  --config_path=environments/libero/configs/multieval_libero_rho_smoke.yaml
```

The full published evaluation runs 50 episodes for each of 10 tasks in each
suite: 500 episodes per suite and 2,000 episodes total.

```bash
python environments/libero/eval.py \
  --config_path=environments/libero/configs/multieval_libero_rho_50.yaml
```

To evaluate a checkpoint produced by your own full training run, override the
hosted checkpoint explicitly:

```bash
python environments/libero/eval.py \
  --config_path=environments/libero/configs/eval_libero_rho.yaml \
  --pretrained_checkpoint=/path/to/training-run/checkpoints/checkpoint_step_0040000
```

Multi-evaluation writes a `multieval_summary_*.json` even when suites fail.
Each suite has an explicit `status` and failed suites include an `error`.
Any suite failure makes the command exit unsuccessfully after the remaining
suites have been attempted. An incomplete run has no overall
`aggregate.mean_success_rt` (JSON `null`); its successful-suite-only mean is
reported separately as `aggregate.mean_success_rt_completed`.

## RoboEval

See [`environments/roboeval/README.md`](environments/roboeval/README.md) for
container setup, dataset layout, finetuning, and checkpoint evaluation
instructions for end-effector and joint-position policies.

## Serving

The policy server communicates with robot or simulator clients over websockets.
Install the server dependencies and the standalone client:

```bash
pip install -e rho_client
pip install -e ".[server]"
```

Environment integrations provide the observation and action conversion needed
between a policy server and a robot or simulator client.

## Dataset utilities

Validate that a training configuration can construct and sample its dataset:

```bash
python -m rho.utils.check_dataset \
  --config_path=environments/libero/configs/train_libero_rho.yaml
```

Recompute LeRobot statistics directly from parquet files:

```bash
python -m rho.utils.recompute_lerobot_stats_parquet \
  --dataset_path=/path/to/lerobot_dataset \
  --stats_type=quantile
```

## Development

Run the test suite:

```bash
pytest
```

Run static checks:

```bash
ruff check rho tests environments
```

The repository is organized around:

```text
rho/                 Core package
rho_client/          Standalone websocket client
config/              Shared training and dataset configurations
environments/libero  LIBERO integration
environments/roboeval RoboEval integration
docker/training      Base training container
tests/               Unit and integration tests
```

## License

This project is released under the MIT License.

## Contributing

This project welcomes contributions and suggestions. Most contributions
require you to agree to a Contributor License Agreement (CLA) declaring that
you have the right to, and actually do, grant us the rights to use your
contribution. For details, visit
[Contributor License Agreements](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether
you need to provide a CLA and decorate the pull request appropriately. Follow
the instructions provided by the bot. You only need to do this once across all
repositories using the CLA.

This project has adopted the
[Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information, see the
[Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com).

## Trademarks

This project may contain trademarks or logos for projects, products, or
services. Authorized use of Microsoft trademarks or logos is subject to and
must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must
not cause confusion or imply Microsoft sponsorship. Any use of third-party
trademarks or logos is subject to those third parties' policies.
