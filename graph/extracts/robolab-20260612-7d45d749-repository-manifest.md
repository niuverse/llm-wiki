---
title: "RoboLab repository manifest 2026-06-12 7d45d749"
type: extract
source: raw/robolab-20260612-7d45d749-source.tar.gz
commit: 7d45d74904eade3b578a8eb1f2f9f89bc3d40326
baseline: 5d3ba41e551aced710b3d585b245a313a9a407ce
generated: 2026-06-12
---

# RoboLab repository manifest / readable evidence cache

This file is a deterministic reading cache for the 2026-06-12 RoboLab repository refresh. It groups the official GitHub compare and selected repository files by design surface so wiki claims can trace back to concrete artifacts.

## Provenance
- Repository: https://github.com/NVlabs/RoboLab
- Current HEAD: `7d45d74904eade3b578a8eb1f2f9f89bc3d40326`
- Current commit author date: `2026-06-01T01:16:22Z`
- Repo pushed_at: `2026-06-01T01:21:55Z`; updated_at: `2026-06-12T05:58:40Z`
- Baseline: `5d3ba41e551aced710b3d585b245a313a9a407ce`
- Compare status: `ahead`; ahead_by `19`; behind_by `0`; total commits `19`
- Raw archive: `raw/robolab-20260612-7d45d749-source.tar.gz`
- Metadata: `raw/robolab-20260612-7d45d749-main-commit.json`, `raw/robolab-20260612-7d45d749-repo.json`, `raw/robolab-20260612-7d45d749-compare-from-5d3ba41e.json`, `raw/robolab-20260612-7d45d749-readme.md`

## Commit messages in compare
- `4d6d5f9d` 2026-04-29T01:19:56Z: Camera + DreamZero updates, analysis revamp, task and event-log fixes
- `4d1c2d67` 2026-04-29T21:36:27Z: Use streaming H.264 (libx264) for episode videos so they play in Chrome
- `d0e2042e` 2026-04-29T21:56:23Z: Add contributors
- `8331faf9` 2026-05-01T00:29:42Z: Docs revamp, --randomize-background flag, simplified install
- `d5cfc4c3` 2026-05-20T01:26:26Z: Per-policy reorg, convex-hull predicates, adaptive sampling, droid IK control, install suite
- `772bf908` 2026-05-24T07:02:09Z: Dashboard, scene images, and docs updates
- `8a1932f1` 2026-05-22T22:36:30Z: logging: prevent frozen-env data leaks in recorder
- `36ff8050` 2026-05-23T04:32:42Z: tasks: enforce placement order in then-sequenced tasks
- `f7faf55b` 2026-05-24T07:21:19Z: docs: use absolute video URL and uv run for dashboard quickstart
- `fa24ab8b` 2026-05-24T07:28:34Z: docs: use GitHub user-attachments URL for dashboard video
- `fdaa652f` 2026-05-24T07:29:26Z: docs: use user-attachments URL for rendering-artefact video
- `571df82e` 2026-05-24T07:30:17Z: docs: drop in-repo mp4s, point fallback links at user-attachments
- `8259e8d3` 2026-06-01T01:16:21Z: Add Cosmos3 policy client; refresh dreamzero/gr00t/pi0_family clients
- `84e8d1b6` 2026-06-01T01:16:21Z: Add /robolab-scenegen and /robolab-taskgen Claude Code skills
- `255c58ae` 2026-06-01T01:16:22Z: Docker: default to display run_docker.sh; quickstart README
- `4120fe3b` 2026-06-01T01:16:22Z: Dashboard refresh
- `7337896b` 2026-06-01T01:16:22Z: Docs + licensing: per-policy READMEs, SPDX headers, THIRD_PARTY_NOTICES, websockets dep
- `edb325a7` 2026-06-01T01:16:22Z: Remove _wip assets and tasks from a prior release
- `7d45d749` 2026-06-01T01:16:22Z: Update robolab core, examples, analysis, and assets

## Changed files by design surface
### agentic scene/task generation
- Files: 2; added 2, modified 0, removed 0, renamed 0.
  - `added` `.claude/skills/robolab-scenegen` (1 changes)
  - `added` `.claude/skills/robolab-taskgen` (1 changes)

### analysis and statistical reporting
- Files: 9; added 1, modified 8, removed 0, renamed 0.
  - `modified` `analysis/check_results.py` (2 changes)
  - `modified` `analysis/compile_results.py` (2 changes)
  - `modified` `analysis/deduplicate_error_logs.py` (2 changes)
  - `modified` `analysis/droid_dataset/droid_dataset_distribution.py` (3 changes)
  - `modified` `analysis/extract_initial_poses.py` (2 changes)
  - `modified` `analysis/read_results.py` (77 changes)
  - `modified` `analysis/sensitivity_analysis/posterior_inference.py` (2 changes)
  - `modified` `docs/analysis.md` (54 changes)
  - `added` `docs/statistical_significance.md` (79 changes)

