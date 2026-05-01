# Wheeled Robot Visual Lab Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an embedded academic-style SVG visualization lab in the wiki that connects wheel-level geometry constraints to chassis-level kinematic matrix rows.

**Architecture:** Add a Quartz component that contributes one global stylesheet and one bundled browser script. The Markdown synthesis page contains semantic placeholders such as `<div data-wheeled-robot-lab></div>`, and the script initializes each placeholder on initial load and Quartz SPA `nav` events.

**Tech Stack:** Quartz 4, Preact component resource hooks, vanilla TypeScript DOM/SVG, SCSS, Node `tsx --test`, existing wiki health checker.

---

### Task 1: Add Tested Kinematic Helpers

**Files:**
- Create: `quartz/components/scripts/wheeledRobotVisualLab.math.ts`
- Create: `tests/wheeledRobotVisualLab.math.test.ts`

**Step 1: Write the failing tests**

Create `tests/wheeledRobotVisualLab.math.test.ts`:

```ts
import assert from "node:assert/strict"
import test from "node:test"
import {
  differentialDriveRows,
  directionRow,
  lateralConstraintResidual,
  unitFromAngle,
  wheelPointVelocity,
} from "../quartz/components/scripts/wheeledRobotVisualLab.math"

test("wheelPointVelocity adds rotational velocity in the body frame", () => {
  const velocity = wheelPointVelocity({ vx: 2, vy: 1, omega: 3 }, { x: 0.5, y: 0.25 })

  assert.deepEqual(velocity, { x: 1.25, y: 2.5 })
})

test("directionRow maps body twist to a wheel rolling speed row", () => {
  const row = directionRow(unitFromAngle(0), { x: 0, y: 0.6 }, 0.3)

  assert.deepEqual(row.map((value) => Number(value.toFixed(6))), [3.333333, 0, -2])
})

test("differentialDriveRows produces left and right wheel rows", () => {
  const rows = differentialDriveRows(0.25, 0.5)

  assert.deepEqual(rows.left.map((value) => Number(value.toFixed(6))), [4, 0, -2])
  assert.deepEqual(rows.right.map((value) => Number(value.toFixed(6))), [4, 0, 2])
})

test("lateralConstraintResidual is zero when local velocity is parallel to the wheel", () => {
  const residual = lateralConstraintResidual(
    { vx: 1, vy: 0, omega: 0 },
    { x: 0, y: 0.5 },
    unitFromAngle(Math.PI / 2),
  )

  assert.equal(residual, 0)
})
```

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/wheeledRobotVisualLab.math.test.ts
```

Expected: FAIL because `wheeledRobotVisualLab.math.ts` does not exist.

**Step 3: Implement the math helpers**

Create `quartz/components/scripts/wheeledRobotVisualLab.math.ts`:

```ts
export type Vec2 = {
  x: number
  y: number
}

export type BodyTwist = {
  vx: number
  vy: number
  omega: number
}

export type MatrixRow = [number, number, number]

export function unitFromAngle(theta: number): Vec2 {
  return { x: Math.cos(theta), y: Math.sin(theta) }
}

export function normalFromTangent(tangent: Vec2): Vec2 {
  return { x: -tangent.y, y: tangent.x }
}

export function dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y
}

export function wheelPointVelocity(twist: BodyTwist, point: Vec2): Vec2 {
  return {
    x: twist.vx - twist.omega * point.y,
    y: twist.vy + twist.omega * point.x,
  }
}

export function directionRow(direction: Vec2, point: Vec2, radius = 1): MatrixRow {
  return [
    direction.x / radius,
    direction.y / radius,
    (-direction.x * point.y + direction.y * point.x) / radius,
  ]
}

export function rollingSpeed(twist: BodyTwist, point: Vec2, tangent: Vec2, radius = 1): number {
  return dot(tangent, wheelPointVelocity(twist, point)) / radius
}

