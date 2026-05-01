import { QuartzComponent, QuartzComponentConstructor } from "./types"
import script from "./scripts/wheeledRobotVisualLab.inline"
import style from "./styles/wheeledRobotVisualLab.scss"

export default (() => {
  const WheeledRobotVisualLab: QuartzComponent = () => null

  WheeledRobotVisualLab.css = style
  WheeledRobotVisualLab.afterDOMLoaded = script

  return WheeledRobotVisualLab
}) satisfies QuartzComponentConstructor
