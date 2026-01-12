import { Grid2, Rating, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useId, useState } from "react";
import { useArchiveRating } from "../../../hooks/useArchiveRating";
import { isMobile } from "react-device-detect";
import { LANRARAGI_STARS_ARRAY, RETURN_NULL } from "../../../constants";

const VALID_RATINGS = ["1", "2", "3", "4", "5"];

export const ImagePageRating = ({ postRating = RETURN_NULL }) => {
  const id = useId();
  const muiRatingComponentId = `image-page-rating-mui-component-${id}`;
  const isDesktopDevice = !isMobile;
  const [selectValue, setSelectValue] = useState("");
  const { updateArchiveRating } = useArchiveRating();

  const handleRatingValueUpdate = useCallback(
    (value) => {
      setSelectValue(value);
      updateArchiveRating(value);
      postRating();
    },
    [postRating, updateArchiveRating]
  );

  const onStarChange = (_event, value) => {
    handleRatingValueUpdate(LANRARAGI_STARS_ARRAY[value]);
  };

  const onSelectChange = (event) => {
    const value = event?.target?.value;
    handleRatingValueUpdate(value);
  };

  const onKeyPress = useCallback(
    (event) => {
      const index = event?.key;
      if (VALID_RATINGS.includes(index)) {
        handleRatingValueUpdate(LANRARAGI_STARS_ARRAY[index]);
      }
    },
    [handleRatingValueUpdate]
  );

  useEffect(() => {
    const muiRatingElement = document.getElementById(muiRatingComponentId);
    muiRatingElement.addEventListener("keydown", onKeyPress);

    return () => {
      muiRatingElement.removeEventListener("keydown", onKeyPress);
    };
  }, [muiRatingComponentId, onKeyPress]);

  return (
    <Grid2 id="rating-component" container spacing={1}>
      <Grid2 size={12}>
        <Typography component="legend" textAlign="center">
          Rate Archive
        </Typography>
      </Grid2>
      <Grid2 className="flex justify-center" size={12}>
        <Rating
          name="image-page-archive-rating"
          precision={1}
          size="large"
          id={muiRatingComponentId}
          value={Number(selectValue?.length)}
          onChange={onStarChange}
          readOnly={!isDesktopDevice}
        />
      </Grid2>
      {!isDesktopDevice && (
        <Grid2 className="flex justify-center" size={12}>
          <TextField
            id={`rate-archive-select-text-field`}
            className="h-full w-7/10"
            label="Rate Archive"
            fullWidth
            select
            slotProps={{
              select: { native: true },
              input: { className: "h-full" },
            }}
            value={selectValue}
            onChange={onSelectChange}
          >
            <option value={""}></option>
            {Array.from(Array(5)).map((_, index) => {
              const value = LANRARAGI_STARS_ARRAY[index + 1];
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </TextField>
        </Grid2>
      )}
    </Grid2>
  );
};
