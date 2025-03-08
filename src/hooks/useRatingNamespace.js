import { useState } from "react";
import { createLocalStorageInstance } from "../local-storage";
import { RATING_NAMESPACE } from "../local-storage/constants";
import { RATING } from "../constants";

const { get: getRatingNamespace, set: setRatingNamespace } =
  createLocalStorageInstance(RATING_NAMESPACE);

export const useRatingNamespace = () => {
  const [ratingNamespace] = useState(getRatingNamespace() ?? RATING);

  return {
    ratingNamespace,
    getRatingNamespace,
    setRatingNamespace,
  };
};
