import { useEffect, useRef, useState } from "react";
import { IMAGE_BUTTON_CLASSNAME } from "../classnames";

export const useImageObserverRef = () => {
  const [imagesToDisplay, setImagesToDisplay] = useState(10);
  const imagesObserverRef = useRef(null);
  const [intersectingImageRef, setIntersectingImageRef] = useState(null);

  useEffect(() => {
    imagesObserverRef.current = new IntersectionObserver(
      (images) => {
        const lastVisible = images[0];
        if (lastVisible.isIntersecting) {
          setImagesToDisplay((previousValue) => previousValue + 10);
        }
      },
      { rootMargin: "3200px 0px", threshold: 0.01 } // Adjust the margin and threshold to trigger sooner
    );
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll(`.${IMAGE_BUTTON_CLASSNAME}`);
    if (images.length > 5) {
      imagesObserverRef.current?.observe(images[images.length - 5]);
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
