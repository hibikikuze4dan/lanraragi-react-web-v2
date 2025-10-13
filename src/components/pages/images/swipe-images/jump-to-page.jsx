import { Grid2, TextField } from "@mui/material";
import { KEYBOARD_KEY_CODES } from "../../../../constants";

export const JumpToPage = ({
  numOfPages = 0,
  currentPage = 0,
  setCurrentPageIndex,
  setLoadedImage,
}) => {
  const { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } = KEYBOARD_KEY_CODES;
  const onChange = (event) => {
    const value = event?.target?.value ?? 0;
    setCurrentPageIndex(Number(value) - 1);
    setLoadedImage(false);
  };

  const onKeyDown = (event) => {
    const keyCode = event?.code;

    if ([ARROW_DOWN, ARROW_LEFT].includes(keyCode)) {
      event?.preventDefault?.();
      const changeEvent = { target: { value: currentPage - 1 } };
      onChange(changeEvent);
    } else if ([ARROW_UP, ARROW_RIGHT].includes(keyCode)) {
      event?.preventDefault?.();
      const changeEvent = { target: { value: currentPage + 1 } };
      onChange(changeEvent);
    }
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
        onKeyDown={onKeyDown}
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
