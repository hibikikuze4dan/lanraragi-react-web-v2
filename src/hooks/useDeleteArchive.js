import { useDispatch, useSelector } from "react-redux";
import { getRandomArchives, getSearchArchives } from "../redux/selectors";
import { removeArchiveFromArray } from "../utils/removeArchiveFromArray";
import {
  setRandomArchives,
  updateSearchArchives,
} from "../redux/slices/appSlice";
import { deleteArchive as deleteArchiveRequest } from "../requests/deleteArchive";
import { useSnackbar } from "./useSnackbar";

export const useDeleteArchive = () => {
  const dispatch = useDispatch();
  const { setNewSnackbarStatus } = useSnackbar();
  const searchArchives = useSelector(getSearchArchives);
  const randomArchives = useSelector(getRandomArchives);

  const deleteArchive = (archive) => {
    const archiveId = archive?.arcid;

    if (!archiveId) return;

    deleteArchiveRequest(archiveId).then((response) => {
      if (response?.error || response?.success === 0) {
        const error = response?.error ?? "Sorry, something went wrong";
        setNewSnackbarStatus({ message: error, severity: "error" });
        return;
      }

      const message = "Successfully deleted archive!";
      setNewSnackbarStatus({ message, severity: "success" });

      const newSearchArchives =
        removeArchiveFromArray({ archive, archivesArray: searchArchives }) ??
        searchArchives;
      const newRandomArchives =
        removeArchiveFromArray({ archive, archivesArray: randomArchives }) ??
        randomArchives;

      dispatch(updateSearchArchives(newSearchArchives));
      dispatch(setRandomArchives(newRandomArchives));
    });
  };

  return {
    deleteArchive,
  };
};
