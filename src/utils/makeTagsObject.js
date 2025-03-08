import { trimStart } from "es-toolkit";
import { GENERAL_TAG_TYPE } from "../constants";
import { tagSeperator } from "./tagSeperator";

export const makeTagsObject = (tagsString) => {
  const tagsArray = tagsString?.split(",");

  return tagsArray?.length
    ? tagsArray.reduce((acc, tag) => {
        const [tagType, tagValue] = tagSeperator(trimStart(tag));
        const typeToSearchFor = tagType || GENERAL_TAG_TYPE;
        const currentTagTypeValues = acc[typeToSearchFor] ?? [];
        const exists = currentTagTypeValues.includes(tagValue);

        return {
          ...acc,
          [typeToSearchFor]: [
            ...currentTagTypeValues,
            ...(exists ? [] : [tagValue]),
          ],
        };
      }, {})
    : {};
};
