import { Grid2, TextField } from "@mui/material";
import { ARCHIVES_RENDERED } from "../../../local-storage/constants";
import { createLocalStorageInstance } from "../../../local-storage";
import { useState } from "react";

const { get: getArchivesRendered, set: setArchivesRendered } =
  createLocalStorageInstance(ARCHIVES_RENDERED);

export const ArchivesRenderedSetting = () => {
  const [archivesRenderedState, setArchivesRenderedState] = useState(
    Number(getArchivesRendered() ?? 10)
  );

  const onChange = (event) => {
    const value = event?.target?.value;
    setArchivesRenderedState(Number(value ?? 10));
    setArchivesRendered(value ?? "10");
  };

  return (
    <Grid2 container justifyContent="center">
      <TextField
        id="archives-rendered-text-field"
        label="Archives Rendered"
        placeholder="10"
        required
        value={archivesRenderedState}
        onChange={onChange}
        type="number"
      />
    </Grid2>
  );
};
