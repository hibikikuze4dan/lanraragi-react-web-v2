import { useDispatch, useSelector } from "react-redux";
import { getApiCategories, getStaticApiCategories } from "../redux/selectors";
import { useEffect } from "react";
import requestAllCategories from "../requests/requestAllCategories";
import {
  updateApiCategories,
  updateApiCategory,
} from "../redux/slices/appSlice";
import putUpdateToArchiveCategory from "../requests/putUpdateToArchiveCategory";
import { addArchiveToCategory } from "../utils/addArchiveToCategory";

export const useCategories = ({ initLoad = false } = {}) => {
  const dispatch = useDispatch();
  const categories = useSelector(getApiCategories);
  const staticCategories = useSelector(getStaticApiCategories);
  const categoriesEmpty = !categories.length;

  useEffect(() => {
    if (initLoad && categoriesEmpty) {
      requestAllCategories().then((apiCategories) => {
        dispatch(updateApiCategories(apiCategories));
      });
    }
  }, [dispatch, initLoad, categoriesEmpty]);

  const getCategoriesByArchvie = ({
    archiveId,
    getCategoriesIncludingArchiveId = true,
  }) => {
    return [
      ...staticCategories.reduce((accumulator, category) => {
        if (getCategoriesIncludingArchiveId) {
          return category?.archives?.includes(archiveId)
            ? [...accumulator, category]
            : [...accumulator];
        }
        return !category?.archives?.includes(archiveId)
          ? [...accumulator, category]
          : [...accumulator];
      }, []),
    ];
  };

  const handleArchiveCategoryUpdate = async ({ archiveId, categoryId }) => {
    const apiResponse = await putUpdateToArchiveCategory({
      archiveId,
      categoryId,
    });
    const { success } = apiResponse;
    const updatedArchive = success
      ? addArchiveToCategory({
          categories,
          archiveId,
          categoryId,
          onlyCategory: true,
        })
      : null;

    if (updatedArchive) {
      dispatch(updateApiCategory(updatedArchive));
    }

    if (!success) {
      return null;
    }

    return apiResponse;
  };

  return {
    categories,
    getCategoriesByArchvie,
    handleArchiveCategoryUpdate,
    staticCategories,
  };
};
