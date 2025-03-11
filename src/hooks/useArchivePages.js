import { useDispatch, useSelector } from "react-redux";
import { getArchivePages } from "../redux/selectors";
import requestArchivePages from "../requests/requestArchivePages";
import { updateArchivePages } from "../redux/slices/appSlice";
import { useUrls } from "./useUrls";
import { requestMinionJobStatus } from "../requests/requestMinionJobStatus";
import { useServerInfo } from "./useServerInfo";
import { requestArchivePageBlob } from "../requests/requestArchivePageBlob";

export const useArchivePages = () => {
  const dispatch = useDispatch();
  const { serverInfo } = useServerInfo();
  const archivePages = useSelector(getArchivePages);
  const { baseUrlWithHttpOrHttps } = useUrls();
  const { nofun_mode } = serverInfo;

  const getNewArchivePages = async (archiveId) => {
    dispatch(updateArchivePages([]));
    const { pages, job } = await requestArchivePages(archiveId);
    const { state } = await requestMinionJobStatus({ jobId: job });

    if (state === "finished") {
      dispatch(updateArchivePages(pages));
    } else {
      setTimeout(() => dispatch(updateArchivePages(pages)), 1500);
    }
    return pages;
  };

  const getPageLink = async (url) => {
    if (!nofun_mode) {
      return url;
    }
    const link = await requestArchivePageBlob(url);
    return link;
  };

  const archivePagesAsLinks = archivePages.map((page) => {
    const linkEnd = page.replace(/^\./, "");
    return `${baseUrlWithHttpOrHttps}${linkEnd}`;
  });

  return {
    archivePages,
    archivePagesAsLinks,
    getNewArchivePages,
    getPageLink,
  };
};
