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
          light: "#ffffff",
          lightgray: "#e5e9ed",
          gray: "#667281",
          darkgray: "#39434f",
          dark: "#192531",
          secondary: "#25645c",
          tertiary: "#358579",
          highlight: "rgba(37, 100, 92, 0.06)",
          textHighlight: "#d9ebe3",
        },
        darkMode: {
          light: "#151c22",
          lightgray: "#303b44",
          gray: "#9ca9b5",
          darkgray: "#c8d1d9",
          dark: "#edf3f6",
          secondary: "#8bc8b9",
          tertiary: "#acd9cd",
          highlight: "rgba(139, 200, 185, 0.08)",
          textHighlight: "#395c51",
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
