import { Grid2, Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import useCurrentArchive from "../../../../hooks/useCurrentArchive";
import EndOfArchiveActionButtons from "../../../end-of-archive-action-buttons";

const returnNull = () => null;

export const ArchiveEnd = ({
  previousImage = returnNull,
  setCurrentPageIndex = returnNull,
}) => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { archive } = useCurrentArchive();

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
        <Grid2 container>
          <EndOfArchiveActionButtons
            setCurrentPageIndex={setCurrentPageIndex}
            previousImage={previousImage}
          />
        </Grid2>
      </Grid2>
    </>
  );
};
