import sortElementsByTabOrder from "./sortElementsByTabOrder";

export const getElementsByMultipleClassnames = (classnames = []) => {
  const classnamesWithALeadingPeriod = classnames.map(
    (classname) => `.${classname}`
  );

  const elements = Array.from(
    document.querySelectorAll(classnamesWithALeadingPeriod.join(", "))
  );

  return sortElementsByTabOrder(elements);
};

export default getElementsByMultipleClassnames;
