import { THUMBNAIL_URL } from "../requests/constants";
import { requestArchiveThumbnail } from "../requests/requestArchiveThumbnail";
import { useServerInfo } from "./useServerInfo";
import { useUrls } from "./useUrls";

export const useArchiveThumbnail = () => {
  const { serverInfo } = useServerInfo();
  const { baseUrlWithHttpOrHttps } = useUrls();

  const { nofun_mode } = serverInfo;

  const getThumbnailUrl = async (archiveId) => {
    if (!archiveId) {
      return "";
    }

    const thumbnailEndpoint = THUMBNAIL_URL.replace(":id", archiveId);

    if (!nofun_mode) {
      return `${baseUrlWithHttpOrHttps}${thumbnailEndpoint}`;
    }

    const thumbnailUrl = await requestArchiveThumbnail(archiveId);
    return thumbnailUrl;
  };

  return {
    getThumbnailUrl,
  };
};
