import { Button, Grid2, Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { updateDisplayAppBar } from "../../../../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import useAppPages from "../../../../hooks/useAppPages";
import useCurrentArchive from "../../../../hooks/useCurrentArchive";
import { useArchiveActionsDialogLogic } from "../../../../hooks/useArchiveActionsDialogLogic";
import {
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_RATING,
} from "../../../../constants";

export const ArchiveEnd = ({ previousImage = () => null }) => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { updateAppPage, archiveOpenedFrom } = useAppPages();
  const { setActionType } = useArchiveActionsDialogLogic();
  const { archive } = useCurrentArchive();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(updateDisplayAppBar(true));
    updateAppPage(archiveOpenedFrom);
  };

  return (
    <>
      <Grid2
        id="end-of-archive-images"
        className={clsx("mt-20", !isSvp && "px-20", isSvp && "px-5")}
        justifyContent="space-around"
        container
        spacing={4}
      >
        <Grid2 alignContent="center" size={{ xs: 12, md: 12 }}>
          <Typography>
            Finished reading archive:
            <br />
            {archive?.title ?? ""}
          </Typography>
        </Grid2>
        <Grid2 size={6}>
          <Button
            fullWidth
            variant="outlined"
            className="py-4"
            onClick={() => setActionType(UPDATE_ARCHIVE_CATEGORY)}
          >
            Categorize Archive
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <Button
            fullWidth
            variant="outlined"
            className="py-4"
            onClick={() => setActionType(UPDATE_ARCHIVE_RATING)}
          >
            Rate
            {isSvp && <br />} Archive
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <Button
            id="image-page-previous-page-button"
            fullWidth
            variant="outlined"
            className="py-4"
            onClick={previousImage}
          >
            Return to Last Page
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <Button
            id="image-page-return-to-archives"
            fullWidth
            variant="outlined"
            className="py-4"
            onClick={onClick}
          >
            Return to {archiveOpenedFrom}
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};
