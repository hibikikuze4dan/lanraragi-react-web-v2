import { useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { USER_SETTING_READING_DIRECTION } from "../local-storage/constants";
import { RATING } from "../constants";

const { get: getUserSettingReadingDirection, set: setLocalSotrageValue } =
  createLocalStorageInstance(USER_SETTING_READING_DIRECTION);

export const useReadingDirectionSetting = () => {
  const [userSettingReadingDirection, setState] = useState(
    getUserSettingReadingDirection() ?? RATING
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
