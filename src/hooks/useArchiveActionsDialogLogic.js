import { useDispatch, useSelector } from "react-redux";
import { getDialogActionType } from "../redux/selectors";
import { updateDialogActionType } from "../redux/slices/appSlice";

export const useArchiveActionsDialogLogic = () => {
  const dispatch = useDispatch();
  const dialogActionType = useSelector(getDialogActionType);

  const setActionType = (action) => {
    dispatch(updateDialogActionType(action ?? ""));
  };

  return {
    dialogActionType,
    setActionType,
  };
};
