import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { ArchiveCardLowerButtons } from "./archive-card-lower-buttons";
import { TitleButton } from "./title-button";
import { makeTagsObject } from "../../utils/makeTagsObject";
import { useArchiveThumbnail } from "../../hooks/useArchiveThumbnail";

export const ArchiveCard = memo(function ArchiveCard({
  archive,
  currentPage,
  focusFirstArchiveCard = false,
  getNewArchivePages,
  ratingNamespace,
  index = 0,
}) {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [triedToGetThumbnail, setTriedToGetThumbnail] = useState(false);
  const { getThumbnailUrl } = useArchiveThumbnail();
  const imageRef = useRef();
  const [maxWidth, setMaxWidth] = useState("100%");
  const [height, setHeight] = useState("100%");
  const archiveId = archive?.arcid ?? "";

  const onImageLoad = () => {
    if (imageRef?.current) {
      setMaxWidth(`${imageRef.current?.naturalWidth}px`);
      setHeight(`${imageRef.current?.naturalHeight}px`);
    }
  };

  useEffect(() => {
    if (!thumbnailUrl && !triedToGetThumbnail) {
      setTriedToGetThumbnail(true);
      getThumbnailUrl(archiveId).then((url) => {
        setThumbnailUrl(url);
      });
    }
  }, [archiveId, getThumbnailUrl, thumbnailUrl, triedToGetThumbnail]);

  const tags = makeTagsObject(archive?.tags ?? "");

  const rating = tags?.[ratingNamespace]?.[0]?.length ?? 0;

  return (
    <Card className="h-full flex flex-col">
      <div className="min-h-75 max-h-75 content-center p-2 flex justify-center">
        <CardMedia
          ref={imageRef}
          id={`archive-card-image-${archiveId}`}
          alt={`thumb ${index + 1}`}
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
          <TitleButton
            archive={archive}
            focusTitle={focusFirstArchiveCard && index === 0}
          />
        </CardContent>
        {rating ? (
          <Rating
            className="pb-4 w-full justify-center"
            readOnly
            value={rating}
            precision={1}
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
