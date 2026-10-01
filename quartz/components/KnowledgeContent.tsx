import Content from "./pages/Content"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { getDate, Date } from "./Date"
import ReadingActions from "./ReadingActions"
// @ts-ignore: Quartz loads inline scripts as text resources.
import script from "./scripts/knowledgeDashboard.inline"

export default (() => {
  const Article = Content()
  const KnowledgeContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, allFiles } = props
    if (fileData.slug !== "index") return <Article {...props} />
    const hubs = allFiles
      .filter((page) => typeof page.frontmatter?.study_order === "number")
      .sort((a, b) => Number(a.frontmatter!.study_order) - Number(b.frontmatter!.study_order))
    const concepts = allFiles.filter((page) => page.frontmatter?.type === "concept").length
    const sources = allFiles.filter((page) => page.frontmatter?.type === "source").length
    const recentSources = allFiles
      .filter((page) => page.frontmatter?.type === "source")
      .sort(
        (a, b) => (getDate(props.cfg, b)?.getTime() ?? 0) - (getDate(props.cfg, a)?.getTime() ?? 0),
      )
      .slice(0, 6)
    return (
      <article class="learning-home">
        <div class="home-hero">
          <p class="eyebrow">NIUVERSE / 知识与实践</p>
          <h1>{String(fileData.frontmatter?.home_title ?? fileData.frontmatter?.title)}</h1>
          <p class="hero-description">{fileData.frontmatter?.description}</p>
          <p class="home-counts">
            {hubs.length} 个学习主题 <span>·</span> {concepts} 个概念 <span>·</span> {sources}{" "}
            份来源
          </p>
        </div>
        <h2 id="study-topics">从一个主题开始</h2>
        <p class="section-description">初次学习按路径前进，研究复习直接进入关键概念。</p>
        <div class="topic-grid">
          {hubs.map((hub, index) => (
            <a class="topic-card internal" href={resolveRelative(fileData.slug!, hub.slug!)}>
              <span class="topic-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{String(hub.frontmatter?.nav_title ?? hub.frontmatter?.title)}</h3>
              <p>{hub.frontmatter?.description}</p>
              <span class="topic-action">
                查看学习路径 <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
        <section class="knowledge-explorer" aria-labelledby="knowledge-explorer-title">
          <h2 id="knowledge-explorer-title" tabindex={-1}>
            探索知识与关联
          </h2>
          <p class="section-description">
            按主题查找页面，或沿双向引用探索。已读与收藏由你主动标记，仅保存在当前浏览器。
          </p>
          <div class="explorer-filters">
            <label>
              学习主题
              <select name="knowledge-topic">
                <option value="">全部主题</option>
                {hubs.map((hub) => (
                  <option value={hub.slug}>
                    {String(hub.frontmatter?.nav_title ?? hub.frontmatter?.title)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              页面类型
              <select name="knowledge-type">
                <option value="">全部类型</option>
                <option value="concept">概念讲解</option>
                <option value="source">来源档案</option>
                <option value="synthesis">学习与研究</option>
                <option value="entity">项目与工具</option>
              </select>
            </label>
            <label>
              阅读记录
              <select name="knowledge-reading">
                <option value="">全部页面</option>
                <option value="unread">尚未标记已读</option>
                <option value="read">已标记已读</option>
                <option value="favorite">我的收藏</option>
              </select>
            </label>
            <label class="explorer-keyword">
              查找标题或内容
              <input
                name="knowledge-query"
                type="search"
                placeholder="例如：接触、Dreamer、动作条件化"
              />
            </label>
          </div>
          <div class="explorer-view-switch" role="group" aria-label="探索视图">
            <button type="button" data-knowledge-view="list" aria-pressed="true">
              页面列表
            </button>
            <button type="button" data-knowledge-view="graph" aria-pressed="false">
              双向关系图
            </button>
          </div>
          <p class="explorer-progress" role="status" aria-live="polite"></p>
          <p class="reading-status" role="status" aria-live="polite"></p>
          <div class="explorer-list-view">
            <ul class="knowledge-results"></ul>
            <button type="button" class="explorer-more" hidden>
              显示更多页面
            </button>
          </div>
          <div class="explorer-graph-view" hidden>
            <p class="relation-help">
              筛选同时限定节点与引用。拖动节点调整位置，拖动空白平移；用滚轮或双指缩放，点击节点打开页面。箭头指向被引用页，悬停或键盘选中节点可突出双向邻居。
            </p>
            <div class="knowledge-graph" aria-label="筛选后的知识引用关系"></div>
            <p class="graph-legend">
              <span class="legend-concept">● 概念讲解</span>
              <span class="legend-source">● 来源档案</span>
              <span class="legend-synthesis">● 学习与研究</span>
              <span class="legend-entity">● 项目与工具</span>
            </p>
          </div>
          <noscript>探索筛选需要 JavaScript；仍可使用下方完整目录阅读全部页面。</noscript>
        </section>
        <section class="recent-research" aria-labelledby="recent-research-title">
          <h2 id="recent-research-title">最近审阅的研究来源</h2>
          <p class="section-description">
            按来源档案的审阅日期排序。经典资料与近期研究一起保留，论文发表日期请查看来源页。
          </p>
          <ul>
            {recentSources.map((page) => {
              const date = getDate(props.cfg, page)
              return (
                <li>
                  <a class="internal" href={resolveRelative(fileData.slug!, page.slug!)}>
                    {page.frontmatter?.title}
                  </a>
                  {date && <Date date={date} locale={props.cfg.locale} />}
                  <ReadingActions slug={page.slug!} />
                </li>
              )
            })}
          </ul>
        </section>
        <details id="all-pages" class="page-catalog">
          <summary>
            全部页面与来源<span>展开完整目录</span>
          </summary>
          <Article {...props} />
        </details>
      </article>
    )
  }
  KnowledgeContent.afterDOMLoaded = script
  return KnowledgeContent
}) satisfies QuartzComponentConstructor
