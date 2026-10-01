import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore: Quartz loads inline scripts as text resources.
import script from "./scripts/studyNavigation.inline"

const StudyNavigation: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const hubs = allFiles
    .filter((page) => typeof page.frontmatter?.study_order === "number")
    .sort((a, b) => Number(a.frontmatter!.study_order) - Number(b.frontmatter!.study_order))
  const topic = fileData.frontmatter?.study_topic
  const link = (slug: string) => resolveRelative(fileData.slug!, slug as FullSlug)
  return (
    <nav class="study-navigation" aria-label="知识库导航">
      <details open>
        <summary>主题与学习路径</summary>
        <div class="study-navigation-content">
          <p class="nav-label">学习主题</p>
          <a href={link("index")} aria-current={fileData.slug === "index" ? "page" : undefined}>
            <span class="nav-symbol" aria-hidden="true">
              ⌂
            </span>
            学习首页
          </a>
          {hubs.map((hub, index) => (
            <a
              href={link(hub.slug!)}
              class={topic === hub.slug || fileData.slug === hub.slug ? "active-topic" : ""}
              aria-current={fileData.slug === hub.slug ? "page" : undefined}
            >
              <span class="nav-symbol" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {String(hub.frontmatter?.nav_title ?? hub.frontmatter?.title)}
            </a>
          ))}
          <p class="nav-label">研究与查阅</p>
          <a
            href={link("overview")}
            aria-current={fileData.slug === "overview" ? "page" : undefined}
          >
            当前研究判断
          </a>
          <a
            href={link("syntheses/research-questions")}
            aria-current={fileData.slug === "syntheses/research-questions" ? "page" : undefined}
          >
            研究问题与缺口
          </a>
          <a href={`${link("index")}#all-pages`}>全部页面与来源</a>
        </div>
      </details>
    </nav>
  )
}

StudyNavigation.afterDOMLoaded = script

export default (() => StudyNavigation) satisfies QuartzComponentConstructor
