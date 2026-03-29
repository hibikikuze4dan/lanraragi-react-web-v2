export const focusElement = (
  { element, reason, options } = {
    element: null,
    reason: "",
    options: { preventScroll: false },
  },
) => {
  if (!element) return;

  if (import.meta.env.DEV === true) {
    console.log(`[Focus]`, { reason, element, stack: new Error().stack });
  }

  const preventScroll = options?.preventScroll ?? false;
  element?.focus?.({ preventScroll });
};

export default focusElement;
