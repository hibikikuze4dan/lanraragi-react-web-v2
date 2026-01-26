import { Button, Grid2 } from "@mui/material";
import { useRandomArchives } from "../../../hooks/useRandomArchives";
import { LoadingSpinner } from "../../loading-spinner";
import Casino from "@mui/icons-material/Casino";
import { ArchiveCard } from "../../archive-card";
import { useColumnsDisplayed } from "../../../hooks/useColumnsDisplayed";
import { useSearchResults } from "../../../hooks/useSearchResults";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { useSelector } from "react-redux";
import {
  getCurrentPage,
  getFocusFirstArchiveCard,
} from "../../../redux/selectors";
import { useRatingNamespace } from "../../../hooks/useRatingNamespace";
import { useUrls } from "../../../hooks/useUrls";
import {
  ARROW_LEFT,
  ARROW_RIGHT,
  COMPONENT_CLASSNAMES,
  COMPONENT_IDS,
  TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION,
} from "../../../constants";
import scrollToLogger from "../../../utils/scrollToLogger";
import clsx from "clsx";
import moveFocusRelative from "../../../utils/moveFocusRelative";
import getElementsByMultipleClassnames from "../../../utils/getElementsByMultipleClassnames";

export const RandomPage = () => {
  const { columnsDisplayed } = useColumnsDisplayed();
  const { loadingRandomArchives, randomArchives, getNewRandomArchives } =
    useRandomArchives();
  const { ratingNamespace } = useRatingNamespace();
  const { baseUrlWithHttpOrHttps } = useUrls();
  const currentPage = useSelector(getCurrentPage);
  const focusFirstArchiveCard = useSelector(getFocusFirstArchiveCard);
  const { getNewArchivePages } = useArchivePages();
  useSearchResults({ initLoad: true });

  const onClick = () => {
    getNewRandomArchives();
    scrollToLogger({
      element: document.getElementById("random-page"),
      message: "Random Page",
      options: { block: "start", behavior: "instant" },
    });
  };

  const onButtonsKeyDown = (event) => {
    const eventCode = event?.code;
    const isLeftRightArrowKeys = [ARROW_LEFT, ARROW_RIGHT].includes(eventCode);
    if (isLeftRightArrowKeys) {
      event.preventDefault();
      moveFocusRelative({
        element: event?.target,
        arrowKey: eventCode,
        elementList: getElementsByMultipleClassnames(
          TARGETED_BUTTON_CLASSNAMES_FOR_ARCHIVE_CARD_ARROW_KEY_NAVIGATION,
        ),
      });
    }
  };

  return (
    <>
      <Grid2
        id={`${COMPONENT_IDS.RANDOM_PAGE}`}
        className="min-h-svh"
        container
        columns={columnsDisplayed}
        spacing={2}
      >
        <LoadingSpinner
          size={100}
          loading={loadingRandomArchives}
          helperText="Loading Random Archives"
        >
          {randomArchives.map((archive, index) => {
            return (
              <Grid2 key={archive?.arcid} size={1}>
                <ArchiveCard
                  archive={archive}
                  baseUrl={baseUrlWithHttpOrHttps}
                  currentPage={currentPage}
                  focusFirstArchiveCard={focusFirstArchiveCard}
                  getNewArchivePages={getNewArchivePages}
                  index={index}
                  ratingNamespace={ratingNamespace}
                />
              </Grid2>
            );
          })}
        </LoadingSpinner>
      </Grid2>
      {!loadingRandomArchives && (
        <Grid2 container>
          <Grid2 size={12}>
            <Button
              className={clsx(
                COMPONENT_CLASSNAMES.MORE_ARCHIVES_BUTTON,
                "mt-10 mb-100 p-4",
              )}
              onClick={onClick}
              onKeyDown={onButtonsKeyDown}
              fullWidth
              startIcon={<Casino />}
              variant="outlined"
            >
              More Archives
            </Button>
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
