import { Grid2, TextField } from "@mui/material";
import { createLocalStorageInstance } from "../../../local-storage";
import { BEARER_TOKEN } from "../../../local-storage/constants";
import { useState } from "react";

const { get: getBearerToken, set: setBearerToken } =
  createLocalStorageInstance(BEARER_TOKEN);

export const BearerTokenSetting = () => {
  const [bearerTokenState, setBearerTokenState] = useState(
    getBearerToken() ?? ""
  );

  const onChange = (event) => {
    const value = event?.target?.value ?? "";

    setBearerTokenState(value);
    setBearerToken(value);
  };

  return (
    <Grid2 container justifyContent="center">
      <TextField
        id="bearer-token-text-field"
        label="Bearer Token"
        helperText="Make sure it is base64 encoded!"
        value={bearerTokenState}
        onChange={onChange}
        type="text"
      />
    </Grid2>
  );
};
