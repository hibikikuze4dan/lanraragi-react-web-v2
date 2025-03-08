import { useSnackbar } from "./useSnackbar";
import { putUpdateThumbnail } from "../requests/putUpdateThumbnail";

export const useRegenerateThumbnail = () => {
  const { setNewSnackbarStatus } = useSnackbar();

  const regenerateThumbnail = ({ archiveId, page = 1 }) => {
    if (!archiveId) {
      return setNewSnackbarStatus({
        message: "No archive id supplied, cannot regenerate thumbnail!",
        severity: "error",
      });
    }

    putUpdateThumbnail({ archiveId, page }).then((response) => {
      if (response.error || response.success === 0) {
        return setNewSnackbarStatus({
          message: "Something went wrong while trying to update the thumbnail",
          severity: "error",
        });
      }

      setNewSnackbarStatus({
        message: "Successfully regenerated the thumbnail!",
        severity: "success",
      });
    });
  };

  return { regenerateThumbnail };
};
