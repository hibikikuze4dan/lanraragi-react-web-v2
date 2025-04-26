import { Grid2 } from "@mui/material";
import { useEffect } from "react";
import { ArchiveEnd } from "./archive-end";
import { LoadingSpinner } from "../../../loading-spinner";
import useSwipeImagesLogic from "./useSwipeImagesLogic";

export const SwipeImages = () => {
  const {
    centerFloatingButtonId,
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
    onFloatingButtonKeyDown,
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

  useEffect(() => {
    if (hasImages && !doneWithImages) {
      document.getElementById(centerFloatingButtonId)?.focus?.();
    }
  }, [hasImages, doneWithImages, centerFloatingButtonId]);

  return (
    <>
      <LoadingSpinner
        helperText="Loading Archive Images"
        loading={!hasImages}
        size={200}
      >
        {!doneWithImages ? (
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
            <button
              onClick={previousImage}
              className="absolute left-0 top-0 h-full w-1/3 cursor-pointer z-10 bg-transparent border-none"
              onKeyDown={onFloatingButtonKeyDown}
              tabIndex={-1}
            />
            <button
              id={centerFloatingButtonId}
              onClick={onCenterClick}
              className="absolute top-0 left-1/3 h-full w-1/3 cursor-pointer z-10 bg-transparent border-none outline-none"
              onKeyDown={onFloatingButtonKeyDown}
            />
            <button
              onClick={nextImage}
              className="absolute right-0 top-0 h-full w-1/3 cursor-pointer z-10 bg-transparent border-none"
              onKeyDown={onFloatingButtonKeyDown}
              tabIndex={-1}
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
