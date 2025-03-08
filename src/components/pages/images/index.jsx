import { Button, Grid2, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getArchiveOpenedFrom,
  getCurrentArchiveId,
} from "../../../redux/selectors";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { useRef } from "react";
import { ImageButton } from "./image-button";
import { LoadingSpinner } from "../../loading-spinner";
import { CategoriesSelect } from "../../categories-select";
import { updateCurrentPage } from "../../../redux/slices/appSlice";
import { ImagePageRating } from "./image-page-rating";
import clsx from "clsx";

export const ImagesPage = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const archiveId = useSelector(getCurrentArchiveId);
  const archiveOpenedFrom = useSelector(getArchiveOpenedFrom);
  const { archivePagesAsLinks } = useArchivePages();
  const ref = useRef();

  const onClick = () => {
    dispatch(updateCurrentPage(archiveOpenedFrom));
  };

  return (
    <Grid2 id="images-page" container spacing={2} justifyContent="center">
      <Grid2 size={12} id="images-start" ref={ref} />
      <LoadingSpinner
        helperText="Loading Archive Images"
        loading={!archivePagesAsLinks.length}
        size={200}
      >
        {archivePagesAsLinks.map((page, index) => {
          const key = `img-${archiveId}-${index + 1}`;
          return (
            <Grid2 size={12} key={key}>
              <ImageButton
                topOfImagesSectionRef={ref}
                imageId={key}
                imageUrl={page}
              />
            </Grid2>
          );
        })}
      </LoadingSpinner>
      <Grid2 size={12}>
        <Grid2 className={clsx(!isSvp && "px-20")} container spacing={8}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <ImagePageRating />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <CategoriesSelect archiveId={archiveId} />
          </Grid2>
          <Grid2 size={12}>
            <Button
              fullWidth
              variant="outlined"
              className="py-4 mt-25 mb-75"
              onClick={onClick}
            >
              Return to Previous Page
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
