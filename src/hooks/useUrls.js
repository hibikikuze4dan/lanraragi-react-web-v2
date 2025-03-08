import { useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";

const { get: getBaseUrl, set: setBaseUrl } =
  createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const useUrls = () => {
  const [baseUrl, setBaseUrlState] = useState(getBaseUrl());
  const [httpOrHttps] = useState(getHttpOrHttps());
  const baseUrlWithHttpOrHttps = `${httpOrHttps}://${baseUrl}`;

  const updateBaseUrl = (newBaseUrl = "") => {
    setBaseUrl(newBaseUrl ?? "");
    setBaseUrlState(newBaseUrl ?? "");
  };

  return {
    baseUrl,
    baseUrlWithHttpOrHttps,
    httpOrHttps,
    updateBaseUrl,
  };
};
