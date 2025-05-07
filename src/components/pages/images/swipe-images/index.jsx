import { Grid2 } from "@mui/material";
import { ArchiveEnd } from "./archive-end";
import { LoadingSpinner } from "../../../loading-spinner";
import useSwipeImagesLogic from "./useSwipeImagesLogic";
import ImageOverlayButtons from "./image-overlay-buttons";
import JumpToPage from "./jump-to-page";

export const SwipeImages = () => {
  const {
    centerFloatingButtonId,
    archivePagesAsLinks,
    currentPageIndex,
    doneWithImages,
    handlers,
    hasImages,
    currentPage,
    preloadNext,
    previousImage,
    onCenterClick,
    nextImage,
    onFloatingButtonKeyDown,
    setCurrentPageIndex,
    setLoadedImage,
  } = useSwipeImagesLogic();

  return (
    <>
      <LoadingSpinner
        helperText="Loading Archive Images"
        loading={!hasImages}
        size={200}
      >
        {!doneWithImages ? (
          <>
            <Grid2
              id="swipe-images"
              container
              justifyContent="center"
              className="min-h-full min-w-full relative cursor-pointer"
              {...handlers}
            >
              <img
                className="object-contain pointer-events-none max-h-svh"
                src={currentPage}
                onLoad={preloadNext}
              />
              <ImageOverlayButtons
                previousImage={previousImage}
                nextImage={nextImage}
                onFloatingButtonKeyDown={onFloatingButtonKeyDown}
                centerFloatingButtonId={centerFloatingButtonId}
                onCenterClick={onCenterClick}
              />
            </Grid2>
            <Grid2 container>
              <JumpToPage
                numOfPages={archivePagesAsLinks?.length ?? 0}
                currentPage={currentPageIndex + 1}
                setCurrentPageIndex={setCurrentPageIndex}
                setLoadedImage={setLoadedImage}
              />
            </Grid2>
          </>
        ) : (
          <Grid2 size={12}>
            <ArchiveEnd previousImage={previousImage} />
          </Grid2>
        )}
      </LoadingSpinner>
    </>
  );
};
