/* eslint-disable no-unused-vars */

export const isValidUrl = (url = "", namespace = "") => {
  try {
    new URL(url);
    return true;
  } catch (_err) {
    if (namespace === "source") {
      const urlRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
      return urlRegex.test(url);
    }
    return false;
  }
};
