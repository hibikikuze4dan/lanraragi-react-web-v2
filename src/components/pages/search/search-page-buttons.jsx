import { Button, Grid2, TextField } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useSearchPageLogic } from "../../../hooks/useSearchPageLogic";
import { memo } from "react";

export const SearchPageButtons = memo(function SearchPageButton() {
  const {
    archivesRendered,
    searchPages,
    currentSearchParameters,
    currentPage,
    nextPage,
    previousPage,
    handleNewSearch,
  } = useSearchPageLogic();

  const handleButtonClick =
    (nextButton = false) =>
    () => {
      handleNewSearch({
        ...currentSearchParameters,
        start: `${
          Number(nextButton ? nextPage : previousPage) * archivesRendered
        }`,
      });
    };

  const onChange = (event) => {
    const value = event?.target?.value ?? 0;
    handleNewSearch({
      ...currentSearchParameters,
      start: `${Number(value) * archivesRendered}`,
    });
  };

  return (
    <Grid2 className="search-page-buttons-wrapper" container>
      <Grid2 size={4}>
        <Button
          startIcon={<ArrowBack />}
          className="h-full w-9/10"
          variant="outlined"
          onClick={handleButtonClick(false)}
        >
          Prev
        </Button>
      </Grid2>
      <Grid2 size={4}>
        <TextField
          className="page-select-text-field h-full"
          fullWidth
          label="Page"
          select
          slotProps={{
            select: { native: true },
            input: { className: "h-full" },
          }}
          value={currentPage}
          onChange={onChange}
        >
          {Array.from(Array(searchPages)).map((_, index) => {
            return (
              <option key={index} value={index}>
                {index + 1}
              </option>
            );
          })}
        </TextField>
      </Grid2>
      <Grid2 size={4}>
        <Button
          endIcon={<ArrowForward />}
          className="h-full w-9/10"
          variant="outlined"
          onClick={handleButtonClick(true)}
        >
          Next
        </Button>
      </Grid2>
    </Grid2>
  );
});
