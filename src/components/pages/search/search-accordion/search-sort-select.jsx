import { Grid2, TextField } from "@mui/material";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";

const SORT_OPTIONS = [
  { label: "Title", value: "title" },
  { label: "Date", value: "date_added" },
];

export const SearchSortSelect = () => {
  const { searchParameters, handleUpdateSearchParameters } =
    useSearchParameters();

  const selectedSortMethod = searchParameters?.sortby ?? "";

  const onChange = (event) => {
    const value = event?.target?.value ?? "date_added";
    handleUpdateSearchParameters({ sortby: value });
  };

  return (
    <Grid2 container>
      <TextField
        className="search-sort-select-text-field h-full"
        fullWidth
        label="Sort By"
        select
        slotProps={{
          select: { native: true },
          input: { className: "h-full" },
        }}
        value={selectedSortMethod}
        onChange={onChange}
      >
        {SORT_OPTIONS.map((option) => {
          const value = option?.value ?? "";
          return (
            <option key={value} value={value}>
              {option?.label ?? ""}
            </option>
          );
        })}
      </TextField>
    </Grid2>
  );
};
