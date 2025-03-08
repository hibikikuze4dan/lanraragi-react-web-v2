import { Alert, Button, Grid2, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";

export const CategoriesSelect = ({ archiveId = "" }) => {
  const { handleArchiveCategoryUpdate, getCategoriesByArchvie } = useCategories(
    {
      initLoad: true,
    }
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  const categoriesWithoutArchive = getCategoriesByArchvie({
    archiveId,
    getCategoriesIncludingArchiveId: false,
  });

  const onChange = (event) => {
    const value = event?.target?.value ?? "";
    setSelectedCategory(value);
  };

  const onClick = async () => {
    const response = await handleArchiveCategoryUpdate({
      archiveId,
      categoryId: selectedCategory,
    });
    setApiResponse(response);
    setSelectedCategory("");
  };

  const { success, successMessage } = apiResponse;

  const responseHasValues = ![success, successMessage].includes(undefined);

  const helperText = categoriesWithoutArchive.length
    ? ""
    : "Empty - No Static Categories Without Archive";

  return (
    <Grid2 className="h-full" container spacing={3}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          className="categories-select-text-field"
          fullWidth
          label="Categories"
          select
          slotProps={{
            select: { native: true },
            input: { className: "" },
          }}
          value={selectedCategory}
          onChange={onChange}
          helperText={helperText}
        >
          <option value={""} />
          {categoriesWithoutArchive.map((category) => {
            const value = category?.id;
            return (
              <option key={value} value={value}>
                {category?.name}
              </option>
            );
          })}
        </TextField>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Button
          className="py-4 "
          fullWidth
          variant="outlined"
          onClick={onClick}
        >
          Add Archive to Category
        </Button>
      </Grid2>
      {responseHasValues && (
        <Grid2 size={12}>
          <Alert severity={success ? "success" : "error"} variant="filled">
            <Typography>
              {successMessage.replace(/&quot;/g, '"').replace(/&#39;/g, "'")}
            </Typography>
          </Alert>
        </Grid2>
      )}
    </Grid2>
  );
};
