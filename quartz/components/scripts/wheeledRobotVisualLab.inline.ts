import {
  directionRow,
  lateralConstraintResidual,
  normalFromTangent,
  rollingSpeed,
  unitFromAngle,
  wheelPointVelocity,
  type BodyTwist,
  type MatrixRow,
  type Vec2,
} from "./wheeledRobotVisualLab.math"

type RobotKind = "differential" | "omni" | "steerable"

type LabState = {
  kind: RobotKind
  vx: number
  vy: number
  omega: number
  beta: number
  radius: number
  halfTrack: number
}

type WheelModel = {
  id: string
  label: string
  point: Vec2
  tangent: Vec2
  normalMode: "constraint" | "relaxed"
}

const defaultState: LabState = {
  kind: "differential",
  vx: 0.8,
  vy: 0,
  omega: 0.6,
  beta: 0,
  radius: 0.3,
  halfTrack: 0.6,
}

const svgNs = "http://www.w3.org/2000/svg"

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const element = document.createElementNS(svgNs, tag)
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, String(value))
  }
  return element
}

function fmt(value: number): string {
  if (Math.abs(value) < 1e-9) return "0.00"
  const fixed = value.toFixed(2)
  return value > 0 ? `+${fixed}` : fixed
}

function fmtRow(row: MatrixRow): string {
  return `[${row.map(fmt).join(", ")}]`
}

function deg(rad: number): number {
  return (rad * 180) / Math.PI
}

function add(parent: Element, child: Element): void {
  parent.appendChild(child)
}

function line(parent: Element, from: Vec2, to: Vec2, className: string, marker = false): void {
  add(
    parent,
    svgEl("line", {
      x1: from.x,
      y1: -from.y,
      x2: to.x,
      y2: -to.y,
      class: className,
      ...(marker ? { "marker-end": "url(#wrl-arrow)" } : {}),
    }),
  )
}

function arrow(parent: Element, from: Vec2, vector: Vec2, className: string, scale = 1): void {
  line(
    parent,
    from,
    { x: from.x + vector.x * scale, y: from.y + vector.y * scale },
    className,
    true,
  )
}

function label(parent: Element, at: Vec2, text: string, className = "wrl-svg-label"): void {
  const node = svgEl("text", {
    x: at.x,
    y: -at.y,
    class: className,
  })
  node.textContent = text
  add(parent, node)
}

function wheelModels(state: LabState): WheelModel[] {
  if (state.kind === "omni") {
    return [90, 210, 330].map((angle, index) => {
      const theta = (angle * Math.PI) / 180
      return {
        id: `w${index + 1}`,
        label: `w${index + 1}`,
        point: { x: Math.cos(theta) * 0.92, y: Math.sin(theta) * 0.92 },
        tangent: unitFromAngle(theta + Math.PI / 2),
        normalMode: "relaxed",
      }
    })
  }

  if (state.kind === "steerable") {
    return [
      {
        id: "s1",
        label: "s",
        point: { x: 0.82, y: 0 },
        tangent: unitFromAngle(state.beta),
        normalMode: "constraint",
      },
    ]
  }

  return [
    {
      id: "left",
      label: "L",
      point: { x: 0, y: state.halfTrack },
      tangent: unitFromAngle(0),
      normalMode: "constraint",
    },
    {
      id: "right",
      label: "R",
      point: { x: 0, y: -state.halfTrack },
      tangent: unitFromAngle(0),
      normalMode: "constraint",
    },
  ]
}

function twist(state: LabState): BodyTwist {
  return { vx: state.vx, vy: state.vy, omega: state.omega }
}

function resetState(state: LabState, kind = state.kind): void {
  Object.assign(state, defaultState, { kind })
}

function createSlider(
  labelText: string,
  min: number,
  max: number,
  step: number,
  getValue: () => number,
  setValue: (value: number) => void,
  render: () => void,
): HTMLElement {
  const row = document.createElement("label")
  row.className = "wrl-control"

  const name = document.createElement("span")
  name.className = "wrl-control-name"
  name.textContent = labelText

  const input = document.createElement("input")
  input.type = "range"
  input.min = String(min)
  input.max = String(max)
  input.step = String(step)
  input.value = String(getValue())

  const value = document.createElement("output")
  value.textContent = fmt(getValue())

  const onInput = () => {
    setValue(Number(input.value))
    value.textContent = fmt(getValue())
    render()
  }
  input.addEventListener("input", onInput)
  window.addCleanup(() => input.removeEventListener("input", onInput))

  row.replaceChildren(name, input, value)
  return row
}

