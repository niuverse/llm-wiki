import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import {
  drag,
  dragEnable,
  easeCubicOut,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
  zoom,
  zoomIdentity,
  type SimulationNodeDatum,
  type ZoomTransform,
} from "d3"
import { FullSlug, getFullSlug, resolveRelative } from "../../util/path"

export const knowledgeKinds: Record<string, string> = {
  concept: "概念讲解",
  source: "来源档案",
  synthesis: "学习与研究",
  entity: "项目与工具",
}
const colors: Record<string, string> = {
  concept: "#358579",
  source: "#648ac4",
  synthesis: "#aa79b8",
  entity: "#bc8b40",
}
type GraphNode = SimulationNodeDatum & {
  id: string
  page: ContentDetails
  degree: number
  radius: number
}
type GraphEdge = { source: string | GraphNode; target: string | GraphNode }
type GraphView = {
  centerSlug?: string
  ids: string
  positions: Map<string, { x: number; y: number }>
  transform: ZoomTransform
  paused: boolean
  interacted: boolean
}
// Preserve exploration within this page; detached SPA containers can be collected.
const views = new WeakMap<HTMLElement, GraphView>()
const svgNS = "http://www.w3.org/2000/svg"
function svgElement<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>) {
  const el = document.createElementNS(svgNS, tag)
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
  return el
}

