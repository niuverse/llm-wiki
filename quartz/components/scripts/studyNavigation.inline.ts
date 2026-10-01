document.addEventListener("nav", () => {
  const details = document.querySelector<HTMLDetailsElement>(".study-navigation details")
  if (!details) return
  const mobile = window.matchMedia("(max-width: 800px)")
  const update = () => {
    details.open = !mobile.matches
  }
  update()
  mobile.addEventListener("change", update)
  window.addCleanup(() => mobile.removeEventListener("change", update))

  const openCatalog = () => {
    const catalog = document.querySelector<HTMLDetailsElement>("#all-pages")
    if (catalog) catalog.open = true
  }
  if (location.hash === "#all-pages") openCatalog()
  const onCatalogClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]")
    if (!link) return
    const url = new URL(link.getAttribute("href")!, document.baseURI)
    if (url.pathname === location.pathname && url.hash === "#all-pages") openCatalog()
  }
  document.addEventListener("click", onCatalogClick)
  window.addCleanup(() => document.removeEventListener("click", onCatalogClick))
})
