import { Button } from "@mui/material";
import { createLocalStorageInstance } from "../../local-storage";
import { HTTP_OR_HTTPS } from "../../local-storage/constants";
import { useState } from "react";

const { get, set } = createLocalStorageInstance(HTTP_OR_HTTPS);

export const HTTPToggleButton = () => {
  const [httpOrHttps, setHttpOrHttps] = useState(get() ?? "");

  const isHttp = httpOrHttps === "http";
  const copy = isHttp ? "http" : "https";

  const onClick = () => {
    const value = isHttp ? "https" : "http";
    set(value);
    setHttpOrHttps(value);
  };

  return (
    <Button
      id="http-or-https-toggle-button"
      fullWidth
      className="h-full px-10"
      onClick={onClick}
      variant="outlined"
    >
      {copy}
    </Button>
  );
};
