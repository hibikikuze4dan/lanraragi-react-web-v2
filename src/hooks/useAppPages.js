import { useDispatch, useSelector } from "react-redux";
import { getArchiveOpenedFrom, getCurrentPage } from "../redux/selectors";
import {
  updateArchiveOpenedFrom,
  updateCurrentPage,
} from "../redux/slices/appSlice";
import { IMAGES } from "../constants";
import { useCallback } from "react";

export const useAppPages = () => {
  const dispatch = useDispatch();
  const appPage = useSelector(getCurrentPage);
  const archiveOpenedFrom = useSelector(getArchiveOpenedFrom);
  const currentPageIsImagesPage = appPage === IMAGES;

  const updateAppPage = useCallback(
    (page = "") => {
      if (!page) {
        return;
      }

      if (page === IMAGES) {
        dispatch(updateArchiveOpenedFrom(appPage));
      }

      dispatch(updateCurrentPage(page));
    },
    [appPage, dispatch]
  );

  return {
    appPage,
    archiveOpenedFrom,
    currentPageIsImagesPage,
    updateAppPage,
  };
};

export default useAppPages;
