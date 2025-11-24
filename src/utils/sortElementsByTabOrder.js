export const sortElementsByTabOrder = (elements = []) => {
  return elements.sort((elementA, elementB) => {
    const elementATabIndex = elementA?.tabIndex ?? 0;
    const elementBTabIndex = elementB?.tabIndex ?? 0;

    const elementATabIndexGreaterThanZero = elementATabIndex > 0;
    const elementBTabIndexGreaterThanZero = elementBTabIndex > 0;
    if (elementATabIndexGreaterThanZero && elementBTabIndexGreaterThanZero) {
      return elementATabIndex - elementBTabIndex;
    } else if (elementATabIndexGreaterThanZero && elementBTabIndex === 0) {
      return -1;
    } else if (elementATabIndex === 0 && elementBTabIndexGreaterThanZero) {
      return 1;
    }

    return 0;
  });
};

export default sortElementsByTabOrder;
