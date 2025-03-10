import { createLocalStorageInstance } from "../local-storage";
import { LAST_SEARCH } from "../local-storage/constants";
import { SEARCH_PARAMETER_DEFAULTS } from "../constants";
import { updateLastSearch as updateLastSearchRedux } from "../redux/slices/appSlice";
import { getLastSearch as getLastSearchRedux } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

const { set: setLastSearch } = createLocalStorageInstance(LAST_SEARCH);

const defaultParametersAsString = JSON.stringify(SEARCH_PARAMETER_DEFAULTS);

export const useLastSearch = () => {
  const dispatch = useDispatch();
  const lastSearch = useSelector(getLastSearchRedux);

  const updateLastSearch = (searchParameters) => {
    if (!searchParameters) {
      return null;
    }

    try {
      const newLastSearch = JSON.stringify(searchParameters);

      setLastSearch(newLastSearch);
      dispatch(updateLastSearchRedux(newLastSearch));
    } catch {
      setLastSearch(defaultParametersAsString);
      dispatch(updateLastSearchRedux(defaultParametersAsString));
    }

    return null;
  };

  const lastSearchAsString = `${lastSearch}`;
  const lastSearchAsJSON = JSON.parse(`${lastSearch}`);

  return {
    lastSearchAsJSON,
    lastSearchAsString,
    updateLastSearch,
  };
};

export default useLastSearch;
