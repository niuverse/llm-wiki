export default function ReadingActions({ slug }: { slug: string }) {
  return (
    <div class="reading-actions" data-reading-slug={slug}>
      <button type="button" data-reading-action="read" aria-pressed="false">
        标记已读
      </button>
      <button type="button" data-reading-action="favorite" aria-pressed="false">
        收藏
      </button>
    </div>
  )
}
