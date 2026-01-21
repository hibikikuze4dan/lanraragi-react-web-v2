export const scrollToLogger = ({ element, message, options }) => {
  const scrollIntoViewOptions = { ...(options ?? {}) };
  console.log(message, `Scrolling to:`, element);
  element?.scrollIntoView(scrollIntoViewOptions);
};

export default scrollToLogger;
