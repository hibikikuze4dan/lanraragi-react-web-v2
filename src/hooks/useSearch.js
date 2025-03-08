import { useDispatch } from "react-redux";
import requestSearchForArchives from "../requests/requestSearchForArchives";
import {
  updateCurrentSearchParameters,
  updateLoadingSearchArchives,
  updateSearchData,
} from "../redux/slices/appSlice";
import { SEARCH_PARAMETER_DEFAULTS } from "../constants";

export const useSearch = () => {
  const dispatch = useDispatch();

  const handleNewSearch = (newSearchParameters = SEARCH_PARAMETER_DEFAULTS) => {
    dispatch(updateCurrentSearchParameters({ ...newSearchParameters }));
    dispatch(updateLoadingSearchArchives(true));
    requestSearchForArchives(newSearchParameters).then((response) => {
      dispatch(updateSearchData(response));
      dispatch(updateLoadingSearchArchives(false));
    });
  };

  return {
    handleNewSearch,
  };
};
