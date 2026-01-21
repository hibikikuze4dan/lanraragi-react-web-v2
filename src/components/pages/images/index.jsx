import { Grid2 } from "@mui/material";
import { useRef } from "react";
import { ScrollImages } from "./scroll-images";
import { SwipeImages } from "./swipe-images";
import {
  IMAGES_PAGE_ID,
  SCROLLING_PAGE_VIEW_MODE,
  SINGLE_PAGE_VIEW_MODE,
} from "../../../constants";
import useImageViewMode from "../../../hooks/useImageViewMode";

const viewModes = {
  [SINGLE_PAGE_VIEW_MODE]: SwipeImages,
  [SCROLLING_PAGE_VIEW_MODE]: ScrollImages,
};

export const ImagesPage = () => {
  const containerRef = useRef(null);
  const { tempViewMode, isViewModeAlwaysAsk, imageViewMode } =
    useImageViewMode();
  const AlwaysAskViewModeComponent =
    viewModes?.[tempViewMode ?? SCROLLING_PAGE_VIEW_MODE] ?? Grid2;
  const ViewModeComponent =
    viewModes?.[imageViewMode ?? SCROLLING_PAGE_VIEW_MODE] ?? Grid2;
  const Component = isViewModeAlwaysAsk
    ? AlwaysAskViewModeComponent
    : ViewModeComponent;

  return (
    <>
      <Grid2
        className="min-h-full min-w-full"
        ref={containerRef}
        id={IMAGES_PAGE_ID}
        container
        spacing={2}
        justifyContent="center"
      >
        <Component />
      </Grid2>
    </>
  );
};
