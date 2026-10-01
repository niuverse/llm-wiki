import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  SimulationNodeDatum,
} from "d3"
import { FullSlug, SimpleSlug, getFullSlug, resolveRelative, simplifySlug } from "../../util/path"

type ReadingState = { read: string[]; favorites: string[] }
type GraphNode = SimulationNodeDatum & { id: string; page: ContentDetails }
type GraphEdge = { source: string | GraphNode; target: string | GraphNode }
const storageKey = "llm-wiki:reading:v1"
const kinds: Record<string, string> = {
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
let reading: ReadingState = { read: [], favorites: [] }
let storageNotice = ""

function readState() {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return
    const value = JSON.parse(saved)
    if (!value || !Array.isArray(value.read) || !Array.isArray(value.favorites))
      throw new Error("invalid reading state")
    reading = {
      read: [...new Set<string>(value.read.filter((s: unknown) => typeof s === "string"))],
      favorites: [
        ...new Set<string>(value.favorites.filter((s: unknown) => typeof s === "string")),
      ],
    }
    storageNotice = ""
  } catch {
    storageNotice = "无法读取浏览器记录，本次浏览仍可标记；记录可能无法长期保存。"
  }
}
readState()

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(reading))
    storageNotice = ""
  } catch {
    storageNotice = "浏览器未能保存记录，本次浏览仍有效，刷新后可能丢失。"
  }
}

function updateReadingUI() {
  for (const group of document.querySelectorAll<HTMLElement>(".reading-actions")) {
    const slug = group.dataset.readingSlug!
    const read = reading.read.includes(slug)
    const favorite = reading.favorites.includes(slug)
    const readButton = group.querySelector<HTMLButtonElement>('[data-reading-action="read"]')
    const favoriteButton = group.querySelector<HTMLButtonElement>(
      '[data-reading-action="favorite"]',
    )
    if (readButton) {
      readButton.textContent = read ? "已读 · 撤销" : "标记已读"
      readButton.setAttribute("aria-pressed", String(read))
    }
    if (favoriteButton) {
      favoriteButton.textContent = favorite ? "已收藏 · 取消" : "收藏"
      favoriteButton.setAttribute("aria-pressed", String(favorite))
    }
  }
  for (const status of document.querySelectorAll<HTMLElement>(".reading-status"))
    status.textContent = storageNotice
}

function readingActions(slug: string) {
  const group = document.createElement("div")
  group.className = "reading-actions"
  group.dataset.readingSlug = slug
  for (const [action, label] of [
    ["read", "标记已读"],
    ["favorite", "收藏"],
  ]) {
    const button = document.createElement("button")
    button.type = "button"
    button.dataset.readingAction = action
    button.textContent = label
    button.setAttribute("aria-pressed", "false")
    group.append(button)
  }
  return group
}

function pageLink(slug: string, page: ContentDetails) {
  const link = document.createElement("a")
  link.href = resolveRelative(getFullSlug(window), slug as FullSlug)
  link.className = "internal"
  link.textContent = page.title
  return link
}

const svgNS = "http://www.w3.org/2000/svg"
function svgElement<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>) {
  const el = document.createElementNS(svgNS, tag)
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
  return el
}

