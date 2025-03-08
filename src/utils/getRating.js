import { NAMESPACE_REGEX, RATING } from "../constants";
import { createLocalStorageInstance } from "../local-storage";
import { RATING_NAMESPACE } from "../local-storage/constants";

const { get: getRatingNamespace } =
  createLocalStorageInstance(RATING_NAMESPACE);

export const getRating = (tags = "") => {
  const ratingNamespace = getRatingNamespace() ?? RATING;
  const rating = tags.match(NAMESPACE_REGEX[ratingNamespace])?.[0] ?? "";
  return rating;
};
