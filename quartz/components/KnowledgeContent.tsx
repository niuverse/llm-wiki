import Content from "./pages/Content"
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { pageTopics } from "../util/research"
import ReadingActions from "./ReadingActions"
// @ts-ignore: Quartz loads inline scripts as text resources.
import paperScript from "./scripts/paperLibrary.inline"

export default (() => {
  const Article = Content()
  const KnowledgeContent: QuartzComponent = (props) => {
    const { fileData, allFiles } = props
    const link = (slug: string) => resolveRelative(fileData.slug!, slug as FullSlug)
    const topics = allFiles.filter((p) => p.frontmatter?.type === "topic")
    if (fileData.slug === "papers") {
      const papers = allFiles
        .filter((p) => p.frontmatter?.source_type === "paper")
        .sort(
          (a, b) =>
            Number(b.frontmatter?.year ?? 0) - Number(a.frontmatter?.year ?? 0) ||
            a.slug!.localeCompare(b.slug!),
        )
      const years = [...new Set(papers.map((p) => String(p.frontmatter?.year ?? "unknown")))]
        .sort()
        .reverse()
      return (
        <article class="paper-library">
          <p>{fileData.frontmatter?.description}</p>
          <div class="paper-filters" hidden>
            <label>
              研究专题
              <select name="paper-topic">
                <option value="">全部专题</option>
                {topics.map((p) => (
                  <option value={p.slug}>{p.frontmatter?.title}</option>
                ))}
              </select>
            </label>
            <label>
              发表年份
              <select name="paper-year">
                <option value="">全部年份</option>
                {years.map((year) => (
                  <option value={year}>{year === "unknown" ? "未核实" : year}</option>
                ))}
              </select>
            </label>
            <label>
              标题或关键词
              <input type="search" name="paper-query" placeholder="例如：Dreamer、碰撞、动力学" />
            </label>
          </div>
          <p class="paper-count" role="status" aria-live="polite">
            {papers.length} 篇论文
          </p>
          <p class="reading-status" role="status" aria-live="polite"></p>
          <ul class="paper-list">
            {papers.map((p) => (
              <li
                data-paper-topics={JSON.stringify(pageTopics(p))}
                data-paper-year={String(p.frontmatter?.year ?? "unknown")}
                data-paper-search={`${p.frontmatter?.title} ${p.frontmatter?.paper_title ?? ""} ${p.frontmatter?.description ?? ""} ${p.frontmatter?.tags?.join(" ") ?? ""} ${pageTopics(
                  p,
                )
                  .map((slug) => topics.find((t) => t.slug === slug)?.frontmatter?.title ?? "")
                  .join(" ")}`.toLocaleLowerCase()}
              >
                <a class="internal" href={link(p.slug!)}>
                  {p.frontmatter?.title}
                </a>
                <p class="paper-bibliography">
                  {String(p.frontmatter?.year ?? "年份未核实")} ·{" "}
                  {String(p.frontmatter?.venue ?? "发表信息见正文")}
                </p>
                <div class="paper-topics">
                  {pageTopics(p).map((slug) => {
                    const topic = topics.find((t) => t.slug === slug)
                    return (
                      topic && (
                        <a class="internal" href={link(slug)}>
                          {topic.frontmatter?.title}
                        </a>
                      )
                    )
                  })}
                </div>
                <ReadingActions slug={p.slug!} />
              </li>
            ))}
          </ul>
          <p class="paper-empty" hidden>
            没有符合条件的论文，请调整筛选。
          </p>
        </article>
      )
    }
    return <Article {...props} />
  }
  KnowledgeContent.afterDOMLoaded = paperScript
  return KnowledgeContent
}) satisfies QuartzComponentConstructor
