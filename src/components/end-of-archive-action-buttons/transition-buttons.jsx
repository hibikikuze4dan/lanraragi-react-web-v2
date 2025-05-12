import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { Button, Grid2 } from "@mui/material";
import useTransitionButtonsLogic from "./transition-buttons/useTransitionButtonsLogic";
import { RETURN_NULL } from "../../constants";

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
          className="py-4 h-full"
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
          className="py-4 h-full"
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
