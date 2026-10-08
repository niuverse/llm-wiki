document.addEventListener("nav", () => {
  const dialog = document.querySelector<HTMLDialogElement>("dialog.image-viewer")
  if (!dialog) return
  const preview = dialog.querySelector("img")!
  const caption = dialog.querySelector("figcaption")!
  const original = dialog.querySelector<HTMLAnchorElement>(".image-original")!
  const outside = (event: MouseEvent) => {
    if (event.target === dialog) dialog.close()
  }
  dialog.addEventListener("click", outside)
  window.addCleanup(() => {
    dialog.close()
    dialog.removeEventListener("click", outside)
  })

  document.querySelectorAll<HTMLImageElement>(".center article img").forEach((image) => {
    if (image.closest("a, button")) return
    const paragraph = image.closest("p")
    const following = paragraph?.nextElementSibling?.textContent?.trim() ?? ""
    const figureCaption = following.startsWith("原文图") ? following : image.alt
    const button = document.createElement("button")
    button.type = "button"
    button.className = "image-expand"
    button.setAttribute("aria-label", `放大配图：${image.alt || "查看原图"}`)
    image.replaceWith(button)
    button.append(image)
    const show = () => {
      preview.src = image.currentSrc || image.src
      preview.alt = image.alt
      caption.textContent = figureCaption
      original.href = preview.src
      dialog.showModal()
    }
    button.addEventListener("click", show)
    window.addCleanup(() => {
      button.removeEventListener("click", show)
      button.replaceWith(image)
    })
  })
})
