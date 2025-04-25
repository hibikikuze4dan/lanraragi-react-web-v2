import { useDispatch, useSelector } from "react-redux";
import { getDisplayAppBar } from "../../../../redux/selectors";
import { useRef, useState } from "react";
import { useArchivePages } from "../../../../hooks/useArchivePages";
import { preloadImage } from "../../../../utils/prelaodImage";
import { updateDisplayAppBar } from "../../../../redux/slices/appSlice";
import { useSwipeable } from "react-swipeable";

export const useSwipeImagesLogic = () => {
  const dispatch = useDispatch();
  const displayAppBar = useSelector(getDisplayAppBar);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loadedImage, setLoadedIamge] = useState(false);
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const loadedImagesMap = useRef(new Map());
  const hasImages = archivePagesAsLinks?.length ?? false;
  const doneWithImages =
    currentPageIndex >= (archivePagesAsLinks?.length ?? 0) && hasImages;
  const [currentPage, setCurrentPage] = useState(null);

  const preloadNext = async () => {
    // Make the number of preloaded images a setting in the future
    for (let i = 1; i <= 10; i++) {
      const preloadIndex = currentPageIndex + i;
      const preloadPageUrl = archivePagesAsLinks?.[preloadIndex] ?? "";
      const src = await getPageLink(preloadPageUrl);
      if (src && !loadedImagesMap?.current?.has?.(preloadPageUrl)) {
        try {
          await preloadImage(src);
          loadedImagesMap?.current?.set?.(preloadPageUrl, src);
        } catch (err) {
          console.warn(`Failed to preload: ${src}\nError: ${err}`);
        }
      }
    }
  };

  const onCenterClick = () => dispatch(updateDisplayAppBar(!displayAppBar));
  const nextImage = () => {
    if (!doneWithImages) {
      setCurrentPageIndex((index) => index + 1);
    }
    setLoadedIamge(false);
  };
  const previousImage = () => {
    if (currentPageIndex !== 0) {
      setCurrentPageIndex((index) => index - 1);
    }
    setLoadedIamge(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      nextImage();
    },
    onSwipedRight: () => {
      previousImage();
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return {
    handlers,
    onCenterClick,
    preloadNext,
    setCurrentPage,
    currentPage,
    getPageLink,
    archivePagesAsLinks,
    currentPageIndex,
    doneWithImages,
    hasImages,
    previousImage,
    nextImage,
    loadedImage,
    setLoadedIamge,
  };
};

export default useSwipeImagesLogic;
