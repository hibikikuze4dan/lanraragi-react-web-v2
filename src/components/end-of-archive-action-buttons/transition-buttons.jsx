import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { Button, Grid2 } from "@mui/material";
import useAppPages from "../../hooks/useAppPages";
import { useRandomArchives } from "../../hooks/useRandomArchives";
import { useSearchResults } from "../../hooks/useSearchResults";
import {
  HISTORY,
  RANDOM,
  SCROLL_IMAGES_START_ID,
  SEARCH,
} from "../../constants";
import useCurrentArchive from "../../hooks/useCurrentArchive";
import { useArchiveHistory } from "../../hooks/useArchiveHistory";
import {
  updateCurrentArchiveId,
  updateImagesScrollTarget,
} from "../../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import { useArchivePages } from "../../hooks/useArchivePages";
import { putUpdateReadingProgression } from "../../requests/putUpdateReadingProgression";

export const TransitionButtons = ({
  gridSize = 12,
  setCurrentPageIndex = () => null,
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

  const dontRender =
    archiveOpenedFrom === HISTORY || currentArchiveIndex === -1;

  const nextArchive = archivesToBeSearched?.[currentArchiveIndex + 1];
  const previousArchive = archivesToBeSearched?.[currentArchiveIndex - 1];

  console.log(
    nextArchive,
    "na",
    previousArchive,
    "pa",
    pathArchives,
    "patha",
    currentArchiveIndex,
    "caa"
  );
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

      document.getElementById(SCROLL_IMAGES_START_ID).scrollIntoView();
      dispatch(updateCurrentArchiveId(archiveId));
      setCurrentPageIndex(0);
      dispatch(updateImagesScrollTarget(""));
      await getNewArchivePages(archiveId);
      putUpdateReadingProgression({ archiveId });
    };

  return dontRender ? null : (
    <>
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          variant="outlined"
          className="py-4 h-full"
          onClick={onReadButtonClick(false)}
          startIcon={<NavigateBefore />}
        >
          Previous Archive
        </Button>
      </Grid2>
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          variant="outlined"
          className="py-4 h-full"
          onClick={onReadButtonClick(true)}
          startIcon={<NavigateNext />}
        >
          Next Archive
        </Button>
      </Grid2>
    </>
  );
};

export default TransitionButtons;