export function renderGraph(
  container: HTMLElement,
  pages: Map<string, ContentDetails>,
  centerSlug?: string,
) {
  container.replaceChildren()
  if (pages.size === 0) {
    const empty = document.createElement("p")
    empty.textContent = "没有符合筛选的页面，请调整主题、类型或阅读记录。"
    container.append(empty)
    return () => {}
  }
  const previous = views.get(container)
  const cached = previous?.centerSlug === centerSlug ? previous : undefined
  const nodes: GraphNode[] = [...pages].map(([id, page]) => ({
    id,
    page,
    degree: 0,
    radius: 6,
    ...cached?.positions.get(id),
  }))
  const byId = new Map(nodes.map((node) => [node.id, node]))
  const edges: GraphEdge[] = []
  for (const [source, page] of pages) {
    for (const target of new Set(page.links ?? [])) {
      if (source === target || !pages.has(target)) continue
      edges.push({ source, target })
      byId.get(source)!.degree++
      byId.get(target)!.degree++
    }
  }
  for (const node of nodes) {
    node.radius = node.id === centerSlug ? 12 : 5 + Math.min(6, Math.sqrt(node.degree) * 0.65)
  }
  const center = centerSlug ? byId.get(centerSlug) : undefined
  if (center) {
    center.fx = center.x ?? 0
    center.fy = center.y ?? 0
  }
  const simulation = forceSimulation(nodes)
    .force(
      "link",
      forceLink<GraphNode, GraphEdge>(edges)
        .id((node) => node.id)
        .distance(nodes.length < 25 ? 135 : 90)
        .strength(0.13),
    )
    .force("charge", forceManyBody().strength(-200))
    .force("center", forceCenter(0, 0).strength(0.08))
    .force("collide", forceCollide<GraphNode>((node) => node.radius + 12).iterations(2))
    .alphaDecay(0.035)
    .alphaMin(0.008)
    .velocityDecay(0.3)
    .stop()
  // Only warm up a new graph; surviving nodes retain their physical coordinates.
  if (!cached) simulation.tick(40)
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (motion.matches) simulation.tick(120)

  const toolbar = document.createElement("div")
  toolbar.className = "graph-toolbar"
  const description = document.createElement("p")
  description.textContent = `${nodes.length} 个页面 · ${edges.length} 条引用`
  toolbar.append(description)
  const stage = document.createElement("div")
  stage.className = `graph-stage${nodes.length <= 25 ? " compact" : ""}`
  const svg = svgElement("svg", {
    role: "group",
    "aria-label": "知识引用图，可拖动节点，滚轮或双指缩放；节点链接可通过 Tab 键选择",
    class: `relation-svg${nodes.length <= 8 ? " compact" : ""}`,
  })
  const scene = svgElement("g", { class: "relation-scene" })
  const defs = svgElement("defs", {})
  const markerId = `relation-arrow-${centerSlug ? "local" : "global"}`
  const marker = svgElement("marker", {
    id: markerId,
    viewBox: "0 0 8 8",
    refX: "8",
    refY: "4",
    markerWidth: "5",
    markerHeight: "5",
    orient: "auto-start-reverse",
  })
  marker.append(svgElement("path", { d: "M0,0 L8,4 L0,8", fill: "currentColor" }))
  defs.append(marker)
  svg.append(defs, scene)
  const tooltip = document.createElement("div")
  tooltip.className = "graph-tooltip"
  tooltip.hidden = true
  const tooltipTitle = document.createElement("strong")
  const tooltipMeta = document.createElement("span")
  tooltip.append(tooltipTitle, tooltipMeta)
  stage.append(svg, tooltip)
  container.append(toolbar, stage)
  let width = stage.clientWidth || 800
  let height = stage.clientHeight || 520
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

  const edgeElements = edges.map((edge) => {
    const el = svgElement("line", {
      class: "relation-edge",
      "marker-end": `url(#${markerId})`,
    })
    scene.append(el)
    return { el, source: edge.source as GraphNode, target: edge.target as GraphNode }
  })
  const listeners = new AbortController()
  const nodeElements = nodes.map((node) => {
    const el = svgElement("a", {
      href: resolveRelative(getFullSlug(window), node.id as FullSlug),
      tabindex: "0",
      "aria-label": `${node.page.title}，${knowledgeKinds[node.page.type ?? ""] ?? "知识页"}`,
      class: `relation-node${node.id === centerSlug ? " current" : ""}`,
      "data-slug": node.id,
    })
    const title = svgElement("title", {})
    title.textContent = node.page.title
    const color = colors[node.page.type ?? ""] ?? "#7e8d98"
    el.append(
      title,
      svgElement("circle", { r: "20", class: "relation-hit", fill: "transparent" }),
      svgElement("circle", { r: String(node.radius + 5), class: "relation-halo", fill: color }),
      svgElement("circle", { r: String(node.radius), class: "relation-dot", fill: color }),
    )
    const label = svgElement("text", {
      x: "0",
      y: String(-node.radius - 9),
      "text-anchor": "middle",
    })
    label.textContent =
      node.page.title.length > 14 ? `${node.page.title.slice(0, 14)}…` : node.page.title
    el.append(label)
    scene.append(el)
    return { el, node, label }
  })
  let disposed = false
  let paused = cached?.paused ?? false
  let inView = true
  let interacted = cached?.interacted ?? false
  let activeDrag = false
  let activePan = false
  let touchMouseUntil = 0
  let transform = cached?.transform ?? zoomIdentity.translate(width / 2, height / 2)
  const view: GraphView = {
    centerSlug,
    ids: [...pages.keys()].sort().join("\n"),
    positions: cached?.positions ?? new Map(),
    transform,
    paused,
    interacted,
  }
  views.set(container, view)

  function draw() {
    if (disposed) return
    for (const { el, node } of nodeElements)
      el.setAttribute("transform", `translate(${node.x},${node.y})`)
    for (const { el, source, target } of edgeElements) {
      const dx = target.x! - source.x!
      const dy = target.y! - source.y!
      const length = Math.hypot(dx, dy) || 1
      el.setAttribute("x1", String(source.x! + (dx / length) * (source.radius + 1)))
      el.setAttribute("y1", String(source.y! + (dy / length) * (source.radius + 1)))
      el.setAttribute("x2", String(target.x! - (dx / length) * (target.radius + 4)))
      el.setAttribute("y2", String(target.y! - (dy / length) * (target.radius + 4)))
    }
  }
  function highlight(node?: GraphNode) {
    const neighbors = new Set(node ? [node.id] : [])
    for (const { el, source, target } of edgeElements) {
      const related = Boolean(node && (source.id === node.id || target.id === node.id))
      if (related) {
        neighbors.add(source.id)
        neighbors.add(target.id)
      }
      el.classList.toggle("related", related)
      el.classList.toggle("dimmed", Boolean(node) && !related)
    }
    for (const { el, node: item } of nodeElements) {
      el.classList.toggle("active", node?.id === item.id)
      el.classList.toggle("related", neighbors.has(item.id))
      el.classList.toggle("dimmed", Boolean(node) && !neighbors.has(item.id))
    }
    tooltip.hidden = !node
    if (node) {
      tooltipTitle.textContent = node.page.title
      tooltipMeta.textContent = `${knowledgeKinds[node.page.type ?? ""] ?? "知识页"} · ${node.degree} 条引用 · 点击打开`
    }
  }
  const svgSelection = select(svg)
  const zoomBehavior = zoom<SVGSVGElement, unknown>()
    .touchable(false)
    .extent((): [[number, number], [number, number]] => [
      [0, 0],
      [width, height],
    ])
    .scaleExtent([0.15, 5])
    .filter(
      (event) =>
        !event.button &&
        (event.type === "wheel" || performance.now() >= touchMouseUntil) &&
        (event.type === "wheel" || !(event.target as Element).closest(".relation-node")),
    )
    .on("start.graph", (event) => {
      if (disposed) return
      activePan = Boolean(event.sourceEvent && event.sourceEvent.type !== "wheel")
      svg.classList.toggle("is-panning", activePan)
    })
    .on("zoom.graph", (event) => {
      if (disposed) return
      transform = event.transform
      view.transform = transform
      scene.setAttribute("transform", transform.toString())
      for (const { label, node } of nodeElements) {
        label.setAttribute("transform", `scale(${1 / transform.k})`)
        label.setAttribute("y", String(-node.radius * transform.k - 9))
      }
      svg.classList.toggle("labels-visible", transform.k >= 1.45)
      if (event.sourceEvent) view.interacted = interacted = true
    })
    .on("end.graph", () => {
      activePan = false
      svg.classList.remove("is-panning")
    })
  svgSelection.call(zoomBehavior).on("dblclick.zoom", null)
  svgSelection.call(zoomBehavior.transform, transform)

  function fit(animate = true) {
    const xmin = Math.min(...nodes.map((node) => node.x! - node.radius))
    const xmax = Math.max(...nodes.map((node) => node.x! + node.radius))
    const ymin = Math.min(...nodes.map((node) => node.y! - node.radius))
    const ymax = Math.max(...nodes.map((node) => node.y! + node.radius))
    const k = Math.max(
      0.15,
      Math.min(
        2,
        (width - 80) / Math.max(100, xmax - xmin),
        (height - 80) / Math.max(100, ymax - ymin),
      ),
    )
    const target = zoomIdentity
      .translate(width / 2, height / 2)
      .scale(k)
      .translate(-(xmin + xmax) / 2, -(ymin + ymax) / 2)
    svgSelection.interrupt("viewport")
    if (animate && !motion.matches)
      svgSelection
        .transition("viewport")
        .duration(280)
        .ease(easeCubicOut)
        .call(zoomBehavior.transform, target)
    else svgSelection.call(zoomBehavior.transform, target)
  }
  draw()
  if (!cached || (!cached.interacted && cached.ids !== view.ids)) fit(Boolean(cached))
  function updateActivity() {
    if (disposed || paused || motion.matches || document.hidden || !inView) simulation.stop()
    else if (simulation.alpha() > simulation.alphaMin()) simulation.restart()
  }
  let dragStart = { x: 0, y: 0 }
  let dragIdentifier: number | string | undefined
  let moved = false
  let suppressClick: { id?: string; until: number } | undefined
  const nodeSelection = select(scene)
    .selectAll<SVGAElement, GraphNode>(".relation-node")
    .data(nodes)
  function pinNode(node: GraphNode) {
    activeDrag = true
    node.fx = node.x
    node.fy = node.y
    nodeSelection.filter((item) => item === node).classed("dragging", true)
    highlight(node)
    if (!paused && !motion.matches) {
      simulation.alpha(Math.max(0.25, simulation.alpha())).alphaTarget(0.12)
      updateActivity()
    }
  }
  function releaseNode(node: GraphNode) {
    activeDrag = false
    nodeSelection.classed("dragging", false)
    if (node.id !== centerSlug) {
      node.fx = null
      node.fy = null
    }
    simulation.alphaTarget(0)
    updateActivity()
  }
  nodeSelection.call(
    drag<SVGAElement, GraphNode>()
      .touchable(false)
      .filter((event) => performance.now() >= touchMouseUntil && !event.ctrlKey && !event.button)
      .container(() => scene)
      .clickDistance(5)
      .on("start.graph", (event, node) => {
        if (dragIdentifier !== undefined) return
        dragIdentifier = event.identifier
        svgSelection.interrupt("viewport")
        view.interacted = interacted = true
        suppressClick = undefined
        moved = false
        dragStart = { x: event.x, y: event.y }
        pinNode(node)
      })
      .on("drag.graph", (event, node) => {
        if (dragIdentifier !== event.identifier) return
        moved ||= Math.hypot(event.x - dragStart.x, event.y - dragStart.y) * transform.k > 5
        node.fx = node.x = event.x
        node.fy = node.y = event.y
        draw()
      })
      .on("end.graph", (event, node) => {
        if (dragIdentifier !== event.identifier) return
        dragIdentifier = undefined
        if (moved) suppressClick = { id: node.id, until: performance.now() + 500 }
        releaseNode(node)
      }),
  )
  type TouchPointer = {
    point: [number, number]
    start: [number, number]
    capture: Element
    node?: GraphNode
  }
  type TouchGesture =
    | { kind: "node"; node: GraphNode; offset: [number, number] }
    | { kind: "viewport"; anchor: [number, number]; scale: number; distance: number }
  const touchPointers = new Map<number, TouchPointer>()
  let touchGesture: TouchGesture | undefined
  let touchMoved = false
  function touchPoint(event: PointerEvent): [number, number] {
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      svg.getScreenCTM()!.inverse(),
    )
    return [point.x, point.y]
  }
  function beginTouchGesture(allowNode = false) {
    if (touchGesture?.kind === "node") releaseNode(touchGesture.node)
    touchGesture = undefined
    const [first, second] = touchPointers.values()
    activePan = Boolean(first && (second || !allowNode || !first.node))
    svg.classList.toggle("is-panning", activePan)
    if (!first) return
    if (!second && allowNode && first.node) {
      const [x, y] = transform.invert(first.point)
      touchGesture = {
        kind: "node",
        node: first.node,
        offset: [first.node.x! - x, first.node.y! - y],
      }
      pinNode(first.node)
      return
    }
    const midpoint: [number, number] = second
      ? [(first.point[0] + second.point[0]) / 2, (first.point[1] + second.point[1]) / 2]
      : first.point
    touchGesture = {
      kind: "viewport",
      anchor: transform.invert(midpoint),
      scale: transform.k,
      distance: second
        ? Math.max(
            1,
            Math.hypot(first.point[0] - second.point[0], first.point[1] - second.point[1]),
          )
        : 0,
    }
    if (second) touchMoved = true
  }
  svg.addEventListener(
    "pointerdown",
    (event) => {
      if (event.pointerType !== "touch" || disposed) return
      touchMouseUntil = performance.now() + 500
      if (!touchPointers.size) {
        touchMoved = false
        suppressClick = undefined
      }
      const anchor = (event.target as Element).closest(".relation-node")
      const capture = anchor ?? svg
      touchPointers.set(event.pointerId, {
        point: touchPoint(event),
        start: [event.clientX, event.clientY],
        capture,
        node: anchor ? byId.get((anchor as SVGAElement).dataset.slug!) : undefined,
      })
      // Keep the original anchor as the capture target so an unmoved tap opens it.
      capture.setPointerCapture(event.pointerId)
      svgSelection.interrupt("viewport")
      view.interacted = interacted = true
      beginTouchGesture(touchPointers.size === 1)
    },
    { signal: listeners.signal },
  )
  svg.addEventListener(
    "pointermove",
    (event) => {
      const current = touchPointers.get(event.pointerId)
      if (!current || !touchGesture || disposed) return
      current.point = touchPoint(event)
      touchMoved ||=
        Math.hypot(event.clientX - current.start[0], event.clientY - current.start[1]) > 5
      if (touchMoved) event.preventDefault()
      if (touchGesture.kind === "node") {
        const [x, y] = transform.invert(current.point)
        const { node, offset } = touchGesture
        node.fx = node.x = x + offset[0]
        node.fy = node.y = y + offset[1]
        draw()
      } else {
        const [first, second] = touchPointers.values()
        const midpoint: [number, number] = second
          ? [(first.point[0] + second.point[0]) / 2, (first.point[1] + second.point[1]) / 2]
          : first.point
        const [minScale, maxScale] = zoomBehavior.scaleExtent()
        const scale = second
          ? Math.max(
              minScale,
              Math.min(
                maxScale,
                (touchGesture.scale *
                  Math.hypot(first.point[0] - second.point[0], first.point[1] - second.point[1])) /
                  touchGesture.distance,
              ),
            )
          : touchGesture.scale
        svgSelection.call(
          zoomBehavior.transform,
          zoomIdentity
            .translate(...midpoint)
            .scale(scale)
            .translate(-touchGesture.anchor[0], -touchGesture.anchor[1]),
        )
        activePan = true
        svg.classList.add("is-panning")
      }
    },
    { signal: listeners.signal },
  )
  function finishTouchPointer(event: PointerEvent) {
    const current = touchPointers.get(event.pointerId)
    if (!current || disposed) return
    touchPointers.delete(event.pointerId)
    touchMouseUntil = performance.now() + 500
    if (event.type !== "pointerup") touchMoved = true
    if (touchMoved) suppressClick = { until: performance.now() + 500 }
    if (current.capture.hasPointerCapture(event.pointerId))
      current.capture.releasePointerCapture(event.pointerId)
    // A remaining finger pans from its current location instead of jumping back
    // to node dragging when a pinch ends.
    beginTouchGesture()
  }
  for (const type of ["pointerup", "pointercancel", "lostpointercapture"] as const)
    svg.addEventListener(type, finishTouchPointer, { signal: listeners.signal })
  for (const { el, node } of nodeElements) {
    for (const type of ["mouseenter", "focus"])
      el.addEventListener(type, () => highlight(node), { signal: listeners.signal })
    for (const type of ["mouseleave", "blur"])
      el.addEventListener(
        type,
        () => {
          if (!activeDrag) highlight()
        },
        { signal: listeners.signal },
      )
    el.addEventListener(
      "click",
      (event) => {
        if (
          event.detail !== 0 &&
          suppressClick &&
          (!suppressClick.id || suppressClick.id === node.id) &&
          performance.now() < suppressClick.until
        ) {
          event.preventDefault()
          event.stopPropagation()
        }
      },
      { signal: listeners.signal },
    )
  }
  let inlineViewport: ZoomTransform | undefined
  const buttons = new Map<string, HTMLButtonElement>()
  for (const [action, label, title] of [
    ["zoom-in", "＋", "放大"],
    ["zoom-out", "−", "缩小"],
    ["fit", "适配", "显示全部节点"],
    ["pause", "暂停", "暂停布局动画，仍可拖拽与缩放"],
    ["fullscreen", "全屏", "全屏探索关系图"],
  ]) {
    const button = document.createElement("button")
    button.type = "button"
    button.textContent = label
    button.title = title
    button.setAttribute("aria-label", title)
    button.dataset.graphAction = action
    toolbar.append(button)
    buttons.set(action, button)
    button.addEventListener(
      "click",
      () => {
        if (action === "fit") {
          view.interacted = interacted = true
          fit()
        } else if (action === "pause") {
          paused = !paused
          view.paused = paused
          updatePauseButton()
          if (!paused) simulation.alpha(0.25)
          updateActivity()
        } else if (action === "fullscreen") {
          if (document.fullscreenElement !== container) inlineViewport = transform
          const request =
            document.fullscreenElement === container
              ? document.exitFullscreen()
              : container.requestFullscreen()
          request.catch(() => {
            button.title = "当前浏览器无法进入全屏"
          })
        } else {
          view.interacted = interacted = true
          svgSelection.interrupt("viewport")
          const target = motion.matches
            ? svgSelection
            : svgSelection.transition("viewport").duration(220).ease(easeCubicOut)
          target.call(zoomBehavior.scaleBy, action === "zoom-in" ? 1.3 : 1 / 1.3)
        }
      },
      { signal: listeners.signal },
    )
  }
  function updatePauseButton() {
    const button = buttons.get("pause")!
    button.textContent = motion.matches ? "静态布局" : paused ? "继续" : "暂停"
    button.disabled = motion.matches
    button.setAttribute("aria-pressed", String(paused || motion.matches))
    button.setAttribute(
      "aria-label",
      motion.matches ? "已按系统设置减少动态效果" : paused ? "继续布局动画" : "暂停布局动画",
    )
  }
  updatePauseButton()
  buttons.get("fullscreen")!.hidden = !document.fullscreenEnabled
  document.addEventListener(
    "fullscreenchange",
    () => {
      const button = buttons.get("fullscreen")!
      button.textContent = document.fullscreenElement === container ? "退出全屏" : "全屏"
      button.setAttribute("aria-label", button.textContent)
      resizeViewport()
      if (document.fullscreenElement === container) fit()
      else if (inlineViewport) {
        svgSelection.interrupt("viewport").call(zoomBehavior.transform, inlineViewport)
        inlineViewport = undefined
      }
    },
    { signal: listeners.signal },
  )
  document.addEventListener("visibilitychange", updateActivity, { signal: listeners.signal })
  motion.addEventListener(
    "change",
    () => {
      if (motion.matches) svgSelection.interrupt("viewport")
      updatePauseButton()
      updateActivity()
    },
    { signal: listeners.signal },
  )
  const visibility = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting
      updateActivity()
    },
    { rootMargin: "100px" },
  )
  visibility.observe(container)
  function resizeViewport() {
    const nextWidth = stage.clientWidth
    const nextHeight = stage.clientHeight
    if (!nextWidth || !nextHeight || (nextWidth === width && nextHeight === height)) return
    const focus = transform.invert([width / 2, height / 2])
    width = nextWidth
    height = nextHeight
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    svgSelection.interrupt("viewport").call(
      zoomBehavior.transform,
      zoomIdentity
        .translate(width / 2, height / 2)
        .scale(transform.k)
        .translate(-focus[0], -focus[1]),
    )
  }
  const resize = new ResizeObserver(resizeViewport)
  resize.observe(stage)
  simulation.on("tick", draw).on("end", () => {
    if (!disposed && !interacted) fit()
  })
  simulation.alpha(cached ? 0.2 : 0.5)
  updateActivity()
  return () => {
    disposed = true
    for (const node of nodes) view.positions.set(node.id, { x: node.x!, y: node.y! })
    simulation.stop().on("tick", null).on("end", null)
    svgSelection.interrupt("viewport").on(".zoom", null)
    zoomBehavior.on(".graph", null)
    nodeSelection.on(".drag", null)
    if (activeDrag || activePan) {
      select(window).on(".drag", null).on(".zoom", null)
      dragEnable(window)
    }
    if (touchGesture?.kind === "node") releaseNode(touchGesture.node)
    for (const [id, { capture }] of touchPointers) {
      if (capture.hasPointerCapture(id)) capture.releasePointerCapture(id)
    }
    touchPointers.clear()
    touchGesture = undefined
    listeners.abort()
    visibility.disconnect()
    resize.disconnect()
  }
}
