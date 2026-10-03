import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import Backlinks from "./Backlinks"

export default (() => {
  const Incoming = Backlinks({ hideWhenEmpty: false })
  const Relations: QuartzComponent = (props) => {
    const { fileData, allFiles } = props
    const knowledgeTypes = ["source", "concept", "synthesis", "entity", "topic"]
    if (!knowledgeTypes.includes(String(fileData.frontmatter?.type))) return null
    const pages = allFiles.filter((p) => knowledgeTypes.includes(String(p.frontmatter?.type)))
    const outgoing = pages.filter(
      (p) => p.slug !== fileData.slug && fileData.links?.includes(simplifySlug(p.slug!)),
    )
    return (
      <section class="knowledge-relations" aria-label="双向链接">
        <div class="outgoing-links">
          <h3>本页引用</h3>
          <ul>
            {outgoing.length ? (
              outgoing.map((p) => (
                <li>
                  <a class="internal" href={resolveRelative(fileData.slug!, p.slug!)}>
                    {p.frontmatter?.title}
                  </a>
                </li>
              ))
            ) : (
              <li>暂无知识链接</li>
            )}
          </ul>
        </div>
        <Incoming {...props} allFiles={pages} />
      </section>
    )
  }
  Relations.css = Incoming.css
  Relations.afterDOMLoaded = Incoming.afterDOMLoaded
  return Relations
}) satisfies QuartzComponentConstructor
