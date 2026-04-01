import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import {
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
  const searchArchive = useSelector(getCurrentArchiveFromSearchArchives);
  const randomArchive = useSelector(getCurrentArchiveFromRandomArchives);

  const [archive, setArchive] = useState(searchArchive ?? randomArchive ?? {});

  const setCurrentArchive = useCallback(
    (arcId = "") => {
      getArchiveMetadata({ archiveId: arcId }).then((arcData) => {
        setArchive(arcData);
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
    setArchive,
    setCurrentArchive,
  };
};

export default useCurrentArchive;
