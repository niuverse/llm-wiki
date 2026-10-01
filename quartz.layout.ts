import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import StudyNavigation from "./quartz/components/StudyNavigation"
import KnowledgeMeta from "./quartz/components/KnowledgeMeta"
import KnowledgeBreadcrumbs from "./quartz/components/KnowledgeBreadcrumbs"
import KnowledgeRelations from "./quartz/components/KnowledgeRelations"
import { QuartzComponentProps } from "./quartz/components/types"

const isArticle = (page: QuartzComponentProps) => page.fileData.slug !== "index"

const navigation = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      { Component: Component.Search(), grow: true },
      { Component: Component.Darkmode() },
      { Component: Component.ReaderMode() },
    ],
  }),
  StudyNavigation(),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({ component: KnowledgeRelations(), condition: isArticle }),
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "最近审阅",
        limit: 4,
        showTags: false,
        filter: (f) => f.frontmatter?.type === "concept" && Boolean(f.frontmatter?.modified),
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/niuverse/llm-wiki",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: KnowledgeBreadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({ component: Component.ArticleTitle(), condition: isArticle }),
    Component.ConditionalRender({ component: Component.ContentMeta(), condition: isArticle }),
    KnowledgeMeta(),
  ],
  left: navigation,
  right: [
    Component.ConditionalRender({ component: Component.TableOfContents(), condition: isArticle }),
    Component.ConditionalRender({ component: Component.Backlinks(), condition: isArticle }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [KnowledgeBreadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: navigation,
  right: [],
}
