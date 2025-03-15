import { Grid2, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useArchiveRating } from "../../../hooks/useArchiveRating";
import { isMobile } from "react-device-detect";

export const ImagePageRating = () => {
  const isDesktopDevice = !isMobile;
  const [selectValue, setSelectValue] = useState(0);
  const { updateArchiveRating } = useArchiveRating();

  const handleRatingValueUpdate = (value) => {
    setSelectValue(Number(value));
    updateArchiveRating(value);
  };

  const onStarChange = (_event, value) => {
    handleRatingValueUpdate(value);
  };

  const onSelectChange = (event) => {
    const value = event?.target?.value;
    handleRatingValueUpdate(value);
  };

  return (
    <Grid2 id="rating-component" container spacing={1}>
      <Grid2 size={12}>
        <Typography component="legend">Rate Archive</Typography>
      </Grid2>
      <Grid2 size={12}>
        <Rating
          name="image-page-archive-rating"
          precision={0.5}
          size="large"
          value={Number(selectValue)}
          onChange={onStarChange}
          readOnly={!isDesktopDevice}
        />
      </Grid2>
      {!isDesktopDevice && (
        <Grid2 size={12}>
          <TextField
            id="rate-archive-select-text-field"
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
            <option value={0}>0</option>
            {Array.from(Array(10)).map((_, index) => {
              const value = (index + 1) / 2;
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
