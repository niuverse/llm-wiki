function setupWheeledRobotVisualLabs() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-wheeled-robot-lab]")) {
    if (root.dataset.wheeledRobotLabReady === "true") continue
    root.dataset.wheeledRobotLabReady = "true"
    root.textContent = "Wheeled robot visual lab"
  }
}

document.addEventListener("nav", setupWheeledRobotVisualLabs)
