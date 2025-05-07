import { Grid2, TextField } from "@mui/material";

export const JumpToPage = ({
  numOfPages = 0,
  currentPage = 0,
  setCurrentPageIndex,
  setLoadedImage,
}) => {
  const onChange = (event) => {
    const value = event?.target?.value;
    setCurrentPageIndex(Number(value) - 1);
    setLoadedImage(false);
  };

  return (
    <Grid2 id="jump-to-page" container>
      <TextField
        id="jump-to-page-select"
        className="jump-to-page-select-text-field h-full"
        fullWidth
        label="Jump to Page"
        select
        slotProps={{
          select: { native: true },
          input: { className: "h-full min-w-50 max-h-16" },
        }}
        value={currentPage}
        onChange={onChange}
      >
        {Array.from(Array(numOfPages)).map((_, index) => {
          const value = index + 1;
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </TextField>
    </Grid2>
  );
};

export default JumpToPage;
