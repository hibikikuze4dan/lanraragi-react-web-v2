import { Alert, Snackbar as MUISnackbar } from "@mui/material";
import { useSnackbar } from "../../hooks/useSnackbar";

export const Snackbar = () => {
  const { clearSnackBarStatus, snackbarStatus } = useSnackbar();

  const { severity, message } = snackbarStatus ?? {};

  const onClose = () => {
    clearSnackBarStatus();
  };

  return (
    <MUISnackbar
      className="lrr-react-web-snackbar"
      open={!!message}
      autoHideDuration={4000}
      resumeHideDuration={4000}
      disableWindowBlurListener
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert severity={severity} variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </MUISnackbar>
  );
};