### asset and scene curation
- Files: 234; added 4, modified 69, removed 161, renamed 0.
  - `modified` `assets/backgrounds/_utils/generate_background_table.py` (2 changes)
  - `removed` `assets/cameras.usda` (3 changes)
  - `modified` `assets/objects/_utils/common.py` (2 changes)
  - `modified` `assets/objects/_utils/convert_usd_format.py` (2 changes)
  - `modified` `assets/objects/_utils/delete_usd.py` (2 changes)
  - `modified` `assets/objects/_utils/fix_vomp_objects.py` (3 changes)
  - `modified` `assets/objects/_utils/generate_catalog.py` (2 changes)
  - `modified` `assets/objects/_utils/generate_object_screenshots.py` (2 changes)
  - `modified` `assets/objects/_utils/generate_readme.py` (2 changes)
  - `modified` `assets/objects/_utils/scatter_objects.py` (2 changes)
  - `modified` `assets/objects/_utils/update_object_properties.py` (2 changes)
  - `removed` `assets/objects/_wip/banana_11/robocasa_banana_11.usd` (3 changes)
  - `removed` `assets/objects/_wip/banana_11/textures/image0.png` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_04/configuration/materials/image0.png` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_04/configuration/materials/textures/material_0.png` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_04/configuration/model_base.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_04/configuration/model_physics.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_04/configuration/model_robot.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_04/configuration/model_sensor.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_04/model.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_20/configuration/model_base.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_20/configuration/model_physics.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_20/configuration/model_robot.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_20/configuration/model_sensor.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_20/gregorys_coffee_cup.usd` (3 changes)
  - `removed` `assets/objects/_wip/coffee_cup_20/model.usd` (3 changes)
  - `removed` `assets/objects/_wip/containers/black_pail.usd` (3 changes)
  - `removed` `assets/objects/_wip/containers/cutting_board.usd` (3 changes)
  - `removed` `assets/objects/_wip/containers/grey_bin.usd` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Plastic_B.mdl` (60 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Black_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Black_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Blue_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Blue_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Brown_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Brown_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Glossy_Black_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Glossy_Black_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Gray_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Gray_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Green_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Green_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Normal_1k.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_ORM_1k.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Orange_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Orange_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Red_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Red_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Rough_Black_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Rough_Black_A_Normal.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Rough_Black_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Violet_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Violet_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_White_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_White_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Yellow_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/DigitalTwin/Materials/Base/Plastics/Textures/T_Plastic_Yellow_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/Isaac/5.0/Isaac/Props/KLT_Bin/Materials/Textures/FOF_Map_Labels_D.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/Isaac/5.0/Isaac/Props/KLT_Bin/Materials/Textures/FOF_Map_Magenta_Box_D.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/omniverse-content-production.s3-us-west-2.amazonaws.com/Assets/Isaac/5.0/Isaac/Props/KLT_Bin/Materials/Textures/FOF_Mesh_Labels_D.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/purple_KLT_bin.usd` (3 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/Metal_Glossy_A.mdl` (16 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/Natural_Plastic_E.mdl` (171 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_Black_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_Blue_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_Green_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_Orange_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_Red_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_Violet_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_White_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/PlasticPails_Yellow_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/Plastic_Glossy_White_A.mdl` (36 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/Plastic_Gray_A.mdl` (52 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/T_Plastic_Gray_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/T_Plastic_Gray_A_Normal.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/T_Plastic_Gray_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/T_Plastic_Orange_A_Albedo.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/T_Plastic_Orange_A_Normal.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/textures/black_pail/T_Plastic_Orange_A_ORM.png` (3 changes)
  - `removed` `assets/objects/_wip/containers/textures/cutting_board/Cutting_Board_BaseColor.png` (3 changes)
  - ... 154 more files omitted from manifest list

### dashboard and result browsing
- Files: 12; added 12, modified 0, removed 0, renamed 0.
  - `added` `dashboard/__init__.py` (2 changes)
  - `added` `dashboard/app.py` (486 changes)
  - `added` `dashboard/cli.py` (44 changes)
  - `added` `dashboard/loaders/__init__.py` (2 changes)
  - `added` `dashboard/loaders/catalog.py` (383 changes)
  - `added` `dashboard/loaders/hdf5.py` (160 changes)
  - `added` `dashboard/loaders/local.py` (472 changes)
  - `added` `dashboard/loaders/sources.py` (75 changes)
  - `added` `dashboard/static/app.css` (727 changes)
  - `added` `dashboard/static/app.js` (3301 changes)
  - `added` `dashboard/templates/index.html` (101 changes)
  - `added` `docs/dashboard.md` (67 changes)

### examples and demos
- Files: 14; added 3, modified 0, removed 3, renamed 8.
  - `renamed` `examples/__init__.py` (2 changes)
  - `removed` `examples/demo/run_env.py` (114 changes)
  - `renamed` `examples/episodes.py` (111 changes)
  - `removed` `examples/policy/__init__.py` (8 changes)
  - `removed` `examples/policy/run_eval.py` (237 changes)
  - `renamed` `examples/recorded_data/RubiksCubeAndBananaTask/data.hdf5` (0 changes)
  - `renamed` `examples/recorded_data/RubiksCubeAndBananaTask/env_cfg.json` (0 changes)
  - `renamed` `examples/recorded_data/RubiksCubeAndBananaTask/log_0.json` (0 changes)
  - `renamed` `examples/recorded_data/RubiksCubeAndBananaTask/put_the_cube_and_the_banana_in_the_bowl_0_env.mp4` (0 changes)
  - `added` `examples/run_abs_ik_demo.py` (218 changes)
  - `renamed` `examples/run_empty.py` (25 changes)
  - `added` `examples/run_gripper_toggle.py` (110 changes)
  - `renamed` `examples/run_recorded.py` (25 changes)
  - `added` `examples/run_rel_ik_demo.py` (96 changes)

### installation governance packaging
- Files: 9; added 1, modified 8, removed 0, renamed 0.
  - `modified` `.dockerignore` (7 changes)
  - `modified` `.gitignore` (14 changes)
  - `modified` `CONTRIBUTING.md` (63 changes)
  - `modified` `LICENSE` (629 changes)
  - `modified` `README.md` (127 changes)
  - `added` `THIRD_PARTY_NOTICES.md` (77 changes)
  - `modified` `docker/README.md` (2 changes)
  - `modified` `docker/build_docker.sh` (3 changes)
  - `modified` `docker/run_docker.sh` (25 changes)

### other
- Files: 6; added 2, modified 4, removed 0, renamed 0.
  - `modified` `docs/README.md` (49 changes)
  - `modified` `docs/background.md` (41 changes)
  - `modified` `docs/camera.md` (31 changes)
  - `added` `docs/images/ribble-dark.gif` (3 changes)
  - `added` `docs/images/ribble.gif` (3 changes)
  - `modified` `docs/lighting.md` (4 changes)

### policy integration and inference clients
- Files: 6; added 4, modified 1, removed 1, renamed 0.
  - `removed` `docs/inference.md` (166 changes)
  - `modified` `docs/policy.md` (12 changes)
  - `added` `policies/README.md` (61 changes)
  - `added` `policies/__init__.py` (2 changes)
  - `added` `policies/cosmos3/README.md` (94 changes)
  - `added` `policies/cosmos3/__init__.py` (6 changes)

### task/environment/debug runtime semantics
- Files: 8; added 2, modified 6, removed 0, renamed 0.
  - `modified` `docs/data.md` (4 changes)
  - `modified` `docs/debug.md` (36 changes)
  - `added` `docs/env_vram_size_guide.md` (158 changes)
  - `modified` `docs/environment_registration.md` (41 changes)
  - `modified` `docs/environment_run.md` (46 changes)
  - `added` `docs/known_issues.md` (20 changes)
  - `modified` `docs/task_conditionals.md` (54 changes)
  - `modified` `docs/task_libraries.md` (9 changes)

## Selected files read
### `README.md`
Headings:
- ## Key Features
- ## Getting Started
- ### Installation
- ### Run without a policy
- # Run an empty episode with random actions
- # Playback recorded demonstration data
- # Toggle the gripper open/closed while holding the arm fixed (sanity-check
- # the gripper action path; saves sensor + viewport video to
- # output/run_gripper_toggle/<task>/)
- ### Run with a policy
- ### Common CLI Options
- # Run headlessly
- # Run on specific tasks (these two are good for sanity checking)
- # Run on a tag of tasks
- # Run 12 parallel episodes per task
- # Enable subtask progress tracking
- # Resume a previous run (skips completed episodes)
- ## Example Tasks
- ## Dashboard
- # open http://localhost:8080
- ## Documentation
- ## Requirements
- ## License
- ## Citation
- ## Contributing
Relevant lines:
- L1: <h1><picture><source media="(prefers-color-scheme: dark)" srcset="docs/images/ribble.gif"><img src="docs/images/ribble-dark.gif" alt="" height="42" align="absmiddle" /></picture> RoboLab</h1>
- L5: **RoboLab** is a task-based evaluation benchmark for robot manipulation policies built on [NVIDIA Isaac Lab](https://github.com/isaac-sim/IsaacLab). It provides 100+ manipulation tasks with automated success detection, a server-client policy architecture, and multi-environment parallel evaluation — designed for reproducible, large-scale benchmarking of generalist robot policies in simulation.
- L13: - **RoboLab-120**: An initial set of 120 brand new benchmark [tasks](robolab/tasks/README.md) spanning pick-and-place, stacking, rearrangement, tool use, and more — each with language instructions and automated success/failure detection via composable predicates.
- L14: - **Bring your own robot**: Tasks are not tied to a specific robot embodiment, so you can plug in any robot compatible with IsaacLab!
- L15: - **Rich Asset Libraries**: See a list of [objects](assets/objects/README.md), [scenes](assets/scenes/README.md), and curated [backgrounds](assets/backgrounds/README.md) — everything you need to create new scenes and new tasks for your own evaluation needs.
- L16: - **AI-Enabled Workflows**: Generate new scenes and tasks **in minutes** using natural language with the [/robolab-scenegen](skills/robolab-scenegen/) and [/robolab-taskgen](skills/robolab-taskgen/) Claude Code skills.
- L17: - **Multi-Environment Parallel Evaluation**: Run multiple episodes in parallel across environments with vectorized conditionals and per-environment termination.
- L18: - **Results Dashboard with Episode Videos and Cross-Experiment Analysis**: A self-contained web [dashboard](docs/dashboard.md) for browsing scenes/tasks, replaying episode videos, and comparing results across experiments.
- L22: Requires [uv](https://docs.astral.sh/uv/getting-started/installation/) and a system `ffmpeg` (used for video recording). Isaac Sim 5.0 and Isaac Lab 2.2.0 are installed automatically via `uv sync`. See [Requirements](#requirements) for hardware.
- L27: sudo apt install ffmpeg
- L31: source .venv/bin/activate
- L37: uv run pytest tests/
- L40: This runs the install-verification suite end-to-end: isaaclab importable, all task definitions valid, env factory populated, one full episode runs. The suite auto-accepts the NVIDIA Omniverse EULA so the run is fully headless with no prompts. More details at [Debugging → Diagnostic Scripts](docs/debug.md#diagnostic-scripts).
- L42: > **Running without activating the venv**: if you don't `source .venv/bin/activate`, prefix every `python` command with `uv run` (e.g. `uv run pytest tests/`).
- L44: > **EULA outside the test suite**: when running other entry points (e.g. `policies/pi0_family/run.py`) for the first time, set `export OMNI_KIT_ACCEPT_EULA=Y` once. Cached after first acceptance.
- L46: ### Run without a policy
- L50: python examples/run_empty.py --headless
- L53: python examples/run_recorded.py --headless
- L57: # output/run_gripper_toggle/<task>/)
- L58: python examples/run_gripper_toggle.py --task BananaInBowlTask --headless
- L61: ### Run with a policy
- L63: RoboLab uses a **server-client architecture**: your model runs as a standalone server, and RoboLab connects to it via a lightweight inference client. To quickly test RoboLab, try [Pi0.5 via OpenPI](policies/pi0_family/README.md).
- L69: uv run python policies/pi0_family/run.py --policy pi05 --task BananaInBowlTask --num-envs 10 --enable-subtask
- L71: Use the [dashboard](#dashboard) to view the output written to your local folder.
- L76: # Run headlessly

### `docs/README.md`
Headings:
- # RoboLab Documentation
- ## How RoboLab Works
- ## Terminology
- #### Objects, Scenes, Tasks
- #### Task Conditionals
- #### Variations
- #### Environments
- #### Policy
- #### Output
- #### Debug
- ## Developing and Working with RoboLab
- ### Creating new assets, tasks, and benchmarks
- ### Configuring robots, cameras, lighting, and backgrounds
- ### Evaluating a new policy against the benchmark
- ### Analysis
- ### Browsing the benchmark and eval results
- ### AI Workflows
Relevant lines:
- L5: RoboLab dynamically combines **tasks** with user-specified **robot**, **observations**, **actions**, and **simulation parameters** at environment registration time.
- L11: | **scene** | A USD/USDA file describing the static contents of a workspace — objects, fixtures, table, and their spatial layout. Reusable across tasks. See [Scenes](scene.md). |
- L12: | **task** | A `Task` dataclass binding a scene to a language instruction, termination criteria, and (optional) subtasks. See [Tasks](task.md). |
- L13: | **environment** | A task combined with robot, camera, lighting, background, and simulation configs, registered as a Gymnasium env. `--num-envs N` spawns `N` parallel instances in a grid, each indexed by `env_id`. See [Environment Registration](environment_registration.md). |
- L15: | **run** | One sequential pass over all environments (one reset → step loop → termination → `end_episode` cycle). If running with `--num-envs N`, then each run produces `N` episodes.|
- L20: #### Objects, Scenes, Tasks
- L22: - **[Scenes](scene.md)** — USD-based environments containing objects, fixtures, and spatial layout
- L23: - **[Tasks](task.md)** — Language instructions, termination criteria, and scene bindings
- L24: - **[Task Libraries](task_libraries.md)** — Managing task collections, generating metadata, and viewing statistics
- L25: #### Task Conditionals
- L26: - **[Subtask Checking](subtask.md)** — Granular progress tracking within tasks
- L27: - **[Conditionals](task_conditionals.md)** — Predicate logic for defining success/failure conditions
- L28: - **[Event Tracking](event_tracking.md)** — Monitoring task-relevant events during execution
- L31: - **[Cameras](camera.md)** — Scene cameras and robot-attached cameras
- L32: - **[Lighting](lighting.md)** — Scene lighting (sphere, directional, and custom lights)
- L35: - **[Environment Registration](environment_registration.md)** — How tasks are combined with robot/observation/action configs into runnable Gymnasium environments
- L36: - **[Environment Generation](environment_generation.md)** — Contact sensor creation, subtask trackers, and runtime environment internals
- L38: - **[`num_envs` VRAM size guide](env_vram_size_guide.md)** — Per-task `num_envs` ceiling on L40, measured against pi05
- L39: #### Policy
- L40: - **[Inference Clients](../policies/README.md)** — Built-in policy clients and server setup instructions
- L46: - **[Known Issues](known_issues.md)** — Documented bugs and workarounds
- L54: ### Creating new assets, tasks, and benchmarks
- L57: 2. **[Creating New Scenes](scene.md)** — Compose objects into USD scenes using IsaacSim. Includes settling, metadata generation, and screenshot utilities.
- L58: 3. **[Creating New Tasks](task.md)** — Define task dataclasses with language instructions, termination criteria, and scene bindings. Tasks can live in your own repository.
- L59: 4. **[Managing Task Libraries](task_libraries.md)** — Organize tasks into collections, generate metadata (JSON, CSV, README), and compute statistics.

### `docs/dashboard.md`
Headings:
- # Dashboard
- ## Quickstart
- # Already installed if you ran `uv sync` / `uv pip install -e .` — the
- # dashboard ships in the default RoboLab dependency set.
- # Bare minimum: starts empty, add output directories from the sidebar.
- # Or seed it with one up-front (still editable in the UI):
- # → Serving /path/to/output on http://0.0.0.0:8080
- ### CLI flags
- ## What it shows
- ### Scenes
- ### Tasks
- ### Results
- ## Hosting on the LAN
Relevant lines:
- L1: # Dashboard
- L3: A self-contained web dashboard for browsing the RoboLab benchmark and inspecting eval results. Boots in seconds, binds `0.0.0.0` so anyone on your LAN can reach it via your IP.
- L6: Your viewer doesn't render inline video — see <a href="https://github.com/user-attachments/assets/5992e61b-9043-4602-8402-04459da38421">robolab_dashboard.mp4</a>.
- L13: # dashboard ships in the default RoboLab dependency set.
- L16: uv run robolab-dashboard
- L19: uv run robolab-dashboard --output-dir /path/to/output
- L29: | `--output-dir <path>` | *(none — optional)* | Optional initial results directory. If omitted, the dashboard starts with whatever sources you previously added from the sidebar (persisted to `~/.config/robolab-dashboard/sources.json`). Add or remove sources at runtime from the sidebar. |
- L30: | `--scenes-metadata-dir <path>` | auto-detected (see resolution order below) | Where to find `scene_metadata.json` + `_images/`. Only needed if running from a worktree that has `assets/` sparse-excluded. Also reads `$ROBOLAB_SCENES_METADATA_DIR`. Resolution order: CLI flag → env var → `<PACKAGE_DIR>/assets/scenes/_metadata` → sibling `robolab/` checkout. |
- L37: ### Scenes
- L39: Browse every USD scene in the asset library — a card grid with a preview thumbnail per scene, the object count, and the number of tasks that reference each one. Click into any scene to see its full prim list (name, payload USD path, description, static-body flag) and a back-link to every task that uses it.
- L41: Data sources:
- L42: - `assets/scenes/_metadata/scene_metadata.json` — per-scene prim manifests
- L43: - `assets/scenes/_metadata/scene_statistics.json` — aggregate stats
- L44: - `assets/scenes/_images/<scene>.png` — preview images served via `/api/scenes/<file>/image`
- L46: ### Tasks
- L48: Browse benchmark tasks defined under `robolab/tasks/<folder>/`. The folder dropdown defaults to `constants.DEFAULT_TASK_SUBFOLDERS[0]` (i.e. `benchmark`); any other subfolder with `.py` files (e.g. `test_tasks`, `randomize_initial_pose`) can be selected.
- L50: Above the task list, a summary card shows aggregate counts (Tasks · Unique scenes · Avg variants/task · Avg episode length) plus stackable **mini-card filters**: click a difficulty (simple / moderate / complex) or attribute (semantics, spatial, color, …) to filter the list. `Ctrl/Cmd-click` stacks multiple selections (OR within a kind, AND across kinds).
- L52: Per-task detail shows all instruction variants, a clickable scene preview, contact objects, terminations, subtasks, and subtask-stage counts. Click the scene to jump to its detail page.
- L54: Data sources:
- L55: - `robolab/tasks/_metadata/task_metadata.json` — pre-generated task manifest (run the standard `task_metadata` regen step to update)
- L56: - `robolab/tasks/_metadata/task_timing.json` — optional per-task wall-clock timing
- L57: - These JSONs are read directly; the dashboard never imports IsaacLab.
- L61: Add your experiment output directory to the left hand side bar. Each experiment folder must contain Task output folders, and an `episode_results.jsonl`. The dashboard parses each `hdf5` and compiles a report based on the data. If videos are available, they are shown.
- L63: All SR / Score cells carry **95% confidence intervals** with the half-width annotation: `29.7% [24.5–35.4] ±5.4`. SR uses an exact Beta credible interval (see `robolab.core.logging.results.beta_ci_bounds`); Score uses Student-t.
- L67: The default `--host 0.0.0.0` binding makes the dashboard reachable on your machine's LAN IP. Share the URL with a colleague (e.g. `http://<your-lan-ip>:8080`) and they can browse without setting anything up locally. Tighten to `--host 127.0.0.1` if you'd rather keep it loopback-only.

### `docs/statistical_significance.md`
Headings:
- # Statistical Significance and Adaptive Sampling
- ## Adaptive sampling
- ### Why these defaults?
- ### Bounds
- ## Beta credible intervals on success rate
- ## API
- # Stopping decision for one task
- ## See Also
Relevant lines:
- L1: # Statistical Significance and Adaptive Sampling
- L3: Most RoboLab eval runs report a per-task success rate `k / n` over a fixed number of episodes. With small `n`, that point estimate is noisy: 6/10 and 60/100 both round to 60% but carry very different uncertainty. This page covers the tools RoboLab uses to (a) attach a credible interval to every success rate and (b) automatically choose `n` per task so that the interval is informative without burning extra compute on tasks that have already settled.
- L5: ## Adaptive sampling
- L7: Every per-policy runner under `policies/<policy>/run.py` can use the same Beta posterior to decide *when to stop* running episodes for a task. Enable it with `--num-episodes-adaptive`:
- L10: python policies/<policy>/run.py --num-envs 50 --num-episodes-adaptive 200
- L13: When `--num-episodes-adaptive MAX_N` is set:
- L15: - It **overrides** `--num-runs`. The per-task loop becomes a `while` that keeps launching batches of `--num-envs` episodes.
- L16: - After each batch, we compute the 95% Beta credible interval `Beta(k+1, n-k+1)` to check if we need to keep going. The recommended `MAX_N` is **200**, matching the TRI LBM sim protocol (see [Why these defaults?](#why-these-defaults)).
- L17: - The task stops as soon as the 95% Beta credible interval is `<= --ci-pp-width` (default `0.14` ≈ 14 percentage points wide), OR once `n >= MAX_N`.
- L19: The stopping rule depends only on the interval *width*, never on the value of `k/n`, so the resulting estimator remains unbiased. Tasks that are obviously easy (success rate near 0% or 100%) settle quickly because their posteriors concentrate fast; tasks near 50% need more episodes because that is where Beta variance is largest.
- L23: The defaults (`--ci-pp-width 0.14`, `MAX_N = 200`) follow the [TRI LBM sim evaluation](https://arxiv.org/abs/2507.05331), which runs **200 rollouts per task in simulation** (50 in real). At `n=200` the worst-case (k/n=0.5) 95% Beta CI width is ≈ 14pp, so targeting `--ci-pp-width 0.14` with `MAX_N=200` reproduces TRI's effective precision while letting easy tasks (success near 0% or 100%) stop earlier and save compute. `--ci-pp-width 0.14` must be in `(0, 1]`. Tuning guidance:
- L27: | 0.30 | 50 | Fast triage / smoke runs | Most tasks settle near `n_min` |
- L28: | 0.27 | 50 | Match TRI LBM real-world protocol | ~50 episodes for hard tasks |
- L30: | 0.10 | 400+ | Publication-grade precision | Pushes most tasks toward `n_max` |
- L34: - `n_min = 10` — never stop before 10 episodes, regardless of CI width. Prevents an early lucky 0/2 or 2/2 from short-circuiting a task.
- L35: - `n_max = MAX_N` (from the CLI) — hard cap, even if the CI never narrows. Bounds wall-clock spend on intrinsically high-variance tasks.
- L37: > ⚠️ **Compute cost scales linearly with `MAX_N`.** doubling `MAX_N` from 100 → 200 roughly doubles the worst-case wall-clock for any task whose CI doesn't narrow inside the budget (and most "hard" tasks near 50% success rate hit `MAX_N`). If you're GPU-limited, raise `--num-envs` first to investigate how many parallel episodes you can do on your GPU, then raise `MAX_N`.
- L39: Batches are always full `--num-envs` wide, so the actual final `n` is rounded up to the next multiple of `num_envs` (e.g., `n_min=10` with `--num-envs 8` will run 16 episodes minimum).
- L41: ## Beta credible intervals on success rate
- L43: Every success-rate column in `analysis/read_results.py` is reported alongside a 95% Bayesian credible interval. The estimator is the Beta posterior with a uniform `Beta(1, 1)` prior:
- L46: p ~ Beta(k + 1, n - k + 1)
- L49: where `k` is the number of successful episodes and `n` the total. The 95% interval is `[Beta.ppf(0.025), Beta.ppf(0.975)]` of that posterior. This is the same interval shown in the `95% CI` column of the default summary and in the `LCB %` / `UCB %` columns in CSV mode (see [Analysis and Results Parsing](analysis.md#sample-output)).
- L66: from robolab.core.utils.adaptive_sampling import should_continue_sampling, count_task_episodes
- L68: # Stopping decision for one task
- L69: k, n = count_task_episodes(episode_results, env_name="BananaInBowlTask")

### `docs/analysis.md`
Headings:
- # Analysis and Results Parsing
- ## `analysis/read_results.py`
- ### Basic Usage
- ### Summarization Modes
- ### Filtering
- ### Output Format
- ### Display Options
- ### Examples
- # Basic summary for a single run
- # Verbose summary with all details
- # Aggregate results across multiple runs
- # Aggregate with glob pattern
- # Filter to specific tasks
- # Filter by env_name pattern
- # Group results by benchmark category
- # Compare instruction types
- # Export to CSV file
- # Compact CSV for spreadsheets (stddev inline as 'value (± stddev)')
- # Summary with only score and time columns (no trajectory metrics)
- # Show all columns + stddev
- # Wrong object analysis, excluding containers
- ### Sample Output
- ## `analysis/check_results.py`
- # Quick sanity check
- # Full diagnostics
- ## `analysis/compile_results.py`
- ### Mode 1: Compile results to a single file
- ### Mode 2: Merge folders
- # Compile batch results into one file
- # Merge batch folders into one folder
Relevant lines:
- L24: By default, the script prints a per-task summary table with success rate, score, and trajectory metrics. Additional modes provide different views of the same data:
- L28: | *(default)* | Per-task table with success/failure counts, percentages, scores, and trajectory metrics |
- L29: | `--by-attributes` | Groups tasks by benchmark categories (visual, relational, procedural) with attribute breakdowns |
- L31: | `--by-scene` | Aggregates results by scene instead of by task |
- L32: | `--by-wrong-objects` | Per-task breakdown of wrong object grasps: success count, fail count, and which objects were grabbed |
- L40: | `--task TASK [TASK ...]` | Show only the specified task name(s) |
- L42: | `--filter-field FIELD` | Field to apply the filter on. Default: `env_name`. Other options: `task_name`, `scene`, `attributes` |
- L61: The success rate is always shown alongside its 95% Beta-posterior credible interval (`[lcb-ucb]` in human-readable mode; `LCB %` and `UCB %` columns in CSV mode). The interval comes from `Beta(k+1, n-k+1)` with a uniform prior — wide at small N (e.g. 10/10 → `[71.5-99.8]`), tight at large N. See [Statistical Significance and Adaptive Sampling](statistical_significance.md) for details and for the `--num-episodes-adaptive` stopping rule that targets a fixed CI width.
- L78: # Filter to specific tasks
- L79: python analysis/read_results.py 2025-09-02_13-15-34 --task RubiksCubeTask BananaInBowlTask
- L108: The default output includes the success rate, its 95% Beta credible interval, and trajectory metrics columns (EE SPARC, Path Length, Speed):
- L112: Task Name                Success    %     95% CI         Score(total) Score(fail) Time(s) EE SPARC PathLen(m) Speed(cm/s)
- L114: TOTAL (2 tasks)          6/20      30.0%  [13.7-50.7]    0.400        0.143       65.59   -12.86   7.33       2.9
- L116: AnimalsInBinTask         0/10      0.0%   [0.2-28.5]     0.000        0.000       -       -7.49    2.02       2.2
- L117: AppleAndYogurtInBowlTask 6/10      60.0%  [30.8-83.3]    0.800        0.500       65.59   -18.23   12.63      3.5
- L122: - **`Score(total)`**: mean per-episode score across all episodes (successes contribute 1.0; failures contribute their fractional subtask progress in `[0, 1)`).
- L174: Moves task subdirectories and merges results into a single output folder. Aborts if any task folder appears in multiple sources (conflict). Source folders are removed after merge by default.
- L178: python analysis/compile_results.py "pi05_batch*" --merge output_folder --keep  # preserve sources
- L186: | `--merge` | Output folder path (merge mode). Moves task folders + merges results. | — |
- L187: | `--keep` | Keep source folders after merge | `False` (remove) |
- L189: | `--task FILTER` | Filter episodes (e.g., `wrong object`) | `None` |
- L204: Extracts initial camera and object poses from HDF5 files and writes `episode_initial_poses.json`. Useful for analyzing pose distributions or debugging scene initialization.
- L233: ## `scripts/read_subtask_status_from_hdf5.py`
- L235: Reads and displays subtask completion status directly from an HDF5 data file. Extracts timing, status codes, completion flags, and scores for each subtask step during episode execution.
- L239: python scripts/read_subtask_status_from_hdf5.py <hdf5_file> [-e EPISODE]

### `docs/policy.md`
Headings:
- # Evaluating a New Policy
- ## Your Repository Structure
- ## Step 1: Implement an Inference Client
- # my_policy/inference_client.py
- ## Step 2: Write Your Evaluation Script and Run It
- ## Existing Clients as Reference
Relevant lines:
- L1: # Evaluating a New Policy
- L3: This guide walks through how to evaluate your own policy against the RoboLab benchmark. You do **not** need to fork or modify RoboLab — everything can live in your own separate repository that imports `robolab` as a dependency.
- L5: RoboLab uses a **server-client architecture**: your model runs as a standalone server (any framework, any GPU), and a lightweight inference client inside the simulator sends observations and receives actions.
- L12: my_policy_eval/
- L13: my_policy/
- L22: Subclass `robolab.eval.InferenceClient`. The base provides the control loop
- L27: # my_policy/inference_client.py
- L30: from robolab.eval import InferenceClient
- L33: class MyPolicyClient(InferenceClient):
- L95: cd /path/to/my_policy_eval && uv pip install -e .
- L105: # Run on all benchmark tasks
- L106: python run_eval.py --headless
- L108: # Run on a specific task
- L109: python run_eval.py --task BananaInBowlTask
- L111: # Run on a tag of tasks
- L115: python run_eval.py --headless --num-runs 5 --num_envs 2
- L121: 5. **View results**: Results are saved to `output/<timestamp>_my_policy/`. See [Analysis and Results Parsing](analysis.md) for summarization tools.

### `docs/environment_registration.md`
Headings:
- # Environment Registration
- ## When You Need Custom Registration
- ## Step 1: Define Your Observation Config
- # Image observations — generated from a list of camera configs, so the obs terms
- # automatically match whatever cameras you attach to the scene.
- # Proprioception (joint positions, gripper state, EEF pose, etc.)
- # my_policy/observations.py
- ## Step 2: Write a Registration Function
- # my_policy/register_envs.py
- ## Step 3: Verify
- ## Registering Your Own Custom Tasks
- ### Register individual tasks by file path
- ### Auto-discover tasks from your own directory
- ## Example Registration Files
- ## API Reference
- ### Naming Conventions
- ### Environment Name Formula
- ### Querying Environments
- # Query by task name — returns all variants for this task
- # Returns: ["BananaInBowlTaskHomeOffice", "BananaInBowlTaskWarehouse", ...]
- # Query by exact environment name — returns exactly one environment
- # Returns: ["BananaInBowlTaskHomeOffice"]
- # Query by tag — returns all environments with the tag
- # Returns: ["BananaInBowlTaskHomeOffice", "AppleInBowlTaskHomeOffice", ...]
- # Get all environments
- # Returns: all environments
- ### Tags
- ### Configuration Options
- ## Next Steps
Relevant lines:
- L3: This guide covers how to register RoboLab tasks as runnable Gymnasium environments with your specific robot, observations, actions, and simulation settings. You do **not** need to modify RoboLab — registration can be done from your own repository.
- L13: > **If you're using DROID with joint-position actions**, RoboLab ships a ready-to-use registration. You can skip to [Evaluating a New Policy](policy.md), which shows how to use the built-in registration directly.
- L17: Define which sensor data the simulator should provide to your policy. This uses IsaacLab's observation manager.
- L19: **For DROID users:** RoboLab ships a proprioception observation config and a helper that generates an image observation config from any list of camera configs. If these work for your policy, you can skip this step and import/build them directly in Step 2:
- L23: # automatically match whatever cameras you attach to the scene.
- L33: Presets live in `robolab/registrations/droid/camera_presets.py`: `WRIST`, `WRIST_LEFT`, `WRIST_RIGHT`, `WRIST_LEFT_RIGHT`, `WRIST_LEFT_RIGHT_HEAD`, `LEFT_RIGHT`. Pick one or pass your own list. Viewport-only cameras (used for recorded video, not policy input) are attached separately inside the registration function and do not belong in these presets.
- L38: # my_policy/observations.py
- L43: from isaaclab.managers import SceneEntityCfg
- L49: """Camera observations for your policy."""
- L52: params={"sensor_cfg": SceneEntityCfg("over_shoulder_left_camera"), "data_type": "rgb", "normalize": False},
- L56: params={"sensor_cfg": SceneEntityCfg("wrist_cam"), "data_type": "rgb", "normalize": False},
- L70: Create a function that combines the benchmark tasks with your robot, observations, actions, and simulation settings:
- L73: # my_policy/register_envs.py
- L75: from robolab.constants import DEFAULT_TASK_SUBFOLDERS, TASK_DIR
- L78: def register_envs(task_dirs=DEFAULT_TASK_SUBFOLDERS, task=None, cameras=None):
- L95: # The same list feeds both the scene and the image observation group.
- L97: # Or roll your own: `from my_policy.observations import ImageObsCfg` (see Step 1).
- L108: task_dir=TASK_DIR,
- L109: task_subdirs=task_dirs,
- L110: tasks=task,             # None → discover everything in task_subdirs; str/list → only those
- L117: # Policy-observed cameras + the viewport camera (attached for video recording only).
- L142: > **Note:** It is recommended that you check your environments are created correctly before running any policy. You can also run `uv run pytest tests/test_registered_envs.py -v` to verify your registration function populates the env factory.
- L144: ## Registering Your Own Custom Tasks
- L146: The examples above register RoboLab's built-in benchmark tasks (from `TASK_DIR`). If you've created your own tasks (see [Tasks](task.md)), you can register them in the same function.
- L148: ### Register individual tasks by file path

### `docs/task_conditionals.md`
Headings:
- # Task Conditionals
- ## Run a demo
- ## Conditionals:
- ## Frames in spatial conditions
- ## Geometric Containment
- ### `object_in_container` / `object_inside` / `object_outside_of` / `object_enclosed` — Centroid-in-Convex-Hull Check
- #### Mathematical formulation
- #### USD scale handling
- #### Why centroid (not corners or fraction-of-vertices)
- #### Performance
- ## Contact Force Cone Detection
- ### `object_on_top` — Stable Support Detection
- #### Mathematical Formulation
- #### Comparison with Geometric Detection
- #### Usage
- # Check if orange is stably resting on plate
- # Geometric check (e.g., for lifted detection)
- ## Details
- ### Logicals
- ### Function decorators
- #### Atomic Functions
- #### Composite Functions
Relevant lines:
- L1: # Task Conditionals
- L5: To run the conditionals test suite:
- L8: python examples/test_conditionals.py --headless
- L10: The test will use the following test scene:
- L12: <img src="images/conditionals_scene.gif" alt="Conditionals scene" style="max-width:600px;">
- L14: ## Conditionals:
- L15: See [`robolab/robolab/core/task/conditionals.py`](../robolab/core/task/conditionals.py) for implementation details.
- L26: The **`mirrored=False`** (default) uses the robot's natural perspective. Set **`mirrored=True`** for a flipped XY perspective, as if viewing the scene from across the robot.
- L28: <img src="images/conditionals_frame_overlay.png" alt="Frame of Reference Overlay" style="max-width:600px; width:100%;">
- L36: The container's convex hull is built once at scene-load from the prim's mesh points (via `scipy.spatial.ConvexHull`), cached on the `WorldState`, and reused on every per-step evaluation. For "open-top" semantics, the hull's top-facing faces (those with outward normal projecting ≥ 0.7 onto the container's local +z) are dropped, so the polytope is unbounded along the opening direction — an object lifted above the rim still reads as inside.
- L68: Mesh points are extracted via the prim's full local-to-world transform (which absorbs any nested `xformOp:scale` and USD `metersPerUnit` conversions), then re-expressed in the prim's rotated frame **without undoing the scale** (`Gf.Matrix4d.RemoveScaleShear()` keeps only translation+rotation when inverting). This keeps the hull dimensions in world meters regardless of how the source USD was authored — a container in cm with `xformOp:scale = 0.01` produces the same hull as one authored directly in meters at scale 1.
- L81: The hull data (vertices, full plane set, open-top plane set, hull centroid) is precomputed once per body in `LocalHull` (see `robolab/core/task/hull_check.py`) and cached on the `WorldState`. Per-step cost on the hot path: one `quat_apply`, one `quat_apply_inverse`, one $(F, 3) \cdot (3,) + (F,)$ matmul-and-max — fully vectorizable across envs.
- L120: | `object_in_container` / `object_inside` / `object_outside_of` / `object_enclosed` | Centroid of object's hull verts vs container's convex-hull face planes (orientation-invariant; open-top variant drops top faces so the air column above the rim counts as "in") | Containment detection (terminations, subtasks) |
- L144: Base functions; can be used for task `Terminations` as well as `subtasks`.
- L147: These expand into multiple atomic subtasks. These cannot be used for `Terminations`.

### `docs/task_libraries.md`
Headings:
- # Task Libraries
- ## Building Your Own Task Library
- ## Directory Structure
- ## Using Your Task Library
- ## Generating and Updating Task Metadata
- ### Generate metadata (JSON, CSV, and README table)
- ### View task statistics
- # Summary of task attributes and difficulty distribution
- # Full report (attributes, objects, subtasks, episodes, scenes)
- # Individual analysis sections
- ### Save a report to file
- ### Validate tasks
- # Validate the built-in benchmark tasks
- ## Keeping Metadata Up to Date
- ## See Also
Relevant lines:
- L1: # Task Libraries
- L3: A **task library** is a collection of [task definitions](task.md) organized into subfolders under a common root directory. RoboLab ships a built-in library in [`robolab/tasks/`](../robolab/tasks/), but you can create and maintain your own task library in a separate repository.
- L5: ## Building Your Own Task Library
- L7: To build a task library, write `Task` dataclasses with USD scenes, language instructions, and termination criteria. See [Creating Tasks](task.md) for the full authoring guide. Once you have tasks, see [Environment Registration](environment_registration.md) for how to register and run them.
- L9: The rest of this page covers how to organize your tasks into a library and use RoboLab's utility scripts to generate metadata and statistics.
- L13: A task library follows this layout:
- L16: my_task_library/
- L17: scenes/
- L18: scene_a.usda
- L19: scene_b.usda
- L20: tasks/
- L24: _metadata/                  # Auto-generated by the metadata scripts
- L25: task_metadata.json
- L26: task_table.csv
- L29: - **`scenes/`** — USD scene files used by your tasks (see [Scenes](scene.md))
- L30: - **`tasks/`** — Task definition Python files, one per task
- L31: - **`_metadata/`** — Auto-generated metadata (JSON, CSV, markdown table)
- L33: Each task file defines a `Task` dataclass that binds a scene to language instructions and termination criteria. See [Creating Tasks](task.md) for the full authoring guide.
- L35: ## Using Your Task Library
- L37: Once you have task files, register them as runnable Gymnasium environments so they can be instantiated by your evaluation script. Your library does not need to live inside the RoboLab repo. See [Environment Registration](environment_registration.md) for the full workflow.
- L39: ## Generating and Updating Task Metadata
- L41: RoboLab provides utility scripts for generating metadata, README tables, and statistics for your task library. These live in [`robolab/tasks/_utils/`](../robolab/tasks/_utils/README.md) and work with **any** task directory — you point them at your own library the same way RoboLab uses them internally.
- L45: | `generate_task_metadata.py` | Scan task files and produce JSON, CSV, and a README table |
- L46: | `compute_task_statistics.py` | Analyze metadata: attributes, difficulty, objects, subtasks, episodes, scenes |
- L47: | `load_task_info.py` | Importable helpers for extracting metadata from task classes programmatically |

### `docs/known_issues.md`
Headings:
- # Known Issues
- ## GPU VRAM leak in non-headless mode across environment reloads
- ## Rendering artefacts
Relevant lines:
- L1: # Known Issues
- L3: ## GPU VRAM leak in non-headless mode across environment reloads
- L5: When running **without** `--headless` (i.e., with the GUI viewport enabled), GPU VRAM usage grows each time an environment is created and destroyed. After cycling through enough scenes, this will eventually cause an out-of-memory crash.
- L7: **Root cause:** In GUI mode, the Omniverse Kit viewport creates a Hydra render product and associated GPU textures to display the scene. When `env.close()` is called, IsaacLab clears the `SimulationContext` singleton and deletes the `ViewportCameraController`, but the **underlying Kit viewport and its Hydra render product persist** across stage reloads. Each subsequent `create_env()` call triggers `omni.usd.get_context().new_stage()`, which allocates new Hydra scene delegates and GPU-side textures for the viewport without fully releasing the previous ones. This is an IsaacLab 2.2.0 / Omniverse Kit issue — the viewport lifecycle is not tied to the `SimulationContext` lifecycle.
- L9: In headless mode, the viewport context and window are never created (`_viewport_context = None`, `_viewport_window = None`), so there is no viewport render product to leak.
- L11: **Workaround:** Always use `--headless` when running multi-task evaluations that cycle through many environments. If you need the GUI for debugging, limit your run to a small number of scenes (roughly fewer than 10, depending on GPU VRAM and camera resolution).
- L15: When a new environment is created and loaded, artefacts from the previous scene will remain and disappear slowly. This is an IsaacLab/RTX issue. Please refer to appropriate bug reporting for IsaacLab/Sim sources.

### `docs/debug.md`
Headings:
- # Debugging
- ## Flags
- ### `VERBOSE`
- ### `DEBUG`
- ### `VISUALIZE`
- ## World State Visualization
- # Visualize all tracked objects
- # Visualize specific objects only
- ## Combining Flags
- ## World State Inspection
- # Object geometry
- # Contact queries
- ## Diagnostic Scripts
- ### Verify environment registration
- ### Verify tasks are valid
- ### Run one full episode
- ### Verify IsaacLab installation
- ### Inspect HDF5 data
- ### Read subtask status from HDF5
- ### Check results integrity
- ## Known Issues
Relevant lines:
- L14: - **Subtask state machine** — Prints the current subtask state and object tracker after each state change
- L34: Prints per-step conditional evaluation results. This is very detailed and produces output every simulation step — useful for diagnosing why a specific subtask condition is or isn't being satisfied.
- L36: Covers all conditional functions in `robolab.core.task.conditionals`:
- L45: - Subtask state machine advancement and regression
- L71: When enabled, every step calls `get_world(env).visualize()`, which draws the oriented bounding box and coordinate axes for each object in the scene.
- L104: | `DEBUG` | Task logic (conditional evaluations, subtask state transitions) | High — prints every step |
- L136: After registration, print a table of all registered environments to confirm tasks were discovered correctly:
- L145: Or use the pytest test:
- L148: uv run pytest tests/test_registered_envs.py -v
- L151: ### Verify tasks are valid
- L153: Check that all task files load correctly, have valid fields, and no duplicate names:
- L156: uv run pytest tests/test_tasks_valid.py -v                 # all tasks
- L157: uv run pytest tests/test_tasks_valid.py -v -k BananaInBowl # one task
- L162: Run a single empty-action episode end-to-end (useful for confirming a task launches and terminates correctly):
- L165: uv run pytest tests/test_run_empty.py -v                   # default: BananaInBowlTask
- L166: uv run pytest tests/test_run_empty.py -v --task RubiksCubeTask
- L174: uv run pytest tests/test_isaaclab.py -v
- L182: h5glance output/2026-01-24_15-35-59/BananaInBowlTask/run_0.hdf5
- L185: ### Read subtask status from HDF5
- L187: Print subtask completion timeline, status codes, and scores from recorded episodes:
- L190: python scripts/read_subtask_status_from_hdf5.py output/.../run_0.hdf5
- L191: python scripts/read_subtask_status_from_hdf5.py output/.../run_0.hdf5 -e 0
- L205: ## Known Issues
- L207: See [Known Issues](known_issues.md).

### `docs/env_vram_size_guide.md`
Headings:
- # Per-Task `num_envs` Ceiling on 48 GB VRAM GPUs
- ## Summary
- ## Per-task ceiling (alphabetical within each bin)
- ### `num_envs = 100` (31 tasks)
- ### `num_envs = 90` (20 tasks)
- ### `num_envs = 80` (42 tasks)
- ### `num_envs = 70` (26 tasks)
- ### `num_envs = 60` (1 task)
- ## How this was measured
- ## When to consult this guide
Relevant lines:
- L1: # Per-Task `num_envs` Ceiling on 48 GB VRAM GPUs
- L3: This is a report on the maximum `num_envs` each RoboLab benchmark task can run with on a single L40 GPU (48GB VRAM) headlessly. Depending on how much load of the GPU is used for other applications, you may consult this guide as an  **upper bound** for `--num-envs` on RTX GPUs with 48GB memory.
- L7: ## Per-task ceiling (alphabetical within each bin)
- L9: ### `num_envs = 100` (31 tasks)
- L11: - `BagelsOnPlateTask`
- L12: - `BananaInBowlTask`
- L13: - `BananaOnPlateTask`
- L14: - `BananaThenRubiksCubeTask`
- L15: - `BlockStackingOrderAgnosticTask`
- L16: - `BlockStackingSpecifiedOrderTask`
- L17: - `BowlInBinTask`
- L18: - `BowlStackingLeftOnRightTask`
- L19: - `BowlStackingRightOnLeftTask`
- L20: - `ButterAboveRaisinTask`
- L21: - `ClampInRightBinTask`
- L22: - `FoodPacking1BoxesTask`
- L23: - `FoodPacking1CansTask`
- L24: - `LargerObjectRaisinBoxInBinTask`
- L25: - `MustardAboveRaisinTask`
- L26: - `MustardInLeftBinTask`
- L27: - `MustardInRightBinTask`
- L28: - `NonHammerToolsInRightBinTask`
- L29: - `RedDishesInBinTask`
- L30: - `RedItemsInBinTask`
- L31: - `RubiksCubeAndBananaTask`

### `policies/README.md`
Headings:
- # Inference Clients and Policy Server Setup
- ## The `InferenceClient` contract
- ## Common CLI Options
- # Run on all benchmark tasks headlessly
- # Run on a specific task
- # Run on a tag of tasks
- # Run multiple runs per task (total episodes = num_runs * num_envs)
- # Resume a previous run
- # Enable subtask checking
Relevant lines:
- L1: # Inference Clients and Policy Server Setup
- L3: RoboLab uses a **server-client architecture**: your model runs as a standalone server process, and RoboLab connects to it through a lightweight inference client during evaluation.
- L5: Each `policies/<policy>/` folder is one backend and contains:
- L7: - `client.py` — the concrete `InferenceClient` subclass that speaks WebSocket / ZMQ / HTTP to a remote policy server.
- L8: - `run.py` — the runner script. Defines policy-specific argparse flags, builds a `make_client(args)` closure, and calls `run_evaluation(args, policy="<name>", client_factory=make_client)`.
- L12: ## The `InferenceClient` contract
- L14: All concrete clients inherit from the `InferenceClient` ABC in `robolab/eval/base_client.py`:
- L17: from robolab.eval import InferenceClient
- L19: class InferenceClient(ABC):
- L33: client = Pi0DroidJointposClient(remote_host="localhost", remote_port=8000, policy_variant="pi05")
- L36: For writing your own inference client, see [Evaluating a New Policy](../docs/policy.md).
- L41: Use `policies/<policy>/run.py`
- L44: # Run on all benchmark tasks headlessly
- L45: uv run python policies/<policy>/run.py --headless
- L47: # Run on a specific task
- L48: uv run python policies/<policy>/run.py --task BananaInBowlTask
- L50: # Run on a tag of tasks
- L51: uv run python policies/<policy>/run.py --tag pick_place
- L53: # Run multiple runs per task (total episodes = num_runs * num_envs)
- L54: uv run python policies/<policy>/run.py --headless --num-runs 5 --num-envs 2
- L57: uv run python policies/<policy>/run.py --headless --output-folder-name my_previous_run
- L59: # Enable subtask checking
- L60: uv run python policies/<policy>/run.py --headless --enable-subtask

### `policies/cosmos3/README.md`
Headings:
- # Cosmos 3
- ## Server
- # Set your Hugging Face token (https://huggingface.co/settings/tokens):
- ## Client
Relevant lines:
- L3: [**Cosmos 3**](https://huggingface.co/collections/nvidia/cosmos3) is a suite of omnimodal world models designed to jointly process and generate language, images, video, audio, and action sequences. This directory provides the RoboLab client for [**Cosmos3-Nano-Policy-DROID**](https://huggingface.co/nvidia/Cosmos3-Nano-Policy-DROID), a World-Action Model (WAM) obtained by post-training Cosmos 3 on the [DROID](https://droid-dataset.github.io/) dataset.
- L5: [`client.py`](./client.py) provides the `Cosmos3Client` class that connects to a policy server hosting Cosmos3-Nano-Policy-DROID over the OpenPI WebSocket protocol. `Cosmos3Client` requires the [`openpi-client`](https://github.com/Physical-Intelligence/openpi/tree/main/packages/openpi-client) package.
- L7: Below is a quickstart for bringing up the policy server and running an evaluation from a RoboLab client.
- L47: --group=policy-server && \
- L52: Inside the container, start the policy server:
- L55: python -m cosmos_framework.scripts.action_policy_server_robolab \
- L80: Run a task against the policy server. This opens a viewer window for real-time visualization of the simulation:
- L84: --task BananaInBowlTask
- L87: To evaluate across multiple sub-environments in parallel in headless mode:
- L91: --task BananaInBowlTask \
- L92: --num-envs 10 \
- L93: --headless

### `.claude/skills/robolab-scenegen/SKILL.md`
Headings:
- # Scene Generation
- ## Reference Files
- ## Prerequisites
- ## When Invoked
- ## After the User Provides Information
- ## Predicate Solver Pipeline
- ### Step 1: Generate predicates JSON
- #### Available predicate types
- #### Coordinate system
- ### Step 2: Parse predicates into ObjectStates
- # Parse objects
- # Parse predicates
- # Add default placement for objects without predicates
- # Solve spatial constraints
- # Solve physical constraints
- # Check grammar
- # Output results
- ### Step 3: Handle solver failures
- ## Scene File Generation
- ### Step 1: Read base_empty.usda
- ### Step 2: Build object prim blocks
- ### Step 3: Rewrite inherited payload paths (subdir scenes only)
- ### Step 4: Insert into base scene
- ### Step 5: Write the file
- ## Duplicate Object Names
- ## After Generating the Scene File
- ### Step 0: Find the correct Python interpreter
- ### Step 1: Settle the scene (physics simulation)
- ### Step 2: Show the screenshot to the user
- ### Step 3: Display next steps
Relevant lines:
- L2: name: robolab-scenegen
- L4: Generate USD scene files for RoboLab from natural language descriptions.
- L5: Use this skill when a user wants to create a new scene with objects on a table,
- L6: or asks to arrange objects for a robot manipulation task.
- L9: Requires a RoboLab project with assets/scenes/base_empty.usda and assets/objects/object_catalog.json.
- L10: metadata:
- L15: # Scene Generation
- L17: Generate USD scene files (`.usda`) from natural language descriptions of tabletop arrangements.
- L19: A **scene** is a USDA file that places objects on the table in `base_empty.usda`. Scenes are robot-agnostic — they define only what objects exist and where they are positioned.
- L25: - `references/scene_format.md` — USD scene format, coordinate system, placement rules, and examples
- L27: - `references/predicates.md` — Predicate types, JSON format, and common patterns for the solver pipeline
- L31: - `assets/scenes/base_empty.usda` exists (the base scene template)
- L36: When the user invokes this skill, display the following message **verbatim**:
- L40: I'll help you generate a USD scene file. I need a few things:
- L42: 1. **Scene name** — What should the file be called? Must end in `.usda` (e.g., `fruits_bowl.usda`, `kitchen_sorting.usda`). Use snake_case.
- L43: 2. **Scene description** — What should be on the table? (e.g., "a bowl with some fruits around it", "kitchen items for a cooking task", "3 blocks stacked near a container")
- L44: 3. **Number of objects** — How many objects? (default: 3-5 for simple scenes)
- L45: 4. **Output directory** — Where should I save the scene?
- L46: - `assets/scenes/` (standard location)
- L47: - `assets/scenes/generated/` (for generated scenes)
- L75: 1. **Always ask the user for the output directory on the first invocation.** Do not assume a default — you must wait for the user to confirm a directory before writing any file. Once the user has chosen a directory, reuse it for all subsequent scenes in the same session without asking again.
- L76: 2. **Validate the scene name** ends with `.usda`. If not, append `.usda` and confirm with the user.
- L77: 3. **Check for duplicate scene names.** If a file with the same name already exists at the output path, warn the user and ask them to choose a different name. Do not overwrite existing scene files.
- L83: 5. **Read `references/scene_format.md`** for the exact USDA format, coordinate system, and placement rules.
- L85: 7. **Generate predicates and solve placements** using the predicate solver pipeline (see [Predicate Solver Pipeline](#predicate-solver-pipeline)).

### `.claude/skills/robolab-taskgen/SKILL.md`
Headings:
- # Task Generation
- ## Reference Files
- ## Prerequisites
- ## When Invoked
- # banana_in_bowl_task.py
- ## After the User Provides Information
- ## Information to Gather
- ## Intent Routing
- ## Task File Template
- ### Importing Scenes
- ## Step-by-Step Generation Workflow
- ## Instruction Variants
- # Correct:
- # Wrong (will cause dataclass error):
- ## Subtask Decomposition
- ### When to add subtasks
- ### Using composite functions
- ### Using raw Subtask for custom conditions
- ### Scoring
- ## Attribute Tags
- ## After Generating the Task File
- ## Further Reading
Relevant lines:
- L2: name: robolab-taskgen
- L4: Generate RoboLab task files from natural language descriptions of robot manipulation goals.
- L5: Use this skill when a user wants to create, write, or generate a new task definition,
- L6: or asks how to define success conditions, terminations, subtasks, or instructions for
- L7: a robot manipulation task.
- L10: Requires a RoboLab project with access to robolab.core.task and a USD scene file.
- L11: metadata:
- L16: # Task Generation
- L18: Generate complete RoboLab task files from natural language descriptions.
- L20: A **task** is a Python file containing a `Task` dataclass that binds a USD scene to a language instruction and termination criteria. Tasks are agnostic to the robot, observation space, and action space.
- L26: - `references/conditionals.md` — Complete conditional function reference with signatures and parameters
- L31: - A USD scene file (`.usda`) already exists with the objects needed for the task. See `docs/scene.md` for creating scenes.
- L32: - Object names used in the task must match the prim names in the USD scene.
- L36: When the user invokes this skill, display the following message **verbatim**:
- L40: I'll help you generate a RoboLab task file. I need a few things:
- L42: 1. **Scene file** — Either:
- L43: - A filename (e.g., `banana_bowl.usda`) if the scene is in `robolab/assets/scenes/`
- L45: 2. **Task instruction** — What should the robot do? (e.g., "Pick up the banana and place it in the bowl"). This becomes the `default` instruction; I'll generate `vague` and `specific` variants automatically unless you provide them.
- L46: 3. **Episode length** — How long should the robot have to complete the task, in seconds? (e.g., 50 for a simple pick-and-place, 90-120 for multi-step tasks)
- L47: 4. **Output directory** — Where should I save the task file?
- L48: - `robolab/tasks/benchmark/`
- L49: - `robolab/tasks/<name>/` — give me a folder name and I'll create it
- L52: Here's an example of what I'll generate — a file called `banana_in_bowl_task.py`:
- L55: # banana_in_bowl_task.py
- L66: class BananaInBowlTask(Task):

### `pyproject.toml`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
- # -- uv configuration --
- # warp-lang 1.13.0.dev20260418 on pypi.nvidia.com only published the macOS
- # wheel — no Linux build — so any resolver pass that picked it would break
- # `uv sync` on Linux. Exclude that specific version.
- # flatdict 4.0.1 ships sdist-only and its legacy setup.py needs an older
- # setuptools plus `wheel` to build. Building in an isolated PEP 517 env
- # (i.e. NOT in `no-build-isolation-package`) lets these deps apply
- # deterministically regardless of what's in the project venv.
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0
- L10: license = {text = "Apache-2.0"}
- L41: # Dashboard (robolab-dashboard CLI); kept in the default install since
- L50: test = ["pytest"]
- L51: all = ["sbi", "pytest"]
- L54: robolab-dashboard = "dashboard.cli:main"
- L61: include = ["robolab", "robolab.*", "policies", "policies.*", "dashboard", "dashboard.*"]
- L64: dashboard = ["templates/*.html", "static/*"]
- L72: # wheel — no Linux build — so any resolver pass that picked it would break
- L92: [tool.uv.sources]
- L96: [tool.pytest.ini_options]
- L108: known-third-party = ["isaaclab", "isaaclab_assets", "isaaclab_mimic", "isaaclab_rl", "isaaclab_tasks"]

### `dashboard/app.py`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0
- L4: """FastAPI app for the RoboLab eval results dashboard."""
- L15: from dashboard.loaders.catalog import (
- L16: build_scene_index,
- L17: default_task_folder,
- L18: filter_scene_prims,
- L19: filter_tasks_by_folder,
- L20: get_task,
- L21: list_task_folders,
- L22: validate_task_folder,
- L23: load_scene_stats,
- L24: load_scenes,
- L25: load_tasks,
- L26: resolve_scenes_metadata_dir,
- L27: task_summary,
- L29: from dashboard.loaders.hdf5 import episode_timeseries, list_episode_keys
- L30: from dashboard.loaders.local import LocalLoader, _score_ci, _sr_beta_ci
- L31: from dashboard.loaders.sources import SourceRegistry
- L36: def _resolve_dt(task_dir: Path, env_id: int, run_index: int) -> float | None:
- L48: cfg_path = task_dir / "env_cfg.json"
- L60: task_dir / f"log_{run_index}_env{env_id}.json",
- L61: task_dir / f"log_{env_id}.json",
- L75: return {"n": 0, "s": 0, "runs": set(), "tasks": set(), "score_means": []}
- L91: def create_app(initial_dir: Path | None = None, scenes_dir: Path | None = None) -> FastAPI:
- L94: ``initial_dir`` is optional. When provided AND the persisted source list

### `dashboard/loaders/catalog.py`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
- # Prims we don't want to surface as "objects" — they're scaffolding the user
- # doesn't care about when browsing scene contents.
- # ---- tasks ----------------------------------------------------------------
- # ---- scenes ---------------------------------------------------------------
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0
- L4: """Read pre-generated task + scene metadata.
- L8: task modules themselves would pull in IsaacLab, which the dashboard
- L11: * Tasks ship inside the package: ``robolab/tasks/_metadata/``
- L12: - task_metadata.json: [{task_name, instruction, instruction_variants,
- L13: scene, contact_objects, attributes,
- L15: - task_timing.json:   [{task_name, wall_total_s, policy_inference_avg_ms,
- L17: * Scenes live alongside the assets, NOT in this worktree's sparse-checkout:
- L18: - scene_metadata.json:   {scene_filename: [prim_dict, …]}
- L19: - scene_statistics.json: {total_scenes, total_unique_objects, …}
- L30: # doesn't care about when browsing scene contents.
- L31: _SCENE_PRIM_SKIP = {
- L32: "Looks", "PhysicsScene", "PhysicsMaterial", "GroundPlane",
- L49: # ---- tasks ----------------------------------------------------------------
- L51: def task_metadata_path() -> Path:
- L52: """Path to the bundled task_metadata.json.
- L58: return Path(rc.PACKAGE_DIR) / "robolab" / "tasks" / "_metadata" / "task_metadata.json"
- L61: def task_timing_path() -> Path:
- L63: return Path(rc.PACKAGE_DIR) / "robolab" / "tasks" / "_metadata" / "task_timing.json"
- L66: def load_tasks() -> list[dict]:
- L67: """Return the merged task list. Each entry includes timing fields when
- L68: they exist in task_timing.json for the same task name."""
- L69: meta_p = task_metadata_path()
- L72: tasks = _load_json(str(meta_p), _safe_mtime(meta_p))
- L73: if not isinstance(tasks, list):

### `dashboard/loaders/local.py`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
- # Beta credible interval for SR — exact match to robolab.core.logging.results.
- # lru_cache on (k, n) makes repeat lookups (very common: many buckets at the
- # same n) free after the first call. 4096 entries comfortably covers a
- # multi-thousand-task benchmark with mixed sample sizes.
- # Student-t CI for the score mean. For n>=30 it's effectively a normal CI;
- # for small n it widens correctly. Same lru_cache trick.
- # ---- mtime-keyed memoization -----------------------------------------------
- #
- # The (path, mtime) trick: lru_cache keys on both the path AND a mtime int.
- # When the underlying file changes on disk, its mtime moves, so the next call
- # creates a fresh cache entry instead of returning stale data. Old entries
- # eventually evict by lru_cache's size cap.
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0
- L7: A run contains one subdir per task; each task subdir has ``data.hdf5``,
- L11: source for per-episode metrics. Older runs may only have per-env JSONs;
- L21: from robolab.core.logging.results import beta_ci_bounds, load_and_merge_episode_data
- L24: # Beta credible interval for SR — exact match to robolab.core.logging.results.
- L27: # multi-thousand-task benchmark with mixed sample sizes.
- L29: def _sr_beta_ci(k: int, n: int) -> tuple[float, float]:
- L32: lo, hi = beta_ci_bounds(k, n)
- L88: import h5py  # local; importing at module top would slow `import dashboard`
- L123: task: str
- L128: score: float | None     # subtask completion ratio (0..1); None if not recorded
- L136: timing: dict = field(default_factory=dict)  # policy_inference_avg_ms, env_step_avg_ms, …
- L137: policy: str | None = None
- L144: class TaskSummary:
- L145: task: str
- L149: sr_lcb: float                # 95% Beta credible interval bounds for SR
- L162: run_id: str             # qualified run id (source_basename/dir_name when needed)
- L164: source: str             # absolute path to the source dir containing it
- L165: policy: str | None
- L166: num_tasks: int
- L175: Run IDs are typically the run directory's basename. If two source dirs
- L177: with ``<source_basename>/`` to disambiguate.
- L180: def __init__(self, sources: list[Path] | Path):
- L181: if isinstance(sources, (str, Path)):
- L182: sources = [Path(sources)]

### `dashboard/loaders/hdf5.py`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
- # obs signals we know about; first match wins. Used for the IsaacLab recorder layout
- # where /data/<ep>/obs/proprio_obs/<name>.
- # cosmos3-style layout: episode-level datasets, no /obs group.
- # ee_pose/* gets surfaced as flat ee_<leaf> series.
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0

### `robolab/eval/runner.py`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0
- L4: """Shared evaluation driver: argparse helpers + per-task run loop.
- L6: Each per-policy script under ``policies/<policy>/run.py``:
- L10: 3. Launches IsaacSim and registers envs (policy-specific camera presets etc.).
- L11: 4. Defines a ``client_factory(args) -> InferenceClient`` closure.
- L12: 5. Calls :func:`run_evaluation` with the policy name and the factory.
- L14: This module stays policy-agnostic — no backend names appear in it.
- L19: into :func:`run_evaluation`, which only runs *after* AppLauncher has set up
- L28: from robolab.constants import DEFAULT_TASK_SUBFOLDERS
- L31: from robolab.eval.base_client import InferenceClient
- L33: ClientFactory = Callable[[argparse.Namespace], InferenceClient]
- L47: parser.add_argument("--num-envs", "--num_envs", type=int, default=1,
- L49: parser.add_argument("--task", nargs="+", default=None,
- L50: help="List of tasks to evaluate on.")
- L52: help="List of tags of tasks to evaluate on.")
- L53: parser.add_argument("--task-dirs", "--task_dirs", nargs="+", default=DEFAULT_TASK_SUBFOLDERS,
- L54: help="List of task directories to evaluate on.")
- L55: parser.add_argument("--num-runs", "--num_runs", type=int, default=1,
- L56: help=("Number of sequential runs per task (default: 1). "
- L58: "Prefer increasing --num-envs for more episodes. "
- L59: "Only increase --num-runs if you run out of GPU memory "
- L60: "with the desired num-envs."))
- L61: parser.add_argument("--num-episodes-adaptive", "--num_episodes_adaptive",
- L63: help=("Enable adaptive sampling per task. Overrides --num-runs. "
- L65: "Beta credible interval on success rate is <= --ci-pp-width "

### `robolab/eval/base_client.py`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
- # This file is the source of truth. A verbatim copy lives at
- # droid_plus/eval/base_client.py — keep both in sync when editing.
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0
- L4: # This file is the source of truth. A verbatim copy lives at
- L13: class InferenceClient(ABC):
- L14: """Root client for policy inference.
- L33: different observation sources without duplicating the wire format.
- L81: """Release transport resources. Default: no-op."""

### `robolab/core/logging/results.py`
Headings:
- # SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
- # SPDX-License-Identifier: Apache-2.0
- # ANSI color codes for terminal output
- # ============================================================================
- # Processing Info Functions
- # ============================================================================
- # Container object patterns to exclude from wrong object grabbed counts
- # ============================================================================
- # Experiment Functions
- # ============================================================================
- # ============================================================================
- # Result Processing Functions
- # ============================================================================
- # ============================================================================
- # Printing Functions for episode_results.json
- # ============================================================================
- # ============================================================================
- # Printing Functions for HDF5 files
- # ============================================================================
- # ============================================================================
- # Formatting Functions
- # ============================================================================
- # ============================================================================
- # Loading Data Functions
- # ============================================================================
- # Known metric fields that can be loaded from episode_metrics.json
- # Trajectory metrics (smoothness, path length, speed)
Relevant lines:
- L2: # SPDX-License-Identifier: Apache-2.0
- L14: from scipy.stats import beta as scipy_beta
- L16: from robolab.constants import BENCHMARK_TASK_CATEGORIES, TASK_DIR
- L17: from robolab.core.task.status import StatusCode, get_status_name
- L21: def beta_ci_bounds(k: int, n: int, confidence: float = 0.95) -> tuple[float, float]:
- L22: """95% Beta(k+1, n-k+1) credible interval bounds for a binomial success rate.
- L25: the posterior is Beta(k+1, n-k+1). Numerically very close to the Wilson CI
- L30: alpha = 1 - confidence
- L31: return tuple(scipy_beta.ppf([alpha / 2, 1 - alpha / 2], k + 1, n - k + 1))
- L56: def filter_episodes_by_task(episode_results: list[dict],
- L57: tasks: str | list[str] | None) -> list[dict]:
- L59: Filter episode results by task name(s).
- L63: tasks: Single task name, list of task names, or None to return all episodes
- L66: Filtered list of episodes matching the specified task(s)
- L68: if tasks is None:
- L71: # Convert single task to list for uniform handling
- L72: if isinstance(tasks, str):
- L73: tasks = [tasks]
- L75: filtered = [ep for ep in episode_results if ep.get("env_name") in tasks]
- L79: raise ValueError(f"No episodes found for task(s): {tasks}. Available env_names are: {available}")
- L92: field: Field to filter by (e.g., 'env_name', 'task_name', 'scene', 'attributes')
- L161: if "Object out of scene:" in reason:
- L162: return "Object out of scene"
- L231: counting each grab event (after consecutive deduplication in extract_subtask_status_changes).
- L446: def extract_subtask_info(info):

## Design-surface synthesis notes
- Installation/governance shifted from CC-BY-NC repo framework language to Apache-2.0 code license plus third-party notices, system `ffmpeg`, `uv run pytest tests/` as install verification, and documented EULA handling outside the test suite.
- Evaluation entrypoints moved from `examples/policy/run_eval.py` style toward `policies/<backend>/run.py`, with `policies/README.md` documenting the `InferenceClient` subclass contract and per-backend `client.py` / `run.py` / README layout.
- Dashboard became a first-class default dependency and CLI (`robolab-dashboard`), implemented as a FastAPI app with persisted result sources, scene/task catalog APIs, episode video/timeseries/event endpoints, and result overview endpoints.
- Reporting now emphasizes uncertainty: success-rate cells show 95% Beta credible intervals; adaptive sampling uses Beta posterior interval width to stop per-task evaluation once precision target or max episodes is reached.
- Debug/operational docs now include pytest diagnostic scripts, WorldState inspection, non-headless viewport VRAM leak warning, rendering artifact caveat, and an L40 per-task `num_envs` upper-bound guide.
- Agentic workflows are packaged as Claude Code skills for scene and task generation. Scene generation uses an object catalog and predicate solver pipeline; task generation maps natural-language goals to `Task` dataclasses, instruction variants, conditionals, and subtasks.
- Asset churn is dominated by removal of `_wip` assets and metadata/image updates; this is best treated as curation/maintenance unless specific assets change benchmark semantics.
