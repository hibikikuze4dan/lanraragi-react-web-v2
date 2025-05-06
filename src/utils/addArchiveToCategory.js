export const addArchiveToCategory = ({
  categories = [],
  archiveId = "",
  categoryId = "",
  onlyCategory = false,
}) => {
  if (!categories.length || !archiveId || !categoryId) {
    return null;
  }

  const categoryWithCategoryId = categories.find(
    (category) => category?.id === categoryId
  );

  if (categoryWithCategoryId) {
    const filteredCategories = categories.filter(
      (category) => category?.id !== categoryWithCategoryId?.id
    );
    const updatedCategory = {
      ...categoryWithCategoryId,
      archives: [...(categoryWithCategoryId?.archives ?? []), archiveId],
    };

    if (onlyCategory) {
      return updatedCategory;
    }

    const updatedArchives = [...filteredCategories, { ...updatedCategory }];
    return updatedArchives;
  }

  return null;
};
