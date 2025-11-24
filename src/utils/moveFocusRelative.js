import getFocusableElementsInTabOrder from "./getFocusableElementsInTabOrder";

export const moveFocusRelative = ({ element, arrowKey = "", elementList }) => {
  if (!element || !arrowKey) return;

  const focusables = elementList ?? getFocusableElementsInTabOrder();

  const index = focusables.indexOf(element);
  if (index === -1) return;

  let elementToBeFocusedIndex;
  if (arrowKey === "ArrowRight") {
    elementToBeFocusedIndex = (index + 1) % focusables.length;
  } else if (arrowKey === "ArrowLeft") {
    elementToBeFocusedIndex =
      (index - 1 + focusables.length) % focusables.length;
  } else {
    return;
  }

  focusables[elementToBeFocusedIndex]?.focus();
};

export default moveFocusRelative;
