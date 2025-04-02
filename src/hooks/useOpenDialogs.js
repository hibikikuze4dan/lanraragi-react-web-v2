import { useDispatch, useSelector } from "react-redux";
import { getOpenDialogs } from "../redux/selectors";
import { useCallback } from "react";
import { updateOpenDialogs } from "../redux/slices/appSlice";

export const useOpenDialogs = () => {
  const dispatch = useDispatch();
  const openDialogs = useSelector(getOpenDialogs);

  const changeDialogState = useCallback(
    ({ dialogKey, isOpen }) => {
      if (dialogKey) {
        dispatch(updateOpenDialogs({ [dialogKey]: !!isOpen }));
      }
    },
    [dispatch]
  );

  return {
    openDialogs,
    changeDialogState,
  };
};

export default useOpenDialogs;
