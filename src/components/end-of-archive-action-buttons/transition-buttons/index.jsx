import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { Button, Grid2 } from "@mui/material";
import useTransitionButtonsLogic from "./useTransitionButtonsLogic";
import { COMPONENT_CLASSNAMES, RETURN_NULL } from "../../../constants";
import clsx from "clsx";

export const TransitionButtons = ({
  gridSize = 12,
  setCurrentPageIndex = RETURN_NULL,
}) => {
  const { onReadButtonClick, shouldNotRender } = useTransitionButtonsLogic({
    setCurrentPageIndex,
  });

  return shouldNotRender ? null : (
    <>
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          variant="outlined"
          className={clsx(
            "py-4 h-full",
            COMPONENT_CLASSNAMES.END_OF_ARCHIVE_BUTTON
          )}
          onClick={onReadButtonClick(false)}
          startIcon={<NavigateBefore />}
        >
          Previous Archive
        </Button>
      </Grid2>
      <Grid2 size={gridSize}>
        <Button
          fullWidth
          variant="outlined"
          className={clsx(
            "py-4 h-full",
            COMPONENT_CLASSNAMES.END_OF_ARCHIVE_BUTTON
          )}
          onClick={onReadButtonClick(true)}
          startIcon={<NavigateNext />}
        >
          Next Archive
        </Button>
      </Grid2>
    </>
  );
};

export default TransitionButtons;
