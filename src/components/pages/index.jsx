import { Box, Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentPage } from "../../redux/selectors";
import { UrlPage } from "./url";
import {
  HISTORY,
  IMAGES,
  RANDOM,
  SEARCH,
  SETTINGS,
  TOP_OF_PAGE_ID,
} from "../../constants";
import { RandomPage } from "./random";
import { SettingsPage } from "./settings";
import { ImagesPage } from "./images";
import { SearchPage } from "./search";
import { useEffect, useRef } from "react";
import { ArchiveActionsDialog } from "../archive-actions-dialog";
import { useArchiveActionsDialogLogic } from "../../hooks/useArchiveActionsDialogLogic";
import { Snackbar } from "../snackbar";
import { HistoryPage } from "./history";
import { useServerInfo } from "../../hooks/useServerInfo";

const PAGE_COMPONENTS = {
  [RANDOM]: RandomPage,
  [SEARCH]: SearchPage,
  [SETTINGS]: SettingsPage,
  [IMAGES]: ImagesPage,
  [HISTORY]: HistoryPage,
};

export const Pages = () => {
  const { dialogActionType } = useArchiveActionsDialogLogic();
  useServerInfo(true);
  const currentPage = useSelector(getCurrentPage);
  const PageComponent = PAGE_COMPONENTS?.[currentPage] ?? Grid2;
  const ref = useRef();

  useEffect(() => {
    if (currentPage && ref.current) {
      ref.current?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [currentPage]);

  return (
    <Grid2
      id="pages-container"
      className="pt-4 min-h-svh"
      container
      justifyContent="center"
    >
      <UrlPage>
        <Grid2 ref={ref} id={TOP_OF_PAGE_ID} />
        <Box className="w-full">
          <PageComponent />
        </Box>
        <ArchiveActionsDialog actionType={dialogActionType} />
        <Snackbar />
      </UrlPage>
    </Grid2>
  );
};
