import { FormControlLabel, FormGroup, Grid2, Switch } from "@mui/material";
import { createLocalStorageInstance } from "../../../local-storage";
import { FORCE_NO_FUN_MODE } from "../../../local-storage/constants";
import { useState } from "react";

const { get: getForceNoFunMode, set: setForceNoFunMode } =
  createLocalStorageInstance(FORCE_NO_FUN_MODE);

export const ForceNoFunMode = () => {
  const [forceNoFunMode, updateForceNoFunMode] = useState(
    getForceNoFunMode() ?? "false"
  );

  const onChange = () => {
    if (forceNoFunMode === "true") {
      updateForceNoFunMode("false");
      setForceNoFunMode("false");
    } else {
      updateForceNoFunMode("true");
      setForceNoFunMode("true");
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={forceNoFunMode === "true"} onChange={onChange} />
          }
          label="Force No Fun Mode Behavior"
          labelPlacement="end"
        />
      </FormGroup>
    </Grid2>
  );
};
