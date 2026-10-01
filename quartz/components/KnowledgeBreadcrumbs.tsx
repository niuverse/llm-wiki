import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

const KnowledgeBreadcrumbs: QuartzComponent = ({ fileData, allFiles }) => {
  const hub = allFiles.find((page) => page.slug === fileData.frontmatter?.study_topic)
  return (
    <nav class="breadcrumb-container" aria-label="当前位置">
      <div class="breadcrumb-element">
        <a href={resolveRelative(fileData.slug!, "index" as FullSlug)}>学习首页</a>
      </div>
      {hub && hub.slug !== fileData.slug && (
        <div class="breadcrumb-element">
          <p aria-hidden="true">›</p>
          <a href={resolveRelative(fileData.slug!, hub.slug as FullSlug)}>
            {String(hub.frontmatter?.nav_title ?? hub.frontmatter?.title)}
          </a>
        </div>
      )}
    </nav>
  )
}

export default (() => KnowledgeBreadcrumbs) satisfies QuartzComponentConstructor
