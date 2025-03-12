import { Grid2 } from "@mui/material";
import { ArchiveCard } from "../../archive-card";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { getCurrentPage } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import { useUrls } from "../../../hooks/useUrls";
import { useRatingNamespace } from "../../../hooks/useRatingNamespace";
import { useColumnsDisplayed } from "../../../hooks/useColumnsDisplayed";
import { useArchiveHistory } from "../../../hooks/useArchiveHistory";

export const HistoryPage = () => {
  const { columnsDisplayed } = useColumnsDisplayed();
  const { archiveHistoryAsJSON } = useArchiveHistory();
  const { ratingNamespace } = useRatingNamespace();
  const { baseUrlWithHttpOrHttps } = useUrls();
  const currentPage = useSelector(getCurrentPage);
  const { getNewArchivePages } = useArchivePages();
  const history = Array.isArray(archiveHistoryAsJSON)
    ? archiveHistoryAsJSON.reverse()
    : [];

  return (
    <Grid2 id="random-page" container columns={columnsDisplayed} spacing={2}>
      {history.map((archive, index) => {
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
    </Grid2>
  );
};
