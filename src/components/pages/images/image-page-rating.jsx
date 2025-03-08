import {
  Alert,
  Grid2,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useArchiveRating } from "../../../hooks/useArchiveRating";

export const ImagePageRating = () => {
  const isSvp = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [selectValue, setSelectValue] = useState(0);
  const { updateArchiveRating, updateRatingResponse } = useArchiveRating();

  const handleRatingValueUpdate = (value) => {
    setSelectValue(Number(value));
    updateArchiveRating(value);
  };

  const onStarChange = (event, value) => {
    handleRatingValueUpdate(value);
  };

  const onSelectChange = (event) => {
    const value = event?.target?.value;
    handleRatingValueUpdate(value);
  };

  const { success, successMessage } = updateRatingResponse;

  const responseHasValues = ![success, successMessage].includes(undefined);

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
          readOnly={isSvp}
        />
      </Grid2>
      {isSvp && (
        <Grid2 size={12}>
          <TextField
            id="rate-archive-select-text-field"
            className="h-full"
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
      {responseHasValues && (
        <Grid2 size={12}>
          <Alert severity={success ? "success" : "error"} variant="filled">
            <Typography>
              {successMessage.replace(/&quot;/g, '"').replace(/&#39;/g, "'")}
            </Typography>
          </Alert>
        </Grid2>
      )}
    </Grid2>
  );
};
