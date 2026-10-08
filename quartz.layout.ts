import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import KnowledgeMeta from "./quartz/components/KnowledgeMeta"
import KnowledgeRelations from "./quartz/components/KnowledgeRelations"
import ImageViewer from "./quartz/components/ImageViewer"

const navigation = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      {
        Component: Component.ConditionalRender({
          component: Component.Search(),
          condition: (p) => p.fileData.slug !== "index",
        }),
        grow: true,
      },
      { Component: Component.Darkmode() },
      { Component: Component.ReaderMode() },
    ],
  }),
  Component.Explorer({
    title: "Browse",
    folderClickBehavior: "collapse",
    folderDefaultState: "collapsed",
    sortFn: (a, b) => {
      const folders = ["topics", "concepts", "sources", "syntheses"]
      if (a.isFolder && b.isFolder)
        return folders.indexOf(a.slugSegment) - folders.indexOf(b.slugSegment)
      if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
      return a.displayName.localeCompare(b.displayName, undefined, { numeric: true })
    },
    filterFn: (node) =>
      !["tags", "domains", "entities"].includes(node.slugSegment) &&
      !["research-topics", "references"].includes(node.slug) &&
      node.data?.type !== "redirect",
    mapFn: (node) => {
      const names: Record<string, string> = {
        topics: "Topics",
        concepts: "Concepts",
        sources: "Sources",
        syntheses: "Notes",
      }
      if (node.isFolder && names[node.slugSegment]) node.displayName = names[node.slugSegment]
      else if (node.data?.navTitle) node.displayName = node.data.navTitle
    },
  }),
]

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [KnowledgeRelations(), ImageViewer()],
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
      component: Component.Search({ buttonLabel: "搜索论文、概念或研究问题…" }),
      condition: (p) => p.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (p) => !["navigation", "redirect"].includes(String(p.fileData.frontmatter?.type)),
    }),
    KnowledgeMeta(),
  ],
  left: navigation,
  right: [
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.TableOfContents()),
      condition: (p) => p.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: { showTags: false },
        globalGraph: { showTags: false },
      }),
      condition: (p) =>
        !["navigation", "redirect", "domain"].includes(String(p.fileData.frontmatter?.type)),
    }),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: navigation,
  right: [],
}
