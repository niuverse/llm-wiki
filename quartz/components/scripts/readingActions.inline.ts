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

document.addEventListener("nav", async () => {
  const cleanups: (() => void)[] = []
  window.addCleanup(() => cleanups.forEach((fn) => fn()))

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
    updateReadingUI()
  }
  document.addEventListener("click", onReadingClick)
  cleanups.push(() => document.removeEventListener("click", onReadingClick))
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return
    reading = { read: [], favorites: [] }
    readState()
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
})