function renderGraph(
  container: HTMLElement,
  pages: Map<string, ContentDetails>,
  centerSlug?: string,
) {
  container.replaceChildren()
  const nodes: GraphNode[] = [...pages].map(([id, page]) => ({ id, page }))
  if (nodes.length === 0) {
    const empty = document.createElement("p")
    empty.textContent = "没有符合筛选的页面，请调整主题、类型或阅读记录。"
    container.append(empty)
    return () => {}
  }
  const edges: GraphEdge[] = []
  for (const [source, page] of pages) {
    for (const target of page.links ?? []) {
      if (source !== target && pages.has(target)) edges.push({ source, target })
    }
  }
  const width = Math.max(520, Math.min(960, container.clientWidth || 960))
  const height = nodes.length < 25 ? 460 : 620
  const simulation = forceSimulation(nodes)
    .force(
      "link",
      forceLink<GraphNode, GraphEdge>(edges)
        .id((n) => n.id)
        .distance(nodes.length < 25 ? 105 : 70)
        .strength(0.12),
    )
    .force("charge", forceManyBody().strength(-170))
    .force("center", forceCenter(width / 2, height / 2))
    .force("collide", forceCollide<GraphNode>(25))
    .stop()
  const center = nodes.find((n) => n.id === centerSlug)
  if (center) {
    center.fx = width / 2
    center.fy = height / 2
  }
  simulation.tick(160)
  // Fit deterministic layout to the viewport; zoom is a separate display transform.
  const xmin = Math.min(...nodes.map((n) => n.x ?? 0))
  const xmax = Math.max(...nodes.map((n) => n.x ?? 0))
  const ymin = Math.min(...nodes.map((n) => n.y ?? 0))
  const ymax = Math.max(...nodes.map((n) => n.y ?? 0))
  const fit = Math.min(
    (width - 140) / Math.max(xmax - xmin, 1),
    (height - 110) / Math.max(ymax - ymin, 1),
    1.4,
  )
  for (const node of nodes) {
    node.x = (node.x! - (xmin + xmax) / 2) * fit + width / 2
    node.y = (node.y! - (ymin + ymax) / 2) * fit + height / 2
  }
  const toolbar = document.createElement("div")
  toolbar.className = "graph-toolbar"
  const description = document.createElement("p")
  description.textContent = `${nodes.length} 个页面 · ${edges.length} 条引用`
  toolbar.append(description)
  const svg = svgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "group",
    "aria-label": "知识引用图，节点链接可通过 Tab 键选择",
    class: `relation-svg${nodes.length <= 25 ? " compact" : ""}`,
  })
  const defs = svgElement("defs", {})
  const markerId = `relation-arrow-${container.closest(".knowledge-explorer") ? "global" : "local"}`
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
  svg.append(defs)
  const scene = svgElement("g", {})
  svg.append(scene)
  const edgeElements: { el: SVGLineElement; source: string; target: string }[] = []
  for (const edge of edges) {
    const source = edge.source as GraphNode
    const target = edge.target as GraphNode
    const dx = target.x! - source.x!,
      dy = target.y! - source.y!
    const length = Math.hypot(dx, dy) || 1
    const line = svgElement("line", {
      x1: String(source.x! + (dx / length) * 8),
      y1: String(source.y! + (dy / length) * 8),
      x2: String(target.x! - (dx / length) * 12),
      y2: String(target.y! - (dy / length) * 12),
      class: "relation-edge",
      "marker-end": `url(#${markerId})`,
    })
    scene.append(line)
    edgeElements.push({ el: line, source: source.id, target: target.id })
  }
  const nodeElements: { el: SVGAElement; id: string }[] = []
  const highlight = (id?: string) => {
    const neighbors = new Set(id ? [id] : [])
    if (id)
      for (const edge of edgeElements) {
        if (edge.source === id) neighbors.add(edge.target)
        if (edge.target === id) neighbors.add(edge.source)
      }
    for (const node of nodeElements) {
      node.el.classList.toggle("dimmed", Boolean(id) && !neighbors.has(node.id))
      node.el.classList.toggle("related", neighbors.has(node.id))
    }
    for (const edge of edgeElements) {
      edge.el.classList.toggle("dimmed", Boolean(id) && edge.source !== id && edge.target !== id)
      edge.el.classList.toggle("related", Boolean(id) && (edge.source === id || edge.target === id))
    }
  }
  for (const node of nodes) {
    const link = svgElement("a", {
      href: resolveRelative(getFullSlug(window), node.id as FullSlug),
      tabindex: "0",
      "aria-label": `${node.page.title}，${kinds[node.page.type ?? ""] ?? "知识页"}`,
      class: `relation-node${node.id === centerSlug ? " current" : ""}`,
      transform: `translate(${node.x},${node.y})`,
    })
    const title = svgElement("title", {})
    title.textContent = node.page.title
    const hit = svgElement("circle", {
      r: width <= 600 ? "33" : "22",
      class: "relation-hit",
      fill: "transparent",
    })
    const dot = svgElement("circle", {
      r: node.id === centerSlug ? "10" : "7",
      fill: colors[node.page.type ?? ""] ?? "#7e8d98",
      class: "relation-dot",
    })
    const label = svgElement("text", {
      x: node.x! > width / 2 ? "-11" : "11",
      y: "4",
      "text-anchor": node.x! > width / 2 ? "end" : "start",
    })
    label.textContent =
      node.page.title.length > 22 ? `${node.page.title.slice(0, 22)}…` : node.page.title
    link.append(title, hit, dot, label)
    link.addEventListener("mouseenter", () => highlight(node.id))
    link.addEventListener("mouseleave", () => highlight())
    link.addEventListener("focus", () => highlight(node.id))
    link.addEventListener("blur", () => highlight())
    scene.append(link)
    nodeElements.push({ el: link, id: node.id })
  }
  let scale = 1,
    panX = 0,
    panY = 0
  const updateTransform = () =>
    scene.setAttribute(
      "transform",
      `translate(${width / 2 + panX},${height / 2 + panY}) scale(${scale}) translate(${-width / 2},${-height / 2})`,
    )
  for (const [label, change] of [
    ["放大", 1],
    ["缩小", -1],
    ["复位", 0],
  ] as const) {
    const button = document.createElement("button")
    button.type = "button"
    button.textContent = label
    button.addEventListener("click", () => {
      if (change === 0) {
        scale = 1
        panX = 0
        panY = 0
      } else scale = Math.max(0.6, Math.min(4, scale * (change > 0 ? 1.3 : 1 / 1.3)))
      updateTransform()
    })
    toolbar.append(button)
  }
  let dragging: { x: number; y: number; panX: number; panY: number } | undefined
  const pointerDown = (event: PointerEvent) => {
    if ((event.target as Element).closest("a")) return
    dragging = { x: event.clientX, y: event.clientY, panX, panY }
    svg.setPointerCapture(event.pointerId)
  }
  const pointerMove = (event: PointerEvent) => {
    if (!dragging) return
    const bounds = svg.getBoundingClientRect()
    panX = dragging.panX + ((event.clientX - dragging.x) * width) / Math.max(bounds.width, 1)
    panY = dragging.panY + ((event.clientY - dragging.y) * height) / Math.max(bounds.height, 1)
    updateTransform()
  }
  const pointerEnd = () => {
    dragging = undefined
  }
  svg.addEventListener("pointerdown", pointerDown)
  svg.addEventListener("pointermove", pointerMove)
  svg.addEventListener("pointerup", pointerEnd)
  svg.addEventListener("pointercancel", pointerEnd)
  container.append(toolbar, svg)
  return () => simulation.stop()
}

