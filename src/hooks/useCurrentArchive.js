import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  getCurrentArchive,
  getCurrentArchiveFromRandomArchives,
  getCurrentArchiveFromSearchArchives,
  getCurrentArchiveId,
} from "../redux/selectors";
import { getArchiveMetadata } from "../requests/getArchiveMetadata";
import { COMPONENT_IDS } from "../constants";
import { updateCurrentArchive } from "../redux/slices/appSlice";

export const useCurrentArchive = () => {
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const searchArchive = useSelector(getCurrentArchiveFromSearchArchives);
  const randomArchive = useSelector(getCurrentArchiveFromRandomArchives);
  const currentArchive = useSelector(getCurrentArchive);

  const [archive, setArchive] = useState(searchArchive ?? randomArchive ?? {});

  const emptyArchiveObject = Object.keys(archive).length === 0;
  const currentArchiveIdMatchesCurrentArchive =
    currentArchive?.arcid === currentArchiveId;

  useEffect(() => {
    if ((!archive || emptyArchiveObject) && currentArchiveId) {
      if (currentArchiveIdMatchesCurrentArchive) {
        setArchive(currentArchive);
      } else {
        getArchiveMetadata({ archiveId: currentArchiveId }).then(
          (archiveData) => {
            setArchive(archiveData);
            dispatch(updateCurrentArchive(archiveData));
          },
        );
      }
    }
  }, [
    archive,
    currentArchive,
    currentArchiveId,
    currentArchiveIdMatchesCurrentArchive,
    dispatch,
    emptyArchiveObject,
  ]);

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
  };
};

export default useCurrentArchive;
