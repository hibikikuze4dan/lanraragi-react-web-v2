import { useState } from "react";
import useCurrentArchive from "./useCurrentArchive";
import { putUpdateToArchiveMetadata } from "../requests/putUpdateToArchiveMetadata";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "./useSnackbar";
import { updateArchiveInArray } from "../utils/updateArchiveInArray";
import { getRandomArchives, getSearchArchives } from "../redux/selectors";
import {
  setRandomArchives,
  updateSearchArchives,
} from "../redux/slices/appSlice";

export const useUpdateArchiveMetadata = () => {
  const dispatch = useDispatch();
  const { archive } = useCurrentArchive();
  const searchArchives = useSelector(getSearchArchives);
  const randomArchives = useSelector(getRandomArchives);
  const { setNewSnackbarStatus } = useSnackbar();
  const {
    arcid: archiveId,
    title: archiveTitle,
    tags: archiveTags,
    summary: archiveSummary,
  } = archive;

  const [tags, updateTags] = useState(archiveTags ?? "");
  const [title, updateTitle] = useState(archiveTitle ?? "");
  const [summary, updateSummary] = useState(archiveSummary ?? "");

  const updateMetadata = () => {
    console.log(tags, title, summary, archiveId, putUpdateToArchiveMetadata);
    putUpdateToArchiveMetadata({ archiveId, title, tags, summary }).then(
      (resposne) => {
        if (resposne.error || resposne.success === 0) {
          return setNewSnackbarStatus({
            message:
              "Something went wrong while trying to update the metadata for the archive!",
            severity: "error",
          });
        }

        const updatedArchive = { ...archive, tags, title, summary };

        const newSearchArchives =
          updateArchiveInArray({
            archive: updatedArchive,
            archivesArray: searchArchives,
          }) ?? searchArchives;
        const newRandomArchives =
          updateArchiveInArray({
            archive: updatedArchive,
            archivesArray: randomArchives,
          }) ?? randomArchives;

        dispatch(updateSearchArchives(newSearchArchives));
        dispatch(setRandomArchives(newRandomArchives));

        return setNewSnackbarStatus({
          message: "Successfully updated archive metadata!",
          severity: "success",
        });
      }
    );
  };

  return {
    tags,
    title,
    summary,
    updateMetadata,
    updateTags,
    updateTitle,
    updateSummary,
  };
};
