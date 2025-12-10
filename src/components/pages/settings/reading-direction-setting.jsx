import { Grid2, TextField } from "@mui/material";
import clsx from "clsx";
import { startCase } from "es-toolkit";
import createLocalStorageInstance, {
  USER_SETTING_READING_DIRECTION,
} from "../../../local-storage";
import { READING_DIRECTIONS } from "../../../constants";
import { useState } from "react";

const {
  get: getUserSettingReadingDirection,
  set: setUserSettingReadingDirection,
} = createLocalStorageInstance(USER_SETTING_READING_DIRECTION);

export const ReadingDirectionSetting = () => {
  const [userSettingReadingDirection, updateUserSettingReadingDirection] =
    useState(
      getUserSettingReadingDirection() ?? READING_DIRECTIONS.LEFT_TO_RIGHT
    );

  const onChange = (event) => {
    const value = event?.target?.value;
    setUserSettingReadingDirection(value);
    updateUserSettingReadingDirection(value);
  };

  return (
    <Grid2 container justifyContent="center">
      <TextField
        className={clsx("min-w-56")}
        id="reading-direction-setting-text-field"
        label="Reading Direction"
        select
        slotProps={{ select: { native: true } }}
        required
        value={userSettingReadingDirection}
        onChange={onChange}
      >
        {Object.values(READING_DIRECTIONS).map((readingDirection) => {
          const optionText = startCase(readingDirection).replaceAll("_", " ");
          return (
            <option
              className="capitalize"
              key={readingDirection}
              value={readingDirection}
            >
              {optionText}
            </option>
          );
        })}
      </TextField>
    </Grid2>
  );
};

export default ReadingDirectionSetting;
