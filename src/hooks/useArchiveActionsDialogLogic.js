import { useDispatch, useSelector } from "react-redux";
import { getDialogActionType } from "../redux/selectors";
import { updateDialogActionType } from "../redux/slices/appSlice";
import { useEffect } from "react";
import { COMPONENT_IDS } from "../constants";

export const useArchiveActionsDialogLogic = ({
  autoFocusCloseButton = true,
}) => {
  const dispatch = useDispatch();
  const dialogActionType = useSelector(getDialogActionType);

  const setActionType = (action) => {
    dispatch(updateDialogActionType(action ?? ""));
  };

  useEffect(() => {
    if (dialogActionType && autoFocusCloseButton) {
      setTimeout(() => {
        const closeButton = document.querySelector(
          `#${COMPONENT_IDS.ARCHIVE_ACTIONS_DIALOG_CLOSE_BUTTON}`
        );

        closeButton?.focus();
      }, 250);
    }
  }, [dialogActionType, autoFocusCloseButton]);

  return {
    dialogActionType,
    setActionType,
  };
};
