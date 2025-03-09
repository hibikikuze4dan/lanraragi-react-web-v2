import { Grid2, TextField } from "@mui/material";

export const TagsTextField = ({
  value,
  onChange,
  textFieldId = "",
  label = "",
  multiline = true,
  rows,
}) => {
  const handleChange = (event) => {
    const value = event?.target?.value ?? "";

    onChange(value);
  };

  return (
    <Grid2 container>
      <TextField
        id={textFieldId}
        label={label}
        multiline={multiline}
        rows={rows}
        value={value}
        onChange={handleChange}
        fullWidth
      />
    </Grid2>
  );
};
