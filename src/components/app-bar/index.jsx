import { Box, Grid2, useMediaQuery } from "@mui/material";
import { AppBarComponent } from "./app-bar.jsx";
import { useSelector } from "react-redux";
import { getDisplayAppBar } from "../../redux/selectors.js";
import clsx from "clsx";

export const AppBar = ({ children }) => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const displayAppBar = useSelector(getDisplayAppBar);

  return (
    <Box id="app-bar-wrapper" className="max-w-svw max-h-svh flex">
      {displayAppBar ? (
        <>
          {!isSvp && (
            <Box className="min-w-fit max-h-svh overflow-scroll">
              <AppBarComponent />
            </Box>
          )}
          <Box className={clsx(!isSvp && "max-h-svh overflow-scroll grow")}>
            <Grid2 className="p-2 w-full max-w-svw" container>
              <Grid2
                id="app-bar-children-wrapper"
                className="min-h-svh content-center"
                size={12}
              >
                {children}
              </Grid2>
            </Grid2>
          </Box>
          {isSvp && <AppBarComponent />}
        </>
      ) : (
        <>{children}</>
      )}
    </Box>
  );

  // return (
  //   <Grid2 id="app-bar-wrapper" className="max-w-svw" container columns={100}>
  //     {displayAppBar ? (
  //       <>
  //         {!isSvp && (
  //           <Grid2 className="" flexDirection="row" size="grow">
  //             <AppBarComponent />
  //           </Grid2>
  //         )}
  //         <Grid2
  //           className={clsx(!isSvp && "max-h-svh overflow-scroll")}
  //           flexDirection="row"
  //           size={isSvp ? 100 : 94}
  //         >
  //           <Grid2 className="p-2" container>
  //             <Grid2 id="app-bar-children-wrapper" size={12}>
  //               {children}
  //             </Grid2>
  //           </Grid2>
  //         </Grid2>
  //         {isSvp && <AppBarComponent />}
  //       </>
  //     ) : (
  //       <>{children}</>
  //     )}
  //   </Grid2>
  // );
};
