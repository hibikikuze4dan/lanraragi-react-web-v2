import { Button, Grid2, Typography } from "@mui/material";
import { useCallback } from "react";
import useAppPages from "../../hooks/useAppPages.js";
import { COMPONENT_IDS, HISTORY } from "../../constants.js";
import { useArchiveHistory } from "../../hooks/useArchiveHistory.js";
import { useCurrentArchive } from "../../hooks/useCurrentArchive.js";
import scrollToLogger from "../../utils/scrollToLogger.js";

export const AppBarButton = ({ Icon, page }) => {
  const { updateAppPage } = useAppPages();
  const { clearHistoryState, refreshHistory } = useArchiveHistory();
  const { getArchiveCardTitleButtonElementFromCurrentArchiveId } =
    useCurrentArchive();

  const onClick = useCallback(() => {
    if (page === HISTORY) {
      clearHistoryState();
      refreshHistory();
    }
    updateAppPage(page);

    setTimeout(() => {
      const titleButton =
        getArchiveCardTitleButtonElementFromCurrentArchiveId();

      if (titleButton) {
        scrollToLogger({
          element: titleButton,
          message: "app-bar-button",
          options: { behavior: "smooth", block: "center" },
        });
      } else {
        scrollToLogger({
          element: document.getElementById(COMPONENT_IDS.PAGES_CONTAINER),
          message: "app-bar-button",
          options: { behavior: "instant", block: "start" },
        });
      }
    }, 125);
  }, [
    updateAppPage,
    page,
    clearHistoryState,
    refreshHistory,
    getArchiveCardTitleButtonElementFromCurrentArchiveId,
  ]);

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
