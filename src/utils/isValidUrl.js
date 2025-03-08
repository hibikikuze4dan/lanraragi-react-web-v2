/* eslint-disable no-unused-vars */

export const isValidUrl = (url = "") => {
  try {
    new URL(url);
    return true;
  } catch (_err) {
    return false;
  }
};
