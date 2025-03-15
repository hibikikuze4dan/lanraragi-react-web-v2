import { Autocomplete, Grid2, TextField } from "@mui/material";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import { useDatabaseStats } from "../../../../hooks/useDatabaseStats";
import { matchSorter } from "match-sorter";
import { last } from "es-toolkit";

export const SearchFilterTextField = () => {
  const { statsAsStrings } = useDatabaseStats();
  const { searchParameters, handleUpdateSearchParameters } =
    useSearchParameters();
  const filter = searchParameters?.filter ?? "";

  const onTextFieldChange = (event) => {
    const value = event?.target?.value ?? "";
    handleUpdateSearchParameters({ filter: value });
  };

  const onAutocompleteChange = (event, value) => {
    const filters = filter.split(", ");

    if (value) {
      filters[filters.length - 1] = value;
    }

    const newValue = `${filters.join(", ")}${value ? ", " : ""}`;
    handleUpdateSearchParameters({ filter: newValue });
  };

  const getFilterOptions = (options, { inputValue }) => {
    const lastSectionOfFilter = last(inputValue.split(", "));
    return matchSorter(options, lastSectionOfFilter, {
      threshold: matchSorter.rankings.CONTAINS,
    }).slice(0, 25);
  };

  const input = (inputProps) => {
    return (
      <TextField
        {...inputProps}
        id="search-filter-text-field"
        label="Search Filter"
        onChange={onTextFieldChange}
        placeholder="Search Title, Artist, Series, Language or Tags"
        fullWidth
      />
    );
  };

  return (
    <Grid2 container>
      <Autocomplete
        autoComplete
        autoHighlight
        clearOnEscape
        disablePortal
        freeSolo
        includeInputInList
        onChange={onAutocompleteChange}
        openOnFocus={false}
        value={filter}
        options={statsAsStrings}
        filterOptions={getFilterOptions}
        fullWidth
        renderInput={input}
      />
    </Grid2>
  );
};
