import { Button, Grid2, useMediaQuery } from "@mui/material";
import { LoadingSpinner } from "../../../loading-spinner";
import { ImageButton } from "../image-button";
import { useRef } from "react";
import { useArchivePages } from "../../../../hooks/useArchivePages";
import { getCurrentArchiveId } from "../../../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useImageObserverRef } from "../../../../hooks/useImageObserverRef";
import clsx from "clsx";
import { updateDisplayAppBar } from "../../../../redux/slices/appSlice";
import useAppPages from "../../../../hooks/useAppPages";
import { useArchiveActionsDialogLogic } from "../../../../hooks/useArchiveActionsDialogLogic";
import {
  UPDATE_ARCHIVE_CATEGORY,
  UPDATE_ARCHIVE_RATING,
} from "../../../../constants";

export const ScrollImages = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { setActionType } = useArchiveActionsDialogLogic();
  const { updateAppPage, archiveOpenedFrom } = useAppPages();
  const archiveId = useSelector(getCurrentArchiveId);
  const { archivePagesAsLinks, getPageLink } = useArchivePages();
  const numOfImages = archivePagesAsLinks?.length ?? 0;
  const hasImages = !!numOfImages;
  const ref = useRef(null);
  const { imagesToDisplay, setIntersectingImageRef } = useImageObserverRef(
    numOfImages ?? 0
  );
  const archiveImagesToDisplay = archivePagesAsLinks.slice(0, imagesToDisplay);

  const onClick = () => {
    dispatch(updateDisplayAppBar(true));
    updateAppPage(archiveOpenedFrom);
  };

  return (
    <>
      <Grid2 size={12} id="images-start" ref={ref} />
      <LoadingSpinner
        helperText="Loading Archive Images"
        loading={!hasImages}
        size={200}
      >
        {archiveImagesToDisplay.map((page, index) => {
          const key = `img-${archiveId}-${index + 1}`;
          return (
            <Grid2 size={12} key={key}>
              <ImageButton
                imageId={key}
                index={index}
                imageUrl={page}
                getPageLink={getPageLink}
                imagesToDisplay={imagesToDisplay}
                setIntersectingImageRef={setIntersectingImageRef}
              />
            </Grid2>
          );
        })}
      </LoadingSpinner>
      <Grid2 className={clsx(isSvp && "px-2")} size={12}>
        <Grid2 className={clsx(!isSvp && "px-20")} container spacing={8}>
          <Grid2 size={6}>
            <Button
              fullWidth
              variant="outlined"
              className="py-4"
              onClick={() => setActionType(UPDATE_ARCHIVE_CATEGORY)}
            >
              Categorize Archive
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button
              fullWidth
              variant="outlined"
              className="py-4"
              onClick={() => setActionType(UPDATE_ARCHIVE_RATING)}
            >
              Rate
              {isSvp && <br />} Archive
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button
              id="image-page-return-to-archives"
              fullWidth
              variant="outlined"
              className="py-4"
              onClick={onClick}
            >
              Return to {archiveOpenedFrom}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 size={12} id="images-end" />
    </>
  );
};
