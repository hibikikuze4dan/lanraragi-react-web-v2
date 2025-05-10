import { Grid2, useMediaQuery } from "@mui/material";
import { LoadingSpinner } from "../../../loading-spinner";
import { ImageButton } from "../image-button";
import { useRef } from "react";
import { useArchivePages } from "../../../../hooks/useArchivePages";
import { getCurrentArchiveId } from "../../../../redux/selectors";
import { useSelector } from "react-redux";
import { useImageObserverRef } from "../../../../hooks/useImageObserverRef";
import clsx from "clsx";
import EndOfArchiveActionButtons from "../../../end-of-archive-action-buttons";
import { SCROLL_IMAGES_START_ID } from "../../../../constants";

export const ScrollImages = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const archiveId = useSelector(getCurrentArchiveId);
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const numOfImages = archivePagesAsLinks?.length ?? 0;
  const hasImages = !!numOfImages;
  const ref = useRef(null);
  const { imagesToDisplay, setIntersectingImageRef } = useImageObserverRef(
    numOfImages ?? 0
  );
  const archiveImagesToDisplay = archivePagesAsLinks.slice(0, imagesToDisplay);

  return (
    <>
      <Grid2 size={12} id={SCROLL_IMAGES_START_ID} ref={ref} />
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
        <EndOfArchiveActionButtons />
      </Grid2>
      <Grid2 size={12} id="images-end" />
    </>
  );
};
