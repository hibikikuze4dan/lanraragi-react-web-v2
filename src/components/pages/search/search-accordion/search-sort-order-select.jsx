import { Grid2, TextField } from "@mui/material";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";

const SORT_DIRECTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export const SearchSortOrderSelect = () => {
  const { searchParameters, handleUpdateSearchParameters } =
    useSearchParameters();

  const selectedSortDirection = searchParameters?.order ?? "desc";

  const onChange = (event) => {
    const value = event?.target?.value ?? "desc";
    handleUpdateSearchParameters({ order: value });
  };

  return (
    <Grid2 container>
      <TextField
        className="search-sort-order-select-text-field h-full"
        fullWidth
        label="Sort Direction"
        select
        slotProps={{
          select: { native: true },
          input: { className: "h-full" },
        }}
        value={selectedSortDirection}
        onChange={onChange}
      >
        {SORT_DIRECTIONS.map((option) => {
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
