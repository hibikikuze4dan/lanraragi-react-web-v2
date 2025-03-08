import { Grid2, TextField } from "@mui/material";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";

export const SearchFilterTextField = () => {
  const { searchParameters, handleUpdateSearchParameters } =
    useSearchParameters();
  const filter = searchParameters?.filter ?? "";

  const onChange = (event) => {
    const value = event?.target?.value ?? "";
    handleUpdateSearchParameters({ filter: value });
  };

  return (
    <Grid2 container>
      <TextField
        id="search-filter-text-field"
        label="Search Filter"
        placeholder="Search Title, Artist, Series, Language or Tags"
        value={filter}
        onChange={onChange}
        fullWidth
      />
    </Grid2>
  );
};
