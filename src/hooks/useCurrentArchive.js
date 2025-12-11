import { useSelector } from "react-redux";
import { useState } from "react";
import {
  getCurrentArchiveFromRandomArchives,
  getCurrentArchiveFromSearchArchives,
  getCurrentArchiveId,
} from "../redux/selectors";
import { getArchiveMetadata } from "../requests/getArchiveMetadata";

export const useCurrentArchive = () => {
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const searchArchive = useSelector(getCurrentArchiveFromSearchArchives);
  const randomArchive = useSelector(getCurrentArchiveFromRandomArchives);

  const [archive, setArchive] = useState(searchArchive ?? randomArchive ?? {});

  const emptyArchiveObject = Object.keys(archive).length === 0;

  if (!archive || emptyArchiveObject) {
    getArchiveMetadata({ archiveId: currentArchiveId }).then((archiveData) => {
      setArchive(archiveData);
    });
  }

  return {
    archive,
    currentArchiveId,
  };
};

export default useCurrentArchive;
