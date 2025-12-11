import { useDispatch, useSelector } from "react-redux";
import { getDisplayAppBar } from "../../../../redux/selectors";
import { useEffect, useRef, useState } from "react";
import { useArchivePages } from "../../../../hooks/useArchivePages";
import { preloadImage } from "../../../../utils/prelaodImage";
import { updateDisplayAppBar } from "../../../../redux/slices/appSlice";
import { useSwipeable } from "react-swipeable";
import { useReadingDirectionSetting } from "../../../../hooks/useReadingDirectionSetting";
import { READING_DIRECTIONS } from "../../../../constants";

export const useSwipeImagesLogic = () => {
  const centerFloatingButtonId = "swipe-images-center-floating-button";
  const dispatch = useDispatch();
  const displayAppBar = useSelector(getDisplayAppBar);
  const [currentPageIndex, updateCurrentPageIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState(false);
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const { userSettingReadingDirection } = useReadingDirectionSetting();
  const [currentPage, setCurrentPage] = useState(null);
  const loadedImagesMap = useRef(new Map());
  const hasImages = archivePagesAsLinks?.length ?? false;
  const doneWithImages =
    currentPageIndex >= (archivePagesAsLinks?.length ?? 0) && hasImages;
  const isReadingDirectionLeftToRight =
    userSettingReadingDirection === READING_DIRECTIONS.LEFT_TO_RIGHT;

  const setCurrentPageIndex = (index) => {
    updateCurrentPageIndex(index);
    setLoadedImage(false);
  };
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
    const change = isReadingDirectionLeftToRight ? 1 : -1;
    const progressionCheck = isReadingDirectionLeftToRight
      ? !doneWithImages
      : currentPageIndex !== 0;
    if (progressionCheck) {
      setCurrentPageIndex((index) => index + change);
    }
    setLoadedImage(false);
  };
  const previousImage = () => {
    const change = isReadingDirectionLeftToRight ? -1 : 1;
    const progressionCheck = isReadingDirectionLeftToRight
      ? currentPageIndex !== 0
      : !doneWithImages;
    if (progressionCheck) {
      setCurrentPageIndex((index) => index + change);
    }
    setLoadedImage(false);
  };

  const onBackToLastImage = () => {
    setCurrentPageIndex((archivePagesAsLinks?.length ?? 0) - 1);
    setLoadedImage(false);
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

  const onFloatingButtonKeyDown = (event) => {
    const eventCode = event?.code;
    const isLeft = eventCode === "ArrowLeft";
    const isRight = eventCode === "ArrowRight";
    if (isLeft) {
      previousImage();
    } else if (isRight) {
      nextImage();
    }
  };

  useEffect(() => {
    const updateCurrentPage = async () => {
      const newPage = await getPageLink(archivePagesAsLinks[currentPageIndex]);
      setCurrentPage(newPage);
      setLoadedImage(true);
    };
    if (!loadedImage && hasImages) {
      updateCurrentPage();
    }
  }, [
    archivePagesAsLinks,
    currentPageIndex,
    getPageLink,
    setCurrentPage,
    setLoadedImage,
    loadedImage,
    hasImages,
  ]);

  useEffect(() => {
    if (hasImages && !doneWithImages) {
      document.getElementById(centerFloatingButtonId)?.focus?.();
    }
  }, [hasImages, doneWithImages, centerFloatingButtonId]);

  return {
    centerFloatingButtonId,
    handlers,
    onCenterClick,
    preloadNext,
    setCurrentPage,
    setCurrentPageIndex,
    currentPage,
    getPageLink,
    archivePagesAsLinks,
    currentPageIndex,
    doneWithImages,
    hasImages,
    previousImage,
    nextImage,
    loadedImage,
    setLoadedImage,
    onFloatingButtonKeyDown,
    onBackToLastImage,
  };
};

export default useSwipeImagesLogic;
