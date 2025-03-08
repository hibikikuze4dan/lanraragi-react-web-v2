import { trimEnd } from "es-toolkit";

export const tagSeperator = (tag) => {
  const separatorIndex = tag.indexOf(":");
  if (separatorIndex === -1) return ["", tag];
  const [tagType] = tag.match(/^[^:]*:\s*/gm);
  const [, tagValue] = tag.split(/^[^:]*:\s*/gm);
  return [trimEnd(tagType.replace(":", "")), tagValue];
};
