const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
let currentTheme = userPref
try {
  const saved = localStorage.getItem("theme")
  if (saved === "light" || saved === "dark") currentTheme = saved
} catch {
  // Theme switching still works when browser storage is unavailable.
}
document.documentElement.setAttribute("saved-theme", currentTheme)

const saveTheme = (theme: "light" | "dark") => {
  try {
    localStorage.setItem("theme", theme)
  } catch {
    // Keep the selected theme for this page even if it cannot be persisted.
  }
}

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const newTheme =
      document.documentElement.getAttribute("saved-theme") === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("saved-theme", newTheme)
    saveTheme(newTheme)
    emitThemeChangeEvent(newTheme)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    saveTheme(newTheme)
    emitThemeChangeEvent(newTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
