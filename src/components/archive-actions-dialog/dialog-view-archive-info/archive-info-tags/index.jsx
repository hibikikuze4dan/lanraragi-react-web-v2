import { Grid2 } from "@mui/material";
import { makeTagsObject } from "../../../../utils/makeTagsObject";
import { useMemo } from "react";
import { useSearchPageLogic } from "../../../../hooks/useSearchPageLogic";
import { useAppPages } from "../../../../hooks/useAppPages";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import { TagButton } from "./tag-button";

export const ArchiveInfoTags = ({ tags, closeDialog }) => {
  const { handleNewSearch } = useSearchPageLogic();
  const { updateAppPage } = useAppPages();
  const { handleUpdateSearchParameters } = useSearchParameters();
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
                <Grid2 container spacing={1}>
                  {tagsObject?.[namespace]?.map((tag) => {
                    return (
                      <Grid2 key={tag} size={{ xs: 6, md: 3 }}>
                        <TagButton
                          tag={tag}
                          namespace={namespace}
                          handleNewSearch={handleNewSearch}
                          updateAppPage={updateAppPage}
                          handleUpdateSearchParameters={
                            handleUpdateSearchParameters
                          }
                          closeDialog={closeDialog}
                        />
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
