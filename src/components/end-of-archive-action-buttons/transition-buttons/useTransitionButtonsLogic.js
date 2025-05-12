import { useDispatch } from "react-redux";
import useAppPages from "../../../hooks/useAppPages";
import { useArchivePages } from "../../../hooks/useArchivePages";
import useCurrentArchive from "../../../hooks/useCurrentArchive";
import { useRandomArchives } from "../../../hooks/useRandomArchives";
import { useArchiveHistory } from "../../../hooks/useArchiveHistory";
import { useSearchResults } from "../../../hooks/useSearchResults";
import {
  HISTORY,
  RANDOM,
  RETURN_NULL,
  SCROLL_IMAGES_START_ID,
  SEARCH,
} from "../../../constants";
import {
  updateCurrentArchiveId,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import { putUpdateReadingProgression } from "../../../requests/putUpdateReadingProgression";

export const useTransitionButtonsLogic = ({
  setCurrentPageIndex = RETURN_NULL,
}) => {
  const dispatch = useDispatch();
  const { archiveOpenedFrom, appPage } = useAppPages();
  const { getNewArchivePages } = useArchivePages();
  const { archive } = useCurrentArchive();
  const { randomArchives } = useRandomArchives();
  const { addArchiveToHistory } = useArchiveHistory();
  const { archives: searchArchives } = useSearchResults();

  const isHistoryPage = appPage === HISTORY;

  const pathArchives = {
    [SEARCH]: searchArchives,
    [RANDOM]: randomArchives,
  };

  const archivesToBeSearched = pathArchives?.[archiveOpenedFrom] ?? [];

  const currentArchiveIndex = archivesToBeSearched?.findIndex(
    (arc) => arc?.arcid === archive?.arcid
  );

  const shouldNotRender =
    archiveOpenedFrom === HISTORY || currentArchiveIndex === -1;

  const nextArchive = archivesToBeSearched?.[currentArchiveIndex + 1];
  const previousArchive = archivesToBeSearched?.[currentArchiveIndex - 1];

  const onReadButtonClick =
    (isNextArchiveButton = false) =>
    async () => {
      if (!isHistoryPage) {
        addArchiveToHistory(archive);
      }
      const archiveToUse = isNextArchiveButton ? nextArchive : previousArchive;

      if (!archiveToUse) {
        return;
      }

      const archiveId = archiveToUse?.arcid;

      document.getElementById(SCROLL_IMAGES_START_ID)?.scrollIntoView?.();
      dispatch(updateCurrentArchiveId(archiveId));
      setCurrentPageIndex(0);
      dispatch(updateImagesScrollTarget(""));
      await getNewArchivePages(archiveId);
      putUpdateReadingProgression({ archiveId });
    };

  return {
    onReadButtonClick,
    shouldNotRender,
  };
};

export default useTransitionButtonsLogic;
