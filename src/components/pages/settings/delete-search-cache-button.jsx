import { Button, Grid2, Typography } from "@mui/material";
import deleteSearchCache from "../../../requests/deleteSearchCache";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Dialog } from "../../dialog";
import { useState } from "react";

export const DeleteSearchCacheButton = () => {
  const { setNewSnackbarStatus } = useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const onAcceptanceClick = () => {
    deleteSearchCache().then((response) => {
      if (response?.success || response?.successMessage) {
        setNewSnackbarStatus({
          severity: "success",
          message: "Successfully reset search cache!",
        });
      } else {
        setNewSnackbarStatus({
          severity: "error",
          message:
            "Something went wrong while trying to reset the search cache!",
        });
      }
    });
    onDialogClose();
  };

  const onDenialClick = () => {
    onDialogClose();
  };

  return (
    <>
      <Button
        className="min-h-[44px]"
        variant="outlined"
        onClick={onDeleteClick}
      >
        Delete Search Cache
      </Button>
      <Dialog
        title="Delete Search Cache"
        titleId="delete-search-cache-dialog-title"
        open={!!isDialogOpen}
        onClose={onDialogClose}
        fullWidth
      >
        <Grid2 container justifyContent="center">
          <Typography className="text-xl font-bold pb-5" align="center">
            Are you sure you want to delete the search cache?
          </Typography>
          <Grid2 size={12}>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <Button
                  className="h-full"
                  fullWidth
                  variant="outlined"
                  onClick={onAcceptanceClick}
                >
                  Yes, Delete Search Cache
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
      </Dialog>
    </>
  );
};
