import { Grid2 } from "@mui/material";
import { useColumnsDisplayed } from "../../../hooks/useColumnsDisplayed";
import { SearchPageButtons } from "./search-page-buttons";
import { SearchAccordion } from "./search-accordion";
import { SearchArchiveCardList } from "./search-archive-card-list";
import { useDatabaseStats } from "../../../hooks/useDatabaseStats";

export const SearchPage = () => {
  useDatabaseStats(true);
  const { columnsDisplayed } = useColumnsDisplayed();

  return (
    <Grid2
      id="search-page"
      container
      columns={columnsDisplayed}
      justifyContent="center"
      spacing={1}
    >
      <Grid2 size={columnsDisplayed}>
        <SearchAccordion />
      </Grid2>
      <Grid2 className="my-5" size={columnsDisplayed}>
        <SearchPageButtons />
      </Grid2>
      <SearchArchiveCardList />
      <Grid2 className="mt-5 mb-100" size={columnsDisplayed}>
        <SearchPageButtons />
      </Grid2>
    </Grid2>
  );
};
