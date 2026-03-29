export const focusElement = (
  { element, reason, options } = {
    element: null,
    reason: "",
    options: { preventScroll: false },
  },
) => {
  if (!element) return;

  // eslint-disable-next-line no-undef
  if (process?.env?.NODE_ENV === "development") {
    console.log(`[Focus]`, { reason, element, stack: new Error().stack });
  }

  const preventScroll = options?.preventScroll ?? false;
  element?.focus?.({ preventScroll });
};

export default focusElement;