export function lateralConstraintResidual(twist: BodyTwist, point: Vec2, normal: Vec2): number {
  return dot(normal, wheelPointVelocity(twist, point))
}

export function differentialDriveRows(radius: number, halfTrack: number): {
  left: MatrixRow
  right: MatrixRow
} {
  const tangent = unitFromAngle(0)
  return {
    left: directionRow(tangent, { x: 0, y: halfTrack }, radius),
    right: directionRow(tangent, { x: 0, y: -halfTrack }, radius),
  }
}
```

**Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/wheeledRobotVisualLab.math.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add quartz/components/scripts/wheeledRobotVisualLab.math.ts tests/wheeledRobotVisualLab.math.test.ts
git commit -m "test: add wheeled robot kinematics helpers"
```

### Task 2: Add Quartz Component Hook

**Files:**
- Create: `quartz/components/WheeledRobotVisualLab.tsx`
- Create: `quartz/components/scripts/wheeledRobotVisualLab.inline.ts`
- Create: `quartz/components/styles/wheeledRobotVisualLab.scss`
- Modify: `quartz/components/index.ts`
- Modify: `quartz.layout.ts`

**Step 1: Create the component shell**

Create `quartz/components/WheeledRobotVisualLab.tsx`:

```tsx
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import script from "./scripts/wheeledRobotVisualLab.inline"
import style from "./styles/wheeledRobotVisualLab.scss"

export default (() => {
  const WheeledRobotVisualLab: QuartzComponent = () => null

  WheeledRobotVisualLab.css = style
  WheeledRobotVisualLab.afterDOMLoaded = script

  return WheeledRobotVisualLab
}) satisfies QuartzComponentConstructor
```

**Step 2: Export the component**

Modify `quartz/components/index.ts`:

```ts
import WheeledRobotVisualLab from "./WheeledRobotVisualLab"
```

and add it to the export block:

```ts
  WheeledRobotVisualLab,
```

**Step 3: Mount the component globally**

Modify `quartz.layout.ts`:

```ts
  afterBody: [Component.WheeledRobotVisualLab()],
```

This attaches resources globally while the script itself only renders when a page contains `[data-wheeled-robot-lab]`.

**Step 4: Add a temporary script stub**

Create `quartz/components/scripts/wheeledRobotVisualLab.inline.ts`:

```ts
function setupWheeledRobotVisualLabs() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-wheeled-robot-lab]")) {
    if (root.dataset.wheeledRobotLabReady === "true") continue
    root.dataset.wheeledRobotLabReady = "true"
    root.textContent = "Wheeled robot visual lab"
  }
}

document.addEventListener("nav", setupWheeledRobotVisualLabs)
```

**Step 5: Add temporary styles**

Create `quartz/components/styles/wheeledRobotVisualLab.scss`:

```scss
.wheeled-robot-lab {
  border: 1px solid var(--lightgray);
}
```

**Step 6: Build**

Run:

```bash
npm run wiki:build
```

Expected: PASS and no TypeScript/esbuild errors.

**Step 7: Commit**

```bash
git add quartz/components/WheeledRobotVisualLab.tsx quartz/components/scripts/wheeledRobotVisualLab.inline.ts quartz/components/styles/wheeledRobotVisualLab.scss quartz/components/index.ts quartz.layout.ts
git commit -m "feat: add wheeled robot visual lab hook"
```

### Task 3: Implement Interactive SVG Renderer

**Files:**
- Modify: `quartz/components/scripts/wheeledRobotVisualLab.inline.ts`
- Modify: `quartz/components/styles/wheeledRobotVisualLab.scss`

**Step 1: Replace the stub with rendering code**

Implement `quartz/components/scripts/wheeledRobotVisualLab.inline.ts` with these pieces:

