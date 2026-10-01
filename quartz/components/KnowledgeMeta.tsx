import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import ReadingActions from "./ReadingActions"
// @ts-ignore: Quartz loads inline scripts as text resources.
import script from "./scripts/knowledgeDashboard.inline"

const kinds: Record<string, string> = {
  concept: "概念讲解",
  source: "来源档案",
  entity: "项目与工具",
  synthesis: "学习与研究",
}

const KnowledgeMeta: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  if (fileData.slug === "index") return null
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
  const hub = allFiles.find((page) => page.slug === fm?.study_topic)
  return (
    <div class="knowledge-meta">
      <span class="page-kind">{kinds[String(fm?.type)] ?? "知识页"}</span>
      <span class="evidence-label">{evidence}</span>
      {hub && (
        <a href={resolveRelative(fileData.slug!, hub.slug as FullSlug)}>
          {String(hub.frontmatter?.nav_title ?? hub.frontmatter?.title)} ↗
        </a>
      )}
      <ReadingActions slug={fileData.slug!} />
      <p class="reading-status" role="status" aria-live="polite"></p>
    </div>
  )
}

KnowledgeMeta.afterDOMLoaded = script

export default (() => KnowledgeMeta) satisfies QuartzComponentConstructor
