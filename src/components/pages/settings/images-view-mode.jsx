import { Grid2, TextField } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import { startCase } from "es-toolkit";
import { VIEW_MODES_FOR_ARCHIVE_IMAGES } from "../../../constants";
import { createLocalStorageInstance } from "../../../local-storage";
import { IMAGES_VIEW_MODE } from "../../../local-storage/constants";

const { get: getImagesViewMode, set: setImagesViewMode } =
  createLocalStorageInstance(IMAGES_VIEW_MODE);

export const ImagesViewMode = () => {
  const [viewMode, updateViewMode] = useState(
    getImagesViewMode() ?? VIEW_MODES_FOR_ARCHIVE_IMAGES[1]
  );

  const onChange = (event) => {
    const value = event?.target?.value;
    setImagesViewMode(value);
    updateViewMode(value);
  };

  return (
    <Grid2 container justifyContent="center">
      <TextField
        className={clsx("min-w-56")}
        id="images-view-mode-text-field"
        label="View Mode"
        select
        slotProps={{ select: { native: true } }}
        required
        value={viewMode}
        onChange={onChange}
      >
        {VIEW_MODES_FOR_ARCHIVE_IMAGES.map((viewMode) => {
          const optionText = startCase(viewMode).replaceAll("_", " ");
          return (
            <option className="capitalize" key={viewMode} value={viewMode}>
              {optionText}
            </option>
          );
        })}
      </TextField>
    </Grid2>
  );
};
