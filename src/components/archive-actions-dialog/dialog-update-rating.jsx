import { Box, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { ImagePageRating } from "../pages/images/image-page-rating";

export const DialogUpdateRating = ({ closeDialog = () => null }) => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      id="dialog-content-update-archive-rating"
      className={clsx("w-full py-4", isSvp && "pt-40")}
    >
      <ImagePageRating postRating={closeDialog} />
    </Box>
  );
};

export default DialogUpdateRating;
