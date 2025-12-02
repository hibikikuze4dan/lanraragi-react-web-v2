import { Grid2 } from "@mui/material";
import clsx from "clsx";
import { RETURN_NULL } from "../../constants";
import TransitionButtons from "./transition-buttons";
import EndOfArchiveButtonsFactory from "./button-factory";
import useEndOfArchiveButtons from "../../hooks/useEndOfArchvieActionButtons";

export const EndOfArchiveActionButtons = ({
  previousImage = RETURN_NULL,
  setCurrentPageIndex = RETURN_NULL,
}) => {
  const { isSingleImageMode, gridSize, buttonsData, onButtonKeyDown } =
    useEndOfArchiveButtons({ previousImage });

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
        onButtonKeyDown={onButtonKeyDown}
      />
      <TransitionButtons
        setCurrentPageIndex={setCurrentPageIndex}
        gridSize={gridSize}
        onButtonKeyDown={onButtonKeyDown}
      />
    </Grid2>
  );
};

export default EndOfArchiveActionButtons;
