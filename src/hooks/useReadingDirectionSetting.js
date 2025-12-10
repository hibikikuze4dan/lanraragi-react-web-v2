import { useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { USER_SETTING_READING_DIRECTION } from "../local-storage/constants";
import { READING_DIRECTIONS } from "../constants";

const { get: getUserSettingReadingDirection, set: setLocalSotrageValue } =
  createLocalStorageInstance(USER_SETTING_READING_DIRECTION);

export const useReadingDirectionSetting = () => {
  const [userSettingReadingDirection, setState] = useState(
    getUserSettingReadingDirection() ?? READING_DIRECTIONS.LEFT_TO_RIGHT
  );

  const setUserSettingReadingDirection = (value = "") => {
    setState(value);
    setLocalSotrageValue(value);
  };

  return {
    userSettingReadingDirection,
    getUserSettingReadingDirection,
    setUserSettingReadingDirection,
  };
};
