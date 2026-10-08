import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore: Quartz bundles browser scripts as text.
import script from "./scripts/imageViewer.inline"

const ImageViewer: QuartzComponent = () => (
  <dialog class="image-viewer" aria-label="查看配图">
    <form method="dialog">
      <button aria-label="关闭配图">关闭 ×</button>
    </form>
    <figure>
      <img alt="" />
      <figcaption></figcaption>
    </figure>
    <a class="image-original" target="_blank" rel="noopener noreferrer">
      打开原图
    </a>
  </dialog>
)

ImageViewer.afterDOMLoaded = script
export default (() => ImageViewer) satisfies QuartzComponentConstructor
