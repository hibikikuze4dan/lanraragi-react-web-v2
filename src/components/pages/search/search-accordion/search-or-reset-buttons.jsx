import Search from "@mui/icons-material/Search";
import { Button, Grid2 } from "@mui/material";
import { useSearchPageLogic } from "../../../../hooks/useSearchPageLogic";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import RestartAlt from "@mui/icons-material/RestartAlt";
import { SEARCH_PARAMETER_DEFAULTS } from "../../../../constants";

export const SearchOrResetButtons = () => {
  const { handleNewSearch } = useSearchPageLogic();
  const { searchParameters, handleUpdateSearchParameters } =
    useSearchParameters();

  const onSearchClick = () => {
    handleNewSearch(searchParameters);
  };

  const onResetClick = () => {
    handleUpdateSearchParameters(SEARCH_PARAMETER_DEFAULTS);
    handleNewSearch();
  };

  return (
    <Grid2
      id="search-or-reset-button-wrapper"
      className="w-full"
      container
      spacing={3}
    >
      <Grid2 size={6}>
        <Button
          className="min-h-[44px]"
          fullWidth
          onClick={onSearchClick}
          startIcon={<Search />}
          variant="outlined"
        >
          Search
        </Button>
      </Grid2>
      <Grid2 size={6}>
        <Button
          className="min-h-[44px]"
          fullWidth
          onClick={onResetClick}
          startIcon={<RestartAlt />}
          variant="outlined"
        >
          Reset
        </Button>
      </Grid2>
    </Grid2>
  );
};
