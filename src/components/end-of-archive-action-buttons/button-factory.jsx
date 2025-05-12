import { Button, Grid2 } from "@mui/material";
import { RETURN_NULL } from "../../constants";

export const EndOfArchiveButtonsFactory = ({
  buttonsData = [],
  gridSize = 12,
}) => {
  return (
    <>
      {buttonsData.map((data, index) => {
        const Icon = data?.icon ?? Grid2;
        const onClick = data?.onClick ?? RETURN_NULL;
        const label = data?.label ?? "";

        return (
          <Grid2
            id={`end-of-archive-button-factory-button-${index}`}
            key={label}
            size={gridSize}
          >
            <Button
              fullWidth
              variant="outlined"
              className="py-4 h-full"
              onClick={onClick}
              startIcon={<Icon />}
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
