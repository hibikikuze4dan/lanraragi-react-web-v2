import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { Button, Grid2 } from "@mui/material";
import useTransitionButtonsLogic from "./useTransitionButtonsLogic";
import {
  COMPONENT_CLASSNAMES,
  COMPONENT_IDS,
  RETURN_NULL,
} from "../../../constants";
import clsx from "clsx";

export const TransitionButtons = ({
  gridSize = 12,
  setCurrentPageIndex = RETURN_NULL,
  onButtonKeyDown = RETURN_NULL,
}) => {
  const { onReadButtonClick, shouldNotRender } = useTransitionButtonsLogic({
    setCurrentPageIndex,
  });

  return shouldNotRender ? null : (
    <>
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          className={clsx(
            "py-4 h-full",
            COMPONENT_CLASSNAMES.END_OF_ARCHIVE_BUTTON
          )}
          id={COMPONENT_IDS.END_OF_ARCHIVE_BUTTON_PREVIOUS}
          onClick={onReadButtonClick(false)}
          onKeyDown={onButtonKeyDown}
          startIcon={<NavigateBefore />}
          variant="outlined"
        >
          Previous Archive
        </Button>
      </Grid2>
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          className={clsx(
            "py-4 h-full",
            COMPONENT_CLASSNAMES.END_OF_ARCHIVE_BUTTON
          )}
          id={COMPONENT_IDS.END_OF_ARCHIVE_BUTTON_NEXT}
          onClick={onReadButtonClick(true)}
          onKeyDown={onButtonKeyDown}
          startIcon={<NavigateNext />}
          variant="outlined"
        >
          Next Archive
        </Button>
      </Grid2>
    </>
  );
};

export default TransitionButtons;
