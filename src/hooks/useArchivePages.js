import { useDispatch, useSelector } from "react-redux";
import { getArchivePages } from "../redux/selectors";
import requestArchivePages from "../requests/requestArchivePages";
import { updateArchivePages } from "../redux/slices/appSlice";
import { useUrls } from "./useUrls";
import { useServerInfo } from "./useServerInfo";
import { requestArchivePageBlob } from "../requests/requestArchivePageBlob";
import { requestMinionUntilFinished } from "../utils/requestMinionUntilFinished";

export const useArchivePages = () => {
  const dispatch = useDispatch();
  const { serverInfo } = useServerInfo();
  const archivePages = useSelector(getArchivePages);
  const { baseUrlWithHttpOrHttps } = useUrls();
  const { nofun_mode } = serverInfo;

  const getNewArchivePages = async (archiveId) => {
    dispatch(updateArchivePages([]));
    const { pages, job } = await requestArchivePages(archiveId);

    if (job) {
      await requestMinionUntilFinished({
        jobId: job,
        callback: () => {
          dispatch(updateArchivePages(pages));
        },
      });
    } else if (!job && pages?.length) {
      dispatch(updateArchivePages(pages));
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
