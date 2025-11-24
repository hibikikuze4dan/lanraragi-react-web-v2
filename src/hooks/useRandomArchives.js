import { useDispatch, useSelector } from "react-redux";
import {
  getLoadingRandomArchives,
  getRandomArchives,
  shouldMakeInitialRandomArchivesRequest,
} from "../redux/selectors";
import {
  setRandomArchives,
  updateFocusFirstArchiveCard,
  updateInitialLoadRandom,
  updateLoadingRandomArchives,
} from "../redux/slices/appSlice";
import requestRandomArchives from "../requests/requestRandomArchives";
import { useCallback, useEffect, useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { ARCHIVES_RENDERED } from "../local-storage/constants";

const { get: getArchivesRendered } =
  createLocalStorageInstance(ARCHIVES_RENDERED);

export const useRandomArchives = () => {
  const dispatch = useDispatch();
  const randomArchives = useSelector(getRandomArchives);
  const loadingRandomArchives = useSelector(getLoadingRandomArchives);
  const makeInitialRandomArchivesRequest = useSelector(
    shouldMakeInitialRandomArchivesRequest
  );
  const [requestNewArchives, setRequestNewArchives] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      const archivesRendered = Number(getArchivesRendered() ?? 10);
      if (makeInitialRandomArchivesRequest) {
        dispatch(updateLoadingRandomArchives(true));
        dispatch(updateInitialLoadRandom(false));
        requestRandomArchives(archivesRendered).then((archives) => {
          dispatch(setRandomArchives(archives));
          dispatch(updateLoadingRandomArchives(false));
        });
      } else if (requestNewArchives) {
        setRequestNewArchives(false);
        dispatch(updateLoadingRandomArchives(true));
        requestRandomArchives(archivesRendered).then((archives) => {
          dispatch(setRandomArchives(archives));
          dispatch(updateLoadingRandomArchives(false));
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, [dispatch, makeInitialRandomArchivesRequest, requestNewArchives]);

  const getNewRandomArchives = useCallback(() => {
    dispatch(updateFocusFirstArchiveCard(true));
    setRequestNewArchives(true);
  }, [dispatch]);

  return { randomArchives, loadingRandomArchives, getNewRandomArchives };
};
