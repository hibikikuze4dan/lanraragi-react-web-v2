import { useEffect } from "react";
import Label from "@mui/icons-material/Label";
import Star from "@mui/icons-material/Star";
import Image from "@mui/icons-material/Image";

import {
  COMPONENT_CLASSNAMES,
  COMPONENT_IDS,
  KEYBOARD_KEY_CODES,
  PAGE_ICONS,
  RETURN_NULL,
  SINGLE_PAGE_VIEW_MODE,
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_RATING,
} from "../constants";
import { Grid2 } from "@mui/material";
import { updateDisplayAppBar } from "../redux/slices/appSlice";
import { useArchiveActionsDialogLogic } from "./useArchiveActionsDialogLogic";
import { useDispatch } from "react-redux";
import useAppPages from "./useAppPages";
import { IMAGES_VIEW_MODE } from "../local-storage/constants";
import { createLocalStorageInstance } from "../local-storage";
import getWrappedArrayIndex from "../utils/getWrappedArrayIndex";

const { get: getImagesViewMode } = createLocalStorageInstance(IMAGES_VIEW_MODE);

const {
  END_OF_ARCHIVE_BUTTON_CATEGORIZE,
  END_OF_ARCHIVE_BUTTON_LAST_IMAGE,
  END_OF_ARCHIVE_BUTTON_ARCHIVES,
  END_OF_ARCHIVE_BUTTON_RATE,
} = COMPONENT_IDS;

export const useEndOfArchiveButtons = (
  { onBackToLastImage } = { onBackToLastImage: RETURN_NULL }
) => {
  const dispatch = useDispatch();
  const { setActionType } = useArchiveActionsDialogLogic();
  const { updateAppPage, archiveOpenedFrom } = useAppPages();
  const isSingleImageMode = getImagesViewMode() === SINGLE_PAGE_VIEW_MODE;
  const gridSize = isSingleImageMode ? 6 : 12;

  const onReturnClick = () => {
    dispatch(updateDisplayAppBar(true));
    updateAppPage(archiveOpenedFrom);
  };

  const ReturnToIcon = PAGE_ICONS[archiveOpenedFrom] ?? Grid2;

  const buttonsData = [
    {
      icon: Label,
      id: END_OF_ARCHIVE_BUTTON_CATEGORIZE,
      label: "Categorize Archive",
      onClick: () => setActionType(UPDATE_ARCHIVE_CATEGORY),
    },
    {
      icon: Star,
      id: END_OF_ARCHIVE_BUTTON_RATE,
      label: "Rate Archive",
      onClick: () => setActionType(UPDATE_ARCHIVE_RATING),
    },
    ...(isSingleImageMode
      ? [
          {
            icon: Image,
            id: END_OF_ARCHIVE_BUTTON_LAST_IMAGE,
            label: "Back to Last Image",
            onClick: onBackToLastImage,
          },
        ]
      : []),
    {
      icon: ReturnToIcon,
      id: END_OF_ARCHIVE_BUTTON_ARCHIVES,
      label: `Return to ${archiveOpenedFrom}`,
      onClick: onReturnClick,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const firstEndOfArchiveButton = document.querySelector(
        `.${COMPONENT_CLASSNAMES.END_OF_ARCHIVE_BUTTON}`
      );
      if (firstEndOfArchiveButton && isSingleImageMode) {
        firstEndOfArchiveButton?.focus();
      }
    }, 125);
  }, [isSingleImageMode]);

  const onButtonKeyDown = (event) => {
    const eventCode = event?.code;
    const buttons = Array.from(
      document.querySelectorAll(
        `.${COMPONENT_CLASSNAMES.END_OF_ARCHIVE_BUTTON}`
      )
    );

    const currentButtonIndex = buttons?.findIndex(
      (element) => element?.id === event?.target?.id
    );

    let targetedIndex;
    if (KEYBOARD_KEY_CODES.ARROW_LEFT === eventCode) {
      targetedIndex = getWrappedArrayIndex(buttons, currentButtonIndex - 1);
    } else if (KEYBOARD_KEY_CODES.ARROW_RIGHT === eventCode) {
      targetedIndex = getWrappedArrayIndex(buttons, currentButtonIndex + 1);
    }
    buttons?.[targetedIndex]?.focus();
  };

  return {
    buttonsData,
    gridSize,
    isSingleImageMode,
    onButtonKeyDown,
  };
};

export default useEndOfArchiveButtons;