function createControls(state: LabState, render: () => void): HTMLElement {
  const controls = document.createElement("form")
  controls.className = "wrl-controls"

  const modelRow = document.createElement("label")
  modelRow.className = "wrl-control"

  const modelName = document.createElement("span")
  modelName.className = "wrl-control-name"
  modelName.textContent = "model"

  const select = document.createElement("select")
  for (const [value, text] of [
    ["differential", "differential drive"],
    ["omni", "three-wheel omni"],
    ["steerable", "single steerable wheel"],
  ] as const) {
    const option = document.createElement("option")
    option.value = value
    option.textContent = text
    select.appendChild(option)
  }
  select.value = state.kind

  const onModelChange = () => {
    resetState(state, select.value as RobotKind)
    render()
  }
  select.addEventListener("change", onModelChange)
  window.addCleanup(() => select.removeEventListener("change", onModelChange))
  modelRow.replaceChildren(modelName, select)

  const reset = document.createElement("button")
  reset.type = "button"
  reset.className = "wrl-reset"
  reset.textContent = "reset"
  const onReset = () => {
    resetState(state)
    render()
  }
  reset.addEventListener("click", onReset)
  window.addCleanup(() => reset.removeEventListener("click", onReset))

  controls.replaceChildren(
    modelRow,
    createSlider("v_x", -1.5, 1.5, 0.1, () => state.vx, (value) => (state.vx = value), render),
    createSlider("v_y", -1.5, 1.5, 0.1, () => state.vy, (value) => (state.vy = value), render),
    createSlider(
      "omega",
      -1.5,
      1.5,
      0.1,
      () => state.omega,
      (value) => (state.omega = value),
      render,
    ),
    createSlider(
      "beta",
      -Math.PI / 2,
      Math.PI / 2,
      0.05,
      () => state.beta,
      (value) => (state.beta = value),
      render,
    ),
    createSlider("r", 0.2, 0.6, 0.05, () => state.radius, (value) => (state.radius = value), render),
    createSlider(
      "l",
      0.35,
      0.95,
      0.05,
      () => state.halfTrack,
      (value) => (state.halfTrack = value),
      render,
    ),
    reset,
  )

  return controls
}

function renderGrid(svg: SVGSVGElement): void {
  const defs = svgEl("defs")
  const marker = svgEl("marker", {
    id: "wrl-arrow",
    viewBox: "0 0 10 10",
    refX: 8,
    refY: 5,
    markerWidth: 5,
    markerHeight: 5,
    orient: "auto-start-reverse",
  })
  add(marker, svgEl("path", { d: "M 0 0 L 10 5 L 0 10 z", class: "wrl-arrow-head" }))
  add(defs, marker)
  add(svg, defs)

  for (let x = -3; x <= 3; x += 0.5) {
    line(svg, { x, y: -2.2 }, { x, y: 2.2 }, x === 0 ? "wrl-axis" : "wrl-grid")
  }
  for (let y = -2; y <= 2; y += 0.5) {
    line(svg, { x: -3, y }, { x: 3, y }, y === 0 ? "wrl-axis" : "wrl-grid")
  }

  line(svg, { x: 0, y: 0 }, { x: 1.25, y: 0 }, "wrl-body-x", true)
  line(svg, { x: 0, y: 0 }, { x: 0, y: 1.05 }, "wrl-body-y", true)
  label(svg, { x: 1.32, y: -0.07 }, "x_b")
  label(svg, { x: 0.08, y: 1.16 }, "y_b")
}

function renderWheel(svg: SVGSVGElement, state: LabState, wheel: WheelModel): void {
  const tangent = wheel.tangent
  const normal = normalFromTangent(tangent)
  const p = wheel.point
  const velocity = wheelPointVelocity(twist(state), p)

  const group = svgEl("g", {
    class: `wrl-wheel wrl-wheel-${wheel.normalMode}`,
    transform: `translate(${p.x} ${-p.y}) rotate(${-deg(Math.atan2(tangent.y, tangent.x))})`,
  })
  add(group, svgEl("rect", { x: -0.08, y: -0.28, width: 0.16, height: 0.56, rx: 0.03 }))
  add(svg, group)

  arrow(svg, { x: p.x - tangent.x * 0.2, y: p.y - tangent.y * 0.2 }, tangent, "wrl-roll", 0.55)
  arrow(
    svg,
    { x: p.x, y: p.y },
    normal,
    wheel.normalMode === "constraint" ? "wrl-normal" : "wrl-normal wrl-relaxed",
    0.46,
  )
  arrow(svg, p, velocity, "wrl-velocity", 0.28)
  label(svg, { x: p.x + 0.12, y: p.y + 0.18 }, wheel.label)
}

