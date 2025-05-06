import { NAMESPACE_REGEX_WITH_COMMA, RATING } from "../constants";
import { createLocalStorageInstance } from "../local-storage";
import { RATING_NAMESPACE } from "../local-storage/constants";

const { get: getRatingNamespace } =
  createLocalStorageInstance(RATING_NAMESPACE);

export const replaceRating = ({ tags, newRating = 0 } = {}) => {
  const ratingNamespace = getRatingNamespace() ?? RATING;
  const isNewRatingANumberOrString = ["number", "string"].includes(
    typeof newRating
  );
  const noNewRating = !isNewRatingANumberOrString;

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

  if ([0, "0", ""].includes(newRating)) {
    return tagsWithRatingRemoved;
  }

  const newTags = `${tagsWithRatingRemoved},${ratingNamespace}:${newRating}`;

  return newTags;
};
