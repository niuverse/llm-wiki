import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import KnowledgeContent from "./quartz/components/KnowledgeContent"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Niuverse LLM Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "niuverse.github.io/llm-wiki",
    ignorePatterns: ["private", "templates", ".obsidian", "**/.obsidian", "log.md"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "Noto Sans SC",
        body: "Noto Sans SC",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#737373",
          darkgray: "#3f3f3f",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#5d7280",
          highlight: "rgba(143, 159, 169, 0.12)",
          textHighlight: "#dbe6ed",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#a6a6a6",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#a8c4d8",
          tertiary: "#c0d5e0",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#354b5a",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage({ pageBody: KnowledgeContent() }),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
