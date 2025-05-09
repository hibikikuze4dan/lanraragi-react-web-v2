import { Button, Grid2, Typography, useMediaQuery } from "@mui/material";
import { useArchiveActionsDialogLogic } from "../../hooks/useArchiveActionsDialogLogic";
import { Dialog } from "../dialog";
import Close from "@mui/icons-material/Close";
import {
  BUTTON_INHERIT_BACKGROUND,
  DELETE_ARCHIVE,
  UNDERSCORE_REGEX,
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_METADATA,
  UPDATE_ARCHIVE_RATING,
  VIEW_ARCHIVE_INFO,
} from "../../constants";
import { DialogCategoriesContent } from "./dialog-categories-content";
import { DialogDeleteArchiveContent } from "./dialog-delete-archive-content";
import { DialogViewArchiveInfo } from "./dialog-view-archive-info";
import { DialogUpdateArchiveMetadata } from "./dialog-update-archive-metadata";
import DialogUpdateRating from "./dialog-update-rating";

const DIALOG_CONTENT = {
  [UPDATE_ARCHIVE_CATEGORY]: DialogCategoriesContent,
  [DELETE_ARCHIVE]: DialogDeleteArchiveContent,
  [VIEW_ARCHIVE_INFO]: DialogViewArchiveInfo,
  [UPDATE_ARCHIVE_METADATA]: DialogUpdateArchiveMetadata,
  [UPDATE_ARCHIVE_RATING]: DialogUpdateRating,
};

export const ArchiveActionsDialog = ({ actionType }) => {
  const { setActionType } = useArchiveActionsDialogLogic();
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onClose = () => {
    setActionType("");
  };

  const title = (
    <Grid2 container>
      <Grid2 className="content-center" size="grow">
        <Typography className="capitalize">
          {actionType?.replace(UNDERSCORE_REGEX, " ")}
        </Typography>
      </Grid2>
      <Grid2 size="auto" sx={BUTTON_INHERIT_BACKGROUND}>
        <Button startIcon={<Close />} onClick={onClose} variant="text">
          Close
        </Button>
      </Grid2>
    </Grid2>
  );

  const HomebrewFragment = () => <></>;
  const Content = DIALOG_CONTENT[actionType] ?? HomebrewFragment;
  return (
    <Dialog
      title={title}
      titleId="archive-actions-dialog-title"
      open={!!actionType}
      onClose={onClose}
      fullScreen={isSvp}
      fullWidth
    >
      <Content closeDialog={onClose} />
    </Dialog>
  );
};
