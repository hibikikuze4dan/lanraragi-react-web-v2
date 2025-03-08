import { Box, Button, Grid2, Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import useCurrentArchive from "../../hooks/useCurrentArchive";
import { useDeleteArchive } from "../../hooks/useDeleteArchive";

export const DialogDeleteArchiveContent = ({ closeDialog = () => null }) => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { archive } = useCurrentArchive();
  const { deleteArchive } = useDeleteArchive();

  const onAcceptanceClick = () => {
    deleteArchive(archive);
    closeDialog();
  };

  const onDenialClick = () => {
    closeDialog();
  };

  return (
    <Box
      id="dialog-content-categories-update"
      className={clsx("w-full py-4", isSvp && "pt-40")}
    >
      <Grid2 container>
        <Grid2 size={12}>
          <Typography className="text-xl font-bold" align="center">
            Are you sure you want to delete the following archive:
          </Typography>
          <Typography gutterBottom align="center">
            {archive?.title}
          </Typography>
          <Typography className="text-xl font-bold my-5" align="center">
            This will remove the archive from both your LANraragi database and
            from your filesystem.
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <Button
                className="h-full"
                fullWidth
                variant="outlined"
                onClick={onAcceptanceClick}
              >
                Yes, Delete Archive
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button
                className="h-full"
                fullWidth
                variant="outlined"
                onClick={onDenialClick}
              >
                No, Go Back
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};
