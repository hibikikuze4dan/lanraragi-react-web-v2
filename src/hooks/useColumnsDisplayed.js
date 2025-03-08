import { useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { COLUMNS_DISPLAYED } from "../local-storage/constants";
import { useMediaQuery } from "@mui/material";

const {
  get: getColumnsDisplayedFromLocalStorage,
  set: setColumnsDisplayedToLocalStorage,
} = createLocalStorageInstance(COLUMNS_DISPLAYED);

export const useColumnsDisplayed = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const defaultColumns = isSvp ? 1 : 5;
  const [columnsDisplayed] = useState(
    Number(getColumnsDisplayedFromLocalStorage() ?? defaultColumns)
  );

  return {
    columnsDisplayed,
    defaultColumns,
    setColumnsDisplayedToLocalStorage,
  };
};
