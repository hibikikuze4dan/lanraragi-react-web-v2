import { Button, Grid2, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentArchiveId } from "../../../redux/selectors";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { useEffect, useRef } from "react";
import { ImageButton } from "./image-button";
import { LoadingSpinner } from "../../loading-spinner";
import { CategoriesSelect } from "../../categories-select";
import { updateDisplayAppBar } from "../../../redux/slices/appSlice";
import { ImagePageRating } from "./image-page-rating";
import clsx from "clsx";
import { useAppPages } from "../../../hooks/useAppPages";

export const ImagesPage = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { updateAppPage, archiveOpenedFrom } = useAppPages();
  const archiveId = useSelector(getCurrentArchiveId);
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const hasImages = !!archivePagesAsLinks.length;
  const ref = useRef();

  const onClick = () => {
    dispatch(updateDisplayAppBar(true));
    updateAppPage(archiveOpenedFrom);
  };

  useEffect(() => {
    if (hasImages) {
      ref.current?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [hasImages]);

  return (
    <Grid2 id="images-page" container spacing={2} justifyContent="center">
      <Grid2 size={12} id="images-start" ref={ref} />
      <LoadingSpinner
        helperText="Loading Archive Images"
        loading={!hasImages}
        size={200}
      >
        {archivePagesAsLinks.map((page, index) => {
          const key = `img-${archiveId}-${index + 1}`;
          return (
            <Grid2 size={12} key={key}>
              <ImageButton
                topOfImagesSectionRef={ref}
                imageId={key}
                index={index}
                imageUrl={page}
                getPageLink={getPageLink}
              />
            </Grid2>
          );
        })}
      </LoadingSpinner>
      <Grid2 className={clsx(isSvp && "px-2")} size={12}>
        <Grid2 className={clsx(!isSvp && "px-20")} container spacing={8}>
          <Grid2 alignContent="center" size={{ xs: 12, md: 6 }}>
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
