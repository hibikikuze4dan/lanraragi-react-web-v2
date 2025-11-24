import { Button, Grid2 } from "@mui/material";
import { useRandomArchives } from "../../../hooks/useRandomArchives";
import { LoadingSpinner } from "../../loading-spinner";
import Casino from "@mui/icons-material/Casino";
import { ArchiveCard } from "../../archive-card";
import { useColumnsDisplayed } from "../../../hooks/useColumnsDisplayed";
import { useSearchResults } from "../../../hooks/useSearchResults";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { useSelector } from "react-redux";
import { getCurrentPage } from "../../../redux/selectors";
import { useRatingNamespace } from "../../../hooks/useRatingNamespace";
import { useUrls } from "../../../hooks/useUrls";
import { COMPONENT_IDS } from "../../../constants";

export const RandomPage = () => {
  const { columnsDisplayed } = useColumnsDisplayed();
  const { loadingRandomArchives, randomArchives, getNewRandomArchives } =
    useRandomArchives();
  const { ratingNamespace } = useRatingNamespace();
  const { baseUrlWithHttpOrHttps } = useUrls();
  const currentPage = useSelector(getCurrentPage);
  const { getNewArchivePages } = useArchivePages();
  useSearchResults({ initLoad: true });

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
              className="mt-10 mb-100 p-4"
              onClick={getNewRandomArchives}
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
