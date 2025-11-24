import { Grid2 } from "@mui/material";
import clsx from "clsx";
import {
  COMPONENT_CLASSNAMES,
  PAGE_ICONS,
  RETURN_NULL,
  SINGLE_PAGE_VIEW_MODE,
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_RATING,
} from "../../constants";
import { useDispatch } from "react-redux";
import Label from "@mui/icons-material/Label";
import Star from "@mui/icons-material/Star";
import { useArchiveActionsDialogLogic } from "../../hooks/useArchiveActionsDialogLogic";
import useAppPages from "../../hooks/useAppPages";
import { updateDisplayAppBar } from "../../redux/slices/appSlice";
import Image from "@mui/icons-material/Image";
import { IMAGES_VIEW_MODE } from "../../local-storage/constants";
import { createLocalStorageInstance } from "../../local-storage";
import TransitionButtons from "./transition-buttons";
import EndOfArchiveButtonsFactory from "./button-factory";
import { useEffect } from "react";

const { get: getImagesViewMode } = createLocalStorageInstance(IMAGES_VIEW_MODE);

export const EndOfArchiveActionButtons = ({
  previousImage = RETURN_NULL,
  setCurrentPageIndex = RETURN_NULL,
}) => {
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
      label: "Categorize Archive",
      onClick: () => setActionType(UPDATE_ARCHIVE_CATEGORY),
    },
    {
      icon: Star,
      label: "Rate Archive",
      onClick: () => setActionType(UPDATE_ARCHIVE_RATING),
    },
    ...(isSingleImageMode
      ? [{ icon: Image, label: "Back to Last Image", onClick: previousImage }]
      : []),
    {
      icon: ReturnToIcon,
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

  return (
    <Grid2
      id="end-of-archive-buttons"
      className={clsx("pt-20 pb-100", !isSingleImageMode && "px-10")}
      justifyContent="center"
      container
      spacing={4}
    >
      <EndOfArchiveButtonsFactory
        gridSize={gridSize}
        buttonsData={buttonsData}
      />
      <TransitionButtons
        setCurrentPageIndex={setCurrentPageIndex}
        gridSize={gridSize}
      />
    </Grid2>
  );
};

export default EndOfArchiveActionButtons;
