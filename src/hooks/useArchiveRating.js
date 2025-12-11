import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentArchiveFromRandomArchives,
  getCurrentArchiveFromSearchArchives,
  getRandomArchives,
  getSearchArchives,
} from "../redux/selectors";
import { replaceRating } from "../utils/replaceRating";
import { putUpdateToArchiveMetadata } from "../requests/putUpdateToArchiveMetadata";
import {
  updateSearchArchives,
  setRandomArchives,
} from "../redux/slices/appSlice";
import { updateArchiveTags } from "../utils/updateArchiveTags";
import { updateArchiveInArray } from "../utils/updateArchiveInArray";
import { useSnackbar } from "./useSnackbar";
import useCurrentArchive from "./useCurrentArchive";

export const useArchiveRating = () => {
  const dispatch = useDispatch();
  const { setNewSnackbarStatus } = useSnackbar();
  const { archive } = useCurrentArchive();
  const searchArchives = useSelector(getSearchArchives);
  const randomArchives = useSelector(getRandomArchives);
  const searchArchive = useSelector(getCurrentArchiveFromSearchArchives);
  const randomArchive = useSelector(getCurrentArchiveFromRandomArchives);

  const { tags, arcid } = archive;

  const onArchiveMetadataUpdateResponse = (response = {}) => {
    const { error, successMessage } = response;

    if (error || response === 0) {
      setNewSnackbarStatus({
        severity: "error",
        message:
          "Something went wrong while trying to update the archives categories",
      });
    } else {
      setNewSnackbarStatus({
        severity: "success",
        message: successMessage.replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
      });
    }
  };

  const updateArchiveRating = async (newRating) => {
    const newTags = replaceRating({ tags: tags ?? "", newRating });

    if (!newTags) {
      return;
    }

    putUpdateToArchiveMetadata({ archiveId: arcid, tags: newTags }).then(
      (response) => {
        onArchiveMetadataUpdateResponse(response);
        const archiveWithNewTags = updateArchiveTags({
          tags: newTags,
          archive,
        });

        if (searchArchive) {
          const updatedSearchArchives =
            updateArchiveInArray({
              archive: archiveWithNewTags,
              archivesArray: searchArchives,
            }) ?? searchArchives;
          dispatch(updateSearchArchives(updatedSearchArchives));
        }
        if (randomArchive) {
          const updatedRandomArchives =
            updateArchiveInArray({
              archive: archiveWithNewTags,
              archivesArray: randomArchives,
            }) ?? randomArchives;
          dispatch(setRandomArchives(updatedRandomArchives));
        }
      }
    );
  };

  return {
    updateArchiveRating,
  };
};