- import math helpers from `./wheeledRobotVisualLab.math`;
- `type RobotKind = "differential" | "omni" | "steerable"`;
- `type LabState = { kind: RobotKind; vx: number; vy: number; omega: number; beta: number; radius: number; halfTrack: number }`;
- `createControlPanel(root, state, render)` for selectors and sliders;
- `createSvg(root)` for a fixed `viewBox="-3 -2.2 6 4.4"` SVG;
- `renderRobot(svg, state)` for chassis, frames, wheels, velocity arrows, rolling directions, and lateral normals;
- `renderEquations(panel, state)` for numeric rows and residuals;
- `setupWheeledRobotVisualLabs()` bound to `document.addEventListener("nav", ...)`.

Use explicit SVG helper functions:

```ts
function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag)
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, String(value))
  }
  return element
}
```

Use `window.addCleanup` for event listeners when possible:

```ts
input.addEventListener("input", onInput)
window.addCleanup?.(() => input.removeEventListener("input", onInput))
```

**Step 2: Keep formulas plain but precise**

For the equation panel, render readable text rather than relying on KaTeX re-rendering after DOM updates:

```text
V_b = [v_x, v_y, omega]^T = [...]
v_i = [v_x - omega y_i, v_y + omega x_i]^T
dot(phi)_i = (1/r) t_i^T v_i
n_i^T v_i = ...
```

**Step 3: Implement the three robot configurations**

Differential drive:

- wheel points: `(0, +l)` and `(0, -l)`;
- tangent: `(1, 0)`;
- show lateral no-slip normals for both wheels;
- show rows `[1/r, 0, -l/r]` and `[1/r, 0, +l/r]`;
- show global nonholonomic statement `v_y = 0`.

Omni:

- three wheels at angles `90 deg`, `210 deg`, `330 deg` around the chassis;
- tangents arranged to form a standard three-wheel omni base;
- show passive lateral/roller direction as dashed rather than forbidden;
- emphasize that rows map to driven wheel speeds but lateral no-slip rows are not imposed.

Steerable:

- one steerable module at the front and one stabilizing rear point for geometry context;
- tangent angle is `beta`;
- normal angle is `beta + pi/2`;
- show both rolling row and lateral residual as functions of `beta`.

**Step 4: Apply academic styling**

Style the lab with:

- CSS grid layout: diagram left, equations/controls right on desktop; stacked on mobile;
- bounded figure height with stable aspect ratio;
- `font-family: var(--codeFont)` for formulas and numeric rows;
- no decorative gradients, shadows, or card nesting;
- color roles: axis gray, rolling direction blue/teal, lateral constraint muted red, velocity black.

**Step 5: Build**

Run:

```bash
npm run wiki:build
```

Expected: PASS.

**Step 6: Commit**

```bash
git add quartz/components/scripts/wheeledRobotVisualLab.inline.ts quartz/components/styles/wheeledRobotVisualLab.scss
git commit -m "feat: render wheeled robot visual lab"
```

### Task 4: Add Wiki Synthesis Page

**Files:**
- Create: `wiki/syntheses/wheeled-robot-visual-lab.md`
- Modify: `wiki/syntheses/wheeled-robot-modeling-learning-map.md`
- Modify: `wiki/index.md`
- Modify: `wiki/log.md`

**Step 1: Create the synthesis page**

Create `wiki/syntheses/wheeled-robot-visual-lab.md`:

