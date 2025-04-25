import { Grid2 } from "@mui/material";
import { useEffect } from "react";
import { ArchiveEnd } from "./archive-end";
import { LoadingSpinner } from "../../../loading-spinner";
import useSwipeImagesLogic from "./useSwipeImagesLogic";

export const SwipeImages = () => {
  const {
    setCurrentPage,
    getPageLink,
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
    loadedImage,
    setLoadedIamge,
  } = useSwipeImagesLogic();

  useEffect(() => {
    const updateCurrentPage = async () => {
      const newPage = await getPageLink(archivePagesAsLinks[currentPageIndex]);
      setCurrentPage(newPage);
      setLoadedIamge(true);
    };
    if (!loadedImage && hasImages) {
      updateCurrentPage();
    }
  }, [
    archivePagesAsLinks,
    currentPageIndex,
    getPageLink,
    setCurrentPage,
    setLoadedIamge,
    loadedImage,
    hasImages,
  ]);

  return (
    <>
      <LoadingSpinner
        helperText="Loading Archive Images"
        loading={!hasImages}
        size={200}
      >
        {!doneWithImages ? (
          <Grid2
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
            <div
              role="button"
              onClick={previousImage}
              className="absolute left-0 top-0 h-full w-1/3 cursor-pointer z-10"
            />
            <div
              role="button"
              onClick={onCenterClick}
              className="absolute top-0 left-1/3 h-full w-1/3 cursor-pointer z-10"
            />
            <div
              role="button"
              onClick={nextImage}
              className="absolute right-0 top-0 h-full w-1/3 cursor-pointer z-10"
            />
          </Grid2>
        ) : (
          <Grid2 size={12}>
            <ArchiveEnd previousImage={previousImage} />
          </Grid2>
        )}
      </LoadingSpinner>
    </>
  );
};
