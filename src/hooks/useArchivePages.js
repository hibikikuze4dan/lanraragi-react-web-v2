import { useDispatch, useSelector } from "react-redux";
import { getArchivePages } from "../redux/selectors";
import requestArchivePages from "../requests/requestArchivePages";
import { updateArchivePages } from "../redux/slices/appSlice";
import { useUrls } from "./useUrls";
import { requestMinionJobStatus } from "../requests/requestMinionJobStatus";

export const useArchivePages = () => {
  const dispatch = useDispatch();
  const archivePages = useSelector(getArchivePages);
  const { baseUrlWithHttpOrHttps } = useUrls();

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

  const archivePagesAsLinks = archivePages.map((page) => {
    const linkEnd = page.replace(/^\./, "");
    return `${baseUrlWithHttpOrHttps}${linkEnd}`;
  });

  return {
    archivePages,
    archivePagesAsLinks,
    getNewArchivePages,
  };
};
