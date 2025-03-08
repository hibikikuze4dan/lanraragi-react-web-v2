import { Grid2, TextField } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import { useColumnsDisplayed } from "../../../hooks/useColumnsDisplayed";

export const ColumnsDisplayedSetting = () => {
  const {
    defaultColumns,
    columnsDisplayed,
    setColumnsDisplayedToLocalStorage,
  } = useColumnsDisplayed();
  const [columnsDisplayedState, setColumnsDisplayedState] = useState(
    Number(columnsDisplayed ?? defaultColumns)
  );

  const onChange = (event) => {
    const value = event?.target?.value;
    setColumnsDisplayedState(Number(value ?? defaultColumns));
    setColumnsDisplayedToLocalStorage(value ?? `${defaultColumns}`);
  };

  return (
    <Grid2 container justifyContent="center">
      <TextField
        className={clsx("min-w-56")}
        id="columns-displayed-text-field"
        label="Columns Displayed"
        select
        slotProps={{ select: { native: true } }}
        required
        value={columnsDisplayedState}
        onChange={onChange}
      >
        {Array.from(Array(20)).map((_, index) => {
          const value = index + 1;
          return <option key={value}>{value}</option>;
        })}
      </TextField>
    </Grid2>
  );
};
