import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import { renderGraph, knowledgeKinds as kinds } from "./knowledgeGraph"
import { FullSlug, SimpleSlug, getFullSlug, resolveRelative, simplifySlug } from "../../util/path"

type ReadingState = { read: string[]; favorites: string[] }
const storageKey = "llm-wiki:reading:v1"
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
    let filterTimer: ReturnType<typeof setTimeout> | undefined
    cleanups.push(() => clearTimeout(filterTimer))
    redrawExplorer = () => {
      clearTimeout(filterTimer)
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
    for (const input of [topic, type, scope]) {
      input.addEventListener("change", onFilter)
      cleanups.push(() => input.removeEventListener("change", onFilter))
    }
    const onQuery = () => {
      clearTimeout(filterTimer)
      filterTimer = setTimeout(onFilter, 160)
    }
    query.addEventListener("input", onQuery)
    cleanups.push(() => query.removeEventListener("input", onQuery))
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
