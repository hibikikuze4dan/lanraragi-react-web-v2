import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select as MUISelect,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useId } from "react";

export const Select = ({
  labelId = "",
  selectId = "",
  label = "",
  onChange = () => null,
  options = [],
  selectedOptions = [],
  setSelectedOptions = () => null,
  helperText = "",
}) => {
  const backupId = useId();
  const idToUse = labelId || backupId;

  const handleChange = (event) => {
    const indexes = event?.target?.value ?? null;

    setSelectedOptions?.(indexes);
    onChange?.(indexes.map((index) => options[index]));
  };

  return (
    <>
      <FormControl className="w-full">
        <InputLabel id={idToUse}>{label}</InputLabel>
        <MUISelect
          labelId={idToUse}
          id={selectId}
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(indexes) =>
            indexes
              .map(
                (index) => options?.[index]?.label ?? options?.[index]?.value
              )
              .join(", ")
          }
        >
          {options.map((option, index) => {
            const { label, value } = option;
            return (
              <MenuItem key={value} value={index}>
                <Checkbox checked={selectedOptions.includes(index)} />
                <ListItemText primary={label ?? value} />
              </MenuItem>
            );
          })}
        </MUISelect>
        {helperText && (
          <Typography variant="caption" component="span">
            {helperText}
          </Typography>
        )}
      </FormControl>
    </>
  );
};
