import type { QuartzPluginData } from "../plugins/vfile"

export const researchKinds: Record<string, string> = {
  domain: "研究领域",
  topic: "Topic",
  source: "Source",
  concept: "Concept",
  synthesis: "Note",
  navigation: "目录",
  redirect: "内容已合并",
}

export function pageTopics(page: QuartzPluginData): string[] {
  const topics = page.frontmatter?.topics
  return Array.isArray(topics) ? topics.filter((t): t is string => typeof t === "string") : []
}

export function pageKind(page: QuartzPluginData): string {
  return page.frontmatter?.source_type === "paper"
    ? "论文"
    : (researchKinds[String(page.frontmatter?.type)] ?? "知识页")
}
