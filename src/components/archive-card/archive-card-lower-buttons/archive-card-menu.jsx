import { Grid2, Menu, MenuItem } from "@mui/material";
import {
  MORE_ARCHIVE_ACTIONS,
  REGENERATE_ARCHIVE_THUMBNAIL,
  UNDERSCORE_REGEX,
} from "../../../constants";
import { useArchiveActionsDialogLogic } from "../../../hooks/useArchiveActionsDialogLogic";
import { useRegenerateThumbnail } from "../../../hooks/useRegenerateThumbnail";
import { ARCHIVE_ACTION_ICONS } from "../../constants";
import Error from "@mui/icons-material/Error";

export const ArchiveCardMenu = ({
  archive,
  anchorEl,
  moreButtonId,
  handleMenuClose,
  menuOpen,
}) => {
  const { setActionType } = useArchiveActionsDialogLogic();
  const { regenerateThumbnail } = useRegenerateThumbnail();
  const archiveId = archive?.arcid ?? "";

  const onMenuItemClickFactory = (menuitem) => () => {
    if (menuitem === REGENERATE_ARCHIVE_THUMBNAIL) {
      regenerateThumbnail({ archiveId });
    } else {
      setActionType(menuitem ?? "");
    }

    handleMenuClose();
  };

  return (
    <Menu
      id={`archive-more-menu-${archiveId}`}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={menuOpen}
      MenuListProps={{ "aria-labelledby": moreButtonId }}
      onClose={handleMenuClose}
    >
      {MORE_ARCHIVE_ACTIONS.map((action) => {
        const onMenuItemClick = onMenuItemClickFactory(action);
        const IconComponent = ARCHIVE_ACTION_ICONS?.[action] ?? Error;

        return (
          <MenuItem
            id={`archive-menu-item-${action}`}
            key={action}
            className="capitalize"
            onClick={onMenuItemClick}
          >
            <Grid2 container spacing={2}>
              <Grid2 size="auto">
                <IconComponent />
              </Grid2>
              <Grid2 size="grow">
                {action?.replace(UNDERSCORE_REGEX, " ")}
              </Grid2>
            </Grid2>
          </MenuItem>
        );
      })}
    </Menu>
  );
};
