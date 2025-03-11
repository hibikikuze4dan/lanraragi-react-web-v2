import { Button, Grid2 } from "@mui/material";
import {
  updateDisplayAppBar,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisplayAppBar } from "../../../redux/selectors";
import clsx from "clsx";

export const ImageButton = ({
  topOfImagesSectionRef,
  imageUrl,
  imageId,
  getPageLink,
}) => {
  const dispatch = useDispatch();
  const displayAppBar = useSelector(getDisplayAppBar);
  const [url, setUrl] = useState("");
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

  const scrollToTargetImage = useCallback(
    ({ imagesScrollTarget, topOfImagesSectionRef }) => {
      try {
        if (!imagesScrollTarget) {
          topOfImagesSectionRef?.current?.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        } else {
          document
            .querySelector(imagesScrollTarget)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
        }
      } catch (err) {
        console.log(
          `Something went wrong while trying to scroll to image page element: ${err}`
        );
        return;
      }
    },
    []
  );

  const onImageClick = (event) => {
    const eventTargetId = event?.target?.id;
    dispatch(updateDisplayAppBar(!displayAppBar));
    dispatch(updateImagesScrollTarget(`#${eventTargetId}`));
    setTimeout(() => {
      scrollToTargetImage({
        imagesScrollTarget: `#${eventTargetId}`,
        topOfImagesSectionRef,
      });
    }, 250);
  };

  const onImageLoad = () => {
    if (imageRef?.current) {
      setMaxWidth(`${imageRef.current?.naturalWidth}px`);
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
          alt={`image ${imageId}`}
          ref={imageRef}
          id={`${imageId}-img-id`}
          className="w-full"
          loading="lazy"
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
