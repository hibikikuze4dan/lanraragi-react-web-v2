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
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const loadedImagesSet = useRef(new Set());
  const hasImages = archivePagesAsLinks?.length ?? false;
  const doneWithImages =
    currentPageIndex >= (archivePagesAsLinks?.length ?? 0) && hasImages;
  const [currentPage, setCurrentPage] = useState(null);

  const preloadNext = async () => {
    for (let i = 1; i <= 3; i++) {
      const preloadIndex = currentPageIndex + i;
      const src = await getPageLink(archivePagesAsLinks?.[preloadIndex] ?? "");
      if (src && !loadedImagesSet?.current?.has?.(src)) {
        try {
          await preloadImage(src);
          loadedImagesSet?.current?.add?.(src);
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
  };
  const previousImage = () => {
    if (currentPageIndex !== 0) {
      setCurrentPageIndex((index) => index - 1);
    }
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
  };
};

export default useSwipeImagesLogic;
