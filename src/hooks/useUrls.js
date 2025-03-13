import { useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { BASE_URL, HTTP_OR_HTTPS } from "../local-storage/constants";

const { get: getBaseUrl, set: setBaseUrl } =
  createLocalStorageInstance(BASE_URL);
const { get: getHttpOrHttps, set: setHttpOrHttps } =
  createLocalStorageInstance(HTTP_OR_HTTPS);

export const useUrls = () => {
  const [baseUrl, setBaseUrlState] = useState(getBaseUrl());
  const [httpOrHttps, setHttpOrHttpsState] = useState(
    getHttpOrHttps() ?? "http"
  );
  const baseUrlWithHttpOrHttps = `${httpOrHttps}://${baseUrl}`;

  const updateBaseUrl = (newBaseUrl = "") => {
    if (newBaseUrl) {
      setBaseUrl(newBaseUrl ?? "");
      setBaseUrlState(newBaseUrl ?? "");
    }
  };

  const updateHttpOrHttps = (currentValue) => {
    if (!currentValue) {
      return;
    }
    const newHttpOrHttpsValue = currentValue === "http" ? "https" : "http";
    setHttpOrHttps(newHttpOrHttpsValue);
    setHttpOrHttpsState(newHttpOrHttpsValue);
  };

  return {
    baseUrl,
    baseUrlWithHttpOrHttps,
    httpOrHttps,
    updateBaseUrl,
    updateHttpOrHttps,
  };
};
