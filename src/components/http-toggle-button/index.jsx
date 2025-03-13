import { Button } from "@mui/material";
import { useUrls } from "../../hooks/useUrls";

export const HTTPToggleButton = () => {
  const { httpOrHttps, updateHttpOrHttps } = useUrls();

  const onClick = () => {
    updateHttpOrHttps(httpOrHttps);
  };

  return (
    <Button
      id="http-or-https-toggle-button"
      fullWidth
      className="h-full px-10"
      onClick={onClick}
      variant="outlined"
    >
      {httpOrHttps}
    </Button>
  );
};
