import { Button, Grid2 } from "@mui/material";
import {
  updateDisplayAppBar,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisplayAppBar } from "../../../redux/selectors";
import clsx from "clsx";
import { COMPONENT_CLASSNAMES } from "../../../constants";
import { putUpdateReadingProgression } from "../../../requests/putUpdateReadingProgression";

export const ImageButton = ({
  archiveId,
  archivePageCount,
  imageUrl,
  imageId,
  getPageLink,
  index = 0,
  setIntersectingImageRef,
  imagesToDisplay = 0,
  lastImage = false,
}) => {
  const dispatch = useDispatch();
  const displayAppBar = useSelector(getDisplayAppBar);
  const [url, setUrl] = useState(null);
  const [triedToGetUrl, setTriedToGetUrl] = useState(false);
  const [maxWidth, setMaxWidth] = useState("100%");
  const hasImageLoaded = maxWidth === "100%";
  const imageRef = useRef();

  useEffect(() => {
    if (!url && !triedToGetUrl) {
      setTriedToGetUrl(true);
      getPageLink(imageUrl).then((url) => {
        setUrl(url);
      });
    }
  }, [getPageLink, imageUrl, triedToGetUrl, url]);

  const onImageClick = (event) => {
    const eventTargetId = event?.target?.id;
    dispatch(updateDisplayAppBar(!displayAppBar));
    dispatch(updateImagesScrollTarget(`#${eventTargetId}`));
  };

  const onImageLoad = (event) => {
    if (imageRef?.current) {
      setMaxWidth(`${imageRef.current?.naturalWidth}px`);
    }

    if ([imagesToDisplay - 5, imagesToDisplay].includes(index)) {
      setIntersectingImageRef(event?.target);
    }

    if (lastImage && archivePageCount) {
      putUpdateReadingProgression({ archiveId, page: archivePageCount });
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <Button
        id={`${imageId}-button-id`}
        className={clsx(
          "px-0",
          COMPONENT_CLASSNAMES.IMAGE_BUTTON_CLASSNAME,
          hasImageLoaded && "min-h-400 flex content-start items-start"
        )}
        onClick={onImageClick}
        variant="text"
      >
        <img
          alt={`image ${index + 1}`}
          ref={(ref) => {
            imageRef.current = ref;
          }}
          id={`${imageId}-img-id`}
          className="w-full"
          src={url}
          width={1200}
          height={1600}
          onLoad={onImageLoad}
          style={{ maxWidth }}
        />
      </Button>
    </Grid2>
  );
};
