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
import { MobileArchiveActionsDialog } from "../mobile-archive-actions-dialog";
import useAppPages from "../../hooks/useAppPages";
import clsx from "clsx";

const PAGE_COMPONENTS = {
  [RANDOM]: RandomPage,
  [SEARCH]: SearchPage,
  [SETTINGS]: SettingsPage,
  [IMAGES]: ImagesPage,
  [HISTORY]: HistoryPage,
};

export const Pages = () => {
  const { dialogActionType } = useArchiveActionsDialogLogic();
  const { currentPageIsImagesPage } = useAppPages();
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
      className={clsx("min-h-svh", !currentPageIsImagesPage && "py-2")}
      container
      justifyContent="center"
      ref={ref}
    >
      <UrlPage>
        <Grid2 id={TOP_OF_PAGE_ID} />
        <Box className="w-full">
          <PageComponent />
        </Box>
        <ArchiveActionsDialog actionType={dialogActionType} />
        <MobileArchiveActionsDialog />
        <Snackbar />
      </UrlPage>
    </Grid2>
  );
};
