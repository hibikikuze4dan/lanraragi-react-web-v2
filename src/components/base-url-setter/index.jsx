import { Button, Grid2, TextField } from "@mui/material";
import { HTTPToggleButton } from "../http-toggle-button";
import { useState } from "react";
import { useUrls } from "../../hooks/useUrls";

export const BaseUrlSetter = ({ onClick = () => null }) => {
  const { baseUrl, updateBaseUrl } = useUrls();
  const [baseUrlState, setBaseUrlToState] = useState(baseUrl ?? "");

  const onChange = (event) => {
    const value = event?.target?.value ?? "";
    setBaseUrlToState(value);
  };

  const handleOnClick = () => {
    const value = baseUrlState;
    updateBaseUrl(value);
    onClick(value);
  };

  return (
    <Grid2 id="base-url-setter" container spacing={3}>
      <Grid2 size={12}>
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <HTTPToggleButton />
          </Grid2>
          <Grid2 size={8}>
            <TextField
              fullWidth
              id="url-text-field"
              label="Base Url"
              placeholder="Ex: 000.000.0.000:3000"
              required
              value={baseUrlState}
              onChange={onChange}
            />
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 size={12}>
        <Button className="p-4" onClick={handleOnClick} variant="outlined">
          Set Base Url
        </Button>
      </Grid2>
    </Grid2>
  );
};
