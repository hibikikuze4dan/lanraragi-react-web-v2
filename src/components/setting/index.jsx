import { Grid2, Typography } from "@mui/material";

export const SettingWrapper = ({
  title = "",
  description = "",
  children,
  spacing = 2,
}) => {
  return (
    <Grid2 className="setting-wrapper-component" container spacing={spacing}>
      <Grid2 size={12}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">{description}</Typography>
      </Grid2>
      <Grid2 size={12}>{children}</Grid2>
    </Grid2>
  );
};
