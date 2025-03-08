import { Button, Grid2 } from "@mui/material";
import {
  updateDisplayAppBar,
  updateImagesScrollTarget,
} from "../../../redux/slices/appSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDisplayAppBar,
  getImagesScrollTarget,
} from "../../../redux/selectors";

export const ImageButton = ({ topOfImagesSectionRef, imageUrl, imageId }) => {
  const dispatch = useDispatch();
  const displayAppBar = useSelector(getDisplayAppBar);
  const imagesScrollTarget = useSelector(getImagesScrollTarget);
  const [maxWidth, setMaxWidth] = useState("100%");
  const imageRef = useRef();

  useEffect(() => {
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
  }, [imagesScrollTarget, topOfImagesSectionRef]);

  const onImageClick = (event) => {
    const eventTargetId = event?.target?.id;
    dispatch(updateDisplayAppBar(!displayAppBar));
    dispatch(updateImagesScrollTarget(`#${eventTargetId}`));
  };

  const onImageLoad = () => {
    if (imageRef?.current) {
      setMaxWidth(`${imageRef.current?.naturalWidth}px`);
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <Button id={`${imageId}-button-id`} onClick={onImageClick} variant="text">
        <img
          alt={`image ${imageId}`}
          ref={imageRef}
          id={`${imageId}-img-id`}
          className="w-full"
          loading="lazy"
          src={imageUrl}
          width={1200}
          height={1600}
          onLoad={onImageLoad}
          style={{ maxWidth }}
        />
      </Button>
    </Grid2>
  );
};
