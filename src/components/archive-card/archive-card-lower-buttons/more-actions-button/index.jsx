import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import { ArchiveCardMenu } from "./archive-card-menu";
import { useRef, useState } from "react";
import { isDesktop } from "react-device-detect";
import useOpenDialogs from "../../../../hooks/useOpenDialogs";
import { COMPONENT_CLASSNAMES } from "../../../../constants";
import useCurrentArchive from "../../../../hooks/useCurrentArchive";

export const MoreActionsButton = ({
  archive,
  onButtonKeyDown = () => null,
}) => {
  const archiveId = archive?.arcid ?? "";
  const moreButtonRef = useRef();
  const { setCurrentArchive } = useCurrentArchive();
  const { changeDialogState } = useOpenDialogs();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktopDevice = isDesktop;
  const moreButtonId = `archive-more-button-${archiveId}`;

  const onMoreButtonClick = () => {
    setCurrentArchive(archiveId);
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
        className={COMPONENT_CLASSNAMES.ARCHIVE_CARD_ACTIONS_BUTTON}
        id={moreButtonId}
        fullWidth
        ref={moreButtonRef}
        onClick={onMoreButtonClick}
        onKeyDown={onButtonKeyDown}
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
