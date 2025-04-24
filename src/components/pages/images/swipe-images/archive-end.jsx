import { Button, Grid2, Typography, useMediaQuery } from "@mui/material";
import { ImagePageRating } from "../image-page-rating";
import clsx from "clsx";
import { updateDisplayAppBar } from "../../../../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import useAppPages from "../../../../hooks/useAppPages";
import useCurrentArchive from "../../../../hooks/useCurrentArchive";

export const ArchiveEnd = ({ previousImage = () => null }) => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { updateAppPage, archiveOpenedFrom } = useAppPages();
  const { archive } = useCurrentArchive();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(updateDisplayAppBar(true));
    updateAppPage(archiveOpenedFrom);
  };

  return (
    <>
      <Grid2
        className={clsx("mt-20", !isSvp && "px-20", isSvp && "px-5")}
        justifyContent="space-around"
        container
        spacing={8}
      >
        <Grid2 alignContent="center" size={{ xs: 12, md: 12 }}>
          <Typography>
            Finished reading archive:
            <br />
            {archive?.title ?? ""}
          </Typography>
        </Grid2>
        <Grid2 alignContent="center" size={{ xs: 12, md: 12 }}>
          <ImagePageRating />
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
            Return to Archives
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};
