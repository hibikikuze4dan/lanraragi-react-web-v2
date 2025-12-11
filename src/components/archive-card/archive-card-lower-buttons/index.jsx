import AutoStories from "@mui/icons-material/AutoStories";
import { Button, Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  updateCurrentArchiveId,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import {
  BUTTON_INHERIT_BACKGROUND,
  COMPONENT_CLASSNAMES,
  HISTORY,
  IMAGES,
  KEYBOARD_KEY_CODES,
  TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION,
} from "../../../constants";
import { useArchiveHistory } from "../../../hooks/useArchiveHistory";
import useAppPages from "../../../hooks/useAppPages";
import { MoreActionsButton } from "./more-actions-button";
import { putUpdateReadingProgression } from "../../../requests/putUpdateReadingProgression";
import moveFocusRelative from "../../../utils/moveFocusRelative";
import getElementsByMultipleClassnames from "../../../utils/getElementsByMultipleClassnames";

export const ArchiveCardLowerButtons = ({
  archive,
  currentPage,
  getNewArchivePages,
}) => {
  const { ARROW_LEFT, ARROW_RIGHT } = KEYBOARD_KEY_CODES;
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

  const onButtonsKeyDown = (event) => {
    const eventCode = event?.code;
    const isLeftRightArrowKeys = [ARROW_LEFT, ARROW_RIGHT].includes(eventCode);
    if (isLeftRightArrowKeys) {
      event.preventDefault();
      moveFocusRelative({
        element: event?.target,
        arrowKey: eventCode,
        elementList: getElementsByMultipleClassnames(
          TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION
        ),
      });
    }
  };

  return (
    <Grid2
      id={`archive-card-${archiveId}-lower-buttons`}
      className="w-full"
      container
      spacing={1}
      sx={BUTTON_INHERIT_BACKGROUND}
    >
      <Grid2 size={6}>
        <Button
          fullWidth
          className={`${COMPONENT_CLASSNAMES.ARCHIVE_CARD_READ_BUTTON}`}
          startIcon={<AutoStories />}
          onClick={onReadButtonClick}
          onKeyDown={onButtonsKeyDown}
          variant="text"
        >
          Read
        </Button>
      </Grid2>
      <Grid2 size={6}>
        <MoreActionsButton
          archive={archive}
          onButtonKeyDown={onButtonsKeyDown}
        />
      </Grid2>
    </Grid2>
  );
};
