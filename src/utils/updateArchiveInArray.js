export const updateArchiveInArray = ({ archive, archivesArray }) => {
  if (!archive || !archivesArray || !Array.isArray(archivesArray)) {
    return null;
  }

  const archiveId = archive?.arcid;

  const newArchivesArray = [...archivesArray];

  const editedArchiveIndex = newArchivesArray.findIndex(
    (arc) => arc.arcid === archiveId
  );

  if (editedArchiveIndex === -1) {
    return null;
  }

  newArchivesArray.splice(editedArchiveIndex, 1, archive);

  return [...newArchivesArray];
};
