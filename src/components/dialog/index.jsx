import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MUIDialog,
} from "@mui/material";

export const Dialog = ({
  title = "",
  titleId = "",
  open = false,
  children,
  fullScreen = false,
  fullWidth = false,
  maxWidth = "xl",
  onClose,
  scroll = "paper",
  actionsContent,
}) => {
  return (
    <MUIDialog
      aria-labelledby={titleId}
      className="lrr-react-web-dialog"
      open={open}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={onClose}
      scroll={scroll}
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actionsContent && <DialogActions>{actionsContent}</DialogActions>}
    </MUIDialog>
  );
};
