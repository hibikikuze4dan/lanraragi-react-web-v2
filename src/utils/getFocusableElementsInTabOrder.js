import sortElementsByTabOrder from "./sortElementsByTabOrder";

export const getFocusableElementsInTabOrder = (wrapper) => {
  const areaToSearchForFocusableElements = wrapper ?? document;
  const focusableElements = Array.from(
    areaToSearchForFocusableElements.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.disabled && !el.getAttribute("aria-hidden"));

  return sortElementsByTabOrder(focusableElements);
};

export default getFocusableElementsInTabOrder;
