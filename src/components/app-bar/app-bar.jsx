import { Grid2, AppBar as MUIAppBar, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import Casino from "@mui/icons-material/Casino";
import Search from "@mui/icons-material/Search";
import History from "@mui/icons-material/History";
import Settings from "@mui/icons-material/Settings";
import {
  SEARCH,
  RANDOM,
  HISTORY,
  SETTINGS,
  BASIC_PAGES,
} from "../../constants.js";
import { AppBarButton } from "./app-bar-button.jsx";

const ICONS = {
  [RANDOM]: Casino,
  [SEARCH]: Search,
  [HISTORY]: History,
  [SETTINGS]: Settings,
};

export const AppBarComponent = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTallScreen = useMediaQuery("(min-height:515px)");

  return (
    <MUIAppBar
      id="app-bar"
      className={clsx(
        "top-auto ",
        isSvp && "bottom-0 w-full",
        !isSvp && "w-auto h-svh left-0 right-auto"
      )}
      position={!isSvp ? "static" : "fixed"}
    >
      <Grid2
        className={clsx(!isSvp && isTallScreen && "mt-30", !isSvp && "mt-5")}
        container
        direction={!isSvp ? "column" : "row"}
      >
        <Grid2 size={{ xs: 12, md: 12 }}>
          <Grid2
            container
            direction={!isSvp ? "column" : "row"}
            spacing={!isSvp ? 4 : undefined}
          >
            {BASIC_PAGES.map((page) => {
              const Icon = ICONS[page];
              return (
                <Grid2 key={page} size={isSvp ? 3 : 12}>
                  <AppBarButton Icon={Icon} page={page} />
                </Grid2>
              );
            })}
          </Grid2>
        </Grid2>
      </Grid2>
    </MUIAppBar>
  );
};
