import { Button, Grid2 } from "@mui/material";
import { COMPONENT_CLASSNAMES, RETURN_NULL } from "../../constants";
import clsx from "clsx";

export const EndOfArchiveButtonsFactory = ({
  buttonsData = [],
  gridSize = 12,
  onButtonKeyDown = RETURN_NULL,
}) => {
  return (
    <>
      {buttonsData.map((data, index) => {
        const Icon = data?.icon ?? Grid2;
        const onClick = data?.onClick ?? RETURN_NULL;
        const label = data?.label ?? "";
        const id = data?.id ?? "";

        return (
          <Grid2
            id={`end-of-archive-button-factory-button-${index}`}
            key={label}
            size={gridSize}
          >
            <Button
              fullWidth
              className={clsx(
                "py-4 h-full",
                COMPONENT_CLASSNAMES.END_OF_ARCHIVE_BUTTON
              )}
              id={id}
              onClick={onClick}
              onKeyDown={onButtonKeyDown}
              startIcon={<Icon />}
              variant="outlined"
            >
              {label}
            </Button>
          </Grid2>
        );
      })}
    </>
  );
};

export default EndOfArchiveButtonsFactory;
