import { BaseUrlSetter } from "../../base-url-setter";
import { useUrls } from "../../../hooks/useUrls";

export const UrlPage = ({ children }) => {
  const { baseUrl, updateBaseUrl } = useUrls();

  return baseUrl ? <>{children}</> : <BaseUrlSetter onClick={updateBaseUrl} />;
};
