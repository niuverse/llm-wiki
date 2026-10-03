import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import KnowledgeMeta from "./quartz/components/KnowledgeMeta"
import KnowledgeRelations from "./quartz/components/KnowledgeRelations"

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
  Component.Explorer({
    title: "笔记目录",
    folderClickBehavior: "link",
    folderDefaultState: "collapsed",
    filterFn: (node) => !["tags", "domains"].includes(node.slugSegment),
    mapFn: (node) => {
      const names: Record<string, string> = {
        topics: "主题地图",
        sources: "论文与资料",
        concepts: "共享概念",
        syntheses: "学习与综合",
        entities: "项目与工具",
      }
      if (node.isFolder && names[node.slugSegment]) node.displayName = names[node.slugSegment]
    },
  }),
]

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [KnowledgeRelations()],
  footer: Component.Footer({ links: { GitHub: "https://github.com/niuverse/llm-wiki" } }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (p) => p.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (p) => !["navigation", "redirect"].includes(String(p.fileData.frontmatter?.type)),
    }),
    KnowledgeMeta(),
  ],
  left: navigation,
  right: [
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: { showTags: false },
        globalGraph: { showTags: false },
      }),
      condition: (p) =>
        !["navigation", "redirect", "domain"].includes(String(p.fileData.frontmatter?.type)),
    }),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: navigation,
  right: [],
}
