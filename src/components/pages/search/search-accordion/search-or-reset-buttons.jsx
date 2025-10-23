import Search from "@mui/icons-material/Search";
import { Button, Grid2 } from "@mui/material";
import { useSearchPageLogic } from "../../../../hooks/useSearchPageLogic";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import RestartAlt from "@mui/icons-material/RestartAlt";
import {
  KEYBOARD_KEY_CODES,
  RETURN_NULL,
  SEARCH_PARAMETER_DEFAULTS,
} from "../../../../constants";

const { ENTER, SPACE } = KEYBOARD_KEY_CODES;

export const SearchOrResetButtons = ({ toggleAccordion = RETURN_NULL }) => {
  const { handleNewSearch } = useSearchPageLogic();
  const { searchParameters, handleUpdateSearchParameters } =
    useSearchParameters();

  const onSearchClick = (shouldToggleAccordion = true) => {
    handleNewSearch({ ...searchParameters, start: "0" });
    if (shouldToggleAccordion) {
      toggleAccordion();
    }
  };

  const onResetClick = () => {
    handleUpdateSearchParameters(SEARCH_PARAMETER_DEFAULTS);
    handleNewSearch();
    toggleAccordion();
  };

  const onSearchButtonKeyDown = (event) => {
    if ([ENTER, SPACE].includes(event.code)) {
      event.preventDefault();
      onSearchClick(!event.shiftKey);
    }
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
          onKeyDown={onSearchButtonKeyDown}
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
