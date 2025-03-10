import { Grid2, TextField } from "@mui/material";
import { useCategories } from "../../../../hooks/useCategories";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";

export const SearchCategorySelect = () => {
  const { categories } = useCategories({ initLoad: true });
  const { searchParameters, handleUpdateSearchParameters } =
    useSearchParameters();

  const selectedCategory = searchParameters?.category ?? "";

  const onChange = (event) => {
    const value = event?.target?.value;
    handleUpdateSearchParameters({ category: value });
  };

  console.log(selectedCategory, categories);
  return (
    <Grid2 container>
      <TextField
        id="search-accordion-select-category-parameter"
        className="search-category-select-text-field h-full"
        fullWidth
        label="Search Category"
        select
        slotProps={{
          inputLabel: {
            for: "search-accordion-select-category-parameter",
            shrink: !!selectedCategory,
          },
          select: { native: true },
          input: { className: "h-full" },
        }}
        value={selectedCategory}
        onChange={onChange}
      >
        <option value={""} />
        {categories.map((category) => {
          const value = category?.id;
          return (
            <option key={value} value={value}>
              {category?.name}
            </option>
          );
        })}
      </TextField>
    </Grid2>
  );
};
