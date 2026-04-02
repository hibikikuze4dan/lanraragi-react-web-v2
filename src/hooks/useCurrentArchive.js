import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  getCurrentArchive,
  getCurrentArchiveFromRandomArchives,
  getCurrentArchiveFromSearchArchives,
  getCurrentArchiveId,
} from "../redux/selectors";
import { getArchiveMetadata } from "../requests/getArchiveMetadata";
import { COMPONENT_IDS } from "../constants";
import {
  updateCurrentArchive,
  updateCurrentArchiveId,
} from "../redux/slices/appSlice";

export const useCurrentArchive = () => {
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const currentArchive = useSelector(getCurrentArchive);
  const searchArchive = useSelector(getCurrentArchiveFromSearchArchives);
  const randomArchive = useSelector(getCurrentArchiveFromRandomArchives);

  const archive = currentArchive ?? searchArchive ?? randomArchive ?? {};

  const setCurrentArchive = useCallback(
    (arcId = "") => {
      getArchiveMetadata({ archiveId: arcId }).then((arcData) => {
        dispatch(updateCurrentArchiveId(arcId));
        dispatch(updateCurrentArchive(arcData));
      });
    },
    [dispatch],
  );

  const getArchiveCardTitleButtonElementFromCurrentArchiveId =
    useCallback(() => {
      const element = document.getElementById(
        COMPONENT_IDS.TITLE_BUTTON(currentArchiveId),
      );
      return element;
    }, [currentArchiveId]);

  return {
    archive,
    currentArchiveId,
    getArchiveCardTitleButtonElementFromCurrentArchiveId,
    setCurrentArchive,
  };
};

export default useCurrentArchive;
