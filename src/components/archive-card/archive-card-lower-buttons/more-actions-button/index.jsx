import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import { ArchiveCardMenu } from "./archive-card-menu";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentArchiveId } from "../../../../redux/slices/appSlice";
import { isDesktop } from "react-device-detect";
import useOpenDialogs from "../../../../hooks/useOpenDialogs";

export const MoreActionsButton = ({ archive }) => {
  const dispatch = useDispatch();
  const archiveId = archive?.arcid ?? "";
  const moreButtonRef = useRef();
  const { changeDialogState } = useOpenDialogs();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktopDevice = isDesktop;
  const moreButtonId = `archive-more-button-${archiveId}`;

  const onMoreButtonClick = () => {
    dispatch(updateCurrentArchiveId(archiveId));
    if (isDesktopDevice) {
      setMenuOpen(true);
    } else {
      changeDialogState({ dialogKey: "mobileActions", isOpen: true });
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
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
    </>
  );
};
