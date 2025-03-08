import { Box, useMediaQuery } from "@mui/material";
import { CategoriesSelect } from "../categories-select";
import { useSelector } from "react-redux";
import { getCurrentArchiveId } from "../../redux/selectors";
import clsx from "clsx";

export const DialogCategoriesContent = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const currentArchiveId = useSelector(getCurrentArchiveId);

  return (
    <Box
      id="dialog-content-categories-update"
      className={clsx("w-full py-4", isSvp && "pt-40")}
    >
      <CategoriesSelect archiveId={currentArchiveId} />
    </Box>
  );
};
