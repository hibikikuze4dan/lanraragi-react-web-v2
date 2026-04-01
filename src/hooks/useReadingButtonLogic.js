import { useDispatch } from "react-redux";
import useAppPages from "./useAppPages";
import {
  ALWAYS_ASK,
  HISTORY,
  IMAGES,
  IMAGES_PAGE_ID,
  TEMP_VIEW_MODE_DIALOG,
} from "../constants";
import { useArchiveHistory } from "./useArchiveHistory";
import { useArchivePages } from "./useArchivePages";
import { updateImagesScrollTarget } from "../redux/slices/appSlice";
import { putUpdateReadingProgression } from "../requests/putUpdateReadingProgression";
import useImageViewMode from "./useImageViewMode";
import { useArchiveActionsDialogLogic } from "./useArchiveActionsDialogLogic";
import useCurrentArchive from "./useCurrentArchive";
import { scrollToLogger } from "../utils/scrollToLogger";
import { useCallback } from "react";

export const useReadingButtonLogic = () => {
  const dispatch = useDispatch();
  const { appPage, updateAppPage } = useAppPages();
  const { getNewArchivePages } = useArchivePages();
  const { addArchiveToHistory } = useArchiveHistory();
  const { archive, setCurrentArchive } = useCurrentArchive();
  const { imageViewMode } = useImageViewMode();
  const { setActionType } = useArchiveActionsDialogLogic({
    autoFocusCloseButton: true,
  });

  const isHistoryPage = appPage === HISTORY;

  const openImagePageAndGetImages = useCallback(
    async (archiveArcId) => {
      setCurrentArchive(archiveArcId);
      dispatch(updateImagesScrollTarget(""));
      updateAppPage(IMAGES);
      await getNewArchivePages(archiveArcId);
      scrollToLogger({
        element: document.getElementById(IMAGES_PAGE_ID),
        message: "useReadingButtonLogic",
        options: { block: "start", behavior: "instant" },
      });
      putUpdateReadingProgression({ archiveId: archiveArcId, page: 1 });
    },
    [dispatch, getNewArchivePages, updateAppPage, setCurrentArchive],
  );

  const onReadButtonClick = async (archiveArcId) => {
    if (!isHistoryPage) {
      addArchiveToHistory(archive);
    }

    setCurrentArchive(archiveArcId);

    if (imageViewMode === ALWAYS_ASK) {
      setActionType(TEMP_VIEW_MODE_DIALOG);
      return;
    }

    await openImagePageAndGetImages(archiveArcId);
  };

  return {
    appPage,
    onReadButtonClick,
    openImagePageAndGetImages,
  };
};

export default useReadingButtonLogic;
