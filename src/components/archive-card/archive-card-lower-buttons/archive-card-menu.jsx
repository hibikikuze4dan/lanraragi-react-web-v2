import { Grid2, Menu, MenuItem } from "@mui/material";
import {
  DELETE_ARCHIVE,
  MORE_ARCHIVE_ACTIONS,
  REGENERATE_ARCHIVE_THUMBNAIL,
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_METADATA,
  VIEW_ARCHIVE_INFO,
} from "../../../constants";
import { useArchiveActionsDialogLogic } from "../../../hooks/useArchiveActionsDialogLogic";
import Info from "@mui/icons-material/Info";
import Tag from "@mui/icons-material/Tag";
import Label from "@mui/icons-material/Label";
import Image from "@mui/icons-material/Image";
import Delete from "@mui/icons-material/Delete";
import { useRegenerateThumbnail } from "../../../hooks/useRegenerateThumbnail";

const MENU_ITEM_ICONS = {
  [VIEW_ARCHIVE_INFO]: Info,
  [UPDATE_ARCHIVE_METADATA]: Tag,
  [UPDATE_ARCHIVE_CATEGORY]: Label,
  [REGENERATE_ARCHIVE_THUMBNAIL]: Image,
  [DELETE_ARCHIVE]: Delete,
};

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
        const IconComponent = MENU_ITEM_ICONS[action];

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
              <Grid2 size="grow">{action?.replace(/_/g, " ")}</Grid2>
            </Grid2>
          </MenuItem>
        );
      })}
    </Menu>
  );
};
