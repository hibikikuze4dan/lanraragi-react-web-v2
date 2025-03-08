import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentArchiveFromRandomArchives,
  getCurrentArchiveFromSearchArchives,
  getRandomArchives,
  getSearchArchives,
} from "../redux/selectors";
import { replaceRating } from "../utils/replaceRating";
import { putUpdateToArchiveMetadata } from "../requests/putUpdateToArchiveMetadata";
import { useState } from "react";
import {
  updateSearchArchives,
  setRandomArchives,
} from "../redux/slices/appSlice";
import { updateArchiveTags } from "../utils/updateArchiveTags";
import { updateArchiveInArray } from "../utils/updateArchiveInArray";

export const useArchiveRating = () => {
  const dispatch = useDispatch();
  const searchArchives = useSelector(getSearchArchives);
  const randomArchives = useSelector(getRandomArchives);
  const searchArchive = useSelector(getCurrentArchiveFromSearchArchives);
  const randomArchive = useSelector(getCurrentArchiveFromRandomArchives);
  const [updateRatingResponse, setUpdateRatingResponse] = useState({});

  const archive = searchArchive ?? randomArchive ?? {};
  const { tags, arcid } = archive;

  const updateArchiveRating = async (newRating) => {
    const newTags = replaceRating({ tags: tags ?? "", newRating });

    if (!newTags) {
      return;
    }

    putUpdateToArchiveMetadata({ archiveId: arcid, tags: newTags }).then(
      (response) => {
        setUpdateRatingResponse(response);
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
    updateRatingResponse,
  };
};
