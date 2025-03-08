import { useSelector } from "react-redux";
import {
  getCurrentArchiveFromRandomArchives,
  getCurrentArchiveFromSearchArchives,
  getCurrentArchiveId,
} from "../redux/selectors";

export const useCurrentArchive = () => {
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const searchArchive = useSelector(getCurrentArchiveFromSearchArchives);
  const randomArchive = useSelector(getCurrentArchiveFromRandomArchives);

  const archive = searchArchive ?? randomArchive;

  return {
    archive,
    currentArchiveId,
  };
};

export default useCurrentArchive;
