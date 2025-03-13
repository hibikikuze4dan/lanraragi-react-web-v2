import { Button, Grid2 } from "@mui/material";
import {
  updateDisplayAppBar,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisplayAppBar } from "../../../redux/selectors";
import clsx from "clsx";

export const ImageButton = ({
  imageUrl,
  imageId,
  getPageLink,
  index = 0,
  setImagesToDisplay,
  imagesToDisplay,
}) => {
  const dispatch = useDispatch();
  const displayAppBar = useSelector(getDisplayAppBar);
  const [url, setUrl] = useState(null);
  const [triedToGetUrl, setTriedToGetUrl] = useState(false);
  const [maxWidth, setMaxWidth] = useState("100%");
  const hasImageLoaded = maxWidth === "100%";
  const imageRef = useRef();
  const isLastImageOfGroup = index === imagesToDisplay - 1;

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

  const onImageLoad = () => {
    if (imageRef?.current) {
      setMaxWidth(`${imageRef.current?.naturalWidth}px`);
    }
    if (isLastImageOfGroup) {
      setImagesToDisplay(imagesToDisplay + 5);
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <Button
        id={`${imageId}-button-id`}
        className={clsx(
          "px-0",
          hasImageLoaded && "min-h-400 flex content-start items-start"
        )}
        onClick={onImageClick}
        variant="text"
      >
        <img
          alt={`image ${index + 1}`}
          ref={imageRef}
          id={`${imageId}-img-id`}
          className="w-full"
          loading={isLastImageOfGroup ? "lazy" : "eager"}
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
