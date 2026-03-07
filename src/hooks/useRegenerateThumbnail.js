import { useSnackbar } from "./useSnackbar";
import { putUpdateThumbnail } from "../requests/putUpdateThumbnail";
import { SNACKBAR_MESSAGES } from "../constants";

export const useRegenerateThumbnail = () => {
  const { setNewSnackbarStatus } = useSnackbar();

  const regenerateThumbnail = ({ archiveId, page = 1 }) => {
    if (!archiveId) {
      return setNewSnackbarStatus({
        message: SNACKBAR_MESSAGES.REGENERATE_THUMBNAIL_NO_ID,
        severity: "error",
      });
    }

    putUpdateThumbnail({ archiveId, page }).then((response) => {
      if (response.error || response.success === 0) {
        return setNewSnackbarStatus({
          message: SNACKBAR_MESSAGES.REGENERATE_THUMBNAIL_ERROR,
          severity: "error",
        });
      }

      setNewSnackbarStatus({
        message: SNACKBAR_MESSAGES.REGENERATE_THUMBNAIL_SUCCESS,
        severity: "success",
      });
    });
  };

  return { regenerateThumbnail };
};