```markdown
---
title: "Wheeled Robot Visual Lab"
type: synthesis
tags: [learn, robotics, kinematics, visualization]
sources:
  - "[[Modern Robotics Chapter 13: Wheeled Mobile Robots]]"
  - "[[Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots]]"
last_updated: 2026-05-01
---

## 目的

这个页面把轮子级别的几何约束画成可交互的平面图，并同步显示它们如何形成 chassis-level kinematic matrix（底盘运动学矩阵）。它是一个 learning scaffold：数学关系来自已 ingest 的 wheeled mobile robot sources，交互组织方式是 wiki 的学习辅助层。

## 从轮子约束到矩阵行

平面刚体的 body twist 写成 $V_b = [v_x, v_y, \omega]^T$。位于 body frame 中 $(x_i, y_i)$ 的轮子接触点速度为：

$$
v_i =
\begin{bmatrix}
v_x - \omega y_i \\
v_y + \omega x_i
\end{bmatrix}
$$

轮子的 rolling direction $t_i$ 给出 driven rolling row：

$$
\dot\phi_i = \frac{1}{r} t_i^T v_i
$$

conventional wheel 的 lateral direction $n_i$ 给出 no-slip constraint：

$$
n_i^T v_i = 0
$$

这些 row 叠起来后，就是整车层面的 kinematic matrix。differential drive、omni wheel 和 steerable wheel 的差异，主要体现在哪些 row 被保留、哪些 lateral constraints 被放松，以及 wheel direction 是否随 steering angle 改变。

## 交互图

<div data-wheeled-robot-lab data-default-kind="differential"></div>

## 读图方法

- 蓝绿色箭头表示 rolling direction $t_i$，它进入 wheel-speed row。
- 红色法向箭头表示 lateral no-slip direction $n_i$，它进入 constraint row。
- 黑色小箭头表示由当前 $V_b$ 诱导出的 wheel contact velocity $v_i$。
- 对 omni wheel，虚线 lateral direction 表示被 passive roller motion 放松的方向，不再作为 conventional wheel 那样的硬 no-slip constraint。

## 关联

- [[WheeledRobotKinematics]]
- [[WheeledMobileRobotClassification]]
- [[NonholonomicMobileRobots]]
- [[OmnidirectionalWheels]]
- [[SteerableWheels]]
- [[MobileRobotOdometry]]
- [[Modern Robotics Chapter 13: Wheeled Mobile Robots]]
- [[Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots]]
```

**Step 2: Link from the existing learning map**

Modify `wiki/syntheses/wheeled-robot-modeling-learning-map.md` to add a short link under the practice or source-backed section:

```markdown
- 可交互图解：[[Wheeled Robot Visual Lab]] 把 wheel constraints、rolling rows 和 chassis matrix 放在同一个平面图里复习。
```

**Step 3: Update the wiki index**

Add `[[Wheeled Robot Visual Lab]]` under `wiki/syntheses/` in `wiki/index.md`.

**Step 4: Append the wiki log**

Append to `wiki/log.md`:

```markdown
## [2026-05-01] learn | Wheeled Robot Visual Lab

- Added `wiki/syntheses/wheeled-robot-visual-lab.md` as an embedded academic visualization scaffold for wheeled robot kinematics.
- Linked it to the wheeled robot modeling learning map and source-backed concept pages.
```

**Step 5: Run health check**

Run:

```bash
uv run python tools/health.py
```

Expected: PASS with no broken wikilinks or index sync issues.

**Step 6: Commit**

```bash
git add wiki/syntheses/wheeled-robot-visual-lab.md wiki/syntheses/wheeled-robot-modeling-learning-map.md wiki/index.md wiki/log.md
git commit -m "docs: add wheeled robot visual lab page"
```

### Task 5: Verify Build and Preview

**Files:**
- No source edits expected unless verification finds issues.

**Step 1: Run focused tests**

```bash
npm test -- tests/wheeledRobotVisualLab.math.test.ts
```

Expected: PASS.

**Step 2: Run wiki health**

```bash
uv run python tools/health.py
```

Expected: PASS.

**Step 3: Run production build**

```bash
npm run wiki:build
```

Expected: PASS.

**Step 4: Run local preview**

```bash
npm run wiki:preview
```

Expected: local server starts. Open the generated wiki page and verify:

- the lab renders on first load;
- the lab renders after navigating away and back through Quartz SPA links;
- each slider updates the diagram and rows;
- mobile width stacks controls below the figure without overlap;
- printed/static view still has meaningful labels.

**Step 5: Commit verification fixes if needed**

Only commit if a fix was required:

```bash
git add <fixed-files>
git commit -m "fix: polish wheeled robot visual lab"
```
