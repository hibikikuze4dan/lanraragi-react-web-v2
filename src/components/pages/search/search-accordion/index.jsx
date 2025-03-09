import { useState } from "react";
import { Accordion } from "../../../accordion";
import { Grid2 } from "@mui/material";
import { SearchCategorySelect } from "./search-category-select";
import { SearchFilterTextField } from "./search-filter-text-field";
import { SearchSortSelect } from "./search-sort-select";
import { SearchSortOrderSelect } from "./search-sort-order-select";
import { SearchOrResetButtons } from "./search-or-reset-buttons";

export const SearchAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const onChange = (_, isExpanded) => setExpanded(isExpanded);

  const toggleAccordion = () => {
    onChange(null, !expanded);
  };

  return (
    <Accordion
      headerId="search-accordion"
      headerContent={"Search Filters"}
      detailsId="search-accordion-content"
      onChange={onChange}
      expanded={expanded}
      actionsContent={
        <SearchOrResetButtons toggleAccordion={toggleAccordion} />
      }
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <SearchCategorySelect />
        </Grid2>
        <Grid2 size={12}>
          <SearchFilterTextField />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <SearchSortSelect />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <SearchSortOrderSelect />
        </Grid2>
      </Grid2>
    </Accordion>
  );
};
