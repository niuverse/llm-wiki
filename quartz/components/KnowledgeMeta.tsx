import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { pageKind, pageTopics } from "../util/research"
import ReadingActions from "./ReadingActions"
// @ts-ignore: Quartz loads inline scripts as text resources.
import script from "./scripts/readingActions.inline"

const KnowledgeMeta: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  if (
    fileData.slug === "index" ||
    ["navigation", "domain", "redirect"].includes(String(fileData.frontmatter?.type))
  )
    return null
  const fm = fileData.frontmatter
  const tags = fm?.tags ?? []
  const sources = Array.isArray(fm?.sources) ? fm.sources : []
  const evidence =
    fm?.type === "source"
      ? "原始来源已归档"
      : sources.length > 0
        ? "含来源支持 · 细节见正文"
        : tags.includes("source-plan")
          ? "资料计划 · 尚未收录"
          : "学习笔记 · 待来源验证"
  const memberships = allFiles.filter((page) => pageTopics(fileData).includes(page.slug!))
  const maps = memberships.filter((page) => page.frontmatter?.entry === "research")
  const topics = maps.length ? maps : memberships
  return (
    <div class="knowledge-meta">
      <span class="page-kind">{pageKind(fileData)}</span>
      <span class="evidence-label">{evidence}</span>
      {topics.map((topic) => (
        <a href={resolveRelative(fileData.slug!, topic.slug as FullSlug)}>
          {topic.frontmatter?.title}
        </a>
      ))}
      <ReadingActions slug={fileData.slug!} />
      <p class="reading-status" role="status" aria-live="polite"></p>
    </div>
  )
}

KnowledgeMeta.afterDOMLoaded = script

export default (() => KnowledgeMeta) satisfies QuartzComponentConstructor
