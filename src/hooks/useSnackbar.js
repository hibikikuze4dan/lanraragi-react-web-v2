import { useDispatch, useSelector } from "react-redux";
import { getSnackbarStatus } from "../redux/selectors";
import { updateSnackbarStatus } from "../redux/slices/appSlice";

export const useSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarStatus = useSelector(getSnackbarStatus);

  const clearSnackBarStatus = () => {
    dispatch(updateSnackbarStatus({}));
  };

  const setNewSnackbarStatus = ({ message, severity }) => {
    dispatch(updateSnackbarStatus({ message, severity }));
  };

  return {
    clearSnackBarStatus,
    setNewSnackbarStatus,
    snackbarStatus,
  };
};
