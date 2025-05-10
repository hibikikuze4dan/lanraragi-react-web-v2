import { Button, Grid2 } from "@mui/material";
import clsx from "clsx";
import {
  PAGE_ICONS,
  SINGLE_PAGE_VIEW_MODE,
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_RATING,
} from "../../constants";
import { useDispatch } from "react-redux";
import Label from "@mui/icons-material/Label";
import Star from "@mui/icons-material/Star";
import { useArchiveActionsDialogLogic } from "../../hooks/useArchiveActionsDialogLogic";
import useAppPages from "../../hooks/useAppPages";
import { updateDisplayAppBar } from "../../redux/slices/appSlice";
import Image from "@mui/icons-material/Image";
import { IMAGES_VIEW_MODE } from "../../local-storage/constants";
import { createLocalStorageInstance } from "../../local-storage";
import TransitionButtons from "./transition-buttons";

const returnNull = () => null;
const { get: getImagesViewMode } = createLocalStorageInstance(IMAGES_VIEW_MODE);

export const EndOfArchiveActionButtons = ({
  previousImage = returnNull,
  setCurrentPageIndex = returnNull,
}) => {
  const dispatch = useDispatch();
  const { setActionType } = useArchiveActionsDialogLogic();
  const { updateAppPage, archiveOpenedFrom } = useAppPages();
  const isSingleImageMode = getImagesViewMode() === SINGLE_PAGE_VIEW_MODE;
  const gridSize = isSingleImageMode ? 6 : 12;

  const onClick = () => {
    dispatch(updateDisplayAppBar(true));
    updateAppPage(archiveOpenedFrom);
  };

  const ReturnToIcon = PAGE_ICONS[archiveOpenedFrom] ?? Grid2;

  return (
    <Grid2
      id="end-of-archive-buttons"
      className={clsx("pt-20 pb-100")}
      justifyContent="center"
      container
      spacing={4}
    >
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          variant="outlined"
          className="py-4 h-full"
          onClick={() => setActionType(UPDATE_ARCHIVE_CATEGORY)}
          startIcon={<Label />}
        >
          Categorize Archive
        </Button>
      </Grid2>
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          variant="outlined"
          className="py-4 h-full"
          onClick={() => setActionType(UPDATE_ARCHIVE_RATING)}
          startIcon={<Star />}
        >
          Rate Archive
        </Button>
      </Grid2>
      {isSingleImageMode && (
        <Grid2 size={gridSize}>
          <Button
            id="image-page-return-to-previous-image"
            fullWidth
            variant="outlined"
            className="py-4 h-full"
            onClick={previousImage}
            startIcon={<Image />}
          >
            Back to Last Image
          </Button>
        </Grid2>
      )}
      <Grid2 size={gridSize}>
        <Button
          id="image-page-return-to-archives"
          fullWidth
          variant="outlined"
          className="py-4 h-full"
          onClick={onClick}
          startIcon={<ReturnToIcon />}
        >
          Return to {archiveOpenedFrom}
        </Button>
      </Grid2>
      <TransitionButtons
        setCurrentPageIndex={setCurrentPageIndex}
        gridSize={gridSize}
      />
    </Grid2>
  );
};

export default EndOfArchiveActionButtons;
