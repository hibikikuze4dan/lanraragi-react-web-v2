import { Button, Grid2 } from "@mui/material";
import { makeTagsObject } from "../../../utils/makeTagsObject";
import { isValidUrl } from "../../../utils/isValidUrl";
import { useMemo } from "react";
import dayjs from "dayjs";
import { DATE_ADDED_NAMESPACE } from "../../../constants";

export const ArchiveInfoTags = ({ tags }) => {
  const tagsObject = useMemo(() => makeTagsObject(tags), [tags]);

  const tagNamespaces = Object.keys(tagsObject).sort((name1, name2) =>
    name1.localeCompare(name2)
  );

  return (
    <Grid2 id="archive-tags-wrapper" container spacing={2}>
      {tagNamespaces.map((namespace) => {
        return (
          <Grid2 key={namespace} size={12}>
            <Grid2 container spacing={1}>
              <Grid2 size={12}>{namespace}:</Grid2>
              <Grid2 size={12}>
                <Grid2 container>
                  {tagsObject?.[namespace]?.map((tag) => {
                    const isTagAUrl = isValidUrl(tag);
                    const dateTag =
                      namespace === DATE_ADDED_NAMESPACE
                        ? dayjs.unix(tag).format("MMMM DD YYYY HH:mm")
                        : "";

                    return (
                      <Grid2 key={tag} size={{ xs: 6, md: 3 }}>
                        <Button
                          className="normal-case block overflow-ellipsis w-full overflow-hidden"
                          fullWidth
                          {...(isTagAUrl
                            ? {
                                href: tag,
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          {dateTag || tag}
                        </Button>
                      </Grid2>
                    );
                  })}
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        );
      })}
    </Grid2>
  );
};