function isKnowledgePage(slug: string, page: ContentDetails) {
  return slug !== "/" && slug !== "index" && slug !== "log" && Boolean(kinds[page.type ?? ""])
}

document.addEventListener("nav", async () => {
  const explorer = document.querySelector<HTMLElement>(".knowledge-explorer")
  const relationPanels = [...document.querySelectorAll<HTMLElement>(".knowledge-relations")]
  let disposed = false
  let graphCleanup = () => {}
  let redrawExplorer = () => {}
  let localCleanups: (() => void)[] = []
  const cleanups: (() => void)[] = []
  window.addCleanup(() => {
    disposed = true
    graphCleanup()
    localCleanups.forEach((fn) => fn())
    cleanups.forEach((fn) => fn())
  })

  const onReadingClick = (event: MouseEvent) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>(
      "button[data-reading-action]",
    )
    const group = button?.closest<HTMLElement>(".reading-actions")
    const slug = group?.dataset.readingSlug
    if (!button || !slug) return
    const action = button.dataset.readingAction === "read" ? "read" : "favorites"
    const values = new Set(reading[action])
    values.has(slug) ? values.delete(slug) : values.add(slug)
    reading[action] = [...values]
    saveState()
    redrawExplorer()
    updateReadingUI()
  }
  document.addEventListener("click", onReadingClick)
  cleanups.push(() => document.removeEventListener("click", onReadingClick))
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return
    reading = { read: [], favorites: [] }
    readState()
    redrawExplorer()
    updateReadingUI()
  }
  window.addEventListener("storage", onStorage)
  cleanups.push(() => window.removeEventListener("storage", onStorage))
  updateReadingUI()

  for (const video of document.querySelectorAll<HTMLVideoElement>("article video")) {
    video.controls = true
    video.preload = "metadata"
    video.playsInline = true
  }
  for (const frame of document.querySelectorAll<HTMLIFrameElement>("article iframe")) {
    if (!frame.title)
      frame.title = frame.classList.contains("pdf") ? "嵌入的来源文档" : "嵌入的视频或演示"
    frame.loading = "lazy"
  }
  let data: Map<string, ContentDetails>
  try {
    const raw = await fetchData
    data = new Map(
      Object.entries<ContentDetails>(raw).map(([slug, page]) => [
        simplifySlug(slug as FullSlug),
        page,
      ]),
    )
  } catch {
    if (explorer && !disposed)
      explorer.querySelector<HTMLElement>(".explorer-progress")!.textContent =
        "索引暂时无法读取，请使用下方完整目录。"
    return
  }
  if (disposed) return

  const redrawLocal = () => {
    localCleanups.forEach((fn) => fn())
    localCleanups = []
    for (const panel of relationPanels) {
      const slug = panel.dataset.relationSlug!
      const neighbors = new Map<string, ContentDetails>()
      const current = data.get(slug)
      if (current) neighbors.set(slug, current)
      const incoming: [string, ContentDetails][] = [],
        outgoing: [string, ContentDetails][] = []
      for (const [id, page] of data) {
        if (!isKnowledgePage(id, page) || id === slug) continue
        if (current?.links?.includes(id as SimpleSlug)) {
          outgoing.push([id, page])
          neighbors.set(id, page)
        }
        if (page.links?.includes(slug as SimpleSlug)) {
          incoming.push([id, page])
          neighbors.set(id, page)
        }
      }
      const text = panel.querySelector<HTMLElement>(".relation-links")!
      text.replaceChildren()
      for (const [label, rows] of [
        ["本页引用", outgoing],
        ["引用本页", incoming],
      ] as const) {
        const heading = document.createElement("h3")
        heading.textContent = `${label}（${rows.length}）`
        const list = document.createElement("ul")
        for (const [id, page] of rows) {
          const item = document.createElement("li")
          item.append(pageLink(id, page))
          list.append(item)
        }
        if (rows.length === 0) {
          const item = document.createElement("li")
          item.textContent = "暂无"
          list.append(item)
        }
        text.append(heading, list)
      }
      if ((panel as HTMLDetailsElement).open)
        localCleanups.push(
          renderGraph(panel.querySelector<HTMLElement>(".knowledge-graph")!, neighbors, slug),
        )
    }
  }
  for (const panel of relationPanels) {
    panel.addEventListener("toggle", redrawLocal)
    cleanups.push(() => panel.removeEventListener("toggle", redrawLocal))
  }
  redrawLocal()

  if (explorer) {
    const topic = explorer.querySelector<HTMLSelectElement>('[name="knowledge-topic"]')!
    const type = explorer.querySelector<HTMLSelectElement>('[name="knowledge-type"]')!
    const scope = explorer.querySelector<HTMLSelectElement>('[name="knowledge-reading"]')!
    const query = explorer.querySelector<HTMLInputElement>('[name="knowledge-query"]')!
    const list = explorer.querySelector<HTMLUListElement>(".knowledge-results")!
    const more = explorer.querySelector<HTMLButtonElement>(".explorer-more")!
    const listView = explorer.querySelector<HTMLElement>(".explorer-list-view")!
    const graphView = explorer.querySelector<HTMLElement>(".explorer-graph-view")!
    let view = "list",
      limit = 12
    redrawExplorer = () => {
      const active = document.activeElement as HTMLElement | null
      const activeSlug = active?.closest<HTMLElement>(".reading-actions")?.dataset.readingSlug
      const activeAction = active?.dataset.readingAction
      const activeInExplorer = Boolean(active && explorer.contains(active))
      const term = query.value.trim().toLocaleLowerCase()
      const matches = [...data]
        .filter(
          ([slug, page]) =>
            isKnowledgePage(slug, page) &&
            (!topic.value || page.studyTopic === topic.value || slug === topic.value) &&
            (!type.value || page.type === type.value) &&
            (!term ||
              `${page.title} ${page.description ?? ""} ${page.content}`
                .toLocaleLowerCase()
                .includes(term)) &&
            (!scope.value ||
              (scope.value === "favorite"
                ? reading.favorites.includes(slug)
                : scope.value === "read"
                  ? reading.read.includes(slug)
                  : !reading.read.includes(slug))),
        )
        .sort(
          ([a, pa], [b, pb]) =>
            new Date(pb.date ?? 0).getTime() - new Date(pa.date ?? 0).getTime() ||
            a.localeCompare(b),
        )
      const readCount = matches.filter(([slug]) => reading.read.includes(slug)).length
      explorer.querySelector<HTMLElement>(".explorer-progress")!.textContent =
        `${matches.length} 个符合筛选的页面 · ${readCount} 个已标记已读`
      listView.hidden = view !== "list"
      graphView.hidden = view !== "graph"
      graphCleanup()
      graphCleanup = () => {}
      if (view === "graph")
        graphCleanup = renderGraph(
          graphView.querySelector<HTMLElement>(".knowledge-graph")!,
          new Map(matches),
        )
      list.replaceChildren()
      for (const [slug, page] of matches.slice(0, limit)) {
        const item = document.createElement("li")
        const body = document.createElement("div")
        body.className = "knowledge-result-copy"
        body.append(pageLink(slug, page))
        const meta = document.createElement("p")
        meta.className = "knowledge-result-meta"
        meta.textContent = `${kinds[page.type ?? ""]} · ${page.evidence ?? "证据见正文"}`
        body.append(meta)
        item.append(body, readingActions(slug))
        list.append(item)
      }
      if (matches.length === 0) {
        const empty = document.createElement("li")
        empty.textContent = "没有符合筛选的页面，请调整条件。"
        list.append(empty)
      }
      more.hidden = matches.length <= limit
      more.textContent = `显示更多页面（还剩 ${Math.max(matches.length - limit, 0)}）`
      updateReadingUI()
      if (activeSlug && activeAction && activeInExplorer) {
        const replacement = list.querySelector<HTMLButtonElement>(
          `[data-reading-slug="${CSS.escape(activeSlug)}"] [data-reading-action="${CSS.escape(activeAction)}"]`,
        )
        ;(replacement ?? explorer.querySelector<HTMLElement>("h2")!).focus({ preventScroll: true })
      }
    }
    const onFilter = () => {
      limit = 12
      redrawExplorer()
    }
    for (const input of [topic, type, scope, query]) {
      input.addEventListener(input === query ? "input" : "change", onFilter)
      cleanups.push(() => input.removeEventListener(input === query ? "input" : "change", onFilter))
    }
    const onMore = () => {
      limit += 24
      redrawExplorer()
    }
    more.addEventListener("click", onMore)
    cleanups.push(() => more.removeEventListener("click", onMore))
    for (const button of explorer.querySelectorAll<HTMLButtonElement>("[data-knowledge-view]")) {
      const onView = () => {
        view = button.dataset.knowledgeView!
        for (const option of explorer.querySelectorAll<HTMLButtonElement>("[data-knowledge-view]"))
          option.setAttribute("aria-pressed", String(option === button))
        redrawExplorer()
      }
      button.addEventListener("click", onView)
      cleanups.push(() => button.removeEventListener("click", onView))
    }
    redrawExplorer()
  }
})
