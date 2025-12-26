import { Grid2, useMediaQuery } from "@mui/material";
import { LoadingSpinner } from "../../../loading-spinner";
import { ImageButton } from "../image-button";
import { useRef } from "react";
import { useArchivePages } from "../../../../hooks/useArchivePages";
import { useImageObserverRef } from "../../../../hooks/useImageObserverRef";
import clsx from "clsx";
import EndOfArchiveActionButtons from "../../../end-of-archive-action-buttons";
import { SCROLL_IMAGES_START_ID } from "../../../../constants";
import useCurrentArchive from "../../../../hooks/useCurrentArchive";

export const ScrollImages = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { archive, currentArchiveId: archiveId } = useCurrentArchive();
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const archivePageCount = archive?.pagecount;
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
                archiveId={archive?.arcid}
                archivePageCount={archivePageCount}
                getPageLink={getPageLink}
                imageId={key}
                index={index}
                imageUrl={page}
                imagesToDisplay={imagesToDisplay}
                lastImage={archivePageCount === index + 1}
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
