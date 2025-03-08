import { Grid2, TextField } from "@mui/material";
import clsx from "clsx";
import { RATING, RATING_NAMESPACES } from "../../../constants";
import { useState } from "react";
import { createLocalStorageInstance } from "../../../local-storage";
import { RATING_NAMESPACE } from "../../../local-storage/constants";

const { get: getRaingNameSpace, set: setRaingNamespace } =
  createLocalStorageInstance(RATING_NAMESPACE);

export const RatingNamespaceSetting = () => {
  const [ratingNamespaceState, setRatingNamespaceState] = useState(
    getRaingNameSpace() ?? RATING
  );

  const onChange = (event) => {
    const value = event?.target?.value ?? RATING;

    setRatingNamespaceState(value);
    setRaingNamespace(value);
  };

  return (
    <Grid2 container justifyContent="center">
      <TextField
        className={clsx("min-w-56")}
        id="rating-namespace-select-text-field"
        label="Rating Namespace"
        select
        slotProps={{ select: { native: true } }}
        required
        value={ratingNamespaceState}
        onChange={onChange}
      >
        {RATING_NAMESPACES.map((namespace) => {
          const value = namespace;
          return <option key={value}>{value}</option>;
        })}
      </TextField>
    </Grid2>
  );
};
