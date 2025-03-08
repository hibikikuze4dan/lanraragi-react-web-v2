import { memo } from "react";
import { LoadingSpinner } from "../../loading-spinner";
import { ArchiveCard } from "../../archive-card";
import { Grid2 } from "@mui/material";
import { useSearchResults } from "../../../hooks/useSearchResults";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { useSelector } from "react-redux";
import { getCurrentPage } from "../../../redux/selectors";
import { useRatingNamespace } from "../../../hooks/useRatingNamespace";
import { useUrls } from "../../../hooks/useUrls";

export const SearchArchiveCardList = memo(function SearchArchiveCardList() {
  const { ratingNamespace } = useRatingNamespace();
  const { baseUrlWithHttpOrHttps } = useUrls();
  const currentPage = useSelector(getCurrentPage);
  const { loadingSearchArchives, archives } = useSearchResults({
    initLoad: true,
  });
  const { getNewArchivePages } = useArchivePages();

  return (
    <>
      <LoadingSpinner
        size={100}
        loading={loadingSearchArchives}
        helperText="Searching for Archives"
        wrapperClassname="my-30"
      >
        {archives?.map((archive) => {
          return (
            <Grid2 key={archive?.arcid} size={1}>
              <ArchiveCard
                archive={archive}
                baseUrl={baseUrlWithHttpOrHttps}
                currentPage={currentPage}
                getNewArchivePages={getNewArchivePages}
                ratingNamespace={ratingNamespace}
              />
            </Grid2>
          );
        })}
      </LoadingSpinner>
    </>
  );
});
