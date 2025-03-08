export const removeArchiveFromArray = ({ archive, archivesArray }) => {
  if (!archive || !archivesArray || !Array.isArray(archivesArray)) {
    return null;
  }

  const archiveId = archive?.arcid;

  const newArray = [...archivesArray];

  const archiveIndex = newArray.findIndex((arc) => arc?.arcid === archiveId);

  if (!archiveId || archiveIndex === -1) {
    return null;
  }

  newArray.splice(archiveIndex, 1);

  return newArray;
};
