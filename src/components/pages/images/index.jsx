import { Grid2 } from "@mui/material";
import { useRef } from "react";
import { ScrollImages } from "./scroll-images";
import { SwipeImages } from "./swipe-images";
import { createLocalStorageInstance } from "../../../local-storage";
import { IMAGES_VIEW_MODE } from "../../../local-storage/constants";
import {
  SCROLLING_PAGE_VIEW_MODE,
  SINGLE_PAGE_VIEW_MODE,
} from "../../../constants";

const viewModes = {
  [SINGLE_PAGE_VIEW_MODE]: SwipeImages,
  [SCROLLING_PAGE_VIEW_MODE]: ScrollImages,
};

const { get: getImagesViewMode } = createLocalStorageInstance(IMAGES_VIEW_MODE);

export const ImagesPage = () => {
  const containerRef = useRef(null);
  const ViewModeComponent =
    viewModes?.[getImagesViewMode() ?? SCROLLING_PAGE_VIEW_MODE] ?? Grid2;

  return (
    <>
      <Grid2
        className="min-h-full min-w-full"
        ref={containerRef}
        id="images-page"
        container
        spacing={2}
        justifyContent="center"
      >
        <ViewModeComponent />
      </Grid2>
    </>
  );
};
