export const updateCategory = ({ category = {}, categories = [] }) => {
  const newCategories = [...categories];

  const categoryIndex = newCategories?.findIndex(
    (cat) => cat?.id === category?.id
  );

  if (categoryIndex === -1) {
    return categories;
  }

  newCategories?.splice(categoryIndex, 1, category);

  return newCategories;
};

export default updateCategory;
