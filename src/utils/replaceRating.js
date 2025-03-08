import { NAMESPACE_REGEX_WITH_COMMA, RATING } from "../constants";
import { createLocalStorageInstance } from "../local-storage";
import { RATING_NAMESPACE } from "../local-storage/constants";

const { get: getRatingNamespace } =
  createLocalStorageInstance(RATING_NAMESPACE);

export const replaceRating = ({ tags, newRating = 0 } = {}) => {
  const ratingNamespace = getRatingNamespace() ?? RATING;
  const isNewRatingANumber = typeof newRating === "number";
  const noNewRating = !newRating && !isNewRatingANumber;

  const passesPrecheck = !tags || !noNewRating || !ratingNamespace;
  if (!passesPrecheck) {
    return null;
  }

  const namespaceRegex = NAMESPACE_REGEX_WITH_COMMA[ratingNamespace];
  const tagsWithRatingRemoved = tags
    ?.replace(namespaceRegex, "")
    ?.replace(/,$/, "");

  if (!tagsWithRatingRemoved) {
    return null;
  }

  const newTags = `${tagsWithRatingRemoved},${ratingNamespace}:${newRating}`;

  return newTags;
};
