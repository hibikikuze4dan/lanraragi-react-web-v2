import { Button, Grid2 } from "@mui/material";
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { Select } from "../select";
import { useSnackbar } from "../../hooks/useSnackbar";
import useCurrentArchive from "../../hooks/useCurrentArchive";
import { useArchiveActionsDialogLogic } from "../../hooks/useArchiveActionsDialogLogic";

export const CategoriesSelect = ({ archiveId = "" }) => {
  const { handleArchiveCategoryUpdate, getCategoriesByArchvie } = useCategories(
    {
      initLoad: true,
    }
  );
  const { archive } = useCurrentArchive();
  const { setNewSnackbarStatus } = useSnackbar();
  const { setActionType } = useArchiveActionsDialogLogic();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoriesWithoutArchive = getCategoriesByArchvie({
    archiveId,
    getCategoriesIncludingArchiveId: false,
  });

  const onMultiSelectChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  const onClick = async () => {
    setActionType("");
    const successfulResponses = [];
    setSelectedOptions([]);

    for (const category of selectedCategories) {
      const response = await handleArchiveCategoryUpdate({
        archiveId,
        categoryId: category?.value,
      });

      if (response) {
        successfulResponses.push(category);
      }
    }

    if (successfulResponses.length) {
      setNewSnackbarStatus({
        severity: "success",
        message: `Successfully added archive ${
          archive?.title ?? ""
        } to the following categories: ${successfulResponses
          .map((response) => response?.label)
          .join(", ")}`,
      });
    }
    setSelectedCategories([]);
  };

  const helperText = categoriesWithoutArchive.length
    ? ""
    : "Empty - No Static Categories Without Archive";

  return (
    <Grid2 className="h-full" container spacing={3}>
      <Grid2 alignContent="center" size={{ xs: 12, md: 6 }}>
        <Select
          selectId="categories-select-select"
          label="Categories"
          options={categoriesWithoutArchive.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onChange={onMultiSelectChange}
          helperText={helperText}
        />
      </Grid2>
      <Grid2 alignContent="center" size={{ xs: 12, md: 6 }}>
        <Button
          className="py-4 "
          fullWidth
          variant="outlined"
          onClick={onClick}
        >
          Add Archive to Category
        </Button>
      </Grid2>
    </Grid2>
  );
};
