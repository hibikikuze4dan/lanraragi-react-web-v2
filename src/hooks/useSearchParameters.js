import { useCallback } from "react";
import { updateSearchParameters } from "../redux/slices/appSlice";
import { getSearchParameters } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

export const useSearchParameters = () => {
  const dispatch = useDispatch();
  const searchParameters = useSelector(getSearchParameters);

  const handleUpdateSearchParameters = useCallback(
    (parameters = {}) => {
      dispatch(
        updateSearchParameters({ ...searchParameters, ...(parameters ?? {}) })
      );
    },
    [dispatch, searchParameters]
  );

  return {
    searchParameters,
    handleUpdateSearchParameters,
  };
};
