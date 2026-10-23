import type { Dispatch, SetStateAction } from "react";

export function registerMapControlsShortcut(
  setAreControlsVisible: Dispatch<SetStateAction<boolean>>,
) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target;
    const isEditableTarget =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.closest(
          "input, textarea, select, [contenteditable='true'], [role='textbox']",
        ) !== null);

    // Do not fire when typing in the search field
    if (isEditableTarget) {
      return;
    }

    // Do not fire when part of a different keyboard command (e.g. ctrl + h)
    if (
      event.key.toLowerCase() !== "h" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.repeat
    ) {
      return;
    }

    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLElement &&
      activeElement.closest(
        ".tabsContainer, .filtersContainer, .mapControlsContainer, .resultsContainer",
      )
    ) {
      activeElement.blur();
    }

    setAreControlsVisible((visible) => !visible);
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}
