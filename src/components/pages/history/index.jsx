import { Grid2 } from "@mui/material";
import { ArchiveCard } from "../../archive-card";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { getCurrentPage } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import { useUrls } from "../../../hooks/useUrls";
import { useRatingNamespace } from "../../../hooks/useRatingNamespace";
import { useColumnsDisplayed } from "../../../hooks/useColumnsDisplayed";
import { useArchiveHistory } from "../../../hooks/useArchiveHistory";
import { LoadingSpinner } from "../../loading-spinner";

export const HistoryPage = () => {
  const { columnsDisplayed } = useColumnsDisplayed();
  const { history, useApiHistory } = useArchiveHistory();
  const { ratingNamespace } = useRatingNamespace();
  const { baseUrlWithHttpOrHttps } = useUrls();
  const currentPage = useSelector(getCurrentPage);
  const { getNewArchivePages } = useArchivePages();
  const reversedHistory =
    Array.isArray(history) && !useApiHistory ? [...history].reverse() : history;

  return (
    <Grid2 id="random-page" container columns={columnsDisplayed} spacing={2}>
      <LoadingSpinner
        loading={!history.length}
        helperText="Getting history"
        size={200}
      >
        {reversedHistory?.map?.((archive, index) => {
          return (
            <Grid2 key={archive?.arcid} size={1}>
              <ArchiveCard
                archive={archive}
                baseUrl={baseUrlWithHttpOrHttps}
                currentPage={currentPage}
                getNewArchivePages={getNewArchivePages}
                index={index}
                ratingNamespace={ratingNamespace}
              />
            </Grid2>
          );
        })}
      </LoadingSpinner>
    </Grid2>
  );
};
