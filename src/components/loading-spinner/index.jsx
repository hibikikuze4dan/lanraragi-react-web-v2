import { CircularProgress, Grid2, Typography } from "@mui/material";
import clsx from "clsx";

export const LoadingSpinner = ({
  size = 40,
  loading,
  children,
  helperText = "",
  wrapperClassname = "",
}) => {
  return loading ? (
    <Grid2 className={clsx("loading-spinner", wrapperClassname)} container>
      <Grid2 size={12}>
        <CircularProgress size={size} />
      </Grid2>
      <Grid2 size={12}>
        <Typography>{helperText}</Typography>
      </Grid2>
    </Grid2>
  ) : (
    <>{children}</>
  );
};
