import { Button, Grid2, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentArchiveId } from "../../../redux/selectors";
import { useArchivePages } from "../../../hooks/useArchivePages";
import { useEffect, useRef } from "react";
import { ImageButton } from "./image-button";
import { LoadingSpinner } from "../../loading-spinner";
import { updateDisplayAppBar } from "../../../redux/slices/appSlice";
import { ImagePageRating } from "./image-page-rating";
import clsx from "clsx";
import { useAppPages } from "../../../hooks/useAppPages";
import { useImageObserverRef } from "../../../hooks/useImageObserverRef";

export const ImagesPage = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { updateAppPage, archiveOpenedFrom } = useAppPages();
  const archiveId = useSelector(getCurrentArchiveId);
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const numOfImages = archivePagesAsLinks?.length ?? 0;
  const hasImages = !!numOfImages;
  const ref = useRef(null);
  const containerRef = useRef(null);
  const { imagesToDisplay, setIntersectingImageRef } = useImageObserverRef(
    numOfImages ?? 0
  );
  const archiveImagesToDisplay = archivePagesAsLinks.slice(0, imagesToDisplay);

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
    <Grid2
      ref={containerRef}
      id="images-page"
      container
      spacing={2}
      justifyContent="center"
    >
      <Grid2 size={12} id="images-start" ref={ref} />
      <LoadingSpinner
        helperText="Loading Archive Images"
        loading={!hasImages}
        size={200}
      >
        {archiveImagesToDisplay.map((page, index) => {
          const key = `img-${archiveId}-${index + 1}`;
          return (
            <Grid2 size={12} key={key}>
              <ImageButton
                imageId={key}
                index={index}
                imageUrl={page}
                getPageLink={getPageLink}
                imagesToDisplay={imagesToDisplay}
                setIntersectingImageRef={setIntersectingImageRef}
              />
            </Grid2>
          );
        })}
      </LoadingSpinner>
      <Grid2 className={clsx(isSvp && "px-2")} size={12}>
        <Grid2 className={clsx(!isSvp && "px-20")} container spacing={8}>
          <Grid2 alignContent="center" size={{ xs: 12, md: 12 }}>
            <ImagePageRating />
          </Grid2>
          <Grid2 size={12}>
            <Button
              id="image-page-previous-page-button"
              fullWidth
              variant="outlined"
              className="py-4 mt-5 mb-50"
              onClick={onClick}
            >
              Return to Previous Page
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 size={12} id="images-end" />
    </Grid2>
  );
};
