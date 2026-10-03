document.addEventListener("nav", () => {
  const library = document.querySelector<HTMLElement>(".paper-library")
  if (!library) return
  const filters = library.querySelector<HTMLElement>(".paper-filters")!
  const topic = filters.querySelector<HTMLSelectElement>('[name="paper-topic"]')!
  const year = filters.querySelector<HTMLSelectElement>('[name="paper-year"]')!
  const query = filters.querySelector<HTMLInputElement>('[name="paper-query"]')!
  const rows = [...library.querySelectorAll<HTMLElement>(".paper-list > li")]
  const status = library.querySelector<HTMLElement>(".paper-count")!
  const empty = library.querySelector<HTMLElement>(".paper-empty")!
  const apply = () => {
    const term = query.value.trim().toLocaleLowerCase()
    let count = 0
    for (const row of rows) {
      const topics: string[] = JSON.parse(row.dataset.paperTopics ?? "[]")
      row.hidden = Boolean(
        (topic.value && !topics.includes(topic.value)) ||
        (year.value && row.dataset.paperYear !== year.value) ||
        (term && !row.dataset.paperSearch?.includes(term)),
      )
      if (!row.hidden) count++
    }
    status.textContent = `${count} 篇论文`
    empty.hidden = count > 0
  }
  filters.hidden = false
  filters.addEventListener("input", apply)
  window.addCleanup(() => filters.removeEventListener("input", apply))
})
