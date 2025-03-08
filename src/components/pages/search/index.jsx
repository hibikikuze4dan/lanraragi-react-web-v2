import { Grid2 } from "@mui/material";
import { useColumnsDisplayed } from "../../../hooks/useColumnsDisplayed";
import { SearchPageButtons } from "./search-page-buttons";
import { SearchAccordion } from "./search-accordion";
import { SearchArchiveCardList } from "./search-archive-card-list";

export const SearchPage = () => {
  const { columnsDisplayed } = useColumnsDisplayed();

  return (
    <Grid2
      id="search-page"
      container
      columns={columnsDisplayed}
      justifyContent="center"
      spacing={2}
    >
      <Grid2 size={columnsDisplayed}>
        <SearchAccordion />
      </Grid2>
      <Grid2 size={columnsDisplayed}>
        <SearchPageButtons />
      </Grid2>
      <SearchArchiveCardList />
      <Grid2 size={columnsDisplayed}>
        <SearchPageButtons />
      </Grid2>
    </Grid2>
  );
};
