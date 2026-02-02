import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { COMPONENT_IDS } from "../constants";
import { updateFocusFirstArchiveCard } from "../redux/slices/appSlice";

export const useArchiveFocusLogic = () => {
  const dispatch = useDispatch();

  const setFocusArchiveCardTitle = useCallback(
    (bool = true) => {
      dispatch(updateFocusFirstArchiveCard(bool));
    },
    [dispatch],
  );

  const focusArchiveCardTitle = useCallback(
    (archiveId) => {
      if (!archiveId) {
        return;
      }

      const element = document.getElementById(
        COMPONENT_IDS.TITLE_BUTTON(archiveId),
      );

      element?.focus?.({ preventScroll: true });
      dispatch(updateFocusFirstArchiveCard(false));
    },
    [dispatch],
  );

  return {
    focusArchiveCardTitle,
    setFocusArchiveCardTitle,
  };
};

export default useArchiveFocusLogic;
