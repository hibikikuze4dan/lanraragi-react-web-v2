import { Box, Button, Grid2 } from "@mui/material";
import clsx from "clsx";
import { TagsTextField } from "./tags-text-field";
import { useUpdateArchiveMetadata } from "../../../hooks/useUpdateArchiveMetadata";

export const DialogUpdateArchiveMetadata = ({ closeDialog }) => {
  const {
    updateTags,
    tags,
    updateSummary,
    updateTitle,
    title,
    summary,
    updateMetadata,
  } = useUpdateArchiveMetadata();

  const handleOnClick = () => {
    updateMetadata();
    closeDialog();
  };

  return (
    <Box
      id="dialog-content-update-archive-metadata"
      className={clsx("w-full py-4")}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TagsTextField
            label="Title"
            textFieldId="update-metadata-title"
            onChange={updateTitle}
            value={title}
            rows={3}
          />
        </Grid2>
        <Grid2 size={12}>
          <TagsTextField
            label="Tags"
            textFieldId="update-metadata-tags"
            onChange={updateTags}
            multiline
            rows={8}
            value={tags}
          />
        </Grid2>
        <Grid2 size={12}>
          <TagsTextField
            label="Summary"
            textFieldId="update-metadata-summary"
            onChange={updateSummary}
            value={summary}
            rows={8}
          />
        </Grid2>
        <Grid2 size={12}>
          <Button
            className="min-h-[44px] mt-4"
            variant="outlined"
            fullWidth
            onClick={handleOnClick}
          >
            Update Archive Metadata
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};