function renderRobot(svg: SVGSVGElement, state: LabState): void {
  svg.replaceChildren()
  renderGrid(svg)

  add(svg, svgEl("rect", { x: -1.0, y: -0.65, width: 2.0, height: 1.3, rx: 0.08, class: "wrl-body" }))
  add(svg, svgEl("circle", { cx: 0, cy: 0, r: 0.05, class: "wrl-origin" }))

  if (state.kind === "omni") {
    add(svg, svgEl("circle", { cx: 0, cy: 0, r: 0.94, class: "wrl-omni-outline" }))
  }

  if (state.kind === "steerable") {
    const rear = svgEl("g", {
      class: "wrl-rear-reference",
      transform: "translate(-0.82 0) rotate(0)",
    })
    add(rear, svgEl("rect", { x: -0.06, y: -0.24, width: 0.12, height: 0.48, rx: 0.03 }))
    add(svg, rear)
  }

  for (const wheel of wheelModels(state)) {
    renderWheel(svg, state, wheel)
  }
}

function equationRows(state: LabState): string {
  const rows = wheelModels(state).map((wheel) => {
    const row = directionRow(wheel.tangent, wheel.point, state.radius)
    const normal = normalFromTangent(wheel.tangent)
    const residual = lateralConstraintResidual(twist(state), wheel.point, normal)
    const speed = rollingSpeed(twist(state), wheel.point, wheel.tangent, state.radius)
    const normalLabel = wheel.normalMode === "constraint" ? "n_i^T v_i" : "relaxed n_i^T v_i"

    return `${wheel.label}: H_i = ${fmtRow(row)}   dot_phi_i = ${fmt(speed)}\n   ${normalLabel} = ${fmt(residual)}`
  })

  if (state.kind === "differential") {
    rows.push("constraint summary: v_y = 0 for ideal fixed wheels")
  }

  if (state.kind === "omni") {
    rows.push("constraint summary: passive roller directions are not hard no-slip rows")
  }

  if (state.kind === "steerable") {
    rows.push(`steering: beta = ${fmt(state.beta)} rad (${fmt(deg(state.beta))} deg)`)
  }

  return rows.join("\n")
}

function renderEquations(panel: HTMLElement, state: LabState): void {
  panel.replaceChildren()

  const title = document.createElement("h4")
  title.textContent = "kinematic rows"

  const twistLine = document.createElement("pre")
  twistLine.textContent = [
    `V_b = [v_x, v_y, omega]^T = [${fmt(state.vx)}, ${fmt(state.vy)}, ${fmt(state.omega)}]^T`,
    "v_i = [v_x - omega y_i, v_y + omega x_i]^T",
    "dot_phi_i = (1/r) t_i^T v_i",
    "constraint row: n_i^T v_i = 0",
    "",
    equationRows(state),
  ].join("\n")

  const legend = document.createElement("dl")
  legend.className = "wrl-legend"
  legend.innerHTML = `
    <dt><span class="wrl-key wrl-key-roll"></span>t_i</dt><dd>rolling direction</dd>
    <dt><span class="wrl-key wrl-key-normal"></span>n_i</dt><dd>lateral no-slip direction</dd>
    <dt><span class="wrl-key wrl-key-velocity"></span>v_i</dt><dd>contact point velocity</dd>
  `

  panel.replaceChildren(title, twistLine, legend)
}

function setupLab(root: HTMLElement): void {
  if (root.dataset.wheeledRobotLabReady === "true") return
  root.dataset.wheeledRobotLabReady = "true"
  root.classList.add("wheeled-robot-lab")

  const state = { ...defaultState }
  const defaultKind = root.dataset.defaultKind as RobotKind | undefined
  if (defaultKind === "differential" || defaultKind === "omni" || defaultKind === "steerable") {
    state.kind = defaultKind
  }

  const figure = document.createElement("figure")
  figure.className = "wrl-figure"

  const svg = svgEl("svg", {
    viewBox: "-3 -2.2 6 4.4",
    role: "img",
    "aria-label": "Planar wheeled robot kinematics diagram",
  })
  svg.classList.add("wrl-svg")

  const equations = document.createElement("section")
  equations.className = "wrl-equations"

  const render = () => {
    renderRobot(svg, state)
    renderEquations(equations, state)
  }

  const controls = createControls(state, render)
  const diagram = document.createElement("div")
  diagram.className = "wrl-diagram"
  diagram.appendChild(svg)

  figure.replaceChildren(diagram, equations)
  root.replaceChildren(figure, controls)
  render()
}

function setupWheeledRobotVisualLabs() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-wheeled-robot-lab]")) {
    setupLab(root)
  }
}

document.addEventListener("nav", setupWheeledRobotVisualLabs)
