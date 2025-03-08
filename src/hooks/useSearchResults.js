import { useEffect, useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { ARCHIVES_RENDERED } from "../local-storage/constants";
import {
  getInitialLoadSearch,
  getLoadingSearchArchives,
  getRandomArchives,
  getSearchData,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInitialLoadSearch,
  updateLoadingSearchArchives,
  updateSearchData,
} from "../redux/slices/appSlice";
import requestSearchForArchives from "../requests/requestSearchForArchives";

const { get: getArchivesRendered } =
  createLocalStorageInstance(ARCHIVES_RENDERED);

export const useSearchResults = ({ initLoad = false } = {}) => {
  const dispatch = useDispatch();
  const searchData = useSelector(getSearchData);
  const [archivesRendered] = useState(Number(getArchivesRendered() ?? 10));
  const archives = [...(searchData?.data ?? [])].slice(0, archivesRendered);
  const loadingSearchArchives = useSelector(getLoadingSearchArchives);
  const randomArchives = useSelector(getRandomArchives);
  const initialLoadSearch = useSelector(getInitialLoadSearch);

  const makeInitialSearch =
    initLoad &&
    initialLoadSearch &&
    randomArchives.length &&
    !searchData?.data?.length;

  useEffect(() => {
    if (makeInitialSearch) {
      dispatch(updateLoadingSearchArchives(true));
      dispatch(updateInitialLoadSearch(false));
      requestSearchForArchives({}).then((response) => {
        dispatch(updateSearchData(response));
        dispatch(updateLoadingSearchArchives(false));
      });
    }
  }, [makeInitialSearch, dispatch]);

  return {
    archives,
    loadingSearchArchives,
    searchData,
  };
};
