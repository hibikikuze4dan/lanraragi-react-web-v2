import AutoStories from "@mui/icons-material/AutoStories";
import { Button, Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  updateCurrentArchiveId,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import { BUTTON_INHERIT_BACKGROUND, HISTORY, IMAGES } from "../../../constants";
import { useArchiveHistory } from "../../../hooks/useArchiveHistory";
import useAppPages from "../../../hooks/useAppPages";
import { MoreActionsButton } from "./more-actions-button";
import { putUpdateReadingProgression } from "../../../requests/putUpdateReadingProgression";

export const ArchiveCardLowerButtons = ({
  archive,
  currentPage,
  getNewArchivePages,
}) => {
  const archiveId = archive?.arcid ?? "";
  const dispatch = useDispatch();
  const { updateAppPage } = useAppPages();
  const { addArchiveToHistory } = useArchiveHistory();
  const isHistoryPage = currentPage === HISTORY;
  const onReadButtonClick = async () => {
    if (!isHistoryPage) {
      addArchiveToHistory(archive);
    }

    dispatch(updateCurrentArchiveId(archiveId));
    dispatch(updateImagesScrollTarget(""));
    updateAppPage(IMAGES);
    await getNewArchivePages(archiveId);
    putUpdateReadingProgression({ archiveId });
  };

  return (
    <Grid2
      id={`archive-card-${archiveId}-lower-buttons`}
      className="w-full"
      container
      spacing={1}
      sx={BUTTON_INHERIT_BACKGROUND}
    >
      <Grid2 size={isHistoryPage ? 12 : 6}>
        <Button
          fullWidth
          startIcon={<AutoStories />}
          onClick={onReadButtonClick}
          variant="text"
        >
          Read
        </Button>
      </Grid2>
      {!isHistoryPage && (
        <Grid2 size={6}>
          <MoreActionsButton archive={archive} />
        </Grid2>
      )}
    </Grid2>
  );
};
