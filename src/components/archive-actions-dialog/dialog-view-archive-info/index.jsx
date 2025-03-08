import { Box, Grid2, Typography } from "@mui/material";
import clsx from "clsx";
import useCurrentArchive from "../../../hooks/useCurrentArchive";
import { useMemo } from "react";
import { useCategories } from "../../../hooks/useCategories";
import { ArchiveInfoTags } from "./archive-info-tags";

export const DialogViewArchiveInfo = () => {
  const { archive } = useCurrentArchive();
  const { getCategoriesByArchvie } = useCategories({ initLoad: true });
  const { title, filename, arcid, tags } = archive ?? {};

  const categories = useMemo(
    () => getCategoriesByArchvie({ archiveId: arcid }),
    [arcid, getCategoriesByArchvie]
  );

  return (
    <Box id="dialog-content-archiv-info" className={clsx("w-full py-4")}>
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <Grid2 id="title-filename-id" container spacing={3}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography>Archive Title:</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <Typography>{title ?? ""}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography>Archive Filename:</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <Typography>{filename ?? ""}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography>Archive ID:</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <Typography className="break-all">{arcid ?? ""}</Typography>
            </Grid2>
          </Grid2>
        </Grid2>
        {!!categories.length && (
          <Grid2 size={12}>
            <Grid2 id="archive-categories-wrpper" container>
              <Grid2 size={{ xs: 12, md: 3 }}>
                <Typography>Categories:</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <Typography>
                  {categories.map((category) => category?.name).join(", ")}
                </Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        )}
        <Grid2 size={12}>
          <ArchiveInfoTags tags={tags} />
        </Grid2>
      </Grid2>
    </Box>
  );
};
