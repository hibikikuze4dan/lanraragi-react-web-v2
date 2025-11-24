import { useEffect, useRef, useState } from "react";
import { COMPONENT_CLASSNAMES } from "../constants";

export const useImageObserverRef = (pages = 0) => {
  const [imagesToDisplay, setImagesToDisplay] = useState(10);
  const imagesObserverRef = useRef(null);
  const [intersectingImageRef, setIntersectingImageRef] = useState(null);
  const needMorePages = pages >= imagesToDisplay;

  useEffect(() => {
    imagesObserverRef.current = new IntersectionObserver(
      (watchedElements) => {
        const anyIntersecting = watchedElements.some(
          (element) => !!element.isIntersecting
        );

        if (anyIntersecting && needMorePages) {
          setImagesToDisplay((previousValue) => previousValue + 10);
        }
      },
      { rootMargin: "3200px 0px", threshold: 0.01 } // Adjust the margin and threshold to trigger sooner
    );
  }, [pages, imagesToDisplay, needMorePages]);

  useEffect(() => {
    const images = document.querySelectorAll(
      `.${COMPONENT_CLASSNAMES.IMAGE_BUTTON_CLASSNAME}`
    );

    const previousPageButton = document.getElementById("images-end");

    if (images.length > 5) {
      imagesObserverRef.current?.observe(images[images.length - 5]);
      imagesObserverRef.current?.observe(previousPageButton);
    }

    return () => imagesObserverRef.current?.disconnect();
  }, [imagesToDisplay, intersectingImageRef]);

  return {
    imagesToDisplay,
    imagesObserverRef,
    intersectingImageRef,
    setIntersectingImageRef,
  };
};
