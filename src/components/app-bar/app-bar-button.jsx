import { Button, Grid2, Typography } from "@mui/material";
import { useCallback } from "react";
import useAppPages from "../../hooks/useAppPages.js";

export const AppBarButton = ({ Icon, page }) => {
  const { updateAppPage } = useAppPages();

  const onClick = useCallback(() => {
    updateAppPage(page);
  }, [updateAppPage, page]);

  return (
    <Button
      id={`app-bar-button-page-${page}`}
      onClick={onClick}
      aria-label={`Show ${page} page`}
      className="px-0 bg-inherit"
      variant="text"
    >
      <Grid2 className="flex flex-col w-fit" container justifyContent="center">
        <Grid2 className="flex justify-center" size={12}>
          <Icon />
        </Grid2>
        <Grid2 className="flex justify-center w-fit" size={12}>
          <Grid2 container className="w-fit">
            <Typography className="text-xs" variant="caption">
              {page}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Button>
  );
};
