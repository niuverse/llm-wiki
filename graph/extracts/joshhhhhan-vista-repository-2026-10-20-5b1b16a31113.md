# joshhhhhan/VISTA 固定版本原始文件读取缓存

标准提取器不支持 tgz；按成员路径逐字解码 UTF-8，未摘要。代码核查范围在来源页说明。


## vista-c97c354/.dockerignore

````text
*

````


## vista-c97c354/.env.example

````text
# Create your own key at https://three.arcprize.org.
ARC_API_KEY=
ARC_BASE_URL=https://three.arcprize.org

# Optional: generated locally with `claude setup-token` for Claude Code runs.
CLAUDE_CODE_OAUTH_TOKEN=
# Optional additional Claude accounts for pooled competition runs.
# CLAUDE_CODE_OAUTH_TOKEN_2=
# CLAUDE_CODE_OAUTH_TOKEN_3=

````


## vista-c97c354/.gitignore

````text
.env
.env.*
!.env.example
.claude/
.codex/
.venv
.venv/
__pycache__/
*.py[cod]
*.egg-info/
.pytest_cache/
.ruff_cache/
build/
dist/

# VISTA run artifacts. These can include raw grids, model transcripts,
# scorecard ids, and local Codex session state.
runs
runs/
run_logs/
recordings/
environment_files/
experiments/

# Local editor/system files.
.DS_Store

# Benchmark checkouts made by scripts/env_setup/.
local
local/

````


## vista-c97c354/Dockerfile.claude-player

````text
FROM ubuntu:22.04

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        ca-certificates \
        bubblewrap \
        python3 \
    && rm -rf /var/lib/apt/lists/*

````


## vista-c97c354/Dockerfile.codex-player

````text
FROM ubuntu:22.04

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        ca-certificates \
        python3 \
    && rm -rf /var/lib/apt/lists/*

````


## vista-c97c354/LICENSE

````text
MIT License

Copyright (c) 2026 VISTA contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

````


## vista-c97c354/README.md

````text
# VISTA: A Visual Harness for Reasoning in an Interactive World

[![arXiv](https://img.shields.io/badge/arXiv-2610.02200-b31b1b.svg)](https://arxiv.org/abs/2610.02200)
[![Blog](https://img.shields.io/badge/Blog-VISTA-327a62.svg)](https://vista-research.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

VISTA is a visual harness that lets multimodal models actively reorganize their
visual input as they reason through long-horizon tasks. It combines visual
observations, lossless visual memory, and model-directed inspection.

![VISTA playing ARC-AGI-3, GameWorld and AI GameStore games](assets/vista-benchmarks.gif)

With Claude Opus 5.0, VISTA achieves a Relative Human Action Efficiency (RHAE)
score of 100 on the 25 public ARC-AGI-3 games.

Scorecards:

| Runtime | Model | Effort | RHAE |
| --- | --- | --- | ---: |
| Codex CLI | GPT-5.6 Sol | max | [99](https://arcprize.org/scorecards/abda28e2-d605-4e81-9efc-cf63dda06df5) |
| Claude Code | Opus 5.0 | xhigh | [100](https://arcprize.org/scorecards/39be671a-d0cc-48b4-ae08-1db4abc44c83) |

## Interface

VISTA preserves visual observations as retrievable memory. Agents can revisit
earlier observations and inspect selected regions as needed during a task.

Available tools:

- use `play` to execute a game action;
- use `inspect` to revisit selected visual frames and regions;
- use `read_pixels` to read numerical pixel values from selected image regions;
- use `history` to revisit prior actions and environment results;
- use `GUIDE.md` and `WORKING.md` for persistent and working memory.

## Setup

VISTA runs on Linux x86_64 with Python 3.12, Docker Engine, and either
Codex CLI 0.145.0 or Claude Code 2.1.220. ARC-AGI-3 batch runs also require `tmux`.
Online and competition ARC-AGI-3 runs require an API key.

From a repository checkout, install the Python package:

```bash
python3.12 -m venv .venv
.venv/bin/python -m pip install --upgrade pip
.venv/bin/python -m pip install -e .
cp .env.example .env
chmod 600 .env
```

For ARC-AGI-3, sign in to the [ARC Prize platform](https://arcprize.org/platform),
create a key under your profile's **API Keys**, and add it to `.env`:

```dotenv
ARC_API_KEY=your-key
ARC_BASE_URL=https://three.arcprize.org
```

### Codex CLI

```bash
npm install --prefix ~/.local/share/arc3-codex/0.145.0 \
  --omit=dev --no-audit --no-fund @openai/codex@0.145.0
~/.local/share/arc3-codex/0.145.0/node_modules/.bin/codex login
```

### Claude Code

```bash
curl -fsSL https://claude.ai/install.sh | bash -s 2.1.220
~/.local/share/claude/versions/2.1.220 setup-token
```

Add the generated token to `.env`:

```dotenv
CLAUDE_CODE_OAUTH_TOKEN=your-token
```

### Docker

Build the image for the runtime you will use:

```bash
# Codex CLI
docker build -t arc3-codex-player:0.1 -f Dockerfile.codex-player .

# Claude Code
docker build -t arc3-claude-player:0.1 -f Dockerfile.claude-player .
```

## Run

### ARC-AGI-3

Run one game with Codex:

```bash
.venv/bin/vista --profile arc3 --backend codex \
  --game-id s5i5 \
  --operation-mode online \
  --model gpt-5.6-sol \
  --effort max
```

Run one game with Claude:

```bash
.venv/bin/vista --profile arc3 --backend claude \
  --game-id s5i5 \
  --operation-mode online \
  --model opus \
  --effort xhigh
```

Run all games:

```bash
./scripts/run_batch.sh --runtime codex --mode online \
  --model gpt-5.6-sol --effort max -j 2
./scripts/run_batch.sh --runtime claude --mode online \
  --model opus --effort xhigh -j 2
```

Available modes are `online` and `competition`. `offline` is also available when
local game files are supplied through `ENVIRONMENTS_DIR`.

### GameWorld

Prepare the GameWorld environment:

```bash
./scripts/env_setup/gameworld.sh
export GAMEWORLD_ROOT="$PWD/local/GameWorld"
export GAMES_ROOT="$PWD/local/GameWorld-Games"

# One task
.venv/bin/vista --profile gameworld --backend codex run \
  --gameworld-root "$GAMEWORLD_ROOT" --games-root "$GAMES_ROOT" \
  --game 01_2048 --task 01_01 --model gpt-5.6-sol --effort max \
  --output runs/gameworld-single

# All 170 tasks across 34 games
./scripts/run_gameworld_batch.sh --backend codex \
  --model gpt-5.6-sol --effort max -j 2
```

### AI GameStore

Prepare the AI GameStore environment:

```bash
./scripts/env_setup/aigamestore.sh
export AIGAMESTORE_GAMES_ROOT="$PWD/local/aigamestore/games"

# One game
.venv/bin/vista --profile aigamestore --backend codex run \
  --games-root "$AIGAMESTORE_GAMES_ROOT" --game 1 \
  --model gpt-5.6-sol --effort max --output runs/aigamestore-single

# All 10 games
./scripts/run_aigamestore_batch.sh --backend codex \
  --model gpt-5.6-sol --effort max -j 2
```

### BabyVision

BabyVision answers questions about static images using `inspect` and `read_pixels`.

Download the dataset and install its dependencies:

```bash
./scripts/env_setup/babyvision.sh
export BABYVISION_ROOT="$PWD/local/BabyVision"

# One question
.venv/bin/vista --profile babyvision --backend codex run \
  --task-id 666 --model gpt-5.6-sol --effort max \
  --output runs/babyvision-single

# The 39 Maze and Connect the Lines questions used in the paper
./scripts/run_babyvision_batch.sh --backend codex \
  --model gpt-5.6-sol --effort max -j 2 \
  --subtypes 'Maze|Connect the lines'
```

## Citation

```bibtex
@misc{han2026vista,
  title         = {{VISTA}: A Visual Harness for Reasoning in an Interactive World},
  author        = {Han, Qiushi and Hu, Keya and Qiu, Linlu and Wu, Cathy and He, Kaiming},
  year          = {2026},
  eprint        = {2610.02200},
  archivePrefix = {arXiv},
  url           = {https://arxiv.org/abs/2610.02200}
}
```

````


## vista-c97c354/pyproject.toml

````text
[build-system]
requires = ["setuptools>=77"]
build-backend = "setuptools.build_meta"

[project]
name = "vista-arc3"
version = "0.1.0"
description = "VISTA visual agent interface for ARC-AGI-3"
readme = "README.md"
license = "MIT"
license-files = ["LICENSE"]
requires-python = ">=3.12,<3.13"
authors = [
  { name = "Qiushi Han" },
  { name = "Keya Hu" },
  { name = "Linlu Qiu" },
  { name = "Cathy Wu" },
  { name = "Kaiming He" },
]
dependencies = [
  "arc-agi==0.9.9",
  "arcengine==0.9.3",
  "jsonschema>=4.23,<5",
  "numpy==2.5.1",
  "pillow==12.2.0",
  "python-dotenv==1.2.2",
  "requests==2.34.2",
  "urllib3==2.7.0",
]

[project.optional-dependencies]
gameworld = [
  "playwright==1.45.0",
  "PyYAML>=6.0,<7",
  "Jinja2>=3.1,<4",
]
aigamestore = [
  "playwright==1.45.0",
]
babyvision = [
  # The official answer extraction uses the `regex` engine's recursive groups.
  "regex>=2024.11",
]
dev = [
  "ruff==0.16.3",
]

[project.scripts]
vista = "vista.cli:main"
vista-gameworld = "vista.benchmarks.gameworld.cli:main"
vista-aigamestore = "vista.benchmarks.aigamestore.cli:main"
vista-babyvision = "vista.benchmarks.babyvision.cli:main"

[project.urls]
Homepage = "https://vista-research.github.io/"

[tool.setuptools.package-data]
vista = ["core/prompts/*.md", "benchmarks/arc3/codex/*.md", "benchmarks/arc3/claude/*.md"]
"vista.benchmarks.aigamestore" = ["public_games.json"]

[tool.ruff]
target-version = "py312"

[tool.ruff.lint]
select = ["E4", "E7", "E9", "F", "I"]

[tool.ruff.lint.per-file-ignores]
"src/vista/benchmarks/arc3/claude/controller.py" = ["F401"]
"src/vista/benchmarks/arc3/claude/harness.py" = ["F401"]
"src/vista/benchmarks/arc3/codex/controller.py" = ["F401"]

[tool.ruff.lint.isort]
combine-as-imports = true

````


## vista-c97c354/scripts/env_setup/aigamestore.sh

````text
#!/usr/bin/env bash
# Prepare the AI GameStore environment: the extras, a Chromium, and the
# benchmark's own repository, of which only games/ is used here.
#
#   ./scripts/env_setup/aigamestore.sh [--dest DIR] [--python PATH] [--no-install]
set -euo pipefail
usage() { sed -n '2,/^[^#]/p' "${BASH_SOURCE[0]}" | sed '$d; s/^# \{0,1\}//'; }
source "$(dirname "${BASH_SOURCE[0]}")/common.sh"
parse_common_args "$@"

# Pinned upstream checkout supplying the game assets.
AIGAMESTORE_REVISION=5a7c7a2c536c3599cd2e5b7b1987a382392ca0f2

install_extras aigamestore
install_chromium
clone_pinned https://github.com/lance-ying/aigamestore_harness.git \
  "$DEST/aigamestore" "$AIGAMESTORE_REVISION"

cat <<EOF

AI GameStore is ready. Point the runtime at it:

  export AIGAMESTORE_GAMES_ROOT=$DEST/aigamestore/games
EOF

````


## vista-c97c354/scripts/env_setup/babyvision.sh

````text
#!/usr/bin/env bash
# Prepare the BabyVision environment: the extras and the benchmark's own
# repository, whose images and answer key ship as a zip inside data/.
#
#   ./scripts/env_setup/babyvision.sh [--dest DIR] [--python PATH] [--no-install]
set -euo pipefail
usage() { sed -n '2,/^[^#]/p' "${BASH_SOURCE[0]}" | sed '$d; s/^# \{0,1\}//'; }
source "$(dirname "${BASH_SOURCE[0]}")/common.sh"
parse_common_args "$@"

install_extras babyvision
clone_pinned https://github.com/UniPat-AI/BabyVision.git \
  "$DEST/BabyVision" "$(pin_from src/vista/benchmarks/babyvision/dataset.py BABYVISION_REVISION)"

say "unpacking the dataset in place"
python3 -m zipfile -e "$DEST/BabyVision/data/babyvision_data.zip" "$DEST/BabyVision/data"

cat <<EOF

BabyVision is ready. Point the runtime at it:

  export BABYVISION_ROOT=$DEST/BabyVision
EOF

````


## vista-c97c354/scripts/env_setup/common.sh

````text
# Shared helpers for the per-benchmark environment scripts. Sourced, not run.
#
# Every setup script is idempotent: running it again on an existing checkout
# fetches the pinned revision and checks it out rather than failing.

ROOT=$(cd "$(dirname "${BASH_SOURCE[1]}")/../.." && pwd)
PYTHON=${VISTA_PYTHON:-"$ROOT/.venv/bin/python"}
DEST=${VISTA_LOCAL_DIR:-"$ROOT/local"}

parse_common_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --dest) DEST="$2"; shift 2 ;;
      --python) PYTHON="$2"; shift 2 ;;
      --no-install) SKIP_INSTALL=1; shift ;;
      -h|--help) usage; exit 0 ;;
      *) echo "Unknown argument: $1" >&2; usage; exit 2 ;;
    esac
  done
}

say() { printf '\n== %s\n' "$*"; }

install_extras() {
  [[ ${SKIP_INSTALL:-0} == 1 ]] && { say "skipping pip install (--no-install)"; return; }
  [[ -x $PYTHON ]] || {
    echo "No interpreter at $PYTHON. Create the venv first (see README Setup) or pass --python." >&2
    exit 2
  }
  say "installing $1"
  "$PYTHON" -m pip install -e "$ROOT[$1]"
}

install_chromium() {
  [[ ${SKIP_INSTALL:-0} == 1 ]] && return
  say "installing Chromium and its system dependencies (root or sudo required)"
  "$PYTHON" -m playwright install --with-deps chromium
  "$PYTHON" - <<'PY'
from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    browser.close()
PY
}

# pin_from <file> <constant name> -- the revision as the code records it, so the
# checkout and the runtime can never disagree about which upstream this is.
pin_from() {
  local value
  value=$(sed -n "s/^$2 = \"\([0-9a-f]\{40\}\)\"$/\1/p" "$ROOT/$1")
  [[ -n $value ]] || { echo "Cannot read $2 from $1" >&2; exit 2; }
  printf '%s' "$value"
}

# clone_pinned <url> <directory> <revision>
clone_pinned() {
  local url="$1" dir="$2" revision="$3"
  mkdir -p "$(dirname "$dir")"
  if [[ -d $dir/.git ]]; then
    say "$dir exists; fetching ${revision:0:12}"
    git -C "$dir" fetch --quiet origin "$revision" 2>/dev/null || git -C "$dir" fetch --quiet origin
  else
    say "cloning $url into $dir"
    git clone --quiet "$url" "$dir"
  fi
  git -C "$dir" checkout --quiet --detach "$revision"
  echo "   $dir is at $(git -C "$dir" rev-parse --short HEAD)"
}

````


## vista-c97c354/scripts/env_setup/gameworld.sh

````text
#!/usr/bin/env bash
# Prepare the GameWorld environment: the extras, a Chromium, and both halves of
# the benchmark at the revisions this runtime is pinned to.
#
#   ./scripts/env_setup/gameworld.sh [--dest DIR] [--python PATH] [--no-install]
set -euo pipefail
usage() { sed -n '2,/^[^#]/p' "${BASH_SOURCE[0]}" | sed '$d; s/^# \{0,1\}//'; }
source "$(dirname "${BASH_SOURCE[0]}")/common.sh"
parse_common_args "$@"

install_extras gameworld
install_chromium

# Upstream splits the benchmark in two, and both halves are needed: the runtime,
# task catalogue and evaluator (~20 MB), and the games themselves -- HTML,
# JavaScript and art (~220 MB).
clone_pinned https://github.com/gameworld-project/GameWorld.git \
  "$DEST/GameWorld" "$(pin_from src/vista/benchmarks/gameworld/upstream.py GAMEWORLD_REVISION)"
clone_pinned https://github.com/gameworld-project/GameWorld-Games.git \
  "$DEST/GameWorld-Games" "$(pin_from src/vista/benchmarks/gameworld/upstream.py GAMES_REVISION)"

cat <<EOF

GameWorld is ready. Point the runtime at it:

  export GAMEWORLD_ROOT=$DEST/GameWorld GAMES_ROOT=$DEST/GameWorld-Games
EOF

````


## vista-c97c354/scripts/run_aigamestore_batch.sh

````text
#!/usr/bin/env bash
# Play several AI GameStore games with bounded parallelism.
#
# The CLI runs its planned games sequentially; this driver launches one CLI
# process per game so that -j games play at once, each with its own output
# directory under a batch directory:
#
#   <runs>/<batch>/game<N>/           one `vista-aigamestore run` output
#   <runs>/<batch>/game<N>.log        that process's stdout/stderr
#   <runs>/<batch>/driver.log         start/finish lines
#   <runs>/<batch>/batch.json         the driver's own settings
#
# Every knob is an argument or environment variable; nothing is inferred from
# the shell profile. CODEX_HOME is unset on purpose: the runner prepares its own.
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
PYTHON=${AIGS_PYTHON:-"$ROOT/.venv/bin/python"}
CLI=${AIGS_CLI:-"$ROOT/.venv/bin/vista-aigamestore"}
RUNS_DIR=${AIGS_RUNS_DIR:-"$ROOT/runs"}
RUNTIME_HOME=${AIGS_HOME:-"$HOME"}
BROWSERS=${PLAYWRIGHT_BROWSERS_PATH:-}
CODEX_BIN=${AIGS_CODEX_BIN:-}

JOBS=2
BATCH_ID="aigs"
BACKEND="codex"
MODEL="gpt-5.6-sol"
EFFORT="max"
REPEATS=1
GAMES_ROOT=${AIGAMESTORE_GAMES_ROOT:-}
AUTH_FILE=${CODEX_AUTH_FILE:-"$HOME/.codex/auth.json"}
GAMES=(1 2 3 4 5 6 7 8 9 10)
EXTRA=()

usage() {
  cat <<'EOF'
usage: run_aigamestore_batch.sh [options] [-- extra CLI args]
  -j N                parallel games (default 2)
  --batch-id NAME     batch directory prefix (default aigs)
  --games-root DIR    the harness checkout's games/ (default $AIGAMESTORE_GAMES_ROOT)
  --backend codex
  --model M --effort E
  --repeats N         independent runs per game (default 1)
  --auth-file PATH    Codex auth.json (default ~/.codex/auth.json)
  --games "1 2 3"     public game numbers (default all ten)
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -j) JOBS="$2"; shift 2 ;;
    --batch-id) BATCH_ID="$2"; shift 2 ;;
    --backend) BACKEND="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --repeats) REPEATS="$2"; shift 2 ;;
    --games-root) GAMES_ROOT="$2"; shift 2 ;;
    --auth-file) AUTH_FILE="$2"; shift 2 ;;
    --games) IFS=' ' read -ra GAMES <<< "$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    --) shift; EXTRA=("$@"); break ;;
    *) echo "Unknown argument: $1" >&2; usage; exit 2 ;;
  esac
done

[[ $BACKEND == codex ]] || { echo "--backend must be codex" >&2; exit 2; }
[[ $JOBS =~ ^[1-9][0-9]*$ ]] || { echo "-j must be a positive integer" >&2; exit 2; }
[[ $REPEATS =~ ^[1-9][0-9]*$ ]] || { echo "--repeats must be a positive integer" >&2; exit 2; }
[[ ${#GAMES[@]} -gt 0 ]] || { echo "No games selected" >&2; exit 2; }
[[ -n $GAMES_ROOT && -d $GAMES_ROOT ]] || { echo "--games-root (or AIGAMESTORE_GAMES_ROOT) must name the harness checkout's games/ directory" >&2; exit 2; }
[[ -n $AUTH_FILE && -f $AUTH_FILE ]] || { echo "no Codex auth.json at $AUTH_FILE; run codex login or pass --auth-file" >&2; exit 2; }
[[ -x $CLI ]] || { echo "CLI not found: $CLI (pip install -e '.[aigamestore]')" >&2; exit 2; }

STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BATCH_DIR="$RUNS_DIR/${BATCH_ID}_${STAMP}"
mkdir -p "$BATCH_DIR"
LOG="$BATCH_DIR/driver.log"

log() {
  printf '%s | %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" | tee -a "$LOG"
}

"$PYTHON" - "$BATCH_DIR/batch.json" "$BATCH_ID" "$BACKEND" "$MODEL" "$EFFORT" \
  "$REPEATS" "$GAMES_ROOT" "$JOBS" "${GAMES[*]}" <<'PY'
import json, sys
from pathlib import Path
path, batch_id, backend, model, effort, repeats, games_root, jobs, games = sys.argv[1:]
Path(path).write_text(json.dumps({
    "benchmark": "AI GameStore",
    "batch_id": batch_id,
    "backend": backend,
    "model": model,
    "effort": effort,
    "repeats": int(repeats),
    "games_root": games_root,
    "jobs": int(jobs),
    "games": [int(g) for g in games.split()],
}, indent=2) + "\n")
PY

log "BEGIN $BATCH_ID -- $BACKEND $MODEL/$EFFORT repeats=$REPEATS jobs=$JOBS games=${GAMES[*]}"
log "games root $GAMES_ROOT"
log "batch dir $BATCH_DIR"

run_one() {
  local game="$1"
  local out="$BATCH_DIR/game${game}"
  local glog="$BATCH_DIR/game${game}.log"
  log "start game$game"
  local args=(
    run --games-root "$GAMES_ROOT" --game "$game"
    --backend "$BACKEND" --model "$MODEL" --effort "$EFFORT"
    --repeats "$REPEATS"
    --output "$out"
  )
  args+=(--auth-file "$AUTH_FILE")
  [[ -n $CODEX_BIN ]] && args+=(--binary "$CODEX_BIN")
  local code=0
  env -u CODEX_HOME HOME="$RUNTIME_HOME" \
    ${BROWSERS:+PLAYWRIGHT_BROWSERS_PATH="$BROWSERS"} \
    "$CLI" "${args[@]}" "${EXTRA[@]}" >"$glog" 2>&1 || code=$?
  log "done  game$game (exit $code)"
  return "$code"
}

active=0
pids=()
for game in "${GAMES[@]}"; do
  run_one "$game" &
  pids+=("$!")
  active=$((active + 1))
  if [[ $active -ge $JOBS ]]; then
    wait -n || true
    active=$((active - 1))
  fi
done
failed=0
for pid in "${pids[@]}"; do
  wait "$pid" || failed=1
done

"$PYTHON" - "$BATCH_DIR" "$REPEATS" "${GAMES[*]}" <<'PY' | tee -a "$LOG"
import json, sys
from pathlib import Path
from vista.benchmarks.aigamestore.run import aggregate
batch, repeats, games = Path(sys.argv[1]), int(sys.argv[2]), [int(g) for g in sys.argv[3].split()]
results = [json.loads(p.read_text()) for p in sorted(batch.glob("game*/game*__*/result.json"))]
summary = [aggregate(results, game_numbers=games, repeats=repeats)]
(batch / "batch_summary.json").write_text(json.dumps(summary, indent=2) + "\n")
for row in summary:
    print(f"{row['scored']}/{row['planned']} scored, "
          f"geometric mean {row['geometric_mean_normalized']}")
if not all(row["complete"] for row in summary):
    raise SystemExit(1)
PY

log "END   $BATCH_ID (exit $failed)"
exit "$failed"

````


## vista-c97c354/scripts/run_arc3_batch.py

````text
#!/usr/bin/env python3
from vista.benchmarks.arc3.batch import main

if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/scripts/run_babyvision_batch.sh

````text
#!/usr/bin/env bash
# Answer a BabyVision question set with bounded parallelism.
#
# The CLI runs its planned questions sequentially; this driver launches one
# CLI process per question so that -j questions run at once, each with its own
# output directory under a batch directory:
#
#   <runs>/<batch>/task<ID>/          one `vista-babyvision run` output
#   <runs>/<batch>/task<ID>.log       that process's stdout/stderr
#   <runs>/<batch>/driver.log         start/finish lines
#   <runs>/<batch>/batch.json         the driver's own settings
#   <runs>/<batch>/batch_summary.json accuracy at the end
#
# Every knob is an argument or environment variable; nothing is inferred from
# the shell profile. CODEX_HOME is unset on purpose: the runner prepares its own.
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
PYTHON=${BV_PYTHON:-"$ROOT/.venv/bin/python"}
CLI=${BV_CLI:-"$ROOT/.venv/bin/vista-babyvision"}
RUNS_DIR=${BV_RUNS_DIR:-"$ROOT/runs"}
RUNTIME_HOME=${BV_HOME:-"$HOME"}
CODEX_BIN=${BV_CODEX_BIN:-}
BABYVISION_ROOT=${BABYVISION_ROOT:-}

JOBS=2
BATCH_ID="bv"
BACKEND="codex"
MODEL="gpt-5.6-sol"
EFFORT="max"
PASSES=1
TASK_SET="tracking48"
TASK_IDS=()
SUBTYPES=()
AUTH_FILE=${CODEX_AUTH_FILE:-"$HOME/.codex/auth.json"}
EXTRA=()

usage() {
  cat <<'EOF2'
usage: run_babyvision_batch.sh [options] [-- extra CLI args]
  -j N                  parallel questions (default 2)
  --batch-id NAME       batch directory prefix (default bv)
  --babyvision-root DIR pinned checkout (default $BABYVISION_ROOT)
  --backend codex
  --model M --effort E
  --passes N            passes per question (default 1; official reporting uses 3)
  --task-set S          full | tracking48 (default tracking48)
  --task-ids "1 2 3"    explicit task ids (overrides the task set)
  --subtypes "A|B"      explicit subtypes, '|'-separated (overrides the task set)
  --auth-file PATH      Codex auth.json (default ~/.codex/auth.json)
EOF2
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -j) JOBS="$2"; shift 2 ;;
    --batch-id) BATCH_ID="$2"; shift 2 ;;
    --babyvision-root) BABYVISION_ROOT="$2"; shift 2 ;;
    --backend) BACKEND="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --passes) PASSES="$2"; shift 2 ;;
    --task-set) TASK_SET="$2"; shift 2 ;;
    --task-ids) IFS=' ' read -ra TASK_IDS <<< "$2"; shift 2 ;;
    --subtypes) IFS='|' read -ra SUBTYPES <<< "$2"; shift 2 ;;
    --auth-file) AUTH_FILE="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    --) shift; EXTRA=("$@"); break ;;
    *) echo "Unknown argument: $1" >&2; usage; exit 2 ;;
  esac
done

[[ $BACKEND == codex ]] || { echo "--backend must be codex" >&2; exit 2; }
[[ $JOBS =~ ^[1-9][0-9]*$ ]] || { echo "-j must be a positive integer" >&2; exit 2; }
[[ $PASSES =~ ^[1-9][0-9]*$ ]] || { echo "--passes must be a positive integer" >&2; exit 2; }
[[ -n $BABYVISION_ROOT && -f $BABYVISION_ROOT/data/babyvision_data/meta_data.jsonl ]] || {
  echo "--babyvision-root (or BABYVISION_ROOT) must name an unpacked checkout" >&2; exit 2; }
[[ -n $AUTH_FILE && -f $AUTH_FILE ]] || { echo "no Codex auth.json at $AUTH_FILE; run codex login or pass --auth-file" >&2; exit 2; }
[[ -x $CLI ]] || { echo "CLI not found: $CLI (pip install -e '.[babyvision]')" >&2; exit 2; }

# The question set is resolved once, by the CLI, so the driver and the runs
# agree on it exactly.
select_args=(--babyvision-root "$BABYVISION_ROOT" --task-set "$TASK_SET")
for id in "${TASK_IDS[@]:-}"; do [[ -n $id ]] && select_args+=(--task-id "$id"); done
for st in "${SUBTYPES[@]:-}"; do [[ -n $st ]] && select_args+=(--subtype "$st"); done
question_list=$("$CLI" list "${select_args[@]}" | "$PYTHON" -c 'import json,sys; [print(q["task_id"]) for q in json.load(sys.stdin)["questions"]]')
[[ -n $question_list ]] || { echo "No questions selected" >&2; exit 2; }
mapfile -t QUESTIONS <<< "$question_list"

STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BATCH_DIR="$RUNS_DIR/${BATCH_ID}_${STAMP}"
mkdir -p "$BATCH_DIR"
LOG="$BATCH_DIR/driver.log"

log() {
  printf '%s | %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" | tee -a "$LOG"
}

"$PYTHON" - "$BATCH_DIR/batch.json" "$BATCH_ID" "$BACKEND" "$MODEL" "$EFFORT" \
  "$PASSES" "$TASK_SET" "$JOBS" "${QUESTIONS[*]}" "$BABYVISION_ROOT" <<'PY'
import json, sys
from pathlib import Path
path, batch_id, backend, model, effort, passes, task_set, jobs, questions, root = sys.argv[1:]
Path(path).write_text(json.dumps({
    "benchmark": "BabyVision",
    "batch_id": batch_id,
    "backend": backend,
    "model": model,
    "effort": effort,
    "passes": int(passes),
    "task_set": task_set,
    "babyvision_root": root,
    "jobs": int(jobs),
    "questions": [int(q) for q in questions.split()],
}, indent=2) + "\n")
PY

log "BEGIN $BATCH_ID -- $BACKEND $MODEL/$EFFORT passes=$PASSES jobs=$JOBS questions=${#QUESTIONS[@]}"
log "batch dir $BATCH_DIR"

run_one() {
  local task="$1"
  local out="$BATCH_DIR/task${task}"
  local tlog="$BATCH_DIR/task${task}.log"
  log "start task$task"
  local args=(
    run --babyvision-root "$BABYVISION_ROOT" --task-id "$task"
    --backend "$BACKEND" --model "$MODEL" --effort "$EFFORT"
    --passes "$PASSES"
    --output "$out"
  )
  args+=(--auth-file "$AUTH_FILE")
  [[ -n $CODEX_BIN ]] && args+=(--binary "$CODEX_BIN")
  local code=0
  env -u CODEX_HOME HOME="$RUNTIME_HOME" \
    "$CLI" "${args[@]}" "${EXTRA[@]}" >"$tlog" 2>&1 || code=$?
  log "done  task$task (exit $code)"
  return "$code"
}

active=0
pids=()
for task in "${QUESTIONS[@]}"; do
  run_one "$task" &
  pids+=("$!")
  active=$((active + 1))
  if [[ $active -ge $JOBS ]]; then
    wait -n || true
    active=$((active - 1))
  fi
done
failed=0
for pid in "${pids[@]}"; do
  wait "$pid" || failed=1
done

"$CLI" score --runs "$BATCH_DIR" > "$BATCH_DIR/batch_summary.json"
"$PYTHON" - "$BATCH_DIR/batch_summary.json" <<'PY' | tee -a "$LOG"
import json, sys
rows = json.load(open(sys.argv[1]))
for row in rows:
    print(f"{row['correct']}/{row['planned']} correct "
          f"({row['completed']} completed), mean accuracy {row['mean_accuracy']} [{row['score_source']}]")
if not rows or any(row["completed"] != row["planned"] for row in rows):
    raise SystemExit(1)
PY

log "END   $BATCH_ID (exit $failed)"
exit "$failed"

````


## vista-c97c354/scripts/run_batch.sh

````text
#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
SCRIPT="$ROOT/scripts/run_batch.sh"
PYTHON=${ARC3_PYTHON:-"$ROOT/.venv/bin/python"}
ENV_FILE=${ARC3_ENV_FILE:-"$ROOT/.env"}
CODEX_BIN=${ARC3_CODEX_BIN:-"$HOME/.local/share/arc3-codex/0.145.0/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/bin/codex"}
CLAUDE_BIN=${ARC3_CLAUDE_BIN:-"$HOME/.local/share/claude/versions/2.1.220"}
RUNS_DIR=${ARC3_COMPETITION_RUNS_DIR:-"$ROOT/runs/competition"}
SOCKET=${ARC3_TMUX_SOCKET:-arc3-competition}
RUNTIME=${ARC3_COMPETITION_RUNTIME:-codex}
OPERATION_MODE=${ARC3_COMPETITION_OPERATION_MODE:-competition}
MODEL=${ARC3_COMPETITION_MODEL:-}
EFFORT=${ARC3_COMPETITION_EFFORT:-}
MAX_STEPS=${ARC3_COMPETITION_MAX_STEPS:-2000}
CONCURRENCY=${ARC3_COMPETITION_CONCURRENCY:-}
CLAUDE_WORKERS_PER_ACCOUNT=${ARC3_CLAUDE_WORKERS_PER_ACCOUNT:-2}
TIMEOUT=${ARC3_COMPETITION_TIMEOUT:-300}
MAX_INVALID_RETRIES=${ARC3_COMPETITION_MAX_INVALID_RETRIES:-15}
BATCH_ID=${ARC3_COMPETITION_BATCH_ID:-vista}
MIN_FREE_GIB=${ARC3_COMPETITION_MIN_FREE_GIB:-100}
ALLOW_CONCURRENT_ONLINE=${ARC3_COMPETITION_ALLOW_CONCURRENT_ONLINE:-false}
ALLOW_CONCURRENT_COORDINATOR=${ARC3_COMPETITION_ALLOW_CONCURRENT_COORDINATOR:-false}
INTERNAL_SUPERVISOR=false
if [[ ${1:-} == __supervise ]]; then
  INTERNAL_SUPERVISOR=true
  shift
fi

fail() {
  printf 'competition runner error: %s\n' "$*" >&2
  exit 1
}

if [[ $INTERNAL_SUPERVISOR != true ]]; then
  mode_set=false
  for argument in "$@"; do
    case $argument in
      --mode|--operation-mode|-h|--help)
        mode_set=true
        ;;
    esac
  done
  [[ $mode_set == true ]] \
    || fail "choose --mode offline, online, or competition"
fi

configure_runtime() {
  case $RUNTIME in
    codex)
      MODEL=${MODEL:-gpt-5.6-sol}
      EFFORT=${EFFORT:-max}
      CONCURRENCY=${CONCURRENCY:-2}
      PLAYER_IMAGE=arc3-codex-player:0.1
      PLAYER_DOCKERFILE="$ROOT/Dockerfile.codex-player"
      ;;
    claude)
      MODEL=${MODEL:-opus}
      EFFORT=${EFFORT:-xhigh}
      CONCURRENCY=${CONCURRENCY:-2}
      PLAYER_IMAGE=arc3-claude-player:0.1
      PLAYER_DOCKERFILE="$ROOT/Dockerfile.claude-player"
      ;;
    *)
      fail "--runtime must be codex or claude"
      ;;
  esac
}

usage() {
  cat <<EOF
Usage: ./scripts/run_batch.sh [options]

Run every available environment on one shared ARC scorecard.

Options:
  --runtime RUNTIME
  --mode offline|online|competition
  --operation-mode MODE       Alias for --mode.
  -j, --concurrency N
  --claude-workers-per-account N
  --model MODEL
  --effort LEVEL
  --max-steps N
  --timeout SECONDS
  --max-invalid-retries N
  --batch-id ID
  --runs-dir PATH
  -h, --help

By default, the command refuses to start while another ARC run is active. Set
ARC3_COMPETITION_ALLOW_CONCURRENT_ONLINE=true to permit separate online runs.
Set ARC3_COMPETITION_ALLOW_CONCURRENT_COORDINATOR=true only when account capacity
is coordinated explicitly. A non-scoring preflight runs immediately before the
scorecard is opened.
EOF
}

while (($# > 0)); do
  case $1 in
    --runtime)
      RUNTIME=${2:?}
      shift 2
      ;;
    --mode|--operation-mode)
      OPERATION_MODE=${2:?}
      shift 2
      ;;
    -j|--concurrency)
      CONCURRENCY=${2:?}
      shift 2
      ;;
    --claude-workers-per-account)
      CLAUDE_WORKERS_PER_ACCOUNT=${2:?}
      shift 2
      ;;
    --model)
      MODEL=${2:?}
      shift 2
      ;;
    --effort)
      EFFORT=${2:?}
      shift 2
      ;;
    --max-steps)
      MAX_STEPS=${2:?}
      shift 2
      ;;
    --timeout)
      TIMEOUT=${2:?}
      shift 2
      ;;
    --max-invalid-retries)
      MAX_INVALID_RETRIES=${2:?}
      shift 2
      ;;
    --batch-id)
      BATCH_ID=${2:?}
      shift 2
      ;;
    --runs-dir)
      RUNS_DIR=${2:?}
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      fail "unknown option: $1"
      ;;
  esac
done

configure_runtime
[[ $OPERATION_MODE == offline \
  || $OPERATION_MODE == online \
  || $OPERATION_MODE == competition ]] \
  || fail "--mode must be offline, online, or competition"
[[ $CONCURRENCY =~ ^[1-9][0-9]*$ ]] || fail "invalid concurrency"
[[ $CLAUDE_WORKERS_PER_ACCOUNT =~ ^[1-9][0-9]*$ ]] \
  || fail "invalid Claude workers per account"
[[ $MAX_STEPS =~ ^[1-9][0-9]*$ ]] || fail "invalid max steps"
[[ $TIMEOUT =~ ^[1-9][0-9]*$ ]] || fail "invalid timeout"
[[ $MAX_INVALID_RETRIES =~ ^[0-9]+$ ]] || fail "invalid retry count"
[[ $BATCH_ID =~ ^[A-Za-z0-9_-]+$ ]] || fail "invalid batch id"
[[ $ALLOW_CONCURRENT_ONLINE == true || $ALLOW_CONCURRENT_ONLINE == false ]] \
  || fail "ARC3_COMPETITION_ALLOW_CONCURRENT_ONLINE must be true or false"
[[ $ALLOW_CONCURRENT_COORDINATOR == true \
  || $ALLOW_CONCURRENT_COORDINATOR == false ]] \
  || fail "ARC3_COMPETITION_ALLOW_CONCURRENT_COORDINATOR must be true or false"
if [[ $RUNTIME == claude ]]; then
  [[ $EFFORT =~ ^(low|medium|high|xhigh|max)$ ]] \
    || fail "invalid Claude effort"
else
  [[ $EFFORT =~ ^(minimal|low|medium|high|xhigh|max|ultra)$ ]] \
    || fail "invalid Codex effort"
fi

load_environment() {
  local selected_mode=$OPERATION_MODE
  [[ -r "$ENV_FILE" ]] || fail "ARC environment file missing: $ENV_FILE"
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
  export OPERATION_MODE="$selected_mode"
}

env_file_has_value() {
  "$PYTHON" - "$ENV_FILE" "$1" <<'PY'
import sys
from dotenv import dotenv_values

value = dotenv_values(sys.argv[1]).get(sys.argv[2])
raise SystemExit(0 if value else 1)
PY
}

runtime_version() {
  if [[ $RUNTIME == codex ]]; then
    "$CODEX_BIN" --version
  else
    local -a clean_env=(env -u ARC_API_KEY -u ANTHROPIC_API_KEY)
    local name
    while IFS= read -r name; do
      clean_env+=(-u "$name")
    done < <(compgen -A variable CLAUDE_CODE_OAUTH_TOKEN)
    "${clean_env[@]}" "$CLAUDE_BIN" --version
  fi
}

check_prerequisites() {
  if [[ $INTERNAL_SUPERVISOR == true ]]; then
    load_environment
  else
    [[ -r "$ENV_FILE" ]] || fail "ARC environment file missing: $ENV_FILE"
  fi
  [[ -x "$PYTHON" ]] || fail "Python runtime not found: $PYTHON"
  command -v docker >/dev/null || fail "docker is not installed"
  command -v git >/dev/null || fail "git is not installed"
  command -v tmux >/dev/null || fail "tmux is not installed"
  docker info >/dev/null 2>&1 || fail "Docker is unavailable"
  docker image inspect "$PLAYER_IMAGE" >/dev/null 2>&1 \
    || fail "Docker image $PLAYER_IMAGE is missing"
  if [[ $RUNTIME == codex ]]; then
    [[ -r "$HOME/.codex/auth.json" ]] || fail "Codex auth missing under HOME=$HOME"
    [[ -x "$CODEX_BIN" ]] || fail "Codex runtime is missing: $CODEX_BIN"
  else
    [[ -x "$CLAUDE_BIN" ]] || fail "Claude Code runtime is missing: $CLAUDE_BIN"
    [[ $(runtime_version) == "2.1.220 (Claude Code)" ]] \
      || fail "Claude Code 2.1.220 is required"
    if [[ $INTERNAL_SUPERVISOR == true ]]; then
      [[ -n ${CLAUDE_CODE_OAUTH_TOKEN:-} ]] \
        || fail "CLAUDE_CODE_OAUTH_TOKEN is missing; run claude setup-token"
    else
      env_file_has_value CLAUDE_CODE_OAUTH_TOKEN \
        || fail "CLAUDE_CODE_OAUTH_TOKEN is missing from $ENV_FILE"
    fi
  fi
  if [[ $OPERATION_MODE != offline ]]; then
    if [[ $INTERNAL_SUPERVISOR == true ]]; then
      [[ -n ${ARC_API_KEY:-} ]] || fail "ARC_API_KEY is missing"
    else
      env_file_has_value ARC_API_KEY \
        || fail "ARC_API_KEY is missing from $ENV_FILE"
    fi
  fi
  mkdir -p "$RUNS_DIR"
  local available_kib
  available_kib=$(df --output=avail -k "$RUNS_DIR" | awk 'NR == 2 {print $1}')
  ((available_kib >= MIN_FREE_GIB * 1024 * 1024)) \
    || fail "less than $MIN_FREE_GIB GiB is free under $RUNS_DIR"
}

single_game_runs_exist() {
  # A single game is played through the `vista` selector; match its arguments
  # rather than a wrapper script's name.
  ps -eo args= | awk '
    /(^|[[:space:]\/])vista([[:space:]]|$)/ && /--profile[=[:space:]]+arc3([[:space:]]|$)/ && /--game-id([=[:space:]]|$)/ { found = 1 }
    END { exit !found }
  '
}

check_online_run_policy() {
  if [[ $OPERATION_MODE == offline ]]; then
    return
  fi
  if ! single_game_runs_exist; then
    return
  fi
  if [[ $ALLOW_CONCURRENT_ONLINE == true ]]; then
    printf '[%s] Concurrent online ARC run detected; proceeding by explicit opt-in.\n' \
      "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    return
  fi
  fail "single-game ARC runs are still active"
}

competition_run_exists() {
  ps -eo comm=,args= | awk '
    $1 ~ /^python([0-9.]*)?$/ && /scripts\/run_arc3_batch.py/ { found = 1 }
    END { exit !found }
  '
}

check_competition_run_policy() {
  if ! competition_run_exists; then
    return
  fi
  if [[ $ALLOW_CONCURRENT_COORDINATOR == true ]]; then
    printf '[%s] Another competition coordinator is active; proceeding by explicit opt-in.\n' \
      "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    return
  fi
  fail "another competition coordinator is running"
}

source_is_unchanged() {
  [[ $(git -C "$ROOT" rev-parse HEAD) == "$PINNED_COMMIT" ]] \
    && git -C "$ROOT" diff --quiet -- \
      "$PLAYER_DOCKERFILE" pyproject.toml src scripts \
    && git -C "$ROOT" diff --cached --quiet -- \
      "$PLAYER_DOCKERFILE" pyproject.toml src scripts \
    && [[ -z $(git -C "$ROOT" ls-files --others --exclude-standard -- src scripts) ]] \
    && [[ $(docker image inspect "$PLAYER_IMAGE" --format '{{.Id}}') \
      == "$PINNED_IMAGE_ID" ]] \
    && [[ $(runtime_version) == "$PINNED_RUNTIME_VERSION" ]]
}

run_python() {
  local -a command=(
    "$PYTHON" "$ROOT/scripts/run_arc3_batch.py"
    --runtime "$RUNTIME"
    --operation-mode "$OPERATION_MODE"
    --model "$MODEL"
    --max-steps "$MAX_STEPS"
    --concurrency "$CONCURRENCY"
    --claude-workers-per-account "$CLAUDE_WORKERS_PER_ACCOUNT"
    --timeout "$TIMEOUT"
    --max-invalid-retries "$MAX_INVALID_RETRIES"
    --batch-id "$BATCH_ID"
    --runs-dir "$RUNS_DIR"
  )
  command+=(--effort "$EFFORT")
  command+=("$@")
  "${command[@]}"
}

supervise() {
  check_prerequisites
  check_competition_run_policy
  check_online_run_policy
  source_is_unchanged || fail "pinned source or runtime changed while waiting"
  printf '[%s] Running non-scoring preflight.\n' \
    "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  run_python --preflight
  source_is_unchanged || fail "pinned source or runtime changed after preflight"
  check_online_run_policy
  check_competition_run_policy
  printf '[%s] Opening the %s scorecard.\n' \
    "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$OPERATION_MODE"
  run_python
}

if [[ $INTERNAL_SUPERVISOR == true ]]; then
  PINNED_COMMIT=${ARC3_PINNED_COMMIT:?}
  PINNED_IMAGE_ID=${ARC3_PINNED_IMAGE_ID:?}
  PINNED_RUNTIME_VERSION=${ARC3_PINNED_RUNTIME_VERSION:?}
  supervise
  exit
fi

check_prerequisites
check_competition_run_policy
check_online_run_policy
PINNED_COMMIT=$(git -C "$ROOT" rev-parse HEAD)
PINNED_IMAGE_ID=$(docker image inspect "$PLAYER_IMAGE" --format '{{.Id}}')
PINNED_RUNTIME_VERSION=$(runtime_version)
source_is_unchanged || fail "competition source has uncommitted changes"

STAMP=$(date -u +%Y%m%dT%H%M%SZ)
LAUNCH_DIR="$RUNS_DIR/launch_${BATCH_ID}_$STAMP"
SESSION="arc3_competition_${BATCH_ID}_$STAMP"
mkdir -p "$LAUNCH_DIR"

printf -v command '%q ' \
  env \
  "HOME=$HOME" \
  "PATH=$PATH" \
  "ARC3_PYTHON=$PYTHON" \
  "ARC3_ENV_FILE=$ENV_FILE" \
  "ARC3_CODEX_BIN=$CODEX_BIN" \
  "ARC3_CLAUDE_BIN=$CLAUDE_BIN" \
  "ARC3_COMPETITION_RUNS_DIR=$RUNS_DIR" \
  "ARC3_TMUX_SOCKET=$SOCKET" \
  "ARC3_COMPETITION_RUNTIME=$RUNTIME" \
  "ARC3_COMPETITION_OPERATION_MODE=$OPERATION_MODE" \
  "ARC3_COMPETITION_MODEL=$MODEL" \
  "ARC3_COMPETITION_EFFORT=$EFFORT" \
  "ARC3_COMPETITION_MAX_STEPS=$MAX_STEPS" \
  "ARC3_COMPETITION_CONCURRENCY=$CONCURRENCY" \
  "ARC3_CLAUDE_WORKERS_PER_ACCOUNT=$CLAUDE_WORKERS_PER_ACCOUNT" \
  "ARC3_COMPETITION_TIMEOUT=$TIMEOUT" \
  "ARC3_COMPETITION_MAX_INVALID_RETRIES=$MAX_INVALID_RETRIES" \
  "ARC3_COMPETITION_BATCH_ID=$BATCH_ID" \
  "ARC3_COMPETITION_MIN_FREE_GIB=$MIN_FREE_GIB" \
  "ARC3_COMPETITION_ALLOW_CONCURRENT_ONLINE=$ALLOW_CONCURRENT_ONLINE" \
  "ARC3_COMPETITION_ALLOW_CONCURRENT_COORDINATOR=$ALLOW_CONCURRENT_COORDINATOR" \
  "ARC3_PINNED_COMMIT=$PINNED_COMMIT" \
  "ARC3_PINNED_IMAGE_ID=$PINNED_IMAGE_ID" \
  "ARC3_PINNED_RUNTIME_VERSION=$PINNED_RUNTIME_VERSION" \
  "$SCRIPT" __supervise
printf -v log_path '%q' "$LAUNCH_DIR/supervisor.log"
command+=" >>$log_path 2>&1"

tmux -L "$SOCKET" new-session -d -s "$SESSION" -c "$ROOT" "$command"
sleep 1
tmux -L "$SOCKET" has-session -t "$SESSION" 2>/dev/null \
  || fail "competition supervisor failed; inspect $LAUNCH_DIR/supervisor.log"

printf 'Supervisor: %s:%s\n' "$SOCKET" "$SESSION"
printf 'Launch log: %s\n' "$LAUNCH_DIR/supervisor.log"
printf 'Status: tail -f %q\n' "$LAUNCH_DIR/supervisor.log"

````


## vista-c97c354/scripts/run_gameworld_batch.sh

````text
#!/usr/bin/env bash
# Play the GameWorld catalog with bounded parallelism.
#
# The CLI runs its planned tasks sequentially; this driver launches one CLI
# process per task so that -j tasks play at once, each with its own output
# directory under a batch directory:
#
#   <runs>/<batch>/<game>__<task>/       one `vista-gameworld run` output
#   <runs>/<batch>/<game>__<task>.log    that process's stdout/stderr
#   <runs>/<batch>/driver.log            start/finish lines
#   <runs>/<batch>/batch.json            the driver's own settings
#
# Tasks are ordered breadth-first across games (every game's first task,
# then every game's second, ...) so a batch stopped early still covers the
# catalog. CODEX_HOME is unset on purpose: the runner prepares its own.
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
PYTHON=${GW_PYTHON:-"$ROOT/.venv/bin/python"}
CLI=${GW_CLI:-"$ROOT/.venv/bin/vista-gameworld"}
RUNS_DIR=${GW_RUNS_DIR:-"$ROOT/runs"}
RUNTIME_HOME=${GW_HOME:-"$HOME"}
BROWSERS=${PLAYWRIGHT_BROWSERS_PATH:-}
CODEX_BIN=${GW_CODEX_BIN:-}
GAMEWORLD_ROOT=${GAMEWORLD_ROOT:-}
GAMES_ROOT=${GAMES_ROOT:-}

JOBS=2
BATCH_ID="gw"
BACKEND="codex"
MODEL="gpt-5.6-sol"
EFFORT="max"
GAMES=()
AUTH_FILE=${CODEX_AUTH_FILE:-"$HOME/.codex/auth.json"}
EXTRA=()

usage() {
  cat <<'EOF2'
usage: run_gameworld_batch.sh [options] [-- extra CLI args]
  -j N                  parallel tasks (default 2)
  --batch-id NAME       batch directory prefix (default gw)
  --gameworld-root DIR  pinned GameWorld checkout (default $GAMEWORLD_ROOT)
  --games-root DIR      pinned GameWorld-Games checkout (default $GAMES_ROOT)
  --backend codex
  --model M --effort E
  --games "01_2048 05_breakout"   restrict to these games (default: whole catalog)
  --auth-file PATH      Codex auth.json (default ~/.codex/auth.json)
EOF2
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -j) JOBS="$2"; shift 2 ;;
    --batch-id) BATCH_ID="$2"; shift 2 ;;
    --gameworld-root) GAMEWORLD_ROOT="$2"; shift 2 ;;
    --games-root) GAMES_ROOT="$2"; shift 2 ;;
    --backend) BACKEND="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --games) IFS=' ' read -ra GAMES <<< "$2"; shift 2 ;;
    --auth-file) AUTH_FILE="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    --) shift; EXTRA=("$@"); break ;;
    *) echo "Unknown argument: $1" >&2; usage; exit 2 ;;
  esac
done

[[ $BACKEND == codex ]] || { echo "--backend must be codex" >&2; exit 2; }
[[ $JOBS =~ ^[1-9][0-9]*$ ]] || { echo "-j must be a positive integer" >&2; exit 2; }
[[ -n $GAMEWORLD_ROOT && -d $GAMEWORLD_ROOT/.git ]] || { echo "--gameworld-root (or GAMEWORLD_ROOT) must name the pinned checkout" >&2; exit 2; }
[[ -n $GAMES_ROOT && -d $GAMES_ROOT/.git ]] || { echo "--games-root (or GAMES_ROOT) must name the pinned checkout" >&2; exit 2; }
[[ -n $AUTH_FILE && -f $AUTH_FILE ]] || { echo "no Codex auth.json at $AUTH_FILE; run codex login or pass --auth-file" >&2; exit 2; }
[[ -x $CLI ]] || { echo "CLI not found: $CLI (pip install -e '.[gameworld]')" >&2; exit 2; }

# The task list comes from the CLI's own catalog reading, reordered
# breadth-first across games.
task_list=$("$CLI" list --gameworld-root "$GAMEWORLD_ROOT" --games-root "$GAMES_ROOT" \
  | "$PYTHON" -c '
import json, sys, collections
wanted = set(sys.argv[1:])
tasks = json.load(sys.stdin)["tasks"]
by_game = collections.OrderedDict()
for game, task in tasks:
    if wanted and game not in wanted:
        continue
    by_game.setdefault(game, []).append(task)
depth = max((len(v) for v in by_game.values()), default=0)
for i in range(depth):
    for game, items in by_game.items():
        if i < len(items):
            print(f"{game} {items[i]}")
' "${GAMES[@]}")
[[ -n $task_list ]] || { echo "No tasks selected" >&2; exit 2; }
mapfile -t TASKS <<< "$task_list"

STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BATCH_DIR="$RUNS_DIR/${BATCH_ID}_${STAMP}"
mkdir -p "$BATCH_DIR"
LOG="$BATCH_DIR/driver.log"

log() {
  printf '%s | %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" | tee -a "$LOG"
}

"$PYTHON" - "$BATCH_DIR/batch.json" "$BATCH_ID" "$BACKEND" "$MODEL" "$EFFORT" \
  "$JOBS" "$GAMEWORLD_ROOT" "$GAMES_ROOT" "${TASKS[@]}" <<'PY'
import json, sys
from pathlib import Path
path, batch_id, backend, model, effort, jobs, gw_root, games_root, *tasks = sys.argv[1:]
Path(path).write_text(json.dumps({
    "benchmark": "GameWorld",
    "batch_id": batch_id,
    "backend": backend,
    "model": model,
    "effort": effort,
    "gameworld_root": gw_root,
    "games_root": games_root,
    "jobs": int(jobs),
    "tasks": [t.split(" ") for t in tasks],
}, indent=2) + "\n")
PY

log "BEGIN $BATCH_ID -- $BACKEND $MODEL/$EFFORT jobs=$JOBS tasks=${#TASKS[@]}"
log "batch dir $BATCH_DIR"

run_one() {
  local game="$1" task="$2"
  local out="$BATCH_DIR/${game}__${task}"
  local tlog="$BATCH_DIR/${game}__${task}.log"
  log "start ${game}/${task}"
  local args=(
    run --gameworld-root "$GAMEWORLD_ROOT" --games-root "$GAMES_ROOT"
    --game "$game" --task "$task"
    --backend "$BACKEND" --model "$MODEL" --effort "$EFFORT"
    --output "$out"
  )
  args+=(--auth-file "$AUTH_FILE")
  [[ -n $CODEX_BIN ]] && args+=(--binary "$CODEX_BIN")
  local code=0
  env -u CODEX_HOME HOME="$RUNTIME_HOME" \
    ${BROWSERS:+PLAYWRIGHT_BROWSERS_PATH="$BROWSERS"} \
    "$CLI" "${args[@]}" "${EXTRA[@]}" >"$tlog" 2>&1 || code=$?
  log "done  ${game}/${task} (exit $code)"
  return "$code"
}

active=0
pids=()
for entry in "${TASKS[@]}"; do
  run_one ${entry} &
  pids+=("$!")
  active=$((active + 1))
  if [[ $active -ge $JOBS ]]; then
    wait -n || true
    active=$((active - 1))
  fi
done
failed=0
for pid in "${pids[@]}"; do
  wait "$pid" || failed=1
done

"$PYTHON" - "$BATCH_DIR" <<'PY' | tee -a "$LOG"
import json, sys, glob
from pathlib import Path
batch = Path(sys.argv[1])
rows = [json.loads(p.read_text()) for p in sorted(batch.glob("*__*/*__*/result.json"))]
planned = len(json.loads((batch / "batch.json").read_text())["tasks"])
scored = [r for r in rows if r.get("scored")]
summary = {
    "planned": planned,
    "completed": sum(1 for r in rows if r.get("completed")),
    "scored": len(scored),
    "successes": sum(1 for r in scored if r.get("success")),
    "success_rate_over_planned": (sum(1 for r in scored if r.get("success")) / planned) if planned else None,
    "mean_progress_over_scored": (sum(r["progress"] for r in scored) / len(scored)) if scored else None,
}
(batch / "batch_summary.json").write_text(json.dumps(summary, indent=2) + "\n")
print(f"{summary['successes']} successes of {summary['scored']} scored / {planned} planned")
if summary["completed"] != planned or summary["scored"] != planned:
    raise SystemExit(1)
PY

log "END   $BATCH_ID (exit $failed)"
exit "$failed"

````


## vista-c97c354/src/vista/__init__.py

````text
"""Benchmark-independent VISTA runtime contracts and backend bindings."""

__version__ = "0.1.0"

````


## vista-c97c354/src/vista/__main__.py

````text
from .cli import main

raise SystemExit(main())

````


## vista-c97c354/src/vista/backends/__init__.py

````text
"""Adapters to isolated Codex and Claude CLI transports."""

````


## vista-c97c354/src/vista/backends/binding.py

````text
"""Construct explicit task ports without replacing provider behavior."""

from __future__ import annotations

import json
from pathlib import Path

from vista.core.contracts import Effect
from vista.core.dispatcher import GameToolDispatcher
from vista.core.player import RecoveryPrompts, ToolInterface
from vista.core.profiles import CompactionMode
from vista.core.runtime import TaskRuntime
from vista.core.timeouts import bounded_task_timeout


def prepare_player(runtime: TaskRuntime, visible: Path, checkpoint_dir: Path) -> None:
    (visible / "screenshots").mkdir(mode=0o700)
    path = visible / "AGENTS.md"
    path.write_text(runtime.experiment.profile.prompts.system, encoding="utf-8")
    path.chmod(0o600)
    runtime.context.configure(visible, checkpoint_dir)


def tool_interface(runtime: TaskRuntime, kind: str) -> ToolInterface:
    dispatcher = GameToolDispatcher(
        controller=runtime.context,
        guide_path=runtime.context.guide_path,
        working_path=runtime.context.working_path,
        checkpoint_via_working=kind == "claude",
        delegate=runtime,
    )

    def predict_images(name: str, arguments: object) -> int:
        spec = runtime.spec(name)
        if spec is None:
            return 0
        if (
            name == "inspect"
            and isinstance(arguments, dict)
            and isinstance(arguments.get("views"), list)
        ):
            return min(len(arguments["views"]), spec.max_images)
        return spec.max_images

    return ToolInterface(
        tuple(runtime.tools()),
        dispatcher,
        frozenset(spec.name for spec in runtime.specs if spec.requires_ack),
        frozenset(
            spec.name
            for spec in runtime.specs
            if spec.effect == Effect.NONE and spec.max_images
        ),
        predict_images,
        runtime.acknowledge,
    )


def recovery_prompts(runtime: TaskRuntime) -> RecoveryPrompts:
    prompts = runtime.experiment.profile.prompts
    if runtime.experiment.profile.policy.compaction == CompactionMode.NATIVE:

        def native(_):
            return prompts.step or prompts.initial

        return RecoveryPrompts(native, native, native, native)

    def complete(recovery):
        working = recovery.working_memory
        provenance = getattr(recovery, "working_provenance", None)
        if working is not None and provenance is not None:
            working = {"saved_at": provenance, "content": working}
        return "\n".join(
            [
                "Environment record:",
                json.dumps(
                    {
                        "current_observation": recovery.current_observation,
                        "last_action_result": recovery.last_action_result,
                        "current_task_history": recovery.objective_history,
                    },
                    ensure_ascii=False,
                    separators=(",", ":"),
                ),
                "",
                "Agent-authored notes:",
                json.dumps(
                    {"guide": recovery.guide, "working_memory": working},
                    ensure_ascii=False,
                    separators=(",", ":"),
                ),
                "",
                prompts.recovery,
            ]
        )

    def resumed(recovery):
        return "\n".join(
            [
                "The player runtime restarted without changing the task state.",
                "Environment record:",
                json.dumps(
                    {
                        "current_observation": recovery.current_observation,
                        "last_action_result": recovery.last_action_result,
                    },
                    ensure_ascii=False,
                    separators=(",", ":"),
                ),
                "",
                prompts.recovery,
            ]
        )

    return RecoveryPrompts(complete, complete, resumed, complete)


def task_timeout(runtime: TaskRuntime, override: int | None) -> int:
    return (
        override
        if override is not None
        else bounded_task_timeout(300, runtime.context.max_steps + 1)
    )

````


## vista-c97c354/src/vista/backends/claude/__init__.py

````text
"""Shared claude transport and task binding factory."""

from typing import Any

__all__ = ["create_backend"]


def __getattr__(name: str) -> Any:
    if name == "create_backend":
        from .factory import create_backend

        return create_backend
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

````


## vista-c97c354/src/vista/backends/claude/compact_hook.py

````text
#!/usr/bin/env python3
"""Pause Claude compaction until the player saves a continuation checkpoint."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path


def configured_path(name: str) -> Path | None:
    value = os.environ.get(name)
    return Path(value) if value else None


def main() -> int:
    event = json.load(sys.stdin)
    output = Path(
        os.environ.get(
            "ARC3_COMPACT_EVENT_LOG",
            "/claude-io/native_compact_events.jsonl",
        )
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    record = {
        key: event.get(key)
        for key in (
            "session_id",
            "hook_event_name",
            "trigger",
            "compact_summary",
            "stop_hook_active",
        )
        if key in event
    }
    record["credential_environment_present"] = any(
        os.environ.get(name)
        for name in (
            "CLAUDE_CODE_OAUTH_TOKEN",
            "ANTHROPIC_API_KEY",
            "ARC_API_KEY",
        )
    )

    request = configured_path("ARC3_COMPACT_CHECKPOINT_REQUEST")
    ready = configured_path("ARC3_COMPACT_CHECKPOINT_READY")
    decision: dict[str, str] = {}
    event_name = event.get("hook_event_name")
    if event_name == "PreCompact" and request is not None:
        if ready is not None and ready.is_file():
            record["checkpoint_state"] = "ready"
            decision = {
                "decision": "block",
                "reason": "The checkpoint is saved; end this response for handoff.",
            }
        else:
            request.parent.mkdir(parents=True, exist_ok=True)
            request.touch(mode=0o600, exist_ok=True)
            record["checkpoint_state"] = "requested"
            decision = {
                "decision": "block",
                "reason": (
                    "Review and update WORKING.md so it preserves relevant existing "
                    "information and contains the complete continuation state needed "
                    "after compaction."
                ),
            }
    elif (
        event_name == "Stop"
        and request is not None
        and request.is_file()
        and (ready is None or not ready.is_file())
    ):
        record["checkpoint_state"] = "requested"
        decision = {
            "decision": "block",
            "reason": (
                "Review and update WORKING.md so it preserves relevant existing "
                "information and contains the complete continuation state needed "
                "after compaction."
            ),
        }
    elif event_name == "Stop" and ready is not None and ready.is_file():
        record["checkpoint_state"] = "ready"

    with output.open("a", encoding="utf-8") as stream:
        stream.write(json.dumps(record, separators=(",", ":")) + "\n")
    print(json.dumps(decision, separators=(",", ":")))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/backends/claude/factory.py

````text
"""Bind general tasks to the native-MCP transport."""

from __future__ import annotations

from collections.abc import Callable
from pathlib import Path
from typing import Any

from vista.core.profiles import CompactionMode
from vista.core.runtime import TaskRuntime

from ..binding import (
    prepare_player,
    recovery_prompts,
    task_timeout as resolve_timeout,
    tool_interface,
)
from ..session import BackendSession, preflight, prepare_directory
from .provider import ANTHROPIC_PROVIDER, ClaudeCodeProvider


def create_backend(
    runtime: TaskRuntime,
    *,
    directory: Path,
    oauth_token: str | None,
    binary: Path | None = None,
    ca_bundle: Path | None = None,
    expected_model_id: str | None = None,
    task_timeout: int | None = None,
    image: str | None = None,
    rate_limit_observer: Callable[[Any], None] | None = None,
    credential_yield_requested: Callable[[], bool] | None = None,
    credential_relay: Callable[[], str] | None = None,
    provider: ClaudeCodeProvider = ANTHROPIC_PROVIDER,
    provider_credential: str | None = None,
    provider_base_url: str | None = None,
    auto_compact_window: int | None = None,
    max_output_tokens: int | None = None,
) -> BackendSession:
    from vista.backends.claude.runner import (
        CLAUDE_AUTO_COMPACT_PERCENT,
        CLAUDE_AUTO_COMPACT_WINDOW,
        ClaudeCodeRunner,
    )

    preflight(runtime, "claude")
    if provider.native and not oauth_token:
        raise ValueError("The Anthropic provider requires an OAuth token")
    if not provider.native and (credential_relay or credential_yield_requested):
        raise ValueError("Credential relay is only defined for the Anthropic provider")
    # Explicit arguments override provider defaults, then transport defaults.
    window = (
        auto_compact_window
        if auto_compact_window is not None
        else provider.auto_compact_window
        if provider.auto_compact_window is not None
        else CLAUDE_AUTO_COMPACT_WINDOW
    )
    visible, state, io = prepare_directory(directory)
    prepare_player(runtime, visible, io)
    runner = ClaudeCodeRunner(
        controller=runtime.context,
        tool_interface=tool_interface(runtime, "claude"),
        recovery_prompts=recovery_prompts(runtime),
        native_compaction=runtime.experiment.profile.policy.compaction
        == CompactionMode.NATIVE,
        visible_dir=visible,
        claude_config_dir=state,
        io_dir=io,
        claude_bin=binary,
        ca_bundle=ca_bundle,
        oauth_token=oauth_token,
        model=runtime.experiment.model,
        effort=runtime.experiment.effort,
        expected_model_id=expected_model_id,
        task_timeout=resolve_timeout(runtime, task_timeout),
        rate_limit_observer=rate_limit_observer,
        credential_yield_requested=credential_yield_requested,
        provider=provider,
        provider_credential=provider_credential,
        provider_base_url=provider_base_url,
        auto_compact_window=window,
        auto_compact_percent=CLAUDE_AUTO_COMPACT_PERCENT,
        max_output_tokens=max_output_tokens,
        **({"image": image} if image is not None else {}),
    )

    def confirm_model() -> None:
        from .preflight import run_runtime_preflight

        result, concrete = run_runtime_preflight(
            visible_dir=visible,
            config_dir=state / "preflight",
            io_dir=io / "preflight",
            claude_bin=runner.claude_bin,
            model=runner.model,
            effort=runner.effort,
            timeout=300,
            tool_interface=runner.tool_interface,
            oauth_token=oauth_token,
            rate_limit_observer=rate_limit_observer,
            ca_bundle=runner.ca_bundle,
            image=runner.image,
            native_compaction=runner.native_compaction,
            provider=provider,
            provider_credential=provider_credential,
            provider_base_url=provider_base_url,
            max_output_tokens=runner.max_output_tokens,
        )
        runner.expected_model_id = concrete
        runtime.artifacts.record(
            "model_preflight",
            {
                "resolved_model_id": concrete,
                "session_id": result.session_id,
            },
        )

    return BackendSession(
        runtime,
        runner,
        kind="claude",
        before_first_run=confirm_model if expected_model_id is None else None,
        credential_relay=credential_relay,
        credential_relay_needed=credential_yield_requested,
    )

````


## vista-c97c354/src/vista/backends/claude/lifecycle.py

````text
"""Claude session lifecycle, independent of benchmark setup."""

from __future__ import annotations

import time
from dataclasses import replace
from typing import Callable

from vista.backends.claude.runner import ClaudeCodeRunner, ClaudeResult
from vista.core.session import SessionController as GameController

PROVIDER_5XX_BACKOFF_SECONDS = (10, 30, 60, 120)


MAX_DECISION_LEASE_RECOVERIES_PER_STEP = 5


MAX_COMPACT_CYCLES_WITHOUT_ACTION = 3


MAX_RUNTIME_RECOVERIES_PER_STEP = 8


NONTERMINAL_CONTINUATION_PROMPT = (
    "The environment is still active. "
    "Context limits are handled automatically. Continue."
)


def run_task_with_native_context(
    *,
    runner: ClaudeCodeRunner,
    controller: GameController,
    prompt: str,
    results: list[ClaudeResult],
    sleep: Callable[[float], None] = time.sleep,
    credential_relay: Callable[[], str] | None = None,
    credential_relay_needed: Callable[[], bool] | None = None,
    should_yield: Callable[[], bool] | None = None,
) -> list[ClaudeResult]:
    results.append(runner.run_task(prompt))
    session_id = results[-1].session_id
    decision_recovery_step: int | None = None
    decision_recoveries_at_step = 0
    provider_5xx_failures_at_step = 0
    compact_step: int | None = None
    compact_cycles_at_step = 0
    nonterminal_continuation_scope: tuple[str, int | None] | None = None

    while True:
        current = results[-1]
        if current.unconfirmed_play_calls:
            raise RuntimeError(
                "Claude stopped with an unconfirmed play call; "
                "the game state is not safe to relay"
            )
        if controller.terminal:
            discard_compact_recovery = getattr(
                controller,
                "discard_compact_recovery",
                None,
            )
            if callable(discard_compact_recovery):
                discard_compact_recovery()
            return results
        if (
            current.context_boundary != "credential_rate_limit"
            and credential_relay_needed is not None
            and credential_relay_needed()
        ):
            if credential_relay is None:
                raise RuntimeError(
                    "Claude reached a credential rate-limit boundary without a relay"
                )
            runner.replace_oauth_token(credential_relay())
        if current.context_boundary == "credential_rate_limit":
            if credential_relay is None:
                raise RuntimeError(
                    "Claude reached a credential rate-limit boundary without a relay"
                )
            previous_session_id = session_id
            runner.replace_oauth_token(credential_relay())
            recovery = controller.begin_runtime_recovery()
            continued = runner.run_fresh_runtime_recovery(recovery)
            results.append(continued)
            if continued.session_id is None:
                raise RuntimeError("Credential relay created no Claude session")
            if (
                previous_session_id is not None
                and continued.session_id == previous_session_id
            ):
                raise RuntimeError("Credential relay reused the stopped Claude session")
            session_id = continued.session_id
            decision_recovery_step = None
            decision_recoveries_at_step = 0
            provider_5xx_failures_at_step = 0
            continue
        if should_yield is not None and should_yield():
            return results
        if controller.retry_boundary_pending:
            recovery = controller.begin_retry_recovery()
            previous_session_id = session_id
            recovery_session_id: str | None = None
            recovery_failures = 0
            while True:
                if controller.retry_boundary_pending:
                    recovered = runner.run_retry_task(recovery)
                else:
                    if recovery_session_id is None:
                        raise RuntimeError("Retry recovery created no Claude session")
                    recovered = runner.resume_retry_task(
                        recovery_session_id,
                        recovery,
                    )
                results.append(recovered)
                pending_step = controller.retry_boundary_step
                recovery_delivered = not controller.retry_boundary_pending or (
                    type(pending_step) is int and pending_step > recovery.boundary_step
                )
                if recovered.session_id is not None and recovery_delivered:
                    if recovery_session_id is None:
                        if recovered.session_id == previous_session_id:
                            raise RuntimeError(
                                "Retry recovery did not create a fresh Claude session"
                            )
                        recovery_session_id = recovered.session_id
                    elif (
                        not controller.retry_boundary_pending
                        and recovered.session_id != recovery_session_id
                    ):
                        raise RuntimeError(
                            "Retry recovery did not resume the Claude session"
                        )
                if type(pending_step) is int and pending_step > recovery.boundary_step:
                    break
                if recovered.returncode == 0:
                    if controller.retry_boundary_pending:
                        raise RuntimeError("Claude did not enter retry recovery")
                    break
                if (
                    recovered.api_error_status is not None
                    and recovered.api_error_status >= 500
                    and recovery_delivered
                    and recovery_session_id is not None
                ):
                    break
                recovery_failures += 1
                if recovery_failures > MAX_RUNTIME_RECOVERIES_PER_STEP:
                    raise RuntimeError(
                        "Claude retry recovery failed repeatedly at the same game state"
                    )
            if recovery_session_id is None:
                raise RuntimeError("Retry recovery created no Claude session")
            session_id = recovery_session_id
            continue

        current = results[-1]
        if current.context_boundary == "provider_image_limit":
            raise RuntimeError(
                "Claude image boundary ended before WORKING.md was saved"
            )
        elif current.context_boundary == "native_compact":
            raise RuntimeError(
                "Claude compacted before the checkpoint handoff completed"
            )

        checkpoint_marker = getattr(controller, "compact_checkpoint_marker", None)
        checkpoint_ready = getattr(controller, "compact_checkpoint_ready", None)
        if checkpoint_marker is not None and checkpoint_marker.is_file():
            if session_id is None:
                raise RuntimeError("Claude compact checkpoint has no session id")
            if compact_step != controller.step_index:
                compact_step = controller.step_index
                compact_cycles_at_step = 0
            compact_cycles_at_step += 1
            if compact_cycles_at_step > MAX_COMPACT_CYCLES_WITHOUT_ACTION:
                raise RuntimeError(
                    "Claude compact checkpoint loop repeated without an action"
                )

            checkpoint_saved = (
                checkpoint_ready is not None and checkpoint_ready.is_file()
            )
            if not checkpoint_saved:
                raise RuntimeError(
                    "Claude ended before writing WORKING.md for compact handoff"
                )

            previous_session_id = session_id
            recovery = controller.begin_compact_recovery()
            recovered = runner.run_compact_recovery(recovery)
            results.append(recovered)
            session_id = recovered.session_id
            if recovered.returncode != 0:
                raise RuntimeError(
                    f"Claude compact recovery failed; stderr: {recovered.stderr_path}"
                )
            if session_id is None:
                raise RuntimeError("Compact recovery created no Claude session")
            if session_id == previous_session_id:
                raise RuntimeError(
                    "Compact recovery did not create a fresh Claude session"
                )
            restore_marker = controller.compact_restore_marker
            if restore_marker is not None and restore_marker.exists():
                raise RuntimeError("Claude did not enter compact recovery")
            compact_step = None
            compact_cycles_at_step = 0
            decision_recovery_step = None
            decision_recoveries_at_step = 0
            continue

        lease_failure = current.decision_lease_failure
        if current.returncode == 0 and lease_failure is None:
            lease_failure = "nonterminal_completion"
            current = replace(
                current,
                decision_lease_failure=lease_failure,
            )
            results[-1] = current
            level_progress = None
            initial_metadata = getattr(controller, "initial_metadata", None)
            if callable(initial_metadata):
                progress = initial_metadata().get("progress")
                if isinstance(progress, dict):
                    completed = progress.get("completed")
                    if type(completed) is int:
                        level_progress = completed
            continuation_scope = (
                (session_id, level_progress) if session_id is not None else None
            )
            if (
                continuation_scope is not None
                and continuation_scope != nonterminal_continuation_scope
            ):
                nonterminal_continuation_scope = continuation_scope
                continued = runner.resume_nonterminal_task(
                    session_id,
                    NONTERMINAL_CONTINUATION_PROMPT,
                )
                results.append(continued)
                if (
                    continued.session_id is not None
                    and continued.session_id != session_id
                ):
                    raise RuntimeError(
                        "Nonterminal continuation changed Claude session"
                    )
                session_id = continued.session_id or session_id
                continue
        elif lease_failure is None:
            lease_failure = "runtime_exit"

        if decision_recovery_step != controller.step_index:
            decision_recovery_step = controller.step_index
            decision_recoveries_at_step = 0
            provider_5xx_failures_at_step = 0
        decision_recoveries_at_step += 1
        if decision_recoveries_at_step > MAX_DECISION_LEASE_RECOVERIES_PER_STEP:
            return results

        if current.api_error_status is not None and current.api_error_status >= 500:
            provider_5xx_failures_at_step += 1
            delay = PROVIDER_5XX_BACKOFF_SECONDS[
                min(
                    provider_5xx_failures_at_step - 1,
                    len(PROVIDER_5XX_BACKOFF_SECONDS) - 1,
                )
            ]
            sleep(delay)

        previous_session_id = session_id
        recovery = controller.begin_runtime_recovery()
        continued = runner.run_fresh_runtime_recovery(recovery)
        results.append(continued)
        if (
            continued.session_id is not None
            and previous_session_id is not None
            and continued.session_id == previous_session_id
        ):
            raise RuntimeError(
                "Decision lease recovery reused the stopped Claude session"
            )
        session_id = continued.session_id

````


## vista-c97c354/src/vista/backends/claude/mcp_bridge.py

````text
#!/usr/bin/env python3
"""Minimal stdio MCP bridge to one authenticated host-side game controller."""

from __future__ import annotations

import json
import os
import socket
import sys
from typing import Any

SERVER_NAME = "game"
SERVER_VERSION = "1.0.0"
DEFAULT_PROTOCOL_VERSION = "2025-06-18"
FORBIDDEN_SUBPROCESS_CREDENTIALS = (
    "CLAUDE_CODE_OAUTH_TOKEN",
    "ANTHROPIC_API_KEY",
    "ARC_API_KEY",
)


class HostConnection:
    def __init__(self) -> None:
        socket_path = os.environ.get("ARC3_GAME_SOCKET")
        token = os.environ.get("ARC3_GAME_TOKEN")
        if not socket_path or not token:
            raise RuntimeError("The private game controller endpoint is unavailable.")
        self.token = token
        self.socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.socket.connect(socket_path)
        self.reader = self.socket.makefile("r", encoding="utf-8")
        self.writer = self.socket.makefile("w", encoding="utf-8")

    def request(self, payload: dict[str, Any]) -> dict[str, Any]:
        request = {"token": self.token, **payload}
        self.writer.write(json.dumps(request, separators=(",", ":")) + "\n")
        self.writer.flush()
        line = self.reader.readline()
        if not line:
            raise RuntimeError("The private game controller disconnected.")
        response = json.loads(line)
        if not isinstance(response, dict):
            raise RuntimeError("The private game controller returned invalid data.")
        return response

    def close(self) -> None:
        self.writer.close()
        self.reader.close()
        self.socket.close()


def send(payload: dict[str, Any]) -> None:
    sys.stdout.write(json.dumps(payload, separators=(",", ":")) + "\n")
    sys.stdout.flush()


def tool_result(execution: dict[str, Any]) -> dict[str, Any]:
    text = execution.get("text")
    if not isinstance(text, str):
        text = "The game controller returned invalid data."
    content: list[dict[str, Any]] = [{"type": "text", "text": text}]
    interrupt_after = execution.get("interrupt_after") is True
    boundary_reason = execution.get("boundary_reason")
    images = execution.get("images")
    if (
        not interrupt_after
        or boundary_reason == "compact_checkpoint"
        or execution.get("images_before_interrupt") is True
    ) and isinstance(images, list):
        for image in images:
            if not isinstance(image, dict) or not isinstance(image.get("data"), str):
                continue
            label = image.get("steer_text")
            if isinstance(label, str) and label:
                content.append({"type": "text", "text": label})
            content.append(
                {
                    "type": "image",
                    "data": image["data"],
                    "mimeType": image.get("mime_type", "image/png"),
                }
            )
    return {
        "content": content,
        "isError": execution.get("success") is not True,
    }


def handle(message: dict[str, Any], host: HostConnection) -> None:
    method = message.get("method")
    request_id = message.get("id")
    if method == "initialize":
        params = message.get("params")
        requested = params.get("protocolVersion") if isinstance(params, dict) else None
        send(
            {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {
                    "protocolVersion": (
                        requested
                        if isinstance(requested, str)
                        else DEFAULT_PROTOCOL_VERSION
                    ),
                    "capabilities": {"tools": {"listChanged": False}},
                    "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
                },
            }
        )
        return
    if method in {"notifications/initialized", "notifications/cancelled"}:
        return
    if method == "ping":
        send({"jsonrpc": "2.0", "id": request_id, "result": {}})
        return
    if method == "tools/list":
        response = host.request({"method": "tools/list"})
        result = response.get("result")
        if not isinstance(result, dict):
            raise RuntimeError("The host returned no tool list.")
        send({"jsonrpc": "2.0", "id": request_id, "result": result})
        ready = host.request(
            {
                "method": "tools/ready",
                "credential_environment_present": any(
                    os.environ.get(name) for name in FORBIDDEN_SUBPROCESS_CREDENTIALS
                ),
            }
        )
        if not isinstance(ready.get("result"), dict):
            raise RuntimeError("The host rejected the MCP subprocess environment.")
        return
    if method == "tools/call":
        params = message.get("params")
        if not isinstance(params, dict):
            raise ValueError("Invalid tool call parameters.")
        response = host.request(
            {
                "method": "tools/call",
                "request_id": request_id,
                "name": params.get("name"),
                "arguments": params.get("arguments"),
            }
        )
        execution = response.get("execution")
        if not isinstance(execution, dict):
            raise RuntimeError("The host returned no tool result.")
        send(
            {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": tool_result(execution),
            }
        )
        if execution.get("interrupt_after") is True:
            host.request(
                {
                    "method": "boundary/delivered",
                    "request_id": request_id,
                }
            )
        return
    if request_id is not None:
        send(
            {
                "jsonrpc": "2.0",
                "id": request_id,
                "error": {"code": -32601, "message": "Method not found"},
            }
        )


def main() -> int:
    host = HostConnection()
    try:
        for line in sys.stdin:
            message: object = None
            try:
                message = json.loads(line)
                if not isinstance(message, dict):
                    raise ValueError("Invalid JSON-RPC message.")
                handle(message, host)
            except Exception as exc:
                request_id = None
                try:
                    request_id = message.get("id")
                except Exception:
                    pass
                if request_id is not None:
                    send(
                        {
                            "jsonrpc": "2.0",
                            "id": request_id,
                            "error": {"code": -32603, "message": str(exc)},
                        }
                    )
                else:
                    print(str(exc), file=sys.stderr, flush=True)
    finally:
        host.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/backends/claude/mcp_host.py

````text
"""Authenticated Unix-socket host for the Claude game MCP bridge."""

from __future__ import annotations

import hashlib
import json
import socket
import threading
import time
from dataclasses import replace
from pathlib import Path
from typing import Any

from vista.core.dispatcher import GameToolDispatcher, ToolExecution
from vista.core.player import ToolInterface

COMPACT_CHECKPOINT_PROMPT = (
    "Review and update WORKING.md so it preserves relevant existing information "
    "and contains the complete continuation state needed after compaction."
)


class ClaudeGameMcpHost:
    def __init__(
        self,
        *,
        socket_path: Path,
        token: str,
        dispatcher: GameToolDispatcher,
        display_size: int,
        log_path: Path,
        call_namespace: str = "",
        initial_image_blocks: int = 0,
        image_block_limit: int | None = None,
        image_compact_at: int | None = None,
        include_compact_checkpoint: bool = False,
        reset_requires_retry_state: bool = False,
        tool_interface: ToolInterface | None = None,
        native_compaction: bool = False,
        tool_definitions: tuple[dict[str, Any], ...]
        | list[dict[str, Any]]
        | None = None,
    ) -> None:
        self.socket_path = socket_path
        self.token = token
        self.dispatcher = dispatcher
        self.tool_interface = tool_interface
        self.tool_definitions = tool_definitions
        self.native_compaction = native_compaction
        self.action_tools = (
            tool_interface.action_tools if tool_interface is not None else {"play"}
        )
        self.display_size = display_size
        self.log_path = log_path
        self.call_namespace = call_namespace
        self._image_lock = threading.Lock()
        self._activity_lock = threading.Lock()
        self.image_blocks_delivered = initial_image_blocks
        self.peak_image_blocks = initial_image_blocks
        self.image_block_limit = image_block_limit
        self.image_compact_at = image_compact_at
        self.include_compact_checkpoint = include_compact_checkpoint
        self.reset_requires_retry_state = reset_requires_retry_state
        self.boundary_reason: str | None = None
        self.boundary_delivered = threading.Event()
        self.listening = threading.Event()
        self.connected = threading.Event()
        self.tools_listed = threading.Event()
        self.tools_ready = threading.Event()
        self.calls_enabled = threading.Event()
        self.action_cycle_ready = threading.Event()
        self.action_cycle_ready.set()
        self.failure: BaseException | None = None
        self._stop = threading.Event()
        self._listener: socket.socket | None = None
        self._thread: threading.Thread | None = None
        self._log_lock = threading.Lock()
        self._tool_calls_completed = 0
        self._tool_calls_in_flight = 0
        self._play_calls_in_flight = 0
        self._last_tool_completed_at: float | None = None
        self._play_calls_settled = threading.Event()
        self._play_calls_settled.set()

    def start(self) -> None:
        self.socket_path.parent.mkdir(parents=True, exist_ok=True)
        self.socket_path.unlink(missing_ok=True)
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        self.log_path.touch(mode=0o600, exist_ok=True)
        self._thread = threading.Thread(target=self._serve, daemon=True)
        self._thread.start()
        if not self.listening.wait(timeout=5):
            if self.failure is not None:
                raise RuntimeError(
                    f"Game MCP host failed: {type(self.failure).__name__}: {self.failure}"
                )
            raise TimeoutError("Game MCP host did not start listening.")

    def stop(self) -> None:
        self._stop.set()
        self.calls_enabled.set()
        listener = self._listener
        if listener is not None:
            try:
                listener.close()
            except OSError:
                pass
        if self._thread is not None:
            self._thread.join(timeout=5)
        self.socket_path.unlink(missing_ok=True)

    def _serve(self) -> None:
        try:
            listener = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            listener.bind(str(self.socket_path))
            # The socket directory is private; avoid process-wide umask races.
            self.socket_path.chmod(0o600)
            self._listener = listener
            listener.listen(1)
            self.listening.set()
            listener.settimeout(0.2)
            while not self._stop.is_set():
                try:
                    connection, _ = listener.accept()
                except socket.timeout:
                    continue
                except OSError:
                    if self._stop.is_set():
                        break
                    raise
                self.connected.set()
                with connection:
                    self._serve_connection(connection)
        except BaseException as exc:
            if not self._stop.is_set():
                self.failure = exc
        finally:
            self._listener = None

    def _serve_connection(self, connection: socket.socket) -> None:
        reader = connection.makefile("r", encoding="utf-8")
        writer = connection.makefile("w", encoding="utf-8")
        try:
            for line in reader:
                if self._stop.is_set():
                    break
                request: Any = None
                try:
                    request = json.loads(line)
                    response = self._handle(request)
                except Exception as exc:
                    response = {"error": f"{type(exc).__name__}: {exc}"}
                self._record("request", request)
                self._record("response", response)
                writer.write(json.dumps(response, separators=(",", ":")) + "\n")
                writer.flush()
        finally:
            writer.close()
            reader.close()

    def _handle(self, request: object) -> dict[str, Any]:
        if not isinstance(request, dict) or request.get("token") != self.token:
            raise PermissionError("Unauthorized controller request.")
        method = request.get("method")
        if method == "tools/list":
            definitions = (
                self.tool_interface.definitions
                if self.tool_interface is not None
                else self.tool_definitions
                if self.tool_definitions is not None
                else self._default_tool_definitions()
            )
            response = {
                "result": {
                    "tools": [
                        {
                            "name": tool["name"],
                            "description": tool["description"],
                            "inputSchema": tool["inputSchema"],
                            "annotations": tool.get("annotations", {}),
                        }
                        for tool in definitions
                    ]
                }
            }
            self.tools_listed.set()
            return response
        if method == "tools/ready":
            if request.get("credential_environment_present") is not False:
                raise RuntimeError(
                    "The MCP subprocess inherited a provider or ARC credential."
                )
            self.tools_ready.set()
            return {"result": {"acknowledged": True}}
        if method == "tools/call":
            if not self.calls_enabled.wait(timeout=30) or self._stop.is_set():
                raise RuntimeError("Game tools were not enabled by runtime validation.")
            name = request.get("name")
            request_id = request.get("request_id")
            if not isinstance(name, str) or not isinstance(request_id, (str, int)):
                raise ValueError("Invalid tool request.")
            if (
                self.tool_interface is None
                and name == "save_compact_checkpoint"
                and not self.include_compact_checkpoint
            ):
                raise ValueError("Unknown tool.")
            controller_call_id = str(request_id)
            if self.call_namespace:
                controller_call_id = f"{self.call_namespace}:{controller_call_id}"
            request["controller_call_id"] = controller_call_id
            self._record_tool_started(name)
            try:
                response = self._execute_tool_call(
                    name=name,
                    arguments=request.get("arguments"),
                    controller_call_id=controller_call_id,
                )
            except BaseException:
                if name not in self.action_tools:
                    self._record_tool_completed(name)
                raise
            self._record_tool_completed(name)
            return response
        if method == "boundary/delivered":
            if self.tool_interface is not None:
                self.tool_interface.acknowledge(None)
            self.boundary_delivered.set()
            return {"result": {"acknowledged": True}}
        raise ValueError("Unknown bridge method.")

    def _default_tool_definitions(self) -> tuple[dict[str, Any], ...]:
        raise RuntimeError("Task tools must be supplied by the adapter")

    def _execute_tool_call(
        self,
        *,
        name: str,
        arguments: object,
        controller_call_id: str,
    ) -> dict[str, Any]:
        predicted_images = (
            self.tool_interface.predict_images(name, arguments)
            if self.tool_interface is not None
            else predicted_image_blocks(name, arguments)
        )
        with self._image_lock:
            if (
                predicted_images
                and self.image_block_limit is not None
                and self.image_blocks_delivered + predicted_images
                >= self.image_block_limit
            ):
                if self.native_compaction:
                    self.boundary_reason = "provider_image_limit"
                    return {
                        "execution": execution_payload(
                            ToolExecution(
                                "The provider image limit was reached; nothing was executed.",
                                False,
                                interrupt_after=True,
                                boundary_reason=self.boundary_reason,
                            )
                        )
                    }
                self._request_compact_checkpoint(reason="provider_image_limit")
                return {
                    "execution": execution_payload(
                        ToolExecution(
                            f"{COMPACT_CHECKPOINT_PROMPT} No game action was executed.",
                            False,
                        )
                    )
                }
        if name in self.action_tools and not self.action_cycle_ready.is_set():
            return {
                "execution": execution_payload(
                    ToolExecution(
                        "Observe the previous play result before another action.",
                        False,
                    )
                )
            }
        if name in self.action_tools:
            self.action_cycle_ready.clear()
        try:
            execution = self.dispatcher.execute(
                name,
                arguments,
                controller_call_id,
            )
        except BaseException as exc:
            self.failure = exc
            self._stop.set()
            raise RuntimeError("The private game controller failed.") from None
        with self._image_lock:
            self.image_blocks_delivered += len(execution.images)
            self.peak_image_blocks = max(
                self.peak_image_blocks,
                self.image_blocks_delivered,
            )
            if execution.interrupt_after:
                self.boundary_reason = execution.boundary_reason or "reset"
            elif (
                execution.images
                and not self.native_compaction
                and self.image_compact_at is not None
                and self.image_blocks_delivered >= self.image_compact_at
                and not getattr(
                    getattr(self.dispatcher, "controller", None),
                    "terminal",
                    False,
                )
            ):
                self._request_compact_checkpoint(reason="provider_image_limit")
                execution = replace(
                    execution,
                    text=f"{execution.text}\n\n{COMPACT_CHECKPOINT_PROMPT}",
                )
        return {"execution": execution_payload(execution)}

    def _record_tool_started(self, name: str) -> None:
        with self._activity_lock:
            self._tool_calls_in_flight += 1
            if name in self.action_tools:
                self._play_calls_in_flight += 1
                self._play_calls_settled.clear()

    def _record_tool_completed(self, name: str) -> None:
        with self._activity_lock:
            self._tool_calls_completed += 1
            self._tool_calls_in_flight -= 1
            self._last_tool_completed_at = time.monotonic()
            if name in self.action_tools:
                self._play_calls_in_flight -= 1
                if self._play_calls_in_flight == 0:
                    self._play_calls_settled.set()

    def tool_activity(self) -> tuple[int, int, float | None]:
        with self._activity_lock:
            return (
                self._tool_calls_completed,
                self._tool_calls_in_flight,
                self._last_tool_completed_at,
            )

    def wait_for_play_settlement(self, timeout: float) -> bool:
        return self._play_calls_settled.wait(timeout=timeout)

    @property
    def unconfirmed_play_calls(self) -> int:
        with self._activity_lock:
            return self._play_calls_in_flight

    def enable_calls(self) -> None:
        self.calls_enabled.set()

    def acknowledge_action_result(self) -> None:
        if self.tool_interface is not None:
            self.tool_interface.acknowledge(None)
        self.action_cycle_ready.set()

    def acknowledge_compaction(self) -> None:
        with self._image_lock:
            self.image_blocks_delivered = 0

    def disable_calls(self) -> None:
        self.calls_enabled.clear()

    def _request_compact_checkpoint(self, *, reason: str) -> None:
        controller = getattr(self.dispatcher, "controller", None)
        marker = getattr(controller, "compact_checkpoint_marker", None)
        if marker is not None and marker.is_file():
            return
        request = getattr(controller, "request_compact_checkpoint", None)
        if not callable(request):
            raise RuntimeError("Compact checkpoint control is unavailable.")
        request(reason=reason)

    def _record(self, direction: str, value: object) -> None:
        record = {"direction": direction, "value": sanitize(value)}
        with self._log_lock:
            with self.log_path.open("a", encoding="utf-8") as stream:
                stream.write(json.dumps(record, separators=(",", ":")) + "\n")


def execution_payload(execution: ToolExecution) -> dict[str, Any]:
    return {
        "text": execution.text,
        "success": execution.success,
        "images": list(execution.images),
        "interrupt_after": execution.interrupt_after,
        "boundary_reason": execution.boundary_reason,
        **(
            {"images_before_interrupt": True}
            if getattr(execution, "images_before_interrupt", False)
            else {}
        ),
    }


def predicted_image_blocks(name: str, arguments: object) -> int:
    if name == "play":
        return 1
    if name != "inspect" or not isinstance(arguments, dict):
        return 0
    views = arguments.get("views")
    return len(views) if isinstance(views, list) else 0


def sanitize(value: object) -> object:
    if isinstance(value, dict):
        sanitized: dict[str, object] = {}
        for key, item in value.items():
            if key == "token":
                sanitized[key] = "<redacted>"
            elif key == "data" and isinstance(item, str):
                try:
                    size = len(item.encode("ascii"))
                except UnicodeEncodeError:
                    size = len(item.encode("utf-8"))
                sanitized[key] = {
                    "encoded_chars": size,
                    "sha256": hashlib.sha256(item.encode("utf-8")).hexdigest(),
                }
            else:
                sanitized[key] = sanitize(item)
        return sanitized
    if isinstance(value, list):
        return [sanitize(item) for item in value]
    return value

````


## vista-c97c354/src/vista/backends/claude/preflight.py

````text
"""Confirm a native Claude runtime with the selected task tool surface disabled."""

from collections.abc import Callable
from dataclasses import replace
from pathlib import Path
from typing import Any

from vista.core.dispatcher import ToolExecution
from vista.core.player import ToolInterface

from .provider import ANTHROPIC_PROVIDER, ClaudeCodeProvider
from .quota import ClaudeRateLimitEvent
from .runner import (
    PLAYER_IMAGE,
    RUNTIME_PREFLIGHT_PROMPT,
    ClaudeCodeRunner,
    ClaudePreflightController,
    ClaudeResult,
    resolved_model_id,
    validate_instruction_envelope,
)


class _PreflightExecutor:
    def execute(self, tool: str, arguments: Any, call_id: str) -> ToolExecution:
        return ToolExecution(
            "Task tools are unavailable during runtime preflight.", False
        )


def run_runtime_preflight(
    *,
    visible_dir: Path,
    config_dir: Path,
    io_dir: Path,
    claude_bin: Path,
    model: str,
    effort: str,
    timeout: int,
    tool_interface: ToolInterface,
    oauth_token: str | None = None,
    rate_limit_observer: Callable[[ClaudeRateLimitEvent], None] | None = None,
    ca_bundle: Path | None = None,
    image: str = PLAYER_IMAGE,
    native_compaction: bool = False,
    provider: ClaudeCodeProvider = ANTHROPIC_PROVIDER,
    provider_credential: str | None = None,
    provider_base_url: str | None = None,
    max_output_tokens: int | None = None,
) -> tuple[ClaudeResult, str]:
    tools = replace(
        tool_interface,
        executor=_PreflightExecutor(),
        acknowledge=lambda call_id: None,
        predict_images=lambda name, arguments: 0,
    )
    runner = ClaudeCodeRunner(
        visible_dir=visible_dir,
        claude_config_dir=config_dir,
        io_dir=io_dir,
        controller=ClaudePreflightController(),
        tool_interface=tools,
        claude_bin=claude_bin,
        ca_bundle=ca_bundle,
        model=model,
        effort=effort,
        oauth_token=oauth_token,
        task_timeout=max(60, timeout),
        rate_limit_observer=rate_limit_observer,
        image=image,
        native_compaction=native_compaction,
        provider=provider,
        provider_credential=provider_credential,
        provider_base_url=provider_base_url,
        max_output_tokens=max_output_tokens,
    )
    result = runner.run_task(RUNTIME_PREFLIGHT_PROMPT)
    if result.returncode != 0:
        raise RuntimeError(
            f"Claude runtime preflight failed; stderr: {result.stderr_path}"
        )
    validate_instruction_envelope(
        result.init_envelope,
        display_size=runner.display_size,
        tool_definitions=list(tools.definitions),
    )
    concrete_model_id = resolved_model_id(result)
    if result.final_message.strip() != "READY":
        raise RuntimeError("Claude runtime preflight returned an unexpected result.")
    return result, concrete_model_id

````


## vista-c97c354/src/vista/backends/claude/provider.py

````text
"""Model providers behind the Claude Code transport.

Claude Code is the transport; the model it talks to is a separate choice. The
native provider is Anthropic through a subscription token. An
Anthropic-compatible provider is any server that implements ``/v1/messages``
and is selected purely through the environment variables Claude Code already
honors. Nothing here changes how
the transport is driven, only where its requests go.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ClaudeCodeProvider:
    name: str
    credential_env: str
    endpoint_protocol: str
    default_model: str
    default_context_window: int
    default_base_url: str | None = None
    model_context_windows: tuple[tuple[str, int], ...] = ()
    # None leaves the transport's default unchanged.
    auto_compact_window: int | None = None
    max_output_tokens: int | None = None
    mcp_tool_timeout_ms: int | None = None

    def __post_init__(self) -> None:
        if self.endpoint_protocol not in {"anthropic-native", "anthropic-compatible"}:
            raise ValueError("Unknown Claude Code endpoint protocol")
        if not self.name or not self.credential_env or not self.default_model:
            raise ValueError("A provider needs a name, credential variable and model")

    @property
    def native(self) -> bool:
        return self.endpoint_protocol == "anthropic-native"

    def context_window(self, model: str) -> int:
        return dict(self.model_context_windows).get(model, self.default_context_window)

    def supports_model(self, model: str) -> bool:
        if not self.model_context_windows:
            return True
        return model in dict(self.model_context_windows)


ANTHROPIC_PROVIDER = ClaudeCodeProvider(
    name="anthropic",
    credential_env="CLAUDE_CODE_OAUTH_TOKEN",
    endpoint_protocol="anthropic-native",
    default_model="opus",
    default_context_window=1_000_000,
)

# Removed before applying provider settings. Model aliases are also cleared
# by their ANTHROPIC_DEFAULT_ prefix in provider_process_environment.
PROVIDER_ENV_NAMES = (
    "CLAUDE_CODE_OAUTH_TOKEN",
    "ANTHROPIC_AUTH_TOKEN",
    "ANTHROPIC_API_KEY",
    "ANTHROPIC_BASE_URL",
    "ANTHROPIC_MODEL",
    "ANTHROPIC_SMALL_FAST_MODEL",
    "ANTHROPIC_DEFAULT_OPUS_MODEL",
    "ANTHROPIC_DEFAULT_OPUS_MODEL_NAME",
    "ANTHROPIC_DEFAULT_SONNET_MODEL",
    "ANTHROPIC_DEFAULT_SONNET_MODEL_NAME",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME",
    "CLAUDE_CODE_SUBAGENT_MODEL",
    "CLAUDE_CODE_EFFORT_LEVEL",
    "CLAUDE_CODE_MAX_CONTEXT_TOKENS",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS",
    "MCP_TOOL_TIMEOUT",
    "ENABLE_TOOL_SEARCH",
)


def provider_environment(
    provider: ClaudeCodeProvider,
    *,
    credential: str,
    model: str,
    effort: str,
    base_url: str | None = None,
) -> dict[str, str]:
    """The environment variables that select this provider, and nothing else."""
    if not credential:
        raise ValueError(f"{provider.credential_env} must not be empty")
    if provider.native:
        return {"CLAUDE_CODE_OAUTH_TOKEN": credential}
    if not provider.supports_model(model):
        raise ValueError(f"Unsupported {provider.name} model: {model}")
    endpoint = (base_url or provider.default_base_url or "").rstrip("/")
    if not endpoint:
        raise ValueError(
            f"The {provider.name} provider requires an Anthropic-compatible base URL"
        )
    # Claude Code resolves its own aliases (opus/sonnet/haiku and the subagent
    # model) independently; every one is pinned so no request can escape to a
    # model the server does not serve.
    return {
        "ANTHROPIC_BASE_URL": endpoint,
        "ANTHROPIC_AUTH_TOKEN": credential,
        "ANTHROPIC_MODEL": model,
        "ANTHROPIC_DEFAULT_OPUS_MODEL": model,
        "ANTHROPIC_DEFAULT_SONNET_MODEL": model,
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": model,
        "CLAUDE_CODE_SUBAGENT_MODEL": model,
        "CLAUDE_CODE_EFFORT_LEVEL": effort,
    }

````


## vista-c97c354/src/vista/backends/claude/quota.py

````text
"""Claude subscription quota signals and credential leases."""

from __future__ import annotations

import math
import threading
import time
from dataclasses import dataclass
from typing import Callable, Sequence

DEFAULT_DRAIN_UTILIZATION = 0.90
DEFAULT_CAPACITY_POLL_SECONDS = 5.0


@dataclass(frozen=True)
class ClaudeRateLimitEvent:
    status: str
    rate_limit_type: str
    resets_at: int | None
    utilization: float | None = None
    surpassed_threshold: float | None = None

    def as_dict(self) -> dict[str, object]:
        return {
            "status": self.status,
            "rate_limit_type": self.rate_limit_type,
            "resets_at": self.resets_at,
            "utilization": self.utilization,
            "surpassed_threshold": self.surpassed_threshold,
        }


def rate_limit_event_from_message(message: object) -> ClaudeRateLimitEvent | None:
    if not isinstance(message, dict) or message.get("type") != "rate_limit_event":
        return None
    info = message.get("rate_limit_info")
    if not isinstance(info, dict):
        return None
    status = info.get("status")
    rate_limit_type = info.get("rateLimitType")
    if not isinstance(status, str) or not isinstance(rate_limit_type, str):
        return None
    return ClaudeRateLimitEvent(
        status=status,
        rate_limit_type=rate_limit_type,
        resets_at=_optional_integer(info.get("resetsAt")),
        utilization=_optional_number(info.get("utilization")),
        surpassed_threshold=_optional_number(info.get("surpassedThreshold")),
    )


class ClaudeCredentialLease:
    """One running game holding one account slot."""

    def __init__(self, pool: ClaudeCredentialPool, account_slot: int) -> None:
        self._pool = pool
        self._account_slot = account_slot
        self._account_history = [account_slot]
        self._active = True

    @property
    def account_slot(self) -> int:
        return self._pool.account_slot(self)

    @property
    def oauth_token(self) -> str:
        return self._pool.oauth_token(self)

    @property
    def account_history(self) -> tuple[int, ...]:
        return self._pool.account_history(self)

    def observe_rate_limit(self, event: ClaudeRateLimitEvent) -> None:
        self._pool.observe_rate_limit(self, event)

    def should_yield(self) -> bool:
        return self._pool.should_yield(self)

    def relay(self) -> str:
        return self._pool.relay(self)

    def release(self) -> None:
        self._pool.release(self)


class ClaudeCredentialPool:
    """Coordinate account capacity and move games away from draining accounts."""

    def __init__(
        self,
        oauth_tokens: Sequence[str],
        worker_limits: Sequence[int],
        *,
        drain_utilization: float = DEFAULT_DRAIN_UTILIZATION,
        no_proactive_drain_accounts: Sequence[int] = (),
        clock: Callable[[], float] = time.time,
        capacity_poll_seconds: float = DEFAULT_CAPACITY_POLL_SECONDS,
    ) -> None:
        if not oauth_tokens or len(set(oauth_tokens)) != len(oauth_tokens):
            raise ValueError("Claude credentials must be non-empty and unique")
        if len(oauth_tokens) != len(worker_limits):
            raise ValueError("Claude worker limits must match the credential pool")
        if any(type(limit) is not int or limit < 0 for limit in worker_limits):
            raise ValueError("Claude worker limits must be non-negative integers")
        if not 0 < drain_utilization <= 1:
            raise ValueError("Claude drain utilization must be in (0, 1]")
        invalid_accounts = set(no_proactive_drain_accounts) - set(
            range(1, len(oauth_tokens) + 1)
        )
        if invalid_accounts:
            raise ValueError("Claude proactive-drain account index is invalid")
        if capacity_poll_seconds <= 0:
            raise ValueError("Claude capacity poll interval must be positive")

        self._tokens = {slot: token for slot, token in enumerate(oauth_tokens, start=1)}
        self._worker_limits = {
            slot: limit for slot, limit in enumerate(worker_limits, start=1)
        }
        self._active = {slot: 0 for slot in self._tokens}
        self._latest: dict[int, dict[str, ClaudeRateLimitEvent]] = {
            slot: {} for slot in self._tokens
        }
        self._blocked_until: dict[int, dict[str, float]] = {
            slot: {} for slot in self._tokens
        }
        self._drain_utilization = drain_utilization
        self._no_proactive_drain_accounts = frozenset(no_proactive_drain_accounts)
        self._clock = clock
        self._capacity_poll_seconds = capacity_poll_seconds
        self._waiting_relays = 0
        self._condition = threading.Condition(threading.RLock())

    def try_acquire(self, account_slot: int) -> ClaudeCredentialLease | None:
        with self._condition:
            self._validate_slot(account_slot)
            self._refresh_locked()
            if self._waiting_relays or not self._has_capacity_locked(account_slot):
                return None
            self._active[account_slot] += 1
            return ClaudeCredentialLease(self, account_slot)

    def set_worker_limits(self, worker_limits: Sequence[int]) -> None:
        if len(worker_limits) != len(self._tokens):
            raise ValueError("Claude worker limits must match the credential pool")
        if any(type(limit) is not int or limit < 0 for limit in worker_limits):
            raise ValueError("Claude worker limits must be non-negative integers")
        with self._condition:
            self._worker_limits = {
                slot: limit for slot, limit in enumerate(worker_limits, start=1)
            }
            self._condition.notify_all()

    def observe_account_rate_limit(
        self,
        account_slot: int,
        event: ClaudeRateLimitEvent,
    ) -> None:
        with self._condition:
            self._validate_slot(account_slot)
            self._record_rate_limit_locked(account_slot, event)

    def observe_rate_limit(
        self,
        lease: ClaudeCredentialLease,
        event: ClaudeRateLimitEvent,
    ) -> None:
        with self._condition:
            self._require_active_lease_locked(lease)
            self._record_rate_limit_locked(lease._account_slot, event)

    def should_yield(self, lease: ClaudeCredentialLease) -> bool:
        with self._condition:
            self._require_active_lease_locked(lease)
            self._refresh_locked()
            return bool(self._blocked_until[lease._account_slot])

    def relay(self, lease: ClaudeCredentialLease) -> str:
        with self._condition:
            self._require_active_lease_locked(lease)
            old_slot = lease._account_slot
            self._active[old_slot] -= 1
            lease._active = False
            self._waiting_relays += 1
            self._condition.notify_all()
            try:
                while True:
                    self._refresh_locked()
                    account_slot = self._best_available_slot_locked()
                    if account_slot is not None:
                        self._active[account_slot] += 1
                        lease._account_slot = account_slot
                        lease._account_history.append(account_slot)
                        lease._active = True
                        return self._tokens[account_slot]
                    self._condition.wait(timeout=self._next_poll_delay_locked())
            finally:
                self._waiting_relays -= 1
                self._condition.notify_all()

    def release(self, lease: ClaudeCredentialLease) -> None:
        with self._condition:
            if lease._pool is not self or not lease._active:
                return
            self._active[lease._account_slot] -= 1
            lease._active = False
            self._condition.notify_all()

    def account_slot(self, lease: ClaudeCredentialLease) -> int:
        with self._condition:
            self._require_lease_locked(lease)
            return lease._account_slot

    def oauth_token(self, lease: ClaudeCredentialLease) -> str:
        with self._condition:
            self._require_active_lease_locked(lease)
            return self._tokens[lease._account_slot]

    def account_history(self, lease: ClaudeCredentialLease) -> tuple[int, ...]:
        with self._condition:
            self._require_lease_locked(lease)
            return tuple(lease._account_history)

    def active_counts(self) -> dict[int, int]:
        with self._condition:
            return dict(self._active)

    def healthy_account_slots(self) -> tuple[int, ...]:
        with self._condition:
            self._refresh_locked()
            return tuple(slot for slot in self._tokens if not self._blocked_until[slot])

    def snapshot(self) -> dict[str, object]:
        with self._condition:
            self._refresh_locked()
            return {
                "drain_utilization": self._drain_utilization,
                "accounts": {
                    str(slot): {
                        "active": self._active[slot],
                        "worker_limit": self._worker_limits[slot],
                        "proactive_drain": (
                            slot not in self._no_proactive_drain_accounts
                        ),
                        "blocked_until": {
                            kind: reset_at if math.isfinite(reset_at) else None
                            for kind, reset_at in self._blocked_until[slot].items()
                        },
                        "latest": {
                            kind: event.as_dict()
                            for kind, event in self._latest[slot].items()
                        },
                    }
                    for slot in self._tokens
                },
            }

    def _record_rate_limit_locked(
        self,
        account_slot: int,
        event: ClaudeRateLimitEvent,
    ) -> None:
        self._refresh_locked()
        self._latest[account_slot][event.rate_limit_type] = event
        should_drain = event.status == "rejected" or (
            account_slot not in self._no_proactive_drain_accounts
            and event.utilization is not None
            and event.utilization >= self._drain_utilization
        )
        if should_drain:
            self._blocked_until[account_slot][event.rate_limit_type] = (
                float(event.resets_at) if event.resets_at is not None else math.inf
            )
        self._condition.notify_all()

    def _refresh_locked(self) -> None:
        now = self._clock()
        for events in self._latest.values():
            expired = [
                kind
                for kind, event in events.items()
                if event.resets_at is not None and event.resets_at <= now
            ]
            for kind in expired:
                del events[kind]
        for limits in self._blocked_until.values():
            expired = [kind for kind, reset_at in limits.items() if reset_at <= now]
            for kind in expired:
                del limits[kind]

    def _has_capacity_locked(self, account_slot: int) -> bool:
        return (
            not self._blocked_until[account_slot]
            and self._active[account_slot] < self._worker_limits[account_slot]
        )

    def _best_available_slot_locked(self) -> int | None:
        candidates = [slot for slot in self._tokens if self._has_capacity_locked(slot)]
        if not candidates:
            return None

        def score(slot: int) -> tuple[float, float, int]:
            known_utilization = max(
                (
                    event.utilization
                    for event in self._latest[slot].values()
                    if event.utilization is not None
                ),
                default=0.0,
            )
            limit = self._worker_limits[slot]
            load = self._active[slot] / limit if limit else math.inf
            return known_utilization, load, slot

        return min(candidates, key=score)

    def _next_poll_delay_locked(self) -> float:
        now = self._clock()
        future_resets = [
            reset_at
            for limits in self._blocked_until.values()
            for reset_at in limits.values()
            if math.isfinite(reset_at) and reset_at > now
        ]
        if not future_resets:
            return self._capacity_poll_seconds
        return max(
            0.01,
            min(self._capacity_poll_seconds, min(future_resets) - now),
        )

    def _validate_slot(self, account_slot: int) -> None:
        if account_slot not in self._tokens:
            raise ValueError(f"Unknown Claude account slot {account_slot}")

    def _require_lease_locked(self, lease: ClaudeCredentialLease) -> None:
        if lease._pool is not self:
            raise ValueError("Claude credential lease belongs to another pool")

    def _require_active_lease_locked(self, lease: ClaudeCredentialLease) -> None:
        self._require_lease_locked(lease)
        if not lease._active:
            raise RuntimeError("Claude credential lease is not active")


def _optional_integer(value: object) -> int | None:
    return value if type(value) is int else None


def _optional_number(value: object) -> float | None:
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return float(value)
    return None

````


## vista-c97c354/src/vista/backends/claude/runner.py

````text
"""Run one visual-game trajectory through Claude Code and native MCP."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import queue
import secrets
import shutil
import subprocess
import tempfile
import threading
import time
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

from vista.backends.claude.mcp_host import ClaudeGameMcpHost
from vista.backends.claude.provider import (
    ANTHROPIC_PROVIDER,
    PROVIDER_ENV_NAMES,
    ClaudeCodeProvider,
    provider_environment,
)
from vista.backends.claude.quota import (
    ClaudeRateLimitEvent,
    rate_limit_event_from_message,
)
from vista.core.dispatcher import GameToolDispatcher
from vista.core.player import RecoveryPrompts, ToolInterface
from vista.core.session import CompactRecovery, RetryRecovery, RuntimeRecovery
from vista.core.timeouts import (
    ENV_CONNECT_RETRIES as ARC_CONNECT_RETRIES,
    ENV_CONNECT_TIMEOUT_SECONDS as ARC_CONNECT_TIMEOUT_SECONDS,
    ENV_READ_TIMEOUT_SECONDS as ARC_READ_TIMEOUT_SECONDS,
)

PLAYER_IMAGE = "arc3-claude-player:0.1"
CONTAINER_CLAUDE_BIN = "/opt/claude/claude"
CONTAINER_MCP_BRIDGE = "/opt/arc3/claude_mcp_bridge.py"
CONTAINER_COMPACT_HOOK = "/opt/arc3/claude_compact_hook.py"
PINNED_CLAUDE_VERSION = "2.1.220"
DEFAULT_PINNED_CLAUDE_BIN = (
    Path.home() / ".local" / "share" / "claude" / "versions" / PINNED_CLAUDE_VERSION
)
DEFAULT_CLAUDE_MODEL = "opus"
DEFAULT_CLAUDE_EFFORT = "xhigh"
CLAUDE_EFFORT_LEVELS = ("low", "medium", "high", "xhigh", "max")
CLAUDE_PERMISSION_MODE = "default"
MAX_MCP_OUTPUT_TOKENS = 100_000
CLAUDE_PROVIDER_IMAGE_LIMIT = 600
CLAUDE_PROVIDER_IMAGE_COMPACT_AT = CLAUDE_PROVIDER_IMAGE_LIMIT - 1
CLAUDE_AUTO_COMPACT_WINDOW = 1_000_000
CLAUDE_AUTO_COMPACT_PERCENT = 90
DEFAULT_DECISION_LEASE_TIMEOUT_SECONDS = 120 * 60
PLAY_SETTLEMENT_TIMEOUT_SECONDS = (
    ARC_READ_TIMEOUT_SECONDS
    + ARC_CONNECT_TIMEOUT_SECONDS * (ARC_CONNECT_RETRIES + 1)
    + 5
)
CREDENTIAL_ENV_NAMES = (
    "CLAUDE_CODE_OAUTH_TOKEN",
    "ANTHROPIC_API_KEY",
    "ARC_API_KEY",
)
RUNTIME_PREFLIGHT_PROMPT = (
    "This is a runtime preflight, not a game. Do not call tools. Reply exactly READY."
)


@dataclass(frozen=True)
class ClaudeUsage:
    input_tokens: int
    output_tokens: int
    cache_creation_input_tokens: int
    cache_read_input_tokens: int
    cost_usd: float | None
    num_turns: int | None


@dataclass(frozen=True)
class ClaudeResult:
    segment: int
    returncode: int
    process_returncode: int
    final_message: str
    session_id: str | None
    resolved_models: tuple[str, ...]
    stdout_path: Path
    stderr_path: Path
    input_path: Path
    command_path: Path
    bridge_log_path: Path
    compact_events_path: Path
    usage: ClaudeUsage | None
    api_error_status: int | None = None
    session_image_blocks: int = 0
    peak_session_image_blocks: int = 0
    reset_boundary: bool = False
    context_boundary: str | None = None
    init_envelope: dict[str, Any] | None = None
    compact_boundaries: tuple[dict[str, Any], ...] = ()
    decision_lease_failure: str | None = None
    unconfirmed_play_calls: int = 0
    rate_limit_events: tuple[ClaudeRateLimitEvent, ...] = ()


@dataclass
class DecisionLeaseWatchdog:
    timeout_seconds: float
    started_at: float
    completed_tool_calls: int = 0

    def expired(
        self,
        *,
        now: float,
        completed_tool_calls: int,
        tool_calls_in_flight: int,
        last_tool_completed_at: float | None,
    ) -> bool:
        if completed_tool_calls != self.completed_tool_calls:
            self.completed_tool_calls = completed_tool_calls
            self.started_at = last_tool_completed_at or now
        if tool_calls_in_flight:
            return False
        return now - self.started_at >= self.timeout_seconds


class ClaudePreflightController:
    """A non-game controller used to initialize the exact formal runtime."""

    compact_restore_marker = None
    compact_checkpoint_marker = None
    retry_boundary_pending = False
    reset_starts_fresh_session = False

    @staticmethod
    def initial_image_paths() -> tuple[Path, ...]:
        return ()

    @staticmethod
    def handle(request: object) -> dict[str, Any]:
        return {
            "ok": False,
            "metadata": {
                "error": "Game tools are unavailable during runtime preflight."
            },
        }


def default_claude_bin(*, fallback: Path | None = None) -> Path:
    configured = os.getenv("ARC3_CLAUDE_BIN")
    candidate = (
        Path(configured).expanduser()
        if configured
        else DEFAULT_PINNED_CLAUDE_BIN
        if fallback is None
        else fallback
    )
    if not candidate.is_file() or not os.access(candidate, os.X_OK):
        raise FileNotFoundError(
            f"Claude Code {PINNED_CLAUDE_VERSION} was not found at {candidate}."
        )
    return candidate.resolve()


def credential_free_environment(
    environ: dict[str, str] | None = None,
) -> dict[str, str]:
    child = dict(os.environ if environ is None else environ)
    for name in tuple(child):
        if name in CREDENTIAL_ENV_NAMES or name.startswith("CLAUDE_CODE_OAUTH_TOKEN_"):
            child.pop(name)
    return child


def claude_version(binary: Path | None = None) -> str:
    executable = (binary or default_claude_bin()).resolve()
    result = subprocess.run(
        [str(executable), "--version"],
        text=True,
        capture_output=True,
        check=True,
        env=credential_free_environment(),
    )
    output = result.stdout.strip()
    return output.split()[0] if output else ""


def validate_claude_runtime(
    binary: Path | None = None,
    *,
    oauth_token: str | None = None,
    provider: ClaudeCodeProvider = ANTHROPIC_PROVIDER,
    provider_credential: str | None = None,
) -> Path:
    executable = (binary or default_claude_bin()).resolve()
    if not executable.is_file():
        raise FileNotFoundError(f"Claude Code binary not found at {executable}")
    version = claude_version(executable)
    if version != PINNED_CLAUDE_VERSION:
        raise RuntimeError(
            f"Claude Code {PINNED_CLAUDE_VERSION} is required; found {version or 'unknown'}."
        )
    if provider.native:
        token = (
            oauth_token
            if oauth_token is not None
            else os.getenv("CLAUDE_CODE_OAUTH_TOKEN")
        )
        if not token:
            raise RuntimeError(
                "CLAUDE_CODE_OAUTH_TOKEN is not set; run `claude setup-token` and "
                "export the generated subscription token."
            )
        return executable
    credential = (
        provider_credential
        if provider_credential is not None
        else os.getenv(provider.credential_env)
    )
    if not credential:
        raise RuntimeError(f"{provider.credential_env} is not set.")
    return executable


def claude_process_environment(
    oauth_token: str,
    environ: dict[str, str] | None = None,
) -> dict[str, str]:
    """Build a child environment containing only the assigned Claude credential."""

    if not oauth_token:
        raise ValueError("Claude OAuth token must not be empty")
    child = credential_free_environment(environ)
    child["CLAUDE_CODE_OAUTH_TOKEN"] = oauth_token
    return child


def provider_process_environment(
    variables: dict[str, str],
    environ: dict[str, str] | None = None,
) -> dict[str, str]:
    """A child environment selecting exactly one model provider.

    Every variable that could redirect Claude Code to another endpoint or
    credential is removed first, so a run cannot inherit a token or a base
    URL that some earlier run left in the environment.
    """
    child = credential_free_environment(environ)
    for name in tuple(child):
        if name in PROVIDER_ENV_NAMES or name.startswith("ANTHROPIC_DEFAULT_"):
            child.pop(name)
    child.update(variables)
    return child


def prepare_claude_config(target: Path) -> Path:
    target.mkdir(parents=True, exist_ok=True)
    target.chmod(0o700)
    return target.resolve()


def create_short_socket_dir(segment: int) -> Path:
    """Create a private host path that stays below the AF_UNIX path limit."""

    directory = Path(tempfile.mkdtemp(prefix=f"arc3-claude-{segment:03d}-"))
    directory.chmod(0o700)
    socket_path = directory / "controller.sock"
    if len(os.fsencode(socket_path)) >= 100:
        shutil.rmtree(directory, ignore_errors=True)
        raise RuntimeError("Unable to create a sufficiently short game socket path.")
    return directory


class ClaudeCodeRunner:
    def __init__(
        self,
        *,
        visible_dir: Path,
        claude_config_dir: Path,
        io_dir: Path,
        controller: Any,
        claude_bin: Path | None = None,
        ca_bundle: Path | None = None,
        model: str = DEFAULT_CLAUDE_MODEL,
        effort: str = DEFAULT_CLAUDE_EFFORT,
        expected_model_id: str | None = None,
        oauth_token: str | None = None,
        task_timeout: int = 3600,
        image: str = PLAYER_IMAGE,
        display_size: int = 512,
        auto_compact_window: int | None = CLAUDE_AUTO_COMPACT_WINDOW,
        auto_compact_percent: int | None = CLAUDE_AUTO_COMPACT_PERCENT,
        decision_lease_timeout: int = DEFAULT_DECISION_LEASE_TIMEOUT_SECONDS,
        rate_limit_observer: Callable[[ClaudeRateLimitEvent], None] | None = None,
        credential_yield_requested: Callable[[], bool] | None = None,
        tool_interface: ToolInterface | None = None,
        recovery_prompts: RecoveryPrompts | None = None,
        native_compaction: bool = False,
        provider: ClaudeCodeProvider | None = None,
        provider_credential: str | None = None,
        provider_base_url: str | None = None,
        max_output_tokens: int | None = None,
        mcp_tool_timeout_ms: int | None = None,
    ) -> None:
        self.tool_interface = tool_interface
        self.recovery_prompts = recovery_prompts
        self.native_compaction = native_compaction
        self.visible_dir = visible_dir.resolve()
        self.guide_path = self.visible_dir / "GUIDE.md"
        self.working_path = self.visible_dir / "WORKING.md"
        self.agents_path = self.visible_dir / "AGENTS.md"
        self.agents_instructions = self.agents_path.read_text(encoding="utf-8")
        self.claude_config_dir = prepare_claude_config(claude_config_dir)
        self.io_dir = io_dir.resolve()
        self.controller = controller
        self.dispatcher = (
            tool_interface.executor
            if tool_interface is not None
            else GameToolDispatcher(
                controller=controller,
                guide_path=self.guide_path,
                working_path=self.working_path,
                checkpoint_via_working=True,
                interrupt_on_invalid_action_limit=True,
            )
        )
        self.claude_bin = (claude_bin or default_claude_bin()).resolve()
        self.ca_bundle = (
            ca_bundle or Path("/etc/ssl/certs/ca-certificates.crt")
        ).resolve()
        if effort not in CLAUDE_EFFORT_LEVELS:
            raise ValueError(
                f"Unsupported Claude effort {effort!r}; expected one of "
                f"{', '.join(CLAUDE_EFFORT_LEVELS)}."
            )
        self.model = model
        self.effort = effort
        self.expected_model_id = expected_model_id
        provider = provider or ANTHROPIC_PROVIDER
        self.provider = provider
        self.provider_base_url = provider_base_url
        if provider.native:
            self.oauth_token = (
                oauth_token
                if oauth_token is not None
                else os.getenv("CLAUDE_CODE_OAUTH_TOKEN")
            )
            if not self.oauth_token:
                raise RuntimeError(
                    "CLAUDE_CODE_OAUTH_TOKEN is not set; run `claude setup-token` and "
                    "export the generated subscription token."
                )
            self.provider_credential = self.oauth_token
        else:
            self.oauth_token = None
            self.provider_credential = (
                provider_credential
                if provider_credential is not None
                else os.getenv(provider.credential_env)
            )
            if not self.provider_credential:
                raise RuntimeError(f"{provider.credential_env} is not set.")
        self.provider_environment = provider_environment(
            provider,
            credential=self.provider_credential,
            model=model,
            effort=effort,
            base_url=provider_base_url,
        )
        for name, value in (
            ("max_output_tokens", max_output_tokens),
            ("mcp_tool_timeout_ms", mcp_tool_timeout_ms),
        ):
            if value is not None and (type(value) is not int or value < 1):
                raise ValueError(f"{name} must be a positive integer")
        self.max_output_tokens = (
            max_output_tokens
            if max_output_tokens is not None
            else provider.max_output_tokens
        )
        self.mcp_tool_timeout_ms = (
            mcp_tool_timeout_ms
            if mcp_tool_timeout_ms is not None
            else provider.mcp_tool_timeout_ms
        )
        self.task_timeout = task_timeout
        if decision_lease_timeout < 1:
            raise ValueError("The decision lease timeout must be positive.")
        self.decision_lease_timeout = decision_lease_timeout
        self.image = image
        self.display_size = display_size
        if (auto_compact_window is None) != (auto_compact_percent is None):
            raise ValueError("Both auto-compact settings must be provided together.")
        if auto_compact_window is not None and auto_compact_window < 1:
            raise ValueError("The auto-compact window must be positive.")
        if auto_compact_percent is not None and not 1 <= auto_compact_percent <= 100:
            raise ValueError("The auto-compact percentage must be between 1 and 100.")
        self.auto_compact_window = auto_compact_window
        self.auto_compact_percent = auto_compact_percent
        if native_compaction:
            self.auto_compact_window = None
            self.auto_compact_percent = None
        self.rate_limit_observer = rate_limit_observer
        self.credential_yield_requested = credential_yield_requested
        self._segment_index = 0
        self._session_image_blocks: dict[str, int] = {}
        self.io_dir.mkdir(parents=True, exist_ok=True)
        for path in (
            self.guide_path,
            self.agents_path,
            self.visible_dir / "screenshots",
            self.ca_bundle,
            Path(__file__).with_name("mcp_bridge.py"),
            Path(__file__).with_name("compact_hook.py"),
        ):
            if not path.exists():
                raise FileNotFoundError(f"Incomplete Claude player runtime: {path}")

    def run_task(self, prompt: str) -> ClaudeResult:
        return self._run_segment(
            prompt=prompt,
            initial_images=self.controller.initial_image_paths(),
        )

    def replace_oauth_token(self, oauth_token: str) -> None:
        if not oauth_token:
            raise ValueError("Claude OAuth token must be non-empty")
        if not self.provider.native:
            raise ValueError("OAuth token relay requires the Anthropic provider")
        self.oauth_token = oauth_token
        self.provider_credential = oauth_token
        self.provider_environment = provider_environment(
            self.provider,
            credential=oauth_token,
            model=self.model,
            effort=self.effort,
            base_url=self.provider_base_url,
        )

    def _process_environment(self) -> dict[str, str]:
        if self.provider.native:
            return claude_process_environment(self.oauth_token)
        return provider_process_environment(self.provider_environment)

    def _container_name(self, session_id: str) -> str | None:
        # Name containers for compatible providers so they can be removed
        # explicitly when the client process is terminated.
        if self.provider.native:
            return None
        return f"arc3-{session_id}"

    def run_retry_task(self, recovery: RetryRecovery) -> ClaudeResult:
        return self._run_segment(
            prompt=self._recovery_prompt("retry", recovery),
            initial_images=recovery.image_paths,
            before_input=lambda: self.controller.complete_retry_recovery(recovery),
        )

    def resume_retry_task(
        self,
        session_id: str,
        recovery: RetryRecovery,
    ) -> ClaudeResult:
        return self._run_segment(
            prompt=self._recovery_prompt("retry", recovery),
            initial_images=recovery.image_paths,
            resume_session_id=session_id,
        )

    def resume_nonterminal_task(
        self,
        session_id: str,
        prompt: str,
    ) -> ClaudeResult:
        return self._run_segment(
            prompt=prompt,
            initial_images=(),
            resume_session_id=session_id,
        )

    def run_fresh_runtime_recovery(
        self,
        recovery: RuntimeRecovery,
    ) -> ClaudeResult:
        return self._run_segment(
            prompt=self._recovery_prompt("fresh_runtime", recovery),
            initial_images=recovery.image_paths,
            before_input=lambda: self.controller.complete_runtime_recovery(
                recovery,
                delivery="fresh_runtime_thread",
            ),
        )

    def run_compact_recovery(
        self,
        recovery: CompactRecovery,
        *,
        prompt: str | None = None,
    ) -> ClaudeResult:
        recovery_prompt = self._recovery_prompt("compact", recovery)
        if prompt is not None:
            recovery_prompt = "\n\n".join((recovery_prompt, prompt))
        return self._run_segment(
            prompt=recovery_prompt,
            initial_images=recovery.image_paths,
            before_input=lambda: self.controller.complete_compact_recovery(
                recovery,
                delivery="fresh_thread",
            ),
        )

    def _recovery_prompt(self, kind: str, recovery: Any) -> str:
        if self.recovery_prompts is not None:
            return getattr(self.recovery_prompts, kind)(recovery)
        return self._default_recovery_prompt(kind, recovery)

    def _default_recovery_prompt(self, kind: str, recovery: Any) -> str:
        raise RuntimeError("Task recovery prompts must be supplied by the adapter")

    def _default_tool_definitions(self) -> list[dict[str, Any]]:
        raise RuntimeError("Task tools must be supplied by the adapter")

    def run_input(
        self, task_input: Any, *, session_id: str | None = None
    ) -> ClaudeResult:
        from vista.backends.content import ordered_content

        return self._run_segment(
            prompt=task_input.text,
            initial_images=(),
            resume_session_id=session_id,
            ordered_input=ordered_content(task_input, "claude"),
        )

    def _tool_definitions(self) -> list[dict[str, Any]]:
        if self.tool_interface is not None:
            return list(self.tool_interface.definitions)
        return self._default_tool_definitions()

    def _mcp_tool_definitions(self) -> list[dict[str, Any]]:
        return self._tool_definitions()

    def _next_segment(self) -> int:
        segment = self._segment_index
        self._segment_index += 1
        return segment

    def _run_segment(
        self,
        *,
        prompt: str,
        initial_images: Any,
        resume_session_id: str | None = None,
        before_input: Callable[[], None] | None = None,
        disable_slash_commands: bool = True,
        ordered_input: list[dict[str, Any]] | None = None,
    ) -> ClaudeResult:
        validate_claude_runtime(
            self.claude_bin,
            oauth_token=self.oauth_token,
            provider=self.provider,
            provider_credential=self.provider_credential,
        )
        initial_images = tuple(initial_images)
        segment = self._next_segment()
        stem = f"segment_{segment:03d}"
        requested_session_id = resume_session_id or str(uuid.uuid4())
        container_name = self._container_name(requested_session_id)
        initial_image_blocks = self._session_image_blocks.get(
            requested_session_id, 0
        ) + (
            sum(block.get("type") == "image" for block in ordered_input)
            if ordered_input is not None
            else len(initial_images)
        )
        if initial_image_blocks >= CLAUDE_PROVIDER_IMAGE_LIMIT:
            raise RuntimeError(
                "Claude session reached the provider image safety limit before input."
            )
        stdout_path = self.io_dir / f"{stem}.stdout.jsonl"
        stderr_path = self.io_dir / f"{stem}.stderr.txt"
        input_path = self.io_dir / f"{stem}.input.json"
        command_path = self.io_dir / f"{stem}.command.json"
        bridge_log_path = self.io_dir / f"{stem}.bridge.jsonl"
        compact_events_path = self.io_dir / f"{stem}.compact.jsonl"
        bridge_token = secrets.token_urlsafe(32)
        mcp_config_path = self.claude_config_dir / f"{stem}.mcp.json"
        settings_path = self.claude_config_dir / f"{stem}.settings.json"
        self._write_mcp_config(mcp_config_path, bridge_token)
        self._write_settings(settings_path, compact_events_path.name)
        socket_dir = create_short_socket_dir(segment)
        socket_path = socket_dir / "controller.sock"

        command = self._docker_command(
            mcp_config_path=mcp_config_path,
            settings_path=settings_path,
            socket_dir=socket_dir,
            session_id=requested_session_id,
            resume=resume_session_id is not None,
            disable_slash_commands=disable_slash_commands,
        )
        command_path.write_text(json.dumps(command, indent=2), encoding="utf-8")
        input_message = stream_user_message(prompt, initial_images)
        if ordered_input is not None:
            input_message["message"]["content"] = ordered_input
        input_path.write_text(
            json.dumps(sanitize_stream_message(input_message), indent=2),
            encoding="utf-8",
        )

        host = ClaudeGameMcpHost(
            socket_path=socket_path,
            token=bridge_token,
            dispatcher=self.dispatcher,
            display_size=self.display_size,
            log_path=bridge_log_path,
            call_namespace=stem,
            initial_image_blocks=initial_image_blocks,
            image_block_limit=CLAUDE_PROVIDER_IMAGE_LIMIT,
            image_compact_at=CLAUDE_PROVIDER_IMAGE_COMPACT_AT,
            include_compact_checkpoint=False,
            reset_requires_retry_state=(self.controller.reset_starts_fresh_session),
            tool_interface=self.tool_interface,
            native_compaction=self.native_compaction,
            tool_definitions=self._mcp_tool_definitions(),
        )
        process: subprocess.Popen[str] | None = None
        stream_queue: queue.Queue[tuple[str, str] | object] = queue.Queue()
        closed = object()
        final_message = ""
        resolved_models: set[str] = set()
        result_message: dict[str, Any] | None = None
        init_envelope: dict[str, Any] | None = None
        failure: str | None = None
        reset_boundary = False
        context_boundary: str | None = None
        compact_boundaries: list[dict[str, Any]] = []
        pending_play_tool_ids: set[str] = set()
        api_error_status: int | None = None
        decision_lease_failure: str | None = None
        unconfirmed_play_calls = 0
        rate_limit_events: list[ClaudeRateLimitEvent] = []

        try:
            host.start()
            process = subprocess.Popen(
                command,
                cwd=self.visible_dir,
                env=self._process_environment(),
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1,
            )
            assert process.stdin is not None
            assert process.stdout is not None
            assert process.stderr is not None
            stdout_thread = _start_stream_reader(
                process.stdout, "stdout", stream_queue, stdout_path, closed
            )
            stderr_thread = _start_stream_reader(
                process.stderr, "stderr", stream_queue, stderr_path, closed
            )
            if not host.connected.wait(timeout=30):
                if host.failure is not None:
                    raise RuntimeError(
                        f"Claude game MCP failed: {type(host.failure).__name__}: "
                        f"{host.failure}"
                    )
                raise TimeoutError("Claude game MCP did not connect before input.")
            if not host.tools_ready.wait(timeout=30):
                if host.failure is not None:
                    raise RuntimeError(
                        f"Claude game MCP failed: {type(host.failure).__name__}: "
                        f"{host.failure}"
                    )
                raise TimeoutError("Claude game tools were not delivered before input.")
            process.stdin.write(json.dumps(input_message, separators=(",", ":")) + "\n")
            process.stdin.flush()
            closed_streams = 0
            init_deadline = time.monotonic() + 30
            while init_envelope is None:
                if host.failure is not None:
                    raise RuntimeError(
                        f"Claude game MCP failed: {type(host.failure).__name__}: "
                        f"{host.failure}"
                    )
                if time.monotonic() >= init_deadline:
                    raise TimeoutError(
                        "Claude Code emitted no initialization envelope."
                    )
                try:
                    item = stream_queue.get(timeout=0.1)
                except queue.Empty:
                    if process.poll() is not None:
                        raise RuntimeError(
                            "Claude Code exited before runtime initialization."
                        )
                    continue
                if item is closed:
                    closed_streams += 1
                    continue
                source, line = item
                if source != "stdout":
                    continue
                try:
                    message = json.loads(line)
                except json.JSONDecodeError as exc:
                    raise RuntimeError(
                        "Claude Code emitted invalid stream JSON during initialization."
                    ) from exc
                if message.get("type") != "system" or message.get("subtype") != "init":
                    continue
                init_envelope = message
                model = message.get("model")
                if isinstance(model, str):
                    resolved_models.add(model)
            sanitized_init = sanitize_init_envelope(init_envelope)
            validate_instruction_envelope(
                sanitized_init,
                display_size=self.display_size,
                allow_slash_commands=not disable_slash_commands,
                tool_definitions=self._tool_definitions(),
            )
            if self.expected_model_id is not None:
                actual_model = resolved_model_id_from_envelope(sanitized_init)
                if actual_model != self.expected_model_id:
                    raise RuntimeError(
                        "Claude resolved a different model than the runtime preflight."
                    )
            if before_input is not None:
                before_input()
            host.enable_calls()
            decision_lease = DecisionLeaseWatchdog(
                timeout_seconds=self.decision_lease_timeout,
                started_at=time.monotonic(),
            )
            process.stdin.close()
            deadline = time.monotonic() + self.task_timeout
            while True:
                if host.failure is not None:
                    failure = f"MCP host failed: {type(host.failure).__name__}: {host.failure}"
                    _terminate(process, container_name)
                if (
                    host.boundary_delivered.is_set()
                    and not reset_boundary
                    and context_boundary is None
                ):
                    if self.tool_interface is not None and host.boundary_reason in {
                        "decision_complete",
                        "task_complete",
                        "provider_image_limit",
                    }:
                        context_boundary = host.boundary_reason
                    elif host.boundary_reason == "compact_checkpoint_saved":
                        context_boundary = "compact_checkpoint_saved"
                    elif host.boundary_reason == "compact_checkpoint":
                        context_boundary = "provider_image_limit"
                    elif host.boundary_reason == "invalid_action_limit":
                        context_boundary = "invalid_action_limit"
                        decision_lease_failure = "invalid_action_limit"
                    else:
                        reset_boundary = True
                    time.sleep(0.1)
                    _terminate(process, container_name)
                if (
                    context_boundary is None
                    and not reset_boundary
                    and self.credential_yield_requested is not None
                    and self.credential_yield_requested()
                ):
                    _, in_flight_calls, _ = host.tool_activity()
                    if credential_handoff_is_safe(
                        process_running=process.poll() is None,
                        tool_calls_in_flight=in_flight_calls,
                        pending_play_tool_ids=pending_play_tool_ids,
                        unconfirmed_play_calls=host.unconfirmed_play_calls,
                    ):
                        context_boundary = "credential_rate_limit"
                        decision_lease_failure = "credential_rate_limit"
                        host.disable_calls()
                        _terminate(process, container_name)
                if time.monotonic() >= deadline:
                    failure = "Claude player timed out."
                    _terminate(process, container_name)
                now = time.monotonic()
                completed_calls, in_flight_calls, last_completed_at = (
                    host.tool_activity()
                )
                if process.poll() is None and decision_lease.expired(
                    now=now,
                    completed_tool_calls=completed_calls,
                    tool_calls_in_flight=in_flight_calls,
                    last_tool_completed_at=last_completed_at,
                ):
                    decision_lease_failure = "decision_timeout"
                    failure = "Claude decision lease expired without another tool call."
                    host.disable_calls()
                    _terminate(process, container_name)
                try:
                    item = stream_queue.get(timeout=0.1)
                except queue.Empty:
                    if process.poll() is not None and closed_streams >= 2:
                        break
                    continue
                if item is closed:
                    closed_streams += 1
                    if process.poll() is not None and closed_streams >= 2:
                        break
                    continue
                source, line = item
                if source != "stdout":
                    continue
                try:
                    message = json.loads(line)
                except json.JSONDecodeError:
                    failure = "Claude Code emitted invalid stream JSON."
                    continue
                rate_limit_event = rate_limit_event_from_message(message)
                if rate_limit_event is not None:
                    rate_limit_events.append(rate_limit_event)
                    if self.rate_limit_observer is not None:
                        self.rate_limit_observer(rate_limit_event)
                status = api_error_status_from_message(message)
                if status is not None:
                    api_error_status = status
                message_type = message.get("type")
                if message_type == "system" and message.get("subtype") == "init":
                    init_envelope = message
                    model = message.get("model")
                    if isinstance(model, str):
                        resolved_models.add(model)
                elif (
                    message_type == "system"
                    and message.get("subtype") == "compact_boundary"
                ):
                    compact_boundaries.append(sanitize_compact_boundary(message))
                    host.acknowledge_compaction()
                    if not self.native_compaction:
                        host.disable_calls()
                        context_boundary = "native_compact"
                        _terminate(process, container_name)
                elif message_type == "assistant":
                    assistant = message.get("message")
                    if isinstance(assistant, dict):
                        record_pending_play_tool_uses(
                            assistant,
                            pending_play_tool_ids,
                            tool_names={
                                f"mcp__game__{name}" for name in host.action_tools
                            },
                        )
                        model = assistant.get("model")
                        if isinstance(model, str):
                            resolved_models.add(model)
                        for block in assistant.get("content", []):
                            if not isinstance(block, dict):
                                continue
                            if block.get("type") == "text":
                                text = block.get("text")
                                if isinstance(text, str):
                                    final_message = text
                elif message_type == "user":
                    user_message = message.get("message")
                    if isinstance(user_message, dict):
                        acknowledge_completed_play_tools(
                            user_message,
                            pending_play_tool_ids,
                            host.acknowledge_action_result,
                        )
                elif message_type == "result":
                    result_message = message
                    reported_failure = decision_lease_failure_from_result(message)
                    if reported_failure is not None:
                        decision_lease_failure = reported_failure
                        failure = "Claude ended the decision lease with an error."
                    result_text = message.get("result")
                    if isinstance(result_text, str):
                        final_message = result_text
                    model_usage = message.get("modelUsage")
                    if isinstance(model_usage, dict):
                        resolved_models.update(
                            key for key in model_usage if isinstance(key, str)
                        )
            stdout_thread.join(timeout=5)
            stderr_thread.join(timeout=5)
        except Exception as exc:
            failure = f"{type(exc).__name__}: {exc}"
            if process is not None:
                _terminate(process, container_name)
        finally:
            if process is not None:
                try:
                    process_returncode = process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    process.kill()
                    process_returncode = process.wait()
            else:
                process_returncode = 125
            if host.unconfirmed_play_calls and host.failure is None:
                host.wait_for_play_settlement(PLAY_SETTLEMENT_TIMEOUT_SECONDS)
            unconfirmed_play_calls = host.unconfirmed_play_calls
            if (
                context_boundary is None
                and not reset_boundary
                and self.credential_yield_requested is not None
                and self.credential_yield_requested()
            ):
                _, in_flight_calls, _ = host.tool_activity()
                if credential_handoff_is_safe(
                    process_running=False,
                    tool_calls_in_flight=in_flight_calls,
                    pending_play_tool_ids=pending_play_tool_ids,
                    unconfirmed_play_calls=unconfirmed_play_calls,
                ):
                    context_boundary = "credential_rate_limit"
                    decision_lease_failure = "credential_rate_limit"
            if unconfirmed_play_calls:
                decision_lease_failure = "unconfirmed_play"
                failure = "A play call did not reach a confirmed controller result."
            host.stop()
            mcp_config_path.unlink(missing_ok=True)
            shutil.rmtree(socket_dir, ignore_errors=True)

        if context_boundary is None and host.boundary_delivered.is_set():
            # The boundary landed while the streams were already closing.
            context_boundary = host.boundary_reason
        if (
            self.tool_interface is not None
            and decision_lease_failure == "runtime_exit"
            and aborted_at_boundary(result_message, boundary=context_boundary)
        ):
            # The host ended this segment on purpose (a decision or the task
            # completed) and terminated the CLI, which reports the stream it
            # was cut off from as an execution error. That is the expected
            # shape of a boundary, not a failure.
            decision_lease_failure = None
            failure = None
            with stderr_path.open("a", encoding="utf-8") as stream:
                stream.write(
                    f"Claude stream aborted at the {context_boundary} boundary.\n"
                )
        if failure:
            with stderr_path.open("a", encoding="utf-8") as stream:
                stream.write(failure + "\n")
        if self.tool_interface is not None and failure:
            returncode = 1
        elif reset_boundary or context_boundary is not None:
            returncode = 0
        elif failure:
            returncode = 1
        else:
            returncode = process_returncode
        if (
            returncode == 0
            and not reset_boundary
            and context_boundary is None
            and result_message is None
        ):
            returncode = 1
            with stderr_path.open("a", encoding="utf-8") as stream:
                stream.write("Claude Code exited without a result message.\n")
        if returncode != 0 and decision_lease_failure is None:
            decision_lease_failure = "runtime_exit"

        observed_session_id = None
        if init_envelope is not None and isinstance(
            init_envelope.get("session_id"), str
        ):
            observed_session_id = init_envelope["session_id"]
        elif init_envelope is not None:
            observed_session_id = requested_session_id
        session_image_blocks = host.image_blocks_delivered
        if observed_session_id is not None:
            self._session_image_blocks[observed_session_id] = session_image_blocks
        self._session_image_blocks[requested_session_id] = session_image_blocks
        return ClaudeResult(
            segment=segment,
            returncode=returncode,
            process_returncode=process_returncode,
            final_message=final_message,
            session_id=observed_session_id,
            resolved_models=tuple(sorted(resolved_models)),
            stdout_path=stdout_path,
            stderr_path=stderr_path,
            input_path=input_path,
            command_path=command_path,
            bridge_log_path=bridge_log_path,
            compact_events_path=compact_events_path,
            usage=usage_from_result(result_message),
            api_error_status=api_error_status,
            session_image_blocks=session_image_blocks,
            peak_session_image_blocks=host.peak_image_blocks,
            reset_boundary=reset_boundary,
            context_boundary=context_boundary,
            init_envelope=sanitize_init_envelope(init_envelope),
            compact_boundaries=tuple(compact_boundaries),
            decision_lease_failure=decision_lease_failure,
            unconfirmed_play_calls=unconfirmed_play_calls,
            rate_limit_events=tuple(rate_limit_events),
        )

    def _write_mcp_config(self, path: Path, token: str) -> None:
        path.write_text(
            json.dumps(
                {
                    "mcpServers": {
                        "game": {
                            "type": "stdio",
                            "command": "/usr/bin/env",
                            "args": [
                                *(
                                    argument
                                    for name in CREDENTIAL_ENV_NAMES
                                    for argument in ("-u", name)
                                ),
                                "python3",
                                CONTAINER_MCP_BRIDGE,
                            ],
                            "env": {
                                "ARC3_GAME_SOCKET": "/run/arc3-game/controller.sock",
                                "ARC3_GAME_TOKEN": token,
                            },
                        }
                    }
                },
                separators=(",", ":"),
            ),
            encoding="utf-8",
        )
        path.chmod(0o600)

    def _write_settings(
        self,
        path: Path,
        compact_event_log_name: str,
    ) -> None:
        if self.native_compaction:
            path.write_text(
                '{"autoCompactEnabled":true,"hooks":{}}\n', encoding="utf-8"
            )
            path.chmod(0o600)
            return
        unset_credentials = " ".join(f"-u {name}" for name in CREDENTIAL_ENV_NAMES)
        hook_environment = [
            f"ARC3_COMPACT_EVENT_LOG=/claude-io/{compact_event_log_name}"
        ]
        marker_environment = (
            (
                "ARC3_COMPACT_CHECKPOINT_REQUEST",
                getattr(self.controller, "compact_checkpoint_marker", None),
            ),
            (
                "ARC3_COMPACT_CHECKPOINT_READY",
                getattr(self.controller, "compact_checkpoint_ready", None),
            ),
        )
        for name, marker in marker_environment:
            if marker is not None:
                hook_environment.append(
                    f"{name}={self._container_io_path(Path(marker))}"
                )
        hook = {
            "type": "command",
            "command": (
                f"/usr/bin/env {unset_credentials} "
                f"{' '.join(hook_environment)} "
                f"python3 {CONTAINER_COMPACT_HOOK}"
            ),
            "timeout": 10,
        }
        path.write_text(
            json.dumps(
                {
                    "autoCompactEnabled": True,
                    "hooks": {
                        "PreCompact": [{"hooks": [hook]}],
                        "PostCompact": [{"hooks": [hook]}],
                        "Stop": [{"hooks": [hook]}],
                    },
                },
                separators=(",", ":"),
            ),
            encoding="utf-8",
        )
        path.chmod(0o600)

    def _container_io_path(self, path: Path) -> str:
        try:
            relative = path.resolve().relative_to(self.io_dir)
        except ValueError as exc:
            raise ValueError(
                "Compact markers must live inside the Claude I/O dir."
            ) from exc
        return str(Path("/claude-io") / relative)

    def _docker_command(
        self,
        *,
        mcp_config_path: Path,
        settings_path: Path,
        socket_dir: Path,
        session_id: str,
        resume: bool,
        disable_slash_commands: bool = True,
    ) -> list[str]:
        uid = str(os.getuid())
        gid = str(os.getgid())
        bridge = Path(__file__).with_name("mcp_bridge.py").resolve()
        compact_hook = Path(__file__).with_name("compact_hook.py").resolve()
        allowed_tools = ",".join(
            f"mcp__game__{tool['name']}" for tool in self._tool_definitions()
        )
        command = [
            "docker",
            "run",
            "-i",
            "--rm",
            "--pull=never",
            "--network",
            "bridge",
            "--read-only",
            "--cap-drop",
            "ALL",
            "--security-opt",
            "no-new-privileges",
            "--pids-limit",
            "256",
            "--memory",
            "16g",
            "--cpus",
            "4",
            "--user",
            f"{uid}:{gid}",
            "--tmpfs",
            "/tmp:rw,nosuid,nodev,size=256m",
            "--tmpfs",
            "/home/claude:rw,nosuid,nodev,size=64m",
            "--tmpfs",
            "/workspace:rw,nosuid,nodev,size=16m",
            *self._provider_arguments(session_id),
            "-e",
            "CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1",
            "-e",
            "CLAUDE_CODE_DISABLE_AUTO_MEMORY=1",
            "-e",
            "CLAUDE_CODE_DISABLE_CLAUDE_MDS=1",
            "-e",
            "CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1",
            "-e",
            "CLAUDE_CODE_DISABLE_CRON=1",
            "-e",
            "CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL=1",
            "-e",
            "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1",
            "-e",
            "CLAUDE_CODE_AUTO_CONNECT_IDE=false",
            *self._auto_compact_environment(),
            "-e",
            "CLAUDE_CONFIG_DIR=/claude-config",
            "-e",
            "HOME=/home/claude",
            "-e",
            "TERM=dumb",
            "-e",
            "NO_COLOR=1",
            "-e",
            f"MAX_MCP_OUTPUT_TOKENS={MAX_MCP_OUTPUT_TOKENS}",
            "-e",
            "SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt",
            "-v",
            f"{self.claude_bin}:{CONTAINER_CLAUDE_BIN}:ro",
            "-v",
            f"{bridge}:{CONTAINER_MCP_BRIDGE}:ro",
            "-v",
            f"{compact_hook}:{CONTAINER_COMPACT_HOOK}:ro",
            "-v",
            f"{self.ca_bundle}:/etc/ssl/certs/ca-certificates.crt:ro",
            "-v",
            f"{self.claude_config_dir}:/claude-config:rw",
            "-v",
            f"{self.io_dir}:/claude-io:rw",
            "-v",
            f"{socket_dir}:/run/arc3-game:rw",
            "-w",
            "/workspace",
            self.image,
            CONTAINER_CLAUDE_BIN,
            "-p",
            "--input-format",
            "stream-json",
            "--output-format",
            "stream-json",
            "--verbose",
            "--include-hook-events",
            "--model",
            self.model,
            "--effort",
            self.effort,
            "--system-prompt",
            self.agents_instructions,
            "--setting-sources",
            "",
            "--settings",
            f"/claude-config/{settings_path.name}",
            "--mcp-config",
            f"/claude-config/{mcp_config_path.name}",
            "--strict-mcp-config",
            "--tools",
            "",
            "--allowedTools",
            allowed_tools,
            "--permission-mode",
            CLAUDE_PERMISSION_MODE,
            "--prompt-suggestions",
            "false",
            "--no-chrome",
        ]
        if disable_slash_commands:
            command.append("--disable-slash-commands")
        if resume:
            command.extend(["--resume", session_id])
        else:
            command.extend(["--session-id", session_id])
        return command

    def _provider_arguments(self, session_id: str) -> list[str]:
        """Container arguments that select the model provider.

        The native provider passes `-e CLAUDE_CODE_OAUTH_TOKEN`.
        Another provider passes its own variable names (values come from the
        client environment), its output and MCP timeout limits, and a container
        name so the container can be removed with its client.
        """
        arguments = [
            argument for name in self.provider_environment for argument in ("-e", name)
        ]
        if self.max_output_tokens is not None:
            arguments += [
                "-e",
                f"CLAUDE_CODE_MAX_OUTPUT_TOKENS={self.max_output_tokens}",
            ]
        if self.mcp_tool_timeout_ms is not None:
            arguments += ["-e", f"MCP_TOOL_TIMEOUT={self.mcp_tool_timeout_ms}"]
        container = self._container_name(session_id)
        if container is not None:
            arguments += ["--name", container]
        return arguments

    def _auto_compact_environment(self) -> list[str]:
        window = self.auto_compact_window
        percent = self.auto_compact_percent
        if window is None:
            return []
        return [
            "-e",
            f"CLAUDE_CODE_AUTO_COMPACT_WINDOW={window}",
            "-e",
            f"CLAUDE_AUTOCOMPACT_PCT_OVERRIDE={percent}",
        ]


def stream_user_message(prompt: str, image_paths: Any) -> dict[str, Any]:
    content: list[dict[str, Any]] = [{"type": "text", "text": prompt}]
    for image_path in image_paths:
        path = Path(image_path)
        content.append(
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": {
                        ".jpg": "image/jpeg",
                        ".jpeg": "image/jpeg",
                        ".webp": "image/webp",
                        ".gif": "image/gif",
                    }.get(path.suffix.lower(), "image/png"),
                    "data": base64.b64encode(path.read_bytes()).decode("ascii"),
                },
            }
        )
    return {
        "type": "user",
        "message": {"role": "user", "content": content},
        "parent_tool_use_id": None,
    }


def sanitize_stream_message(message: dict[str, Any]) -> dict[str, Any]:
    sanitized = json.loads(json.dumps(message))
    content = sanitized.get("message", {}).get("content", [])
    for block in content:
        if not isinstance(block, dict) or block.get("type") != "image":
            continue
        source = block.get("source")
        if not isinstance(source, dict) or not isinstance(source.get("data"), str):
            continue
        data = source["data"]
        source["data"] = {
            "encoded_chars": len(data),
            "sha256": hashlib.sha256(data.encode("ascii")).hexdigest(),
        }
    return sanitized


def record_pending_play_tool_uses(
    assistant_message: dict[str, Any],
    pending: set[str],
    *,
    tool_names: set[str] | None = None,
) -> None:
    if tool_names is None:
        tool_names = {"mcp__game__play"}
    for block in assistant_message.get("content", []):
        if (
            isinstance(block, dict)
            and block.get("type") == "tool_use"
            and block.get("name") in tool_names
            and isinstance(block.get("id"), str)
        ):
            pending.add(block["id"])


def acknowledge_completed_play_tools(
    user_message: dict[str, Any],
    pending: set[str],
    acknowledge: Callable[[], None],
) -> None:
    returned_ids = {
        block["tool_use_id"]
        for block in user_message.get("content", [])
        if isinstance(block, dict)
        and block.get("type") == "tool_result"
        and isinstance(block.get("tool_use_id"), str)
    }
    completed = returned_ids & pending
    if not completed:
        return
    pending.difference_update(completed)
    acknowledge()


def credential_handoff_is_safe(
    *,
    process_running: bool,
    tool_calls_in_flight: int,
    pending_play_tool_ids: set[str],
    unconfirmed_play_calls: int,
) -> bool:
    if tool_calls_in_flight or unconfirmed_play_calls:
        return False
    return not process_running or not pending_play_tool_ids


def sanitize_init_envelope(value: dict[str, Any] | None) -> dict[str, Any] | None:
    if value is None:
        return None
    allowed = {
        "type",
        "subtype",
        "session_id",
        "tools",
        "mcp_servers",
        "model",
        "permissionMode",
        "slash_commands",
        "claude_code_version",
        "output_style",
        "skills",
        "plugins",
        "capabilities",
    }
    return {key: value[key] for key in allowed if key in value}


def validate_instruction_envelope(
    envelope: dict[str, Any] | None,
    *,
    display_size: int,
    allow_slash_commands: bool = False,
    tool_definitions: list[dict[str, Any]] | None = None,
) -> None:
    if not isinstance(envelope, dict):
        raise RuntimeError("Claude Code emitted no initialization envelope.")
    if tool_definitions is None:
        raise RuntimeError("Task tools must be supplied by the adapter")
    expected_tools = {f"mcp__game__{tool['name']}" for tool in tool_definitions}
    actual_tools = envelope.get("tools")
    if (
        not isinstance(actual_tools, list)
        or len(actual_tools) != len(expected_tools)
        or set(actual_tools) != expected_tools
    ):
        raise RuntimeError("Claude runtime exposed an unexpected tool surface.")
    for key in ("skills", "plugins"):
        if envelope.get(key) != []:
            raise RuntimeError(f"Claude runtime exposed unexpected {key}.")
    if not allow_slash_commands and envelope.get("slash_commands") != []:
        raise RuntimeError("Claude runtime exposed unexpected slash_commands.")
    if envelope.get("permissionMode") != CLAUDE_PERMISSION_MODE:
        raise RuntimeError("Claude runtime used an unexpected permission mode.")
    if envelope.get("claude_code_version") != PINNED_CLAUDE_VERSION:
        raise RuntimeError("Claude runtime used an unexpected Claude Code version.")
    servers = envelope.get("mcp_servers")
    if not isinstance(servers, list) or len(servers) != 1:
        raise RuntimeError("Claude runtime did not expose exactly one MCP server.")
    server = servers[0]
    if not isinstance(server, dict) or server.get("name") != "game":
        raise RuntimeError("Claude runtime connected an unexpected MCP server.")
    status = server.get("status")
    if isinstance(status, str) and status.lower() != "connected":
        raise RuntimeError("Claude game MCP server is not connected.")


def resolved_model_id_from_envelope(envelope: dict[str, Any] | None) -> str:
    model = envelope.get("model") if isinstance(envelope, dict) else None
    if not isinstance(model, str) or not model.strip():
        raise RuntimeError("Claude Code did not report its resolved model ID.")
    normalized = model.strip()
    aliases = {"opus", "sonnet", "haiku"}
    if normalized.lower() in aliases:
        raise RuntimeError(
            "Claude Code reported a mutable model alias instead of a resolved model ID."
        )
    return normalized


def resolved_model_id(result: ClaudeResult) -> str:
    return resolved_model_id_from_envelope(result.init_envelope)


def sanitize_compact_boundary(value: dict[str, Any]) -> dict[str, Any]:
    allowed = {"type", "subtype", "session_id", "compact_metadata"}
    return {key: value[key] for key in allowed if key in value}


def usage_from_result(result: dict[str, Any] | None) -> ClaudeUsage | None:
    if not isinstance(result, dict):
        return None
    usage = result.get("usage")
    if not isinstance(usage, dict):
        return None
    return ClaudeUsage(
        input_tokens=_integer(usage.get("input_tokens")),
        output_tokens=_integer(usage.get("output_tokens")),
        cache_creation_input_tokens=_integer(usage.get("cache_creation_input_tokens")),
        cache_read_input_tokens=_integer(usage.get("cache_read_input_tokens")),
        cost_usd=(
            float(result["total_cost_usd"])
            if isinstance(result.get("total_cost_usd"), (int, float))
            else None
        ),
        num_turns=(
            result["num_turns"] if type(result.get("num_turns")) is int else None
        ),
    )


def api_error_status_from_message(message: object) -> int | None:
    if not isinstance(message, dict):
        return None
    for key in ("api_error_status", "apiErrorStatus"):
        status = message.get(key)
        if type(status) is int:
            return status
    return None


def aborted_at_boundary(message: object, *, boundary: str | None) -> bool:
    """A segment the host cut off at a benchmark boundary, as the CLI reports it.

    The ARC3 path keeps its own accounting of this message; only the
    general task path consults this.
    """
    return (
        isinstance(message, dict)
        and boundary
        in {
            "decision_complete",
            "task_complete",
            "provider_image_limit",
            "compact_checkpoint_saved",
        }
        and message.get("terminal_reason") == "aborted_streaming"
        and message.get("subtype") == "error_during_execution"
    )


def decision_lease_failure_from_result(message: object) -> str | None:
    if not isinstance(message, dict) or message.get("type") != "result":
        return None
    result = message.get("result")
    if isinstance(result, str):
        normalized = result.lower()
        if "output token" in normalized and "maximum" in normalized:
            return "output_token_limit"
    if (
        message.get("is_error") is True
        or message.get("terminal_reason") == "api_error"
        or message.get("subtype") == "error_during_execution"
    ):
        return "runtime_exit"
    return None


def _integer(value: object) -> int:
    return value if type(value) is int else 0


def _start_stream_reader(
    stream: Any,
    source: str,
    output: queue.Queue[tuple[str, str] | object],
    path: Path,
    closed: object,
) -> threading.Thread:
    def read() -> None:
        with path.open("w", encoding="utf-8") as log:
            for line in stream:
                log.write(line)
                log.flush()
                output.put((source, line))
        output.put(closed)

    thread = threading.Thread(target=read, daemon=True)
    thread.start()
    return thread


def _terminate(process: subprocess.Popen[str], container: str | None = None) -> None:
    if process.poll() is None:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
    remove_container(container)


def remove_container(name: str | None) -> None:
    """`docker run` is only a client; killing it leaves the container running."""
    if not name:
        return
    try:
        subprocess.run(
            ["docker", "rm", "-f", name],
            check=False,
            capture_output=True,
            timeout=30,
        )
    except Exception:
        pass

````


## vista-c97c354/src/vista/backends/codex/__init__.py

````text
"""Shared codex transport and task binding factory."""

from typing import Any

__all__ = ["create_backend"]


def __getattr__(name: str) -> Any:
    if name == "create_backend":
        from .factory import create_backend

        return create_backend
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

````


## vista-c97c354/src/vista/backends/codex/factory.py

````text
"""Bind general tasks to the app-server transport."""

from __future__ import annotations

from pathlib import Path

from vista.core.profiles import CompactionMode
from vista.core.runtime import TaskRuntime

from ..binding import (
    prepare_player,
    recovery_prompts,
    task_timeout as resolve_timeout,
    tool_interface,
)
from ..session import BackendSession, preflight, prepare_directory


def create_backend(
    runtime: TaskRuntime,
    *,
    directory: Path,
    auth_file: Path,
    binary: Path | None = None,
    ca_bundle: Path | None = None,
    task_timeout: int | None = None,
    image: str | None = None,
) -> BackendSession:
    from vista.backends.codex.lifecycle import write_compact_restore_hook
    from vista.backends.codex.runner import DockerCodexRunner, prepare_codex_home

    preflight(runtime, "codex")
    visible, state, io = prepare_directory(directory)
    home = prepare_codex_home(state)
    prepare_player(runtime, visible, home)
    write_compact_restore_hook(visible, home)
    runner = DockerCodexRunner(
        controller=runtime.context,
        tool_interface=tool_interface(runtime, "codex"),
        recovery_prompts=recovery_prompts(runtime),
        native_compaction=runtime.experiment.profile.policy.compaction
        == CompactionMode.NATIVE,
        visible_dir=visible,
        codex_home=home,
        auth_file=auth_file,
        io_dir=io,
        codex_bin=binary,
        ca_bundle=ca_bundle,
        model=runtime.experiment.model,
        reasoning_effort=runtime.experiment.effort,
        task_timeout=resolve_timeout(runtime, task_timeout),
        **({"image": image} if image is not None else {}),
    )
    return BackendSession(runtime, runner, kind="codex")

````


## vista-c97c354/src/vista/backends/codex/lifecycle.py

````text
"""Codex session lifecycle, independent of benchmark setup."""

from __future__ import annotations

from pathlib import Path
from typing import Callable

from vista.backends.codex.runner import CodexResult, DockerCodexRunner
from vista.core.session import SessionController as GameController, write_json

CHECKPOINT_PROMPT = (
    '<codex_internal_context source="compact_checkpoint">\n'
    "Call save_compact_checkpoint now as your first and only action, then end "
    "this turn.\n"
    "</codex_internal_context>"
)


MAX_CHECKPOINT_ATTEMPTS = 2


MAX_COMPACT_CYCLES_WITHOUT_ACTION = 3


MAX_RUNTIME_RECOVERIES_PER_STEP = 8


NONTERMINAL_CONTINUATION_PROMPT = (
    "The environment is still active. "
    "Context limits are handled automatically. Continue."
)


def run_task_with_compact_checkpoints(
    *,
    runner: DockerCodexRunner,
    controller: GameController,
    prompt: str,
    checkpoint_marker: Path,
    checkpoint_ready: Path,
    working_path: Path,
    results: list[CodexResult] | None = None,
    should_yield: Callable[[], bool] | None = None,
) -> list[CodexResult]:
    if results is None:
        results = []
    results.append(runner.run_task(prompt))
    session_id = results[-1].session_id
    checkpoints = 0
    retry_boundaries = 0
    last_checkpoint_step: int | None = None
    compact_cycles_without_action = 0
    runtime_recovery_step: int | None = None
    runtime_recoveries_at_step = 0
    nonterminal_continuation_scope: tuple[str, int | None] | None = None

    def record_runtime_failure(result: CodexResult) -> None:
        nonlocal runtime_recovery_step, runtime_recoveries_at_step
        current_step = controller.step_index
        if runtime_recovery_step != current_step:
            runtime_recovery_step = current_step
            runtime_recoveries_at_step = 0
        runtime_recoveries_at_step += 1
        if runtime_recoveries_at_step > MAX_RUNTIME_RECOVERIES_PER_STEP:
            raise RuntimeError(
                "Codex player runtime failed repeatedly at the same game state; "
                f"last stderr: {result.stderr_path}"
            )

    def resume_player_runtime() -> None:
        nonlocal session_id
        failed = results[-1]
        record_runtime_failure(failed)
        if session_id is None:
            raise RuntimeError(
                "Codex player runtime failed without a resumable session id; "
                f"stderr: {failed.stderr_path}"
            )
        expected_session_id = session_id
        recovery = controller.begin_runtime_recovery()
        resumed = runner.resume_runtime_recovery(
            expected_session_id,
            recovery,
        )
        results.append(resumed)
        session_id = resumed.session_id
        if session_id != expected_session_id:
            raise RuntimeError(
                "Runtime recovery did not resume the exact Codex session"
            )

    while True:
        if controller.terminal:
            controller.discard_compact_recovery()
            return results
        if should_yield is not None and should_yield():
            return results

        if getattr(controller, "retry_boundary_pending", False):
            retry_boundaries += 1
            if retry_boundaries > controller.max_steps:
                raise RuntimeError("Retry boundaries made no bounded progress")
            previous_session_id = session_id
            recovery = controller.begin_retry_recovery()
            recovery_session_id: str | None = None

            while getattr(controller, "retry_boundary_pending", False):
                if recovery_session_id is None:
                    recovered = runner.run_retry_task(recovery)
                else:
                    recovered = runner.resume_retry_task(
                        recovery_session_id,
                        recovery,
                    )
                results.append(recovered)

                if recovered.session_id is not None:
                    if recovery_session_id is None:
                        if recovered.session_id == previous_session_id:
                            raise RuntimeError(
                                "Retry recovery did not create its required fresh session"
                            )
                        recovery_session_id = recovered.session_id
                    elif recovered.session_id != recovery_session_id:
                        raise RuntimeError(
                            "Retry recovery did not resume the exact Codex session"
                        )

                boundary_pending = bool(
                    getattr(controller, "retry_boundary_pending", False)
                )
                pending_boundary_step = (
                    getattr(controller, "retry_boundary_step", None)
                    if boundary_pending
                    else None
                )
                if boundary_pending and (
                    type(pending_boundary_step) is not int
                    or pending_boundary_step < recovery.boundary_step
                ):
                    raise RuntimeError("Retry boundary state is inconsistent")
                same_boundary_pending = pending_boundary_step == recovery.boundary_step
                new_boundary_pending = (
                    type(pending_boundary_step) is int
                    and pending_boundary_step > recovery.boundary_step
                )

                if recovered.returncode != 0:
                    record_runtime_failure(recovered)
                    if controller.terminal:
                        break
                    if new_boundary_pending:
                        break
                    continue
                if same_boundary_pending:
                    raise RuntimeError("Codex did not enter retry recovery")
                break

            if controller.terminal:
                continue
            if recovery_session_id is None:
                raise RuntimeError("Retry recovery created no Codex session")
            session_id = recovery_session_id
            continue

        if checkpoint_marker.exists():
            if session_id is None:
                raise RuntimeError(
                    "Codex stopped for compact without a resumable session id"
                )

            current_step = controller.step_index
            if current_step == last_checkpoint_step:
                compact_cycles_without_action += 1
            else:
                last_checkpoint_step = current_step
                compact_cycles_without_action = 1
            if compact_cycles_without_action >= MAX_COMPACT_CYCLES_WITHOUT_ACTION:
                raise RuntimeError(
                    "Compact checkpoint loop repeated without an environment action"
                )

            if not checkpoint_ready.exists() or not working_path.is_file():
                checkpoint_step = controller.step_index
                completed_attempts = 0
                while not checkpoint_ready.exists() or not working_path.is_file():
                    if completed_attempts >= MAX_CHECKPOINT_ATTEMPTS:
                        raise RuntimeError("Codex did not write the compact checkpoint")
                    checkpoint = runner.resume_checkpoint(session_id, CHECKPOINT_PROMPT)
                    results.append(checkpoint)
                    if checkpoint.session_id != session_id:
                        raise RuntimeError(
                            "Compact checkpoint did not resume the exact Codex session"
                        )
                    if controller.terminal:
                        break
                    if controller.step_index != checkpoint_step:
                        raise RuntimeError(
                            "Compact checkpoint turn applied an environment action"
                        )
                    if checkpoint.returncode != 0:
                        record_runtime_failure(checkpoint)
                        continue
                    completed_attempts += 1
                if controller.terminal:
                    continue

            checkpoints += 1
            if checkpoints > controller.max_steps + 1:
                raise RuntimeError("Compact checkpoint loop made no bounded progress")

            previous_session_id = session_id
            recovery = controller.begin_compact_recovery()
            restore_marker = controller.compact_restore_marker
            recovery_session_id: str | None = None

            while restore_marker is not None and restore_marker.exists():
                if recovery_session_id is None:
                    recovered = runner.run_recovery_task(recovery)
                else:
                    recovered = runner.resume_recovery_task(
                        recovery_session_id,
                        recovery,
                    )
                results.append(recovered)

                if recovered.session_id is not None:
                    if recovery_session_id is None:
                        if recovered.session_id == previous_session_id:
                            raise RuntimeError(
                                "Compact recovery did not create its required fresh session"
                            )
                        recovery_session_id = recovered.session_id
                    elif recovered.session_id != recovery_session_id:
                        raise RuntimeError(
                            "Compact recovery did not resume the exact Codex session"
                        )

                if recovered.returncode != 0:
                    record_runtime_failure(recovered)
                    if controller.terminal:
                        break
                    continue
                if restore_marker.exists():
                    raise RuntimeError("Codex did not enter compact recovery")

            if controller.terminal:
                continue
            if recovery_session_id is None:
                raise RuntimeError("Compact recovery created no Codex session")
            session_id = recovery_session_id
            continue

        current_result = results[-1]
        if getattr(current_result, "returncode", 0) != 0:
            if session_id is None:
                if controller.step_index != 0:
                    raise RuntimeError(
                        "Codex runtime failed after game actions without a session id"
                    )
                record_runtime_failure(current_result)
                results.append(runner.run_task(prompt))
                session_id = results[-1].session_id
                continue
            resume_player_runtime()
            continue

        current = results[-1]
        if current.returncode != 0 or session_id is None:
            return results

        progress = controller.initial_metadata().get("progress")
        completed = progress.get("completed") if isinstance(progress, dict) else None
        level_progress = completed if type(completed) is int else None
        continuation_scope = (session_id, level_progress)
        if continuation_scope != nonterminal_continuation_scope:
            nonterminal_continuation_scope = continuation_scope
            continued = runner.resume_nonterminal_task(
                session_id,
                NONTERMINAL_CONTINUATION_PROMPT,
            )
            results.append(continued)
            if continued.session_id is not None and continued.session_id != session_id:
                raise RuntimeError("Nonterminal continuation changed Codex session")
            session_id = continued.session_id or session_id
            continue

        controller.request_fresh_recovery()


def write_compact_restore_hook(visible_dir: Path, codex_home: Path) -> None:
    codex_dir = visible_dir / ".codex"
    codex_dir.mkdir(parents=True, exist_ok=True)
    write_json(
        codex_home / "hooks.json",
        {
            "hooks": {
                "PreCompact": [
                    {
                        "matcher": "auto|manual",
                        "hooks": [
                            {
                                "type": "command",
                                "command": "sh .codex/pre_compact_checkpoint.sh",
                                "statusMessage": "Saving game checkpoint",
                            }
                        ],
                    }
                ]
            }
        },
    )
    pre_script_path = codex_dir / "pre_compact_checkpoint.sh"
    pre_script_path.write_text(
        "\n".join(
            [
                "#!/bin/sh",
                "set -eu",
                "umask 077",
                "cat >/dev/null",
                'retry="$CODEX_HOME/retry_boundary.pending"',
                'if [ -f "$retry" ]; then',
                '  printf \'%s\\n\' \'{"continue":false,"stopReason":"Starting a fresh retry context."}\'',
                "  exit 0",
                "fi",
                'request="$CODEX_HOME/compact_checkpoint.requested"',
                ': > "$request"',
                'printf \'%s\\n\' \'{"continue":false,"stopReason":"Save the compact checkpoint before continuing."}\'',
                "",
            ]
        ),
        encoding="utf-8",
    )
    pre_script_path.chmod(0o555)

````


## vista-c97c354/src/vista/backends/codex/runner.py

````text
"""Run one visual-game session through Codex app-server."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import queue
import subprocess
import threading
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from vista.core.dispatcher import GameToolDispatcher, ToolExecution
from vista.core.player import RecoveryPrompts, ToolInterface
from vista.core.session import CompactRecovery, RetryRecovery, RuntimeRecovery

CONTAINER_CODEX_BIN = "/opt/codex/bin/codex"
PLAYER_IMAGE = "arc3-codex-player:0.1"
PLAYER_BASE_INSTRUCTIONS = "You are a visual game player.\n"
PLAYER_BASE_INSTRUCTIONS_PATH = "/codex-home/player_instructions.md"
APP_SERVER_CLIENT_NAME = "vista_arc3"
PLAYER_TOOL_NAMESPACE = "game"
PINNED_CODEX_CLI_VERSION = "codex-cli 0.145.0"
DEFAULT_PINNED_CODEX_BIN = (
    Path.home()
    / ".local"
    / "share"
    / "arc3-codex"
    / "0.145.0"
    / "node_modules"
    / "@openai"
    / "codex-linux-x64"
    / "vendor"
    / "x86_64-unknown-linux-musl"
    / "bin"
    / "codex"
)
COMPACT_HOOK_EVENTS = frozenset({"preCompact"})
COMPACT_HOOK_SOURCE = "/codex-home/hooks.json"
DEFAULT_MODEL_CONTEXT_WINDOW = 272_000
FALLBACK_MODEL_CONTEXT_WINDOW = 128_000
DEFAULT_CONTEXT_MODEL_PREFIXES = ("gpt-5.4", "gpt-5.5", "gpt-5.6-")
CHECKPOINT_HARD_CONTEXT_RESERVE = 32_000
CHECKPOINT_TURN_HEADROOM = 40_000
MIN_NORMAL_AUTO_COMPACT_LIMIT = 16_000


@dataclass(frozen=True)
class CodexUsage:
    input_tokens: int
    cached_input_tokens: int
    output_tokens: int
    reasoning_output_tokens: int


@dataclass(frozen=True)
class CompactThresholds:
    model_context_window: int
    normal_auto_compact_limit: int
    checkpoint_auto_compact_limit: int
    source: str


def compact_thresholds_for_context(
    context_window: int,
    *,
    source: str,
) -> CompactThresholds:
    checkpoint_limit = context_window - CHECKPOINT_HARD_CONTEXT_RESERVE
    normal_limit = checkpoint_limit - CHECKPOINT_TURN_HEADROOM
    if normal_limit < MIN_NORMAL_AUTO_COMPACT_LIMIT:
        raise ValueError(
            f"Model context window {context_window} is too small for compact checkpointing"
        )
    return CompactThresholds(
        model_context_window=context_window,
        normal_auto_compact_limit=normal_limit,
        checkpoint_auto_compact_limit=checkpoint_limit,
        source=source,
    )


def resolve_compact_thresholds(
    model: str | None,
    *,
    model_catalog: Path | None = None,
) -> CompactThresholds:
    catalog = model_catalog or (Path.home() / ".codex" / "models_cache.json")
    if model:
        try:
            payload = json.loads(catalog.read_text(encoding="utf-8"))
            models = payload.get("models", [])
        except (OSError, json.JSONDecodeError, AttributeError):
            models = []
        for entry in models:
            if not isinstance(entry, dict) or entry.get("slug") != model:
                continue
            context_window = entry.get("context_window")
            if isinstance(context_window, int) and not isinstance(context_window, bool):
                return compact_thresholds_for_context(
                    context_window,
                    source="codex-model-catalog",
                )

        if model.startswith(DEFAULT_CONTEXT_MODEL_PREFIXES):
            return compact_thresholds_for_context(
                DEFAULT_MODEL_CONTEXT_WINDOW,
                source="known-model-family",
            )

    return compact_thresholds_for_context(
        FALLBACK_MODEL_CONTEXT_WINDOW,
        source="conservative-fallback",
    )


DEFAULT_COMPACT_THRESHOLDS = compact_thresholds_for_context(
    DEFAULT_MODEL_CONTEXT_WINDOW,
    source="default",
)
NORMAL_AUTO_COMPACT_LIMIT = DEFAULT_COMPACT_THRESHOLDS.normal_auto_compact_limit
CHECKPOINT_AUTO_COMPACT_LIMIT = DEFAULT_COMPACT_THRESHOLDS.checkpoint_auto_compact_limit
MIN_CHECKPOINT_TURN_HEADROOM = CHECKPOINT_TURN_HEADROOM


@dataclass(frozen=True)
class CodexResult:
    segment: int
    returncode: int
    final_message: str
    session_id: str | None
    stdout_path: Path
    stderr_path: Path
    output_path: Path
    command_path: Path
    requests_path: Path
    usage: CodexUsage | None
    retryable: bool | None = None
    failure_kind: str | None = None


def _turn_error_kind(error: Any) -> str | None:
    info = error.get("codexErrorInfo") if isinstance(error, dict) else None
    if isinstance(info, str):
        return info
    if isinstance(info, dict) and len(info) == 1:
        return next(iter(info))
    return None


def _retryable_turn_error(error: Any) -> bool:
    if not isinstance(error, dict):
        return False
    info = error.get("codexErrorInfo")
    if info == "serverOverloaded":
        return True
    if not isinstance(info, dict) or len(info) != 1:
        return False
    kind, detail = next(iter(info.items()))
    if kind not in {
        "responseStreamDisconnected",
        "responseStreamConnectionFailed",
        "httpConnectionFailed",
    } or not isinstance(detail, dict):
        return False
    status = detail.get("httpStatusCode")
    return (
        status is None or type(status) is int and (status == 408 or 500 <= status < 600)
    )


def default_codex_bin() -> Path:
    configured = os.getenv("ARC3_CODEX_BIN")
    candidate = (
        Path(configured).expanduser() if configured else DEFAULT_PINNED_CODEX_BIN
    )
    if not candidate.is_file() or not os.access(candidate, os.X_OK):
        raise FileNotFoundError(
            f"Pinned Codex runtime not found: {candidate}. Install with: "
            "npm install --prefix ~/.local/share/arc3-codex/0.145.0 "
            "--omit=dev --no-audit --no-fund @openai/codex@0.145.0"
        )
    resolved = candidate.resolve()
    completed = subprocess.run(
        [str(resolved), "--version"],
        text=True,
        capture_output=True,
        timeout=20,
        check=False,
    )
    version = (completed.stdout or completed.stderr).strip()
    if completed.returncode != 0 or version != PINNED_CODEX_CLI_VERSION:
        raise RuntimeError(
            f"Expected {PINNED_CODEX_CLI_VERSION}, found {version or 'unknown'} "
            f"at {resolved}"
        )
    return resolved


def default_native_codex_bin() -> Path:
    codex = default_codex_bin()
    if codex.name == "codex.js":
        root = codex.parent.parent
        native = (
            root
            / "node_modules"
            / "@openai"
            / "codex-linux-x64"
            / "vendor"
            / "x86_64-unknown-linux-musl"
            / "bin"
            / "codex"
        )
        if native.exists():
            return native.resolve()
    return codex


def default_codex_auth_file() -> Path:
    return Path.home() / ".codex" / "auth.json"


def default_ca_bundle() -> Path:
    configured = os.getenv("SSL_CERT_FILE")
    if configured:
        path = Path(configured).expanduser()
        if path.is_file():
            return path.resolve()
    for candidate in (
        Path("/etc/ssl/certs/ca-certificates.crt"),
        Path("/etc/pki/tls/certs/ca-bundle.crt"),
    ):
        if candidate.is_file():
            return candidate.resolve()
    raise FileNotFoundError("Could not find a host CA bundle; set SSL_CERT_FILE")


def prepare_codex_home(target: Path) -> Path:
    """Create writable per-run state without copying credentials."""
    target.mkdir(parents=True, exist_ok=True)
    target.chmod(0o700)
    for dirname in ("sessions", "tmp"):
        child = target / dirname
        child.mkdir(exist_ok=True)
        child.chmod(0o700)

    auth_link = target / "auth.json"
    if not auth_link.exists() and not auth_link.is_symlink():
        auth_link.symlink_to("/run/codex-auth.json")
    elif not auth_link.is_symlink() or os.readlink(auth_link) != "/run/codex-auth.json":
        raise RuntimeError(
            f"Unexpected auth entry in run-local Codex home: {auth_link}"
        )
    return target


def write_codex_config(
    codex_home: Path,
    normal_auto_compact_limit: int | None = NORMAL_AUTO_COMPACT_LIMIT,
    *,
    checkpoint_hooks: bool = True,
) -> Path:
    """Write the complete player-local Codex configuration."""
    instructions = codex_home / Path(PLAYER_BASE_INSTRUCTIONS_PATH).name
    instructions.write_text(PLAYER_BASE_INSTRUCTIONS, encoding="utf-8")
    instructions.chmod(0o600)

    config = codex_home / "config.toml"
    config.write_text(
        "\n".join(
            [
                f'model_instructions_file = "{PLAYER_BASE_INSTRUCTIONS_PATH}"',
                *(
                    [
                        f"model_auto_compact_token_limit = {normal_auto_compact_limit}",
                        'model_auto_compact_token_limit_scope = "total"',
                    ]
                    if normal_auto_compact_limit is not None
                    else []
                ),
                'personality = "none"',
                'web_search = "disabled"',
                "",
                '[projects."/workspace"]',
                'trust_level = "trusted"',
                "",
                "[agents]",
                "interrupt_message = false",
                "",
                "[skills]",
                "include_instructions = false",
                "",
                "[skills.bundled]",
                "enabled = false",
                "",
                "[features]",
                "apps = false",
                "browser_use = false",
                "computer_use = false",
                "code_mode_host = true",
                "goals = false",
                f"hooks = {str(checkpoint_hooks).lower()}",
                "image_generation = false",
                "multi_agent = false",
                "plugins = false",
                "remote_plugin = false",
                "shell_snapshot = false",
                "shell_tool = false",
                "tool_suggest = false",
                "unified_exec = false",
                "",
                "[features.code_mode]",
                "enabled = false",
                f'direct_only_tool_namespaces = ["{PLAYER_TOOL_NAMESPACE}"]',
                "",
            ]
        ),
        encoding="utf-8",
    )
    config.chmod(0o600)
    return config


def validate_codex_auth_file(auth: Path | None = None) -> Path:
    auth = (auth or default_codex_auth_file()).expanduser().resolve()
    if not auth.exists() or not auth.is_file():
        raise FileNotFoundError(
            f"Codex auth file not found at {auth}; run `codex login` first"
        )
    return auth


_ToolExecution = ToolExecution


_STREAM_CLOSED = object()


class _AppServerConnection:
    def __init__(
        self,
        process: subprocess.Popen[str],
        *,
        stdout_path: Path,
        stderr_path: Path,
        requests_path: Path,
    ) -> None:
        if process.stdin is None or process.stdout is None or process.stderr is None:
            raise RuntimeError("app-server pipes are unavailable")
        self.process = process
        self.stdin = process.stdin
        self._messages: queue.Queue[object] = queue.Queue()
        self._request_log = requests_path.open("w", encoding="utf-8")
        self._stdout_thread = threading.Thread(
            target=self._read_stdout,
            args=(process.stdout, stdout_path),
            daemon=True,
        )
        self._stderr_thread = threading.Thread(
            target=self._copy_stream,
            args=(process.stderr, stderr_path),
            daemon=True,
        )
        self._stdout_thread.start()
        self._stderr_thread.start()

    def _read_stdout(self, stream: Any, path: Path) -> None:
        with path.open("w", encoding="utf-8") as output:
            for line in stream:
                try:
                    logged = _sanitize_wire_message(json.loads(line))
                    output.write(json.dumps(logged, separators=(",", ":")) + "\n")
                except json.JSONDecodeError:
                    output.write(line)
                output.flush()
                self._messages.put(line)
        self._messages.put(_STREAM_CLOSED)

    @staticmethod
    def _copy_stream(stream: Any, path: Path) -> None:
        with path.open("w", encoding="utf-8") as output:
            for line in stream:
                output.write(line)
                output.flush()

    def send(self, message: dict[str, Any]) -> None:
        encoded = json.dumps(message, separators=(",", ":"))
        self.stdin.write(encoded + "\n")
        self.stdin.flush()
        self._request_log.write(
            json.dumps(_sanitize_wire_message(message), separators=(",", ":")) + "\n"
        )
        self._request_log.flush()

    def receive(self, deadline: float) -> dict[str, Any]:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise TimeoutError("Codex app-server turn timed out")
        try:
            item = self._messages.get(timeout=remaining)
        except queue.Empty as exc:
            raise TimeoutError("Codex app-server turn timed out") from exc
        if item is _STREAM_CLOSED:
            raise RuntimeError(
                f"Codex app-server exited before the turn completed "
                f"(exit {self.process.poll()})"
            )
        try:
            message = json.loads(str(item))
        except json.JSONDecodeError as exc:
            raise RuntimeError("Codex app-server emitted invalid JSON") from exc
        if not isinstance(message, dict):
            raise RuntimeError("Codex app-server emitted a non-object message")
        return message

    def close(self) -> int:
        try:
            self.stdin.close()
        except OSError:
            pass
        try:
            returncode = self.process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            self.process.terminate()
            try:
                returncode = self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
                returncode = self.process.wait(timeout=5)
        finally:
            self._stdout_thread.join(timeout=2)
            self._stderr_thread.join(timeout=2)
            self._request_log.close()
        return returncode


class DockerCodexRunner:
    def __init__(
        self,
        *,
        visible_dir: Path,
        codex_home: Path,
        auth_file: Path,
        io_dir: Path,
        controller: Any,
        codex_bin: Path | None = None,
        ca_bundle: Path | None = None,
        model: str | None = None,
        reasoning_effort: str | None = None,
        compact_thresholds: CompactThresholds | None = None,
        task_timeout: int = 3600,
        image: str = PLAYER_IMAGE,
        display_size: int = 1024,
        tool_interface: ToolInterface | None = None,
        recovery_prompts: RecoveryPrompts | None = None,
        native_compaction: bool = False,
    ) -> None:
        self.tool_interface = tool_interface
        self.recovery_prompts = recovery_prompts
        self.native_compaction = native_compaction
        self.visible_dir = visible_dir.resolve()
        self.guide_path = self.visible_dir / "GUIDE.md"
        self.working_path = self.visible_dir / "WORKING.md"
        self.agents_path = self.visible_dir / "AGENTS.md"
        self.agents_instructions = self.agents_path.read_text(encoding="utf-8")
        self.screenshots_dir = self.visible_dir / "screenshots"
        self.codex_project_dir = self.visible_dir / ".codex"
        self.codex_home = codex_home.resolve()
        self.auth_file = validate_codex_auth_file(auth_file)
        self.io_dir = io_dir.resolve()
        self.exchange_dir = self.io_dir / "exchange"
        self.controller = controller
        self.tool_dispatcher = (
            tool_interface.executor
            if tool_interface is not None
            else GameToolDispatcher(
                controller=controller,
                guide_path=self.guide_path,
                working_path=self.working_path,
            )
        )
        self.codex_bin = codex_bin or default_native_codex_bin()
        self.codex_vendor_dir = self.codex_bin.parent.parent
        bundled_bwrap = self.codex_vendor_dir / "codex-resources" / "bwrap"
        if not bundled_bwrap.is_file():
            raise FileNotFoundError(
                f"Codex sandbox resource not found beside native binary: {bundled_bwrap}"
            )
        self.ca_bundle = (ca_bundle or default_ca_bundle()).resolve()
        self.model = model
        self.reasoning_effort = reasoning_effort
        if type(display_size) is not int or display_size < 1:
            raise ValueError("display_size must be a positive integer")
        self.display_size = display_size
        self.compact_thresholds = compact_thresholds or resolve_compact_thresholds(
            model
        )
        self.task_timeout = task_timeout
        self.image = image
        self._segment_index = 0
        self._rpc_id = 0
        self._connection: _AppServerConnection | None = None
        self._pending_responses: dict[Any, dict[str, Any]] = {}
        self._active_thread_id: str | None = None
        self._active_turn_id: str | None = None
        self._completed_turn: dict[str, Any] | None = None
        self._awaited_tool_call: str | None = None
        self._completed_tool_call: str | None = None
        self._final_message = ""
        self._segment_usage: CodexUsage | None = None
        self.io_dir.mkdir(parents=True, exist_ok=True)
        self.exchange_dir.mkdir(exist_ok=True)
        self._write_config(self.compact_thresholds.normal_auto_compact_limit)

        required = (
            self.guide_path,
            self.agents_path,
            self.screenshots_dir,
            self.codex_project_dir,
            *(() if native_compaction else (self.codex_home / "hooks.json",)),
            self.ca_bundle,
        )
        missing = [str(path) for path in required if not path.exists()]
        if missing:
            raise FileNotFoundError("Incomplete player runtime: " + ", ".join(missing))

    def run_task(self, prompt: str) -> CodexResult:
        return self._run_segment(
            prompt=prompt,
            session_id=None,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=self.controller.initial_image_paths(),
        )

    def run_recovery_task(self, recovery: CompactRecovery) -> CodexResult:
        return self._run_segment(
            prompt=self._recovery_prompt("compact", recovery),
            session_id=None,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=recovery.image_paths,
            recovery=recovery,
        )

    def resume_recovery_task(
        self,
        session_id: str,
        recovery: CompactRecovery,
    ) -> CodexResult:
        return self._run_segment(
            prompt=self._recovery_prompt("compact", recovery),
            session_id=session_id,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=recovery.image_paths,
            recovery=recovery,
        )

    def run_retry_task(self, recovery: RetryRecovery) -> CodexResult:
        return self._run_segment(
            prompt=self._recovery_prompt("retry", recovery),
            session_id=None,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=recovery.image_paths,
            retry_recovery=recovery,
        )

    def resume_retry_task(
        self,
        session_id: str,
        recovery: RetryRecovery,
    ) -> CodexResult:
        return self._run_segment(
            prompt=self._recovery_prompt("retry", recovery),
            session_id=session_id,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=recovery.image_paths,
            retry_recovery=recovery,
        )

    def resume_runtime_recovery(
        self,
        session_id: str,
        recovery: RuntimeRecovery,
    ) -> CodexResult:
        return self._run_segment(
            prompt=self._recovery_prompt("runtime", recovery),
            session_id=session_id,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=recovery.image_paths,
            runtime_recovery=recovery,
        )

    def resume_checkpoint(self, session_id: str, prompt: str) -> CodexResult:
        return self._run_segment(
            prompt=prompt,
            session_id=session_id,
            compact_limit=self.compact_thresholds.checkpoint_auto_compact_limit,
            initial_images=(),
        )

    def resume_nonterminal_task(
        self,
        session_id: str,
        prompt: str,
    ) -> CodexResult:
        return self._run_segment(
            prompt=prompt,
            session_id=session_id,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=(),
        )

    def _recovery_prompt(self, kind: str, recovery: Any) -> str:
        if self.recovery_prompts is not None:
            return getattr(self.recovery_prompts, kind)(recovery)
        return self._default_recovery_prompt(kind, recovery)

    def _default_recovery_prompt(self, kind: str, recovery: Any) -> str:
        raise RuntimeError("Task recovery prompts must be supplied by the adapter")

    def _default_tool_definitions(self) -> tuple[dict[str, Any], ...]:
        raise RuntimeError("Task tools must be supplied by the adapter")

    def run_input(
        self, task_input: Any, *, session_id: str | None = None
    ) -> CodexResult:
        from vista.backends.content import ordered_content

        return self._run_segment(
            prompt=task_input.text,
            session_id=session_id,
            compact_limit=self.compact_thresholds.normal_auto_compact_limit,
            initial_images=(),
            ordered_input=ordered_content(task_input, "codex"),
        )

    def _write_config(self, compact_limit: int) -> None:
        write_codex_config(
            self.codex_home,
            None if self.native_compaction else compact_limit,
            checkpoint_hooks=not self.native_compaction,
        )

    def _next_segment(self) -> int:
        segment = self._segment_index
        self._segment_index += 1
        return segment

    def _run_segment(
        self,
        *,
        prompt: str,
        session_id: str | None,
        compact_limit: int,
        initial_images: Any,
        recovery: CompactRecovery | None = None,
        retry_recovery: RetryRecovery | None = None,
        runtime_recovery: RuntimeRecovery | None = None,
        ordered_input: list[dict[str, Any]] | None = None,
    ) -> CodexResult:
        segment = self._next_segment()
        stem = f"segment_{segment:03d}"
        stdout_path = self.io_dir / f"{stem}.stdout.jsonl"
        stderr_path = self.io_dir / f"{stem}.stderr.txt"
        requests_path = self.io_dir / f"{stem}.requests.jsonl"
        command_path = self.io_dir / f"{stem}.command.json"
        output_path = self.exchange_dir / f"{stem}.last.txt"
        self._write_config(compact_limit)
        docker_cmd = self._docker_command()
        command_path.write_text(json.dumps(docker_cmd, indent=2), encoding="utf-8")

        process: subprocess.Popen[str] | None = None
        try:
            process = subprocess.Popen(
                docker_cmd,
                cwd=self.visible_dir,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1,
            )
            connection = _AppServerConnection(
                process,
                stdout_path=stdout_path,
                stderr_path=stderr_path,
                requests_path=requests_path,
            )
        except Exception as exc:
            if process is not None:
                process.terminate()
                try:
                    process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    process.kill()
                    process.wait()
            error_text = f"{type(exc).__name__}: {exc}"
            stderr_path.write_text(error_text + "\n", encoding="utf-8")
            stdout_path.touch()
            requests_path.touch()
            output_path.write_text("", encoding="utf-8")
            return CodexResult(
                segment=segment,
                returncode=125,
                final_message="",
                session_id=session_id,
                stdout_path=stdout_path,
                stderr_path=stderr_path,
                output_path=output_path,
                command_path=command_path,
                requests_path=requests_path,
                usage=None,
            )
        self._connection = connection
        self._pending_responses = {}
        self._active_thread_id = None
        self._active_turn_id = None
        self._completed_turn = None
        self._awaited_tool_call = None
        self._completed_tool_call = None
        self._final_message = ""
        self._segment_usage = None
        deadline = time.monotonic() + self.task_timeout
        returncode = 0
        error_text = ""
        retryable = None
        failure_kind = None
        resolved_session_id = session_id

        try:
            self._rpc(
                "initialize",
                {
                    "clientInfo": {
                        "name": APP_SERVER_CLIENT_NAME,
                        "title": "Visual Game Harness",
                        "version": "1.0.0",
                    },
                    "capabilities": {"experimentalApi": True},
                },
                deadline,
            )
            connection.send({"method": "initialized", "params": {}})
            if not self.native_compaction:
                self._ensure_compact_hooks_trusted(deadline)

            common = self._thread_parameters(compact_limit)

            if session_id is None:
                common["environments"] = []
                common["dynamicTools"] = self._dynamic_tools()
                thread_result = self._rpc("thread/start", common, deadline)
            else:
                thread_result = self._rpc(
                    "thread/resume",
                    {"threadId": session_id, "excludeTurns": True, **common},
                    deadline,
                )
            thread = thread_result.get("thread")
            if not isinstance(thread, dict) or not isinstance(thread.get("id"), str):
                raise RuntimeError("app-server returned no thread id")
            self._active_thread_id = thread["id"]
            resolved_session_id = self._active_thread_id

            turn_input: list[dict[str, Any]] = [{"type": "text", "text": prompt}]
            for image_path in initial_images:
                turn_input.append(_image_input_from_path(Path(image_path)))
            if ordered_input is not None:
                turn_input = ordered_input
            turn_params: dict[str, Any] = {
                "threadId": self._active_thread_id,
                "input": turn_input,
            }
            if self.model:
                turn_params["model"] = self.model
            if self.reasoning_effort:
                turn_params["effort"] = self.reasoning_effort
            turn_result = self._rpc("turn/start", turn_params, deadline)
            turn = turn_result.get("turn")
            if not isinstance(turn, dict) or not isinstance(turn.get("id"), str):
                raise RuntimeError("app-server returned no turn id")
            self._active_turn_id = turn["id"]
            if recovery is not None:
                self.controller.complete_compact_recovery(recovery)
            if retry_recovery is not None:
                self.controller.complete_retry_recovery(retry_recovery)
            if runtime_recovery is not None:
                self.controller.complete_runtime_recovery(runtime_recovery)

            while self._completed_turn is None:
                self._dispatch(connection.receive(deadline), deadline)

            status = self._completed_turn.get("status")
            compact_paused = bool(
                self.controller.compact_checkpoint_marker is not None
                and self.controller.compact_checkpoint_marker.exists()
            )
            retry_marker = getattr(self.controller, "retry_boundary_marker", None)
            retry_paused = bool(retry_marker is not None and retry_marker.exists())
            if status not in {"completed", "interrupted"}:
                error = self._completed_turn.get("error")
                retryable = _retryable_turn_error(error)
                failure_kind = _turn_error_kind(error)
                if not (compact_paused or retry_paused):
                    returncode = 1
                    error_text = f"Turn ended with status {status}: {error}"
        except TimeoutError as exc:
            returncode = 124
            error_text = str(exc)
        except Exception as exc:
            returncode = 1
            error_text = f"{type(exc).__name__}: {exc}"
        finally:
            process_returncode = connection.close()
            self._connection = None
            if returncode == 0 and process_returncode != 0:
                returncode = process_returncode
            if error_text:
                with stderr_path.open("a", encoding="utf-8") as stderr:
                    stderr.write(error_text + "\n")

        output_path.write_text(self._final_message, encoding="utf-8")
        return CodexResult(
            segment=segment,
            returncode=returncode,
            final_message=self._final_message,
            session_id=resolved_session_id,
            stdout_path=stdout_path,
            stderr_path=stderr_path,
            output_path=output_path,
            command_path=command_path,
            requests_path=requests_path,
            usage=self._segment_usage,
            retryable=retryable,
            failure_kind=failure_kind,
        )

    def _thread_parameters(self, compact_limit: int) -> dict[str, Any]:
        config: dict[str, Any] = (
            {}
            if self.native_compaction
            else {
                "model_auto_compact_token_limit": compact_limit,
            }
        )
        if self.reasoning_effort:
            config["model_reasoning_effort"] = self.reasoning_effort
        common: dict[str, Any] = {
            "cwd": "/workspace",
            "approvalPolicy": "never",
            "sandbox": "workspace-write",
            "baseInstructions": PLAYER_BASE_INSTRUCTIONS,
            "developerInstructions": self.agents_instructions,
            "personality": "none",
            "config": config,
        }
        if self.model:
            common["model"] = self.model
        return common

    def _docker_command(self) -> list[str]:
        uid = str(os.getuid())
        gid = str(os.getgid())
        return [
            "docker",
            "run",
            "-i",
            "--rm",
            "--pull=never",
            "--network",
            "bridge",
            "--read-only",
            "--cap-drop",
            "ALL",
            "--security-opt",
            "no-new-privileges",
            "--security-opt",
            "seccomp=unconfined",
            "--security-opt",
            "apparmor=unconfined",
            "--pids-limit",
            "256",
            "--memory",
            "16g",
            "--cpus",
            "4",
            "--user",
            f"{uid}:{gid}",
            "--tmpfs",
            "/tmp:rw,nosuid,nodev,size=256m",
            "--tmpfs",
            "/home/codex:rw,nosuid,nodev,size=64m",
            "--tmpfs",
            "/workspace:rw,nosuid,nodev,size=16m",
            "-e",
            "CODEX_HOME=/codex-home",
            "-e",
            "HOME=/home/codex",
            "-e",
            "TERM=dumb",
            "-e",
            "NO_COLOR=1",
            "-e",
            "SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt",
            "-v",
            f"{self.codex_vendor_dir}:/opt/codex:ro",
            "-v",
            f"{self.ca_bundle}:/etc/ssl/certs/ca-certificates.crt:ro",
            "-v",
            f"{self.codex_home}:/codex-home:rw",
            "-v",
            f"{self.auth_file}:/run/codex-auth.json:ro",
            "-v",
            f"{self.codex_project_dir}:/workspace/.codex:ro",
            "-w",
            "/workspace",
            self.image,
            CONTAINER_CODEX_BIN,
            "app-server",
            "--stdio",
            "--strict-config",
        ]

    def _dynamic_tools(self) -> list[dict[str, Any]]:
        definitions = (
            self.tool_interface.definitions
            if self.tool_interface is not None
            else self._default_tool_definitions()
        )
        if not definitions:
            return []
        return [
            {
                "type": "namespace",
                "name": PLAYER_TOOL_NAMESPACE,
                "description": "Visual game tools.",
                "tools": [
                    {
                        "type": "function",
                        "name": tool["name"],
                        "description": tool["description"],
                        "inputSchema": tool["inputSchema"],
                    }
                    for tool in definitions
                ],
            }
        ]

    def _next_rpc_id(self) -> int:
        request_id = self._rpc_id
        self._rpc_id += 1
        return request_id

    def _ensure_compact_hooks_trusted(self, deadline: float) -> None:
        hooks = self._compact_hooks(
            self._rpc(
                "hooks/list",
                {"cwds": ["/workspace"]},
                deadline,
            )
        )
        untrusted = {
            hook["key"]: {"trusted_hash": hook["currentHash"]}
            for hook in hooks.values()
            if hook.get("trustStatus") not in {"trusted", "managed"}
        }
        if untrusted:
            self._rpc(
                "config/batchWrite",
                {
                    "edits": [
                        {
                            "keyPath": "hooks.state",
                            "value": untrusted,
                            "mergeStrategy": "upsert",
                        }
                    ],
                    "reloadUserConfig": True,
                },
                deadline,
            )
            hooks = self._compact_hooks(
                self._rpc(
                    "hooks/list",
                    {"cwds": ["/workspace"]},
                    deadline,
                )
            )

        invalid = {
            event: hook.get("trustStatus")
            for event, hook in hooks.items()
            if not hook.get("enabled")
            or hook.get("trustStatus") not in {"trusted", "managed"}
        }
        if invalid:
            raise RuntimeError(f"Compact hooks are not trusted and enabled: {invalid}")

    @staticmethod
    def _compact_hooks(result: dict[str, Any]) -> dict[str, dict[str, Any]]:
        found: dict[str, dict[str, Any]] = {}
        data = result.get("data")
        if isinstance(data, list):
            for entry in data:
                if not isinstance(entry, dict):
                    continue
                hooks = entry.get("hooks")
                if not isinstance(hooks, list):
                    continue
                for hook in hooks:
                    if not isinstance(hook, dict):
                        continue
                    event = hook.get("eventName")
                    if (
                        event in COMPACT_HOOK_EVENTS
                        and hook.get("sourcePath") == COMPACT_HOOK_SOURCE
                        and isinstance(hook.get("key"), str)
                        and isinstance(hook.get("currentHash"), str)
                    ):
                        found[event] = hook
        missing = COMPACT_HOOK_EVENTS.difference(found)
        if missing:
            raise RuntimeError(
                f"Required compact hooks were not discovered: {sorted(missing)}"
            )
        return found

    def _rpc(
        self,
        method: str,
        params: dict[str, Any],
        deadline: float,
    ) -> dict[str, Any]:
        if self._connection is None:
            raise RuntimeError("app-server is not running")
        request_id = self._next_rpc_id()
        self._connection.send({"id": request_id, "method": method, "params": params})
        while request_id not in self._pending_responses:
            self._dispatch(self._connection.receive(deadline), deadline)
        response = self._pending_responses.pop(request_id)
        if "error" in response:
            raise RuntimeError(f"{method} failed: {response['error']}")
        result = response.get("result")
        if not isinstance(result, dict):
            raise RuntimeError(f"{method} returned no result object")
        return result

    def _dispatch(self, message: dict[str, Any], deadline: float) -> None:
        method = message.get("method")
        request_id = message.get("id")
        if isinstance(method, str) and request_id is not None:
            if method == "item/tool/call":
                self._handle_tool_call(message, deadline)
            elif self._connection is not None:
                self._connection.send(
                    {
                        "id": request_id,
                        "error": {"code": -32601, "message": "Unsupported request"},
                    }
                )
            return
        if method is None and request_id is not None:
            self._pending_responses[request_id] = message
            return
        if isinstance(method, str):
            self._observe_notification(method, message.get("params"))

    def _observe_notification(self, method: str, params: Any) -> None:
        if not isinstance(params, dict):
            return
        if method == "turn/started":
            turn = params.get("turn")
            if (
                self._active_turn_id is None
                and params.get("threadId") == self._active_thread_id
                and isinstance(turn, dict)
                and isinstance(turn.get("id"), str)
            ):
                self._active_turn_id = turn["id"]
        elif method == "turn/completed":
            turn = params.get("turn")
            if isinstance(turn, dict) and turn.get("id") == self._active_turn_id:
                self._completed_turn = turn
        elif method == "item/completed":
            item = params.get("item")
            if isinstance(item, dict):
                if item.get("type") == "dynamicToolCall":
                    call_id = item.get("id")
                    if (
                        self.tool_interface is not None
                        and isinstance(call_id, str)
                        and call_id != self._awaited_tool_call
                    ):
                        self.tool_interface.acknowledge(call_id)
                    if call_id == self._awaited_tool_call:
                        self._completed_tool_call = call_id
                elif item.get("type") == "agentMessage":
                    text = item.get("text")
                    if isinstance(text, str):
                        self._final_message = text
        elif method == "thread/tokenUsage/updated":
            token_usage = params.get("tokenUsage")
            if (
                params.get("turnId") == self._active_turn_id
                and isinstance(token_usage, dict)
                and isinstance(token_usage.get("last"), dict)
            ):
                self._segment_usage = _add_usage(
                    self._segment_usage,
                    token_usage["last"],
                )

    def _handle_tool_call(
        self,
        message: dict[str, Any],
        deadline: float,
    ) -> None:
        if self._connection is None:
            raise RuntimeError("app-server is not running")
        request_id = message.get("id")
        params = message.get("params")
        if not isinstance(params, dict):
            self._connection.send(
                {
                    "id": request_id,
                    "result": {
                        "contentItems": [
                            {"type": "inputText", "text": "Invalid tool request."}
                        ],
                        "success": False,
                    },
                }
            )
            return
        tool = params.get("tool")
        namespace = params.get("namespace")
        call_id = params.get("callId")
        arguments = params.get("arguments")
        if (
            namespace != PLAYER_TOOL_NAMESPACE
            or not isinstance(tool, str)
            or not isinstance(call_id, str)
        ):
            execution = _ToolExecution("Invalid tool request.", False)
        else:
            execution = self._execute_tool(tool, arguments, call_id)

        response = {
            "id": request_id,
            "result": {
                "contentItems": [{"type": "inputText", "text": execution.text}],
                "success": execution.success,
            },
        }
        visual_reader = (
            tool in self.tool_interface.visual_readers
            if self.tool_interface is not None
            else tool == "inspect"
        )
        if visual_reader and execution.images and not execution.interrupt_after:
            self._awaited_tool_call = call_id
            self._connection.send(response)
            try:
                self._wait_for_tool_completion(call_id, deadline)
                self._start_inspection_turn(
                    execution.images,
                    deadline,
                )
                if self.tool_interface is not None:
                    self.tool_interface.acknowledge(call_id)
            except Exception:
                raise
            return

        if execution.images and (
            not execution.interrupt_after
            or getattr(execution, "images_before_interrupt", False)
        ):
            try:
                for index, image in enumerate(execution.images):
                    self._steer_visual(
                        image,
                        f"{call_id}-{index + 1}",
                        deadline,
                    )
            except Exception:
                if self.tool_interface is not None:
                    raise
                execution = _ToolExecution(
                    "The resulting visual could not be delivered.", False
                )

        self._connection.send(
            {
                **response,
                "result": {
                    "contentItems": [{"type": "inputText", "text": execution.text}],
                    "success": execution.success,
                },
            }
        )
        if execution.interrupt_after:
            try:
                self._finish_retry_boundary(deadline)
                if self.tool_interface is not None:
                    self.tool_interface.acknowledge(call_id)
            except Exception:
                raise

    def _finish_retry_boundary(self, deadline: float) -> None:
        if self._active_thread_id is None or self._active_turn_id is None:
            raise RuntimeError("No active turn to interrupt")
        turn_id = self._active_turn_id
        try:
            self._rpc(
                "turn/interrupt",
                {
                    "threadId": self._active_thread_id,
                    "turnId": turn_id,
                },
                deadline,
            )
        except RuntimeError as exc:
            if "no active turn to interrupt" not in str(exc):
                raise
        self._wait_for_turn_completion(turn_id, deadline)

    def _wait_for_turn_completion(self, turn_id: str, deadline: float) -> None:
        if self._connection is None:
            raise RuntimeError("app-server is not running")
        while (
            not isinstance(self._completed_turn, dict)
            or self._completed_turn.get("id") != turn_id
        ):
            self._dispatch(self._connection.receive(deadline), deadline)

    def _wait_for_tool_completion(self, call_id: str, deadline: float) -> None:
        if self._connection is None:
            raise RuntimeError("app-server is not running")
        while self._completed_tool_call != call_id:
            self._dispatch(self._connection.receive(deadline), deadline)
        self._awaited_tool_call = None
        self._completed_tool_call = None

    def _start_inspection_turn(
        self,
        images: tuple[dict[str, Any], ...],
        deadline: float,
    ) -> None:
        if self._active_thread_id is None or self._active_turn_id is None:
            raise RuntimeError("No active turn for inspection")

        previous_turn_id = self._active_turn_id
        self._rpc(
            "turn/interrupt",
            {
                "threadId": self._active_thread_id,
                "turnId": previous_turn_id,
            },
            deadline,
        )
        while (
            not isinstance(self._completed_turn, dict)
            or self._completed_turn.get("id") != previous_turn_id
        ):
            if self._connection is None:
                raise RuntimeError("app-server is not running")
            self._dispatch(self._connection.receive(deadline), deadline)
        if not isinstance(self._completed_turn, dict) or self._completed_turn.get(
            "status"
        ) not in {"interrupted", "completed"}:
            raise RuntimeError("Inspection turn boundary was not completed")

        turn_input: list[dict[str, Any]] = [
            {
                "type": "text",
                "text": (
                    f'<inspection_visuals count="{len(images)}">'
                    "Results of the completed inspect call follow in request order; "
                    "the current game state is unchanged."
                    "</inspection_visuals>"
                ),
            }
        ]
        for image in images:
            data = image.get("data")
            steer_text = image.get("steer_text")
            if not isinstance(data, str) or not isinstance(steer_text, str):
                raise RuntimeError("Controller returned incomplete inspection visual")
            mime_type = image.get("mime_type", "image/png")
            turn_input.extend(
                [
                    {"type": "text", "text": steer_text},
                    {
                        "type": "image",
                        "url": f"data:{mime_type};base64,{data}",
                        "detail": image.get("detail", "original"),
                    },
                ]
            )

        self._completed_turn = None
        self._active_turn_id = None
        self._final_message = ""
        turn_params: dict[str, Any] = {
            "threadId": self._active_thread_id,
            "input": turn_input,
        }
        if self.model:
            turn_params["model"] = self.model
        if self.reasoning_effort:
            turn_params["effort"] = self.reasoning_effort
        result = self._rpc("turn/start", turn_params, deadline)
        turn = result.get("turn")
        if not isinstance(turn, dict) or not isinstance(turn.get("id"), str):
            raise RuntimeError("app-server returned no inspection turn id")
        self._active_turn_id = turn["id"]

    def _steer_visual(
        self,
        image: dict[str, Any],
        call_id: str,
        deadline: float,
    ) -> None:
        if self._active_thread_id is None or self._active_turn_id is None:
            raise RuntimeError("No active turn for the resulting visual")
        data = image.get("data")
        if not isinstance(data, str):
            raise RuntimeError("Controller returned no visual data")
        steer_text = image.get("steer_text")
        if not isinstance(steer_text, str) or not steer_text:
            raise RuntimeError("Controller returned no visual identity")
        mime_type = image.get("mime_type", "image/png")
        self._rpc(
            "turn/steer",
            {
                "threadId": self._active_thread_id,
                "expectedTurnId": self._active_turn_id,
                "clientUserMessageId": f"visual-{call_id}",
                "input": [
                    {"type": "text", "text": steer_text},
                    {
                        "type": "image",
                        "url": f"data:{mime_type};base64,{data}",
                        "detail": image.get("detail", "original"),
                    },
                ],
            },
            deadline,
        )

    def _execute_tool(
        self,
        tool: str,
        arguments: Any,
        call_id: str,
    ) -> ToolExecution:
        return self.tool_dispatcher.execute(tool, arguments, call_id)


def _image_input_from_path(path: Path) -> dict[str, Any]:
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    mime_type = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".gif": "image/gif",
    }.get(path.suffix.lower(), "image/png")
    return {
        "type": "image",
        "url": f"data:{mime_type};base64,{encoded}",
        "detail": "original",
    }


def _sanitize_wire_message(value: Any) -> Any:
    if isinstance(value, dict):
        return {key: _sanitize_wire_message(item) for key, item in value.items()}
    if isinstance(value, list):
        return [_sanitize_wire_message(item) for item in value]
    if isinstance(value, str) and value.startswith("data:image/"):
        header, separator, payload = value.partition(",")
        if separator:
            try:
                raw = base64.b64decode(payload, validate=True)
            except ValueError:
                raw = payload.encode("ascii", errors="replace")
            digest = hashlib.sha256(raw).hexdigest()
            return f"<{header};bytes={len(raw)};sha256={digest}>"
    return value


def _add_usage(current: CodexUsage | None, raw: dict[str, Any]) -> CodexUsage:
    current = current or CodexUsage(0, 0, 0, 0)
    return CodexUsage(
        input_tokens=current.input_tokens + int(raw.get("inputTokens", 0)),
        cached_input_tokens=(
            current.cached_input_tokens + int(raw.get("cachedInputTokens", 0))
        ),
        output_tokens=current.output_tokens + int(raw.get("outputTokens", 0)),
        reasoning_output_tokens=(
            current.reasoning_output_tokens + int(raw.get("reasoningOutputTokens", 0))
        ),
    )

````


## vista-c97c354/src/vista/backends/content.py

````text
"""Preserve benchmark-owned text/image ordering in native CLI inputs."""

from __future__ import annotations

from typing import Any

from vista.core.runtime import TaskInput


def ordered_content(task_input: TaskInput, backend: str) -> list[dict[str, Any]]:
    content = []
    labels = iter(task_input.image_labels)
    for block in task_input.blocks or (task_input.text, task_input.observation):
        if isinstance(block, str):
            content.append({"type": "text", "text": block})
            continue
        for image in block.images():
            content.append({"type": "text", "text": next(labels, image["steer_text"])})
            if backend == "codex":
                content.append(
                    {
                        "type": "image",
                        "url": f"data:{image['mime_type']};base64,{image['data']}",
                        "detail": image["detail"],
                    }
                )
            elif backend == "claude":
                content.append(
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": image["mime_type"],
                            "data": image["data"],
                        },
                    }
                )
            else:
                raise ValueError("Unknown native image backend")
    return content

````


## vista-c97c354/src/vista/backends/launch.py

````text
"""Shared command-line selection of a transport.

`--backend` names what the benchmark CLIs launch: `codex` or `claude`.
"""

from __future__ import annotations

import argparse
import os
from collections.abc import Callable
from pathlib import Path
from typing import Any

from vista.backends.preflight import check_transport

BACKENDS = ("codex", "claude")
TRANSPORTS = {"codex": "codex", "claude": "claude"}


def transport_for(backend: str) -> str:
    try:
        return TRANSPORTS[backend]
    except KeyError:
        raise ValueError(f"Unknown backend {backend!r}") from None


def add_backend_arguments(
    parser: argparse.ArgumentParser, *, backends: tuple[str, ...] = BACKENDS
) -> None:
    # Imported here so naming an argument does not pull in a transport.
    from vista.backends.codex.runner import default_codex_auth_file

    parser.add_argument("--backend", choices=backends)
    parser.add_argument(
        "--auth-file",
        type=Path,
        # All benchmarks default to the file written by `codex login`.
        default=default_codex_auth_file(),
        help="Codex auth.json (default: ~/.codex/auth.json)",
    )
    parser.add_argument("--binary", type=Path)
    parser.add_argument("--ca-bundle", type=Path)
    parser.add_argument("--task-timeout", type=int)
    if "claude" not in backends:
        return
    parser.add_argument("--claude-token-env", default="CLAUDE_CODE_OAUTH_TOKEN")
    parser.add_argument("--expected-model-id")
    parser.add_argument(
        "--compact-window",
        type=int,
        help="claude: auto-compaction window in tokens (default: provider or "
        "transport setting)",
    )
    parser.add_argument(
        "--max-output-tokens",
        type=int,
        help="claude: CLAUDE_CODE_MAX_OUTPUT_TOKENS",
    )


def validate_backend_arguments(
    args: argparse.Namespace, error: Callable[[str], Any]
) -> None:
    for name in ("compact_window", "max_output_tokens"):
        value = getattr(args, name, None)
        if value is not None and value < 1:
            error(f"--{name.replace('_', '-')} must be positive")


def prepare_backend(
    args: argparse.Namespace,
    error: Callable[[str], Any],
    *,
    check: Callable[[str, Path | None], tuple[Path, dict[str, Any]]] = check_transport,
) -> tuple[Callable[..., Any], dict[str, Any]]:
    """Validate credentials and the transport, then return (factory, provenance).

    Credential lookups happen before the transport check so a missing token is
    reported without touching Docker. Nothing here runs a model.
    """
    backend = args.backend
    transport = transport_for(backend)
    if backend == "codex":
        if args.auth_file is None or not args.auth_file.is_file():
            error("Codex run requires an existing --auth-file")
        from vista.backends.codex import create_backend

        binary, provenance = check(transport, args.binary)

        def factory(runtime, directory):
            return create_backend(
                runtime,
                directory=directory,
                auth_file=args.auth_file,
                binary=binary,
                ca_bundle=args.ca_bundle,
                task_timeout=args.task_timeout,
                image=provenance["container_image_id"],
            )

        return factory, provenance
    token = os.environ.get(args.claude_token_env)
    if not token:
        error(
            f"Claude run requires the {args.claude_token_env} environment variable"
        )
    from vista.backends.claude import create_backend

    binary, provenance = check(transport, args.binary)

    def factory(runtime, directory):
        return create_backend(
            runtime,
            directory=directory,
            oauth_token=token,
            binary=binary,
            ca_bundle=args.ca_bundle,
            expected_model_id=args.expected_model_id,
            task_timeout=args.task_timeout,
            image=provenance["container_image_id"],
            auto_compact_window=args.compact_window,
            max_output_tokens=args.max_output_tokens,
        )

    return factory, provenance

````


## vista-c97c354/src/vista/backends/preflight.py

````text
"""Local runtime provenance checks; these never make model requests."""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path
from typing import Any


def check_transport(backend: str, binary: Path | None) -> tuple[Path, dict[str, Any]]:
    if backend not in {"codex", "claude"}:
        raise ValueError("Unsupported backend")
    if backend == "codex":
        from vista.backends.codex.runner import (
            PINNED_CODEX_CLI_VERSION,
            PLAYER_IMAGE,
            default_native_codex_bin,
        )

        executable = (binary or default_native_codex_bin()).resolve()
        expected = PINNED_CODEX_CLI_VERSION
    else:
        from vista.backends.claude.runner import (
            PINNED_CLAUDE_VERSION,
            PLAYER_IMAGE,
            default_claude_bin,
        )

        executable = (binary or default_claude_bin()).resolve()
        expected = PINNED_CLAUDE_VERSION
    result = subprocess.run(
        [str(executable), "--version"],
        check=True,
        capture_output=True,
        text=True,
        timeout=20,
    )
    version = result.stdout.strip()
    if (version.split()[0] if backend == "claude" and version else version) != expected:
        raise RuntimeError(f"Expected {expected}, found {version or 'unknown'}")
    image = subprocess.run(
        ["docker", "image", "inspect", PLAYER_IMAGE, "--format", "{{json .Id}}"],
        check=True,
        capture_output=True,
        text=True,
        timeout=20,
    )
    image_id = json.loads(image.stdout)
    if not isinstance(image_id, str) or not image_id.startswith("sha256:"):
        raise RuntimeError("Docker returned no immutable image identity")
    with executable.open("rb") as stream:
        binary_sha256 = hashlib.file_digest(stream, "sha256").hexdigest()
    return executable, {
        "validation": "local-version-and-image-check",
        "version": version,
        "binary_sha256": binary_sha256,
        "container_image": PLAYER_IMAGE,
        "container_image_id": image_id,
    }


def source_fingerprint() -> dict[str, str]:
    source_root = Path(__file__).resolve().parents[2]
    sources = {}
    for package in ("vista",):
        for path in sorted((source_root / package).rglob("*")):
            if path.is_file() and path.suffix in {".py", ".md"}:
                with path.open("rb") as stream:
                    sources[str(path.relative_to(source_root))] = hashlib.file_digest(
                        stream, "sha256"
                    ).hexdigest()
    return sources

````


## vista-c97c354/src/vista/backends/session.py

````text
"""Task bindings for shared provider lifecycles."""

from __future__ import annotations

import threading
from collections.abc import Callable
from dataclasses import asdict, dataclass, is_dataclass
from pathlib import Path
from time import sleep
from typing import Any, Protocol

from vista.core.contracts import ObservationBundle
from vista.core.profiles import CompactionMode, ContextMode, Phase
from vista.core.runtime import BudgetExhausted, TaskInput, TaskRuntime

CAPACITY_RETRY_DELAYS = (10.0, 20.0, 40.0)


class Runner(Protocol):
    def run_input(
        self, task_input: TaskInput, *, session_id: str | None = None
    ) -> Any: ...


@dataclass(frozen=True)
class BackendResult:
    returncode: int
    final_message: str
    session_id: str | None
    boundary: str | None = None


def preflight(runtime: TaskRuntime, kind: str) -> None:
    if runtime.experiment.backend != kind:
        raise ValueError("The backend does not match the resolved experiment")
    profile = runtime.experiment.profile
    if profile.policy.compaction == CompactionMode.CHECKPOINT:
        required = {"read_guide", "write_guide", "read_working", "write_working"}
        if kind == "codex":
            required.add("save_compact_checkpoint")
        if (
            not required <= set(profile.tools)
            or profile.prompts.checkpoint is None
            or profile.prompts.recovery is None
        ):
            raise ValueError("Checkpoint handoff is not configured")


def prepare_directory(directory: Path) -> tuple[Path, Path, Path]:
    directory = directory.resolve()
    directory.mkdir(mode=0o700, parents=True, exist_ok=False)
    directory.chmod(0o700)
    paths = tuple(directory / name for name in ("visible", "state", "io"))
    for path in paths:
        path.mkdir(mode=0o700)
    return paths


class BackendSession:
    def __init__(
        self,
        runtime: TaskRuntime,
        runner: Runner,
        *,
        kind: str,
        before_first_run: Callable[[], None] | None = None,
        credential_relay: Callable[[], str] | None = None,
        credential_relay_needed: Callable[[], bool] | None = None,
    ) -> None:
        preflight(runtime, kind)
        self.runtime, self.runner, self.kind = runtime, runner, kind
        self._sessions: dict[str, str] = {}
        self._known_sessions: set[str] = set()
        self._run_lock = threading.Lock()
        self._before_first_run = before_first_run
        self.credential_relay = credential_relay
        self.credential_relay_needed = credential_relay_needed
        self.usage_reports: list[dict[str, Any] | None] = []

    def run(self, task_input: TaskInput) -> BackendResult:
        with self._run_lock:
            if self.runtime.terminal:
                raise RuntimeError("The task session has ended")
            try:
                if self._before_first_run is not None:
                    self._before_first_run()
                    self._before_first_run = None
                return self._run(task_input)
            except BudgetExhausted:
                raise
            except Exception:
                self.runtime.stop("backend_exception", failed=True)
                raise

    def _run(self, task_input: TaskInput) -> BackendResult:
        port = _RunnerPort(self, task_input)
        controller = self.runtime.context
        if self.kind == "codex":
            from vista.backends.codex.lifecycle import run_task_with_compact_checkpoints

            results = run_task_with_compact_checkpoints(
                runner=port,
                controller=controller,
                prompt=task_input.text,
                checkpoint_marker=controller.compact_checkpoint_marker,
                checkpoint_ready=controller.compact_checkpoint_ready,
                working_path=controller.working_path,
                should_yield=port.should_yield,
            )
        else:
            from vista.backends.claude.lifecycle import run_task_with_native_context

            results = run_task_with_native_context(
                runner=port,
                controller=controller,
                prompt=task_input.text,
                results=[],
                should_yield=port.should_yield,
                credential_relay=self.credential_relay,
                credential_relay_needed=self.credential_relay_needed,
            )
        raw = results[-1]
        boundary = getattr(raw, "context_boundary", None) or self.runtime.boundary
        if self.runtime.failure is None:
            if raw.returncode != 0:
                self.runtime.stop("backend_failure", failed=True)
            elif self.runtime.pending_call is not None:
                self.runtime.stop("unconfirmed_result_delivery", failed=True)
            elif controller.forced_termination_reason:
                self.runtime.stop(controller.forced_termination_reason, failed=True)
            elif boundary not in {None, "task_complete", "decision_complete"}:
                self.runtime.stop(boundary)
        return BackendResult(
            raw.returncode, raw.final_message, raw.session_id, boundary
        )


class _RunnerPort:
    """Translate task inputs/results; provider lifecycles own recovery decisions."""

    def __init__(self, owner: BackendSession, initial: TaskInput):
        self.owner, self.initial = owner, initial
        self.runtime = owner.runtime
        self.leaf = owner.runner
        self.context_key = initial.context_key
        self.continuous = (
            self.runtime.experiment.profile.policy.context == ContextMode.CONTINUOUS
        )
        self._yield = False
        self._capacity_retries = 0

    def should_yield(self) -> bool:
        return self._yield

    def _input(self, text: str, phase: Phase, *, images: bool = False) -> TaskInput:
        self.runtime.experiment.profile.prompts.for_phase(phase)
        return TaskInput(
            text,
            self.runtime.current_observation if images else ObservationBundle(),
            phase,
            self.context_key,
        )

    def _invoke(
        self, call, task_input, *, expected: str | None, recovery: bool = False
    ):
        self._yield = False
        if expected is None:
            self.runtime.fresh_context(self.context_key, redelivery=recovery)
        self.runtime.begin_turn(task_input, redelivery=recovery)
        raw = call()
        if getattr(raw, "retryable", None) is False:
            self.runtime.stop("nonretryable_backend_failure", failed=True)
        session_id = raw.session_id
        if session_id:
            if expected is not None and session_id != expected:
                self.runtime.stop("backend_session_changed", failed=True)
            elif expected is None and session_id in self.owner._known_sessions:
                self.runtime.stop("backend_session_reused", failed=True)
            else:
                self.owner._known_sessions.add(session_id)
                if self.continuous:
                    self.owner._sessions[self.context_key] = session_id
        elif raw.returncode == 0:
            self.runtime.stop("missing_backend_session_id", failed=True)
        if raw.returncode == 0 and self.runtime.pending_call is not None:
            self.runtime.stop("unconfirmed_result_delivery", failed=True)
        usage = getattr(raw, "usage", None)
        report = (
            asdict(usage)
            if is_dataclass(usage) and not isinstance(usage, type)
            else None
        )
        self.owner.usage_reports.append(report)
        self.runtime.artifacts.record(
            "backend_result",
            {
                "backend": self.owner.kind,
                "returncode": raw.returncode,
                "context_key": self.context_key,
                "session_id": session_id,
                "boundary": getattr(raw, "context_boundary", None)
                or self.runtime.boundary,
                "resolved_models": list(getattr(raw, "resolved_models", ())),
                "reported_usage": report,
                "retryable": getattr(raw, "retryable", None),
                "failure_kind": getattr(raw, "failure_kind", None),
            },
        )
        if (
            getattr(raw, "failure_kind", None) == "serverOverloaded"
            and getattr(raw, "retryable", None) is True
            and not self.runtime.terminal
        ):
            if self._capacity_retries >= len(CAPACITY_RETRY_DELAYS):
                self.runtime.stop("backend_capacity_exhausted", failed=True)
            else:
                delay = CAPACITY_RETRY_DELAYS[self._capacity_retries]
                self._capacity_retries += 1
                self.runtime.artifacts.record(
                    "backend_retry_backoff",
                    {
                        "failure_kind": "serverOverloaded",
                        "retry": self._capacity_retries,
                        "delay_seconds": delay,
                        "session_id": session_id,
                    },
                )
                sleep(delay)
        controller = self.runtime.context
        checkpoint_pending = controller.compact_checkpoint_marker.is_file()
        boundary = getattr(raw, "context_boundary", None) or self.runtime.boundary
        normal_boundaries = {None, "task_complete", "decision_complete"}
        if self.runtime.experiment.profile.policy.compaction == CompactionMode.NATIVE:
            normal_boundaries.add("provider_image_limit")
        self._yield = (
            raw.returncode == 0
            and boundary in normal_boundaries
            and getattr(raw, "decision_lease_failure", None) is None
            and task_input.phase != Phase.CHECKPOINT
            and not checkpoint_pending
            and not controller.retry_boundary_pending
        )
        return raw

    def run_task(self, prompt):
        expected = (
            self.owner._sessions.get(self.context_key) if self.continuous else None
        )
        return self._invoke(
            lambda: self.leaf.run_input(
                self.runtime.present_input(self.initial), session_id=expected
            ),
            self.initial,
            expected=expected,
        )

    def resume_checkpoint(self, session_id, prompt):
        task_input = self._input(prompt, Phase.CHECKPOINT)
        return self._invoke(
            lambda: self.leaf.resume_checkpoint(session_id, prompt),
            task_input,
            expected=session_id,
        )

    def _recover(self, method, recovery, *, session_id=None, fresh=False):
        mode = self.runtime.experiment.profile.policy.compaction
        if mode == CompactionMode.NATIVE:
            phase = (
                Phase.STEP
                if self.runtime.experiment.profile.prompts.step is not None
                else Phase.INITIAL
            )
            text = self.runtime.experiment.profile.prompts.for_phase(phase)
        else:
            phase = Phase.RECOVERY
            kind = (
                "compact"
                if "compact" in method
                or method in {"run_recovery_task", "resume_recovery_task"}
                else "retry"
                if "retry" in method
                else "fresh_runtime"
                if "fresh_runtime" in method
                else "runtime"
            )
            text = self.leaf._recovery_prompt(kind, recovery)
        task_input = self._input(text, phase, images=True)
        callback = getattr(self.leaf, method)
        arguments = (recovery,) if fresh else (session_id, recovery)
        return self._invoke(
            lambda: callback(*arguments),
            task_input,
            expected=None if fresh else session_id,
            recovery=True,
        )

    def run_recovery_task(self, recovery):
        return self._recover("run_recovery_task", recovery, fresh=True)

    def resume_recovery_task(self, session_id, recovery):
        return self._recover("resume_recovery_task", recovery, session_id=session_id)

    def run_compact_recovery(self, recovery):
        return self._recover("run_compact_recovery", recovery, fresh=True)

    def run_retry_task(self, recovery):
        return self._recover("run_retry_task", recovery, fresh=True)

    def resume_retry_task(self, session_id, recovery):
        return self._recover("resume_retry_task", recovery, session_id=session_id)

    def resume_runtime_recovery(self, session_id, recovery):
        return self._recover("resume_runtime_recovery", recovery, session_id=session_id)

    def run_fresh_runtime_recovery(self, recovery):
        return self._recover("run_fresh_runtime_recovery", recovery, fresh=True)

    def resume_nonterminal_task(self, session_id, prompt):
        task_input = self._input(prompt, Phase.STEP)
        return self._invoke(
            lambda: self.leaf.resume_nonterminal_task(session_id, prompt),
            task_input,
            expected=session_id,
        )

    def replace_oauth_token(self, token):
        self.leaf.replace_oauth_token(token)

````


## vista-c97c354/src/vista/benchmarks/__init__.py

````text
"""Benchmark-owned protocols and agent configurations."""

````


## vista-c97c354/src/vista/benchmarks/aigamestore/__init__.py

````text
"""The public AI GameStore protocol: one decision is one game second of input."""

from .environment import (
    MAX_DECISIONS,
    PROTOCOL,
    SEGMENT_SECONDS,
    SEGMENTS_PER_DECISION,
)

__all__ = ["MAX_DECISIONS", "PROTOCOL", "SEGMENT_SECONDS", "SEGMENTS_PER_DECISION"]

````


## vista-c97c354/src/vista/benchmarks/aigamestore/cli.py

````text
"""List, plan or run AI GameStore games on one CLI backend."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from vista.backends.launch import (
    add_backend_arguments,
    prepare_backend,
    transport_for,
    validate_backend_arguments,
)
from vista.backends.preflight import check_transport
from vista.core.json import thaw

from .environment import MAX_DECISIONS, PUBLIC_GAMES, PublicGame, load_public_game
from .profiles import action_specs, make_experiment, make_profile
from .run import aggregate, run_task


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    root.add_argument("command", choices=("list", "plan", "run"))
    root.add_argument(
        "--game",
        type=int,
        action="append",
        help="Public game number 1..10; repeatable. Omit to select all ten.",
    )
    root.add_argument(
        "--games-root",
        type=Path,
        help="Serve local game copies (gameN/index.html) instead of aigamestore.org",
    )
    add_backend_arguments(root, backends=("codex",))
    root.add_argument("--model")
    root.add_argument("--effort")
    root.add_argument("--max-decisions", type=int, default=MAX_DECISIONS)
    root.add_argument(
        "--repeats",
        type=int,
        default=1,
        help="Independent runs per game",
    )
    root.add_argument("--output", type=Path)
    root.add_argument("--seed", type=int)
    root.add_argument("--backend-segments", type=int)
    root.add_argument("--tool-calls", type=int)
    root.add_argument("--headed", action="store_true")
    return root


def _select_games(games: list[int]) -> list[PublicGame]:
    return [load_public_game(number) for number in games]


def main(argv: list[str] | None = None) -> int:
    cli = parser()
    args = cli.parse_args(argv)
    games = args.game or list(PUBLIC_GAMES)
    if any(number not in PUBLIC_GAMES for number in games) or len(set(games)) != len(
        games
    ):
        cli.error("--game must name distinct public games in 1..10")
    if not 1 <= args.max_decisions <= MAX_DECISIONS:
        cli.error(f"--max-decisions must be in 1..{MAX_DECISIONS}")
    if args.command != "list" and not all((args.backend, args.model, args.effort)):
        cli.error("plan/run require --backend, --model, and --effort")
    if any(
        value is not None and value < 1
        for value in (
            args.repeats,
            args.backend_segments,
            args.tool_calls,
            args.task_timeout,
        )
    ):
        cli.error("Repeats, runtime budgets and timeouts must be positive")
    validate_backend_arguments(args, cli.error)
    transport = transport_for(args.backend) if args.backend else None
    if args.games_root is not None and not args.games_root.is_dir():
        cli.error("--games-root must be an existing directory")
    public = _select_games(games)
    if args.command == "list":
        print(json.dumps({"games": [game.manifest() for game in public]}, indent=2))
        return 0
    source = "local" if args.games_root is not None else "live"
    plans: list[dict[str, Any]] = []
    for game in public:
        profile = make_profile(
            game,
            backend=transport,
            max_decisions=args.max_decisions,
        )
        experiment = make_experiment(
            profile,
            game,
            backend=transport,
            model=args.model,
            effort=args.effort,
            max_decisions=args.max_decisions,
            seed=args.seed,
            source=source,
            backend_segments=args.backend_segments,
            tool_calls=args.tool_calls,
        )
        for repeat in range(1, args.repeats + 1):
            plans.append(
                {
                    "game_number": game.number,
                    "game_id": game.game_id,
                    "repeat": repeat,
                    **experiment.manifest(),
                    "action_tools": [
                        spec.public_definition() for spec in action_specs()
                    ],
                }
            )
    if args.command == "plan":
        print(json.dumps({"runs": plans}, indent=2))
        return 0
    if args.output is None:
        cli.error("run requires a new --output directory")
    backend_factory, provenance = prepare_backend(
        args, cli.error, check=check_transport
    )
    args.output.mkdir(mode=0o700, parents=True, exist_ok=False)
    plan_file = args.output / "plan.json"
    plan_file.write_text(json.dumps(plans, indent=2) + "\n", encoding="utf-8")
    plan_file.chmod(0o600)
    by_number = {game.number: game for game in public}
    results = []
    for plan in plans:
        number = plan["game_number"]
        result = run_task(
            by_number[number],
            directory=args.output
            / f"game{number}__r{plan['repeat']}",
            backend=transport,
            model=args.model,
            effort=args.effort,
            backend_factory=backend_factory,
            games_root=args.games_root,
            repeat=plan["repeat"],
            seed=args.seed,
            headless=not args.headed,
            max_decisions=args.max_decisions,
            backend_segments=args.backend_segments,
            tool_calls=args.tool_calls,
            transport_provenance=provenance,
        )
        results.append(result)
        print(
            json.dumps(
                {
                    key: result.get(key)
                    for key in (
                        "game_number",
                        "game_id",
                        "repeat",
                        "completed",
                        "scored",
                        "decisions",
                        "episodes",
                        "raw_score",
                        "normalized_score",
                        "error",
                    )
                }
            ),
            flush=True,
        )
        # Never silently drop incomplete runs.
        summary = [
            aggregate(
                results,
                game_numbers=[game.number for game in public],
                repeats=args.repeats,
            )
        ]
        summary_file = args.output / "summary.json"
        summary_file.write_text(
            json.dumps(thaw(summary), indent=2) + "\n", encoding="utf-8"
        )
        summary_file.chmod(0o600)
        if not result["completed"]:
            return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/benchmarks/aigamestore/environment.py

````text
"""Host-only browser environment for the ten public AI GameStore games.

The benchmark's decision protocol: one agent decision controls one game second
as five chronological 0.2-second input segments, each a set of simultaneous tap
or hold inputs. The environment captures one canvas frame per segment, pauses
the game (Esc) before returning, and keeps score, phase, and level
evaluator-private.

Descriptions, controls, and human median scores are bundled in public_games.json.
Game pages come from a local checkout or https://aigamestore.org.
"""

from __future__ import annotations

import concurrent.futures
import functools
import hashlib
import http.server
import io
import json
import socket
import threading
import time
from base64 import b64decode
from collections.abc import Mapping
from dataclasses import dataclass
from functools import partial
from pathlib import Path
from typing import Any, Protocol

from PIL import Image

from vista.core.json import canonical

PROTOCOL = "aigamestore-segmented-input"
SEGMENTS_PER_DECISION = 5
SEGMENT_SECONDS = 0.2
MAX_DECISIONS = 120
PUBLIC_GAMES = tuple(range(1, 11))
PAUSE_SETTLE_SECONDS = 0.15
START_SETTLE_SECONDS = 1.0
LIVE_GAME_URL = "https://aigamestore.org/api/games/games/game{n}"

# Escape pauses the game and R/Enter restart it; those keys belong to the host
# protocol and are never part of the model's vocabulary.
KEY_VALUES: dict[str, str] = {
    "UP": "ArrowUp",
    "DOWN": "ArrowDown",
    "LEFT": "ArrowLeft",
    "RIGHT": "ArrowRight",
    "SPACE": " ",
    "Z": "z",
    "SHIFT": "Shift",
    "W": "w",
    "A": "a",
    "S": "s",
    "D": "d",
}
TAP_ACTIONS = frozenset(KEY_VALUES)
HOLD_ACTIONS = frozenset(f"HOLD_{action}" for action in KEY_VALUES)
MODEL_ACTIONS = frozenset({"NOOP", *TAP_ACTIONS, *HOLD_ACTIONS})

PHASE_START = "START"
PHASE_PLAYING = "PLAYING"
PHASE_PAUSED = "PAUSED"
WIN_PHASES = frozenset({"GAME_OVER_WIN", "GAME_WON", "WIN"})
LOSE_PHASES = frozenset({"GAME_OVER", "GAME_OVER_LOSE", "ENDED"})
ENDED_PHASES = WIN_PHASES | LOSE_PHASES

_GAME_STATE_JS = """
() => {
    const candidates = [];
    const canvas = document.querySelector('canvas');
    if (canvas && canvas.ownerDocument && canvas.ownerDocument.defaultView) {
        candidates.push(canvas.ownerDocument.defaultView);
    }
    candidates.push(window);
    for (const iframe of document.querySelectorAll('iframe')) {
        try {
            if (iframe.contentWindow) candidates.push(iframe.contentWindow);
        } catch (e) {}
    }
    let gameWin = window;
    for (const win of candidates) {
        try {
            if (typeof win.getGameState === 'function' || win.gameState ||
                (win.gameInstance && win.gameInstance.gameState)) {
                gameWin = win;
                break;
            }
        } catch (e) {}
    }
    let state = null;
    try {
        if (typeof gameWin.getGameState === 'function') {
            state = gameWin.getGameState();
        } else if (gameWin.gameInstance && gameWin.gameInstance.gameState) {
            state = gameWin.gameInstance.gameState;
        } else if (gameWin.gameState) {
            state = gameWin.gameState;
        }
    } catch (e) {
        state = null;
    }
    const out = {score: null, highScore: null, gamePhase: null, level: null};
    if (state && typeof state === 'object') {
        if (typeof state.score !== 'undefined') out.score = state.score;
        if (typeof state.highScore !== 'undefined') out.highScore = state.highScore;
        if (typeof state.gamePhase !== 'undefined') out.gamePhase = state.gamePhase;
        if (typeof state.currentLevel !== 'undefined') out.level = state.currentLevel;
    }
    return out;
}
"""

_SEED_INIT_JS = """
(() => {
    // mulberry32: well distributed from any seed, unlike a raw xorshift32,
    // whose first draws stay near zero for small seeds and would hand the
    // games a degenerate world at startup.
    let s = (%d >>> 0) || 0x9e3779b9;
    Math.random = function () {
        s = (s + 0x6D2B79F5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
})();
"""

_CANVAS_PNG_JS = """
() => {
    const canvas = document.querySelector('#defaultCanvas0') ||
        document.querySelector('canvas');
    if (!canvas) return null;
    try {
        return canvas.toDataURL('image/png');
    } catch (e) {
        return null;
    }
}
"""


@dataclass(frozen=True)
class PublicGame:
    """The public game description and controls."""

    number: int
    game_id: str
    description: str
    controls: str
    original_name: str | None = None

    def __post_init__(self) -> None:
        if self.number not in PUBLIC_GAMES:
            raise ValueError("public AI GameStore game must be in 1..10")
        for text in (self.game_id, self.description, self.controls):
            if not isinstance(text, str) or not text.strip():
                raise ValueError("A public game needs an id, description and controls")

    @property
    def revision(self) -> str:
        """Fingerprint of the public entry; the live site has no version tag."""
        digest = hashlib.sha256(canonical(self.manifest()).encode("utf-8"))
        return f"public-manifest-{digest.hexdigest()[:16]}"

    def manifest(self) -> dict[str, Any]:
        return {
            "number": self.number,
            "game_id": self.game_id,
            "description": self.description,
            "controls": self.controls,
            "original_name": self.original_name,
        }


@dataclass(frozen=True)
class Frame:
    png: bytes
    width: int
    height: int

    @classmethod
    def from_png(cls, png: bytes) -> Frame:
        with Image.open(io.BytesIO(png)) as image:
            if image.format != "PNG":
                raise ValueError("Canvas captures must be PNG")
            width, height = image.size
        return cls(png, width, height)


@dataclass(frozen=True)
class BrowserStep:
    """Frames are public evidence; ``state`` is evaluator-private."""

    frames: tuple[Frame, ...]
    state: Mapping[str, Any]

    @property
    def phase(self) -> str | None:
        phase = self.state.get("gamePhase")
        return phase if isinstance(phase, str) else None

    @property
    def ended(self) -> bool:
        return self.phase in ENDED_PHASES

    @property
    def won(self) -> bool:
        return self.phase in WIN_PHASES


class GameStoreRuntime(Protocol):
    """One browser-backed game; the adapter owns decisions and budgets."""

    max_score: float

    def start(self) -> BrowserStep: ...

    def run_second(self, segments: tuple[tuple[str, ...], ...]) -> BrowserStep: ...

    def restart(self) -> BrowserStep: ...

    def close(self) -> None: ...


def validate_segments(segments: Any) -> tuple[tuple[str, ...], ...]:
    """Validate five non-empty action segments and normalize simultaneous inputs.

    ``NOOP`` beside other inputs is dropped, and a key that is both tapped and
    held in one segment is held. Repeated inputs are collapsed. Invalid
    payload structure and unknown inputs are rejected.
    """
    if (
        not isinstance(segments, (list, tuple))
        or len(segments) != SEGMENTS_PER_DECISION
    ):
        raise ValueError("exactly five action segments are required")
    normalized: list[tuple[str, ...]] = []
    for segment in segments:
        if not isinstance(segment, (list, tuple)) or not segment:
            raise ValueError("action segments must be non-empty arrays")
        if any(not isinstance(action, str) for action in segment):
            raise ValueError("actions must be strings")
        unknown = [action for action in segment if action not in MODEL_ACTIONS]
        if unknown:
            raise ValueError(f"unknown game action: {unknown[0]}")
        held = {
            action.removeprefix("HOLD_")
            for action in segment
            if action.startswith("HOLD_")
        }
        ordered: list[str] = []
        for action in segment:
            if action == "NOOP" or action in held or action in ordered:
                continue
            ordered.append(action)
        normalized.append(tuple(ordered) if ordered else ("NOOP",))
    return tuple(normalized)


PUBLIC_GAMES_FILE = Path(__file__).with_name("public_games.json")


@functools.cache
def _public_entries() -> dict[int, dict[str, Any]]:
    """The ten games' own text and the human median a score is relative to.

    Read once from the site and kept here: the median is what a raw score is
    normalised against, so a run must not depend on what the site serves that
    day. The games themselves come from the pinned harness checkout.
    """
    payload = json.loads(PUBLIC_GAMES_FILE.read_text(encoding="utf-8"))
    entries = {int(game["number"]): game for game in payload["games"]}
    if sorted(entries) != list(range(1, 11)):
        raise RuntimeError("The public game table must hold games 1 to 10")
    return entries


def load_public_game(game_number: int) -> PublicGame:
    try:
        raw = _public_entries()[int(game_number)]
    except KeyError:
        raise RuntimeError(f"AI GameStore has no public game {game_number}") from None
    return PublicGame(
        game_number,
        raw["game_id"],
        raw["description"],
        raw["controls"],
        raw.get("original_name"),
    )


def load_human_median(game_id: str) -> float:
    for raw in _public_entries().values():
        if raw["game_id"] == game_id:
            median = float(raw["human_median"])
            if median > 0:
                return median
            break
    raise RuntimeError(f"AI GameStore has no human median for {game_id}")


def normalized_score(raw_score: float, human_median: float) -> float:
    if human_median <= 0:
        raise ValueError("human median must be positive")
    return min(10_000.0, max(1.0, 100.0 * raw_score / human_median))


class _QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: Any) -> None:  # noqa: A002
        pass


def _free_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


class GameStoreBrowser:
    """Playwright Chromium driving one game; canvas pixels are never rescaled.

    Playwright's sync API is bound to the thread that started it, and the
    transports call tool handlers from their own threads (the Claude MCP host
    does; Codex happens not to). Every browser operation therefore runs on one
    private worker thread, and the public methods only marshal calls to it.
    """

    def __init__(
        self,
        game: PublicGame,
        *,
        games_root: Path | None = None,
        headless: bool = True,
        seed: int | None = None,
    ) -> None:
        self.game = game
        self.games_root = games_root.resolve() if games_root else None
        self.headless = headless
        self.seed = seed
        self.max_score = 0.0
        self._worker: concurrent.futures.ThreadPoolExecutor | None = (
            concurrent.futures.ThreadPoolExecutor(
                max_workers=1, thread_name_prefix="aigamestore-browser"
            )
        )
        # Uncaught page errors, kept host-side: a crashed game is an
        # infrastructure fact about the run, not a model score.
        self.errors: list[str] = []
        self.browser_version: str | None = None
        self._playwright = None
        self._browser = None
        self._context = None
        self._page = None
        self._canvas = None
        self._capture_composited = False
        self._httpd: http.server.ThreadingHTTPServer | None = None
        try:
            self._run(self._launch)
        except BaseException:
            self.close()
            raise

    def _run(self, operation, *args):
        if self._worker is None:
            raise RuntimeError("The game browser has been closed")
        return self._worker.submit(operation, *args).result()

    # -- lifecycle ---------------------------------------------------------

    def _game_url(self) -> str:
        if self.games_root is None:
            return LIVE_GAME_URL.format(n=self.game.number)
        port = _free_port()
        serve_root = self.games_root.parent
        handler = partial(_QuietHandler, directory=str(serve_root))
        self._httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
        threading.Thread(target=self._httpd.serve_forever, daemon=True).start()
        return (
            f"http://127.0.0.1:{port}/"
            f"{self.games_root.name}/game{self.game.number}/index.html"
        )

    def _launch(self) -> None:
        from playwright.sync_api import sync_playwright

        self._playwright = sync_playwright().start()
        self._browser = self._playwright.chromium.launch(headless=self.headless)
        self.browser_version = self._browser.version
        self._context = self._browser.new_context(
            viewport={"width": 1280, "height": 900},
            device_scale_factor=1,
            service_workers="block",
        )
        self._page = self._context.new_page()
        self._page.on("pageerror", lambda error: self.errors.append(str(error)))
        if self.seed is not None:
            # Runs before any game script, so seeded generators built at module
            # load time (game2/4/5 draw straight from Math.random) are fixed.
            self._page.add_init_script(_SEED_INIT_JS % self.seed)
        self._page.goto(self._game_url(), wait_until="domcontentloaded")
        self._canvas = self._find_canvas()
        # toDataURL on a WebGL canvas without preserveDrawingBuffer returns
        # black frames; capture those through the compositor instead.
        try:
            self._capture_composited = bool(
                self._canvas.evaluate(
                    "el => Boolean(el.getContext('webgl2') || el.getContext('webgl'))"
                )
            )
        except Exception:
            self._capture_composited = False
        try:
            self._canvas.evaluate(
                "el => { if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0'); }"
            )
        except Exception:
            pass
        self._canvas.click()

    def _find_canvas(self):
        page = self._page
        try:
            canvas = page.locator("#defaultCanvas0").first
            canvas.wait_for(state="visible", timeout=15000)
            return canvas
        except Exception:
            pass
        for frame in page.frames:
            try:
                canvas = frame.locator("#defaultCanvas0").first
                canvas.wait_for(state="visible", timeout=3000)
                return canvas
            except Exception:
                continue
        canvas = page.locator("canvas").first
        canvas.wait_for(state="visible", timeout=15000)
        return canvas

    def close(self) -> None:
        if self._worker is None:
            return
        try:
            self._run(self._close)
        finally:
            self._worker.shutdown(wait=True)
            self._worker = None

    def _close(self) -> None:
        for closer in (
            lambda: self._context.close() if self._context else None,
            lambda: self._browser.close() if self._browser else None,
            lambda: self._playwright.stop() if self._playwright else None,
            lambda: self._httpd.shutdown() if self._httpd else None,
        ):
            try:
                closer()
            except Exception:
                pass
        self._context = None
        self._browser = None
        self._playwright = None
        self._httpd = None

    # -- game IO -----------------------------------------------------------

    def _game_state(self) -> dict[str, Any]:
        try:
            raw = self._page.evaluate(_GAME_STATE_JS)
        except Exception:
            raw = None
        if not isinstance(raw, dict):
            return {"score": None, "highScore": None, "gamePhase": None, "level": None}
        return raw

    def _observe_score(self, state: Mapping[str, Any]) -> None:
        for key in ("score", "highScore"):
            value = state.get(key)
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                self.max_score = max(self.max_score, float(value))

    def _press(self, key: str) -> None:
        self._page.keyboard.press(key)

    def _pause(self) -> None:
        for _ in range(2):
            if self._game_state().get("gamePhase") != PHASE_PLAYING:
                return
            self._press("Escape")
            time.sleep(PAUSE_SETTLE_SECONDS)

    def _resume(self) -> None:
        if self._game_state().get("gamePhase") == PHASE_PAUSED:
            self._press("Escape")
            time.sleep(0.05)

    def _focus(self) -> None:
        try:
            self._canvas.click()
        except Exception:
            self._canvas = self._find_canvas()
            self._canvas.click()

    def _capture(self) -> Frame:
        if self._capture_composited:
            return Frame.from_png(self._canvas.screenshot())
        try:
            data_url = self._page.evaluate(_CANVAS_PNG_JS)
        except Exception:
            data_url = None
        if isinstance(data_url, str) and data_url.startswith("data:image/png;base64,"):
            return Frame.from_png(b64decode(data_url.split(",", 1)[1]))
        return Frame.from_png(self._canvas.screenshot())

    def _step(self, frames: list[Frame]) -> BrowserStep:
        state = self._game_state()
        self._observe_score(state)
        return BrowserStep(tuple(frames), {**state, "runtime_errors": len(self.errors)})

    # -- protocol interface --------------------------------------------------

    def start(self) -> BrowserStep:
        """Start (Enter) the game and pause it at its first frame."""
        return self._run(self._restart)

    def restart(self) -> BrowserStep:
        """R to the start screen when needed, Enter to play, then pause."""
        return self._run(self._restart)

    def run_second(self, segments: tuple[tuple[str, ...], ...]) -> BrowserStep:
        """Run one game second as five 0.2-second input segments."""
        return self._run(self._run_second, validate_segments(segments))

    def _restart(self) -> BrowserStep:
        self._focus()
        self._resume()
        if self._game_state().get("gamePhase") not in (None, PHASE_START):
            self._press("r")
            time.sleep(0.4)
        self._press("Enter")
        time.sleep(START_SETTLE_SECONDS)
        if self._game_state().get("gamePhase") == PHASE_START:
            self._focus()
            self._press("Enter")
            time.sleep(START_SETTLE_SECONDS)
        self._pause()
        return self._step([self._capture()])

    def _run_second(self, segments: tuple[tuple[str, ...], ...]) -> BrowserStep:
        self._focus()
        self._resume()
        keyboard = self._page.keyboard
        frames: list[Frame] = []
        boundary = time.monotonic()
        held: list[str] = []
        try:
            for index, segment in enumerate(segments):
                held = []
                if segment != ("NOOP",):
                    for action in segment:
                        if action.startswith("HOLD_"):
                            key = KEY_VALUES[action.removeprefix("HOLD_")]
                            keyboard.down(key)
                            held.append(key)
                    for action in segment:
                        if not action.startswith("HOLD_"):
                            keyboard.press(KEY_VALUES[action])
                boundary += SEGMENT_SECONDS
                delay = boundary - time.monotonic()
                if delay > 0:
                    time.sleep(delay)
                if index == len(segments) - 1:
                    for key in held:
                        keyboard.up(key)
                    held = []
                    self._pause()
                frames.append(self._capture())
                for key in held:
                    keyboard.up(key)
                held = []
        finally:
            for key in held:
                keyboard.up(key)
        return self._step(frames)

````


## vista-c97c354/src/vista/benchmarks/aigamestore/profiles.py

````text
"""VISTA action contracts and session policy for AI GameStore."""

from __future__ import annotations

from vista.core.contracts import Capability, Effect, ToolSpec
from vista.core.profiles import (
    AgentProfile,
    CompactionMode,
    ContextMode,
    Experiment,
    InteractionMode,
    PromptBundle,
    SessionPolicy,
)
from vista.core.prompts import vista_method

from .environment import (
    HOLD_ACTIONS,
    MAX_DECISIONS,
    MODEL_ACTIONS,
    PROTOCOL,
    SEGMENT_SECONDS,
    SEGMENTS_PER_DECISION,
    TAP_ACTIONS,
    PublicGame,
)

SOURCES = ("live", "local")

VISTA_TOOLS = (
    "inspect",
    "read_pixels",
    "history",
    "read_guide",
    "write_guide",
    "read_working",
    "write_working",
    "save_compact_checkpoint",
)



def action_specs() -> tuple[ToolSpec, ...]:
    taps = ", ".join(sorted(TAP_ACTIONS))
    holds = ", ".join(sorted(HOLD_ACTIONS))
    return (
        ToolSpec(
            "play",
            (
                "Play exactly one game second of this real-time game. Provide "
                f"`segments`: exactly {SEGMENTS_PER_DECISION} chronological "
                f"{SEGMENT_SECONDS}-second segments, each a non-empty array of "
                "simultaneous inputs. Tap inputs press and release the named key "
                f"once at the start of the segment ({taps}); HOLD_ inputs keep the "
                f'key pressed for the whole segment ({holds}); ["NOOP"] is a '
                "segment with no input. NOOP beside other inputs is ignored, and a "
                "key both tapped and held in one segment is held. The game is "
                "frozen between decisions: it runs for exactly the one second you "
                "specify, then pauses and returns the resulting frames. Input on "
                "an ended game does nothing; use restart instead."
            ),
            {
                "type": "object",
                "additionalProperties": False,
                "required": ["segments"],
                "properties": {
                    "segments": {
                        "type": "array",
                        "minItems": SEGMENTS_PER_DECISION,
                        "maxItems": SEGMENTS_PER_DECISION,
                        "description": (
                            f"Exactly {SEGMENTS_PER_DECISION} segments in time order, "
                            f"each covering {SEGMENT_SECONDS} seconds."
                        ),
                        "items": {
                            "type": "array",
                            "minItems": 1,
                            # The host collapses repeated inputs within a segment.
                            "description": (
                                "Simultaneous inputs for one segment; at least one "
                                "entry. A repeated input counts once."
                            ),
                            "items": {"type": "string", "enum": sorted(MODEL_ACTIONS)},
                        },
                    }
                },
            },
            Capability.ACTION,
            Effect.ENVIRONMENT,
            max_images=SEGMENTS_PER_DECISION,
            costs={"game_decisions": 1},
        ),
        ToolSpec(
            "restart",
            (
                "Restart the game from its start screen and pause it at its first "
                "frame. Costs one game second. Use it after a game over or to "
                "abandon the current attempt; the run continues until its game "
                "seconds are spent."
            ),
            {"type": "object", "additionalProperties": False, "properties": {}},
            Capability.ACTION,
            Effect.ENVIRONMENT,
            max_images=1,
            costs={"game_decisions": 1},
        ),
    )


PAPER_ROLE = (
    "You are a professional video game player tasked to win a 2D video game. "
    "You will read the description of the game and controls and provide an "
    "output for the next 5 actions, each covering 0.2 seconds of play."
)


def objective() -> str:
    """The reference harness's opening sentences, then the scoring rule."""
    return (
        f"{PAPER_ROLE} You are scored on the highest score reached at any point "
        "in the run, and you may restart as many times as you want, so keep "
        "playing until the run's game seconds are spent."
    )


def system_prompt(
    game: PublicGame, *, max_decisions: int = MAX_DECISIONS
) -> str:
    """Public game instructions; VISTA appends its method."""
    return "\n\n".join(
        (
            objective(),
            (
                "This is a real-time human video game that is frozen between your "
                f"decisions. Each `play` decision controls exactly one game second as "
                f"{SEGMENTS_PER_DECISION} chronological {SEGMENT_SECONDS}-second input "
                "segments (taps, holds, or NOOP); the game then pauses and shows "
                "you the resulting frames. The world keeps moving during your "
                "second, so plan the whole second. Read the game state from the "
                "frames; the on-screen display is your source for score and "
                f"progress. A run lasts {max_decisions} game seconds in total, and "
                "`restart` also spends one."
            ),
            "Game description:\n" + game.description.strip(),
            (
                "Human control scheme (for reference; you act through the `play` "
                "tool's segment inputs):\n" + game.controls.strip()
            ),
        )
    )


def make_profile(
    game: PublicGame,
    *,
    backend: str = "codex",
    max_decisions: int = MAX_DECISIONS,
) -> AgentProfile:
    if backend not in {"codex", "claude"}:
        raise ValueError("Unknown backend")
    actions = tuple(spec.name for spec in action_specs())
    system = system_prompt(game, max_decisions=max_decisions)
    system += "\n\n" + vista_method(backend)
    vista_tools = tuple(
        name
        for name in VISTA_TOOLS
        if backend == "codex" or name != "save_compact_checkpoint"
    )
    return AgentProfile(
        "aigamestore-segmented-input/vista",
        (*actions, *vista_tools),
        PromptBundle(
            system,
            "Game screen (paused):\n",
            step="Game screen (paused):\n",
            checkpoint="Save the compact checkpoint before continuing.",
            recovery=(
                "Continue this same game from GUIDE, WORKING, and the supplied "
                "current visual. The game has not been restarted or advanced by "
                "this context handoff. Reconcile the notes with the current screen."
            ),
        ),
        SessionPolicy(
            context=ContextMode.CONTINUOUS,
            interaction=InteractionMode.TOOLS,
            compaction=CompactionMode.CHECKPOINT,
        ),
    )


def make_experiment(
    profile: AgentProfile,
    game: PublicGame,
    *,
    backend: str,
    model: str,
    effort: str,
    max_decisions: int = MAX_DECISIONS,
    seed: int | None = None,
    source: str = "live",
    revision: str | None = None,
    backend_segments: int | None = None,
    tool_calls: int | None = None,
) -> Experiment:
    if type(max_decisions) is not int or not 1 <= max_decisions <= MAX_DECISIONS:
        raise ValueError(f"max_decisions must be in 1..{MAX_DECISIONS}")
    if source not in SOURCES:
        raise ValueError("Game source must be live or local")
    return Experiment(
        "AI GameStore",
        revision or game.revision,
        PROTOCOL,
        profile,
        backend,
        model,
        effort,
        {
            "game_number": game.number,
            "game_id": game.game_id,
            "pixels": "unaltered native canvas",
            "coordinate_scale": 1.0,
            "frames_delivered": "five-segment-frames",
            "frames_archived": SEGMENTS_PER_DECISION,
            "win_policy": "play-full-budget",
            "seed": seed,
            "game_source": source,
            "score_visibility": "hidden",
            "host_action_count": False,
        },
        {
            "game_decisions": max_decisions,
            # A final response without a game action is redirected, not counted
            # as a game second; bound those redirections by the same budget.
            "final_answers": max_decisions,
            **(
                {"backend_segments": backend_segments}
                if backend_segments is not None
                else {}
            ),
            **({"tool_calls": tool_calls} if tool_calls is not None else {}),
        },
        "aigamestore.org/getGameState-max-score+public-human-median",
    )

````


## vista-c97c354/src/vista/benchmarks/aigamestore/public_games.json

````text
{
  "source": "https://aigamestore.org",
  "read_on": "2026-09-10",
  "note": "The ten public games' own text and the site's published human median, which a score is normalised against. Read once from the site's public manifest and score endpoints; the games themselves come from the harness repository.",
  "games": [
    {
      "number": 1,
      "game_id": "games/game1",
      "original_name": "aqua-sort-puzzle",
      "description": "Sort colored liquids into tubes so each contains only one color. Pour between tubes strategically to complete all levels.",
      "controls": "- Arrow Left/Right: Navigate tubes\n- Space: Select tube to pour\n- Z: Undo last move\n- Enter: Start game\n- R: Restart",
      "human_median": 465.0
    },
    {
      "number": 2,
      "game_id": "games/game2",
      "original_name": "fling-feathers-blitz",
      "description": "Physics-based puzzle game. Launch birds from a slingshot to destroy structures and eliminate pigs. Each bird type has unique abilities.",
      "controls": "- Arrow Keys: Adjust aim\n- Space: Launch bird\n- Z: Activate special ability\n- Enter: Start game\n- R: Restart",
      "human_median": 7155.0
    },
    {
      "number": 3,
      "game_id": "games/game3",
      "original_name": "red-hot-vengeance-web-edition",
      "description": "Top-down tactical shooter. Navigate procedural levels, use cover, manage ammo, and eliminate all enemies to progress.",
      "controls": "- WASD: Move\n- Arrow Keys: Shoot direction\n- Space: Dash/Dodge roll\n- Z: Swap weapon\n- Shift: Walk slowly\n- Enter: Start game\n- Esc: Pause\n- R: Restart",
      "human_median": 2100.0
    },
    {
      "number": 4,
      "game_id": "games/game4",
      "original_name": "jetpack-joyride-clone",
      "description": "Fly through an endless lab with your bullet-powered jetpack. Dodge zappers, missiles, and lasers while collecting coins.",
      "controls": "- Space/Arrow Up: Activate Jetpack (Fly Up)\n- ESC: Pause/Unpause\n- Enter: Start Game\n- R: Restart\n- Z: Activate special ability",
      "human_median": 1342.0
    },
    {
      "number": 5,
      "game_id": "games/game5",
      "original_name": "cheese-chase-mouse-escape",
      "description": "Collect all cheese to unlock the exit. Avoid patrolling cats and complete all levels to win.",
      "controls": "- Arrow Left/Right: Move\n- Arrow Up: Jump\n- Enter: Start game\n- Esc: Pause\n- R: Restart",
      "human_median": 7925.0
    },
    {
      "number": 6,
      "game_id": "games/game6",
      "original_name": "shadow-boy",
      "description": "Guide a boy through a dark, puzzle-filled world. Overcome traps and platforming challenges to reach the final checkpoint.",
      "controls": "- Arrow Left/Right: Move\n- Arrow Up/Space: Jump\n- Z: Interact with objects\n- Enter: Start game\n- R: Restart",
      "human_median": 300.0
    },
    {
      "number": 7,
      "game_id": "games/game7",
      "original_name": "battle-zone",
      "description": "Top-down tactical shooter. Eliminate enemies, collect ammo, and use cover strategically. Manage health and ammunition to reach extraction.",
      "controls": "- Arrow Keys: Move\n- Z: Fire weapon\n- Space: Sprint\n- Shift: Take cover/crouch\n- Enter: Start game\n- Esc: Pause\n- R: Restart",
      "human_median": 5950.0
    },
    {
      "number": 8,
      "game_id": "games/game8",
      "original_name": "bubble-cash",
      "description": "Match 3 or more bubbles of the same color to pop them. Create chain reactions for bonus points. Clear all bubbles before time runs out.",
      "controls": "- Arrow Left/Right: Rotate shooter\n- Space: Fire bubble\n- Z: Swap current bubble with next\n- Enter: Start game\n- R: Restart",
      "human_median": 6695.0
    },
    {
      "number": 9,
      "game_id": "games/game9",
      "original_name": "megaman",
      "description": "Action platformer with boss battles. Defeat bosses to gain their weapons, master tight platforming, and conquer the final fortress.",
      "controls": "- Arrow Left/Right: Move\n- Arrow Up/Down: Aim up/down\n- Z: Jump\n- Space: Shoot\n- Shift: Cycle weapons\n- Enter: Start game\n- Esc: Pause\n- R: Restart",
      "human_median": 4400.0
    },
    {
      "number": 10,
      "game_id": "games/game10",
      "original_name": "ao-oni-the-mansions-shadow",
      "description": "Escape a haunted mansion while evading a terrifying monster. Navigate 6 levels, find keys, solve puzzles, and hide to survive.",
      "controls": "- Arrow Keys: Move\n- Shift: Toggle sprint\n- Space: Interact with doors, items, hiding spots\n- Z: Toggle flashlight\n- Enter: Start game\n- Esc: Pause\n- R: Restart",
      "human_median": 1160.0
    }
  ]
}

````


## vista-c97c354/src/vista/benchmarks/aigamestore/run.py

````text
"""Drive one AI GameStore run; shared backends own the context lifecycle."""

from __future__ import annotations

import importlib.metadata
import math
import time
import traceback
from collections.abc import Callable
from pathlib import Path
from typing import Any

from vista.backends.preflight import source_fingerprint
from vista.backends.session import BackendSession
from vista.core.artifacts import ArtifactStore
from vista.core.contracts import ObservationBundle
from vista.core.json import canonical
from vista.core.profiles import Phase
from vista.core.runtime import BudgetExhausted, TaskRuntime

from .environment import (
    MAX_DECISIONS,
    PROTOCOL,
    GameStoreBrowser,
    GameStoreRuntime,
    PublicGame,
    load_human_median,
    normalized_score,
)
from .profiles import make_experiment, make_profile
from .session import SCREEN_PROMPT, GameStoreSession


def play_loop(
    session: GameStoreSession, runtime: TaskRuntime, backend: BackendSession
) -> None:
    started = False
    delivered: ObservationBundle | None = None
    redirect = ""
    try:
        while not session.finished and not runtime.terminal:
            phase = Phase.STEP if started else Phase.INITIAL
            blocks: tuple[str | ObservationBundle, ...] = ()
            public_text = redirect
            observation = (
                ObservationBundle()
                if phase == Phase.STEP and delivered == session.current
                else session.current
            )
            if redirect and observation.observations:
                blocks = (SCREEN_PROMPT, observation)
            if redirect:
                # The redirection precedes the screen so the label stays adjacent
                # to its image; the archived text keeps both.
                blocks = (redirect + "\n", *blocks)
            task_input = runtime.prepare_input(
                phase, observation=observation, public_text=public_text, blocks=blocks
            )
            before = session.decisions
            recorded = len(session.private)
            result = backend.run(task_input)
            started = True
            delivered = session.current
            failed = runtime.terminal or result.returncode != 0 or runtime.failure
            redirect = ""
            if not failed and session.decisions == before:
                reply = runtime.submit(result.final_message)
                if not runtime.terminal:
                    redirect = reply.text
            for record in session.private[recorded:]:
                runtime.artifacts.record("host_decision", dict(record))
            if failed:
                return
    except BudgetExhausted:
        return


def aggregate(
    results: list[dict[str, Any]], *, game_numbers: list[int], repeats: int
) -> dict[str, Any]:
    """Average raw scores over repeats per game, normalize, then geometric mean."""
    if (
        type(repeats) is not int
        or repeats < 1
        or not game_numbers
        or len(set(game_numbers)) != len(game_numbers)
    ):
        raise ValueError("Aggregation needs distinct games and a positive repeat count")
    expected = {
        (game, repeat) for game in game_numbers for repeat in range(1, repeats + 1)
    }
    actual = [(row["game_number"], row["repeat"]) for row in results]
    identities = {
        (
            row["protocol"],
            row["backend"],
            row["model"],
            row["effort"],
            row["frames_delivered"],
            row["win_policy"],
            row["max_decisions"],
        )
        for row in results
    }
    if len(identities) > 1:
        raise ValueError("Cannot aggregate unmatched experiments")
    complete = (
        len(actual) == len(set(actual))
        and set(actual) == expected
        and all(row["scored"] for row in results)
    )
    per_game: dict[str, float] = {}
    if complete:
        for game in game_numbers:
            rows = [row for row in results if row["game_number"] == game]
            medians = {row["human_median"] for row in rows}
            if len(medians) != 1:
                raise ValueError("Human references differ across repeats")
            per_game[str(game)] = normalized_score(
                sum(row["raw_score"] for row in rows) / repeats, medians.pop()
            )
    return {
        "planned": len(expected),
        "attempted": len(results),
        "scored": sum(bool(row["scored"]) for row in results),
        "complete": complete,
        "per_game_normalized_score": per_game,
        "geometric_mean_normalized": math.exp(
            sum(math.log(value) for value in per_game.values()) / len(per_game)
        )
        if per_game
        else None,
        "arithmetic_mean_normalized": sum(per_game.values()) / len(per_game)
        if per_game
        else None,
    }


def run_task(
    game: PublicGame,
    *,
    directory: Path,
    backend: str,
    model: str,
    effort: str,
    backend_factory: Callable[[TaskRuntime, Path], BackendSession],
    games_root: Path | None = None,
    repeat: int = 1,
    seed: int | None = None,
    headless: bool = True,
    max_decisions: int = MAX_DECISIONS,
    backend_segments: int | None = None,
    tool_calls: int | None = None,
    transport_provenance: dict[str, Any] | None = None,
    browser_factory: Callable[..., GameStoreRuntime] | None = None,
    human_median_loader: Callable[[str], float] = load_human_median,
) -> dict[str, Any]:
    if type(repeat) is not int or repeat < 1:
        raise ValueError("repeat must be a positive integer")
    source = "local" if games_root else "live"
    revision = game.revision
    root = directory.resolve()
    artifacts = ArtifactStore(root)
    artifacts.manifest(
        {
            "benchmark": "AI GameStore",
            "protocol": PROTOCOL,
            "benchmark_revision": revision,
            "game": game.manifest(),
            "repeat": repeat,
            "game_source": source,
            "games_root": str(games_root) if games_root is not None else None,
            "backend": backend,
            "model": model,
            "effort": effort,
        "frames_delivered": "five-segment-frames",
            "win_policy": "play-full-budget",
            "max_decisions": max_decisions,
            "seed": seed,
            "headless": headless,
            "transport": transport_provenance
            or {"validation": "caller-supplied-backend"},
            "source_files": source_fingerprint(),
            "dependencies": {
                name: importlib.metadata.version(name)
                for name in ("playwright", "Pillow")
            },
        }
    )
    session = None
    runtime = None
    backend_session = None
    error = None
    result: dict[str, Any] = {}
    started = time.monotonic()
    try:
        browser = (browser_factory or GameStoreBrowser)(
            game, games_root=games_root, headless=headless, seed=seed
        )
        try:
            session = GameStoreSession(
                game,
                browser,
                max_decisions=max_decisions,
            )
        except BaseException:
            browser.close()
            raise
        profile = make_profile(
            game,
            backend=backend,
            max_decisions=max_decisions,
        )
        experiment = make_experiment(
            profile,
            game,
            backend=backend,
            model=model,
            effort=effort,
            max_decisions=max_decisions,
            seed=seed,
            source=source,
            revision=revision,
            backend_segments=backend_segments,
            tool_calls=tool_calls,
        )
        runtime = TaskRuntime(session, experiment, artifact_dir=root / "artifacts")
        backend_session = backend_factory(runtime, root / "transport")
        play_loop(session, runtime, backend_session)
        result = session.result()
        error = runtime.failure
    except Exception:
        error = "run_exception"
        artifacts.record("private_failure", {"traceback": traceback.format_exc()})
        if session is not None:
            result = session.result()
    finally:
        if runtime is not None:
            try:
                runtime.close()
            except Exception:
                error = "cleanup_failure"
                artifacts.record(
                    "private_failure", {"traceback": traceback.format_exc()}
                )
        elif session is not None:
            try:
                session.close()
            except Exception:
                error = "cleanup_failure"
    for key in (
        "decisions",
        "episodes",
        "finished",
        "won",
        "raw_score",
        "canvas",
        "browser_errors",
    ):
        result.setdefault(key, None)
    completed = bool(result.get("finished")) and error is None
    raw_score = result.get("raw_score")
    normalized = None
    human_median = None
    human_median_error = None
    if raw_score is not None:
        try:
            human_median = human_median_loader(game.game_id)
            normalized = normalized_score(raw_score, human_median)
        except Exception as exc:
            human_median_error = f"{type(exc).__name__}: {exc}"
    result.update(
        {
            "game_number": game.number,
            "game_id": game.game_id,
            "repeat": repeat,
            "benchmark_revision": revision,
            "game_source": source,
            "protocol": PROTOCOL,
            "backend": backend,
            "model": model,
            "effort": effort,
        "frames_delivered": "five-segment-frames",
            "win_policy": "play-full-budget",
            "max_decisions": max_decisions,
            "seed": seed,
            "completed": completed,
            "scored": completed and normalized is not None,
            "error": error,
            "human_median": human_median,
            "human_median_error": human_median_error,
            "normalized_score": normalized if completed else None,
            "usage": runtime.usage if runtime is not None else {},
            "checkpoints": runtime.context.checkpoints if runtime is not None else 0,
            "backend_usage": backend_session.usage_reports
            if backend_session is not None
            else [],
            "elapsed_seconds": time.monotonic() - started,
        }
    )
    path = root / "result.json"
    path.write_text(canonical(result) + "\n", encoding="utf-8")
    path.chmod(0o600)
    return result

````


## vista-c97c354/src/vista/benchmarks/aigamestore/session.py

````text
"""AI GameStore decisions and evidence; VISTA tools live in the core."""

from __future__ import annotations

from typing import Any

from vista.core.contracts import (
    Effect,
    EvidenceKind,
    Observation,
    ObservationBundle,
    PublicTask,
    SubmissionSpec,
    ToolBinding,
    ToolReply,
    Visual,
)

from .environment import (
    MAX_DECISIONS,
    SEGMENT_SECONDS,
    SEGMENTS_PER_DECISION,
    BrowserStep,
    Frame,
    GameStoreRuntime,
    PublicGame,
    validate_segments,
)
from .profiles import action_specs, objective

VIEW = "screen"
SCREEN_PROMPT = "Game screen (paused):\n"


class GameStoreSession:
    """One game run: decisions, frames, and restarts; score never leaves the host."""

    def __init__(
        self,
        game: PublicGame,
        runtime: GameStoreRuntime,
        *,
        max_decisions: int = MAX_DECISIONS,
    ) -> None:
        if type(max_decisions) is not int or not 1 <= max_decisions <= MAX_DECISIONS:
            raise ValueError(f"max_decisions must be in 1..{MAX_DECISIONS}")
        self.game = game
        self.runtime = runtime
        self.max_decisions = max_decisions
        self.ended = False
        self.decisions = 0
        self.episodes = 1
        self.finished = False
        self.won = False
        self.closed = False
        # Host-only evaluator states, one per decision plus the start.
        self.private: list[dict[str, Any]] = []
        step = runtime.start()
        self.width, self.height = step.frames[-1].width, step.frames[-1].height
        bundle = self._bundle(step.frames, 0)
        self.latest = bundle
        self.current = self._current_of(bundle)
        self._record(None, step)
        self.task = PublicTask(
            f"aigamestore/game{game.number}",
            objective(),
            {
                "game_number": game.number,
                "game_id": game.game_id,
                "description": game.description,
                "controls": game.controls,
                "segments_per_decision": SEGMENTS_PER_DECISION,
                "segment_seconds": SEGMENT_SECONDS,
                "game_seconds": max_decisions,
            },
            bundle,
        )
        # A final response is a redirection, not a game second.
        self.submission = SubmissionSpec(Effect.SUBMISSION)
        handlers = {"play": self._play, "restart": self._restart}
        self.tools = tuple(
            ToolBinding(spec, handlers[spec.name]) for spec in action_specs()
        )

    # -- evidence --------------------------------------------------------------

    def _bundle(self, frames: tuple[Frame, ...], decision: int) -> ObservationBundle:
        observations = []
        for index, frame in enumerate(frames):
            if (frame.width, frame.height) != (self.width, self.height):
                raise RuntimeError("The game canvas changed size")
            moment = f"decision-{decision:03d}-frame-{index}"
            final = index == len(frames) - 1
            observations.append(
                Observation(
                    moment,
                    (Visual(VIEW, moment, frame.png, frame.width, frame.height),),
                    EvidenceKind.CURRENT if final else EvidenceKind.HISTORICAL,
                )
            )
        display = None
        return ObservationBundle(tuple(observations), display=display)

    @staticmethod
    def _current_of(bundle: ObservationBundle) -> ObservationBundle:
        return ObservationBundle(
            tuple(
                item
                for item in bundle.observations
                if item.kind == EvidenceKind.CURRENT
            )
        )

    def _record(self, action: dict[str, Any] | None, step: BrowserStep) -> None:
        self.private.append(
            {
                "decision": self.decisions,
                "episode": self.episodes,
                "action": action,
                "state": dict(step.state),
                "ended": step.ended,
                "won": step.won,
                "max_score": self.runtime.max_score,
            }
        )

    def _advance(self, action: dict[str, Any], step: BrowserStep) -> ObservationBundle:
        self.decisions += 1
        bundle = self._bundle(step.frames, self.decisions)
        self.latest = bundle
        self.current = self._current_of(bundle)
        self.ended = step.ended
        self._record(action, step)
        if step.won:
            self.won = True
        self.finished = self.decisions >= self.max_decisions
        return bundle

    def _reply(self, event: str, guidance: str, bundle: ObservationBundle) -> ToolReply:
        if self.decisions >= self.max_decisions:
            event += " The run's game seconds are spent."
        if self.finished:
            guidance = ""
        text = event + (" " + guidance if guidance else "")
        return ToolReply(
            text, observation=bundle, finished=self.finished, event_text=event
        )

    # -- actions ---------------------------------------------------------------

    def _play(self, arguments: Any) -> ToolReply:
        if self.finished:
            return ToolReply("The run has ended.", success=False)
        try:
            segments = validate_segments(
                arguments.get("segments") if isinstance(arguments, dict) else None
            )
        except ValueError as exc:
            return ToolReply(f"Invalid segments: {exc}", success=False)
        step = self.runtime.run_second(segments)
        bundle = self._advance(
            {"name": "play", "segments": [list(segment) for segment in segments]},
            step,
        )
        event = "The game ran for one game second and is paused."
        guidance = ""
        if step.ended:
            event += " The game has ended."
            guidance = "Call restart to begin a new attempt."
        return self._reply(event, guidance, bundle)

    def _restart(self, arguments: Any) -> ToolReply:
        if self.finished:
            return ToolReply("The run has ended.", success=False)
        step = self.runtime.restart()
        self.episodes += 1
        bundle = self._advance({"name": "restart"}, step)
        return self._reply(
            "The game restarted and is paused at its first frame.", "", bundle
        )

    def submit(self, answer: str) -> ToolReply:
        """A final response is a redirection: the game advances through tools."""
        return ToolReply(
            "No game action was executed. Continue with the play or restart tool.",
            success=False,
        )

    # -- host results -------------------------------------------------------------

    def result(self) -> dict[str, Any]:
        last = self.private[-1]
        return {
            "decisions": self.decisions,
            "episodes": self.episodes,
            "finished": self.finished,
            "won": self.won,
            "raw_score": self.runtime.max_score,
            "final_phase": last["state"].get("gamePhase"),
            "canvas": {"width": self.width, "height": self.height},
            "browser_errors": list(getattr(self.runtime, "errors", ())),
        }

    def close(self) -> None:
        if self.closed:
            return
        self.closed = True
        self.runtime.close()

````


## vista-c97c354/src/vista/benchmarks/arc3/__init__.py

````text
"""ARC3 evaluation exposed as a benchmark profile."""

from .profile import RELEASE_REVISION, backend_module

__all__ = ["RELEASE_REVISION", "backend_module"]

````


## vista-c97c354/src/vista/benchmarks/arc3/batch.py

````text
"""Run every available ARC environment on one shared scorecard."""

from __future__ import annotations

import argparse
import json
import os
import re
import tempfile
import threading
import time
from collections import deque
from concurrent.futures import (
    FIRST_COMPLETED,
    Future,
    ThreadPoolExecutor,
    as_completed,
    wait,
)
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Sequence

from arc_agi import Arcade, OperationMode

from vista.backends.claude.quota import (
    ClaudeCredentialLease,
    ClaudeCredentialPool,
    ClaudeRateLimitEvent,
)
from vista.benchmarks.arc3.claude.harness import (
    run_game as run_claude_game,
    run_runtime_preflight as probe_claude_runtime,
)
from vista.benchmarks.arc3.claude.runner import (
    CLAUDE_EFFORT_LEVELS,
    DEFAULT_CLAUDE_MODEL,
    default_claude_bin,
    validate_claude_runtime,
)
from vista.benchmarks.arc3.codex.harness import (
    CODEX_EFFORT_LEVELS,
    DEFAULT_MAX_INVALID_RETRIES,
    DEFAULT_MAX_STEPS,
    DEFAULT_MODEL,
    resolve_model_spec,
    run_game as run_codex_game,
    write_compact_restore_hook,
)
from vista.benchmarks.arc3.codex.runner import (
    DockerCodexRunner,
    default_codex_auth_file,
    default_native_codex_bin,
    prepare_codex_home,
    resolve_compact_thresholds,
    validate_codex_auth_file,
)
from vista.benchmarks.arc3.http import configure_arc_http as configure_competition_http
from vista.benchmarks.arc3.run import (
    GameRunOutcome,
    finalize_scorecard,
    load_run_environment,
    open_evaluation_scorecard,
    share_online_cookie_jar,
    utc_now,
)
from vista.core.io import write_json

DEFAULT_RUNS_DIR = Path("runs") / "competition"
DEFAULT_CONCURRENCY = 2
DEFAULT_CLAUDE_CONCURRENCY = 2
DEFAULT_CLAUDE_WORKERS_PER_ACCOUNT = 2
DEFAULT_CLAUDE_COMPETITION_EFFORT = "xhigh"
SCHEDULER_POLL_SECONDS = 5.0
DEFAULT_RUNTIME = "codex"
STANDARD_GAME_ORDER = (
    "bp35",
    "sk48",
    "lf52",
    "wa30",
    "sp80",
    "re86",
    "su15",
    "vc33",
    "ka59",
    "dc22",
    "ls20",
    "tn36",
    "g50t",
    "sc25",
    "tu93",
    "s5i5",
    "cn04",
    "tr87",
    "ar25",
    "m0r0",
    "r11l",
    "lp85",
    "ft09",
    "cd82",
    "sb26",
)


@dataclass(frozen=True)
class CompetitionConfig:
    model: str
    max_steps: int
    concurrency: int
    timeout: int
    max_invalid_retries: int
    batch_id: str
    runs_dir: Path
    operation_mode: str = "competition"
    runtime: str = DEFAULT_RUNTIME
    effort: str | None = None
    claude_workers_per_account: int = DEFAULT_CLAUDE_WORKERS_PER_ACCOUNT


@dataclass(frozen=True)
class CompetitionGameResult:
    game_id: str
    error: str | None
    finished_at: str


@dataclass(frozen=True)
class ClaudeAccountSchedule:
    account_games: tuple[tuple[str, ...], ...]


class RuntimeProbeController:
    compact_restore_marker = None
    compact_checkpoint_marker = None
    retry_boundary_marker = None
    forced_termination_reason = None

    @staticmethod
    def initial_image_paths() -> tuple[Path, ...]:
        return ()

    @staticmethod
    def handle(request: dict[str, Any]) -> dict[str, Any]:
        return {
            "ok": False,
            "metadata": {"error": "Tools are unavailable during runtime preflight."},
        }


def run_codex_runtime_preflight(
    config: CompetitionConfig,
    auth_file: Path,
) -> None:
    """Verify the exact container, account, model, and app-server path."""
    model, reasoning_effort = resolve_model_spec(config.model, config.effort)
    with tempfile.TemporaryDirectory(prefix="arc3_codex_preflight_") as raw_root:
        root = Path(raw_root)
        visible_dir = root / "visible"
        io_dir = root / "io"
        codex_home = prepare_codex_home(root / "codex_home")
        (visible_dir / "screenshots").mkdir(parents=True)
        (visible_dir / "AGENTS.md").write_text(
            "Reply exactly READY.\n",
            encoding="utf-8",
        )
        (visible_dir / "GUIDE.md").write_text("\n", encoding="utf-8")
        write_compact_restore_hook(visible_dir, codex_home)
        runner = DockerCodexRunner(
            visible_dir=visible_dir,
            codex_home=codex_home,
            auth_file=auth_file,
            io_dir=io_dir,
            controller=RuntimeProbeController(),
            codex_bin=default_native_codex_bin(),
            model=model,
            reasoning_effort=reasoning_effort,
            compact_thresholds=resolve_compact_thresholds(model),
            task_timeout=config.timeout,
        )
        result = runner.run_task("Reply exactly READY.")
        if result.returncode != 0 or result.final_message.strip() != "READY":
            detail = result.stderr_path.read_text(
                encoding="utf-8",
                errors="replace",
            ).strip()
            raise RuntimeError(
                "Codex runtime preflight failed" + (f": {detail}" if detail else "")
            )
        if result.session_id is None:
            raise RuntimeError("Codex runtime preflight returned no session id")
        resumed = runner.resume_checkpoint(
            result.session_id,
            "Reply exactly RESUMED.",
        )
        if (
            resumed.returncode != 0
            or resumed.session_id != result.session_id
            or resumed.final_message.strip().rstrip(".") != "RESUMED"
        ):
            detail = resumed.stderr_path.read_text(
                encoding="utf-8",
                errors="replace",
            ).strip()
            observed = json.dumps(
                {
                    "returncode": resumed.returncode,
                    "session_preserved": resumed.session_id == result.session_id,
                    "final_message": resumed.final_message,
                },
                ensure_ascii=True,
                separators=(",", ":"),
            )
            raise RuntimeError(
                f"Codex session-resume preflight failed: {observed}"
                + (f": {detail}" if detail else "")
            )


def claude_effort(config: CompetitionConfig) -> str:
    return config.effort or DEFAULT_CLAUDE_COMPETITION_EFFORT


def claude_oauth_token_pool(
    environ: dict[str, str] | None = None,
) -> tuple[str, ...]:
    """Load a contiguous, unique Claude credential pool without exposing values."""

    source = os.environ if environ is None else environ
    primary = source.get("CLAUDE_CODE_OAUTH_TOKEN")
    if not primary:
        raise RuntimeError("CLAUDE_CODE_OAUTH_TOKEN is not set")

    numbered: dict[int, str] = {}
    pattern = re.compile(r"^CLAUDE_CODE_OAUTH_TOKEN_(\d+)$")
    for name, value in source.items():
        match = pattern.fullmatch(name)
        if match is None:
            continue
        index = int(match.group(1))
        if index < 2:
            raise RuntimeError(
                "Numbered Claude credentials must start at CLAUDE_CODE_OAUTH_TOKEN_2"
            )
        if not value:
            raise RuntimeError(f"{name} is empty")
        numbered[index] = value

    if numbered:
        expected = set(range(2, max(numbered) + 1))
        missing = sorted(expected - set(numbered))
        if missing:
            names = ", ".join(f"CLAUDE_CODE_OAUTH_TOKEN_{index}" for index in missing)
            raise RuntimeError(f"Claude credential pool has missing slots: {names}")

    tokens = (primary, *(numbered[index] for index in sorted(numbered)))
    if len(set(tokens)) != len(tokens):
        raise RuntimeError("Claude credential pool contains duplicate tokens")
    return tokens


def claude_worker_slots(
    oauth_tokens: Sequence[str],
    *,
    workers_per_account: int,
    concurrency: int,
) -> tuple[tuple[int, str], ...]:
    if not oauth_tokens:
        raise ValueError("At least one Claude credential is required")
    if workers_per_account < 1:
        raise ValueError("Claude workers per account must be positive")
    capacity = len(oauth_tokens) * workers_per_account
    if concurrency > capacity:
        raise ValueError(
            f"Claude concurrency {concurrency} exceeds the credential pool "
            f"capacity {capacity}"
        )
    slots = tuple(
        (account_index, token)
        for _ in range(workers_per_account)
        for account_index, token in enumerate(oauth_tokens, start=1)
    )
    return slots[:concurrency]


def claude_account_schedule(
    game_ids: Sequence[str],
    *,
    account_count: int,
) -> ClaudeAccountSchedule:
    if account_count < 1:
        raise ValueError("At least one Claude account is required")
    if len(set(game_ids)) != len(game_ids):
        raise ValueError("Claude schedule contains duplicate game ids")

    account_games: list[list[str]] = [[] for _ in range(account_count)]
    for index, game_id in enumerate(game_ids):
        account_index = index % account_count
        account_games[account_index].append(game_id)

    return ClaudeAccountSchedule(
        account_games=tuple(tuple(games) for games in account_games),
    )


def pop_claude_scheduled_game(
    account_slot: int,
    queues: dict[int, deque[str]],
) -> str | None:
    own_queue = queues[account_slot]
    if own_queue:
        return own_queue.popleft()

    donors = [
        donor for donor, queue in queues.items() if donor != account_slot and queue
    ]
    if not donors:
        return None
    donor = max(
        donors,
        key=lambda candidate: (len(queues[candidate]), -candidate),
    )
    return queues[donor].popleft()


def run_claude_runtime_preflight(
    config: CompetitionConfig,
    *,
    oauth_token: str,
    rate_limit_observer: Callable[[ClaudeRateLimitEvent], None] | None = None,
) -> str:
    """Verify Claude before opening the coordinator-owned scorecard."""

    claude_bin = validate_claude_runtime(
        default_claude_bin(),
        oauth_token=oauth_token,
    )
    with tempfile.TemporaryDirectory(
        prefix="arc3_claude_competition_preflight_"
    ) as raw_root:
        root = Path(raw_root)
        visible_dir = root / "visible"
        (visible_dir / "screenshots").mkdir(parents=True)
        (visible_dir / "AGENTS.md").write_text(
            (Path(__file__).with_name("claude") / "prompt.md").read_text(
                encoding="utf-8"
            ),
            encoding="utf-8",
        )
        (visible_dir / "GUIDE.md").write_text(
            "No reliable model yet.\n",
            encoding="utf-8",
        )
        result, concrete_model_id = probe_claude_runtime(
            visible_dir=visible_dir,
            config_dir=root / "config",
            io_dir=root / "io",
            claude_bin=claude_bin,
            model=config.model,
            effort=claude_effort(config),
            timeout=config.timeout,
            oauth_token=oauth_token,
            rate_limit_observer=rate_limit_observer,
        )
        if result.session_id is None:
            raise RuntimeError("Claude runtime preflight returned no session id")
        return concrete_model_id


def run_claude_runtime_preflights(
    config: CompetitionConfig,
    oauth_tokens: Sequence[str],
    *,
    rate_limit_observer: Callable[[int, ClaudeRateLimitEvent], None] | None = None,
) -> str:
    model_ids = []
    for account_slot, token in enumerate(oauth_tokens, start=1):
        observer = None
        if rate_limit_observer is not None:

            def observer(
                event: ClaudeRateLimitEvent,
                slot: int = account_slot,
            ) -> None:
                rate_limit_observer(slot, event)

        model_ids.append(
            run_claude_runtime_preflight(
                config,
                oauth_token=token,
                rate_limit_observer=observer,
            )
        )
    model_ids = tuple(model_ids)
    if not model_ids:
        raise RuntimeError("Claude credential pool is empty")
    if len(set(model_ids)) != 1:
        raise RuntimeError(
            "Claude account preflights resolved different concrete model IDs"
        )
    return model_ids[0]


class CompetitionEnvironmentFactory:
    """Create each environment once while preserving per-game recordings."""

    def __init__(self, arcade: Arcade) -> None:
        self.arcade = arcade
        self._lock = threading.RLock()
        self.arcade._cookie_lock = self._lock
        self._made: set[str] = set()

    @property
    def made(self) -> frozenset[str]:
        with self._lock:
            return frozenset(self._made)

    def __call__(self, game_id: str, scorecard_id: str, recordings_dir: Path) -> Any:
        with self._lock:
            if game_id in self._made:
                raise RuntimeError(f"Competition environment already made: {game_id}")
            self._made.add(game_id)
            previous_recordings_dir = self.arcade.recordings_dir
            self.arcade.recordings_dir = str(recordings_dir)
            try:
                environment = self.arcade.make(
                    game_id,
                    scorecard_id=scorecard_id,
                    save_recording=True,
                    include_frame_data=True,
                )
                if environment is None:
                    raise RuntimeError(
                        f"Competition environment could not be created: {game_id}"
                    )
                configure_competition_http(environment)
                if getattr(environment, "observation_space", None) is None:
                    raise RuntimeError(
                        f"Competition environment has no initial observation: {game_id}"
                    )
                share_online_cookie_jar(self.arcade, environment)
                return environment
            finally:
                self.arcade.recordings_dir = previous_recordings_dir


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--runtime",
        choices=["codex", "claude"],
        default=DEFAULT_RUNTIME,
    )
    parser.add_argument(
        "--mode",
        "--operation-mode",
        dest="operation_mode",
        choices=["offline", "online", "competition"],
        default="competition",
    )
    parser.add_argument("--model")
    parser.add_argument("--effort", choices=CODEX_EFFORT_LEVELS)
    parser.add_argument("--max-steps", type=int, default=DEFAULT_MAX_STEPS)
    parser.add_argument("-j", "--concurrency", type=int)
    parser.add_argument(
        "--claude-workers-per-account",
        type=int,
        default=DEFAULT_CLAUDE_WORKERS_PER_ACCOUNT,
    )
    parser.add_argument("--timeout", type=int, default=300)
    parser.add_argument(
        "--max-invalid-retries",
        type=int,
        default=DEFAULT_MAX_INVALID_RETRIES,
    )
    parser.add_argument("--batch-id", default="vista")
    parser.add_argument(
        "--runs-dir",
        type=Path,
        default=Path(os.getenv("ARC3_COMPETITION_RUNS_DIR", DEFAULT_RUNS_DIR)),
    )
    parser.add_argument(
        "--preflight",
        action="store_true",
        help="Validate configuration and discover games without opening a scorecard.",
    )
    return parser


def validate_config(config: CompetitionConfig) -> None:
    if config.operation_mode not in {"offline", "online", "competition"}:
        raise ValueError("--operation-mode must be offline, online, or competition")
    if config.runtime not in {"codex", "claude"}:
        raise ValueError("--runtime must be codex or claude")
    if config.runtime == "codex":
        if config.effort is not None and config.effort not in CODEX_EFFORT_LEVELS:
            raise ValueError("--effort must be " + ", ".join(CODEX_EFFORT_LEVELS))
        resolve_model_spec(config.model, config.effort)
    if config.runtime == "claude" and claude_effort(config) not in CLAUDE_EFFORT_LEVELS:
        raise ValueError("--effort must be " + ", ".join(CLAUDE_EFFORT_LEVELS))
    if config.max_steps < 1:
        raise ValueError("--max-steps must be positive")
    if config.concurrency < 1:
        raise ValueError("--concurrency must be positive")
    if config.claude_workers_per_account < 1:
        raise ValueError("--claude-workers-per-account must be positive")
    if config.timeout < 1:
        raise ValueError("--timeout must be positive")
    if config.max_invalid_retries < 0:
        raise ValueError("--max-invalid-retries must be non-negative")
    if not config.batch_id or any(
        char not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"
        for char in config.batch_id
    ):
        raise ValueError(
            "--batch-id may contain only letters, numbers, hyphens, and underscores"
        )


def config_from_args(args: argparse.Namespace) -> CompetitionConfig:
    model = args.model
    if model is None:
        model = DEFAULT_CLAUDE_MODEL if args.runtime == "claude" else DEFAULT_MODEL
    concurrency = args.concurrency
    if concurrency is None:
        concurrency = (
            DEFAULT_CLAUDE_CONCURRENCY
            if args.runtime == "claude"
            else DEFAULT_CONCURRENCY
        )
    return CompetitionConfig(
        model=model,
        max_steps=args.max_steps,
        concurrency=concurrency,
        timeout=args.timeout,
        max_invalid_retries=args.max_invalid_retries,
        batch_id=args.batch_id,
        runs_dir=args.runs_dir.expanduser().resolve(),
        operation_mode=args.operation_mode,
        runtime=args.runtime,
        effort=args.effort,
        claude_workers_per_account=args.claude_workers_per_account,
    )


def available_game_ids(arcade: Arcade) -> list[str]:
    by_base: dict[str, str] = {}
    for environment in arcade.get_environments():
        full_id = str(environment.game_id)
        base_id = full_id.split("-", 1)[0]
        if base_id in by_base and by_base[base_id] != full_id:
            raise RuntimeError(
                f"Multiple available versions for {base_id}: "
                f"{by_base[base_id]} and {full_id}"
            )
        by_base[base_id] = full_id
    if not by_base:
        raise RuntimeError("ARC API returned no available environments")

    ordered = [game for game in STANDARD_GAME_ORDER if game in by_base]
    ordered.extend(sorted(set(by_base) - set(ordered)))
    return ordered


def game_args(config: CompetitionConfig, game_id: str) -> argparse.Namespace:
    return argparse.Namespace(
        game_id=game_id,
        max_steps=config.max_steps,
        operation_mode=config.operation_mode,
        model=config.model,
        effort=(claude_effort(config) if config.runtime == "claude" else config.effort),
        timeout=config.timeout,
        max_invalid_retries=config.max_invalid_retries,
        observation_mode="vision",
        describe_changes=False,
        render_grid=True,
    )


def create_batch_dir(config: CompetitionConfig) -> Path:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    config.runs_dir.mkdir(parents=True, exist_ok=True)
    for counter in range(10_000):
        suffix = "" if counter == 0 else f"_{counter}"
        candidate = config.runs_dir / f"{config.batch_id}_{stamp}{suffix}"
        try:
            candidate.mkdir()
        except FileExistsError:
            continue
        (candidate / "games").mkdir()
        return candidate
    raise RuntimeError("Could not allocate a competition batch directory")


def write_jsonl(path: Path, value: dict[str, Any]) -> None:
    with path.open("a", encoding="utf-8") as handle:
        json.dump(value, handle, ensure_ascii=True, separators=(",", ":"))
        handle.write("\n")


def run_worker(
    *,
    config: CompetitionConfig,
    game_id: str,
    arcade: Arcade,
    scorecard_id: str,
    auth_file: Path | None,
    preflight_model_id: str | None,
    environment_factory: CompetitionEnvironmentFactory,
    batch_dir: Path,
    claude_oauth_token: str | None = None,
    claude_account_slot: int | None = None,
    claude_credential_lease: ClaudeCredentialLease | None = None,
) -> GameRunOutcome:
    common = {
        "shared_arc": arcade,
        "shared_scorecard_id": scorecard_id,
        "run_dir": batch_dir / "games" / game_id,
        "environment_factory": environment_factory,
    }
    if config.runtime == "claude":
        if preflight_model_id is None:
            raise RuntimeError("Claude worker has no coordinator preflight model ID")
        if claude_credential_lease is None and (
            claude_oauth_token is None or claude_account_slot is None
        ):
            raise RuntimeError("Claude worker has no assigned account credential")
        return run_claude_game(
            game_args(config, game_id),
            preflight_model_id=preflight_model_id,
            oauth_token=claude_oauth_token,
            credential_lease=claude_credential_lease,
            **common,
        )
    if auth_file is None:
        raise RuntimeError("Codex worker has no authentication file")
    return run_codex_game(
        game_args(config, game_id),
        auth_file=auth_file,
        **common,
    )


def run_competition(
    config: CompetitionConfig,
    *,
    arcade_factory: Callable[..., Arcade] = Arcade,
    game_runner: Callable[..., GameRunOutcome] = run_worker,
    preflight: bool = False,
) -> tuple[Path | None, int]:
    validate_config(config)
    auth_file: Path | None = None
    preflight_model_id: str | None = None
    claude_oauth_tokens: tuple[str, ...] = ()
    claude_slots: tuple[tuple[int, str], ...] = ()
    claude_schedule: ClaudeAccountSchedule | None = None
    claude_credential_pool: ClaudeCredentialPool | None = None
    if config.runtime == "codex":
        auth_file = validate_codex_auth_file(default_codex_auth_file())
    else:
        claude_oauth_tokens = claude_oauth_token_pool()
        claude_slots = claude_worker_slots(
            claude_oauth_tokens,
            workers_per_account=config.claude_workers_per_account,
            concurrency=config.concurrency,
        )
        active_accounts = {account for account, _ in claude_slots}
        expected_accounts = set(range(1, len(claude_oauth_tokens) + 1))
        if active_accounts != expected_accounts:
            raise ValueError(
                "Claude concurrency must provide at least one worker per account"
            )
        claude_credential_pool = ClaudeCredentialPool(
            claude_oauth_tokens,
            (config.claude_workers_per_account,) * len(claude_oauth_tokens),
        )

    operation_mode = OperationMode(config.operation_mode)
    if preflight and operation_mode == OperationMode.COMPETITION:
        operation_mode = OperationMode.ONLINE
    os.environ["OPERATION_MODE"] = operation_mode.value
    arcade = arcade_factory(operation_mode=operation_mode)
    configure_competition_http(arcade)
    game_ids = available_game_ids(arcade)
    missing_standard = sorted(set(STANDARD_GAME_ORDER) - set(game_ids))
    if missing_standard:
        raise RuntimeError(
            "Expected public environments are unavailable: "
            + ", ".join(missing_standard)
        )
    if config.runtime == "claude":
        claude_schedule = claude_account_schedule(
            game_ids,
            account_count=len(claude_oauth_tokens),
        )

    print(f"Available games ({len(game_ids)}): {' '.join(game_ids)}")
    print(
        f"Runtime: {config.runtime}, {config.model}"
        + (f"/{claude_effort(config)}" if config.runtime == "claude" else "")
        + f", {config.max_steps} actions, "
        f"{config.concurrency} workers"
    )
    if config.runtime == "claude":
        assert claude_credential_pool is not None
        preflight_model_id = run_claude_runtime_preflights(
            config,
            claude_oauth_tokens,
            rate_limit_observer=(claude_credential_pool.observe_account_rate_limit),
        )
        if not claude_credential_pool.healthy_account_slots():
            raise RuntimeError(
                "Every Claude account is at or above the protected quota threshold"
            )
        print(
            "Claude container runtime: ready "
            f"({preflight_model_id}; {len(claude_oauth_tokens)} accounts; "
            f"{config.concurrency} total worker slots)"
        )
        assert claude_schedule is not None
        for account, games in enumerate(claude_schedule.account_games, start=1):
            print(f"Claude account {account}: {len(games)} planned games")
    if preflight:
        if config.runtime == "codex":
            assert auth_file is not None
            run_codex_runtime_preflight(config, auth_file)
            print("Codex container runtime: ready")
        print("Preflight passed; no scorecard was opened.")
        return None, 0

    batch_dir = create_batch_dir(config)
    batch_manifest: dict[str, Any] = {
        "created_at": utc_now(),
        "finished_at": None,
        "operation_mode": config.operation_mode,
        "scorecard_id": None,
        "scorecard_closed": False,
        "runtime": config.runtime,
        "model": config.model,
        "reasoning_effort": (
            claude_effort(config) if config.runtime == "claude" else None
        ),
        "resolved_model_id": preflight_model_id,
        "max_steps_per_game": config.max_steps,
        "concurrency": config.concurrency,
        "game_ids": game_ids,
        "runtime_version": os.getenv("ARC3_PINNED_RUNTIME_VERSION"),
        "results": {},
    }
    if config.runtime == "claude":
        assert claude_credential_pool is not None
        assert claude_schedule is not None
        batch_manifest.update(
            {
                "claude_account_count": len(claude_oauth_tokens),
                "claude_workers_per_account": config.claude_workers_per_account,
            }
        )
    write_json(batch_dir / "manifest.json", batch_manifest)

    scorecard_id: str | None = None
    close_failure: BaseException | None = None
    game_results: dict[str, CompetitionGameResult] = {}
    try:
        scorecard_id = open_evaluation_scorecard(arcade)
        batch_manifest["scorecard_id"] = scorecard_id
        write_json(batch_dir / "manifest.json", batch_manifest)
        print(f"{config.operation_mode.title()} scorecard opened: {scorecard_id}")
        print(f"Batch directory: {batch_dir}")
        environment_factory = CompetitionEnvironmentFactory(arcade)

        def execute_game(
            game_id: str,
            account_slot: int | None = None,
            oauth_token: str | None = None,
            credential_lease: ClaudeCredentialLease | None = None,
        ) -> CompetitionGameResult:
            try:
                outcome = game_runner(
                    config=config,
                    game_id=game_id,
                    arcade=arcade,
                    scorecard_id=scorecard_id,
                    auth_file=auth_file,
                    preflight_model_id=preflight_model_id,
                    environment_factory=environment_factory,
                    batch_dir=batch_dir,
                    claude_oauth_token=oauth_token,
                    claude_account_slot=account_slot,
                    claude_credential_lease=credential_lease,
                )
            except BaseException as exc:
                return CompetitionGameResult(
                    game_id=game_id,
                    error=type(exc).__name__,
                    finished_at=utc_now(),
                )
            return CompetitionGameResult(
                game_id=game_id,
                error=(
                    type(outcome.failure).__name__
                    if outcome.failure is not None
                    else None
                ),
                finished_at=utc_now(),
            )

        def record_result(result: CompetitionGameResult) -> None:
            game_results[result.game_id] = result
            batch_manifest["results"] = {
                key: asdict(value) for key, value in sorted(game_results.items())
            }
            write_jsonl(batch_dir / "results.jsonl", asdict(result))
            write_json(batch_dir / "manifest.json", batch_manifest)
            status = "failed" if result.error else "finished"
            print(f"{result.game_id}: {status} ({len(game_results)}/{len(game_ids)})")

        with ThreadPoolExecutor(
            max_workers=config.concurrency,
            thread_name_prefix="arc3-game",
        ) as executor:
            if config.runtime == "claude":
                assert claude_schedule is not None
                assert claude_credential_pool is not None
                account_queues = {
                    account: deque(games)
                    for account, games in enumerate(
                        claude_schedule.account_games,
                        start=1,
                    )
                }
                account_slots = tuple(account_queues)
                futures: dict[Future[CompetitionGameResult], ClaudeCredentialLease] = {}

                def submit_next(account_slot: int) -> bool:
                    credential_lease = claude_credential_pool.try_acquire(account_slot)
                    if credential_lease is None:
                        return False
                    game_id = pop_claude_scheduled_game(
                        account_slot,
                        account_queues,
                    )
                    if game_id is None:
                        credential_lease.release()
                        return False
                    future = executor.submit(
                        execute_game,
                        game_id,
                        account_slot,
                        credential_lease.oauth_token,
                        credential_lease,
                    )
                    futures[future] = credential_lease
                    return True

                while any(account_queues.values()) or futures:
                    submitted = True
                    while submitted and len(futures) < config.concurrency:
                        submitted = False
                        for account_slot in account_slots:
                            if len(futures) >= config.concurrency:
                                break
                            submitted = submit_next(account_slot) or submitted

                    if not futures:
                        time.sleep(SCHEDULER_POLL_SECONDS)
                        continue
                    completed, _ = wait(
                        tuple(futures),
                        timeout=SCHEDULER_POLL_SECONDS,
                        return_when=FIRST_COMPLETED,
                    )
                    for future in completed:
                        credential_lease = futures.pop(future)
                        try:
                            result = future.result()
                        finally:
                            credential_lease.release()
                        record_result(result)
            else:
                codex_futures = {
                    executor.submit(execute_game, game_id): game_id
                    for game_id in game_ids
                }
                for future in as_completed(codex_futures):
                    record_result(future.result())

        batch_manifest["made_game_ids"] = sorted(environment_factory.made)
        if environment_factory.made != frozenset(game_ids):
            batch_manifest["make_invariant_error"] = {
                "missing": sorted(set(game_ids) - set(environment_factory.made)),
                "unexpected": sorted(set(environment_factory.made) - set(game_ids)),
            }
    finally:
        if scorecard_id is not None:
            scorecard_result, close_failure = finalize_scorecard(
                arc=arcade,
                env=None,
                scorecard_id=scorecard_id,
                operation_mode=config.operation_mode,
            )
            batch_manifest.update(scorecard_result)
        batch_manifest["finished_at"] = utc_now()
        if close_failure is not None:
            batch_manifest["scorecard_close_failure"] = type(close_failure).__name__
        write_json(batch_dir / "manifest.json", batch_manifest)

    failures = sum(result.error is not None for result in game_results.values())
    if len(game_results) != len(game_ids):
        failures += len(game_ids) - len(game_results)
    if close_failure is not None:
        failures += 1
    print(f"Batch complete: {len(game_results)}/{len(game_ids)} games")
    print(f"Scorecard closed: {batch_manifest.get('scorecard_closed', False)}")
    return batch_dir, 0 if failures == 0 else 1


def main(argv: Sequence[str] | None = None) -> int:
    env_file = load_run_environment(override=True)
    args = build_parser().parse_args(argv)
    if args.operation_mode != "offline" and not os.getenv("ARC_API_KEY"):
        raise RuntimeError(f"ARC_API_KEY is absent from {env_file}")
    _, status = run_competition(config_from_args(args), preflight=args.preflight)
    return status


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/benchmarks/arc3/claude/__init__.py

````text
"""ARC3 claude bindings for the shared VISTA backend."""

````


## vista-c97c354/src/vista/benchmarks/arc3/claude/controller.py

````text
"""Private game controller for the sanitized player tools."""

from __future__ import annotations

import base64
import io
import json
import threading
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

from arcengine import GameAction, GameState
from PIL import Image

from vista.benchmarks.arc3.claude.tools import (
    ACTION_NAMES,
    MAX_GUIDE_CHARS,
    MAX_INSPECTION_LABEL_CHARS,
    MAX_INSPECTION_QUESTION_CHARS,
    MAX_INSPECTION_VIEWS,
    MAX_PIXEL_READOUT_SAMPLES,
    MAX_PIXEL_READOUT_VIEWS,
    MAX_WORKING_CHARS,
)
from vista.benchmarks.arc3.render import render_frame_image, save_frame_png
from vista.core.session import (
    CompactRecovery,
    RetryRecovery,
    RuntimeRecovery,
    SessionController,
)

DISPLAY_SIZE = 1024
GRID_SIZE = 64
ACTION_BY_NAME = {
    "RESET": GameAction.RESET,
    "ACTION1": GameAction.ACTION1,
    "ACTION2": GameAction.ACTION2,
    "ACTION3": GameAction.ACTION3,
    "ACTION4": GameAction.ACTION4,
    "ACTION5": GameAction.ACTION5,
    "ACTION6": GameAction.ACTION6,
    "ACTION7": GameAction.ACTION7,
}
NAME_BY_ACTION = {action: name for name, action in ACTION_BY_NAME.items()}
PIXEL_READOUT_SYMBOLS = (
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
)


@dataclass(frozen=True)
class ToolActionValidation:
    ok: bool
    action: GameAction | None = None
    data: dict[str, int] | None = None
    parsed: dict[str, Any] | None = None
    retry_state: str | None = None
    error: str | None = None


def available_action_names(actions: Iterable[GameAction]) -> list[str]:
    available = {
        NAME_BY_ACTION[action] for action in actions if action in NAME_BY_ACTION
    }
    return [name for name in ACTION_NAMES if name in available]


def validate_tool_action(
    arguments: object,
    legal_actions: Iterable[GameAction],
    display_size: int = DISPLAY_SIZE,
    *,
    reset_requires_retry_state: bool = False,
) -> ToolActionValidation:
    if type(display_size) is not int or display_size < 1:
        raise ValueError("display_size must be a positive integer")
    if not isinstance(arguments, dict):
        return ToolActionValidation(ok=False, error="Tool arguments must be an object.")
    allowed_arguments = {"action", "x", "y"}
    if reset_requires_retry_state:
        allowed_arguments.add("retry_state")
    if set(arguments) - allowed_arguments:
        return ToolActionValidation(ok=False, error="Unexpected tool argument.")
    action_name = arguments.get("action")
    if not isinstance(action_name, str) or action_name not in ACTION_BY_NAME:
        return ToolActionValidation(ok=False, error="Unknown action.")
    action = ACTION_BY_NAME[action_name]
    legal = set(legal_actions)
    if action not in legal:
        return ToolActionValidation(
            ok=False,
            error=f"{action_name} is not currently available.",
        )

    x = arguments.get("x")
    y = arguments.get("y")
    retry_state = arguments.get("retry_state")
    if action == GameAction.RESET:
        if x is not None or y is not None:
            return ToolActionValidation(
                ok=False,
                error="x and y are only used with ACTION6.",
            )
        if reset_requires_retry_state:
            if (
                not isinstance(retry_state, str)
                or not retry_state.strip()
                or len(retry_state) > MAX_WORKING_CHARS
            ):
                return ToolActionValidation(
                    ok=False,
                    error=(
                        "RESET requires retry_state containing the continuation "
                        "state for the next attempt."
                    ),
                )
            retry_state = retry_state.strip()
        return ToolActionValidation(
            ok=True,
            action=action,
            data=None,
            parsed={
                "action": action_name,
                "x": None,
                "y": None,
            },
            retry_state=retry_state,
        )

    if "retry_state" in arguments:
        return ToolActionValidation(
            ok=False,
            error="retry_state is only used with RESET.",
        )

    if action == GameAction.ACTION6:
        if type(x) is not int or type(y) is not int:
            return ToolActionValidation(
                ok=False, error="ACTION6 requires integer x and y."
            )
        if not (0 <= x < display_size and 0 <= y < display_size):
            return ToolActionValidation(
                ok=False,
                error=f"ACTION6 coordinates must be in 0..{display_size - 1}.",
            )
        environment_x = min(GRID_SIZE - 1, x * GRID_SIZE // display_size)
        environment_y = min(GRID_SIZE - 1, y * GRID_SIZE // display_size)
        return ToolActionValidation(
            ok=True,
            action=action,
            data={"x": environment_x, "y": environment_y},
            parsed={
                "action": action_name,
                "x": x,
                "y": y,
                "environment_x": environment_x,
                "environment_y": environment_y,
            },
        )

    if x is not None or y is not None:
        return ToolActionValidation(
            ok=False,
            error="x and y are only used with ACTION6.",
        )
    return ToolActionValidation(
        ok=True,
        action=action,
        data=None,
        parsed={
            "action": action_name,
            "x": None,
            "y": None,
        },
    )


class GameController(SessionController):
    def _atomic_write_text(self, path: Path, content: str, *, mode: int) -> None:
        atomic_write_text(path, content, mode=mode)

    def __init__(
        self,
        *,
        env: Any,
        initial_observation: Any,
        private_dir: Path,
        frames_dir: Path,
        max_steps: int,
        max_invalid_retries: int,
        observation_mode: str,
        render_scale: int,
        render_grid: bool = False,
        compact_restore_marker: Path | None = None,
        compact_guide_snapshot: Path | None = None,
        compact_checkpoint_marker: Path | None = None,
        compact_checkpoint_ready: Path | None = None,
        retry_boundary_marker: Path | None = None,
        reset_starts_fresh_session: bool = False,
        working_path: Path | None = None,
        guide_path: Path | None = None,
        agent_name: str = "claude-code",
        interface_name: str = "native-mcp-tool-loop",
    ) -> None:
        self.env = env
        self.obs = initial_observation
        self.private_dir = private_dir
        self.frames_dir = frames_dir
        self.max_steps = max_steps
        self.max_invalid_retries = max_invalid_retries
        self.observation_mode = observation_mode
        self.render_scale = render_scale
        if type(render_scale) is not int or render_scale < 1:
            raise ValueError("render_scale must be a positive integer")
        self.display_size = GRID_SIZE * render_scale
        self.render_grid = render_grid
        self.compact_restore_marker = compact_restore_marker
        self.compact_guide_snapshot = compact_guide_snapshot
        self.compact_checkpoint_marker = compact_checkpoint_marker
        self.compact_checkpoint_ready = compact_checkpoint_ready
        self.retry_boundary_marker = retry_boundary_marker
        self.reset_starts_fresh_session = reset_starts_fresh_session
        self.working_path = working_path
        self.guide_path = guide_path
        self.agent_name = agent_name
        self.interface_name = interface_name
        self.working_provenance_path = private_dir / "working_memory_provenance.json"
        self.working_archive_dir = private_dir / "working_memory_archive"
        self.retry_state_staging_path = private_dir / "retry_state.pending"
        self.action_log_path = private_dir / "action_log.jsonl"
        self.error_log_path = private_dir / "controller_errors.jsonl"
        self.recovery_log_path = private_dir / "compact_recovery.jsonl"
        self.step_index = 0
        self.attempt_index = 0
        self.total_attempts = 0
        self._events: list[dict[str, Any]] = []
        self._pixel_readout_symbol_by_color: dict[tuple[int, int, int], str] = {}
        self._level_start_turn = 0
        self._retry_boundary_step: int | None = None
        self.forced_termination_reason: str | None = None
        self._current_images: list[Path] = []
        self._lock = threading.Lock()
        self._store_observation()

    @property
    def terminal(self) -> bool:
        return (
            self.forced_termination_reason is not None
            or self.obs is None
            or self.obs.state == GameState.WIN
        )

    @property
    def termination_reason(self) -> str | None:
        if self.forced_termination_reason:
            return self.forced_termination_reason
        if self.obs is None:
            return "environment_ended"
        if self.obs.state == GameState.WIN:
            return state_name(self.obs.state)
        return None

    def _available_actions(self) -> list[GameAction]:
        if self.obs is not None and self.obs.state == GameState.GAME_OVER:
            return [GameAction.RESET]
        return list(self.env.action_space)

    @property
    def retry_boundary_pending(self) -> bool:
        return self._retry_boundary_step is not None

    @property
    def retry_boundary_step(self) -> int | None:
        return self._retry_boundary_step

    def handle(self, request: dict[str, Any]) -> dict[str, Any]:
        with self._lock:
            method = request.get("method")
            if self.retry_boundary_pending:
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Retry recovery has not been delivered yet.",
                    include_image=False,
                )
            if method == "inspect":
                return self._inspect(request.get("arguments"))
            if method == "read_pixels":
                return self._read_pixels(request.get("arguments"))
            if method == "history":
                return self._history(request.get("arguments"))
            if method == "save_compact_checkpoint":
                return self._save_compact_checkpoint(request.get("arguments"))
            if method != "play":
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Unknown controller method.",
                    include_image=False,
                )
            if self.terminal:
                return self._response(
                    ok=True,
                    action_applied=False,
                    include_image=False,
                )
            if (
                self.compact_restore_marker is not None
                and self.compact_restore_marker.exists()
            ):
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Compact recovery has not been delivered yet.",
                    include_image=False,
                )

            if (
                self.compact_checkpoint_marker is not None
                and self.compact_checkpoint_marker.exists()
            ):
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Save the compact checkpoint before playing.",
                    include_image=False,
                )

            arguments = request.get("arguments")
            retry = self.attempt_index
            self.total_attempts += 1
            validation = validate_tool_action(
                arguments,
                self._available_actions(),
                display_size=self.display_size,
                reset_requires_retry_state=self.reset_starts_fresh_session,
            )
            log_entry: dict[str, Any] = {
                "protocol": self.interface_name,
                "step": self.step_index,
                "retry": retry,
                "tool_call_id": request.get("request_id"),
                "requested": arguments,
                "validation": validation_to_log(validation),
            }
            if not validation.ok:
                self.attempt_index += 1
                if retry >= self.max_invalid_retries:
                    self.attempt_index = 0
                    log_entry["recovery_boundary"] = "invalid_action_limit"
                    append_jsonl(self.action_log_path, log_entry)
                    return self._response(
                        ok=False,
                        action_applied=False,
                        error=validation.error,
                        include_image=False,
                        invalid_action_limit=True,
                    )
                append_jsonl(self.action_log_path, log_entry)
                return self._response(
                    ok=False,
                    action_applied=False,
                    error=validation.error,
                    include_image=False,
                )

            assert validation.action is not None
            assert validation.parsed is not None
            current_step = self.step_index
            previous_levels_completed = getattr(self.obs, "levels_completed", None)
            try:
                if validation.action == GameAction.RESET:
                    retry_provenance = (
                        self._stage_retry_state(validation.retry_state)
                        if validation.retry_state is not None
                        else None
                    )
                    next_observation = self.env.reset()
                else:
                    retry_provenance = None
                    next_observation = self.env.step(
                        validation.action,
                        data=validation.data,
                    )
                if next_observation is None:
                    self.forced_termination_reason = "environment_response_missing"
                    raise RuntimeError(
                        "The environment returned no observation; remote state is unknown."
                    )
                self.obs = next_observation
                self.step_index += 1
                if retry_provenance is not None:
                    self._commit_retry_state(retry_provenance)
                self.attempt_index = 0
                if self.obs is not None:
                    self._store_observation()
                else:
                    self._current_images = []
                if self.step_index >= self.max_steps and not self.terminal:
                    self.forced_termination_reason = "action_budget_exhausted"
                level_boundary = self._crossed_level_boundary(previous_levels_completed)
                if level_boundary:
                    self._level_start_turn = self.step_index
                    self._archive_level_working(previous_levels_completed)
                reset_applied = validation.action == GameAction.RESET
                retry_boundary = reset_applied and self.reset_starts_fresh_session
                if retry_boundary:
                    self._mark_retry_boundary()
                    if not self.terminal:
                        self._retry_boundary_step = self.step_index
                result_metadata = self._metadata(
                    action_applied=True,
                    level_boundary=level_boundary,
                    retry_boundary=retry_boundary,
                )
                log_entry["result"] = result_metadata
                self._events.append(
                    self._public_event(
                        step=current_step,
                        parsed_action=validation.parsed,
                        result=result_metadata,
                    )
                )
                append_jsonl(self.action_log_path, log_entry)
            except Exception as exc:
                self.retry_state_staging_path.unlink(missing_ok=True)
                error = {
                    "step": current_step,
                    "error_type": type(exc).__name__,
                    "error": str(exc),
                }
                append_jsonl(self.error_log_path, error)
                log_entry["controller_error"] = error
                append_jsonl(self.action_log_path, log_entry)
                if self.forced_termination_reason is None:
                    self.forced_termination_reason = "controller_error"
                raise
            return self._response(
                ok=True,
                action_applied=True,
                include_image=True,
                level_boundary=level_boundary,
                retry_boundary=retry_boundary,
            )

    def _crossed_level_boundary(self, previous_completed: object) -> bool:
        if self.terminal or self.obs is None:
            return False
        current_completed = getattr(self.obs, "levels_completed", None)
        return (
            type(previous_completed) is int
            and type(current_completed) is int
            and current_completed > previous_completed
        )

    def _archive_level_working(self, previous_completed: object) -> None:
        if self.working_path is None or not self.working_path.is_file():
            if self.working_provenance_path.exists():
                self.working_provenance_path.unlink()
            return
        working = self.working_path.read_text(encoding="utf-8", errors="replace")
        if not working.strip():
            self._clear_working()
            return
        provenance = self._read_working_provenance()
        current_completed = getattr(self.obs, "levels_completed", None)
        total = getattr(self.obs, "win_levels", None)
        archive = {
            "boundary_turn": self.step_index,
            "saved_at": provenance,
            "previous_progress": {
                "completed": (
                    previous_completed if type(previous_completed) is int else None
                ),
                "total": total if type(total) is int else None,
            },
            "current_progress": {
                "completed": (
                    current_completed if type(current_completed) is int else None
                ),
                "total": total if type(total) is int else None,
            },
        }
        self.working_archive_dir.mkdir(parents=True, exist_ok=True)
        archive_stem = f"turn_{self.step_index:06d}"
        atomic_write_text(
            self.working_archive_dir / f"{archive_stem}.md",
            working,
            mode=0o600,
        )
        atomic_write_text(
            self.working_archive_dir / f"{archive_stem}.json",
            json.dumps(archive, separators=(",", ":"), sort_keys=True) + "\n",
            mode=0o600,
        )
        append_jsonl(
            self.recovery_log_path,
            {
                "step": self.step_index,
                "action_applied": False,
                "event": "level_working_archived",
                "boundary_turn": self.step_index,
                "working_chars": len(working.strip()),
            },
        )
        self._clear_working()

    def _stage_retry_state(self, retry_state: str) -> dict[str, Any]:
        if self.working_path is None:
            raise RuntimeError("RESET continuation storage is unavailable.")
        metadata = self._metadata(action_applied=False)
        history = self._attempt_history()
        attempts = history["attempts"]
        provenance = {
            "source": "reset_handoff",
            "turn": self.step_index,
            "attempt": attempts[-1]["attempt"] if attempts else 1,
            "state": metadata["state"],
            "progress": metadata["progress"],
            "level_start_turn": self._level_start_turn,
        }
        atomic_write_text(
            self.retry_state_staging_path,
            retry_state.strip() + "\n",
            mode=0o600,
        )
        return provenance

    def _commit_retry_state(self, provenance: dict[str, Any]) -> None:
        if self.working_path is None or not self.retry_state_staging_path.is_file():
            raise RuntimeError("RESET continuation state is unavailable.")
        self.working_path.parent.mkdir(parents=True, exist_ok=True)
        self.retry_state_staging_path.replace(self.working_path)
        provenance = {**provenance, "reset_turn": self.step_index}
        atomic_write_text(
            self.working_provenance_path,
            json.dumps(provenance, separators=(",", ":"), sort_keys=True) + "\n",
            mode=0o600,
        )

    def _record_working_provenance(self) -> dict[str, Any]:
        metadata = self._metadata(action_applied=False)
        provenance = {
            "turn": self.step_index,
            "state": metadata["state"],
            "progress": metadata["progress"],
            "level_start_turn": self._level_start_turn,
        }
        atomic_write_text(
            self.working_provenance_path,
            json.dumps(provenance, separators=(",", ":"), sort_keys=True) + "\n",
            mode=0o600,
        )
        return provenance

    @staticmethod
    def _public_event(
        *,
        step: int,
        parsed_action: dict[str, Any],
        result: dict[str, Any],
    ) -> dict[str, Any]:
        action = {"action": parsed_action["action"]}
        if parsed_action["action"] == "ACTION6":
            action["x"] = parsed_action["x"]
            action["y"] = parsed_action["y"]
        public_result = {key: value for key, value in result.items() if key != "grid"}
        return {
            "step": step,
            "turn": result["turn"],
            "action": action,
            "result": public_result,
        }

    def _history(self, arguments: object) -> dict[str, Any]:
        if not isinstance(arguments, dict) or set(arguments) - {
            "view",
            "start_turn",
            "end_turn",
            "limit",
        }:
            return {"ok": False, "metadata": {"error": "Invalid arguments."}}
        view = arguments.get("view")
        if view not in {"attempts", "events"}:
            return {"ok": False, "metadata": {"error": "Invalid history view."}}
        limit = arguments.get("limit", 64)
        if type(limit) is not int or not 1 <= limit <= 128:
            return {"ok": False, "metadata": {"error": "Invalid history limit."}}

        if view == "attempts":
            if set(arguments) - {"view", "limit"}:
                return {
                    "ok": False,
                    "metadata": {
                        "error": ("start_turn and end_turn are only valid for events.")
                    },
                }
            history = self._attempt_history()
            attempts = history["attempts"]
            history["attempts"] = attempts[-limit:]
            history["total_attempts"] = len(attempts)
            history["truncated"] = len(attempts) > limit
            return {"ok": True, "metadata": history}

        start_turn = arguments.get("start_turn")
        end_turn = arguments.get("end_turn")
        if start_turn is not None and (
            type(start_turn) is not int or not 0 <= start_turn <= 999999
        ):
            return {"ok": False, "metadata": {"error": "Invalid start_turn."}}
        if end_turn is not None and (
            type(end_turn) is not int or not 0 <= end_turn <= 999999
        ):
            return {"ok": False, "metadata": {"error": "Invalid end_turn."}}
        if (
            isinstance(start_turn, int)
            and isinstance(end_turn, int)
            and start_turn > end_turn
        ):
            return {
                "ok": False,
                "metadata": {"error": "start_turn must not exceed end_turn."},
            }

        matching = [
            event
            for event in self._events
            if (start_turn is None or event["turn"] >= start_turn)
            and (end_turn is None or event["turn"] <= end_turn)
        ]
        if start_turn is None and end_turn is None:
            selected = matching[-limit:]
        else:
            selected = matching[:limit]
        turns = [event["turn"] for event in self._events]
        return {
            "ok": True,
            "metadata": {
                "view": "events",
                "source": "environment action results",
                "events": selected,
                "available_turn_range": ([turns[0], turns[-1]] if turns else None),
                "total_matching": len(matching),
                "truncated": len(matching) > len(selected),
            },
        }

    def _attempt_history(self) -> dict[str, Any]:
        events = [
            event for event in self._events if event["turn"] > self._level_start_turn
        ]
        attempts: list[dict[str, Any]] = []
        attempt_number = 1
        start_kind = "level_entry"
        start_turn = self._level_start_turn
        game_actions = 0

        for event in events:
            action = event["action"]["action"]
            result = event["result"]
            if action == "RESET":
                attempt_number += 1
                start_kind = "reset"
                start_turn = event["turn"]
                game_actions = 0
                continue
            game_actions += 1
            if result["state"] in {"GAME_OVER", "WIN", "TERMINAL"}:
                attempts.append(
                    {
                        "attempt": attempt_number,
                        "start": start_kind,
                        "start_turn": start_turn,
                        "outcome": result["state"],
                        "game_actions": game_actions,
                        "end_turn": event["turn"],
                    }
                )

        current_state = "TERMINAL" if self.obs is None else state_name(self.obs.state)
        if current_state not in {"GAME_OVER", "WIN", "TERMINAL"}:
            attempts.append(
                {
                    "attempt": attempt_number,
                    "start": start_kind,
                    "start_turn": start_turn,
                    "outcome": current_state,
                    "game_actions": game_actions,
                    "end_turn": self.step_index,
                }
            )
        return {
            "view": "attempts",
            "source": "environment action results",
            "level_start_turn": self._level_start_turn,
            "progress": self._metadata(action_applied=False)["progress"],
            "attempts": attempts,
        }

    def _store_observation(self) -> None:
        save_private_observation(self.private_dir, self.step_index, self.obs)
        self._current_images = render_observation_frames(
            self.frames_dir,
            self.step_index,
            self.obs,
            self.render_scale,
            self.render_grid,
        )

    def _selected_images(self) -> list[Path]:
        return self._current_images[-1:] if self._current_images else []

    def _metadata(
        self,
        *,
        action_applied: bool,
        error: str | None = None,
        level_boundary: bool = False,
        retry_boundary: bool = False,
        invalid_action_limit: bool = False,
    ) -> dict[str, Any]:
        state = "TERMINAL" if self.obs is None else state_name(self.obs.state)
        completed = None if self.obs is None else self.obs.levels_completed
        total = None if self.obs is None else self.obs.win_levels
        metadata: dict[str, Any] = {
            "turn": self.step_index,
            "state": state,
            "progress": {"completed": completed, "total": total},
            "available_actions": (
                []
                if self.terminal
                else available_action_names(self._available_actions())
            ),
            "action_applied": action_applied,
            "terminal": self.terminal,
        }
        if self.termination_reason:
            metadata["termination_reason"] = self.termination_reason
        if error:
            metadata["error"] = error
        if level_boundary:
            metadata["level_boundary"] = True
        if retry_boundary:
            metadata["retry_boundary"] = True
        if invalid_action_limit:
            metadata["invalid_action_limit"] = True
        selected = self._selected_images()
        if selected:
            metadata["visual"] = {
                "turn": self.step_index,
                "frame_count": len(self._current_images),
                "final_frame": self._frame_number(selected[-1]),
                "width": self.display_size,
                "height": self.display_size,
            }
        if self.observation_mode in {"grid", "both"} and self.obs is not None:
            metadata["grid"] = format_grid_observation(self.obs.frame)
        return metadata

    def _response(
        self,
        *,
        ok: bool,
        action_applied: bool,
        error: str | None = None,
        include_image: bool = True,
        level_boundary: bool = False,
        retry_boundary: bool = False,
        invalid_action_limit: bool = False,
    ) -> dict[str, Any]:
        response: dict[str, Any] = {
            "ok": ok,
            "metadata": self._metadata(
                action_applied=action_applied,
                error=error,
                level_boundary=level_boundary,
                retry_boundary=retry_boundary,
                invalid_action_limit=invalid_action_limit,
            ),
        }
        selected = self._selected_images()
        if include_image and self.observation_mode in {"vision", "both"} and selected:
            response["image"] = {
                "mime_type": "image/png",
                "detail": "original",
                "data": base64.b64encode(selected[-1].read_bytes()).decode("ascii"),
            }
        return response


def render_observation_frames(
    frames_dir: Path,
    step_index: int,
    obs: Any,
    scale: int,
    grid_lines: bool = False,
) -> list[Path]:
    paths = []
    for frame_index, frame in enumerate(obs.frame):
        path = frames_dir / f"turn_{step_index:03d}_frame_{frame_index:02d}.png"
        save_frame_png(frame, path, scale=scale, grid_lines=grid_lines)
        paths.append(path)
    return paths


def save_private_observation(private_dir: Path, step_index: int, obs: Any) -> None:
    response_dir = private_dir / "responses"
    response_dir.mkdir(exist_ok=True)
    write_json(response_dir / f"step_{step_index:04d}.json", serialize_observation(obs))


def serialize_observation(obs: Any) -> dict[str, Any]:
    return {
        "game_id": obs.game_id,
        "guid": obs.guid,
        "state": state_name(obs.state),
        "levels_completed": obs.levels_completed,
        "win_levels": obs.win_levels,
        "available_actions": list(obs.available_actions),
        "action_input": safe_model_dump(obs.action_input),
        "full_reset": obs.full_reset,
        "frame": [frame.tolist() for frame in obs.frame],
    }


def format_grid_observation(frames: Iterable[Any]) -> dict[str, Any]:
    return {
        "frames": [
            [[int(cell) for cell in row] for row in frame.tolist()]
            for frame in list(frames)[-1:]
        ]
    }


def safe_model_dump(value: Any) -> Any:
    if value is None:
        return None
    if hasattr(value, "model_dump"):
        return value.model_dump(mode="json")
    if hasattr(value, "dict"):
        return value.dict()
    if isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, list):
        return [safe_model_dump(item) for item in value]
    if isinstance(value, dict):
        return {str(key): safe_model_dump(item) for key, item in value.items()}
    return str(value)


def validation_to_log(validation: ToolActionValidation) -> dict[str, Any]:
    return {
        "ok": validation.ok,
        "action_id": (
            int(validation.action.value) if validation.action is not None else None
        ),
        "data": validation.data,
        "parsed": validation.parsed,
        "error": validation.error,
    }


def state_name(state: Any) -> str:
    return state.name if hasattr(state, "name") else str(state)


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, sort_keys=True), encoding="utf-8")


def append_jsonl(path: Path, data: Any) -> None:
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(data, separators=(",", ":"), sort_keys=True))
        handle.write("\n")


def atomic_write_text(path: Path, content: str, *, mode: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(content, encoding="utf-8")
    temporary.chmod(mode)
    temporary.replace(path)

````


## vista-c97c354/src/vista/benchmarks/arc3/claude/harness.py

````text
"""Run an ARC visual-game evaluation with Claude Code."""

from __future__ import annotations

import argparse
import json
import os
import time
from dataclasses import replace
from pathlib import Path
from typing import Any, Callable, Sequence

os.environ.setdefault("MPLCONFIGDIR", "/tmp/arc3_mplconfig")

import arc_agi
from arc_agi import Arcade, OperationMode

from vista.backends.claude.lifecycle import (
    MAX_COMPACT_CYCLES_WITHOUT_ACTION as MAX_COMPACT_CYCLES_WITHOUT_ACTION,
    MAX_DECISION_LEASE_RECOVERIES_PER_STEP as MAX_DECISION_LEASE_RECOVERIES_PER_STEP,
    MAX_RUNTIME_RECOVERIES_PER_STEP as MAX_RUNTIME_RECOVERIES_PER_STEP,
    NONTERMINAL_CONTINUATION_PROMPT as NONTERMINAL_CONTINUATION_PROMPT,
    PROVIDER_5XX_BACKOFF_SECONDS as PROVIDER_5XX_BACKOFF_SECONDS,
    run_task_with_native_context as run_task_with_native_context,
)
from vista.backends.claude.quota import ClaudeCredentialLease, ClaudeRateLimitEvent
from vista.benchmarks.arc3.claude.controller import GameController, write_json
from vista.benchmarks.arc3.claude.recovery import TASK_OBJECTIVE
from vista.benchmarks.arc3.claude.runner import (
    CLAUDE_EFFORT_LEVELS,
    DEFAULT_CLAUDE_EFFORT,
    DEFAULT_CLAUDE_MODEL,
    PINNED_CLAUDE_VERSION,
    RUNTIME_PREFLIGHT_PROMPT,
    ClaudeCodeRunner,
    ClaudePreflightController,
    ClaudeResult,
    claude_version,
    default_claude_bin,
    prepare_claude_config,
    resolved_model_id,
    validate_claude_runtime,
    validate_instruction_envelope,
)
from vista.benchmarks.arc3.http import configure_arc_http
from vista.benchmarks.arc3.run import (
    GameRunOutcome,
    bounded_task_timeout,
    create_run_dir,
    finalize_scorecard,
    load_run_environment,
    open_evaluation_scorecard,
    report_run_failure,
    share_online_cookie_jar,
    utc_now,
)

GRID_SIZE = 64
RENDER_SCALE = 8
DEFAULT_RENDER_GRID = True
DISPLAY_SIZE = GRID_SIZE * RENDER_SCALE
DEFAULT_MAX_STEPS = 2_000
DEFAULT_MAX_INVALID_RETRIES = 15
EMPTY_GUIDE_MODEL = "No reliable model yet."
COMPACT_RESTORE_MARKER = Path("compact_restore.pending")
COMPACT_GUIDE_SNAPSHOT = Path("compact_guide.snapshot")
COMPACT_CHECKPOINT_MARKER = Path("compact_checkpoint.requested")
COMPACT_CHECKPOINT_READY = Path("compact_checkpoint.ready")
RETRY_BOUNDARY_MARKER = Path("retry_boundary.pending")
WORKING_MEMORY_FILE = Path("WORKING.md")
INFRASTRUCTURE_TERMINATION_REASONS = frozenset(
    {
        "compact_recovery_failed",
        "controller_error",
        "environment_response_missing",
        "retry_boundary_interrupt_failed",
        "visual_transport_failed",
    }
)
ACTION_COMMENTARY_INSTRUCTION = (
    "Before each `play` call, briefly state what you expect to happen visibly."
)
CHANGE_COMMENTARY_INSTRUCTION = (
    "Before each `play` call, briefly state the relevant visual change after the "
    "previous action when applicable, and what you expect to happen visibly from "
    "the action you are taking now."
)


def build_initial_prompt(metadata: dict[str, Any]) -> str:
    return "\n".join(
        [
            "Current observation:",
            json.dumps(metadata, separators=(",", ":")),
            "",
            TASK_OBJECTIVE,
        ]
    )


def write_guide(path: Path, *, current_model: str) -> None:
    path.write_text(
        (current_model.strip() or EMPTY_GUIDE_MODEL) + "\n",
        encoding="utf-8",
    )


def write_player_agents(
    source: Path,
    destination: Path,
    *,
    describe_changes: bool,
) -> None:
    text = source.read_text(encoding="utf-8")
    if describe_changes:
        if ACTION_COMMENTARY_INSTRUCTION not in text:
            raise RuntimeError("AGENTS.md is missing the action commentary instruction")
        text = text.replace(
            ACTION_COMMENTARY_INSTRUCTION,
            CHANGE_COMMENTARY_INSTRUCTION,
            1,
        )
    destination.write_text(text, encoding="utf-8")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--game-id", required=True)
    parser.add_argument(
        "--runs-dir",
        type=Path,
        default=Path("runs"),
        help="Run output directory (default: ./runs in the current working directory)",
    )
    parser.add_argument("--max-steps", type=int, default=DEFAULT_MAX_STEPS)
    parser.add_argument(
        "--operation-mode", choices=["online", "offline"], default="online"
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_CLAUDE_MODEL,
        help="Claude model alias or full model ID",
    )
    parser.add_argument(
        "--effort",
        choices=CLAUDE_EFFORT_LEVELS,
        default=DEFAULT_CLAUDE_EFFORT,
        help="Claude adaptive reasoning effort",
    )
    parser.add_argument("--timeout", type=int, default=300)
    parser.add_argument(
        "--max-invalid-retries",
        type=int,
        default=DEFAULT_MAX_INVALID_RETRIES,
    )
    parser.set_defaults(
        observation_mode="vision",
        describe_changes=False,
        render_grid=DEFAULT_RENDER_GRID,
    )
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    load_run_environment()
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.operation_mode != "offline" and not os.getenv("ARC_API_KEY"):
        parser.error("ARC_API_KEY is not set. Put it in .env or export it.")
    if not os.getenv("CLAUDE_CODE_OAUTH_TOKEN"):
        parser.error(
            "CLAUDE_CODE_OAUTH_TOKEN is not set. Run `claude setup-token` and export it."
        )
    if args.max_steps < 1:
        parser.error("--max-steps must be >= 1")
    if args.timeout < 1:
        parser.error("--timeout must be >= 1")
    if args.max_invalid_retries < 0:
        parser.error("--max-invalid-retries must be >= 0")

    outcome = run_game(args)
    print(f"Run directory: {outcome.run_dir}")
    print(f"Scorecard id: {outcome.scorecard_id}")
    print(f"Claude session id: {outcome.session_id}")
    if outcome.failure is not None:
        report_run_failure(outcome.run_dir, "claude")
        raise outcome.failure
    return 0


def run_game(
    args: argparse.Namespace,
    *,
    shared_arc: Arcade | None = None,
    shared_scorecard_id: str | None = None,
    preflight_model_id: str | None = None,
    oauth_token: str | None = None,
    credential_lease: ClaudeCredentialLease | None = None,
    run_dir: Path | None = None,
    environment_factory: Any | None = None,
) -> GameRunOutcome:
    if (shared_arc is None) != (shared_scorecard_id is None):
        raise ValueError("shared_arc and shared_scorecard_id must be provided together")
    if preflight_model_id is not None and shared_arc is None:
        raise ValueError(
            "preflight_model_id requires a coordinator-owned Arcade and scorecard"
        )

    args = argparse.Namespace(**vars(args))
    if credential_lease is not None:
        if oauth_token is not None and oauth_token != credential_lease.oauth_token:
            raise ValueError("Claude credential lease and OAuth token do not match")
        oauth_token = credential_lease.oauth_token
    if run_dir is None:
        run_dir = create_run_dir(getattr(args, "runs_dir", Path("runs")))
    else:
        run_dir = run_dir.expanduser().resolve()
        run_dir.mkdir(parents=True, exist_ok=False)
    private_dir = run_dir / "private"
    visible_dir = run_dir / "player"
    frames_dir = visible_dir / "screenshots"
    io_dir = private_dir / "claude_io"
    config_dir = private_dir / "claude_config"
    recordings_dir = private_dir / "recordings"
    for directory in (
        private_dir,
        visible_dir,
        frames_dir,
        io_dir,
        recordings_dir,
    ):
        directory.mkdir(parents=True, exist_ok=True)
    private_dir.chmod(0o700)
    prepare_claude_config(config_dir)

    write_player_agents(
        Path(__file__).with_name("prompt.md"),
        visible_dir / "AGENTS.md",
        describe_changes=args.describe_changes,
    )
    write_guide(visible_dir / "GUIDE.md", current_model=EMPTY_GUIDE_MODEL)
    manifest = base_manifest(args, run_dir, shared_scorecard_id)
    write_json(run_dir / "manifest.json", manifest)

    arc: Arcade | None = shared_arc
    scorecard_id: str | None = shared_scorecard_id
    owns_scorecard = shared_arc is None
    env: Any | None = None
    controller: GameController | None = None
    result: ClaudeResult | None = None
    results: list[ClaudeResult] = []
    concrete_model_id: str | None = None
    failure: BaseException | None = None

    try:
        claude_bin = validate_claude_runtime(
            default_claude_bin(),
            oauth_token=oauth_token,
        )
        if preflight_model_id is None:
            _, concrete_model_id = run_runtime_preflight(
                visible_dir=visible_dir,
                config_dir=config_dir / "preflight",
                io_dir=io_dir / "preflight",
                claude_bin=claude_bin,
                model=args.model,
                effort=args.effort,
                timeout=args.timeout,
                oauth_token=oauth_token,
            )
        else:
            concrete_model_id = preflight_model_id
        manifest["resolved_model_id"] = concrete_model_id
        manifest["resolved_model_ids"] = [concrete_model_id]
        write_json(run_dir / "manifest.json", manifest)
        if arc is None:
            os.environ["OPERATION_MODE"] = args.operation_mode
            arc = Arcade(
                operation_mode=OperationMode(args.operation_mode),
                recordings_dir=str(recordings_dir),
            )
            configure_arc_http(arc)
            if not arc.get_environments():
                raise RuntimeError(
                    "No environments were fetched. Check network, credentials, and endpoint settings."
                )
        if scorecard_id is None:
            scorecard_id = open_evaluation_scorecard(arc)
            manifest["scorecard_id"] = scorecard_id
            write_json(run_dir / "manifest.json", manifest)

        if environment_factory is None:
            env = arc.make(
                args.game_id,
                scorecard_id=scorecard_id,
                save_recording=True,
                include_frame_data=True,
            )
            configure_arc_http(env)
        else:
            env = environment_factory(args.game_id, scorecard_id, recordings_dir)
        if env is None:
            raise RuntimeError(f"Failed to make environment {args.game_id!r}")
        share_online_cookie_jar(arc, env)
        write_json(run_dir / "manifest.json", manifest)
        observation = env.observation_space
        if observation is None:
            raise RuntimeError("Environment did not provide an initial observation")

        controller = GameController(
            env=env,
            initial_observation=observation,
            private_dir=private_dir,
            frames_dir=frames_dir,
            max_steps=args.max_steps,
            max_invalid_retries=args.max_invalid_retries,
            observation_mode=args.observation_mode,
            render_scale=RENDER_SCALE,
            render_grid=args.render_grid,
            compact_restore_marker=io_dir / COMPACT_RESTORE_MARKER,
            compact_guide_snapshot=io_dir / COMPACT_GUIDE_SNAPSHOT,
            compact_checkpoint_marker=io_dir / COMPACT_CHECKPOINT_MARKER,
            compact_checkpoint_ready=io_dir / COMPACT_CHECKPOINT_READY,
            retry_boundary_marker=private_dir / RETRY_BOUNDARY_MARKER,
            reset_starts_fresh_session=False,
            working_path=visible_dir / WORKING_MEMORY_FILE,
            guide_path=visible_dir / "GUIDE.md",
            agent_name="claude-code",
            interface_name="native-mcp-tool-loop",
        )
        maximum_calls = args.max_steps * (args.max_invalid_retries + 1) + 1
        runner = ClaudeCodeRunner(
            visible_dir=visible_dir,
            claude_config_dir=config_dir,
            io_dir=io_dir,
            controller=controller,
            claude_bin=claude_bin,
            model=args.model,
            effort=args.effort,
            expected_model_id=concrete_model_id,
            oauth_token=oauth_token,
            task_timeout=bounded_task_timeout(args.timeout, maximum_calls),
            display_size=DISPLAY_SIZE,
            rate_limit_observer=(
                credential_lease.observe_rate_limit
                if credential_lease is not None
                else None
            ),
            credential_yield_requested=(
                credential_lease.should_yield if credential_lease is not None else None
            ),
        )
        run_task_with_native_context(
            runner=runner,
            controller=controller,
            prompt=build_initial_prompt(controller.initial_metadata()),
            results=results,
            credential_relay=(
                credential_lease.relay if credential_lease is not None else None
            ),
            credential_relay_needed=(
                credential_lease.should_yield if credential_lease is not None else None
            ),
        )
        result = results[-1]
        manifest["claude"] = result_to_manifest(result)
        manifest["claude_segments"] = [
            result_to_manifest(segment) for segment in results
        ]
        manifest["resolved_model_ids"] = sorted(
            {concrete_model_id}
            | {model for segment in results for model in segment.resolved_models}
        )
        if result.returncode != 0 and not controller.terminal:
            raise RuntimeError(
                f"Claude task failed with exit code {result.returncode}; "
                f"stderr: {result.stderr_path}"
            )
        if controller.termination_reason in INFRASTRUCTURE_TERMINATION_REASONS:
            raise RuntimeError(
                "Game stopped after an infrastructure failure: "
                f"{controller.termination_reason}"
            )
        if not controller.terminal:
            controller.forced_termination_reason = "agent_stopped_early"
            raise RuntimeError("Claude stopped before the game or action budget ended")
    except BaseException as exc:
        if result is None and results:
            result = results[-1]
            manifest["claude"] = result_to_manifest(result)
            manifest["claude_segments"] = [
                result_to_manifest(segment) for segment in results
            ]
            manifest["resolved_model_ids"] = sorted(
                ({concrete_model_id} if concrete_model_id is not None else set())
                | {model for segment in results for model in segment.resolved_models}
            )
        failure = exc
    finally:
        if owns_scorecard and arc is not None and scorecard_id is not None:
            scorecard_result, scorecard_failure = finalize_scorecard(
                arc=arc,
                env=env,
                scorecard_id=scorecard_id,
                operation_mode=args.operation_mode,
            )
            manifest.update(scorecard_result)
            if scorecard_failure is not None and failure is None:
                failure = scorecard_failure
        elif arc is not None and scorecard_id is not None:
            manifest["scorecard_closed"] = False
            manifest["scorecard_finalization"] = "managed_by_competition_coordinator"
        else:
            manifest["scorecard_closed"] = False

        manifest["finished_at"] = utc_now()
        manifest["steps_attempted"] = controller.step_index if controller else 0
        manifest["action_attempts"] = controller.total_attempts if controller else 0
        manifest["terminal"] = controller.terminal if controller else False
        manifest["termination_reason"] = (
            controller.termination_reason if controller else "setup_failed"
        )
        if result is not None:
            manifest["session_segments"] = len(results)
        if failure is not None:
            manifest["error"] = type(failure).__name__
            (private_dir / "error.txt").write_text(
                f"{type(failure).__name__}: {failure}\n",
                encoding="utf-8",
            )
        write_json(run_dir / "manifest.json", manifest)

    return GameRunOutcome(
        run_dir=run_dir,
        scorecard_id=scorecard_id,
        session_id=result.session_id if result else None,
        failure=failure,
    )


def run_runtime_preflight(
    *,
    visible_dir: Path,
    config_dir: Path,
    io_dir: Path,
    claude_bin: Path,
    model: str,
    effort: str,
    timeout: int,
    oauth_token: str | None = None,
    rate_limit_observer: Callable[[ClaudeRateLimitEvent], None] | None = None,
) -> tuple[ClaudeResult, str]:
    runner = ClaudeCodeRunner(
        visible_dir=visible_dir,
        claude_config_dir=config_dir,
        io_dir=io_dir,
        controller=ClaudePreflightController(),
        claude_bin=claude_bin,
        model=model,
        effort=effort,
        oauth_token=oauth_token,
        task_timeout=max(60, timeout),
        display_size=DISPLAY_SIZE,
        rate_limit_observer=rate_limit_observer,
    )
    result = runner.run_task(RUNTIME_PREFLIGHT_PROMPT)
    if result.returncode != 0:
        raise RuntimeError(
            f"Claude runtime preflight failed; stderr: {result.stderr_path}"
        )
    validate_instruction_envelope(result.init_envelope, display_size=DISPLAY_SIZE)
    concrete_model_id = resolved_model_id(result)
    if result.final_message.strip() != "READY":
        raise RuntimeError("Claude runtime preflight returned an unexpected result.")
    return result, concrete_model_id


def base_manifest(
    args: argparse.Namespace,
    run_dir: Path,
    scorecard_id: str | None,
) -> dict[str, Any]:
    return {
        "created_at": utc_now(),
        "arc_agi_version": getattr(arc_agi, "__version__", None),
        "game_id": args.game_id,
        "operation_mode": args.operation_mode,
        "scorecard_id": scorecard_id,
        "runtime": "claude",
        "requested_model": args.model,
        "reasoning_effort": args.effort,
        "resolved_model_ids": [],
        "describe_visual_changes": args.describe_changes,
        "observation_mode": args.observation_mode,
        "render_grid": args.render_grid,
        "max_steps": args.max_steps,
        "max_invalid_retries": args.max_invalid_retries,
        "claude_code_version": _safe_claude_version(),
    }


def result_to_manifest(result: ClaudeResult) -> dict[str, Any]:
    usage = None
    if result.usage is not None:
        usage = {
            "input_tokens": result.usage.input_tokens,
            "output_tokens": result.usage.output_tokens,
            "cache_creation_input_tokens": result.usage.cache_creation_input_tokens,
            "cache_read_input_tokens": result.usage.cache_read_input_tokens,
            "cost_usd": result.usage.cost_usd,
            "num_turns": result.usage.num_turns,
        }
    return {
        "segment": result.segment,
        "returncode": result.returncode,
        "api_error_status": result.api_error_status,
        "resolved_models": list(result.resolved_models),
        "usage": usage,
    }


def _safe_claude_version() -> str | None:
    try:
        return claude_version(default_claude_bin())
    except Exception:
        return None


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/benchmarks/arc3/claude/prompt.md

````text
# Visual game task

Complete the game with as few game actions as possible.

Build and use a compact, revisable model of the game and its current state. Update it as new evidence changes what is supported.

Before each `play`, briefly state what you expect to see. Afterward, briefly state all visible changes, expected or not.

Keep concise, durable, revisable game understanding in `GUIDE.md`; use `WORKING.md` as a scratchpad when useful.

````


## vista-c97c354/src/vista/benchmarks/arc3/claude/recovery.py

````text
"""Provider-neutral task and recovery prompts."""

from __future__ import annotations

import json

from vista.core.session import CompactRecovery, RetryRecovery, RuntimeRecovery

TASK_OBJECTIVE = "Complete the game with as few game actions as possible."
RECOVERY_TASK_OBJECTIVE = "Continue the game with as few game actions as possible."


def compact_recovery_prompt(recovery: CompactRecovery) -> str:
    return _recovery_prompt(
        current_observation=recovery.current_observation,
        last_action_result=recovery.last_action_result,
        objective_history=recovery.objective_history,
        guide=recovery.guide,
        working_memory=recovery.working_memory,
    )


def retry_recovery_prompt(recovery: RetryRecovery) -> str:
    working_memory: object = recovery.working_memory
    if recovery.working_memory is not None:
        working_memory = {
            "saved_at": recovery.working_provenance,
            "content": recovery.working_memory,
        }
    return _recovery_prompt(
        current_observation=recovery.current_observation,
        last_action_result=recovery.last_action_result,
        objective_history=recovery.objective_history,
        guide=recovery.guide,
        working_memory=working_memory,
    )


def runtime_recovery_prompt(recovery: RuntimeRecovery) -> str:
    return "\n".join(
        [
            "The player runtime restarted without changing the game state.",
            "Environment record:",
            json.dumps(
                {
                    "current_observation": recovery.current_observation,
                    "last_action_result": recovery.last_action_result,
                },
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )


def native_compact_recovery_prompt(recovery: RuntimeRecovery) -> str:
    return "\n".join(
        [
            "Native context compaction completed without changing the game state.",
            "Current environment record:",
            json.dumps(
                {
                    "current_observation": recovery.current_observation,
                    "last_action_result": recovery.last_action_result,
                },
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )


def continuation_prompt(current_observation: dict[str, object]) -> str:
    return "\n".join(
        [
            "Current environment record:",
            json.dumps(
                current_observation,
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )


def fresh_runtime_recovery_prompt(recovery: RuntimeRecovery) -> str:
    working_memory: object = recovery.working_memory
    if recovery.working_memory is not None:
        working_memory = {
            "saved_at": recovery.working_provenance,
            "content": recovery.working_memory,
        }
    return _recovery_prompt(
        current_observation=recovery.current_observation,
        last_action_result=recovery.last_action_result,
        objective_history=recovery.objective_history,
        guide=recovery.guide,
        working_memory=working_memory,
    )


def fresh_continuation_prompt(recovery: RuntimeRecovery) -> str:
    working_memory: object = recovery.working_memory
    if recovery.working_memory is not None:
        working_memory = {
            "saved_at": recovery.working_provenance,
            "content": recovery.working_memory,
        }
    return "\n".join(
        [
            "A fresh player is continuing from the unchanged game state.",
            _recovery_prompt(
                current_observation=recovery.current_observation,
                last_action_result=recovery.last_action_result,
                objective_history=recovery.objective_history,
                guide=recovery.guide,
                working_memory=working_memory,
            ),
        ]
    )


def _recovery_prompt(
    *,
    current_observation: dict[str, object],
    last_action_result: dict[str, object] | None,
    objective_history: dict[str, object],
    guide: object,
    working_memory: object,
) -> str:
    return "\n".join(
        [
            "Environment record:",
            json.dumps(
                {
                    "current_observation": current_observation,
                    "last_action_result": last_action_result,
                    "current_level_history": objective_history,
                },
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            "Agent-authored notes:",
            json.dumps(
                {"guide": guide, "working_memory": working_memory},
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )

````


## vista-c97c354/src/vista/benchmarks/arc3/claude/runner.py

````text
"""ARC3 defaults for the shared Claude transport."""

from pathlib import Path
from typing import Any

from vista.backends.claude import runner as _runner

from .recovery import (
    compact_recovery_prompt,
    fresh_runtime_recovery_prompt,
    retry_recovery_prompt,
)
from .tools import build_tools

DEFAULT_PINNED_CLAUDE_BIN = _runner.DEFAULT_PINNED_CLAUDE_BIN


class ClaudeCodeRunner(_runner.ClaudeCodeRunner):
    def _default_tool_definitions(self) -> tuple[dict[str, Any], ...]:
        return build_tools(self.display_size, include_compact_checkpoint=False)

    def _mcp_tool_definitions(
        self,
    ) -> tuple[dict[str, Any], ...] | list[dict[str, Any]]:
        if self.tool_interface is not None:
            return super()._mcp_tool_definitions()
        return build_tools(
            self.display_size,
            include_compact_checkpoint=False,
            reset_requires_retry_state=self.controller.reset_starts_fresh_session,
        )

    def _default_recovery_prompt(self, kind: str, recovery: Any) -> str:
        return {
            "compact": compact_recovery_prompt,
            "retry": retry_recovery_prompt,
            "fresh_runtime": fresh_runtime_recovery_prompt,
        }[kind](recovery)


def default_claude_bin() -> Path:
    return _runner.default_claude_bin(fallback=DEFAULT_PINNED_CLAUDE_BIN)


def validate_instruction_envelope(
    envelope: dict[str, Any] | None,
    *,
    display_size: int,
    allow_slash_commands: bool = False,
    tool_definitions: list[dict[str, Any]] | None = None,
) -> None:
    _runner.validate_instruction_envelope(
        envelope,
        display_size=display_size,
        allow_slash_commands=allow_slash_commands,
        tool_definitions=tool_definitions
        if tool_definitions is not None
        else build_tools(display_size, include_compact_checkpoint=False),
    )


def __getattr__(name: str) -> Any:
    return getattr(_runner, name)


__all__ = [name for name in dir(_runner) if not name.startswith("_")]

````


## vista-c97c354/src/vista/benchmarks/arc3/claude/tools.py

````text
"""Public tool contracts for the visual game player."""

from __future__ import annotations

from typing import Any

from vista.core.tools import (
    DEFAULT_DISPLAY_SIZE as DEFAULT_DISPLAY_SIZE,
    MAX_GUIDE_CHARS as MAX_GUIDE_CHARS,
    MAX_INSPECTION_LABEL_CHARS as MAX_INSPECTION_LABEL_CHARS,
    MAX_INSPECTION_QUESTION_CHARS as MAX_INSPECTION_QUESTION_CHARS,
    MAX_INSPECTION_VIEWS as MAX_INSPECTION_VIEWS,
    MAX_PIXEL_READOUT_SAMPLES as MAX_PIXEL_READOUT_SAMPLES,
    MAX_PIXEL_READOUT_VIEWS as MAX_PIXEL_READOUT_VIEWS,
    MAX_WORKING_CHARS as MAX_WORKING_CHARS,
    READ_GUIDE_TOOL as READ_GUIDE_TOOL,
    SAVE_COMPACT_CHECKPOINT_TOOL as SAVE_COMPACT_CHECKPOINT_TOOL,
    WRITE_GUIDE_TOOL as WRITE_GUIDE_TOOL,
    _visual_region_schema as _visual_region_schema,
    build_inspect_tool as build_inspect_tool,
    build_read_pixels_tool as build_read_pixels_tool,
)

ACTION_NAMES = (
    "RESET",
    "ACTION1",
    "ACTION2",
    "ACTION3",
    "ACTION4",
    "ACTION5",
    "ACTION6",
    "ACTION7",
)


def build_action_schema(
    display_size: int = DEFAULT_DISPLAY_SIZE,
    *,
    reset_requires_retry_state: bool = False,
) -> dict[str, Any]:
    if type(display_size) is not int or display_size < 1:
        raise ValueError("display_size must be a positive integer")
    properties: dict[str, Any] = {
        "action": {"type": "string", "enum": list(ACTION_NAMES)},
        "x": {
            "type": ["integer", "null"],
            "minimum": 0,
            "maximum": display_size - 1,
        },
        "y": {
            "type": ["integer", "null"],
            "minimum": 0,
            "maximum": display_size - 1,
        },
    }
    if reset_requires_retry_state:
        properties["retry_state"] = {
            "type": "string",
            "minLength": 1,
            "maxLength": MAX_WORKING_CHARS,
            "description": (
                "For RESET, the smallest sufficient continuation state for "
                "the next attempt. It replaces WORKING.md."
            ),
        }
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["action"],
        "properties": properties,
    }


def build_play_tool(
    display_size: int = DEFAULT_DISPLAY_SIZE,
    *,
    reset_requires_retry_state: bool = False,
) -> dict[str, Any]:
    reset_handoff = (
        " For RESET, include the smallest sufficient continuation state for the "
        "next attempt in retry_state; it replaces WORKING.md."
        if reset_requires_retry_state
        else ""
    )
    return {
        "name": "play",
        "description": (
            "Execute exactly one game action. Each executed play call counts as one "
            "game action. The result contains the resulting "
            "final visual, the number of archived frames for the action, and the "
            "actions available afterward. The player observes this result before "
            "another action can execute. Use only currently available actions. RESET "
            "initializes or restarts the game or level. ACTION1 through ACTION4 are "
            "game-dependent simple actions usually associated with up, down, left, "
            "and right. ACTION5 is a game-dependent simple action, usually an "
            "interaction such as select, rotate, attach, detach, execute, etc. "
            "ACTION6 is a coordinate action. ACTION7 is Undo. UI bindings: "
            "ACTION1=W/Up Arrow, ACTION2=S/Down Arrow, ACTION3=A/Left Arrow, "
            "ACTION4=D/Right Arrow, ACTION5=Space/F, ACTION6=mouse click, and "
            "ACTION7=Ctrl/Cmd+Z. For ACTION6, always provide "
            f"x and y in the standard {display_size}x{display_size} coordinate system; "
            "x increases right and y increases down."
            f"{reset_handoff}"
        ),
        "inputSchema": build_action_schema(
            display_size,
            reset_requires_retry_state=reset_requires_retry_state,
        ),
        "annotations": {
            "readOnlyHint": False,
            "destructiveHint": False,
            "idempotentHint": False,
            "openWorldHint": False,
        },
    }


HISTORY_TOOL = {
    "name": "history",
    "description": (
        "Read objective action and environment-result records from this run without "
        "changing the game. `attempts` summarizes RESET-to-GAME_OVER attempts in "
        "the current level. `events` returns exact public action/result records by "
        "turn; use start_turn, end_turn, and limit to select a range."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["view"],
        "properties": {
            "view": {
                "type": "string",
                "enum": ["attempts", "events"],
            },
            "start_turn": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
            },
            "end_turn": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
            },
            "limit": {
                "type": "integer",
                "minimum": 1,
                "maximum": 128,
                "default": 64,
            },
        },
    },
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}

READ_WORKING_TOOL = {
    "name": "read_working",
    "description": "Read the agent-authored temporary state for the current level.",
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {},
    },
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}

WRITE_WORKING_TOOL = {
    "name": "write_working",
    "description": (
        "Replace the agent-authored temporary state for the current level. It "
        "persists across RESET and is cleared when level progress advances."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["content"],
        "properties": {
            "content": {
                "type": "string",
                "minLength": 1,
                "maxLength": MAX_WORKING_CHARS,
            }
        },
    },
    "annotations": {
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


def build_tools(
    display_size: int = DEFAULT_DISPLAY_SIZE,
    *,
    include_compact_checkpoint: bool = False,
    reset_requires_retry_state: bool = False,
) -> tuple[dict[str, Any], ...]:
    tools = (
        build_play_tool(
            display_size,
            reset_requires_retry_state=reset_requires_retry_state,
        ),
        build_inspect_tool(display_size),
        build_read_pixels_tool(display_size),
        HISTORY_TOOL,
        READ_GUIDE_TOOL,
        WRITE_GUIDE_TOOL,
        READ_WORKING_TOOL,
        WRITE_WORKING_TOOL,
    )
    if include_compact_checkpoint:
        return (*tools, SAVE_COMPACT_CHECKPOINT_TOOL)
    return tools

````


## vista-c97c354/src/vista/benchmarks/arc3/codex/__init__.py

````text
"""ARC3 codex bindings for the shared VISTA backend."""

````


## vista-c97c354/src/vista/benchmarks/arc3/codex/controller.py

````text
"""Private game controller for the sanitized player tools."""

from __future__ import annotations

import base64
import io
import json
import threading
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

from arcengine import GameAction, GameState
from PIL import Image

from vista.benchmarks.arc3.codex.tools import (
    ACTION_NAMES,
    MAX_GUIDE_CHARS,
    MAX_INSPECTION_LABEL_CHARS,
    MAX_INSPECTION_QUESTION_CHARS,
    MAX_INSPECTION_VIEWS,
    MAX_PIXEL_READOUT_SAMPLES,
    MAX_PIXEL_READOUT_VIEWS,
    MAX_WORKING_CHARS,
)
from vista.benchmarks.arc3.render import save_frame_png
from vista.core.session import (
    CompactRecovery,
    RetryRecovery,
    RuntimeRecovery,
    SessionController,
)

DISPLAY_SIZE = 1024
GRID_SIZE = 64
ACTION_BY_NAME = {
    "RESET": GameAction.RESET,
    "ACTION1": GameAction.ACTION1,
    "ACTION2": GameAction.ACTION2,
    "ACTION3": GameAction.ACTION3,
    "ACTION4": GameAction.ACTION4,
    "ACTION5": GameAction.ACTION5,
    "ACTION6": GameAction.ACTION6,
    "ACTION7": GameAction.ACTION7,
}
NAME_BY_ACTION = {action: name for name, action in ACTION_BY_NAME.items()}
PIXEL_READOUT_SYMBOLS = (
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
)


@dataclass(frozen=True)
class ToolActionValidation:
    ok: bool
    action: GameAction | None = None
    data: dict[str, int] | None = None
    parsed: dict[str, Any] | None = None
    retry_state: str | None = None
    error: str | None = None


def available_action_names(actions: Iterable[GameAction]) -> list[str]:
    available = {
        NAME_BY_ACTION[action] for action in actions if action in NAME_BY_ACTION
    }
    return [name for name in ACTION_NAMES if name in available]


def validate_tool_action(
    arguments: object,
    legal_actions: Iterable[GameAction],
    display_size: int = DISPLAY_SIZE,
    *,
    reset_requires_retry_state: bool = True,
) -> ToolActionValidation:
    if type(display_size) is not int or display_size < 1:
        raise ValueError("display_size must be a positive integer")
    if not isinstance(arguments, dict):
        return ToolActionValidation(ok=False, error="Tool arguments must be an object.")
    allowed_arguments = {"action", "x", "y"}
    if reset_requires_retry_state:
        allowed_arguments.add("retry_state")
    if set(arguments) - allowed_arguments:
        return ToolActionValidation(ok=False, error="Unexpected tool argument.")
    action_name = arguments.get("action")
    if not isinstance(action_name, str) or action_name not in ACTION_BY_NAME:
        return ToolActionValidation(ok=False, error="Unknown action.")
    action = ACTION_BY_NAME[action_name]
    legal = set(legal_actions)
    if action not in legal:
        return ToolActionValidation(
            ok=False,
            error=f"{action_name} is not currently available.",
        )

    x = arguments.get("x")
    y = arguments.get("y")
    retry_state = arguments.get("retry_state")
    if action == GameAction.RESET:
        if x is not None or y is not None:
            return ToolActionValidation(
                ok=False,
                error="x and y are only used with ACTION6.",
            )
        if reset_requires_retry_state:
            if (
                not isinstance(retry_state, str)
                or not retry_state.strip()
                or len(retry_state) > MAX_WORKING_CHARS
            ):
                return ToolActionValidation(
                    ok=False,
                    error=(
                        "RESET requires retry_state containing the continuation "
                        "state for the next attempt."
                    ),
                )
            retry_state = retry_state.strip()
        return ToolActionValidation(
            ok=True,
            action=action,
            data=None,
            parsed={
                "action": action_name,
                "x": None,
                "y": None,
            },
            retry_state=retry_state,
        )

    if "retry_state" in arguments:
        return ToolActionValidation(
            ok=False,
            error="retry_state is only used with RESET.",
        )

    if action == GameAction.ACTION6:
        if type(x) is not int or type(y) is not int:
            return ToolActionValidation(
                ok=False, error="ACTION6 requires integer x and y."
            )
        if not (0 <= x < display_size and 0 <= y < display_size):
            return ToolActionValidation(
                ok=False,
                error=f"ACTION6 coordinates must be in 0..{display_size - 1}.",
            )
        environment_x = min(GRID_SIZE - 1, x * GRID_SIZE // display_size)
        environment_y = min(GRID_SIZE - 1, y * GRID_SIZE // display_size)
        return ToolActionValidation(
            ok=True,
            action=action,
            data={"x": environment_x, "y": environment_y},
            parsed={
                "action": action_name,
                "x": x,
                "y": y,
                "environment_x": environment_x,
                "environment_y": environment_y,
            },
        )

    if x is not None or y is not None:
        return ToolActionValidation(
            ok=False,
            error="x and y are only used with ACTION6.",
        )
    return ToolActionValidation(
        ok=True,
        action=action,
        data=None,
        parsed={
            "action": action_name,
            "x": None,
            "y": None,
        },
    )


class GameController(SessionController):
    def _atomic_write_text(self, path: Path, content: str, *, mode: int) -> None:
        atomic_write_text(path, content, mode=mode)

    def __init__(
        self,
        *,
        env: Any,
        initial_observation: Any,
        private_dir: Path,
        frames_dir: Path,
        max_steps: int,
        max_invalid_retries: int,
        observation_mode: str,
        render_scale: int,
        render_grid: bool = False,
        compact_restore_marker: Path | None = None,
        compact_guide_snapshot: Path | None = None,
        compact_checkpoint_marker: Path | None = None,
        compact_checkpoint_ready: Path | None = None,
        retry_boundary_marker: Path | None = None,
        reset_starts_fresh_session: bool = True,
        working_path: Path | None = None,
        guide_path: Path | None = None,
    ) -> None:
        self.env = env
        self.obs = initial_observation
        self.private_dir = private_dir
        self.frames_dir = frames_dir
        self.max_steps = max_steps
        self.max_invalid_retries = max_invalid_retries
        self.observation_mode = observation_mode
        self.render_scale = render_scale
        if type(render_scale) is not int or render_scale < 1:
            raise ValueError("render_scale must be a positive integer")
        self.display_size = GRID_SIZE * render_scale
        self.render_grid = render_grid
        self.compact_restore_marker = compact_restore_marker
        self.compact_guide_snapshot = compact_guide_snapshot
        self.compact_checkpoint_marker = compact_checkpoint_marker
        self.compact_checkpoint_ready = compact_checkpoint_ready
        self.retry_boundary_marker = retry_boundary_marker
        self.reset_starts_fresh_session = reset_starts_fresh_session
        self.working_path = working_path
        self.guide_path = guide_path
        self.working_provenance_path = private_dir / "working_memory_provenance.json"
        self.working_archive_dir = private_dir / "working_memory_archive"
        self.retry_state_staging_path = private_dir / "retry_state.pending"
        self.action_log_path = private_dir / "action_log.jsonl"
        self.error_log_path = private_dir / "controller_errors.jsonl"
        self.recovery_log_path = private_dir / "compact_recovery.jsonl"
        self.step_index = 0
        self.attempt_index = 0
        self.total_attempts = 0
        self._events: list[dict[str, Any]] = []
        self._pixel_readout_symbol_by_color: dict[tuple[int, int, int], str] = {}
        self._level_start_turn = 0
        self._retry_boundary_step: int | None = None
        self.forced_termination_reason: str | None = None
        self._current_images: list[Path] = []
        self._lock = threading.Lock()
        self._store_observation()

    @property
    def terminal(self) -> bool:
        return (
            self.forced_termination_reason is not None
            or self.obs is None
            or self.obs.state == GameState.WIN
        )

    @property
    def termination_reason(self) -> str | None:
        if self.forced_termination_reason:
            return self.forced_termination_reason
        if self.obs is None:
            return "environment_ended"
        if self.obs.state == GameState.WIN:
            return state_name(self.obs.state)
        return None

    def _available_actions(self) -> list[GameAction]:
        if self.obs is not None and self.obs.state == GameState.GAME_OVER:
            return [GameAction.RESET]
        return list(self.env.action_space)

    @property
    def retry_boundary_pending(self) -> bool:
        return self._retry_boundary_step is not None

    @property
    def retry_boundary_step(self) -> int | None:
        return self._retry_boundary_step

    def handle(self, request: dict[str, Any]) -> dict[str, Any]:
        with self._lock:
            method = request.get("method")
            if self.retry_boundary_pending:
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Retry recovery has not been delivered yet.",
                    include_image=False,
                )
            if method == "inspect":
                return self._inspect(request.get("arguments"))
            if method == "read_pixels":
                return self._read_pixels(request.get("arguments"))
            if method == "history":
                return self._history(request.get("arguments"))
            if method == "save_compact_checkpoint":
                return self._save_compact_checkpoint(request.get("arguments"))
            if method != "play":
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Unknown controller method.",
                    include_image=False,
                )
            if self.terminal:
                return self._response(
                    ok=True,
                    action_applied=False,
                    include_image=False,
                )
            if (
                self.compact_restore_marker is not None
                and self.compact_restore_marker.exists()
            ):
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Compact recovery has not been delivered yet.",
                    include_image=False,
                )

            if (
                self.compact_checkpoint_marker is not None
                and self.compact_checkpoint_marker.exists()
            ):
                return self._response(
                    ok=False,
                    action_applied=False,
                    error="Save the compact checkpoint before playing.",
                    include_image=False,
                )

            arguments = request.get("arguments")
            retry = self.attempt_index
            self.total_attempts += 1
            validation = validate_tool_action(
                arguments,
                self._available_actions(),
                display_size=self.display_size,
                reset_requires_retry_state=self.reset_starts_fresh_session,
            )
            log_entry: dict[str, Any] = {
                "protocol": "app-server-tool-loop",
                "step": self.step_index,
                "retry": retry,
                "tool_call_id": request.get("request_id"),
                "requested": arguments,
                "validation": validation_to_log(validation),
            }
            if not validation.ok:
                self.attempt_index += 1
                if retry >= self.max_invalid_retries:
                    self.attempt_index = 0
                    log_entry["recovery_boundary"] = "invalid_action_limit"
                    append_jsonl(self.action_log_path, log_entry)
                    return self._response(
                        ok=False,
                        action_applied=False,
                        error=validation.error,
                        include_image=False,
                        invalid_action_limit=True,
                    )
                append_jsonl(self.action_log_path, log_entry)
                return self._response(
                    ok=False,
                    action_applied=False,
                    error=validation.error,
                    include_image=False,
                )

            assert validation.action is not None
            assert validation.parsed is not None
            current_step = self.step_index
            previous_levels_completed = getattr(self.obs, "levels_completed", None)
            try:
                if validation.action == GameAction.RESET:
                    retry_provenance = (
                        self._stage_retry_state(validation.retry_state)
                        if validation.retry_state is not None
                        else None
                    )
                    next_observation = self.env.reset()
                else:
                    retry_provenance = None
                    next_observation = self.env.step(
                        validation.action,
                        data=validation.data,
                    )
                if next_observation is None:
                    self.forced_termination_reason = "environment_response_missing"
                    raise RuntimeError(
                        "The environment returned no observation; remote state is unknown."
                    )
                self.obs = next_observation
                self.step_index += 1
                if retry_provenance is not None:
                    self._commit_retry_state(retry_provenance)
                self.attempt_index = 0
                if self.obs is not None:
                    self._store_observation()
                else:
                    self._current_images = []
                if self.step_index >= self.max_steps and not self.terminal:
                    self.forced_termination_reason = "action_budget_exhausted"
                level_boundary = self._crossed_level_boundary(previous_levels_completed)
                if level_boundary:
                    self._level_start_turn = self.step_index
                    self._archive_level_working(previous_levels_completed)
                reset_applied = validation.action == GameAction.RESET
                retry_boundary = reset_applied and self.reset_starts_fresh_session
                if retry_boundary:
                    self._mark_retry_boundary()
                    if not self.terminal:
                        self._retry_boundary_step = self.step_index
                result_metadata = self._metadata(
                    action_applied=True,
                    level_boundary=level_boundary,
                    retry_boundary=retry_boundary,
                )
                log_entry["result"] = result_metadata
                self._events.append(
                    self._public_event(
                        step=current_step,
                        parsed_action=validation.parsed,
                        result=result_metadata,
                    )
                )
                append_jsonl(self.action_log_path, log_entry)
            except Exception as exc:
                self.retry_state_staging_path.unlink(missing_ok=True)
                error = {
                    "step": current_step,
                    "error_type": type(exc).__name__,
                    "error": str(exc),
                }
                append_jsonl(self.error_log_path, error)
                log_entry["controller_error"] = error
                append_jsonl(self.action_log_path, log_entry)
                if self.forced_termination_reason is None:
                    self.forced_termination_reason = "controller_error"
                raise
            return self._response(
                ok=True,
                action_applied=True,
                include_image=True,
                level_boundary=level_boundary,
                retry_boundary=retry_boundary,
            )

    def _crossed_level_boundary(self, previous_completed: object) -> bool:
        if self.terminal or self.obs is None:
            return False
        current_completed = getattr(self.obs, "levels_completed", None)
        return (
            type(previous_completed) is int
            and type(current_completed) is int
            and current_completed > previous_completed
        )

    def _archive_level_working(self, previous_completed: object) -> None:
        if self.working_path is None or not self.working_path.is_file():
            if self.working_provenance_path.exists():
                self.working_provenance_path.unlink()
            return
        working = self.working_path.read_text(encoding="utf-8", errors="replace")
        if not working.strip():
            self._clear_working()
            return
        provenance = self._read_working_provenance()
        current_completed = getattr(self.obs, "levels_completed", None)
        total = getattr(self.obs, "win_levels", None)
        archive = {
            "boundary_turn": self.step_index,
            "saved_at": provenance,
            "previous_progress": {
                "completed": (
                    previous_completed if type(previous_completed) is int else None
                ),
                "total": total if type(total) is int else None,
            },
            "current_progress": {
                "completed": (
                    current_completed if type(current_completed) is int else None
                ),
                "total": total if type(total) is int else None,
            },
        }
        self.working_archive_dir.mkdir(parents=True, exist_ok=True)
        archive_stem = f"turn_{self.step_index:06d}"
        atomic_write_text(
            self.working_archive_dir / f"{archive_stem}.md",
            working,
            mode=0o600,
        )
        atomic_write_text(
            self.working_archive_dir / f"{archive_stem}.json",
            json.dumps(archive, separators=(",", ":"), sort_keys=True) + "\n",
            mode=0o600,
        )
        append_jsonl(
            self.recovery_log_path,
            {
                "step": self.step_index,
                "action_applied": False,
                "event": "level_working_archived",
                "boundary_turn": self.step_index,
                "working_chars": len(working.strip()),
            },
        )
        self._clear_working()

    def _stage_retry_state(self, retry_state: str) -> dict[str, Any]:
        if self.working_path is None:
            raise RuntimeError("RESET continuation storage is unavailable.")
        metadata = self._metadata(action_applied=False)
        history = self._attempt_history()
        attempts = history["attempts"]
        provenance = {
            "source": "reset_handoff",
            "turn": self.step_index,
            "attempt": attempts[-1]["attempt"] if attempts else 1,
            "state": metadata["state"],
            "progress": metadata["progress"],
            "level_start_turn": self._level_start_turn,
        }
        atomic_write_text(
            self.retry_state_staging_path,
            retry_state.strip() + "\n",
            mode=0o600,
        )
        return provenance

    def _commit_retry_state(self, provenance: dict[str, Any]) -> None:
        if self.working_path is None or not self.retry_state_staging_path.is_file():
            raise RuntimeError("RESET continuation state is unavailable.")
        self.working_path.parent.mkdir(parents=True, exist_ok=True)
        self.retry_state_staging_path.replace(self.working_path)
        provenance = {**provenance, "reset_turn": self.step_index}
        atomic_write_text(
            self.working_provenance_path,
            json.dumps(provenance, separators=(",", ":"), sort_keys=True) + "\n",
            mode=0o600,
        )

    def _record_working_provenance(self) -> dict[str, Any]:
        metadata = self._metadata(action_applied=False)
        provenance = {
            "turn": self.step_index,
            "state": metadata["state"],
            "progress": metadata["progress"],
            "level_start_turn": self._level_start_turn,
        }
        atomic_write_text(
            self.working_provenance_path,
            json.dumps(provenance, separators=(",", ":"), sort_keys=True) + "\n",
            mode=0o600,
        )
        return provenance

    @staticmethod
    def _public_event(
        *,
        step: int,
        parsed_action: dict[str, Any],
        result: dict[str, Any],
    ) -> dict[str, Any]:
        action = {"action": parsed_action["action"]}
        if parsed_action["action"] == "ACTION6":
            action["x"] = parsed_action["x"]
            action["y"] = parsed_action["y"]
        public_result = {key: value for key, value in result.items() if key != "grid"}
        return {
            "step": step,
            "turn": result["turn"],
            "action": action,
            "result": public_result,
        }

    def _history(self, arguments: object) -> dict[str, Any]:
        if not isinstance(arguments, dict) or set(arguments) - {
            "view",
            "start_turn",
            "end_turn",
            "limit",
        }:
            return {"ok": False, "metadata": {"error": "Invalid arguments."}}
        view = arguments.get("view")
        if view not in {"attempts", "events"}:
            return {"ok": False, "metadata": {"error": "Invalid history view."}}
        limit = arguments.get("limit", 64)
        if type(limit) is not int or not 1 <= limit <= 128:
            return {"ok": False, "metadata": {"error": "Invalid history limit."}}

        if view == "attempts":
            if set(arguments) - {"view", "limit"}:
                return {
                    "ok": False,
                    "metadata": {
                        "error": ("start_turn and end_turn are only valid for events.")
                    },
                }
            history = self._attempt_history()
            attempts = history["attempts"]
            history["attempts"] = attempts[-limit:]
            history["total_attempts"] = len(attempts)
            history["truncated"] = len(attempts) > limit
            return {"ok": True, "metadata": history}

        start_turn = arguments.get("start_turn")
        end_turn = arguments.get("end_turn")
        if start_turn is not None and (
            type(start_turn) is not int or not 0 <= start_turn <= 999999
        ):
            return {"ok": False, "metadata": {"error": "Invalid start_turn."}}
        if end_turn is not None and (
            type(end_turn) is not int or not 0 <= end_turn <= 999999
        ):
            return {"ok": False, "metadata": {"error": "Invalid end_turn."}}
        if (
            isinstance(start_turn, int)
            and isinstance(end_turn, int)
            and start_turn > end_turn
        ):
            return {
                "ok": False,
                "metadata": {"error": "start_turn must not exceed end_turn."},
            }

        matching = [
            event
            for event in self._events
            if (start_turn is None or event["turn"] >= start_turn)
            and (end_turn is None or event["turn"] <= end_turn)
        ]
        if start_turn is None and end_turn is None:
            selected = matching[-limit:]
        else:
            selected = matching[:limit]
        turns = [event["turn"] for event in self._events]
        return {
            "ok": True,
            "metadata": {
                "view": "events",
                "source": "environment action results",
                "events": selected,
                "available_turn_range": ([turns[0], turns[-1]] if turns else None),
                "total_matching": len(matching),
                "truncated": len(matching) > len(selected),
            },
        }

    def _attempt_history(self) -> dict[str, Any]:
        events = [
            event for event in self._events if event["turn"] > self._level_start_turn
        ]
        attempts: list[dict[str, Any]] = []
        attempt_number = 1
        start_kind = "level_entry"
        start_turn = self._level_start_turn
        game_actions = 0

        for event in events:
            action = event["action"]["action"]
            result = event["result"]
            if action == "RESET":
                attempt_number += 1
                start_kind = "reset"
                start_turn = event["turn"]
                game_actions = 0
                continue
            game_actions += 1
            if result["state"] in {"GAME_OVER", "WIN", "TERMINAL"}:
                attempts.append(
                    {
                        "attempt": attempt_number,
                        "start": start_kind,
                        "start_turn": start_turn,
                        "outcome": result["state"],
                        "game_actions": game_actions,
                        "end_turn": event["turn"],
                    }
                )

        current_state = "TERMINAL" if self.obs is None else state_name(self.obs.state)
        if current_state not in {"GAME_OVER", "WIN", "TERMINAL"}:
            attempts.append(
                {
                    "attempt": attempt_number,
                    "start": start_kind,
                    "start_turn": start_turn,
                    "outcome": current_state,
                    "game_actions": game_actions,
                    "end_turn": self.step_index,
                }
            )
        return {
            "view": "attempts",
            "source": "environment action results",
            "level_start_turn": self._level_start_turn,
            "progress": self._metadata(action_applied=False)["progress"],
            "attempts": attempts,
        }

    def _store_observation(self) -> None:
        save_private_observation(self.private_dir, self.step_index, self.obs)
        self._current_images = render_observation_frames(
            self.frames_dir,
            self.step_index,
            self.obs,
            self.render_scale,
            self.render_grid,
        )

    def _selected_images(self) -> list[Path]:
        return self._current_images[-1:] if self._current_images else []

    def _metadata(
        self,
        *,
        action_applied: bool,
        error: str | None = None,
        level_boundary: bool = False,
        retry_boundary: bool = False,
        invalid_action_limit: bool = False,
    ) -> dict[str, Any]:
        state = "TERMINAL" if self.obs is None else state_name(self.obs.state)
        completed = None if self.obs is None else self.obs.levels_completed
        total = None if self.obs is None else self.obs.win_levels
        metadata: dict[str, Any] = {
            "turn": self.step_index,
            "state": state,
            "progress": {"completed": completed, "total": total},
            "available_actions": (
                []
                if self.terminal
                else available_action_names(self._available_actions())
            ),
            "action_applied": action_applied,
            "terminal": self.terminal,
        }
        if self.termination_reason:
            metadata["termination_reason"] = self.termination_reason
        if error:
            metadata["error"] = error
        if level_boundary:
            metadata["level_boundary"] = True
        if retry_boundary:
            metadata["retry_boundary"] = True
        if invalid_action_limit:
            metadata["invalid_action_limit"] = True
        selected = self._selected_images()
        if selected:
            metadata["visual"] = {
                "turn": self.step_index,
                "frame_count": len(self._current_images),
                "final_frame": self._frame_number(selected[-1]),
                "width": self.display_size,
                "height": self.display_size,
            }
        if self.observation_mode in {"grid", "both"} and self.obs is not None:
            metadata["grid"] = format_grid_observation(self.obs.frame)
        return metadata

    def _response(
        self,
        *,
        ok: bool,
        action_applied: bool,
        error: str | None = None,
        include_image: bool = True,
        level_boundary: bool = False,
        retry_boundary: bool = False,
        invalid_action_limit: bool = False,
    ) -> dict[str, Any]:
        response: dict[str, Any] = {
            "ok": ok,
            "metadata": self._metadata(
                action_applied=action_applied,
                error=error,
                level_boundary=level_boundary,
                retry_boundary=retry_boundary,
                invalid_action_limit=invalid_action_limit,
            ),
        }
        selected = self._selected_images()
        if include_image and self.observation_mode in {"vision", "both"} and selected:
            response["image"] = {
                "mime_type": "image/png",
                "detail": "original",
                "data": base64.b64encode(selected[-1].read_bytes()).decode("ascii"),
            }
        return response


def render_observation_frames(
    frames_dir: Path,
    step_index: int,
    obs: Any,
    scale: int,
    grid_lines: bool = False,
) -> list[Path]:
    paths = []
    for frame_index, frame in enumerate(obs.frame):
        path = frames_dir / f"turn_{step_index:03d}_frame_{frame_index:02d}.png"
        save_frame_png(frame, path, scale=scale, grid_lines=grid_lines)
        paths.append(path)
    return paths


def save_private_observation(private_dir: Path, step_index: int, obs: Any) -> None:
    response_dir = private_dir / "responses"
    response_dir.mkdir(exist_ok=True)
    write_json(response_dir / f"step_{step_index:04d}.json", serialize_observation(obs))


def serialize_observation(obs: Any) -> dict[str, Any]:
    return {
        "game_id": obs.game_id,
        "guid": obs.guid,
        "state": state_name(obs.state),
        "levels_completed": obs.levels_completed,
        "win_levels": obs.win_levels,
        "available_actions": list(obs.available_actions),
        "action_input": safe_model_dump(obs.action_input),
        "full_reset": obs.full_reset,
        "frame": [frame.tolist() for frame in obs.frame],
    }


def format_grid_observation(frames: Iterable[Any]) -> dict[str, Any]:
    return {
        "frames": [
            [[int(cell) for cell in row] for row in frame.tolist()]
            for frame in list(frames)[-1:]
        ]
    }


def safe_model_dump(value: Any) -> Any:
    if value is None:
        return None
    if hasattr(value, "model_dump"):
        return value.model_dump(mode="json")
    if hasattr(value, "dict"):
        return value.dict()
    if isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, list):
        return [safe_model_dump(item) for item in value]
    if isinstance(value, dict):
        return {str(key): safe_model_dump(item) for key, item in value.items()}
    return str(value)


def validation_to_log(validation: ToolActionValidation) -> dict[str, Any]:
    return {
        "ok": validation.ok,
        "action_id": (
            int(validation.action.value) if validation.action is not None else None
        ),
        "data": validation.data,
        "parsed": validation.parsed,
        "error": validation.error,
    }


def state_name(state: Any) -> str:
    return state.name if hasattr(state, "name") else str(state)


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, sort_keys=True), encoding="utf-8")


def append_jsonl(path: Path, data: Any) -> None:
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(data, separators=(",", ":"), sort_keys=True))
        handle.write("\n")


def atomic_write_text(path: Path, content: str, *, mode: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(content, encoding="utf-8")
    temporary.chmod(mode)
    temporary.replace(path)

````


## vista-c97c354/src/vista/benchmarks/arc3/codex/harness.py

````text
"""Run a visual-game evaluation with checkpointed Codex context."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
from contextlib import nullcontext
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Sequence

os.environ.setdefault("MPLCONFIGDIR", "/tmp/arc3_mplconfig")

import arc_agi
from arc_agi import Arcade, OperationMode

from vista.backends.codex.lifecycle import (
    CHECKPOINT_PROMPT as CHECKPOINT_PROMPT,
    MAX_CHECKPOINT_ATTEMPTS as MAX_CHECKPOINT_ATTEMPTS,
    MAX_COMPACT_CYCLES_WITHOUT_ACTION as MAX_COMPACT_CYCLES_WITHOUT_ACTION,
    MAX_RUNTIME_RECOVERIES_PER_STEP as MAX_RUNTIME_RECOVERIES_PER_STEP,
    NONTERMINAL_CONTINUATION_PROMPT as NONTERMINAL_CONTINUATION_PROMPT,
    run_task_with_compact_checkpoints as run_task_with_compact_checkpoints,
    write_compact_restore_hook as write_compact_restore_hook,
)
from vista.benchmarks.arc3.codex.controller import GameController, write_json
from vista.benchmarks.arc3.codex.recovery import TASK_OBJECTIVE
from vista.benchmarks.arc3.codex.runner import (
    CodexResult,
    CompactThresholds,
    DockerCodexRunner,
    default_codex_auth_file,
    default_codex_bin,
    default_native_codex_bin,
    prepare_codex_home,
    resolve_compact_thresholds,
    validate_codex_auth_file,
)
from vista.benchmarks.arc3.run import (
    create_run_dir,
    load_run_environment,
    report_run_failure,
)

GRID_SIZE = 64
RENDER_SCALE = 8
DEFAULT_RENDER_GRID = True
DISPLAY_SIZE = GRID_SIZE * RENDER_SCALE
DEFAULT_MAX_STEPS = 2_000
DEFAULT_MAX_INVALID_RETRIES = 15
DEFAULT_MODEL = "gpt-5.6-sol"
DEFAULT_REASONING_EFFORT = "max"
CODEX_EFFORT_LEVELS = ("minimal", "low", "medium", "high", "xhigh", "max", "ultra")
EMPTY_GUIDE_MODEL = "No reliable model yet."
COMPACT_RESTORE_MARKER = Path("compact_restore.pending")
COMPACT_GUIDE_SNAPSHOT = Path("compact_guide.snapshot")
COMPACT_CHECKPOINT_MARKER = Path("compact_checkpoint.requested")
COMPACT_CHECKPOINT_READY = Path("compact_checkpoint.ready")
RETRY_BOUNDARY_MARKER = Path("retry_boundary.pending")
WORKING_MEMORY_FILE = Path("WORKING.md")
MAX_TASK_TIMEOUT_SECONDS = 2_000_000
INFRASTRUCTURE_TERMINATION_REASONS = frozenset(
    {
        "compact_recovery_failed",
        "controller_error",
        "environment_response_missing",
        "retry_boundary_interrupt_failed",
        "visual_transport_failed",
    }
)
ACTION_COMMENTARY_INSTRUCTION = (
    "Before each `play` call, briefly state what you expect to happen visibly."
)
CHANGE_COMMENTARY_INSTRUCTION = (
    "Before each `play` call, briefly state the relevant visual change after the "
    "previous action when applicable, and what you expect to happen visibly from "
    "the action you are taking now."
)


@dataclass(frozen=True)
class GameRunOutcome:
    run_dir: Path
    scorecard_id: str | None
    session_id: str | None
    failure: BaseException | None


EnvironmentFactory = Callable[[str, str, Path], Any | None]


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--game-id", required=True)
    parser.add_argument(
        "--runs-dir",
        type=Path,
        default=Path("runs"),
        help="Run output directory (default: ./runs in the current working directory)",
    )
    parser.add_argument("--max-steps", type=int, default=DEFAULT_MAX_STEPS)
    parser.add_argument(
        "--operation-mode",
        choices=["online", "offline"],
        default="online",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        help="Codex model",
    )
    parser.add_argument("--effort", choices=CODEX_EFFORT_LEVELS)
    parser.add_argument("--timeout", type=int, default=300)
    parser.add_argument(
        "--max-invalid-retries",
        type=int,
        default=DEFAULT_MAX_INVALID_RETRIES,
    )
    parser.set_defaults(
        observation_mode="vision",
        describe_changes=False,
        render_grid=DEFAULT_RENDER_GRID,
    )
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    load_run_environment()
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.operation_mode != "offline" and not os.getenv("ARC_API_KEY"):
        parser.error("ARC_API_KEY is not set. Put it in .env or export it.")
    if args.max_steps < 1:
        parser.error("--max-steps must be >= 1")
    if args.timeout < 1:
        parser.error("--timeout must be >= 1")
    if args.max_invalid_retries < 0:
        parser.error("--max-invalid-retries must be >= 0")

    outcome = run_game(args)
    print(f"Run directory: {outcome.run_dir}")
    print(f"Scorecard id: {outcome.scorecard_id}")
    print(f"Codex session id: {outcome.session_id}")
    if outcome.failure is not None:
        report_run_failure(outcome.run_dir, "codex")
        raise outcome.failure
    return 0


def run_game(
    args: argparse.Namespace,
    *,
    shared_arc: Arcade | None = None,
    shared_scorecard_id: str | None = None,
    auth_file: Path | None = None,
    run_dir: Path | None = None,
    environment_factory: EnvironmentFactory | None = None,
) -> GameRunOutcome:
    """Run one game, optionally under a coordinator-owned scorecard."""
    if (shared_arc is None) != (shared_scorecard_id is None):
        raise ValueError("shared_arc and shared_scorecard_id must be provided together")

    args = argparse.Namespace(**vars(args))
    args.model, reasoning_effort = resolve_model_spec(
        args.model,
        getattr(args, "effort", None),
    )
    compact_thresholds = resolve_compact_thresholds(args.model)
    if run_dir is None:
        run_dir = create_run_dir(getattr(args, "runs_dir", Path("runs")))
    else:
        run_dir = run_dir.expanduser().resolve()
        run_dir.mkdir(parents=True, exist_ok=False)
    private_dir = run_dir / "private"
    visible_dir = run_dir / "codex_visible"
    frames_dir = visible_dir / "screenshots"
    io_dir = private_dir / "codex_io"
    recordings_dir = private_dir / "recordings"
    for directory in (
        private_dir,
        visible_dir,
        frames_dir,
        io_dir,
        recordings_dir,
    ):
        directory.mkdir(parents=True, exist_ok=True)
    private_dir.chmod(0o700)

    write_player_agents(
        Path(__file__).with_name("prompt.md"),
        visible_dir / "AGENTS.md",
        describe_changes=args.describe_changes,
    )
    write_guide(visible_dir / "GUIDE.md", current_model=EMPTY_GUIDE_MODEL)
    codex_home = prepare_codex_home(private_dir / "codex_home")
    write_compact_restore_hook(visible_dir, codex_home)

    manifest = base_manifest(
        args,
        run_dir,
        shared_scorecard_id,
        reasoning_effort,
        compact_thresholds,
    )
    write_json(run_dir / "manifest.json", manifest)

    arc: Arcade | None = shared_arc
    scorecard_id: str | None = shared_scorecard_id
    owns_scorecard = shared_arc is None
    env: Any | None = None
    controller: GameController | None = None
    result: CodexResult | None = None
    results: list[CodexResult] = []
    failure: BaseException | None = None

    try:
        auth_file = validate_codex_auth_file(
            auth_file if auth_file is not None else default_codex_auth_file()
        )
        if arc is None:
            os.environ["OPERATION_MODE"] = args.operation_mode
            arc = Arcade(
                operation_mode=OperationMode(args.operation_mode),
                recordings_dir=str(recordings_dir),
            )
        if not arc.get_environments():
            raise RuntimeError(
                "No environments were fetched. Check network, credentials, and endpoint settings."
            )

        if scorecard_id is None:
            scorecard_id = open_evaluation_scorecard(arc)
            manifest["scorecard_id"] = scorecard_id
            write_json(run_dir / "manifest.json", manifest)

        if environment_factory is None:
            env = arc.make(
                args.game_id,
                scorecard_id=scorecard_id,
                save_recording=True,
                include_frame_data=True,
            )
        else:
            env = environment_factory(args.game_id, scorecard_id, recordings_dir)
        if env is None:
            raise RuntimeError(f"Failed to make environment {args.game_id!r}")
        share_online_cookie_jar(arc, env)
        write_json(run_dir / "manifest.json", manifest)
        observation = env.observation_space
        if observation is None:
            raise RuntimeError("Environment did not provide an initial observation")

        controller = GameController(
            env=env,
            initial_observation=observation,
            private_dir=private_dir,
            frames_dir=frames_dir,
            max_steps=args.max_steps,
            max_invalid_retries=args.max_invalid_retries,
            observation_mode=args.observation_mode,
            render_scale=RENDER_SCALE,
            render_grid=args.render_grid,
            compact_restore_marker=codex_home / COMPACT_RESTORE_MARKER,
            compact_guide_snapshot=codex_home / COMPACT_GUIDE_SNAPSHOT,
            compact_checkpoint_marker=codex_home / COMPACT_CHECKPOINT_MARKER,
            compact_checkpoint_ready=codex_home / COMPACT_CHECKPOINT_READY,
            retry_boundary_marker=codex_home / RETRY_BOUNDARY_MARKER,
            working_path=visible_dir / WORKING_MEMORY_FILE,
            guide_path=visible_dir / "GUIDE.md",
        )
        runner = build_runner(
            args,
            visible_dir,
            codex_home,
            auth_file,
            io_dir,
            controller,
            reasoning_effort,
            compact_thresholds,
        )

        run_task_with_compact_checkpoints(
            runner=runner,
            controller=controller,
            prompt=build_initial_prompt(controller.initial_metadata()),
            checkpoint_marker=codex_home / COMPACT_CHECKPOINT_MARKER,
            checkpoint_ready=codex_home / COMPACT_CHECKPOINT_READY,
            working_path=visible_dir / WORKING_MEMORY_FILE,
            results=results,
        )
        result = results[-1]
        manifest["codex"] = result_to_manifest(result)
        manifest["codex_segments"] = [
            result_to_manifest(segment) for segment in results
        ]
        if result.returncode != 0 and not controller.terminal:
            raise RuntimeError(
                f"Codex task failed with exit code {result.returncode}; "
                f"stderr: {result.stderr_path}"
            )
        if controller.termination_reason in INFRASTRUCTURE_TERMINATION_REASONS:
            raise RuntimeError(
                "Game stopped after an infrastructure failure: "
                f"{controller.termination_reason}"
            )
        if not controller.terminal:
            controller.forced_termination_reason = "agent_stopped_early"
            raise RuntimeError("Codex stopped before the game or action budget ended")
    except BaseException as exc:
        if result is None and results:
            result = results[-1]
            manifest["codex"] = result_to_manifest(result)
            manifest["codex_segments"] = [
                result_to_manifest(segment) for segment in results
            ]
        failure = exc
    finally:
        if owns_scorecard and arc is not None and scorecard_id is not None:
            scorecard_result, scorecard_failure = finalize_scorecard(
                arc=arc,
                env=env,
                scorecard_id=scorecard_id,
                operation_mode=args.operation_mode,
            )
            manifest.update(scorecard_result)
            if scorecard_failure is not None and failure is None:
                failure = scorecard_failure
        elif arc is not None and scorecard_id is not None:
            manifest["scorecard_closed"] = False
            manifest["scorecard_finalization"] = "managed_by_competition_coordinator"
        else:
            manifest["scorecard_closed"] = False

        manifest["finished_at"] = utc_now()
        manifest["steps_attempted"] = controller.step_index if controller else 0
        manifest["action_attempts"] = controller.total_attempts if controller else 0
        manifest["terminal"] = controller.terminal if controller else False
        manifest["termination_reason"] = (
            controller.termination_reason if controller else "setup_failed"
        )
        if result is not None:
            manifest["session_segments"] = len(results)
        if failure is not None:
            manifest["error"] = type(failure).__name__
            (private_dir / "error.txt").write_text(
                f"{type(failure).__name__}: {failure}\n",
                encoding="utf-8",
            )
        write_json(run_dir / "manifest.json", manifest)

    return GameRunOutcome(
        run_dir=run_dir,
        scorecard_id=scorecard_id,
        session_id=result.session_id if result else None,
        failure=failure,
    )


def build_runner(
    args: argparse.Namespace,
    visible_dir: Path,
    codex_home: Path,
    auth_file: Path,
    io_dir: Path,
    controller: GameController,
    reasoning_effort: str | None,
    compact_thresholds: CompactThresholds,
) -> DockerCodexRunner:
    maximum_calls = args.max_steps * (args.max_invalid_retries + 1) + 1
    return DockerCodexRunner(
        visible_dir=visible_dir,
        codex_home=codex_home,
        auth_file=auth_file,
        io_dir=io_dir,
        controller=controller,
        codex_bin=default_native_codex_bin(),
        model=args.model,
        reasoning_effort=reasoning_effort,
        compact_thresholds=compact_thresholds,
        task_timeout=bounded_task_timeout(args.timeout, maximum_calls),
        display_size=DISPLAY_SIZE,
    )


def bounded_task_timeout(tool_timeout: int, maximum_calls: int) -> int:
    return min(tool_timeout * maximum_calls, MAX_TASK_TIMEOUT_SECONDS)


def build_initial_prompt(metadata: dict[str, Any]) -> str:
    return "\n".join(
        [
            "Current observation:",
            json.dumps(metadata, separators=(",", ":")),
            "",
            TASK_OBJECTIVE,
        ]
    )


def parse_model_spec(model_spec: str | None) -> tuple[str | None, str | None]:
    if not model_spec:
        return None, None
    efforts = set(CODEX_EFFORT_LEVELS)
    model, separator, suffix = model_spec.rpartition("-")
    if separator and suffix in efforts:
        return model, suffix
    return model_spec, None


def resolve_model_spec(
    model_spec: str | None,
    effort: str | None,
) -> tuple[str | None, str]:
    model, suffix_effort = parse_model_spec(model_spec)
    if effort and suffix_effort and effort != suffix_effort:
        raise ValueError("Conflicting reasoning efforts in --model and --effort")
    return model, effort or suffix_effort or DEFAULT_REASONING_EFFORT


def open_evaluation_scorecard(arc: Any) -> str:
    return str(arc.open_scorecard(tags=[]))


def share_online_cookie_jar(arc: Any, env: Any | None) -> bool:
    """Keep scorecard and environment requests on the same remote session."""
    arc_session = getattr(arc, "_session", None)
    shared = getattr(arc_session, "cookies", None)
    if shared is None:
        return False

    env_session = getattr(env, "_session", None)
    lock = getattr(arc, "_cookie_lock", None)
    context = lock if lock is not None else nullcontext()
    with context:
        old_master = getattr(arc, "_master_cookie_jar", None)
        if old_master is not None and old_master is not shared:
            shared.update(old_master)
        if env_session is not None:
            shared.update(env_session.cookies)

        # arc-agi 0.9.x otherwise keeps an open-time cookie snapshot and copies
        # it back over the refreshed environment cookies during scorecard close.
        arc._master_cookie_jar = shared
        if env is not None and hasattr(env, "_master_cookie_jar"):
            env._master_cookie_jar = shared
    return True


def finalize_scorecard(
    *,
    arc: Any,
    env: Any | None,
    scorecard_id: str,
    operation_mode: str,
) -> tuple[dict[str, Any], BaseException | None]:
    """Close a remote scorecard without losing a completed run to a stale cookie."""
    outcome: dict[str, Any] = {"scorecard_closed": False}
    snapshot: Any | None = None

    share_online_cookie_jar(arc, env)
    if operation_mode == "online":
        try:
            snapshot = arc.get_scorecard(scorecard_id)
        except BaseException as exc:
            outcome["scorecard_preclose_error"] = f"{type(exc).__name__}: {exc}"
        else:
            if snapshot is not None:
                outcome["scorecard_preclose_summary"] = safe_model_dump(snapshot)

    share_online_cookie_jar(arc, env)
    try:
        final_scorecard = arc.close_scorecard(scorecard_id)
    except BaseException as exc:
        status_code = getattr(getattr(exc, "response", None), "status_code", None)
        outcome["scorecard_close_error"] = f"{type(exc).__name__}: {exc}"
        outcome["scorecard_close_status_code"] = status_code
        if status_code == 404 and snapshot is not None:
            outcome["scorecard_summary"] = safe_model_dump(snapshot)
            outcome["scorecard_summary_source"] = "preclose_snapshot"
            outcome["scorecard_finalization"] = "close_not_found_after_snapshot"
            return outcome, None
        return outcome, exc

    outcome["scorecard_closed"] = True
    outcome["scorecard_finalization"] = "closed"
    if final_scorecard is not None:
        outcome["scorecard_summary"] = safe_model_dump(final_scorecard)
        outcome["scorecard_summary_source"] = "close_response"
    elif snapshot is not None:
        outcome["scorecard_summary"] = safe_model_dump(snapshot)
        outcome["scorecard_summary_source"] = "preclose_snapshot"
    return outcome, None


def base_manifest(
    args: argparse.Namespace,
    run_dir: Path,
    scorecard_id: str | None,
    reasoning_effort: str | None,
    compact_thresholds: CompactThresholds,
) -> dict[str, Any]:
    return {
        "created_at": utc_now(),
        "arc_agi_version": getattr(arc_agi, "__version__", None),
        "game_id": args.game_id,
        "operation_mode": args.operation_mode,
        "scorecard_id": scorecard_id,
        "runtime": "codex",
        "codex_model": args.model,
        "codex_reasoning_effort": reasoning_effort,
        "describe_visual_changes": args.describe_changes,
        "observation_mode": args.observation_mode,
        "render_grid": args.render_grid,
        "max_steps": args.max_steps,
        "max_invalid_retries": args.max_invalid_retries,
        "codex_version": codex_version(),
    }


def codex_version() -> str | None:
    try:
        proc = subprocess.run(
            [str(default_codex_bin()), "--version"],
            text=True,
            capture_output=True,
            env=codex_host_environment(),
            timeout=20,
            check=False,
        )
    except Exception:
        return None
    return (proc.stdout or proc.stderr).strip() or None


def codex_host_environment() -> dict[str, str]:
    return {
        key: value for key, value in os.environ.items() if not key.startswith("ARC_")
    }


def write_guide(path: Path, *, current_model: str) -> None:
    path.write_text(
        (current_model.strip() or EMPTY_GUIDE_MODEL) + "\n",
        encoding="utf-8",
    )


def write_player_agents(
    source: Path,
    destination: Path,
    *,
    describe_changes: bool,
) -> None:
    text = source.read_text(encoding="utf-8")
    if describe_changes:
        if ACTION_COMMENTARY_INSTRUCTION not in text:
            raise RuntimeError("AGENTS.md is missing the action commentary instruction")
        text = text.replace(
            ACTION_COMMENTARY_INSTRUCTION,
            CHANGE_COMMENTARY_INSTRUCTION,
            1,
        )
    destination.write_text(text, encoding="utf-8")


def result_to_manifest(result: CodexResult) -> dict[str, Any]:
    return {
        "segment": result.segment,
        "returncode": result.returncode,
        "usage": result.usage.__dict__ if result.usage else None,
    }


def safe_model_dump(value: Any) -> Any:
    if value is None:
        return None
    if hasattr(value, "model_dump"):
        return value.model_dump(mode="json")
    if hasattr(value, "dict"):
        return value.dict()
    if isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, list):
        return [safe_model_dump(item) for item in value]
    if isinstance(value, dict):
        return {str(key): safe_model_dump(item) for key, item in value.items()}
    return str(value)


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/benchmarks/arc3/codex/prompt.md

````text
# Visual game task

Complete the game with as few game actions as possible.

Build and use a compact, revisable model of the game and its current state. Update it as new evidence changes what is supported.

Before each `play`, briefly state what you expect to see. Afterward, briefly state all visible changes, expected or not.

Keep concise, durable, revisable game understanding in `GUIDE.md`; use `WORKING.md` as a scratchpad when useful.

````


## vista-c97c354/src/vista/benchmarks/arc3/codex/recovery.py

````text
"""Provider-neutral task and recovery prompts."""

from __future__ import annotations

import json

from vista.core.session import CompactRecovery, RetryRecovery, RuntimeRecovery

TASK_OBJECTIVE = "Complete the game with as few game actions as possible."
RECOVERY_TASK_OBJECTIVE = "Continue the game with as few game actions as possible."


def compact_recovery_prompt(recovery: CompactRecovery) -> str:
    return _recovery_prompt(
        current_observation=recovery.current_observation,
        last_action_result=recovery.last_action_result,
        objective_history=recovery.objective_history,
        guide=recovery.guide,
        working_memory=recovery.working_memory,
    )


def retry_recovery_prompt(recovery: RetryRecovery) -> str:
    working_memory: object = recovery.working_memory
    if recovery.working_memory is not None:
        working_memory = {
            "saved_at": recovery.working_provenance,
            "content": recovery.working_memory,
        }
    return _recovery_prompt(
        current_observation=recovery.current_observation,
        last_action_result=recovery.last_action_result,
        objective_history=recovery.objective_history,
        guide=recovery.guide,
        working_memory=working_memory,
    )


def runtime_recovery_prompt(recovery: RuntimeRecovery) -> str:
    return "\n".join(
        [
            "The player runtime restarted without changing the game state.",
            "Environment record:",
            json.dumps(
                {
                    "current_observation": recovery.current_observation,
                    "last_action_result": recovery.last_action_result,
                },
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )


def native_compact_recovery_prompt(recovery: RuntimeRecovery) -> str:
    return "\n".join(
        [
            "Native context compaction completed without changing the game state.",
            "Current environment record:",
            json.dumps(
                {
                    "current_observation": recovery.current_observation,
                    "last_action_result": recovery.last_action_result,
                },
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )


def continuation_prompt(current_observation: dict[str, object]) -> str:
    return "\n".join(
        [
            "Current environment record:",
            json.dumps(
                current_observation,
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )


def fresh_runtime_recovery_prompt(recovery: RuntimeRecovery) -> str:
    working_memory: object = recovery.working_memory
    if recovery.working_memory is not None:
        working_memory = {
            "saved_at": recovery.working_provenance,
            "content": recovery.working_memory,
        }
    return _recovery_prompt(
        current_observation=recovery.current_observation,
        last_action_result=recovery.last_action_result,
        objective_history=recovery.objective_history,
        guide=recovery.guide,
        working_memory=working_memory,
    )


def fresh_continuation_prompt(recovery: RuntimeRecovery) -> str:
    working_memory: object = recovery.working_memory
    if recovery.working_memory is not None:
        working_memory = {
            "saved_at": recovery.working_provenance,
            "content": recovery.working_memory,
        }
    return "\n".join(
        [
            "A fresh player is continuing from the unchanged game state.",
            _recovery_prompt(
                current_observation=recovery.current_observation,
                last_action_result=recovery.last_action_result,
                objective_history=recovery.objective_history,
                guide=recovery.guide,
                working_memory=working_memory,
            ),
        ]
    )


def _recovery_prompt(
    *,
    current_observation: dict[str, object],
    last_action_result: dict[str, object] | None,
    objective_history: dict[str, object],
    guide: object,
    working_memory: object,
) -> str:
    return "\n".join(
        [
            "Environment record:",
            json.dumps(
                {
                    "current_observation": current_observation,
                    "last_action_result": last_action_result,
                    "current_level_history": objective_history,
                },
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            "Agent-authored notes:",
            json.dumps(
                {"guide": guide, "working_memory": working_memory},
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            "",
            RECOVERY_TASK_OBJECTIVE,
        ]
    )

````


## vista-c97c354/src/vista/benchmarks/arc3/codex/runner.py

````text
"""ARC3 defaults for the shared Codex transport."""

from typing import Any

from vista.backends.codex import runner as _runner

from .recovery import (
    compact_recovery_prompt,
    retry_recovery_prompt,
    runtime_recovery_prompt,
)
from .tools import build_tools


class DockerCodexRunner(_runner.DockerCodexRunner):
    def _default_tool_definitions(self) -> tuple[dict[str, Any], ...]:
        return build_tools(self.display_size)

    def _default_recovery_prompt(self, kind: str, recovery: Any) -> str:
        return {
            "compact": compact_recovery_prompt,
            "retry": retry_recovery_prompt,
            "runtime": runtime_recovery_prompt,
        }[kind](recovery)


def __getattr__(name: str) -> Any:
    return getattr(_runner, name)


__all__ = [name for name in dir(_runner) if not name.startswith("_")]

````


## vista-c97c354/src/vista/benchmarks/arc3/codex/tools.py

````text
"""Public tool contracts for the visual game player."""

from __future__ import annotations

from typing import Any

from vista.core.tools import (
    DEFAULT_DISPLAY_SIZE as DEFAULT_DISPLAY_SIZE,
    MAX_GUIDE_CHARS as MAX_GUIDE_CHARS,
    MAX_INSPECTION_LABEL_CHARS as MAX_INSPECTION_LABEL_CHARS,
    MAX_INSPECTION_QUESTION_CHARS as MAX_INSPECTION_QUESTION_CHARS,
    MAX_INSPECTION_VIEWS as MAX_INSPECTION_VIEWS,
    MAX_PIXEL_READOUT_SAMPLES as MAX_PIXEL_READOUT_SAMPLES,
    MAX_PIXEL_READOUT_VIEWS as MAX_PIXEL_READOUT_VIEWS,
    MAX_WORKING_CHARS as MAX_WORKING_CHARS,
    READ_GUIDE_TOOL as READ_GUIDE_TOOL,
    SAVE_COMPACT_CHECKPOINT_TOOL as SAVE_COMPACT_CHECKPOINT_TOOL,
    WRITE_GUIDE_TOOL as WRITE_GUIDE_TOOL,
    _visual_region_schema as _visual_region_schema,
    build_inspect_tool as build_inspect_tool,
    build_read_pixels_tool as build_read_pixels_tool,
)

ACTION_NAMES = (
    "RESET",
    "ACTION1",
    "ACTION2",
    "ACTION3",
    "ACTION4",
    "ACTION5",
    "ACTION6",
    "ACTION7",
)


def build_action_schema(
    display_size: int = DEFAULT_DISPLAY_SIZE,
    *,
    reset_requires_retry_state: bool = True,
) -> dict[str, Any]:
    if type(display_size) is not int or display_size < 1:
        raise ValueError("display_size must be a positive integer")
    properties: dict[str, Any] = {
        "action": {"type": "string", "enum": list(ACTION_NAMES)},
        "x": {
            "type": ["integer", "null"],
            "minimum": 0,
            "maximum": display_size - 1,
        },
        "y": {
            "type": ["integer", "null"],
            "minimum": 0,
            "maximum": display_size - 1,
        },
    }
    if reset_requires_retry_state:
        properties["retry_state"] = {
            "type": "string",
            "minLength": 1,
            "maxLength": MAX_WORKING_CHARS,
            "description": (
                "For RESET, the smallest sufficient continuation state for "
                "the next attempt. It replaces WORKING.md."
            ),
        }
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["action"],
        "properties": properties,
    }


def build_play_tool(
    display_size: int = DEFAULT_DISPLAY_SIZE,
    *,
    reset_requires_retry_state: bool = True,
) -> dict[str, Any]:
    reset_handoff = (
        " For RESET, include the smallest sufficient continuation state for the "
        "next attempt in retry_state; it replaces WORKING.md."
        if reset_requires_retry_state
        else ""
    )
    return {
        "name": "play",
        "description": (
            "Execute exactly one game action. Each executed play call counts as one "
            "game action. The result contains the resulting "
            "final visual, the number of archived frames for the action, and the "
            "actions available afterward. The player observes this result before "
            "another action can execute. Use only currently available actions. RESET "
            "initializes or restarts the game or level. ACTION1 through ACTION4 are "
            "game-dependent simple actions usually associated with up, down, left, "
            "and right. ACTION5 is a game-dependent simple action, usually an "
            "interaction such as select, rotate, attach, detach, execute, etc. "
            "ACTION6 is a coordinate action. ACTION7 is Undo. UI bindings: "
            "ACTION1=W/Up Arrow, ACTION2=S/Down Arrow, ACTION3=A/Left Arrow, "
            "ACTION4=D/Right Arrow, ACTION5=Space/F, ACTION6=mouse click, and "
            "ACTION7=Ctrl/Cmd+Z. For ACTION6, always provide "
            f"x and y in the standard {display_size}x{display_size} coordinate system; "
            "x increases right and y increases down."
            f"{reset_handoff}"
        ),
        "inputSchema": build_action_schema(
            display_size,
            reset_requires_retry_state=reset_requires_retry_state,
        ),
        "annotations": {
            "readOnlyHint": False,
            "destructiveHint": False,
            "idempotentHint": False,
            "openWorldHint": False,
        },
    }


HISTORY_TOOL = {
    "name": "history",
    "description": (
        "Read objective action and environment-result records from this run without "
        "changing the game. `attempts` summarizes RESET-to-GAME_OVER attempts in "
        "the current level. `events` returns exact public action/result records by "
        "turn; use start_turn, end_turn, and limit to select a range."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["view"],
        "properties": {
            "view": {
                "type": "string",
                "enum": ["attempts", "events"],
            },
            "start_turn": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
            },
            "end_turn": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
            },
            "limit": {
                "type": "integer",
                "minimum": 1,
                "maximum": 128,
                "default": 64,
            },
        },
    },
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}

READ_WORKING_TOOL = {
    "name": "read_working",
    "description": "Read the agent-authored temporary state for the current level.",
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {},
    },
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}

WRITE_WORKING_TOOL = {
    "name": "write_working",
    "description": (
        "Replace the agent-authored temporary state for the current level. It "
        "persists across RESET and is cleared when level progress advances."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["content"],
        "properties": {
            "content": {
                "type": "string",
                "minLength": 1,
                "maxLength": MAX_WORKING_CHARS,
            }
        },
    },
    "annotations": {
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


def build_tools(
    display_size: int = DEFAULT_DISPLAY_SIZE,
    *,
    include_compact_checkpoint: bool = True,
    reset_requires_retry_state: bool = True,
) -> tuple[dict[str, Any], ...]:
    tools = (
        build_play_tool(
            display_size,
            reset_requires_retry_state=reset_requires_retry_state,
        ),
        build_inspect_tool(display_size),
        build_read_pixels_tool(display_size),
        HISTORY_TOOL,
        READ_GUIDE_TOOL,
        WRITE_GUIDE_TOOL,
        READ_WORKING_TOOL,
        WRITE_WORKING_TOOL,
    )
    if include_compact_checkpoint:
        return (*tools, SAVE_COMPACT_CHECKPOINT_TOOL)
    return tools

````


## vista-c97c354/src/vista/benchmarks/arc3/http.py

````text
"""Shared HTTP transport configuration for ARC remote environments."""

from __future__ import annotations

from typing import Any

from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from vista.core.timeouts import (
    ENV_CONNECT_RETRIES as ARC_CONNECT_RETRIES,
    ENV_CONNECT_TIMEOUT_SECONDS as ARC_CONNECT_TIMEOUT_SECONDS,
    ENV_READ_TIMEOUT_SECONDS as ARC_READ_TIMEOUT_SECONDS,
)


class ArcHTTPAdapter(HTTPAdapter):
    """Use fresh connections and never replay a submitted game action."""

    def __init__(self) -> None:
        super().__init__(
            max_retries=Retry(
                total=None,
                connect=ARC_CONNECT_RETRIES,
                read=0,
                redirect=0,
                status=0,
                other=0,
                allowed_methods=None,
                backoff_factor=0.5,
            )
        )

    def send(self, request: Any, **kwargs: Any) -> Any:
        timeout = kwargs.get("timeout")
        if timeout is None or isinstance(timeout, (int, float)):
            kwargs["timeout"] = (
                ARC_CONNECT_TIMEOUT_SECONDS,
                ARC_READ_TIMEOUT_SECONDS,
            )
        return super().send(request, **kwargs)


def configure_arc_http(owner: Any) -> bool:
    session = getattr(owner, "_session", None)
    if session is None or not callable(getattr(session, "mount", None)):
        return False
    session.headers["Connection"] = "close"
    session.mount("https://", ArcHTTPAdapter())
    session.mount("http://", ArcHTTPAdapter())
    return True

````


## vista-c97c354/src/vista/benchmarks/arc3/palette.py

````text
"""Fixed ARC-AGI-3 palette helpers."""

from __future__ import annotations

import os
from typing import Iterable

os.environ.setdefault("MPLCONFIGDIR", "/tmp/arc3_mplconfig")

try:
    from arc_agi.rendering import COLOR_MAP as SDK_COLOR_MAP
except Exception:  # pragma: no cover - fallback only for broken installs.
    SDK_COLOR_MAP = {}


FALLBACK_COLOR_MAP: dict[int, str] = {
    0: "#FFFFFFFF",
    1: "#CCCCCCFF",
    2: "#999999FF",
    3: "#666666FF",
    4: "#333333FF",
    5: "#000000FF",
    6: "#E53AA3FF",
    7: "#FF7BCCFF",
    8: "#F93C31FF",
    9: "#1E93FFFF",
    10: "#88D8F1FF",
    11: "#FFDC00FF",
    12: "#FF851BFF",
    13: "#921231FF",
    14: "#4FCC30FF",
    15: "#A356D6FF",
}


COLOR_MAP: dict[int, str] = {
    idx: SDK_COLOR_MAP.get(idx, FALLBACK_COLOR_MAP[idx]) for idx in range(16)
}


def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    raw = hex_color.lstrip("#")
    if len(raw) not in (6, 8):
        raise ValueError(f"Expected RGB/RGBA hex color, got {hex_color!r}")
    return (int(raw[0:2], 16), int(raw[2:4], 16), int(raw[4:6], 16))


def palette_rgb() -> list[tuple[int, int, int]]:
    return [hex_to_rgb(COLOR_MAP[idx]) for idx in range(16)]


def palette_manifest() -> list[dict[str, object]]:
    return [
        {"index": idx, "hex": COLOR_MAP[idx], "rgb": list(hex_to_rgb(COLOR_MAP[idx]))}
        for idx in range(16)
    ]


def validate_palette_indices(values: Iterable[int]) -> None:
    invalid = sorted({int(value) for value in values if int(value) not in COLOR_MAP})
    if invalid:
        raise ValueError(f"Frame contains color indices outside 0..15: {invalid}")

````


## vista-c97c354/src/vista/benchmarks/arc3/profile.py

````text
"""Resolve the ARC3 backend without translating its arguments."""

from __future__ import annotations

import importlib
from types import ModuleType

RELEASE_REVISION = "900aa3380e4f1120436d83b2ce1115a38ac29bf9"


def backend_module(backend: str) -> ModuleType:
    if backend not in {"codex", "claude"}:
        raise ValueError(f"Unsupported ARC3 backend: {backend}")
    return importlib.import_module(f"vista.benchmarks.arc3.{backend}.harness")

````


## vista-c97c354/src/vista/benchmarks/arc3/render.py

````text
"""Lossless frame rendering for visual observations."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

from vista.benchmarks.arc3.palette import palette_rgb, validate_palette_indices


def normalize_frame(frame: object) -> np.ndarray:
    arr = np.asarray(frame, dtype=np.int16)
    if arr.ndim != 2:
        raise ValueError(f"Expected a 2D frame, got shape {arr.shape}")
    validate_palette_indices(arr.ravel())
    return arr.astype(np.uint8, copy=False)


def frame_to_rgb_array(frame: object) -> np.ndarray:
    arr = normalize_frame(frame)
    palette = np.asarray(palette_rgb(), dtype=np.uint8)
    return palette[arr]


def render_frame_image(
    frame: object,
    scale: int = 16,
    *,
    grid_lines: bool = False,
) -> Image.Image:
    if scale < 1:
        raise ValueError("scale must be >= 1")
    rgb = frame_to_rgb_array(frame)
    image = Image.fromarray(rgb, mode="RGB")
    if scale != 1:
        width, height = image.size
        image = image.resize((width * scale, height * scale), Image.Resampling.NEAREST)
    if grid_lines:
        pixels = np.asarray(image, dtype=np.uint16).copy()
        mask = np.zeros(pixels.shape[:2], dtype=bool)
        mask[::scale, :] = True
        mask[:, ::scale] = True
        pixels[mask] = (pixels[mask] * 3) // 4
        image = Image.fromarray(pixels.astype(np.uint8), mode="RGB")
    return image


def save_frame_png(
    frame: object,
    path: Path,
    scale: int = 16,
    *,
    grid_lines: bool = False,
) -> Path:
    image = render_frame_image(frame, scale=scale, grid_lines=grid_lines)
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG")
    return path

````


## vista-c97c354/src/vista/benchmarks/arc3/run.py

````text
"""Runtime-neutral run storage and ARC scorecard helpers."""

from __future__ import annotations

import os
import sys
from contextlib import nullcontext
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

from vista.core.timeouts import (
    MAX_TASK_TIMEOUT_SECONDS as MAX_TASK_TIMEOUT_SECONDS,
    bounded_task_timeout as bounded_task_timeout,
)


@dataclass(frozen=True)
class GameRunOutcome:
    run_dir: Path
    scorecard_id: str | None
    session_id: str | None
    failure: BaseException | None


def open_evaluation_scorecard(arc: Any) -> str:
    return str(arc.open_scorecard(tags=[]))


def share_online_cookie_jar(arc: Any, env: Any | None) -> bool:
    """Keep scorecard and environment requests on the same remote session."""
    arc_session = getattr(arc, "_session", None)
    shared = getattr(arc_session, "cookies", None)
    if shared is None:
        return False

    env_session = getattr(env, "_session", None)
    lock = getattr(arc, "_cookie_lock", None)
    context = lock if lock is not None else nullcontext()
    with context:
        old_master = getattr(arc, "_master_cookie_jar", None)
        if old_master is not None and old_master is not shared:
            shared.update(old_master)
        if env_session is not None:
            shared.update(env_session.cookies)

        arc._master_cookie_jar = shared
        if env is not None and hasattr(env, "_master_cookie_jar"):
            env._master_cookie_jar = shared
    return True


def finalize_scorecard(
    *,
    arc: Any,
    env: Any | None,
    scorecard_id: str,
    operation_mode: str,
) -> tuple[dict[str, Any], BaseException | None]:
    """Close a remote scorecard without losing a run to a stale cookie."""
    outcome: dict[str, Any] = {"scorecard_closed": False}
    snapshot: Any | None = None

    share_online_cookie_jar(arc, env)
    if operation_mode == "online":
        try:
            snapshot = arc.get_scorecard(scorecard_id)
        except BaseException as exc:
            outcome["scorecard_preclose_error"] = f"{type(exc).__name__}: {exc}"
        else:
            if snapshot is not None:
                outcome["scorecard_preclose_summary"] = safe_model_dump(snapshot)

    share_online_cookie_jar(arc, env)
    try:
        final_scorecard = arc.close_scorecard(scorecard_id)
    except BaseException as exc:
        status_code = getattr(getattr(exc, "response", None), "status_code", None)
        outcome["scorecard_close_error"] = f"{type(exc).__name__}: {exc}"
        outcome["scorecard_close_status_code"] = status_code
        if status_code == 404 and snapshot is not None:
            outcome["scorecard_summary"] = safe_model_dump(snapshot)
            outcome["scorecard_summary_source"] = "preclose_snapshot"
            outcome["scorecard_finalization"] = "close_not_found_after_snapshot"
            return outcome, None
        return outcome, exc

    outcome["scorecard_closed"] = True
    outcome["scorecard_finalization"] = "closed"
    if final_scorecard is not None:
        outcome["scorecard_summary"] = safe_model_dump(final_scorecard)
        outcome["scorecard_summary_source"] = "close_response"
    elif snapshot is not None:
        outcome["scorecard_summary"] = safe_model_dump(snapshot)
        outcome["scorecard_summary_source"] = "preclose_snapshot"
    return outcome, None


def create_run_dir(runs_dir: Path) -> Path:
    runs_dir = runs_dir.expanduser().resolve()
    try:
        runs_dir.mkdir(parents=True, exist_ok=True)
    except OSError as exc:
        raise RuntimeError(
            f"Cannot create run directory under {runs_dir}: {exc}. "
            "Use --runs-dir to select a writable location accessible to Docker."
        ) from exc
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    counter = 0
    while True:
        suffix = "" if counter == 0 else f"_{counter}"
        run_dir = runs_dir / f"run_{stamp}{suffix}"
        try:
            run_dir.mkdir(parents=True)
        except FileExistsError:
            counter += 1
            continue
        except OSError as exc:
            raise RuntimeError(
                f"Cannot create run directory under {runs_dir}: {exc}. "
                "Use --runs-dir to select a writable location accessible to Docker."
            ) from exc
        return run_dir


def load_run_environment(*, override: bool = False) -> Path:
    env_file = Path(os.getenv("ARC3_ENV_FILE", ".env")).expanduser().resolve()
    load_dotenv(env_file, override=override)
    return env_file


def report_run_failure(run_dir: Path, runtime: str) -> None:
    private_dir = run_dir / "private"
    print(f"Run diagnostics: {private_dir}", file=sys.stderr, flush=True)
    try:
        logs = list((private_dir / f"{runtime}_io").rglob("*.stderr.txt"))
        if not logs:
            return
        latest = max(logs, key=lambda path: (path.stat().st_mtime_ns, str(path)))
        with latest.open("rb") as stream:
            stream.seek(0, os.SEEK_END)
            stream.seek(max(0, stream.tell() - 4096))
            detail = stream.read().decode("utf-8", errors="replace").strip()
        print(f"Player stderr: {latest}", file=sys.stderr)
        if detail:
            print(detail, file=sys.stderr, flush=True)
    except OSError as exc:
        print(f"Could not read player stderr: {exc}", file=sys.stderr)


def safe_model_dump(value: Any) -> Any:
    if value is None:
        return None
    if hasattr(value, "model_dump"):
        return value.model_dump(mode="json")
    if hasattr(value, "dict"):
        return value.dict()
    if isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, list):
        return [safe_model_dump(item) for item in value]
    if isinstance(value, dict):
        return {str(key): safe_model_dump(item) for key, item in value.items()}
    return str(value)


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()

````


## vista-c97c354/src/vista/benchmarks/babyvision/__init__.py

````text
"""BabyVision's MLLM track: one supplied image, one question, one final answer."""

from .dataset import BABYVISION_REVISION, DEFAULT_TASK_SET, TASK_SETS
from .profiles import PROTOCOL

__all__ = ["BABYVISION_REVISION", "DEFAULT_TASK_SET", "PROTOCOL", "TASK_SETS"]

````


## vista-c97c354/src/vista/benchmarks/babyvision/cli.py

````text
"""List, plan, run, judge or score BabyVision questions on one CLI backend."""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any

from vista.backends.launch import (
    add_backend_arguments,
    prepare_backend,
    transport_for,
    validate_backend_arguments,
)
from vista.backends.preflight import check_transport

from .dataset import (
    BABYVISION_REVISION,
    DEFAULT_TASK_SET,
    TASK_SETS,
    Dataset,
    load_dataset,
)
from .profiles import make_experiment, make_profile
from .run import run_task
from .scoring import (
    aggregate,
    dump,
    exact_match,
    judge_answer,
    official_record,
    openai_chat,
)


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    root.add_argument(
        "command", choices=("list", "plan", "run", "judge", "score", "rescore")
    )
    root.add_argument(
        "--babyvision-root",
        type=Path,
        default=os.environ.get("BABYVISION_ROOT"),
        help="Checkout of UniPat-AI/BabyVision at the pinned revision "
        "(default $BABYVISION_ROOT)",
    )
    root.add_argument(
        "--allow-unpinned",
        action="store_true",
        help="Record the checkout's own revision instead of requiring the pin",
    )
    root.add_argument("--task-id", type=int, action="append", help="Repeatable")
    root.add_argument("--subtype", action="append", help="Repeatable official subtype")
    root.add_argument(
        "--task-set",
        choices=tuple(TASK_SETS),
        default=DEFAULT_TASK_SET,
        help="tracking48 (default): Maze, Connect the lines, Lines Observation; "
        "visual-tracking: the whole type (83); full: all 388",
    )
    add_backend_arguments(root, backends=("codex",))
    root.add_argument("--model")
    root.add_argument("--effort")
    root.add_argument("--passes", type=int, default=1, help="Answers per question")
    root.add_argument("--output", type=Path)
    root.add_argument("--backend-segments", type=int)
    root.add_argument("--tool-calls", type=int)
    judge = root.add_argument_group("judge")
    judge.add_argument("--runs", type=Path, action="append", help="Run output dirs")
    judge.add_argument("--judge-base-url", help="OpenAI-compatible API root")
    judge.add_argument("--judge-model")
    judge.add_argument("--judge-key-env", default="JUDGE_API_KEY")
    return root


def _dataset(args: argparse.Namespace, error) -> Dataset:
    if args.babyvision_root is None:
        error("--babyvision-root (or BABYVISION_ROOT) is required")
    root = Path(args.babyvision_root)
    try:
        if not args.allow_unpinned:
            return load_dataset(root)
        from .dataset import checkout_revision

        revision = checkout_revision(root)
        if revision is None:
            # Not a checkout: the metadata hash is the only identity there is.
            unpinned = load_dataset(root, revision="unpinned")
            return load_dataset(root, revision=f"unpinned:{unpinned.fingerprint[:16]}")
        return load_dataset(root, revision=revision)
    except (OSError, RuntimeError, ValueError) as exc:
        error(str(exc))
        raise SystemExit(2) from exc


def _results(directories: list[Path]) -> list[dict[str, Any]]:
    rows = []
    seen = set()
    for directory in directories:
        for path in sorted(directory.glob("**/result.json")):
            if path.resolve() in seen:
                continue
            seen.add(path.resolve())
            row = json.loads(path.read_text(encoding="utf-8"))
            # The deterministic reading is cheap and may have improved since
            # the run; the recorded model output and key never change.
            if row.get("completed") and "ground_truth" in row and "answer_type" in row:
                row["exact_match"] = exact_match(
                    row.get("extracted_answer"),
                    row["ground_truth"],
                    answer_type=row["answer_type"],
                )
            row["_path"] = str(path)
            rows.append(row)
    return rows


def _planned_runs(directory: Path) -> set[tuple[int, int]]:
    """Recover the launch plan even when workers wrote no results."""
    if not directory.is_dir():
        raise ValueError(f"Run directory does not exist: {directory}")
    expected = set()
    for path in sorted(directory.rglob("batch.json")):
        batch = json.loads(path.read_text(encoding="utf-8"))
        if batch.get("benchmark") != "BabyVision":
            continue
        passes = batch["passes"]
        if not isinstance(passes, int) or passes < 1:
            raise ValueError(f"Invalid pass count in {path}")
        expected.update(
            (task, number)
            for task in batch["questions"]
            for number in range(1, passes + 1)
        )
    for path in sorted(directory.rglob("plan.json")):
        plan = json.loads(path.read_text(encoding="utf-8"))
        rows = plan.get("runs", []) if isinstance(plan, dict) else plan
        expected.update((row["task_id"], row["pass"]) for row in rows)
    return expected


def _score(directories: list[Path]) -> list:
    results = _results(directories)
    expected = set()
    for directory in directories:
        plan = _planned_runs(directory)
        actual = {
            (row["task_id"], row.get("pass", 1))
            for row in results
            if Path(row["_path"]).resolve().is_relative_to(directory.resolve())
        }
        if plan and not actual <= plan:
            raise ValueError(f"Results do not match the launch plan in {directory}")
        # Older outputs may predate saved plans; retain their observed cohort.
        expected.update(plan or actual)
    tasks = {task for task, _ in expected}
    passes = max((number for _, number in expected), default=1)
    if expected != {(task, p) for task in tasks for p in range(1, passes + 1)}:
        raise ValueError("Question sets differ across passes; score these runs separately")
    return _summary(results, expected=expected)


def _summary(
    results: list[dict[str, Any]], *, expected: set[tuple[int, int]]
) -> list:
    summary = aggregate(
        [{k: v for k, v in row.items() if k != "_path"} for row in results],
        planned=len({task for task, _ in expected}),
        passes=max((number for _, number in expected), default=1),
    )
    completed = {
        (row["task_id"], row.get("pass", 1))
        for row in results
        if row.get("completed")
    }
    summary["incomplete"] = sorted(
        f"{task}/p{number}" for task, number in expected - completed
    )
    return [summary]


def main(argv: list[str] | None = None) -> int:
    cli = parser()
    args = cli.parse_args(argv)
    if args.command == "judge":
        return _judge(args, cli.error)
    if args.command == "rescore":
        # Persist recomputed exact-match scores for downstream readers.
        if not args.runs:
            cli.error("rescore requires --runs")
        changed = 0
        for row in _results(args.runs):
            path = Path(row.pop("_path"))
            stored = json.loads(path.read_text(encoding="utf-8"))
            if stored.get("exact_match") != row.get("exact_match"):
                stored["exact_match"] = row["exact_match"]
                path.write_text(dump(stored), encoding="utf-8")
                changed += 1
        print(json.dumps({"rescored": changed}))
        return 0
    if args.command == "score":
        if not args.runs:
            cli.error("score requires --runs")
        try:
            summary = _score(args.runs)
        except (OSError, ValueError, KeyError, TypeError) as exc:
            cli.error(str(exc))
        print(dump(summary), end="")
        return 0
    dataset = _dataset(args, cli.error)
    try:
        questions = dataset.select(
            task_ids=args.task_id, subtypes=args.subtype, task_set=args.task_set
        )
    except ValueError as exc:
        cli.error(str(exc))
    if args.command == "list":
        print(
            json.dumps(
                {
                    "benchmark_revision": dataset.revision,
                    "metadata_sha256": dataset.fingerprint,
                    "pinned_revision": BABYVISION_REVISION,
                    "count": len(questions),
                    "questions": [question.manifest() for question in questions],
                },
                indent=2,
            )
        )
        return 0
    if not all((args.backend, args.model, args.effort)):
        cli.error("plan/run require --backend, --model, and --effort")
    if any(
        value is not None and value < 1
        for value in (
            args.passes,
            args.backend_segments,
            args.tool_calls,
            args.task_timeout,
        )
    ):
        cli.error("Passes, runtime budgets and timeouts must be positive")
    validate_backend_arguments(args, cli.error)
    transport = transport_for(args.backend)
    plans: list[dict[str, Any]] = []
    for question in questions:
        profile = make_profile(question, backend=transport)
        experiment = make_experiment(
            profile,
            question,
            backend=transport,
            model=args.model,
            effort=args.effort,
            revision=dataset.revision,
            image={"file": question.image.name},
            backend_segments=args.backend_segments,
            tool_calls=args.tool_calls,
        )
        for number in range(1, args.passes + 1):
            plans.append(
                {
                    "task_id": question.task_id,
                    "pass": number,
                    **experiment.manifest(),
                }
            )
    if args.command == "plan":
        print(json.dumps({"runs": plans}, indent=2))
        return 0
    if args.output is None:
        cli.error("run requires a new --output directory")
    backend_factory, provenance = prepare_backend(
        args, cli.error, check=check_transport
    )
    args.output.mkdir(mode=0o700, parents=True, exist_ok=False)
    plan_file = args.output / "plan.json"
    plan_file.write_text(json.dumps(plans, indent=2) + "\n", encoding="utf-8")
    plan_file.chmod(0o600)
    results: list[dict[str, Any]] = []
    failed = False
    expected = {(plan["task_id"], plan["pass"]) for plan in plans}
    for plan in plans:
        question = dataset.question(plan["task_id"])
        result = run_task(
            question,
            dataset.answers[question.task_id],
            directory=args.output
            / f"task{question.task_id}__p{plan['pass']}",
            backend=transport,
            model=args.model,
            effort=args.effort,
            backend_factory=backend_factory,
            revision=dataset.revision,
            fingerprint=dataset.fingerprint,
            pass_number=plan["pass"],
            backend_segments=args.backend_segments,
            tool_calls=args.tool_calls,
            transport_provenance=provenance,
        )
        results.append(result)
        print(
            json.dumps(
                {
                    key: result.get(key)
                    for key in (
                        "task_id",
                        "subtype",
                        "pass",
                        "completed",
                        "extracted_answer",
                        "exact_match",
                        "error",
                    )
                }
            ),
            flush=True,
        )
        summary_file = args.output / "summary.json"
        summary_file.write_text(
            dump(_summary(results, expected=expected)),
            encoding="utf-8",
        )
        summary_file.chmod(0o600)
        # A failed question is recorded and the suite goes on; the exit code
        # says so at the end. Incorrect answers are never rerun.
        failed = failed or not result["completed"]
    return 1 if failed else 0


def _judge(args: argparse.Namespace, error) -> int:
    """Apply the official judge to finished runs; the verdicts join their results."""
    if not args.runs:
        error("judge requires --runs")
    if not (args.judge_base_url and args.judge_model):
        error("judge requires --judge-base-url and --judge-model")
    key = os.environ.get(args.judge_key_env)
    if not key:
        error(f"judge requires the {args.judge_key_env} environment variable")
    complete = openai_chat(args.judge_base_url, key, args.judge_model)
    identity = {"base_url": args.judge_base_url, "model": args.judge_model}
    results = _results(args.runs)
    judged = 0
    for row in results:
        path = Path(row.pop("_path"))
        if row.get("judged") and row.get("judge") == identity:
            continue
        if not row.get("completed"):
            continue
        verdict = judge_answer(
            complete,
            question=row["question"],
            ground_truth=row["ground_truth"],
            extracted=row.get("extracted_answer"),
        )
        row.update(verdict, judged=True, judge=identity)
        path.write_text(dump(row), encoding="utf-8")
        judged += 1
    for directory in args.runs:
        rows = [
            {k: v for k, v in r.items() if k != "_path"} for r in _results([directory])
        ]
        for number in sorted({r.get("pass", 1) for r in rows}):
            official = [official_record(r) for r in rows if r.get("pass", 1) == number]
            out = directory / f"official_results_pass{number}.json"
            out.write_text(dump(official), encoding="utf-8")
    print(json.dumps({"judged": judged, "judge": identity}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/benchmarks/babyvision/dataset.py

````text
"""The pinned official dataset, split into what the player may see and what it may not.

The official metadata carries the answer (`blankAns`, `choiceAns`) and a
worked solution (`coT`) beside every question. Only the question, its choices
and its image are public; the rest never leaves this module except through
the host-side answer key.
"""

from __future__ import annotations

import hashlib
import io
import json
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping

from vista.core.contracts import Observation, ObservationBundle, Visual

BABYVISION_REVISION = "7f92fd4b1dc1c68b7b936a9bc09c68b4a944a55a"
DATASET_DIR = Path("data") / "babyvision_data"
METADATA = "meta_data.jsonl"
VIEW = "question_image"

# The fields that may reach the player, by their official names.
PUBLIC_FIELDS = ("taskId", "type", "subtype", "image", "question", "ansType", "options")
ANSWER_TYPES = ("blank", "choice")
IMAGE_TYPES = {"image/png", "image/jpeg", "image/webp"}

# Named subsets; every other selection is explicit task ids or subtypes.
TASK_SETS: dict[str, tuple[str, ...] | None] = {
    "full": None,
    # The whole Visual Tracking type: 83 questions in five subtypes.
    "visual-tracking": (
        "Recognize numbers and letters",
        "Maze",
        "Connect the lines",
        "Metro map",
        "Lines Observation",
    ),
    # Default subset: 48 questions across three Visual Tracking subtypes.
    "tracking48": ("Maze", "Connect the lines", "Lines Observation"),
}
DEFAULT_TASK_SET = "tracking48"


@dataclass(frozen=True)
class Question:
    """One public question: exactly the official inputs, nothing derived."""

    task_id: int
    category: str
    subtype: str
    image: Path
    question: str
    answer_type: str
    options: tuple[str, ...]

    def manifest(self) -> dict[str, Any]:
        return {
            "task_id": self.task_id,
            "type": self.category,
            "subtype": self.subtype,
            "image": self.image.name,
            "answer_type": self.answer_type,
            "options": list(self.options),
        }


@dataclass(frozen=True)
class Dataset:
    root: Path
    revision: str
    # sha256 of meta_data.jsonl: two checkouts with equal counts are the same
    # snapshot only if this agrees.
    fingerprint: str
    questions: tuple[Question, ...]
    # Host-only: the official ground truth per task id.
    answers: Mapping[int, str]

    def question(self, task_id: int) -> Question:
        for question in self.questions:
            if question.task_id == task_id:
                return question
        raise KeyError(f"Unknown BabyVision task id {task_id}")

    def select(
        self,
        *,
        task_ids: list[int] | None = None,
        subtypes: list[str] | None = None,
        task_set: str = "full",
    ) -> tuple[Question, ...]:
        """Explicit ids, then explicit subtypes, then the named set, in that order."""
        if task_set not in TASK_SETS:
            raise ValueError(f"Unknown task set {task_set!r}")
        if task_ids:
            known = {question.task_id for question in self.questions}
            missing = sorted(set(task_ids) - known)
            if missing:
                raise ValueError(f"Unknown BabyVision task ids: {missing}")
            wanted = set(task_ids)
            return tuple(q for q in self.questions if q.task_id in wanted)
        selected = subtypes or TASK_SETS[task_set]
        if selected is None:
            return self.questions
        available = {question.subtype for question in self.questions}
        missing = sorted(set(selected) - available)
        if missing:
            raise ValueError(f"Unknown BabyVision subtypes: {missing}")
        return tuple(q for q in self.questions if q.subtype in set(selected))


def checkout_revision(root: Path) -> str | None:
    """The git revision of the dataset checkout, or None outside a checkout."""
    completed = subprocess.run(
        ["git", "-C", str(root), "rev-parse", "HEAD"],
        text=True,
        capture_output=True,
        check=False,
    )
    revision = completed.stdout.strip()
    if completed.returncode != 0 or not revision:
        return None
    return revision


def load_dataset(root: Path, *, revision: str | None = None) -> Dataset:
    """Load the official metadata from a checkout.

    `revision` names what the caller believes the checkout is; when omitted
    it is read from git and must equal the pin. Equal counts between local,
    GitHub and Hugging Face copies do not make them the same snapshot, so
    the metadata's own hash is recorded beside the revision either way.
    """
    root = root.expanduser().resolve()
    path = root / DATASET_DIR / METADATA
    if not path.is_file():
        raise FileNotFoundError(
            f"BabyVision metadata not found at {path}; unpack data/babyvision_data.zip"
        )
    fingerprint = hashlib.sha256(path.read_bytes()).hexdigest()
    if revision is None:
        revision = checkout_revision(root)
        if revision is None:
            raise RuntimeError(f"{root} is not a git checkout of BabyVision")
        if revision != BABYVISION_REVISION:
            raise RuntimeError(
                f"BabyVision must be pinned to {BABYVISION_REVISION}; found {revision}"
            )
    questions: list[Question] = []
    answers: dict[int, str] = {}
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            payload = json.loads(line)
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"Invalid BabyVision metadata JSON on line {number}"
            ) from exc
        if not isinstance(payload, Mapping):
            raise ValueError(f"BabyVision metadata line {number} is not an object")
        question, answer = _parse(path.parent, payload, number)
        if question.task_id in answers:
            raise ValueError(f"Duplicate BabyVision task id {question.task_id}")
        questions.append(question)
        answers[question.task_id] = answer
    if not questions:
        raise ValueError("BabyVision metadata contains no tasks")
    return Dataset(root, revision, fingerprint, tuple(questions), answers)


def _parse(root: Path, payload: Mapping[str, Any], number: int) -> tuple[Question, str]:
    try:
        task_id = int(payload["taskId"])
        category = _text(payload["type"], "type")
        subtype = _text(payload["subtype"], "subtype")
        question = _text(payload["question"], "question")
        answer_type = _text(payload["ansType"], "ansType")
        relative = Path(_text(payload["image"], "image"))
    except (KeyError, TypeError, ValueError) as exc:
        raise ValueError(
            f"Invalid BabyVision metadata on line {number}: {exc}"
        ) from exc
    if answer_type not in ANSWER_TYPES:
        raise ValueError(f"Unsupported BabyVision answer type on line {number}")
    image = (root / relative).resolve()
    if not image.is_relative_to(root) or not image.is_file():
        raise ValueError(f"Invalid BabyVision image on line {number}: {relative}")
    raw_options = payload.get("options", [])
    if not isinstance(raw_options, list) or not all(
        isinstance(option, str) and option.strip() for option in raw_options
    ):
        raise ValueError(f"Invalid BabyVision options on line {number}")
    options = tuple(option.strip() for option in raw_options)
    # The official evaluator's answer key, verbatim: a choice letter or the
    # blank answer text.
    if answer_type == "choice":
        try:
            index = int(payload["choiceAns"])
        except (KeyError, TypeError, ValueError) as exc:
            raise ValueError(
                f"Invalid BabyVision choice answer on line {number}"
            ) from exc
        if not 0 <= index < len(options):
            raise ValueError(f"BabyVision choice answer out of range on line {number}")
        answer = chr(65 + index)
    else:
        if options:
            raise ValueError(f"BabyVision blank task has choices on line {number}")
        answer = _text(payload.get("blankAns"), "blankAns")
    return (
        Question(task_id, category, subtype, image, question, answer_type, options),
        answer,
    )


def _text(value: Any, label: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{label} must be a non-empty string")
    return value.strip()


def question_visual(question: Question) -> Visual:
    """The official image file's own bytes; the model sees what the API saw."""
    from PIL import Image

    data = question.image.read_bytes()
    try:
        with Image.open(io.BytesIO(data)) as image:
            width, height = image.size
            mime_type = Image.MIME.get(image.format or "")
    except OSError as exc:
        raise ValueError(f"Could not read BabyVision image {question.image}") from exc
    if mime_type not in IMAGE_TYPES:
        raise ValueError(f"Unsupported BabyVision image format at {question.image}")
    return Visual(
        VIEW, f"babyvision-{question.task_id}", data, width, height, mime_type
    )


def question_observation(question: Question) -> ObservationBundle:
    return ObservationBundle((Observation("question", (question_visual(question),)),))

````


## vista-c97c354/src/vista/benchmarks/babyvision/official.py

````text
"""The official MLLM evaluation recipe, copied from `babyvision_eval` at the pin.

One request per question: the image, then the question text with the boxed
instruction. The last `\\boxed{}` is the answer; an LLM judge compares it with
the ground truth. What is verbatim here is the prompt text, the choice
format, the extraction pattern and the judge prompt; the transport is not.
"""

from __future__ import annotations

from .dataset import Question

ANSWER_INSTRUCTION = (
    "Think about the question and give your final answer in \\boxed{Answer} format."
)

# babyvision_eval/utils.py::LLM_JUDGE_PROMPT, verbatim.
JUDGE_PROMPT = """You are a careful and strict evaluator. You will be given:

1. **Question**
2. **Ground Truth Answer** (correct answer)
3. **Model Output** (answer from another model)

**Your goal:** Determine if the Model Output **accurately matches** the Ground Truth Answer in meaning.

* Matching means: the facts, entities, and key details are equivalent, even if phrasing differs.
* Not matching means: the Model Output is wrong, incomplete, contains extra incorrect facts, or changes the meaning.

**Process (internal reasoning):**

1. Read and understand the Question, Ground Truth Answer, and Model Output.
2. Ignore small wording differences, formatting, or synonyms.
3. If all factual content matches, conclude `1`. Otherwise, conclude `0`.

**Important:**

* Think through your decision step-by-step **internally** before responding.
* In your final output, return **only** True or False, with no extra text or explanation.

**Output format:**

True

or

False

**Input:**

Question: {question},
Ground Truth Answer: {groundtruth},
Model Output: {modeloutput}
"""

def format_choices(options: tuple[str, ...]) -> str:
    """babyvision_eval/utils.py::format_choices."""
    if not options:
        return ""
    formatted = ""
    for index, choice in enumerate(options):
        formatted += f"({chr(65 + index)}) {choice}\n"
    return formatted.strip()


def question_text(question: Question) -> str:
    """The exact text the official script sends beside the image."""
    text = question.question
    if question.answer_type == "choice":
        text = text + "\nChoices:\n" + format_choices(question.options)
    return text + "\n" + ANSWER_INSTRUCTION


def extract_boxed_answer(text: str | None) -> str | None:
    """babyvision_eval/utils.py::extract_boxed_answer, on the same `regex` engine."""
    if text is None:
        return None
    try:
        import regex
    except ImportError as exc:  # pragma: no cover - environment
        raise RuntimeError(
            "The official answer extraction needs the `regex` package: "
            "pip install -e '.[babyvision]'"
        ) from exc
    pattern = r"\\boxed\{((?:[^{}]|{(?:[^{}]|{.*})*})*)\}"
    matches = regex.findall(pattern, text)
    if matches:
        return matches[-1]
    pattern_alt = r"<\|begin_of_box\|>(.*?)<\|end_of_box\|>"
    matches_alt = regex.findall(pattern_alt, text)
    if matches_alt:
        return matches_alt[-1].strip()
    return None


def judge_prompt(question: str, ground_truth: str, extracted: str | None) -> str:
    """The judge sees the extracted answer, as the official script sends it."""
    return JUDGE_PROMPT.format(
        question=question, groundtruth=ground_truth, modeloutput=extracted
    )


def parse_judge(reply: str) -> bool | None:
    """The official reading of a judge reply; None is its unparseable warning."""
    text = str(reply).strip().lower()
    if "true" in text:
        return True
    if "false" in text:
        return False
    return None

````


## vista-c97c354/src/vista/benchmarks/babyvision/profiles.py

````text
"""VISTA on a static question: one image, one question, one final answer."""

from __future__ import annotations

from typing import Any

from vista.core.profiles import (
    AgentProfile,
    CompactionMode,
    ContextMode,
    Experiment,
    InteractionMode,
    PromptBundle,
    SessionPolicy,
)

from .dataset import Question
from .official import question_text

PROTOCOL = "babyvision-mllm-one-question-final-answer"
EVALUATOR = (
    "last-boxed-answer + normalized-exact-match; official llm-judge as a "
    "separate labeled step"
)


# What the agent is told; the question itself is the first input.
SHARED_INSTRUCTIONS = (
    "You are answering one visual question about one supplied image. The image "
    "is the only evidence; there is no game, no environment action, and nothing "
    "to explore beyond it. Your final response is your answer to the question "
    "and ends the task."
)

VISTA_METHOD_OPENING = (
    "# Visual question task\n\n"
    "Before answering, gather the evidence the question actually needs from "
    "the supplied image."
)
VISTA_METHOD_TOOLS = (
    " Use `inspect` to view enlarged regions where detail matters, and "
    "`read_pixels` to measure exact colors where a judgement depends on "
    "them. Say what each view is meant to settle, then check whether it did."
)
VISTA_METHOD_CLOSING = (
    "Build a short, revisable account of what the image shows and update it as "
    "the evidence changes what is supported. Answer only when the evidence "
    "supports one answer."
)


def vista_method() -> str:
    return VISTA_METHOD_OPENING + VISTA_METHOD_TOOLS + "\n\n" + VISTA_METHOD_CLOSING


def system_prompt() -> str:
    return SHARED_INSTRUCTIONS + "\n\n" + vista_method()


def make_profile(
    question: Question,
    *,
    backend: str = "codex",
) -> AgentProfile:
    if backend not in {"codex", "claude"}:
        raise ValueError("Unknown backend")
    initial = question_text(question)
    return AgentProfile(
        "babyvision-mllm/vista/inspect-read-pixels",
        ("inspect", "read_pixels"),
        PromptBundle(system_prompt(), initial),
        # One question per context; native compaction if it ever runs that long.
        SessionPolicy(
            context=ContextMode.CONTINUOUS,
            interaction=InteractionMode.TOOLS,
            compaction=CompactionMode.NATIVE,
        ),
    )


def make_experiment(
    profile: AgentProfile,
    question: Question,
    *,
    backend: str,
    model: str,
    effort: str,
    revision: str,
    image: dict[str, Any],
    backend_segments: int | None = None,
    tool_calls: int | None = None,
) -> Experiment:
    return Experiment(
        "BabyVision",
        revision,
        PROTOCOL,
        profile,
        backend,
        model,
        effort,
        {
            "track": "mllm",
            "task_id": question.task_id,
            "type": question.category,
            "subtype": question.subtype,
            "answer_type": question.answer_type,
            "pixels": "original image file bytes",
            "coordinate_scale": 1.0,
            "image": dict(image),
            "question_format": "official question, choices and boxed instruction",
        },
        {
            # The first final response is the answer; there is no second.
            "final_answers": 1,
            **(
                {"backend_segments": backend_segments}
                if backend_segments is not None
                else {}
            ),
            **({"tool_calls": tool_calls} if tool_calls is not None else {}),
        },
        EVALUATOR,
    )

````


## vista-c97c354/src/vista/benchmarks/babyvision/run.py

````text
"""Run one question end to end and score it on the host."""

from __future__ import annotations

import importlib.metadata
import time
import traceback
from pathlib import Path
from typing import Any, Callable

from vista.backends.preflight import source_fingerprint
from vista.backends.session import BackendSession
from vista.core.artifacts import ArtifactStore
from vista.core.json import canonical
from vista.core.profiles import Phase
from vista.core.runtime import BudgetExhausted, TaskRuntime

from .dataset import Question, question_observation
from .official import extract_boxed_answer
from .profiles import PROTOCOL, make_experiment, make_profile
from .scoring import exact_match
from .session import BabyVisionSession


def answer_loop(
    session: BabyVisionSession, runtime: TaskRuntime, backend: BackendSession
) -> None:
    """One model run, then its final message is the answer.

    The official script sends one request and takes one reply. A CLI agent may
    take several model turns inside that one run, but it gets no second run:
    an empty final message is recorded as no answer, not re-prompted.
    """
    try:
        task_input = runtime.prepare_input(Phase.INITIAL)
        result = backend.run(task_input)
    except BudgetExhausted:
        return
    if runtime.terminal or result.returncode != 0 or runtime.failure:
        return
    runtime.submit(result.final_message)


def run_task(
    question: Question,
    ground_truth: str,
    *,
    directory: Path,
    backend: str,
    model: str,
    effort: str,
    backend_factory: Callable[[TaskRuntime, Path], BackendSession],
    revision: str,
    fingerprint: str | None = None,
    pass_number: int = 1,
    backend_segments: int | None = None,
    tool_calls: int | None = None,
    transport_provenance: dict[str, Any] | None = None,
) -> dict[str, Any]:
    if type(pass_number) is not int or pass_number < 1:
        raise ValueError("pass_number must be a positive integer")
    root = directory.resolve()
    artifacts = ArtifactStore(root)
    observation = question_observation(question)
    visual = observation.observations[0].views[0]
    image = {
        "file": question.image.name,
        "width": visual.width,
        "height": visual.height,
        "mime_type": visual.mime_type,
        "sha256": visual.manifest()["sha256"],
    }
    artifacts.manifest(
        {
            "benchmark": "BabyVision",
            "track": "mllm",
            "protocol": PROTOCOL,
            "benchmark_revision": revision,
            "metadata_sha256": fingerprint,
            "question": question.manifest(),
            "image": image,
            "pass": pass_number,
            "backend": backend,
            "model": model,
            "effort": effort,
            "transport": transport_provenance
            or {"validation": "caller-supplied-backend"},
            "source_files": source_fingerprint(),
            "dependencies": {
                name: importlib.metadata.version(name) for name in ("Pillow", "regex")
            },
        }
    )
    session = None
    runtime = None
    backend_session = None
    error = None
    result: dict[str, Any] = {}
    started = time.monotonic()
    try:
        session = BabyVisionSession(question, observation=observation)
        profile = make_profile(
            question, backend=backend
        )
        experiment = make_experiment(
            profile,
            question,
            backend=backend,
            model=model,
            effort=effort,
            revision=revision,
            image=image,
            backend_segments=backend_segments,
            tool_calls=tool_calls,
        )
        runtime = TaskRuntime(session, experiment, artifact_dir=root / "artifacts")
        backend_session = backend_factory(runtime, root / "transport")
        answer_loop(session, runtime, backend_session)
        result = session.result()
        error = runtime.failure
    except Exception:
        error = "run_exception"
        artifacts.record("private_failure", {"traceback": traceback.format_exc()})
        if session is not None:
            result = session.result()
    finally:
        if runtime is not None:
            try:
                runtime.close()
            except Exception:
                error = "cleanup_failure"
                artifacts.record(
                    "private_failure", {"traceback": traceback.format_exc()}
                )
        elif session is not None:
            session.close()
    for key in ("question", "answered", "raw_output"):
        result.setdefault(key, None)
    completed = bool(result.get("answered")) and error is None
    extracted = extract_boxed_answer(result.get("raw_output")) if completed else None
    result.update(
        {
            "task_id": question.task_id,
            "type": question.category,
            "subtype": question.subtype,
            "answer_type": question.answer_type,
            "pass": pass_number,
            "benchmark_revision": revision,
            "protocol": PROTOCOL,
            "backend": backend,
            "model": model,
            "effort": effort,
            "completed": completed,
            "error": error,
            "extracted_answer": extracted,
            # Host-side only: the run directory is never mounted for the player.
            "ground_truth": ground_truth,
            "exact_match": exact_match(
                extracted, ground_truth, answer_type=question.answer_type
            ),
            "judged": False,
            "llm_judge_result": None,
            "usage": runtime.usage if runtime is not None else {},
            "backend_usage": backend_session.usage_reports
            if backend_session is not None
            else [],
            "elapsed_seconds": time.monotonic() - started,
        }
    )
    path = root / "result.json"
    path.write_text(canonical(result) + "\n", encoding="utf-8")
    path.chmod(0o600)
    return result

````


## vista-c97c354/src/vista/benchmarks/babyvision/scoring.py

````text
"""Host-side scoring: a deterministic match now, the official judge separately.

The official score is an LLM judge's verdict on the extracted answer. That
judge is a paid model call with its own identity, so it is a separate step
(`judge`) whose output is labeled as such. The exact match reported with each
run is a strict deterministic reading and is never called the official score.
"""

from __future__ import annotations

import json
import re
import statistics
import unicodedata
from typing import Any, Callable, Mapping

import requests

from .official import judge_prompt, parse_judge

# babyvision_eval/compute_score.py::type_match, for the subtype ordering.
TYPE_ORDER = {
    "Fine-grained Discrimination": "1",
    "Visual Tracking": "2",
    "Spatial Perception": "3",
    "Visual Pattern Recognition": "4",
}


def choice_label(value: str) -> str | None:
    """The letter a choice answer names: `B`, `(B)`, `B.`, `\\text{B}`, `option b`."""
    candidate = value.strip()
    wrapper = re.fullmatch(r"\\(?:text|mathrm|mathbf)\s*\{(.*)\}", candidate, re.DOTALL)
    if wrapper:
        candidate = wrapper.group(1).strip()
    # After the letter: whitespace, punctuation, a TeX spacing/text command
    # (such as `(C)\ \text{...}`), or the end.
    match = re.match(
        r"^(?:option\s*)?[\(\[]?\s*([a-z])\s*[\)\]]?(?:\s|[-:.,\\]|$)",
        candidate,
        flags=re.IGNORECASE,
    )
    return match.group(1).upper() if match else None


TEX_WRAPPERS = (
    r"\\(?:text|textbf|textit|mathrm|mathbf|mathit|operatorname)\s*\{([^{}]*)\}"
)


def normalize(value: str) -> str:
    """Case, width, whitespace and TeX wrapping do not make an answer different.

    For example, `\\text{A}` normalizes to `a`.
    """
    text = unicodedata.normalize("NFKC", value).casefold().strip()
    text = text.replace("，", ",").replace("–", "-").replace("—", "-")
    previous = None
    while previous != text:
        previous = text
        # Unwrapped with a space on each side so `1\\to\\text{X}` keeps its
        # word boundaries; the list split below drops the spaces again.
        text = re.sub(TEX_WRAPPERS, r" \1 ", text)
    text = re.sub(r"\\(?:[,;:!]|\s|quad\b|qquad\b)", "", text)
    # TeX-escaped punctuation is the punctuation: `\\#3` is `#3`.
    text = re.sub(r"\\([#%&_$])", r"\1", text)
    # `1\\to X`, `1 -> X`, `1 → X` and `1 - X` all pair 1 with X.
    text = re.sub(r"\\(?:to|rightarrow)\b|->|→|—|–", "-", text)
    text = re.sub(r"\s*-\s*", "-", text)
    # Word lists are compared as lists: "better late than never" and
    # "Better,late,than,never" are the same answer, "10,7,7" and "10,4,10" are
    # not, and "(4,7)" keeps its shape on both sides.
    text = ",".join(part for part in re.split(r"[,;\s]+", text) if part)
    text = text.strip("`\"'")
    # One pair of brackets around the whole answer is presentation:
    # `(4,2,6,5)` is `4,2,6,5`. `(4,7)` against `(4,7)` loses both, equally.
    if text and text[:1] in "([{" and text[-1:] == {"(": ")", "[": "]", "{": "}"}[text[0]]:
        inner = text[1:-1]
        depth = 0
        for char in inner:
            depth += char in "([{"
            depth -= char in ")]}"
            if depth < 0:
                break
        else:
            text = inner
    return text


def exact_match(extracted: str | None, expected: str, *, answer_type: str) -> bool:
    if extracted is None:
        return False
    if answer_type == "choice":
        return choice_label(extracted) == expected.upper()
    normalized = normalize(extracted)
    return bool(normalized) and normalized == normalize(expected)


# -- the official judge ---------------------------------------------------------


class JudgeError(RuntimeError):
    pass


def openai_chat(
    base_url: str, api_key: str, model: str, *, timeout: float = 1800.0
) -> Callable[[str], str]:
    """The official script's judge call: one user message, the reply text back."""
    endpoint = base_url.rstrip("/") + "/chat/completions"

    def complete(prompt: str) -> str:
        response = requests.post(
            endpoint,
            headers={"Authorization": f"Bearer {api_key}"},
            json={"model": model, "messages": [{"role": "user", "content": prompt}]},
            timeout=timeout,
        )
        if response.status_code != 200:
            raise JudgeError(f"Judge returned HTTP {response.status_code}")
        try:
            return str(response.json()["choices"][0]["message"]["content"])
        except (ValueError, KeyError, IndexError, TypeError) as exc:
            raise JudgeError("Judge reply was not a chat completion") from exc

    return complete


def judge_answer(
    complete: Callable[[str], str],
    *,
    question: str,
    ground_truth: str,
    extracted: str | None,
) -> dict[str, Any]:
    """One verdict, with the raw reply kept so a parse can be audited."""
    reply = complete(judge_prompt(question, ground_truth, extracted))
    verdict = parse_judge(reply)
    return {
        "judge_reply": reply,
        # The official script scores an unparseable reply as False.
        "llm_judge_result": bool(verdict),
        "judge_parsed": verdict is not None,
    }


def official_record(result: Mapping[str, Any]) -> dict[str, Any]:
    """One row in the layout `compute_score.py` reads.

    A row without a judge verdict (a failed run, or one not judged yet) is
    False, as the official script scores its own failed attempts; the exact
    match never stands in for the judge here.
    """
    return {
        "Id": result["task_id"],
        "Question": result["question"],
        "ModelResult": result.get("raw_output") or "",
        "GroundTruth": result["ground_truth"],
        "ExtractedAnswer": result.get("extracted_answer") or "",
        "LLMJudgeResult": bool(result.get("judged"))
        and bool(result.get("llm_judge_result")),
        "Type": result["type"],
        "Subtype": result["subtype"],
    }


# -- aggregation -------------------------------------------------------------------


def accuracy(
    rows: list[Mapping[str, Any]], key: str, *, planned: int | None = None
) -> dict[str, Any]:
    """compute_score.py's reading: every planned question counts, errors are wrong.

    A run that never wrote a result (killed, crashed before its record) is
    still a planned question, so `planned` is the denominator when known.
    Category scores are unavailable when missing records leave their denominators
    unknown.
    """
    total = max(len(rows), planned or 0)
    correct = sum(1 for row in rows if row.get(key))
    by_type: dict[str, dict[str, int]] = {}
    by_subtype: dict[str, dict[str, int]] = {}
    for row in rows:
        category = row["type"]
        label = f"{TYPE_ORDER.get(category, '0')}{category}/{row['subtype']}"
        for table, name in ((by_type, category), (by_subtype, label)):
            cell = table.setdefault(name, {"total": 0, "correct": 0})
            cell["total"] += 1
            cell["correct"] += int(bool(row.get(key)))
    return {
        "total": total,
        "correct": correct,
        "accuracy": correct / total if total else None,
        "by_type": {
            name: {**cell, "accuracy": cell["correct"] / cell["total"]}
            for name, cell in sorted(by_type.items())
        }
        if len(rows) == total
        else None,
        "by_subtype": {
            name: {**cell, "accuracy": cell["correct"] / cell["total"]}
            for name, cell in sorted(by_subtype.items())
        }
        if len(rows) == total
        else None,
    }


def aggregate(results: list[Mapping[str, Any]], *, planned: int, passes: int) -> dict:
    """Summary over passes; a missing run is a wrong answer, never dropped."""
    if planned < 0 or passes < 1:
        raise ValueError("Planned questions must be nonnegative and passes positive")
    actual = [(r["task_id"], r.get("pass", 1)) for r in results]
    if len(actual) != len(set(actual)):
        raise ValueError("Duplicate question/pass results; score independent runs separately")
    if any(number < 1 or number > passes for _, number in actual):
        raise ValueError("Result pass is outside the planned range")
    if len({task for task, _ in actual}) > planned:
        raise ValueError("More result questions than planned")
    completed = [row for row in results if row.get("completed")]
    key = (
        "llm_judge_result"
        if completed and all(row.get("judged") for row in completed)
        else "exact_match"
    )
    per_pass = []
    for number in range(1, passes + 1):
        rows = [row for row in results if row.get("pass", 1) == number]
        per_pass.append(
            {
                "pass": number,
                "completed": sum(1 for r in rows if r.get("completed")),
                "missing": max(planned - len(rows), 0),
                **accuracy(rows, key, planned=planned),
            }
        )
    values = [p["accuracy"] for p in per_pass if p["accuracy"] is not None]
    return {
        "score_source": "official-llm-judge"
        if key == "llm_judge_result"
        else "normalized-exact-match",
        "planned": planned * passes,
        "completed": sum(1 for r in results if r.get("completed")),
        "answered": sum(1 for r in results if r.get("extracted_answer") is not None),
        "correct": sum(1 for r in results if r.get(key)),
        "mean_accuracy": statistics.fmean(values) if values else None,
        "std_accuracy": statistics.pstdev(values)
        if len(values) > 1
        else (0.0 if values else None),
        "passes": per_pass,
        "incomplete": sorted(
            f"{r['task_id']}/p{r.get('pass', 1)}"
            for r in results
            if not r.get("completed")
        ),
    }


def dump(value: Any) -> str:
    return json.dumps(value, ensure_ascii=True, indent=2, sort_keys=True) + "\n"

````


## vista-c97c354/src/vista/benchmarks/babyvision/session.py

````text
"""One BabyVision question: an immutable image and a final answer, nothing else."""

from __future__ import annotations

from typing import Any

from vista.core.contracts import (
    Effect,
    ObservationBundle,
    PublicTask,
    SubmissionSpec,
    ToolBinding,
    ToolReply,
)

from .dataset import Question, question_observation
from .official import question_text


class BabyVisionSession:
    """No environment action exists; the model's final response is its answer.

    The session records the raw text and ends. Extraction and scoring happen
    on the host afterwards, so nothing about the answer key is reachable
    from here.
    """

    def __init__(
        self, question: Question, *, observation: ObservationBundle | None = None
    ) -> None:
        self.question = question
        observation = observation or question_observation(question)
        visual = observation.observations[0].views[0]
        self.task = PublicTask(
            f"babyvision/{question.task_id}",
            question_text(question),
            {
                "task_id": question.task_id,
                "type": question.category,
                "subtype": question.subtype,
                "answer_type": question.answer_type,
                "image": {
                    "width": visual.width,
                    "height": visual.height,
                    "mime_type": visual.mime_type,
                },
            },
            observation,
        )
        self.submission = SubmissionSpec(Effect.SUBMISSION)
        self.tools: tuple[ToolBinding, ...] = ()
        self.raw_output: str | None = None
        self.closed = False

    @property
    def answered(self) -> bool:
        return self.raw_output is not None

    def submit(self, answer: str) -> ToolReply:
        if self.answered:
            return ToolReply("The answer has already been recorded.", success=False)
        self.raw_output = answer
        event = "Answer recorded; the task is complete."
        return ToolReply(event, finished=True, event_text=event)

    def result(self) -> dict[str, Any]:
        return {
            "task_id": self.question.task_id,
            "type": self.question.category,
            "subtype": self.question.subtype,
            "answer_type": self.question.answer_type,
            "question": self.task.objective,
            "answered": self.answered,
            "raw_output": self.raw_output,
        }

    def close(self) -> None:
        self.closed = True

````


## vista-c97c354/src/vista/benchmarks/gameworld/__init__.py

````text
"""The pinned GameWorld benchmark, played through its computer-use interface."""

from .upstream import COMPUTER_USE_PROTOCOL, GAMES_REVISION, GAMEWORLD_REVISION

__all__ = ["COMPUTER_USE_PROTOCOL", "GAMES_REVISION", "GAMEWORLD_REVISION"]

````


## vista-c97c354/src/vista/benchmarks/gameworld/cli.py

````text
"""Plan or execute GameWorld computer-use tasks with VISTA."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from vista.backends.launch import (
    add_backend_arguments,
    prepare_backend,
    transport_for,
    validate_backend_arguments,
)
from vista.core.json import thaw

from .preflight import check_transport
from .profiles import action_specs, make_experiment, make_profile
from .run import run_task
from .upstream import load_upstream


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    root.add_argument("command", choices=("list", "plan", "run"))
    root.add_argument("--gameworld-root", type=Path, required=True)
    root.add_argument("--games-root", type=Path, required=True)
    root.add_argument("--game")
    root.add_argument("--task")
    add_backend_arguments(root, backends=("codex",))
    root.add_argument("--model")
    root.add_argument("--effort")
    root.add_argument("--output", type=Path)
    root.add_argument("--seed", type=int)
    root.add_argument("--backend-segments", type=int)
    root.add_argument("--tool-calls", type=int)
    root.add_argument("--headed", action="store_true")
    return root


def main(argv: list[str] | None = None) -> int:
    cli = parser()
    args = cli.parse_args(argv)
    if any(value is not None and not value.strip() for value in (args.game, args.task)):
        cli.error("Game and task identifiers cannot be empty")
    if args.task and not args.game:
        cli.error("--task requires --game")
    if args.command != "list" and not all((args.backend, args.model, args.effort)):
        cli.error("plan/run require --backend, --model, and --effort")
    if any(
        value is not None and value < 1
        for value in (
            args.backend_segments,
            args.tool_calls,
            args.task_timeout,
        )
    ):
        cli.error("Runtime budgets and timeouts must be positive")
    validate_backend_arguments(args, cli.error)
    transport = transport_for(args.backend) if args.backend else None
    upstream = load_upstream(args.gameworld_root)
    games_root = args.games_root.expanduser().resolve(strict=True)
    games = [args.game] if args.game else upstream.catalog.list_games()
    tasks = []
    for game in games:
        for task in [args.task] if args.task else upstream.catalog.list_tasks(game):
            upstream.task(game, task)
            tasks.append((game, task))
    if args.command == "list":
        print(json.dumps({"games": len(games), "tasks": tasks}, indent=2))
        return 0
    plans: list[dict[str, Any]] = []
    for game_id, task_id in tasks:
        game, task = upstream.task(game_id, task_id)
        roles = []
        for index in range(game.role_count):
            profile = make_profile(
                upstream,
                game,
                task,
                index,
                backend=transport,
            )
            experiment = make_experiment(
                profile,
                backend=transport,
                model=args.model,
                effort=args.effort,
                width=game.width,
                height=game.height,
                seed=args.seed,
                backend_segments=args.backend_segments,
                tool_calls=args.tool_calls,
            )
            roles.append(
                {
                    **experiment.manifest(),
                    "action_tools": [
                        spec.public_definition()
                        for spec in action_specs(
                            upstream, game, index
                        )
                    ],
                }
            )
        plans.append(
            {
                "game_id": game_id,
                "task_id": task_id,
                "roles": roles,
            }
        )
    if args.command == "plan":
        print(
            json.dumps(
                {
                    "runs": plans,
                },
                indent=2,
            )
        )
        return 0
    if args.output is None:
        cli.error("run requires a new --output directory")
    backend_factory, provenance = prepare_backend(
        args, cli.error, check=check_transport
    )
    args.output.mkdir(mode=0o700, parents=True, exist_ok=False)
    plan_file = args.output / "plan.json"
    plan_file.write_text(json.dumps(plans, indent=2) + "\n", encoding="utf-8")
    plan_file.chmod(0o600)
    results = []
    for plan in plans:
        result = run_task(
            upstream,
            games_root=games_root,
            game_id=plan["game_id"],
            task_id=plan["task_id"],
            directory=args.output
            / f"{plan['game_id']}__{plan['task_id']}",
            backend=transport,
            model=args.model,
            effort=args.effort,
            backend_factory=backend_factory,
            seed=args.seed,
            headless=not args.headed,
            backend_segments=args.backend_segments,
            tool_calls=args.tool_calls,
            transport_provenance=provenance,
        )
        results.append(result)
        print(
            json.dumps(
                {
                    key: result.get(key)
                    for key in (
                        "game_id",
                        "task_id",
                        "completed",
                        "scored",
                        "progress",
                        "success",
                        "error",
                    )
                }
            ),
            flush=True,
        )
        if not result["completed"]:
            break
    # Never silently drop incomplete planned runs.
    selected = results
    scored = [row for row in selected if row["scored"]]
    summary = [
            {
                "planned": len(tasks),
                "attempted": len(selected),
                "scored": len(scored),
                "complete": len(scored) == len(tasks),
                "mean_progress": sum(row["progress"] for row in scored) / len(scored)
                if len(scored) == len(tasks)
                else None,
                "success_rate": sum(row["success"] for row in scored) / len(scored)
                if len(scored) == len(tasks)
                else None,
            }
    ]
    summary_file = args.output / "summary.json"
    summary_file.write_text(
        json.dumps(thaw(summary), indent=2) + "\n", encoding="utf-8"
    )
    summary_file.chmod(0o600)
    return 0 if all(row["complete"] for row in summary) else 1


if __name__ == "__main__":
    raise SystemExit(main())

````


## vista-c97c354/src/vista/benchmarks/gameworld/computer_use.py

````text
"""The 100-decision computer-use contract: one `act` tool per role.

Physical validation and execution remain owned by the pinned GameWorld runtime.
"""

from __future__ import annotations

from typing import Any

_MAX_DURATION = 2
_KEY_COUNT = 2
_MAX_TEXT_LENGTH = 5
_MIN_DRAG_STEPS = 1
_DEFAULT_DRAG_STEPS = 10
_DEFAULT_TYPE_DURATION = 2


def _bounded_number(description: str, minimum: int, maximum: int) -> dict[str, Any]:
    # Codex 0.145 drops numeric bounds but preserves parameter descriptions.
    return {
        "type": "number",
        "minimum": minimum,
        "maximum": maximum,
        "description": f"{description} Inclusive range: {minimum} to {maximum}.",
    }


def _variant(properties: dict[str, Any], required: list[str]) -> dict[str, Any]:
    return {
        "type": "object",
        "additionalProperties": False,
        "properties": properties,
        "required": required,
    }


def action_schema(game: Any, role_index: int) -> dict[str, Any]:
    controls = game.game_roles[role_index].controls
    keys = sorted(controls.allowed_keys)
    duration = _bounded_number("Duration in seconds.", 0, _MAX_DURATION)
    x = _bounded_number("Horizontal pixels from the left edge.", 0, game.width - 1)
    y = _bounded_number("Vertical pixels from the top edge.", 0, game.height - 1)
    variants = [
        _variant({"action": {"const": "wait"}, "duration": duration}, ["action"])
    ]
    if keys:
        variants.append(
            _variant(
                {
                    "action": {"const": "press_key"},
                    "key": {"type": "string", "enum": keys},
                    "duration": duration,
                },
                ["action", "key"],
            )
        )
        if len(keys) > 1:
            variants.append(
                _variant(
                    {
                        "action": {"const": "press_keys"},
                        "keys": {
                            "type": "array",
                            "minItems": _KEY_COUNT,
                            "maxItems": _KEY_COUNT,
                            "uniqueItems": True,
                            "description": (
                                f"Exactly {_KEY_COUNT} distinct allowed keys, held "
                                "simultaneously. Opposing directions are not allowed."
                            ),
                            "items": {"type": "string", "enum": keys},
                        },
                        "duration": duration,
                    },
                    ["action", "keys"],
                )
            )
        if any(len(key) == 1 for key in keys):
            variants.append(
                _variant(
                    {
                        "action": {"const": "type"},
                        "text": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": _MAX_TEXT_LENGTH,
                            "description": (
                                f"Text of length 1 to {_MAX_TEXT_LENGTH} characters "
                                "inclusive. Each character must map to an allowed key."
                            ),
                        },
                        "press_enter": {"type": "boolean"},
                        "duration": duration,
                    },
                    ["action", "text"],
                )
            )
    if controls.allow_clicks:
        button = {"type": "string", "enum": ["left", "right", "middle"]}
        variants.extend(
            [
                _variant(
                    {"action": {"const": "click"}, "x": x, "y": y, "button": button},
                    ["action", "x", "y"],
                ),
                _variant(
                    {
                        "action": {"const": "click_hold"},
                        "x": x,
                        "y": y,
                        "button": button,
                        "duration": duration,
                    },
                    ["action", "x", "y"],
                ),
                _variant(
                    {
                        "action": {"const": "mouse_move"},
                        "x": x,
                        "y": y,
                        "from_x": x,
                        "from_y": y,
                        "duration": duration,
                    },
                    ["action", "x", "y"],
                ),
                _variant(
                    {
                        "action": {"const": "drag"},
                        "x1": x,
                        "y1": y,
                        "x2": x,
                        "y2": y,
                        "button": button,
                        "duration": duration,
                        "steps": {
                            "type": "integer",
                            "minimum": _MIN_DRAG_STEPS,
                            "description": (
                                "Drag interpolation steps, an integer at least "
                                f"{_MIN_DRAG_STEPS}; default {_DEFAULT_DRAG_STEPS}."
                            ),
                        },
                    },
                    ["action", "x1", "y1", "x2", "y2"],
                ),
                _variant(
                    {
                        "action": {"const": "scroll"},
                        "delta_x": {"type": "number"},
                        "delta_y": {"type": "number"},
                        "duration": duration,
                    },
                    ["action"],
                ),
            ]
        )
    return {"type": "object", "oneOf": variants}


def action_description(game: Any, role_index: int) -> str:
    role = game.game_roles[role_index]
    controls = role.controls
    keys = ", ".join(sorted(controls.allowed_keys)) or "none"
    lines = [
        "Execute exactly one GameWorld input for the current role, not an action list.",
        f"Role {role_index} ({role.name}): keys [{keys}], "
        f"mouse {'enabled' if controls.allow_clicks else 'disabled'}.",
        f"Coordinates use the {game.width}x{game.height} screenshot, with origin at "
        f"the top-left: x from 0 to {game.width - 1}, y from 0 to {game.height - 1}, "
        "both inclusive. These bounds also apply to from_x/from_y and drag endpoints.",
        f"duration is optional, in seconds from 0 to {_MAX_DURATION} inclusive; "
        "fractions are allowed. An explicit duration overrides the defaults. "
        f"The role default hold/wait is {controls.hold_duration:g}s unless an "
        "action-specific default below applies.",
        "wait: Wait without input for duration.",
    ]
    if controls.allowed_keys:
        lines.append("press_key: Hold one allowed key for duration, then release it.")
        if len(controls.allowed_keys) > 1:
            lines.append(
                f"press_keys: Hold exactly {_KEY_COUNT} distinct allowed keys "
                "simultaneously for duration, then release them."
            )
            opposing = [
                f"{first}+{second}"
                for first, second in (
                    ("ArrowLeft", "ArrowRight"),
                    ("ArrowUp", "ArrowDown"),
                    ("a", "d"),
                    ("w", "s"),
                )
                if {first, second} <= set(controls.allowed_keys)
            ]
            if opposing:
                lines.append(
                    "Forbidden opposing key pairs: " + ", ".join(opposing) + "."
                )
        overrides = getattr(controls, "key_durations", {})
        if overrides:
            values = ", ".join(
                f"{key}={value:g}s" for key, value in sorted(overrides.items())
            )
            lines.append(
                f"When duration is omitted, per-key defaults are {values}. "
                "For press_keys, use the largest configured override among the "
                "selected keys, or the role default if none has an override."
            )
        if any(len(key) == 1 for key in controls.allowed_keys):
            lines.append(
                f"type: Send text of length 1 to {_MAX_TEXT_LENGTH} characters "
                "inclusive; every character must map to an allowed key. "
                "press_enter optionally adds Enter (default false), only if Enter "
                f"is allowed. The total typing duration defaults to {_DEFAULT_TYPE_DURATION}s."
            )
    if controls.allow_clicks:
        lines.extend(
            (
                "Mouse button is left, right, or middle; default left.",
                "click: Click at (x, y), then wait the role default. "
                "This action has no duration parameter.",
                "click_hold: Hold the mouse button at (x, y) for duration, then release it.",
                "mouse_move: Move to (x, y), then wait for duration. "
                "Optionally supply both from_x and from_y to move from that point.",
                "drag: Hold the mouse button from (x1, y1) to (x2, y2). "
                f"steps is an integer at least {_MIN_DRAG_STEPS}, default {_DEFAULT_DRAG_STEPS}; "
                "duration controls the interpolated drag time when steps is greater than 1.",
                "scroll: Scroll by delta_x and delta_y (each defaults to 0), "
                "then wait for duration.",
            )
        )
    return "\n".join(lines)


def objective(game: Any, task: Any, role_index: int) -> str:
    role = game.game_roles[role_index]
    role_text = "\n".join(
        part
        for part in (
            f"Role {role_index}: {role.name}",
            role.prompt.role_section.strip(),
            role.prompt.computer_use_controls_section.strip(),
        )
        if part
    )
    return "\n\n".join(
        part
        for part in (
            game.game_rules.strip(),
            task.task_prompt.strip(),
            role_text,
        )
        if part
    )

````


## vista-c97c354/src/vista/benchmarks/gameworld/engine.py

````text
"""Host-only browser worker delegating each transition to the upstream coordinator."""

from __future__ import annotations

import asyncio
import io
import math
import secrets
import socket
import threading
from collections.abc import Awaitable, Callable
from dataclasses import asdict, dataclass, replace
from pathlib import Path
from typing import Any

from PIL import Image

from vista.core.contracts import EvidenceKind, Observation, ObservationBundle, Visual

from .upstream import (
    PRIMARY_STEPS,
    Upstream,
)


def artifact_value(value: Any) -> Any:
    """Keep malformed parser numbers representable without changing execution."""
    if isinstance(value, float) and not math.isfinite(value):
        return {"nonfinite_number": repr(value)}
    if isinstance(value, dict):
        return {key: artifact_value(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [artifact_value(item) for item in value]
    return value


@dataclass(frozen=True)
class Transition:
    role: int
    before: ObservationBundle
    after: ObservationBundle
    action: dict[str, Any] | None
    validity: dict[str, Any]
    evaluation: dict[str, Any] | None
    finished: bool


def available_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


class PaperDriver:
    """Own only the outer role cursor; all single-step semantics remain upstream."""

    def __init__(
        self,
        upstream: Upstream,
        env: Any,
        agents: list[Any],
        evaluator: Any,
        *,
        before_reset: Callable[[], Awaitable[None]] | None = None,
    ):
        class Coordinator(upstream.runtime.Coordinator):
            def _init_agent_loggers(self):
                pass

            async def _get_raw_action(self, agent):
                return self.supplied_action

            def _log_model_interaction(self, agent, agent_logger):
                return {"tool_call": self.supplied_action, "error": self.parse_error}

            def _build_action_validity_record(self, *args, **kwargs):
                result = super()._build_action_validity_record(*args, **kwargs)
                self.last_validity = result
                return result

            async def _handle_eval_controls(self, agent, result):
                self.last_evaluation = asdict(result) if result is not None else None
                if result is not None and result.should_reset and before_reset:
                    await before_reset()
                await super()._handle_eval_controls(agent, result)

        self.coordinator = Coordinator(env, agents, evaluator)
        self.coordinator.last_evaluation = None
        self.role = 0

    @property
    def finished(self) -> bool:
        return self.coordinator._stop_event.is_set()

    async def step(self, action: Any, parse_error: str | None = None) -> None:
        if self.finished:
            raise RuntimeError("The GameWorld task has ended")
        coordinator = self.coordinator
        coordinator.supplied_action = action
        coordinator.parse_error = parse_error
        try:
            await coordinator._run_agent_step(coordinator.agents[self.role], None)
        except Exception:
            coordinator._stop_event.set()
            raise
        if self.finished:
            return
        # The official loop has a frozen inter-role gap and checks the budget
        # after the entire cycle, not immediately after the primary role acts.
        await asyncio.sleep(0.05)
        self.role = (self.role + 1) % len(coordinator.agents)
        if (
            self.role == 0
            and coordinator.agents[0].step_index >= coordinator.env.config.max_steps
        ):
            coordinator._stop_event.set()


class GameWorldEngine:
    def __init__(
        self,
        upstream: Upstream,
        *,
        games_root: Path,
        game_id: str,
        task_id: str,
        directory: Path,
        seed: int | None = None,
        headless: bool = True,
        port: int | None = None,
    ) -> None:
        self.upstream = upstream
        self.games_root = games_root.expanduser().resolve(strict=True)
        self.game, self.task = upstream.task(game_id, task_id)
        self.directory = directory.resolve()
        self.directory.mkdir(mode=0o700, parents=True, exist_ok=False)
        self.seed = seed
        self.headless = headless
        self.port = port or available_port()
        self._loop = asyncio.new_event_loop()
        self._thread = threading.Thread(
            target=self._loop.run_forever, name="gameworld-browser"
        )
        self._thread.start()
        self._closed = False
        self._reset_evidence: tuple[Observation, ...] = ()
        self.latest_evaluation: dict[str, Any] | None = None
        self.transitions: list[Transition] = []
        try:
            self._call(self._start())
        except BaseException:
            self.close()
            raise

    def _call(self, coroutine):
        return asyncio.run_coroutine_threadsafe(coroutine, self._loop).result()

    async def _start(self) -> None:
        owner = self
        upstream = self.upstream

        class Environment(upstream.runtime.GameEnv):
            def _build_game_url(self):
                self.game_launcher = upstream.launcher.GameLauncher(
                    owner.game.game_id,
                    port=owner.port,
                    base_dir=owner.games_root / "benchmark",
                )
                return upstream.launcher.append_url_suffix(
                    self.game_launcher.start(),
                    self.config.game_url_suffix,
                )

            def _build_browser_config(self):
                config = super()._build_browser_config()
                config.screenshot_dir = owner.directory / "screenshots"
                return config

        self.config = upstream.runtime.RuntimeConfig(
            game_id=self.game.game_id,
            task_id=self.task.task_id,
            game_url_suffix=self.task.game_url_suffix,
            evaluator_config=self.task.evaluator_config,
            width=self.game.width,
            height=self.game.height,
            speed_multiplier=self.game.speed_multiplier,
            pause_during_inference=True,
            random_seed=self.seed,
            max_steps=PRIMARY_STEPS,
            agent_count=self.game.role_count,
        )
        self.env = Environment(self.config, headless=self.headless, port=self.port)
        self.agents = [
            upstream.runtime.Agent(
                agent_id=f"role-{index}",
                agent_type="computer_use",
                client=None,
                controls=role.controls.copy(),
                semantic_controls_map=None,
            )
            for index, role in enumerate(self.game.game_roles)
        ]
        self.driver = PaperDriver(
            upstream,
            self.env,
            self.agents,
            upstream.runtime.Evaluator(self.config),
            before_reset=self._capture_before_reset,
        )
        await self.env.start()
        self.browser_version = self.env.game_manager.browser.version
        await self.env.pause_game()
        self.current = await self._capture()

    async def _capture_before_reset(self) -> None:
        evidence = await self._capture()
        self._reset_evidence = tuple(
            replace(observation, kind=EvidenceKind.HISTORICAL)
            for observation in evidence.observations
        )

    async def _capture(self) -> ObservationBundle:
        path = await self.env.capture_screenshot("shared")
        data = path.read_bytes()
        with Image.open(io.BytesIO(data)) as image:
            width, height = image.size
        if (width, height) != (self.game.width, self.game.height):
            raise RuntimeError("GameWorld returned unexpected screenshot dimensions")
        identity = f"frame-{secrets.token_hex(8)}"
        return ObservationBundle(
            (Observation(identity, (Visual("screen", identity, data, width, height),)),)
        )

    @property
    def role(self) -> int:
        return self.driver.role

    @property
    def finished(self) -> bool:
        return self.driver.finished

    def step(self, role: int, name: str | None, arguments: Any = None) -> Transition:
        if self._closed or role != self.role:
            raise RuntimeError("An inactive role cannot act")
        return self._call(self._step(role, name, arguments))

    async def _step(self, role: int, name: str | None, arguments: Any) -> Transition:
        before = self.current
        self._reset_evidence = ()
        error = None
        try:
            action = (
                dict(arguments)
                if name == "act" and isinstance(arguments, dict)
                else None
            )
            if action is None:
                error = "No function call parsed"
        except Exception:
            action, error = None, "Failed to parse action"
        await self.driver.step(action, error)
        self.current = await self._capture()
        # Archive the pre-reset frame, but deliver only the actual current screen.
        after = (
            ObservationBundle(
                (*self._reset_evidence, *self.current.observations),
                display=(len(self._reset_evidence),),
            )
            if self._reset_evidence
            else self.current
        )
        coordinator = self.driver.coordinator
        if coordinator.last_evaluation is not None:
            self.latest_evaluation = coordinator.last_evaluation
        transition = Transition(
            role,
            before,
            after,
            action,
            coordinator.last_validity,
            coordinator.last_evaluation,
            self.finished,
        )
        self.transitions.append(transition)
        return transition

    def result(self) -> dict[str, Any]:
        return {
            "game_id": self.game.game_id,
            "task_id": self.task.task_id,
            "finished": self.finished,
            "role_steps": [agent.step_index for agent in self.agents],
            "evaluation": self.latest_evaluation,
            "metrics": dict(self.agents[0].eval_metrics),
            "browser_version": self.browser_version,
        }

    def close(self) -> None:
        if self._closed:
            return
        self._closed = True
        try:
            env = getattr(self, "env", None)
            if env is not None:
                self._call(env.close_game())
        finally:
            self._loop.call_soon_threadsafe(self._loop.stop)
            self._thread.join(timeout=10)
            if self._thread.is_alive():
                raise RuntimeError("GameWorld browser worker did not stop")
            self._loop.close()

````


## vista-c97c354/src/vista/benchmarks/gameworld/preflight.py

````text
"""Compatibility imports for the shared backend provenance checks."""

from vista.backends.preflight import (
    check_transport as check_transport,
    source_fingerprint as source_fingerprint,
)

````


## vista-c97c354/src/vista/benchmarks/gameworld/profiles.py

````text
"""VISTA computer-use action contracts and per-role session policy."""

from __future__ import annotations

from typing import Any

from vista.core.contracts import Capability, Effect, ToolSpec
from vista.core.profiles import (
    AgentProfile,
    CompactionMode,
    ContextMode,
    Experiment,
    PromptBundle,
    SessionPolicy,
)
from vista.core.prompts import vista_method as vista_method

from .upstream import (
    COMPUTER_USE_PROTOCOL,
    GAMES_REVISION,
    GAMEWORLD_REVISION,
    Upstream,
)

VISTA_TOOLS = (
    "inspect",
    "read_pixels",
    "history",
    "read_guide",
    "write_guide",
    "read_working",
    "write_working",
    "save_compact_checkpoint",
)



def action_specs(upstream: Upstream, game: Any, role: int) -> tuple[ToolSpec, ...]:
    from .computer_use import action_description, action_schema

    return (
        ToolSpec(
            "act",
            action_description(game, role),
            action_schema(game, role),
            Capability.ACTION,
            Effect.ENVIRONMENT,
            max_images=1,
            costs={"game_decisions": 1},
        ),
    )


def make_profile(
    upstream: Upstream,
    game: Any,
    task: Any,
    role: int,
    *,
    backend: str = "codex",
) -> AgentProfile:
    if backend not in {"codex", "claude"}:
        raise ValueError("Unknown backend")
    from .computer_use import objective

    actions = tuple(spec.name for spec in action_specs(upstream, game, role))
    system = objective(game, task, role) + "\n\n" + vista_method(backend)
    vista_tools = tuple(
        name
        for name in VISTA_TOOLS
        if backend == "codex" or name != "save_compact_checkpoint"
    )
    return AgentProfile(
        "gameworld-computer-use/vista",
        (*actions, *vista_tools),
        PromptBundle(
            system,
            "Game screen:\n",
            step="Game screen:\n",
            checkpoint="Save the compact checkpoint before continuing.",
            recovery=(
                "Continue this same role and task from GUIDE, WORKING, and the "
                "supplied current visual. The game has not been reset by this "
                "context handoff. Reconcile the notes with the current screen."
            ),
        ),
        SessionPolicy(
            context=ContextMode.CONTINUOUS,
            compaction=CompactionMode.CHECKPOINT,
            one_action_per_turn=game.role_count > 1,
        ),
    )


def make_experiment(
    profile: AgentProfile,
    *,
    backend: str,
    model: str,
    effort: str,
    width: int,
    height: int,
    seed: int | None,
    backend_segments: int | None = None,
    tool_calls: int | None = None,
) -> Experiment:
    return Experiment(
        "GameWorld",
        GAMEWORLD_REVISION,
        COMPUTER_USE_PROTOCOL,
        profile,
        backend,
        model,
        effort,
        {
            "width": width,
            "height": height,
            "pixels": "unaltered",
            "coordinate_scale": 1.0,
            "games_revision": GAMES_REVISION,
            "seed": seed,
            "role_context": "isolated",
            "cross_task_memory": False,
            "host_action_count": False,
            "host_action_horizon": False,
        },
        {
            "game_decisions": 100,
            **(
                {"backend_segments": backend_segments}
                if backend_segments is not None
                else {}
            ),
            **({"tool_calls": tool_calls} if tool_calls is not None else {}),
            "final_answers": 100,
        },
        f"env.task_evaluator@{GAMEWORLD_REVISION}",
    )

````


## vista-c97c354/src/vista/benchmarks/gameworld/run.py

````text
"""Coordinate role inputs; shared backends own the context lifecycle."""

from __future__ import annotations

import importlib.metadata
import time
import traceback
from collections.abc import Callable
from pathlib import Path
from typing import Any

from vista.backends.session import BackendSession
from vista.core.artifacts import ArtifactStore
from vista.core.contracts import ObservationBundle
from vista.core.json import canonical
from vista.core.profiles import Phase
from vista.core.runtime import BudgetExhausted, TaskRuntime

from .engine import GameWorldEngine, artifact_value
from .preflight import source_fingerprint
from .profiles import make_experiment, make_profile
from .session import RoleSession
from .upstream import (
    COMPUTER_USE_PROTOCOL,
    GAMES_REVISION,
    GAMEWORLD_REVISION,
    Upstream,
)


def play_loop(
    engine: GameWorldEngine,
    sessions: list[RoleSession],
    runtimes: list[TaskRuntime],
    backends: list[BackendSession],
) -> None:
    started: set[int] = set()
    try:
        while not engine.finished:
            index = engine.role
            session, runtime, backend = (
                sessions[index],
                runtimes[index],
                backends[index],
            )
            if runtime.terminal:
                return
            session.observe(engine.current)
            phase = Phase.INITIAL if index not in started else Phase.STEP
            observation = (
                ObservationBundle()
                if phase == Phase.STEP
                and session.delivered_current == engine.current
                else engine.current
            )
            task_input = runtime.prepare_input(
                phase,
                observation=observation,
                context_key=f"role-{index}",
            )
            before = len(engine.transitions)
            role_steps = [agent.step_index for agent in engine.agents]
            result = backend.run(task_input)
            started.add(index)
            if runtime.terminal and not engine.finished:
                return
            if result.returncode != 0 or runtime.failure:
                return
            current = [
                item
                for item in task_input.observation.observations
                if item.kind == "current"
            ]
            if current:
                session.delivered_current = ObservationBundle(tuple(current))
            if len(engine.transitions) != before:
                session.delivered_current = engine.current
            if len(engine.transitions) == before and not runtime.terminal:
                runtime.submit(result.final_message)
            for transition in engine.transitions[before:]:
                role_steps[transition.role] += 1
                runtime.artifacts.record(
                    "host_transition",
                    artifact_value(
                        {
                            "role": transition.role,
                            "action": transition.action,
                            "validity": transition.validity,
                            "evaluation": transition.evaluation,
                            "role_steps": list(role_steps),
                        }
                    ),
                )
    except BudgetExhausted:
        return


def run_task(
    upstream: Upstream,
    *,
    games_root: Path,
    game_id: str,
    task_id: str,
    directory: Path,
    backend: str,
    model: str,
    effort: str,
    backend_factory: Callable[[TaskRuntime, Path], BackendSession],
    seed: int | None = None,
    headless: bool = True,
    backend_segments: int | None = None,
    tool_calls: int | None = None,
    transport_provenance: dict[str, Any] | None = None,
) -> dict[str, Any]:
    protocol = COMPUTER_USE_PROTOCOL
    root = directory.resolve()
    artifacts = ArtifactStore(root)
    artifacts.manifest(
        {
            "benchmark": "GameWorld",
            "protocol": protocol,
            "benchmark_revision": GAMEWORLD_REVISION,
            "games_revision": GAMES_REVISION,
            "game_id": game_id,
            "task_id": task_id,
            "backend": backend,
            "model": model,
            "effort": effort,
            "seed": seed,
            "headless": headless,
            "transport": transport_provenance
            or {"validation": "caller-supplied-backend"},
            "source_files": source_fingerprint(),
            "dependencies": {
                name: importlib.metadata.version(name)
                for name in (
                    "playwright",
                    "Pillow",
                    "PyYAML",
                    "Jinja2",
                )
            },
        }
    )
    engine = None
    sessions: list[RoleSession] = []
    runtimes: list[TaskRuntime] = []
    backends = []
    error = None
    result: dict[str, Any] = {}
    started = time.monotonic()
    try:
        engine = GameWorldEngine(
            upstream,
            games_root=games_root,
            game_id=game_id,
            task_id=task_id,
            directory=root / "environment",
            seed=seed,
            headless=headless,
        )
        for index in range(engine.game.role_count):
            session = RoleSession(engine, index)
            sessions.append(session)
            profile = make_profile(
                upstream,
                engine.game,
                engine.task,
                index,
                backend=backend,
            )
            experiment = make_experiment(
                profile,
                backend=backend,
                model=model,
                effort=effort,
                width=engine.game.width,
                height=engine.game.height,
                seed=seed,
                backend_segments=backend_segments,
                tool_calls=tool_calls,
            )
            runtime = TaskRuntime(
                session, experiment, artifact_dir=root / f"role-{index}" / "artifacts"
            )
            runtimes.append(runtime)
            backends.append(
                backend_factory(runtime, root / f"role-{index}" / "transport")
            )
        play_loop(engine, sessions, runtimes, backends)
        result = engine.result()
        error = next((runtime.failure for runtime in runtimes if runtime.failure), None)
    except Exception:
        error = "run_exception"
        artifacts.record("private_failure", {"traceback": traceback.format_exc()})
        if engine is not None:
            result = engine.result()
    finally:
        for runtime in runtimes:
            try:
                runtime.close()
            except Exception:
                error = "role_cleanup_failure"
        if engine is not None:
            try:
                engine.close()
            except Exception:
                error = "environment_cleanup_failure"
                artifacts.record(
                    "private_failure", {"traceback": traceback.format_exc()}
                )
    completed = bool(result.get("finished")) and error is None
    evaluation = result.get("evaluation") or {}
    metrics = result.get("metrics") or {}
    scored = (
        completed
        and evaluation.get("status") in {"success", "fail"}
        and isinstance(metrics.get("progress"), (int, float))
        and not isinstance(metrics.get("progress"), bool)
        and 0 <= metrics["progress"] <= 1
        and not metrics.get("evaluation_config_errors")
        and not metrics.get("evaluation_runtime_issues")
    )
    result.update(
        {
            "game_id": game_id,
            "task_id": task_id,
            "protocol": protocol,
            "backend": backend,
            "model": model,
            "effort": effort,
            "seed": seed,
            "completed": completed,
            "scored": scored,
            "error": error,
            "progress": metrics.get("progress") if scored else None,
            "success": evaluation.get("status") == "success" if scored else None,
            "role_usage": [runtime.usage for runtime in runtimes],
            "role_checkpoints": [runtime.context.checkpoints for runtime in runtimes],
            "role_backend_usage": [backend.usage_reports for backend in backends],
            "elapsed_seconds": time.monotonic() - started,
        }
    )
    path = root / "result.json"
    result = artifact_value(result)
    path.write_text(canonical(result) + "\n", encoding="utf-8")
    path.chmod(0o600)
    return result

````


## vista-c97c354/src/vista/benchmarks/gameworld/session.py

````text
"""GameWorld actions and role-local observations; VISTA tools live in the core."""

from __future__ import annotations

from typing import Any

from vista.core.contracts import (
    Effect,
    EvidenceKind,
    ObservationBundle,
    PublicTask,
    SubmissionSpec,
    ToolBinding,
    ToolReply,
)

from .engine import GameWorldEngine
from .profiles import action_specs


class RoleSession:
    def __init__(self, engine: GameWorldEngine, role: int):
        self.engine = engine
        self.role = role
        self.closed = False
        self.latest = engine.current
        self.delivered_current: ObservationBundle | None = None
        self.task = PublicTask(
            f"{engine.game.game_id}/{engine.task.task_id}/role-{role}",
            engine.task.task_prompt,
            {
                "game_id": engine.game.game_id,
                "task_id": engine.task.task_id,
                "role": engine.game.game_roles[role].name,
            },
            self.latest,
        )
        self.submission = SubmissionSpec(
            Effect.ENVIRONMENT, max_images=1, costs={"game_decisions": 1}
        )
        self.tools = tuple(
            ToolBinding(
                spec, lambda arguments, name=spec.name: self._act(name, arguments)
            )
            for spec in action_specs(
                engine.upstream, engine.game, role
            )
        )

    def observe(self, bundle: ObservationBundle) -> None:
        self.latest = ObservationBundle(
            tuple(
                item
                for item in bundle.observations
                if item.kind == EvidenceKind.CURRENT
            )
        )

    def _act(self, name: str | None, arguments: Any = None) -> ToolReply:
        transition = self.engine.step(self.role, name, arguments)
        self.observe(transition.after)
        valid = bool(transition.validity["is_valid"])
        text = (
            "Final game screen."
            if valid
            else "No valid action was executed. Final game screen."
        )
        if transition.finished:
            text += " The task has ended."
        if len(transition.after.observations) > 1:
            text += f" Archived {len(transition.after.observations)} visual moments."
        return ToolReply(
            text,
            success=valid,
            observation=transition.after,
            finished=transition.finished,
        )

    def submit(self, answer: str) -> ToolReply:
        return self._act(None)

    def close(self) -> None:
        self.closed = True

````


## vista-c97c354/src/vista/benchmarks/gameworld/upstream.py

````text
"""Load the pinned public runtime, never a benchmark model or API client."""

from __future__ import annotations

import importlib
import logging
import re
import sys
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Any

GAMEWORLD_REVISION = "f2883c34e377c8b73fdb503a4a8e87be12310df7"
GAMES_REVISION = "a23b4370c3f99df6fa4ee01ea0299fdab9668b86"
COMPUTER_USE_PROTOCOL = "gameworld-computer-use"
PRIMARY_STEPS = 100
_IMPORT_LOCK = threading.Lock()


@dataclass(frozen=True)
class Upstream:
    root: Path
    runtime: Any
    catalog: Any
    launcher: Any

    def task(self, game_id: str, task_id: str) -> tuple[Any, Any]:
        if not all(
            re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_-]*", x) for x in (game_id, task_id)
        ):
            raise ValueError("Use exact catalog game and task identifiers")
        game = self.catalog.load_game(game_id)
        task = self.catalog.load_task(game_id, task_id)
        if not game.game_roles:
            raise ValueError("A GameWorld game must define a role")
        if any(not role.semantic_controls for role in game.game_roles):
            raise ValueError("Every role must define its controls")
        return game, task


def load_upstream(root: Path) -> Upstream:
    root = root.expanduser().resolve(strict=True)
    with _IMPORT_LOCK:
        for name in ("agents", "catalog", "env", "runtime", "tools"):
            existing = sys.modules.get(name)
            if existing is not None:
                file = getattr(existing, "__file__", None)
                if not file or not Path(file).resolve().is_relative_to(root):
                    raise ImportError(
                        f"Module {name!r} is already bound outside {root}"
                    )
        if str(root) not in sys.path:
            sys.path.insert(0, str(root))
        for name in ("env", "model", "game", "task"):
            if not hasattr(logging.Logger, name):
                setattr(logging.Logger, name, logging.Logger.debug)
        runtime = importlib.import_module("runtime")
        catalog = importlib.import_module("catalog")
        return Upstream(
            root,
            runtime,
            catalog,
            importlib.import_module("env.game_launcher"),
        )

````


## vista-c97c354/src/vista/cli.py

````text
"""Select a benchmark profile without changing its evaluation arguments."""

from __future__ import annotations

import argparse
import sys
from collections.abc import Sequence


def main(argv: Sequence[str] | None = None) -> int:
    arguments = list(sys.argv[1:] if argv is None else argv)
    parser = argparse.ArgumentParser(
        description=__doc__, add_help=False, allow_abbrev=False
    )
    parser.add_argument(
        "--profile",
        choices=("arc3", "gameworld", "aigamestore", "babyvision"),
        required=True,
    )
    parser.add_argument("--backend", choices=("codex", "claude"), required=True)
    if not arguments or arguments in (["--help"], ["-h"]):
        parser.print_help()
        return 0
    selection, remaining = parser.parse_known_args(arguments)
    if selection.profile != "arc3" and selection.backend != "codex":
        parser.error(f"--profile {selection.profile} requires --backend codex")
    if remaining[:1] == ["--"]:
        remaining = remaining[1:]
    if selection.profile == "arc3":
        from .benchmarks.arc3 import backend_module

        return backend_module(selection.backend).main(remaining)
    if selection.profile == "babyvision":
        from .benchmarks.babyvision.cli import main as babyvision_main

        return babyvision_main(["--backend", selection.backend, *remaining])
    if selection.profile == "aigamestore":
        from .benchmarks.aigamestore.cli import main as aigamestore_main

        return aigamestore_main(["--backend", selection.backend, *remaining])
    from .benchmarks.gameworld.cli import main as gameworld_main

    return gameworld_main(["--backend", selection.backend, *remaining])

````


## vista-c97c354/src/vista/core/__init__.py

````text
"""Task execution without benchmark SDK or provider dependencies."""

````


## vista-c97c354/src/vista/core/artifacts.py

````text
"""Host-only, allowlisted attempt records and immutable display evidence."""

from __future__ import annotations

import hashlib
import threading
from pathlib import Path
from typing import Any

from .contracts import ObservationBundle
from .json import canonical


class ArtifactStore:
    def __init__(self, root: Path) -> None:
        self.root = root.resolve()
        self.root.mkdir(mode=0o700, parents=True, exist_ok=False)
        self.root.chmod(0o700)
        self._lock = threading.Lock()
        (self.root / "evidence").mkdir(mode=0o700)

    def manifest(self, value: dict[str, Any]) -> None:
        with (self.root / "manifest.json").open("x", encoding="utf-8") as stream:
            stream.write(canonical(value) + "\n")
        (self.root / "manifest.json").chmod(0o600)

    def record(self, event: str, value: dict[str, Any]) -> None:
        with self._lock:
            path = self.root / "events.jsonl"
            with path.open("a", encoding="utf-8") as stream:
                stream.write(canonical({"event": event, **value}) + "\n")
            path.chmod(0o600)

    def evidence(self, bundle: ObservationBundle) -> None:
        for observation in bundle.observations:
            for visual in observation.views:
                digest = hashlib.sha256(visual.data).hexdigest()
                path = self.root / "evidence" / digest
                try:
                    with path.open("xb") as stream:
                        stream.write(visual.data)
                    path.chmod(0o400)
                except FileExistsError:
                    if path.read_bytes() != visual.data:
                        raise RuntimeError(
                            "Archived evidence has been modified"
                        ) from None

````


## vista-c97c354/src/vista/core/contracts.py

````text
"""Public evidence and tool contracts. Evaluator state is deliberately absent."""

from __future__ import annotations

import base64
import hashlib
import io
import re
from collections.abc import Callable, Mapping
from dataclasses import dataclass, field
from enum import StrEnum
from html import escape
from typing import Any, Protocol

from .json import freeze, thaw


class Effect(StrEnum):
    NONE = "none"
    ENVIRONMENT = "environment"
    MEMORY = "memory"
    ANNOTATION = "annotation"
    SUBMISSION = "submission"


class Capability(StrEnum):
    ACTION = "action"
    SUBMISSION = "submission"
    INSPECTION = "inspection"
    PIXELS = "pixels"
    HISTORY = "history"
    MEMORY = "memory"
    ANNOTATION = "annotation"
    CHECKPOINT = "checkpoint"


class EvidenceKind(StrEnum):
    CURRENT = "current"
    HISTORICAL = "historical"
    DERIVED = "derived"


@dataclass(frozen=True)
class Visual:
    """Exactly the display bytes approved by an adapter, not a source-file path."""

    view: str
    source_id: str
    data: bytes = field(repr=False)
    width: int
    height: int
    mime_type: str = "image/png"
    transform: Mapping[str, Any] = field(default_factory=dict)
    derived_from: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if not self.view or not self.source_id:
            raise ValueError("A visual needs a view name and opaque source identity")
        if type(self.data) is not bytes or not self.data:
            raise ValueError("A visual needs immutable image bytes")
        if any(type(size) is not int or size < 1 for size in (self.width, self.height)):
            raise ValueError("Visual dimensions must be positive integers")
        if self.mime_type not in {"image/png", "image/jpeg", "image/webp", "image/gif"}:
            raise ValueError("Unsupported visual media type")
        from PIL import Image

        with Image.open(io.BytesIO(self.data)) as image:
            if image.size != (self.width, self.height):
                raise ValueError("Declared visual dimensions do not match the image")
            if Image.MIME.get(image.format) != self.mime_type:
                raise ValueError("Declared media type does not match the image")
            if getattr(image, "n_frames", 1) != 1:
                raise ValueError(
                    "Animated images must be supplied as explicit observations"
                )
            image.verify()
        object.__setattr__(self, "transform", freeze(self.transform))
        object.__setattr__(self, "derived_from", tuple(self.derived_from))

    def manifest(self) -> dict[str, Any]:
        return {
            "view": self.view,
            "source_id": self.source_id,
            "sha256": hashlib.sha256(self.data).hexdigest(),
            "width": self.width,
            "height": self.height,
            "mime_type": self.mime_type,
            "transform": thaw(self.transform),
            "derived_from": list(self.derived_from),
        }


@dataclass(frozen=True)
class Observation:
    moment: str
    views: tuple[Visual, ...]
    kind: EvidenceKind = EvidenceKind.CURRENT

    def __post_init__(self) -> None:
        object.__setattr__(self, "views", tuple(self.views))
        object.__setattr__(self, "kind", EvidenceKind(self.kind))
        if not self.moment or not self.views:
            raise ValueError("An observation needs an identity and at least one view")
        if len({view.view for view in self.views}) != len(self.views):
            raise ValueError("View names must be unique within an observation")
        if self.kind == EvidenceKind.DERIVED and any(
            not view.derived_from for view in self.views
        ):
            raise ValueError("Derived visuals must name their source evidence")
        if self.kind != EvidenceKind.DERIVED and any(
            view.derived_from for view in self.views
        ):
            raise ValueError("Agent-derived evidence must be labeled as derived")


@dataclass(frozen=True)
class ObservationBundle:
    observations: tuple[Observation, ...] = ()
    display: tuple[int, ...] | None = None

    def __post_init__(self) -> None:
        object.__setattr__(self, "observations", tuple(self.observations))
        identities = [observation.moment for observation in self.observations]
        if len(set(identities)) != len(identities):
            raise ValueError("Observation moment identities must be unique")
        if sum(o.kind == EvidenceKind.CURRENT for o in self.observations) > 1:
            raise ValueError("Only one observation can represent the current state")
        if self.display is not None:
            object.__setattr__(self, "display", tuple(self.display))
            if any(
                type(index) is not int or not 0 <= index < len(self.observations)
                for index in self.display
            ) or len(set(self.display)) != len(self.display):
                raise ValueError("Display must select distinct supplied observations")

    @property
    def displayed_observations(self) -> tuple[Observation, ...]:
        if self.display is None:
            return self.observations
        return tuple(self.observations[index] for index in self.display)

    def manifest(self) -> list[dict[str, Any]]:
        return [
            {
                "moment": observation.moment,
                "kind": observation.kind.value,
                "views": [view.manifest() for view in observation.views],
            }
            for observation in self.observations
        ]

    def images(self) -> tuple[dict[str, Any], ...]:
        images = []
        for observation in self.displayed_observations:
            for view in observation.views:
                label = (
                    f'<visual kind="{observation.kind.value}" '
                    f'view="{escape(view.view, quote=True)}" '
                    f'size="{view.width}x{view.height}"></visual>'
                )
                images.append(
                    {
                        "data": base64.b64encode(view.data).decode("ascii"),
                        "mime_type": view.mime_type,
                        "detail": "original",
                        "steer_text": label,
                    }
                )
        return tuple(images)


@dataclass(frozen=True)
class PublicTask:
    task_id: str
    objective: str
    context: Mapping[str, Any] = field(default_factory=dict)
    observation: ObservationBundle = field(default_factory=ObservationBundle)

    def __post_init__(self) -> None:
        if not self.task_id or not self.objective.strip():
            raise ValueError("A public task needs an identity and objective")
        object.__setattr__(self, "context", freeze(self.context))


@dataclass(frozen=True)
class ToolSpec:
    name: str
    description: str
    input_schema: Mapping[str, Any]
    capability: Capability
    effect: Effect = Effect.NONE
    max_images: int = 0
    costs: Mapping[str, int] = field(default_factory=dict)
    dispatch_invalid: bool = False
    annotations: Mapping[str, bool] | None = None

    def __post_init__(self) -> None:
        if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_]{0,63}", self.name):
            raise ValueError("Invalid tool name")
        if not self.description.strip():
            raise ValueError("A tool needs a description")
        object.__setattr__(self, "capability", Capability(self.capability))
        object.__setattr__(self, "effect", Effect(self.effect))
        object.__setattr__(self, "input_schema", freeze(self.input_schema))
        object.__setattr__(self, "costs", freeze(self.costs))
        if self.annotations is not None:
            object.__setattr__(self, "annotations", freeze(self.annotations))
        if self.input_schema.get("type") != "object":
            raise ValueError("A tool input schema must describe an object")
        if type(self.max_images) is not int or self.max_images < 0:
            raise ValueError("max_images must be a nonnegative integer")
        if type(self.dispatch_invalid) is not bool or (
            self.dispatch_invalid and self.capability != Capability.ACTION
        ):
            raise ValueError("Only action tools may delegate invalid-output handling")
        for name, cost in self.costs.items():
            if (
                not name
                or name in {"tool_calls", "backend_segments", "final_answers"}
                or type(cost) is not int
                or cost < 0
            ):
                raise ValueError("Invalid tool accounting rule")
        allowed_effects = {
            Capability.ACTION: {Effect.ENVIRONMENT},
            Capability.SUBMISSION: {Effect.SUBMISSION},
            Capability.INSPECTION: {Effect.NONE},
            Capability.PIXELS: {Effect.NONE},
            Capability.HISTORY: {Effect.NONE},
            Capability.MEMORY: {Effect.NONE, Effect.MEMORY},
            Capability.ANNOTATION: {Effect.NONE, Effect.ANNOTATION},
            Capability.CHECKPOINT: {Effect.MEMORY},
        }
        if self.effect not in allowed_effects[self.capability]:
            raise ValueError("The tool capability and state effect disagree")

    @property
    def requires_ack(self) -> bool:
        return self.max_images > 0 or self.effect != Effect.NONE

    def public_definition(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "description": self.description,
            "inputSchema": thaw(self.input_schema),
            "annotations": thaw(self.annotations)
            if self.annotations is not None
            else {
                "readOnlyHint": self.effect == Effect.NONE,
                "destructiveHint": False,
                "idempotentHint": self.effect == Effect.NONE,
                "openWorldHint": False,
            },
        }


@dataclass(frozen=True)
class ToolReply:
    text: str
    success: bool = True
    observation: ObservationBundle = field(default_factory=ObservationBundle)
    finished: bool = False
    boundary: str | None = None
    # Persistent environment result, without transient tool-use guidance.
    event_text: str | None = None

    def __post_init__(self) -> None:
        if not isinstance(self.text, str):
            raise TypeError("A public tool reply must contain text")
        if self.event_text is not None and not isinstance(self.event_text, str):
            raise TypeError("Environment event text must be a string")
        if type(self.success) is not bool or type(self.finished) is not bool:
            raise TypeError("Tool reply status fields must be booleans")
        if not isinstance(self.observation, ObservationBundle):
            raise TypeError("A tool reply must use an ObservationBundle")
        if self.boundary not in {None, "decision_complete", "compact_checkpoint_saved"}:
            raise ValueError("Unknown task boundary")
        if self.finished and self.boundary is not None:
            raise ValueError("A terminal reply cannot also request a continuation")


@dataclass(frozen=True)
class ToolBinding:
    spec: ToolSpec
    handler: Callable[[Any], ToolReply] = field(repr=False, compare=False)


@dataclass(frozen=True)
class SubmissionSpec:
    """Host-side handling of a final answer or a structured action response."""

    effect: Effect = Effect.SUBMISSION
    max_images: int = 0
    costs: Mapping[str, int] = field(default_factory=dict)

    def __post_init__(self) -> None:
        object.__setattr__(self, "effect", Effect(self.effect))
        object.__setattr__(self, "costs", freeze(self.costs))
        if self.effect not in {Effect.SUBMISSION, Effect.ENVIRONMENT}:
            raise ValueError(
                "A final response must submit an answer or a structured action"
            )
        if type(self.max_images) is not int or self.max_images < 0:
            raise ValueError("max_images must be a nonnegative integer")
        for name, cost in self.costs.items():
            if (
                not name
                or name in {"tool_calls", "backend_segments", "final_answers"}
                or type(cost) is not int
                or cost < 0
            ):
                raise ValueError("Invalid submission accounting rule")

    def manifest(self) -> dict[str, Any]:
        return {
            "effect": self.effect.value,
            "max_images": self.max_images,
            "costs": thaw(self.costs),
        }


@dataclass(frozen=True)
class ToolExecution:
    """Transport-facing reply shared with the ARC runners."""

    text: str
    success: bool
    images: tuple[dict[str, Any], ...] = ()
    interrupt_after: bool = False
    boundary_reason: str | None = None
    images_before_interrupt: bool = False


class TaskSession(Protocol):
    """A host-owned task; only task and selected tool definitions reach the model."""

    @property
    def task(self) -> PublicTask: ...

    @property
    def tools(self) -> tuple[ToolBinding, ...]: ...

    @property
    def submission(self) -> SubmissionSpec: ...

    def submit(self, answer: str) -> ToolReply: ...

    def close(self) -> None: ...

````


## vista-c97c354/src/vista/core/dispatcher.py

````text
"""Provider-neutral execution of the public visual-game tools."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from vista.core.player import ToolExecutor
from vista.core.tools import MAX_GUIDE_CHARS, MAX_WORKING_CHARS


@dataclass(frozen=True)
class ToolExecution:
    text: str
    success: bool
    images: tuple[dict[str, Any], ...] = ()
    interrupt_after: bool = False
    boundary_reason: str | None = None


class GameToolDispatcher:
    """Execute the shared public tools against one private controller."""

    def __init__(
        self,
        *,
        controller: Any,
        guide_path: Path,
        working_path: Path,
        checkpoint_via_working: bool = False,
        interrupt_on_invalid_action_limit: bool = False,
        delegate: ToolExecutor | None = None,
    ) -> None:
        self.controller = controller
        self.guide_path = guide_path
        self.working_path = working_path
        self.checkpoint_via_working = checkpoint_via_working
        self.interrupt_on_invalid_action_limit = interrupt_on_invalid_action_limit
        self.delegate = delegate

    def execute(
        self,
        tool: str,
        arguments: Any,
        call_id: str,
    ) -> ToolExecution:
        restore_pending = bool(
            self.controller.compact_restore_marker is not None
            and self.controller.compact_restore_marker.exists()
        )
        checkpoint_pending = bool(
            self.controller.compact_checkpoint_marker is not None
            and self.controller.compact_checkpoint_marker.exists()
        )
        if getattr(self.controller, "retry_boundary_pending", False):
            return ToolExecution("Retry recovery is being delivered.", False)
        if restore_pending:
            return ToolExecution("Compact recovery is being delivered.", False)
        if checkpoint_pending and not restore_pending:
            allowed_checkpoint_tools = (
                {"read_working", "write_working"}
                if self.checkpoint_via_working
                else {"save_compact_checkpoint"}
            )
            if tool not in allowed_checkpoint_tools:
                return ToolExecution(
                    (
                        "Review and update WORKING.md so it preserves relevant "
                        "existing information and contains the complete continuation "
                        "state needed after compaction."
                        if self.checkpoint_via_working
                        else "Save the compact checkpoint before using another tool."
                    ),
                    False,
                )

        if self.delegate is not None:
            return self.delegate.execute(tool, arguments, call_id)
        if not isinstance(arguments, dict):
            arguments = {}
        if tool == "read_guide":
            return self._read_guide(arguments)
        if tool == "read_working":
            return self._read_working(arguments)
        if tool == "write_guide":
            return self._write_guide(arguments)
        if tool == "write_working":
            return self._write_working(arguments)
        if tool in {
            "save_compact_checkpoint",
            "inspect",
            "read_pixels",
            "history",
            "play",
        }:
            response = self.controller.handle(
                {
                    "method": tool,
                    "request_id": call_id,
                    "arguments": arguments,
                }
            )
            return execution_from_response(
                response,
                interrupt_on_invalid_action_limit=(
                    self.interrupt_on_invalid_action_limit
                ),
            )
        return ToolExecution("Unknown tool.", False)

    def _read_guide(self, arguments: dict[str, Any]) -> ToolExecution:
        if arguments:
            return ToolExecution("Invalid arguments.", False)
        try:
            return ToolExecution(
                self.guide_path.read_text(encoding="utf-8", errors="replace"),
                True,
            )
        except OSError:
            return ToolExecution("GUIDE.md is unavailable.", False)

    def _read_working(self, arguments: dict[str, Any]) -> ToolExecution:
        if arguments:
            return ToolExecution("Invalid arguments.", False)
        try:
            return ToolExecution(
                self.working_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                ),
                True,
            )
        except FileNotFoundError:
            return ToolExecution("WORKING.md does not exist.", True)
        except OSError:
            return ToolExecution("WORKING.md is unavailable.", False)

    def _write_guide(self, arguments: dict[str, Any]) -> ToolExecution:
        content = arguments.get("content")
        if (
            set(arguments) != {"content"}
            or not isinstance(content, str)
            or not content.strip()
            or len(content) > MAX_GUIDE_CHARS
        ):
            return ToolExecution("Invalid GUIDE.md content.", False)
        try:
            atomic_write_text(self.guide_path, content.strip() + "\n")
        except OSError:
            return ToolExecution("GUIDE.md could not be updated.", False)
        return ToolExecution("GUIDE.md updated.", True)

    def _write_working(self, arguments: dict[str, Any]) -> ToolExecution:
        content = arguments.get("content")
        checkpoint_pending = bool(
            self.checkpoint_via_working
            and self.controller.compact_checkpoint_marker is not None
            and self.controller.compact_checkpoint_marker.exists()
        )
        if (
            set(arguments) != {"content"}
            or not isinstance(content, str)
            or not content.strip()
            or len(content) > MAX_WORKING_CHARS
        ):
            return ToolExecution("Invalid WORKING.md content.", False)
        try:
            atomic_write_text(self.working_path, content.strip() + "\n")
            record_method = getattr(self.controller, "record_working_write", None)
            if callable(record_method):
                record_method()
            if checkpoint_pending:
                complete_method = getattr(
                    self.controller,
                    "complete_compact_checkpoint_from_working",
                    None,
                )
                if not callable(complete_method):
                    raise RuntimeError("Compact checkpoint completion is unavailable.")
                complete_method()
        except (OSError, RuntimeError):
            return ToolExecution("WORKING.md could not be updated.", False)
        if checkpoint_pending:
            return ToolExecution(
                "WORKING.md updated; compact checkpoint ready.",
                True,
                interrupt_after=True,
                boundary_reason="compact_checkpoint_saved",
            )
        return ToolExecution("WORKING.md updated.", True)


def execution_from_response(
    response: dict[str, Any],
    *,
    interrupt_on_invalid_action_limit: bool = False,
) -> ToolExecution:
    metadata = response.get("metadata")
    if not isinstance(metadata, dict):
        metadata = {"error": "Controller returned no metadata."}
    execution_images: list[dict[str, Any]] = []
    image = response.get("image")
    if isinstance(image, dict) and isinstance(image.get("data"), str):
        execution_images.append({**image, "steer_text": visual_result_label(metadata)})

    images = response.get("images")
    views = metadata.get("views")
    if isinstance(images, list) and isinstance(views, list):
        if len(images) != len(views):
            return _controller_image_error(
                "Controller returned mismatched inspection views."
            )
        for index, (view, view_image) in enumerate(
            zip(views, images, strict=True), start=1
        ):
            if not isinstance(view, dict) or not isinstance(view_image, dict):
                return _controller_image_error(
                    "Controller returned an invalid inspection view."
                )
            if not isinstance(view_image.get("data"), str):
                return _controller_image_error(
                    "Controller returned an invalid inspection image."
                )
            view_metadata = {
                "visual_kind": "inspection",
                "current_state_unchanged": True,
                "view_count": len(views),
                "index": index,
                **view,
            }
            execution_images.append(
                {
                    **view_image,
                    "steer_text": visual_result_label(view_metadata),
                }
            )
    invalid_action_limit = (
        interrupt_on_invalid_action_limit
        and metadata.get("invalid_action_limit") is True
    )
    return ToolExecution(
        json.dumps(metadata, separators=(",", ":")),
        response.get("ok") is True,
        tuple(execution_images),
        metadata.get("retry_boundary") is True or invalid_action_limit,
        "invalid_action_limit" if invalid_action_limit else None,
    )


def visual_result_label(metadata: dict[str, Any]) -> str:
    if metadata.get("visual_kind") == "inspection":
        attributes = ""
        index = metadata.get("index")
        view_count = metadata.get("view_count")
        if type(index) is int:
            attributes += f' index="{index}"'
        if type(view_count) is int:
            attributes += f' count="{view_count}"'
        attributes += f' turn="{metadata.get("turn")}" frame="{metadata.get("frame")}"'
        region = metadata.get("region")
        if isinstance(region, dict):
            attributes += (
                f' region="{region.get("x")},{region.get("y")},'
                f'{region.get("width")},{region.get("height")}"'
            )
        image_size = metadata.get("image_size")
        if (
            isinstance(image_size, dict)
            and type(image_size.get("width")) is int
            and type(image_size.get("height")) is int
        ):
            attributes += f' size="{image_size["width"]}x{image_size["height"]}"'
        return f"<inspection_visual{attributes}></inspection_visual>"

    visual = metadata.get("visual")
    if not isinstance(visual, dict):
        visual = {}
    turn = visual.get("turn", metadata.get("turn"))
    frame = visual.get("final_frame")
    frame_count = visual.get("frame_count")
    attributes = ""
    detail = visual.get("detail")
    width = visual.get("width")
    height = visual.get("height")
    if isinstance(detail, str):
        attributes += f' detail="{detail}"'
    if type(width) is int and type(height) is int:
        attributes += f' size="{width}x{height}"'
    if metadata.get("recovery_observation") is True:
        meaning = "Current game state restored after context recovery."
    elif metadata.get("action_applied") is True:
        meaning = "Current game state after the action."
    else:
        meaning = "Current game state."
    return (
        f'<current_visual turn="{turn}" frame="{frame}" '
        f'frame_count="{frame_count}"{attributes}>{meaning}</current_visual>'
    )


def atomic_write_text(path: Path, content: str) -> None:
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(content, encoding="utf-8")
    temporary.chmod(0o600)
    temporary.replace(path)


def _controller_image_error(message: str) -> ToolExecution:
    return ToolExecution(json.dumps({"error": message}, separators=(",", ":")), False)

````


## vista-c97c354/src/vista/core/episode.py

````text
"""Run an explicitly bounded task; never invent a continuation or recovery prompt."""

from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from .contracts import Effect
from .profiles import Phase
from .runtime import BudgetExhausted, Status, TaskRuntime

if TYPE_CHECKING:
    from vista.backends.session import BackendSession


@dataclass(frozen=True)
class EpisodeResult:
    status: Status
    final_message: str
    usage: dict[str, int]


def run_episode(runtime: TaskRuntime, backend: BackendSession) -> EpisodeResult:
    if backend.runtime is not runtime:
        raise ValueError("A backend cannot be reused for a different task runtime")
    if "backend_segments" not in runtime.experiment.budgets:
        raise ValueError("run_episode requires an explicit backend_segments limit")
    final_message = ""
    try:
        task_input = runtime.prepare_input(Phase.INITIAL)
        while not runtime.terminal:
            before = runtime.state_revision
            result = backend.run(task_input)
            final_message = result.final_message
            if runtime.terminal:
                break
            if result.boundary == "decision_complete" or (
                runtime.state_revision != before
                and runtime.submission.effect == Effect.ENVIRONMENT
            ):
                runtime.stop("benchmark_decision_loop_required")
                break
            reply = runtime.submit(final_message)
            if runtime.terminal:
                break
            if runtime.experiment.profile.prompts.step is None:
                runtime.stop("nonterminal_response_without_step_prompt")
                break
            task_input = runtime.prepare_input(
                Phase.STEP, public_text=reply.text, observation=reply.observation
            )
    except BudgetExhausted:
        pass
    except Exception:
        runtime.stop("episode_exception", failed=True)
        raise
    finally:
        runtime.close()
    return EpisodeResult(runtime.status, final_message, runtime.usage)


def result_manifest(result: EpisodeResult) -> dict[str, Any]:
    return {
        "status": result.status.value,
        "final_message": result.final_message,
        "usage": result.usage,
    }

````


## vista-c97c354/src/vista/core/io.py

````text
"""Small filesystem helpers shared by runtime-independent orchestration."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, sort_keys=True), encoding="utf-8")

````


## vista-c97c354/src/vista/core/json.py

````text
"""Immutable, JSON-only configuration and public metadata."""

from __future__ import annotations

import json
import math
from collections.abc import Mapping
from types import MappingProxyType
from typing import Any


def freeze(value: Any) -> Any:
    if value is None or type(value) in (str, bool, int):
        return value
    if type(value) is float and math.isfinite(value):
        return value
    if isinstance(value, Mapping):
        if any(type(key) is not str for key in value):
            raise TypeError("JSON object keys must be strings")
        return MappingProxyType({key: freeze(item) for key, item in value.items()})
    if isinstance(value, (list, tuple)):
        return tuple(freeze(item) for item in value)
    raise TypeError("Only finite JSON values are permitted")


def thaw(value: Any) -> Any:
    if isinstance(value, Mapping):
        return {key: thaw(item) for key, item in value.items()}
    if isinstance(value, tuple):
        return [thaw(item) for item in value]
    return value


def canonical(value: Any) -> str:
    return json.dumps(
        thaw(freeze(value)), ensure_ascii=True, sort_keys=True, separators=(",", ":")
    )

````


## vista-c97c354/src/vista/core/player.py

````text
"""Optional task ports for shared transports; session policy lives in the backends."""

from __future__ import annotations

from collections.abc import Callable, Sequence
from dataclasses import dataclass
from typing import Any, Protocol


class ToolExecutor(Protocol):
    def execute(self, tool: str, arguments: Any, call_id: str) -> Any: ...


@dataclass(frozen=True)
class ToolInterface:
    definitions: Sequence[dict[str, Any]]
    executor: ToolExecutor
    action_tools: frozenset[str]
    visual_readers: frozenset[str]
    predict_images: Callable[[str, object], int]
    acknowledge: Callable[[str | None], None]


@dataclass(frozen=True)
class RecoveryPrompts:
    compact: Callable[[Any], str]
    retry: Callable[[Any], str]
    runtime: Callable[[Any], str]
    fresh_runtime: Callable[[Any], str]

````


## vista-c97c354/src/vista/core/profiles.py

````text
"""Explicit experiment identity and per-session instructions, without presets."""

from __future__ import annotations

import hashlib
from collections.abc import Mapping
from dataclasses import dataclass, field
from enum import StrEnum
from typing import Any

from .contracts import ToolSpec
from .json import canonical, freeze, thaw


class ContextMode(StrEnum):
    CONTINUOUS = "continuous"
    FRESH = "fresh"


class InteractionMode(StrEnum):
    TOOLS = "native-tools"
    FINAL = "final-answer"
    STRUCTURED = "structured-reply"


class CompactionMode(StrEnum):
    NATIVE = "native"
    CHECKPOINT = "checkpoint-handoff"


class Phase(StrEnum):
    INITIAL = "initial"
    STEP = "step"
    RETRY = "retry"
    CHECKPOINT = "checkpoint"
    COMPACT = "compact"
    RECOVERY = "recovery"


@dataclass(frozen=True)
class PromptBundle:
    system: str
    initial: str
    step: str | None = None
    retry: str | None = None
    checkpoint: str | None = None
    compact: str | None = None
    recovery: str | None = None

    def __post_init__(self) -> None:
        if not self.system.strip():
            raise ValueError("System instructions must be explicit")
        for phase in Phase:
            text = getattr(self, phase.value)
            if text is not None and (not isinstance(text, str) or not text.strip()):
                raise ValueError("Configured prompt phases must not be empty")
        if self.initial is None:
            raise ValueError("An initial prompt is required")

    def for_phase(self, phase: Phase) -> str:
        text = getattr(self, Phase(phase).value)
        if text is None:
            raise ValueError(f"The profile does not permit the {phase} prompt phase")
        return text

    def manifest(self) -> dict[str, str | None]:
        return {
            "system": self.system,
            **{p.value: getattr(self, p.value) for p in Phase},
        }


@dataclass(frozen=True)
class SessionPolicy:
    context: ContextMode = ContextMode.CONTINUOUS
    interaction: InteractionMode = InteractionMode.TOOLS
    compaction: CompactionMode = CompactionMode.NATIVE
    one_action_per_turn: bool = False

    def __post_init__(self) -> None:
        object.__setattr__(self, "context", ContextMode(self.context))
        object.__setattr__(self, "interaction", InteractionMode(self.interaction))
        object.__setattr__(self, "compaction", CompactionMode(self.compaction))
        if type(self.one_action_per_turn) is not bool:
            raise ValueError("one_action_per_turn must be boolean")


@dataclass(frozen=True)
class AgentProfile:
    profile_id: str
    tools: tuple[str, ...]
    prompts: PromptBundle
    policy: SessionPolicy = field(default_factory=SessionPolicy)

    def __post_init__(self) -> None:
        object.__setattr__(self, "tools", tuple(self.tools))
        if not self.profile_id or len(set(self.tools)) != len(self.tools):
            raise ValueError("A profile needs an identity and unique tool names")

    def validate_tools(self, specs: tuple[ToolSpec, ...]) -> None:
        if tuple(spec.name for spec in specs) != self.tools:
            raise ValueError("Resolved tools must exactly match the profile order")
        if self.policy.interaction != InteractionMode.TOOLS and specs:
            raise ValueError(
                "Final/structured reply profiles cannot expose native tools"
            )

    def manifest(self) -> dict[str, Any]:
        return {
            "id": self.profile_id,
            "tools": list(self.tools),
            "prompts": self.prompts.manifest(),
            "context": self.policy.context.value,
            "interaction": self.policy.interaction.value,
            "compaction": self.policy.compaction.value,
            "one_action_per_turn": self.policy.one_action_per_turn,
        }


@dataclass(frozen=True)
class Experiment:
    benchmark: str
    benchmark_revision: str
    protocol: str
    profile: AgentProfile
    backend: str
    model: str
    effort: str
    presentation: Mapping[str, Any]
    budgets: Mapping[str, int]
    evaluator: str

    def __post_init__(self) -> None:
        if self.backend not in {"codex", "claude"}:
            raise ValueError("Unsupported backend")
        if not all(
            (
                self.benchmark,
                self.benchmark_revision,
                self.protocol,
                self.model,
                self.effort,
                self.evaluator,
            )
        ):
            raise ValueError("Experiment identity must be explicit")
        object.__setattr__(self, "presentation", freeze(self.presentation))
        object.__setattr__(self, "budgets", freeze(self.budgets))
        for name, limit in self.budgets.items():
            if not name or type(limit) is not int or limit < 0:
                raise ValueError("Budgets must be named nonnegative integer limits")

    def manifest(self) -> dict[str, Any]:
        return {
            "schema_version": 1,
            "benchmark": self.benchmark,
            "benchmark_revision": self.benchmark_revision,
            "protocol": self.protocol,
            "profile": self.profile.manifest(),
            "backend": self.backend,
            "model": self.model,
            "effort": self.effort,
            "presentation": thaw(self.presentation),
            "budgets": thaw(self.budgets),
            "evaluator": self.evaluator,
        }

    @property
    def identity(self) -> str:
        return hashlib.sha256(canonical(self.manifest()).encode("ascii")).hexdigest()

    def matched_environment(self, other: Experiment) -> bool:
        first, second = self.manifest(), other.manifest()
        first.pop("profile")
        second.pop("profile")
        return first == second

````


## vista-c97c354/src/vista/core/prompts/__init__.py

````text
"""Shared VISTA method prompts; benchmarks own their task objectives."""

from importlib.resources import files


def vista_method(backend: str) -> str:
    if backend not in {"codex", "claude"}:
        raise ValueError("Unknown backend")
    return files(__package__).joinpath(f"{backend}.md").read_text(encoding="utf-8")

````


## vista-c97c354/src/vista/core/prompts/claude.md

````text
# Visual game task

Build and use a compact, revisable model of the game and its current state. Update it as new evidence changes what is supported.

Before each registered game action, briefly state what you expect to see. Afterward, briefly state all visible changes, expected or not.

Keep concise, durable, revisable game understanding in `GUIDE.md`; use `WORKING.md` as a scratchpad when useful.

````


## vista-c97c354/src/vista/core/prompts/codex.md

````text
# Visual game task

Build and use a compact, revisable model of the game and its current state. Update it as new evidence changes what is supported.

Before each registered game action, briefly state what you expect to see. Afterward, briefly state all visible changes, expected or not.

Keep concise, durable, revisable game understanding in `GUIDE.md`; use `WORKING.md` as a scratchpad when useful.

````


## vista-c97c354/src/vista/core/runtime.py

````text
"""Serialized, allowlisted task execution shared by both CLI transports."""

from __future__ import annotations

import hashlib
import threading
import traceback
from dataclasses import dataclass, field, replace
from enum import StrEnum
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator
from referencing import Registry

from .artifacts import ArtifactStore
from .contracts import (
    Capability,
    Effect,
    EvidenceKind,
    ObservationBundle,
    TaskSession,
    ToolExecution,
    ToolReply,
    ToolSpec,
)
from .json import canonical, thaw
from .profiles import CompactionMode, Experiment, Phase


class Status(StrEnum):
    RUNNING = "running"
    COMPLETED = "completed"
    BUDGET = "budget_exhausted"
    FAILED = "failed"
    STOPPED = "stopped"


class BudgetExhausted(RuntimeError):
    """A normal stopping condition, not a failed backend call."""


@dataclass(frozen=True)
class TaskInput:
    text: str
    observation: ObservationBundle = field(default_factory=ObservationBundle)
    phase: Phase = Phase.INITIAL
    context_key: str = "task"
    blocks: tuple[str | ObservationBundle, ...] = ()
    image_labels: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "phase", Phase(self.phase))
        if (
            not isinstance(self.text, str)
            or not self.text.strip()
            or not isinstance(self.context_key, str)
            or not self.context_key
        ):
            raise ValueError("A model input needs text and a context key")
        if not isinstance(self.observation, ObservationBundle):
            raise TypeError("A model input must use an ObservationBundle")
        object.__setattr__(self, "blocks", tuple(self.blocks))
        object.__setattr__(self, "image_labels", tuple(self.image_labels))
        if self.image_labels and (
            len(self.image_labels)
            != sum(len(item.views) for item in self.observation.displayed_observations)
            or any(
                not isinstance(label, str) or not label for label in self.image_labels
            )
        ):
            raise ValueError("Image labels must match the supplied visuals in order")
        if self.blocks:
            observations = []
            displayed = []
            for block in self.blocks:
                if isinstance(block, ObservationBundle):
                    observations.extend(block.observations)
                    displayed.extend(block.displayed_observations)
                elif not isinstance(block, str) or not block.strip():
                    raise TypeError(
                        "Ordered input blocks must be nonempty text or observations"
                    )
            if (
                tuple(observations) != self.observation.observations
                or tuple(displayed) != self.observation.displayed_observations
            ):
                raise ValueError(
                    "Ordered blocks must contain the declared observations exactly once"
                )

    def block_manifest(self) -> list[dict[str, Any]]:
        return [
            {"text": block}
            if isinstance(block, str)
            else {"observation": block.manifest()}
            for block in self.blocks
        ]


class TaskRuntime:
    def __init__(
        self,
        session: TaskSession,
        experiment: Experiment,
        *,
        artifact_dir: Path,
    ) -> None:
        self.session = session
        self.experiment = experiment
        self.submission = session.submission
        from .support import TaskContext

        self.context = TaskContext(session.task, experiment.backend)
        support = tuple(
            binding
            for binding in self.context.tools
            if binding.spec.name in experiment.profile.tools
        )
        bindings = (*session.tools, *support)
        all_bindings = {binding.spec.name: binding for binding in bindings}
        if len(all_bindings) != len(bindings):
            raise ValueError("Duplicate task tool names")
        unknown = set(experiment.profile.tools) - all_bindings.keys()
        if unknown:
            raise ValueError(
                f"The profile requested unavailable tools: {sorted(unknown)}"
            )
        self._bindings = {name: all_bindings[name] for name in experiment.profile.tools}
        self.specs = tuple(binding.spec for binding in self._bindings.values())
        experiment.profile.validate_tools(self.specs)
        self._validators = {}
        for spec in self.specs:
            schema = thaw(spec.input_schema)
            Draft202012Validator.check_schema(schema)
            self._validators[spec.name] = Draft202012Validator(
                schema, registry=Registry()
            )
        meters = {"tool_calls", "backend_segments", "final_answers"}
        meters.update(meter for spec in self.specs for meter in spec.costs)
        meters.update(self.submission.costs)
        if set(experiment.budgets) - meters:
            raise ValueError(
                "A budget names a meter not declared by the selected tools"
            )
        self._usage: dict[str, int] = {}
        self._seen_calls: set[str] = set()
        self._pending: str | None = None
        self._lock = threading.RLock()
        self._status = Status.RUNNING
        self._closed = False
        self._failure: str | None = None
        self._boundary: str | None = None
        self._phase = Phase.INITIAL
        self._context_key = "task"
        self._context_images: dict[str, int] = {}
        self._context_tokens: dict[str, int] = {}
        self.state_revision = 0
        self.current_observation = session.task.observation
        self.artifacts = ArtifactStore(artifact_dir)
        configuration = {
            **experiment.manifest(),
            "evidence_protocol": "event-moment-view",
            "pixel_readout_protocol": (
                f"rgb-{self.context.pixel_readout_color_bits}bit-palette-per-"
                f"{self.context.pixel_readout_palette_scope}"
            ),
            **(
                {"recovery_protocol": "notes-current-history-reference"}
                if experiment.profile.policy.compaction == CompactionMode.CHECKPOINT
                else {}
            ),
            "submission_contract": self.submission.manifest(),
            "tool_contracts": [
                {
                    **spec.public_definition(),
                    "capability": spec.capability.value,
                    "effect": spec.effect.value,
                    "max_images": spec.max_images,
                    "costs": thaw(spec.costs),
                    "dispatch_invalid": spec.dispatch_invalid,
                }
                for spec in self.specs
            ],
        }
        self.identity = hashlib.sha256(
            canonical(configuration).encode("ascii")
        ).hexdigest()
        self.artifacts.manifest(
            {
                **configuration,
                "configuration_id": experiment.identity,
                "experiment_id": self.identity,
                "task": {
                    "id": session.task.task_id,
                    "objective": session.task.objective,
                    "context": thaw(session.task.context),
                    "observation": session.task.observation.manifest(),
                },
            }
        )
        self.artifacts.evidence(session.task.observation)
        self.context.bind(self, artifact_dir / "context")

    @property
    def status(self) -> Status:
        return self._status

    @property
    def public_events(self) -> list[dict[str, Any]]:
        return self.context.public_events

    @property
    def terminal(self) -> bool:
        return self._status != Status.RUNNING or self._closed

    @property
    def failure(self) -> str | None:
        return self._failure

    @property
    def usage(self) -> dict[str, int]:
        with self._lock:
            return dict(self._usage)

    @property
    def pending_call(self) -> str | None:
        with self._lock:
            return self._pending

    @property
    def boundary(self) -> str | None:
        return self._boundary

    def observe_context_tokens(self, tokens: int) -> None:
        with self._lock:
            if type(tokens) is int and tokens >= 0:
                self._context_tokens[self._context_key] = tokens

    def fresh_context(
        self, context_key: str | None = None, *, redelivery: bool = False
    ) -> None:
        with self._lock:
            if self._pending is not None and not redelivery:
                raise RuntimeError("Cannot replace a context before result delivery")
            key = context_key or self._context_key
            self._context_images.pop(key, None)
            self._context_tokens.pop(key, None)
            self.artifacts.record("fresh_context", {"context_key": key})

    def tools(self) -> list[dict[str, Any]]:
        return [spec.public_definition() for spec in self.specs]

    def matched_environment(self, other: TaskRuntime) -> bool:
        """Structural comparison guard; semantic adapter validation is still required."""

        def interface(runtime: TaskRuntime) -> list[dict[str, Any]]:
            return [
                {
                    **spec.public_definition(),
                    "effect": spec.effect.value,
                    "max_images": spec.max_images,
                    "costs": thaw(spec.costs),
                    "dispatch_invalid": spec.dispatch_invalid,
                }
                for spec in runtime.specs
                if spec.capability in {Capability.ACTION, Capability.SUBMISSION}
            ]

        return (
            self.experiment.matched_environment(other.experiment)
            and self.session.task == other.session.task
            and self.submission == other.submission
            and interface(self) == interface(other)
        )

    def spec(self, name: str) -> ToolSpec | None:
        binding = self._bindings.get(name)
        return binding.spec if binding is not None else None

    def prepare_input(
        self,
        phase: Phase,
        *,
        public_text: str = "",
        observation: ObservationBundle | None = None,
        context_key: str = "task",
        blocks: tuple[str | ObservationBundle, ...] = (),
    ) -> TaskInput:
        """Compose only the selected phase and explicitly supplied public content."""
        with self._lock:
            if self.terminal or self._pending is not None:
                raise RuntimeError("The session is not ready for another model input")
            phase = Phase(phase)
            prompt = self.experiment.profile.prompts.for_phase(phase)
            if not context_key or not isinstance(public_text, str):
                raise ValueError("Invalid public input")
            if observation is None:
                observation = (
                    self.session.task.observation
                    if phase == Phase.INITIAL
                    else ObservationBundle()
                )
            text = "\n\n".join(part for part in (prompt, public_text) if part)
            return TaskInput(text, observation, phase, context_key, blocks)

    def present_input(self, task_input: TaskInput) -> TaskInput:
        return replace(
            task_input, image_labels=self.context.labels(task_input.observation)
        )

    def begin_turn(self, task_input: TaskInput, *, redelivery: bool = False) -> None:
        with self._lock:
            self.experiment.profile.prompts.for_phase(task_input.phase)
            if self.terminal or (self._pending is not None and not redelivery):
                raise RuntimeError("The session is not ready for a model turn")
            if not self._charge({"backend_segments": 1}):
                raise BudgetExhausted("Backend segment budget exhausted")
            self._boundary = None
            self._phase = task_input.phase
            self._context_key = task_input.context_key
            self._context_images[self._context_key] = self._context_images.get(
                self._context_key, 0
            ) + sum(
                len(item.views)
                for item in task_input.observation.displayed_observations
            )
            self.artifacts.evidence(task_input.observation)
            self._observe_current(task_input.observation)
            self.artifacts.record(
                "model_input",
                {
                    "phase": task_input.phase.value,
                    "context_key": task_input.context_key,
                    "text": task_input.text,
                    "observation": task_input.observation.manifest(),
                    "blocks": task_input.block_manifest(),
                    "image_labels": self.context.labels(task_input.observation),
                },
            )

    def execute(self, tool: str, arguments: Any, call_id: str) -> ToolExecution:
        with self._lock:
            if self.terminal:
                return ToolExecution("The task session has ended.", False)
            if self._boundary is not None:
                return ToolExecution(
                    "This decision has ended; no further tool was executed.",
                    False,
                    interrupt_after=True,
                    boundary_reason=self._boundary,
                )
            if not isinstance(call_id, str) or not call_id:
                return ToolExecution("Invalid tool request identity.", False)
            if call_id in self._seen_calls:
                return ToolExecution(
                    "Duplicate tool request; nothing was executed.", False
                )
            self._seen_calls.add(call_id)
            if not self._charge({"tool_calls": 1}):
                return self._stopped_execution("Tool call budget exhausted.")
            binding = self._bindings.get(tool)
            if binding is None:
                return self._rejected(call_id, tool, "Unknown or disabled tool.")
            if binding.spec.requires_ack and self._pending is not None:
                return self._rejected(
                    call_id, tool, "Observe the previous result before changing state."
                )
            if self._phase == Phase.CHECKPOINT and binding.spec.capability not in {
                Capability.MEMORY,
                Capability.CHECKPOINT,
            }:
                return self._rejected(
                    call_id,
                    tool,
                    "Only memory tools are available during checkpointing.",
                )
            try:
                canonical(arguments)
                valid = isinstance(arguments, dict) and self._validators[tool].is_valid(
                    arguments
                )
            except Exception:
                valid = False
                # Non-JSON input is a counted no-action attempt for adapters
                # that own invalid-output semantics, not an artifact failure.
                if binding.spec.dispatch_invalid:
                    arguments = None
            if not valid and not binding.spec.dispatch_invalid:
                return self._rejected(call_id, tool, "Invalid tool arguments.")
            if not self._charge(dict(binding.spec.costs)):
                return self._stopped_execution("The task budget is exhausted.")
            self.artifacts.record(
                "tool_started",
                {
                    "call_id": call_id,
                    "tool": tool,
                    "arguments": arguments,
                },
            )
            try:
                reply = binding.handler(arguments)
                if not isinstance(reply, ToolReply):
                    raise TypeError("A task handler did not return ToolReply")
                if (
                    binding.spec.capability == Capability.ACTION
                    and self.experiment.profile.policy.one_action_per_turn
                    and not reply.finished
                    and reply.boundary is None
                ):
                    reply = replace(reply, boundary="decision_complete")
                image_count = sum(
                    len(item.views) for item in reply.observation.displayed_observations
                )
                if image_count > binding.spec.max_images:
                    raise ValueError("A handler exceeded its declared image bound")
                if reply.boundary == "compact_checkpoint_saved" and (
                    binding.spec.capability
                    not in {Capability.CHECKPOINT, Capability.MEMORY}
                    or self.experiment.profile.policy.compaction
                    != CompactionMode.CHECKPOINT
                ):
                    raise ValueError(
                        "Checkpoint boundary requires a configured checkpoint tool"
                    )
                if (
                    reply.boundary == "decision_complete"
                    and binding.spec.capability != Capability.ACTION
                ):
                    raise ValueError("Only an action can end an environment decision")
                self.artifacts.evidence(reply.observation)
                event = None
                if binding.spec.effect == Effect.ENVIRONMENT:
                    event = self._record_environment_result(tool, arguments, reply)
                else:
                    self.context.observe(reply.observation, update_current=False)
                images = self.context.images(reply.observation, event=event)
            except Exception:
                self._handler_failed(call_id)
                return self._stopped_execution(
                    "The task handler failed; execution stopped."
                )
            if binding.spec.requires_ack:
                self._pending = call_id
            self._context_images[self._context_key] = self._context_images.get(
                self._context_key, 0
            ) + len(images)
            self._boundary = reply.boundary
            self.artifacts.record(
                "tool_result",
                {
                    "call_id": call_id,
                    "success": reply.success,
                    "text": reply.text,
                    "observation": reply.observation.manifest(),
                    "image_labels": [image["steer_text"] for image in images],
                    "finished": reply.finished,
                    "boundary": reply.boundary,
                },
            )
            if reply.finished:
                self._status = Status.COMPLETED
            return ToolExecution(
                reply.text,
                reply.success,
                images,
                reply.finished or reply.boundary is not None,
                "task_complete" if reply.finished else reply.boundary,
                images_before_interrupt=reply.finished or reply.boundary is not None,
            )

    def acknowledge(self, call_id: str | None = None) -> None:
        with self._lock:
            if self._pending is not None and (
                call_id is None or call_id == self._pending
            ):
                self.artifacts.record("result_delivered", {"call_id": self._pending})
                self._pending = None

    def submit(self, answer: str) -> ToolReply:
        with self._lock:
            if self.terminal or self._pending is not None:
                raise RuntimeError("The session cannot accept a final response now")
            if not isinstance(answer, str):
                raise TypeError("A final response must be text")
            if not self._charge({"final_answers": 1, **dict(self.submission.costs)}):
                return ToolReply("Final response budget exhausted.", success=False)
            self.artifacts.record("final_response", {"text": answer})
            try:
                reply = self.session.submit(answer)
                if not isinstance(reply, ToolReply):
                    raise TypeError("A submission handler did not return ToolReply")
                if (
                    sum(
                        len(item.views)
                        for item in reply.observation.displayed_observations
                    )
                    > self.submission.max_images
                ):
                    raise ValueError(
                        "A submission handler exceeded its declared image bound"
                    )
                self.artifacts.evidence(reply.observation)
                if self.submission.effect == Effect.ENVIRONMENT:
                    self._record_environment_result(None, None, reply)
                else:
                    self.context.observe(reply.observation, update_current=False)
            except Exception:
                self._handler_failed("final_response")
                return ToolReply("The task submission failed.", success=False)
            self.artifacts.record(
                "submission_result",
                {
                    "text": reply.text,
                    "success": reply.success,
                    "finished": reply.finished,
                    "observation": reply.observation.manifest(),
                },
            )
            if reply.finished:
                self._status = Status.COMPLETED
            return reply

    def stop(self, reason: str, *, failed: bool = False) -> None:
        with self._lock:
            if not self._closed and (not self.terminal or failed):
                self._status = Status.FAILED if failed else Status.STOPPED
                self._failure = reason
                self.artifacts.record(
                    "stopped", {"reason": reason, "status": self.status.value}
                )

    def close(self) -> None:
        with self._lock:
            if self._closed:
                return
            self.stop("session_closed")
            self._closed = True
            try:
                self.session.close()
            except Exception:
                self._handler_failed("session_close")
                raise
            finally:
                self.artifacts.record(
                    "closed", {"status": self.status.value, "usage": self.usage}
                )

    def _observe_current(self, bundle: ObservationBundle) -> None:
        current = tuple(
            item for item in bundle.observations if item.kind == EvidenceKind.CURRENT
        )
        if current:
            self.current_observation = ObservationBundle(current)
        self.context.observe(bundle)

    def _record_environment_result(
        self, tool: str | None, arguments: Any, reply: ToolReply
    ) -> str:
        event = self.context.record_event(
            reply.observation,
            action={"name": tool, "arguments": arguments} if tool is not None else None,
            success=reply.success,
            result=reply.text if reply.event_text is None else reply.event_text,
            environment=True,
        )
        self.state_revision += 1
        self.current_observation = self.context.current
        return event

    def _charge(self, costs: dict[str, int]) -> bool:
        for meter, cost in costs.items():
            limit = self.experiment.budgets.get(meter)
            if limit is not None and self._usage.get(meter, 0) + cost > limit:
                self._status = Status.BUDGET
                self._failure = meter
                self.artifacts.record("budget_exhausted", {"meter": meter})
                return False
        for meter, cost in costs.items():
            self._usage[meter] = self._usage.get(meter, 0) + cost
        return True

    def _handler_failed(self, call_id: str) -> None:
        self._status = Status.FAILED
        self._failure = "task_handler_failed"
        self.artifacts.record(
            "private_failure",
            {
                "call_id": call_id,
                "traceback": traceback.format_exc(),
            },
        )

    def _rejected(self, call_id: str, tool: str, message: str) -> ToolExecution:
        self.artifacts.record(
            "rejected", {"call_id": call_id, "tool": tool, "reason": message}
        )
        return ToolExecution(message, False)

    def _stopped_execution(self, text: str) -> ToolExecution:
        return ToolExecution(
            text, False, interrupt_after=True, boundary_reason=self.status.value
        )

````


## vista-c97c354/src/vista/core/session.py

````text
"""Checkpoint and visual-evidence operations shared by task controllers."""

from __future__ import annotations

import base64
import io
import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from PIL import Image

MAX_GUIDE_CHARS = 64 * 1024
MAX_WORKING_CHARS = 16 * 1024
MAX_INSPECTION_VIEWS = 16
MAX_INSPECTION_QUESTION_CHARS = 1024
MAX_INSPECTION_LABEL_CHARS = 128
MAX_PIXEL_READOUT_VIEWS = 64
MAX_PIXEL_READOUT_SAMPLES = 4096
PIXEL_READOUT_SYMBOLS = (
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
)


@dataclass(frozen=True)
class CompactRecovery:
    guide: str
    working_memory: str
    current_observation: dict[str, Any]
    last_action_result: dict[str, Any] | None
    objective_history: dict[str, Any]
    image_paths: tuple[Path, ...]


@dataclass(frozen=True)
class RetryRecovery:
    boundary_step: int
    guide: str | None
    working_memory: str | None
    working_provenance: dict[str, Any] | None
    current_observation: dict[str, Any]
    last_action_result: dict[str, Any] | None
    objective_history: dict[str, Any]
    image_paths: tuple[Path, ...]


@dataclass(frozen=True)
class RuntimeRecovery:
    boundary_step: int
    current_observation: dict[str, Any]
    last_action_result: dict[str, Any] | None
    image_paths: tuple[Path, ...]
    guide: str | None = None
    working_memory: str | None = None
    working_provenance: dict[str, Any] | None = None
    objective_history: dict[str, Any] = field(default_factory=dict)


class SessionController:
    def _atomic_write_text(self, path: Path, content: str, *, mode: int) -> None:
        atomic_write_text(path, content, mode=mode)

    def visual_size(self) -> tuple[int, int]:
        return self.display_size, self.display_size

    def initial_metadata(self) -> dict[str, Any]:
        return self._metadata(action_applied=False)

    def initial_image_paths(self) -> list[Path]:
        if self.observation_mode not in {"vision", "both"}:
            return []
        return self._selected_images()

    def request_fresh_recovery(self) -> None:
        """Start a fresh player from the current, unchanged game state."""
        with self._lock:
            if self.terminal:
                raise RuntimeError("Cannot recover a terminal game.")
            if self._retry_boundary_step is not None:
                raise RuntimeError("A fresh recovery is already pending.")
            self._retry_boundary_step = self.step_index
            self._mark_retry_boundary()

    def begin_runtime_recovery(self) -> RuntimeRecovery:
        """Snapshot the authoritative game state after a player-runtime failure."""
        with self._lock:
            if self.terminal:
                raise RuntimeError("Cannot recover a terminal game.")
            images = (
                tuple(self._selected_images())
                if self.observation_mode in {"vision", "both"}
                else ()
            )
            if self.observation_mode in {"vision", "both"} and not images:
                raise RuntimeError("The current final visual is missing.")
            guide = None
            if self.guide_path is not None and self.guide_path.is_file():
                guide = self.guide_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                )
            working_memory = None
            if self.working_path is not None and self.working_path.is_file():
                working_memory = self.working_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                )
            return RuntimeRecovery(
                boundary_step=self.step_index,
                guide=guide,
                working_memory=working_memory,
                working_provenance=self._read_working_provenance(),
                current_observation=self._metadata(action_applied=False),
                last_action_result=(dict(self._events[-1]) if self._events else None),
                objective_history=self._attempt_history(),
                image_paths=images,
            )

    def complete_runtime_recovery(
        self,
        recovery: RuntimeRecovery,
        *,
        delivery: str = "resumed_runtime_thread",
    ) -> None:
        with self._lock:
            if self.terminal or recovery.boundary_step != self.step_index:
                raise RuntimeError("Runtime recovery is no longer current.")
            if delivery not in {
                "resumed_runtime_thread",
                "fresh_runtime_thread",
                "fresh_continuation_thread",
                "same_session_native_compact",
            }:
                raise ValueError("Unknown runtime recovery delivery.")
            append_jsonl(
                self.recovery_log_path,
                {
                    "step": self.step_index,
                    "action_applied": False,
                    "delivery": delivery,
                },
            )

    def discard_compact_recovery(self) -> None:
        with self._lock:
            self._clear_compact_recovery_files()
            self._clear_retry_boundary_marker()

    def begin_retry_recovery(self) -> RetryRecovery:
        with self._lock:
            if self._retry_boundary_step is None:
                raise RuntimeError("No retry boundary is pending.")
            self._clear_compact_recovery_files()
            images = (
                tuple(self._selected_images())
                if self.observation_mode in {"vision", "both"}
                else ()
            )
            if self.observation_mode in {"vision", "both"} and not images:
                raise RuntimeError("The reset visual is missing.")
            guide = None
            if self.guide_path is not None and self.guide_path.is_file():
                guide = self.guide_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                )
            working_memory = None
            if self.working_path is not None and self.working_path.is_file():
                working_memory = self.working_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                )
            return RetryRecovery(
                boundary_step=self._retry_boundary_step,
                guide=guide,
                working_memory=working_memory,
                working_provenance=self._read_working_provenance(),
                current_observation=self._metadata(action_applied=False),
                last_action_result=(dict(self._events[-1]) if self._events else None),
                objective_history=self._attempt_history(),
                image_paths=images,
            )

    def complete_retry_recovery(self, recovery: RetryRecovery) -> None:
        with self._lock:
            if (
                self._retry_boundary_step is None
                or recovery.boundary_step != self._retry_boundary_step
                or recovery.boundary_step != self.step_index
            ):
                raise RuntimeError("Retry recovery is no longer pending.")
            current_guide = None
            if self.guide_path is not None and self.guide_path.is_file():
                current_guide = self.guide_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                )
            if current_guide != recovery.guide:
                raise RuntimeError("Retry recovery guide changed before delivery.")
            current_working = None
            if self.working_path is not None and self.working_path.is_file():
                current_working = self.working_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                )
            if (
                current_working != recovery.working_memory
                or self._read_working_provenance() != recovery.working_provenance
            ):
                raise RuntimeError(
                    "Retry recovery working state changed before delivery."
                )
            self._retry_boundary_step = None
            self._clear_compact_recovery_files()
            self._clear_retry_boundary_marker()
            append_jsonl(
                self.recovery_log_path,
                {
                    "step": self.step_index,
                    "action_applied": False,
                    "delivery": "fresh_retry_thread",
                },
            )

    def request_compact_checkpoint(self, *, reason: str) -> None:
        """Request an agent-authored checkpoint without changing game state."""

        with self._lock:
            if self.terminal:
                raise RuntimeError("Cannot checkpoint a terminal game.")
            if (
                self.compact_checkpoint_marker is None
                or self.compact_checkpoint_ready is None
                or self.compact_restore_marker is None
                or self.compact_guide_snapshot is None
            ):
                raise RuntimeError("Compact checkpoint paths are unavailable.")
            if self.compact_restore_marker.exists():
                raise RuntimeError("Compact recovery is already pending.")
            if self.compact_checkpoint_ready.exists():
                raise RuntimeError("A stale compact checkpoint is already present.")
            self.compact_checkpoint_marker.parent.mkdir(parents=True, exist_ok=True)
            self.compact_checkpoint_marker.touch(mode=0o600, exist_ok=True)
            append_jsonl(
                self.recovery_log_path,
                {
                    "step": self.step_index,
                    "action_applied": False,
                    "delivery": "checkpoint_requested",
                    "reason": reason,
                },
            )

    def complete_compact_checkpoint_from_working(self) -> None:
        """Mark an already-written WORKING.md as ready for fresh-thread recovery."""

        with self._lock:
            if (
                self.compact_checkpoint_marker is None
                or not self.compact_checkpoint_marker.is_file()
                or self.compact_checkpoint_ready is None
                or self.working_path is None
                or not self.working_path.is_file()
                or self.guide_path is None
                or not self.guide_path.is_file()
                or not self.working_provenance_path.is_file()
            ):
                raise RuntimeError("Compact checkpoint data is incomplete.")
            if self.compact_checkpoint_ready.exists():
                return
            working = self.working_path.read_text(encoding="utf-8", errors="replace")
            guide = self.guide_path.read_text(encoding="utf-8", errors="replace")
            if not working.strip() or not guide.strip():
                raise RuntimeError("Compact checkpoint data is empty.")
            append_jsonl(
                self.recovery_log_path,
                {
                    "step": self.step_index,
                    "action_applied": False,
                    "delivery": "checkpoint_saved_via_working",
                    "guide_chars": len(guide),
                    "working_chars": len(working),
                },
            )
            self.compact_checkpoint_ready.parent.mkdir(parents=True, exist_ok=True)
            self.compact_checkpoint_ready.touch(mode=0o600)

    def begin_compact_recovery(self) -> CompactRecovery:
        with self._lock:
            try:
                required_paths = (
                    self.compact_checkpoint_marker,
                    self.compact_checkpoint_ready,
                    self.working_path,
                    self.guide_path,
                )
                if any(path is None or not path.is_file() for path in required_paths):
                    raise RuntimeError("Compact checkpoint data is incomplete.")
                if (
                    self.compact_restore_marker is None
                    or self.compact_guide_snapshot is None
                ):
                    raise RuntimeError("Compact recovery paths are unavailable.")

                assert self.guide_path is not None
                assert self.working_path is not None
                guide = self.guide_path.read_text(encoding="utf-8", errors="replace")
                working = self.working_path.read_text(
                    encoding="utf-8", errors="replace"
                )
                if not guide.strip() or not working.strip():
                    raise RuntimeError("Compact checkpoint data is empty.")

                self._atomic_write_text(
                    self.compact_guide_snapshot,
                    guide,
                    mode=0o600,
                )
                self.compact_restore_marker.parent.mkdir(parents=True, exist_ok=True)
                self.compact_restore_marker.touch(mode=0o600)
                images = (
                    tuple(self._selected_images())
                    if self.observation_mode in {"vision", "both"}
                    else ()
                )
                if self.observation_mode in {"vision", "both"} and not images:
                    raise RuntimeError("The current final visual is missing.")
                return CompactRecovery(
                    guide=guide,
                    working_memory=working,
                    current_observation=self._metadata(action_applied=False),
                    last_action_result=(
                        dict(self._events[-1]) if self._events else None
                    ),
                    objective_history=self._attempt_history(),
                    image_paths=images,
                )
            except (OSError, RuntimeError) as exc:
                self.forced_termination_reason = "compact_recovery_failed"
                append_jsonl(
                    self.recovery_log_path,
                    {
                        "step": self.step_index,
                        "action_applied": False,
                        "delivery": "prepare",
                        "error": str(exc),
                    },
                )
                raise RuntimeError("Compact recovery data is unavailable.") from exc

    def complete_compact_recovery(
        self,
        recovery: CompactRecovery,
        *,
        delivery: str = "fresh_thread",
    ) -> None:
        with self._lock:
            try:
                if (
                    self.compact_restore_marker is None
                    or not self.compact_restore_marker.is_file()
                    or self.compact_guide_snapshot is None
                    or not self.compact_guide_snapshot.is_file()
                    or self.working_path is None
                    or not self.working_path.is_file()
                ):
                    raise RuntimeError("Compact recovery is no longer pending.")
                guide = self.compact_guide_snapshot.read_text(
                    encoding="utf-8", errors="replace"
                )
                working = self.working_path.read_text(
                    encoding="utf-8", errors="replace"
                )
                if guide != recovery.guide or working != recovery.working_memory:
                    raise RuntimeError("Compact recovery data changed before delivery.")

                append_jsonl(
                    self.recovery_log_path,
                    {
                        "step": self.step_index,
                        "action_applied": False,
                        "delivery": delivery,
                        "guide_chars": len(guide),
                        "working_chars": len(working),
                    },
                )
                self._clear_compact_recovery_files()
            except (OSError, RuntimeError) as exc:
                self.forced_termination_reason = "compact_recovery_failed"
                raise RuntimeError("Compact recovery could not be completed.") from exc

    def _save_compact_checkpoint(self, arguments: object) -> dict[str, Any]:
        if (
            self.compact_checkpoint_marker is None
            or not self.compact_checkpoint_marker.exists()
            or self.compact_checkpoint_ready is None
            or self.working_path is None
        ):
            return {
                "ok": False,
                "metadata": {"error": "No compact checkpoint is pending."},
            }
        if self.compact_checkpoint_ready.exists():
            if not self.working_path.is_file():
                return {
                    "ok": False,
                    "metadata": {"error": "Compact checkpoint is incomplete."},
                }
            return {
                "ok": True,
                "metadata": {
                    "checkpoint_saved": True,
                    "already_saved": True,
                },
            }
        if not isinstance(arguments, dict) or set(arguments) != {
            "guide",
            "working_memory",
        }:
            return {"ok": False, "metadata": {"error": "Invalid arguments."}}
        guide = arguments.get("guide")
        working_memory = arguments.get("working_memory")
        if guide is not None and (
            not isinstance(guide, str)
            or not guide.strip()
            or len(guide) > MAX_GUIDE_CHARS
            or self.guide_path is None
        ):
            return {
                "ok": False,
                "metadata": {"error": "Invalid GUIDE.md content."},
            }
        if (
            not isinstance(working_memory, str)
            or not working_memory.strip()
            or len(working_memory) > MAX_WORKING_CHARS
        ):
            return {
                "ok": False,
                "metadata": {"error": "Invalid WORKING.md content."},
            }

        try:
            if guide is not None:
                self._atomic_write_text(
                    self.guide_path, guide.strip() + "\n", mode=0o600
                )
            if self.working_provenance_path.exists():
                self.working_provenance_path.unlink()
            self._atomic_write_text(
                self.working_path,
                working_memory.strip() + "\n",
                mode=0o600,
            )
            self._record_working_provenance()
            self.compact_checkpoint_ready.parent.mkdir(parents=True, exist_ok=True)
            self.compact_checkpoint_ready.touch(mode=0o600)
        except OSError:
            return {
                "ok": False,
                "metadata": {"error": "Compact checkpoint could not be saved."},
            }
        return {
            "ok": True,
            "metadata": {
                "checkpoint_saved": True,
                "guide_updated": guide is not None,
                "guide_chars": len(guide.strip()) if guide is not None else 0,
                "working_chars": len(working_memory.strip()),
            },
        }

    def _clear_compact_recovery_files(self) -> None:
        for path in (
            self.compact_guide_snapshot,
            self.compact_restore_marker,
            self.compact_checkpoint_ready,
            self.compact_checkpoint_marker,
        ):
            if path is not None and path.exists():
                path.unlink()

    def _clear_working(self) -> None:
        if self.working_path is not None and self.working_path.exists():
            self.working_path.unlink()
        if self.working_provenance_path.exists():
            self.working_provenance_path.unlink()

    def record_working_write(self) -> dict[str, Any]:
        with self._lock:
            return self._record_working_provenance()

    def _read_working_provenance(self) -> dict[str, Any] | None:
        try:
            value = json.loads(
                self.working_provenance_path.read_text(
                    encoding="utf-8",
                    errors="replace",
                )
            )
        except (FileNotFoundError, OSError, json.JSONDecodeError):
            return None
        return value if isinstance(value, dict) else None

    def _mark_retry_boundary(self) -> None:
        if self.retry_boundary_marker is None:
            return
        self.retry_boundary_marker.parent.mkdir(parents=True, exist_ok=True)
        self.retry_boundary_marker.touch(mode=0o600)

    def _clear_retry_boundary_marker(self) -> None:
        if (
            self.retry_boundary_marker is not None
            and self.retry_boundary_marker.exists()
        ):
            self.retry_boundary_marker.unlink()

    def _inspect(self, arguments: object) -> dict[str, Any]:
        if self.observation_mode not in {"vision", "both"}:
            return self._inspect_error("Visual observations are unavailable.")
        if (
            not isinstance(arguments, dict)
            or set(arguments) != {"question", "views"}
            or not isinstance(arguments.get("question"), str)
            or not arguments["question"].strip()
            or len(arguments["question"]) > MAX_INSPECTION_QUESTION_CHARS
            or not isinstance(arguments.get("views"), list)
            or not 1 <= len(arguments["views"]) <= MAX_INSPECTION_VIEWS
        ):
            return self._inspect_error("Invalid arguments.")

        metadata_views: list[dict[str, Any]] = []
        images: list[dict[str, Any]] = []
        for index, view in enumerate(arguments["views"], start=1):
            try:
                metadata, image = self._inspection_view(view, index)
            except ValueError as exc:
                return self._inspect_error(str(exc))
            metadata_views.append(metadata)
            images.append(image)

        return {
            "ok": True,
            "metadata": {
                "visual_kind": "inspection",
                "current_state_unchanged": True,
                "view_count": len(metadata_views),
                "views": metadata_views,
            },
            "images": images,
        }

    def _inspection_view(
        self,
        selection: object,
        index: int,
    ) -> tuple[dict[str, Any], dict[str, Any]]:
        if (
            not isinstance(selection, dict)
            or not isinstance(selection.get("label"), str)
            or not selection["label"].strip()
            or len(selection["label"]) > MAX_INSPECTION_LABEL_CHARS
            or "turn" not in selection
            or set(selection) - {"label", "turn", "frame", "region"}
        ):
            raise ValueError(f"View {index}: invalid selection.")

        turn = selection.get("turn")
        frame = selection.get("frame")
        if type(turn) is not int or not 0 <= turn <= 999999:
            raise ValueError(f"View {index}: invalid turn.")
        if "frame" in selection and (
            type(frame) is not int or not 0 <= frame <= 999999
        ):
            raise ValueError(f"View {index}: invalid frame.")
        if "region" in selection and selection.get("region") is None:
            raise ValueError(f"View {index}: invalid region.")
        try:
            region = self._inspection_region(selection.get("region"))
        except ValueError as exc:
            raise ValueError(f"View {index}: invalid region.") from exc

        paths = self._turn_frame_paths(turn)
        if not paths:
            raise ValueError(f"View {index}: no frames found for turn {turn}.")
        selected_path = paths[-1]
        if frame is not None:
            matching = [path for path in paths if self._frame_number(path) == frame]
            if not matching:
                raise ValueError(
                    f"View {index}: no frame {frame} found for turn {turn}."
                )
            selected_path = matching[0]
        selected_frame = self._frame_number(selected_path)

        try:
            x, y, width, height = region
            with Image.open(selected_path) as archived:
                if archived.size != self.visual_size():
                    raise ValueError("Archived visual has an unexpected size")
                visual = archived.convert("RGB").crop((x, y, x + width, y + height))
            longest_side = max(width, height)
            rendered_width = width * self.display_size // longest_side
            rendered_height = height * self.display_size // longest_side
            if (rendered_width, rendered_height) != visual.size:
                image = visual.resize(
                    (rendered_width, rendered_height),
                    Image.Resampling.NEAREST,
                )
            else:
                image = visual
            output = io.BytesIO()
            image.save(output, format="PNG")
        except (OSError, ValueError, IndexError, KeyError, TypeError) as exc:
            raise ValueError(
                f"View {index}: archived visual could not be rendered."
            ) from exc

        metadata = {
            "index": index,
            "turn": turn,
            "frame": selected_frame,
            "available_frames": len(paths),
            "available_frame_range": [
                self._frame_number(paths[0]),
                self._frame_number(paths[-1]),
            ],
            "region": {"x": x, "y": y, "width": width, "height": height},
            "image_size": {"width": image.width, "height": image.height},
        }
        return (
            metadata,
            {
                "mime_type": "image/png",
                "detail": "original",
                "data": base64.b64encode(output.getvalue()).decode("ascii"),
            },
        )

    @staticmethod
    def _inspect_error(message: str) -> dict[str, Any]:
        return {"ok": False, "metadata": {"error": message}}

    def _read_pixels(self, arguments: object) -> dict[str, Any]:
        if self.observation_mode not in {"vision", "both"}:
            return self._inspect_error("Visual observations are unavailable.")
        if (
            not isinstance(arguments, dict)
            or set(arguments) != {"question", "views"}
            or not isinstance(arguments.get("question"), str)
            or not arguments["question"].strip()
            or len(arguments["question"]) > MAX_INSPECTION_QUESTION_CHARS
            or not isinstance(arguments.get("views"), list)
            or not 1 <= len(arguments["views"]) <= MAX_PIXEL_READOUT_VIEWS
        ):
            return self._inspect_error("Invalid arguments.")

        sampled_views: list[
            tuple[dict[str, Any], list[list[tuple[int, int, int]]]]
        ] = []
        total_samples = 0
        for index, view in enumerate(arguments["views"], start=1):
            try:
                metadata, samples = self._pixel_readout_view(view, index)
            except ValueError as exc:
                return self._inspect_error(str(exc))
            total_samples += metadata["rows"] * metadata["columns"]
            if total_samples > MAX_PIXEL_READOUT_SAMPLES:
                return self._inspect_error(
                    f"At most {MAX_PIXEL_READOUT_SAMPLES} samples may be requested."
                )
            sampled_views.append((metadata, samples))

        colors = {
            color for _, samples in sampled_views for row in samples for color in row
        }
        unseen_colors = sorted(colors.difference(self._pixel_readout_symbol_by_color))
        if len(self._pixel_readout_symbol_by_color) + len(unseen_colors) > len(
            PIXEL_READOUT_SYMBOLS
        ):
            return self._inspect_error(
                "The pixel readout color limit has been reached."
            )
        for color in unseen_colors:
            self._pixel_readout_symbol_by_color[color] = PIXEL_READOUT_SYMBOLS[
                len(self._pixel_readout_symbol_by_color)
            ]
        palette = {
            symbol: f"#{color[0]:02X}{color[1]:02X}{color[2]:02X}"
            for color, symbol in self._pixel_readout_symbol_by_color.items()
            if color in colors
        }
        palette_symbols = {
            color: self._pixel_readout_symbol_by_color[color] for color in colors
        }
        metadata_views: list[dict[str, Any]] = []
        for metadata, samples in sampled_views:
            metadata["samples"] = [
                "".join(palette_symbols[color] for color in row) for row in samples
            ]
            metadata_views.append(metadata)

        return {
            "ok": True,
            "metadata": {
                "visual_kind": "pixel_readout",
                "current_state_unchanged": True,
                "sampling": "equal-bin-centers",
                "palette": palette,
                "sample_count": total_samples,
                "view_count": len(metadata_views),
                "views": metadata_views,
            },
        }

    def _pixel_readout_view(
        self,
        selection: object,
        index: int,
    ) -> tuple[dict[str, Any], list[list[tuple[int, int, int]]]]:
        if (
            not isinstance(selection, dict)
            or not isinstance(selection.get("label"), str)
            or not selection["label"].strip()
            or len(selection["label"]) > MAX_INSPECTION_LABEL_CHARS
            or "turn" not in selection
            or "region" not in selection
            or set(selection) - {"label", "turn", "frame", "region", "rows", "columns"}
        ):
            raise ValueError(f"View {index}: invalid selection.")

        turn = selection.get("turn")
        frame = selection.get("frame")
        rows = selection.get("rows")
        columns = selection.get("columns")
        if type(turn) is not int or not 0 <= turn <= 999999:
            raise ValueError(f"View {index}: invalid turn.")
        if "frame" in selection and (
            type(frame) is not int or not 0 <= frame <= 999999
        ):
            raise ValueError(f"View {index}: invalid frame.")
        if (
            type(rows) is not int
            or type(columns) is not int
            or not 1 <= rows <= self.display_size
            or not 1 <= columns <= self.display_size
        ):
            raise ValueError(f"View {index}: invalid sample dimensions.")
        try:
            region = self._inspection_region(selection.get("region"))
        except ValueError as exc:
            raise ValueError(f"View {index}: invalid region.") from exc

        paths = self._turn_frame_paths(turn)
        if not paths:
            raise ValueError(f"View {index}: no frames found for turn {turn}.")
        selected_path = paths[-1]
        if frame is not None:
            matching = [path for path in paths if self._frame_number(path) == frame]
            if not matching:
                raise ValueError(
                    f"View {index}: no frame {frame} found for turn {turn}."
                )
            selected_path = matching[0]
        selected_frame = self._frame_number(selected_path)

        try:
            x, y, width, height = region
            sample_x = [
                x + ((2 * column + 1) * width) // (2 * columns)
                for column in range(columns)
            ]
            sample_y = [
                y + ((2 * row + 1) * height) // (2 * rows) for row in range(rows)
            ]
            with Image.open(selected_path) as archived:
                if archived.size != self.visual_size():
                    raise ValueError("Archived visual has an unexpected size")
                source = archived.convert("RGB")
                pixels = source.load()
                samples = [
                    [pixels[sample_column, sample_row] for sample_column in sample_x]
                    for sample_row in sample_y
                ]
        except (OSError, ValueError, IndexError, KeyError, TypeError) as exc:
            raise ValueError(
                f"View {index}: archived visual could not be sampled."
            ) from exc

        return (
            {
                "index": index,
                "turn": turn,
                "frame": selected_frame,
                "available_frames": len(paths),
                "available_frame_range": [
                    self._frame_number(paths[0]),
                    self._frame_number(paths[-1]),
                ],
                "region": {"x": x, "y": y, "width": width, "height": height},
                "rows": rows,
                "columns": columns,
            },
            samples,
        )

    def _inspection_region(self, value: object) -> tuple[int, int, int, int]:
        if value is None:
            return 0, 0, *self.visual_size()
        if not isinstance(value, dict) or set(value) != {
            "x",
            "y",
            "width",
            "height",
        }:
            raise ValueError("Invalid region")
        x = value.get("x")
        y = value.get("y")
        width = value.get("width")
        height = value.get("height")
        if any(type(item) is not int for item in (x, y, width, height)):
            raise ValueError("Invalid region")
        assert isinstance(x, int) and isinstance(y, int)
        assert isinstance(width, int) and isinstance(height, int)
        if (
            x < 0
            or y < 0
            or width < 1
            or height < 1
            or x + width > self.visual_size()[0]
            or y + height > self.visual_size()[1]
        ):
            raise ValueError("Invalid region")
        return x, y, width, height

    def _turn_frame_paths(self, turn: int) -> list[Path]:
        return sorted(
            self.frames_dir.glob(f"turn_{turn:03d}_frame_*.png"),
            key=self._frame_number,
        )

    @staticmethod
    def _frame_number(path: Path) -> int:
        return int(path.stem.rsplit("_", 1)[-1])


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, sort_keys=True), encoding="utf-8")


def append_jsonl(path: Path, data: Any) -> None:
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(data, separators=(",", ":"), sort_keys=True))
        handle.write("\n")


def atomic_write_text(path: Path, content: str, *, mode: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(content, encoding="utf-8")
    temporary.chmod(mode)
    temporary.replace(path)

````


## vista-c97c354/src/vista/core/support.py

````text
"""Bind public task evidence to VISTA memory and visual operations."""

from __future__ import annotations

import base64
import copy
import hashlib
import threading
from functools import partial
from html import escape
from pathlib import Path
from typing import TYPE_CHECKING, Any

from vista.core.dispatcher import GameToolDispatcher
from vista.core.session import (
    MAX_INSPECTION_QUESTION_CHARS,
    MAX_PIXEL_READOUT_SAMPLES,
    MAX_PIXEL_READOUT_VIEWS,
    PIXEL_READOUT_SYMBOLS,
    SessionController,
    atomic_write_text,
)
from vista.core.tools import build_tools

from .contracts import (
    Capability,
    Effect,
    EvidenceKind,
    Observation,
    ObservationBundle,
    PublicTask,
    ToolBinding,
    ToolReply,
    ToolSpec,
    Visual,
)
from .json import canonical

if TYPE_CHECKING:
    from .runtime import TaskRuntime


def quantize_rgb(color: tuple[int, int, int], bits: int) -> tuple[int, int, int]:
    """Round each channel to `bits` of precision, returning the level's color.

    Exact colors suit a paletted grid; on a compressed or anti-aliased image
    every sample is its own color and a symbol table fills in one call. Four
    bits keep sixteen levels per channel: enough to tell colors apart, few
    enough that JPEG noise collapses into them.
    """
    if bits >= 8:
        return color
    levels = (1 << bits) - 1

    def quantize(channel: int) -> int:
        level = (channel * levels + 127) // 255
        return (level * 255 + levels // 2) // levels

    return (quantize(color[0]), quantize(color[1]), quantize(color[2]))


class TaskContext(SessionController):
    """Public-state adapter for tasks without ARC states or actions."""

    # General benchmarks read screenshots, canvases and photographs, where
    # exact colors can exhaust a 64-symbol table in one call. This path rounds
    # to four bits per channel and uses a palette per reply; ARC3 controllers
    # use the base class's exact-color readout.
    pixel_readout_color_bits = 4
    pixel_readout_palette_scope = "call"

    def __init__(self, task: PublicTask, backend: str) -> None:
        self.task = task
        self.backend = backend
        self.runtime: TaskRuntime | None = None
        self.directory: Path | None = None
        self._lock = threading.RLock()
        self._retry_boundary_step = None
        self.retry_boundary_marker = None
        self.compact_checkpoint_marker = None
        self.compact_checkpoint_ready = None
        self.compact_restore_marker = None
        self.compact_guide_snapshot = None
        self.reset_starts_fresh_session = False
        self.forced_termination_reason = None
        self._pixel_readout_symbol_by_color = {}
        self._sources: dict[str, tuple[int, Visual]] = {}
        self._frame_paths: dict[int, list[Path]] = {}
        self._records: dict[int, dict[str, Any]] = {}
        self._moments: dict[str, tuple[int, int]] = {}
        self._current_ref: tuple[int, int] | None = None
        self._view_size: tuple[int, int] | None = None
        self._dispatcher = None
        self._calls = 0
        self.checkpoints = 0
        self.current = ObservationBundle()
        visuals = [
            view
            for observation in task.observation.observations
            for view in observation.views
        ]
        self.display_size = max(
            (max(view.width, view.height) for view in visuals), default=1024
        )
        self.observation_mode = "vision" if visuals else "none"
        self.tools = self._tools()

    def bind(self, runtime: TaskRuntime, directory: Path) -> None:
        if self.runtime is not None:
            raise RuntimeError("A task context can only be bound once")
        self.runtime = runtime
        self.directory = directory.resolve()
        self.directory.mkdir(mode=0o700, parents=True, exist_ok=False)
        self.frames_dir = self.directory / "visuals"
        self.frames_dir.mkdir(mode=0o700)
        self.guide_path = self.directory / "GUIDE.md"
        self.working_path = self.directory / "WORKING.md"
        self.working_provenance_path = self.directory / "working_memory_provenance.json"
        self.recovery_log_path = self.directory / "compact_recovery.jsonl"
        self.compact_checkpoint_marker = self.directory / "compact_checkpoint.requested"
        self.compact_checkpoint_ready = self.directory / "compact_checkpoint.ready"
        self.compact_restore_marker = self.directory / "compact_restore.pending"
        self.compact_guide_snapshot = self.directory / "compact_guide.snapshot"
        self.retry_boundary_marker = self.directory / "retry_boundary.pending"
        atomic_write_text(self.guide_path, "No reliable model yet.\n", mode=0o600)
        self.record_event(self.task.observation, result=self.task.objective)

    def configure(self, visible: Path, checkpoint_dir: Path) -> None:
        for name in ("guide_path", "working_path"):
            source = getattr(self, name)
            target = visible / source.name
            if source.is_file():
                atomic_write_text(
                    target, source.read_text(encoding="utf-8"), mode=0o600
                )
            setattr(self, name, target)
        self.compact_checkpoint_marker = checkpoint_dir / "compact_checkpoint.requested"
        self.compact_checkpoint_ready = checkpoint_dir / "compact_checkpoint.ready"
        self.compact_restore_marker = checkpoint_dir / "compact_restore.pending"
        self.compact_guide_snapshot = checkpoint_dir / "compact_guide.snapshot"
        self.retry_boundary_marker = checkpoint_dir / "retry_boundary.pending"
        self._dispatcher = None

    @property
    def terminal(self) -> bool:
        return bool(
            self.forced_termination_reason or (self.runtime and self.runtime.terminal)
        )

    @property
    def step_index(self) -> int:
        return self.runtime.state_revision if self.runtime is not None else 0

    @property
    def max_steps(self) -> int:
        if self.runtime is None:
            return 2000
        budgets = self.runtime.experiment.budgets
        bounds = [
            budgets[meter] // cost
            for spec in self.runtime.specs
            if spec.effect == Effect.ENVIRONMENT
            for meter, cost in spec.costs.items()
            if cost and meter in budgets
        ]
        return max(1, min(bounds)) if bounds else budgets.get("backend_segments", 2000)

    @property
    def retry_boundary_pending(self) -> bool:
        return self._retry_boundary_step is not None

    @property
    def retry_boundary_step(self) -> int | None:
        return self._retry_boundary_step

    @property
    def public_events(self) -> list[dict[str, Any]]:
        return [self._public_event(event) for event in self._records]

    @property
    def _events(self) -> list[dict[str, Any]]:
        # The recovery port expects action results, not input deliveries.
        return [
            self._public_event(event)
            for event, record in self._records.items()
            if record["environment"]
        ]

    def _public_event(self, event: int) -> dict[str, Any]:
        record = self._records[event]
        return {
            "event": event,
            "action": copy.deepcopy(record["action"]),
            "success": record["success"],
            "result": record["result"],
            "observations": self._event_observations(event),
        }

    def _event_observations(self, event: int) -> list[dict[str, Any]]:
        return [
            {
                "moment": index,
                "kind": "current"
                if (event, index) == self._current_ref
                else "historical",
                "views": [
                    {"view": view.view, "width": view.width, "height": view.height}
                    for view in observation.views
                ],
            }
            for index, observation in enumerate(
                self._records[event]["observation"].observations
            )
        ]

    def _current_manifest(self) -> list[dict[str, Any]]:
        if self._current_ref is None:
            return []
        event, moment = self._current_ref
        return [{"event": event, **self._event_observations(event)[moment]}]

    def _metadata(self, *, action_applied: bool = False) -> dict[str, Any]:
        return {"observation": self._current_manifest(), "terminal": self.terminal}

    def _attempt_history(self) -> dict[str, Any]:
        if not self._records:
            return {}
        return {
            "first_event": next(iter(self._records)),
            "latest_event": next(reversed(self._records)),
        }

    def _record_working_provenance(self) -> dict[str, Any]:
        provenance = {"observation": self._current_manifest()}
        atomic_write_text(
            self.working_provenance_path, canonical(provenance) + "\n", mode=0o600
        )
        return provenance

    def begin_compact_recovery(self):
        recovery = super().begin_compact_recovery()
        self.checkpoints += 1
        return recovery

    def complete_runtime_recovery(self, recovery, *, delivery="resumed_runtime_thread"):
        super().complete_runtime_recovery(recovery, delivery=delivery)
        self.runtime.acknowledge()

    def complete_compact_recovery(self, recovery, *, delivery="fresh_thread"):
        super().complete_compact_recovery(recovery, delivery=delivery)
        self.runtime.acknowledge()

    def complete_retry_recovery(self, recovery):
        super().complete_retry_recovery(recovery)
        self.runtime.acknowledge()

    def record_event(
        self,
        bundle: ObservationBundle,
        *,
        action: dict[str, Any] | None = None,
        result: str = "",
        success: bool = True,
        update_current: bool = True,
        environment: bool = False,
    ) -> int:
        observations = tuple(
            item for item in bundle.observations if item.kind != EvidenceKind.DERIVED
        )
        event = len(self._records)
        for observation in observations:
            previous_moment = self._moments.get(observation.moment)
            if previous_moment is not None:
                previous_event, index = previous_moment
                previous = self._records[previous_event]["observation"].observations[
                    index
                ]
                if previous.views != observation.views:
                    raise ValueError(
                        "A supplied observation identity cannot change its views"
                    )
            for visual in observation.views:
                previous = self._sources.get(visual.source_id)
                if previous is not None:
                    if previous[1].data != visual.data:
                        raise ValueError(
                            "A supplied visual identity cannot change its pixels"
                        )
                    continue
                index = len(self._sources)
                suffix = {
                    "image/png": ".png",
                    "image/jpeg": ".jpg",
                    "image/webp": ".webp",
                    "image/gif": ".gif",
                }[visual.mime_type]
                path = self.frames_dir / f"turn_{index:06d}_frame_0{suffix}"
                path.write_bytes(visual.data)
                path.chmod(0o400)
                self._sources[visual.source_id] = (index, visual)
                self._frame_paths[index] = [path]
        stored = ObservationBundle(observations)
        self._records[event] = {
            "action": copy.deepcopy(action),
            "result": result,
            "success": success,
            "observation": stored,
            "environment": environment,
        }
        for index, observation in enumerate(observations):
            self._moments.setdefault(observation.moment, (event, index))
            if update_current and observation.kind == EvidenceKind.CURRENT:
                self.current = ObservationBundle((observation,))
                self._current_ref = event, index
        if observations:
            self.observation_mode = "vision"
        self.runtime.artifacts.record(
            "evidence_event",
            {
                "reference": event,
                "action": action,
                "result": result,
                "success": success,
                "observation": stored.manifest(),
                "environment": environment,
            },
        )
        return event

    def observe(
        self, bundle: ObservationBundle, *, update_current: bool = True
    ) -> None:
        if self.directory is None:
            return
        unseen = tuple(
            item
            for item in bundle.observations
            if item.kind != EvidenceKind.DERIVED and item.moment not in self._moments
        )
        for observation in bundle.observations:
            if observation.kind == EvidenceKind.DERIVED or observation in unseen:
                continue
            event, index = self._moments[observation.moment]
            previous = self._records[event]["observation"].observations[index]
            if previous.views != observation.views:
                raise ValueError(
                    "A supplied observation identity cannot change its views"
                )
        if unseen:
            self.record_event(ObservationBundle(unseen), update_current=update_current)
        if update_current:
            for observation in bundle.observations:
                if observation.kind == EvidenceKind.CURRENT:
                    if not self.current.observations or (
                        self.current.observations[0].moment != observation.moment
                    ):
                        self._current_ref = self._moments[observation.moment]
                    self.current = ObservationBundle((observation,))

    def _select(self, selection: dict[str, Any]) -> tuple[dict[str, Any], Visual]:
        event = selection["event"]
        if type(event) is not int:
            raise ValueError("Event must be an integer.")
        record = self._records.get(event)
        if record is None:
            raise ValueError("Unknown event.")
        observations = record["observation"].observations
        moment = selection.get("moment", len(observations) - 1)
        if type(moment) is not int or not 0 <= moment < len(observations):
            raise ValueError("The event has no such observation.")
        views = observations[moment].views
        name = selection.get("view")
        if name is None:
            if len(views) != 1:
                raise ValueError("Specify view for a multi-view observation.")
            visual = views[0]
        else:
            visual = next((view for view in views if view.view == name), None)
            if visual is None:
                raise ValueError("The observation has no such view.")
        return {"event": event, "moment": moment, "view": visual.view}, visual

    def _reference(self, observation: Observation, *, event: int | None = None):
        if event is not None:
            moment = next(
                index
                for index, item in enumerate(
                    self._records[event]["observation"].observations
                )
                if item.moment == observation.moment
            )
            return event, moment
        if (
            observation.kind == EvidenceKind.CURRENT
            and self.current.observations
            and self.current.observations[0].moment == observation.moment
        ):
            return self._current_ref
        return self._moments[observation.moment]

    def _origins(self, visual: Visual) -> list[dict[str, Any]]:
        if all(key in visual.transform for key in ("event", "moment", "view")):
            reference, parent = self._select(dict(visual.transform))
            if visual.derived_from != (parent.source_id,):
                raise ValueError("A derived view must reference its supplied original")
            return [reference]
        origins = []
        for source in visual.derived_from:
            match = next(
                (
                    {"event": event, "moment": index, "view": view.view}
                    for event, record in self._records.items()
                    for index, observation in enumerate(
                        record["observation"].observations
                    )
                    for view in observation.views
                    if view.source_id == source
                ),
                None,
            )
            if match is None:
                raise ValueError("Unknown source evidence for a derived visual")
            origins.append(match)
        return origins

    def labels(
        self, bundle: ObservationBundle, *, event: int | None = None
    ) -> tuple[str, ...]:
        labels = []
        for observation in bundle.displayed_observations:
            for visual in observation.views:
                if observation.kind == EvidenceKind.DERIVED:
                    origins = self._origins(visual)
                    attributes = {"kind": "derived"}
                    if len(origins) == 1:
                        attributes.update(origins[0])
                    else:
                        attributes["origins"] = canonical(origins)
                    for key in ("label", "region", "resampling"):
                        if key in visual.transform:
                            value = visual.transform[key]
                            attributes[key] = (
                                canonical(value) if key == "region" else value
                            )
                else:
                    ref = self._reference(observation, event=event)
                    attributes = {
                        "kind": "current"
                        if observation.kind == EvidenceKind.CURRENT
                        and ref == self._current_ref
                        else "historical",
                        "event": ref[0],
                        "moment": ref[1],
                        "view": visual.view,
                    }
                attributes["size"] = f"{visual.width}x{visual.height}"
                label = (
                    "<visual "
                    + " ".join(
                        f'{key}="{escape(str(value), quote=True)}"'
                        for key, value in attributes.items()
                    )
                    + "></visual>"
                )
                labels.append(label)
        return tuple(labels)

    def images(self, bundle: ObservationBundle, *, event: int | None = None):
        return tuple(
            {**image, "steer_text": label}
            for image, label in zip(
                bundle.images(), self.labels(bundle, event=event), strict=True
            )
        )

    def _selected_images(self) -> list[Path]:
        return [
            self._frame_paths[self._sources[view.source_id][0]][-1]
            for observation in self.current.observations
            for view in observation.views
        ]

    def _turn_frame_paths(self, turn: int) -> list[Path]:
        return self._frame_paths.get(turn, [])

    def visual_size(self) -> tuple[int, int]:
        return self._view_size or (self.display_size, self.display_size)

    def _with_view_size(self, selection, index, render):
        turn = selection.get("turn") if isinstance(selection, dict) else None
        match = next(
            (view for number, view in self._sources.values() if number == turn), None
        )
        previous = self._view_size
        self._view_size = (match.width, match.height) if match is not None else None
        try:
            return render(selection, index)
        finally:
            self._view_size = previous

    def _inspection_view(self, selection, index):
        return self._with_view_size(selection, index, super()._inspection_view)

    def _pixel_readout_view(self, selection, index):
        return self._with_view_size(selection, index, super()._pixel_readout_view)

    def _read_pixels(self, arguments: object) -> dict[str, Any]:
        """Read quantized colors with a palette scoped to this call."""
        if self.observation_mode not in {"vision", "both"}:
            return self._inspect_error("Visual observations are unavailable.")
        if (
            not isinstance(arguments, dict)
            or set(arguments) != {"question", "views"}
            or not isinstance(arguments.get("question"), str)
            or not arguments["question"].strip()
            or len(arguments["question"]) > MAX_INSPECTION_QUESTION_CHARS
            or not isinstance(arguments.get("views"), list)
            or not 1 <= len(arguments["views"]) <= MAX_PIXEL_READOUT_VIEWS
        ):
            return self._inspect_error("Invalid arguments.")
        sampled_views = []
        total_samples = 0
        bits = self.pixel_readout_color_bits
        for index, view in enumerate(arguments["views"], start=1):
            try:
                metadata, samples = self._pixel_readout_view(view, index)
            except ValueError as exc:
                return self._inspect_error(str(exc))
            total_samples += metadata["rows"] * metadata["columns"]
            if total_samples > MAX_PIXEL_READOUT_SAMPLES:
                return self._inspect_error(
                    f"At most {MAX_PIXEL_READOUT_SAMPLES} samples may be requested."
                )
            if bits is not None:
                samples = [
                    [quantize_rgb(color, bits) for color in row] for row in samples
                ]
            sampled_views.append((metadata, samples))
        table = (
            self._pixel_readout_symbol_by_color
            if self.pixel_readout_palette_scope == "session"
            else {}
        )
        colors = {
            color for _, samples in sampled_views for row in samples for color in row
        }
        unseen_colors = sorted(colors.difference(table))
        if len(table) + len(unseen_colors) > len(PIXEL_READOUT_SYMBOLS):
            return self._inspect_error(
                "The pixel readout color limit has been reached."
            )
        for color in unseen_colors:
            table[color] = PIXEL_READOUT_SYMBOLS[len(table)]
        palette = {
            symbol: f"#{color[0]:02X}{color[1]:02X}{color[2]:02X}"
            for color, symbol in table.items()
            if color in colors
        }
        metadata_views = []
        for metadata, samples in sampled_views:
            metadata["samples"] = [
                "".join(table[color] for color in row) for row in samples
            ]
            metadata_views.append(metadata)
        return {
            "ok": True,
            "metadata": {
                "visual_kind": "pixel_readout",
                "current_state_unchanged": True,
                "sampling": "equal-bin-centers",
                "color_bits": bits,
                "palette_scope": self.pixel_readout_palette_scope,
                "palette": palette,
                "sample_count": total_samples,
                "view_count": len(metadata_views),
                "views": metadata_views,
            },
        }

    def handle(self, request: dict[str, Any]) -> dict[str, Any]:
        with self._lock:
            if request["method"] == "save_compact_checkpoint":
                return self._save_compact_checkpoint(request["arguments"])
            raise ValueError("The context port does not execute environment actions")

    def _memory_reply(self, name: str, arguments: Any) -> ToolReply:
        if self._dispatcher is None:
            self._dispatcher = GameToolDispatcher(
                controller=self,
                guide_path=self.guide_path,
                working_path=self.working_path,
                checkpoint_via_working=self.backend == "claude",
            )
        self._calls += 1
        execution = self._dispatcher.execute(name, arguments, f"memory-{self._calls}")
        return ToolReply(
            execution.text,
            success=execution.success,
            boundary=execution.boundary_reason,
        )

    def _visual_reply(self, name: str, arguments: dict[str, Any]) -> ToolReply:
        selections = []
        references = []
        sources = []
        for selection in arguments["views"]:
            try:
                reference, visual = self._select(selection)
            except ValueError as exc:
                return ToolReply(str(exc), success=False)
            number, _ = self._sources[visual.source_id]
            selections.append(
                {
                    key: value
                    for key, value in selection.items()
                    if key not in {"event", "moment", "view"}
                }
                | {"turn": number}
            )
            references.append(reference)
            sources.append(visual.source_id)
        request = {"question": arguments["question"], "views": selections}
        response = (
            self._inspect(request) if name == "inspect" else self._read_pixels(request)
        )
        metadata = response["metadata"]
        if not response.get("ok"):
            return ToolReply(canonical(metadata), success=False)
        observations = []
        for index, view in enumerate(metadata["views"]):
            for key in ("turn", "frame", "available_frames", "available_frame_range"):
                view.pop(key, None)
            view.update(references[index])
            view["label"] = arguments["views"][index]["label"]
            if name == "inspect":
                data = base64.b64decode(
                    response["images"][index]["data"], validate=True
                )
                identity = (
                    "inspect-"
                    + hashlib.sha256(canonical(view).encode() + data).hexdigest()
                )
                visual = Visual(
                    "crop",
                    identity,
                    data,
                    view["image_size"]["width"],
                    view["image_size"]["height"],
                    derived_from=(sources[index],),
                    transform={
                        **references[index],
                        "label": view["label"],
                        "region": view["region"],
                        "resampling": "nearest",
                    },
                )
                observations.append(
                    Observation(identity, (visual,), EvidenceKind.DERIVED)
                )
        return ToolReply(
            canonical(metadata), observation=ObservationBundle(tuple(observations))
        )

    def _history_reply(self, arguments: dict[str, Any]) -> ToolReply:
        events = self.public_events
        start, end = arguments.get("start"), arguments.get("end")
        for name, value in (("start", start), ("end", end)):
            if value is not None and (
                type(value) is not int or not 0 <= value <= len(events)
            ):
                return ToolReply(f"Invalid history {name} event number.", success=False)
        first = start if start is not None else 0
        stop = end if end is not None else len(events)
        if stop < first:
            return ToolReply("History end must not precede its start.", success=False)
        selected = events[first:stop]
        limit = arguments.get("limit", 64)
        if type(limit) is not int:
            return ToolReply("History limit must be an integer.", success=False)
        bounded = start is not None or end is not None
        return ToolReply(
            canonical(
                {
                    "events": selected[:limit] if bounded else selected[-limit:],
                    "truncated": len(selected) > limit,
                }
            )
        )

    def _tools(self) -> tuple[ToolBinding, ...]:
        bindings = []
        for original in build_tools(
            self.display_size, include_compact_checkpoint=self.backend == "codex"
        ):
            definition = copy.deepcopy(original)
            name = definition["name"]
            if name == "play":
                continue
            if name == "read_working":
                definition["description"] = (
                    "Read agent-authored temporary state for the current task."
                )
            elif name == "write_working":
                definition["description"] = (
                    "Replace agent-authored temporary state for the current task. It persists until explicitly replaced or cleared by the task lifecycle."
                )
            elif name == "save_compact_checkpoint":
                definition["description"] = definition["description"].replace(
                    "turn/frame", "event/moment/view"
                )
            schema = definition["inputSchema"]
            if name in {"inspect", "read_pixels"}:
                item = schema["properties"]["views"]["items"]
                item["required"] = [
                    "event" if key == "turn" else key for key in item["required"]
                ]
                item["properties"].pop("turn")
                item["properties"].pop("frame")
                item["properties"].update(
                    {
                        "event": {
                            "type": "integer",
                            "minimum": 0,
                            "description": "This role's event number, starting at 0, shown with a supplied visual or in history.",
                        },
                        "moment": {
                            "type": "integer",
                            "minimum": 0,
                            "description": "Observation within the event; omit for the final observation.",
                        },
                        "view": {
                            "type": "string",
                            "minLength": 1,
                            "description": "View name; required only when the observation has multiple views.",
                        },
                    }
                )
                definition["description"] = (
                    "Inspect one or more supplied visuals without changing the task. "
                    "Select an event, optionally an earlier moment and a view name. "
                    "Include a visual question and a label for each view. Regions use original image pixels; "
                    f"crops are enlarged proportionally without smoothing to fit within {self.display_size}x{self.display_size}."
                    if name == "inspect"
                    else "Read RGB samples from one or more supplied visuals without changing the task. "
                    "Select an event, optionally a moment and view name, and an original-image pixel region. The tool divides the region "
                    "into equal rows and columns and samples their center pixels. Colors are rounded to 4 bits "
                    "per channel (16 levels each) so compression noise does not fragment the palette; each reply "
                    "carries its own palette of at most 64 colors as symbols, with compact row strings, without "
                    "interpreting pixels. At most 64 views and 4096 total samples may be requested. Include a "
                    "visual question and labels."
                )
                capability = (
                    Capability.INSPECTION if name == "inspect" else Capability.PIXELS
                )
                handler = partial(self._visual_reply, name)
            elif name == "history":
                capability, handler = Capability.HISTORY, self._history_reply
            else:
                capability = (
                    Capability.CHECKPOINT
                    if name == "save_compact_checkpoint"
                    else Capability.MEMORY
                )
                handler = partial(self._memory_reply, name)
            effect = (
                Effect.MEMORY
                if name.startswith("write_") or name == "save_compact_checkpoint"
                else Effect.NONE
            )
            bindings.append(
                ToolBinding(
                    ToolSpec(
                        name,
                        definition["description"],
                        schema,
                        capability,
                        effect,
                        max_images=16 if name == "inspect" else 0,
                        annotations=definition["annotations"],
                    ),
                    handler,
                )
            )
        return tuple(bindings)

````


## vista-c97c354/src/vista/core/timeouts.py

````text
"""Shared bounds for native-player and environment operations."""

MAX_TASK_TIMEOUT_SECONDS = 2_000_000
ENV_CONNECT_TIMEOUT_SECONDS = 10
ENV_READ_TIMEOUT_SECONDS = 120
ENV_CONNECT_RETRIES = 3


def bounded_task_timeout(tool_timeout: int, maximum_calls: int) -> int:
    return min(tool_timeout * maximum_calls, MAX_TASK_TIMEOUT_SECONDS)

````


## vista-c97c354/src/vista/core/tools.py

````text
"""Shared memory and supplied-visual tool schemas."""

from __future__ import annotations

from typing import Any

MAX_GUIDE_CHARS = 64 * 1024


MAX_WORKING_CHARS = 16 * 1024


DEFAULT_DISPLAY_SIZE = 1024


MAX_INSPECTION_VIEWS = 16


MAX_INSPECTION_QUESTION_CHARS = 1024


MAX_INSPECTION_LABEL_CHARS = 128


MAX_PIXEL_READOUT_VIEWS = 64


MAX_PIXEL_READOUT_SAMPLES = 4096


READ_GUIDE_TOOL = {
    "name": "read_guide",
    "description": "Read `GUIDE.md`.",
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {},
    },
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


def _visual_region_schema(display_size: int) -> dict[str, Any]:
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["x", "y", "width", "height"],
        "properties": {
            "x": {"type": "integer", "minimum": 0, "maximum": display_size - 1},
            "y": {"type": "integer", "minimum": 0, "maximum": display_size - 1},
            "width": {"type": "integer", "minimum": 1, "maximum": display_size},
            "height": {"type": "integer", "minimum": 1, "maximum": display_size},
        },
    }


def build_inspect_tool(display_size: int = DEFAULT_DISPLAY_SIZE) -> dict[str, Any]:
    if type(display_size) is not int or display_size < 1:
        raise ValueError("display_size must be a positive integer")
    view_schema = {
        "type": "object",
        "additionalProperties": False,
        "required": ["label", "turn"],
        "properties": {
            "label": {
                "type": "string",
                "minLength": 1,
                "maxLength": MAX_INSPECTION_LABEL_CHARS,
            },
            "turn": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
            },
            "frame": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
                "description": "Exact archived frame; omit for the final frame.",
            },
            "region": _visual_region_schema(display_size),
        },
    }
    return {
        "name": "inspect",
        "description": (
            "Inspect one or more supplied visuals without changing the current game "
            "state. Each view selects an archived turn; omit frame to use that turn's "
            "final frame. Omit region to see the full visual, or select a rectangular "
            f"region in the same standard {display_size}x{display_size} coordinates "
            "used by ACTION6. A selected region is cropped exactly from that visual "
            f"and enlarged proportionally to fit within {display_size}x{display_size} "
            "without smoothing. State the visual question these views should answer "
            "and give each view a short label. Include the evidence needed to answer "
            "that question in the same request. The selected views are returned in "
            "request order; your question and labels remain in the inspect call."
        ),
        "inputSchema": {
            "type": "object",
            "additionalProperties": False,
            "required": ["question", "views"],
            "properties": {
                "question": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": MAX_INSPECTION_QUESTION_CHARS,
                },
                "views": {
                    "type": "array",
                    "minItems": 1,
                    "maxItems": MAX_INSPECTION_VIEWS,
                    "items": view_schema,
                },
            },
        },
        "annotations": {
            "readOnlyHint": True,
            "destructiveHint": False,
            "idempotentHint": True,
            "openWorldHint": False,
        },
    }


def build_read_pixels_tool(
    display_size: int = DEFAULT_DISPLAY_SIZE,
) -> dict[str, Any]:
    if type(display_size) is not int or display_size < 1:
        raise ValueError("display_size must be a positive integer")
    view_schema = {
        "type": "object",
        "additionalProperties": False,
        "required": ["label", "turn", "region", "rows", "columns"],
        "properties": {
            "label": {
                "type": "string",
                "minLength": 1,
                "maxLength": MAX_INSPECTION_LABEL_CHARS,
            },
            "turn": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
            },
            "frame": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999999,
                "description": "Exact archived frame; omit for the final frame.",
            },
            "region": _visual_region_schema(display_size),
            "rows": {
                "type": "integer",
                "minimum": 1,
                "maximum": display_size,
            },
            "columns": {
                "type": "integer",
                "minimum": 1,
                "maximum": display_size,
            },
        },
    }
    return {
        "name": "read_pixels",
        "description": (
            "Read exact discrete color samples from one or more supplied visuals "
            "without changing the game state. Each view divides its selected "
            "rectangular region into equal rows and columns and samples the center "
            "pixel of every part from the archived supplied PNG. The result contains "
            "one RGB symbol palette and one compact row string per sampled "
            "row for each view in request order. At most "
            f"{MAX_PIXEL_READOUT_VIEWS} views may be selected, with at most "
            f"{MAX_PIXEL_READOUT_SAMPLES} samples total per call. This tool only "
            "measures pixels; it does not align, transform, compare, or interpret "
            "them. State the visual question and give each view a short label; those "
            "remain in this call."
        ),
        "inputSchema": {
            "type": "object",
            "additionalProperties": False,
            "required": ["question", "views"],
            "properties": {
                "question": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": MAX_INSPECTION_QUESTION_CHARS,
                },
                "views": {
                    "type": "array",
                    "minItems": 1,
                    "maxItems": MAX_PIXEL_READOUT_VIEWS,
                    "items": view_schema,
                },
            },
        },
        "annotations": {
            "readOnlyHint": True,
            "destructiveHint": False,
            "idempotentHint": True,
            "openWorldHint": False,
        },
    }


WRITE_GUIDE_TOOL = {
    "name": "write_guide",
    "description": (
        "Write the complete contents of `GUIDE.md`, replacing its previous contents."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["content"],
        "properties": {
            "content": {
                "type": "string",
                "minLength": 1,
                "maxLength": MAX_GUIDE_CHARS,
            }
        },
    },
    "annotations": {
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


SAVE_COMPACT_CHECKPOINT_TOOL = {
    "name": "save_compact_checkpoint",
    "description": (
        "Atomically save the pre-compaction game checkpoint. Set guide to a complete "
        "replacement GUIDE.md only when the durable game model materially changed; "
        "otherwise set it to null. Store in working_memory only the current "
        "continuation state that cannot be recovered from GUIDE.md and the current "
        "visual: the active plan, its next visible prediction, unresolved "
        "contradictions, and any necessary turn/frame references."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["guide", "working_memory"],
        "properties": {
            "guide": {
                "type": ["string", "null"],
                "minLength": 1,
                "maxLength": MAX_GUIDE_CHARS,
            },
            "working_memory": {
                "type": "string",
                "minLength": 1,
                "maxLength": MAX_WORKING_CHARS,
            },
        },
    },
    "annotations": {
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


READ_WORKING_TOOL = {
    "name": "read_working",
    "description": "Read agent-authored temporary state for the current task.",
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {},
    },
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


WRITE_WORKING_TOOL = {
    "name": "write_working",
    "description": (
        "Replace agent-authored temporary state for the current task. It persists until explicitly replaced or cleared by the task lifecycle."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["content"],
        "properties": {
            "content": {
                "type": "string",
                "minLength": 1,
                "maxLength": MAX_WORKING_CHARS,
            }
        },
    },
    "annotations": {
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


HISTORY_TOOL = {
    "name": "history",
    "description": (
        "Read this role's public interaction records and visual references without changing the task. "
        "Event numbers start at 0 and follow this role's record order, including the initial input and supplied observations. "
        "Ranges include start and exclude end. Bounds may be one past the latest event. "
        "A bounded range returns its first limit records; omit both bounds for the most recent records."
    ),
    "inputSchema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "start": {"type": "integer", "minimum": 0},
            "end": {"type": "integer", "minimum": 0},
            "limit": {"type": "integer", "minimum": 1, "maximum": 128, "default": 64},
        },
    },
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
}


def build_tools(
    display_size: int = DEFAULT_DISPLAY_SIZE,
    *,
    include_compact_checkpoint: bool = True,
) -> tuple[dict[str, Any], ...]:
    tools = (
        build_inspect_tool(display_size),
        build_read_pixels_tool(display_size),
        HISTORY_TOOL,
        READ_GUIDE_TOOL,
        WRITE_GUIDE_TOOL,
        READ_WORKING_TOOL,
        WRITE_WORKING_TOOL,
    )
    if include_compact_checkpoint:
        return (*tools, SAVE_COMPACT_CHECKPOINT_TOOL)
    return tools

````
