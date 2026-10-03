import type { QuartzPluginData } from "../plugins/vfile"

export const researchKinds: Record<string, string> = {
  domain: "研究领域",
  topic: "研究专题",
  source: "资料",
  concept: "概念",
  synthesis: "研究与学习笔记",
  entity: "项目与工具",
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
