import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import { memo, useRef, useState } from "react";
import { THUMBNAIL_URL } from "../../requests/constants";
import { ArchiveCardLowerButtons } from "./archive-card-lower-buttons";
import { TitleButton } from "./title-button";
import { makeTagsObject } from "../../utils/makeTagsObject";

export const ArchiveCard = memo(function ArchiveCard({
  archive,
  baseUrl,
  currentPage,
  getNewArchivePages,
  ratingNamespace,
}) {
  const imageRef = useRef();
  const [maxWidth, setMaxWidth] = useState("100%");
  const [height, setHeight] = useState("100%");
  const archiveId = archive?.arcid ?? "";
  const thumbnailEndpoint = THUMBNAIL_URL.replace(":id", archiveId);
  const thumbnailUrl = `${baseUrl}${thumbnailEndpoint}`;

  const onImageLoad = () => {
    if (imageRef?.current) {
      setMaxWidth(`${imageRef.current?.naturalWidth}px`);
      setHeight(`${imageRef.current?.naturalHeight}px`);
    }
  };

  const tags = makeTagsObject(archive?.tags ?? "");

  const rating = tags?.[ratingNamespace];

  return (
    <Card className="h-full flex flex-col">
      <div className="min-h-75 max-h-75 content-center p-2 flex justify-center">
        <CardMedia
          ref={imageRef}
          id={`archive-card-image-${archiveId}`}
          alt={`archive card image ${archiveId}`}
          className="w-full h-auto object-contain"
          component="img"
          image={thumbnailUrl}
          loading="lazy"
          width={500}
          height={300}
          onLoad={onImageLoad}
          sx={{ maxWidth, height }}
        />
      </div>
      <div className="flex flex-col h-full">
        <CardContent className="grow px-4 content-center">
          <TitleButton archive={archive} />
        </CardContent>
        {rating ? (
          <Rating
            className="pb-4 w-full justify-center"
            readOnly
            value={rating}
            precision={0.5}
            size="small"
          />
        ) : null}
        <CardActions>
          <ArchiveCardLowerButtons
            archive={archive}
            currentPage={currentPage}
            getNewArchivePages={getNewArchivePages}
          />
        </CardActions>
      </div>
    </Card>
  );
});
