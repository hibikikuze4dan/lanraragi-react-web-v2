import { FormControlLabel, FormGroup, Grid2, Switch } from "@mui/material";
import { createLocalStorageInstance } from "../../../local-storage";
import { USE_API_HISTORY } from "../../../local-storage/constants";
import { useState } from "react";

const { get: getUseApiHistory, set: setUseApiHistory } =
  createLocalStorageInstance(USE_API_HISTORY);

export const ClientVsApiHistory = () => {
  const [useApiHistory, updateUseApiHistory] = useState(
    getUseApiHistory() ?? "false"
  );

  const onChange = () => {
    if (useApiHistory === "true") {
      updateUseApiHistory("false");
      setUseApiHistory("false");
    } else {
      updateUseApiHistory("true");
      setUseApiHistory("true");
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={useApiHistory === "true"} onChange={onChange} />
          }
          label="Use API for History"
          labelPlacement="end"
        />
      </FormGroup>
    </Grid2>
  );
};

export default ClientVsApiHistory;
