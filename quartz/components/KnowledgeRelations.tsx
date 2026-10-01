import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore: Quartz loads inline scripts as text resources.
import script from "./scripts/knowledgeDashboard.inline"

const KnowledgeRelations: QuartzComponent = ({ fileData }) => (
  <details class="knowledge-relations" data-relation-slug={fileData.slug}>
    <summary>关联知识图</summary>
    <p class="relation-help">沿引用发现相关概念与来源。箭头指向被引用页，点击节点打开页面。</p>
    <div class="knowledge-graph" aria-label="当前页面的双向引用关系"></div>
    <details class="relation-text">
      <summary>查看文字关系表</summary>
      <div class="relation-links"></div>
    </details>
  </details>
)

KnowledgeRelations.afterDOMLoaded = script

export default (() => KnowledgeRelations) satisfies QuartzComponentConstructor
