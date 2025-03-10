import { Box, Grid2, useMediaQuery } from "@mui/material";
import { AppBarComponent } from "./app-bar.jsx";
import { useSelector } from "react-redux";
import { getDisplayAppBar } from "../../redux/selectors.js";
import clsx from "clsx";
import { IMAGES } from "../../constants.js";
import useAppPages from "../../hooks/useAppPages.js";

export const AppBar = ({ children }) => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { appPage } = useAppPages();
  const displayAppBar = useSelector(getDisplayAppBar);
  const isImagesPage = appPage === IMAGES;

  return (
    <Box id="app-bar-wrapper" className="max-w-svw max-h-svh flex">
      <>
        {!isSvp && displayAppBar && (
          <Box className="min-w-fit max-h-svh overflow-hidden">
            <AppBarComponent />
          </Box>
        )}
        <Box
          className={clsx(
            !isSvp && "max-h-svh overflow-scroll grow",
            isSvp && "grow"
          )}
        >
          <Grid2
            className={clsx(
              "w-full max-w-svw",
              isImagesPage && "py-2",
              !isImagesPage && "p-2"
            )}
            container
          >
            <Grid2
              id="app-bar-children-wrapper"
              className="min-h-svh content-center"
              size={12}
            >
              {children}
            </Grid2>
          </Grid2>
        </Box>
        {isSvp && displayAppBar && <AppBarComponent />}
      </>
    </Box>
  );
};
