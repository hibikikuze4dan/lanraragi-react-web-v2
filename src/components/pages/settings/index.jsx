import { Grid2, useMediaQuery } from "@mui/material";
import { SettingWrapper } from "../../setting";
import { SETTINGS_TO_DISPLAY } from "./constants";
import clsx from "clsx";

export const SettingsPage = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Grid2
      className={clsx("pb-80", !isSvp && "px-20")}
      id="settings-page"
      container
      spacing={3}
    >
      {SETTINGS_TO_DISPLAY.map((setting) => {
        const settingTitle = setting?.title ?? "";
        const Component = setting?.component ?? Grid2;
        return (
          <Grid2 className="pb-4 border-b" key={settingTitle} size={12}>
            <SettingWrapper
              title={settingTitle}
              description={setting?.description}
            >
              <Component />
            </SettingWrapper>
          </Grid2>
        );
      })}
    </Grid2>
  );
};
