import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"
import { test } from "node:test"
import { transformSync } from "esbuild"

const code = transformSync(
  readFileSync(new URL("./imageViewer.inline.ts", import.meta.url), "utf8"),
  { loader: "ts" },
).code

test("image viewer preserves captions and links, and removes handlers on navigation", () => {
  const cleanups: (() => void)[] = []
  const handlers = new Map<string, (event?: unknown) => void>()
  const attributes = new Map<string, string>()
  const preview = { src: "", alt: "" }
  const caption = { textContent: "" }
  const original = { href: "" }
  let opened = false,
    wrapped = false,
    restored = false,
    onNav = () => {}
  const dialog = {
    querySelector: (selector: string) =>
      selector === "img" ? preview : selector === "figcaption" ? caption : original,
    addEventListener: (name: string, fn: (event?: unknown) => void) =>
      handlers.set("dialog:" + name, fn),
    removeEventListener: (name: string) => handlers.delete("dialog:" + name),
    showModal: () => {
      opened = true
    },
    close: () => {
      opened = false
    },
  }
  const button = {
    type: "",
    className: "",
    setAttribute: (key: string, value: string) => attributes.set(key, value),
    append: () => {},
    replaceWith: () => {
      restored = true
    },
    addEventListener: (name: string, fn: () => void) => handlers.set("button:" + name, fn),
    removeEventListener: (name: string) => handlers.delete("button:" + name),
  }
  const image = {
    src: "/figures/figure.webp",
    currentSrc: "/figures/figure.webp",
    alt: "原文图 2",
    closest: (selector: string) =>
      selector === "p"
        ? { nextElementSibling: { textContent: "原文图 2；PDF 第 3 页。来源" } }
        : null,
    replaceWith: () => {
      wrapped = true
    },
  }
  const linkedImage = {
    closest: () => ({}),
    replaceWith: () => assert.fail("Existing image links must remain usable"),
  }
  runInNewContext(code, {
    document: {
      addEventListener: (_: string, fn: () => void) => {
        onNav = fn
      },
      querySelector: () => dialog,
      querySelectorAll: () => [image, linkedImage],
      createElement: () => button,
    },
    window: { addCleanup: (fn: () => void) => cleanups.push(fn) },
  })
  onNav()
  assert.equal(wrapped, true)
  assert.equal(button.type, "button")
  assert.match(attributes.get("aria-label")!, /原文图 2/)
  handlers.get("button:click")!()
  assert.equal(opened, true)
  assert.equal(preview.src, image.src)
  assert.equal(caption.textContent, "原文图 2；PDF 第 3 页。来源")
  assert.equal(original.href, image.src)
  handlers.get("dialog:click")!({ target: preview })
  assert.equal(opened, true)
  handlers.get("dialog:click")!({ target: dialog })
  assert.equal(opened, false)
  handlers.get("button:click")!()
  cleanups.forEach((fn) => fn())
  assert.equal(opened, false)
  assert.equal(restored, true)
  assert.equal(handlers.size, 0)
})
