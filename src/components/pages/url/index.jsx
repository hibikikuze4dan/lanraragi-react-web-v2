import { BaseUrlSetter } from "../../base-url-setter";
import { useUrls } from "../../../hooks/useUrls";
import { Grid2 } from "@mui/material";

export const UrlPage = ({ children }) => {
  const { baseUrl, updateBaseUrl } = useUrls();

  return baseUrl ? (
    <>{children}</>
  ) : (
    <Grid2 container>
      <Grid2 alignContent="center" size={12}>
        <BaseUrlSetter onClick={updateBaseUrl} />
      </Grid2>
    </Grid2>
  );
};
