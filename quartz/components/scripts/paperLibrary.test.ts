import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"
import { test } from "node:test"
import { transformSync } from "esbuild"

const code = transformSync(
  readFileSync(new URL("./paperLibrary.inline.ts", import.meta.url), "utf8"),
  { loader: "ts" },
).code

function libraryFixture() {
  const topic = { value: "" },
    year = { value: "" },
    query = { value: "" }
  const rows = [
    {
      dataset: {
        paperTopics: '["topics/planning", "topics/evaluation"]',
        paperYear: "2025",
        paperSearch: "dino-wm 视觉目标规划",
      },
      hidden: false,
    },
    {
      dataset: {
        paperTopics: '["topics/planning"]',
        paperYear: "2019",
        paperSearch: "planet 从像素学习潜在动力学",
      },
      hidden: false,
    },
    {
      dataset: {
        paperTopics: '["topics/evaluation"]',
        paperYear: "2026",
        paperSearch: "worldecho 动作遵循",
      },
      hidden: false,
    },
  ]
  const status = { textContent: "3 篇论文" },
    empty = { hidden: true }
  let onInput: (() => void) | undefined
  const filters = {
    hidden: true,
    querySelector: (name: string) =>
      name.includes("topic") ? topic : name.includes("year") ? year : query,
    addEventListener: (_: string, fn: () => void) => {
      onInput = fn
    },
    removeEventListener: (_: string, fn: () => void) => {
      if (onInput === fn) onInput = undefined
    },
  }
  const library = {
    querySelector: (name: string) =>
      name === ".paper-filters" ? filters : name === ".paper-count" ? status : empty,
    querySelectorAll: () => rows,
  }
  let onNav: () => void = () => {},
    cleanup: () => void = () => {}
  runInNewContext(code, {
    document: {
      querySelector: () => library,
      addEventListener: (_: string, fn: () => void) => {
        onNav = fn
      },
    },
    window: {
      addCleanup: (fn: () => void) => {
        cleanup = fn
      },
    },
  })
  onNav()
  return {
    topic,
    year,
    query,
    rows,
    status,
    empty,
    filters,
    input: () => onInput?.(),
    cleanup: () => cleanup(),
  }
}

test("paper appears under each of its research topics", () => {
  const f = libraryFixture()
  f.topic.value = "topics/evaluation"
  f.input()
  assert.deepEqual(
    f.rows.map((r) => r.hidden),
    [false, true, false],
  )
  assert.equal(f.status.textContent, "2 篇论文")
})

test("topic, year and normalized title query combine; clearing restores the list", () => {
  const f = libraryFixture()
  f.topic.value = "topics/planning"
  f.year.value = "2025"
  f.query.value = "  DINO-WM  "
  f.input()
  assert.deepEqual(
    f.rows.map((r) => r.hidden),
    [false, true, true],
  )
  f.query.value = "不存在的论文"
  f.input()
  assert.equal(f.status.textContent, "0 篇论文")
  assert.equal(f.empty.hidden, false)
  f.query.value = f.year.value = f.topic.value = ""
  f.input()
  assert.equal(
    f.rows.every((r) => !r.hidden),
    true,
  )
  assert.equal(f.empty.hidden, true)
})

test("Chinese keyword search and SPA teardown", () => {
  const f = libraryFixture()
  assert.equal(f.filters.hidden, false)
  f.query.value = "动作"
  f.input()
  assert.deepEqual(
    f.rows.map((r) => r.hidden),
    [true, true, false],
  )
  f.cleanup()
  f.query.value = "planet"
  f.input()
  assert.deepEqual(
    f.rows.map((r) => r.hidden),
    [true, true, false],
  )
})
