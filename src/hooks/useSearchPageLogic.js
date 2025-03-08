import { useDispatch, useSelector } from "react-redux";
import { SEARCH_PARAMETER_DEFAULTS } from "../constants";
import {
  updateCurrentSearchParameters,
  updateLoadingSearchArchives,
  updateSearchData,
} from "../redux/slices/appSlice";
import requestSearchForArchives from "../requests/requestSearchForArchives";
import { getCurrentSearchParameters, getSearchData } from "../redux/selectors";
import { ARCHIVES_RENDERED } from "../local-storage/constants";
import { createLocalStorageInstance } from "../local-storage";
import { useState } from "react";

const { get: getArchivesRendered } =
  createLocalStorageInstance(ARCHIVES_RENDERED);

export const useSearchPageLogic = () => {
  const dispatch = useDispatch();
  const searchData = useSelector(getSearchData);
  const [archivesRendered] = useState(Number(getArchivesRendered() ?? 10));
  const currentSearchParameters = useSelector(getCurrentSearchParameters);
  const recordsFiltered = searchData?.recordsFiltered ?? 0;

  const searchPages = Math.ceil(recordsFiltered / archivesRendered);
  const { start } = currentSearchParameters;

  const currentPage = `${Math.ceil(Number(start) / archivesRendered)}`;
  const previousPage = currentPage === "0" ? "0" : `${Number(currentPage) - 1}`;
  const nextPage =
    currentPage === searchPages ? searchPages : `${Number(currentPage) + 1}`;

  const handleNewSearch = (newSearchParameters = SEARCH_PARAMETER_DEFAULTS) => {
    dispatch(updateCurrentSearchParameters({ ...newSearchParameters }));
    dispatch(updateLoadingSearchArchives(true));
    requestSearchForArchives(newSearchParameters).then((response) => {
      dispatch(updateSearchData(response));
      dispatch(updateLoadingSearchArchives(false));
    });
  };

  return {
    archivesRendered,
    searchPages,
    currentSearchParameters,
    currentPage,
    nextPage,
    previousPage,
    handleNewSearch,
  };
};
