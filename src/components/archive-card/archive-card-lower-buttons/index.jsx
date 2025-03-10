import MoreHoriz from "@mui/icons-material/MoreHoriz";
import AutoStories from "@mui/icons-material/AutoStories";
import { Button, Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  updateCurrentArchiveId,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import { BUTTON_INHERIT_BACKGROUND, HISTORY, IMAGES } from "../../../constants";
import { useRef, useState } from "react";
import { ArchiveCardMenu } from "./archive-card-menu";
import { useArchiveHistory } from "../../../hooks/useArchiveHistory";
import useAppPages from "../../../hooks/useAppPages";

export const ArchiveCardLowerButtons = ({
  archive,
  currentPage,
  getNewArchivePages,
}) => {
  const archiveId = archive?.arcid ?? "";
  const dispatch = useDispatch();
  const { updateAppPage } = useAppPages();
  const { addArchiveToHistory } = useArchiveHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const moreButtonRef = useRef();
  const moreButtonId = `archive-more-button-${archiveId}`;

  const onReadButtonClick = async () => {
    if (currentPage !== HISTORY) {
      addArchiveToHistory(archive);
    }

    dispatch(updateCurrentArchiveId(archiveId));
    dispatch(updateImagesScrollTarget(""));
    updateAppPage(IMAGES);
    await getNewArchivePages(archiveId);
  };

  const onMoreButtonClick = () => {
    setMenuOpen(true);
    dispatch(updateCurrentArchiveId(archiveId));
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
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
          startIcon={<AutoStories />}
          onClick={onReadButtonClick}
          variant="text"
        >
          Read
        </Button>
      </Grid2>
      <Grid2 size={6}>
        <Button
          aria-label={`More options for archive ${archive?.title ?? ""}`}
          id={moreButtonId}
          fullWidth
          ref={moreButtonRef}
          onClick={onMoreButtonClick}
          variant="text"
        >
          <MoreHoriz />
        </Button>
        <ArchiveCardMenu
          archive={archive}
          menuOpen={menuOpen}
          moreButtonId={moreButtonId}
          anchorEl={moreButtonRef?.current}
          handleMenuClose={handleMenuClose}
        />
      </Grid2>
    </Grid2>
  );
};
