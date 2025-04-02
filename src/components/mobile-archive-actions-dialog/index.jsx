import { Button, Grid2, Typography } from "@mui/material";
import useOpenDialogs from "../../hooks/useOpenDialogs";
import { Dialog } from "../dialog";
import {
  BUTTON_INHERIT_BACKGROUND,
  MORE_ARCHIVE_ACTIONS,
  REGENERATE_ARCHIVE_THUMBNAIL,
  UNDERSCORE_REGEX,
} from "../../constants";
import { ARCHIVE_ACTION_ICONS } from "../constants";
import { useArchiveActionsDialogLogic } from "../../hooks/useArchiveActionsDialogLogic";
import { useRegenerateThumbnail } from "../../hooks/useRegenerateThumbnail";
import { useCurrentArchive } from "../../hooks/useCurrentArchive";
import Close from "@mui/icons-material/Close";

export const MobileArchiveActionsDialog = () => {
  const { openDialogs, changeDialogState } = useOpenDialogs();
  const { setActionType } = useArchiveActionsDialogLogic();
  const { regenerateThumbnail } = useRegenerateThumbnail();
  const { archive } = useCurrentArchive();

  const archiveId = archive?.arcid ?? "";
  const { mobileActions: isMobileActionsDialogOpen } = openDialogs;

  const onClose = () => {
    changeDialogState({ dialogKey: "mobileActions", isOpen: false });
  };

  const onClickFactory = (action) => () => {
    if (action === REGENERATE_ARCHIVE_THUMBNAIL) {
      regenerateThumbnail({ archiveId });
    } else {
      setActionType(action ?? "");
    }
    onClose();
  };

  const title = (
    <Grid2 container>
      <Grid2 className="content-center" size="grow">
        <Typography className="capitalize">Archive Actions</Typography>
      </Grid2>
      <Grid2 size="auto" sx={BUTTON_INHERIT_BACKGROUND}>
        <Button startIcon={<Close />} onClick={onClose} variant="text">
          Close
        </Button>
      </Grid2>
    </Grid2>
  );

  return (
    <Dialog
      title={title}
      titleId="mobile-archive-actions-dialog-title"
      open={!!isMobileActionsDialogOpen}
      onClose={onClose}
      // fullWidth
    >
      <Grid2 className="pt-5" container spacing={4}>
        {MORE_ARCHIVE_ACTIONS.map((action) => {
          const onClick = onClickFactory(action);
          const IconComponent = ARCHIVE_ACTION_ICONS?.[action] ?? Error;

          return (
            <Grid2 key={action} size={{ xs: 12, sm: 6 }}>
              <Button
                id={`mobile-archive-dialog-item-${action}`}
                className="capitalize min-h-[44px]"
                fullWidth
                onClick={onClick}
                variant="outlined"
              >
                <Grid2 container spacing={2}>
                  <Grid2 alignContent="center" size="auto">
                    <IconComponent />
                  </Grid2>
                  <Grid2 size="grow">
                    {action?.replace(UNDERSCORE_REGEX, " ")}
                  </Grid2>
                </Grid2>
              </Button>
            </Grid2>
          );
        })}
      </Grid2>
    </Dialog>
  );
};
